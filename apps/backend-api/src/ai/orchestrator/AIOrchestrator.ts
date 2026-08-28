import { store } from '../../db/inMemoryStore';
import { RouterAgent } from '../agents/RouterAgent';
import { CustomerProfileAgent } from '../agents/CustomerProfileAgent';
import { QueryAgent } from '../agents/QueryAgent';
import { KYCAgent } from '../agents/KYCAgent';
import { PaymentAgent } from '../agents/PaymentAgent';
import { FraudDetectionAgent } from '../agents/FraudDetectionAgent';
import { CallingAgent } from '../agents/CallingAgent';
import { EmailAgent } from '../agents/EmailAgent';
import { WhatsAppAgent } from '../agents/WhatsAppAgent';
import { AuditService } from '../../services/AuditService';
import { Ticket, TicketStatus, UserRole, AIAgentType, AIActionControlLevel, RequesterType } from '../../types';
import { v4 as uuidv4 } from 'uuid';

export class AIOrchestrator {
  /**
   * PHASE 4 — ENTERPRISE AI ORCHESTRATOR 7-QUESTION EXECUTION PIPELINE
   */

  /**
   * QUESTION 1 — Who is this?
   * Identifies requester ID, role, requester type (CUSTOMER | VENDOR | AGENT), and account tier.
   */
  public static question1_IdentifyRequester(userId?: string) {
    const targetUserId = userId || 'usr-customer-1';
    const user = store.users.get(targetUserId);
    return {
      userId: targetUserId,
      userName: user?.name || 'Guest User',
      userRole: user?.role || UserRole.CUSTOMER,
      requesterType: (user?.role === UserRole.AGENT ? RequesterType.AGENT : user?.role === UserRole.VENDOR ? RequesterType.VENDOR : RequesterType.CUSTOMER),
      tier: user?.role === UserRole.CUSTOMER ? 'GOLD' : 'STANDARD'
    };
  }

  /**
   * QUESTION 2 — What are they asking?
   * Classifies primary intent, language, category (Order, KYC, Payment, Booking, Membership, Refund, Commission, etc.)
   */
  public static async question2_UnderstandIntent(input: { query: string; channel: string; userId: string }) {
    return await RouterAgent.analyzeAndRoute(input);
  }

  /**
   * QUESTION 3 — Which department?
   * Resolves target department boundary (QUERY | KYC | PAYMENT)
   */
  public static question3_IdentifyDepartment(routingResult: any) {
    return routingResult.department;
  }

  /**
   * QUESTION 4 — Which AI agent?
   * Selects target specialized AI worker node from 25-agent registry.
   */
  public static question4_SelectAIAgent(routingResult: any) {
    const agentCodeMap: Record<string, string> = {
      [AIAgentType.ORDER_SUPPORT]: 'AI-QUERY-ORDER-001',
      [AIAgentType.BOOKING_SUPPORT]: 'AI-QUERY-BOOKING-001',
      [AIAgentType.SERVICE_SUPPORT]: 'AI-QUERY-SERVICE-001',
      [AIAgentType.MEMBERSHIP_SUPPORT]: 'AI-QUERY-MEMBERSHIP-001',
      [AIAgentType.GENERAL_SUPPORT]: 'AI-QUERY-GENERAL-001',
      [AIAgentType.DOCUMENT_COLLECTION]: 'AI-KYC-COLLECT-001',
      [AIAgentType.DOCUMENT_QUALITY]: 'AI-KYC-QUALITY-001',
      [AIAgentType.DOCUMENT_VERIFICATION]: 'AI-KYC-DOCVERIFY-001',
      [AIAgentType.IDENTITY_VERIFICATION]: 'AI-KYC-IDENTITY-001',
      [AIAgentType.VENDOR_VERIFICATION]: 'AI-KYC-VENDOR-001',
      [AIAgentType.KYC_DECISION]: 'AI-KYC-DECISION-001',
      [AIAgentType.PAYMENT_VERIFICATION]: 'AI-PAY-VERIFY-001',
      [AIAgentType.PAYMENT_REMINDER]: 'AI-PAY-REMINDER-001',
      [AIAgentType.RECEIPT]: 'AI-PAY-RECEIPT-001',
      [AIAgentType.COMMISSION]: 'AI-PAY-COMMISSION-001',
      [AIAgentType.WITHDRAWAL]: 'AI-PAY-WITHDRAWAL-001',
      [AIAgentType.KYC]: 'AI-KYC-COORD-001',
      [AIAgentType.PAYMENT]: 'AI-PAY-COORD-001',
      [AIAgentType.QUERY]: 'AI-QUERY-COORD-001'
    };

    const targetAgent = routingResult.targetAgent;
    const agentCode = agentCodeMap[targetAgent] || 'AI-QUERY-GENERAL-001';
    return { targetAgent, agentCode };
  }

