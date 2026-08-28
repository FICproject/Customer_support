import {
  DepartmentConfig,
  UserProfile,
  UserRole,
  UserType,
  Department,
  Ticket,
  TicketStatus,
  TicketPriority,
  AIAgentType,
  KYCVerificationRecord,
  KYCStatus,
  PaymentTransaction,
  PaymentStatus,
  CommissionPayout,
  AuditLogEntry,
  KnowledgeDocument,
  PromptTemplate,
  WorkflowDefinition,
  AIAgentState,
  OrderItem,
  AIWorkforceAgentNode,
  AIWorkforceLayer,
  AIDepartmentAgentType,
  AISpecializedAgentType,
  AILifecycleStatus,
  RequesterType,
  AIAgentClassification,
  AIRiskLevel,
  AIRuntimeAvailability
} from '../types';

class InMemoryStore {
  public users: Map<string, UserProfile> = new Map();
  public departments: Map<string, DepartmentConfig> = new Map();
  public orders: Map<string, OrderItem[]> = new Map();
  public tickets: Map<string, Ticket> = new Map();
  public kycRecords: Map<string, KYCVerificationRecord> = new Map();
  public payments: Map<string, PaymentTransaction> = new Map();
  public commissions: CommissionPayout[] = [];
  public auditLogs: AuditLogEntry[] = [];
  public knowledgeDocs: Map<string, KnowledgeDocument> = new Map();
  public prompts: Map<string, PromptTemplate> = new Map();
  public workflows: Map<string, WorkflowDefinition> = new Map();
  public agentStates: Map<AIAgentType, AIAgentState> = new Map();
  public aiWorkforceRegistry: Map<string, AIWorkforceAgentNode> = new Map();
  public aiOrchestratorAgents: Map<string, any> = new Map();
  public paymentSettings: {
    slaWindowMinutes: number;
    voiceDialerMaxRetries: number;
    stateAgentFee: number;
    districtAgentFee: number;
    divisionalAgentFee: number;
    pincodeAgentFee: number;
  } = {
    slaWindowMinutes: 2,
    voiceDialerMaxRetries: 3,
    stateAgentFee: 1500,
    districtAgentFee: 800,
    divisionalAgentFee: 500,
    pincodeAgentFee: 250
  };

  constructor() {
    this.seedDepartments();
    this.seedUsers();
    this.seedOrders();
    this.seedKnowledgeBase();
    this.seedPrompts();
    this.seedWorkflows();
    this.seedAIAgentStates();
    this.seedAIOrchestratorAgents();
    this.seedAIWorkforceRegistry();
    this.seedInitialTicketsAndOps();
    this.seedAuditLogs();
  }

  private seedUsers() {
    const defaultUsers: UserProfile[] = [
      {
        id: 'usr-superadmin',
        name: 'Alexander Vance',
        email: 'superadmin@enterpriseai.com',
        phone: '+1-800-555-0100',
        role: UserRole.SUPER_ADMIN,
        userType: UserType.INTERNAL,
        createdAt: new Date().toISOString()
      },
      {
        id: 'usr-admin',
        name: 'Sarah Connor',
        email: 'admin@enterpriseai.com',
        phone: '+1-800-555-0101',
        role: UserRole.ADMIN,
        userType: UserType.INTERNAL,
        createdAt: new Date().toISOString()
      },
      {
        id: 'usr-queries-tl',
        name: 'David Miller',
        email: 'queries.tl@enterpriseai.com',
        phone: '+1-800-555-0102',
        role: UserRole.QUERIES_TL,
        userType: UserType.INTERNAL,
        department: Department.QUERY,
        createdAt: new Date().toISOString()
      },
      {
        id: 'usr-kyc-tl',
        name: 'Elena Rostova',
        email: 'kyc.tl@enterpriseai.com',
        phone: '+1-800-555-0103',
        role: UserRole.KYC_TL,
        userType: UserType.INTERNAL,
        department: Department.KYC,
        createdAt: new Date().toISOString()
      },
      {
        id: 'usr-payment-tl',
        name: 'Marcus Brody',
        email: 'payment.tl@enterpriseai.com',
        phone: '+1-800-555-0104',
        role: UserRole.PAYMENT_TL,
        userType: UserType.INTERNAL,
        department: Department.PAYMENT,
        createdAt: new Date().toISOString()
      },
      {
        id: 'usr-query-agent-1',
        name: 'Rahul Sharma (Query Specialist)',
        email: 'query.agent@enterprise.ai',
        phone: '+91-98811-00221',
        role: UserRole.QUERY_AGENT,
        userType: UserType.INTERNAL,
        department: Department.QUERY,
        createdAt: new Date().toISOString()
      },
      {
        id: 'usr-kyc-agent-1',
        name: 'Anand Kumar (KYC Verification Officer)',
        email: 'kyc.agent@enterprise.ai',
        phone: '+91-98811-00222',
        role: UserRole.KYC_AGENT,
        userType: UserType.INTERNAL,
        department: Department.KYC,
        createdAt: new Date().toISOString()
      },
      {
        id: 'usr-payment-agent-1',
        name: 'Suresh Raina (Payment Settlement Officer)',
        email: 'payment.agent@enterprise.ai',
        phone: '+91-98811-00223',
        role: UserRole.PAYMENT_AGENT,
        userType: UserType.INTERNAL,
        department: Department.PAYMENT,
        createdAt: new Date().toISOString()
      },
      {
        id: 'usr-customer-1',
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@example.com',
        phone: '+91-98765-43210',
        role: UserRole.CUSTOMER,
        userType: UserType.EXTERNAL,
        membershipLevel: 'GOLD',
        createdAt: new Date().toISOString()
      },
      {
        id: 'usr-vendor-1',
        name: 'Apex Solutions Pvt Ltd',
        email: 'onboarding@apexsolutions.com',
        phone: '+91-99887-76655',
        role: UserRole.VENDOR,
        userType: UserType.EXTERNAL,
        panNumber: 'ABCDE1234F',
        aadhaarNumber: '1234-5678-9012',
        referralCode: 'VEND-APEX-99',
        referredByAgentCode: 'AGT-AMIT-01',
        createdAt: new Date().toISOString()
      },
      {
        id: 'usr-agent-1',
        name: 'Amit Sharma (Tie-up Agent)',
        email: 'amit.agent@partnernet.com',
        phone: '+91-97112-33445',
        role: UserRole.AGENT,
        userType: UserType.EXTERNAL,
        referralCode: 'AGT-AMIT-01',
        walletBalance: 12500,
        createdAt: new Date().toISOString()
      }
    ];

    defaultUsers.forEach(u => this.users.set(u.id, u));
  }

  private seedOrders() {
    this.orders.set('usr-customer-1', [
      {
        id: 'ord-8801',
        userId: 'usr-customer-1',
        serviceType: 'Enterprise Cloud SaaS Subscription',
        amount: 4999,
        status: 'DELIVERED',
        createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
      },
      {
        id: 'ord-8802',
        userId: 'usr-customer-1',
        serviceType: 'On-Site Technical Onboarding',
        amount: 1500,
        status: 'PENDING_SCHEDULE',
        createdAt: new Date(Date.now() - 86400000).toISOString()
      }
    ]);
  }

  private seedKnowledgeBase() {
    const docs: KnowledgeDocument[] = [
      {
        id: 'kb-101',
        title: 'Enterprise Refund & Cancellation Policy',
        category: 'REFUNDS',
        content: 'Customers can request a 100% refund within 14 days of purchase if service availability is under 99.5%. Pro-rata refund applies thereafter. AI Query Agent can approve instant refund for orders under $5,000.',
        tags: ['refund', 'cancellation', 'policy', 'money-back'],
        usageCount: 142,
        helpfulnessScore: 4.9,
        updatedAt: new Date().toISOString()
      },
      {
        id: 'kb-102',
        title: 'Tie-up Agent Commission & Referral Guidelines',
        category: 'VENDOR_RULES',
        content: 'Registered Tie-up Agents receive a 10% instant commission credit to their digital wallet whenever a referred Vendor completes KYC & mandatory onboarding payment.',
        tags: ['commission', 'referral', 'agent', 'wallet'],
        usageCount: 88,
        helpfulnessScore: 4.8,
        updatedAt: new Date().toISOString()
      },
      {
        id: 'kb-103',
        title: 'KYC Document Acceptance & Forgery Thresholds',
        category: 'SOPS',
        content: 'Acceptable IDs: PAN Card, Aadhaar Card, GSTIN. Documents with a blur score > 0.45 or forgery score > 0.35 must be auto-flagged for re-upload or escalated to KYC Team Lead.',
        tags: ['kyc', 'ocr', 'blur', 'forgery', 'verification'],
        usageCount: 210,
        helpfulnessScore: 5.0,
        updatedAt: new Date().toISOString()
      }
    ];

    docs.forEach(d => this.knowledgeDocs.set(d.id, d));
  }

  private seedPrompts() {
    const initialPrompts: PromptTemplate[] = [
      {
        id: 'pmt-router',
        agentType: AIAgentType.ROUTER,
        title: 'AI Router System Prompt',
        systemPrompt: 'You are the AI Router Agent of the Enterprise AI Customer Support SaaS platform. Identify intent, user type, language, and priority score (1-100). Route request to QUERY, KYC, or PAYMENT department.',
        userPromptTemplate: 'User Query: {{query}} | Channel: {{channel}} | UserID: {{userId}}',
        version: 1,
        active: true
      },
      {
        id: 'pmt-kyc',
        agentType: AIAgentType.KYC,
        title: 'AI KYC Verification Agent Prompt',
        systemPrompt: 'You are the AI KYC Agent. Perform OCR extraction, check blur, forgery risk, duplicate records, and government verification. Output decisions: APPROVED, NEED_REUPLOAD, REJECTED, or ESCALATED.',
        userPromptTemplate: 'KYC Record: {{kycId}} | DocType: {{docType}} | FileUrl: {{url}}',
        version: 1,
        active: true
      }
    ];

    initialPrompts.forEach(p => this.prompts.set(p.id, p));
  }

