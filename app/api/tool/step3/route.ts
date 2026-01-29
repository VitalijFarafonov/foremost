// Step 3: Market Intelligence API
// Called when user clicks "Next" on use cases step

import { NextRequest, NextResponse } from 'next/server';
import { generateMarketSignals } from '@/lib/tool/services/marketIntelligence';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { industry, strategicInference, companyName, companyIndustry, competitors } = body;

        if (!strategicInference) {
            return NextResponse.json(
                { success: false, error: 'Strategic inference data is required' },
                { status: 400 }
            );
        }

        console.log(`[Step 3] Generating market signals for: ${companyIndustry || industry}`);
        console.log(`[Step 3] Company industry from analysis: ${companyIndustry}, User input: ${industry}`);
        console.log(`[Step 3] Competitors available: ${competitors?.length || 0}`);

        // Extract strategic priorities from strategic inference
        const strategicPriorities = strategicInference.priorities.map((p: any) => p.priority);

        const result = await generateMarketSignals(
            industry || 'Unknown',
            strategicPriorities,
            companyName,
            companyIndustry, // Pass the detailed industry from company analysis
            competitors // Pass competitor data for targeted research
        );

        console.log('[Step 3] Market signals result:', JSON.stringify(result, null, 2));
        console.log('[Step 3] Number of signals:', result.signals?.length || 0);

        return NextResponse.json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.error('[Step 3] Error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to generate market signals',
            },
            { status: 500 }
        );
    }
}
