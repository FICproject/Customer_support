import { AIOrchestratorDashboardMetrics } from '../../types';

export class AIOrchestratorDashboardService {
  /**
   * Returns AI Orchestrator brain telemetry metrics & active decision streams
   */
  static getOrchestratorMetrics(): AIOrchestratorDashboardMetrics {
    const now = new Date().toLocaleTimeString();

    return {
      requestsReceived: 4821,
      intentDetectionAccuracyPercent: 98.6,
      agentRoutingCount: 4780,
      activeWorkflows: 42,
      completedWorkflows: 4510,
      failedWorkflows: 58,
      escalationsCount: 183,
      averageRoutingTimeMs: 420,
      activeOrchestratorStreams: [
        {
          requestId: 'REQ-ORCH-901',
          rawRequest: 'Verify updated vendor PAN Card ABCDE1234F',
          detectedIntent: 'KYC_DOCUMENT_VERIFICATION',
          assignedAgent: 'KYC AI (AI-KYC-001)',
          activeWorkflow: 'vendor-kyc-verification-workflow',
          selectedTools: ['ocr_inspect_document', 'verify_identity_gov'],
          status: 'EXECUTING',
          timestamp: now
        },
        {
          requestId: 'REQ-ORCH-902',
          rawRequest: 'Track dispatch status for order #ORD-88402',
          detectedIntent: 'ORDER_STATUS_TRACKING',
          assignedAgent: 'Query AI (AI-QUERY-001)',
          activeWorkflow: 'customer-inquiry-resolution-workflow',
          selectedTools: ['query_order_status'],
          status: 'COMPLETED',
          timestamp: now
        },
        {
          requestId: 'REQ-ORCH-903',
          rawRequest: 'Claim $50 referral agent reward',
          detectedIntent: 'REFERRAL_COMMISSION_CREDIT',
          assignedAgent: 'Payment AI (AI-PAYMENT-001)',
          activeWorkflow: 'agent-referral-vendor-workflow',
          selectedTools: ['credit_wallet_balance'],
          status: 'EXECUTING',
          timestamp: now
        },
        {
          requestId: 'REQ-ORCH-904',
          rawRequest: 'High value refund request $120 for damaged order',
          detectedIntent: 'REFUND_DISPUTE_HIGH_VALUE',
          assignedAgent: 'Payment AI (AI-PAYMENT-001)',
          activeWorkflow: 'payment-verification-workflow',
          selectedTools: ['request_refund_approval', 'package_tl_handoff'],
          status: 'ESCALATED',
          timestamp: now
        }
      ]
    };
  }
}