  private seedWorkflows() {
    const defaultWorkflows: WorkflowDefinition[] = [
      {
        id: 'wf-agent-registration',
        name: 'Tie-up Agent Registration & Onboarding',
        description: 'Automated end-to-end flow from form submission to AI KYC, AI Calling payment reminder, and credential generation.',
        steps: [
          { stepNumber: 1, stepName: 'Submit Form & Basic Details', assignedAgent: AIAgentType.ROUTER, action: 'REGISTER_USER' },
          { stepNumber: 2, stepName: 'AI KYC Verification', assignedAgent: AIAgentType.KYC, action: 'VERIFY_DOCUMENTS' },
          { stepNumber: 3, stepName: 'AI Calling Payment Reminder', assignedAgent: AIAgentType.CALLING, action: 'DISPATCH_CALL' },
          { stepNumber: 4, stepName: 'Payment Verification & Receipt', assignedAgent: AIAgentType.PAYMENT, action: 'VERIFY_PAYMENT' },
          { stepNumber: 5, stepName: 'Credential Generation & Welcome Kit', assignedAgent: AIAgentType.EMAIL, action: 'SEND_CREDENTIALS' }
        ],
        active: true
      },
      {
        id: 'wf-vendor-referral',
        name: 'Vendor Registration via Agent Referral',
        description: 'Vendor registration with referral code, AI verification, onboarding payment, and automated agent wallet commission credit.',
        steps: [
          { stepNumber: 1, stepName: 'Vendor Sign-up & Referral Code Input', assignedAgent: AIAgentType.ROUTER, action: 'STORE_REFERRAL' },
          { stepNumber: 2, stepName: 'AI KYC & Fraud Validation', assignedAgent: AIAgentType.KYC, action: 'VALIDATE_VENDOR_KYC' },
          { stepNumber: 3, stepName: 'Payment Link & Receipt Generation', assignedAgent: AIAgentType.PAYMENT, action: 'PROCESS_PAYMENT' },
          { stepNumber: 4, stepName: 'Commission Engine & Agent Wallet Credit', assignedAgent: AIAgentType.PAYMENT, action: 'CREDIT_AGENT_WALLET' },
          { stepNumber: 5, stepName: 'Vendor Account Activation & Welcome', assignedAgent: AIAgentType.EMAIL, action: 'ACTIVATE_VENDOR' }
        ],
        active: true
      },
      {
        id: 'wf-direct-vendor',
        name: 'Direct Vendor Registration & Onboarding',
        description: 'Self-service direct vendor onboarding without agent referral — AI document verification, compliance check, payment, and instant portal provisioning.',
        steps: [
          { stepNumber: 1, stepName: 'Vendor Self-Registration Form Submission', assignedAgent: AIAgentType.ROUTER, action: 'INGEST_VENDOR' },
          { stepNumber: 2, stepName: 'AI KYC: Document & GST Verification', assignedAgent: AIAgentType.KYC, action: 'VERIFY_DOCUMENTS' },
          { stepNumber: 3, stepName: 'Compliance & Risk Score Check', assignedAgent: AIAgentType.ROUTER, action: 'CHECK_COMPLIANCE' },
          { stepNumber: 4, stepName: 'Onboarding Payment & Invoice', assignedAgent: AIAgentType.PAYMENT, action: 'PROCESS_PAYMENT' },
          { stepNumber: 5, stepName: 'Procurement TL Final Verification', assignedAgent: AIAgentType.QUERY, action: 'APPROVE_VENDOR' },
          { stepNumber: 6, stepName: 'Vendor Portal Provisioning & Welcome Kit', assignedAgent: AIAgentType.EMAIL, action: 'ACTIVATE_ACCOUNT' }
        ],
        active: true
      },
      {
        id: 'wf-kyc-approval',
        name: 'Automated KYC Verification & OCR Approval Engine',
        description: 'Ingests identity proof, computes OCR document blur score, checks forgery risk, auto-approves compliant users or routes to KYC Team Lead.',
        steps: [
          { stepNumber: 1, stepName: 'AI KYC Agent: OCR Document Extraction', assignedAgent: AIAgentType.KYC, action: 'OCR_EXTRACT' },
          { stepNumber: 2, stepName: 'Condition: OCR Blur & Forgery Cutoff', assignedAgent: AIAgentType.KYC, action: 'VALIDATE_QUALITY' },
          { stepNumber: 3, stepName: 'Branching: Auto-Approve vs TL Review', assignedAgent: AIAgentType.ROUTER, action: 'BRANCH_REVIEW' },
          { stepNumber: 4, stepName: 'Human Approval: KYC TL Desk Inspection', assignedAgent: AIAgentType.KYC, action: 'TL_OVERRIDE' },
          { stepNumber: 5, stepName: 'Database Status Sync & Notification', assignedAgent: AIAgentType.EMAIL, action: 'SYNC_STATUS' }
        ],
        active: true
      },
      {
        id: 'wf-payment-verification',
        name: 'High-Value Payment & 3DS Transaction Verification',
        description: 'Audits gateway webhooks, runs fraud risk detection, checks 3DS verification, and routes high-value ($1,000+) transactions for finance sign-off.',
        steps: [
          { stepNumber: 1, stepName: 'AI Payment Agent: Gateway Webhook Audit', assignedAgent: AIAgentType.PAYMENT, action: 'AUDIT_WEBHOOK' },
          { stepNumber: 2, stepName: 'Condition: Amount Threshold & Fraud Level', assignedAgent: AIAgentType.PAYMENT, action: 'RISK_EVALUATION' },
          { stepNumber: 3, stepName: 'Timer: Bank Settlement SLA Window', assignedAgent: AIAgentType.PAYMENT, action: 'SLA_WINDOW' },
          { stepNumber: 4, stepName: 'Human Approval: Finance Admin Authorization', assignedAgent: AIAgentType.PAYMENT, action: 'FINANCE_AUTH' },
          { stepNumber: 5, stepName: 'Tax Invoice & PDF Receipt Generation', assignedAgent: AIAgentType.PAYMENT, action: 'GENERATE_RECEIPT' }
        ],
        active: true
      },
      {
        id: 'wf-refund-process',
        name: 'Customer Refund Policy & Automated Processing Engine',
        description: 'Audits customer refund requests against 30-day return policy, auto-issues refunds <= $200 or escalates larger refunds to Finance TL.',
        steps: [
          { stepNumber: 1, stepName: 'AI Query Agent: Refund Request Audit', assignedAgent: AIAgentType.QUERY, action: 'AUDIT_REFUND' },
          { stepNumber: 2, stepName: 'Timer: Refund Grace Period Hold', assignedAgent: AIAgentType.QUERY, action: 'GRACE_PERIOD' },
          { stepNumber: 3, stepName: 'Condition: Refund Amount <= $200 Policy', assignedAgent: AIAgentType.PAYMENT, action: 'POLICY_CHECK' },
          { stepNumber: 4, stepName: 'Human Approval: Finance TL Refund Clearance', assignedAgent: AIAgentType.PAYMENT, action: 'FINANCE_TL_CLEARANCE' },
          { stepNumber: 5, stepName: 'Stripe Gateway Refund & Credit Dispatch', assignedAgent: AIAgentType.PAYMENT, action: 'EXECUTE_REFUND' }
        ],
        active: true
      },
      {
        id: 'wf-escalation-process',
        name: 'High Frustration Sentiment & SLA Breach Escalation',
        description: 'Monitors real-time conversation sentiment score (<0.20), generates ticket summary, enforces 15-min SLA countdown, and alerts Team Lead desk.',
        steps: [
          { stepNumber: 1, stepName: 'AI Orchestrator: Sentiment Monitor', assignedAgent: AIAgentType.ROUTER, action: 'SENTIMENT_SCAN' },
          { stepNumber: 2, stepName: 'Condition: Frustration Score & SLA Breach', assignedAgent: AIAgentType.ROUTER, action: 'SLA_CHECK' },
          { stepNumber: 3, stepName: 'Ticket Summarizer & Context Extractor', assignedAgent: AIAgentType.QUERY, action: 'SUMMARIZE_TICKET' },
          { stepNumber: 4, stepName: 'Timer: Handoff SLA Countdown', assignedAgent: AIAgentType.ROUTER, action: 'SLA_COUNTDOWN' },
          { stepNumber: 5, stepName: 'Human Approval: TL Ticket Takeover Desk', assignedAgent: AIAgentType.QUERY, action: 'TL_TAKEOVER' }
        ],
        active: true
      }
    ];

    defaultWorkflows.forEach(w => this.workflows.set(w.id, w));
  }

  private seedAIAgentStates() {
    const agentTypes = Object.values(AIAgentType);
    agentTypes.forEach((type, idx) => {
      this.agentStates.set(type, {
        type,
        name: `AI ${type.replace(/_/g, ' ')} Agent`,
        department: type === AIAgentType.KYC ? Department.KYC : type === AIAgentType.PAYMENT ? Department.PAYMENT : Department.QUERY,
        currentTask: 'Monitoring active queues & orchestrator tasks',
        assignedWorkloadCount: Math.floor(Math.random() * 5) + 1,
        queueDepth: Math.floor(Math.random() * 8),
        avgConfidenceScore: 94 + (idx % 5),
        status: 'ACTIVE',
        toolCallsCount: 120 + idx * 45
      });
    });
  }

