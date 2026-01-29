// Mock data for the Foremost Strategic Orientation Tool
// Used for UI development and testing before AI integration

import type {
    AnalysisResult,
    StrategicPriority,
    UseCase,
    MarketSignal,
    Capability,
    PillarFit,
} from './types';
import { PILLARS, SERVICES } from '@/lib/content';

// ============================================================================
// MOCK STRATEGIC PRIORITIES
// ============================================================================

const mockStrategicPriorities: StrategicPriority[] = [
    {
        priority: 'Market expansion in Asia-Pacific region',
        confidence: 'high',
        evidence: [
            'Recent press releases announcing partnerships in Singapore and Tokyo',
            'Q3 investor call mentioned APAC as primary growth driver',
            'Job postings for regional leadership roles in Hong Kong',
        ],
    },
    {
        priority: 'Supply chain resilience and diversification',
        confidence: 'high',
        evidence: [
            'Annual report highlighted supply chain as strategic priority',
            'Investment in supplier relationship management systems',
            'Sustainability report mentions multi-sourcing initiatives',
        ],
    },
    {
        priority: 'Digital customer experience transformation',
        confidence: 'medium',
        evidence: [
            'Website redesign and mobile app launch in past 12 months',
            'Customer service chatbot implementation',
            'Limited public disclosure on digital strategy',
        ],
    },
];

// ============================================================================
// MOCK USE CASES
// ============================================================================

const mockReimaginationUseCases: UseCase[] = [
    {
        id: 'uc-r1',
        title: 'AI-Powered Supplier Risk Intelligence Platform',
        description:
            'Build a proprietary platform that continuously monitors supplier health, geopolitical risks, and market signals to enable proactive supply chain decisions. This transforms supplier relationships from reactive management to predictive partnership.',
        path: 'reimagination',
        relevanceScore: 95,
        timeframe: '12-18 months',
        impact: 'High - Potential competitive moat through superior supply chain resilience',
        tags: ['strategy', 'proprietary', 'high-risk', 'data-intensive'],
        strategicRationale: 'This directly supports the strategic priority of supply chain resilience by enabling proactive risk identification. The board should consider this as a potential source of competitive advantage, particularly given disruption trends in global logistics.',
        advantages: [
            'Creates proprietary intelligence capability competitors lack',
            'Enables proactive rather than reactive supplier management',
            'Reduces exposure to supply chain disruptions',
            'Builds valuable data asset over time'
        ],
        risks: [
            'Potential data leakage from supplier integrations',
            'Model bias based on historical supplier performance data',
            'Dependent on quality of supplier data inputs'
        ],
        uncertainties: [
            'Pace of adoption by procurement teams',
            'Integration complexity with existing ERP systems',
            'Evolving geopolitical landscape may outpace model training'
        ],
        tradeoffs: [
            'Investment here reduces budget for other digital initiatives',
            'Build vs. buy decision on core platform components',
            'Speed of delivery vs. comprehensiveness of coverage'
        ],
        riskAssessment: {
            rating: 'high',
            justification: 'Transformational initiative requiring significant organisational change and sustained investment. High strategic upside but execution complexity is substantial.',
            implementationRisks: [
                'Data integration across fragmented supplier base',
                'Model accuracy for emerging risks without historical precedent',
                'Change management for procurement team adoption',
                'Third-party data vendor reliability and cost'
            ]
        }
    },
    {
        id: 'uc-r2',
        title: 'Personalised Market Entry Advisor for APAC Expansion',
        description:
            'Develop an AI system that analyses regulatory, cultural, and competitive dynamics across APAC markets to recommend optimal entry strategies, partnership models, and localisation approaches for each target market.',
        path: 'reimagination',
        relevanceScore: 88,
        timeframe: '9-12 months',
        impact: 'High - Accelerates market entry decisions and reduces expansion risk',
        tags: ['strategy', 'decision-support', 'organizational'],
        strategicRationale: 'Directly aligned with the APAC expansion priority. This capability would accelerate decision-making for market entry, reducing time-to-market and improving success probability through data-driven recommendations.',
        advantages: [
            'Accelerates market entry analysis from months to weeks',
            'Standardises decision-making framework across regions',
            'Captures institutional knowledge for future expansion'
        ],
        risks: [
            'Algorithmic bias in cultural and political assessments',
            'Potential hallucinations on regulatory information'
        ],
        uncertainties: [
            'Quality and availability of regional data sources',
            'Regulatory landscape changes in target markets',
            'Accuracy of AI recommendations for novel market conditions'
        ],
        tradeoffs: [
            'Automated analysis vs. relationship-driven local insights',
            'Standardisation vs. market-specific flexibility'
        ],
        riskAssessment: {
            rating: 'medium',
            justification: 'Strategic decision support tool with established methodology. Risk primarily in data quality and ensuring human oversight of final decisions.',
            implementationRisks: [
                'Bias in training data toward existing market assumptions',
                'Over-reliance on AI recommendations without local validation',
                'Integration with existing strategic planning processes'
            ]
        }
    },
];

