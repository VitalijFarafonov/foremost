// Step 1 Streaming API - Real-time intelligence display with SSE
// Shows full prompts and LLM responses as they happen during analysis

import { NextRequest } from 'next/server';
import { analyzeCompany } from '@/lib/tool/services/companyAnalyzer';
import { formatSSE, ANALYSIS_STAGES, type StreamEvent } from '@/lib/tool/services/streamingTypes';
import { callAI, callAIWithGrounding, parseAIJSON } from '@/lib/tool/services/aiClient';
import type { CompanyData } from '@/lib/tool/services/companyAnalyzer';
import type { StrategicPriority, TwoPathsResult } from '@/lib/tool/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Helper to send SSE event
function createEvent(event: Omit<StreamEvent, 'timestamp'>): StreamEvent {
  return { ...event, timestamp: Date.now() };
}

export async function POST(request: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: Omit<StreamEvent, 'timestamp'>) => {
        controller.enqueue(encoder.encode(formatSSE(createEvent(event))));
      };

      try {
        const body = await request.json();
        const { companyName, companyUrl, industry } = body;

        if (!companyUrl) {
          send({ type: 'error', error: 'Company URL is required' });
          controller.close();
          return;
        }

        let fullUrl = companyUrl;
        if (!fullUrl.startsWith('http://') && !fullUrl.startsWith('https://')) {
          fullUrl = `https://${fullUrl}`;
        }

        // ========== STAGE 1: Company Analysis ==========
        send({
          type: 'stage_update',
          stage: ANALYSIS_STAGES.COMPANY_ANALYSIS.name,
          stageDescription: ANALYSIS_STAGES.COMPANY_ANALYSIS.description,
        });

        send({
          type: 'prompt_snippet',
          promptSnippet: `Scraping and analysing company website: ${fullUrl}\n\nExtracting:\n• Company name and industry\n• Business description and key themes\n• Recent initiatives and strategic signals\n• Competitor information where available`,
        });

        const companyData = await analyzeCompany(fullUrl);
        if (industry) companyData.industry = industry;
        if (companyName) companyData.companyName = companyName;

        send({
          type: 'response_snippet',
          responseSnippet: `Company: ${companyData.companyName}\nIndustry: ${companyData.industry}\n\nKey Themes:\n${companyData.keyThemes?.map(t => `• ${t}`).join('\n') || 'None identified'}\n\nRecent Initiatives:\n${companyData.recentInitiatives?.slice(0, 3).map(i => `• ${i}`).join('\n') || 'None identified'}`,
        });

        // ========== STAGE 2: Strategic Inference ==========
        send({
          type: 'stage_update',
          stage: ANALYSIS_STAGES.STRATEGIC_INFERENCE.name,
          stageDescription: ANALYSIS_STAGES.STRATEGIC_INFERENCE.description,
        });

        const strategyPrompt = buildStrategicInferencePrompt(companyData);
        send({
          type: 'prompt_snippet',
          promptSnippet: strategyPrompt,
        });

        const strategyResponse = await callAI([
          {
            role: 'system',
            content: `You are a senior business strategy consultant analyzing companies to infer their strategic priorities. Use BRITISH ENGLISH spelling throughout. Always return valid JSON.`,
          },
          { role: 'user', content: strategyPrompt },
        ], { temperature: 0.6, maxTokens: 3000 });

        send({
          type: 'response_snippet',
          responseSnippet: strategyResponse.content,
        });

        const strategyData = parseAIJSON<{ priorities: StrategicPriority[] }>(strategyResponse.content);
        const companyPriorities = strategyData.priorities;

        // ========== STAGE 3: Use Case Generation ==========
        send({
          type: 'stage_update',
          stage: ANALYSIS_STAGES.USE_CASE_GENERATION.name,
          stageDescription: ANALYSIS_STAGES.USE_CASE_GENERATION.description,
        });

        const strategicPrioritiesText = companyPriorities.map(p => p.priority);
        const useCasePrompt = buildUseCasePrompt(companyData, strategicPrioritiesText);

        send({
          type: 'prompt_snippet',
          promptSnippet: useCasePrompt,
        });

        const useCaseResponse = await callAI([
          {
            role: 'system',
            content: `You are a senior AI strategy consultant preparing board-level strategic recommendations. Your analysis must be balanced, honest, and actionable. Use BRITISH ENGLISH spelling. Always return valid JSON.`,
          },
          { role: 'user', content: useCasePrompt },
        ], { temperature: 0.6, maxTokens: 6000 });

        send({
          type: 'response_snippet',
          responseSnippet: useCaseResponse.content,
        });

        const useCases = parseAIJSON<TwoPathsResult>(useCaseResponse.content);

        // ========== STAGE 4: Validation ==========
        send({
          type: 'stage_update',
          stage: ANALYSIS_STAGES.VALIDATION.name,
          stageDescription: ANALYSIS_STAGES.VALIDATION.description,
        });

        const validationPrompt = buildValidationPrompt(useCases, companyData.industry || 'Unknown', companyData.companyName);

        send({
          type: 'prompt_snippet',
          promptSnippet: validationPrompt,
        });

        const validationResponse = await callAI([
          {
            role: 'system',
            content: `You are a senior AI strategy consultant validating use case alignment with strategic priorities. Use BRITISH ENGLISH spelling. Always return valid JSON.`,
          },
          { role: 'user', content: validationPrompt },
        ], { temperature: 0.5, maxTokens: 2000 });

        send({
          type: 'response_snippet',
          responseSnippet: validationResponse.content,
        });

        const validationData = parseAIJSON<{ priorities: StrategicPriority[] }>(validationResponse.content);
        const useCasePriorities = validationData.priorities || [];

        // Enrich priorities
        const enrichedPriorities = enrichPriorities(companyPriorities, useCasePriorities);

        // ========== COMPLETE ==========
        const result = {
          strategicInference: {
            priorities: enrichedPriorities,
            disclaimer: 'This analysis is based on your company\'s public information, with AI use cases generated to support these priorities.',
          },
          twoPaths: useCases,
          companyData,
        };

        send({
          type: 'complete',
          data: result,
        });

        controller.close();
      } catch (error) {
        console.error('[Step1-Stream] Error:', error);
        send({
          type: 'error',
          error: error instanceof Error ? error.message : 'Analysis failed',
        });
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}

