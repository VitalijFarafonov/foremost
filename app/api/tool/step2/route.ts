// Step 2: Display Use Cases API
// This step simply returns the use cases that were already generated in Step 1
// No AI generation needed - just pass through the cached data

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { twoPaths } = body;

        if (!twoPaths) {
            return NextResponse.json(
                { success: false, error: 'Use cases data is required' },
                { status: 400 }
            );
        }

        console.log(`[Step 2] Returning cached use cases`);

        // Simply return the use cases that were generated in Step 1
        return NextResponse.json({
            success: true,
            data: twoPaths,
        });
    } catch (error) {
        console.error('[Step 2] Error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to retrieve use cases',
            },
            { status: 500 }
        );
    }
}