  private seedAIOrchestratorAgents() {
    const defaultAgents = [
      {
        id: 'ai-1',
        name: 'AI Router Agent',
        code: 'ROUTER',
        category: 'Classification & Intent Routing',
        status: 'ONLINE',
        healthPercent: 100,
        version: 'v2.4.1-neural',
        promptVersion: 'v3.2-prod',
        previousPromptVersion: 'v3.1-prod',
        assignedJobs: 18,
        queueLength: 2,
        memoryUsageMb: 245,
        tokenUsageCount: 2450000,
        costPerDay: 18.50,
        errorLogs: [
          { id: 'err-1', timestamp: '2026-07-29 13:42:10', level: 'WARN', message: 'Intent ambiguity score 0.48 on multi-part ticket #8849. Routed to Queries Desk fallback.' },
          { id: 'err-2', timestamp: '2026-07-29 11:15:02', level: 'WARN', message: 'High request spike (140 req/min). Auto-scaled worker threads.' }
        ]
      },
      {
        id: 'ai-2',
        name: 'AI Query Agent',
        code: 'QUERY',
        category: 'General Customer Support & Retrieval',
        status: 'BUSY',
        healthPercent: 99.2,
        version: 'v2.8.0-deepmind',
        promptVersion: 'v4.0-prod',
        previousPromptVersion: 'v3.9-prod',
        assignedJobs: 42,
        queueLength: 5,
        memoryUsageMb: 512,
        tokenUsageCount: 4890000,
        costPerDay: 48.20,
        errorLogs: [
          { id: 'err-3', timestamp: '2026-07-29 14:02:18', level: 'WARN', message: 'RAG context truncation warning. Top 3 embeddings used for generation.' }
        ]
      },
      {
        id: 'ai-3',
        name: 'AI KYC Agent',
        code: 'KYC',
        category: 'OCR & Biometric Identity Verification',
        status: 'ONLINE',
        healthPercent: 98.5,
        version: 'v3.1.0-vision',
        promptVersion: 'v2.9-prod',
        previousPromptVersion: 'v2.8-prod',
        assignedJobs: 8,
        queueLength: 1,
        memoryUsageMb: 680,
        tokenUsageCount: 1850000,
        costPerDay: 24.10,
        errorLogs: [
          { id: 'err-4', timestamp: '2026-07-29 10:20:44', level: 'ERROR', message: 'OCR extraction timeout (4500ms) on low-res document #KYC-4029. Auto-requested re-upload.' }
        ]
      },
      {
        id: 'ai-4',
        name: 'AI Payment Agent',
        code: 'PAYMENT',
        category: 'Financial Ledger & Referral Payouts',
        status: 'ONLINE',
        healthPercent: 100,
        version: 'v2.1.2-ledger',
        promptVersion: 'v2.5-prod',
        previousPromptVersion: 'v2.4-prod',
        assignedJobs: 5,
        queueLength: 0,
        memoryUsageMb: 190,
        tokenUsageCount: 980000,
        costPerDay: 12.30,
        errorLogs: []
      },
      {
        id: 'ai-5',
        name: 'AI Calling Agent',
        code: 'CALLING',
        category: 'Outbound Voice Synthesis & WebRTC',
        status: 'IDLE',
        healthPercent: 97.4,
        version: 'v1.9.4-webrtc',
        promptVersion: 'v2.1-prod',
        previousPromptVersion: 'v2.0-prod',
        assignedJobs: 2,
        queueLength: 0,
        memoryUsageMb: 420,
        tokenUsageCount: 620000,
        costPerDay: 14.80,
        errorLogs: [
          { id: 'err-5', timestamp: '2026-07-29 09:12:30', level: 'WARN', message: 'SIP Gateway jitter buffer exceeded 120ms. Audio packet loss 0.4%.' }
        ]
      },
      {
        id: 'ai-6',
        name: 'AI Email Agent',
        code: 'EMAIL',
        category: 'Inbound Email Parser & Auto-Reply',
        status: 'ONLINE',
        healthPercent: 99.8,
        version: 'v2.0.1-smtp',
        promptVersion: 'v3.0-prod',
        previousPromptVersion: 'v2.9-prod',
        assignedJobs: 14,
        queueLength: 1,
        memoryUsageMb: 310,
        tokenUsageCount: 1120000,
        costPerDay: 9.60,
        errorLogs: []
      },
      {
        id: 'ai-7',
        name: 'AI WhatsApp Agent',
        code: 'WHATSAPP',
        category: 'WhatsApp Multi-modal Messenger',
        status: 'ONLINE',
        healthPercent: 100,
        version: 'v2.3.0-meta',
        promptVersion: 'v3.1-prod',
        previousPromptVersion: 'v3.0-prod',
        assignedJobs: 22,
        queueLength: 3,
        memoryUsageMb: 340,
        tokenUsageCount: 1750000,
        costPerDay: 16.40,
        errorLogs: []
      },
      {
        id: 'ai-8',
        name: 'AI Fraud Detection Agent',
        code: 'FRAUD',
        category: 'Neural Forgery & Anomaly Scanner',
        status: 'ONLINE',
        healthPercent: 100,
        version: 'v3.0.0-neural',
        promptVersion: 'v4.1-prod',
        previousPromptVersion: 'v4.0-prod',
        assignedJobs: 6,
        queueLength: 0,
        memoryUsageMb: 750,
        tokenUsageCount: 2100000,
        costPerDay: 28.50,
        errorLogs: [
          { id: 'err-6', timestamp: '2026-07-29 12:45:11', level: 'WARN', message: 'High-risk forgery alert (risk score 0.89) on user account #USR-8821. Auto-frozen account.' }
        ]
      },
      {
        id: 'ai-9',
        name: 'AI Knowledge Agent',
        code: 'KNOWLEDGE',
        category: 'Vector Store RAG Embeddings Indexer',
        status: 'ONLINE',
        healthPercent: 99.9,
        version: 'v2.5.0-vector',
        promptVersion: 'v3.3-prod',
        previousPromptVersion: 'v3.2-prod',
        assignedJobs: 4,
        queueLength: 0,
        memoryUsageMb: 890,
        tokenUsageCount: 3100000,
        costPerDay: 22.00,
        errorLogs: []
      },
      {
        id: 'ai-10',
        name: 'AI Customer Profile Agent',
        code: 'CUSTOMER_PROFILE',
        category: 'Profile Synthesis & Session Context',
        status: 'ONLINE',
        healthPercent: 100,
        version: 'v2.2.0-context',
        promptVersion: 'v3.0-prod',
        previousPromptVersion: 'v2.9-prod',
        assignedJobs: 15,
        queueLength: 0,
        memoryUsageMb: 280,
        tokenUsageCount: 1450000,
        costPerDay: 11.20,
        errorLogs: []
      },
      {
        id: 'ai-11',
        name: 'AI System Monitoring Agent',
        code: 'MONITORING',
        category: 'Real-time Telemetry & SLA Compliance Audit',
        status: 'ONLINE',
        healthPercent: 100,
        version: 'v3.1.0-telemetry',
        promptVersion: 'v4.0-prod',
        previousPromptVersion: 'v3.9-prod',
        assignedJobs: 30,
        queueLength: 0,
        memoryUsageMb: 390,
        tokenUsageCount: 1980000,
        costPerDay: 15.60,
        errorLogs: []
      }
    ];

    defaultAgents.forEach(a => this.aiOrchestratorAgents.set(a.id, a));
  }

