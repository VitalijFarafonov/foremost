// Capability mapper - generates data/governance requirements for use cases

import { callAI, parseAIJSON } from './aiClient';
import type { UseCase, CapabilitiesResult, Capability } from '@/lib/tool/types';

export async function generateCapabilities(useCases: UseCase[]): Promise<CapabilitiesResult> {
  console.log(`[CapabilityMapper] Generating capabilities for ${useCases.length} use cases`);

  const useCaseDescriptions = useCases
    .map((uc) => `${uc.id}: ${uc.title} - ${uc.description}`)
    .join('\n');

  const prompt = `You are a technical capability analyst. For each use case, identify the data prerequisites and governance requirements.

Use Cases:
${useCaseDescriptions}

Generate capabilities in JSON format:
{
  "capabilities": [
    {
      "useCaseId": "uc-r1",
      "category": "Capability category (e.g., Natural Language Processing, Computer Vision, Predictive Analytics)",
      "dataPrerequisites": [
        "Specific data requirement 1",
        "Specific data requirement 2",
        "Specific data requirement 3"
      ],
      "riskLevel": "low" | "medium" | "high",
      "governanceRequirements": [
        "Governance requirement 1",
        "Governance requirement 2"
      ],
      "humanInTheLoop": true | false
    }
  ]
}

Risk levels:
- "low": Internal data, no customer impact
- "medium": Customer-facing but non-critical
- "high": High-stakes decisions, regulatory implications, or sensitive data

Governance requirements should be specific to the risk level:
- Low: Basic monitoring and audit trails
- Medium: Bias testing, validation protocols, escalation paths
- High: Strict oversight, regulatory compliance, external audit

Return ONLY valid JSON.`;

  const response = await callAI(
    [
      {
        role: 'system',
        content: `You are a technical capability analyst who maps AI use cases to data and governance requirements.

CRITICAL LANGUAGE REQUIREMENTS:
- Use BRITISH ENGLISH spelling throughout (e.g., "organisation" not "organization", "analyse" not "analyze")
- NEVER use em dashes (—). Use colons (:), semicolons (;), or rephrase sentences instead

Always return valid JSON.`,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    { temperature: 0.4, maxTokens: 3000 }
  );

  const data = parseAIJSON<{ capabilities: Capability[] }>(response.content);

  return data;
}
