import { 
  AIToolCategory, 
  AIToolDefinition, 
  AIToolResult, 
  AIActionControlLevel, 
  AIToolErrorCode,
  AIRiskLevel,
  Department
} from '../../types';
import { z } from 'zod';

// ==========================================
// ZOD VALIDATION SCHEMAS FOR AI AGENT TOOLS
// ==========================================
export const toolArgumentSchemas: Record<string, z.ZodSchema> = {
  // 1. Identity & User Tools
  'getUserProfile': z.object({
    userId: z.string().min(1, 'userId is required')
  }),
  'getUserType': z.object({
    userId: z.string().min(1, 'userId is required')
  }),
  'getUserContactDetails': z.object({
    userId: z.string().min(1, 'userId is required')
  }),
  'getUserSupportHistory': z.object({
    userId: z.string().min(1, 'userId is required'),
    limit: z.number().int().positive().optional()
  }),
  // 2. Customer Tools
  'getCustomerProfile': z.object({
    customerId: z.string().min(1, 'customerId is required')
  }),
  'getCustomerOrders': z.object({
    customerId: z.string().min(1, 'customerId is required'),
    status: z.string().optional(),
    limit: z.number().int().positive().optional()
  }),
  'getCustomerBookings': z.object({
    customerId: z.string().min(1, 'customerId is required'),
    type: z.enum(['HOTEL', 'TRAVEL', 'HOSPITAL', 'SERVICE', 'ALL']).optional(),
    limit: z.number().int().positive().optional()
  }),
  'getCustomerMembership': z.object({
    customerId: z.string().min(1, 'customerId is required')
  }),
  'getCustomerSupportHistory': z.object({
    customerId: z.string().min(1, 'customerId is required'),
    limit: z.number().int().positive().optional()
  }),
  // 3. Order Tools
  'getOrderDetails': z.object({
    orderId: z.string().min(1, 'orderId is required')
  }),
  'getOrderStatus': z.object({
    orderId: z.string().min(1, 'orderId is required')
  }),
  'getOrderHistory': z.object({
    customerId: z.string().min(1, 'customerId is required'),
    limit: z.number().int().positive().optional()
  }),
  'getDeliveryStatus': z.object({
    orderId: z.string().min(1, 'orderId is required'),
    trackingNumber: z.string().optional()
  }),
  'getCancellationEligibility': z.object({
    orderId: z.string().min(1, 'orderId is required')
  }),
  'createCancellationRequest': z.object({
    orderId: z.string().min(1, 'orderId is required'),
    reason: z.string().min(3, 'reason is required'),
    refundMode: z.enum(['ORIGINAL_PAYMENT', 'WALLET', 'STORE_CREDIT']).optional()
  }),
  // 4. Booking Tools (Travel, Hotel, Hospital, Food, Service)
  'getBookingDetails': z.object({
    bookingId: z.string().min(1, 'bookingId is required')
  }),
  'getBookingStatus': z.object({
    bookingId: z.string().min(1, 'bookingId is required')
  }),
  'getBookingHistory': z.object({
    customerId: z.string().min(1, 'customerId is required'),
    category: z.enum(['TRAVEL', 'HOTEL', 'HOSPITAL', 'FOOD', 'SERVICE', 'ALL']).optional(),
    limit: z.number().int().positive().optional()
  }),
  'getBookingCancellationEligibility': z.object({
    bookingId: z.string().min(1, 'bookingId is required')
  }),
  'createBookingCancellationRequest': z.object({
    bookingId: z.string().min(1, 'bookingId is required'),
    reason: z.string().min(3, 'reason is required'),
    refundMode: z.enum(['ORIGINAL_PAYMENT', 'WALLET', 'VOUCHER']).optional()
  }),
  // 5. Membership Tools
  'getMembershipDetails': z.object({
    customerId: z.string().min(1, 'customerId is required')
  }),
  'getMembershipPlan': z.object({
    customerId: z.string().min(1, 'customerId is required')
  }),
  'getMembershipBenefits': z.object({
    planName: z.enum(['SILVER', 'GOLD', 'PLATINUM', 'DIAMOND']).optional(),
    customerId: z.string().optional()
  }),
  'getMembershipStatus': z.object({
    customerId: z.string().min(1, 'customerId is required')
  }),
  'getMembershipExpiry': z.object({
    customerId: z.string().min(1, 'customerId is required')
  }),
  'getMembershipHistory': z.object({
    customerId: z.string().min(1, 'customerId is required'),
    limit: z.number().int().positive().optional()
  }),
  // 6. Vendor Tools
  'getVendorProfile': z.object({
    vendorId: z.string().min(1, 'vendorId is required')
  }),
  'getVendorRegistration': z.object({
    vendorId: z.string().min(1, 'vendorId is required')
  }),
  'getVendorStatus': z.object({
    vendorId: z.string().min(1, 'vendorId is required')
  }),
  'getVendorKYCStatus': z.object({
    vendorId: z.string().min(1, 'vendorId is required')
  }),
  'getVendorDocuments': z.object({
    vendorId: z.string().min(1, 'vendorId is required')
  }),
  'getVendorPaymentStatus': z.object({
    vendorId: z.string().min(1, 'vendorId is required')
  }),
  'getVendorSupportHistory': z.object({
    vendorId: z.string().min(1, 'vendorId is required'),
    limit: z.number().int().positive().optional()
  }),
  // 7. Agent Tools (Affiliate / Field Agent)
  'getAgentProfile': z.object({
    agentId: z.string().min(1, 'agentId is required')
  }),
  'getAgentRegistration': z.object({
    agentId: z.string().min(1, 'agentId is required')
  }),
  'getAgentStatus': z.object({
    agentId: z.string().min(1, 'agentId is required')
  }),
  'getAgentKYCStatus': z.object({
    agentId: z.string().min(1, 'agentId is required')
  }),
  'getAgentReferralCode': z.object({
    agentId: z.string().min(1, 'agentId is required')
  }),
  'getAgentReferrals': z.object({
    agentId: z.string().min(1, 'agentId is required'),
    status: z.string().optional(),
    limit: z.number().int().positive().optional()
  }),
  'getAgentCommission': z.object({
    agentId: z.string().min(1, 'agentId is required')
  }),
  'getAgentCommissionHistory': z.object({
    agentId: z.string().min(1, 'agentId is required'),
    limit: z.number().int().positive().optional()
  }),
  'getAgentWithdrawalStatus': z.object({
    agentId: z.string().min(1, 'agentId is required'),
    withdrawalId: z.string().optional()
  }),
  // 8. KYC Tools (Identity & Document Verification Engine)
  'getKYCApplication': z.object({
    applicationId: z.string().optional(),
    userId: z.string().optional()
  }),
  'getKYCStatus': z.object({
    userId: z.string().min(1, 'userId is required')
  }),
  'getKYCDocuments': z.object({
    userId: z.string().min(1, 'userId is required')
  }),
  'getKYCRequirements': z.object({
    userRole: z.enum(['CUSTOMER', 'VENDOR', 'AGENT', 'TECHNICIAN', 'HOSPITAL', 'HOTEL', 'TRAVEL_PROVIDER']),
    countryCode: z.string().optional()
  }),
  'getDocument': z.object({
    documentId: z.string().min(1, 'documentId is required')
  }),
  'analyzeDocument': z.object({
    documentId: z.string().min(1, 'documentId is required'),
    documentType: z.string().optional()
  }),
  'checkDocumentQuality': z.object({
    documentId: z.string().min(1, 'documentId is required'),
    fileUrl: z.string().optional()
  }),
  'extractDocumentData': z.object({
    documentId: z.string().min(1, 'documentId is required'),
    ocrEngine: z.enum(['TESSERACT', 'AWS_TEXTRACT', 'GOOGLE_DOCUMENT_AI', 'AZURE_FORM_RECOGNIZER']).optional()
  }),
  'verifyDocument': z.object({
    documentId: z.string().min(1, 'documentId is required'),
    documentType: z.enum(['PASSPORT', 'AADHAAR', 'DRIVING_LICENSE', 'PAN_CARD', 'NATIONAL_ID', 'TRADE_LICENSE'])
  }),
  'verifyIdentityData': z.object({
    userId: z.string().min(1, 'userId is required'),
    extractedData: z.record(z.string(), z.any()).optional(),
    confidenceThreshold: z.number().min(0).max(100).optional()
  }),
  'checkDocumentExpiry': z.object({
    documentId: z.string().min(1, 'documentId is required')
  }),
  'requestDocumentReupload': z.object({
    userId: z.string().min(1, 'userId is required'),
    documentType: z.string().min(1, 'documentType is required'),
    rejectionReason: z.string().min(3, 'rejectionReason is required')
  }),
  'approveKYC': z.object({
    userId: z.string().min(1, 'userId is required'),
    decisionNotes: z.string().optional(),
    verifiedScore: z.number().min(0).max(100).optional()
  }),
  'rejectKYC': z.object({
    userId: z.string().min(1, 'userId is required'),
    reasons: z.array(z.string()).min(1, 'At least one rejection reason is required'),
    allowRetry: z.boolean().default(true)
  }),
  'updateKYCStatus': z.object({
    userId: z.string().min(1, 'userId is required'),
    newStatus: z.enum(['PENDING', 'DOCUMENT_SUBMITTED', 'OCR_VERIFIED', 'FACE_MATCHED', 'APPROVED', 'REJECTED', 'NEEDS_MANUAL_REVIEW']),
    reviewNotes: z.string().optional()
  }),
  // 9. Payment Tools
  'getPaymentDetails': z.object({
    paymentId: z.string().optional(),
    orderId: z.string().optional(),
    transactionId: z.string().optional()
  }),
  'getPaymentStatus': z.object({
    paymentId: z.string().optional(),
    orderId: z.string().optional(),
    transactionId: z.string().optional()
  }),
  'getPaymentHistory': z.object({
    userId: z.string().min(1, 'userId is required'),
    limit: z.number().int().positive().optional()
  }),
  'verifyPayment': z.object({
    paymentId: z.string().min(1, 'paymentId is required'),
    gatewayReference: z.string().optional(),
    expectedAmount: z.number().positive().optional()
  }),
  'createPaymentLink': z.object({
    userId: z.string().min(1, 'userId is required'),
    amount: z.number().positive('amount must be greater than 0'),
    currency: z.string().default('INR'),
    purpose: z.string().min(3, 'purpose is required'),
    expiryMinutes: z.number().int().positive().optional()
  }),
  'sendPaymentReminder': z.object({
    userId: z.string().min(1, 'userId is required'),
    paymentId: z.string().optional(),
    amountDue: z.number().positive().optional(),
    channel: z.enum(['WHATSAPP', 'SMS', 'EMAIL']).default('WHATSAPP')
  }),
  'getPaymentReceipt': z.object({
    paymentId: z.string().optional(),
    receiptId: z.string().optional()
  }),
  'generateReceipt': z.object({
    paymentId: z.string().min(1, 'paymentId is required'),
    includeTaxBreakdown: z.boolean().default(true)
  }),
  'sendReceipt': z.object({
    paymentId: z.string().min(1, 'paymentId is required'),
    recipientEmail: z.string().email().optional(),
    recipientPhone: z.string().optional(),
    channel: z.enum(['EMAIL', 'WHATSAPP', 'SMS']).default('EMAIL')
  }),
  // 10. Referral & Commission Tools
  'getReferralDetails': z.object({
    referralCode: z.string().optional(),
    referralId: z.string().optional(),
    vendorId: z.string().optional()
  }),
  'getReferringAgent': z.object({
    referralCode: z.string().optional(),
    vendorId: z.string().optional()
  }),
  'getReferredVendor': z.object({
    vendorId: z.string().optional(),
    referralId: z.string().optional()
  }),
  'getCommissionDetails': z.object({
    agentId: z.string().min(1, 'agentId is required'),
    tier: z.string().optional()
  }),
  'calculateCommission': z.object({
    agentId: z.string().min(1, 'agentId is required'),
    vendorId: z.string().min(1, 'vendorId is required'),
    transactionAmount: z.number().positive('transactionAmount must be positive'),
    planType: z.string().optional(),
    overridePercentage: z.number().min(0).max(100).optional()
  }),
  'getCommissionHistory': z.object({
    agentId: z.string().min(1, 'agentId is required'),
    limit: z.number().int().positive().optional()
  }),
  'createWithdrawalRequest': z.object({
    agentId: z.string().min(1, 'agentId is required'),
    amount: z.number().positive('Withdrawal amount must be greater than 0'),
    payoutMethod: z.enum(['BANK_TRANSFER', 'UPI', 'WALLET']).default('UPI'),
    accountDetails: z.record(z.string(), z.any()).optional()
  }),
  'getWithdrawalStatus': z.object({
    agentId: z.string().min(1, 'agentId is required'),
    withdrawalId: z.string().optional()
  }),
  // 11. Refund Tools (Restricted Flow: Human Approval Required for Execution)
  'getRefundPolicy': z.object({
    category: z.enum(['ORDER', 'BOOKING', 'MEMBERSHIP', 'REGISTRATION']).optional(),
    tier: z.string().optional()
  }),
  'checkRefundEligibility': z.object({
    orderId: z.string().optional(),
    bookingId: z.string().optional(),
    customerId: z.string().min(1, 'customerId is required'),
    reason: z.string().min(3, 'reason is required')
  }),
  'createRefundRequest': z.object({
    customerId: z.string().min(1, 'customerId is required'),
    orderId: z.string().optional(),
    bookingId: z.string().optional(),
    transactionId: z.string().optional(),
    amount: z.number().positive('amount must be greater than 0'),
    reason: z.string().min(3, 'reason is required'),
    refundMode: z.enum(['ORIGINAL_PAYMENT', 'WALLET', 'BANK_TRANSFER']).default('ORIGINAL_PAYMENT')
  }),
  'getRefundStatus': z.object({
    refundRequestId: z.string().optional(),
    orderId: z.string().optional(),
    bookingId: z.string().optional(),
    customerId: z.string().optional()
  }),
  // 12. Support Tools
  'createSupportTicket': z.object({
    customerId: z.string().min(1, 'customerId is required'),
    subject: z.string().min(3, 'subject must be at least 3 characters'),
    description: z.string().min(5, 'description must be at least 5 characters'),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).default('MEDIUM'),
    category: z.string().optional(),
    department: z.enum(['QUERY', 'KYC', 'PAYMENT', 'SYSTEM']).default('QUERY')
  }),
  'getSupportTicket': z.object({
    ticketId: z.string().min(1, 'ticketId is required')
  }),
  'updateSupportTicket': z.object({
    ticketId: z.string().min(1, 'ticketId is required'),
    subject: z.string().optional(),
    description: z.string().optional(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
    category: z.string().optional()
  }),
  'updateTicketStatus': z.object({
    ticketId: z.string().min(1, 'ticketId is required'),
    status: z.enum(['OPEN', 'IN_PROGRESS', 'WAITING_ON_CUSTOMER', 'RESOLVED', 'CLOSED', 'ESCALATED'])
  }),
  'addTicketMessage': z.object({
    ticketId: z.string().min(1, 'ticketId is required'),
    sender: z.string().min(1, 'sender is required'),
    senderRole: z.enum(['CUSTOMER', 'AI_AGENT', 'HUMAN_AGENT', 'TEAM_LEAD', 'SUPER_ADMIN']).default('AI_AGENT'),
    message: z.string().min(1, 'message is required'),
    attachments: z.array(z.string()).optional()
  }),
  'addInternalNote': z.object({
    ticketId: z.string().min(1, 'ticketId is required'),
    author: z.string().min(1, 'author is required'),
    note: z.string().min(3, 'note must be at least 3 characters')
  }),
  'getConversation': z.object({
    conversationId: z.string().min(1, 'conversationId is required')
  }),
  'getConversationHistory': z.object({
    userId: z.string().min(1, 'userId is required'),
    limit: z.number().int().positive().optional()
  }),

  // 13. Escalation Tools
  'createEscalation': z.object({
    ticketId: z.string().min(1, 'ticketId is required'),
    reason: z.string().min(5, 'Escalation reason must be at least 5 characters'),
    department: z.enum(['QUERY', 'KYC', 'PAYMENT', 'SYSTEM']),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).default('HIGH'),
    isCrossDepartment: z.boolean().default(false)
  }),
  'getEscalation': z.object({
    escalationId: z.string().min(1, 'escalationId is required')
  }),
  'assignToTeamLead': z.object({
    escalationId: z.string().min(1, 'escalationId is required'),
    department: z.enum(['QUERY', 'KYC', 'PAYMENT', 'SYSTEM']),
    teamLeadId: z.string().optional(),
    routeToAdmin: z.boolean().default(false)
  }),
  'getEscalationStatus': z.object({
    escalationId: z.string().min(1, 'escalationId is required')
  }),
  'updateEscalation': z.object({
    escalationId: z.string().min(1, 'escalationId is required'),
    status: z.enum(['PENDING', 'UNDER_INVESTIGATION', 'RESOLVED', 'REASSIGNED']),
    resolutionNotes: z.string().optional()
  }),

  // 14. Communication Tools (Email, WhatsApp, Calling)
  // Email
  'sendEmail': z.object({
    to: z.string().email('Invalid email address'),
    subject: z.string().min(1, 'Subject is required'),
    body: z.string().min(1, 'Body is required'),
    cc: z.array(z.string().email()).optional(),
    attachments: z.array(z.string()).optional()
  }),
  'sendTemplateEmail': z.object({
    to: z.string().email('Invalid email address'),
    templateId: z.string().min(1, 'templateId is required'),
    variables: z.record(z.string(), z.any())
  }),

  // WhatsApp
  'sendWhatsAppMessage': z.object({
    to: z.string().min(10, 'Valid phone number required'),
    message: z.string().min(1, 'message is required'),
    mediaUrl: z.string().optional()
  }),
  'sendWhatsAppTemplate': z.object({
    to: z.string().min(10, 'Valid phone number required'),
    templateName: z.string().min(1, 'templateName is required'),
    language: z.string().default('en'),
    components: z.array(z.record(z.string(), z.any())).optional()
  }),

  // Calling (Telephony AI)
  'initiateCall': z.object({
    to: z.string().min(10, 'Valid phone number required'),
    scenario: z.string().min(1, 'Call scenario is required'),
    contextPayload: z.record(z.string(), z.any()).optional()
  }),
  'getCallStatus': z.object({
    callId: z.string().min(1, 'callId is required')
  }),
  'endCall': z.object({
    callId: z.string().min(1, 'callId is required'),
    reason: z.string().optional()
  }),
  'getCallTranscript': z.object({
    callId: z.string().min(1, 'callId is required')
  }),
  'getCallSummary': z.object({
    callId: z.string().min(1, 'callId is required')
  }),

  // 15. Notification Tools
  'sendNotification': z.object({
    userId: z.string().min(1, 'userId is required'),
    title: z.string().min(1, 'title is required'),
    message: z.string().min(1, 'message is required'),
    channel: z.enum(['IN_APP', 'EMAIL', 'SMS', 'WHATSAPP', 'PUSH']).default('IN_APP')
  }),
  'sendPushNotification': z.object({
    userId: z.string().min(1, 'userId is required'),
    title: z.string().min(1, 'title is required'),
    body: z.string().min(1, 'body is required'),
    actionUrl: z.string().optional(),
    badgeCount: z.number().int().optional()
  }),
  'sendSMS': z.object({
    phoneNumber: z.string().min(10, 'Valid phone number required'),
    message: z.string().min(1, 'message is required'),
    dltTemplateId: z.string().optional()
  }),

  'customer.profile.get': z.object({
    customerId: z.string().min(1, 'customerId is required')
  }),
  'ticket.search': z.object({
    query: z.string().min(1, 'query is required'),
    customerId: z.string().optional(),
    status: z.string().optional()
  }),
  'ticket.create': z.object({
    customerId: z.string().min(1, 'customerId is required'),
    subject: z.string().min(3, 'subject must be at least 3 characters'),
    description: z.string().min(5, 'description must be at least 5 characters'),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional()
  }),
  'payment.refund.process': z.object({
    transactionId: z.string().min(1, 'transactionId is required'),
    amount: z.number().positive('amount must be a positive number'),
    reason: z.string().min(3, 'reason is required')
  }),
  'kyc.document.verify': z.object({
    documentId: z.string().min(1, 'documentId is required'),
    documentType: z.enum(['PASSPORT', 'AADHAAR', 'DRIVING_LICENSE', 'PAN_CARD', 'NATIONAL_ID'])
  }),
  'knowledge.search': z.object({
    query: z.string().min(2, 'search query is required'),
    topK: z.number().int().positive().optional()
  })
};

