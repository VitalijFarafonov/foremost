// Step 6: Pillar Mapping API
// Called when user clicks "Next" on decision lens step

import { NextRequest, NextResponse } from 'next/server';
import { generateForemostFit } from '@/lib/tool/services/pillarMapper';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { useCases, capabilities, strategicInference } = body;

        if (!useCases || !strategicInference) {
            return NextResponse.json(
                { success: false, error: 'Use cases and strategic inference are required' },
                { status: 400 }
            );
        }

        console.log(`[Step 6] Mapping to Foremost pillars`);

        const allUseCases = [...useCases.reimagination, ...useCases.efficiency];
        const result = await generateForemostFit(
            allUseCases,
            capabilities?.capabilities || [],
            strategicInference
        );

        return NextResponse.json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.error('[Step 6] Error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to map to pillars',
            },
            { status: 500 }
        );
    }
}
