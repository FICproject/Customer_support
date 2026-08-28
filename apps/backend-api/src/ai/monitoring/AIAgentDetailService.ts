import { AIAgentDetailRecord } from '../../types';

export class AIAgentDetailService {
  /**
   * Returns comprehensive AI Agent detail telemetry including all 17 dimensions
   */
  static getAgentDetails(agentCode: string): AIAgentDetailRecord {
    const code = agentCode.toUpperCase();
    const now = new Date().toISOString();

    if (code.includes('KYC')) {
      return {
        agentCode: 'AI-KYC-001',
        agentName: 'KYC AI',
        status: 'ONLINE',
        currentTasks: 18,
        completedToday: 1245,
        successRatePercentage: 97.8,
        escalationRatePercentage: 1.9,
        avgProcessingSec: 34,
        errorsCount: 12,
        promptVersion: 'KYC-v4',
        modelName: 'GPT-5.6',
        ragVersion: 'KYC-v8',
        liveTasks: [
          { taskId: 'TASK-KYC-901', title: 'PAN Document OCR Extraction', step: 'OCR Normalization', progress: 75, startedAt: now },
          { taskId: 'TASK-KYC-902', title: 'Aadhaar QR Validation', step: 'Govt Database Check', progress: 40, startedAt: now },
          { taskId: 'TASK-KYC-903', title: 'GSTIN Fraud Risk Screening', step: 'Tamper Detection', progress: 90, startedAt: now }
        ],
        queueItems: [
          { queueId: 'Q-KYC-101', payloadSummary: 'Vendor #8402 PAN verification payload', slaTimerSec: 120, priority: 'HIGH' },
          { queueId: 'Q-KYC-102', payloadSummary: 'Agent #1920 Aadhaar re-upload document', slaTimerSec: 240, priority: 'STANDARD' }
        ],
        performanceMetrics: { latencyP95Ms: 34000, fcrScore: 97.8, csatScore: 4.8 },
        tools: ['ocr_inspect_document', 'verify_identity_gov', 'request_document_reupload', 'tamper_detection_cv'],
        workflows: ['vendor-kyc-verification-workflow', 'reupload-request-workflow'],
        permissions: ['READ_KYC_DOCUMENTS', 'VERIFY_IDENTITY_NUMBER', 'REQUEST_REUPLOAD'],
        errorLogs: [
          { id: 'ERR-KYC-01', code: 'OCR_BLUR_DETECTED', message: 'PAN Card DPI under 200 DPI limit', timestamp: '10 mins ago' },
          { id: 'ERR-KYC-02', code: 'GOV_API_TIMEOUT', message: 'GSTIN Government portal timeout (retried 2x)', timestamp: '35 mins ago' }
        ],
        escalations: [
          { ticketId: 'TKT-KYC-401', reason: 'Unreadable handwritten signature on lease agreement', routedTo: 'KYC Team Lead Queue', timestamp: '1 hour ago' }
        ],
        activityTrail: [
          { action: 'APPROVED_PAN_VERIFICATION', user: 'AI-KYC-001', timestamp: '2 mins ago' },
          { action: 'REQUESTED_REUPLOAD_AADHAAR', user: 'AI-KYC-001', timestamp: '12 mins ago' }
        ],
        evaluationScores: { accuracyPercent: 97.8, securityPassRate: 100, hallucinationRate: 0.1 },
        costTodayINR: 340,
        health: { uptimePercent: 99.98, memoryMb: 310, cpuUsagePercent: 14.2, circuitBreaker: 'CLOSED' },
        versions: [
          { versionTag: 'KYC-v4', stage: 'PUBLISH', publishedAt: '2026-08-01' },
          { versionTag: 'KYC-v3', stage: 'ARCHIVED', publishedAt: '2026-07-15' }
        ]
      };
    }

    if (code.includes('QUERY')) {
      return {
        agentCode: 'AI-QUERY-001',
        agentName: 'Query AI',
        status: 'ONLINE',
        currentTasks: 32,
        completedToday: 1820,
        successRatePercentage: 96.4,
        escalationRatePercentage: 3.2,
        avgProcessingSec: 14,
        errorsCount: 8,
        promptVersion: 'QUERY-v3',
        modelName: 'Gemini 1.5 Pro',
        ragVersion: 'QUERY-v12',
        liveTasks: [
          { taskId: 'TASK-QRY-101', title: 'Order Tracking Query #84920', step: 'RAG Knowledge Search', progress: 85, startedAt: now },
          { taskId: 'TASK-QRY-102', title: 'Service Membership Refund Inquiry', step: 'Policy Boundary Check', progress: 50, startedAt: now }
        ],
        queueItems: [
          { queueId: 'Q-QRY-201', payloadSummary: 'Customer #9401 order delivery delay inquiry', slaTimerSec: 45, priority: 'HIGH' }
        ],
        performanceMetrics: { latencyP95Ms: 14000, fcrScore: 96.4, csatScore: 4.7 },
        tools: ['query_order_status', 'search_knowledge_base', 'check_booking_details'],
        workflows: ['customer-inquiry-resolution-workflow', 'order-tracking-workflow'],
        permissions: ['READ_ORDER_STORE', 'READ_QUERY_RAG'],
        errorLogs: [
          { id: 'ERR-QRY-01', code: 'ORDER_NOT_FOUND', message: 'Order ID #00000 invalid format', timestamp: '15 mins ago' }
        ],
        escalations: [
          { ticketId: 'TKT-QRY-109', reason: 'Customer requested human supervisor callback', routedTo: 'Query Team Lead Queue', timestamp: '40 mins ago' }
        ],
        activityTrail: [
          { action: 'RESOLVED_ORDER_STATUS_QUERY', user: 'AI-QUERY-001', timestamp: '1 min ago' }
        ],
        evaluationScores: { accuracyPercent: 96.4, securityPassRate: 100, hallucinationRate: 0.3 },
        costTodayINR: 420,
        health: { uptimePercent: 99.95, memoryMb: 210, cpuUsagePercent: 11.5, circuitBreaker: 'CLOSED' },
        versions: [
          { versionTag: 'QUERY-v3', stage: 'PUBLISH', publishedAt: '2026-08-05' }
        ]
      };
    }

    if (code.includes('PAYMENT')) {
      return {
        agentCode: 'AI-PAYMENT-001',
        agentName: 'Payment AI',
        status: 'ONLINE',
        currentTasks: 21,
        completedToday: 1200,
        successRatePercentage: 98.9,
        escalationRatePercentage: 1.1,
        avgProcessingSec: 8,
        errorsCount: 4,
        promptVersion: 'PAYMENT-v2',
        modelName: 'GPT-5.6',
        ragVersion: 'PAYMENT-v5',
        liveTasks: [
          { taskId: 'TASK-PAY-01', title: 'Stripe Webhook Event Verification', step: 'Signature Verification', progress: 95, startedAt: now },
          { taskId: 'TASK-PAY-02', title: 'Referral Agent Commission Credit ($50)', step: 'Wallet Balance Update', progress: 80, startedAt: now }
        ],
        queueItems: [
          { queueId: 'Q-PAY-01', payloadSummary: 'Agent Wallet Payout request #9920', slaTimerSec: 30, priority: 'HIGH' }
        ],
        performanceMetrics: { latencyP95Ms: 8000, fcrScore: 98.9, csatScore: 4.9 },
        tools: ['check_payment_status', 'generate_stripe_link', 'credit_wallet_balance', 'request_refund_approval'],
        workflows: ['agent-referral-vendor-workflow', 'payment-verification-workflow'],
        permissions: ['READ_PAYMENT_GATEWAY', 'CREDIT_AGENT_WALLET'],
        errorLogs: [
          { id: 'ERR-PAY-01', code: 'STRIPE_WEBHOOK_RETRY', message: 'Webhook event retried due to gateway latency', timestamp: '2 hours ago' }
        ],
        escalations: [
          { ticketId: 'TKT-PAY-881', reason: 'Refund request of $120 exceeds $0 automated limit', routedTo: 'Payment Team Lead Queue', timestamp: '20 mins ago' }
        ],
        activityTrail: [
          { action: 'CREDITED_AGENT_WALLET_COMMISSION', user: 'AI-PAYMENT-001', timestamp: '4 mins ago' }
        ],
        evaluationScores: { accuracyPercent: 98.9, securityPassRate: 100, hallucinationRate: 0.0 },
        costTodayINR: 280,
        health: { uptimePercent: 100.0, memoryMb: 185, cpuUsagePercent: 9.8, circuitBreaker: 'CLOSED' },
        versions: [
          { versionTag: 'PAYMENT-v2', stage: 'PUBLISH', publishedAt: '2026-07-28' }
        ]
      };
    }

    // Default Fallback Agent Detail
    return {
      agentCode: agentCode,
      agentName: `${agentCode} Agent`,
      status: 'ONLINE',
      currentTasks: 14,
      completedToday: 950,
      successRatePercentage: 96.5,
      escalationRatePercentage: 2.1,
      avgProcessingSec: 22,
      errorsCount: 6,
      promptVersion: `${agentCode}-v1`,
      modelName: 'GPT-5.6',
      ragVersion: `${agentCode}-r1`,
      liveTasks: [
        { taskId: 'TASK-101', title: 'Task Execution Step', step: 'Processing', progress: 60, startedAt: now }
      ],
      queueItems: [
        { queueId: 'Q-01', payloadSummary: 'Pending payload item', slaTimerSec: 60, priority: 'STANDARD' }
      ],
      performanceMetrics: { latencyP95Ms: 22000, fcrScore: 96.5, csatScore: 4.7 },
      tools: ['router_analyze_intent', 'identity_resolver'],
      workflows: ['master-orchestrator-workflow'],
      permissions: ['EXECUTE_ORCHESTRATOR_PIPELINE'],
      errorLogs: [],
      escalations: [],
      activityTrail: [],
      evaluationScores: { accuracyPercent: 96.5, securityPassRate: 100, hallucinationRate: 0.2 },
      costTodayINR: 190,
      health: { uptimePercent: 99.99, memoryMb: 160, cpuUsagePercent: 8.5, circuitBreaker: 'CLOSED' },
      versions: [{ versionTag: 'v1.0', stage: 'PUBLISH', publishedAt: '2026-08-01' }]
    };
  }
}