const mockEfficiencyUseCases: UseCase[] = [
    {
        id: 'uc-e1',
        title: 'Intelligent Customer Service Orchestration',
        description:
            'Enhance existing chatbot with advanced routing, sentiment analysis, and automated resolution for common queries. Escalate complex issues to human agents with full context and suggested solutions.',
        path: 'efficiency',
        relevanceScore: 82,
        timeframe: '3-6 months',
        impact: 'Medium - 30-40% reduction in average handling time, improved CSAT',
        tags: ['automation', 'customer-facing', 'medium-risk'],
        strategicRationale: 'Supports the digital customer experience transformation priority by improving service quality and response times. Quick win that demonstrates AI value to customer-facing teams.',
        advantages: [
            'Proven technology with established vendors',
            'Measurable impact on customer satisfaction metrics',
            'Frees agents to handle complex, high-value interactions'
        ],
        risks: [
            'Customer data privacy concerns with AI interactions',
            'AI response quality issues could damage brand trust'
        ],
        uncertainties: [
            'Accuracy for edge cases and complex queries',
            'Customer preference for human vs. AI interaction'
        ],
        tradeoffs: [
            'Automation coverage vs. customer experience quality',
            'Speed of resolution vs. personalisation'
        ],
        riskAssessment: {
            rating: 'medium',
            justification: 'Established technology category but customer-facing nature requires careful rollout and monitoring.',
            implementationRisks: [
                'Customer escalation rates during initial deployment',
                'Integration with existing CRM and ticketing systems',
                'Agent adoption of AI-suggested responses'
            ]
        }
    },
    {
        id: 'uc-e2',
        title: 'Procurement Contract Intelligence',
        description:
            'Automate extraction and analysis of key terms from supplier contracts, flagging risks, renewal dates, and optimisation opportunities. Enables procurement team to manage larger supplier base efficiently.',
        path: 'efficiency',
        relevanceScore: 75,
        timeframe: '4-6 months',
        impact: 'Medium - 15-20% time savings, improved compliance',
        tags: ['automation', 'internal', 'low-risk'],
        strategicRationale: 'Complements the supply chain resilience priority by improving visibility into contractual obligations and risks. Low-risk foundation for more advanced supplier intelligence.',
        advantages: [
            'Low-risk, proven document analysis technology',
            'Clear, measurable efficiency gains',
            'Improves compliance and reduces missed renewals'
        ],
        risks: [
            'Confidential contract terms could leak via AI processing',
            'Benefits scale with contract volume'
        ],
        uncertainties: [
            'Accuracy for non-standard contract formats',
            'Scope of contract types to include'
        ],
        tradeoffs: [
            'Depth of analysis vs. breadth of coverage',
            'Automation vs. human review for critical terms'
        ],
        riskAssessment: {
            rating: 'low',
            justification: 'Internal tool with established technology. Primary risks are operational rather than strategic.',
            implementationRisks: [
                'Quality of historical contract data',
                'User adoption in procurement team'
            ]
        }
    },
    {
        id: 'uc-e3',
        title: 'Executive Decision Support Dashboard',
        description:
            'AI-powered dashboard that synthesises market data, internal metrics, and competitive intelligence into executive-ready narratives with scenario analysis and recommendations.',
        path: 'efficiency',
        relevanceScore: 78,
        timeframe: '6-9 months',
        impact: 'Medium - Faster strategic decisions, improved data-driven culture',
        tags: ['decision-support', 'executive', 'medium-risk'],
        strategicRationale: 'Enables faster, more informed decision-making across all strategic priorities. Creates a single source of truth for executive team.',
        advantages: [
            'Reduces time for board pack preparation',
            'Consistent, data-driven narrative across leadership',
            'Enables scenario planning and what-if analysis'
        ],
        risks: [
            'Sensitive business data exposed through AI processing',
            'Model hallucinations in AI-generated narratives'
        ],
        uncertainties: [
            'Executive adoption and trust in AI summaries',
            'Quality of underlying data across business units'
        ],
        tradeoffs: [
            'Standardisation vs. narrative flexibility',
            'Automation vs. analyst judgement in interpretation'
        ],
        riskAssessment: {
            rating: 'medium',
            justification: 'High visibility with executive audience. Quality issues would undermine trust in AI initiatives broadly.',
            implementationRisks: [
                'Data integration across disparate systems',
                'Accuracy of AI-generated insights',
                'Change management for finance and strategy teams'
            ]
        }
    },
];

