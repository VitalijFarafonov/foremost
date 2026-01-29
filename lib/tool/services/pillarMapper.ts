// Pillar mapper - maps use cases to Foremost's four pillars and generates discussion summaries
// Always includes all 4 pillars with AI-generated discussion points

import { callAI, parseAIJSON } from './aiClient';
import { PILLARS, SERVICES } from '@/lib/content';
import type {
    UseCase,
    Capability,
    StrategicInferenceResult,
    ForemostFitResult,
    PillarFit,
} from '@/lib/tool/types';

/**
 * Pre-assign use cases to pillars based on their characteristics
 */
function preAssignUseCasesToPillars(
    useCases: UseCase[],
    capabilities: Capability[]
): Map<string, string[]> {
    const pillarMappings = new Map<string, string[]>([
        ['Strategic Clarity', []],
        ['Applied Intelligence', []],
        ['Human Potential & Imagination', []],
        ['Governance as Enabler', []],
    ]);

    for (const uc of useCases) {
        const capability = capabilities.find((c) => c.useCaseId === uc.id);
        const isHighRisk = capability?.riskLevel === 'high';
        const hasOrganizationalTags = uc.tags?.some(
            (tag) => tag.includes('organizational') || tag.includes('workforce') || tag.includes('change')
        );

        // Pre-assignment rules:
        if (isHighRisk) {
            pillarMappings.get('Governance as Enabler')!.push(uc.id);
        } else if (hasOrganizationalTags) {
            pillarMappings.get('Human Potential & Imagination')!.push(uc.id);
        } else {
            pillarMappings.get('Applied Intelligence')!.push(uc.id);
        }
    }

    // Include at least one use case in Strategic Clarity
    const reimaginationUseCase = useCases.find(
        (uc) =>
            uc.path === 'reimagination' &&
            !pillarMappings.get('Governance as Enabler')!.includes(uc.id)
    );
    if (reimaginationUseCase) {
        const aiMappings = pillarMappings.get('Applied Intelligence')!;
        const idx = aiMappings.indexOf(reimaginationUseCase.id);
        if (idx > -1) {
            aiMappings.splice(idx, 1);
        }
        pillarMappings.get('Strategic Clarity')!.push(reimaginationUseCase.id);
    }

    return pillarMappings;
}

export async function generateForemostFit(
    useCases: UseCase[],
    capabilities: Capability[],
    strategicInference: StrategicInferenceResult
): Promise<ForemostFitResult> {
    console.log(`[PillarMapper] Generating Foremost Fit for ${useCases.length} use cases`);

    // Pre-assign use cases to pillars
    const preAssignedMappings = preAssignUseCasesToPillars(useCases, capabilities);

    // Prepare pillar and service information for AI
    const pillarServiceInfo = SERVICES.map((s) => {
        const serviceList = s.services.map((svc) => svc.title).join(', ');
        return `${s.title}: ${s.tagline}\nServices: ${serviceList}`;
    }).join('\n\n');

    // Prepare strategic context
    const strategicContext = strategicInference.priorities
        .map((p) => p.priority)
        .join('; ');

    // Prepare use case context
    const useCaseContext = useCases
        .map((uc) => `- ${uc.title}: ${uc.description}`)
        .join('\n');

    // Ask AI to generate discussion summaries for each pillar
    const prompt = `You are generating personalised discussion points for how Foremost can help a client.

FOREMOST'S FOUR PILLARS AND THEIR CAPABILITIES:
${pillarServiceInfo}

CLIENT'S STRATEGIC PRIORITIES:
${strategicContext}

CLIENT'S AI USE CASES BEING CONSIDERED:
${useCaseContext}

For EACH of the four pillars, generate a discussion summary (2-3 sentences) that:
1. Explains how Foremost can specifically help this client under this pillar
2. References capabilities naturally in lowercase (e.g., "help you assess AI readiness and constraints" not "AI Readiness & Constraints Diagnostic")
3. Connects to their use cases and strategic priorities where relevant

SPECIAL GUIDANCE FOR HUMAN POTENTIAL & IMAGINATION:
This pillar MUST address how Foremost helps with:
- Understanding and addressing staff anxiety about AI and job security
- Overcoming resistance to change and AI adoption
- Building capability through training and enablement programmes
- Ensuring people feel supported through the transition

Return JSON:
{
  "pillarDiscussions": [
    {
      "pillarName": "Strategic Clarity",
      "discussionSummary": "Given your priorities around [specific priorities], Foremost can help you establish clear strategic positioning for AI, assess your readiness and constraints, and build the executive understanding needed to make confident decisions."
    },
    {
      "pillarName": "Applied Intelligence",
      "discussionSummary": "..."
    },
    {
      "pillarName": "Human Potential & Imagination",
      "discussionSummary": "..."
    },
    {
      "pillarName": "Governance as Enabler",
      "discussionSummary": "..."
    }
  ]
}

Return ONLY valid JSON.`;

    const response = await callAI(
        [
            {
                role: 'system',
                content: `You are a top-tier strategy consultant with extensive experience advising boards and C-suite executives on AI transformation. You have led dozens of enterprise AI initiatives across industries and understand both the strategic and practical challenges organisations face.

Your output must be board-level: confident, precise, and focused on strategic value rather than technical detail. Write as a trusted advisor speaking to senior executives.

CRITICAL LANGUAGE REQUIREMENTS:
- Use BRITISH ENGLISH spelling throughout (e.g., "organisation" not "organization", "prioritise" not "prioritize")
- NEVER use em dashes (—). Use colons (:), semicolons (;), or rephrase sentences instead
- Write in a confident, advisory tone suitable for board-level discussions

Always return valid JSON.`,
            },
            {
                role: 'user',
                content: prompt,
            },
        ],
        { temperature: 0.5, maxTokens: 2000 }
    );

    const data = parseAIJSON<{
        pillarDiscussions: Array<{ pillarName: string; discussionSummary: string }>;
    }>(response.content);

    // Build pillar fits - ALWAYS include all 4 pillars
    const pillars: PillarFit[] = [];

    for (const pillar of PILLARS) {
        const useCaseIds = preAssignedMappings.get(pillar.title) || [];
        const relevantUseCases = useCases.filter((uc) => useCaseIds.includes(uc.id));
        const discussionObj = data.pillarDiscussions.find((d) => d.pillarName === pillar.title);

        // Get services for this pillar (for reference, but we'll show discussion summary instead)
        const serviceGroup = SERVICES.find((s) => s.title === pillar.title);
        const recommendedServices = serviceGroup
            ? serviceGroup.services.map((svc) => ({
                title: svc.title,
                description: svc.description,
                group: 'group' in svc ? svc.group : undefined,
            }))
            : [];

        pillars.push({
            pillarName: pillar.title,
            pillarDescription: pillar.description,
            foremostThinking: pillar.foremostThinking,
            relevantUseCases,
            recommendedServices,
            rationale: discussionObj?.discussionSummary || `Foremost can help you navigate ${pillar.title} challenges with our range of advisory services.`,
        });
    }

    return {
        pillars,
    };
}

