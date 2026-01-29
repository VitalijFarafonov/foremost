import { NextRequest, NextResponse } from 'next/server';
import type { AnalysisRequest, AnalysisResult } from '@/lib/tool/types';
import { analyzeCompany } from '@/lib/tool/services/companyAnalyzer';
import { generateStrategicInference } from '@/lib/tool/services/strategicInference';
import { generateUseCases } from '@/lib/tool/services/useCaseGenerator';
import { generateMarketSignals } from '@/lib/tool/services/marketIntelligence';
import { generateCapabilities } from '@/lib/tool/services/capabilityMapper';
import { generateDecisionQuestions } from '@/lib/tool/services/questionGenerator';
import { generateForemostFit } from '@/lib/tool/services/pillarMapper';

// Simple in-memory rate limiting (for production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const limit = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '10');
    const window = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '3600000'); // 1 hour

    const record = rateLimitMap.get(ip);

    if (!record || now > record.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + window });
        return true;
    }

    if (record.count >= limit) {
        return false;
    }

    record.count++;
    return true;
}

export async function POST(request: NextRequest) {
    try {
        // Get IP for rate limiting
        const ip = request.headers.get('x-forwarded-for') || 'unknown';

        // Check rate limit
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { success: false, error: 'Rate limit exceeded. Please try again later.' },
                { status: 429 }
            );
        }

        // Parse request body
        const body: AnalysisRequest = await request.json();
        const { input, email } = body;

        // Validate input
        if (!input.companyUrl) {
            return NextResponse.json(
                { success: false, error: 'Company URL is required' },
                { status: 400 }
            );
        }

        // Validate URL format
        try {
            new URL(input.companyUrl);
        } catch {
            return NextResponse.json(
                { success: false, error: 'Invalid URL format' },
                { status: 400 }
            );
        }

        console.log(`[Tool] Analyzing company: ${input.companyUrl}`);

        // Step 1: Analyze company website
        const companyData = await analyzeCompany(input.companyUrl);

        // Step 2: Generate strategic inference
        const strategicInference = await generateStrategicInference(
            companyData,
            companyData.companyName, // Use AI-extracted name
            input.industry
        );

        // Step 3: Generate use cases
        const twoPaths = await generateUseCases(
            companyData,
            strategicInference.priorities.map(p => p.priority),
            input.industry
        );

        // Step 4: Generate market signals
        const marketSignals = await generateMarketSignals(
            input.industry || companyData.industry,
            strategicInference.priorities.map(p => p.priority),
            companyData.companyName,
            companyData.industry
        );

        // Step 5: Generate capabilities
        const capabilities = await generateCapabilities(
            [...twoPaths.reimagination, ...twoPaths.efficiency]
        );

        // Step 6: Generate decision questions
        const decisionLens = await generateDecisionQuestions(
            strategicInference,
            twoPaths,
            input.role
        );

        // Step 7: Generate Foremost Fit
        const foremostFit = await generateForemostFit(
            [...twoPaths.reimagination, ...twoPaths.efficiency],
            capabilities.capabilities,
            strategicInference
        );

        // Construct complete analysis result
        const analysisId = `analysis-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const result: AnalysisResult = {
            input,
            strategicInference,
            twoPaths,
            marketSignals,
            capabilities,
            decisionLens,
            foremostFit,
            generatedAt: new Date().toISOString(),
            analysisId,
        };

        // TODO: Store analysis in database
        // TODO: Send email if requested
        // TODO: Notify admin

        console.log(`[Tool] Analysis complete: ${analysisId}`);

        return NextResponse.json({
            success: true,
            data: result,
        });

    } catch (error) {
        console.error('[Tool] Analysis error:', error);

        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Analysis failed. Please try again.',
            },
            { status: 500 }
        );
    }
}