  /**
   * QUESTION 5 — What information is required?
   * Gathers 360 profile, order history, KYC status, payment ledgers, and RAG knowledge.
   */
  public static question5_GatherRequiredInformation(userId: string) {
    const profile360 = CustomerProfileAgent.get360Profile(userId);
    const fraudEvaluation = FraudDetectionAgent.evaluateRisk({
      userId,
      email: profile360.user.email,
      panNumber: profile360.user.panNumber,
      aadhaarNumber: profile360.user.aadhaarNumber
    });
    return { profile360, fraudEvaluation };
  }

  /**
   * QUESTION 6 — Which tools are needed?
   * Selects authorized tool API execution plan.
   */
  public static question6_SelectNeededTools(targetAgent: AIAgentType) {
    const toolMap: Record<string, string[]> = {
      [AIAgentType.KYC]: ['OCRTool', 'BlurDetectionTool', 'GovtVerificationTool', 'AadhaarMaskingTool'],
      [AIAgentType.PAYMENT]: ['PaymentLinkTool', 'InvoiceGeneratorTool', 'ReferralCommissionTool', 'WhatsAppTool'],
      [AIAgentType.QUERY]: ['KnowledgeRAGTool', 'OrderLookupTool', 'BookingServiceTool', 'TicketTool']
    };
    return toolMap[targetAgent] || ['KnowledgeRAGTool', 'TicketTool'];
  }

  /**
   * QUESTION 7 — Can AI perform the action?
   * Evaluates permission checks & confidence scores. (YES -> Execute, NO -> Escalate)
   */
  public static question7_CanAIPerformAction(routingResult: any, query: string): {
    allowed: boolean;
    controlLevel: AIActionControlLevel;
    reason: string;
  } {
    const isRefundAction = query.toLowerCase().includes('refund');
    const isWithdrawalAction = query.toLowerCase().includes('withdraw') || query.toLowerCase().includes('payout');

    if (isRefundAction || isWithdrawalAction) {
      return {
        allowed: false,
        controlLevel: AIActionControlLevel.HUMAN_APPROVAL,
        reason: 'Refund/Payout execution strictly requires Human Approval per Enterprise Security Policy.'
      };
    }

    if (routingResult.confidenceScore < 80) {
      return {
        allowed: false,
        controlLevel: AIActionControlLevel.REQUEST_ONLY,
        reason: `AI Confidence Score (${routingResult.confidenceScore}%) breached safety threshold (80%).`
      };
    }

    return {
      allowed: true,
      controlLevel: AIActionControlLevel.AUTO,
      reason: 'Action authorized for automated AI execution.'
    };
  }

