// Use case implications service - analyzes what use cases imply about strategic priorities

import { callAI, parseAIJSON } from './aiClient';
import type { TwoPathsResult, StrategicPriority } from '@/lib/tool/types';

export async function analyzeUseCaseImplications(
  useCases: TwoPathsResult,
  industry: string,
  companyName: string
): Promise<StrategicPriority[]> {
  console.log(`[UseCaseImplications] Analyzing what use cases imply about strategy`);

  // Extract use case titles and descriptions for context
  const allUseCases = [...useCases.reimagination, ...useCases.efficiency];
  const useCaseSummary = allUseCases.map(uc => `- [${uc.id}] ${uc.title}: ${uc.description}`).join('\n');

  const prompt = `You are a senior business strategy consultant. Analyze these AI use cases to infer what strategic priorities they imply.

**AI Use Cases Being Explored:**
${useCaseSummary}

**Company Context:**
Company: ${companyName}
Industry: ${industry}

**Task:**
Based on these AI use cases, infer the 2-3 strategic business priorities that would logically justify pursuing these initiatives. What do these use cases tell us about what the company is trying to achieve?

**Common Strategic Priorities to Consider:**
- Cost reduction and operational efficiency
- Revenue growth and market expansion
- Customer experience improvement
- Digital transformation and modernization
- Competitive differentiation
- Risk management and compliance
- Workforce productivity and talent optimization

**Output Format (JSON only):**
{
  "priorities": [
    {
      "priority": "Strategic priority title (e.g., 'Operational Efficiency and Cost Reduction')",
      "rationale": "2-3 sentences explaining why this priority is implied by the use cases",
      "confidence": "high" | "medium" | "low",
      "evidence": [
        {
          "point": "Specific observation about the use cases (e.g., '3 of 4 efficiency use cases focus on cost reduction')",
          "source": "Use case analysis",
          "url": "Not available",
          "date": "Not specified",
          "evidenceSource": "use_cases"
        }
      ],
      "linkedUseCases": ["uc-r1", "uc-e2"]
    }
  ]
}

**Guidelines:**
- Limit to 2-3 priorities maximum
- Each priority should be linked to specific use cases (use the use case IDs)
- Confidence levels:
  * "high" = Multiple use cases strongly support this priority
  * "medium" = Some use cases suggest this priority
  * "low" = Weak signal from use cases
- Provide 2-3 evidence points per priority
- Evidence should describe patterns in the use cases (e.g., "majority focus on X", "reimagination path emphasizes Y")
- **All evidence must have evidenceSource: "use_cases"**
- Link each priority to the specific use case IDs that support it

Return ONLY valid JSON.`;

  const response = await callAI(
    [
      {
        role: 'system',
        content: `You are a senior business strategy consultant who analyzes AI use cases to infer strategic priorities.

CRITICAL LANGUAGE REQUIREMENTS:
- Use BRITISH ENGLISH spelling throughout (e.g., "organisation" not "organization", "optimise" not "optimize", "analyse" not "analyze")
- NEVER use em dashes (—). Use colons (:), semicolons (;), or rephrase sentences instead
- Use clear, professional business language

Always return valid JSON.`,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    { temperature: 0.6, maxTokens: 2500 }
  );

  const data = parseAIJSON<{ priorities: StrategicPriority[] }>(response.content);

  return data.priorities;
}
