// Strategic inference service - analyzes company directly (no use case dependency)
// Uses competitor insights from grounded research to improve priority inference

import { callAI, parseAIJSON } from './aiClient';
import type { CompanyData } from './companyAnalyzer';
import type { StrategicPriority, StrategicInferenceResult } from '@/lib/tool/types';

export async function generateStrategicInference(
  companyData: CompanyData,
  companyName: string,
  industry?: string
): Promise<StrategicInferenceResult> {
  console.log(`[StrategicInference] Analyzing company: ${companyName}`);
  console.log(`[StrategicInference] Competitor insights available: ${companyData.competitors?.length || 0}`);

  // Get current date for context
  const currentDate = new Date().toISOString().split('T')[0];

  // Build competitor context if available
  const competitorContext = companyData.competitors && companyData.competitors.length > 0
    ? `**Competitor Intelligence:**
${companyData.competitors.map(c => `- ${c.name}: ${c.strategicFocus}`).join('\n')}

Use this competitive context to understand what strategic priorities ${companyName} likely needs to focus on to remain competitive.`
    : '';

  const prompt = `You are a senior business strategy consultant presenting to the BOARD of ${companyName}.

**CONTEXT (Today: ${currentDate})**

Company: ${companyName}
Website: ${companyData.url}
Industry: ${industry || companyData.industry || 'Not specified'}
Description: ${companyData.description || 'Not available'}
Key Themes: ${companyData.keyThemes?.join(', ') || 'Not available'}
Recent Initiatives: ${companyData.recentInitiatives?.join('; ') || 'Not available'}

${competitorContext}

**TASK**
Infer the top 2-3 strategic business priorities the board is likely focused on.

**KEY REQUIREMENT**
For each priority, provide a STRATEGIC RATIONALE that:
- Explains WHY this specific priority likely applies to THIS company
- Connects to INDUSTRY TRENDS and market dynamics (do NOT name specific competitors)
- Is DIRECTLY RELEVANT to the priority it accompanies

**RATIONALE LENGTH BY CONFIDENCE:**
- HIGH confidence: 3-4 sentences with rich context
- MEDIUM confidence: 2-3 sentences with reasonable explanation  
- LOW confidence: 1-2 sentences acknowledging the inference is based on typical industry patterns

**TONE (Critical):**
- Use PLAIN ENGLISH; avoid jargon and buzzwords
- Write in a quietly confident, advisory style
- Be direct and clear; say what you mean
- Sound like a trusted adviser, not a consultant deck

**CRITICAL INSTRUCTION:**
- Do NOT name competitors in the rationale
- Refer to "industry trends", "sector dynamics", "market pressures" instead
- Each rationale must clearly connect to ITS specific priority

**OUTPUT FORMAT (JSON only):**
{
  "priorities": [
    {
      "priority": "Strategic priority title",
      "rationale": "Direct, plain-English explanation of why this priority applies. Length varies by confidence.",
      "confidence": "high" | "medium" | "low"
    }
  ]
}

**GUIDELINES**
- Limit to 2-3 priorities maximum
- Use probabilistic language where appropriate ("likely", "appears to", "suggests")
- Confidence: "high" = strong signals, "medium" = reasonable inference, "low" = industry-typical assumption
- Use BRITISH ENGLISH spelling

Return ONLY valid JSON.`;


  const response = await callAI(
    [
      {
        role: 'system',
        content: `You are a senior business strategy consultant presenting strategic analysis to company boards.

CRITICAL LANGUAGE REQUIREMENTS:
- Use BRITISH ENGLISH spelling throughout (e.g., "organisation" not "organization", "prioritise" not "prioritize", "analyse" not "analyze")
- NEVER use em dashes (—). Use colons (:), semicolons (;), or rephrase sentences instead
- Write in a confident, advisory tone suitable for board-level audiences

Your job is to infer strategic priorities and explain your reasoning in strategic, board-level language. Do not cite specific sources or websites.

Always return valid JSON.`,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    { temperature: 0.6, maxTokens: 2000 }
  );

  const data = parseAIJSON<{ priorities: StrategicPriority[] }>(response.content);

  // Ensure each priority has an empty evidence array for type compatibility
  const priorities = data.priorities.map(p => ({
    ...p,
    evidence: p.evidence || []
  }));

  return {
    priorities,
    disclaimer: 'This analysis is based on publicly available information and represents an inferred view of your strategic priorities. It should be validated against your internal strategy.'
  };
}


