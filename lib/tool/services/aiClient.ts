// Shared AI client that supports both Gemini and OpenAI
// Includes search grounding capability for Gemini

interface AIMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

interface AIResponse {
    content: string;
    model: string;
}

// Grounding metadata for search-grounded responses
export interface GroundingSource {
    uri: string;
    title: string;
}

/**
 * Retry utility with exponential backoff for transient API failures
 * Retries on 429 (rate limit), 500, 502, 503, 504 errors
 */
async function withRetry<T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    baseDelayMs: number = 1000
): Promise<T> {
    let lastError: Error | undefined;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error as Error;
            const errorMessage = lastError.message || '';

            // Check if this is a retryable error
            const isRetryable =
                errorMessage.includes('429') ||
                errorMessage.includes('500') ||
                errorMessage.includes('502') ||
                errorMessage.includes('503') ||
                errorMessage.includes('504') ||
                errorMessage.includes('rate limit') ||
                errorMessage.includes('ECONNRESET') ||
                errorMessage.includes('ETIMEDOUT');

            if (!isRetryable || attempt === maxRetries) {
                throw lastError;
            }

            // Exponential backoff with jitter
            const delay = baseDelayMs * Math.pow(2, attempt) + Math.random() * 500;
            console.log(`[AI] Retrying after ${Math.round(delay)}ms (attempt ${attempt + 1}/${maxRetries})`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    throw lastError;
}


export interface GroundedAIResponse extends AIResponse {
    groundingMetadata?: {
        searchEntryPoint?: {
            renderedContent: string;
        };
        groundingChunks?: Array<{
            web?: {
                uri: string;
                title: string;
            };
        }>;
        groundingSupports?: Array<{
            segment: {
                startIndex: number;
                endIndex: number;
                text: string;
            };
            groundingChunkIndices: number[];
            confidenceScores: number[];
        }>;
        webSearchQueries?: string[];
    };
    sources?: GroundingSource[];
}

/**
 * Call AI with the given messages
 * Tries Gemini first, falls back to OpenAI if Gemini is not available
 */
export async function callAI(
    messages: AIMessage[],
    options: {
        temperature?: number;
        maxTokens?: number;
    } = {}
): Promise<AIResponse> {
    const { temperature = 0.7, maxTokens = 4000 } = options;

    // Try Gemini 3 Flash first with retry for transient failures
    if (process.env.GEMINI_API_KEY) {
        try {
            return await withRetry(() => callGemini(messages, temperature, maxTokens));
        } catch (error) {
            console.warn('[AI] Gemini failed, falling back to OpenAI:', error);
        }
    }


    // Fall back to OpenAI
    if (process.env.OPENAI_API_KEY) {
        return await callOpenAI(messages, temperature, maxTokens);
    }

    throw new Error('No AI API keys configured. Please set GEMINI_API_KEY or OPENAI_API_KEY');
}

/**
 * Call AI with Google Search grounding
 * Uses Gemini's search grounding to verify claims against real sources
 * Returns response with source citations
 */
export async function callAIWithGrounding(
    messages: AIMessage[],
    options: {
        temperature?: number;
        maxTokens?: number;
    } = {}
): Promise<GroundedAIResponse> {
    const { temperature = 0.5, maxTokens = 4000 } = options;

    if (!process.env.GEMINI_API_KEY) {
        // Fall back to regular call without grounding
        console.warn('[AI] No Gemini API key for grounding, falling back to ungrounded response');
        const response = await callAI(messages, options);
        return { ...response, sources: [] };
    }

    // Gemini uses a different format - combine system and user messages
    const systemMessage = messages.find((m) => m.role === 'system')?.content || '';
    const userMessages = messages.filter((m) => m.role === 'user');

    const prompt = systemMessage
        ? `${systemMessage}\n\n${userMessages.map((m) => m.content).join('\n\n')}`
        : userMessages.map((m) => m.content).join('\n\n');

    console.log('[AI] Calling Gemini with search grounding enabled');

    // Wrap the API call with retry logic
    return await withRetry(async () => {
        const response = await fetch(

            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [{ text: prompt }],
                        },
                    ],
                    generationConfig: {
                        temperature,
                        maxOutputTokens: maxTokens,
                    },
                    tools: [
                        {
                            googleSearch: {},
                        },
                    ],
                }),
            }
        );

        if (!response.ok) {
            const error = await response.text();
            console.error('[AI] Grounded search error:', error);
            throw new Error(`Gemini API error: ${response.status} - ${error}`);
        }

        const data = await response.json();
        const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
        const groundingMetadata = data.candidates?.[0]?.groundingMetadata;

        if (!content) {
            throw new Error('No content in Gemini grounded response');
        }

        // Extract sources from grounding chunks
        const sources: GroundingSource[] = [];
        if (groundingMetadata?.groundingChunks) {
            for (const chunk of groundingMetadata.groundingChunks) {
                if (chunk.web?.uri && chunk.web?.title) {
                    // Avoid duplicates
                    if (!sources.some((s) => s.uri === chunk.web!.uri)) {
                        sources.push({
                            uri: chunk.web.uri,
                            title: chunk.web.title,
                        });
                    }
                }
            }
        }

        console.log(`[AI] Grounded response received with ${sources.length} sources`);

        return {
            content,
            model: 'gemini-2.0-flash-grounded',
            groundingMetadata,
            sources,
        };
    });
}

async function callGemini(
    messages: AIMessage[],
    temperature: number,
    maxTokens: number
): Promise<AIResponse> {
    // Gemini uses a different format - combine system and user messages
    const systemMessage = messages.find((m) => m.role === 'system')?.content || '';
    const userMessages = messages.filter((m) => m.role === 'user');

    const prompt = systemMessage
        ? `${systemMessage}\n\n${userMessages.map((m) => m.content).join('\n\n')}`
        : userMessages.map((m) => m.content).join('\n\n');

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [{ text: prompt }],
                    },
                ],
                generationConfig: {
                    temperature,
                    maxOutputTokens: maxTokens,
                },
            }),
        }
    );

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Gemini API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
        throw new Error('No content in Gemini response');
    }

    return {
        content,
        model: 'gemini-3-flash',
    };
}

async function callOpenAI(
    messages: AIMessage[],
    temperature: number,
    maxTokens: number
): Promise<AIResponse> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: 'gpt-4o',
            messages,
            temperature,
            max_tokens: maxTokens,
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`OpenAI API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
        throw new Error('No content in OpenAI response');
    }

    return {
        content,
        model: data.model,
    };
}

/**
 * Parse JSON from AI response, handling markdown code blocks
 */
export function parseAIJSON<T>(content: string): T {
    // Remove markdown code blocks if present
    let cleaned = content.trim();

    // Remove ```json and ``` markers
    cleaned = cleaned.replace(/^```json\s*/i, '').replace(/```\s*$/, '');
    cleaned = cleaned.replace(/^```\s*/, '').replace(/```\s*$/, '');

    try {
        return JSON.parse(cleaned);
    } catch (error) {
        console.error('[AI] Failed to parse JSON:', cleaned);
        throw new Error('Failed to parse AI response as JSON');
    }
}