export interface ToolExecutionPayload {
  toolName: string;
  category: AIToolCategory;
  arguments: Record<string, any>;
  agentCode: string;
  tenantId: string;
  userId: string;
}

export class AIToolRegistry {
  private static toolsMap: Map<string, AIToolDefinition> = new Map();

  static registerTool(tool: AIToolDefinition): void {
    this.toolsMap.set(tool.name, tool);
  }

  static getTool(toolName: string): AIToolDefinition | undefined {
    return this.toolsMap.get(toolName);
  }

  static getAllTools(): AIToolDefinition[] {
    return Array.from(this.toolsMap.values());
  }

  static getToolsByCategory(category: AIToolCategory): AIToolDefinition[] {
    return this.getAllTools().filter(t => t.category === category);
  }

  /**
   * 12-Step Tool Execution Pipeline with Security, Validation & Control Evaluation
   */
  static async executeTool(payload: ToolExecutionPayload): Promise<AIToolResult> {
    const startTime = Date.now();
    const tool = this.getTool(payload.toolName);

    if (!tool) {
      return {
        success: false,
        data: null,
        error: {
          errorCode: AIToolErrorCode.NOT_FOUND,
          message: `Tool '${payload.toolName}' is not registered in the Enterprise AI Tool Registry.`,
          retryable: false
        },
        metadata: {
          toolId: payload.toolName,
          toolVersion: '1.0.0',
          executionId: `exec-${Date.now()}`,
          durationMs: Date.now() - startTime,
          tenantId: payload.tenantId
        }
      };
    }

    // Step 1: Check Tool Status
    if (tool.status !== 'APPROVED' && tool.status !== 'PRODUCTION') {
      return {
        success: false,
        data: null,
        error: {
          errorCode: AIToolErrorCode.SYSTEM_ERROR,
          message: `Tool '${payload.toolName}' is currently in state '${tool.status}' and unavailable.`,
          retryable: false
        },
        metadata: {
          toolId: tool.toolId,
          toolVersion: tool.version,
          executionId: `exec-${Date.now()}`,
          durationMs: Date.now() - startTime,
          tenantId: payload.tenantId
        }
      };
    }

    // Step 2: Action Control Level Check (e.g. HUMAN_APPROVAL or PROHIBITED)
    if (tool.controlLevel === AIActionControlLevel.HUMAN_APPROVAL) {
      return {
        success: false,
        data: null,
        error: {
          errorCode: AIToolErrorCode.AUTHORIZATION_ERROR,
          message: `Action '${payload.toolName}' requires explicit Human TL Click Approval before execution. Created request token.`,
          retryable: false
        },
        metadata: {
          toolId: tool.toolId,
          toolVersion: tool.version,
          executionId: `exec-${Date.now()}`,
          durationMs: Date.now() - startTime,
          tenantId: payload.tenantId
        }
      };
    }

    if (tool.controlLevel === AIActionControlLevel.PROHIBITED) {
      return {
        success: false,
        data: null,
        error: {
          errorCode: AIToolErrorCode.AUTHORIZATION_ERROR,
          message: `Action '${payload.toolName}' is PROHIBITED for AI Agents by Enterprise Security Policy.`,
          retryable: false
        },
        metadata: {
          toolId: tool.toolId,
          toolVersion: tool.version,
          executionId: `exec-${Date.now()}`,
          durationMs: Date.now() - startTime,
          tenantId: payload.tenantId
        }
      };
    }

    // Step 3: Zod Schema Validation for Tool Arguments
    const argumentSchema = toolArgumentSchemas[payload.toolName];
    if (argumentSchema) {
      const validationResult = argumentSchema.safeParse(payload.arguments || {});
      if (!validationResult.success) {
        return {
          success: false,
          data: null,
          error: {
            errorCode: AIToolErrorCode.VALIDATION_ERROR,
            message: `Tool argument validation failed: ${validationResult.error.issues.map((i: any) => `${i.path.join('.')}: ${i.message}`).join(', ')}`,
            retryable: false
          },
          metadata: {
            toolId: tool.toolId,
            toolVersion: tool.version,
            executionId: `exec-${Date.now()}`,
            durationMs: Date.now() - startTime,
            tenantId: payload.tenantId
          }
        };
      }
    }

    // Step 4: Tool Execution Output
    return {
      success: true,
      data: {
        executedBy: payload.agentCode,
        tenantId: payload.tenantId,
        args: payload.arguments,
        output: `Successfully executed tool '${payload.toolName}' under category '${tool.category}'.`
      },
      error: null,
      metadata: {
        toolId: tool.toolId,
        toolVersion: tool.version,
        executionId: `exec-${Date.now()}`,
        durationMs: Date.now() - startTime,
        tenantId: payload.tenantId
      }
    };
  }
}

// ==========================================
// INITIALIZE 17 ENTERPRISE AI TOOL DEFINITIONS
// ==========================================

