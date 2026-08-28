import { AILiveOperationTaskRecord } from '../../types';

export class AILiveOperationsTaskMonitorService {
  /**
   * Returns live active AI task operations monitor list with complete 13-stage AI Execution Trace
   */
  static getLiveTasks(): AILiveOperationTaskRecord[] {
    const now = new Date().toLocaleTimeString();

    return [
      {
        taskId: '#TK-10291',
        actorType: 'Vendor',
        actorId: 'VND-9402',
        issue: 'KYC Verification',
        department: 'KYC',
        aiAgentCode: 'KYC AI',
        status: 'PROCESSING',
        startedAt: '12:48:10 PM',
        durationSec: 42,
        currentStep: 'Document Verification',
        executionTrace: {
          stage1CustomerRequest: { rawMessage: 'Please verify my updated PAN Card ABCDE1234F for vendor onboarding.', channel: 'WEB_PORTAL', timestamp: '12:48:10 PM' },
          stage2IdentityVerification: { actorType: 'Vendor', identityId: 'VND-9402', verificationStatus: 'VERIFIED_GOLD_TIER', score: 99.4 },
          stage3IntentDetection: { primaryIntent: 'KYC_DOCUMENT_VERIFICATION', confidenceScore: 98.5, detectedEntities: ['PAN_CARD', 'ABCDE1234F', 'VENDOR_ONBOARDING'] },
          stage4ContextGathering: { memoryHistoryTokens: 420, activeSessionContext: 'Previous session uploaded lease agreement & Aadhaar.' },
          stage5DepartmentSelection: { targetDepartment: 'KYC AI Department', routingReason: 'Intent classified as document OCR verification' },
          stage6AIAgentAssignment: { assignedAgentCode: 'AI-KYC-001', agentName: 'KYC AI Lead', versionTag: 'KYC-v4' },
          stage7RAGSearch: { queryVector: '[0.12, 0.94, -0.42...]', matchedChunksCount: 3, precisionScore: 97.8, topCitation: 'KYC Compliance Guidelines v8.2' },
          stage8PolicyValidation: { gate1NoDirectDB: 'PASSED', gate2RefundLimit: 'N/A', gate3ToolAuth: 'PASSED', overallPolicyState: 'APPROVED_5_SECURITY_GATES' },
          stage9ToolSelection: { selectedTools: ['ocr_inspect_document', 'verify_identity_gov'], toolSelectionReasoning: 'Requires OCR extraction & Government NSDL database lookup' },
          stage10ToolExecution: [
            { toolName: 'ocr_inspect_document', inputPayload: { docType: 'PAN', url: 's3://kyc/pan_9402.png' }, outputResult: { panNumber: 'ABCDE1234F', dpiScore: 300, isClear: true }, executionLatencyMs: 1200, status: 'SUCCESS', timestamp: '12:48:22 PM' },
            { toolName: 'verify_identity_gov', inputPayload: { idNumber: 'ABCDE1234F', type: 'PAN' }, outputResult: { verified: true, nameMatch: 99.4 }, executionLatencyMs: 1850, status: 'SUCCESS', timestamp: '12:48:35 PM' }
          ],
          stage11ResultValidation: { validationPassed: true, qualityScore: 98.2, outputSanitized: true },
          stage12AIResponse: { generatedResponseText: 'Your PAN Card ABCDE1234F has been successfully verified via Government NSDL portal. Onboarding status updated to VERIFIED.', tokensUsed: 340, costINR: 0.28 },
          stage13Resolution: { finalResolutionState: 'PROCESSING', handedToHuman: false, resolutionTimestamp: '12:48:52 PM' }
        }
      },
      {
        taskId: '#TK-10292',
        actorType: 'Customer',
        actorId: 'CUST-8492',
        issue: 'Order Status Inquiry',
        department: 'Query',
        aiAgentCode: 'Query AI',
        status: 'RESOLVED',
        startedAt: '12:47:50 PM',
        durationSec: 14,
        currentStep: 'Resolution Delivered',
        executionTrace: {
          stage1CustomerRequest: { rawMessage: 'Where is my order #ORD-88402?', channel: 'WHATSAPP', timestamp: '12:47:50 PM' },
          stage2IdentityVerification: { actorType: 'Customer', identityId: 'CUST-8492', verificationStatus: 'VERIFIED_MOBILE_OTP', score: 100.0 },
          stage3IntentDetection: { primaryIntent: 'ORDER_STATUS_TRACKING', confidenceScore: 99.8, detectedEntities: ['ORD-88402'] },
          stage4ContextGathering: { memoryHistoryTokens: 280, activeSessionContext: 'Customer ordered laptop accessories yesterday.' },
          stage5DepartmentSelection: { targetDepartment: 'Query AI Department', routingReason: 'General order status inquiry' },
          stage6AIAgentAssignment: { assignedAgentCode: 'AI-QUERY-001', agentName: 'Query AI Lead', versionTag: 'QUERY-v3' },
          stage7RAGSearch: { queryVector: '[0.44, -0.12, 0.88...]', matchedChunksCount: 2, precisionScore: 99.1, topCitation: 'Logistics SLA & Tracking SOP' },
          stage8PolicyValidation: { gate1NoDirectDB: 'PASSED', gate2RefundLimit: 'N/A', gate3ToolAuth: 'PASSED', overallPolicyState: 'APPROVED_5_SECURITY_GATES' },
          stage9ToolSelection: { selectedTools: ['query_order_status'], toolSelectionReasoning: 'Queries warehouse dispatch API' },
          stage10ToolExecution: [
            { toolName: 'query_order_status', inputPayload: { orderId: 'ORD-88402' }, outputResult: { status: 'IN_TRANSIT', courier: 'BlueDart', trackingNumber: 'BD99201', expectedDelivery: 'Today 5:00 PM' }, executionLatencyMs: 420, status: 'SUCCESS', timestamp: '12:47:58 PM' }
          ],
          stage11ResultValidation: { validationPassed: true, qualityScore: 99.5, outputSanitized: true },
          stage12AIResponse: { generatedResponseText: 'Your order #ORD-88402 is out for delivery via BlueDart (Tracking: BD99201) and expected by 5:00 PM today.', tokensUsed: 190, costINR: 0.14 },
          stage13Resolution: { finalResolutionState: 'RESOLVED', handedToHuman: false, resolutionTimestamp: '12:48:04 PM' }
        }
      },
      {
        taskId: '#TK-10293',
        actorType: 'Agent',
        actorId: 'AGT-1920',
        issue: 'Referral Commission Payout',
        department: 'Payment',
        aiAgentCode: 'Payment AI',
        status: 'PROCESSING',
        startedAt: '12:48:20 PM',
        durationSec: 28,
        currentStep: 'Wallet Credit Execution',
        executionTrace: {
          stage1CustomerRequest: { rawMessage: 'Claim $50 referral commission for vendor onboarding #VND-9402', channel: 'IN_APP_CHAT', timestamp: '12:48:20 PM' },
          stage2IdentityVerification: { actorType: 'Agent', identityId: 'AGT-1920', verificationStatus: 'VERIFIED_PARTNER_CREDENTIALS', score: 98.9 },
          stage3IntentDetection: { primaryIntent: 'REFERRAL_COMMISSION_CREDIT', confidenceScore: 97.4, detectedEntities: ['VND-9402', '$50'] },
          stage4ContextGathering: { memoryHistoryTokens: 310, activeSessionContext: 'Agent qualified for Tier 1 Referral Rewards' },
          stage5DepartmentSelection: { targetDepartment: 'Payment AI Department', routingReason: 'Financial commission credit request' },
          stage6AIAgentAssignment: { assignedAgentCode: 'AI-PAYMENT-001', agentName: 'Payment AI Lead', versionTag: 'PAYMENT-v2' },
          stage7RAGSearch: { queryVector: '[0.05, 0.77, 0.12...]', matchedChunksCount: 1, precisionScore: 96.5, topCitation: 'Agent Commission Matrix 2026' },
          stage8PolicyValidation: { gate1NoDirectDB: 'PASSED', gate2RefundLimit: 'N/A', gate3ToolAuth: 'PASSED', overallPolicyState: 'APPROVED_5_SECURITY_GATES' },
          stage9ToolSelection: { selectedTools: ['credit_wallet_balance'], toolSelectionReasoning: 'Executes secure partner wallet API mutation' },
          stage10ToolExecution: [
            { toolName: 'credit_wallet_balance', inputPayload: { agentId: 'AGT-1920', amountUSD: 50 }, outputResult: { walletId: 'W-1920', newBalanceUSD: 350, transactionId: 'TX-992018' }, executionLatencyMs: 650, status: 'SUCCESS', timestamp: '12:48:38 PM' }
          ],
          stage11ResultValidation: { validationPassed: true, qualityScore: 98.9, outputSanitized: true },
          stage12AIResponse: { generatedResponseText: '$50 referral commission successfully credited to Agent Wallet W-1920 (Tx: TX-992018). New balance: $350.', tokensUsed: 220, costINR: 0.18 },
          stage13Resolution: { finalResolutionState: 'PROCESSING', handedToHuman: false, resolutionTimestamp: '12:48:48 PM' }
        }
      },
      {
        taskId: '#TK-10294',
        actorType: 'Customer',
        actorId: 'CUST-3920',
        issue: 'High Value Refund Dispute',
        department: 'Payment',
        aiAgentCode: 'Payment AI',
        status: 'ESCALATED',
        startedAt: '12:46:15 PM',
        durationSec: 120,
        currentStep: 'Routed to Payment TL',
        executionTrace: {
          stage1CustomerRequest: { rawMessage: 'Request full refund of $120 for damaged package.', channel: 'EMAIL', timestamp: '12:46:15 PM' },
          stage2IdentityVerification: { actorType: 'Customer', identityId: 'CUST-3920', verificationStatus: 'VERIFIED_EMAIL_DKIM', score: 95.0 },
          stage3IntentDetection: { primaryIntent: 'REFUND_DISPUTE_HIGH_VALUE', confidenceScore: 96.2, detectedEntities: ['$120', 'DAMAGED_PACKAGE'] },
          stage4ContextGathering: { memoryHistoryTokens: 650, activeSessionContext: 'Customer submitted photo proof of damaged outer shipping box.' },
          stage5DepartmentSelection: { targetDepartment: 'Payment AI Department', routingReason: 'Financial refund request' },
          stage6AIAgentAssignment: { assignedAgentCode: 'AI-PAYMENT-001', agentName: 'Payment AI Lead', versionTag: 'PAYMENT-v2' },
          stage7RAGSearch: { queryVector: '[-0.22, 0.81, 0.44...]', matchedChunksCount: 4, precisionScore: 98.0, topCitation: 'Refund Policy & Gate Limits' },
          stage8PolicyValidation: { gate1NoDirectDB: 'PASSED', gate2RefundLimit: 'BLOCKED (Exceeds $0 automated threshold)', gate3ToolAuth: 'GATED', overallPolicyState: 'GATED_REQUIRES_HUMAN_TL' },
          stage9ToolSelection: { selectedTools: ['request_refund_approval', 'package_tl_handoff'], toolSelectionReasoning: 'Gated refund request requires packaging context bundle for human TL takeover' },
          stage10ToolExecution: [
            { toolName: 'request_refund_approval', inputPayload: { refundAmountUSD: 120 }, outputResult: { gated: true, requiresHumanTL: true, reason: 'Exceeds $0 automated threshold' }, executionLatencyMs: 380, status: 'GATED', timestamp: '12:46:40 PM' },
            { toolName: 'package_tl_handoff', inputPayload: { targetQueue: 'Payment Team Lead Queue' }, outputResult: { handoffPackageId: 'PKG-PAY-9021', ticketPriority: 'HIGH' }, executionLatencyMs: 450, status: 'SUCCESS', timestamp: '12:46:55 PM' }
          ],
          stage11ResultValidation: { validationPassed: true, qualityScore: 97.0, outputSanitized: true },
          stage12AIResponse: { generatedResponseText: 'Your refund request of $120 exceeds automated gate limits and has been packaged and transferred to Payment Team Lead Queue for manual authorization.', tokensUsed: 480, costINR: 0.42 },
          stage13Resolution: { finalResolutionState: 'ESCALATED', handedToHuman: true, resolutionTimestamp: '12:48:15 PM' }
        }
      }
    ];
  }

  /**
   * Returns complete 13-stage execution trace for a single task
   */
  static getTaskExecutionTrace(taskId: string): AILiveOperationTaskRecord | undefined {
    const tasks = this.getLiveTasks();
    return tasks.find(t => t.taskId.toUpperCase() === taskId.toUpperCase()) || tasks[0];
  }
}