// ========== PROMPT BUILDERS ==========

function buildStrategicInferencePrompt(companyData: CompanyData): string {
  const currentDate = new Date().toISOString().split('T')[0];

  const competitorContext = companyData.competitors && companyData.competitors.length > 0
    ? `\n**Competitor Intelligence (for context only, do NOT mention by name in rationale):**\n${companyData.competitors.map(c => `• ${c.name}: ${c.strategicFocus}`).join('\n')}`
    : '';

  return `You are advising the board of ${companyData.companyName} (Today: ${currentDate})

**COMPANY CONTEXT**
Company: ${companyData.companyName}
Website: ${companyData.url}
Industry: ${companyData.industry || 'Not specified'}
Description: ${companyData.description || 'Not available'}
Key Themes: ${companyData.keyThemes?.join(', ') || 'Not available'}
Recent Initiatives: ${companyData.recentInitiatives?.join('; ') || 'Not available'}
${competitorContext}

**TASK**
Infer the top 2-3 strategic business priorities the board is likely focused on.

**KEY REQUIREMENT**
For each priority, provide a STRATEGIC RATIONALE that:
- Explains WHY this specific priority applies to THIS company
- Connects to INDUSTRY TRENDS and market dynamics (do NOT name specific competitors)
- Is DIRECTLY RELEVANT to the priority it accompanies

**RATIONALE LENGTH BY CONFIDENCE:**
- HIGH confidence: 3-4 sentences with rich context
- MEDIUM confidence: 2-3 sentences with reasonable explanation  
- LOW confidence: 1-2 sentences acknowledging it's based on typical industry patterns

**TONE:**
- Use PLAIN ENGLISH; avoid jargon and buzzwords
- Write in a quietly confident, advisory style
- Be direct and clear; sound like a trusted adviser

**CRITICAL:** Do NOT name competitors. Refer to "industry trends", "sector dynamics", "market pressures" instead.

**OUTPUT FORMAT (JSON):**
{
  "priorities": [
    {
      "priority": "Strategic priority title",
      "rationale": "Direct, plain-English explanation. Length varies by confidence.",
      "confidence": "high" | "medium" | "low"
    }
  ]
}

Return ONLY valid JSON.`;
}

