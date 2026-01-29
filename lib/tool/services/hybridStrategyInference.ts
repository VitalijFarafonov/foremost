// Hybrid strategy inference - company strategy drives use cases, then validates/enriches

import { generateStrategicInference } from './strategicInference';
import { generateUseCases } from './useCaseGenerator';
import { analyzeUseCaseImplications } from './useCaseImplications';
import type { CompanyData } from './companyAnalyzer';
import type { TwoPathsResult, StrategicInferenceResult, StrategicPriority } from '@/lib/tool/types';

export async function generateHybridStrategicInference(
    companyData: CompanyData,
    companyName: string,
    industry?: string
): Promise<{ strategicInference: StrategicInferenceResult; useCases: TwoPathsResult }> {
    console.log(`[HybridStrategy] Generating strategy-first analysis for: ${companyName}`);

    // Step 1: Analyze company to get strategic priorities (PRIMARY SOURCE)
    console.log('[HybridStrategy] Step 1: Analyzing company strategy...');
    const companyPriorities = await generateStrategicInference(companyData, companyName, industry);

    // Step 2: Generate use cases aligned with those strategic priorities
    console.log('[HybridStrategy] Step 2: Generating strategy-aligned use cases...');
    const strategicPrioritiesText = companyPriorities.priorities.map(p => p.priority);
    const useCases = await generateUseCases(companyData, strategicPrioritiesText, industry);

    // Step 3: Analyze what the use cases imply (VALIDATION/ENRICHMENT)
    console.log('[HybridStrategy] Step 3: Validating strategy with use case implications...');
    const useCasePriorities = await analyzeUseCaseImplications(
        useCases,
        industry || companyData.industry || 'Unknown',
        companyName
    );

    // Step 4: Merge - enrich company priorities with use case validation
    console.log('[HybridStrategy] Step 4: Merging and enriching priorities...');
    const enrichedPriorities = enrichPriorities(companyPriorities.priorities, useCasePriorities);

    return {
        strategicInference: {
            priorities: enrichedPriorities,
            disclaimer:
                'This analysis is based on your company\'s public information, with AI use cases generated to support these priorities. Use case implications validate and enrich the strategic assessment.',
        },
        useCases,
    };
}

/**
 * Enrich company priorities with validation from use case implications
 * Company priorities are PRIMARY - use case analysis adds validation signal
 */
function enrichPriorities(
    companyPriorities: StrategicPriority[],
    useCasePriorities: StrategicPriority[]
): StrategicPriority[] {
    // For each company priority, check if use cases validate it
    return companyPriorities.slice(0, 3).map((companyPriority) => {
        // Find matching use case priority with graduated thresholds
        const matchScores = useCasePriorities.map((useCasePriority) => ({
            priority: useCasePriority,
            score: calculateSimilarity(companyPriority.priority, useCasePriority.priority),
        }));

        const bestMatch = matchScores.reduce((best, current) =>
            current.score > best.score ? current : best,
            { priority: null as StrategicPriority | null, score: 0 }
        );

        // Graduated validation: strong (>0.6), weak (>0.3), none
        const isStronglyValidated = bestMatch.score > 0.6;
        const isWeaklyValidated = bestMatch.score > 0.3;
        const isValidated = isStronglyValidated || isWeaklyValidated;

        // Find linked use case IDs if validated
        const linkedUseCases = isValidated
            ? matchScores
                .filter((m) => m.score > 0.3)
                .flatMap((m) => m.priority?.linkedUseCases || [])
            : [];

        return {
            ...companyPriority,
            validatedByUseCases: isValidated,
            linkedUseCases: linkedUseCases.length > 0 ? linkedUseCases : companyPriority.linkedUseCases,
        };
    });
}


/**
 * Calculate similarity between two priority strings
 * Uses keyword matching with synonym expansion for better semantic matching
 */
function calculateSimilarity(priority1: string, priority2: string): number {
    const keywords1 = extractKeywordsWithSynonyms(priority1);
    const keywords2 = extractKeywordsWithSynonyms(priority2);

    const intersection = keywords1.filter(k => keywords2.includes(k));
    const union = new Set([...keywords1, ...keywords2]);

    // Avoid division by zero
    if (union.size === 0) return 0;

    return intersection.length / union.size;
}

/**
 * Extract keywords from priority string with synonym expansion
 * Maps common business terms to canonical forms for better matching
 */
function extractKeywordsWithSynonyms(priority: string): string[] {
    const stopWords = ['and', 'or', 'the', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'with', 'through'];

    // Synonym groups - map related terms to a canonical form
    const synonymGroups: Record<string, string> = {
        // Cost/Efficiency group
        'cost': 'efficiency',
        'costs': 'efficiency',
        'expense': 'efficiency',
        'expenses': 'efficiency',
        'savings': 'efficiency',
        'efficiency': 'efficiency',
        'efficient': 'efficiency',
        'operational': 'efficiency',
        'optimisation': 'efficiency',
        'optimization': 'efficiency',
        'productivity': 'efficiency',
        'streamline': 'efficiency',
        'reduce': 'efficiency',
        'reduction': 'efficiency',
        // Growth/Revenue group
        'growth': 'growth',
        'revenue': 'growth',
        'sales': 'growth',
        'expand': 'growth',
        'expansion': 'growth',
        'market': 'growth',
        'acquisition': 'growth',
        // Customer group
        'customer': 'customer',
        'customers': 'customer',
        'client': 'customer',
        'clients': 'customer',
        'experience': 'customer',
        'satisfaction': 'customer',
        'service': 'customer',
        // Digital/Tech group
        'digital': 'digital',
        'technology': 'digital',
        'tech': 'digital',
        'transformation': 'digital',
        'modernisation': 'digital',
        'modernization': 'digital',
        'innovation': 'digital',
        // Risk group
        'risk': 'risk',
        'risks': 'risk',
        'compliance': 'risk',
        'governance': 'risk',
        'regulatory': 'risk',
        'security': 'risk',
        // Talent group
        'talent': 'talent',
        'workforce': 'talent',
        'employee': 'talent',
        'employees': 'talent',
        'people': 'talent',
        'hiring': 'talent',
        'retention': 'talent',
    };

    const words = priority
        .toLowerCase()
        .split(/\s+/)
        .filter(word => word.length > 2 && !stopWords.includes(word));

    // Map words to their canonical synonyms
    return words.map(word => synonymGroups[word] || word);
}