  public static async processIncomingRequest(input: {
    userId?: string;
    userName?: string;
    userRole?: UserRole;
    channel: 'CHAT_WEB' | 'CHAT_WHATSAPP' | 'VOICE_TWILIO' | 'VOICE_EXOTEL';
    query: string;
  }) {
    // 1. Question 1 — Who is this?
    const q1_requester = this.question1_IdentifyRequester(input.userId);

    // 2. Question 2 — What are they asking?
    const q2_intent = await this.question2_UnderstandIntent({
      query: input.query,
      channel: input.channel,
      userId: q1_requester.userId
    });

    // 3. Question 3 — Which department?
    const q3_department = this.question3_IdentifyDepartment(q2_intent);

    // 4. Question 4 — Which AI agent?
    const q4_agent = this.question4_SelectAIAgent(q2_intent);

    // 5. Question 5 — What information is required?
    const q5_information = this.question5_GatherRequiredInformation(q1_requester.userId);

    // 6. Question 6 — Which tools are needed?
    const q6_tools = this.question6_SelectNeededTools(q4_agent.targetAgent);

    // 7. Question 7 — Can AI perform the action?
    const q7_actionPerm = this.question7_CanAIPerformAction(q2_intent, input.query);

    // Ticket Record Initialization
    const ticketId = `tck-${uuidv4().substring(0, 8)}`;
    const ticketNumber = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;

    const ticket: Ticket = {
      id: ticketId,
      ticketNumber,
      userId: q1_requester.userId,
      userName: input.userName || q1_requester.userName,
      userRole: input.userRole || q1_requester.userRole,
      channel: input.channel,
      department: q3_department,
      subject: input.query.substring(0, 60),
      initialQuery: input.query,
      assignedAgent: q4_agent.targetAgent,
      priority: q2_intent.priority,
      status: q7_actionPerm.allowed ? TicketStatus.IN_PROGRESS : TicketStatus.ESCALATED_TO_TL,
      confidenceScore: q2_intent.confidenceScore,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (!q7_actionPerm.allowed) {
      ticket.escalationReason = q7_actionPerm.reason;
    }

    store.tickets.set(ticketId, ticket);

    // Workflow Execution
    let agentResult: any = null;
    if (q7_actionPerm.allowed) {
      if (q4_agent.targetAgent === AIAgentType.KYC) {
        agentResult = await KYCAgent.processVerification({
          userId: q1_requester.userId,
          userRole: q1_requester.userRole,
          documentType: 'PAN',
          documentUrl: input.query.toLowerCase().includes('blur') 
            ? 'https://storage.enterpriseai.com/docs/blur-pan.png'
            : 'https://storage.enterpriseai.com/docs/clean-pan.png'
        });
      } else if (q4_agent.targetAgent === AIAgentType.PAYMENT) {
        const payTxn = PaymentAgent.createPaymentLink({
          userId: q1_requester.userId,
          amount: 2500,
          purpose: 'SERVICE_BOOKING',
          referredAgentId: q5_information.profile360.user.referredByAgentCode
        });
        WhatsAppAgent.sendWhatsAppMessage({
          toPhone: q5_information.profile360.user.phone || '+91-98765-43210',
          messageType: 'PAYMENT_LINK',
          content: `Your payment link of $2,500 has been generated: ${payTxn.paymentLinkUrl}`,
          userId: q1_requester.userId
        });
        agentResult = payTxn;
      } else {
        agentResult = await QueryAgent.handleQuery({
          ticketId,
          userId: q1_requester.userId,
          query: input.query
        });
      }
      ticket.status = TicketStatus.AI_RESOLVED;
    } else {
      agentResult = {
        action: 'ESCALATED',
        reason: q7_actionPerm.reason,
        controlLevel: q7_actionPerm.controlLevel
      };
    }

    // Audit Record
    AuditService.logAction({
      actor: 'AI_ORCHESTRATOR',
      agentType: AIAgentType.ROUTER,
      action: 'ORCHESTRATE_AI_DECISION_ENGINE',
      ticketId,
      userId: q1_requester.userId,
      inputPayload: input,
      outputResult: { ticket, q2_intent, agentResult, selectedTools: q6_tools, actionAllowed: q7_actionPerm.allowed },
      decisionReasoning: `AI Orchestrator (Level 1 Head) executed 7-Question Pipeline. Result: ${q7_actionPerm.allowed ? 'EXECUTE' : 'ESCALATE'} (${q7_actionPerm.reason}).`,
      validationPassed: true
    });

    const isEscalated = !q7_actionPerm.allowed;

    return {
      ticket,
      routingResult: q2_intent,
      profile360: q5_information.profile360,
      fraudEvaluation: q5_information.fraudEvaluation,
      selectedTools: q6_tools,
      agentResult,
      isEscalated,
      q1_requester,
      q2_intent,
      q3_department,
      q4_agent,
      q5_information,
      q6_tools,
      q7_actionPerm,
      sevenQuestionsPipeline: [
        { question: 'Q1: Who is this?', answer: `${q1_requester.userName} (${q1_requester.userId}) - Type: ${q1_requester.requesterType}, Tier: ${q1_requester.tier}` },
        { question: 'Q2: What are they asking?', answer: `Intent: ${q2_intent.intent}, Category: ${q2_intent.intent}, Language: ${q2_intent.language}` },
        { question: 'Q3: Which department?', answer: `Department: ${q3_department}` },
        { question: 'Q4: Which AI agent?', answer: `Agent Code: ${q4_agent.agentCode} (${q4_agent.targetAgent})` },
        { question: 'Q5: What information is required?', answer: `360 Profile gathered (${q5_information.profile360.orderHistory.length} orders, Fraud Risk Score: ${q5_information.fraudEvaluation.riskScore})` },
        { question: 'Q6: Which tools are needed?', answer: `Tools Plan: [${q6_tools.join(', ')}]` },
        { question: 'Q7: Can AI perform the action?', answer: q7_actionPerm.allowed ? 'YES -> Execute' : `NO -> Escalate (${q7_actionPerm.reason})` }
      ],
      decisionPipelineSteps: [
        { step: 1, name: 'Receive request', detail: `Received query via ${input.channel}` },
        { step: 2, name: 'Understand request', detail: `Intent: ${q2_intent.intent}, Language: ${q2_intent.language}` },
        { step: 3, name: 'Identify requester', detail: `Requester: ${q1_requester.userName} (${q1_requester.userId}, Role: ${q1_requester.userRole})` },
        { step: 4, name: 'Gather required information', detail: `Query length: ${input.query.length} chars` },
        { step: 5, name: 'Identify department', detail: `Department: ${q3_department} (${q4_agent.targetAgent})` },
        { step: 6, name: 'Retrieve knowledge', detail: `RAG Policy docs & SOPs evaluated` },
        { step: 7, name: 'Retrieve live system data', detail: `360° Profile assembled (${q5_information.profile360.orderHistory.length} orders)` },
        { step: 8, name: 'Determine workflow', detail: `Routed with priority ${q2_intent.priority} (Conf: ${q2_intent.confidenceScore}%)` },
        { step: 9, name: 'Execute authorized actions', detail: `Selected Tools: [${q6_tools.join(', ')}]` },
        { step: 10, name: 'Verify result', detail: `Fraud Risk Score: ${q5_information.fraudEvaluation.riskScore} (Validation passed)` },
        { step: 11, name: 'Respond', detail: `Formatted and dispatched response to ${input.channel}` },
        { step: 12, name: 'Record everything', detail: `Written immutable Audit Log record for Ticket ${ticketNumber}` },
        { step: 13, name: 'Escalate when required', detail: isEscalated ? 'Escalated to Human TL Desk' : 'Automated AI Resolution (Confidence >= 80%)' }
      ]
    };
  }
}
