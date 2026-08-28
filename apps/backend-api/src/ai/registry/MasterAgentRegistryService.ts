import { MasterAgent11Dimensions, AILifecycleStatus, Department } from '../../types';

export class MasterAgentRegistryService {
  private static registry: Map<string, MasterAgent11Dimensions> = new Map();

  static {
    // 1. AI-ORCHESTRATOR-001
    this.registerAgent({
      agentCode: 'AI-ORCHESTRATOR-001',
      agentName: 'Master AI Orchestrator',
      department: 'ORCHESTRATOR',
      purpose: 'Routes support requests, evaluates requester identity, delegates to department agents, and manages execution context.',
      responsibilities: [
        'Identify requester role and tier (GOLD / STANDARD)',
        'Classify request intent and language',
        'Assign department boundary (Query, KYC, Payment)',
        'Select target specialized worker node',
        'Enforce 5 Security Gates and route escalations'
      ],
      permissions: ['EXECUTE_ORCHESTRATOR_PIPELINE', 'DELEGATE_TO_AGENTS', 'QUERY_ROUTING_INDEX'],
      tools: ['router_analyze_intent', 'identity_resolver', 'context_aggregator'],
      knowledge: ['System Architecture Blueprint v3.2', 'Routing Rules Index', 'SLA Guidelines'],
      prompt: 'You are the Master AI Orchestrator. Classify incoming customer/vendor/agent queries and assign them to the correct department.',
      input: 'NormalizedMessage (raw user text, channel metadata, requester ID)',
      output: 'OrchestratorRoutingPlan (department, agentCode, requiredTools, securityGateResult)',
      escalation: 'Escalates unclassifiable or system policy queries directly to Operational Admin queue.',
      status: AILifecycleStatus.ACTIVE,
      version: 'v3.2.0'
    });

    // 2. AI-QUERY-001
    this.registerAgent({
      agentCode: 'AI-QUERY-001',
      agentName: 'Query AI Department Lead',
      department: Department.QUERY,
      purpose: 'Resolves general customer, vendor, and agent inquiries regarding orders, bookings, services, and memberships.',
      responsibilities: [
        'Answer order status and tracking inquiries',
        'Provide booking and service guidance from RAG store',
        'Perform basic account and membership inquiries'
      ],
      permissions: ['READ_ORDER_STORE', 'READ_QUERY_RAG', 'UPDATE_CUSTOMER_NOTES'],
      tools: ['query_order_status', 'search_knowledge_base', 'check_booking_details'],
      knowledge: ['Order Management FAQs', 'Refund & Return Policy v2.1', 'Service Terms'],
      prompt: 'You are Query AI. Assist users with accurate order, booking, and general service inquiries using citations.',
      input: 'QueryIntentRequest (orderId, queryText, customerContext)',
      output: 'QueryResolutionResponse (answerText, sourceCitations, recommendedActions)',
      escalation: 'Escalates unresolved order disputes to Query Team Lead queue.',
      status: AILifecycleStatus.ACTIVE,
      version: 'v2.4.0'
    });

    // 3. AI-KYC-001
    this.registerAgent({
      agentCode: 'AI-KYC-001',
      agentName: 'KYC AI Department Lead',
      department: Department.KYC,
      purpose: 'Automates identity document verification, OCR extraction, fraud screening, and vendor onboarding.',
      responsibilities: [
        'Inspect uploaded PAN, Aadhaar, Passport, and GST documents',
        'Verify document clarity and flag unreadable images',
        'Validate identity numbers against government database',
        'Trigger re-upload requests for rejected documents'
      ],
      permissions: ['READ_KYC_DOCUMENTS', 'VERIFY_IDENTITY_NUMBER', 'TRIGGER_REUPLOAD_NOTIFICATION'],
      tools: ['ocr_inspect_document', 'verify_identity_gov', 'request_document_reupload'],
      knowledge: ['KYC Compliance Policy 2026', 'OCR Error Code Manual', 'Vendor Onboarding Checklist'],
      prompt: 'You are KYC AI. Verify identity documents strictly. If blurred or invalid, reject and request re-upload.',
      input: 'KYCSubmissionPayload (vendorId, documentType, documentUrl)',
      output: 'KYCVerificationResult (status: APPROVED | REUPLOAD_REQUIRED | REJECTED, confidenceScore)',
      escalation: 'Escalates unreadable documents or fraud alerts to KYC Team Lead queue.',
      status: AILifecycleStatus.ACTIVE,
      version: 'v3.0.0'
    });

    // 4. AI-PAYMENT-001
    this.registerAgent({
      agentCode: 'AI-PAYMENT-001',
      agentName: 'Payment AI Department Lead',
      department: Department.PAYMENT,
      purpose: 'Handles payment verification, checkout links, wallet credit calculation, and refund processing gating.',
      responsibilities: [
        'Check transaction statuses across gateway webhooks',
        'Generate dynamic payment links for pending orders',
        'Calculate and credit referral commissions ($50)',
        'Gating refund requests for human TL approval'
      ],
      permissions: ['READ_PAYMENT_GATEWAY', 'GENERATE_PAYMENT_LINK', 'CREDIT_AGENT_WALLET'],
      tools: ['check_payment_status', 'generate_stripe_link', 'credit_wallet_balance', 'request_refund_approval'],
      knowledge: ['Payment Gateway Gateway Specs', 'Refund Approval Limits', 'Referral Commission Rules'],
      prompt: 'You are Payment AI. Verify payment transactions. Any refund above $0 requires Payment TL sign-off.',
      input: 'PaymentCheckPayload (transactionId, orderId, refundAmount)',
      output: 'PaymentResolutionResponse (paymentStatus, linkUrl, walletCredited, escalationTicketId)',
      escalation: 'Escalates all refund executions and chargeback disputes to Payment Team Lead queue.',
      status: AILifecycleStatus.ACTIVE,
      version: 'v2.8.0'
    });

    // 5. AI-CALLING-001
    this.registerAgent({
      agentCode: 'AI-CALLING-001',
      agentName: 'Voice Calling Specialist AI',
      department: 'SHARED',
      purpose: 'Executes automated outbound voice calls for urgent OTPs, payment reminders, and KYC re-upload follow-ups.',
      responsibilities: [
        'Initiate outbound voice telephony calls via Exotel/Twilio',
        'Stream real-time text-to-speech dialogue',
        'Transcribe customer voice input and detect DTMF tones'
      ],
      permissions: ['INITIATE_OUTBOUND_CALL', 'STREAM_TTS_AUDIO', 'TRANSCRIBE_AUDIO_STREAM'],
      tools: ['telephony_outbound_call', 'tts_synthesize', 'dtmf_capture'],
      knowledge: ['Voice Interaction Scripts', 'Call Scheduling Policy'],
      prompt: 'You are Voice Calling AI. Conduct clear, concise voice dialogue with customers for urgent updates.',
      input: 'VoiceCallDispatchRequest (phoneNumber, messageText, priority)',
      output: 'VoiceCallSummary (durationSeconds, callOutcome, transcriptSnippet)',
      escalation: 'Transfers dropped calls or distressed customers to Human Voice Queue.',
      status: AILifecycleStatus.ACTIVE,
      version: 'v1.5.0'
    });

    // 6. AI-WHATSAPP-001
    this.registerAgent({
      agentCode: 'AI-WHATSAPP-001',
      agentName: 'WhatsApp Specialist AI',
      department: 'SHARED',
      purpose: 'Manages interactive WhatsApp messaging, template broadcasts, quick reply buttons, and media attachments.',
      responsibilities: [
        'Send approved WhatsApp Business API templates',
        'Process interactive button clicks and list selections',
        'Receive and forward customer media attachments (PDFs, Images)'
      ],
      permissions: ['SEND_WHATSAPP_TEMPLATE', 'PARSE_WHATSAPP_MEDIA'],
      tools: ['whatsapp_send_template', 'whatsapp_send_media', 'whatsapp_quick_reply'],
      knowledge: ['WhatsApp Template Guidelines', 'Interactive Messaging Standards'],
      prompt: 'You are WhatsApp AI. Deliver rich, interactive WhatsApp messages with buttons and fast responses.',
      input: 'WhatsAppPayload (recipientPhone, templateName, parameters)',
      output: 'WhatsAppDeliveryStatus (messageId, status: SENT | DELIVERED | READ)',
      escalation: 'Escalates WhatsApp session timeouts to Department Support Queue.',
      status: AILifecycleStatus.ACTIVE,
      version: 'v2.1.0'
    });

    // 7. AI-EMAIL-001
    this.registerAgent({
      agentCode: 'AI-EMAIL-001',
      agentName: 'Email Specialist AI',
      department: 'SHARED',
      purpose: 'Generates structured HTML email responses, formal invoice receipts, and official compliance notices.',
      responsibilities: [
        'Format professional email responses with branding',
        'Attach PDF invoices and verification certificates',
        'Process inbound email threads and parse attachments'
      ],
      permissions: ['SEND_BRANDED_EMAIL', 'GENERATE_PDF_ATTACHMENT'],
      tools: ['email_send_smtp', 'pdf_generator_invoice'],
      knowledge: ['Corporate Email Guidelines', 'HTML Email Templates'],
      prompt: 'You are Email AI. Craft clear, professional email communications with proper formatting.',
      input: 'EmailDispatchRequest (toAddress, subject, bodyHtml, attachments)',
      output: 'EmailDispatchResult (messageId, status: SENT, sentAt)',
      escalation: 'Escalates formal legal or compliance email inquiries to Admin queue.',
      status: AILifecycleStatus.ACTIVE,
      version: 'v2.0.0'
    });

    // 8. AI-TRANSLATION-001
    this.registerAgent({
      agentCode: 'AI-TRANSLATION-001',
      agentName: 'Translation Specialist AI',
      department: 'SHARED',
      purpose: 'Provides real-time multilingual translation across 12 languages (Hindi, Tamil, Telugu, Spanish, etc.).',
      responsibilities: [
        'Detect incoming message language automatically',
        'Translate customer queries to English for internal processing',
        'Translate outgoing AI responses back to customer\'s native language'
      ],
      permissions: ['EXECUTE_TRANSLATION_MODEL'],
      tools: ['translate_text', 'detect_language'],
      knowledge: ['Multilingual Glossary', 'Domain Specific Terminology Maps'],
      prompt: 'You are Translation AI. Translate text accurately preserving business context and tone.',
      input: 'TranslationPayload (sourceText, targetLanguage)',
      output: 'TranslationResult (translatedText, detectedSourceLang, confidence)',
      escalation: 'Escalates low-confidence translations to Human Language Specialist.',
      status: AILifecycleStatus.ACTIVE,
      version: 'v1.8.0'
    });

    // 9. AI-ESCALATION-001
    this.registerAgent({
      agentCode: 'AI-ESCALATION-001',
      agentName: 'Escalation Specialist AI',
      department: 'SHARED',
      purpose: 'Packages ticket context, conversation history, and tool execution traces for human Team Lead handoffs.',
      responsibilities: [
        'Assemble TL Handoff Package (Summary, Key Entities, Blocking Reason)',
        'Assign priority SLA score based on customer tier and issue severity',
        'Push handoff notification to governing human Team Lead queue'
      ],
      permissions: ['CREATE_HUMAN_HANDOFF_PACKAGE', 'ASSIGN_TL_QUEUE'],
      tools: ['package_tl_handoff', 'push_to_escalation_queue'],
      knowledge: ['Human Handoff SLA Matrix', 'Severity Level Index'],
      prompt: 'You are Escalation AI. Synthesize conversation context clearly for seamless human supervisor takeover.',
      input: 'EscalationTriggerPayload (ticketId, department, blockingReason, customerTier)',
      output: 'HandoffPackageResult (packageId, targetQueue, assignedTLRole, slaMinutes)',
      escalation: 'Directly enqueues item into governing human Team Lead queue.',
      status: AILifecycleStatus.ACTIVE,
      version: 'v2.2.0'
    });
  }

  static registerAgent(agent: MasterAgent11Dimensions): void {
    this.registry.set(agent.agentCode, agent);
  }

  static getAgent(agentCode: string): MasterAgent11Dimensions | undefined {
    return this.registry.get(agentCode);
  }

  static getAllAgents(): MasterAgent11Dimensions[] {
    return Array.from(this.registry.values());
  }

  static getOrganizationalStructure() {
    return {
      name: 'Enterprise AI Workforce',
      orchestrator: this.getAgent('AI-ORCHESTRATOR-001'),
      departments: [
        {
          name: 'Query Department',
          leadAgent: this.getAgent('AI-QUERY-001')
        },
        {
          name: 'KYC Department',
          leadAgent: this.getAgent('AI-KYC-001')
        },
        {
          name: 'Payment Department',
          leadAgent: this.getAgent('AI-PAYMENT-001')
        }
      ],
      sharedServices: [
        this.getAgent('AI-CALLING-001'),
        this.getAgent('AI-WHATSAPP-001'),
        this.getAgent('AI-EMAIL-001'),
        this.getAgent('AI-TRANSLATION-001'),
        this.getAgent('AI-ESCALATION-001')
      ]
    };
  }
}