// ============================================================================
// MOCK MARKET SIGNALS
// ============================================================================

const mockMarketSignals: MarketSignal[] = [
    {
        company: 'Maersk',
        country: 'DK',
        industry: 'Logistics & Supply Chain',
        initiative: 'AI-powered demand forecasting and route optimisation platform',
        source: 'Company blog and case study',
        date: '2025-11',
    },

    {
        company: 'DHL',
        country: 'DE',
        industry: 'Logistics & Supply Chain',
        initiative: 'Computer vision for warehouse automation and inventory management',
        source: 'Industry publication',
        date: '2025-09',
    },
    {
        company: 'Unilever',
        country: 'UK',
        industry: 'Consumer Goods',
        initiative: 'GenAI for personalised marketing content across APAC markets',
        source: 'Press release',
        date: '2026-01',
    },
];


// ============================================================================
// MOCK CAPABILITIES
// ============================================================================

const mockCapabilities: Capability[] = [
    {
        useCaseId: 'uc-r1',
        category: 'Predictive Analytics & Real-Time Monitoring',
        dataPrerequisites: [
            'Unified supplier database with historical performance data',
            'Integration with external risk intelligence feeds',
            'Real-time logistics and shipment tracking data',
        ],
        riskLevel: 'high',
        governanceRequirements: [
            'Model accuracy monitoring and drift detection',
            'Human oversight for critical supplier decisions',
            'Audit trail for all risk assessments',
            'Third-party data vendor risk management',
        ],
        humanInTheLoop: true,
    },
    {
        useCaseId: 'uc-r2',
        category: 'Generative Knowledge Synthesis',
        dataPrerequisites: [
            'Structured market research and regulatory databases',
            'Historical market entry performance data',
            'Competitive intelligence repositories',
        ],
        riskLevel: 'medium',
        governanceRequirements: [
            'Fact-checking mechanisms for generated recommendations',
            'Expert validation before strategic decisions',
            'Bias testing for cultural and regional assumptions',
        ],
        humanInTheLoop: true,
    },
    {
        useCaseId: 'uc-e1',
        category: 'Natural Language Processing & Automation',
        dataPrerequisites: [
            'Historical customer service transcripts and tickets',
            'Product and service knowledge base',
            'Customer data platform integration',
        ],
        riskLevel: 'medium',
        governanceRequirements: [
            'Content moderation and safety filters',
            'Customer consent for AI interactions',
            'Quality monitoring and feedback loops',
        ],
        humanInTheLoop: true,
    },
];

// ============================================================================
// MOCK DECISION QUESTIONS
// ============================================================================

const mockDecisionQuestions: string[] = [
    'Which of these use cases materially supports our top strategic priority of APAC expansion?',
    'Are we seeking competitive advantage through the Supplier Risk Intelligence Platform, or merely maintaining parity with competitors like Maersk and DHL?',
    'What governance gaps would currently prevent us from scaling the AI-Powered Supplier Risk Intelligence Platform beyond a pilot?',
    'Do we have the internal capability to build and maintain proprietary AI products, or should we partner?',
    'How do we balance the 12-18 month timeline for reimagination use cases against pressure for quick wins?',
];

