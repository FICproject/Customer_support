export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  QUERIES_TL = 'QUERIES_TL',
  KYC_TL = 'KYC_TL',
  PAYMENT_TL = 'PAYMENT_TL',
  QUERY_AGENT = 'QUERY_AGENT',
  KYC_AGENT = 'KYC_AGENT',
  PAYMENT_AGENT = 'PAYMENT_AGENT',
  CUSTOMER = 'CUSTOMER',
  VENDOR = 'VENDOR',
  AGENT = 'AGENT',
  TECHNICIAN = 'TECHNICIAN',
  HOSPITAL = 'HOSPITAL',
  HOTEL = 'HOTEL',
  TRAVEL_PROVIDER = 'TRAVEL_PROVIDER'
}

export enum UserType {
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL',
  AI_AGENT = 'AI_AGENT'
}

export enum RequesterType {
  CUSTOMER = 'CUSTOMER',
  VENDOR = 'VENDOR',
  AGENT = 'AGENT'
}

export enum AILifecycleStatus {
  DRAFT = 'DRAFT',
  CONFIGURED = 'CONFIGURED',
  TESTING = 'TESTING',
  EVALUATION = 'EVALUATION',
  APPROVED = 'APPROVED',
  ACTIVE = 'ACTIVE',
  MONITORING = 'MONITORING',
  PAUSED = 'PAUSED',
  RETIRED = 'RETIRED'
}

export enum Department {
  QUERY = 'QUERY',
  KYC = 'KYC',
  PAYMENT = 'PAYMENT',
  SYSTEM = 'SYSTEM'
}

export enum AIOperatingStep {
  RECEIVE_REQUEST = '1. Receive request',
  UNDERSTAND_REQUEST = '2. Understand request',
  IDENTIFY_REQUESTER = '3. Identify requester',
  GATHER_REQUIRED_INFO = '4. Gather required information',
  IDENTIFY_DEPARTMENT = '5. Identify department',
  RETRIEVE_KNOWLEDGE = '6. Retrieve knowledge',
  RETRIEVE_LIVE_SYSTEM_DATA = '7. Retrieve live system data',
  DETERMINE_WORKFLOW = '8. Determine workflow',
  EXECUTE_AUTHORIZED_ACTIONS = '9. Execute authorized actions',
  VERIFY_RESULT = '10. Verify result',
  RESPOND = '11. Respond',
  RECORD_EVERYTHING = '12. Record everything',
  ESCALATE_WHEN_REQUIRED = '13. Escalate when required'
}

export enum AIWorkforceLayer {
  ORCHESTRATOR = 'ORCHESTRATOR',
  DEPARTMENT = 'DEPARTMENT',
  SPECIALIZED = 'SPECIALIZED'
}

export enum AIDepartmentAgentType {
  QUERY_AI = 'QUERY_AI',
  KYC_AI = 'KYC_AI',
  PAYMENT_AI = 'PAYMENT_AI'
}

export enum AISpecializedAgentType {
  CALLING_AI = 'CALLING_AI',
  WHATSAPP_AI = 'WHATSAPP_AI',
  EMAIL_AI = 'EMAIL_AI',
  TRANSLATION_AI = 'TRANSLATION_AI',
  ESCALATION_AI = 'ESCALATION_AI',
  KNOWLEDGE_AI = 'KNOWLEDGE_AI'
}

export enum AIAgentClassification {
  ORCHESTRATOR = 'TYPE_1_ORCHESTRATOR',
  DEPARTMENT_COORDINATOR = 'TYPE_2_DEPARTMENT_COORDINATOR',
  SPECIALIST_AGENT = 'TYPE_3_SPECIALIST_AGENT',
  SHARED_SERVICE_AGENT = 'TYPE_4_SHARED_SERVICE_AGENT',
  CONTROL_AGENT = 'TYPE_5_CONTROL_AGENT'
}

export enum AIAgentType {
  ROUTER = 'ROUTER',
  CUSTOMER_PROFILE = 'CUSTOMER_PROFILE',
  QUERY = 'QUERY',
  KYC = 'KYC',
  PAYMENT = 'PAYMENT',
  CALLING = 'CALLING',
  EMAIL = 'EMAIL',
  WHATSAPP = 'WHATSAPP',
  TRANSLATION = 'TRANSLATION',
  ESCALATION = 'ESCALATION',
  FRAUD_DETECTION = 'FRAUD_DETECTION',
  KNOWLEDGE = 'KNOWLEDGE',
  MONITORING = 'MONITORING',

  // Query Department Specialists
  ORDER_SUPPORT = 'ORDER_SUPPORT',
  BOOKING_SUPPORT = 'BOOKING_SUPPORT',
  SERVICE_SUPPORT = 'SERVICE_SUPPORT',
  MEMBERSHIP_SUPPORT = 'MEMBERSHIP_SUPPORT',
  GENERAL_SUPPORT = 'GENERAL_SUPPORT',

  // KYC Department Specialists
  DOCUMENT_COLLECTION = 'DOCUMENT_COLLECTION',
  DOCUMENT_QUALITY = 'DOCUMENT_QUALITY',
  DOCUMENT_VERIFICATION = 'DOCUMENT_VERIFICATION',
  IDENTITY_VERIFICATION = 'IDENTITY_VERIFICATION',
  VENDOR_VERIFICATION = 'VENDOR_VERIFICATION',
  KYC_DECISION = 'KYC_DECISION',

  // Payment Department Specialists
  PAYMENT_VERIFICATION = 'PAYMENT_VERIFICATION',
  PAYMENT_REMINDER = 'PAYMENT_REMINDER',
  RECEIPT = 'RECEIPT',
  COMMISSION = 'COMMISSION',
  WITHDRAWAL = 'WITHDRAWAL'
}

export enum AIRiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export enum AIRuntimeAvailability {
  AVAILABLE = 'AVAILABLE',
  BUSY = 'BUSY',
  PAUSED = 'PAUSED',
  MAINTENANCE = 'MAINTENANCE',
  OFFLINE = 'OFFLINE',
  DISABLED = 'DISABLED',
  ERROR = 'ERROR'
}

export enum AIActionControlLevel {
  AUTO = 'AUTO',
  AUTO_WITH_VALIDATION = 'AUTO_WITH_VALIDATION',
  REQUEST_ONLY = 'REQUEST_ONLY',
  HUMAN_APPROVAL = 'HUMAN_APPROVAL',
  PROHIBITED = 'PROHIBITED'
}

export enum HumanEscalationTarget {
  QUERY_TL = 'QUERY_TL',
  KYC_TL = 'KYC_TL',
  PAYMENT_TL = 'PAYMENT_TL',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN'
}

export interface AIAgentHandoffMessage {
  fromAgent: string;
  toAgent: string;
  workflowId: string;
  entityId: string;
  tenantId: string;
  reason: string;
  status: string;
  requiredAction: string;
  context: Record<string, any>;
  timestamp: string;
}

export interface AIPermissionPolicy {
  agentId: string;
  department: Department;
  tenantScope: string;
  riskLevel: AIRiskLevel;
  dataAccess: string[];
  knowledgeAccess: string[];
  toolAccess: string[];
  actionPolicies: Record<string, AIActionControlLevel>;
  escalationTarget: HumanEscalationTarget;
}
export enum WorkflowState {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  WAITING = 'WAITING',
  WAITING_FOR_USER = 'WAITING_FOR_USER',
  WAITING_FOR_PAYMENT = 'WAITING_FOR_PAYMENT',
  WAITING_FOR_DOCUMENT = 'WAITING_FOR_DOCUMENT',
  WAITING_FOR_VERIFICATION = 'WAITING_FOR_VERIFICATION',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  RETRYING = 'RETRYING',
  ESCALATED = 'ESCALATED',
  CANCELLED = 'CANCELLED',
  REJECTED = 'REJECTED'
}

