// Step 5: Question Generation API
// Called when user clicks "Next" on capabilities step

import { NextRequest, NextResponse } from 'next/server';
import { generateDecisionQuestions } from '@/lib/tool/services/questionGenerator';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { strategicInference, useCases, role } = body;

        if (!strategicInference || !useCases) {
            return NextResponse.json(
                { success: false, error: 'Strategic inference and use cases are required' },
                { status: 400 }
            );
        }

        console.log(`[Step 5] Generating questions for ${role || 'executive'} audience`);

        const result = await generateDecisionQuestions(strategicInference, useCases, role);

        return NextResponse.json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.error('[Step 5] Error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to generate questions',
            },
            { status: 500 }
        );
    }
}
