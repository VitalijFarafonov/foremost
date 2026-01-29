// Handler functions for step-by-step analysis
// These are extracted to keep page.tsx clean

import type { AnalysisResult, ToolInput } from '@/lib/tool/types';

export async function callStep2(result: AnalysisResult): Promise<any> {
    const response = await fetch('/api/tool/step2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            companyName: result.input.companyName,
            companyUrl: result.input.companyUrl,
            industry: result.input.industry,
            strategicInference: result.strategicInference,
        }),
    });

    const data = await response.json();
    if (!response.ok || !data.success) throw new Error(data.error);
    return data.data;
}

export async function callStep3(result: AnalysisResult): Promise<any> {
    const response = await fetch('/api/tool/step3', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            industry: result.input.industry,
            useCases: result.twoPaths,
        }),
    });

    const data = await response.json();
    if (!response.ok || !data.success) throw new Error(data.error);
    return data.data;
}

export async function callStep4(result: AnalysisResult): Promise<any> {
    const response = await fetch('/api/tool/step4', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            useCases: result.twoPaths,
        }),
    });

    const data = await response.json();
    if (!response.ok || !data.success) throw new Error(data.error);
    return data.data;
}

export async function callStep5(result: AnalysisResult): Promise<any> {
    const response = await fetch('/api/tool/step5', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            strategicInference: result.strategicInference,
            useCases: result.twoPaths,
            role: result.input.role,
        }),
    });

    const data = await response.json();
    if (!response.ok || !data.success) throw new Error(data.error);
    return data.data;
}

export async function callStep6(result: AnalysisResult): Promise<any> {
    const response = await fetch('/api/tool/step6', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            useCases: result.twoPaths,
            capabilities: result.capabilities,
            strategicInference: result.strategicInference,
        }),
    });

    const data = await response.json();
    if (!response.ok || !data.success) throw new Error(data.error);
    return data.data;
}
