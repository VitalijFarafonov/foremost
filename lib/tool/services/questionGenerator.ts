// Question generator - creates strategic decision questions for leadership

import { callAI, parseAIJSON } from './aiClient';
import type { StrategicInferenceResult, TwoPathsResult, DecisionLensResult } from '@/lib/tool/types';

export async function generateDecisionQuestions(
    strategicInference: StrategicInferenceResult,
    useCases: TwoPathsResult,
    role?: string
): Promise<DecisionLensResult> {
    console.log(`[QuestionGenerator] Generating decision questions`);

    const priorities = strategicInference.priorities.map((p) => p.priority).join('; ');
    const reimaginationTitles = useCases.reimagination.map((uc) => uc.title).join('; ');
    const efficiencyTitles = useCases.efficiency.map((uc) => uc.title).join('; ');

    const prompt = `You are a strategic advisor preparing questions for a Board or Executive Committee discussion.

Context:
- Strategic Priorities: ${priorities}
- Path A (Reimagination) Use Cases: ${reimaginationTitles}
- Path B (Efficiency) Use Cases: ${efficiencyTitles}
- Audience Role: ${role || 'Board/Executive Committee'}

Generate 5 strategic questions in JSON format:
{
  "questions": [
    "Strategic question 1",
    "Strategic question 2",
    "Strategic question 3",
    "Strategic question 4",
    "Strategic question 5"
  ],
  "context": "1-2 sentence framing for how to use these questions"
}

Guidelines:
- Questions should be provocative but constructive
- Focus on strategic choices, not technical details
- Encourage discussion of trade-offs and priorities
- Challenge assumptions about AI's role
- Boardroom-appropriate language
- Questions should be open-ended, not yes/no

Example questions:
- "Which of these use cases materially supports our top strategic priority, and which are merely 'nice to have'?"
- "Are we seeking competitive advantage or merely maintaining parity with our peers?"
- "What governance gaps would prevent us from scaling beyond a pilot?"

Return ONLY valid JSON.`;

    const response = await callAI(
        [
            {
                role: 'system',
                content: `You are a strategic advisor who crafts insightful questions for Board and Executive discussions.

CRITICAL LANGUAGE REQUIREMENTS:
- Use BRITISH ENGLISH spelling throughout (e.g., "organisation" not "organization", "prioritise" not "prioritize")
- NEVER use em dashes (—). Use colons (:), semicolons (;), or rephrase sentences instead

Always return valid JSON.`,
            },
            {
                role: 'user',
                content: prompt,
            },
        ],
        { temperature: 0.6, maxTokens: 1500 }
    );

    const data = parseAIJSON<DecisionLensResult>(response.content);

    return data;
}
