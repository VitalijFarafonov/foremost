// Use case generator - creates Path A (Reimagination) and Path B (Efficiency) use cases
// Now includes competitor context to inform strategic use case suggestions

import { callAI, parseAIJSON } from './aiClient';
import type { CompanyData } from './companyAnalyzer';
import type { TwoPathsResult, UseCase } from '@/lib/tool/types';

export async function generateUseCases(
  companyData: CompanyData,
  strategicPriorities: string[],
  industry?: string
): Promise<TwoPathsResult> {
  console.log(`[UseCaseGenerator] Generating use cases for ${companyData.companyName} aligned with strategic priorities`);
  console.log(`[UseCaseGenerator] Competitor context available: ${companyData.competitors?.length || 0} competitors`);

  const prioritiesText = strategicPriorities.join('; ');

  // Build competitor context for use case differentiation
  const competitorContext = companyData.competitors && companyData.competitors.length > 0
    ? `**Competitor AI Strategies:**
${companyData.competitors.map(c => `- ${c.name}: ${c.strategicFocus}`).join('\n')}

Consider this competitive landscape when generating use cases:
- Identify opportunities where ${companyData.companyName} can differentiate through AI
- Consider what capabilities competitors are building and how to counter or leapfrog them
- Look for gaps in competitor strategies that ${companyData.companyName} could exploit`
    : '';

  const targetIndustry = industry || companyData.industry || 'Unknown';

  const prompt = `You are a senior AI strategy consultant presenting to a BOARD-LEVEL AUDIENCE for ${companyData.companyName}.

**CONTEXT**
Company: ${companyData.companyName}
Industry: ${targetIndustry}
Description: ${companyData.description || 'Not available'}
Key Themes: ${companyData.keyThemes?.join(', ') || 'Not specified'}

${competitorContext}

**Strategic Priorities (from company analysis):**
${prioritiesText}

**INDUSTRY CONTEXT**
Given that this is a ${targetIndustry} company:
- Consider typical AI adoption patterns in this sector
- Be aware of common regulatory or operational constraints
- Use industry-specific terminology where appropriate

**YOUR TASK**
Generate AI use cases in TWO distinct categories with BOARD-LEVEL strategic analysis:

**Path A: Business Reimagination** (2-3 use cases max)
- Fundamental changes to business model or customer offering
- High ambition, high uncertainty
- Creates new value or competitive moats

**Path B: Efficiency & Optimisation** (3-4 use cases)
- Operational improvements
- Cost reduction, speed, productivity
- High certainty, lower risk

**FOR EACH USE CASE, PROVIDE:**
1. **Strategic Rationale**: 2-3 sentences explaining WHY this opportunity fits with the company's strategic priorities. Connect the dots for board members.
2. **Advantages**: 3-4 bullet points on benefits
3. **Risks**: 3-4 items including both business drawbacks (e.g., significant investment required, uncertain adoption, limited differentiation) AND AI-specific risks (e.g., data leakage, privacy concerns, algorithmic bias, model hallucinations, vendor lock-in)
4. **Uncertainties**: 2-3 bullet points on unknowns that could affect outcomes
5. **Tradeoffs**: 2-3 bullet points on what must be sacrificed or balanced
6. **Risk Assessment**: Rating (low/medium/high), justification, and specific implementation risks

**OUTPUT FORMAT (JSON only):**
{
  "reimagination": [
    {
      "id": "uc-r1",
      "title": "Specific, actionable title",
      "description": "2-3 sentences: What it does and the core value proposition.",
      "path": "reimagination",
      "relevanceScore": 85,
      "timeframe": "9-12 months",
      "impact": "High: qualitative description of strategic impact",
      "tags": ["strategy", "proprietary", "high-risk"],
      "strategicRationale": "This opportunity directly supports [Priority X] by... The board should consider this because... This aligns with the company's direction toward...",
      "advantages": [
        "Creates differentiated customer experience",
        "Builds proprietary data moat",
        "Positions company ahead of competitors"
      ],
      "risks": [
        "Requires significant upfront investment",
        "Potential data leakage if not properly secured",
        "Algorithmic bias could skew recommendations"
      ],
      "uncertainties": [
        "Market readiness for this innovation",
        "Regulatory landscape may evolve"
      ],
      "tradeoffs": [
        "Focus here means reduced investment in other areas",
        "Speed vs. thoroughness in implementation"
      ],
      "riskAssessment": {
        "rating": "high",
        "justification": "This is a transformational initiative with significant execution risk but high strategic upside",
        "implementationRisks": [
          "Technical complexity may exceed initial estimates",
          "Organisational change management challenges",
          "Dependency on third-party technology partners"
        ]
      }
    }
  ],
  "efficiency": [
    {
      "id": "uc-e1",
      "title": "Specific, actionable title",
      "description": "2-3 sentences: What it does and the core value proposition.",
      "path": "efficiency",
      "relevanceScore": 75,
      "timeframe": "3-6 months",
      "impact": "Medium: qualitative description of operational impact",
      "tags": ["Priority Name Here"],
      "strategicRationale": "This directly addresses the priority of [Priority Y] by... Board members will note that this provides quick wins while...",
      "advantages": [
        "Proven technology with clear ROI",
        "Minimal disruption to existing operations"
      ],
      "risks": [
        "Limited strategic differentiation",
        "Staff may inadvertently share sensitive data with AI",
        "Vendor lock-in with chosen AI provider"
      ],
      "uncertainties": [
        "Exact cost savings depend on current process efficiency"
      ],
      "tradeoffs": [
        "Incremental improvement vs. transformational change"
      ],
      "riskAssessment": {
        "rating": "low",
        "justification": "Established approach with predictable outcomes",
        "implementationRisks": [
          "Staff adoption and training requirements",
          "Integration with legacy systems"
        ]
      }
    }
  ]
}

**GUIDELINES**
- Every use case must support at least one strategic priority (REQUIRED)
- Be specific to the ${targetIndustry} industry
- Write for a BOARD AUDIENCE: clear, strategic, balanced
- Use qualitative impact descriptions; do not invent specific percentages
- Be honest about risks; boards value balanced analysis of AI-specific concerns

Return ONLY valid JSON.`;


  const response = await callAI(
    [
      {
        role: 'system',
        content: `You are a senior AI strategy consultant preparing board-level strategic recommendations. Your analysis must be balanced, honest, and actionable.

CRITICAL LANGUAGE REQUIREMENTS:
- Use BRITISH ENGLISH spelling throughout (e.g., "organisation" not "organization", "optimise" not "optimize", "analyse" not "analyze")
- NEVER use em dashes (—). Use colons (:), semicolons (;), or rephrase sentences instead
- Use clear, professional board-level language

CRITICAL QUALITY REQUIREMENTS:
- Strategic rationale must explicitly connect to stated priorities
- Advantages and risks must be substantive and specific
- Risk assessments must be honest and justified
- Implementation risks must be actionable and realistic

Always return valid JSON.`,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    { temperature: 0.6, maxTokens: 6000 }
  );

  const data = parseAIJSON<TwoPathsResult>(response.content);

  return data;
}
