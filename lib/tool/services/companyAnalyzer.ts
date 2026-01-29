// Company analyzer - extracts strategic context using Gemini search grounding
// Uses Google Search to verify company information and analyze competitors

import { callAIWithGrounding, parseAIJSON, type GroundingSource } from './aiClient';

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

/**
 * Analyze a company using Gemini search grounding
 * Uses Google Search to find real news, analyst reports, and competitive intelligence
 */
export async function analyzeCompany(url: string): Promise<CompanyData> {
    console.log(`[CompanyAnalyzer] Researching company with GROUNDED search: ${url}`);

    // Extract domain name for context
    const domain = extractDomain(url);

    // Calculate dynamic date constraints
    const now = new Date();
    const cutoffDate = new Date(now);
    cutoffDate.setMonth(cutoffDate.getMonth() - 9);
    const currentMonthYear = now.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
    const cutoffMonthYear = cutoffDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
    const cutoffYear = cutoffDate.getFullYear();

    const prompt = `Research the company at this URL using Google Search: ${url}

**STEP 1: IDENTIFY THE COMPANY**
Search: "${domain} company overview" and "${domain} what does it do"
Determine:
- What is the company's PRIMARY business activity?
- What products or services does it sell?
- Who are its customers?

**STEP 2: FIND DIRECT COMPETITORS**
Based on what you learned in Step 1, search for companies that do the EXACT SAME THING.
Search: "[company name] competitors" and "[company name] vs" and "companies like [company name]"

**Company Domain:** ${domain}
**Full URL:** ${url}

**CRITICAL TIME CONSTRAINT:**
- Today's date is ${currentMonthYear}
- For "recentInitiatives", ONLY include initiatives announced after ${cutoffMonthYear} (last 9 months)
- DO NOT include any initiatives from ${cutoffYear - 1} or earlier
- If you cannot find initiatives from the last 9 months, return an empty array rather than including old news

**Output Format (JSON only):**
{
  "companyName": "Official company name",
  "industry": "Specific industry",
  "description": "2-3 sentence description of the company, its market position, and key differentiators",
  "keyThemes": ["theme1", "theme2", "theme3"],
  "recentInitiatives": ["Only initiatives from ${cutoffMonthYear} to ${currentMonthYear}"],
  "competitors": [
    {
      "name": "Competitor name",
      "strategicFocus": "What this competitor is focusing on strategically",
      "relevance": "How this competitor's strategy may be relevant for the target company"
    }
  ]
}

**CRITICAL: WHAT IS A COMPETITOR?**
A competitor is ONLY a company that:
1. Does the SAME core business activity
2. Competes for the SAME deals, customers, or market opportunities
3. Would WIN business that ${domain} loses, or vice versa

**COMMON MISTAKES TO AVOID:**
These are NOT competitors:
- Fund administrators, accountants, or service providers (they SERVE the company, not compete with it)
- Portfolio companies or investments (they are OWNED by investment firms, not competing with them)
- Industry associations or standards bodies (e.g., "Principles for Responsible Investment" is NOT a company)
- Technology vendors or consultants
- Partners, clients, or suppliers

**EXAMPLES OF CORRECT COMPETITOR IDENTIFICATION:**
- Letterone (private investment firm) → Competitors: Access Industries, Blackstone, CVC Capital Partners (other private investment firms competing for deals)
- BBC (broadcaster) → Competitors: ITV, Sky, Netflix (other broadcasters competing for viewers)
- Goldman Sachs (investment bank) → Competitors: Morgan Stanley, JP Morgan (other investment banks competing for clients)
- Sainsbury's (supermarket) → Competitors: Tesco, Asda, Morrisons (other supermarkets competing for shoppers)

**WRONG examples:**
- Letterone → WRONG: "Albany SPC Services" (this is a fund administrator that provides services TO investment firms)
- Letterone → WRONG: "Principles for Responsible Investment" (this is an industry initiative, not a company)

**Guidelines:**
- Include up to 5 example DIRECT competitors
- Competitors must be companies doing the SAME thing, not companies mentioned alongside
- If unsure whether something is a competitor, ask: "Would this company bid against ${domain} for the same deal/customer?"

Return ONLY valid JSON.`;


    try {
        const response = await callAIWithGrounding(
            [
                {
                    role: 'system',
                    content: `You are a senior competitive intelligence analyst. Your task is to identify TRUE COMPETITORS of a company.

CRITICAL THINKING PROCESS:
1. First, understand what the target company ACTUALLY DOES (its core business model)
2. Then, find other companies that do the EXACT SAME THING and compete for the same opportunities
3. A competitor is a company that would WIN the deals/customers that the target company LOSES

CRITICAL LANGUAGE REQUIREMENTS:
- Use BRITISH ENGLISH spelling throughout (e.g., "organisation" not "organization")
- NEVER use em dashes (—)

CRITICAL COMPETITOR RULES:
- Service providers, administrators, and consultants are NOT competitors (they serve the company)
- Portfolio companies and investments are NOT competitors (they are owned by the company)
- Industry bodies and associations are NOT competitors (they are not companies)
- Only include companies that compete DIRECTLY for the same business opportunities

Always return valid JSON.`,
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            { temperature: 0.3, maxTokens: 3000 }
        );

        // Parse the JSON response
        const data = parseAIJSON<Omit<CompanyData, 'url' | 'sources' | 'isGrounded'>>(response.content);

        console.log(`[CompanyAnalyzer] Got company data with ${response.sources?.length || 0} verified sources`);

        return {
            ...data,
            url,
            sources: response.sources || [],
            isGrounded: (response.sources?.length || 0) > 0,
        };
    } catch (error) {
        console.error('[CompanyAnalyzer] Grounded search failed:', error);

        // Return minimal data if grounding fails
        return {
            companyName: domain,
            url,
            industry: 'Unknown',
            description: 'Unable to retrieve company information. Please try again.',
            keyThemes: [],
            recentInitiatives: [],
            competitors: [],
            sources: [],
            isGrounded: false,
        };
    }
}

/**
 * Extract domain name from URL for context
 */
function extractDomain(url: string): string {
    try {
        const urlObj = new URL(url);
        return urlObj.hostname.replace(/^www\./, '');
    } catch {
        // If URL parsing fails, just return the original
        return url;
    }
}