  private seedAIWorkforceRegistry() {
    const nodes: AIWorkforceAgentNode[] = [
      // CORE ORCHESTRATOR & COORDINATORS (Types 1 & 2)
      {
        id: 'node-orchestrator',
        agentCode: 'AI-ORCH-001',
        name: 'AI Workforce Orchestrator',
        purpose: 'Master dispatcher and central workforce brain coordinating request classification, routing, and audit logs.',
        type: AIAgentType.ROUTER,
        classification: AIAgentClassification.ORCHESTRATOR,
        layer: AIWorkforceLayer.ORCHESTRATOR,
        department: Department.SYSTEM,
        reportsToHumanRole: UserRole.SUPER_ADMIN,
        assignedHumanTLId: 'usr-superadmin',
        status: 'ACTIVE',
        lifecycleStatus: AILifecycleStatus.ACTIVE,
        runtimeAvailability: AIRuntimeAvailability.AVAILABLE,
        riskLevel: AIRiskLevel.CRITICAL,
        model: 'Gemini 1.5 Pro',
        modelConfig: { provider: 'GEMINI', model: 'gemini-1.5-pro', temperature: 0.1, maxTokens: 2048, timeoutMs: 30000, fallbackModel: 'gpt-4o-mini' },
        version: '1.0.0',
        promptVersion: 'Orchestrator System Prompt v2',
        knowledgeBaseScope: ['Global Policies', 'SOPs', 'System Architecture'],
        tools: ['IntentClassifierTool', 'WorkforceRouterTool', 'SecurityValidatorTool', 'AuditLoggerTool'],
        permissions: ['GLOBAL_DISPATCH', 'ROUTING_READ', 'SECURITY_CHECK'],
        maxConcurrentTasks: 100,
        currentTaskCount: 3,
        currentLoadPercent: 3,
        avgConfidenceScore: 98.5,
        capabilities: ['Intent Classification', 'Workforce Dispatch', 'Security Check', 'Audit Logging'],
        createdAt: '2026-08-10',
        lastActiveAt: new Date().toISOString()
      },
      {
        id: 'node-coord-query',
        agentCode: 'AI-QUERY-COORD-001',
        name: 'Query Coordinator',
        purpose: 'Internal manager for Query AI department, dispatching incoming support issues to specialized Query agents.',
        type: AIDepartmentAgentType.QUERY_AI,
        classification: AIAgentClassification.DEPARTMENT_COORDINATOR,
        layer: AIWorkforceLayer.DEPARTMENT,
        department: Department.QUERY,
        reportsToHumanRole: UserRole.QUERIES_TL,
        assignedHumanTLId: 'usr-queries-tl',
        status: 'ACTIVE',
        lifecycleStatus: AILifecycleStatus.ACTIVE,
        runtimeAvailability: AIRuntimeAvailability.AVAILABLE,
        riskLevel: AIRiskLevel.MEDIUM,
        model: 'Gemini 1.5 Flash',
        modelConfig: { provider: 'GEMINI', model: 'gemini-1.5-flash', temperature: 0.2, maxTokens: 1024, timeoutMs: 15000, fallbackModel: 'gpt-4o-mini' },
        version: '1.0.0',
        promptVersion: 'Query Coordinator Prompt v1',
        knowledgeBaseScope: ['Query Department Policies', 'General FAQs'],
        tools: ['QueryRouterTool', 'OrderLookupTool', 'TicketManagerTool'],
        permissions: ['QUERY_READ', 'QUERY_DISPATCH', 'TICKET_WRITE'],
        maxConcurrentTasks: 50,
        currentTaskCount: 5,
        currentLoadPercent: 10,
        avgConfidenceScore: 96.2,
        capabilities: ['Query Internal Routing', 'Order/Booking Task Dispatch', 'Query SLA Monitor'],
        createdAt: '2026-08-10',
        lastActiveAt: new Date().toISOString()
      },
      {
        id: 'node-coord-kyc',
        agentCode: 'AI-KYC-COORD-001',
        name: 'KYC Coordinator',
        purpose: 'Internal manager for KYC AI department, coordinating document collection, quality check, and verification workflows.',
        type: AIDepartmentAgentType.KYC_AI,
        classification: AIAgentClassification.DEPARTMENT_COORDINATOR,
        layer: AIWorkforceLayer.DEPARTMENT,
        department: Department.KYC,
        reportsToHumanRole: UserRole.KYC_TL,
        assignedHumanTLId: 'usr-kyc-tl',
        status: 'ACTIVE',
        lifecycleStatus: AILifecycleStatus.ACTIVE,
        runtimeAvailability: AIRuntimeAvailability.AVAILABLE,
        riskLevel: AIRiskLevel.HIGH,
        model: 'Gemini 1.5 Flash',
        modelConfig: { provider: 'GEMINI', model: 'gemini-1.5-flash', temperature: 0.1, maxTokens: 1024, timeoutMs: 15000, fallbackModel: 'gpt-4o-mini' },
        version: '1.0.0',
        promptVersion: 'KYC Coordinator Prompt v1',
        knowledgeBaseScope: ['KYC SOPs', 'Document Verification Guidelines'],
        tools: ['KYCWorkflowRouterTool', 'DocumentQualityGateTool'],
        permissions: ['KYC_READ', 'KYC_DISPATCH', 'STATUS_UPDATE'],
        maxConcurrentTasks: 40,
        currentTaskCount: 2,
        currentLoadPercent: 5,
        avgConfidenceScore: 94.8,
        capabilities: ['KYC Workflow Routing', 'Doc Quality Gate Control', 'Vendor Verification Dispatch'],
        createdAt: '2026-08-10',
        lastActiveAt: new Date().toISOString()
      },
      {
        id: 'node-coord-payment',
        agentCode: 'AI-PAY-COORD-001',
        name: 'Payment Coordinator',
        purpose: 'Internal manager for Payment AI department, routing registration payments, link dispatches, and commission credits.',
        type: AIDepartmentAgentType.PAYMENT_AI,
        classification: AIAgentClassification.DEPARTMENT_COORDINATOR,
        layer: AIWorkforceLayer.DEPARTMENT,
        department: Department.PAYMENT,
        reportsToHumanRole: UserRole.PAYMENT_TL,
        assignedHumanTLId: 'usr-payment-tl',
        status: 'ACTIVE',
        lifecycleStatus: AILifecycleStatus.ACTIVE,
        runtimeAvailability: AIRuntimeAvailability.AVAILABLE,
        riskLevel: AIRiskLevel.HIGH,
        model: 'Gemini 1.5 Flash',
        modelConfig: { provider: 'GEMINI', model: 'gemini-1.5-flash', temperature: 0.0, maxTokens: 1024, timeoutMs: 15000, fallbackModel: 'gpt-4o-mini' },
        version: '1.0.0',
        promptVersion: 'Payment Coordinator Prompt v1',
        knowledgeBaseScope: ['Payment & Refund Policies', 'Commission Rules'],
        tools: ['PaymentWorkflowRouterTool', 'CommissionManagerTool'],
        permissions: ['PAYMENT_READ', 'PAYMENT_DISPATCH', 'COMMISSION_READ'],
        maxConcurrentTasks: 40,
        currentTaskCount: 4,
        currentLoadPercent: 10,
        avgConfidenceScore: 97.1,
        capabilities: ['Payment Workflow Dispatch', 'Commission Routing', 'Withdrawal Request Gate'],
        createdAt: '2026-08-10',
        lastActiveAt: new Date().toISOString()
      },

      // QUERY DEPARTMENT SPECIALISTS (Type 3)
      {
        id: 'node-query-order',
        agentCode: 'AI-QUERY-ORDER-001',
        name: 'Order Support Agent',
        purpose: 'Resolve authorized customer, vendor, and agent requests related to orders and shipping.',
        type: AIAgentType.ORDER_SUPPORT,
        classification: AIAgentClassification.SPECIALIST_AGENT,
        layer: AIWorkforceLayer.SPECIALIZED,
        department: Department.QUERY,
        reportsToHumanRole: UserRole.QUERIES_TL,
        assignedHumanTLId: 'usr-queries-tl',
        status: 'ACTIVE',
        lifecycleStatus: AILifecycleStatus.ACTIVE,
        runtimeAvailability: AIRuntimeAvailability.AVAILABLE,
        riskLevel: AIRiskLevel.MEDIUM,
        model: 'Gemini 1.5 Flash',
        modelConfig: { provider: 'GEMINI', model: 'gemini-1.5-flash', temperature: 0.2, maxTokens: 1024, timeoutMs: 15000, fallbackModel: 'gpt-4o-mini' },
        version: '1.0.0',
        promptVersion: 'Order Support Prompt v2',
        knowledgeBaseScope: ['Order Policies', 'Shipping Guidelines'],
        tools: ['OrderLookupTool', 'DeliveryTrackingTool', 'CancellationTool'],
        permissions: ['ORDER_READ', 'DELIVERY_READ', 'CANCELLATION_INITIATE'],
        maxConcurrentTasks: 30,
        currentTaskCount: 3,
        currentLoadPercent: 10,
        avgConfidenceScore: 96.0,
        capabilities: ['Order Tracking', 'Shopping Issues', 'Delivery Timeline', 'Cancellation Requests'],
        createdAt: '2026-08-10',
        lastActiveAt: new Date().toISOString()
      },
      {
        id: 'node-query-booking',
        agentCode: 'AI-QUERY-BOOKING-001',
        name: 'Booking Support Agent',
        purpose: 'Handle cab, travel, hotel, stay, and hospital appointment booking inquiries and rescheduling.',
        type: AIAgentType.BOOKING_SUPPORT,
        classification: AIAgentClassification.SPECIALIST_AGENT,
        layer: AIWorkforceLayer.SPECIALIZED,
        department: Department.QUERY,
        reportsToHumanRole: UserRole.QUERIES_TL,
        assignedHumanTLId: 'usr-queries-tl',
        status: 'ACTIVE',
        lifecycleStatus: AILifecycleStatus.ACTIVE,
        runtimeAvailability: AIRuntimeAvailability.AVAILABLE,
        riskLevel: AIRiskLevel.MEDIUM,
        model: 'Gemini 1.5 Flash',
        modelConfig: { provider: 'GEMINI', model: 'gemini-1.5-flash', temperature: 0.2, maxTokens: 1024, timeoutMs: 15000, fallbackModel: 'gpt-4o-mini' },
        version: '1.0.0',
        promptVersion: 'Booking Support Prompt v1',
        knowledgeBaseScope: ['Travel & Stay Policies', 'Hospital Appointment Rules'],
        tools: ['BookingLookupTool', 'ReservationRescheduleTool'],
        permissions: ['BOOKING_READ', 'RESERVATION_UPDATE'],
        maxConcurrentTasks: 25,
        currentTaskCount: 2,
        currentLoadPercent: 8,
        avgConfidenceScore: 95.8,
        capabilities: ['Cab/Travel Bookings', 'Hotel Reservations', 'Hospital Appointments', 'Rescheduling'],
        createdAt: '2026-08-10',
        lastActiveAt: new Date().toISOString()
      },
      {
        id: 'node-query-service',
        agentCode: 'AI-QUERY-SERVICE-001',
        name: 'Service Support Agent',
        purpose: 'Manage door service technician bookings (AC, fridge, washing machine) and daily needs fulfillment.',
        type: AIAgentType.SERVICE_SUPPORT,
        classification: AIAgentClassification.SPECIALIST_AGENT,
        layer: AIWorkforceLayer.SPECIALIZED,
        department: Department.QUERY,
        reportsToHumanRole: UserRole.QUERIES_TL,
        assignedHumanTLId: 'usr-queries-tl',
        status: 'ACTIVE',
        lifecycleStatus: AILifecycleStatus.ACTIVE,
        runtimeAvailability: AIRuntimeAvailability.AVAILABLE,
        riskLevel: AIRiskLevel.MEDIUM,
        model: 'Gemini 1.5 Flash',
        modelConfig: { provider: 'GEMINI', model: 'gemini-1.5-flash', temperature: 0.2, maxTokens: 1024, timeoutMs: 15000, fallbackModel: 'gpt-4o-mini' },
        version: '1.0.0',
        promptVersion: 'Service Support Prompt v1',
        knowledgeBaseScope: ['Door Service SOPs', 'Technician Onboarding Rules'],
        tools: ['TechnicianBookingTool', 'ServiceStatusTool'],
        permissions: ['SERVICE_READ', 'TECHNICIAN_DISPATCH'],
        maxConcurrentTasks: 25,
        currentTaskCount: 4,
        currentLoadPercent: 16,
        avgConfidenceScore: 94.5,
        capabilities: ['Technician Booking', 'AC/Fridge Door Services', 'Daily Needs Fulfillment'],
        createdAt: '2026-08-10',
        lastActiveAt: new Date().toISOString()
      },
      {
        id: 'node-query-membership',
        agentCode: 'AI-QUERY-MEMBERSHIP-001',
        name: 'Membership Support Agent',
        purpose: 'Verify Gold/Platinum membership benefits, renewal dates, and loyalty rewards.',
        type: AIAgentType.MEMBERSHIP_SUPPORT,
        classification: AIAgentClassification.SPECIALIST_AGENT,
        layer: AIWorkforceLayer.SPECIALIZED,
        department: Department.QUERY,
        reportsToHumanRole: UserRole.QUERIES_TL,
        assignedHumanTLId: 'usr-queries-tl',
        status: 'ACTIVE',
        lifecycleStatus: AILifecycleStatus.ACTIVE,
        runtimeAvailability: AIRuntimeAvailability.AVAILABLE,
        riskLevel: AIRiskLevel.MEDIUM,
        model: 'Gemini 1.5 Flash',
        modelConfig: { provider: 'GEMINI', model: 'gemini-1.5-flash', temperature: 0.1, maxTokens: 1024, timeoutMs: 15000, fallbackModel: 'gpt-4o-mini' },
        version: '1.0.0',
        promptVersion: 'Membership Support Prompt v1',
        knowledgeBaseScope: ['Gold & Platinum Membership Rules'],
        tools: ['MembershipValidatorTool', 'TierBenefitsTool'],
        permissions: ['MEMBERSHIP_READ', 'TIER_VERIFY'],
        maxConcurrentTasks: 20,
        currentTaskCount: 1,
        currentLoadPercent: 5,
        avgConfidenceScore: 98.2,
        capabilities: ['Gold/Platinum Tier Status', 'Membership Benefit Validation', 'Expiry Guidance'],
        createdAt: '2026-08-10',
        lastActiveAt: new Date().toISOString()
      },
      {
        id: 'node-query-general',
        agentCode: 'AI-QUERY-GENERAL-001',
        name: 'General Support Agent',
        purpose: 'Answer general customer inquiries, account setup guidance, and policy FAQs.',
        type: AIAgentType.GENERAL_SUPPORT,
        classification: AIAgentClassification.SPECIALIST_AGENT,
        layer: AIWorkforceLayer.SPECIALIZED,
        department: Department.QUERY,
        reportsToHumanRole: UserRole.QUERIES_TL,
        assignedHumanTLId: 'usr-queries-tl',
        status: 'ACTIVE',
        lifecycleStatus: AILifecycleStatus.ACTIVE,
        runtimeAvailability: AIRuntimeAvailability.AVAILABLE,
        riskLevel: AIRiskLevel.LOW,
        model: 'Gemini 1.5 Flash',
        modelConfig: { provider: 'GEMINI', model: 'gemini-1.5-flash', temperature: 0.3, maxTokens: 1024, timeoutMs: 15000, fallbackModel: 'gpt-4o-mini' },
        version: '1.0.0',
        promptVersion: 'General Support Prompt v1',
        knowledgeBaseScope: ['Company FAQs', 'Platform Terms'],
        tools: ['KnowledgeRAGTool', 'AccountSetupTool'],
        permissions: ['FAQ_READ', 'ACCOUNT_INFO_READ'],
        maxConcurrentTasks: 30,
        currentTaskCount: 2,
        currentLoadPercent: 7,
        avgConfidenceScore: 97.0,
        capabilities: ['General Inquiries', 'Account Setup', 'Policy FAQ Guidance'],
        createdAt: '2026-08-10',
        lastActiveAt: new Date().toISOString()
      },

      // KYC DEPARTMENT SPECIALISTS (Type 3)
      {
        id: 'node-kyc-doc-collection',
        agentCode: 'AI-KYC-COLLECT-001',
        name: 'Document Collection Agent',
        purpose: 'Generate secure KYC upload links and collect PAN/Aadhaar/GST files from users.',
        type: AIAgentType.DOCUMENT_COLLECTION,
        classification: AIAgentClassification.SPECIALIST_AGENT,
        layer: AIWorkforceLayer.SPECIALIZED,
        department: Department.KYC,
        reportsToHumanRole: UserRole.KYC_TL,
        assignedHumanTLId: 'usr-kyc-tl',
        status: 'ACTIVE',
        lifecycleStatus: AILifecycleStatus.ACTIVE,
        runtimeAvailability: AIRuntimeAvailability.AVAILABLE,
        riskLevel: AIRiskLevel.HIGH,
        model: 'Gemini 1.5 Flash',
        modelConfig: { provider: 'GEMINI', model: 'gemini-1.5-flash', temperature: 0.1, maxTokens: 1024, timeoutMs: 15000, fallbackModel: 'gpt-4o-mini' },
        version: '1.0.0',
        promptVersion: 'KYC Collection Prompt v1',
        knowledgeBaseScope: ['KYC Acceptance Standards'],
        tools: ['KYCLinkGeneratorTool', 'FileAttachmentIngestTool'],
        permissions: ['KYC_LINK_CREATE', 'FILE_WRITE'],
        maxConcurrentTasks: 20,
        currentTaskCount: 2,
        currentLoadPercent: 10,
        avgConfidenceScore: 98.0,
        capabilities: ['KYC Link Dispatch', 'File Attachment Ingestion', 'Format Validation'],
        createdAt: '2026-08-10',
        lastActiveAt: new Date().toISOString()
      },
      {
        id: 'node-kyc-doc-quality',
        agentCode: 'AI-KYC-QUALITY-001',
        name: 'Document Quality Agent',
        purpose: 'Evaluate uploaded KYC document images for readability, blur score, lighting glare, and completeness.',
        type: AIAgentType.DOCUMENT_QUALITY,
        classification: AIAgentClassification.SPECIALIST_AGENT,
        layer: AIWorkforceLayer.SPECIALIZED,
        department: Department.KYC,
        reportsToHumanRole: UserRole.KYC_TL,
        assignedHumanTLId: 'usr-kyc-tl',
        status: 'ACTIVE',
        lifecycleStatus: AILifecycleStatus.ACTIVE,
        runtimeAvailability: AIRuntimeAvailability.AVAILABLE,
        riskLevel: AIRiskLevel.CRITICAL,
        model: 'Gemini 1.5 Pro (Vision)',
        modelConfig: { provider: 'GEMINI', model: 'gemini-1.5-pro', temperature: 0.0, maxTokens: 2048, timeoutMs: 30000, fallbackModel: 'gpt-4o-mini' },
        version: '1.0.0',
        promptVersion: 'KYC Quality Prompt v2',
        knowledgeBaseScope: ['Image Quality SOPs', 'Blur Score Thresholds'],
        tools: ['BlurDetectionTool', 'GlareAnalysisTool'],
        permissions: ['IMAGE_READ', 'QUALITY_SCORE_WRITE'],
        maxConcurrentTasks: 20,
        currentTaskCount: 1,
        currentLoadPercent: 5,
        avgConfidenceScore: 95.2,
        capabilities: ['Blur Score Calculation', 'Glare/Lighting Analysis', 'Re-upload Triggering'],
        createdAt: '2026-08-10',
        lastActiveAt: new Date().toISOString()
      },
      {
        id: 'node-kyc-doc-verify',
        agentCode: 'AI-KYC-DOCVERIFY-001',
        name: 'Document Verification Agent',
        purpose: 'Extract text via OCR from PAN/Aadhaar cards, validate fields, and apply 8-digit Aadhaar masking.',
        type: AIAgentType.DOCUMENT_VERIFICATION,
        classification: AIAgentClassification.SPECIALIST_AGENT,
        layer: AIWorkforceLayer.SPECIALIZED,
        department: Department.KYC,
        reportsToHumanRole: UserRole.KYC_TL,
        assignedHumanTLId: 'usr-kyc-tl',
        status: 'ACTIVE',
        lifecycleStatus: AILifecycleStatus.ACTIVE,
        runtimeAvailability: AIRuntimeAvailability.AVAILABLE,
        riskLevel: AIRiskLevel.HIGH,
        model: 'Gemini 1.5 Pro (Vision)',
        modelConfig: { provider: 'GEMINI', model: 'gemini-1.5-pro', temperature: 0.0, maxTokens: 2048, timeoutMs: 30000, fallbackModel: 'gpt-4o-mini' },
        version: '1.0.0',
        promptVersion: 'KYC OCR Verification Prompt v3',
        knowledgeBaseScope: ['KYC OCR Extraction Guidelines', 'Government ID Standards'],
        tools: ['OCRTool', 'AadhaarMaskingTool', 'FieldMatchingTool'],
        permissions: ['OCR_EXECUTE', 'AADHAAR_MASK_WRITE'],
        maxConcurrentTasks: 20,
        currentTaskCount: 3,
        currentLoadPercent: 15,
        avgConfidenceScore: 97.4,
        capabilities: ['OCR Data Extraction', 'Field Validation', 'Aadhaar 8-Digit Masking'],
        createdAt: '2026-08-10',
        lastActiveAt: new Date().toISOString()
      },
      {
        id: 'node-kyc-identity',
        agentCode: 'AI-KYC-IDENTITY-001',
        name: 'Identity Verification Agent',
        purpose: 'Verify document numbers against real-time Govt DB APIs and compare user selfie liveness & face biometrics.',
        type: AIAgentType.IDENTITY_VERIFICATION,
        classification: AIAgentClassification.SPECIALIST_AGENT,
        layer: AIWorkforceLayer.SPECIALIZED,
        department: Department.KYC,
        reportsToHumanRole: UserRole.KYC_TL,
        assignedHumanTLId: 'usr-kyc-tl',
        status: 'ACTIVE',
        lifecycleStatus: AILifecycleStatus.ACTIVE,
        runtimeAvailability: AIRuntimeAvailability.AVAILABLE,
        riskLevel: AIRiskLevel.CRITICAL,
        model: 'Gemini 1.5 Pro',
        modelConfig: { provider: 'GEMINI', model: 'gemini-1.5-pro', temperature: 0.0, maxTokens: 2048, timeoutMs: 30000, fallbackModel: 'gpt-4o-mini' },
        version: '1.0.0',
        promptVersion: 'Identity Match Prompt v1',
        knowledgeBaseScope: ['Biometric & Liveness Standards'],
        tools: ['GovtDBVerificationTool', 'LivenessScoringTool', 'FaceBiometricMatchTool'],
        permissions: ['GOVT_API_READ', 'FACE_MATCH_EXECUTE'],
        maxConcurrentTasks: 20,
        currentTaskCount: 2,
        currentLoadPercent: 10,
        avgConfidenceScore: 96.5,
        capabilities: ['Govt DB API Verification', 'Selfie Liveness Scoring', 'Face Biometric Match'],
        createdAt: '2026-08-10',
        lastActiveAt: new Date().toISOString()
      },
      {
        id: 'node-kyc-vendor',
        agentCode: 'AI-KYC-VENDOR-001',
        name: 'Vendor Verification Agent',
        purpose: 'Verify business registration documents, GSTIN numbers, and agent-referred vendor accounts.',
        type: AIAgentType.VENDOR_VERIFICATION,
        classification: AIAgentClassification.SPECIALIST_AGENT,
        layer: AIWorkforceLayer.SPECIALIZED,
        department: Department.KYC,
        reportsToHumanRole: UserRole.KYC_TL,
        assignedHumanTLId: 'usr-kyc-tl',
        status: 'ACTIVE',
        lifecycleStatus: AILifecycleStatus.ACTIVE,
        runtimeAvailability: AIRuntimeAvailability.AVAILABLE,
        riskLevel: AIRiskLevel.HIGH,
        model: 'Gemini 1.5 Flash',
        modelConfig: { provider: 'GEMINI', model: 'gemini-1.5-flash', temperature: 0.1, maxTokens: 1024, timeoutMs: 15000, fallbackModel: 'gpt-4o-mini' },
        version: '1.0.0',
        promptVersion: 'Vendor Verification Prompt v1',
        knowledgeBaseScope: ['Vendor Onboarding Guidelines', 'GSTIN Regulations'],
        tools: ['GSTINVerificationTool', 'BusinessRegistrationTool'],
        permissions: ['VENDOR_READ', 'GSTIN_LOOKUP'],
        maxConcurrentTasks: 15,
        currentTaskCount: 1,
        currentLoadPercent: 7,
        avgConfidenceScore: 94.0,
        capabilities: ['Direct Vendor Verification', 'Agent Referral Vendor Checks', 'GSTIN Validation'],
        createdAt: '2026-08-10',
        lastActiveAt: new Date().toISOString()
      },
      {
        id: 'node-kyc-decision',
        agentCode: 'AI-KYC-DECISION-001',
        name: 'KYC Decision Agent',
        purpose: 'Evaluate composite quality & verification scores to render final decision: APPROVED, REJECTED, REUPLOAD, or ESCALATED.',
        type: AIAgentType.KYC_DECISION,
        classification: AIAgentClassification.SPECIALIST_AGENT,
        layer: AIWorkforceLayer.SPECIALIZED,
        department: Department.KYC,
        reportsToHumanRole: UserRole.KYC_TL,
        assignedHumanTLId: 'usr-kyc-tl',
        status: 'ACTIVE',
        lifecycleStatus: AILifecycleStatus.ACTIVE,
        runtimeAvailability: AIRuntimeAvailability.AVAILABLE,
        riskLevel: AIRiskLevel.CRITICAL,
        model: 'Gemini 1.5 Pro',
        modelConfig: { provider: 'GEMINI', model: 'gemini-1.5-pro', temperature: 0.0, maxTokens: 2048, timeoutMs: 30000, fallbackModel: 'gpt-4o-mini' },
        version: '1.0.0',
        promptVersion: 'KYC Decision Engine Prompt v2',
        knowledgeBaseScope: ['KYC Compliance Policy', 'Escalation Rules'],
        tools: ['KYCDecisionGateTool', 'EscalationTriggerTool'],
        permissions: ['KYC_APPROVE', 'KYC_REJECT', 'ESCALATION_TRIGGER'],
        maxConcurrentTasks: 20,
        currentTaskCount: 1,
        currentLoadPercent: 5,
        avgConfidenceScore: 98.8,
        capabilities: ['Final Decision Evaluation', 'Approved/Rejected Gate', 'Human Escalation Gate'],
        createdAt: '2026-08-10',
        lastActiveAt: new Date().toISOString()
      },

      // PAYMENT DEPARTMENT SPECIALISTS (Type 3)
      {
        id: 'node-pay-verify',
        agentCode: 'AI-PAY-VERIFY-001',
        name: 'Payment Verification Agent',
        purpose: 'Verify agent & vendor registration payment status against gateway webhooks and settlement ledgers.',
        type: AIAgentType.PAYMENT_VERIFICATION,
        classification: AIAgentClassification.SPECIALIST_AGENT,
        layer: AIWorkforceLayer.SPECIALIZED,
        department: Department.PAYMENT,
        reportsToHumanRole: UserRole.PAYMENT_TL,
        assignedHumanTLId: 'usr-payment-tl',
        status: 'ACTIVE',
        lifecycleStatus: AILifecycleStatus.ACTIVE,
        runtimeAvailability: AIRuntimeAvailability.AVAILABLE,
        riskLevel: AIRiskLevel.HIGH,
        model: 'Gemini 1.5 Flash',
        modelConfig: { provider: 'GEMINI', model: 'gemini-1.5-flash', temperature: 0.0, maxTokens: 1024, timeoutMs: 15000, fallbackModel: 'gpt-4o-mini' },
        version: '1.0.0',
        promptVersion: 'Payment Verify Prompt v1',
        knowledgeBaseScope: ['Payment Reconciliation Guidelines'],
        tools: ['GatewayWebhookTool', 'TransactionReconcilerTool'],
        permissions: ['PAYMENT_STATUS_READ', 'GATEWAY_HOOK_VERIFY'],
        maxConcurrentTasks: 30,
        currentTaskCount: 2,
        currentLoadPercent: 7,
        avgConfidenceScore: 98.0,
        capabilities: ['Registration Payment Validation', 'Gateway Webhook Reconciliation', 'Status Verification'],
        createdAt: '2026-08-10',
        lastActiveAt: new Date().toISOString()
      },
      {
        id: 'node-pay-reminder',
        agentCode: 'AI-PAY-REMINDER-001',
        name: 'Payment Reminder Agent',
        purpose: 'Follow up on pending/failed onboarding payments by dispatching payment links via WhatsApp & Voice Calls.',
        type: AIAgentType.PAYMENT_REMINDER,
        classification: AIAgentClassification.SPECIALIST_AGENT,
        layer: AIWorkforceLayer.SPECIALIZED,
        department: Department.PAYMENT,
        reportsToHumanRole: UserRole.PAYMENT_TL,
        assignedHumanTLId: 'usr-payment-tl',
        status: 'ACTIVE',
        lifecycleStatus: AILifecycleStatus.ACTIVE,
        runtimeAvailability: AIRuntimeAvailability.AVAILABLE,
        riskLevel: AIRiskLevel.HIGH,
        model: 'Gemini 1.5 Flash',
        modelConfig: { provider: 'GEMINI', model: 'gemini-1.5-flash', temperature: 0.2, maxTokens: 1024, timeoutMs: 15000, fallbackModel: 'gpt-4o-mini' },
        version: '1.0.0',
        promptVersion: 'Payment Reminder Prompt v1',
        knowledgeBaseScope: ['Pending Payment SOPs'],
        tools: ['PaymentLinkGeneratorTool', 'MultiChannelNotificationTool'],
        permissions: ['PAYMENT_LINK_CREATE', 'NOTIFICATION_SEND'],
        maxConcurrentTasks: 25,
        currentTaskCount: 3,
        currentLoadPercent: 12,
        avgConfidenceScore: 96.2,
        capabilities: ['Pending Payment Follow-up', 'Failed Payment Links', 'Multi-channel Reminders'],
        createdAt: '2026-08-10',
        lastActiveAt: new Date().toISOString()
      },
      {
        id: 'node-pay-receipt',
        agentCode: 'AI-PAY-RECEIPT-001',
        name: 'Receipt Agent',
        purpose: 'Generate PDF tax invoices and payment confirmation receipts, sending them via Email and WhatsApp.',
        type: AIAgentType.RECEIPT,
        classification: AIAgentClassification.SPECIALIST_AGENT,
        layer: AIWorkforceLayer.SPECIALIZED,
        department: Department.PAYMENT,
        reportsToHumanRole: UserRole.PAYMENT_TL,
        assignedHumanTLId: 'usr-payment-tl',
        status: 'ACTIVE',
        lifecycleStatus: AILifecycleStatus.ACTIVE,
        runtimeAvailability: AIRuntimeAvailability.AVAILABLE,
        riskLevel: AIRiskLevel.HIGH,
        model: 'Gemini 1.5 Flash',
        modelConfig: { provider: 'GEMINI', model: 'gemini-1.5-flash', temperature: 0.0, maxTokens: 1024, timeoutMs: 15000, fallbackModel: 'gpt-4o-mini' },
        version: '1.0.0',
        promptVersion: 'Receipt Generator Prompt v1',
        knowledgeBaseScope: ['Tax Invoice SOPs'],
        tools: ['PDFInvoiceGeneratorTool', 'EmailDispatchTool'],
        permissions: ['INVOICE_CREATE', 'RECEIPT_SEND'],
        maxConcurrentTasks: 20,
        currentTaskCount: 1,
        currentLoadPercent: 5,
        avgConfidenceScore: 99.0,
        capabilities: ['PDF Invoice Generation', 'Payment Confirmation Receipt', 'Email/WhatsApp Dispatch'],
        createdAt: '2026-08-10',
        lastActiveAt: new Date().toISOString()
      },
      {
        id: 'node-pay-commission',
        agentCode: 'AI-PAY-COMMISSION-001',
        name: 'Commission Agent',
        purpose: 'Track referral codes, calculate tie-up agent commission credits, and update agent wallet balances.',
        type: AIAgentType.COMMISSION,
        classification: AIAgentClassification.SPECIALIST_AGENT,
        layer: AIWorkforceLayer.SPECIALIZED,
        department: Department.PAYMENT,
        reportsToHumanRole: UserRole.PAYMENT_TL,
        assignedHumanTLId: 'usr-payment-tl',
        status: 'ACTIVE',
        lifecycleStatus: AILifecycleStatus.ACTIVE,
        runtimeAvailability: AIRuntimeAvailability.AVAILABLE,
        riskLevel: AIRiskLevel.HIGH,
        model: 'Gemini 1.5 Flash',
        modelConfig: { provider: 'GEMINI', model: 'gemini-1.5-flash', temperature: 0.0, maxTokens: 1024, timeoutMs: 15000, fallbackModel: 'gpt-4o-mini' },
        version: '1.0.0',
        promptVersion: 'Commission Engine Prompt v1',
        knowledgeBaseScope: ['Tie-up Agent Commission Guidelines'],
        tools: ['ReferralTrackerTool', 'WalletCreditTool'],
        permissions: ['REFERRAL_READ', 'WALLET_CREDIT_WRITE'],
        maxConcurrentTasks: 20,
        currentTaskCount: 2,
        currentLoadPercent: 10,
        avgConfidenceScore: 97.8,
        capabilities: ['Referral Tracking', 'Agent Commission Calculation', 'Digital Wallet Credit'],
        createdAt: '2026-08-10',
        lastActiveAt: new Date().toISOString()
      },
      {
        id: 'node-pay-withdrawal',
        agentCode: 'AI-PAY-WITHDRAWAL-001',
        name: 'Withdrawal Agent',
        purpose: 'Process tie-up agent wallet payout requests, validate bank account details, and track withdrawal status.',
        type: AIAgentType.WITHDRAWAL,
        classification: AIAgentClassification.SPECIALIST_AGENT,
        layer: AIWorkforceLayer.SPECIALIZED,
        department: Department.PAYMENT,
        reportsToHumanRole: UserRole.PAYMENT_TL,
        assignedHumanTLId: 'usr-payment-tl',
        status: 'ACTIVE',
        lifecycleStatus: AILifecycleStatus.ACTIVE,
        runtimeAvailability: AIRuntimeAvailability.AVAILABLE,
        riskLevel: AIRiskLevel.CRITICAL,
        model: 'Gemini 1.5 Pro',
        modelConfig: { provider: 'GEMINI', model: 'gemini-1.5-pro', temperature: 0.0, maxTokens: 2048, timeoutMs: 30000, fallbackModel: 'gpt-4o-mini' },
        version: '1.0.0',
        promptVersion: 'Withdrawal Safety Prompt v1',
        knowledgeBaseScope: ['Agent Payout Rules', 'Banking Guidelines'],
        tools: ['BankValidationTool', 'PayoutStatusTrackerTool'],
        permissions: ['PAYOUT_READ', 'PAYOUT_VERIFY'],
        maxConcurrentTasks: 15,
        currentTaskCount: 1,
        currentLoadPercent: 7,
        avgConfidenceScore: 96.9,
        capabilities: ['Agent Payout Request Processing', 'Bank Account Validation', 'Payout Status Track'],
        createdAt: '2026-08-10',
        lastActiveAt: new Date().toISOString()
      },

      // SHARED SERVICES & CONTROL AGENTS (Types 4 & 5)
      {
        id: 'node-spec-calling',
        agentCode: 'AI-SHARED-CALL-001',
        name: 'Calling Agent (Voice Telephony)',
        purpose: 'Synthesize voice calls, process Speech-to-Text/Text-to-Speech, and generate spoken response audio via Exotel.',
        type: AISpecializedAgentType.CALLING_AI,
        classification: AIAgentClassification.SHARED_SERVICE_AGENT,
        layer: AIWorkforceLayer.SPECIALIZED,
        department: Department.SYSTEM,
        reportsToHumanRole: UserRole.ADMIN,
        status: 'ACTIVE',
        lifecycleStatus: AILifecycleStatus.ACTIVE,
        runtimeAvailability: AIRuntimeAvailability.AVAILABLE,
        riskLevel: AIRiskLevel.MEDIUM,
        model: 'Exotel Voice / Gemini 1.5 Flash',
        modelConfig: { provider: 'GEMINI', model: 'gemini-1.5-flash', temperature: 0.3, maxTokens: 1024, timeoutMs: 15000, fallbackModel: 'gpt-4o-mini' },
        version: '1.0.0',
        promptVersion: 'Voice Call Speech Prompt v1',
        knowledgeBaseScope: ['Spoken Telephony Guidelines'],
        tools: ['ExotelCallSynthTool', 'STTConverterTool', 'TTSAudioGeneratorTool'],
        permissions: ['VOICE_CALL_EXECUTE', 'TRANSCRIPT_WRITE'],
        maxConcurrentTasks: 30,
        currentTaskCount: 1,
        currentLoadPercent: 3,
        avgConfidenceScore: 95.0,
        capabilities: ['Voice Call Synthesis', 'STT/TTS Processing', 'IVR Call Transcripts', 'Spoken Response Formatting'],
        createdAt: '2026-08-10',
        lastActiveAt: new Date().toISOString()
      },
      {
        id: 'node-spec-whatsapp',
        agentCode: 'AI-SHARED-WHATSAPP-001',
        name: 'WhatsApp Agent (Cloud API)',
        purpose: 'Dispatch interactive WhatsApp messages, button templates, media attachments, and payment reminder links.',
        type: AISpecializedAgentType.WHATSAPP_AI,
        classification: AIAgentClassification.SHARED_SERVICE_AGENT,
        layer: AIWorkforceLayer.SPECIALIZED,
        department: Department.SYSTEM,
        reportsToHumanRole: UserRole.ADMIN,
        status: 'ACTIVE',
        lifecycleStatus: AILifecycleStatus.ACTIVE,
        runtimeAvailability: AIRuntimeAvailability.AVAILABLE,
        riskLevel: AIRiskLevel.MEDIUM,
        model: 'Meta Cloud API / Gemini 1.5 Flash',
        modelConfig: { provider: 'GEMINI', model: 'gemini-1.5-flash', temperature: 0.2, maxTokens: 1024, timeoutMs: 15000, fallbackModel: 'gpt-4o-mini' },
        version: '1.0.0',
        promptVersion: 'WhatsApp Message Format Prompt v1',
        knowledgeBaseScope: ['WhatsApp Communication Guidelines'],
        tools: ['WhatsAppCloudAPITool', 'InteractiveButtonTool'],
        permissions: ['WHATSAPP_SEND', 'MEDIA_ATTACH_WRITE'],
        maxConcurrentTasks: 50,
        currentTaskCount: 6,
        currentLoadPercent: 12,
        avgConfidenceScore: 96.8,
        capabilities: ['Interactive Button Messages', 'Rich Media Attachments', 'Emoji Formatting', 'Instant Delivery'],
        createdAt: '2026-08-10',
        lastActiveAt: new Date().toISOString()
      },
      {
        id: 'node-spec-email',
        agentCode: 'AI-SHARED-EMAIL-001',
        name: 'Email Agent (SendGrid/SES)',
        purpose: 'Dispatch transactional HTML emails, credential activations, PDF receipts, and onboarding notices.',
        type: AISpecializedAgentType.EMAIL_AI,
        classification: AIAgentClassification.SHARED_SERVICE_AGENT,
        layer: AIWorkforceLayer.SPECIALIZED,
        department: Department.SYSTEM,
        reportsToHumanRole: UserRole.ADMIN,
        status: 'ACTIVE',
        lifecycleStatus: AILifecycleStatus.ACTIVE,
        runtimeAvailability: AIRuntimeAvailability.AVAILABLE,
        riskLevel: AIRiskLevel.MEDIUM,
        model: 'SendGrid API / Gemini 1.5 Flash',
        modelConfig: { provider: 'GEMINI', model: 'gemini-1.5-flash', temperature: 0.1, maxTokens: 1024, timeoutMs: 15000, fallbackModel: 'gpt-4o-mini' },
        version: '1.0.0',
        promptVersion: 'Email Layout Prompt v1',
        knowledgeBaseScope: ['Email Communication Guidelines'],
        tools: ['SendGridMailerTool', 'PDFTemplateGeneratorTool'],
        permissions: ['EMAIL_SEND', 'ATTACHMENT_WRITE'],
        maxConcurrentTasks: 50,
        currentTaskCount: 3,
        currentLoadPercent: 6,
        avgConfidenceScore: 98.0,
        capabilities: ['HTML Email Layouts', 'PDF Attachment Generation', 'Transactional Email Dispatch'],
        createdAt: '2026-08-10',
        lastActiveAt: new Date().toISOString()
      },
      {
        id: 'node-spec-translation',
        agentCode: 'AI-SHARED-TRANSLATION-001',
        name: 'Translation Agent',
        purpose: 'Detect incoming query languages and translate real-time responses into Tamil, Hindi, or English.',
        type: AISpecializedAgentType.TRANSLATION_AI,
        classification: AIAgentClassification.SHARED_SERVICE_AGENT,
        layer: AIWorkforceLayer.SPECIALIZED,
        department: Department.SYSTEM,
        reportsToHumanRole: UserRole.ADMIN,
        status: 'ACTIVE',
        lifecycleStatus: AILifecycleStatus.ACTIVE,
        runtimeAvailability: AIRuntimeAvailability.AVAILABLE,
        riskLevel: AIRiskLevel.LOW,
        model: 'Gemini 1.5 Flash (Multi-lingual)',
        modelConfig: { provider: 'GEMINI', model: 'gemini-1.5-flash', temperature: 0.1, maxTokens: 1024, timeoutMs: 15000, fallbackModel: 'gpt-4o-mini' },
        version: '1.0.0',
        promptVersion: 'Translation Prompt v1',
        knowledgeBaseScope: ['Regional Language Terms'],
        tools: ['LanguageDetectorTool', 'TamilHindiTranslatorTool'],
        permissions: ['TRANSLATION_EXECUTE'],
        maxConcurrentTasks: 40,
        currentTaskCount: 2,
        currentLoadPercent: 5,
        avgConfidenceScore: 95.5,
        capabilities: ['Multi-lingual Detection', 'Tamil/Hindi/English Translation', 'Cultural Context Adaptation'],
        createdAt: '2026-08-10',
        lastActiveAt: new Date().toISOString()
      },
      {
        id: 'node-spec-escalation',
        agentCode: 'AI-SHARED-ESCALATION-001',
        name: 'Escalation Agent',
        purpose: 'Monitor safety thresholds, policy uncertainties, and confidence scores (<80%), escalating tickets to Human TLs.',
        type: AISpecializedAgentType.ESCALATION_AI,
        classification: AIAgentClassification.CONTROL_AGENT,
        layer: AIWorkforceLayer.SPECIALIZED,
        department: Department.SYSTEM,
        reportsToHumanRole: UserRole.SUPER_ADMIN,
        status: 'ACTIVE',
        lifecycleStatus: AILifecycleStatus.ACTIVE,
        runtimeAvailability: AIRuntimeAvailability.AVAILABLE,
        riskLevel: AIRiskLevel.CRITICAL,
        model: 'Gemini 1.5 Pro',
        modelConfig: { provider: 'GEMINI', model: 'gemini-1.5-pro', temperature: 0.0, maxTokens: 2048, timeoutMs: 30000, fallbackModel: 'gpt-4o-mini' },
        version: '1.0.0',
        promptVersion: 'Escalation Safety Monitor Prompt v1',
        knowledgeBaseScope: ['Escalation Rules', 'SLA Policy Limits'],
        tools: ['ConfidenceMonitorTool', 'HumanTLHandoffTool'],
        permissions: ['ESCALATION_EXECUTE', 'TL_ALERT_WRITE'],
        maxConcurrentTasks: 20,
        currentTaskCount: 0,
        currentLoadPercent: 0,
        avgConfidenceScore: 99.0,
        capabilities: ['Confidence Threshold Breach Detect', 'Human TL Ticket Escalation', 'Context Summary Handoff'],
        createdAt: '2026-08-10',
        lastActiveAt: new Date().toISOString()
      },
      {
        id: 'node-spec-knowledge',
        agentCode: 'AI-SHARED-KNOWLEDGE-001',
        name: 'Knowledge/Retrieval Agent',
        purpose: 'Perform vector search, select authoritative RAG sources, prepare contextual snippets, and chunk SOP documents.',
        type: AISpecializedAgentType.KNOWLEDGE_AI,
        classification: AIAgentClassification.SHARED_SERVICE_AGENT,
        layer: AIWorkforceLayer.SPECIALIZED,
        department: Department.SYSTEM,
        reportsToHumanRole: UserRole.ADMIN,
        status: 'ACTIVE',
        lifecycleStatus: AILifecycleStatus.ACTIVE,
        runtimeAvailability: AIRuntimeAvailability.AVAILABLE,
        riskLevel: AIRiskLevel.LOW,
        model: 'Gemini 1.5 Flash',
        modelConfig: { provider: 'GEMINI', model: 'gemini-1.5-flash', temperature: 0.0, maxTokens: 2048, timeoutMs: 15000, fallbackModel: 'gpt-4o-mini' },
        version: '1.0.0',
        promptVersion: 'RAG Knowledge Retrieval Prompt v1',
        knowledgeBaseScope: ['Global RAG Store', 'Enterprise SOP Index'],
        tools: ['VectorSearchTool', 'DocumentChunkerTool', 'ContextFormatterTool'],
        permissions: ['RAG_READ', 'VECTOR_SEARCH_EXECUTE'],
        maxConcurrentTasks: 50,
        currentTaskCount: 4,
        currentLoadPercent: 8,
        avgConfidenceScore: 98.2,
        capabilities: ['Knowledge Retrieval', 'RAG Vector Search', 'Source Selection', 'Context Preparation'],
        createdAt: '2026-08-10',
        lastActiveAt: new Date().toISOString()
      }
    ];

    nodes.forEach(n => this.aiWorkforceRegistry.set(n.id, n));
  }