function buildUseCasePrompt(companyData: CompanyData, strategicPriorities: string[]): string {
  return `You are a senior AI strategy consultant presenting to a BOARD-LEVEL AUDIENCE for ${companyData.companyName}.

**CONTEXT**
Company: ${companyData.companyName}
Industry: ${companyData.industry || 'Unknown'}
Description: ${companyData.description || 'Not available'}

**STRATEGIC PRIORITIES (these MUST drive your recommendations):**
${strategicPriorities.map((p, i) => `${i + 1}. ${p}`).join('\n')}

**CRITICAL REQUIREMENT: STRATEGY ALIGNMENT**
Every use case you suggest MUST directly support one or more of the strategic priorities listed above.
- Start by considering each priority and asking: "What AI capability would help achieve this?"
- Do NOT suggest generic AI use cases; tailor each one to THIS company's specific strategy
- In the strategicRationale, explicitly name which priority the use case supports

**TASK**
Generate AI opportunities in TWO categories:

**Path A: Business Reimagination** (2-3 opportunities)
• Fundamental changes to business model or customer offering
• High ambition, addresses the most important strategic priorities
• Creates new value or competitive advantages

**Path B: Efficiency & Optimisation** (3-4 opportunities)
• Operational improvements aligned to strategic priorities
• Cost reduction, speed, productivity
• Quicker wins that build AI capability

**FOR EACH OPPORTUNITY, PROVIDE:**
1. **Description**: 3-4 sentences explaining WHAT the opportunity is and HOW it would work in practice. Be specific about the mechanics, not abstract.
2. **Strategic Rationale**: 2-3 sentences explicitly connecting this to a named strategic priority
3. **Advantages**: 3-4 practical benefits
4. **Risks**: 3-4 items including both business drawbacks (e.g., significant investment required, uncertain adoption, limited differentiation) AND AI-specific risks (e.g., data leakage, privacy concerns, algorithmic bias, model hallucinations, vendor lock-in)
5. **Uncertainties**: 2-3 unknowns
6. **Tradeoffs**: 2-3 balancing considerations

**OUTPUT FORMAT (JSON):**
{
  "reimagination": [
    {
      "id": "uc-r1",
      "title": "Specific, concrete title",
      "description": "3-4 sentences explaining WHAT this is and HOW it works in practice. Describe the mechanics: what data it uses, what it outputs, how users interact with it, what changes day-to-day.",
      "path": "reimagination",
      "relevanceScore": 85,
      "tags": ["Priority Name Here"],
      "strategicRationale": "This directly supports [Priority Name] by... Explain the specific connection.",
      "advantages": [
        "Creates differentiated capability",
        "Builds proprietary advantage",
        "Positions company ahead of competitors"
      ],
      "risks": [
        "Requires significant upfront investment",
        "Potential for data leakage if not properly secured",
        "Algorithmic bias could affect decision quality"
      ],
      "uncertainties": [
        "Market readiness for this innovation",
        "Regulatory landscape may evolve"
      ],
      "tradeoffs": [
        "Focus here means reduced investment elsewhere",
        "Speed vs. thoroughness"
      ],
      "riskAssessment": {
        "rating": "high",
        "justification": "Transformational initiative with significant execution risk but high strategic upside",
        "implementationRisks": [
          "Technical complexity may exceed estimates",
          "Organisational change management challenges"
        ]
      }
    }
  ],
  "efficiency": [
    {
      "id": "uc-e1",
      "title": "Specific title",
      "description": "2-3 sentences explaining the use case",
      "path": "efficiency",
      "relevanceScore": 75,
      "timeframe": "3-6 months",
      "impact": "Medium: qualitative impact description",
      "tags": ["Priority Name Here"],
      "strategicRationale": "This directly addresses [Priority Y] by... Quick wins that demonstrate value...",
      "advantages": [
        "Proven technology with clear ROI",
        "Minimal disruption"
      ],
      "risks": [
        "Limited strategic differentiation",
        "Staff may share sensitive data with AI tools"
      ],
      "uncertainties": [
        "Exact savings depend on current processes"
      ],
      "tradeoffs": [
        "Incremental vs. transformational change"
      ],
      "riskAssessment": {
        "rating": "low",
        "justification": "Established approach with predictable outcomes",
        "implementationRisks": [
          "Staff training requirements",
          "Legacy system integration"
        ]
      }
    }
  ]
}

Return ONLY valid JSON.`;
}

