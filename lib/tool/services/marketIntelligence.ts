// Market intelligence service - generates competitor AI signals with search grounding
// Uses Gemini's Google Search grounding to verify claims against real sources

import { callAIWithGrounding, parseAIJSON } from './aiClient';
import type { MarketSignalsResult, MarketSignal, GroundingSource, CompetitorInsight } from '@/lib/tool/types';

export async function generateMarketSignals(
    industry: string,
    strategicPriorities: string[],
    companyName?: string,
    companyIndustry?: string, // Detailed industry from company analysis
    competitors?: CompetitorInsight[] // Actual competitors identified in company analysis
): Promise<MarketSignalsResult> {
    // Use the detailed company industry if available, otherwise fall back to user input
    const targetIndustry = companyIndustry || industry;
    console.log(`[MarketIntelligence] Generating GROUNDED signals for ${targetIndustry}`);
    console.log(`[MarketIntelligence] Using ${competitors?.length || 0} identified competitors`);

    // Get current date for context
    const currentDate = new Date().toISOString().split('T')[0];
    const currentYear = new Date().getFullYear();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(currentYear - 1);
    const minDate = oneYearAgo.toISOString().split('T')[0];

    const prioritiesContext = strategicPriorities.join('; ');

    // Single clear exclusion statement - post-processing filter is the reliable check
    const excludeClause = companyName
        ? `\n**EXCLUSION:** This research is for ${companyName}. Do not include ${companyName} or its subsidiaries. We want competitor initiatives only.`
        : '';

    // Build competitor-aware prompt - use competitors as examples, not limits
    const competitorList = competitors && competitors.length > 0
        ? competitors.map(c => c.name).join(', ')
        : null;

    const competitorContext = competitorList
        ? `Companies to research: ${competitorList} (and similar ${targetIndustry} companies).`
        : `Research leading ${targetIndustry} companies.`;

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
      "source": "Source name",
      "date": "YYYY-MM"
    }
  ]
}

Return ONLY JSON. If you cannot find examples of companies using AI in their own operations, return fewer signals rather than including irrelevant content.`;


    try {
        // Use grounded search to verify claims
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

        // Parse the JSON response
        let signals: MarketSignal[] = [];
        try {
            const data = parseAIJSON<{ signals: MarketSignal[] }>(response.content);
            signals = data.signals || [];
        } catch (parseError) {
            console.error('[MarketIntelligence] Failed to parse grounded response, extracting signals manually');
            // Try to extract any signals from the response
            signals = [];
        }

        // Post-processing: Filter out any signals that mention the target company
        // This is a safety net in case the AI includes the company despite instructions
        if (companyName) {
            const companyNameLower = companyName.toLowerCase();
            const originalCount = signals.length;
            signals = signals.filter(signal => {
                const signalCompanyLower = signal.company.toLowerCase();
                // Check if the signal company matches or contains the target company name
                const isExcluded = signalCompanyLower.includes(companyNameLower) ||
                    companyNameLower.includes(signalCompanyLower);
                if (isExcluded) {
                    console.log(`[MarketIntelligence] Filtered out signal from ${signal.company} (matches target company ${companyName})`);
                }
                return !isExcluded;
            });
            if (originalCount !== signals.length) {
                console.log(`[MarketIntelligence] Filtered ${originalCount - signals.length} signals that referenced the target company`);
            }
        }

        // Extract sources from grounding metadata
        const sources: GroundingSource[] = response.sources || [];

        console.log(`[MarketIntelligence] Got ${signals.length} signals with ${sources.length} verified sources`);

        return {
            signals,
            disclaimer: sources.length > 0
                ? `These market signals are grounded in Google Search results and verified against ${sources.length} sources.`
                : 'Note: These signals are based on AI knowledge and should be verified independently.',
            sources,
            isGrounded: sources.length > 0,
        };
    } catch (error) {
        console.error('[MarketIntelligence] Grounded search failed:', error);

        // Return empty result with appropriate disclaimer
        return {
            signals: [],
            disclaimer: 'Unable to retrieve verified market signals at this time. Please try again later.',
            sources: [],
            isGrounded: false,
        };
    }
}