  private seedInitialTicketsAndOps() {
    const t1: Ticket = {
      id: 'tck-1001',
      ticketNumber: 'TKT-9901',
      userId: 'usr-customer-1',
      userName: 'Rajesh Kumar',
      userRole: UserRole.CUSTOMER,
      channel: 'CHAT_WEB',
      department: Department.QUERY,
      subject: 'Delay in Onboarding Technician Visit',
      initialQuery: 'I paid for on-site onboarding 3 days ago. No technician has arrived yet.',
      assignedAgent: AIAgentType.QUERY,
      priority: TicketPriority.HIGH,
      status: TicketStatus.IN_PROGRESS,
      confidenceScore: 96,
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      updatedAt: new Date().toISOString()
    };

    const t2: Ticket = {
      id: 'tck-1002',
      ticketNumber: 'TKT-9902',
      userId: 'usr-vendor-1',
      userName: 'Apex Solutions Pvt Ltd',
      userRole: UserRole.VENDOR,
      channel: 'VOICE_TWILIO',
      department: Department.KYC,
      subject: 'GST Certificate Document Verification Pending',
      initialQuery: 'Uploaded GST details twice, getting blur warning alert.',
      assignedAgent: AIAgentType.KYC,
      priority: TicketPriority.MEDIUM,
      status: TicketStatus.ESCALATED_TO_TL,
      confidenceScore: 72,
      escalationReason: 'Blur score 0.48 exceeds automated approval safety threshold 0.45.',
      assignedTeamLeadId: 'usr-kyc-tl',
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.tickets.set(t1.id, t1);
    this.tickets.set(t2.id, t2);

    const kyc1: KYCVerificationRecord = {
      id: 'KYC-801',
      userId: 'usr-vendor-1',
      userRole: UserRole.VENDOR,
      documentType: 'International Passport',
      documentUrl: 'https://storage.enterpriseai.com/docs/passport-elena.png',
      ocrExtractedData: {
        name: 'Elena Rostova',
        idNumber: 'P98240192',
        dob: '1992-04-14'
      },
      blurScore: 0.35,
      forgeryRiskScore: 0.78,
      faceMatchScore: 0.82,
      isBlacklisted: false,
      isDuplicateDocument: false,
      governmentVerificationStatus: 'PENDING_REVIEW',
      criminalVerificationStatus: 'CLEAN',
      aiDecision: KYCStatus.NEED_REUPLOAD,
      aiReasoning: 'Contrast Blur < 0.40 & Photo Reflective Glare Flagged',
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      updatedAt: new Date().toISOString()
    };

    const kyc2: KYCVerificationRecord = {
      id: 'KYC-802',
      userId: 'usr-customer-1',
      userRole: UserRole.CUSTOMER,
      documentType: 'Aadhaar / National ID',
      documentUrl: 'https://storage.enterpriseai.com/docs/national-id-david.png',
      ocrExtractedData: {
        name: 'David Miller',
        idNumber: '4820-1920-3841',
        dob: '1988-11-22'
      },
      blurScore: 0.92,
      forgeryRiskScore: 0.02,
      faceMatchScore: 0.98,
      isBlacklisted: false,
      isDuplicateDocument: false,
      governmentVerificationStatus: 'VERIFIED',
      criminalVerificationStatus: 'CLEAN',
      aiDecision: KYCStatus.APPROVED,
      aiReasoning: 'Zero anomaly matches. Biometric facial score 0.98 match.',
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      updatedAt: new Date().toISOString()
    };

    const kyc3: KYCVerificationRecord = {
      id: 'KYC-803',
      userId: 'usr-vendor-2',
      userRole: UserRole.VENDOR,
      documentType: 'Drivers License ID',
      documentUrl: 'https://storage.enterpriseai.com/docs/dl-apex.png',
      ocrExtractedData: {
        name: 'Apex Corporate Entity',
        idNumber: 'DL-9941029',
        dob: '1985-06-30'
      },
      blurScore: 0.74,
      forgeryRiskScore: 0.45,
      faceMatchScore: 0.88,
      isBlacklisted: false,
      isDuplicateDocument: false,
      governmentVerificationStatus: 'EXPIRED',
      criminalVerificationStatus: 'CLEAN',
      aiDecision: KYCStatus.REJECTED,
      aiReasoning: 'Expired Document Warning (Expired 2025-12-31)',
      createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      updatedAt: new Date().toISOString()
    };

    const kyc4: KYCVerificationRecord = {
      id: 'KYC-804',
      userId: 'usr-customer-2',
      userRole: UserRole.CUSTOMER,
      documentType: 'Passport Copy Scan',
      documentUrl: 'https://storage.enterpriseai.com/docs/passport-frank.png',
      ocrExtractedData: {
        name: 'Frank Miller',
        idNumber: 'P11049281',
        dob: '1995-01-10'
      },
      blurScore: 0.81,
      forgeryRiskScore: 0.95,
      faceMatchScore: 0.42,
      isBlacklisted: true,
      isDuplicateDocument: false,
      governmentVerificationStatus: 'FAILED_CHECKSUM',
      criminalVerificationStatus: 'FLAGGED',
      aiDecision: KYCStatus.ESCALATED_TO_TL,
      aiReasoning: 'MRZ Checksum Mismatch & Digital Image Font Modification Alert',
      createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
      updatedAt: new Date().toISOString()
    };

    const kyc5: KYCVerificationRecord = {
      id: 'KYC-805',
      userId: 'usr-agent-1',
      userRole: UserRole.AGENT,
      documentType: 'Tax Identification Certificate',
      documentUrl: 'https://storage.enterpriseai.com/docs/tax-sophia.png',
      ocrExtractedData: {
        name: 'Sophia Chen',
        idNumber: 'TAX-99210-C',
        dob: '1990-09-05'
      },
      blurScore: 0.96,
      forgeryRiskScore: 0.01,
      faceMatchScore: 0.99,
      isBlacklisted: false,
      isDuplicateDocument: false,
      governmentVerificationStatus: 'VERIFIED',
      criminalVerificationStatus: 'CLEAN',
      aiDecision: KYCStatus.APPROVED,
      aiReasoning: 'Verified with National Tax Database API automatically.',
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      updatedAt: new Date().toISOString()
    };

    const kyc6: KYCVerificationRecord = {
      id: 'KYC-806',
      userId: 'usr-suspended-1',
      userRole: UserRole.VENDOR,
      documentType: 'National ID Card',
      documentUrl: 'https://storage.enterpriseai.com/docs/fake-id.png',
      ocrExtractedData: {
        name: 'Suspended Vendor',
        idNumber: '4820-1920-3841',
        dob: '1988-11-22'
      },
      blurScore: 0.85,
      forgeryRiskScore: 0.99,
      faceMatchScore: 0.35,
      isBlacklisted: true,
      isDuplicateDocument: true,
      governmentVerificationStatus: 'DUPLICATE_FLAG',
      criminalVerificationStatus: 'FLAGGED',
      aiDecision: KYCStatus.ESCALATED_TO_TL,
      aiReasoning: 'Duplicate Document ID matched existing active account (KYC-802 David Miller)',
      createdAt: new Date(Date.now() - 3600000 * 30).toISOString(),
      updatedAt: new Date().toISOString()
    };

    [kyc1, kyc2, kyc3, kyc4, kyc5, kyc6].forEach(k => this.kycRecords.set(k.id, k));

    const pay1: PaymentTransaction = {
      id: 'pay-5501',
      userId: 'usr-vendor-1',
      amount: 2500,
      purpose: 'VENDOR_ONBOARDING',
      paymentLinkUrl: 'https://pay.enterpriseai.com/checkout/pay-5501',
      gatewayTxnId: 'TXN-99882211',
      status: PaymentStatus.SUCCESS,
      invoiceUrl: 'https://storage.enterpriseai.com/invoices/inv-5501.pdf',
      receiptUrl: 'https://storage.enterpriseai.com/receipts/rec-5501.pdf',
      agentReferralCommission: 250,
      referredAgentId: 'usr-agent-1',
      reminderCallCount: 1,
      createdAt: new Date(Date.now() - 43200000).toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.payments.set(pay1.id, pay1);

    this.commissions.push({
      id: 'comm-101',
      agentId: 'usr-agent-1',
      vendorId: 'usr-vendor-1',
      transactionId: 'pay-5501',
      amount: 250,
      status: 'CREDITED',
      createdAt: new Date(Date.now() - 40000000).toISOString()
    });
  }

  private seedAuditLogs() {
    this.auditLogs = [
      {
        id: 'audit-1',
        timestamp: new Date(Date.now() - 3600000 * 0.1).toISOString(),
        actor: 'Alexander Vance',
        isHuman: true,
        action: 'PROMPT_UPDATE',
        relatedEntity: 'Prompt Template (pmt-kyc)',
        beforeValue: 'You are the AI KYC Agent. Validate document OCR blur (threshold 0.45)...',
        afterValue: 'You are the AI KYC Agent. Validate document OCR blur (threshold 0.40) and liveness...',
        reason: 'Tightening fraud detection criteria for vendor registrations due to rise in blurry PAN submissions.',
        validationPassed: true,
        inputPayload: { promptId: 'pmt-kyc' },
        outputResult: { success: true },
        decisionReasoning: 'Updated system prompt to lower blur tolerance score from 0.45 to 0.40.'
      },
      {
        id: 'audit-2',
        timestamp: new Date(Date.now() - 3600000 * 0.5).toISOString(),
        actor: 'AI_KYC_AGENT',
        isHuman: false,
        action: 'KYC_APPROVAL',
        relatedEntity: 'KYC Record (kyc-7701)',
        beforeValue: 'PENDING',
        afterValue: 'APPROVED',
        reason: 'Automated OCR scan of PAN card matched candidate database successfully. Blur score 0.12, Face match 98%.',
        validationPassed: true,
        inputPayload: { recordId: 'kyc-7701' },
        outputResult: { decision: 'APPROVED' },
        decisionReasoning: 'OCR blur score and liveness face checks all passed minimum safety limits.'
      },
      {
        id: 'audit-3',
        timestamp: new Date(Date.now() - 3600000 * 1.2).toISOString(),
        actor: 'Sarah Connor',
        isHuman: true,
        action: 'WORKFLOW_UPDATE',
        relatedEntity: 'Workflow (wf-vendor-referral)',
        beforeValue: { active: true },
        afterValue: { active: false },
        reason: 'Temporarily pausing referral verification workflow during system-wide database maintenance window.',
        validationPassed: true,
        inputPayload: { workflowId: 'wf-vendor-referral', status: 'PAUSE' },
        outputResult: { success: true },
        decisionReasoning: 'Administrator action to pause workflow definition.'
      },
      {
        id: 'audit-4',
        timestamp: new Date(Date.now() - 3600000 * 2.4).toISOString(),
        actor: 'AI_PAYMENT_AGENT',
        isHuman: false,
        action: 'PAYMENT_VERIFICATION',
        relatedEntity: 'Payment Transaction (pay-5501)',
        beforeValue: 'PENDING',
        afterValue: 'SUCCESS',
        reason: 'Verified transaction status successfully. Stripe webhook charge status confirmed: succeeded.',
        validationPassed: true,
        inputPayload: { gatewayTxnId: 'TXN-99882211' },
        outputResult: { status: 'SUCCESS' },
        decisionReasoning: 'Payment gateway hook received and transaction settled.'
      },
      {
        id: 'audit-5',
        timestamp: new Date(Date.now() - 3600000 * 4.8).toISOString(),
        actor: 'Alexander Vance',
        isHuman: true,
        action: 'CONFIG_CHANGE',
        relatedEntity: 'Platform SLA Settings',
        beforeValue: { warningThresholdPercent: 75 },
        afterValue: { warningThresholdPercent: 85 },
        reason: 'Adjusting load warnings dynamically based on newly onboarded Support Team Lead capacity.',
        validationPassed: true,
        inputPayload: { departmentId: 'DEPT_SUPPORT', config: { threshold: 85 } },
        outputResult: { success: true },
        decisionReasoning: 'Warning SLA capacity threshold adjusted to prevent false positive notifications.'
      },
      {
        id: 'audit-6',
        timestamp: new Date(Date.now() - 3600000 * 6.2).toISOString(),
        actor: 'Elena Rostova',
        isHuman: true,
        action: 'USER_LOGIN',
        relatedEntity: 'User Account (usr-kyc-tl)',
        beforeValue: { activeSession: false },
        afterValue: { activeSession: true },
        reason: 'User logged in successfully via Twilio MFA verification token.',
        validationPassed: true,
        inputPayload: { email: 'elena.rostova@enterprise.ai' },
        outputResult: { sessionToken: 'jwt-elena-991' },
        decisionReasoning: 'Valid credentials and token provided.'
      },
      {
        id: 'audit-7',
        timestamp: new Date(Date.now() - 3600000 * 12.5).toISOString(),
        actor: 'AI_ROUTER_AGENT',
        isHuman: false,
        action: 'AI_DECISION',
        relatedEntity: 'Ticket (tck-1001)',
        beforeValue: { department: 'UNASSIGNED', priority: 'NONE' },
        afterValue: { department: 'QUERY', priority: 'HIGH' },
        reason: 'Auto-routed based on keyword match for technician delay and refund warning.',
        validationPassed: true,
        inputPayload: { ticketId: 'tck-1001', message: 'I paid for on-site onboarding 3 days ago. No technician has arrived yet.' },
        outputResult: { department: 'QUERY', priority: 'HIGH' },
        decisionReasoning: 'Classification model outputs confidence 96.5% for query route.'
      }
    ];
  }
  private seedDepartments() {
    const depts: DepartmentConfig[] = [
      {
        id: 'dept-1',
        name: 'Queries Desk',
        code: 'DEPT-QRY',
        description: 'Handles general customer inquiries, order tracking, product specs & AI routing',
        teamLead: 'Queries Team Lead',
        assignedAgents: ['AI Query Agent', 'AI Router Agent', 'AI Calling Agent'],
        humanCount: 8,
        workloadPercentage: 42,
        status: 'ACTIVE',
        queueStrategy: 'AI_AUTO_ROUTING',
        maxQueueCapacity: 500,
        activeQueueCount: 14,
        aiAutopilot: true,
        aiConfidenceThreshold: 85,
        primaryModel: 'Gemini 1.5 Pro (Google DeepMind)',
        temperature: 0.2,
        firstResponseSLA: '< 2 Mins',
        resolutionSLA: '< 15 Mins',
        warningThresholdPercent: 80,
        autoEscalateOnBreach: true
      },
      {
        id: 'dept-2',
        name: 'KYC Verification Desk',
        code: 'DEPT-KYC',
        description: 'Manages document OCR validation, blur detection, identity verification & forgery flags',
        teamLead: 'KYC Team Lead',
        assignedAgents: ['AI KYC Agent', 'AI Fraud Agent', 'AI Profile Agent'],
        humanCount: 5,
        workloadPercentage: 28,
        status: 'ACTIVE',
        queueStrategy: 'SKILL_BASED',
        maxQueueCapacity: 300,
        activeQueueCount: 5,
        aiAutopilot: false,
        aiConfidenceThreshold: 90,
        primaryModel: 'Gemini 1.5 Pro (Vision OCR)',
        temperature: 0.1,
        firstResponseSLA: '< 5 Mins',
        resolutionSLA: '< 30 Mins',
        warningThresholdPercent: 75,
        autoEscalateOnBreach: true
      },
      {
        id: 'dept-3',
        name: 'Payment & Financial Desk',
        code: 'DEPT-PAY',
        description: 'Controls vendor onboarding fees, referral payouts, link dispatch & settlement reconciliation',
        teamLead: 'Payment Team Lead',
        assignedAgents: ['AI Payment Agent', 'AI Email Agent', 'AI WhatsApp Agent'],
        humanCount: 4,
        workloadPercentage: 35,
        status: 'ACTIVE',
        queueStrategy: 'ROUND_ROBIN',
        maxQueueCapacity: 250,
        activeQueueCount: 3,
        aiAutopilot: true,
        aiConfidenceThreshold: 95,
        primaryModel: 'Gemini 1.5 Flash (Instant Pay)',
        temperature: 0.0,
        firstResponseSLA: 'Instant',
        resolutionSLA: '< 10 Mins',
        warningThresholdPercent: 85,
        autoEscalateOnBreach: true
      },
      {
        id: 'dept-4',
        name: 'AI Governance & Engineering',
        code: 'DEPT-GOV',
        description: 'AI System Engineer oversight, decision replay, prompt sandbox auditing & SLA rules',
        teamLead: 'AI Workforce Inspector',
        assignedAgents: ['AI Monitoring Agent', 'AI Knowledge Agent'],
        humanCount: 3,
        workloadPercentage: 15,
        status: 'ACTIVE',
        queueStrategy: 'AI_AUTO_ROUTING',
        maxQueueCapacity: 100,
        activeQueueCount: 0,
        aiAutopilot: true,
        aiConfidenceThreshold: 98,
        primaryModel: 'Gemini 1.5 Pro (Telemetry Engine)',
        temperature: 0.1,
        firstResponseSLA: '< 1 Min',
        resolutionSLA: '< 5 Mins',
        warningThresholdPercent: 90,
        autoEscalateOnBreach: true
      }
    ];

    depts.forEach(dept => {
      this.departments.set(dept.id, dept);
    });
  }
}

export const store = new InMemoryStore();
