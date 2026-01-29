// Step 1: Strategy-First Analysis API
// Flow: Scrape website → Analyze company → Generate strategy-aligned use cases → Validate/enrich strategy

import { NextRequest, NextResponse } from 'next/server';
import { analyzeCompany } from '@/lib/tool/services/companyAnalyzer';
import { generateHybridStrategicInference } from '@/lib/tool/services/hybridStrategyInference';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { companyName, companyUrl, industry } = body;

        if (!companyUrl) {
            return NextResponse.json(
                { success: false, error: 'Company URL is required' },
                { status: 400 }
            );
        }

        console.log(`[Step 1] Running strategy-first analysis for: ${companyUrl}`);

        // Ensure URL has protocol
        let fullUrl = companyUrl;
        if (!fullUrl.startsWith('http://') && !fullUrl.startsWith('https://')) {
            fullUrl = `https://${fullUrl}`;
        }

        // Step 1: Scrape and analyze the company website
        console.log('[Step 1] Scraping and analyzing company website...');
        const companyData = await analyzeCompany(fullUrl);

        // Override industry if user provided one
        if (industry) {
            companyData.industry = industry;
        }

        // Override company name if user provided one
        if (companyName) {
            companyData.companyName = companyName;
        }

        console.log('[Step 1] Company data extracted:', {
            name: companyData.companyName,
            industry: companyData.industry,
            themes: companyData.keyThemes.length,
            initiatives: companyData.recentInitiatives.length,
        });

        // Step 2: Run hybrid strategy inference (strategy-first flow)
        // 1. Analyze company → strategic priorities
        // 2. Generate use cases aligned with those priorities
        // 3. Validate/enrich priorities with use case implications
        const { strategicInference, useCases } = await generateHybridStrategicInference(
            companyData,
            companyData.companyName,
            companyData.industry
        );

        // Return strategic inference, use cases, AND companyData (for industry)
        return NextResponse.json({
            success: true,
            data: {
                strategicInference,
                twoPaths: useCases,
                companyData, // Include extracted company data for Step 3
            },
        });
    } catch (error) {
        console.error('[Step 1] Error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to generate analysis',
            },
            { status: 500 }
        );
    }
}