export enum WorkflowType {
  ORDER_SUPPORT = 'ORDER_SUPPORT',
  BOOKING_SUPPORT = 'BOOKING_SUPPORT',
  SERVICE_SUPPORT = 'SERVICE_SUPPORT',
  MEMBERSHIP_SUPPORT = 'MEMBERSHIP_SUPPORT',
  GENERAL_QUERY = 'GENERAL_QUERY',
  REFUND_REQUEST = 'REFUND_REQUEST',
  AGENT_REGISTRATION = 'AGENT_REGISTRATION',
  AGENT_KYC = 'AGENT_KYC',
  AGENT_PAYMENT = 'AGENT_PAYMENT',
  AGENT_ACTIVATION = 'AGENT_ACTIVATION',
  DIRECT_VENDOR_REGISTRATION = 'DIRECT_VENDOR_REGISTRATION',
  REFERRAL_VENDOR_REGISTRATION = 'REFERRAL_VENDOR_REGISTRATION',
  VENDOR_KYC = 'VENDOR_KYC',
  VENDOR_PAYMENT = 'VENDOR_PAYMENT',
  VENDOR_ACTIVATION = 'VENDOR_ACTIVATION',
  PAYMENT_VERIFICATION = 'PAYMENT_VERIFICATION',
  RECEIPT_GENERATION = 'RECEIPT_GENERATION',
  COMMISSION_CALCULATION = 'COMMISSION_CALCULATION',
  COMMISSION_WITHDRAWAL = 'COMMISSION_WITHDRAWAL'
}

