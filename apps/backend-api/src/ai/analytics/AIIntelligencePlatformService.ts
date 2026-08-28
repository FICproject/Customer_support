import { 
  AIWorkforceScorecard, 
  AIImprovementItem, 
  Department 
} from '../../types';

export class AIIntelligencePlatformService {
  /**
   * Returns worker scorecards across all active AI agents
   */
  static getAgentScorecards(): AIWorkforceScorecard[] {
    return [
      {
        agentCode: 'AI-QUERY-001',
        department: Department.QUERY,
        totalTasks: 14200,
        resolutionRate: 94.2,
        escalationRate: 4.1,
        csatRating: 4.6,
        toolSuccessRate: 98.4,
        ragGroundingScore: 95.1,
        policyComplianceRate: 99.8,
        avgLatencyMs: 1820,
        costPerResolutionUSD: 0.038
      },
      {
        agentCode: 'KYC-AI-001',
        department: Department.KYC,
        totalTasks: 8900,
        resolutionRate: 97.4,
        escalationRate: 2.1,
        csatRating: 4.7,
        toolSuccessRate: 99.1,
        ragGroundingScore: 97.5,
        policyComplianceRate: 100.0,
        avgLatencyMs: 2400,
        costPerResolutionUSD: 0.052
      },
      {
        agentCode: 'AI-PAY-COLLECT-001',
        department: Department.PAYMENT,
        totalTasks: 11500,
        resolutionRate: 91.6,
        escalationRate: 5.8,
        csatRating: 4.4,
        toolSuccessRate: 98.0,
        ragGroundingScore: 94.2,
        policyComplianceRate: 99.6,
        avgLatencyMs: 2050,
        costPerResolutionUSD: 0.045
      }
    ];
  }

  /**
   * Computes component latency breakdown (Classification, RAG, LLM, Tool, Response)
   */
  static getLatencyBreakdown(): { classificationMs: number; ragMs: number; llmMs: number; toolMs: number; responseMs: number; totalMs: number } {
    return {
      classificationMs: 120,
      ragMs: 180,
      llmMs: 900,
      toolMs: 300,
      responseMs: 400,
      totalMs: 1900
    };
  }

  /**
   * Manages the AI Improvement Queue for Knowledge Gaps & Prompt Revisions
   */
  static getImprovementQueue(tenantId: string): AIImprovementItem[] {
    const timestamp = new Date().toISOString();

    return [
      {
        itemId: 'IMP-102',
        tenantId,
        agentCode: 'AI-PAY-COLLECT-001',
        issueType: 'HIGH_REFUND_ESCALATION',
        description: 'Increased human TL refund escalation rate due to ambiguous refund eligibility window',
        rootCauseCategory: 'POLICY',
        status: 'IN_REVIEW',
        createdAt: timestamp
      },
      {
        itemId: 'IMP-103',
        tenantId,
        agentCode: 'KYC-AI-001',
        issueType: 'KNOWLEDGE_GAP',
        description: 'Repeated queries regarding foreign passport KYC verification rules without matching RAG document',
        rootCauseCategory: 'RAG',
        status: 'NEW',
        createdAt: timestamp
      }
    ];
  }
}