// 1. Identity & User Tools
AIToolRegistry.registerTool({
  toolId: 'TOOL-ID-01',
  name: 'getUserProfile',
  category: AIToolCategory.CUSTOMER,
  description: 'Fetch user basic details including name, role, account creation date, and status.',
  department: Department.QUERY,
  owner: 'IDENTITY_TEAM',
  version: '1.0.0',
  inputSchema: { userId: { type: 'string', required: true } },
  outputSchema: { userProfile: { type: 'object' } },
  requiredPermissions: ['read:user'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-KYC-001', 'AI-PAY-001', 'AI-COMM-001'],
  allowedTenants: ['*'],
  timeoutMs: 2000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-ID-02',
  name: 'getUserType',
  category: AIToolCategory.CUSTOMER,
  description: 'Identify if the user is a Customer, Vendor, Agent, Technician, Hospital, or Hotel.',
  department: Department.QUERY,
  owner: 'IDENTITY_TEAM',
  version: '1.0.0',
  inputSchema: { userId: { type: 'string', required: true } },
  outputSchema: { userType: { type: 'string' } },
  requiredPermissions: ['read:user'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-KYC-001', 'AI-PAY-001', 'AI-COMM-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-ID-03',
  name: 'getUserContactDetails',
  category: AIToolCategory.CUSTOMER,
  description: 'Fetch verified phone number, email address, and notification preferences.',
  department: Department.QUERY,
  owner: 'IDENTITY_TEAM',
  version: '1.0.0',
  inputSchema: { userId: { type: 'string', required: true } },
  outputSchema: { contactDetails: { type: 'object' } },
  requiredPermissions: ['read:contact'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-KYC-001', 'AI-PAY-001', 'AI-COMM-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-ID-04',
  name: 'getUserSupportHistory',
  category: AIToolCategory.CUSTOMER,
  description: 'Fetch previous support interactions, resolved tickets, escalations, and sentiment history.',
  department: Department.QUERY,
  owner: 'SUPPORT_TEAM',
  version: '1.0.0',
  inputSchema: { userId: { type: 'string', required: true }, limit: { type: 'number', required: false } },
  outputSchema: { supportHistory: { type: 'array' } },
  requiredPermissions: ['read:tickets'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-ESC-001'],
  allowedTenants: ['*'],
  timeoutMs: 2500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

// 2. Customer Tools
AIToolRegistry.registerTool({
  toolId: 'TOOL-CUST-01',
  name: 'getCustomerProfile',
  category: AIToolCategory.CUSTOMER,
  description: 'Fetch complete customer profile details including tier, status, preferences, and verified metadata.',
  department: Department.QUERY,
  owner: 'CUSTOMER_SUCCESS_TEAM',
  version: '1.0.0',
  inputSchema: { customerId: { type: 'string', required: true } },
  outputSchema: { customerProfile: { type: 'object' } },
  requiredPermissions: ['read:customer'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-KYC-001', 'AI-PAY-001', 'AI-COMM-001', 'AI-WHATSAPP-001'],
  allowedTenants: ['*'],
  timeoutMs: 2000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-CUST-02',
  name: 'getCustomerOrders',
  category: AIToolCategory.ORDER,
  description: 'Fetch customer order history, item manifests, shipment tracking, and delivery timelines.',
  department: Department.QUERY,
  owner: 'ORDER_MANAGEMENT_TEAM',
  version: '1.0.0',
  inputSchema: { customerId: { type: 'string', required: true }, status: { type: 'string', required: false }, limit: { type: 'number', required: false } },
  outputSchema: { orders: { type: 'array' } },
  requiredPermissions: ['read:order'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-WHATSAPP-001', 'AI-EMAIL-001'],
  allowedTenants: ['*'],
  timeoutMs: 2500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-CUST-03',
  name: 'getCustomerBookings',
  category: AIToolCategory.BOOKING,
  description: 'Fetch customer booking history across Hotel, Travel, Hospital, and Field Services.',
  department: Department.QUERY,
  owner: 'BOOKINGS_TEAM',
  version: '1.0.0',
  inputSchema: { customerId: { type: 'string', required: true }, type: { type: 'string', required: false }, limit: { type: 'number', required: false } },
  outputSchema: { bookings: { type: 'array' } },
  requiredPermissions: ['read:booking'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-WHATSAPP-001'],
  allowedTenants: ['*'],
  timeoutMs: 2500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-CUST-04',
  name: 'getCustomerMembership',
  category: AIToolCategory.CUSTOMER,
  description: 'Fetch customer membership tier, loyalty reward points, benefits, and expiry date.',
  department: Department.QUERY,
  owner: 'LOYALTY_TEAM',
  version: '1.0.0',
  inputSchema: { customerId: { type: 'string', required: true } },
  outputSchema: { membership: { type: 'object' } },
  requiredPermissions: ['read:membership'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-PAY-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-CUST-05',
  name: 'getCustomerSupportHistory',
  category: AIToolCategory.CUSTOMER,
  description: 'Fetch previous customer complaints, support issues, escalation logs, and resolution details.',
  department: Department.QUERY,
  owner: 'SUPPORT_TEAM',
  version: '1.0.0',
  inputSchema: { customerId: { type: 'string', required: true }, limit: { type: 'number', required: false } },
  outputSchema: { supportHistory: { type: 'array' } },
  requiredPermissions: ['read:tickets'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-ESC-001'],
  allowedTenants: ['*'],
  timeoutMs: 2500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

// 3. Order Tools
AIToolRegistry.registerTool({
  toolId: 'TOOL-ORD-01',
  name: 'getOrderDetails',
  category: AIToolCategory.ORDER,
  description: 'Fetch complete order information including item list, price breakdown, merchant metadata & shipping address.',
  department: Department.QUERY,
  owner: 'ORDER_MANAGEMENT_TEAM',
  version: '1.0.0',
  inputSchema: { orderId: { type: 'string', required: true } },
  outputSchema: { orderDetails: { type: 'object' } },
  requiredPermissions: ['read:order'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-WHATSAPP-001', 'AI-EMAIL-001'],
  allowedTenants: ['*'],
  timeoutMs: 2000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-ORD-02',
  name: 'getOrderStatus',
  category: AIToolCategory.ORDER,
  description: 'Fetch real-time current order lifecycle state (PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED).',
  department: Department.QUERY,
  owner: 'ORDER_MANAGEMENT_TEAM',
  version: '1.0.0',
  inputSchema: { orderId: { type: 'string', required: true } },
  outputSchema: { status: { type: 'string' } },
  requiredPermissions: ['read:order'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-WHATSAPP-001', 'AI-TELEPHONY-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-ORD-03',
  name: 'getOrderHistory',
  category: AIToolCategory.ORDER,
  description: 'Fetch list of all past orders placed by the customer with fulfillment statuses.',
  department: Department.QUERY,
  owner: 'ORDER_MANAGEMENT_TEAM',
  version: '1.0.0',
  inputSchema: { customerId: { type: 'string', required: true }, limit: { type: 'number', required: false } },
  outputSchema: { orders: { type: 'array' } },
  requiredPermissions: ['read:order'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-WHATSAPP-001'],
  allowedTenants: ['*'],
  timeoutMs: 2500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-ORD-04',
  name: 'getDeliveryStatus',
  category: AIToolCategory.ORDER,
  description: 'Fetch carrier tracking details, courier checkpoint updates, and estimated delivery ETA.',
  department: Department.QUERY,
  owner: 'LOGISTICS_TEAM',
  version: '1.0.0',
  inputSchema: { orderId: { type: 'string', required: true }, trackingNumber: { type: 'string', required: false } },
  outputSchema: { deliveryTracking: { type: 'object' } },
  requiredPermissions: ['read:tracking'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-WHATSAPP-001', 'AI-COMM-001'],
  allowedTenants: ['*'],
  timeoutMs: 2000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-ORD-05',
  name: 'getCancellationEligibility',
  category: AIToolCategory.ORDER,
  description: 'Evaluate if an order is eligible for cancellation based on fulfillment stage and return policy window.',
  department: Department.QUERY,
  owner: 'ORDER_MANAGEMENT_TEAM',
  version: '1.0.0',
  inputSchema: { orderId: { type: 'string', required: true } },
  outputSchema: { isEligible: { type: 'boolean' }, reason: { type: 'string' } },
  requiredPermissions: ['read:order'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-WHATSAPP-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-ORD-06',
  name: 'createCancellationRequest',
  category: AIToolCategory.ORDER,
  description: 'Submit an automated cancellation request, halt carrier dispatch, and queue refund workflow.',
  department: Department.QUERY,
  owner: 'ORDER_MANAGEMENT_TEAM',
  version: '1.0.0',
  inputSchema: { orderId: { type: 'string', required: true }, reason: { type: 'string', required: true }, refundMode: { type: 'string', required: false } },
  outputSchema: { cancellationStatus: { type: 'string' }, refundInitiated: { type: 'boolean' } },
  requiredPermissions: ['write:order', 'cancel:order'],
  riskLevel: AIRiskLevel.MEDIUM,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001'],
  allowedTenants: ['*'],
  timeoutMs: 3000,
  idempotencyKeyRequired: true,
  status: 'APPROVED'
});

// 4. Booking Tools (Travel, Hotel, Hospital, Food, Services)
AIToolRegistry.registerTool({
  toolId: 'TOOL-BKG-01',
  name: 'getBookingDetails',
  category: AIToolCategory.BOOKING,
  description: 'Fetch complete booking information across flight, hotel stay, doctor appointment, dining, or cab ride.',
  department: Department.QUERY,
  owner: 'BOOKINGS_TEAM',
  version: '1.0.0',
  inputSchema: { bookingId: { type: 'string', required: true } },
  outputSchema: { bookingDetails: { type: 'object' } },
  requiredPermissions: ['read:booking'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-WHATSAPP-001'],
  allowedTenants: ['*'],
  timeoutMs: 2000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-BKG-02',
  name: 'getBookingStatus',
  category: AIToolCategory.BOOKING,
  description: 'Fetch real-time reservation status (CONFIRMED, CHECKED_IN, COMPLETED, RESCHEDULED, CANCELLED).',
  department: Department.QUERY,
  owner: 'BOOKINGS_TEAM',
  version: '1.0.0',
  inputSchema: { bookingId: { type: 'string', required: true } },
  outputSchema: { status: { type: 'string' } },
  requiredPermissions: ['read:booking'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-WHATSAPP-001', 'AI-TELEPHONY-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-BKG-03',
  name: 'getBookingHistory',
  category: AIToolCategory.BOOKING,
  description: 'Fetch customer booking archive categorized by service type (Hotel, Hospital, Flight, Dining).',
  department: Department.QUERY,
  owner: 'BOOKINGS_TEAM',
  version: '1.0.0',
  inputSchema: { customerId: { type: 'string', required: true }, category: { type: 'string', required: false }, limit: { type: 'number', required: false } },
  outputSchema: { bookings: { type: 'array' } },
  requiredPermissions: ['read:booking'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-WHATSAPP-001'],
  allowedTenants: ['*'],
  timeoutMs: 2500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-BKG-04',
  name: 'getCancellationEligibility',
  category: AIToolCategory.BOOKING,
  description: 'Check whether cancellation is possible and calculate penalty/refund window according to provider policies.',
  department: Department.QUERY,
  owner: 'BOOKINGS_TEAM',
  version: '1.0.0',
  inputSchema: { bookingId: { type: 'string', required: true } },
  outputSchema: { isEligible: { type: 'boolean' }, refundEstimate: { type: 'number' }, penalty: { type: 'number' } },
  requiredPermissions: ['read:booking'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-WHATSAPP-001'],
  allowedTenants: ['*'],
  timeoutMs: 2000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-BKG-05',
  name: 'createCancellationRequest',
  category: AIToolCategory.BOOKING,
  description: 'Submit an automated booking cancellation, release reservation inventory, and trigger refund pipeline.',
  department: Department.QUERY,
  owner: 'BOOKINGS_TEAM',
  version: '1.0.0',
  inputSchema: { bookingId: { type: 'string', required: true }, reason: { type: 'string', required: true }, refundMode: { type: 'string', required: false } },
  outputSchema: { cancellationConfirmed: { type: 'boolean' }, refundTxnId: { type: 'string' } },
  requiredPermissions: ['write:booking', 'cancel:booking'],
  riskLevel: AIRiskLevel.MEDIUM,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001'],
  allowedTenants: ['*'],
  timeoutMs: 3000,
  idempotencyKeyRequired: true,
  status: 'APPROVED'
});

// 5. Membership Tools
AIToolRegistry.registerTool({
  toolId: 'TOOL-MEM-01',
  name: 'getMembershipDetails',
  category: AIToolCategory.CUSTOMER,
  description: 'Fetch complete customer membership subscription details, tier ID, join date & status.',
  department: Department.QUERY,
  owner: 'LOYALTY_TEAM',
  version: '1.0.0',
  inputSchema: { customerId: { type: 'string', required: true } },
  outputSchema: { membership: { type: 'object' } },
  requiredPermissions: ['read:membership'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-PAY-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-MEM-02',
  name: 'getMembershipPlan',
  category: AIToolCategory.CUSTOMER,
  description: 'Fetch active membership tier level: Silver, Gold, Platinum, or Diamond with upgrade options.',
  department: Department.QUERY,
  owner: 'LOYALTY_TEAM',
  version: '1.0.0',
  inputSchema: { customerId: { type: 'string', required: true } },
  outputSchema: { planName: { type: 'string' }, priceAnnual: { type: 'number' } },
  requiredPermissions: ['read:membership'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-PAY-001', 'AI-WHATSAPP-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-MEM-03',
  name: 'getMembershipBenefits',
  category: AIToolCategory.CUSTOMER,
  description: 'Fetch all available privileges: priority support, free lounge access, extra baggage, discount percentages.',
  department: Department.QUERY,
  owner: 'LOYALTY_TEAM',
  version: '1.0.0',
  inputSchema: { planName: { type: 'string', required: false }, customerId: { type: 'string', required: false } },
  outputSchema: { benefitsList: { type: 'array' } },
  requiredPermissions: ['read:membership'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-WHATSAPP-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-MEM-04',
  name: 'getMembershipStatus',
  category: AIToolCategory.CUSTOMER,
  description: 'Fetch real-time membership subscription standing: Active, Expired, Suspended, or Grace Period.',
  department: Department.QUERY,
  owner: 'LOYALTY_TEAM',
  version: '1.0.0',
  inputSchema: { customerId: { type: 'string', required: true } },
  outputSchema: { status: { type: 'string' }, renewalDue: { type: 'boolean' } },
  requiredPermissions: ['read:membership'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-PAY-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-MEM-05',
  name: 'getMembershipExpiry',
  category: AIToolCategory.CUSTOMER,
  description: 'Fetch membership expiry date, remaining validity days, auto-renewal flag, and payment schedule.',
  department: Department.QUERY,
  owner: 'LOYALTY_TEAM',
  version: '1.0.0',
  inputSchema: { customerId: { type: 'string', required: true } },
  outputSchema: { expiryDate: { type: 'string' }, daysRemaining: { type: 'number' } },
  requiredPermissions: ['read:membership'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-PAY-001', 'AI-WHATSAPP-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-MEM-06',
  name: 'getMembershipHistory',
  category: AIToolCategory.CUSTOMER,
  description: 'Fetch past renewals, invoice receipts, tier upgrades, and reward redemption ledger.',
  department: Department.QUERY,
  owner: 'LOYALTY_TEAM',
  version: '1.0.0',
  inputSchema: { customerId: { type: 'string', required: true }, limit: { type: 'number', required: false } },
  outputSchema: { history: { type: 'array' } },
  requiredPermissions: ['read:membership'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-PAY-001'],
  allowedTenants: ['*'],
  timeoutMs: 2000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

// 6. Vendor Tools
AIToolRegistry.registerTool({
  toolId: 'TOOL-VND-01',
  name: 'getVendorProfile',
  category: AIToolCategory.CUSTOMER,
  description: 'Fetch vendor details including business trade name, tax registration (GST/EIN), category & store address.',
  department: Department.QUERY,
  owner: 'VENDOR_OPS_TEAM',
  version: '1.0.0',
  inputSchema: { vendorId: { type: 'string', required: true } },
  outputSchema: { vendorProfile: { type: 'object' } },
  requiredPermissions: ['read:vendor'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-KYC-001', 'AI-PAY-001'],
  allowedTenants: ['*'],
  timeoutMs: 2000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-VND-02',
  name: 'getVendorRegistration',
  category: AIToolCategory.CUSTOMER,
  description: 'Fetch vendor registration application metadata, submitted timestamps, referee agent ID & partner type.',
  department: Department.QUERY,
  owner: 'VENDOR_OPS_TEAM',
  version: '1.0.0',
  inputSchema: { vendorId: { type: 'string', required: true } },
  outputSchema: { registrationDetails: { type: 'object' } },
  requiredPermissions: ['read:vendor'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-KYC-001'],
  allowedTenants: ['*'],
  timeoutMs: 2000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-VND-03',
  name: 'getVendorStatus',
  category: AIToolCategory.CUSTOMER,
  description: 'Fetch vendor onboarding lifecycle stage (SUBMITTED, UNDER_REVIEW, APPROVED, REJECTED, ACTIVE).',
  department: Department.QUERY,
  owner: 'VENDOR_OPS_TEAM',
  version: '1.0.0',
  inputSchema: { vendorId: { type: 'string', required: true } },
  outputSchema: { onboardingStatus: { type: 'string' } },
  requiredPermissions: ['read:vendor'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-WHATSAPP-001', 'AI-TELEPHONY-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-VND-04',
  name: 'getVendorKYCStatus',
  category: AIToolCategory.CUSTOMER,
  description: 'Fetch vendor business identity verification state, trade license validity, and AML verification scores.',
  department: Department.KYC,
  owner: 'KYC_TEAM',
  version: '1.0.0',
  inputSchema: { vendorId: { type: 'string', required: true } },
  outputSchema: { kycStatus: { type: 'string' }, matchScore: { type: 'number' } },
  requiredPermissions: ['read:kyc'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-KYC-001', 'AI-ORCH-001'],
  allowedTenants: ['*'],
  timeoutMs: 2000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-VND-05',
  name: 'getVendorDocuments',
  category: AIToolCategory.CUSTOMER,
  description: 'Fetch secure presigned URLs and OCR extraction records for all submitted vendor compliance documents.',
  department: Department.KYC,
  owner: 'KYC_TEAM',
  version: '1.0.0',
  inputSchema: { vendorId: { type: 'string', required: true } },
  outputSchema: { documents: { type: 'array' } },
  requiredPermissions: ['read:kyc', 'read:documents'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-KYC-001', 'AI-ORCH-001'],
  allowedTenants: ['*'],
  timeoutMs: 2500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-VND-06',
  name: 'getVendorPaymentStatus',
  category: AIToolCategory.CUSTOMER,
  description: 'Fetch registration fee payment status, settlement ledger, commission split, and payout account binding.',
  department: Department.PAYMENT,
  owner: 'PAYMENTS_TEAM',
  version: '1.0.0',
  inputSchema: { vendorId: { type: 'string', required: true } },
  outputSchema: { paymentStatus: { type: 'string' }, amountPaid: { type: 'number' } },
  requiredPermissions: ['read:payment'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-PAY-001', 'AI-ORCH-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-VND-07',
  name: 'getVendorSupportHistory',
  category: AIToolCategory.CUSTOMER,
  description: 'Fetch vendor help desk inquiries, onboarding escalation logs, payout tickets, and resolution history.',
  department: Department.QUERY,
  owner: 'SUPPORT_TEAM',
  version: '1.0.0',
  inputSchema: { vendorId: { type: 'string', required: true }, limit: { type: 'number', required: false } },
  outputSchema: { supportHistory: { type: 'array' } },
  requiredPermissions: ['read:tickets'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-ESC-001'],
  allowedTenants: ['*'],
  timeoutMs: 2500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

// 7. Agent Tools (Affiliate / Referral Agent)
AIToolRegistry.registerTool({
  toolId: 'TOOL-AGT-01',
  name: 'getAgentProfile',
  category: AIToolCategory.CUSTOMER,
  description: 'Fetch agent details including partner tier, commission plan, territory & registered contact.',
  department: Department.QUERY,
  owner: 'AGENT_MANAGEMENT_TEAM',
  version: '1.0.0',
  inputSchema: { agentId: { type: 'string', required: true } },
  outputSchema: { agentProfile: { type: 'object' } },
  requiredPermissions: ['read:agent'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-KYC-001', 'AI-PAY-001'],
  allowedTenants: ['*'],
  timeoutMs: 2000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-AGT-02',
  name: 'getAgentRegistration',
  category: AIToolCategory.CUSTOMER,
  description: 'Fetch agent registration application details, contract agreement, and approval timestamp.',
  department: Department.QUERY,
  owner: 'AGENT_MANAGEMENT_TEAM',
  version: '1.0.0',
  inputSchema: { agentId: { type: 'string', required: true } },
  outputSchema: { registration: { type: 'object' } },
  requiredPermissions: ['read:agent'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-KYC-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-AGT-03',
  name: 'getAgentStatus',
  category: AIToolCategory.CUSTOMER,
  description: 'Fetch agent onboarding and account standing: SUBMITTED, APPROVED, ACTIVE, SUSPENDED.',
  department: Department.QUERY,
  owner: 'AGENT_MANAGEMENT_TEAM',
  version: '1.0.0',
  inputSchema: { agentId: { type: 'string', required: true } },
  outputSchema: { status: { type: 'string' } },
  requiredPermissions: ['read:agent'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-WHATSAPP-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-AGT-04',
  name: 'getAgentKYCStatus',
  category: AIToolCategory.CUSTOMER,
  description: 'Fetch agent identity verification, national ID/PAN verification state, and banking verification.',
  department: Department.KYC,
  owner: 'KYC_TEAM',
  version: '1.0.0',
  inputSchema: { agentId: { type: 'string', required: true } },
  outputSchema: { kycStatus: { type: 'string' }, verifiedAt: { type: 'string' } },
  requiredPermissions: ['read:kyc'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-KYC-001', 'AI-ORCH-001'],
  allowedTenants: ['*'],
  timeoutMs: 2000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-AGT-05',
  name: 'getAgentReferralCode',
  category: AIToolCategory.CUSTOMER,
  description: 'Fetch agent unique referral code, custom onboarding tracking link, and QR code asset URL.',
  department: Department.QUERY,
  owner: 'GROWTH_TEAM',
  version: '1.0.0',
  inputSchema: { agentId: { type: 'string', required: true } },
  outputSchema: { referralCode: { type: 'string' }, shareUrl: { type: 'string' } },
  requiredPermissions: ['read:agent'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-WHATSAPP-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-AGT-06',
  name: 'getAgentReferrals',
  category: AIToolCategory.CUSTOMER,
  description: 'Fetch list of all vendors referred by the agent with their onboarding status and revenue impact.',
  department: Department.QUERY,
  owner: 'GROWTH_TEAM',
  version: '1.0.0',
  inputSchema: { agentId: { type: 'string', required: true }, status: { type: 'string', required: false }, limit: { type: 'number', required: false } },
  outputSchema: { referrals: { type: 'array' }, totalReferred: { type: 'number' } },
  requiredPermissions: ['read:agent'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-WHATSAPP-001'],
  allowedTenants: ['*'],
  timeoutMs: 2500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-AGT-07',
  name: 'getAgentCommission',
  category: AIToolCategory.CUSTOMER,
  description: 'Fetch agent current wallet balance, accrued commission, pending payouts & lifetime earnings.',
  department: Department.PAYMENT,
  owner: 'PAYMENTS_TEAM',
  version: '1.0.0',
  inputSchema: { agentId: { type: 'string', required: true } },
  outputSchema: { walletBalance: { type: 'number' }, pendingPayout: { type: 'number' } },
  requiredPermissions: ['read:payment'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-PAY-001', 'AI-ORCH-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-AGT-08',
  name: 'getAgentCommissionHistory',
  category: AIToolCategory.CUSTOMER,
  description: 'Fetch commission disbursement history, credit transactions, per-vendor referral split breakdown.',
  department: Department.PAYMENT,
  owner: 'PAYMENTS_TEAM',
  version: '1.0.0',
  inputSchema: { agentId: { type: 'string', required: true }, limit: { type: 'number', required: false } },
  outputSchema: { history: { type: 'array' } },
  requiredPermissions: ['read:payment'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-PAY-001', 'AI-ORCH-001'],
  allowedTenants: ['*'],
  timeoutMs: 2000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-AGT-09',
  name: 'getAgentWithdrawalStatus',
  category: AIToolCategory.CUSTOMER,
  description: 'Fetch payout withdrawal status (REQUESTED, PROCESSING, SETTLED, FAILED) and bank UTR reference.',
  department: Department.PAYMENT,
  owner: 'PAYMENTS_TEAM',
  version: '1.0.0',
  inputSchema: { agentId: { type: 'string', required: true }, withdrawalId: { type: 'string', required: false } },
  outputSchema: { withdrawal: { type: 'object' } },
  requiredPermissions: ['read:payment'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-PAY-001', 'AI-ORCH-001', 'AI-WHATSAPP-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

// 8. KYC Tools (Enterprise Identity Verification Suite)
AIToolRegistry.registerTool({
  toolId: 'TOOL-KYC-01',
  name: 'getKYCApplication',
  category: AIToolCategory.KYC,
  description: 'Fetch complete KYC application metadata, applicant role, document bundle & current evaluation state.',
  department: Department.KYC,
  owner: 'KYC_TEAM',
  version: '1.0.0',
  inputSchema: { applicationId: { type: 'string', required: false }, userId: { type: 'string', required: false } },
  outputSchema: { application: { type: 'object' } },
  requiredPermissions: ['read:kyc'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-KYC-001', 'AI-ORCH-001'],
  allowedTenants: ['*'],
  timeoutMs: 2000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-KYC-02',
  name: 'getKYCStatus',
  category: AIToolCategory.KYC,
  description: 'Fetch real-time KYC stage: PENDING, DOCUMENT_SUBMITTED, OCR_VERIFIED, FACE_MATCHED, APPROVED, REJECTED, NEEDS_MANUAL_REVIEW.',
  department: Department.KYC,
  owner: 'KYC_TEAM',
  version: '1.0.0',
  inputSchema: { userId: { type: 'string', required: true } },
  outputSchema: { status: { type: 'string' } },
  requiredPermissions: ['read:kyc'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-KYC-001', 'AI-ORCH-001', 'AI-QUERY-001', 'AI-WHATSAPP-001', 'AI-TELEPHONY-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-KYC-03',
  name: 'getKYCDocuments',
  category: AIToolCategory.KYC,
  description: 'Fetch all uploaded documents associated with user profile (Passport, Aadhaar, Trade License, Driving License).',
  department: Department.KYC,
  owner: 'KYC_TEAM',
  version: '1.0.0',
  inputSchema: { userId: { type: 'string', required: true } },
  outputSchema: { documents: { type: 'array' } },
  requiredPermissions: ['read:kyc', 'read:documents'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-KYC-001', 'AI-ORCH-001'],
  allowedTenants: ['*'],
  timeoutMs: 2000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-KYC-04',
  name: 'getKYCRequirements',
  category: AIToolCategory.KYC,
  description: 'Fetch regulatory compliance criteria and required document matrix based on user role and jurisdiction.',
  department: Department.KYC,
  owner: 'COMPLIANCE_TEAM',
  version: '1.0.0',
  inputSchema: { userRole: { type: 'string', required: true }, countryCode: { type: 'string', required: false } },
  outputSchema: { requiredDocs: { type: 'array' }, criteria: { type: 'object' } },
  requiredPermissions: ['read:kyc'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-KYC-001', 'AI-ORCH-001', 'AI-QUERY-001', 'AI-WHATSAPP-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-KYC-05',
  name: 'getDocument',
  category: AIToolCategory.KYC,
  description: 'Retrieve secure presigned file streaming URL and cryptographic checksum for a document.',
  department: Department.KYC,
  owner: 'KYC_TEAM',
  version: '1.0.0',
  inputSchema: { documentId: { type: 'string', required: true } },
  outputSchema: { documentStreamUrl: { type: 'string' }, mimeType: { type: 'string' } },
  requiredPermissions: ['read:documents'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-KYC-001', 'AI-ORCH-001'],
  allowedTenants: ['*'],
  timeoutMs: 2000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-KYC-06',
  name: 'analyzeDocument',
  category: AIToolCategory.KYC,
  description: 'Perform deep computer vision analysis: verify security holographic overlays, barcode presence & document boundaries.',
  department: Department.KYC,
  owner: 'AI_VISION_TEAM',
  version: '1.0.0',
  inputSchema: { documentId: { type: 'string', required: true }, documentType: { type: 'string', required: false } },
  outputSchema: { authenticityScore: { type: 'number' }, tamperDetected: { type: 'boolean' } },
  requiredPermissions: ['read:documents', 'write:kyc'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-KYC-001', 'AI-ORCH-001'],
  allowedTenants: ['*'],
  timeoutMs: 3500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-KYC-07',
  name: 'checkDocumentQuality',
  category: AIToolCategory.KYC,
  description: 'Detect blurriness, low resolution, glare, cropped edges, and illumination defects.',
  department: Department.KYC,
  owner: 'AI_VISION_TEAM',
  version: '1.0.0',
  inputSchema: { documentId: { type: 'string', required: true }, fileUrl: { type: 'string', required: false } },
  outputSchema: { isLegible: { type: 'boolean' }, blurScore: { type: 'number' }, recommendations: { type: 'string' } },
  requiredPermissions: ['read:documents'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-KYC-001', 'AI-ORCH-001', 'AI-WHATSAPP-001'],
  allowedTenants: ['*'],
  timeoutMs: 2000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-KYC-08',
  name: 'extractDocumentData',
  category: AIToolCategory.KYC,
  description: 'Run neural OCR parsing to extract name, date of birth, document number, address, and validity date.',
  department: Department.KYC,
  owner: 'AI_VISION_TEAM',
  version: '1.0.0',
  inputSchema: { documentId: { type: 'string', required: true }, ocrEngine: { type: 'string', required: false } },
  outputSchema: { extractedFields: { type: 'object' }, rawText: { type: 'string' }, confidence: { type: 'number' } },
  requiredPermissions: ['read:documents', 'write:kyc'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-KYC-001', 'AI-ORCH-001'],
  allowedTenants: ['*'],
  timeoutMs: 3000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-KYC-09',
  name: 'verifyDocument',
  category: AIToolCategory.KYC,
  description: 'Verify extracted document number and authenticity against government API registries (UIDAI/DigiLocker/GovDB).',
  department: Department.KYC,
  owner: 'KYC_TEAM',
  version: '1.0.0',
  inputSchema: { documentId: { type: 'string', required: true }, documentType: { type: 'string', required: true } },
  outputSchema: { verifiedWithGovRegistry: { type: 'boolean' }, registryMatchScore: { type: 'number' } },
  requiredPermissions: ['verify:kyc'],
  riskLevel: AIRiskLevel.MEDIUM,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-KYC-001', 'AI-ORCH-001'],
  allowedTenants: ['*'],
  timeoutMs: 3000,
  idempotencyKeyRequired: true,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-KYC-10',
  name: 'verifyIdentityData',
  category: AIToolCategory.KYC,
  description: 'Fuzzy-match OCR extracted identity data (Name, DOB, Address) against registered user profile context.',
  department: Department.KYC,
  owner: 'KYC_TEAM',
  version: '1.0.0',
  inputSchema: { userId: { type: 'string', required: true }, extractedData: { type: 'object', required: false }, confidenceThreshold: { type: 'number', required: false } },
  outputSchema: { nameMatchPercent: { type: 'number' }, passed: { type: 'boolean' } },
  requiredPermissions: ['verify:kyc'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-KYC-001', 'AI-ORCH-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-KYC-11',
  name: 'checkDocumentExpiry',
  category: AIToolCategory.KYC,
  description: 'Check document expiry date to ensure validity is current (> 6 months prior to expiry).',
  department: Department.KYC,
  owner: 'KYC_TEAM',
  version: '1.0.0',
  inputSchema: { documentId: { type: 'string', required: true } },
  outputSchema: { isExpired: { type: 'boolean' }, expiryDate: { type: 'string' } },
  requiredPermissions: ['read:kyc'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-KYC-001', 'AI-ORCH-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-KYC-12',
  name: 'requestDocumentReupload',
  category: AIToolCategory.KYC,
  description: 'Dispatch immediate notification to user requesting re-upload of blurry or rejected documents.',
  department: Department.KYC,
  owner: 'KYC_TEAM',
  version: '1.0.0',
  inputSchema: { userId: { type: 'string', required: true }, documentType: { type: 'string', required: true }, rejectionReason: { type: 'string', required: true } },
  outputSchema: { notificationSent: { type: 'boolean' }, uploadToken: { type: 'string' } },
  requiredPermissions: ['write:kyc', 'send:notification'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-KYC-001', 'AI-ORCH-001', 'AI-WHATSAPP-001', 'AI-EMAIL-001'],
  allowedTenants: ['*'],
  timeoutMs: 2000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-KYC-13',
  name: 'approveKYC',
  category: AIToolCategory.KYC,
  description: 'Approve verified KYC application, unlock account privileges, and record audit certification.',
  department: Department.KYC,
  owner: 'KYC_TEAM',
  version: '1.0.0',
  inputSchema: { userId: { type: 'string', required: true }, decisionNotes: { type: 'string', required: false }, verifiedScore: { type: 'number', required: false } },
  outputSchema: { approved: { type: 'boolean' }, certifiedAt: { type: 'string' } },
  requiredPermissions: ['approve:kyc'],
  riskLevel: AIRiskLevel.MEDIUM,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-KYC-001', 'AI-ORCH-001'],
  allowedTenants: ['*'],
  timeoutMs: 2500,
  idempotencyKeyRequired: true,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-KYC-14',
  name: 'rejectKYC',
  category: AIToolCategory.KYC,
  description: 'Reject KYC application based on rule failures, AML flags, or fraud anomalies.',
  department: Department.KYC,
  owner: 'KYC_TEAM',
  version: '1.0.0',
  inputSchema: { userId: { type: 'string', required: true }, reasons: { type: 'array', required: true }, allowRetry: { type: 'boolean', required: false } },
  outputSchema: { rejected: { type: 'boolean' }, rejectionId: { type: 'string' } },
  requiredPermissions: ['reject:kyc'],
  riskLevel: AIRiskLevel.MEDIUM,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-KYC-001', 'AI-ORCH-001'],
  allowedTenants: ['*'],
  timeoutMs: 2500,
  idempotencyKeyRequired: true,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-KYC-15',
  name: 'updateKYCStatus',
  category: AIToolCategory.KYC,
  description: 'Update KYC state machine progress during multi-agent verification pipeline.',
  department: Department.KYC,
  owner: 'KYC_TEAM',
  version: '1.0.0',
  inputSchema: { userId: { type: 'string', required: true }, newStatus: { type: 'string', required: true }, reviewNotes: { type: 'string', required: false } },
  outputSchema: { updated: { type: 'boolean' }, previousStatus: { type: 'string' } },
  requiredPermissions: ['write:kyc'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-KYC-001', 'AI-ORCH-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

// 9. Payment Tools
AIToolRegistry.registerTool({
  toolId: 'TOOL-PAY-01',
  name: 'getPaymentDetails',
  category: AIToolCategory.PAYMENT,
  description: 'Fetch complete payment transaction record, order reference, gateway charge ID, currency & payment method.',
  department: Department.PAYMENT,
  owner: 'PAYMENTS_TEAM',
  version: '1.0.0',
  inputSchema: { paymentId: { type: 'string', required: false }, orderId: { type: 'string', required: false }, transactionId: { type: 'string', required: false } },
  outputSchema: { paymentDetails: { type: 'object' } },
  requiredPermissions: ['read:payment'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-PAY-001', 'AI-ORCH-001', 'AI-QUERY-001', 'AI-ESC-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-PAY-02',
  name: 'getPaymentStatus',
  category: AIToolCategory.PAYMENT,
  description: 'Fetch real-time transaction lifecycle status: PAID, PENDING, FAILED, REFUNDED, DISPUTED.',
  department: Department.PAYMENT,
  owner: 'PAYMENTS_TEAM',
  version: '1.0.0',
  inputSchema: { paymentId: { type: 'string', required: false }, orderId: { type: 'string', required: false }, transactionId: { type: 'string', required: false } },
  outputSchema: { status: { type: 'string' }, failureReason: { type: 'string' } },
  requiredPermissions: ['read:payment'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-PAY-001', 'AI-ORCH-001', 'AI-QUERY-001', 'AI-WHATSAPP-001', 'AI-TELEPHONY-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-PAY-03',
  name: 'getPaymentHistory',
  category: AIToolCategory.PAYMENT,
  description: 'Fetch historical transaction statement ledger, invoice receipts, credit settlements & refunds for a user.',
  department: Department.PAYMENT,
  owner: 'PAYMENTS_TEAM',
  version: '1.0.0',
  inputSchema: { userId: { type: 'string', required: true }, limit: { type: 'number', required: false } },
  outputSchema: { history: { type: 'array' }, totalSpend: { type: 'number' } },
  requiredPermissions: ['read:payment'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-PAY-001', 'AI-ORCH-001', 'AI-QUERY-001'],
  allowedTenants: ['*'],
  timeoutMs: 2000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-PAY-04',
  name: 'verifyPayment',
  category: AIToolCategory.PAYMENT,
  description: 'Reconcile gateway webhook callback signature against payment provider (Razorpay/Stripe) ledger.',
  department: Department.PAYMENT,
  owner: 'PAYMENTS_TEAM',
  version: '1.0.0',
  inputSchema: { paymentId: { type: 'string', required: true }, gatewayReference: { type: 'string', required: false }, expectedAmount: { type: 'number', required: false } },
  outputSchema: { isVerified: { type: 'boolean' }, settledAt: { type: 'string' } },
  requiredPermissions: ['verify:payment'],
  riskLevel: AIRiskLevel.MEDIUM,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-PAY-001', 'AI-ORCH-001'],
  allowedTenants: ['*'],
  timeoutMs: 2500,
  idempotencyKeyRequired: true,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-PAY-05',
  name: 'createPaymentLink',
  category: AIToolCategory.PAYMENT,
  description: 'Generate dynamic payment checkout link with UPI QR code, card tokenization and auto-expiry.',
  department: Department.PAYMENT,
  owner: 'PAYMENTS_TEAM',
  version: '1.0.0',
  inputSchema: { userId: { type: 'string', required: true }, amount: { type: 'number', required: true }, currency: { type: 'string', required: false }, purpose: { type: 'string', required: true }, expiryMinutes: { type: 'number', required: false } },
  outputSchema: { paymentLink: { type: 'string' }, linkId: { type: 'string' }, qrCodeUrl: { type: 'string' } },
  requiredPermissions: ['write:payment'],
  riskLevel: AIRiskLevel.MEDIUM,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-PAY-001', 'AI-ORCH-001', 'AI-WHATSAPP-001'],
  allowedTenants: ['*'],
  timeoutMs: 2000,
  idempotencyKeyRequired: true,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-PAY-06',
  name: 'sendPaymentReminder',
  category: AIToolCategory.PAYMENT,
  description: 'Send automated payment reminder notification with direct payment link across WhatsApp, SMS or Email.',
  department: Department.PAYMENT,
  owner: 'COMMUNICATIONS_TEAM',
  version: '1.0.0',
  inputSchema: { userId: { type: 'string', required: true }, paymentId: { type: 'string', required: false }, amountDue: { type: 'number', required: false }, channel: { type: 'string', required: false } },
  outputSchema: { reminderSent: { type: 'boolean' }, messageId: { type: 'string' } },
  requiredPermissions: ['write:payment', 'send:notification'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-PAY-001', 'AI-ORCH-001', 'AI-WHATSAPP-001'],
  allowedTenants: ['*'],
  timeoutMs: 2000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-PAY-07',
  name: 'getPaymentReceipt',
  category: AIToolCategory.PAYMENT,
  description: 'Retrieve digital receipt PDF document, GST invoice breakdown & merchant billing address.',
  department: Department.PAYMENT,
  owner: 'FINANCE_TEAM',
  version: '1.0.0',
  inputSchema: { paymentId: { type: 'string', required: false }, receiptId: { type: 'string', required: false } },
  outputSchema: { receiptUrl: { type: 'string' }, invoiceNumber: { type: 'string' } },
  requiredPermissions: ['read:payment'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-PAY-001', 'AI-ORCH-001', 'AI-QUERY-001', 'AI-WHATSAPP-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-PAY-08',
  name: 'generateReceipt',
  category: AIToolCategory.PAYMENT,
  description: 'Render and cryptographically seal tax compliant GST invoice/receipt document from transaction data.',
  department: Department.PAYMENT,
  owner: 'FINANCE_TEAM',
  version: '1.0.0',
  inputSchema: { paymentId: { type: 'string', required: true }, includeTaxBreakdown: { type: 'boolean', required: false } },
  outputSchema: { receiptId: { type: 'string' }, generatedPdfUrl: { type: 'string' } },
  requiredPermissions: ['write:payment'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-PAY-001', 'AI-ORCH-001'],
  allowedTenants: ['*'],
  timeoutMs: 3000,
  idempotencyKeyRequired: true,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-PAY-09',
  name: 'sendReceipt',
  category: AIToolCategory.PAYMENT,
  description: 'Dispatch generated receipt invoice directly to customer registered email or WhatsApp conversation.',
  department: Department.PAYMENT,
  owner: 'COMMUNICATIONS_TEAM',
  version: '1.0.0',
  inputSchema: { paymentId: { type: 'string', required: true }, recipientEmail: { type: 'string', required: false }, recipientPhone: { type: 'string', required: false }, channel: { type: 'string', required: false } },
  outputSchema: { dispatched: { type: 'boolean' }, deliveryChannel: { type: 'string' } },
  requiredPermissions: ['write:payment', 'send:notification'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-PAY-001', 'AI-ORCH-001', 'AI-WHATSAPP-001'],
  allowedTenants: ['*'],
  timeoutMs: 2000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

// 10. Referral & Commission Tools
AIToolRegistry.registerTool({
  toolId: 'TOOL-REF-01',
  name: 'getReferralDetails',
  category: AIToolCategory.COMMISSION,
  description: 'Fetch referral binding record, referring agent code, referred vendor entity ID and campaign channel.',
  department: Department.PAYMENT,
  owner: 'GROWTH_TEAM',
  version: '1.0.0',
  inputSchema: { referralCode: { type: 'string', required: false }, referralId: { type: 'string', required: false }, vendorId: { type: 'string', required: false } },
  outputSchema: { referral: { type: 'object' } },
  requiredPermissions: ['read:referral'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-PAY-001', 'AI-ORCH-001', 'AI-QUERY-001', 'AI-WHATSAPP-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-REF-02',
  name: 'getReferringAgent',
  category: AIToolCategory.COMMISSION,
  description: 'Identify primary affiliate agent assigned to a referral code or newly onboarding vendor.',
  department: Department.PAYMENT,
  owner: 'GROWTH_TEAM',
  version: '1.0.0',
  inputSchema: { referralCode: { type: 'string', required: false }, vendorId: { type: 'string', required: false } },
  outputSchema: { agentId: { type: 'string' }, agentName: { type: 'string' }, commissionTier: { type: 'string' } },
  requiredPermissions: ['read:agent'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-PAY-001', 'AI-ORCH-001', 'AI-KYC-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-REF-03',
  name: 'getReferredVendor',
  category: AIToolCategory.COMMISSION,
  description: 'Identify referred vendor business trade name, store location and onboarding completion state.',
  department: Department.PAYMENT,
  owner: 'VENDOR_OPS_TEAM',
  version: '1.0.0',
  inputSchema: { vendorId: { type: 'string', required: false }, referralId: { type: 'string', required: false } },
  outputSchema: { vendorId: { type: 'string' }, tradeName: { type: 'string' }, registrationPaid: { type: 'boolean' } },
  requiredPermissions: ['read:vendor'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-PAY-001', 'AI-ORCH-001', 'AI-QUERY-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-REF-04',
  name: 'getCommissionDetails',
  category: AIToolCategory.COMMISSION,
  description: 'Fetch agent commission tier configuration, fixed bounty payout rules, recurring percentages & minimum threshold.',
  department: Department.PAYMENT,
  owner: 'FINANCE_TEAM',
  version: '1.0.0',
  inputSchema: { agentId: { type: 'string', required: true }, tier: { type: 'string', required: false } },
  outputSchema: { commissionRate: { type: 'number' }, tier: { type: 'string' }, fixedBonus: { type: 'number' } },
  requiredPermissions: ['read:commission'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-PAY-001', 'AI-ORCH-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-REF-05',
  name: 'calculateCommission',
  category: AIToolCategory.COMMISSION,
  description: 'Calculate automated agent commission split according to enterprise rules engine matrix.',
  department: Department.PAYMENT,
  owner: 'FINANCE_TEAM',
  version: '1.0.0',
  inputSchema: { agentId: { type: 'string', required: true }, vendorId: { type: 'string', required: true }, transactionAmount: { type: 'number', required: true }, planType: { type: 'string', required: false }, overridePercentage: { type: 'number', required: false } },
  outputSchema: { calculatedCommission: { type: 'number' }, taxDeductionTDS: { type: 'number' }, netCredited: { type: 'number' } },
  requiredPermissions: ['calculate:commission', 'write:commission'],
  riskLevel: AIRiskLevel.MEDIUM,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-PAY-001', 'AI-ORCH-001'],
  allowedTenants: ['*'],
  timeoutMs: 2000,
  idempotencyKeyRequired: true,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-REF-06',
  name: 'getCommissionHistory',
  category: AIToolCategory.COMMISSION,
  description: 'Fetch itemized historical commission ledger, per-vendor referral rewards & settlement statement.',
  department: Department.PAYMENT,
  owner: 'FINANCE_TEAM',
  version: '1.0.0',
  inputSchema: { agentId: { type: 'string', required: true }, limit: { type: 'number', required: false } },
  outputSchema: { history: { type: 'array' }, totalCommission: { type: 'number' } },
  requiredPermissions: ['read:commission'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-PAY-001', 'AI-ORCH-001', 'AI-QUERY-001', 'AI-WHATSAPP-001'],
  allowedTenants: ['*'],
  timeoutMs: 2000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-REF-07',
  name: 'createWithdrawalRequest',
  category: AIToolCategory.COMMISSION,
  description: 'Initiate commission balance payout withdrawal to agent verified bank account or UPI VPA.',
  department: Department.PAYMENT,
  owner: 'PAYMENTS_TEAM',
  version: '1.0.0',
  inputSchema: { agentId: { type: 'string', required: true }, amount: { type: 'number', required: true }, payoutMethod: { type: 'string', required: false }, accountDetails: { type: 'object', required: false } },
  outputSchema: { withdrawalId: { type: 'string' }, status: { type: 'string' }, estimatedSettlementDate: { type: 'string' } },
  requiredPermissions: ['write:withdrawal', 'write:payment'],
  riskLevel: AIRiskLevel.HIGH,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-PAY-001', 'AI-ORCH-001'],
  allowedTenants: ['*'],
  timeoutMs: 2500,
  idempotencyKeyRequired: true,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-REF-08',
  name: 'getWithdrawalStatus',
  category: AIToolCategory.COMMISSION,
  description: 'Fetch payout processing status: REQUESTED, IN_CLEARING, SETTLED, FAILED with bank UTR reference.',
  department: Department.PAYMENT,
  owner: 'PAYMENTS_TEAM',
  version: '1.0.0',
  inputSchema: { agentId: { type: 'string', required: true }, withdrawalId: { type: 'string', required: false } },
  outputSchema: { status: { type: 'string' }, utrNumber: { type: 'string' }, amount: { type: 'number' } },
  requiredPermissions: ['read:payment'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-PAY-001', 'AI-ORCH-001', 'AI-WHATSAPP-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

// 11. Policy & Settlement Finality Tools (Strict No-Refund Rule Enforced)
AIToolRegistry.registerTool({
  toolId: 'TOOL-REFUND-01',
  name: 'getRefundPolicy',
  category: AIToolCategory.PAYMENT,
  description: 'Fetch organization strict No-Refund policy terms (All onboarding, service fees, and license deposits are strictly non-refundable and final).',
  department: Department.PAYMENT,
  owner: 'POLICY_TEAM',
  version: '2.0.0',
  inputSchema: { category: { type: 'string', required: false }, tier: { type: 'string', required: false } },
  outputSchema: { policyTerms: { type: 'string' }, windowHours: { type: 'number' } },
  requiredPermissions: ['read:policy'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-PAY-001', 'AI-WHATSAPP-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-REFUND-02',
  name: 'checkRefundEligibility',
  category: AIToolCategory.PAYMENT,
  description: 'Checks transaction status and enforces strict No-Refund policy (always evaluates isEligible as false per company rules).',
  department: Department.PAYMENT,
  owner: 'FINANCE_TEAM',
  version: '2.0.0',
  inputSchema: { customerId: { type: 'string', required: true }, orderId: { type: 'string', required: false }, bookingId: { type: 'string', required: false }, reason: { type: 'string', required: true } },
  outputSchema: { isEligible: { type: 'boolean' }, refundableAmount: { type: 'number' }, deductionFee: { type: 'number' } },
  requiredPermissions: ['read:payment'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-PAY-001'],
  allowedTenants: ['*'],
  timeoutMs: 2000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-REFUND-03',
  name: 'createRefundRequest',
  category: AIToolCategory.PAYMENT,
  description: 'DEPRECATED: Refund requests are disabled platform-wide under the No-Refund policy.',
  department: Department.PAYMENT,
  owner: 'FINANCE_TEAM',
  version: '2.0.0',
  inputSchema: { customerId: { type: 'string', required: true }, amount: { type: 'number', required: true }, reason: { type: 'string', required: true }, orderId: { type: 'string', required: false }, bookingId: { type: 'string', required: false }, transactionId: { type: 'string', required: false }, refundMode: { type: 'string', required: false } },
  outputSchema: { refundRequestId: { type: 'string' }, status: { type: 'string' }, approvalRequired: { type: 'boolean' } },
  requiredPermissions: ['write:refund'],
  riskLevel: AIRiskLevel.HIGH,
  controlLevel: AIActionControlLevel.HUMAN_APPROVAL,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-PAY-001'],
  allowedTenants: ['*'],
  timeoutMs: 2500,
  idempotencyKeyRequired: true,
  status: 'DRAFT'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-REFUND-04',
  name: 'getRefundStatus',
  category: AIToolCategory.PAYMENT,
  description: 'Returns No-Refund policy enforcement status for submitted billing inquiries.',
  department: Department.PAYMENT,
  owner: 'FINANCE_TEAM',
  version: '2.0.0',
  inputSchema: { refundRequestId: { type: 'string', required: false }, customerId: { type: 'string', required: false }, orderId: { type: 'string', required: false }, bookingId: { type: 'string', required: false } },
  outputSchema: { status: { type: 'string' }, approvedBy: { type: 'string' }, settlementUtr: { type: 'string' } },
  requiredPermissions: ['read:payment'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-PAY-001', 'AI-WHATSAPP-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

// 12. Support Tools
AIToolRegistry.registerTool({
  toolId: 'TOOL-SUPP-01',
  name: 'createSupportTicket',
  category: AIToolCategory.SUPPORT,
  description: 'Create and dispatch customer support ticket to appropriate departmental queue (QUERY, KYC, PAYMENT, SYSTEM).',
  department: Department.QUERY,
  owner: 'SUPPORT_TEAM',
  version: '1.0.0',
  inputSchema: { customerId: { type: 'string', required: true }, subject: { type: 'string', required: true }, description: { type: 'string', required: true }, priority: { type: 'string', required: false }, category: { type: 'string', required: false }, department: { type: 'string', required: false } },
  outputSchema: { ticketId: { type: 'string' }, assignedQueue: { type: 'string' } },
  requiredPermissions: ['write:tickets'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-KYC-001', 'AI-PAY-001', 'AI-WHATSAPP-001'],
  allowedTenants: ['*'],
  timeoutMs: 2000,
  idempotencyKeyRequired: true,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-SUPP-02',
  name: 'getSupportTicket',
  category: AIToolCategory.SUPPORT,
  description: 'Fetch complete support ticket details, conversation log, SLA timer, and assignees.',
  department: Department.QUERY,
  owner: 'SUPPORT_TEAM',
  version: '1.0.0',
  inputSchema: { ticketId: { type: 'string', required: true } },
  outputSchema: { ticket: { type: 'object' } },
  requiredPermissions: ['read:tickets'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-ESC-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-SUPP-03',
  name: 'updateSupportTicket',
  category: AIToolCategory.SUPPORT,
  description: 'Update ticket subject, category, priority or issue description tags.',
  department: Department.QUERY,
  owner: 'SUPPORT_TEAM',
  version: '1.0.0',
  inputSchema: { ticketId: { type: 'string', required: true }, subject: { type: 'string', required: false }, description: { type: 'string', required: false }, priority: { type: 'string', required: false }, category: { type: 'string', required: false } },
  outputSchema: { updated: { type: 'boolean' } },
  requiredPermissions: ['write:tickets'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-SUPP-04',
  name: 'updateTicketStatus',
  category: AIToolCategory.SUPPORT,
  description: 'Change support ticket lifecycle stage (OPEN, IN_PROGRESS, WAITING_ON_CUSTOMER, RESOLVED, CLOSED, ESCALATED).',
  department: Department.QUERY,
  owner: 'SUPPORT_TEAM',
  version: '1.0.0',
  inputSchema: { ticketId: { type: 'string', required: true }, status: { type: 'string', required: true } },
  outputSchema: { status: { type: 'string' }, previousStatus: { type: 'string' } },
  requiredPermissions: ['write:tickets'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-ESC-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-SUPP-05',
  name: 'addTicketMessage',
  category: AIToolCategory.SUPPORT,
  description: 'Post AI agent or human reply directly into ticket conversation thread with customer delivery.',
  department: Department.QUERY,
  owner: 'SUPPORT_TEAM',
  version: '1.0.0',
  inputSchema: { ticketId: { type: 'string', required: true }, sender: { type: 'string', required: true }, senderRole: { type: 'string', required: false }, message: { type: 'string', required: true }, attachments: { type: 'array', required: false } },
  outputSchema: { messageId: { type: 'string' }, sentAt: { type: 'string' } },
  requiredPermissions: ['write:tickets'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-WHATSAPP-001', 'AI-TELEPHONY-001'],
  allowedTenants: ['*'],
  timeoutMs: 2000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-SUPP-06',
  name: 'addInternalNote',
  category: AIToolCategory.SUPPORT,
  description: 'Record internal diagnostic context, AI reasoning, and guidance visible only to AI agents and Team Leads.',
  department: Department.QUERY,
  owner: 'SUPPORT_TEAM',
  version: '1.0.0',
  inputSchema: { ticketId: { type: 'string', required: true }, author: { type: 'string', required: true }, note: { type: 'string', required: true } },
  outputSchema: { noteId: { type: 'string' }, created: { type: 'boolean' } },
  requiredPermissions: ['write:internal_notes'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-KYC-001', 'AI-PAY-001', 'AI-ESC-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-SUPP-07',
  name: 'getConversation',
  category: AIToolCategory.SUPPORT,
  description: 'Fetch active conversation transcript, sentiment analysis scores, intent classifications & session metrics.',
  department: Department.QUERY,
  owner: 'SUPPORT_TEAM',
  version: '1.0.0',
  inputSchema: { conversationId: { type: 'string', required: true } },
  outputSchema: { conversation: { type: 'object' }, messageCount: { type: 'number' } },
  requiredPermissions: ['read:conversations'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-WHATSAPP-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-SUPP-08',
  name: 'getConversationHistory',
  category: AIToolCategory.SUPPORT,
  description: 'Fetch historical chat dialogues across omnichannel touchpoints (Web, Mobile, WhatsApp, Telephony).',
  department: Department.QUERY,
  owner: 'SUPPORT_TEAM',
  version: '1.0.0',
  inputSchema: { userId: { type: 'string', required: true }, limit: { type: 'number', required: false } },
  outputSchema: { history: { type: 'array' } },
  requiredPermissions: ['read:conversations'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-ESC-001'],
  allowedTenants: ['*'],
  timeoutMs: 2000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

// 13. Escalation Tools (Enterprise Tier-2 & TL Routing)
AIToolRegistry.registerTool({
  toolId: 'TOOL-ESC-01',
  name: 'createEscalation',
  category: AIToolCategory.ESCALATION,
  description: 'Trigger formal ticket escalation when SLA breaches, customer sentiment drops, or complex exceptions arise.',
  department: Department.QUERY,
  owner: 'ESCALATION_TEAM',
  version: '1.0.0',
  inputSchema: { ticketId: { type: 'string', required: true }, reason: { type: 'string', required: true }, department: { type: 'string', required: true }, priority: { type: 'string', required: false }, isCrossDepartment: { type: 'boolean', required: false } },
  outputSchema: { escalationId: { type: 'string' }, assignedLeadQueue: { type: 'string' } },
  requiredPermissions: ['escalate:tickets'],
  riskLevel: AIRiskLevel.MEDIUM,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-KYC-001', 'AI-PAY-001', 'AI-ESC-001'],
  allowedTenants: ['*'],
  timeoutMs: 2000,
  idempotencyKeyRequired: true,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-ESC-02',
  name: 'getEscalation',
  category: AIToolCategory.ESCALATION,
  description: 'Fetch escalation audit trail, investigation log, assigned Team Lead, and resolution SLA countdown.',
  department: Department.QUERY,
  owner: 'ESCALATION_TEAM',
  version: '1.0.0',
  inputSchema: { escalationId: { type: 'string', required: true } },
  outputSchema: { escalation: { type: 'object' } },
  requiredPermissions: ['read:escalations'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-ESC-001', 'AI-ORCH-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-ESC-03',
  name: 'assignToTeamLead',
  category: AIToolCategory.ESCALATION,
  description: 'Route escalation directly to domain supervisor (Query TL, KYC TL, Payment TL, or Super Admin).',
  department: Department.QUERY,
  owner: 'ESCALATION_TEAM',
  version: '1.0.0',
  inputSchema: { escalationId: { type: 'string', required: true }, department: { type: 'string', required: true }, teamLeadId: { type: 'string', required: false }, routeToAdmin: { type: 'boolean', required: false } },
  outputSchema: { assignedTo: { type: 'string' }, department: { type: 'string' }, notificationPushed: { type: 'boolean' } },
  requiredPermissions: ['assign:escalations'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-ESC-001', 'AI-ORCH-001'],
  allowedTenants: ['*'],
  timeoutMs: 2000,
  idempotencyKeyRequired: true,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-ESC-04',
  name: 'getEscalationStatus',
  category: AIToolCategory.ESCALATION,
  description: 'Track real-time resolution status of escalated ticket: PENDING, UNDER_INVESTIGATION, RESOLVED, REASSIGNED.',
  department: Department.QUERY,
  owner: 'ESCALATION_TEAM',
  version: '1.0.0',
  inputSchema: { escalationId: { type: 'string', required: true } },
  outputSchema: { status: { type: 'string' }, resolvedBy: { type: 'string' } },
  requiredPermissions: ['read:escalations'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-ESC-001', 'AI-ORCH-001', 'AI-QUERY-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-ESC-05',
  name: 'updateEscalation',
  category: AIToolCategory.ESCALATION,
  description: 'Update escalation investigation notes, root-cause tags, and mark resolved once supervisor completes review.',
  department: Department.QUERY,
  owner: 'ESCALATION_TEAM',
  version: '1.0.0',
  inputSchema: { escalationId: { type: 'string', required: true }, status: { type: 'string', required: true }, resolutionNotes: { type: 'string', required: false } },
  outputSchema: { updated: { type: 'boolean' }, closedAt: { type: 'string' } },
  requiredPermissions: ['write:escalations'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-ESC-001', 'AI-ORCH-001'],
  allowedTenants: ['*'],
  timeoutMs: 2000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

// 14. Communication Tools (Omnichannel Interaction Suite)
// Email
AIToolRegistry.registerTool({
  toolId: 'TOOL-COMM-EML-01',
  name: 'sendEmail',
  category: AIToolCategory.COMMUNICATION,
  description: 'Dispatch plain text or HTML formatted custom email directly to customer or vendor.',
  department: Department.QUERY,
  owner: 'COMMUNICATIONS_TEAM',
  version: '1.0.0',
  inputSchema: { to: { type: 'string', required: true }, subject: { type: 'string', required: true }, body: { type: 'string', required: true }, cc: { type: 'array', required: false }, attachments: { type: 'array', required: false } },
  outputSchema: { messageId: { type: 'string' }, status: { type: 'string' } },
  requiredPermissions: ['send:email'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-KYC-001', 'AI-PAY-001', 'AI-ESC-001'],
  allowedTenants: ['*'],
  timeoutMs: 2500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-COMM-EML-02',
  name: 'sendTemplateEmail',
  category: AIToolCategory.COMMUNICATION,
  description: 'Send pre-approved compliance-verified system transactional email template with dynamic variable injection.',
  department: Department.QUERY,
  owner: 'COMMUNICATIONS_TEAM',
  version: '1.0.0',
  inputSchema: { to: { type: 'string', required: true }, templateId: { type: 'string', required: true }, variables: { type: 'object', required: true } },
  outputSchema: { messageId: { type: 'string' }, delivered: { type: 'boolean' } },
  requiredPermissions: ['send:email'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-KYC-001', 'AI-PAY-001'],
  allowedTenants: ['*'],
  timeoutMs: 2000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

// WhatsApp
AIToolRegistry.registerTool({
  toolId: 'TOOL-COMM-WA-01',
  name: 'sendWhatsAppMessage',
  category: AIToolCategory.COMMUNICATION,
  description: 'Dispatch real-time interactive WhatsApp conversational session message with optional rich media card.',
  department: Department.QUERY,
  owner: 'COMMUNICATIONS_TEAM',
  version: '1.0.0',
  inputSchema: { to: { type: 'string', required: true }, message: { type: 'string', required: true }, mediaUrl: { type: 'string', required: false } },
  outputSchema: { wamid: { type: 'string' }, status: { type: 'string' } },
  requiredPermissions: ['send:whatsapp'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-WHATSAPP-001', 'AI-ORCH-001', 'AI-QUERY-001'],
  allowedTenants: ['*'],
  timeoutMs: 2000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-COMM-WA-02',
  name: 'sendWhatsAppTemplate',
  category: AIToolCategory.COMMUNICATION,
  description: 'Dispatch Meta-approved official WhatsApp HSM business template for alerts, OTPs, and payment updates.',
  department: Department.QUERY,
  owner: 'COMMUNICATIONS_TEAM',
  version: '1.0.0',
  inputSchema: { to: { type: 'string', required: true }, templateName: { type: 'string', required: true }, language: { type: 'string', required: false }, components: { type: 'array', required: false } },
  outputSchema: { wamid: { type: 'string' }, delivered: { type: 'boolean' } },
  requiredPermissions: ['send:whatsapp'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-WHATSAPP-001', 'AI-ORCH-001', 'AI-PAY-001', 'AI-KYC-001'],
  allowedTenants: ['*'],
  timeoutMs: 2000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

// Calling (Telephony Voice AI)
AIToolRegistry.registerTool({
  toolId: 'TOOL-COMM-VOX-01',
  name: 'initiateCall',
  category: AIToolCategory.COMMUNICATION,
  description: 'Trigger outbound AI voice call session with real-time neural speech synthesis and intent recognition.',
  department: Department.QUERY,
  owner: 'TELEPHONY_TEAM',
  version: '1.0.0',
  inputSchema: { to: { type: 'string', required: true }, scenario: { type: 'string', required: true }, contextPayload: { type: 'object', required: false } },
  outputSchema: { callId: { type: 'string' }, sessionStatus: { type: 'string' } },
  requiredPermissions: ['voice:calling'],
  riskLevel: AIRiskLevel.MEDIUM,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-TELEPHONY-001', 'AI-ORCH-001'],
  allowedTenants: ['*'],
  timeoutMs: 3000,
  idempotencyKeyRequired: true,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-COMM-VOX-02',
  name: 'getCallStatus',
  category: AIToolCategory.COMMUNICATION,
  description: 'Monitor ongoing voice call status: RINGING, IN_PROGRESS, COMPLETED, BUSY, NO_ANSWER, FAILED.',
  department: Department.QUERY,
  owner: 'TELEPHONY_TEAM',
  version: '1.0.0',
  inputSchema: { callId: { type: 'string', required: true } },
  outputSchema: { status: { type: 'string' }, durationSeconds: { type: 'number' } },
  requiredPermissions: ['voice:calling'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-TELEPHONY-001', 'AI-ORCH-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-COMM-VOX-03',
  name: 'endCall',
  category: AIToolCategory.COMMUNICATION,
  description: 'Gracefully terminate active voice call session and trigger post-call telemetry pipeline.',
  department: Department.QUERY,
  owner: 'TELEPHONY_TEAM',
  version: '1.0.0',
  inputSchema: { callId: { type: 'string', required: true }, reason: { type: 'string', required: false } },
  outputSchema: { terminated: { type: 'boolean' }, durationSeconds: { type: 'number' } },
  requiredPermissions: ['voice:calling'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-TELEPHONY-001', 'AI-ORCH-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-COMM-VOX-04',
  name: 'getCallTranscript',
  category: AIToolCategory.COMMUNICATION,
  description: 'Retrieve real-time speech-to-text transcript turn-by-turn log for voice interaction.',
  department: Department.QUERY,
  owner: 'TELEPHONY_TEAM',
  version: '1.0.0',
  inputSchema: { callId: { type: 'string', required: true } },
  outputSchema: { transcript: { type: 'array' }, speakerTurns: { type: 'number' } },
  requiredPermissions: ['voice:calling'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-TELEPHONY-001', 'AI-ORCH-001', 'AI-ESC-001'],
  allowedTenants: ['*'],
  timeoutMs: 2000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-COMM-VOX-05',
  name: 'getCallSummary',
  category: AIToolCategory.COMMUNICATION,
  description: 'Synthesize LLM post-call summary, customer sentiment arc, resolution tag, and next action items.',
  department: Department.QUERY,
  owner: 'TELEPHONY_TEAM',
  version: '1.0.0',
  inputSchema: { callId: { type: 'string', required: true } },
  outputSchema: { summary: { type: 'string' }, sentiment: { type: 'string' }, actionItems: { type: 'array' } },
  requiredPermissions: ['voice:calling'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-TELEPHONY-001', 'AI-ORCH-001', 'AI-ESC-001'],
  allowedTenants: ['*'],
  timeoutMs: 2500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

// 15. Notification Tools (Broadcast & Multi-Channel Push)
AIToolRegistry.registerTool({
  toolId: 'TOOL-NOTIF-01',
  name: 'sendNotification',
  category: AIToolCategory.COMMUNICATION,
  description: 'Send multi-channel notification across in-app activity bell, push, email, SMS, or WhatsApp.',
  department: Department.QUERY,
  owner: 'NOTIFICATIONS_TEAM',
  version: '1.0.0',
  inputSchema: { userId: { type: 'string', required: true }, title: { type: 'string', required: true }, message: { type: 'string', required: true }, channel: { type: 'string', required: false } },
  outputSchema: { notificationId: { type: 'string' }, dispatchedChannels: { type: 'array' } },
  requiredPermissions: ['send:notification'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-KYC-001', 'AI-PAY-001', 'AI-ESC-001'],
  allowedTenants: ['*'],
  timeoutMs: 1500,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-NOTIF-02',
  name: 'sendPushNotification',
  category: AIToolCategory.COMMUNICATION,
  description: 'Send high-priority mobile & web push notification through FCM / APNs gateway.',
  department: Department.QUERY,
  owner: 'NOTIFICATIONS_TEAM',
  version: '1.0.0',
  inputSchema: { userId: { type: 'string', required: true }, title: { type: 'string', required: true }, body: { type: 'string', required: true }, actionUrl: { type: 'string', required: false }, badgeCount: { type: 'number', required: false } },
  outputSchema: { pushTicket: { type: 'string' }, deviceCount: { type: 'number' } },
  requiredPermissions: ['send:notification'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-WHATSAPP-001'],
  allowedTenants: ['*'],
  timeoutMs: 2000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-NOTIF-03',
  name: 'sendSMS',
  category: AIToolCategory.COMMUNICATION,
  description: 'Send DLT registered transactional / promotional SMS gateway message with dynamic variable placeholders.',
  department: Department.QUERY,
  owner: 'COMMUNICATIONS_TEAM',
  version: '1.0.0',
  inputSchema: { phoneNumber: { type: 'string', required: true }, message: { type: 'string', required: true }, dltTemplateId: { type: 'string', required: false } },
  outputSchema: { smsId: { type: 'string' }, delivered: { type: 'boolean' } },
  requiredPermissions: ['send:sms'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001', 'AI-PAY-001', 'AI-KYC-001'],
  allowedTenants: ['*'],
  timeoutMs: 2000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

// 16. Legacy Tools
AIToolRegistry.registerTool({
  toolId: 'TOOL-CUST-LEGACY-01',
  name: 'customer.profile.get',
  category: AIToolCategory.CUSTOMER,
  description: 'Retrieves 360-degree customer profile, tier, and contact information.',
  department: Department.QUERY,
  owner: 'QUERY_TEAM',
  version: '1.0.0',
  inputSchema: { customerId: { type: 'string', required: true } },
  outputSchema: { profile: { type: 'object' } },
  requiredPermissions: ['read:customer'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001'],
  allowedTenants: ['*'],
  timeoutMs: 3000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

// 2. Order Tool
AIToolRegistry.registerTool({
  toolId: 'TOOL-ORD-01',
  name: 'order.status.get',
  category: AIToolCategory.ORDER,
  description: 'Retrieves real-time order status, items, and tracking details.',
  department: Department.QUERY,
  owner: 'QUERY_TEAM',
  version: '1.0.0',
  inputSchema: { orderId: { type: 'string', required: true } },
  outputSchema: { orderStatus: { type: 'object' } },
  requiredPermissions: ['read:order'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001'],
  allowedTenants: ['*'],
  timeoutMs: 3000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

// 3. Booking Tool
AIToolRegistry.registerTool({
  toolId: 'TOOL-BOOK-01',
  name: 'booking.details.get',
  category: AIToolCategory.BOOKING,
  description: 'Retrieves hotel, cab, or doorstep technician booking details.',
  department: Department.QUERY,
  owner: 'QUERY_TEAM',
  version: '1.0.0',
  inputSchema: { bookingId: { type: 'string', required: true } },
  outputSchema: { booking: { type: 'object' } },
  requiredPermissions: ['read:booking'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-ORCH-001'],
  allowedTenants: ['*'],
  timeoutMs: 3000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

// 4. Payment Tool
AIToolRegistry.registerTool({
  toolId: 'TOOL-PAY-01',
  name: 'payment.status.verify',
  category: AIToolCategory.PAYMENT,
  description: 'Verifies payment status with payment gateway webhook logs.',
  department: Department.PAYMENT,
  owner: 'PAYMENT_TEAM',
  version: '1.0.0',
  inputSchema: { transactionId: { type: 'string', required: true } },
  outputSchema: { paymentVerified: { type: 'boolean' } },
  requiredPermissions: ['read:payment'],
  riskLevel: AIRiskLevel.MEDIUM,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-PAY-001', 'AI-ORCH-001'],
  allowedTenants: ['*'],
  timeoutMs: 3000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

AIToolRegistry.registerTool({
  toolId: 'TOOL-PAY-02',
  name: 'payment.refund.request',
  category: AIToolCategory.PAYMENT,
  description: 'DEPRECATED: Refund requests disabled under No-Refund policy.',
  department: Department.PAYMENT,
  owner: 'PAYMENT_TEAM',
  version: '2.0.0',
  inputSchema: { orderId: { type: 'string', required: true }, amount: { type: 'number', required: true } },
  outputSchema: { refundRequestId: { type: 'string' } },
  requiredPermissions: ['request:refund'],
  riskLevel: AIRiskLevel.HIGH,
  controlLevel: AIActionControlLevel.HUMAN_APPROVAL,
  allowedAgents: ['AI-PAY-001'],
  allowedTenants: ['*'],
  timeoutMs: 5000,
  idempotencyKeyRequired: true,
  status: 'DRAFT'
});

// 5. KYC Tool
AIToolRegistry.registerTool({
  toolId: 'TOOL-KYC-01',
  name: 'kyc.document.quality.check',
  category: AIToolCategory.KYC,
  description: 'Evaluates OCR blur score, resolution, and readability of uploaded KYC document.',
  department: Department.KYC,
  owner: 'KYC_TEAM',
  version: '1.0.0',
  inputSchema: { documentUrl: { type: 'string', required: true } },
  outputSchema: { blurScore: { type: 'number' }, readable: { type: 'boolean' } },
  requiredPermissions: ['read:kyc'],
  riskLevel: AIRiskLevel.MEDIUM,
  controlLevel: AIActionControlLevel.AUTO_WITH_VALIDATION,
  allowedAgents: ['AI-KYC-001'],
  allowedTenants: ['*'],
  timeoutMs: 4000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

// 6. Membership Tool
AIToolRegistry.registerTool({
  toolId: 'TOOL-MEM-01',
  name: 'membership.benefits.get',
  category: AIToolCategory.MEMBERSHIP,
  description: 'Retrieves active membership tier, perks, and expiration date.',
  department: Department.QUERY,
  owner: 'QUERY_TEAM',
  version: '1.0.0',
  inputSchema: { userId: { type: 'string', required: true } },
  outputSchema: { tier: { type: 'string' }, benefits: { type: 'array' } },
  requiredPermissions: ['read:membership'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001'],
  allowedTenants: ['*'],
  timeoutMs: 2000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

// 7. Vendor Tool
AIToolRegistry.registerTool({
  toolId: 'TOOL-VEND-01',
  name: 'vendor.profile.get',
  category: AIToolCategory.VENDOR,
  description: 'Retrieves vendor store registration, GSTIN status, and store info.',
  department: Department.KYC,
  owner: 'KYC_TEAM',
  version: '1.0.0',
  inputSchema: { vendorId: { type: 'string', required: true } },
  outputSchema: { vendor: { type: 'object' } },
  requiredPermissions: ['read:vendor'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-KYC-001'],
  allowedTenants: ['*'],
  timeoutMs: 3000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

// 8. Agent Tool
AIToolRegistry.registerTool({
  toolId: 'TOOL-AGT-01',
  name: 'agent.profile.get',
  category: AIToolCategory.AGENT,
  description: 'Retrieves agent profile, registration fee payment status, and KYC state.',
  department: Department.KYC,
  owner: 'KYC_TEAM',
  version: '1.0.0',
  inputSchema: { agentId: { type: 'string', required: true } },
  outputSchema: { agent: { type: 'object' } },
  requiredPermissions: ['read:agent'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-KYC-001'],
  allowedTenants: ['*'],
  timeoutMs: 3000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

// 9. Referral Tool
AIToolRegistry.registerTool({
  toolId: 'TOOL-REF-01',
  name: 'referral.vendors.list',
  category: AIToolCategory.COMMISSION,
  description: 'Lists all vendors onboarded by an agent for commission calculations.',
  department: Department.PAYMENT,
  owner: 'PAYMENT_TEAM',
  version: '1.0.0',
  inputSchema: { agentId: { type: 'string', required: true } },
  outputSchema: { referredVendors: { type: 'array' } },
  requiredPermissions: ['read:referral'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-PAY-001'],
  allowedTenants: ['*'],
  timeoutMs: 3000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

// 10. Commission Tool
AIToolRegistry.registerTool({
  toolId: 'TOOL-COMM-01',
  name: 'commission.balance.get',
  category: AIToolCategory.COMMISSION,
  description: 'Retrieves agent active wallet balance and withdrawable referral commission.',
  department: Department.PAYMENT,
  owner: 'PAYMENT_TEAM',
  version: '1.0.0',
  inputSchema: { agentId: { type: 'string', required: true } },
  outputSchema: { balance: { type: 'number' }, withdrawable: { type: 'number' } },
  requiredPermissions: ['read:commission'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-PAY-001'],
  allowedTenants: ['*'],
  timeoutMs: 3000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

// 11. Ticket Tool
AIToolRegistry.registerTool({
  toolId: 'TOOL-TKT-01',
  name: 'ticket.create',
  category: AIToolCategory.SUPPORT,
  description: 'Creates a support ticket for tracking customer, vendor, or agent issues.',
  department: Department.QUERY,
  owner: 'QUERY_TEAM',
  version: '1.0.0',
  inputSchema: { subjectId: { type: 'string', required: true }, summary: { type: 'string', required: true } },
  outputSchema: { ticketId: { type: 'string' } },
  requiredPermissions: ['write:ticket'],
  riskLevel: AIRiskLevel.LOW,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-KYC-001', 'AI-PAY-001'],
  allowedTenants: ['*'],
  timeoutMs: 3000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});

// 12. Communication Tool
AIToolRegistry.registerTool({
  toolId: 'TOOL-COMM-02',
  name: 'communication.whatsapp.send',
  category: AIToolCategory.COMMUNICATION,
  description: 'Dispatches WhatsApp transactional template message to customer/vendor/agent.',
  department: Department.QUERY,
  owner: 'COMMUNICATION_TEAM',
  version: '1.0.0',
  inputSchema: { recipientPhone: { type: 'string', required: true }, templateName: { type: 'string', required: true } },
  outputSchema: { messageId: { type: 'string' } },
  requiredPermissions: ['write:communication'],
  riskLevel: AIRiskLevel.MEDIUM,
  controlLevel: AIActionControlLevel.AUTO_WITH_VALIDATION,
  allowedAgents: ['AI-QUERY-001', 'AI-KYC-001', 'AI-PAY-001'],
  allowedTenants: ['*'],
  timeoutMs: 4000,
  idempotencyKeyRequired: true,
  status: 'APPROVED'
});

// 13. Escalation Tool
AIToolRegistry.registerTool({
  toolId: 'TOOL-ESC-01',
  name: 'escalation.tl.handoff',
  category: AIToolCategory.ESCALATION,
  description: 'Escalates ticket and conversation session to human Team Lead queue.',
  department: Department.QUERY,
  owner: 'GOVERNANCE_TEAM',
  version: '1.0.0',
  inputSchema: { ticketId: { type: 'string', required: true }, targetRole: { type: 'string', required: true } },
  outputSchema: { escalationId: { type: 'string' } },
  requiredPermissions: ['write:escalation'],
  riskLevel: AIRiskLevel.MEDIUM,
  controlLevel: AIActionControlLevel.AUTO,
  allowedAgents: ['AI-QUERY-001', 'AI-KYC-001', 'AI-PAY-001', 'AI-ORCH-001'],
  allowedTenants: ['*'],
  timeoutMs: 3000,
  idempotencyKeyRequired: false,
  status: 'APPROVED'
});
