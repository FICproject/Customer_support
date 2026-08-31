import { TicketVisionButton } from './TicketVisionFlowModal';
import React, { useState } from 'react';
import { 
  Activity, Cpu, Zap, Search, Users, HelpCircle, Shield, CreditCard, Phone, MessageSquare, 
  FileText, Globe, AlertTriangle, ArrowDown, CheckCircle, CheckCircle2, Clock, Server, Terminal,
  Settings, Sliders, BookOpen, Wrench, GitBranch, Eye, BarChart2, Layers, Lock, Network, 
  UserPlus, ChevronRight, ChevronDown, User, ShieldAlert, Award, ArrowLeft, Plus, Check, X, RotateCcw
} from 'lucide-react';

const HeaderBanner = ({ title, icon: Icon, desc }: { title: string, icon: any, desc?: string }) => (
  <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div>
      <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '1.65rem', fontWeight: 900, color: 'var(--text-brand)' }}>
        <Icon size={30} className="text-amber" style={{ stroke: 'var(--text-amber)' }} /> {title}
      </h1>
      {desc && <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{desc}</p>}
    </div>
  </div>
);

interface HealthStats {
  availability: number;
  errorRate: number;
  latencyMs: number;
  toolFailureRate: number;
  escalationRate: number;
  resolutionRate: number;
  currentLoad: number;
}

interface AgentItem {
  id: string;
  name: string;
  type: 'ORCHESTRATOR' | 'DEPARTMENT_COORDINATOR' | 'SPECIALIST' | 'SHARED_SERVICE' | 'CONTROL';
  dept: 'Global' | 'Query' | 'KYC' | 'Payment' | 'Shared';
  owner: string;
  status: 'AVAILABLE' | 'BUSY' | 'PAUSED' | 'MAINTENANCE' | 'OFFLINE' | 'DISABLED' | 'ERROR';
  version: string;
  risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  purpose: string;
  responsibilities: string[];
  capabilities: string[];
  inputs: string[];
  outputs: string[];
  modelProvider: string;
  modelName: string;
  temperature: number;
  maxTokens: number;
  fallbackModel: string;
  systemPrompt: string;
  deptPrompt: string;
  escalationPrompt: string;
  knowledgeAccess: string[];
  toolAccess: string[];
  concurrencyLimit: number;
  timeoutSec: number;
  retryLimit: number;
  health: HealthStats;
  lifecycle: 'DRAFT' | 'CONFIGURED' | 'TESTING' | 'EVALUATION' | 'APPROVED' | 'ACTIVE' | 'PAUSED' | 'RETIRED';
  environment: 'PRODUCTION' | 'STAGING' | 'DEVELOPMENT';
  lastUpdated: string;
}

interface OperatingStep {
  title: string;
  desc: string;
  schema: string;
}

const operatingSteps: OperatingStep[] = [
  {
    title: 'Receive Request',
    desc: 'Entry point for external channels. The system ingests payloads from SMS, WhatsApp, Email, or web portal, validating security handshakes and sanitizing inputs.',
    schema: '{\n  "payload_id": "REQ-10821-X",\n  "channel": "WHATSAPP",\n  "timestamp": "2026-08-13T12:00:00Z"\n}'
  },
  {
    title: 'Understand Intent',
    desc: 'The incoming prompt is dispatched to natural language intent extractors. Identifies key keywords and maps targets to known intent tags.',
    schema: '{\n  "detected_intent": "ORDER_CANCEL",\n  "confidence_score": 0.985\n}'
  },
  {
    title: 'Identify Requester',
    desc: 'Looks up the requester\'s identity in database to resolve user types, permissions, and profiles (e.g., Customer, Referral Agent, or Direct Vendor).',
    schema: '{\n  "requester_id": "USR-88219",\n  "role": "VIP_CUSTOMER",\n  "active_sessions": 1\n}'
  },
  {
    title: 'Gather Info',
    desc: 'Collects active context details from the database such as active order codes, subscription keys, or KYC ticket IDs to append to the system prompt.',
    schema: '{\n  "associated_order_id": "ORD-20918",\n  "payment_status": "PAID"\n}'
  },
  {
    title: 'Identify Department',
    desc: 'The AI Orchestrator checks the context parameters to route the request to the matching department coordinator (Query, KYC, or Payment).',
    schema: '{\n  "routed_department": "QUERY",\n  "department_coordinator": "AI-QUERY-COORD-001"\n}'
  },
  {
    title: 'Retrieve Knowledge',
    desc: 'Fetches authorized FAQ and SOP guidelines from Vector Search (RAG) corresponding to the department\'s public knowledge boundaries.',
    schema: '{\n  "rag_sources": ["cancellation_faq.pdf", "billing_dispute_sop_v2.md"],\n  "chunk_count": 2\n}'
  },
  {
    title: 'Query Live Data',
    desc: 'Queries active backend databases (using isolated APIs, not raw queries) to fetch current, time-critical parameters like delivery truck GPS locations or bank balances.',
    schema: '{\n  "gateway_response": {\n    "courier_status": "OUT_FOR_DELIVERY",\n    "eta": "14:30"\n  }\n}'
  },
  {
    title: 'Determine Workflow',
    desc: 'Decides the processing workflow rules based on the collected properties (e.g., standard cancellation flow vs immediate escalation for VIP accounts).',
    schema: '{\n  "selected_workflow": "STANDARD_CANCELLATION",\n  "step_limit": 5\n}'
  },
  {
    title: 'Execute Action',
    desc: 'Triggers write events or calls external partner APIs (like Exotel dialing or payment verification checks) through the security gateways.',
    schema: '{\n  "executed_tool": "createSupportRequest()",\n  "status": "QUEUED"\n}'
  },
  {
    title: 'Verify Result',
    desc: 'Audits the outputs of actions to guarantee they are safe, correct, and within the expected format parameters (Structured Outputs checks).',
    schema: '{\n  "structured_result": {\n    "status": "SUCCESS",\n    "ticket_created": true\n  }\n}'
  },
  {
    title: 'Formulate Response',
    desc: 'Generates the final response layout, passing English templates to the Translation Agent if the user\'s detected language is regional.',
    schema: '{\n  "english_response": "Your order cancellation request has been logged.",\n  "translated_response": "உங்கள் ஆர்டர் ரத்து கோரிக்கை பதிவு செய்யப்பட்டுள்ளது."\n}'
  },
  {
    title: 'Record Everything',
    desc: 'Writes comprehensive traces of inputs, model states, tool calls, execution times, and final outputs to the central MongoDB Audit Collection.',
    schema: '{\n  "audit_logged": true,\n  "db_reference": "AUDIT-LOG-10291-88"\n}'
  },
  {
    title: 'Escalate (Fallback)',
    desc: 'Triggers human takeover procedures if compliance thresholds are breached, tool failures occur, or anger sentiment index is crossed.',
    schema: '{\n  "escalation_triggered": false,\n  "escalation_reason": null\n}'
  }
];

interface AIAgentDashboardProps {
  activeSubTab?: string;
  onSelectSubTab?: (tab: string) => void;
}

