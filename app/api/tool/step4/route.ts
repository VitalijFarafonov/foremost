// Step 4: Decision Lens API
// Called when user clicks "Next" on market signals step
// Generates strategic decision questions for board discussion

import { NextRequest, NextResponse } from 'next/server';
import { generateDecisionQuestions } from '@/lib/tool/services/questionGenerator';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { strategicInference, useCases } = body;

        if (!strategicInference || !useCases) {
            return NextResponse.json(
                { success: false, error: 'Strategic inference and use cases data are required' },
                { status: 400 }
            );
        }

        console.log(`[Step 4] Generating decision questions`);

        const result = await generateDecisionQuestions(strategicInference, useCases);

        return NextResponse.json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.error('[Step 4] Error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to generate decision questions',
            },
            { status: 500 }
        );
    }
}