// ============================================================================
// MOCK FOREMOST FIT (STEP 7)
// ============================================================================

const mockForemostFit: PillarFit[] = [
    {
        pillarName: PILLARS[0].title, // Strategic Clarity
        pillarDescription: PILLARS[0].description,
        foremostThinking: PILLARS[0].foremostThinking,
        relevantUseCases: [mockReimaginationUseCases[0], mockReimaginationUseCases[1]],
        recommendedServices: SERVICES[0].services.slice(0, 3).map((s) => ({
            title: s.title,
            description: s.description,
        })),
        rationale:
            'Your strategic priorities around APAC expansion and supply chain resilience require clear positioning on where AI creates advantage versus parity. These services help establish strategic direction before execution.',
    },
    {
        pillarName: PILLARS[1].title, // Applied Intelligence
        pillarDescription: PILLARS[1].description,
        foremostThinking: PILLARS[1].foremostThinking,
        relevantUseCases: [...mockReimaginationUseCases, ...mockEfficiencyUseCases],
        recommendedServices: [
            ...SERVICES[1].services.slice(0, 2).map((s) => ({
                title: s.title,
                description: s.description,
                group: s.group,
            })),
            ...SERVICES[1].services.slice(4, 6).map((s) => ({
                title: s.title,
                description: s.description,
                group: s.group,
            })),
        ],
        rationale:
            'Both reimagination and efficiency use cases require disciplined execution from concept to production. These services ensure P&L impact rather than innovation theatre.',
    },
    {
        pillarName: PILLARS[2].title, // Human Potential & Imagination
        pillarDescription: PILLARS[2].description,
        foremostThinking: PILLARS[2].foremostThinking,
        relevantUseCases: [mockEfficiencyUseCases[0], mockReimaginationUseCases[1]],
        recommendedServices: SERVICES[2].services.slice(0, 3).map((s) => ({
            title: s.title,
            description: s.description,
        })),
        rationale:
            'Customer service transformation and APAC expansion both require organizational change and workforce enablement. Success depends on people adopting new ways of working.',
    },
    {
        pillarName: PILLARS[3].title, // Governance as Enabler
        pillarDescription: PILLARS[3].description,
        foremostThinking: PILLARS[3].foremostThinking,
        relevantUseCases: [mockReimaginationUseCases[0], mockEfficiencyUseCases[0]],
        recommendedServices: SERVICES[3].services.slice(0, 4).map((s) => ({
            title: s.title,
            description: s.description,
        })),
        rationale:
            'High-risk use cases like the Supplier Risk Intelligence Platform require robust governance frameworks. Good governance enables faster scaling with confidence.',
    },
];

// ============================================================================
// COMPLETE MOCK ANALYSIS RESULT
// ============================================================================

export const mockAnalysisResult: AnalysisResult = {
    input: {
        companyName: 'Acme Global Logistics',
        companyUrl: 'https://acmeglobal.example.com',
        industry: 'Logistics & Supply Chain',
        role: 'CEO',
    },
    strategicInference: {
        priorities: mockStrategicPriorities,
        disclaimer:
            'This analysis is based on publicly available information and represents an inferred view of your strategic priorities. It should be validated against your internal strategy.',
    },
    twoPaths: {
        reimagination: mockReimaginationUseCases,
        efficiency: mockEfficiencyUseCases,
    },
    marketSignals: {
        signals: mockMarketSignals,
        disclaimer:
            'Note: Public disclosures often overstate maturity. These should be viewed as signals of intent, not necessarily established best practice.',
    },
    capabilities: {
        capabilities: mockCapabilities,
    },
    decisionLens: {
        questions: mockDecisionQuestions,
        context:
            'These questions are designed for Board or Executive Committee discussion to ensure AI investments align with strategic priorities.',
    },
    foremostFit: {
        pillars: mockForemostFit,
    },
    generatedAt: new Date().toISOString(),
    analysisId: 'mock-analysis-' + Date.now(),
};