export const AIAgentDashboard: React.FC<AIAgentDashboardProps> = ({ activeSubTab = 'WORKFORCE_OVERVIEW', onSelectSubTab }) => {
  const normalizedTab = activeSubTab.toUpperCase();

  // ---------------------------------------------------------
  // INITIAL 25 AGENT MASTER REGISTRY STATE
  // ---------------------------------------------------------
  const [agents, setAgents] = useState<AgentItem[]>([
    {
      id: 'AI-ORCH-001',
      name: 'AI Workforce Orchestrator',
      type: 'ORCHESTRATOR',
      dept: 'Global',
      owner: 'Admin',
      status: 'AVAILABLE',
      version: 'v1.2.0',
      risk: 'CRITICAL',
      purpose: 'Coordinates other agents. Determines requester identity, categorizes queries, assigns appropriate departments, monitors workflow bounds, and resolves or escalates tasks.',
      responsibilities: ['Identify incoming user role', 'Retrieve relevant intent categories', 'Direct requests to departments', 'Orchestrate cross-department workflows', 'Determine escalation triggers'],
      capabilities: ['intent.parse', 'role.identify', 'route.department', 'workflow.orchestrate', 'escalation.trigger'],
      inputs: ['User request', 'Requester metadata', 'Session history', 'System policies'],
      outputs: ['Target department', 'Routing instructions', 'Handoff context', 'Handoff status'],
      modelProvider: 'Google Gemini',
      modelName: 'gemini-1.5-pro',
      temperature: 0.1,
      maxTokens: 2048,
      fallbackModel: 'gemini-1.5-flash',
      systemPrompt: 'ORCHESTRATOR-SYSTEM-v2',
      deptPrompt: 'GLOBAL-ROUTING-v1',
      escalationPrompt: 'ORCHESTRATOR-ESC-v2',
      knowledgeAccess: ['Workforce Routing SOP', 'Tenant SLA Policies', 'Global Security SOP'],
      toolAccess: ['routeRequest()', 'getUserContext()', 'triggerEscalation()'],
      concurrencyLimit: 250,
      timeoutSec: 30,
      retryLimit: 2,
      health: { availability: 99.98, errorRate: 0.05, latencyMs: 380, toolFailureRate: 0.1, escalationRate: 1.5, resolutionRate: 98.2, currentLoad: 14 },
      lifecycle: 'ACTIVE',
      environment: 'PRODUCTION',
      lastUpdated: '2026-08-12 10:30:15'
    },
    {
      id: 'AI-QUERY-COORD-001',
      name: 'Query Coordinator',
      type: 'DEPARTMENT_COORDINATOR',
      dept: 'Query',
      owner: 'Query Team Lead',
      status: 'AVAILABLE',
      version: 'v1.0.1',
      risk: 'MEDIUM',
      purpose: 'Receives Query Department requests and dispatches them to specialized support agents.',
      responsibilities: ['Analyze incoming query text', 'Categorize query intent', 'Identify target specialist agent', 'Monitor specialist agent availability'],
      capabilities: ['query.parse', 'intent.match', 'dispatch.agent'],
      inputs: ['User query', 'User profile details', 'Department scope details'],
      outputs: ['Specialist agent selection', 'Dispatch payload'],
      modelProvider: 'Google Gemini',
      modelName: 'gemini-1.5-flash',
      temperature: 0.2,
      maxTokens: 1024,
      fallbackModel: 'gemini-1.5-pro',
      systemPrompt: 'QUERY-COORD-SYSTEM-v1',
      deptPrompt: 'QUERY-DEPT-v2',
      escalationPrompt: 'COORD-ESC-v1',
      knowledgeAccess: ['Query Routing Guidelines', 'Agent Specialization Registry'],
      toolAccess: ['dispatchToAgent()', 'getAgentStatus()'],
      concurrencyLimit: 150,
      timeoutSec: 20,
      retryLimit: 2,
      health: { availability: 99.95, errorRate: 0.12, latencyMs: 250, toolFailureRate: 0.05, escalationRate: 0.8, resolutionRate: 99.1, currentLoad: 5 },
      lifecycle: 'ACTIVE',
      environment: 'PRODUCTION',
      lastUpdated: '2026-08-11 15:45:00'
    },
    {
      id: 'AI-QUERY-ORDER-001',
      name: 'Order Support Agent',
      type: 'SPECIALIST',
      dept: 'Query',
      owner: 'Query Team Lead',
      status: 'AVAILABLE',
      version: 'v1.0.0',
      risk: 'MEDIUM',
      purpose: 'Resolve authorized customer, vendor, and agent requests related to orders by retrieving relevant order information, applying approved policies, performing permitted actions through backend tools, and escalating requests that require human approval.',
      responsibilities: ['Identify order-related issue', 'Retrieve order details', 'Check order status', 'Check delivery status', 'Check cancellation eligibility', 'Explain approved policies', 'Create permitted support requests', 'Record interaction', 'Escalate restricted actions'],
      capabilities: ['order.read', 'order.status.read', 'order.cancel.request', 'order.support.create', 'delivery.status.read', 'policy.order.read'],
      inputs: ['Conversation history', 'User ID', 'Requester Type', 'Order ID', 'Relevant Knowledge'],
      outputs: ['intent', 'confidence', 'resolution_status', 'response', 'action_required', 'tool_calls', 'escalation_required', 'escalation_reason'],
      modelProvider: 'Google Gemini',
      modelName: 'gemini-1.5-flash',
      temperature: 0.4,
      maxTokens: 1500,
      fallbackModel: 'gemini-1.5-pro',
      systemPrompt: 'ORDER-SUPPORT-SYSTEM-v3',
      deptPrompt: 'QUERY-DEPARTMENT-v2',
      escalationPrompt: 'ESCALATION-v4',
      knowledgeAccess: ['Order FAQ', 'Order SOP', 'Cancellation Policy', 'Delivery Policy', 'Billing & Dispute Policy', 'Membership Policy'],
      toolAccess: ['getOrder()', 'getOrderStatus()', 'getDeliveryStatus()', 'createSupportRequest()'],
      concurrencyLimit: 100,
      timeoutSec: 30,
      retryLimit: 2,
      health: { availability: 99.85, errorRate: 0.45, latencyMs: 820, toolFailureRate: 0.3, escalationRate: 2.1, resolutionRate: 96.5, currentLoad: 28 },
      lifecycle: 'ACTIVE',
      environment: 'PRODUCTION',
      lastUpdated: '2026-08-12 11:15:30'
    },
    {
      id: 'AI-QUERY-BOOKING-001',
      name: 'Booking Support Agent',
      type: 'SPECIALIST',
      dept: 'Query',
      owner: 'Query Team Lead',
      status: 'AVAILABLE',
      version: 'v1.0.0',
      risk: 'MEDIUM',
      purpose: 'Resolve reservations, hotel, cab and travel bookings issues by querying booking records and applying cancellation policies.',
      responsibilities: ['Retrieve booking status', 'Evaluate cancellation penalty', 'Process booking reschedules', 'Escalate manual re-bookings'],
      capabilities: ['booking.read', 'booking.cancel.request', 'booking.reschedule.request'],
      inputs: ['Booking ID', 'User Profile', 'Travel SOPs'],
      outputs: ['Booking status details', 'Cancellation quote response', 'Escalation requirement flag'],
      modelProvider: 'Google Gemini',
      modelName: 'gemini-1.5-flash',
      temperature: 0.3,
      maxTokens: 1024,
      fallbackModel: 'gemini-1.5-pro',
      systemPrompt: 'BOOKING-SUPPORT-SYSTEM-v1',
      deptPrompt: 'QUERY-DEPARTMENT-v2',
      escalationPrompt: 'ESCALATION-v2',
      knowledgeAccess: ['Booking cancellation guide', 'Travel cancellation matrix', 'VIP booking override list'],
      toolAccess: ['getBooking()', 'cancelBooking()', 'rescheduleBooking()'],
      concurrencyLimit: 100,
      timeoutSec: 30,
      retryLimit: 2,
      health: { availability: 99.90, errorRate: 0.22, latencyMs: 650, toolFailureRate: 0.15, escalationRate: 1.2, resolutionRate: 98.4, currentLoad: 18 },
      lifecycle: 'ACTIVE',
      environment: 'PRODUCTION',
      lastUpdated: '2026-08-10 14:20:00'
    },
    {
      id: 'AI-QUERY-SERVICE-001',
      name: 'Service Support Agent',
      type: 'SPECIALIST',
      dept: 'Query',
      owner: 'Query Team Lead',
      status: 'AVAILABLE',
      version: 'v1.0.0',
      risk: 'MEDIUM',
      purpose: 'Manages door-to-door technician visits (AC/fridge repair, washing machine, etc.) and hospital appointment details.',
      responsibilities: ['Fetch technician status', 'Trigger appointment reschedules', 'Record service complaints', 'Escalate technician non-arrival warnings'],
      capabilities: ['service.technician.read', 'service.reschedule', 'service.incident.create'],
      inputs: ['Service ticket ID', 'Technician schedule data', 'Incident rules'],
      outputs: ['Technician ETA details', 'Reschedule confirmation status', 'Escalation flag'],
      modelProvider: 'Google Gemini',
      modelName: 'gemini-1.5-flash',
      temperature: 0.4,
      maxTokens: 1024,
      fallbackModel: 'gemini-1.5-pro',
      systemPrompt: 'SERVICE-SUPPORT-SYSTEM-v1',
      deptPrompt: 'QUERY-DEPARTMENT-v2',
      escalationPrompt: 'ESCALATION-v2',
      knowledgeAccess: ['Technician SLA Rules', 'Door service guidelines', 'Hospital schedule matrix'],
      toolAccess: ['getTechnicianStatus()', 'rescheduleTechnician()', 'createServiceComplaint()'],
      concurrencyLimit: 100,
      timeoutSec: 30,
      retryLimit: 2,
      health: { availability: 99.88, errorRate: 0.52, latencyMs: 780, toolFailureRate: 0.4, escalationRate: 3.1, resolutionRate: 95.8, currentLoad: 22 },
      lifecycle: 'ACTIVE',
      environment: 'PRODUCTION',
      lastUpdated: '2026-08-09 09:12:00'
    },
    {
      id: 'AI-QUERY-MEMBERSHIP-001',
      name: 'Membership Support Agent',
      type: 'SPECIALIST',
      dept: 'Query',
      owner: 'Query Team Lead',
      status: 'AVAILABLE',
      version: 'v1.0.0',
      risk: 'MEDIUM',
      purpose: 'Audits and answers queries regarding premium membership benefits, expiry dates, and upgrades.',
      responsibilities: ['Check membership status', 'Detail premium tier perks', 'Escalate payment-failure disputes'],
      capabilities: ['membership.read', 'membership.tier.explain'],
      inputs: ['User identity key', 'Membership database record'],
      outputs: ['Membership status display', 'Upgrade links'],
      modelProvider: 'Google Gemini',
      modelName: 'gemini-1.5-flash',
      temperature: 0.2,
      maxTokens: 1024,
      fallbackModel: 'gemini-1.5-pro',
      systemPrompt: 'MEMBERSHIP-SUPPORT-v1',
      deptPrompt: 'QUERY-DEPARTMENT-v2',
      escalationPrompt: 'ESCALATION-v1',
      knowledgeAccess: ['Premium membership rules', 'Referral cashbacks FAQ'],
      toolAccess: ['getMembershipRecord()'],
      concurrencyLimit: 80,
      timeoutSec: 30,
      retryLimit: 2,
      health: { availability: 99.98, errorRate: 0.02, latencyMs: 310, toolFailureRate: 0.0, escalationRate: 0.1, resolutionRate: 99.8, currentLoad: 2 },
      lifecycle: 'ACTIVE',
      environment: 'PRODUCTION',
      lastUpdated: '2026-08-08 17:30:00'
    },
    {
      id: 'AI-QUERY-GENERAL-001',
      name: 'General Support Agent',
      type: 'SPECIALIST',
      dept: 'Query',
      owner: 'Query Team Lead',
      status: 'AVAILABLE',
      version: 'v1.0.0',
      risk: 'LOW',
      purpose: 'Handles miscellaneous customer queries and update requests.',
      responsibilities: ['Change phone/email records', 'Explain platform FAQs', 'Escalate complex requests'],
      capabilities: ['user.profile.update', 'faq.lookup'],
      inputs: ['User profile key', 'FAQ query text'],
      outputs: ['Updated field status', 'FAQ text response'],
      modelProvider: 'Google Gemini',
      modelName: 'gemini-1.5-flash',
      temperature: 0.5,
      maxTokens: 1024,
      fallbackModel: 'gemini-1.5-flash',
      systemPrompt: 'GENERAL-SUPPORT-v1',
      deptPrompt: 'QUERY-DEPARTMENT-v2',
      escalationPrompt: 'ESCALATION-v1',
      knowledgeAccess: ['Platform FAQs', 'Contact update guidelines'],
      toolAccess: ['updateProfileField()', 'lookupFaq()'],
      concurrencyLimit: 120,
      timeoutSec: 30,
      retryLimit: 2,
      health: { availability: 99.97, errorRate: 0.15, latencyMs: 410, toolFailureRate: 0.05, escalationRate: 0.5, resolutionRate: 99.2, currentLoad: 12 },
      lifecycle: 'ACTIVE',
      environment: 'PRODUCTION',
      lastUpdated: '2026-08-07 11:00:00'
    },
    {
      id: 'AI-KYC-COORD-001',
      name: 'KYC Coordinator',
      type: 'DEPARTMENT_COORDINATOR',
      dept: 'KYC',
      owner: 'KYC Team Lead',
      status: 'AVAILABLE',
      version: 'v1.1.0',
      risk: 'HIGH',
      purpose: 'Orchestrates the KYC application pipeline. Decides document routing, approval sequences, and compliance validations.',
      responsibilities: ['Link KYC application status', 'Determine next quality/verification step', 'Route doc anomalies to TL approval'],
      capabilities: ['kyc.pipeline.route', 'kyc.status.update'],
      inputs: ['Application ID', 'Verification checklist', 'Compliance alerts'],
      outputs: ['Next processing node', 'Pipeline alert logs'],
      modelProvider: 'Google Gemini',
      modelName: 'gemini-1.5-pro',
      temperature: 0.1,
      maxTokens: 1024,
      fallbackModel: 'gemini-1.5-flash',
      systemPrompt: 'KYC-COORD-SYSTEM-v1',
      deptPrompt: 'KYC-DEPT-v2',
      escalationPrompt: 'KYC-ESC-v1',
      knowledgeAccess: ['KYC regulatory rules', 'Vendor compliance guidelines'],
      toolAccess: ['updateKycPipeline()', 'routeToKycAgent()'],
      concurrencyLimit: 150,
      timeoutSec: 30,
      retryLimit: 2,
      health: { availability: 99.96, errorRate: 0.08, latencyMs: 340, toolFailureRate: 0.1, escalationRate: 1.1, resolutionRate: 98.5, currentLoad: 7 },
      lifecycle: 'ACTIVE',
      environment: 'PRODUCTION',
      lastUpdated: '2026-08-11 11:22:10'
    },
    {
      id: 'AI-KYC-COLLECT-001',
      name: 'Document Collection Agent',
      type: 'SPECIALIST',
      dept: 'KYC',
      owner: 'KYC Team Lead',
      status: 'AVAILABLE',
      version: 'v1.0.0',
      risk: 'MEDIUM',
      purpose: 'Manages document checklist retrieval and links direct uploads.',
      responsibilities: ['Retrieve document upload slots', 'Collect registration doc files', 'Validate receipt timestamps'],
      capabilities: ['kyc.docs.collect', 'kyc.docs.list'],
      inputs: ['Applicant ID', 'KYC category rules'],
      outputs: ['Document list schema', 'Quality validation queues'],
      modelProvider: 'Google Gemini',
      modelName: 'gemini-1.5-flash',
      temperature: 0.2,
      maxTokens: 1024,
      fallbackModel: 'gemini-1.5-flash',
      systemPrompt: 'KYC-COLLECT-v1',
      deptPrompt: 'KYC-DEPT-v2',
      escalationPrompt: 'ESCALATION-v1',
      knowledgeAccess: ['KYC document specifications', 'Vendor onboarding guide'],
      toolAccess: ['listApplicantDocs()', 'queueDocForQualityCheck()'],
      concurrencyLimit: 100,
      timeoutSec: 30,
      retryLimit: 2,
      health: { availability: 99.92, errorRate: 0.18, latencyMs: 290, toolFailureRate: 0.08, escalationRate: 0.5, resolutionRate: 99.4, currentLoad: 4 },
      lifecycle: 'ACTIVE',
      environment: 'PRODUCTION',
      lastUpdated: '2026-08-06 13:40:15'
    },
    {
      id: 'AI-KYC-QUALITY-001',
      name: 'Document Quality Agent',
      type: 'SPECIALIST',
      dept: 'KYC',
      owner: 'KYC Team Lead',
      status: 'AVAILABLE',
      version: 'v1.0.0',
      risk: 'CRITICAL',
      purpose: 'Evaluate uploaded KYC documents for readability, completeness and required quality criteria.',
      responsibilities: ['Analyze document resolution', 'Verify text readability', 'Trigger reupload if blur detected', 'Route clear documents to verification'],
      capabilities: ['document.read', 'document.metadata.read', 'kyc.application.update', 'notification.send'],
      inputs: ['Document file', 'Document Type', 'Applicant ID', 'KYC Application ID', 'Required Document Rules'],
      outputs: ['QUALITY_OK', 'BLUR', 'INCOMPLETE', 'UNREADABLE', 'WRONG_DOCUMENT', 'REUPLOAD_REQUIRED'],
      modelProvider: 'Google Gemini',
      modelName: 'gemini-1.5-pro',
      temperature: 0.1,
      maxTokens: 1024,
      fallbackModel: 'gemini-1.5-flash',
      systemPrompt: 'KYC-QUALITY-SYSTEM-v1',
      deptPrompt: 'KYC-DEPT-v2',
      escalationPrompt: 'ESCALATION-v2',
      knowledgeAccess: ['KYC Guidelines', 'Document Requirements', 'KYC SOP'],
      toolAccess: ['readDocMetadata()', 'updateKycStatus()', 'sendNotificationLink()'],
      concurrencyLimit: 120,
      timeoutSec: 30,
      retryLimit: 2,
      health: { availability: 99.91, errorRate: 0.28, latencyMs: 520, toolFailureRate: 0.18, escalationRate: 1.5, resolutionRate: 98.1, currentLoad: 15 },
      lifecycle: 'ACTIVE',
      environment: 'PRODUCTION',
      lastUpdated: '2026-08-12 14:52:12'
    },
    {
      id: 'AI-KYC-DOCVERIFY-001',
      name: 'Document Verification Agent',
      type: 'SPECIALIST',
      dept: 'KYC',
      owner: 'KYC Team Lead',
      status: 'AVAILABLE',
      version: 'v1.0.0',
      risk: 'HIGH',
      purpose: 'Cross-checks uploaded documents against institutional APIs, databases, and structural requirements.',
      responsibilities: ['Validate PAN/Aadhaar/GSTIN digits', 'Cross-match OCR text against registry databases', 'Mark discrepancy flag logs'],
      capabilities: ['kyc.docs.validate', 'ocr.text.match'],
      inputs: ['Document OCR text', 'Government Database Keys'],
      outputs: ['Document validity status', 'Mismatch details list'],
      modelProvider: 'Google Gemini',
      modelName: 'gemini-1.5-pro',
      temperature: 0.1,
      maxTokens: 1024,
      fallbackModel: 'gemini-1.5-flash',
      systemPrompt: 'KYC-DOCVERIFY-v1',
      deptPrompt: 'KYC-DEPT-v2',
      escalationPrompt: 'ESCALATION-v3',
      knowledgeAccess: ['Govt database API list', 'Discrepancy tolerance guide'],
      toolAccess: ['verifyGovtRegistry()', 'flagDiscrepancy()'],
      concurrencyLimit: 80,
      timeoutSec: 30,
      retryLimit: 2,
      health: { availability: 99.85, errorRate: 0.32, latencyMs: 840, toolFailureRate: 0.25, escalationRate: 1.9, resolutionRate: 97.8, currentLoad: 12 },
      lifecycle: 'ACTIVE',
      environment: 'PRODUCTION',
      lastUpdated: '2026-08-11 16:30:00'
    },
    {
      id: 'AI-KYC-IDENTITY-001',
      name: 'Identity Verification Agent',
      type: 'SPECIALIST',
      dept: 'KYC',
      owner: 'KYC Team Lead',
      status: 'AVAILABLE',
      version: 'v1.0.0',
      risk: 'HIGH',
      purpose: 'Handles portrait face match, neural fraud validation, and biometric similarity checking.',
      responsibilities: ['Compare live portrait vs ID photo', 'Flag biometric mismatch anomalies', 'Check face liveness metrics'],
      capabilities: ['biometric.face.match', 'liveness.check'],
      inputs: ['Live photo file', 'ID document portrait file'],
      outputs: ['Face similarity score', 'Liveness verification status'],
      modelProvider: 'Google Gemini',
      modelName: 'gemini-1.5-pro',
      temperature: 0.2,
      maxTokens: 1024,
      fallbackModel: 'gemini-1.5-flash',
      systemPrompt: 'KYC-IDENTITY-v1',
      deptPrompt: 'KYC-DEPT-v2',
      escalationPrompt: 'ESCALATION-v3',
      knowledgeAccess: ['Biometric threshold guide', 'Facial fraud SOP'],
      toolAccess: ['calculateFaceMatchScore()', 'checkLivenessIndicators()'],
      concurrencyLimit: 80,
      timeoutSec: 30,
      retryLimit: 2,
      health: { availability: 99.89, errorRate: 0.21, latencyMs: 760, toolFailureRate: 0.12, escalationRate: 1.2, resolutionRate: 98.5, currentLoad: 8 },
      lifecycle: 'ACTIVE',
      environment: 'PRODUCTION',
      lastUpdated: '2026-08-05 10:11:00'
    },
    {
      id: 'AI-KYC-VENDOR-001',
      name: 'Vendor Verification Agent',
      type: 'SPECIALIST',
      dept: 'KYC',
      owner: 'KYC Team Lead',
      status: 'AVAILABLE',
      version: 'v1.0.0',
      risk: 'HIGH',
      purpose: 'Validates business registration, GST details, trade certificates, and agency referral linkages.',
      responsibilities: ['Validate business GST numbers', 'Verify company trade licenses', 'Link agent referral code audits'],
      capabilities: ['business.gst.check', 'referral.code.audit'],
      inputs: ['Business certificate files', 'Referral ID key'],
      outputs: ['GST status verify', 'Referral eligibility link'],
      modelProvider: 'Google Gemini',
      modelName: 'gemini-1.5-pro',
      temperature: 0.1,
      maxTokens: 1024,
      fallbackModel: 'gemini-1.5-flash',
      systemPrompt: 'KYC-VENDOR-v1',
      deptPrompt: 'KYC-DEPT-v2',
      escalationPrompt: 'ESCALATION-v2',
      knowledgeAccess: ['Corporate compliance codes', 'GSTIN verification guidelines'],
      toolAccess: ['checkGstStatus()', 'validateReferralLink()'],
      concurrencyLimit: 80,
      timeoutSec: 30,
      retryLimit: 2,
      health: { availability: 99.91, errorRate: 0.15, latencyMs: 620, toolFailureRate: 0.1, escalationRate: 0.9, resolutionRate: 99.0, currentLoad: 3 },
      lifecycle: 'ACTIVE',
      environment: 'PRODUCTION',
      lastUpdated: '2026-08-04 14:15:30'
    },
    {
      id: 'AI-KYC-DECISION-001',
      name: 'KYC Decision Agent',
      type: 'SPECIALIST',
      dept: 'KYC',
      owner: 'KYC Team Lead',
      status: 'AVAILABLE',
      version: 'v1.0.1',
      risk: 'CRITICAL',
      purpose: 'Synthesizes verification details to output the final status (APPROVED, REJECTED, REUPLOAD_REQUIRED).',
      responsibilities: ['Synthesize multi-agent KYC verifications', 'Output APPROVED/REJECTED/REUPLOAD decision status', 'Log onboarding compliance summaries'],
      capabilities: ['kyc.decision.make', 'kyc.compliance.log'],
      inputs: ['Doc quality logs', 'Identity match scores', 'GST validation logs'],
      outputs: ['Final KYC decision (APPROVED/REJECTED)', 'Compliance audit logs'],
      modelProvider: 'Google Gemini',
      modelName: 'gemini-1.5-pro',
      temperature: 0.1,
      maxTokens: 1024,
      fallbackModel: 'gemini-1.5-pro',
      systemPrompt: 'KYC-DECISION-v2',
      deptPrompt: 'KYC-DEPT-v2',
      escalationPrompt: 'ESCALATION-v4',
      knowledgeAccess: ['Compliance final guidelines', 'Discretionary onboarding tolerance rules'],
      toolAccess: ['finalizeKycDecision()', 'writeComplianceLog()'],
      concurrencyLimit: 100,
      timeoutSec: 30,
      retryLimit: 2,
      health: { availability: 99.98, errorRate: 0.01, latencyMs: 420, toolFailureRate: 0.05, escalationRate: 0.2, resolutionRate: 99.8, currentLoad: 1 },
      lifecycle: 'ACTIVE',
      environment: 'PRODUCTION',
      lastUpdated: '2026-08-12 16:30:00'
    },
    {
      id: 'AI-PAY-COORD-001',
      name: 'Payment Coordinator',
      type: 'DEPARTMENT_COORDINATOR',
      dept: 'Payment',
      owner: 'Payment Team Lead',
      status: 'AVAILABLE',
      version: 'v1.0.0',
      risk: 'HIGH',
      purpose: 'Handles financial operations. Links registration payments, withdrawals, and wallet disbursements.',
      responsibilities: ['Track outstanding payment links', 'Link registration fees vs withdrawals', 'Monitor payout system constraints'],
      capabilities: ['payment.pipeline.route', 'payment.status.query'],
      inputs: ['Onboarding applicant ledger', 'Payout request database'],
      outputs: ['Payment specialist routing code', 'Wallet database queue ID'],
      modelProvider: 'Google Gemini',
      modelName: 'gemini-1.5-pro',
      temperature: 0.1,
      maxTokens: 1024,
      fallbackModel: 'gemini-1.5-flash',
      systemPrompt: 'PAY-COORD-v1',
      deptPrompt: 'PAYMENT-DEPT-v1',
      escalationPrompt: 'PAY-ESC-v1',
      knowledgeAccess: ['Corporate billing matrices', 'Platform commission rules'],
      toolAccess: ['routePaymentRequest()', 'queryWalletStatus()'],
      concurrencyLimit: 150,
      timeoutSec: 30,
      retryLimit: 2,
      health: { availability: 99.97, errorRate: 0.06, latencyMs: 290, toolFailureRate: 0.05, escalationRate: 0.5, resolutionRate: 99.3, currentLoad: 2 },
      lifecycle: 'ACTIVE',
      environment: 'PRODUCTION',
      lastUpdated: '2026-08-03 11:20:00'
    },
    {
      id: 'AI-PAY-VERIFY-001',
      name: 'Payment Verification Agent',
      type: 'SPECIALIST',
      dept: 'Payment',
      owner: 'Payment Team Lead',
      status: 'AVAILABLE',
      version: 'v1.0.0',
      risk: 'HIGH',
      purpose: 'Queries payment gateways (Razorpay, Stripe, UPI) to verify successful transactions.',
      responsibilities: ['Check gateway transaction ID status', 'Confirm transaction timestamp matches ledger', 'Update registration fee state to successful'],
      capabilities: ['gateway.transaction.check', 'ledger.status.update'],
      inputs: ['Transaction reference key', 'Gateway webhooks status'],
      outputs: ['TRANSACTION_SUCCESS', 'TRANSACTION_FAILED', 'TRANSACTION_NOT_FOUND', 'TRANSACTION_PENDING'],
      modelProvider: 'Google Gemini',
      modelName: 'gemini-1.5-pro',
      temperature: 0.1,
      maxTokens: 1024,
      fallbackModel: 'gemini-1.5-flash',
      systemPrompt: 'PAY-VERIFY-v1',
      deptPrompt: 'PAYMENT-DEPT-v1',
      escalationPrompt: 'ESCALATION-v3',
      knowledgeAccess: ['Payment gateway error codes SOP', 'Direct transaction verification limits'],
      toolAccess: ['queryGatewayTransaction()', 'updateLedgerState()'],
      concurrencyLimit: 100,
      timeoutSec: 30,
      retryLimit: 2,
      health: { availability: 99.92, errorRate: 0.15, latencyMs: 550, toolFailureRate: 0.1, escalationRate: 1.0, resolutionRate: 99.0, currentLoad: 14 },
      lifecycle: 'ACTIVE',
      environment: 'PRODUCTION',
      lastUpdated: '2026-08-02 12:12:00'
    },
    {
      id: 'AI-PAY-REMINDER-001',
      name: 'Payment Reminder Agent',
      type: 'SPECIALIST',
      dept: 'Payment',
      owner: 'Payment Team Lead',
      status: 'AVAILABLE',
      version: 'v1.0.0',
      risk: 'MEDIUM',
      purpose: 'Monitors renewal timelines and triggers SMS/WhatsApp alerts for outstanding registration payments.',
      responsibilities: ['Monitor pending billing accounts', 'Initiate WhatsApp billing notifications', 'Schedule payment alert retries'],
      capabilities: ['billing.monitoring', 'alert.schedule'],
      inputs: ['Outstanding registration ledger', 'Notification rules'],
      outputs: ['WhatsApp alert payload', 'Scheduled alert state update'],
      modelProvider: 'Google Gemini',
      modelName: 'gemini-1.5-flash',
      temperature: 0.5,
      maxTokens: 1024,
      fallbackModel: 'gemini-1.5-flash',
      systemPrompt: 'PAY-REMINDER-v1',
      deptPrompt: 'PAYMENT-DEPT-v1',
      escalationPrompt: 'ESCALATION-v1',
      knowledgeAccess: ['Renewal timeline rules', 'Communication templates library'],
      toolAccess: ['listPendingRegistrations()', 'sendBillingAlert()'],
      concurrencyLimit: 100,
      timeoutSec: 30,
      retryLimit: 2,
      health: { availability: 99.95, errorRate: 0.1, latencyMs: 310, toolFailureRate: 0.05, escalationRate: 0.2, resolutionRate: 99.7, currentLoad: 5 },
      lifecycle: 'ACTIVE',
      environment: 'PRODUCTION',
      lastUpdated: '2026-08-01 15:45:00'
    },
    {
      id: 'AI-PAY-RECEIPT-001',
      name: 'Receipt Agent',
      type: 'SPECIALIST',
      dept: 'Payment',
      owner: 'Payment Team Lead',
      status: 'AVAILABLE',
      version: 'v1.0.0',
      risk: 'MEDIUM',
      purpose: 'Generates automated tax invoices, PDF receipts, and distributes transaction confirmations.',
      responsibilities: ['Generate digital tax PDF receipt', 'Verify correct GST tax calculations', 'Initiate transactional email receipt dispatch'],
      capabilities: ['receipt.pdf.generate', 'tax.gst.calculate'],
      inputs: ['Payment record details', 'Company tax profile'],
      outputs: ['Receipt PDF file key', 'Receipt email send status'],
      modelProvider: 'Google Gemini',
      modelName: 'gemini-1.5-flash',
      temperature: 0.2,
      maxTokens: 1024,
      fallbackModel: 'gemini-1.5-flash',
      systemPrompt: 'PAY-RECEIPT-v1',
      deptPrompt: 'PAYMENT-DEPT-v1',
      escalationPrompt: 'ESCALATION-v1',
      knowledgeAccess: ['GST regulatory tax codes', 'Receipt formatting library'],
      toolAccess: ['generateReceiptPdf()', 'triggerReceiptEmail()'],
      concurrencyLimit: 120,
      timeoutSec: 30,
      retryLimit: 2,
      health: { availability: 99.98, errorRate: 0.02, latencyMs: 410, toolFailureRate: 0.0, escalationRate: 0.1, resolutionRate: 99.8, currentLoad: 2 },
      lifecycle: 'ACTIVE',
      environment: 'PRODUCTION',
      lastUpdated: '2026-07-30 08:30:12'
    },
    {
      id: 'AI-PAY-COMMISSION-001',
      name: 'Commission Agent',
      type: 'SPECIALIST',
      dept: 'Payment',
      owner: 'Payment Team Lead',
      status: 'AVAILABLE',
      version: 'v1.0.0',
      risk: 'HIGH',
      purpose: 'Calculates direct and referral vendor commission distributions based on partner agreements.',
      responsibilities: ['Analyze referral onboarding codes', 'Apply partner commission percentages (e.g. 10%)', 'Write direct & referral commission to wallets'],
      capabilities: ['referral.code.audit', 'commission.ledger.update'],
      inputs: ['Referrer key details', 'Onboarding fees record'],
      outputs: ['Referrer wallet credit status', 'Platform direct profit split'],
      modelProvider: 'Google Gemini',
      modelName: 'gemini-1.5-pro',
      temperature: 0.1,
      maxTokens: 1024,
      fallbackModel: 'gemini-1.5-pro',
      systemPrompt: 'PAY-COMM-v1',
      deptPrompt: 'PAYMENT-DEPT-v1',
      escalationPrompt: 'ESCALATION-v3',
      knowledgeAccess: ['Partner agreement commissions SOP', 'Wallet ledger auditing requirements'],
      toolAccess: ['creditReferrerWallet()', 'recordPlatformDirectProfit()'],
      concurrencyLimit: 80,
      timeoutSec: 30,
      retryLimit: 2,
      health: { availability: 99.96, errorRate: 0.05, latencyMs: 450, toolFailureRate: 0.08, escalationRate: 0.6, resolutionRate: 99.3, currentLoad: 4 },
      lifecycle: 'ACTIVE',
      environment: 'PRODUCTION',
      lastUpdated: '2026-07-29 11:45:00'
    },
    {
      id: 'AI-PAY-WITHDRAWAL-001',
      name: 'Withdrawal Agent',
      type: 'SPECIALIST',
      dept: 'Payment',
      owner: 'Payment Team Lead',
      status: 'AVAILABLE',
      version: 'v1.0.0',
      risk: 'CRITICAL',
      purpose: 'Validates bank account linked status and coordinates withdrawal request transfers.',
      responsibilities: ['Validate linked beneficiary credentials', 'Submit withdrawal transfer request to banking gateway', 'Monitor payout limit rules (e.g. $1000 threshold)'],
      capabilities: ['bank.link.check', 'withdrawal.transfer.submit'],
      inputs: ['Partner beneficiary profile', 'Withdrawal value details'],
      outputs: ['Bank validation status', 'Gateway transfer response details'],
      modelProvider: 'Google Gemini',
      modelName: 'gemini-1.5-pro',
      temperature: 0.1,
      maxTokens: 1024,
      fallbackModel: 'gemini-1.5-pro',
      systemPrompt: 'PAY-WITHDRAWAL-v1',
      deptPrompt: 'PAYMENT-DEPT-v1',
      escalationPrompt: 'ESCALATION-v4',
      knowledgeAccess: ['Banking validation guidelines', 'Risk payout safety thresholds'],
      toolAccess: ['checkBeneficiaryBankLink()', 'submitGatewayPayout()'],
      concurrencyLimit: 80,
      timeoutSec: 30,
      retryLimit: 2,
      health: { availability: 99.98, errorRate: 0.02, latencyMs: 510, toolFailureRate: 0.05, escalationRate: 0.8, resolutionRate: 99.7, currentLoad: 1 },
      lifecycle: 'ACTIVE',
      environment: 'PRODUCTION',
      lastUpdated: '2026-07-28 12:10:05'
    },
    {
      id: 'AI-SHARED-CALL-001',
      name: 'Calling Agent',
      type: 'SHARED_SERVICE',
      dept: 'Shared',
      owner: 'Admin',
      status: 'AVAILABLE',
      version: 'v1.1.2',
      risk: 'HIGH',
      purpose: 'Voice communication channel engine. Handles outbound telephony via Twilio/Exotel, speech-to-text, and summaries.',
      responsibilities: ['Initiate outbound audio dialing via Exotel/Twilio API', 'Stream incoming user audio to speech-to-text', 'Convert text response to outgoing audio stream', 'Summarize voice outcome for caller specialist'],
      capabilities: ['telephony.call.dial', 'audio.speech.transcribe', 'audio.text.synthesize', 'audio.call.summarize'],
      inputs: ['Outbound phone key', 'Calling audio stream', 'Telephony scripts'],
      outputs: ['Speech-to-text transcript', 'Audio voice stream', 'Call summary outcome details'],
      modelProvider: 'Google Gemini',
      modelName: 'gemini-1.5-flash',
      temperature: 0.3,
      maxTokens: 2048,
      fallbackModel: 'gemini-1.5-pro',
      systemPrompt: 'SHARED-CALL-v1',
      deptPrompt: 'SHARED-DEPT-v1',
      escalationPrompt: 'ESCALATION-v2',
      knowledgeAccess: ['Outbound calling guidelines', 'Speech tone requirements library'],
      toolAccess: ['dialTelephonyNumber()', 'convertSpeechToText()', 'synthesizeTextToSpeech()'],
      concurrencyLimit: 100,
      timeoutSec: 45,
      retryLimit: 2,
      health: { availability: 99.82, errorRate: 0.85, latencyMs: 1420, toolFailureRate: 0.6, escalationRate: 4.2, resolutionRate: 94.5, currentLoad: 12 },
      lifecycle: 'ACTIVE',
      environment: 'PRODUCTION',
      lastUpdated: '2026-07-27 10:11:00'
    },
    {
      id: 'AI-SHARED-WHATSAPP-001',
      name: 'WhatsApp Agent',
      type: 'SHARED_SERVICE',
      dept: 'Shared',
      owner: 'Admin',
      status: 'AVAILABLE',
      version: 'v1.0.5',
      risk: 'MEDIUM',
      purpose: 'WhatsApp Business API messenger. Delivers payment links, KYC re-upload triggers, and conversational updates.',
      responsibilities: ['Format WhatsApp template JSON layouts', 'Submit WhatsApp media templates to API', 'Process verified WhatsApp message confirmation'],
      capabilities: ['wa.template.submit', 'wa.message.send'],
      inputs: ['WhatsApp template placeholder text', 'Recipient cell ID'],
      outputs: ['Meta gateway message dispatch response', 'WhatsApp API read confirm status'],
      modelProvider: 'Google Gemini',
      modelName: 'gemini-1.5-flash',
      temperature: 0.4,
      maxTokens: 1024,
      fallbackModel: 'gemini-1.5-flash',
      systemPrompt: 'SHARED-WA-v1',
      deptPrompt: 'SHARED-DEPT-v1',
      escalationPrompt: 'ESCALATION-v1',
      knowledgeAccess: ['Meta template compliance guide', 'Customer chat tone handbook'],
      toolAccess: ['submitMetaTemplateJson()', 'sendMetaDirectMessage()'],
      concurrencyLimit: 200,
      timeoutSec: 30,
      retryLimit: 2,
      health: { availability: 99.96, errorRate: 0.08, latencyMs: 180, toolFailureRate: 0.05, escalationRate: 0.1, resolutionRate: 99.8, currentLoad: 8 },
      lifecycle: 'ACTIVE',
      environment: 'PRODUCTION',
      lastUpdated: '2026-07-26 13:40:15'
    },
    {
      id: 'AI-SHARED-EMAIL-001',
      name: 'Email Agent',
      type: 'SHARED_SERVICE',
      dept: 'Shared',
      owner: 'Admin',
      status: 'AVAILABLE',
      version: 'v1.0.2',
      risk: 'MEDIUM',
      purpose: 'SMTP transactional gateway. Sends account credentials, verification codes, and PDF receipt documents.',
      responsibilities: ['Generate transactional SMTP email headers', 'Attach generated PDF invoices/receipts', 'Validate email delivery address formats'],
      capabilities: ['email.smtp.send', 'email.recipient.validate'],
      inputs: ['Email body text', 'Email attachment PDF files'],
      outputs: ['SMTP gateway server response details', 'Email delivery success status'],
      modelProvider: 'Google Gemini',
      modelName: 'gemini-1.5-flash',
      temperature: 0.2,
      maxTokens: 1024,
      fallbackModel: 'gemini-1.5-flash',
      systemPrompt: 'SHARED-EML-v1',
      deptPrompt: 'SHARED-DEPT-v1',
      escalationPrompt: 'ESCALATION-v1',
      knowledgeAccess: ['SMTP mail requirements', 'Email formatting templates'],
      toolAccess: ['submitSmtpEmail()', 'validateEmailAddressFormat()'],
      concurrencyLimit: 200,
      timeoutSec: 30,
      retryLimit: 2,
      health: { availability: 99.98, errorRate: 0.02, latencyMs: 220, toolFailureRate: 0.0, escalationRate: 0.1, resolutionRate: 99.9, currentLoad: 4 },
      lifecycle: 'ACTIVE',
      environment: 'PRODUCTION',
      lastUpdated: '2026-07-25 10:11:00'
    },
    {
      id: 'AI-SHARED-TRANSLATION-001',
      name: 'Translation Agent',
      type: 'SHARED_SERVICE',
      dept: 'Shared',
      owner: 'Admin',
      status: 'AVAILABLE',
      version: 'v1.0.1',
      risk: 'LOW',
      purpose: 'Automatic language detector. Translates incoming customer messages and outgoing agent resolutions (e.g. Tamil/Hindi).',
      responsibilities: ['Detect incoming customer phrase language', 'Translate incoming phrases to English', 'Translate English responses back to customer language'],
      capabilities: ['language.detect', 'phrase.translate'],
      inputs: ['Raw customer message phrase', 'Source translation library'],
      outputs: ['Detected phrase language (e.g. Tamil)', 'Translated phrase text string'],
      modelProvider: 'Google Gemini',
      modelName: 'gemini-1.5-flash',
      temperature: 0.1,
      maxTokens: 1024,
      fallbackModel: 'gemini-1.5-flash',
      systemPrompt: 'SHARED-TRSL-v1',
      deptPrompt: 'SHARED-DEPT-v1',
      escalationPrompt: 'ESCALATION-v1',
      knowledgeAccess: ['Multilingual vocabulary directories', 'Regional spelling guides'],
      toolAccess: ['detectPhraseLanguage()', 'translatePhraseString()'],
      concurrencyLimit: 150,
      timeoutSec: 20,
      retryLimit: 2,
      health: { availability: 99.97, errorRate: 0.05, latencyMs: 140, toolFailureRate: 0.01, escalationRate: 0.1, resolutionRate: 99.8, currentLoad: 11 },
      lifecycle: 'ACTIVE',
      environment: 'PRODUCTION',
      lastUpdated: '2026-07-24 15:45:00'
    },
    {
      id: 'AI-SHARED-ESCALATION-001',
      name: 'Escalation Agent',
      type: 'CONTROL',
      dept: 'Shared',
      owner: 'Admin',
      status: 'AVAILABLE',
      version: 'v1.3.0',
      risk: 'CRITICAL',
      purpose: 'Governance watchdog. Analyzes agent compliance, tool failure exceptions, anger indices, and coordinates human handoff.',
      responsibilities: ['Evaluate compliance exception triggers', 'Check customer text anger sentiment index (>0.9)', 'Trigger direct human support handoff queues', 'Audit repeated tool-call failures'],
      capabilities: ['compliance.exception.audit', 'sentiment.anger.verify', 'human.handoff.trigger'],
      inputs: ['Specialist run logs', 'Customer conversation context'],
      outputs: ['Handoff queue ID key', 'Escalation audit summary log'],
      modelProvider: 'Google Gemini',
      modelName: 'gemini-1.5-pro',
      temperature: 0.1,
      maxTokens: 1024,
      fallbackModel: 'gemini-1.5-pro',
      systemPrompt: 'SHARED-ESC-v3',
      deptPrompt: 'SHARED-DEPT-v1',
      escalationPrompt: 'ESCALATION-v4',
      knowledgeAccess: ['Escalation queue safety directories', 'Corporate governance handbook'],
      toolAccess: ['checkComplianceTriggers()', 'triggerHumanHandoff()', 'logEscalationEvent()'],
      concurrencyLimit: 100,
      timeoutSec: 30,
      retryLimit: 2,
      health: { availability: 99.98, errorRate: 0.01, latencyMs: 290, toolFailureRate: 0.05, escalationRate: 0.0, resolutionRate: 100.0, currentLoad: 3 },
      lifecycle: 'ACTIVE',
      environment: 'PRODUCTION',
      lastUpdated: '2026-07-23 10:11:00'
    }
  ]);

  // Selected agent for directory drawer details
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>('AI-ORCH-001');

  // Active view panel in AGENT_REGISTRY tab
  const [activePanel, setActivePanel] = useState<'LIST' | 'DETAIL' | 'CREATE'>('LIST');

  // Detail sub-tab selection
  const [detailTab, setDetailTab] = useState<'OVERVIEW' | 'PERMISSIONS' | 'PERFORMANCE' | 'VERSIONING'>('OVERVIEW');

  // Form inputs for new / edited agent
  const [formAgentName, setFormAgentName] = useState('');
  const [formAgentId, setFormAgentId] = useState('');
  const [formAgentType, setFormAgentType] = useState<'ORCHESTRATOR' | 'DEPARTMENT_COORDINATOR' | 'SPECIALIST' | 'SHARED_SERVICE' | 'CONTROL'>('SPECIALIST');
  const [formAgentDept, setFormAgentDept] = useState<'Global' | 'Query' | 'KYC' | 'Payment' | 'Shared'>('Query');
  const [formAgentOwner, setFormAgentOwner] = useState('Query Team Lead');
  const [formAgentPurpose, setFormAgentPurpose] = useState('');
  const [formAgentRisk, setFormAgentRisk] = useState<'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'>('MEDIUM');
  const [formModel, setFormModel] = useState('gemini-1.5-flash');
  const [formFallbackModel, setFormFallbackModel] = useState('gemini-1.5-pro');
  const [formTimeout, setFormTimeout] = useState(30);
  const [formConcurrency, setFormConcurrency] = useState(100);
  const [formRetry, setFormRetry] = useState(2);
  const [formPrompt, setFormPrompt] = useState('v1.0.0-draft');
  const [formEnvironment, setFormEnvironment] = useState<'PRODUCTION' | 'STAGING' | 'DEVELOPMENT'>('DEVELOPMENT');
  const [formResponsibilities, setFormResponsibilities] = useState('');
  const [formCapabilities, setFormCapabilities] = useState('');

  // Sandbox Isolation Checker States
  const [sandboxAgent, setSandboxAgent] = useState('AI-KYC-DECISION-001');
  const [sandboxAction, setSandboxAction] = useState('APPROVE_KYC');
  const [sandboxResult, setSandboxResult] = useState<{ allowed: boolean; reason: string } | null>(null);

  // Departments inner active tab
  const [deptActiveTab, setDeptActiveTab] = useState<'QUERY' | 'KYC' | 'PAYMENT'>('QUERY');

  // Simulator States - Query AI
  const [queryInput, setQueryInput] = useState('AC technician has not arrived for repair booking.');
  const [querySimulationLog, setQuerySimulationLog] = useState<string[]>([]);
  const [isQuerySimulating, setIsQuerySimulating] = useState(false);
  const [simulatedTargetAgent, setSimulatedTargetAgent] = useState('');

  // Simulator States - KYC AI
  const [kycSimType, setKycSimType] = useState<'VENDOR_DIRECT' | 'AGENT_ONBOARDING'>('VENDOR_DIRECT');
  const [kycSimStep, setKycSimStep] = useState(0);
  const [kycSimLogs, setKycSimLogs] = useState<string[]>([]);
  const [kycSimResult, setKycSimResult] = useState('');

  // Directory Tree Toggle States
  const [treeExpanded, setTreeExpanded] = useState({
    orchestrator: true,
    queryDept: true,
    kycDept: true,
    paymentDept: true,
    sharedServices: true
  });

  const [orchestratorDetailsOpen, setOrchestratorDetailsOpen] = useState(false);

  // Filter States - Agent Table
  const [filterDept, setFilterDept] = useState('ALL');
  const [filterType, setFilterType] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterRisk, setFilterRisk] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOperatingStep, setSelectedOperatingStep] = useState<number>(0);

  // Handling Form Submission
  const handleCreateAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formAgentId || !formAgentName) {
      alert('Please fill out both Agent ID and Agent Name.');
      return;
    }

    const newAgent: AgentItem = {
      id: formAgentId,
      name: formAgentName,
      type: formAgentType,
      dept: formAgentDept,
      owner: formAgentOwner,
      status: 'AVAILABLE',
      version: 'v1.0.0',
      risk: formAgentRisk,
      purpose: formAgentPurpose,
      responsibilities: formResponsibilities.split(',').map(s => s.trim()).filter(Boolean),
      capabilities: formCapabilities.split(',').map(s => s.trim()).filter(Boolean),
      inputs: ['Conversation Context', 'Session Metadata'],
      outputs: ['intent', 'resolution_status', 'response'],
      modelProvider: formModel.startsWith('gemini') ? 'Google Gemini' : formModel.startsWith('gpt') ? 'OpenAI' : 'Anthropic',
      modelName: formModel,
      temperature: 0.2,
      maxTokens: 1024,
      fallbackModel: formFallbackModel,
      systemPrompt: `${formAgentId.replace('AI-', '')}-SYSTEM-v1`,
      deptPrompt: `${formAgentDept.toUpperCase()}-DEPT-v1`,
      escalationPrompt: 'ESCALATION-v1',
      knowledgeAccess: [`${formAgentDept} General SOPs`],
      toolAccess: ['generalToolQuery()'],
      concurrencyLimit: formConcurrency,
      timeoutSec: formTimeout,
      retryLimit: formRetry,
      health: { availability: 100.0, errorRate: 0.0, latencyMs: 0, toolFailureRate: 0.0, escalationRate: 0.0, resolutionRate: 100.0, currentLoad: 0 },
      lifecycle: 'DRAFT',
      environment: formEnvironment,
      lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    setAgents(prev => [newAgent, ...prev]);
    setActivePanel('LIST');

    // Reset Form
    setFormAgentId('');
    setFormAgentName('');
    setFormAgentPurpose('');
    setFormResponsibilities('');
    setFormCapabilities('');
  };

  // Triggering simulations
  const handleQuerySimulation = () => {
    if (!queryInput.trim()) return;
    setIsQuerySimulating(true);
    setQuerySimulationLog([]);

    const logs = [
      `[1] Incoming Query: "${queryInput}"`,
      `[2] AI Orchestrator: Capturing customer context...`,
      `[3] AI Orchestrator: Intent detected successfully.`,
      `[4] AI Orchestrator: Routing to QUERY AI DEPARTMENT.`,
      `[5] Query Coordinator: Analyzing query category...`
    ];

    let target = 'AI-QUERY-GENERAL-001';
    const lowerInput = queryInput.toLowerCase();
    if (lowerInput.includes('order') || lowerInput.includes('buy') || lowerInput.includes('delivery') || lowerInput.includes('food') || lowerInput.includes('cancel')) {
      target = 'AI-QUERY-ORDER-001';
      logs.push(`[6] Query Coordinator: Dispatched request to "Order Support Agent" (AI-QUERY-ORDER-001).`);
    } else if (lowerInput.includes('booking') || lowerInput.includes('hotel') || lowerInput.includes('stay') || lowerInput.includes('cab') || lowerInput.includes('trip')) {
      target = 'AI-QUERY-BOOKING-001';
      logs.push(`[6] Query Coordinator: Dispatched request to "Booking Support Agent" (AI-QUERY-BOOKING-001).`);
    } else if (lowerInput.includes('technician') || lowerInput.includes('repair') || lowerInput.includes('appointment') || lowerInput.includes('ac') || lowerInput.includes('fridge')) {
      target = 'AI-QUERY-SERVICE-001';
      logs.push(`[6] Query Coordinator: Dispatched request to "Service Support Agent" (AI-QUERY-SERVICE-001).`);
    } else if (lowerInput.includes('membership') || lowerInput.includes('premium') || lowerInput.includes('benefit')) {
      target = 'AI-QUERY-MEMBERSHIP-001';
      logs.push(`[6] Query Coordinator: Dispatched request to "Membership Support Agent" (AI-QUERY-MEMBERSHIP-001).`);
    } else {
      target = 'AI-QUERY-GENERAL-001';
      logs.push(`[6] Query Coordinator: Dispatched request to "General Support Agent" (AI-QUERY-GENERAL-001).`);
    }

    logs.push(`[7] Dispatch complete. Waiting for specialist agent response...`);

    let currentLogIdx = 0;
    const interval = setInterval(() => {
      if (currentLogIdx < logs.length) {
        setQuerySimulationLog(prev => [...prev, logs[currentLogIdx]]);
        currentLogIdx++;
      } else {
        clearInterval(interval);
        setIsQuerySimulating(false);
        setSimulatedTargetAgent(target);
      }
    }, 450);
  };

  const handleKycStep = () => {
    const steps = [
      { name: '1. Registration Trigger', log: 'Onboarding registration completed. Initializing Document Collection.' },
      { name: '2. Document Quality Check', log: 'Document Quality Agent (AI-KYC-QUALITY-001) checks resolution. Readability: Clear.' },
      { name: '3. Identity Verification', log: 'Identity Verification Agent (AI-KYC-IDENTITY-001) cross-references face-match: 99.4% Match.' },
      { name: '4. Vendor Credentials Audit', log: 'Vendor Verification Agent (AI-KYC-VENDOR-001) validates GSTIN/Trade Registry. Verified.' },
      { name: '5. KYC Decision Engine', log: 'KYC Decision Agent (AI-KYC-DECISION-001) reviews verification signals.' }
    ];

    if (kycSimStep < steps.length) {
      const step = steps[kycSimStep];
      setKycSimLogs(prev => [...prev, `[Step ${kycSimStep + 1}] ${step.name}: ${step.log}`]);
      setKycSimStep(prev => prev + 1);

      if (kycSimStep === steps.length - 1) {
        setKycSimResult('APPROVED');
      }
    }
  };

  const resetKycSimulator = () => {
    setKycSimStep(0);
    setKycSimLogs([]);
    setKycSimResult('');
  };

  const checkSandboxAccess = () => {
    const rules: Record<string, string[]> = {
      'AI-KYC-DECISION-001': ['APPROVE_KYC', 'REJECT_KYC', 'TRIGGER_REUPLOAD', 'READ_KYC_DOCS'],
      'AI-PAY-VERIFY-001': ['VERIFY_TRANSACTION', 'CHECK_LEDGER', 'SEND_RECEIPT_LINK'],
      'AI-QUERY-ORDER-001': ['READ_ORDER_DB', 'CANCEL_ORDER_ITEM', 'UPDATE_CUSTOMER_INFO'],
      'AI-SHARED-CALL-001': ['INITIATE_OUTBOUND_CALL', 'CONVERT_SPEECH_TO_TEXT', 'SUMMARIZE_CALL']
    };

    const allowedActions = rules[sandboxAgent] || [];
    const isAllowed = allowedActions.includes(sandboxAction);
    const agentName = agents.find(a => a.id === sandboxAgent)?.name || sandboxAgent;

    setSandboxResult({
      allowed: isAllowed,
      reason: isAllowed 
        ? `Authorized access. "${sandboxAction}" belongs to the operational boundaries of "${agentName}".`
        : `Access Denied (Department Boundary Violation). "${agentName}" is isolated from executing "${sandboxAction}".`
    });
  };

  // Filtered Agent List
  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          agent.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === 'ALL' || agent.dept.toUpperCase() === filterDept.toUpperCase();
    const matchesType = filterType === 'ALL' || agent.type.toUpperCase() === filterType.toUpperCase();
    const matchesStatus = filterStatus === 'ALL' || agent.status.toUpperCase() === filterStatus.toUpperCase();
    const matchesRisk = filterRisk === 'ALL' || agent.risk.toUpperCase() === filterRisk.toUpperCase();
    return matchesSearch && matchesDept && matchesType && matchesStatus && matchesRisk;
  });

  const selectedAgentDetails = agents.find(a => a.id === selectedAgentId);

  return (
    <div className="main-content" style={{ padding: '1.5rem', minHeight: '100vh' }}>
      
      {/* ====================================================================== */}
      {/* 1. OVERVIEW VIEW */}
      {/* ====================================================================== */}
      {normalizedTab === 'WORKFORCE_OVERVIEW' && (
        <div>
          <HeaderBanner 
            title="AI Workforce Overview" 
            icon={Activity} 
            desc="Directory index tree mapping all active agents, telemetry sensors, and control policies." 
          />

          {/* Quick Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
            <div className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #06b6d4 0%, #3b82f6 100%)', '--kpi-hover-border': '#38bdf8' } as React.CSSProperties}>
              <div className="kpi-card-header">
                <span className="kpi-title-modern">Total AI Agents</span>
                <div className="kpi-icon-box"><Cpu size={16} className="text-cyan" /></div>
              </div>
              <div className="kpi-value-modern">12 Mapped</div>
              <div className="kpi-subbadge-modern">
                <span style={{ color: 'var(--accent-success)' }}>Active: 8</span> • <span style={{ color: 'var(--text-amber)' }}>Busy: 3</span> • <span style={{ color: 'var(--text-muted)' }}>Offline: 1</span>
              </div>
            </div>
            <div className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)', '--kpi-hover-border': '#818cf8' } as React.CSSProperties}>
              <div className="kpi-card-header">
                <span className="kpi-title-modern">Requests Telemetry</span>
                <div className="kpi-icon-box"><Activity size={16} className="text-brand" /></div>
              </div>
              <div className="kpi-value-modern">4,820 <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>today</span></div>
              <div className="kpi-subbadge-modern">
                <span style={{ color: 'var(--accent-success)', fontWeight: 700 }}>AI Resolved: 4,102 (85.1%)</span>
              </div>
            </div>
            <div className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #f43f5e 0%, #e11d48 100%)', '--kpi-hover-border': '#fb7185' } as React.CSSProperties}>
              <div className="kpi-card-header">
                <span className="kpi-title-modern">Escalated Requests</span>
                <div className="kpi-icon-box"><AlertTriangle size={16} className="text-rose" /></div>
              </div>
              <div className="kpi-value-modern">718 <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>cases</span></div>
              <div className="kpi-subbadge-modern">
                <span style={{ color: 'var(--text-muted)' }}>Handoff to VIP support queue</span>
              </div>
            </div>
            <div className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #10b981 0%, #059669 100%)', '--kpi-hover-border': '#34d399' } as React.CSSProperties}>
              <div className="kpi-card-header">
                <span className="kpi-title-modern">Resolution Rate</span>
                <div className="kpi-icon-box"><CheckCircle2 size={16} className="text-emerald" /></div>
              </div>
              <div className="kpi-value-modern">85.1%</div>
              <div className="kpi-subbadge-modern">
                <span style={{ color: 'var(--accent-success)' }}>Target threshold SLA: 80.0%</span>
              </div>
            </div>
          </div>

          {/* AI WORKFORCE OPERATING MODEL (PHASE 0) */}
          <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 900, borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={18} className="text-amber" /> Fundamental AI Operating Model (Phase 0)
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              Every incoming request traverses this standard 13-stage lifecycle. Click any phase node to inspect its architectural purpose and mock context schemas.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem', alignItems: 'start' }}>
              
              {/* Stepper Node List */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.75rem' }}>
                {operatingSteps.map((step, idx) => {
                  const isSelected = selectedOperatingStep === idx;
                  return (
                    <div 
                      key={idx}
                      onClick={() => setSelectedOperatingStep(idx)}
                      style={{ 
                        padding: '0.75rem', 
                        borderRadius: '8px', 
                        border: '1.5px solid', 
                        borderColor: isSelected ? 'var(--accent-secondary)' : 'var(--border-color)',
                        background: isSelected ? 'rgba(247, 181, 0, 0.1)' : 'var(--bg-dark)',
                        cursor: 'pointer',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '80px',
                        transition: 'all 0.2s ease-in-out'
                      }}
                      className="hover-bg"
                    >
                      <div style={{ fontSize: '0.65rem', color: isSelected ? 'var(--text-brand)' : 'var(--text-muted)', fontWeight: 800 }}>STEP {idx + 1}</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, marginTop: '0.25rem', color: isSelected ? 'var(--text-main)' : 'var(--text-primary)' }}>{step.title}</div>
                    </div>
                  );
                })}
              </div>

              {/* Inspector Details */}
              <div style={{ background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.25rem', minHeight: '260px', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                  <Activity size={16} className="text-cyan" />
                  <strong style={{ fontSize: '0.9rem', color: 'var(--text-cyan)' }}>
                    Phase Node: {operatingSteps[selectedOperatingStep].title}
                  </strong>
                </div>

                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 800, marginBottom: '0.25rem' }}>Description</span>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
                    {operatingSteps[selectedOperatingStep].desc}
                  </p>
                </div>

                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 800, marginBottom: '0.25rem' }}>Mock Context Schema</span>
                  <pre style={{ 
                    fontFamily: 'var(--font-mono)', 
                    fontSize: '0.725rem', 
                    background: 'rgba(0,0,0,0.3)', 
                    padding: '0.5rem', 
                    borderRadius: '6px', 
                    border: '1px solid rgba(255,255,255,0.05)',
                    color: 'var(--text-cyan)',
                    margin: 0,
                    whiteSpace: 'pre-wrap',
                    overflowX: 'auto'
                  }}>
                    {operatingSteps[selectedOperatingStep].schema}
                  </pre>
                </div>
              </div>

            </div>
          </div>

          {/* Directory Index Tree Map */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem', alignItems: 'start' }}>
            
            {/* Tree Map Display */}
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 900, borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Network size={18} className="text-amber" /> AI Workforce Directory Tree Map
              </h2>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                
                {/* Orchestrator Node */}
                <div>
                  <div 
                    onClick={() => setTreeExpanded(prev => ({ ...prev, orchestrator: !prev.orchestrator }))}
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 800 }}
                  >
                    {treeExpanded.orchestrator ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    <Cpu size={14} className="text-cyan" /> <span>AI-ORCH-001 [Type: ORCHESTRATOR]</span>
                  </div>

                  {treeExpanded.orchestrator && (
                    <div style={{ marginLeft: '1.5rem', borderLeft: '1px dashed var(--border-color)', paddingLeft: '1rem', marginTop: '0.25rem' }}>
                      
                      {/* Query Department */}
                      <div style={{ marginBottom: '0.5rem' }}>
                        <div 
                          onClick={() => setTreeExpanded(prev => ({ ...prev, queryDept: !prev.queryDept }))}
                          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 700 }}
                        >
                          {treeExpanded.queryDept ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                          <Network size={14} className="text-amber" /> <span>QUERY DEPARTMENT [Type: CO-ORDINATORS]</span>
                        </div>
                        {treeExpanded.queryDept && (
                          <div style={{ marginLeft: '1.25rem', borderLeft: '1px dashed var(--border-color)', paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.25rem' }}>
                            {agents.filter(a => a.dept === 'Query').map((a, idx, arr) => (
                              <div 
                                key={a.id} 
                                onClick={() => setSelectedAgentId(a.id)} 
                                style={{ cursor: 'pointer' }} 
                                className="hover-text-cyan"
                              >
                                {idx === arr.length - 1 ? '└── ' : '├── '} {a.name} ({a.id})
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* KYC Department */}
                      <div style={{ marginBottom: '0.5rem' }}>
                        <div 
                          onClick={() => setTreeExpanded(prev => ({ ...prev, kycDept: !prev.kycDept }))}
                          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 700 }}
                        >
                          {treeExpanded.kycDept ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                          <Network size={14} className="text-amber" /> <span>KYC DEPARTMENT [Type: CO-ORDINATORS]</span>
                        </div>
                        {treeExpanded.kycDept && (
                          <div style={{ marginLeft: '1.25rem', borderLeft: '1px dashed var(--border-color)', paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.25rem' }}>
                            {agents.filter(a => a.dept === 'KYC').map((a, idx, arr) => (
                              <div 
                                key={a.id} 
                                onClick={() => setSelectedAgentId(a.id)} 
                                style={{ cursor: 'pointer' }} 
                                className="hover-text-cyan"
                              >
                                {idx === arr.length - 1 ? '└── ' : '├── '} {a.name} ({a.id})
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Payment Department */}
                      <div style={{ marginBottom: '0.5rem' }}>
                        <div 
                          onClick={() => setTreeExpanded(prev => ({ ...prev, paymentDept: !prev.paymentDept }))}
                          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 700 }}
                        >
                          {treeExpanded.paymentDept ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                          <Network size={14} className="text-amber" /> <span>PAYMENT DEPARTMENT [Type: CO-ORDINATORS]</span>
                        </div>
                        {treeExpanded.paymentDept && (
                          <div style={{ marginLeft: '1.25rem', borderLeft: '1px dashed var(--border-color)', paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.25rem' }}>
                            {agents.filter(a => a.dept === 'Payment').map((a, idx, arr) => (
                              <div 
                                key={a.id} 
                                onClick={() => setSelectedAgentId(a.id)} 
                                style={{ cursor: 'pointer' }} 
                                className="hover-text-cyan"
                              >
                                {idx === arr.length - 1 ? '└── ' : '├── '} {a.name} ({a.id})
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                    </div>
                  )}
                </div>

                {/* Shared Services Node */}
                <div style={{ marginTop: '0.5rem' }}>
                  <div 
                    onClick={() => setTreeExpanded(prev => ({ ...prev, sharedServices: !prev.sharedServices }))}
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 800 }}
                  >
                    {treeExpanded.sharedServices ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    <Sliders size={14} className="text-cyan" /> <span>SHARED AI SERVICES</span>
                  </div>

                  {treeExpanded.sharedServices && (
                    <div style={{ marginLeft: '1.5rem', borderLeft: '1px dashed var(--border-color)', paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.25rem' }}>
                      {agents.filter(a => a.dept === 'Shared').map((a, idx, arr) => (
                        <div 
                          key={a.id} 
                          onClick={() => setSelectedAgentId(a.id)} 
                          style={{ cursor: 'pointer' }} 
                          className="hover-text-cyan"
                        >
                          {idx === arr.length - 1 ? '└── ' : '├── '} {a.name} ({a.id})
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Selected Node Details Side Pane */}
            <div className="glass-panel" style={{ padding: '1.5rem', minHeight: '350px', borderTop: '4px solid var(--accent-secondary)' }}>
              {selectedAgentDetails ? (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <Cpu size={20} className="text-amber" />
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--text-brand)' }}>{selectedAgentDetails.name}</h3>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.85rem' }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Agent ID</span>
                      <strong style={{ fontFamily: 'var(--font-mono)' }}>{selectedAgentDetails.id}</strong>
                    </div>

                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Agent Type</span>
                      <span className="badge badge-info" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
                        {selectedAgentDetails.type}
                      </span>
                    </div>

                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Department</span>
                      <strong>{selectedAgentDetails.dept}</strong>
                    </div>

                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Human Owner</span>
                      <strong>{selectedAgentDetails.owner}</strong>
                    </div>

                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem' }}>
                      <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Agent Purpose</span>
                      <p style={{ color: 'var(--text-main)', fontSize: '0.8rem', lineHeight: '1.35' }}>
                        {selectedAgentDetails.purpose}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)', textAlign: 'center', paddingTop: '4rem' }}>
                  <HelpCircle size={32} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
                  <p>Click any node in the Workforce directory map tree to load its operational definitions.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* 2. AI COMMAND CENTER VIEW */}
      {/* ====================================================================== */}
      {normalizedTab === 'AI_COMMAND_CENTER' && (
        <div>
          <HeaderBanner 
            title="AI Command Center" 
            icon={Zap} 
            desc="Global monitoring metrics, live operational curves, and SLA health indicators." 
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
            <div className="glass-panel" style={{ padding: '1.25rem', borderLeft: '4px solid var(--text-cyan)' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800 }}>AVERAGE LATENCY</span>
              <div style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--text-cyan)', margin: '0.25rem 0' }}>480 ms</div>
              <span style={{ fontSize: '0.7rem', color: 'var(--accent-success)' }}>Uptime Availability: 99.98%</span>
            </div>
            <div className="glass-panel" style={{ padding: '1.25rem', borderLeft: '4px solid var(--text-amber)' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800 }}>ACCUMULATED COST</span>
              <div style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--text-amber)', margin: '0.25rem 0' }}>₹5,850.50</div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Accumulated today</span>
            </div>
            <div className="glass-panel" style={{ padding: '1.25rem', borderLeft: '4px solid var(--accent-success)' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800 }}>INTENT RESOLUTION</span>
              <div style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--accent-success)', margin: '0.25rem 0' }}>98.9%</div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>0.5% failure fallback rate</span>
            </div>
            <div className="glass-panel" style={{ padding: '1.25rem', borderLeft: '4px solid var(--text-rose)' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800 }}>CONCURRENT THREADS</span>
              <div style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--text-rose)', margin: '0.25rem 0' }}>42 / 1000</div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Active execution pools</span>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 900, marginBottom: '1rem' }}>Context Token Usage Curve (Simulated)</h3>
            <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '2%', borderBottom: '1px solid var(--border-color)', borderLeft: '1px solid var(--border-color)', padding: '1rem' }}>
              {[15, 30, 45, 60, 35, 75, 90, 80, 65, 85, 110, 130, 140, 115, 95, 120, 105, 135, 160, 185, 190, 150, 165, 180].map((val, idx) => (
                <div key={idx} style={{ flex: 1, background: 'rgba(56,189,248,0.2)', borderTop: '2px solid var(--text-cyan)', height: `${(val / 200) * 100}%` }}></div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
              <span>00:00 AM</span>
              <span>12:00 PM</span>
              <span>11:00 PM</span>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* 3. AGENT REGISTRY VIEW */}
      {/* ====================================================================== */}
      {(normalizedTab === 'AGENT_REGISTRY' || normalizedTab === 'AI_AGENTS') && (
        <div>
          {/* LIST VIEW */}
          {activePanel === 'LIST' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <HeaderBanner 
                  title="AI Agent Registry" 
                  icon={Cpu} 
                  desc="Complete catalog of all registered AI agents: classifications, owners, and versions." 
                />
                <button 
                  onClick={() => setActivePanel('CREATE')}
                  className="btn btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1rem' }}
                >
                  <Plus size={16} /> Register New Agent
                </button>
              </div>

              {/* Filters Bar */}
              <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ flex: 1, minWidth: '220px' }}>
                  <div style={{ position: 'relative' }}>
                    <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input 
                      type="text" 
                      placeholder="Search registered agents by name or ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ width: '100%', padding: '0.5rem 0.5rem 0.5rem 2.25rem', background: 'var(--bg-dark)', color: 'var(--text-main)', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>

                <div>
                  <select 
                    value={filterDept} 
                    onChange={(e) => setFilterDept(e.target.value)}
                    style={{ padding: '0.5rem', background: 'var(--bg-dark)', color: 'var(--text-main)', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.85rem' }}
                  >
                    <option value="ALL">All Departments</option>
                    <option value="GLOBAL">Global</option>
                    <option value="QUERY">Query Department</option>
                    <option value="KYC">KYC Department</option>
                    <option value="PAYMENT">Payment Department</option>
                    <option value="SHARED">Shared Services</option>
                  </select>
                </div>

                <div>
                  <select 
                    value={filterType} 
                    onChange={(e) => setFilterType(e.target.value)}
                    style={{ padding: '0.5rem', background: 'var(--bg-dark)', color: 'var(--text-main)', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.85rem' }}
                  >
                    <option value="ALL">All Agent Types</option>
                    <option value="ORCHESTRATOR">Orchestrators</option>
                    <option value="DEPARTMENT_COORDINATOR">Coordinators</option>
                    <option value="SPECIALIST">Specialists</option>
                    <option value="SHARED_SERVICE">Shared Services</option>
                    <option value="CONTROL">Controls</option>
                  </select>
                </div>

                <div>
                  <select 
                    value={filterStatus} 
                    onChange={(e) => setFilterStatus(e.target.value)}
                    style={{ padding: '0.5rem', background: 'var(--bg-dark)', color: 'var(--text-main)', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.85rem' }}
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="AVAILABLE">AVAILABLE</option>
                    <option value="BUSY">BUSY</option>
                    <option value="PAUSED">PAUSED</option>
                    <option value="MAINTENANCE">MAINTENANCE</option>
                    <option value="OFFLINE">OFFLINE</option>
                  </select>
                </div>

                <div>
                  <select 
                    value={filterRisk} 
                    onChange={(e) => setFilterRisk(e.target.value)}
                    style={{ padding: '0.5rem', background: 'var(--bg-dark)', color: 'var(--text-main)', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.85rem' }}
                  >
                    <option value="ALL">All Risk Levels</option>
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                    <option value="CRITICAL">CRITICAL</option>
                  </select>
                </div>
              </div>

              {/* Table list */}
              <div className="glass-panel" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-table-header)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.725rem', textTransform: 'uppercase', fontWeight: 800 }}>
                      <th style={{ padding: '0.85rem 1rem' }}>Agent ID</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Name</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Department</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Type</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Human Owner</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Risk Level</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Status</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Version</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAgents.length > 0 ? (
                      filteredAgents.map((agent) => (
                        <tr 
                          key={agent.id} 
                          style={{ borderBottom: '1px solid var(--border-color)', cursor: 'pointer' }} 
                          className="hover-bg" 
                          onClick={() => { setSelectedAgentId(agent.id); setActivePanel('DETAIL'); setDetailTab('OVERVIEW'); }}
                        >
                          <td style={{ padding: '0.85rem 1rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--text-cyan)' }}>{agent.id}</td>
                          <td style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>{agent.name}</td>
                          <td style={{ padding: '0.85rem 1rem' }}>{agent.dept}</td>
                          <td style={{ padding: '0.85rem 1rem' }}>
                            <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem', borderRadius: '4px', background: 'rgba(56, 189, 248, 0.1)', color: 'var(--text-cyan)', fontWeight: 700 }}>
                              {agent.type}
                            </span>
                          </td>
                          <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>{agent.owner}</td>
                          <td style={{ padding: '0.85rem 1rem' }}>
                            <span style={{ 
                              fontSize: '0.7rem', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: 800,
                              background: agent.risk === 'CRITICAL' ? 'rgba(239, 68, 68, 0.15)' : agent.risk === 'HIGH' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                              color: agent.risk === 'CRITICAL' ? 'var(--text-rose)' : agent.risk === 'HIGH' ? 'var(--text-amber)' : 'var(--text-muted)'
                            }}>
                              {agent.risk}
                            </span>
                          </td>
                          <td style={{ padding: '0.85rem 1rem', fontWeight: 800, color: agent.status === 'AVAILABLE' ? 'var(--accent-success)' : 'var(--text-muted)' }}>
                            ● {agent.status}
                          </td>
                          <td style={{ padding: '0.85rem 1rem', fontFamily: 'var(--font-mono)' }}>{agent.version}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                          No registered agents match the current filter criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* DETAIL INSPECTOR VIEW */}
          {activePanel === 'DETAIL' && selectedAgentDetails && (
            <div>
              {/* Profile Header */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                <button 
                  onClick={() => setActivePanel('LIST')}
                  className="btn btn-secondary"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.4rem 0.75rem' }}
                >
                  <ArrowLeft size={16} /> Back to Registry
                </button>
                <div style={{ borderLeft: '1px solid var(--border-color)', height: '24px' }}></div>
                <div>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-brand)' }}>
                    {selectedAgentDetails.name} <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: 'var(--text-cyan)', marginLeft: '0.5rem' }}>({selectedAgentDetails.id})</span>
                  </h2>
                </div>
              </div>

              {/* Inner Tab switching */}
              <div style={{ display: 'flex', gap: '0.35rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1.25rem', overflowX: 'auto' }}>
                {[
                  { id: 'OVERVIEW', label: 'Overview & Scope' },
                  { id: 'PERMISSIONS', label: 'Access Policy & Tools' },
                  { id: 'PERFORMANCE', label: 'Runtime & Health' },
                  { id: 'VERSIONING', label: 'Versioning & Audit Log' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    className={`btn ${detailTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
                    onClick={() => setDetailTab(tab.id as any)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Panel Content */}
              <div className="glass-panel" style={{ padding: '2rem' }}>
                
                {/* OVERVIEW PANEL */}
                {detailTab === 'OVERVIEW' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      <div>
                        <h3 style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--text-brand)', marginBottom: '0.5rem' }}>Agent Purpose</h3>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-main)', lineHeight: '1.4' }}>{selectedAgentDetails.purpose}</p>
                      </div>

                      <div>
                        <h3 style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--text-brand)', marginBottom: '0.5rem' }}>Responsibilities</h3>
                        <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                          {selectedAgentDetails.responsibilities.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--text-brand)', marginBottom: '0.5rem' }}>Input &amp; Output Schema</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.8rem' }}>
                          <div style={{ background: 'var(--bg-dark)', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Allowed Inputs</span>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                              {selectedAgentDetails.inputs.map(input => (
                                <span key={input} style={{ background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>{input}</span>
                              ))}
                            </div>
                          </div>
                          <div style={{ background: 'var(--bg-dark)', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Structured Outputs</span>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                              {selectedAgentDetails.outputs.map(output => (
                                <span key={output} style={{ background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>{output}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Metadata Card */}
                    <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem' }}>
                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Lifecycle State</span>
                        <span className="badge badge-success" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--text-emerald)', fontWeight: 800 }}>
                          ● {selectedAgentDetails.lifecycle}
                        </span>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Risk Level</span>
                        <span style={{ 
                          fontSize: '0.725rem', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: 800,
                          background: selectedAgentDetails.risk === 'CRITICAL' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                          color: selectedAgentDetails.risk === 'CRITICAL' ? 'var(--text-rose)' : 'var(--text-main)'
                        }}>
                          {selectedAgentDetails.risk} RISK
                        </span>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Environment Target</span>
                        <strong style={{ fontFamily: 'var(--font-mono)' }}>{selectedAgentDetails.environment}</strong>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Human Owner</span>
                        <strong>{selectedAgentDetails.owner}</strong>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Last Configuration Sync</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{selectedAgentDetails.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* PERMISSIONS PANEL */}
                {detailTab === 'PERMISSIONS' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    
                    {/* Knowledge base RAG */}
                    <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--text-brand)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <BookOpen size={18} /> Knowledge RAG Access Policy
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {selectedAgentDetails.knowledgeAccess.map((k, i) => (
                          <div key={i} style={{ background: 'var(--bg-dark)', padding: '0.6rem 1rem', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Check size={14} className="text-emerald" /> <span>{k}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tools Allowed */}
                    <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--text-brand)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Wrench size={18} /> Backend Service Tool Allowance
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {selectedAgentDetails.toolAccess.map((t, i) => (
                          <div key={i} style={{ background: 'var(--bg-dark)', padding: '0.6rem 1rem', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                            <Check size={14} className="text-emerald" /> <span>{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {/* RUNTIME & HEALTH PANEL */}
                {detailTab === 'PERFORMANCE' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem' }}>
                    
                    {/* Model config */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      <div>
                        <h3 style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--text-brand)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Cpu size={18} /> Model Configuration
                        </h3>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.85rem' }}>
                          <div style={{ background: 'var(--bg-dark)', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>Model Provider</span>
                            <strong>{selectedAgentDetails.modelProvider}</strong>
                          </div>
                          <div style={{ background: 'var(--bg-dark)', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7', fontFamily: 'var(--font-mono)' }}>Active Model</span>
                            <strong style={{ fontFamily: 'var(--font-mono)' }}>{selectedAgentDetails.modelName}</strong>
                          </div>
                          <div style={{ background: 'var(--bg-dark)', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7' }}>Temperature</span>
                            <strong>{selectedAgentDetails.temperature}</strong>
                          </div>
                          <div style={{ background: 'var(--bg-dark)', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7', fontFamily: 'var(--font-mono)' }}>Fallback Model</span>
                            <strong style={{ fontFamily: 'var(--font-mono)' }}>{selectedAgentDetails.fallbackModel}</strong>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--text-brand)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <AlertTriangle size={18} /> Escalation Rules &amp; Limits
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', fontSize: '0.85rem', marginBottom: '1rem' }}>
                          <div style={{ background: 'var(--bg-dark)', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>Concurrency Limit</span>
                            <strong>{selectedAgentDetails.concurrencyLimit} threads</strong>
                          </div>
                          <div style={{ background: 'var(--bg-dark)', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>Timeout Limit</span>
                            <strong>{selectedAgentDetails.timeoutSec} seconds</strong>
                          </div>
                          <div style={{ background: 'var(--bg-dark)', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>Max Retries</span>
                            <strong>{selectedAgentDetails.retryLimit}</strong>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Health Metrics side */}
                    <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.85rem' }}>
                      <h4 style={{ fontSize: '0.85rem', color: 'var(--text-brand)', textTransform: 'uppercase', letterSpacing: '1px' }}>Workforce Health Sensors</h4>
                      
                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>Uptime Availability</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', height: '6px', borderRadius: '3px' }}>
                            <div style={{ width: `${selectedAgentDetails.health.availability}%`, background: 'var(--accent-success)', height: '6px', borderRadius: '3px' }}></div>
                          </div>
                          <strong>{selectedAgentDetails.health.availability}%</strong>
                        </div>
                      </div>

                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>Resolution Rate</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', height: '6px', borderRadius: '3px' }}>
                            <div style={{ width: `${selectedAgentDetails.health.resolutionRate}%`, background: 'var(--accent-success)', height: '6px', borderRadius: '3px' }}></div>
                          </div>
                          <strong>{selectedAgentDetails.health.resolutionRate}%</strong>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                        <div style={{ background: 'var(--bg-dark)', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.65rem' }}>Latency</span>
                          <strong>{selectedAgentDetails.health.latencyMs} ms</strong>
                        </div>
                        <div style={{ background: 'var(--bg-dark)', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.65rem' }}>Error Rate</span>
                          <strong>{selectedAgentDetails.health.errorRate}%</strong>
                        </div>
                        <div style={{ background: 'var(--bg-dark)', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.65rem' }}>Escalation Rate</span>
                          <strong>{selectedAgentDetails.health.escalationRate}%</strong>
                        </div>
                        <div style={{ background: 'var(--bg-dark)', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.65rem' }}>Current Queue Load</span>
                          <strong>{selectedAgentDetails.health.currentLoad} tasks</strong>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {/* VERSIONING & AUDIT LOG PANEL */}
                {detailTab === 'VERSIONING' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2rem' }}>
                    
                    {/* Version logs */}
                    <div style={{ borderRight: '1px solid var(--border-color)', paddingRight: '2rem' }}>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 900, color: 'var(--text-brand)', marginBottom: '0.75rem' }}>Config Versions</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                        <div style={{ background: 'rgba(247,181,0,0.1)', border: '1px solid var(--accent-secondary)', padding: '0.5rem 0.85rem', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <strong>{selectedAgentDetails.version} (Active)</strong>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-emerald)' }}>● Live</span>
                        </div>
                      </div>
                    </div>

                    {/* Audit Logs */}
                    <div>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 900, color: 'var(--text-brand)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Terminal size={16} /> Configuration Change Logs
                      </h3>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ background: 'var(--bg-dark)', padding: '0.65rem 1rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.65rem' }}>2026-08-12 10:30:15 - Modified by Admin</span>
                          <span>Updated model selection to gemini-1.5-pro. Created config version {selectedAgentDetails.version}.</span>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

              </div>
            </div>
          )}

          {/* CREATE & EDIT FORM VIEW */}
          {activePanel === 'CREATE' && (
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <UserPlus size={20} className="text-amber" /> Register New AI Agent
                </h2>
                <button 
                  onClick={() => setActivePanel('LIST')}
                  className="btn btn-secondary"
                  style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
                >
                  Cancel
                </button>
              </div>

              {/* Edit form */}
              <form onSubmit={handleCreateAgent} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', fontSize: '0.85rem' }}>
                
                {/* Basic Section */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 900, color: 'var(--text-brand)' }}>1. Basic Configurations</h3>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 700 }}>Agent Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Billing Dispute Agent"
                      value={formAgentName}
                      onChange={(e) => setFormAgentName(e.target.value)}
                      style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-dark)', color: 'var(--text-main)', border: '1px solid var(--border-color)', borderRadius: '6px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 700 }}>Agent ID (Unique)</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. AI-QUERY-DISPUTE-001"
                      value={formAgentId}
                      onChange={(e) => setFormAgentId(e.target.value)}
                      style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-dark)', color: 'var(--text-main)', border: '1px solid var(--border-color)', borderRadius: '6px', fontFamily: 'var(--font-mono)' }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 700 }}>Agent Type</label>
                      <select 
                        value={formAgentType} 
                        onChange={(e) => setFormAgentType(e.target.value as any)}
                        style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-dark)', color: 'var(--text-main)', border: '1px solid var(--border-color)', borderRadius: '6px' }}
                      >
                        <option value="ORCHESTRATOR">Orchestrator</option>
                        <option value="DEPARTMENT_COORDINATOR">Coordinator</option>
                        <option value="SPECIALIST">Specialist</option>
                        <option value="SHARED_SERVICE">Shared Service</option>
                        <option value="CONTROL">Control</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 700 }}>Department</label>
                      <select 
                        value={formAgentDept} 
                        onChange={(e) => setFormAgentDept(e.target.value as any)}
                        style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-dark)', color: 'var(--text-main)', border: '1px solid var(--border-color)', borderRadius: '6px' }}
                      >
                        <option value="Global">Global</option>
                        <option value="Query">Query</option>
                        <option value="KYC">KYC</option>
                        <option value="Payment">Payment</option>
                        <option value="Shared">Shared</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 700 }}>Purpose Statement</label>
                    <textarea 
                      required
                      rows={3}
                      placeholder="Define the clear operational purpose for this agent..."
                      value={formAgentPurpose}
                      onChange={(e) => setFormAgentPurpose(e.target.value)}
                      style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-dark)', color: 'var(--text-main)', border: '1px solid var(--border-color)', borderRadius: '6px', fontFamily: 'inherit', resize: 'none' }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 700 }}>Human Owner</label>
                      <input 
                        type="text" 
                        value={formAgentOwner}
                        onChange={(e) => setFormAgentOwner(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-dark)', color: 'var(--text-main)', border: '1px solid var(--border-color)', borderRadius: '6px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 700 }}>Risk Class</label>
                      <select 
                        value={formAgentRisk} 
                        onChange={(e) => setFormAgentRisk(e.target.value as any)}
                        style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-dark)', color: 'var(--text-main)', border: '1px solid var(--border-color)', borderRadius: '6px' }}
                      >
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                        <option value="CRITICAL">Critical</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Runtime Section */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 900, color: 'var(--text-brand)' }}>2. Runtime &amp; Safety Governance</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 700 }}>Model Selection</label>
                      <select 
                        value={formModel} 
                        onChange={(e) => setFormModel(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-dark)', color: 'var(--text-main)', border: '1px solid var(--border-color)', borderRadius: '6px' }}
                      >
                        <option value="gemini-1.5-flash">gemini-1.5-flash</option>
                        <option value="gemini-1.5-pro">gemini-1.5-pro</option>
                        <option value="gpt-4o">gpt-4o</option>
                        <option value="claude-3.5-sonnet">claude-3.5-sonnet</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 700 }}>Fallback Model</label>
                      <select 
                        value={formFallbackModel} 
                        onChange={(e) => setFormFallbackModel(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-dark)', color: 'var(--text-main)', border: '1px solid var(--border-color)', borderRadius: '6px' }}
                      >
                        <option value="gemini-1.5-pro">gemini-1.5-pro</option>
                        <option value="gemini-1.5-flash">gemini-1.5-flash</option>
                        <option value="gpt-4o">gpt-4o</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 700 }}>Timeout (sec)</label>
                      <input 
                        type="number" 
                        value={formTimeout}
                        onChange={(e) => setFormTimeout(Number(e.target.value))}
                        style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-dark)', color: 'var(--text-main)', border: '1px solid var(--border-color)', borderRadius: '6px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 700 }}>Concurrency</label>
                      <input 
                        type="number" 
                        value={formConcurrency}
                        onChange={(e) => setFormConcurrency(Number(e.target.value))}
                        style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-dark)', color: 'var(--text-main)', border: '1px solid var(--border-color)', borderRadius: '6px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 700 }}>Retries</label>
                      <input 
                        type="number" 
                        value={formRetry}
                        onChange={(e) => setFormRetry(Number(e.target.value))}
                        style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-dark)', color: 'var(--text-main)', border: '1px solid var(--border-color)', borderRadius: '6px' }}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 700 }}>Responsibilities (comma separated)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Audit transactions, Calculate splits"
                      value={formResponsibilities}
                      onChange={(e) => setFormResponsibilities(e.target.value)}
                      style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-dark)', color: 'var(--text-main)', border: '1px solid var(--border-color)', borderRadius: '6px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 700 }}>Capabilities (comma separated)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. payment.read, ledger.update"
                      value={formCapabilities}
                      onChange={(e) => setFormCapabilities(e.target.value)}
                      style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-dark)', color: 'var(--text-main)', border: '1px solid var(--border-color)', borderRadius: '6px', fontFamily: 'var(--font-mono)' }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 700 }}>Env Stage</label>
                      <select 
                        value={formEnvironment} 
                        onChange={(e) => setFormEnvironment(e.target.value as any)}
                        style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-dark)', color: 'var(--text-main)', border: '1px solid var(--border-color)', borderRadius: '6px' }}
                      >
                        <option value="DEVELOPMENT">Development</option>
                        <option value="STAGING">Staging</option>
                        <option value="PRODUCTION">Production</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Submit row */}
                <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                  <button 
                    type="button" 
                    onClick={() => setActivePanel('LIST')}
                    className="btn btn-secondary"
                    style={{ padding: '0.5rem 1.5rem' }}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    style={{ padding: '0.5rem 2rem' }}
                  >
                    Register AI Agent
                  </button>
                </div>

              </form>
            </div>
          )}
        </div>
      )}

      {/* ====================================================================== */}
      {/* 3. DEPARTMENTS VIEW */}
      {/* ====================================================================== */}
      {(normalizedTab === 'DEPT_QUERY' || normalizedTab === 'DEPT_KYC' || normalizedTab === 'DEPT_PAYMENT') && (
        <div>
          <HeaderBanner 
            title="AI Departments Control" 
            icon={Network} 
            desc="Explore the human owners, agent structures, and processing workflows within each operational unit." 
          />

          {/* Department Inner Tab Navigator */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            <button 
              className={`btn ${deptActiveTab === 'QUERY' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.5rem 1.25rem' }}
              onClick={() => setDeptActiveTab('QUERY')}
            >
              Query AI Department
            </button>
            <button 
              className={`btn ${deptActiveTab === 'KYC' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.5rem 1.25rem' }}
              onClick={() => setDeptActiveTab('KYC')}
            >
              KYC AI Department
            </button>
            <button 
              className={`btn ${deptActiveTab === 'PAYMENT' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.5rem 1.25rem' }}
              onClick={() => setDeptActiveTab('PAYMENT')}
            >
              Payment AI Department
            </button>
          </div>

          {/* Department Sub-Views */}
          {deptActiveTab === 'QUERY' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '1.5rem', alignItems: 'start' }}>
              
              {/* Query details */}
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 900 }}>QUERY AI DEPARTMENT Overview</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Human Owner: <strong>Query TL</strong></span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {/* Department Telemetry */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ background: 'var(--bg-dark)', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Agents Roster</span>
                      <strong style={{ fontSize: '1.2rem', color: 'var(--text-cyan)' }}>4 Agents</strong>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>Active: 3 | Busy: 1</span>
                    </div>
                    <div style={{ background: 'var(--bg-dark)', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Total Requests</span>
                      <strong style={{ fontSize: '1.2rem', color: 'var(--text-brand)' }}>1,820 today</strong>
                      <span style={{ fontSize: '0.65rem', color: 'var(--accent-success)', display: 'block' }}>Resolved: 1,620</span>
                    </div>
                    <div style={{ background: 'var(--bg-dark)', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Escalated Tasks</span>
                      <strong style={{ fontSize: '1.2rem', color: 'var(--text-rose)' }}>200 cases</strong>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>Handoff rate: 10.9%</span>
                    </div>
                  </div>

                  <div>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--text-brand)', display: 'block', marginBottom: '0.5rem' }}>Detailed Scope of Work:</strong>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-main)' }}>
                      <div>Orders &amp; Shopping requests</div>
                      <div>Daily needs &amp; Food deliveries</div>
                      <div>Cab &amp; Travel reservations</div>
                      <div>Hotel &amp; stay bookings</div>
                      <div>Hospital appointments</div>
                      <div>Executive service tasks</div>
                      <div>Door-to-door repair visits</div>
                      <div>Technician service visits</div>
                      <div>General account issues</div>
                      <div>General service issues</div>
                      <div>Membership &amp; Loyalty support</div>
                    </div>
                  </div>

                  <div>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--text-brand)', display: 'block', marginBottom: '0.5rem' }}>Specialized Agent Distribution</strong>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.8rem' }}>
                      <div style={{ background: 'var(--bg-dark)', padding: '0.5rem', borderRadius: '6px' }}>
                        <strong>Query Coordinator</strong>
                        <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem' }}>Dispatches requests to specialists</span>
                      </div>
                      <div style={{ background: 'var(--bg-dark)', padding: '0.5rem', borderRadius: '6px' }}>
                        <strong>Order Support Agent</strong>
                        <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem' }}>Shopping, food delivery, daily needs</span>
                      </div>
                      <div style={{ background: 'var(--bg-dark)', padding: '0.5rem', borderRadius: '6px' }}>
                        <strong>Booking Support Agent</strong>
                        <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem' }}>Reservations, hotels, cabs</span>
                      </div>
                      <div style={{ background: 'var(--bg-dark)', padding: '0.5rem', borderRadius: '6px' }}>
                        <strong>Service Support Agent</strong>
                        <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem' }}>Technicians, AC, repair visits</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Query Router Simulator */}
              <div className="glass-panel" style={{ padding: '1.5rem', borderTop: '4px solid var(--text-cyan)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 900, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Sliders size={18} className="text-cyan" /> Query Router Simulator
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, display: 'block', marginBottom: '0.25rem' }}>Select Mock Query</label>
                    <select 
                      value={queryInput} 
                      onChange={(e) => setQueryInput(e.target.value)}
                      className="btn btn-secondary"
                      style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-dark)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.8rem' }}
                    >
                      <option value="AC technician has not arrived for repair booking.">AC technician has not arrived for repair booking.</option>
                      <option value="When does my hotel room booking in Ooty start?">When does my hotel room booking in Ooty start?</option>
                      <option value="Need to cancel my food order #10281 immediately.">Need to cancel my food order #10281 immediately.</option>
                      <option value="What are the benefits of the Platinum premium membership?">What are the benefits of the Platinum premium membership?</option>
                      <option value="Is there a support email address I can use?">Is there a support email address I can use?</option>
                    </select>
                  </div>

                  <button 
                    onClick={handleQuerySimulation} 
                    className="btn btn-primary"
                    disabled={isQuerySimulating}
                    style={{ width: '100%', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                  >
                    {isQuerySimulating ? 'Simulating Router...' : 'Execute Routing Run'}
                  </button>

                  {/* Logs */}
                  <div style={{ background: 'var(--bg-dark)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, marginBottom: '0.5rem' }}>Routing Trace Logs</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.725rem', height: '140px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      {querySimulationLog.length > 0 ? (
                        querySimulationLog.map((log, i) => (
                          <div key={i} style={{ color: log.includes('Dispatched') ? 'var(--text-emerald)' : 'var(--text-main)' }}>{log}</div>
                        ))
                      ) : (
                        <div style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No active simulation running. Click Execute above.</div>
                      )}
                    </div>
                  </div>

                  {simulatedTargetAgent && (
                    <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--accent-success)', padding: '0.75rem', borderRadius: '6px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Destination Agent</span>
                      <strong style={{ fontSize: '0.9rem', color: 'var(--accent-success)' }}>
                        {agents.find(a => a.id === simulatedTargetAgent)?.name} ({simulatedTargetAgent})
                      </strong>
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

          {deptActiveTab === 'KYC' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '1.5rem', alignItems: 'start' }}>
              
              {/* KYC details */}
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 900 }}>KYC AI DEPARTMENT Overview</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Human Owner: <strong>KYC TL</strong></span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {/* Department Telemetry */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ background: 'var(--bg-dark)', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Agents Roster</span>
                      <strong style={{ fontSize: '1.2rem', color: 'var(--text-cyan)' }}>3 Agents</strong>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>Active: 2 | Busy: 1</span>
                    </div>
                    <div style={{ background: 'var(--bg-dark)', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Applications</span>
                      <strong style={{ fontSize: '1.2rem', color: 'var(--text-brand)' }}>820 runs</strong>
                      <span style={{ fontSize: '0.65rem', color: 'var(--accent-success)', display: 'block' }}>Approved: 610 | Rejected: 120</span>
                    </div>
                    <div style={{ background: 'var(--bg-dark)', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Anomalies</span>
                      <strong style={{ fontSize: '1.2rem', color: 'var(--text-rose)' }}>90 re-uploads</strong>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>Quality issues</span>
                    </div>
                  </div>

                  <div>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--text-brand)', display: 'block', marginBottom: '0.5rem' }}>Detailed Scope of Work:</strong>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-main)' }}>
                      <div>Agent onboarding pipelines</div>
                      <div>KYC checklist collection</div>
                      <div>Document verification audits</div>
                      <div>Document quality checkups</div>
                      <div>Re-upload warning triggers</div>
                      <div>Govt registry validations</div>
                      <div>KYC approvals &amp; rejections</div>
                      <div>KYC status progression</div>
                      <div>Direct vendor onboarding</div>
                      <div>Agent-referral vendor onboarding</div>
                      <div>Verification status logging</div>
                    </div>
                  </div>

                  <div>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--text-brand)', display: 'block', marginBottom: '0.5rem' }}>Specialized Agent Distribution</strong>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.8rem' }}>
                      <div style={{ background: 'var(--bg-dark)', padding: '0.5rem', borderRadius: '6px' }}>
                        <strong>KYC Coordinator</strong>
                        <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem' }}>Manages the document pipeline</span>
                      </div>
                      <div style={{ background: 'var(--bg-dark)', padding: '0.5rem', borderRadius: '6px' }}>
                        <strong>Document Quality Agent</strong>
                        <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem' }}>Checks blur, readable OCR</span>
                      </div>
                      <div style={{ background: 'var(--bg-dark)', padding: '0.5rem', borderRadius: '6px' }}>
                        <strong>Identity Verification Agent</strong>
                        <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem' }}>Face portrait matches</span>
                      </div>
                      <div style={{ background: 'var(--bg-dark)', padding: '0.5rem', borderRadius: '6px' }}>
                        <strong>KYC Decision Agent</strong>
                        <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem' }}>Final approvals or rejections</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* KYC Workflow Simulator */}
              <div className="glass-panel" style={{ padding: '1.5rem', borderTop: '4px solid var(--text-emerald)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 900, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle size={18} className="text-emerald" /> KYC Workflow Simulator
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                      onClick={() => { setKycSimType('VENDOR_DIRECT'); resetKycSimulator(); }}
                      className={`btn ${kycSimType === 'VENDOR_DIRECT' ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ flex: 1, padding: '0.35rem', fontSize: '0.75rem' }}
                    >
                      Direct Vendor
                    </button>
                    <button 
                      onClick={() => { setKycSimType('AGENT_ONBOARDING'); resetKycSimulator(); }}
                      className={`btn ${kycSimType === 'AGENT_ONBOARDING' ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ flex: 1, padding: '0.35rem', fontSize: '0.75rem' }}
                    >
                      Referral Agent
                    </button>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                      onClick={handleKycStep}
                      disabled={kycSimStep >= 5}
                      className="btn btn-primary"
                      style={{ flex: 2, padding: '0.5rem', fontSize: '0.8rem' }}
                    >
                      {kycSimStep === 0 ? 'Start Onboarding' : kycSimStep >= 5 ? 'KYC Run Complete' : 'Step Workflow Agent'}
                    </button>
                    <button 
                      onClick={resetKycSimulator}
                      className="btn btn-secondary"
                      style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem' }}
                    >
                      Reset
                    </button>
                  </div>

                  {/* Flow Trace */}
                  <div style={{ background: 'var(--bg-dark)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, marginBottom: '0.5rem' }}>Onboarding Pipeline Steps</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.725rem', height: '140px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {kycSimLogs.length > 0 ? (
                        kycSimLogs.map((log, i) => (
                          <div key={i} style={{ color: log.includes('Step 5') ? 'var(--text-emerald)' : 'var(--text-main)' }}>{log}</div>
                        ))
                      ) : (
                        <div style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Simulator reset. Click Onboarding to trigger document quality checking.</div>
                      )}
                    </div>
                  </div>

                  {kycSimResult && (
                    <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '2px solid var(--accent-success)', padding: '0.75rem', borderRadius: '6px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>KYC Onboarding Decision</span>
                      <strong style={{ fontSize: '1.15rem', color: 'var(--accent-success)', letterSpacing: '2px' }}>
                        {kycSimResult}
                      </strong>
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

          {deptActiveTab === 'PAYMENT' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '1.5rem', alignItems: 'start' }}>
              
              {/* Payment details */}
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 900 }}>PAYMENT AI DEPARTMENT Overview</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Human Owner: <strong>Payment TL</strong></span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {/* Department Telemetry */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <div style={{ background: 'var(--bg-dark)', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                      <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Agents</span>
                      <strong style={{ fontSize: '1rem', color: 'var(--text-cyan)' }}>3 Agents</strong>
                      <span style={{ fontSize: '0.55rem', color: 'var(--text-muted)', display: 'block' }}>Active: 3</span>
                    </div>
                    <div style={{ background: 'var(--bg-dark)', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                      <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Payments Checked</span>
                      <strong style={{ fontSize: '1rem', color: 'var(--text-brand)' }}>1,200</strong>
                      <span style={{ fontSize: '0.55rem', color: 'var(--accent-success)', display: 'block' }}>Successful: 980</span>
                    </div>
                    <div style={{ background: 'var(--bg-dark)', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                      <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Pending / Failed</span>
                      <strong style={{ fontSize: '1rem', color: 'var(--text-rose)' }}>120 / 80</strong>
                      <span style={{ fontSize: '0.55rem', color: 'var(--text-muted)', display: 'block' }}>Pending resolution</span>
                    </div>
                    <div style={{ background: 'var(--bg-dark)', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                      <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Escalated</span>
                      <strong style={{ fontSize: '1rem', color: 'var(--text-rose)' }}>20 cases</strong>
                      <span style={{ fontSize: '0.55rem', color: 'var(--text-muted)', display: 'block' }}>Manual audit</span>
                    </div>
                  </div>

                  <div>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--text-brand)', display: 'block', marginBottom: '0.5rem' }}>Detailed Scope of Work:</strong>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-main)' }}>
                      <div>Agent onboarding payments</div>
                      <div>Vendor onboarding payments</div>
                      <div>Payment gateway verifications</div>
                      <div>Pending payments audit</div>
                      <div>Failed payments resolution</div>
                      <div>Digital tax receipts delivery</div>
                      <div>Custom payment links delivery</div>
                      <div>Referral commissions audits</div>
                      <div>Commission calculations</div>
                      <div>Wallet withdrawal transfers</div>
                      <div>Payment-related support issues</div>
                    </div>
                  </div>

                  <div>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--text-brand)', display: 'block', marginBottom: '0.5rem' }}>Specialized Agent Distribution</strong>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.8rem' }}>
                      <div style={{ background: 'var(--bg-dark)', padding: '0.5rem', borderRadius: '6px' }}>
                        <strong>Payment Coordinator</strong>
                        <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem' }}>Validates transaction chains</span>
                      </div>
                      <div style={{ background: 'var(--bg-dark)', padding: '0.5rem', borderRadius: '6px' }}>
                        <strong>Payment Verification Agent</strong>
                        <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem' }}>Cross-checks Razorpay/Stripe APIs</span>
                      </div>
                      <div style={{ background: 'var(--bg-dark)', padding: '0.5rem', borderRadius: '6px' }}>
                        <strong>Commission Agent</strong>
                        <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem' }}>Calculates partner referral ledgers</span>
                      </div>
                      <div style={{ background: 'var(--bg-dark)', padding: '0.5rem', borderRadius: '6px' }}>
                        <strong>Withdrawal Agent</strong>
                        <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem' }}>Initiates direct bank link transfers</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Commission Simulator */}
              <div className="glass-panel" style={{ padding: '1.5rem', borderTop: '4px solid var(--text-amber)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 900, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CreditCard size={18} className="text-amber" /> Commission Calculator
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem' }}>
                  <div style={{ background: 'var(--bg-dark)', padding: '0.85rem', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Onboarding Registration fee:</span>
                      <strong>₹1,500</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-emerald)' }}>
                      <span>Direct Agent Referral (10%):</span>
                      <strong>₹150</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-cyan)' }}>
                      <span>Platform Share (90%):</span>
                      <strong>₹1,350</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                    <AlertTriangle size={14} className="text-amber" />
                    <span>Calculation rules dynamically audited by Commission Agent (AI-PAY-COMMISSION-001).</span>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      )}

      {/* ====================================================================== */}
      {/* 4. SPECIALIZED AGENTS CHANNELS VIEWS */}
      {/* ====================================================================== */}
      {(normalizedTab === 'AGENT_CALLING' || normalizedTab === 'AGENT_WHATSAPP' || normalizedTab === 'AGENT_EMAIL' || normalizedTab === 'AGENT_TRANSLATION' || normalizedTab === 'AGENT_ESCALATION') && (
        <div>
          <HeaderBanner 
            title={`Channel Inspector: ${normalizedTab.replace('AGENT_', '')} AI`} 
            icon={Sliders} 
            desc="Exposes active communication gateway sessions, routing rates, and template approvals." 
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem', alignItems: 'start' }}>
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                Active System Sessions Queue
              </h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}>
                      <th style={{ padding: '0.5rem' }}>Session ID</th>
                      <th style={{ padding: '0.5rem' }}>Requester</th>
                      <th style={{ padding: '0.5rem' }}>Status</th>
                      <th style={{ padding: '0.5rem' }}>Payload size</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '0.75rem 0.5rem', fontFamily: 'var(--font-mono)' }}>SES-CALL-8829</td>
                      <td style={{ padding: '0.75rem 0.5rem' }}>Vendor #10821</td>
                      <td style={{ padding: '0.75rem 0.5rem', color: 'var(--accent-success)' }}>STREAMING</td>
                      <td style={{ padding: '0.75rem 0.5rem' }}>4.2 KB</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '0.75rem 0.5rem', fontFamily: 'var(--font-mono)' }}>SES-CALL-7712</td>
                      <td style={{ padding: '0.75rem 0.5rem' }}>Customer #88219</td>
                      <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>COMPLETED</td>
                      <td style={{ padding: '0.75rem 0.5rem' }}>12.8 KB</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', borderTop: '4px solid var(--text-cyan)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 900, marginBottom: '1rem' }}>Channel Telemetry</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Meta Gateway Status:</span>
                  <span style={{ color: 'var(--accent-success)' }}>● ONLINE</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Average processing time:</span>
                  <strong>180 ms</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Daily message limit:</span>
                  <strong>200,000 / day</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* 5. AGENT CONFIGURATION VIEW */}
      {/* ====================================================================== */}
      {normalizedTab === 'AGENT_CONFIG' && (
        <div>
          <HeaderBanner 
            title="Agent Configuration Templates" 
            icon={Settings} 
            desc="Global runtime variables, default models mapping, and concurrency ceilings." 
          />

          <div className="glass-panel" style={{ padding: '2rem', maxWidth: '750px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              Active Configuration Settings
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '1rem', alignItems: 'center' }}>
                <strong style={{ color: 'var(--text-brand)' }}>Default Provider:</strong>
                <span style={{ background: 'var(--bg-dark)', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>Google Gemini</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '1rem', alignItems: 'center' }}>
                <strong style={{ color: 'var(--text-brand)' }}>Default Model Target:</strong>
                <span style={{ background: 'var(--bg-dark)', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontFamily: 'var(--font-mono)' }}>gemini-1.5-flash</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '1rem', alignItems: 'center' }}>
                <strong style={{ color: 'var(--text-brand)' }}>Standard Temperature:</strong>
                <span style={{ background: 'var(--bg-dark)', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>0.2 (Optimized for accuracy)</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '1rem', alignItems: 'center' }}>
                <strong style={{ color: 'var(--text-brand)' }}>Max Concurrency Pool:</strong>
                <span style={{ background: 'var(--bg-dark)', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>1000 concurrent threads</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* 6. PROMPT MANAGEMENT VIEW */}
      {/* ====================================================================== */}
      {normalizedTab === 'PROMPT_MGMT' && (
        <div>
          <HeaderBanner 
            title="Prompt Management" 
            icon={Sliders} 
            desc="Control active prompt version tags and system instructions maps." 
          />

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '1rem' }}>Active System Prompts Map</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ color: 'var(--text-muted)', borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ padding: '0.5rem' }}>Prompt Handle</th>
                  <th style={{ padding: '0.5rem' }}>Active Version Tag</th>
                  <th style={{ padding: '0.5rem' }}>Last Synced</th>
                  <th style={{ padding: '0.5rem' }}>Risk Target</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem 0.5rem', fontWeight: 700 }}>ORDER-SUPPORT-SYSTEM</td>
                  <td style={{ padding: '0.75rem 0.5rem', fontFamily: 'var(--font-mono)', color: 'var(--text-cyan)' }}>ORDER-SUPPORT-SYSTEM-v3</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>2 hours ago</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>MEDIUM</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem 0.5rem', fontWeight: 700 }}>KYC-QUALITY-SYSTEM</td>
                  <td style={{ padding: '0.75rem 0.5rem', fontFamily: 'var(--font-mono)', color: 'var(--text-cyan)' }}>KYC-QUALITY-SYSTEM-v1</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>1 day ago</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>CRITICAL</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* 7. KNOWLEDGE BASE VIEW */}
      {/* ====================================================================== */}
      {normalizedTab === 'KNOWLEDGE_BASE' && (
        <div>
          <HeaderBanner 
            title="Knowledge Base Vector Registries" 
            icon={BookOpen} 
            desc="Explore vector database namespaces and document partition checkups." 
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div className="glass-panel" style={{ padding: '1.5rem', borderTop: '4px solid var(--text-cyan)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 900, marginBottom: '0.5rem' }}>Customer FAQ Partition</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '1rem' }}>Namespace: `kb_query_faq`</span>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem' }}>
                <span>108 chunks</span>
                <span style={{ color: 'var(--accent-success)' }}>● SYNCED</span>
              </div>
            </div>
            <div className="glass-panel" style={{ padding: '1.5rem', borderTop: '4px solid var(--text-emerald)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 900, marginBottom: '0.5rem' }}>KYC Guidelines Vault</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '1rem' }}>Namespace: `kb_kyc_sop`</span>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem' }}>
                <span>42 chunks</span>
                <span style={{ color: 'var(--accent-success)' }}>● SYNCED</span>
              </div>
            </div>
            <div className="glass-panel" style={{ padding: '1.5rem', borderTop: '4px solid var(--text-amber)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 900, marginBottom: '0.5rem' }}>Commercial Billing & Dispute Vault</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '1rem' }}>Namespace: `kb_payment_dispute`</span>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem' }}>
                <span>15 chunks</span>
                <span style={{ color: 'var(--accent-success)' }}>● SYNCED</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* 8. TOOL MANAGEMENT VIEW */}
      {/* ====================================================================== */}
      {normalizedTab === 'TOOL_MGMT' && (
        <div>
          <HeaderBanner 
            title="Tool Management Registry" 
            icon={Wrench} 
            desc="Service tool namespaces mapping to backend endpoints and validation scopes." 
          />

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '1rem' }}>Registered Actions Blueprint</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ color: 'var(--text-muted)', borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ padding: '0.5rem' }}>Tool Handle</th>
                  <th style={{ padding: '0.5rem' }}>Service Endpoint Scope</th>
                  <th style={{ padding: '0.5rem' }}>Department Bound</th>
                  <th style={{ padding: '0.5rem' }}>Permissions Risk</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem 0.5rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>getOrder()</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>/api/v1/orders/:id</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>Query</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>MEDIUM</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem 0.5rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>updateKycStatus()</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>/api/v1/kyc/update</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>KYC</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>CRITICAL</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* 9. WORKFLOW MANAGEMENT VIEW */}
      {/* ====================================================================== */}
      {normalizedTab === 'WORKFLOW_MGMT' && (
        <div>
          <HeaderBanner 
            title="Workflow blue-prints Management" 
            icon={GitBranch} 
            desc="Create and audit routing sequences between coordinated agents." 
          />

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '1.25rem' }}>Standard Order Cancel Workflow Blueprint</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
              <span style={{ padding: '0.5rem', background: 'var(--bg-dark)', border: '1px solid var(--border-color)' }}>Customer request</span>
              <ChevronRight size={16} />
              <span style={{ padding: '0.5rem', background: 'var(--bg-dark)', border: '1px solid var(--border-color)', color: 'var(--text-cyan)' }}>AI Orchestrator</span>
              <ChevronRight size={16} />
              <span style={{ padding: '0.5rem', background: 'var(--bg-dark)', border: '1px solid var(--border-color)', color: 'var(--text-amber)' }}>Query Coordinator</span>
              <ChevronRight size={16} />
              <span style={{ padding: '0.5rem', background: 'var(--bg-dark)', border: '1px solid var(--border-color)' }}>Order Support Specialist</span>
              <ChevronRight size={16} />
              <span style={{ padding: '0.5rem', background: 'rgba(16,185,129,0.1)', border: '1px solid var(--accent-success)', color: 'var(--text-emerald)' }}>Success resolution</span>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* 10. LIVE OPERATIONS VIEW */}
      {/* ====================================================================== */}
      {normalizedTab === 'LIVE_OPS' && (
        <div>
          <HeaderBanner 
            title="Live Operations Telemetry" 
            icon={Activity} 
            desc="Track active queue job items and thread processing distributions." 
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '1rem' }}>Active Queries Queue</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ background: 'var(--bg-dark)', padding: '0.85rem', borderRadius: '6px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>technician_visit_reschedule</span>
                  <span style={{ color: 'var(--text-amber)' }}>● PENDING DISPATCH</span>
                </div>
              </div>
            </div>
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '1rem' }}>KYC Quality Queue</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ background: 'var(--bg-dark)', padding: '0.85rem', borderRadius: '6px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>vendor_GSTIN_quality_audit</span>
                  <span style={{ color: 'var(--accent-success)' }}>● IN PROGRESS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* 11. CONVERSATIONS TRANSCRIPTS VIEW */}
      {/* ====================================================================== */}
      {normalizedTab === 'CONVERSATIONS' && (
        <div>
          <HeaderBanner 
            title="Customer Conversations logger" 
            icon={MessageSquare} 
            desc="Traces customer text messages alongside active agent response outputs." 
          />

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '1.5rem' }}>Active Conversations Logs</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxHeight: '400px', overflowY: 'auto' }}>
              <div style={{ background: 'var(--bg-dark)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  <span>User: VIP Customer #88219</span>
                  <span>Session Key: SES-99182</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                  <div><strong>Customer:</strong> "Need to change my technician arrival address to main flat #4B."</div>
                  <div style={{ color: 'var(--text-cyan)' }}><strong>AI Orchestrator:</strong> Routed query category to Service Support Agent.</div>
                  <div style={{ color: 'var(--text-amber)' }}><strong>Service Support Agent:</strong> Called updateProfileField() tool. Address successfully updated.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* 12. AI DECISIONS HISTORY VIEW */}
      {/* ====================================================================== */}
      {normalizedTab === 'AI_DECISIONS' && (
        <div>
          <HeaderBanner 
            title="AI Decisions History Log" 
            icon={CheckCircle} 
            desc="Full compliance audit log of final classification results and onboarding decisions." 
          />

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '1rem' }}>Final Decisions Ledger</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ color: 'var(--text-muted)', borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ padding: '0.5rem' }}>Decision ID</th>
                  <th style={{ padding: '0.5rem' }}>Subject Applicant</th>
                  <th style={{ padding: '0.5rem' }}>Decision Status</th>
                  <th style={{ padding: '0.5rem' }}>Risk Level</th>
                  <th style={{ padding: '0.5rem' }}>Compliance Check</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem 0.5rem', fontFamily: 'var(--font-mono)' }}><div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><span>DEC-KYC-0918</span><TicketVisionButton ticket={{ id: 'DEC-KYC-0918', ticketNumber: 'DEC-KYC-0918', customerName: 'Vendor #10821', departmentLabel: 'KYC AI Agent', status: 'APPROVED' }} compact size="sm" /></div></td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>Vendor #10821</td>
                  <td style={{ padding: '0.75rem 0.5rem', color: 'var(--accent-success)', fontWeight: 800 }}>APPROVED</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>CRITICAL</td>
                  <td style={{ padding: '0.75rem 0.5rem', color: 'var(--accent-success)' }}>PASS</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem 0.5rem', fontFamily: 'var(--font-mono)' }}><div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><span>DEC-PAY-0822</span><TicketVisionButton ticket={{ id: 'DEC-PAY-0822', ticketNumber: 'DEC-PAY-0822', customerName: 'Agent Partner #308', departmentLabel: 'Payment AI Agent', status: 'REJECTED' }} compact size="sm" /></div></td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>Agent Partner #308</td>
                  <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-rose)', fontWeight: 800 }}>REJECTED</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>HIGH</td>
                  <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-rose)' }}>FAIL (GSTIN invalid)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* 13. SYSTEM LOGS CONSOLE VIEW */}
      {/* ====================================================================== */}
      {normalizedTab === 'AI_LOGS' && (
        <div>
          <HeaderBanner 
            title="System AI Logs Console" 
            icon={Terminal} 
            desc="Live rolling JSON trace output from active prompt executions." 
          />

          <div className="glass-panel" style={{ padding: '1rem', background: 'black', border: '1px solid #333', borderRadius: '8px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#00ff00', minHeight: '300px', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div>[2026-08-13 13:00:10] INFO [Orchestrator] Ingested request payload SES-99182.</div>
              <div>[2026-08-13 13:00:11] INFO [Orchestrator] Match intent query.address_change (confidence: 0.992).</div>
              <div>[2026-08-13 13:00:12] DEBUG [Service Agent] Call tool updateProfileField() arguments: [address: "flat #4B"].</div>
              <div>[2026-08-13 13:00:13] INFO [Service Agent] Tool result: 200 SUCCESS.</div>
              <div style={{ color: 'white' }}>█</div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* 14. EVALUATIONS VIEW */}
      {/* ====================================================================== */}
      {normalizedTab === 'EVALUATIONS' && (
        <div>
          <HeaderBanner 
            title="AI Evaluations &amp; Prompts Benchmarks" 
            icon={Eye} 
            desc="Benchmark statistics, model accuracy rates, and testing matrices." 
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div className="glass-panel" style={{ padding: '1.5rem', borderTop: '4px solid var(--accent-success)' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>AVERAGE ACCURACY</span>
              <div style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--accent-success)', margin: '0.25rem 0' }}>96.8%</div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tested against 1,200 mock runs</span>
            </div>
            <div className="glass-panel" style={{ padding: '1.5rem', borderTop: '4px solid var(--text-cyan)' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>BENCHMARK PASS RATE</span>
              <div style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--text-cyan)', margin: '0.25rem 0' }}>99.2%</div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Compliance bounds met</span>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* 15. PERFORMANCE TRACKING VIEW */}
      {/* ====================================================================== */}
      {normalizedTab === 'PERFORMANCE' && (
        <div>
          <HeaderBanner 
            title="Global Performance Tracker" 
            icon={BarChart2} 
            desc="Interactive performance charts showing latency curves and system load." 
          />

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '1rem' }}>Global Latency Curves (Simulated)</h3>
            <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '2%', borderBottom: '1px solid var(--border-color)', borderLeft: '1px solid var(--border-color)', padding: '1rem' }}>
              {[180, 220, 290, 310, 480, 520, 410, 320, 280, 340, 410, 450, 480, 390, 290, 310, 330, 400, 420, 450].map((val, idx) => (
                <div key={idx} style={{ flex: 1, background: 'rgba(56,189,248,0.2)', borderTop: '2px solid var(--text-cyan)', height: `${(val / 600) * 100}%` }}></div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
              <span>1 hour ago</span>
              <span>30 mins ago</span>
              <span>Now</span>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* 16. VERSIONS REGISTRY VIEW */}
      {/* ====================================================================== */}
      {normalizedTab === 'VERSIONS' && (
        <div>
          <HeaderBanner 
            title="Registry Configuration Versions" 
            icon={Layers} 
            desc="Audit active configuration version logs and execute rollbacks." 
          />

          <div className="glass-panel" style={{ padding: '2rem', maxWidth: '650px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '1.25rem' }}>Versions Timeline</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid var(--accent-success)', padding: '0.75rem 1rem', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong>v1.2.0 (Active)</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-emerald)' }}>● PRODUCTION LIVE</span>
              </div>
              <div style={{ background: 'var(--bg-dark)', border: '1px solid var(--border-color)', padding: '0.75rem 1rem', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)' }}>
                <span>v1.1.0 (Deprecated)</span>
                <span style={{ fontSize: '0.75rem' }}>Archived on 2026-08-01</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* 17. SYSTEM SETTINGS VIEW */}
      {/* ====================================================================== */}
      {normalizedTab === 'SETTINGS' && (
        <div>
          <HeaderBanner 
            title="Global System Settings" 
            icon={Settings} 
            desc="Change global security thresholds, tenant settings, and role-based permissions." 
          />

          <div className="glass-panel" style={{ padding: '2rem', maxWidth: '650px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '1.25rem' }}>Security Policy Constraints</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                <span>Strict Isolation (Cross-department block):</span>
                <strong style={{ color: 'var(--accent-success)' }}>ENABLED</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                <span>Automatic Human Hand-off fallback:</span>
                <strong style={{ color: 'var(--accent-success)' }}>ENABLED</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                <span>Outbound Telephony limits:</span>
                <strong>₹500 / account / day</strong>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AIAgentDashboard;
