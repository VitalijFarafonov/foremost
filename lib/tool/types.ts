// TypeScript types for the Foremost Strategic Orientation Tool

// ============================================================================
// INPUT TYPES
// ============================================================================

export interface ToolInput {
    companyUrl: string;
    companyName?: string; // Optional - extracted by AI if not provided
    industry?: string;
}

export interface EmailCaptureData {
    email: string;
    receiveReport: boolean;
}

// ============================================================================
// STEP 2: STRATEGIC INFERENCE
// ============================================================================

export interface EvidencePoint {
    point: string;
    source: string;
    url?: string;
    date?: string;
    evidenceSource?: 'company' | 'use_cases' | 'both';
}

export interface StrategicPriority {
    priority: string;
    rationale?: string;
    confidence: 'high' | 'medium' | 'low';
    evidence: EvidencePoint[];
    linkedUseCases?: string[]; // IDs of use cases that support this priority
    validatedByUseCases?: boolean; // True if use cases align with this priority
}


export interface StrategicInferenceResult {
    priorities: StrategicPriority[];
    disclaimer: string;
}

// ============================================================================
// STEP 3: TWO PATHS TO VALUE
// ============================================================================

export type UseCasePath = 'reimagination' | 'efficiency';

export type RiskRating = 'low' | 'medium' | 'high';

export interface RiskAssessment {
    rating: RiskRating;
    justification: string;
    implementationRisks: string[];
}

export interface UseCase {
    id: string;
    title: string;
    description: string;
    path: UseCasePath;
    relevanceScore: number;
    timeframe: string;
    impact: string;
    tags: string[]; // For pillar mapping
    // Board-level strategic context
    strategicRationale: string; // Why this fits with strategic priorities
    advantages: string[];
    risks: string[];
    uncertainties: string[];
    tradeoffs: string[];
    riskAssessment: RiskAssessment;
}

export interface TwoPathsResult {
    reimagination: UseCase[];
    efficiency: UseCase[];
}

// ============================================================================
// STEP 4: MARKET SIGNALS
// ============================================================================

export interface GroundingSource {
    uri: string;
    title: string;
}

export interface MarketSignal {
    company: string;
    country: string; // Country where the company is headquartered
    industry: string;
    initiative: string;
    source: string;
    date: string;
}

export interface MarketSignalsResult {
    signals: MarketSignal[];
    disclaimer: string;
    sources?: GroundingSource[]; // Verified sources from Gemini search grounding
    isGrounded?: boolean; // Whether the response was grounded with search
}


// ============================================================================
// STEP 5: CAPABILITIES & GOVERNANCE
// ============================================================================

export type RiskLevel = 'low' | 'medium' | 'high';

export interface Capability {
    useCaseId: string;
    category: string;
    dataPrerequisites: string[];
    riskLevel: RiskLevel;
    governanceRequirements: string[];
    humanInTheLoop: boolean;
}

export interface CapabilitiesResult {
    capabilities: Capability[];
}


// ============================================================================
// STEP 5: FOREMOST SUPPORT
// ============================================================================

export interface RecommendedService {
    title: string;
    description: string;
    group?: string;
}

export interface PillarFit {
    pillarName: string;
    pillarDescription: string;
    foremostThinking: string;
    relevantUseCases: UseCase[];
    recommendedServices: RecommendedService[];
    rationale: string;
}

export interface ForemostFitResult {
    pillars: PillarFit[];
}


// ============================================================================
// COMPLETE ANALYSIS RESULT
// ============================================================================

export interface CompetitorInsight {
    name: string;
    strategicFocus: string;
    relevance: string;
}

export interface CompanyData {
    companyName: string;
    url: string;
    industry: string;
    description: string;
    keyThemes: string[];
    recentInitiatives: string[];
    competitors?: CompetitorInsight[];
    sources?: GroundingSource[];
    isGrounded?: boolean;
}


export interface AnalysisResult {
    input: ToolInput;
    companyData?: CompanyData; // Extracted company data including detailed industry
    strategicInference: StrategicInferenceResult;
    twoPaths: TwoPathsResult;
    marketSignals: MarketSignalsResult;
    foremostFit: ForemostFitResult;
    generatedAt: string;
    analysisId: string;
}

// ============================================================================
// API TYPES
// ============================================================================

export interface AnalysisRequest {
    input: ToolInput;
    email?: EmailCaptureData;
}

export interface AnalysisResponse {
    success: boolean;
    data?: AnalysisResult;
    error?: string;
}

// ============================================================================
// UI STATE TYPES
// ============================================================================

export type AnalysisStep = 1 | 2 | 3 | 4 | 5;

export interface ToolState {
    currentStep: AnalysisStep;
    isAnalyzing: boolean;
    result: AnalysisResult | null;
    error: string | null;
}