export enum WorkflowPriority {
  CRITICAL = 'CRITICAL',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

export interface WorkflowInstance {
  instanceId: string;
  workflowId: string;
  workflowType: WorkflowType;
  version: string;
  tenantId: string;
  entityId: string;
  requesterId: string;
  requesterType: RequesterType;
  department: Department;
  currentAgentCode: string;
  currentState: WorkflowState;
  priority: WorkflowPriority;
  retryCount: number;
  maxRetries: number;
  timeoutMs: number;
  context: Record<string, any>;
  history: {
    previousState: WorkflowState;
    newState: WorkflowState;
    agentCode: string;
    action: string;
    timestamp: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface AIAgentConfiguration {
  agentName: string;
  agentId: string;
  department: Department;
  description: string;
  purpose: string;
  systemPrompt: string;
  departmentPrompt: string;
  model: string;
  temperature: number;
  maxTokens: number;
  knowledgeSources: string[];
  tools: string[];
  permissions: string[];
  allowedActions: string[];
  restrictedActions: string[];
  escalationRules: { triggerCondition: string; targetRole: UserRole }[];
  slaMinutes: number;
  supportedLanguages: string[];
  communicationChannels: string[];
  concurrencyLimit: number;
  fallbackAgentId: string;
  version: string;
  status: AILifecycleStatus;
}

export interface MasterAgent11Dimensions {
  agentCode: string;
  agentName: string;
  department: Department | 'ORCHESTRATOR' | 'SHARED';
  purpose: string;
  responsibilities: string[];
  permissions: string[];
  tools: string[];
  knowledge: string[];
  prompt: string;
  input: string;
  output: string;
  escalation: string;
  status: AILifecycleStatus;
  version: string;
}

export enum AIToolCategory {
  CUSTOMER = 'CUSTOMER',
  ORDER = 'ORDER',
  BOOKING = 'BOOKING',
  SERVICE = 'SERVICE',
  MEMBERSHIP = 'MEMBERSHIP',
  AGENT = 'AGENT',
  VENDOR = 'VENDOR',
  KYC = 'KYC',
  PAYMENT = 'PAYMENT',
  COMMISSION = 'COMMISSION',
  SUPPORT = 'SUPPORT',
  COMMUNICATION = 'COMMUNICATION',
  ESCALATION = 'ESCALATION',
  SYSTEM = 'SYSTEM'
}

export enum AIToolErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  TENANT_ACCESS_ERROR = 'TENANT_ACCESS_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  BUSINESS_RULE_ERROR = 'BUSINESS_RULE_ERROR',
  EXTERNAL_SERVICE_ERROR = 'EXTERNAL_SERVICE_ERROR',
  TIMEOUT = 'TIMEOUT',
  RATE_LIMIT = 'RATE_LIMIT',
  DUPLICATE_REQUEST = 'DUPLICATE_REQUEST',
  SYSTEM_ERROR = 'SYSTEM_ERROR'
}

export interface AIToolDefinition {
  toolId: string; // e.g. 'order.status.read'
  name: string;
  description: string;
  category: AIToolCategory;
  department: Department;
  owner: string;
  version: string;
  inputSchema: Record<string, any>;
  outputSchema: Record<string, any>;
  requiredPermissions: string[];
  riskLevel: AIRiskLevel;
  controlLevel: AIActionControlLevel;
  allowedAgents: string[];
  allowedTenants: string[];
  timeoutMs: number;
  idempotencyKeyRequired: boolean;
  status: 'DRAFT' | 'SANDBOX' | 'TEST' | 'APPROVED' | 'PRODUCTION';
}

export interface AIToolResult<T = any> {
  success: boolean;
  data: T | null;
  error: {
    errorCode: AIToolErrorCode;
    message: string;
    retryable: boolean;
    details?: any;
  } | null;
  metadata: {
    toolId: string;
    toolVersion: string;
    executionId: string;
    durationMs: number;
    tenantId: string;
  };
}

export interface AIAgentPermissionMatrix {
  agentCode: string;
  department: Department;
  readPermissions: {
    allowed: string[];
    prohibited: string[];
  };
  writePermissions: {
    allowed: string[];
    prohibited: string[];
  };
}

export enum AIRAGDocumentStatus {
  DRAFT = 'DRAFT',
  UPLOADED = 'UPLOADED',
  PROCESSING = 'PROCESSING',
  CHUNKED = 'CHUNKED',
  EMBEDDED = 'EMBEDDED',
  REVIEW = 'REVIEW',
  APPROVED = 'APPROVED',
  PUBLISHED = 'PUBLISHED',
  ACTIVE = 'ACTIVE',
  SUPERSEDED = 'SUPERSEDED'
}

export enum AIRAGAccessLevel {
  PUBLIC = 'PUBLIC',
  INTERNAL = 'INTERNAL',
  RESTRICTED = 'RESTRICTED',
  CONFIDENTIAL = 'CONFIDENTIAL'
}

export enum AIRAGCategory {
  FAQS = 'FAQS',
  SOPS = 'SOPS',
  POLICIES = 'POLICIES',
  PRODUCT_GUIDES = 'PRODUCT_GUIDES',
  KYC_GUIDELINES = 'KYC_GUIDELINES',
  PAYMENT_RULES = 'PAYMENT_RULES',
  MEMBERSHIP_RULES = 'MEMBERSHIP_RULES',
  AGENT_GUIDELINES = 'AGENT_GUIDELINES',
  VENDOR_GUIDELINES = 'VENDOR_GUIDELINES',
  REFERRAL_RULES = 'REFERRAL_RULES',
  COMMUNICATION_GUIDELINES = 'COMMUNICATION_GUIDELINES',
  ESCALATION_RULES = 'ESCALATION_RULES',
  SECURITY_POLICIES = 'SECURITY_POLICIES'
}

export interface AIRAGDocument {
  documentId: string;
  title: string;
  category: AIRAGCategory;
  department: Department;
  version: string;
  status: AIRAGDocumentStatus;
  accessLevel: AIRAGAccessLevel;
  language: string;
  tenantId: string;
  effectiveFrom: string;
  effectiveUntil?: string | null;
  createdBy: string;
  approvedBy?: string;
  originalFileUrl: string; // S3 storage link
}

export interface AIRAGChunk {
  chunkId: string;
  documentId: string;
  department: Department;
  category: AIRAGCategory;
  version: string;
  section: string;
  content: string;
  tenantId: string;
  status: AIRAGDocumentStatus;
  accessLevel: AIRAGAccessLevel;
}

export interface AIRAGSearchResult {
  chunkId: string;
  documentId: string;
  documentTitle: string;
  section: string;
  content: string;
  similarityScore: number;
  citation: string;
}

export enum AIPromptCategory {
  SYSTEM_GLOBAL = 'SYSTEM_GLOBAL',
  ORCHESTRATOR = 'ORCHESTRATOR',
  DEPARTMENT_QUERY = 'DEPARTMENT_QUERY',
  DEPARTMENT_KYC = 'DEPARTMENT_KYC',
  DEPARTMENT_PAYMENT = 'DEPARTMENT_PAYMENT',
  COMMUNICATION_CALLING = 'COMMUNICATION_CALLING',
  COMMUNICATION_WHATSAPP = 'COMMUNICATION_WHATSAPP',
  COMMUNICATION_EMAIL = 'COMMUNICATION_EMAIL',
  COMMUNICATION_TRANSLATION = 'COMMUNICATION_TRANSLATION',
  ESCALATION = 'ESCALATION',
  MEMBERSHIP = 'MEMBERSHIP',
  VENDOR_ONBOARDING = 'VENDOR_ONBOARDING',
  AGENT_ONBOARDING = 'AGENT_ONBOARDING',
  REFERRAL_COMMISSION = 'REFERRAL_COMMISSION',
  SECURITY_COMPLIANCE = 'SECURITY_COMPLIANCE'
}

export interface AIPromptTemplate {
  templateId: string;
  name: string;
  category: AIPromptCategory;
  department?: Department;
  version: string;
  description: string;
  systemPromptText: string;
  variables: string[];
  assignedAgents: string[];
  tenantId: string;
  isDefault: boolean;
  status: 'DRAFT' | 'ACTIVE' | 'ARCHIVED';
  createdAt: string;
  updatedAt: string;
}

export enum AIMemoryLayer {
  L1_CURRENT_CONTEXT = 'L1_CURRENT_CONTEXT',
  L2_CONVERSATION_MEMORY = 'L2_CONVERSATION_MEMORY',
  L3_INTERACTION_HISTORY = 'L3_INTERACTION_HISTORY',
  L4_STRUCTURED_BUSINESS_STATE = 'L4_STRUCTURED_BUSINESS_STATE'
}

export enum AIMemoryType {
  CONVERSATION_SUMMARY = 'CONVERSATION_SUMMARY',
  USER_PREFERENCE = 'USER_PREFERENCE',
  ISSUE_HISTORY = 'ISSUE_HISTORY',
  RESOLUTION_HISTORY = 'RESOLUTION_HISTORY',
  WORKFLOW_CONTEXT = 'WORKFLOW_CONTEXT',
  ESCALATION_HISTORY = 'ESCALATION_HISTORY',
  COMMUNICATION_HISTORY = 'COMMUNICATION_HISTORY'
}

export interface AIMemoryRecord {
  memoryId: string;
  tenantId: string;
  subjectType: RequesterType;
  subjectId: string;
  conversationId: string;
  layer: AIMemoryLayer;
  type: AIMemoryType;
  summaryText: string;
  extractedFacts: Record<string, any>;
  expiresAt?: string | null;
  createdAt: string;
}

export interface AIHandoffPackage {
  conversationId: string;
  ticketId: string;
  subjectId: string;
  subjectType: RequesterType;
  department: Department;
  summary: string;
  actionsTaken: string[];
  escalationReason: string;
  recommendedNextStep: string;
  ragSourcesUsed: string[];
  createdAt: string;
}

export interface AIEvaluationMetrics {
  groundednessScore: number; // 0.0 to 1.0
  citationAccuracyRate: number; // 0 to 100%
  automatedResolutionRate: number; // 0 to 100%
  averageConfidenceScore: number; // 0 to 100%
  toolSuccessRate: number; // 0 to 100%
  totalTokensUsed: number;
  totalCostUSD: number;
}

export interface AIGovernanceStatus {
  globalEmergencyKillSwitchActive: boolean;
  activeCircuitBreakersCount: number;
  systemHealth: 'OPTIMAL' | 'DEGRADED' | 'CRITICAL' | 'EMERGENCY_STOP';
  activeWorkersCount: number;
  pausedWorkersCount: number;
  offlineWorkersCount: number;
}

export enum AIGuardrailLayer {
  LAYER_1_INPUT = 'LAYER_1_INPUT',
  LAYER_2_AUTHORIZATION = 'LAYER_2_AUTHORIZATION',
  LAYER_3_PROMPT = 'LAYER_3_PROMPT',
  LAYER_4_RAG = 'LAYER_4_RAG',
  LAYER_5_TOOL = 'LAYER_5_TOOL',
  LAYER_6_WORKFLOW = 'LAYER_6_WORKFLOW',
  LAYER_7_OUTPUT = 'LAYER_7_OUTPUT',
  LAYER_8_HUMAN_ESCALATION = 'LAYER_8_HUMAN_ESCALATION',
  LAYER_9_AUDIT = 'LAYER_9_AUDIT',
  LAYER_10_EVALUATION = 'LAYER_10_EVALUATION'
}

export enum KYCDecisionCode {
  DOCUMENT_BLURRY = 'DOCUMENT_BLURRY',
  DOCUMENT_EXPIRED = 'DOCUMENT_EXPIRED',
  DOCUMENT_MISSING = 'DOCUMENT_MISSING',
  DOCUMENT_MISMATCH = 'DOCUMENT_MISMATCH',
  INVALID_DOCUMENT = 'INVALID_DOCUMENT',
  VERIFICATION_FAILED = 'VERIFICATION_FAILED',
  REQUIRED_FIELD_MISSING = 'REQUIRED_FIELD_MISSING',
  VERIFICATION_SOURCE_FAILED = 'VERIFICATION_SOURCE_FAILED'
}

export enum AISecurityEventType {
  PROMPT_INJECTION = 'PROMPT_INJECTION',
  TOOL_ABUSE = 'TOOL_ABUSE',
  UNAUTHORIZED_ACCESS = 'UNAUTHORIZED_ACCESS',
  SENSITIVE_DATA_REQUEST = 'SENSITIVE_DATA_REQUEST',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  SUSPICIOUS_BEHAVIOR = 'SUSPICIOUS_BEHAVIOR'
}

export enum AIIncidentSeverity {
  SEV_1_CRITICAL = 'SEV_1_CRITICAL',
  SEV_2_HIGH = 'SEV_2_HIGH',
  SEV_3_MEDIUM = 'SEV_3_MEDIUM',
  SEV_4_LOW = 'SEV_4_LOW'
}

export interface AITraceRecord {
  traceId: string;
  conversationId: string;
  tenantId: string;
  agentCode: string;
  inputPayload: string;
  detectedIntent: string;
  ragSourcesUsed: string[];
  toolCallsExecuted: string[];
  guardrailResults: {
    passed: boolean;
    failedLayers: AIGuardrailLayer[];
  };
  outputResponse: string;
  durationMs: number;
  createdAt: string;
}

export enum AnalyticsTimeframe {
  REALTIME = 'REALTIME',
  HOURLY = 'HOURLY',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY'
}

export enum ControlCenterRoleScope {
  SUPER_ADMIN_GLOBAL = 'SUPER_ADMIN_GLOBAL',
  ADMIN_OPERATIONAL = 'ADMIN_OPERATIONAL',
  QUERY_TL_DEPT = 'QUERY_TL_DEPT',
  KYC_TL_DEPT = 'KYC_TL_DEPT',
  PAYMENT_TL_DEPT = 'PAYMENT_TL_DEPT'
}

export enum SystemHealthState {
  HEALTHY = 'HEALTHY',
  DEGRADED = 'DEGRADED',
  CRITICAL = 'CRITICAL',
  MAINTENANCE = 'MAINTENANCE'
}

export interface EnterpriseKPISummary {
  totalConversations: number;
  activeConversations: number;
  resolvedConversations: number;
  escalatedConversations: number;
  aiResolutionRate: number; // e.g. 85.4%
  aiAccuracy: number; // e.g. 97.2%
  slaComplianceRate: number; // e.g. 98.6%
  totalAICostUSD: number;
  costPerConversationUSD: number;
  activeWorkersCount: number;
  totalKYCApplications: number;
  kycApprovalRate: number;
  totalSuccessfulPayments: number;
  pendingRefundsCount: number;
  averageCSAT: number; // e.g. 4.8 / 5.0
  systemHealth: SystemHealthState;
}

export enum DisasterRecoveryStatus {
  RPO_TARGET_MET = 'RPO_TARGET_MET',
  RTO_TARGET_MET = 'RTO_TARGET_MET',
  FAILOVER_ACTIVE = 'FAILOVER_ACTIVE',
  BACKUP_COMPLETED = 'BACKUP_COMPLETED',
  DISASTER_RECOVERY_TESTING = 'DISASTER_RECOVERY_TESTING'
}

export enum ProductionReadinessGate {
  SECURITY_SCAN = 'SECURITY_SCAN',
  RBAC_VERIFIED = 'RBAC_VERIFIED',
  PENETRATION_TESTED = 'PENETRATION_TESTED',
  LOAD_TESTED = 'LOAD_TESTED',
  DISASTER_RECOVERY_READY = 'DISASTER_RECOVERY_READY'
}

export interface SecurityScoreSummary {
  securityScore: number; // e.g. 98 / 100
  activeThreatsCount: number;
  failedLoginAttemptsCount: number;
  blockedRequestsCount: number;
  rpoMinutes: number; // e.g. 15 mins
  rtoMinutes: number; // e.g. 60 mins
  lastBackupTimestamp: string;
  mfaEnforcedRoles: UserRole[];
  electronContextIsolated: boolean;
  productionReady: boolean;
}

export enum CommunicationIntent {
  REQUEST_REUPLOAD = 'REQUEST_REUPLOAD',
  PAYMENT_REMINDER = 'PAYMENT_REMINDER',
  PAYMENT_CONFIRMED = 'PAYMENT_CONFIRMED',
  CREDENTIALS_DISPATCH = 'CREDENTIALS_DISPATCH',
  TICKET_CREATED = 'TICKET_CREATED',
  TICKET_RESOLVED = 'TICKET_RESOLVED',
  REFUND_ESCALATED = 'REFUND_ESCALATED',
  OUTBOUND_CALL_REQUEST = 'OUTBOUND_CALL_REQUEST'
}

export interface CommunicationDispatchRequest {
  requestId: string;
  tenantId: string;
  recipientId: string;
  recipientType: RequesterType;
  intent: CommunicationIntent;
  payload: Record<string, any>;
  preferredChannel?: SupportChannel;
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
}

export interface CommunicationDispatchResult {
  requestId: string;
  channelsDispatched: SupportChannel[];
  status: 'SENT' | 'DELIVERED' | 'PARTIAL_SUCCESS' | 'FAILED';
  deliveryTimestamps: Record<string, string>;
}

export enum AIAgentLifecycleState {
  DRAFT = 'DRAFT',
  CONFIGURED = 'CONFIGURED',
  TRAINING = 'TRAINING',
  TESTING = 'TESTING',
  EVALUATION = 'EVALUATION',
  APPROVED = 'APPROVED',
  STAGING = 'STAGING',
  PRODUCTION = 'PRODUCTION',
  PAUSED = 'PAUSED',
  IMPROVEMENT = 'IMPROVEMENT',
  RETIRED = 'RETIRED'
}

export enum AIWorkerAvailability {
  AVAILABLE = 'AVAILABLE',
  BUSY = 'BUSY',
  PROCESSING = 'PROCESSING',
  WAITING = 'WAITING',
  ERROR = 'ERROR',
  OFFLINE = 'OFFLINE',
  PAUSED = 'PAUSED',
  MAINTENANCE = 'MAINTENANCE'
}

export enum AICanaryDeploymentState {
  CANARY_5_PERCENT = 'CANARY_5_PERCENT',
  CANARY_25_PERCENT = 'CANARY_25_PERCENT',
  CANARY_50_PERCENT = 'CANARY_50_PERCENT',
  PRODUCTION_100_PERCENT = 'PRODUCTION_100_PERCENT',
  ROLLED_BACK = 'ROLLED_BACK'
}

export interface AIQualityScoreBreakdown {
  accuracyScore: number; // e.g. 94.2%
  policyComplianceScore: number; // e.g. 98.6%
  toolAccuracyScore: number; // e.g. 96.1%
  ragGroundingScore: number; // e.g. 93.5%
  escalationAccuracyScore: number; // e.g. 99.0%
  hallucinationRate: number; // e.g. 0.8%
  overallQualityScore: number; // e.g. 95.8 / 100
}

export interface AICommandCenterSummary {
  totalAIAgents: number;
  activeCount: number;
  idleCount: number;
  busyCount: number;
  failedCount: number;
  offlineCount: number;
  
