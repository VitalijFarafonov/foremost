// Streaming types for real-time AI intelligence display
// Used by step1-stream SSE endpoint and ProgressiveLoading component

export type StreamEventType =
    | 'stage_update'      // Current processing stage changed
    | 'prompt_snippet'    // Showing a snippet of the prompt being sent
    | 'response_snippet'  // Showing a snippet of the AI response
    | 'complete'          // Analysis complete with full result
    | 'error';            // Error occurred

export interface StreamEvent {
    type: StreamEventType;
    stage?: string;           // Current stage name (e.g., "Company Analysis")
    stageDescription?: string; // Description of what's happening
    promptSnippet?: string;   // Truncated prompt being sent to AI
    responseSnippet?: string; // Truncated response from AI
    data?: unknown;            // Full result payload (for 'complete' event)
    error?: string;           // Error message (for 'error' event)
    timestamp: number;        // Event timestamp
}

// Helper to format SSE event
export function formatSSE(event: StreamEvent): string {
    return `data: ${JSON.stringify(event)}\n\n`;
}

// Helper to parse SSE event from data string
export function parseSSE(data: string): StreamEvent | null {
    try {
        return JSON.parse(data) as StreamEvent;
    } catch {
        return null;
    }
}

// Stages for the analysis process
export const ANALYSIS_STAGES = {
    COMPANY_ANALYSIS: {
        name: 'Company Analysis',
        description: 'Scraping and analysing your company website to understand business context.',
    },
    STRATEGIC_INFERENCE: {
        name: 'Strategic Inference',
        description: 'Identifying strategic priorities based on public signals and industry context.',
    },
    USE_CASE_GENERATION: {
        name: 'Use Case Generation',
        description: 'Creating AI use cases aligned with your strategic priorities.',
    },
    VALIDATION: {
        name: 'Validation',
        description: 'Cross-referencing and validating strategic alignment.',
    },
    MARKET_INTELLIGENCE: {
        name: 'Market Intelligence',
        description: 'Researching competitor AI initiatives and industry signals.',
    },
} as const;
