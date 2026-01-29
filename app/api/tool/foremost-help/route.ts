// API endpoint to generate "How Foremost Can Help" for a specific use case
import { NextRequest, NextResponse } from 'next/server';
import { callAI, parseAIJSON } from '@/lib/tool/services/aiClient';
import { PILLARS, SERVICES, HOW_WE_WORK } from '@/lib/content';
import type { UseCase } from '@/lib/tool/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    try {
        const { useCase } = await request.json() as { useCase: UseCase };

        if (!useCase) {
            return NextResponse.json(
                { error: 'Use case is required' },
                { status: 400 }
            );
        }

        // Build context about Foremost's pillars and services
        const pillarContext = PILLARS.map(p =>
            `${p.title}: ${p.description}\nForemost thinking: "${p.foremostThinking}"`
        ).join('\n\n');

        const serviceContext = SERVICES.map(s => {
            const serviceList = s.services.map(svc => `- ${svc.title}: ${svc.description}`).join('\n');
            return `${s.title}:\n${serviceList}`;
        }).join('\n\n');

        // Add How We Work philosophy
        const howWeWorkContext = HOW_WE_WORK.map(h =>
            `${h.title}: ${h.content}`
        ).join('\n\n');

        const prompt = `Given this AI use case, explain in ONE short paragraph how Foremost would approach it.

USE CASE: ${useCase.title}
${useCase.description}

KEY CONSIDERATIONS:
- Advantages: ${useCase.advantages?.slice(0, 2).join('; ') || 'None'}
- Risks: ${useCase.risks?.slice(0, 2).join('; ') || 'None'}
- Unknowns: ${useCase.uncertainties?.slice(0, 2).join('; ') || 'None'}

FOREMOST'S RELEVANT CAPABILITIES:
${pillarContext}

Write ONE paragraph (3-4 sentences max) that:
1. Explains what Foremost would actually DO (be concrete, not vague)
2. Acknowledges what needs to be figured out first
3. Varies the opening; do NOT start with "The challenge" or "The key challenge"

Return JSON: { "foremostHelp": "..." }`;

        const response = await callAI(
            [
                {
                    role: 'system',
                    content: `You are a partner at a leading AI advisory firm. You have 20+ years in technology strategy and have seen dozens of AI implementations succeed and fail.

WRITING STYLE:
- Direct and specific; no waffle
- Say what you would actually do, not what sounds impressive
- One short paragraph only
- British English spelling
- Vary your openings; never start with "The challenge" or similar

BANNED WORDS (never use these):
journey, transformation, transformative, leverage, synergy, holistic, seamless, cutting-edge, revolutionary, empower, unlock, elevate, reimagine, paradigm, ecosystem, stakeholder, alignment, enable, drive value, best-in-class, world-class, state-of-the-art


Return valid JSON only.`,
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            { temperature: 0.4, maxTokens: 500 }
        );

        const data = parseAIJSON<{ foremostHelp: string }>(response.content);

        return NextResponse.json({
            success: true,
            foremostHelp: data.foremostHelp,
        });
    } catch (error) {
        console.error('[Foremost Help API] Error:', error);
        return NextResponse.json(
            { error: 'Failed to generate Foremost help' },
            { status: 500 }
        );
    }
}
