// Step 3 Streaming API - Market Intelligence
// This is the third phase - triggered when user clicks "Next" on Two Paths step

import { NextRequest } from 'next/server';
import { formatSSE, ANALYSIS_STAGES, type StreamEvent } from '@/lib/tool/services/streamingTypes';
import { callAIWithGrounding, parseAIJSON } from '@/lib/tool/services/aiClient';
import type { MarketSignalsResult, MarketSignal, GroundingSource, CompetitorInsight } from '@/lib/tool/types';

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
                const { industry, strategicInference, companyName, companyIndustry, competitors } = body as {
                    industry: string;
                    strategicInference: { priorities: { priority: string }[] };
                    companyName?: string;
                    companyIndustry?: string;
                    competitors?: CompetitorInsight[];
                };

                if (!strategicInference) {
                    send({ type: 'error', error: 'Strategic inference data is required' });
                    controller.close();
                    return;
                }

                // ========== STAGE: Market Intelligence ==========
                send({
                    type: 'stage_update',
                    stage: ANALYSIS_STAGES.MARKET_INTELLIGENCE.name,
                    stageDescription: ANALYSIS_STAGES.MARKET_INTELLIGENCE.description,
                });

                const targetIndustry = companyIndustry || industry;
                const strategicPriorities = strategicInference.priorities.map((p) => p.priority);
                const prioritiesContext = strategicPriorities.join('; ');

                // Build competitor-aware prompt
                const competitorList = competitors && competitors.length > 0
                    ? competitors.map(c => c.name).join(', ')
                    : null;

                const competitorContext = competitorList
                    ? `Companies to research: ${competitorList} (and similar ${targetIndustry} companies).`
                    : `Research leading ${targetIndustry} companies.`;

                const currentDate = new Date().toISOString().split('T')[0];
                const currentYear = new Date().getFullYear();
                const oneYearAgo = new Date();
                oneYearAgo.setFullYear(currentYear - 1);
                const minDate = oneYearAgo.toISOString().split('T')[0];

                const excludeClause = companyName
                    ? `\n**EXCLUSION:** This research is for ${companyName}. Do not include ${companyName} or its subsidiaries. We want competitor initiatives only.`
                    : '';

                const prompt = `Find 3-5 examples of ${targetIndustry} companies deploying AI to improve their OWN internal operations (since ${minDate}).${excludeClause}

${competitorContext}

**THE KEY QUESTION:** How is each company using AI to run THEIR OWN BUSINESS better?

Examples of what we WANT:
- "Blackstone uses AI to analyse deal flow and identify investment opportunities"
- "Goldman Sachs deployed AI for internal risk assessment"
- "Deutsche Bank uses machine learning to automate compliance checks"

Examples of what we DO NOT WANT:
- Their portfolio companies using AI (that's the portfolio, not them)
- Investments they made in AI startups (that's investing, not using)
- Their views or predictions about AI trends (that's commentary, not deployment)
- AI infrastructure they're building for others (that's a product, not internal use)
- Reports about AI adoption in their industry (that's research, not a specific company)

**JSON OUTPUT:**
{
  "signals": [
    {
      "company": "Company name",
      "country": "Country code",
      "industry": "${targetIndustry}",
      "initiative": "How they use AI in their own operations (1-2 sentences)",
      "source": "https://example.com/full-url-to-source-article",
      "date": "YYYY-MM"
    }
  ]
}

IMPORTANT: The "source" field MUST be a complete, valid URL (starting with https://) to the article or webpage where you found this information. Do not just put the publication name.

Return ONLY JSON. If you cannot find examples of companies using AI in their own operations, return fewer signals rather than including irrelevant content.`;

                send({
                    type: 'prompt_snippet',
                    promptSnippet: prompt,
                });

                const response = await callAIWithGrounding(
                    [
                        {
                            role: 'system',
                            content: `You find examples of companies using AI in their OWN business operations.

CRITICAL DISTINCTION:
- CORRECT: How the company uses AI to run their own business (deal sourcing, operations, compliance, analytics)
- WRONG: AI used by their portfolio companies, subsidiaries, or investments
- WRONG: AI products or infrastructure they sell to others
- WRONG: Their opinions, predictions, or views about AI
- WRONG: Industry reports or surveys about AI adoption

Use British English. No em dashes.`,
                        },
                        {
                            role: 'user',
                            content: prompt,
                        },
                    ],
                    { temperature: 0.3, maxTokens: 2500 }
                );

                send({
                    type: 'response_snippet',
                    responseSnippet: response.content,
                });

                // Parse the JSON response
                let signals: MarketSignal[] = [];
                try {
                    const data = parseAIJSON<{ signals: MarketSignal[] }>(response.content);
                    signals = data.signals || [];
                } catch (parseError) {
                    console.error('[Step3-Stream] Failed to parse grounded response, extracting signals manually');
                    signals = [];
                }

                // Post-processing: Filter out any signals that mention the target company
                if (companyName) {
                    const companyNameLower = companyName.toLowerCase();
                    const originalCount = signals.length;
                    signals = signals.filter(signal => {
                        const signalCompanyLower = signal.company.toLowerCase();
                        const isExcluded = signalCompanyLower.includes(companyNameLower) ||
                            companyNameLower.includes(signalCompanyLower);
                        if (isExcluded) {
                            console.log(`[Step3-Stream] Filtered out signal from ${signal.company} (matches target company ${companyName})`);
                        }
                        return !isExcluded;
                    });
                    if (originalCount !== signals.length) {
                        console.log(`[Step3-Stream] Filtered ${originalCount - signals.length} signals that referenced the target company`);
                    }
                }

                // Extract sources from grounding metadata
                const sources: GroundingSource[] = response.sources || [];

                console.log(`[Step3-Stream] Got ${signals.length} signals with ${sources.length} verified sources`);

                const marketSignals: MarketSignalsResult = {
                    signals,
                    disclaimer: sources.length > 0
                        ? `These market signals are grounded in Google Search results and verified against ${sources.length} sources.`
                        : 'Note: These signals are based on AI knowledge and should be verified independently.',
                    sources,
                    isGrounded: sources.length > 0,
                };

                // ========== COMPLETE ==========
                send({
                    type: 'complete',
                    data: { marketSignals },
                });

                controller.close();
            } catch (error) {
                console.error('[Step3-Stream] Error:', error);
                send({
                    type: 'error',
                    error: error instanceof Error ? error.message : 'Market intelligence failed',
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