  // Current Request Metrics
  completedRequests: number;
  inProgressRequests: number;
  escalatedRequests: number;
  
  // Accuracy & Performance KPIs
  resolutionRate: number; // e.g. 88.4%
  escalationRate: number; // e.g. 11.6%
  avgResolutionTimeMs: number; // e.g. 1420 ms
  aiAccuracy: number; // e.g. 97.2%
  ragAccuracy: number; // e.g. 94.8%
  toolFailureRate: number; // e.g. 0.4%
  timestamp: string;
}

export enum CaseStatus {
  NEW = 'NEW',
  TRIAGED = 'TRIAGED',
  ASSIGNED = 'ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  WAITING_FOR_USER = 'WAITING_FOR_USER',
  WAITING_FOR_EXTERNAL_SYSTEM = 'WAITING_FOR_EXTERNAL_SYSTEM',
  ESCALATED = 'ESCALATED',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
  REOPENED = 'REOPENED',
  CANCELLED = 'CANCELLED'
}

export enum ActorType {
  CUSTOMER = 'CUSTOMER',
  VENDOR = 'VENDOR',
  AGENT = 'AGENT'
}

export interface SupportCaseRecord {
  caseId: string;
  tenantId: string;
  actorId: string;
  actorType: ActorType;
  intent: string;
  department: Department;
  assignedAgentCode: string;
  priority: WorkflowPriority;
  status: CaseStatus;
  slaTargetMs: number;
  createdAt: string;
  updatedAt: string;
}

export interface AILiveOperationCard {
  agentCode: string;
  department: Department;
  status: AIWorkerAvailability;
  activeTaskId: string;
  userType: ActorType;
  currentStep: string;
  progressPercentage: number; // e.g. 80
  executedTools: string[];
  nextStep: string;
  lastUpdatedTimestamp: string;
}

export enum TenantStatus {
  PROSPECT = 'PROSPECT',
  TRIAL = 'TRIAL',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  CANCELLED = 'CANCELLED',
  ARCHIVED = 'ARCHIVED'
}

export enum SaaSPlanTier {
  STARTER = 'STARTER',
  PROFESSIONAL = 'PROFESSIONAL',
  BUSINESS = 'BUSINESS',
  ENTERPRISE = 'ENTERPRISE'
}

export enum FeatureEntitlement {
  VOICE_SUPPORT = 'VOICE_SUPPORT',
  WHATSAPP_MESSAGING = 'WHATSAPP_MESSAGING',
  ADVANCED_RAG = 'ADVANCED_RAG',
  CUSTOM_AI_AGENTS = 'CUSTOM_AI_AGENTS',
  WHITE_LABEL = 'WHITE_LABEL',
  API_ACCESS = 'API_ACCESS'
}

export interface TenantRecord {
  tenantId: string;
  name: string;
  legalName: string;
  status: TenantStatus;
  planTier: SaaSPlanTier;
  entitlements: FeatureEntitlement[];
  monthlyQuota: {
    maxConversations: number;
    maxTokens: number;
    maxVoiceMinutes: number;
  };
  currentUsage: {
    usedConversations: number;
    usedTokens: number;
    usedVoiceMinutes: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface AIDecisionLogRecord {
  decisionId: string;
  requestId: string;
  tenantId: string;
  agentCode: string;
  department: Department;
  decision: string;
  reason: string;
  evidence: string;
  knowledgeVersion: string;
  toolsExecuted: string[];
  timestamp: string;
  result: string;
}

export enum ToolRiskLevel {
  READ = 'READ',
  WRITE = 'WRITE',
  SENSITIVE = 'SENSITIVE',
  CRITICAL = 'CRITICAL'
}

export enum IntegrationProviderType {
  PAYMENT = 'PAYMENT',
  WHATSAPP = 'WHATSAPP',
  EMAIL = 'EMAIL',
  TELEPHONY = 'TELEPHONY',
  CRM = 'CRM',
  ERP = 'ERP',
  KYC_SERVICE = 'KYC_SERVICE'
}

export enum IntegrationHealthState {
  HEALTHY = 'HEALTHY',
  DEGRADED = 'DEGRADED',
  CIRCUIT_OPEN = 'CIRCUIT_OPEN',
  FAILED = 'FAILED'
}

export interface IntegrationConnectorRecord {
  connectionId: string;
  tenantId: string;
  providerType: IntegrationProviderType;
  providerName: string;
  healthState: IntegrationHealthState;
  latencyMs: number;
  rateLimitPerMin: number;
  isSandbox: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AIEvaluationTestCase {
  testCaseId: string;
  scenarioName: string;
  agentCode: string;
  inputPrompt: string;
  expectedDecision: string;
  actualDecision: string;
  passed: boolean;
  isSecurityViolation: boolean;
  executionTimeMs: number;
}

export interface AIEvaluationSuiteResult {
  suiteId: string;
  totalTests: number;
  passCount: number;
  failCount: number;
  securityViolationCount: number;
  overallAccuracyRate: number; // e.g. 95.0%
  testCases: AIEvaluationTestCase[];
  timestamp: string;
}

export enum PromptVersionStatus {
  DRAFT = 'DRAFT',
  TESTING = 'TESTING',
  APPROVED = 'APPROVED',
  PRODUCTION = 'PRODUCTION',
  ARCHIVED = 'ARCHIVED'
}

export interface AIWorkforceScorecard {
  agentCode: string;
  department: Department;
  totalTasks: number;
  resolutionRate: number; // e.g. 94.2%
  escalationRate: number; // e.g. 4.1%
  csatRating: number; // e.g. 4.6 / 5
  toolSuccessRate: number; // e.g. 98.4%
  ragGroundingScore: number; // e.g. 95.1%
  policyComplianceRate: number; // e.g. 99.8%
  avgLatencyMs: number; // e.g. 1820 ms
  costPerResolutionUSD: number; // e.g. 0.042 USD
}

export interface AIImprovementItem {
  itemId: string;
  tenantId: string;
  agentCode: string;
  issueType: string; // e.g. "KNOWLEDGE_GAP", "FALSE_REJECTION"
  description: string;
  rootCauseCategory: 'MODEL' | 'PROMPT' | 'RAG' | 'TOOL' | 'INTEGRATION' | 'POLICY';
  status: 'NEW' | 'IN_REVIEW' | 'FIXED' | 'DISMISSED';
  createdAt: string;
}

export interface AIPerformanceMetricsRecord {
  resolutionRate: number; // e.g. 94.2%
  firstContactResolution: number; // e.g. 88.5%
  averageResponseTimeMs: number; // e.g. 1420 ms
  averageResolutionTimeMs: number; // e.g. 36000 ms
  escalationRate: number; // e.g. 4.1%
  ragRetrievalAccuracy: number; // e.g. 95.1%
  toolSuccessRate: number; // e.g. 98.4%
  wrongAnswerRate: number; // e.g. 1.2%
  hallucinationRate: number; // e.g. 0.4%
  policyViolationRate: number; // e.g. 0.0%
  customerSatisfaction: number; // e.g. 4.6 / 5
  costPerConversationUSD: number; // e.g. 0.038 USD
  tokenUsageTotal: number; // e.g. 1420000
  timestamp: string;
}

export enum AIVersionStage {
  DRAFT = 'DRAFT',
  TEST = 'TEST',
  EVALUATE = 'EVALUATE',
  APPROVE = 'APPROVE',
  PUBLISH = 'PUBLISH',
  MONITOR = 'MONITOR',
  ROLLED_BACK = 'ROLLED_BACK',
  ARCHIVED = 'ARCHIVED'
}

export interface AIAgentVersionBundle {
  versionId: string;
  agentCode: string;
  versionTag: string; // e.g. "v2.0"
  stage: AIVersionStage;
  modelConfig: Record<string, any>;
  promptVersion: string;
  ragConfig: Record<string, any>;
  toolsAllowed: string[];
  permissions: Record<string, any>;
  businessRules: string[];
  evaluationResults: {
    accuracy: number;
    passCount: number;
    failCount: number;
  };
  publishedAt?: string;
  rolledBackAt?: string;
  createdAt: string;
}

export enum AIWorkforceViewId {
  OVERVIEW = 'OVERVIEW',
  COMMAND_CENTER = 'COMMAND_CENTER',
  AGENT_REGISTRY = 'AGENT_REGISTRY',
  DEPT_QUERY = 'DEPT_QUERY',
  DEPT_KYC = 'DEPT_KYC',
  DEPT_PAYMENT = 'DEPT_PAYMENT',
  SPEC_CALLING = 'SPEC_CALLING',
  SPEC_WHATSAPP = 'SPEC_WHATSAPP',
  SPEC_EMAIL = 'SPEC_EMAIL',
  SPEC_TRANSLATION = 'SPEC_TRANSLATION',
  SPEC_ESCALATION = 'SPEC_ESCALATION',
  AGENT_CONFIG = 'AGENT_CONFIG',
  PROMPT_MGMT = 'PROMPT_MGMT',
  KNOWLEDGE_BASE = 'KNOWLEDGE_BASE',
  TOOL_MGMT = 'TOOL_MGMT',
  WORKFLOW_MGMT = 'WORKFLOW_MGMT',
  LIVE_OPERATIONS = 'LIVE_OPERATIONS',
  CONVERSATIONS = 'CONVERSATIONS',
  AI_DECISIONS = 'AI_DECISIONS',
  AI_LOGS = 'AI_LOGS',
  EVALUATIONS = 'EVALUATIONS',
  PERFORMANCE = 'PERFORMANCE',
  VERSIONS = 'VERSIONS',
  SETTINGS = 'SETTINGS'
}

export interface AIWorkforceNavigationItem {
  id: AIWorkforceViewId;
  label: string;
  icon: string;
  route: string;
  children?: AIWorkforceNavigationItem[];
}

export interface AIWorkforceOverviewKPISummary {
  totalAIAgents: number; // e.g. 12
  activeAgents: number; // e.g. 8
  busyAgents: number; // e.g. 3
  offlineAgents: number; // e.g. 1
  requestsToday: number; // e.g. 4820
  aiResolvedToday: number; // e.g. 4102
  escalatedToday: number; // e.g. 718
  resolutionRatePercentage: number; // e.g. 85.1%
  timestamp: string;
}

export interface AICommandCenterKPISummary {
  aiAgentsOnline: number; // e.g. 8
  totalAgents: number; // e.g. 12
  activeTasksCount: number; // e.g. 126
  todaysRequestsCount: number; // e.g. 4821
  aiResolutionPercentage: number; // e.g. 94.7%
  escalationsPercentage: number; // e.g. 3.8%
  failedTasksPercentage: number; // e.g. 1.2%
  avgResponseTimeSeconds: number; // e.g. 1.8 sec
  aiCostTodayINR: number; // e.g. 1840 (₹1,840)
  timestamp: string;
}

export interface AIWorkforceLiveStatusItem {
  id: string;
  name: string;
  code: string;
  status: 'Running' | 'Healthy' | 'Busy' | 'Paused';
  tasksCount?: number;
  isOnline: boolean;
  type: string;
  uptime: string;
  avgResponseMs: number;
  confidenceScore: number;
  assignedTools: string[];
  activeTaskSummary: string;
  memoryUsageMb: number;
  lastExecutionTimestamp: string;
}

export interface AIAgentDetailRecord {
  agentCode: string; // e.g. "AI-KYC-001"
  agentName: string; // e.g. "KYC AI"
  status: 'ONLINE' | 'OFFLINE' | 'BUSY' | 'PAUSED';
  currentTasks: number; // 18
  completedToday: number; // 1245
  successRatePercentage: number; // 97.8
  escalationRatePercentage: number; // 1.9
  avgProcessingSec: number; // 34
  errorsCount: number; // 12
  promptVersion: string; // "KYC-v4"
  modelName: string; // "GPT-5.6"
  ragVersion: string; // "KYC-v8"
  liveTasks: Array<{ taskId: string; title: string; step: string; progress: number; startedAt: string }>;
  queueItems: Array<{ queueId: string; payloadSummary: string; slaTimerSec: number; priority: string }>;
  performanceMetrics: { latencyP95Ms: number; fcrScore: number; csatScore: number };
  tools: string[];
  workflows: string[];
  permissions: string[];
  errorLogs: Array<{ id: string; code: string; message: string; timestamp: string }>;
  escalations: Array<{ ticketId: string; reason: string; routedTo: string; timestamp: string }>;
  activityTrail: Array<{ action: string; user: string; timestamp: string }>;
  evaluationScores: { accuracyPercent: number; securityPassRate: number; hallucinationRate: number };
  costTodayINR: number;
  health: { uptimePercent: number; memoryMb: number; cpuUsagePercent: number; circuitBreaker: 'CLOSED' | 'OPEN' };
  versions: Array<{ versionTag: string; stage: string; publishedAt: string }>;
}

export interface AILiveOperationTaskRecord {
  taskId: string; // e.g. "#TK-10291"
  actorType: 'Customer' | 'Vendor' | 'Agent';
  actorId: string; // e.g. "VND-9402"
  issue: string; // e.g. "KYC Verification"
  department: string; // e.g. "KYC"
  aiAgentCode: string; // e.g. "KYC AI"
  status: 'PROCESSING' | 'RESOLVED' | 'ESCALATED' | 'FAILED';
  startedAt: string; // e.g. "12:48:10 PM"
  durationSec: number; // e.g. 42
  currentStep: string; // e.g. "Document Verification"
  executionTrace: {
    stage1CustomerRequest: { rawMessage: string; channel: string; timestamp: string };
    stage2IdentityVerification: { actorType: string; identityId: string; verificationStatus: string; score: number };
    stage3IntentDetection: { primaryIntent: string; confidenceScore: number; detectedEntities: string[] };
    stage4ContextGathering: { memoryHistoryTokens: number; activeSessionContext: string };
    stage5DepartmentSelection: { targetDepartment: string; routingReason: string };
    stage6AIAgentAssignment: { assignedAgentCode: string; agentName: string; versionTag: string };
    stage7RAGSearch: { queryVector: string; matchedChunksCount: number; precisionScore: number; topCitation: string };
    stage8PolicyValidation: { gate1NoDirectDB: string; gate2RefundLimit: string; gate3ToolAuth: string; overallPolicyState: string };
    stage9ToolSelection: { selectedTools: string[]; toolSelectionReasoning: string };
    stage10ToolExecution: Array<{ toolName: string; inputPayload: any; outputResult: any; executionLatencyMs: number; status: string; timestamp: string }>;
    stage11ResultValidation: { validationPassed: boolean; qualityScore: number; outputSanitized: boolean };
    stage12AIResponse: { generatedResponseText: string; tokensUsed: number; costINR: number };
    stage13Resolution: { finalResolutionState: 'RESOLVED' | 'ESCALATED' | 'PROCESSING'; handedToHuman: boolean; resolutionTimestamp: string };
  };
}

export interface AIOrchestratorDashboardMetrics {
  requestsReceived: number; // 4821
  intentDetectionAccuracyPercent: number; // 98.6
  agentRoutingCount: number; // 4780
  activeWorkflows: number; // 42
  completedWorkflows: number; // 4510
  failedWorkflows: number; // 58
  escalationsCount: number; // 183
  averageRoutingTimeMs: number; // 420
  activeOrchestratorStreams: Array<{
    requestId: string;
    rawRequest: string;
    detectedIntent: string;
    assignedAgent: string;
    activeWorkflow: string;
    selectedTools: string[];
    status: 'ROUTING' | 'EXECUTING' | 'COMPLETED' | 'ESCALATED' | 'FAILED';
    timestamp: string;
  }>;
}

export interface QueryAIDepartmentDashboardRecord {
  departmentCode: 'DEPT_QUERY';
  departmentName: 'Query AI Department';
  overview: {
    totalRequestsToday: number; // 1820
    liveActiveTasksCount: number; // 32
    resolvedCount: number; // 1754
    escalatedCount: number; // 58
    failedCount: number; // 8
    successRatePercentage: number; // 96.4
    escalationRatePercentage: number; // 3.2
    avgResponseSec: number; // 1.4
  };
  topIssues: Array<{ issueName: string; percentage: number; count: number }>;
  categoryBreakdown: {
    orderQueriesCount: number; // 840
    bookingQueriesCount: number; // 340
    membershipQueriesCount: number; // 280
    serviceQueriesCount: number; // 360
  };
  customerContextSummary: Array<{ customerId: string; tier: string; activeInquiries: number; csat: number }>;
  knowledgeUsage: { vectorChunksSearched: number; precisionPercentage: number; topCitedArticles: string[] };
  toolUsage: Array<{ toolName: string; callsToday: number; latencyMs: number; successPercentage: number }>;
  performanceMetrics: { p95LatencySec: number; fcrPercentage: number; csatRating: number };
  evaluationScores: { accuracyPercentage: number; securityPassPercentage: number; hallucinationRatePercentage: number };
  liveRequestsList: Array<{ requestId: string; customerName: string; queryType: string; status: string; durationSec: number; currentStep: string }>;
  resolvedList: Array<{ requestId: string; issue: string; resolutionSummary: string; timestamp: string }>;
  escalatedList: Array<{ requestId: string; reason: string; routedTo: string; timestamp: string }>;
  failedList: Array<{ requestId: string; errorReason: string; timestamp: string }>;
}

export interface KYCAIDepartmentDashboardRecord {
  departmentCode: 'DEPT_KYC';
  departmentName: 'KYC AI Department';
  overview: {
    totalApplicationsToday: number; // 820
    pendingCount: number; // 18
    approvedCount: number; // 785
    rejectedCount: number; // 9
    escalatedCount: number; // 8
    reuploadRequestsCount: number; // 18
    successRatePercentage: number; // 97.8
    escalationRatePercentage: number; // 1.9
    avgProcessingTimeSec: number; // 34
  };
  statusCounts: {
    documentReceived: number; // 42
    documentAnalyzing: number; // 18
    documentInvalid: number; // 12
    reuploadRequired: number; // 18
    verificationInProgress: number; // 18
    verified: number; // 785
    rejected: number; // 9
    escalated: number; // 8
  };
  applicationsList: Array<{
    applicationId: string;
    applicantName: string;
    applicantType: 'Vendor' | 'Agent' | 'Customer';
    documentType: 'PAN' | 'Aadhaar' | 'GSTIN' | 'Passport';
    status: 'DOCUMENT_RECEIVED' | 'DOCUMENT_ANALYZING' | 'DOCUMENT_INVALID' | 'REUPLOAD_REQUIRED' | 'VERIFICATION_IN_PROGRESS' | 'VERIFIED' | 'REJECTED' | 'ESCALATED';
    ocrDpiScore: number;
    blurDetected: boolean;
    startedAt: string;
  }>;
  ocrMetrics: { totalExtracted: number; avgDpiScore: number; normalizationSuccessRate: number };
  blurDetectionMetrics: { inspectedCount: number; blurredDetectedCount: number; glareDetectedCount: number };
  missingDocumentsList: Array<{ applicationId: string; applicantName: string; missingDoc: string; sentLink: boolean }>;
  reuploadRequestsList: Array<{ id: string; applicantName: string; reason: string; sentChannel: string; timestamp: string }>;
  criminalEligibilityMetrics: { amlCheckPassedCount: number; sanctionsWatchlistPassedCount: number; flaggedCount: number };
  aiAccuracyMetrics: { accuracyPercentage: number; securityPolicyPassPercentage: number; falsePositiveRatePercentage: number };
  processingTimeMetrics: { avgSec: number; p95Sec: number; maxSec: number };
  failedCasesList: Array<{ id: string; code: string; errorDescription: string; timestamp: string }>;
  auditTrailList: Array<{ id: string; action: string; performedBy: string; timestamp: string }>;
}

export interface PaymentAIDepartmentDashboardRecord {
  departmentCode: 'DEPT_PAYMENT';
  departmentName: 'Payment AI Department';
  overview: {
    totalVolumeINRToday: number; // 485200
    pendingPaymentsCount: number; // 21
    successfulPaymentsCount: number; // 412
    failedPaymentsCount: number; // 5
    escalatedCount: number; // 14
    successRatePercentage: number; // 98.4
    escalationRatePercentage: number; // 2.8
    avgProcessingTimeSec: number; // 21
  };
  pendingPaymentsList: Array<{ txId: string; customerName: string; amountINR: number; method: string; status: string; startedAt: string }>;
  successfulPaymentsList: Array<{ txId: string; customerName: string; amountINR: number; method: string; receiptNo: string; timestamp: string }>;
  failedPaymentsList: Array<{ txId: string; customerName: string; amountINR: number; errorReason: string; timestamp: string }>;
  paymentLinksMetrics: { linksGeneratedToday: number; linksPaidCount: number; conversionPercentage: number };
  commissionMetrics: { totalCommissionCreditedTodayINR: number; activeAgentsPaidCount: number };
  referralCommissionMetrics: { totalReferralClaims: number; amountPerClaimUSD: number; totalCreditedUSD: number };
  vendorRegistrationMetrics: { directVendorsCount: number; referralVendorsCount: number };
  paymentRemindersMetrics: { remindersSentToday: number; collectedPostReminderINR: number };
  communicationMetrics: { whatsappAlertsSent: number; smsAlertsSent: number };
  escalationsList: Array<{ txId: string; reason: string; amountUSD: number; routedTo: string; timestamp: string }>;
  auditList: Array<{ id: string; action: string; amount: string; performedBy: string; timestamp: string }>;
}

export interface CommunicationAIDashboardRecord {
  departmentCode: 'SPEC_COMMUNICATION';
  departmentName: 'Communication AI';
  overview: {
    totalMessagesToday: number; // 4820
    activeCallsCount: number; // 42
    whatsappMessagesToday: number; // 1420
    emailsSentToday: number; // 840
    smsSentToday: number; // 2120
    deliverySuccessRatePercentage: number; // 99.4
    avgAudioLatencyMs: number; // 85
  };
  voiceMetrics: { activeSipChannels: number; ttsProvider: string; sttAccuracyPercentage: number; avgLatencyMs: number };
  whatsappMetrics: { totalSent: number; deliveredPercentage: number; readPercentage: number; templateCompliancePercentage: number };
  emailMetrics: { totalSent: number; openRatePercentage: number; dkimVerifiedRate: number };
  smsMetrics: { totalSent: number; deliveryPercentage: number; gatewayProvider: string };
  activeCallsList: Array<{ callId: string; customerName: string; agentName: string; durationSec: number; channel: string; status: string }>;
  conversationsList: Array<{ convId: string; customerName: string; channel: 'Voice' | 'WhatsApp' | 'Email' | 'SMS'; lastMessage: string; timestamp: string }>;
  templatesList: Array<{ templateId: string; name: string; channel: string; status: 'APPROVED' | 'PENDING'; usageCount: number }>;
  deliveryStatusMetrics: { deliveredCount: number; readCount: number; sentCount: number; queuedCount: number };
  failedMessagesList: Array<{ msgId: string; channel: string; recipient: string; errorReason: string; timestamp: string }>;
  callRecordingsList: Array<{ callId: string; customerName: string; durationSec: number; fileSizeMb: number; recordingUrl: string; timestamp: string }>;
  transcriptsList: Array<{ callId: string; customerName: string; transcriptText: string; sentimentScore: string; timestamp: string }>;
  analyticsMetrics: { csatScore: number; slaDeliveryPercentage: number; costINR: number };
}

export interface AIDepartmentDashboardMetrics {
  queryAIDepartment: {
    agentsCount: number; // 4
    activeCount: number; // 3
    busyCount: number; // 1
    requestsToday: number; // 1820
    resolvedCount: number; // 1620
    escalatedCount: number; // 200
  };
  kycAIDepartment: {
    agentsCount: number; // 3
    activeCount: number; // 2
    busyCount: number; // 1
    applicationsToday: number; // 820
    approvedCount: number; // 610
    rejectedCount: number; // 120
    reuploadRequestedCount: number; // 90
  };
  paymentAIDepartment: {
    agentsCount: number; // 3
    paymentsCheckedToday: number; // 1200
    successfulCount: number; // 980
    pendingCount: number; // 120
    failedCount: number; // 80
    escalatedCount: number; // 20
  };
  timestamp: string;
}

export enum AIWorkforceControlPermission {
  CREATE_DELETE_AGENT = 'CREATE_DELETE_AGENT',
  CHANGE_MODEL_CONFIG = 'CHANGE_MODEL_CONFIG',
  CHANGE_PROMPTS = 'CHANGE_PROMPTS',
  CHANGE_PERMISSIONS = 'CHANGE_PERMISSIONS',
  CHANGE_TOOLS = 'CHANGE_TOOLS',
  CHANGE_WORKFLOWS = 'CHANGE_WORKFLOWS',
  CHANGE_RAG_KNOWLEDGE = 'CHANGE_RAG_KNOWLEDGE',
  CHANGE_BUSINESS_RULES = 'CHANGE_BUSINESS_RULES',
  ACTIVATE_DEACTIVATE_AI = 'ACTIVATE_DEACTIVATE_AI',
  REVIEW_DECISIONS = 'REVIEW_DECISIONS',
  HANDLE_ESCALATIONS = 'HANDLE_ESCALATIONS',
  VIEW_REPORTS = 'VIEW_REPORTS'
}

export interface HumanRoleControlScope {
  role: 'SUPER_ADMIN' | 'ADMIN' | 'QUERY_TL' | 'KYC_TL' | 'PAYMENT_TL';
  departmentScope?: Department;
  allowedPermissions: AIWorkforceControlPermission[];
}

export interface HumanAIGovernanceMapping {
  humanRole: 'SUPER_ADMIN' | 'ADMIN' | 'QUERY_TL' | 'KYC_TL' | 'PAYMENT_TL';
  roleTitle: string;
  governsAITeam: string; // e.g. "Query AI Department", "KYC AI Department"
  governanceResponsibility: string;
  escalationTargetQueue: string;
  auditAuthorityLevel: 'UNLIMITED' | 'ORGANIZATION_OPERATIONAL' | 'DEPARTMENT_STRICT';
}

export interface MasterAIRequestFlowStep {
  stepNumber: number;
  stepName: string;
  status: 'SUCCESS' | 'SKIPPED' | 'ESCALATED' | 'FAILED';
  details: string;
}

export interface MasterAIRequestFlowResult {
  requestId: string;
  tenantId: string;
  actorType: 'CUSTOMER' | 'VENDOR' | 'AGENT';
  channel: string;
  resolvedDepartment: Department;
  assignedAgentCode: string;
  outcome: 'RESOLVED' | 'ESCALATED_TO_TL';
  executedSteps: MasterAIRequestFlowStep[];
  decisionLogId: string;
  latencyMs: number;
  timestamp: string;
}

export enum SupportChannel {
  CHAT = 'CHAT',
  WHATSAPP = 'WHATSAPP',
  EMAIL = 'EMAIL',
  VOICE = 'VOICE'
}

export enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  DOCUMENT = 'DOCUMENT',
  LOCATION = 'LOCATION',
  BUTTON = 'BUTTON',
  LIST = 'LIST',
  CAROUSEL = 'CAROUSEL',
  LINK = 'LINK',
  SYSTEM_EVENT = 'SYSTEM_EVENT'
}

export enum MessageDeliveryStatus {
  QUEUED = 'QUEUED',
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  READ = 'READ',
  FAILED = 'FAILED'
}

export enum VoiceCallState {
  RINGING = 'RINGING',
  CONNECTED = 'CONNECTED',
  GREETING = 'GREETING',
  AUTHENTICATING = 'AUTHENTICATING',
  UNDERSTANDING = 'UNDERSTANDING',
  PROCESSING = 'PROCESSING',
  SPEAKING = 'SPEAKING',
  WAITING = 'WAITING',
  ESCALATING = 'ESCALATING',
  ENDED = 'ENDED',
  FAILED = 'FAILED'
}

export interface NormalizedMessage {
  messageId: string;
  conversationId: string;
  participantId: string;
  channel: SupportChannel;
  messageType: MessageType;
  content: string;
  metadata?: Record<string, any>;
  status: MessageDeliveryStatus;
  timestamp: string;
}

export interface VoiceCallSession {
  callId: string;
  conversationId: string;
  direction: 'INBOUND' | 'OUTBOUND';
  callerPhone: string;
  assignedAgentCode: string;
  state: VoiceCallState;
  durationSeconds: number;
  recordingUrl?: string; // S3 storage URL
  transcriptId?: string;
  summaryText?: string;
  createdAt: string;
}

export interface AIWorkforceAgentNode {
  id: string;
  agentCode: string; // e.g. 'AI-KYC-001'
  name: string;
  purpose: string;
  type: AIAgentType | AIDepartmentAgentType | AISpecializedAgentType;
  classification: AIAgentClassification;
  layer: AIWorkforceLayer;
  department: Department;
  reportsToHumanRole: UserRole; // Maps AI Department Agent to Human TL (e.g. KYC_AI -> KYC_TL, SUPER_ADMIN)
  assignedHumanTLId?: string;
  status: 'ACTIVE' | 'PROCESSING' | 'IDLE' | 'ALERT';
  lifecycleStatus: AILifecycleStatus;
  runtimeAvailability: AIRuntimeAvailability;
  riskLevel: AIRiskLevel;
  model: string; // e.g. 'Gemini 1.5 Pro'
  modelConfig: {
    provider: 'GEMINI' | 'OPENAI' | 'BUILTIN';
    model: string;
    temperature: number;
    maxTokens: number;
    timeoutMs: number;
    fallbackModel: string;
  };
  version: string; // e.g. '1.0.0'
  promptVersion: string; // e.g. 'KYC Prompt v3'
  knowledgeBaseScope: string[]; // e.g. ['KYC Knowledge Base']
  tools: string[]; // e.g. ['OCRTool', 'BlurDetectionTool', 'GovtVerificationTool']
  permissions: string[]; // e.g. ['KYC_READ', 'KYC_VERIFY']
  maxConcurrentTasks: number; // e.g. 20
  currentTaskCount: number; // e.g. 2
  currentLoadPercent: number; // e.g. 10 (%)
  avgConfidenceScore: number;
  capabilities: string[];
  createdAt: string;
  lastActiveAt: string;
}

export enum TicketStatus {
  CREATED = 'CREATED',
  IN_PROGRESS = 'IN_PROGRESS',
  AI_RESOLVED = 'AI_RESOLVED',
  ESCALATED_TO_TL = 'ESCALATED_TO_TL',
  CLOSED = 'CLOSED'
}

export enum TicketPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export enum KYCStatus {
  PENDING_UPLOAD = 'PENDING_UPLOAD',
  SUBMITTED = 'SUBMITTED',
  OCR_PROCESSING = 'OCR_PROCESSING',
  UNDER_AI_VERIFICATION = 'UNDER_AI_VERIFICATION',
  NEED_REUPLOAD = 'NEED_REUPLOAD',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  ESCALATED = 'ESCALATED',
  ESCALATED_TO_TL = 'ESCALATED_TO_TL'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  LINK_SENT = 'LINK_SENT',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  RECONCILED = 'RECONCILED'
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  userType: UserType;
  department?: Department;
  panNumber?: string;
  aadhaarNumber?: string;
  membershipLevel?: 'STANDARD' | 'SILVER' | 'GOLD' | 'PLATINUM';
  referralCode?: string;
  referredByAgentCode?: string;
  walletBalance?: number;
  createdAt: string;
}

export interface OrderItem {
  id: string;
  userId: string;
  serviceType: string;
  amount: number;
  status: string;
  createdAt: string;
}

export interface KYCVerificationRecord {
  id: string;
  userId: string;
  userRole: UserRole;
  documentType: string;
  documentUrl: string;
  applicantName?: string;
  applicantType?: string;
  applicantPhone?: string;
  status?: string;
  paymentStatus?: string;
  currentStep?: string;
  ocrExtractedData?: {
    name?: string;
    idNumber?: string;
    dob?: string;
    address?: string;
  };
  blurScore: number; // 0 to 1 (0 = crystal clear, 1 = unreadable)
  forgeryRiskScore: number; // 0 to 1
  faceMatchScore: number; // 0 to 1
  isBlacklisted: boolean;
  isDuplicateDocument: boolean;
  governmentVerificationStatus: string;
  criminalVerificationStatus: string;
  aiDecision: KYCStatus;
  aiReasoning: string;
  manualReviewNotes?: string;
  reviewedByTL?: string;
  attemptCount?: number;
  documentSlotCleared?: boolean;
  clearedDocumentTypes?: string[];
  reuploadCallTriggered?: boolean;
  reuploadCallDetails?: {
    callId?: string;
    phone?: string;
    scriptText?: string;
    callSummary?: string;
    timestamp?: string;
  };
  escalatedToTL?: boolean;
  forwardedToHumanOfficer?: boolean;
  assignedHumanOfficer?: string;
  forwardingNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentTransaction {
  id: string;
  userId: string;
  ticketId?: string;
  amount: number;
  purpose: 'REGISTRATION_FEE' | 'VENDOR_ONBOARDING' | 'SERVICE_BOOKING' | 'REFUND';
  paymentLinkUrl?: string;
  gatewayTxnId?: string;
  status: PaymentStatus;
  invoiceUrl?: string;
  receiptUrl?: string;
  applicantName?: string;
  applicantType?: string;
  kycReference?: string;
  agentReferralCommission?: number;
  referredAgentId?: string;
  reminderCallCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CommissionPayout {
  id: string;
  agentId: string;
  vendorId: string;
  transactionId: string;
  amount: number;
  status: 'CREDITED' | 'PENDING_APPROVAL' | 'PAID_OUT';
  createdAt: string;
}

export interface Ticket {
  id: string;
  ticketNumber: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  channel: 'CHAT_WEB' | 'CHAT_WHATSAPP' | 'VOICE_TWILIO' | 'VOICE_EXOTEL';
  department: Department;
  subject: string;
  initialQuery: string;
  assignedAgent: AIAgentType;
  priority: TicketPriority;
  status: TicketStatus;
  confidenceScore: number; // 0-100
  escalationReason?: string;
  assignedTeamLeadId?: string;
  overrideNote?: string;
  resolutionSummary?: string;
  csatRating?: number; // 1 to 5
  createdAt: string;
  updatedAt: string;
}

export interface AIAgentState {
  type: AIAgentType;
  name: string;
  department: Department;
  currentTask: string;
  assignedWorkloadCount: number;
  queueDepth: number;
  avgConfidenceScore: number;
  status: 'ACTIVE' | 'PROCESSING' | 'IDLE' | 'ALERT';
  toolCallsCount: number;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string; // e.g., 'AI_ORCHESTRATOR', 'AI_KYC_AGENT', 'SUPER_ADMIN'
  agentType?: AIAgentType;
  action: string;
  ticketId?: string;
  userId?: string;
  toolInvoked?: string;
  inputPayload: any;
  outputResult: any;
  decisionReasoning: string;
  validationPassed: boolean;
  isHuman?: boolean;
  reason?: string;
  relatedEntity?: string;
  beforeValue?: any;
  afterValue?: any;
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  category: 'POLICIES' | 'REFUNDS' | 'VENDOR_RULES' | 'MEMBERSHIP' | 'PRICING' | 'SOPS' | 'FAQS';
  content: string;
  tags: string[];
  usageCount: number;
  helpfulnessScore: number;
  updatedAt: string;
}

export interface PromptTemplate {
  id: string;
  agentType: AIAgentType;
  title: string;
  systemPrompt: string;
  userPromptTemplate: string;
  version: number;
  active: boolean;
}

export interface WorkflowDefinition {
  id: string;
  name: string;
  description: string;
  steps: {
    stepNumber: number;
    stepName: string;
    assignedAgent: AIAgentType;
    action: string;
    nextStepOnSuccess?: number;
    nextStepOnFailure?: number;
  }[];
  active: boolean;
}

export interface DepartmentConfig {
  id: string;
  name: string;
  code: string;
  description: string;
  teamLead: string;
  assignedAgents: string[];
  humanCount: number;
  workloadPercentage: number;
  status: 'ACTIVE' | 'HIGH_LOAD' | 'MAINTENANCE';
  queueStrategy: 'AI_AUTO_ROUTING' | 'ROUND_ROBIN' | 'SKILL_BASED';
  maxQueueCapacity: number;
  activeQueueCount: number;
  aiAutopilot: boolean;
  aiConfidenceThreshold: number;
  primaryModel: string;
  temperature: number;
  firstResponseSLA: string;
  resolutionSLA: string;
  warningThresholdPercent: number;
  autoEscalateOnBreach: boolean;
}