function buildValidationPrompt(useCases: TwoPathsResult, industry: string, companyName: string): string {
  const allUseCases = [
    ...(useCases.reimagination || []).map(u => u.title),
    ...(useCases.efficiency || []).map(u => u.title),
  ];

  return `Analyse these AI use cases for ${companyName} (${industry}):

**USE CASES:**
${allUseCases.map((u, i) => `${i + 1}. ${u}`).join('\n')}

**TASK**
Identify the strategic priorities these use cases suggest. What does this collection of use cases tell us about what the company should prioritise?

**OUTPUT FORMAT (JSON):**
{
  "priorities": [
    {
      "priority": "Implied strategic priority",
      "rationale": "Why these use cases suggest this priority",
      "confidence": "high" | "medium" | "low",
      "linkedUseCases": ["uc-r1", "uc-e2"]
    }
  ]
}

Return ONLY valid JSON.`;
}

// ========== HELPERS ==========

function enrichPriorities(
  companyPriorities: StrategicPriority[],
  useCasePriorities: StrategicPriority[]
): StrategicPriority[] {
  return companyPriorities.slice(0, 3).map((companyPriority) => {
    const matchScores = useCasePriorities.map((useCasePriority) => ({
      priority: useCasePriority,
      score: calculateSimilarity(companyPriority.priority, useCasePriority.priority),
    }));

    const bestMatch = matchScores.reduce((best, current) =>
      current.score > best.score ? current : best,
      { priority: null as StrategicPriority | null, score: 0 }
    );

    const isValidated = bestMatch.score > 0.3;
    const linkedUseCases = isValidated
      ? matchScores.filter((m) => m.score > 0.3).flatMap((m) => m.priority?.linkedUseCases || [])
      : [];

    return {
      ...companyPriority,
      validatedByUseCases: isValidated,
      linkedUseCases: linkedUseCases.length > 0 ? linkedUseCases : companyPriority.linkedUseCases,
    };
  });
}

function calculateSimilarity(priority1: string, priority2: string): number {
  const keywords1 = extractKeywords(priority1);
  const keywords2 = extractKeywords(priority2);
  const intersection = keywords1.filter(k => keywords2.includes(k));
  const union = new Set([...keywords1, ...keywords2]);
  if (union.size === 0) return 0;
  return intersection.length / union.size;
}

function extractKeywords(text: string): string[] {
  const stopWords = ['and', 'or', 'the', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'with'];
  const synonyms: Record<string, string> = {
    'cost': 'efficiency', 'costs': 'efficiency', 'efficiency': 'efficiency',
    'growth': 'growth', 'revenue': 'growth', 'expand': 'growth',
    'customer': 'customer', 'experience': 'customer', 'service': 'customer',
    'digital': 'digital', 'technology': 'digital', 'transformation': 'digital',
    'risk': 'risk', 'compliance': 'risk', 'governance': 'risk',
  };
  return text.toLowerCase().split(/\s+/)
    .filter(w => w.length > 2 && !stopWords.includes(w))
    .map(w => synonyms[w] || w);
}
