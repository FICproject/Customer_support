import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Ticket,
  CheckCircle2,
  Clock,
  User,
  Bot,
  AlertTriangle,
  FileText,
  CreditCard,
  PhoneCall,
  Mail,
  ShieldCheck,
  Zap,
  ArrowRight,
  X,
  Eye,
  Activity,
  Layers,
  ChevronRight,
  FileCheck,
  ScanLine,
  PhoneForwarded,
  Sparkles,
  Lock,
  ExternalLink,
  Shield,
  HelpCircle,
  MessageSquare
} from 'lucide-react';

export interface TicketVisionFlowData {
  id: string;
  ticketNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  subject: string;
  departmentLabel?: string;
  status: string;
  priority: string;
  assignedActor?: string;
  isEscalated?: boolean;
  aiConfidenceScore?: number;
  createdAt?: string;
  updatedAt?: string;
  // Custom Flow Overrides if any
  currentStageNumber?: number;
  escalationType?: 'NONE' | 'TL_TAKEOVER' | 'TL_TO_HUMAN_OFFICER' | 'SUPER_ADMIN_TAKEOVER' | 'OFFICER_OVERRIDE';
  takeoverActor?: string;
  takeoverTimestamp?: string;
  customNotes?: string;
}

export interface FlowStepDetail {
  stepNumber: number;
  stageKey: string;
  title: string;
  subtitle: string;
  actor: string;
  actorType: 'AI' | 'TL' | 'HUMAN_OFFICER' | 'SUPER_ADMIN' | 'SYSTEM' | 'GATEWAY';
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING' | 'ESCALATED' | 'TAKEOVER';
  timestamp: string;
  description: string;
  actionSpotDetails: string[];
  metaTags?: { label: string; value: string; color?: string }[];
  isEscalationIntervention?: boolean;
  isTakeoverIntervention?: boolean;
  isDynamicNextPlaceholder?: boolean;
}

/** Global Helper to Trigger Ticket Vision Modal from Anywhere */
export function openTicketVision(ticket: any) {
  if (!ticket) return;
  const rawId = ticket.ticketNumber || ticket.ticketId || ticket.id || ticket.registrationId || 'TCK-9920';
  const isKyc = String(rawId).includes('REG') || String(ticket.departmentLabel || ticket.department || '').toUpperCase().includes('KYC');
  const isPay = String(ticket.departmentLabel || ticket.department || '').toUpperCase().includes('PAYMENT') || String(rawId).includes('PAY') || String(rawId).includes('TXN');

  const normalizedTicket: TicketVisionFlowData = {
    id: ticket.id || ticket.ticketId || rawId,
    ticketNumber: rawId,
    customerName: ticket.customerName || ticket.customer || ticket.name || ticket.userName || 'Enterprise Customer',
    customerEmail: ticket.customerEmail || ticket.email || `${(ticket.customerName || ticket.customer || ticket.name || 'user').toLowerCase().replace(/[^a-z0-9]/g, '.')}@enterprise.ai`,
    customerPhone: ticket.customerPhone || ticket.phone || '+91-98765-43210',
    subject: ticket.subject || ticket.reason || ticket.action || ticket.issue || (isKyc ? 'KYC Onboarding & Verification Dossier' : isPay ? 'Payment Settlement & Referral Reconciliation' : 'Enterprise Customer Support Inquiry'),
    departmentLabel: ticket.departmentLabel || ticket.department || ticket.dept || (isKyc ? 'KYC' : isPay ? 'Payment' : 'Customer Support'),
    status: ticket.status || 'IN_PROGRESS',
    priority: ticket.priority || (ticket.isEscalated ? 'P1_CRITICAL' : 'P2_HIGH'),
    assignedActor: ticket.assignedActor || ticket.assignedTo || ticket.actor || (isKyc ? 'AI KYC Agent' : isPay ? 'AI Payment Agent' : 'AI Autonomous Gateway'),
    isEscalated: ticket.isEscalated || ticket.status === 'ESCALATED' || String(ticket.status || '').includes('BLUR') || String(ticket.status || '').includes('HOLD') || String(ticket.status || '').includes('DISPUTE'),
    aiConfidenceScore: ticket.aiConfidenceScore || ticket.confidence || (ticket.isEscalated ? 42.1 : 96.8),
    currentStageNumber: ticket.currentStageNumber,
    escalationType: ticket.escalationType || (ticket.status === 'ESCALATED' ? 'TL_TAKEOVER' : undefined),
    takeoverActor: ticket.takeoverActor || (ticket.isEscalated ? 'Sarah Jenkins (KYC TL)' : undefined),
    takeoverTimestamp: ticket.takeoverTimestamp || (ticket.isEscalated ? '16:12:10' : undefined),
    customNotes: ticket.customNotes || ticket.notes
  };

  window.dispatchEvent(new CustomEvent('OPEN_TICKET_VISION_FLOW', { detail: normalizedTicket }));
}

/** Reusable Button Component to Drop next to ANY Ticket ID */
export const TicketVisionButton: React.FC<{
  ticket: any;
  onClick?: (t: any) => void;
  label?: string;
  size?: 'sm' | 'md';
  compact?: boolean;
  style?: React.CSSProperties;
}> = ({ ticket, onClick, label = 'Vision Flow', size = 'sm', compact = false, style }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) {
      onClick(ticket);
    } else {
      openTicketVision(ticket);
    }
  };

  return (
    <button
      className="ticket-vision-btn"
      onClick={handleClick}
      title={`Open Live Dynamic Vision Lifecycle Tracker for Ticket #${ticket?.ticketNumber || ticket?.ticketId || ticket?.id || ticket?.registrationId || ''}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.3rem',
        background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
        color: '#ffffff',
        border: 'none',
        borderRadius: '6px',
        padding: compact ? '0.15rem 0.45rem' : size === 'sm' ? '0.22rem 0.55rem' : '0.35rem 0.75rem',
        fontSize: compact ? '0.65rem' : size === 'sm' ? '0.7rem' : '0.78rem',
        fontWeight: 700,
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(99, 102, 241, 0.35)',
        transition: 'all 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
        whiteSpace: 'nowrap',
        zIndex: 2,
        ...style
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-1px) scale(1.03)';
        e.currentTarget.style.boxShadow = '0 4px 14px rgba(6, 182, 212, 0.5)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(99, 102, 241, 0.35)';
      }}
    >
      <Eye size={compact ? 11 : size === 'sm' ? 12 : 14} />
      {!compact && <span>{label}</span>}
    </button>
  );
};

interface TicketVisionFlowModalProps {
  ticket: TicketVisionFlowData | null;
  onClose: () => void;
}

export const TicketVisionFlowModal: React.FC<TicketVisionFlowModalProps> = ({ ticket, onClose }) => {
  if (!ticket) return null;

  const [activeTabMode, setActiveTabMode] = useState<'LIFECYCLE_STAGES' | 'OMNICHANNEL_TIMELINE'>('LIFECYCLE_STAGES');
  const [channelFilter, setChannelFilter] = useState<'ALL' | 'VOICE' | 'EMAIL' | 'CHAT' | 'WHATSAPP'>('ALL');
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);

  const isEscalated = ticket.isEscalated || ticket.status === 'ESCALATED' || String(ticket.status).includes('BLUR') || String(ticket.status).includes('HOLD') || String(ticket.status).includes('DISPUTE');
  const isResolved = ticket.status === 'RESOLVED' || ticket.status === 'CLOSED' || ticket.status === 'APPROVED_PAYMENT' || ticket.status === 'SETTLED';
  const deptUpper = (ticket.departmentLabel || '').toUpperCase();
  const isKycDept = deptUpper.includes('KYC') || ticket.ticketNumber.startsWith('REG-') || ticket.ticketNumber.startsWith('KYC-') || (ticket.subject || '').toUpperCase().includes('KYC') || (ticket.subject || '').toUpperCase().includes('OCR') || (ticket.subject || '').toUpperCase().includes('PASSPORT') || (ticket.subject || '').toUpperCase().includes('AADHAAR');
  const isPaymentDept = deptUpper.includes('PAYMENT') || ticket.ticketNumber.startsWith('PAY-') || ticket.ticketNumber.startsWith('TXN-') || (ticket.subject || '').toUpperCase().includes('COMMISSION') || (ticket.subject || '').toUpperCase().includes('SETTLEMENT') || (ticket.subject || '').toUpperCase().includes('BILLING') || (ticket.subject || '').toUpperCase().includes('DISPUTE');

  // Determine active step index
  let activeStep = ticket.currentStageNumber || 1;
  if (!ticket.currentStageNumber) {
    if (isResolved) {
      activeStep = isKycDept ? (isEscalated ? 8 : 5) : isPaymentDept ? (isEscalated ? 8 : 5) : (isEscalated ? 7 : 4);
    } else if (isEscalated || ticket.takeoverActor) {
      activeStep = isKycDept ? 7 : isPaymentDept ? 7 : 6;
    } else if (ticket.status === 'OPEN' || ticket.status === 'NEW') {
      activeStep = 2;
    } else {
      activeStep = 4;
    }
  }

  // Generate Step-by-Step Process based on department & takeover flow
  const generateStepByStepFlow = (): FlowStepDetail[] => {
    const steps: FlowStepDetail[] = [];

    if (isKycDept) {
      // 1. Ticket Received
      steps.push({
        stepNumber: 1,
        stageKey: 'TICKET_RECEIVED',
        title: 'Step 1: Ticket Ingestion & Reception',
        subtitle: 'Customer request received & routed to KYC Department queue',
        actor: 'Omni AI Gateway Router',
        actorType: 'GATEWAY',
        status: 'COMPLETED',
        timestamp: ticket.createdAt || '16:10:00',
        description: 'Omni-channel ticket registered and assigned initial priority with real-time lifecycle tracking.',
        actionSpotDetails: ['Channel: Web / Mobile Application', 'Priority: P1 Critical SLA']
      });

      // 2. KYC Process Started
      steps.push({
        stepNumber: 2,
        stageKey: 'KYC_PROCESS_STARTED',
        title: 'Step 2: KYC Process Started',
        subtitle: 'Customer onboarding profile linked & identity verification pipeline initiated',
        actor: ticket.assignedActor || 'AI KYC Verification Agent',
        actorType: 'AI',
        status: activeStep > 2 ? 'COMPLETED' : 'IN_PROGRESS',
        timestamp: '16:11:05',
        description: 'Identity dossier created; customer identity documents queued for automated neural scanning.',
        actionSpotDetails: ['Encrypted Vault: 2 identity documents retrieved', 'Compliance Standard: Global KYC / AML 2026']
      });

      // 3. AI OCR Document Extraction
      steps.push({
        stepNumber: 3,
        stageKey: 'OCR_EXTRACTION',
        title: 'Step 3: AI Neural OCR & Document Data Extraction',
        subtitle: 'Passport / National ID parsed, MRZ zone scanned & biometric metadata extracted',
        actor: 'AI Vision OCR Engine (v4.2)',
        actorType: 'AI',
        status: activeStep > 3 ? 'COMPLETED' : activeStep === 3 ? 'IN_PROGRESS' : 'PENDING',
        timestamp: '16:12:15',
        description: 'Document zone extraction executed; text and barcode OCR parsing completed with 99.4% confidence score.',
        actionSpotDetails: ['Extracted Name & DOB verified', 'Liveness Check: 3D Depth Biometrics passed']
      });

      // 4. Govt Portal Verification
      steps.push({
        stepNumber: 4,
        stageKey: 'GOVT_PORTAL_VERIFICATION',
        title: 'Step 4: Documents Verifying Through Govt Portal',
        subtitle: 'Direct real-time API verification against government databases (UIDAI / NSDL / AML Anti-Fraud Registry)',
        actor: 'Govt Identity Database API',
        actorType: 'SYSTEM',
        status: activeStep > 4 ? 'COMPLETED' : activeStep === 4 ? 'IN_PROGRESS' : 'PENDING',
        timestamp: '16:13:30',
        description: 'Automated query sent to national registry. Cross-referencing citizen identity records & blacklist screening.',
        actionSpotDetails: ['API Endpoint: National Registry Gateway', 'AML Screening: Clean record matched']
      });

      // 5. TL Takeover (If escalated or takeover actor present)
      if (isEscalated || ticket.takeoverActor || ticket.escalationType) {
        steps.push({
          stepNumber: 5,
          stageKey: 'TL_TAKEOVER',
          title: `Step 5: Team Lead (TL) Takeover`,
          subtitle: `Supervisor takeover executed by ${ticket.takeoverActor || 'Sarah Jenkins (KYC TL)'} for anomaly inspection`,
          actor: ticket.takeoverActor || 'Sarah Jenkins (KYC Team Lead)',
          actorType: 'TL',
          status: activeStep > 5 ? 'COMPLETED' : 'TAKEOVER',
          isTakeoverIntervention: true,
          isEscalationIntervention: true,
          timestamp: ticket.takeoverTimestamp || '16:14:45',
          description: `Team Lead ${ticket.takeoverActor || 'Sarah Jenkins'} intervened to inspect document blur / verification discrepancy.`,
          actionSpotDetails: ['Intervention Reason: Document blur / manual inspection requirement', 'Supervisor Console: Active Override']
        });

        // 6. TL Assigned to Human Officer
        steps.push({
          stepNumber: 6,
          stageKey: 'TL_ASSIGNED_TO_OFFICER',
          title: 'Step 6: TL Assigned to Human Officer',
          subtitle: `Team Lead assigned case to Senior Human Verification Officer Rajesh Sharma`,
          actor: `${ticket.takeoverActor || 'Sarah Jenkins (KYC TL)'} → Rajesh Sharma (Senior Officer)`,
          actorType: 'TL',
          status: activeStep > 6 ? 'COMPLETED' : 'IN_PROGRESS',
          isTakeoverIntervention: true,
          timestamp: '16:15:30',
          description: 'Dossier officially delegated to specialized human officer for physical document inspection.',
          actionSpotDetails: ['Assigned Officer: Rajesh Sharma (Desk #4)', 'Priority Queue: Immediate Manual Clearance']
        });

        // 7. Document Checking by Human Officer
        steps.push({
          stepNumber: 7,
          stageKey: 'HUMAN_DOCUMENT_CHECKING',
          title: 'Step 7: Document Checking by Human Officer',
          subtitle: 'Human officer performing manual document inspection, hologram verification & clearance audit',
          actor: 'Rajesh Sharma (Senior Verification Officer)',
          actorType: 'HUMAN_OFFICER',
          status: isResolved ? 'COMPLETED' : 'IN_PROGRESS',
          timestamp: '16:16:40',
          description: 'Human officer conducting dual-layer document checking and security hologram inspection.',
          actionSpotDetails: ['Audit Status: Manual Verification in progress', 'Officer Notes: Cross-referencing physical records']
        });
      }

      // Final Step: KYC Approved & Verification Closed
      if (isResolved) {
        steps.push({
          stepNumber: steps.length + 1,
          stageKey: 'KYC_APPROVED_CLOSED',
          title: `Step ${steps.length + 1}: KYC Approved & Verification Dossier Closed`,
          subtitle: 'KYC verification officially approved, compliance badge issued & ticket resolved',
          actor: 'KYC Compliance Engine',
          actorType: 'SYSTEM',
          status: 'COMPLETED',
          timestamp: '16:18:00',
          description: 'KYC dossier approved with 100% compliance. Confirmation notification sent to customer.',
          actionSpotDetails: ['Status: VERIFIED & APPROVED', 'SLA Clock: 100% Compliant (0 Breaches)']
        });
      } else {
        steps.push({
          stepNumber: steps.length + 1,
          stageKey: 'DYNAMIC_NEXT_ACTION',
          title: `Step ${steps.length + 1}: Dynamic Next Action`,
          subtitle: 'Awaiting final clearance authorization & automated customer notification dispatch',
          actor: 'System Workflow Engine',
          actorType: 'SYSTEM',
          status: 'PENDING',
          isDynamicNextPlaceholder: true,
          timestamp: 'Live Queue',
          description: 'Workflow engine awaiting officer sign-off to execute database state change and notification dispatch.',
          actionSpotDetails: ['Pending Action: Final Approval / Payout Release']
        });
      }
    } else if (isPaymentDept) {
      // 1. Ticket Received
      steps.push({
        stepNumber: 1,
        stageKey: 'TICKET_RECEIVED',
        title: 'Step 1: Ticket Ingestion & Reception',
        subtitle: 'Payment / Commercial Billing Dispute ticket received and logged into billing ledger',
        actor: 'Omni AI Gateway Router',
        actorType: 'GATEWAY',
        status: 'COMPLETED',
        timestamp: ticket.createdAt || '16:10:00',
        description: 'Payment issue registered in enterprise gateway with real-time audit ledger match.',
        actionSpotDetails: ['Queue: Payment & Settlement Desk', 'Initial SLA: Under 20 mins']
      });

      // 2. Payment & Commission Intake Started
      steps.push({
        stepNumber: 2,
        stageKey: 'PAYMENT_INTAKE_STARTED',
        title: 'Step 2: Payment & Commission Intake Started',
        subtitle: 'Transaction ID parsed, wallet ledger linked & settlement validation pipeline initialized',
        actor: ticket.assignedActor || 'AI Payment Agent',
        actorType: 'AI',
        status: activeStep > 2 ? 'COMPLETED' : 'IN_PROGRESS',
        timestamp: '16:11:05',
        description: 'Payment agent linked transaction record and initiated referral / commission balance verification.',
        actionSpotDetails: ['Transaction Mode: Gateway Settlement', 'Assigned Agent: AI Payment Agent']
      });

      // 3. Gateway Transaction Audit
      steps.push({
        stepNumber: 3,
        stageKey: 'GATEWAY_TRANSACTION_AUDIT',
        title: 'Step 3: Transaction & Gateway Ledger Audit',
        subtitle: 'Stripe / Razorpay / Bank transaction trace, idempotency token verification & double billing audit',
        actor: 'Payment Gateway API (Stripe / Razorpay)',
        actorType: 'SYSTEM',
        status: activeStep > 3 ? 'COMPLETED' : activeStep === 3 ? 'IN_PROGRESS' : 'PENDING',
        timestamp: '16:12:15',
        description: 'Cross-verifying payment gateway webhooks against bank idempotency tokens and treasury database.',
        actionSpotDetails: ['Gateway Trace: Success Response Verified', 'Double Billing Audit: Clean']
      });

      // 4. Treasury Escrow & Referral Calculation Check
      steps.push({
        stepNumber: 4,
        stageKey: 'TREASURY_ESCROW_CHECK',
        title: 'Step 4: Treasury Escrow & Referral Calculation Check',
        subtitle: 'Commission tier formula calculated, escrow vault balance locked & verified in enterprise treasury',
        actor: 'Enterprise Treasury Engine',
        actorType: 'SYSTEM',
        status: activeStep > 4 ? 'COMPLETED' : activeStep === 4 ? 'IN_PROGRESS' : 'PENDING',
        timestamp: '16:13:30',
        description: 'Escrow ledger verified; commission payout formula matched against agent tier agreement.',
        actionSpotDetails: ['Commission Formula: 10% Platinum Tier', 'Escrow Balance: Liquidity confirmed']
      });

      // If takeover / escalation present
      if (isEscalated || ticket.takeoverActor || ticket.escalationType) {
        steps.push({
          stepNumber: 5,
          stageKey: 'PAYMENT_TL_TAKEOVER',
          title: 'Step 5: Payment Team Lead (TL) Takeover',
          subtitle: `Payment TL ${ticket.takeoverActor || 'Marcus Vance'} took over for dispute review & manual authorization`,
          actor: ticket.takeoverActor || 'Marcus Vance (Payment Team Lead)',
          actorType: 'TL',
          status: activeStep > 5 ? 'COMPLETED' : 'TAKEOVER',
          isTakeoverIntervention: true,
          isEscalationIntervention: true,
          timestamp: ticket.takeoverTimestamp || '16:14:45',
          description: `Supervisor takeover initiated by Team Lead ${ticket.takeoverActor || 'Marcus Vance'} for dispute settlement clearance.`,
          actionSpotDetails: ['Trigger: Commercial Dispute Claim / Policy Review', 'Supervisor Action: Ledger lock override']
        });

        steps.push({
          stepNumber: 6,
          stageKey: 'TL_ASSIGNED_FINANCE_OFFICER',
          title: 'Step 6: TL Assigned to Human Finance Officer',
          subtitle: 'Payment TL assigned case to Human Finance Settlement Officer Anita Roy for dual-key clearance',
          actor: `${ticket.takeoverActor || 'Marcus Vance (Payment TL)'} → Anita Roy (Finance Officer)`,
          actorType: 'TL',
          status: activeStep > 6 ? 'COMPLETED' : 'IN_PROGRESS',
          isTakeoverIntervention: true,
          timestamp: '16:15:30',
          description: 'Payment case officially delegated to senior human finance officer for banking dual-authorization.',
          actionSpotDetails: ['Assigned Officer: Anita Roy (Finance Desk)', 'Authorization Level: Tier-2 Settlement Officer']
        });

        steps.push({
          stepNumber: 7,
          stageKey: 'MANUAL_FINANCE_AUDIT',
          title: 'Step 7: Manual Financial Audit & Dispute/Payout Authorization',
          subtitle: 'Human officer auditing banking ledger & executing authorized settlement / commission release',
          actor: 'Anita Roy (Finance Settlement Officer)',
          actorType: 'HUMAN_OFFICER',
          status: isResolved ? 'COMPLETED' : 'IN_PROGRESS',
          timestamp: '16:16:40',
          description: 'Human officer conducting final ledger reconciliation and signing off on bank release.',
          actionSpotDetails: ['Settlement Mode: IMPS / UPI Commercial Transfer', 'Audit Status: Authorized for release']
        });
      }

      if (isResolved) {
        steps.push({
          stepNumber: steps.length + 1,
          stageKey: 'PAYMENT_SETTLED_CLOSED',
          title: `Step ${steps.length + 1}: Gateway Settlement & Instant Payout Executed`,
          subtitle: 'Funds disbursed, UTR number generated, customer receipt dispatched & ticket resolved',
          actor: 'Payment Gateway / Bank IMPS Engine',
          actorType: 'SYSTEM',
          status: 'COMPLETED',
          timestamp: '16:18:00',
          description: 'Funds successfully credited. Official GST invoice and payout receipt dispatched to customer.',
          actionSpotDetails: ['UTR Number: UTR-9920184-SETTLE', 'Resolution: 100% SLA Compliant']
        });
      } else {
        steps.push({
          stepNumber: steps.length + 1,
          stageKey: 'DYNAMIC_NEXT_ACTION',
          title: `Step ${steps.length + 1}: Dynamic Next Action`,
          subtitle: 'Awaiting banking gateway acknowledgment & customer receipt delivery',
          actor: 'System Workflow Engine',
          actorType: 'SYSTEM',
          status: 'PENDING',
          isDynamicNextPlaceholder: true,
          timestamp: 'Live Queue',
          description: 'Awaiting final banking gateway response to disburse funds and close ticket.',
          actionSpotDetails: ['Pending: Bank gateway settlement dispatch']
        });
      }
    } else {
      // General Customer Support Ticket
      steps.push({
        stepNumber: 1,
        stageKey: 'TICKET_RECEIVED',
        title: 'Step 1: Ticket Ingestion & Reception',
        subtitle: 'Customer support request received & priority classification completed',
        actor: 'Omni AI Gateway Router',
        actorType: 'GATEWAY',
        status: 'COMPLETED',
        timestamp: ticket.createdAt || '16:10:00',
        description: 'Support ticket registered in omnichannel portal with customer account link.',
        actionSpotDetails: ['Channel: Customer Portal', 'Priority: Standard Support']
      });

      steps.push({
        stepNumber: 2,
        stageKey: 'DIAGNOSTICS_STARTED',
        title: 'Step 2: Support Diagnostics & Query Classification',
        subtitle: 'Intent recognized, sentiment score parsed & issue mapped to knowledge base',
        actor: ticket.assignedActor || 'AI Support Specialist',
        actorType: 'AI',
        status: activeStep > 2 ? 'COMPLETED' : 'IN_PROGRESS',
        timestamp: '16:11:05',
        description: 'AI Support agent analyzed customer problem and pulled relevant SOP context.',
        actionSpotDetails: ['Sentiment: Neutral / Actionable', 'RAG Context Grounding: 98%']
      });

      steps.push({
        stepNumber: 3,
        stageKey: 'KNOWLEDGE_RETRIEVAL',
        title: 'Step 3: RAG Knowledge Base & Solution Proposal',
        subtitle: 'Context matched against enterprise resolution database & automated response generated',
        actor: 'AI Neural Support Engine',
        actorType: 'AI',
        status: activeStep > 3 ? 'COMPLETED' : activeStep === 3 ? 'IN_PROGRESS' : 'PENDING',
        timestamp: '16:12:15',
        description: 'Enterprise knowledge vector database retrieved step-by-step troubleshooting path.',
        actionSpotDetails: ['Vector Grounding: Enterprise SOP v3.2', 'Resolution Path: Automated Clearance']
      });

      if (isEscalated || ticket.takeoverActor || ticket.escalationType) {
        steps.push({
          stepNumber: 4,
          stageKey: 'SUPPORT_TL_TAKEOVER',
          title: 'Step 4: Support Team Lead (TL) Takeover',
          subtitle: `Support TL ${ticket.takeoverActor || 'David Miller'} took over case for priority escalation handling`,
          actor: ticket.takeoverActor || 'David Miller (Support Team Lead)',
          actorType: 'TL',
          status: activeStep > 4 ? 'COMPLETED' : 'TAKEOVER',
          isTakeoverIntervention: true,
          isEscalationIntervention: true,
          timestamp: ticket.takeoverTimestamp || '16:13:30',
          description: 'Supervisor intervened to prevent SLA breach and coordinate direct customer resolution.',
          actionSpotDetails: ['Takeover Type: Direct Supervisor Escalation', 'Status: Active Supervision']
        });

        steps.push({
          stepNumber: 5,
          stageKey: 'TL_ASSIGNED_SUPPORT_OFFICER',
          title: 'Step 5: TL Assigned to Human Support Officer',
          subtitle: 'Support TL assigned case to Senior Human Support Specialist Priya Patel for customer outreach',
          actor: `${ticket.takeoverActor || 'David Miller (Support TL)'} → Priya Patel (Support Officer)`,
          actorType: 'TL',
          status: activeStep > 5 ? 'COMPLETED' : 'IN_PROGRESS',
          isTakeoverIntervention: true,
          timestamp: '16:14:45',
          description: 'Case delegated to human specialist for direct telephone / priority chat resolution.',
          actionSpotDetails: ['Assigned Specialist: Priya Patel (Senior Desk)', 'Channel: Direct Phone / Chat']
        });

        steps.push({
          stepNumber: 6,
          stageKey: 'HUMAN_SUPPORT_RESOLUTION',
          title: 'Step 6: Direct Customer Resolution by Human Officer',
          subtitle: 'Human officer completed direct call/chat outreach and resolved customer concern',
          actor: 'Priya Patel (Senior Support Specialist)',
          actorType: 'HUMAN_OFFICER',
          status: isResolved ? 'COMPLETED' : 'IN_PROGRESS',
          timestamp: '16:16:40',
          description: 'Human officer spoke with customer, provided required solution and verified satisfaction.',
          actionSpotDetails: ['Outreach Result: Customer Accepted Resolution', 'Officer Sign-off: Complete']
        });
      }

      if (isResolved) {
        steps.push({
          stepNumber: steps.length + 1,
          stageKey: 'SUPPORT_RESOLVED_CLOSED',
          title: `Step ${steps.length + 1}: Ticket Resolved & Customer Confirmation Dispatched`,
          subtitle: 'Issue officially resolved with 100% SLA compliance & CSAT survey sent',
          actor: 'Enterprise Notification Service',
          actorType: 'SYSTEM',
          status: 'COMPLETED',
          timestamp: '16:18:00',
          description: 'Support ticket resolved and closed. Customer satisfaction survey dispatched.',
          actionSpotDetails: ['Final State: RESOLVED', 'SLA: 100% Compliant']
        });
      } else {
        steps.push({
          stepNumber: steps.length + 1,
          stageKey: 'DYNAMIC_NEXT_ACTION',
          title: `Step ${steps.length + 1}: Dynamic Next Action`,
          subtitle: 'Awaiting customer response or automated resolution sign-off',
          actor: 'System Workflow Engine',
          actorType: 'SYSTEM',
          status: 'PENDING',
          isDynamicNextPlaceholder: true,
          timestamp: 'Live Queue',
          description: 'Awaiting customer response to finalize ticket closure.',
          actionSpotDetails: ['Pending: Customer Confirmation']
        });
      }
    }

    return steps;
  };

  const executedSteps = generateStepByStepFlow();
  const completedStepsCount = executedSteps.filter(s => s.status === 'COMPLETED').length;
  const currentStepObj = executedSteps.find(s => s.status === 'IN_PROGRESS' || s.status === 'TAKEOVER' || s.status === 'ESCALATED') || executedSteps[executedSteps.length - 1];

  const getActorBadge = (actorType: FlowStepDetail['actorType'], actorName: string) => {
    switch (actorType) {
      case 'TL':
        return (
          <span style={{ fontSize: '0.68rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.15)', color: '#d97706', border: '1px solid rgba(245, 158, 11, 0.35)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <Shield size={11} /> Team Lead (TL)
          </span>
        );
      case 'HUMAN_OFFICER':
        return (
          <span style={{ fontSize: '0.68rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '8px', background: 'rgba(236, 72, 153, 0.15)', color: '#db2777', border: '1px solid rgba(236, 72, 153, 0.35)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <User size={11} /> Human Officer
          </span>
        );
      case 'AI':
        return (
          <span style={{ fontSize: '0.68rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '8px', background: 'rgba(79, 70, 229, 0.15)', color: 'var(--text-brand)', border: '1px solid var(--border-hover)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <Bot size={11} /> AI Agent
          </span>
        );
      case 'GATEWAY':
        return (
          <span style={{ fontSize: '0.68rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', color: '#059669', border: '1px solid rgba(16, 185, 129, 0.35)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <Zap size={11} /> Gateway Router
          </span>
        );
      default:
        return (
          <span style={{ fontSize: '0.68rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '8px', background: 'rgba(2, 132, 199, 0.15)', color: '#0284c7', border: '1px solid rgba(2, 132, 199, 0.35)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <Activity size={11} /> System / Govt Portal
          </span>
        );
    }
  };

  const getStatusBadge = (status: FlowStepDetail['status']) => {
    switch (status) {
      case 'COMPLETED':
        return (
          <span style={{ fontSize: '0.68rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '20px', background: 'rgba(16, 185, 129, 0.15)', color: '#059669', border: '1px solid rgba(16, 185, 129, 0.35)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <CheckCircle2 size={11} /> Completed
          </span>
        );
      case 'TAKEOVER':
        return (
          <span style={{ fontSize: '0.68rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '20px', background: 'rgba(245, 158, 11, 0.18)', color: '#b45309', border: '1px solid rgba(245, 158, 11, 0.45)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <Shield size={11} /> TL Takeover Active
          </span>
        );
      case 'ESCALATED':
        return (
          <span style={{ fontSize: '0.68rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '20px', background: 'rgba(239, 68, 68, 0.18)', color: '#dc2626', border: '1px solid rgba(239, 68, 68, 0.45)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <AlertTriangle size={11} /> Escalated
          </span>
        );
      case 'IN_PROGRESS':
        return (
          <span style={{ fontSize: '0.68rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '20px', background: 'rgba(59, 130, 246, 0.15)', color: '#2563eb', border: '1px solid rgba(59, 130, 246, 0.35)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <Zap size={11} /> Active In-Progress
          </span>
        );
      default:
        return (
          <span style={{ fontSize: '0.68rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '20px', background: 'var(--bg-dark)', color: 'var(--text-muted)', border: '1px solid var(--border-color)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <Clock size={11} /> Awaiting Trigger
          </span>
        );
    }
  };

  return createPortal(
    <div
      className="modal-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(3, 7, 18, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        padding: '1rem',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          width: '1060px',
          maxWidth: '96vw',
          maxHeight: '94vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--bg-surface)',
          color: 'var(--text-main)',
          borderRadius: '18px',
          border: '2px solid #facc15',
          boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.25), 0 0 25px rgba(250, 204, 21, 0.25)',
          overflow: 'hidden'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div
          style={{
            padding: '1.2rem 1.75rem',
            background: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative'
          }}
        >
          {/* Top light yellow accent stripe */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: '#facc15'
            }}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #facc15 0%, #eab308 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1e293b',
                boxShadow: '0 0 16px rgba(250, 204, 21, 0.4)'
              }}
            >
              <Eye size={24} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: 'var(--text-main)', letterSpacing: '-0.01em' }}>
                  Live Ticket Vision Flow Tracker
                </h2>
                <span
                  style={{
                    background: 'rgba(250, 204, 21, 0.15)',
                    color: '#854d0e',
                    border: '1px solid #facc15',
                    padding: '0.15rem 0.55rem',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    fontWeight: 800
                  }}
                >
                  {ticket.ticketNumber}
                </span>

                {/* ESCALATION STATUS BADGE */}
                {isEscalated && (
                  <span
                    style={{
                      background: 'rgba(239, 68, 68, 0.15)',
                      color: 'var(--text-rose)',
                      border: '1px solid rgba(239, 68, 68, 0.35)',
                      padding: '0.15rem 0.55rem',
                      borderRadius: '6px',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}
                  >
                    <AlertTriangle size={12} /> ESCALATION ACTIVE
                  </span>
                )}

                {/* TAKEOVER STATUS BADGE */}
                {ticket.takeoverActor && (
                  <span
                    style={{
                      background: 'rgba(245, 158, 11, 0.15)',
                      color: '#b45309',
                      border: '1px solid rgba(245, 158, 11, 0.35)',
                      padding: '0.15rem 0.55rem',
                      borderRadius: '6px',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}
                  >
                    <Shield size={12} /> TAKEOVER: {ticket.takeoverActor}
                  </span>
                )}
              </div>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Customer: <strong style={{ color: 'var(--text-main)' }}>{ticket.customerName}</strong> • Dept: <strong style={{ color: 'var(--text-brand)' }}>{ticket.departmentLabel || (isPaymentDept ? 'Payment' : isKycDept ? 'KYC' : 'Support')}</strong> • Subject: {ticket.subject}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* TAB SELECTOR: LIFECYCLE VS MULTI-CHANNEL TIMELINE */}
            <div style={{ display: 'flex', background: 'var(--bg-dark)', padding: '0.2rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <button
                onClick={() => setActiveTabMode('LIFECYCLE_STAGES')}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: activeTabMode === 'LIFECYCLE_STAGES' ? 'linear-gradient(135deg, #facc15 0%, #eab308 100%)' : 'transparent',
                  color: activeTabMode === 'LIFECYCLE_STAGES' ? '#1e293b' : 'var(--text-muted)'
                }}
              >
                ⚡ Operational Lifecycle
              </button>
              <button
                onClick={() => setActiveTabMode('OMNICHANNEL_TIMELINE')}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: activeTabMode === 'OMNICHANNEL_TIMELINE' ? 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)' : 'transparent',
                  color: activeTabMode === 'OMNICHANNEL_TIMELINE' ? '#ffffff' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                💬 Multi-Channel Customer Timeline
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                background: 'var(--bg-dark)',
                padding: '0.4rem 0.85rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)'
              }}
            >
              <span style={{ fontSize: '0.66rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                End-to-End Operational Lifecycle
              </span>
              <span style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-emerald)' }}>
                {completedStepsCount} of {executedSteps.length} Steps Completed
              </span>
            </div>

            <button
              onClick={onClose}
              style={{
                background: 'var(--bg-dark)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-muted)',
                borderRadius: '8px',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ACTIVE STATUS BANNER */}
        <div
          style={{
            padding: '0.75rem 1.75rem',
            background: isEscalated
              ? 'linear-gradient(90deg, rgba(239, 68, 68, 0.12) 0%, rgba(245, 158, 11, 0.08) 100%)'
              : 'var(--bg-dark)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: isEscalated ? '#ef4444' : '#10b981',
                boxShadow: isEscalated ? '0 0 12px #ef4444' : '0 0 12px #10b981',
                animation: 'pulse 1.5s infinite'
              }}
            />
            <div style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>
              <span style={{ fontWeight: 800, color: isEscalated ? '#f59e0b' : 'var(--text-brand)' }}>
                📍 CURRENT ACTIVE STEP:
              </span>{' '}
              <strong style={{ color: 'var(--text-main)' }}>{currentStepObj.title}</strong>{' '}
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                (Assigned: <strong style={{ color: 'var(--text-main)' }}>{currentStepObj.actor}</strong>)
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {getStatusBadge(currentStepObj.status)}
            <span
              style={{
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                background: 'var(--bg-surface)',
                padding: '0.2rem 0.65rem',
                borderRadius: '20px',
                border: '1px solid var(--border-color)'
              }}
            >
              ⚡ Dynamic Lifecycle: {executedSteps.length} Stages
            </span>
          </div>
        </div>

        {/* CONDITIONAL VIEW: LIFECYCLE STAGES vs OMNICHANNEL CUSTOMER TIMELINE */}
        {activeTabMode === 'LIFECYCLE_STAGES' ? (
          <div
          style={{
            padding: '1.25rem 1.75rem',
            overflowY: 'auto',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
            background: 'var(--bg-surface)'
          }}
        >
          <div style={{ fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '0.15rem' }}>
            Sequential Step-by-Step Ticket Lifecycle Flow
          </div>

          {executedSteps.map((s, idx) => {
            const isCompleted = s.status === 'COMPLETED';
            const isCurrent = s.status === 'IN_PROGRESS' || s.status === 'TAKEOVER' || s.status === 'ESCALATED';
            const isTakeover = s.isTakeoverIntervention;
            const isOfficer = s.actorType === 'HUMAN_OFFICER';

            return (
              <div
                key={s.stepNumber}
                style={{
                  display: 'flex',
                  alignItems: 'stretch',
                  gap: '1rem',
                  position: 'relative'
                }}
              >
                {/* Connecting timeline rail between items */}
                {idx < executedSteps.length - 1 && (
                  <div
                    style={{
                      position: 'absolute',
                      left: '19px',
                      top: '40px',
                      bottom: '-14px',
                      width: '2px',
                      background: isCompleted ? '#10b981' : 'var(--border-color)',
                      zIndex: 1
                    }}
                  />
                )}

                {/* Step Circle Node */}
                <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.88rem',
                      background: isCompleted
                        ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                        : isTakeover
                        ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                        : isOfficer
                        ? 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)'
                        : isCurrent
                        ? 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)'
                        : 'var(--bg-dark)',
                      color: isCompleted || isCurrent || isTakeover || isOfficer ? '#ffffff' : 'var(--text-muted)',
                      border: isCurrent
                        ? '2px solid #ffffff'
                        : isCompleted
                        ? '2px solid #10b981'
                        : isTakeover
                        ? '2px solid #f59e0b'
                        : '2px solid var(--border-color)',
                      boxShadow: isCurrent ? '0 0 16px rgba(99, 102, 241, 0.45)' : 'none',
                      flexShrink: 0
                    }}
                  >
                    {isCompleted ? <CheckCircle2 size={18} /> : s.stepNumber}
                  </div>
                </div>

                {/* Step Content Card */}
                <div
                  style={{
                    flex: 1,
                    background: isTakeover
                      ? 'rgba(245, 158, 11, 0.06)'
                      : isCurrent
                      ? 'rgba(99, 102, 241, 0.05)'
                      : 'var(--bg-dark)',
                    border: isTakeover
                      ? '1.5px solid rgba(245, 158, 11, 0.35)'
                      : isCurrent
                      ? '1.5px solid var(--accent-primary)'
                      : '1px solid var(--border-color)',
                    borderRadius: '12px',
                    padding: '0.9rem 1.15rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.45rem',
                    boxShadow: isCurrent ? '0 4px 14px rgba(0,0,0,0.06)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.95rem', fontWeight: 800, color: isTakeover ? '#d97706' : isCurrent ? 'var(--text-brand)' : 'var(--text-main)' }}>
                      {s.title}
                    </span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                        {s.timestamp}
                      </span>
                      {getStatusBadge(s.status)}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.4rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.4rem', marginTop: '0.1rem' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Assigned Actor:</span>
                      <strong>{s.actor}</strong>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        
        ) : (
          <div style={{
            padding: '1.25rem 1.75rem',
            overflowY: 'auto',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            background: 'var(--bg-surface)'
          }}>
            {/* Multi-Channel Filter Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
                  Customer Multi-Channel Thread:
                </span>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0284c7' }}>
                  {ticket.customerName} ({ticket.customerPhone || '+1 98765 43210'})
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.35rem' }}>
                {[
                  { id: 'ALL', label: 'All Events (6)' },
                  { id: 'VOICE', label: '📞 Inbound Calls' },
                  { id: 'EMAIL', label: '✉️ Emails' },
                  { id: 'CHAT', label: '💬 Live Chat' },
                  { id: 'WHATSAPP', label: '📱 WhatsApp' }
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setChannelFilter(f.id as any)}
                    style={{
                      padding: '0.25rem 0.65rem',
                      borderRadius: '6px',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      background: channelFilter === f.id ? (f.id === 'ALL' ? '#0284c7' : f.id === 'VOICE' ? '#f59e0b' : f.id === 'EMAIL' ? '#a855f7' : f.id === 'WHATSAPP' ? '#22c55e' : '#0ea5e9') : 'var(--bg-dark)',
                      color: channelFilter === f.id ? '#ffffff' : 'var(--text-muted)'
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Interaction Timeline List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                {
                  id: 'TL-101',
                  channel: 'VOICE',
                  title: 'Inbound Customer Phone Call & Warm Transfer',
                  actor: 'Alex Vance (Agent) → Sarah Jenkins (Supervisor)',
                  time: '10:35 AM • Today',
                  duration: '04:12',
                  sentiment: 'RESOLVED',
                  auditAction: 'CALL_TRANSFERRED',
                  summary: 'Customer called regarding subscription invoice clarification. Transferred via Warm Transfer with supervisor notes attached.',
                  details: ['Duration: 04:12', 'DTMF Tones Transmitted: 1, 2, 4', 'Call Recording: Encrypted MP3 Vault', 'Notes: Verified billing ledger parity'],
                  badgeBg: 'rgba(245, 158, 11, 0.15)',
                  badgeColor: '#f59e0b',
                  badgeBorder: 'rgba(245, 158, 11, 0.35)',
                  icon: PhoneCall
                },
                {
                  id: 'TL-102',
                  channel: 'WHATSAPP',
                  title: 'WhatsApp Official Support Message & Voice Note',
                  actor: 'WhatsApp Official Agent Gateway',
                  time: '10:28 AM • Today',
                  summary: 'Customer sent voice inquiry regarding discount tiers. AI Agent verified agreement and responded with official WhatsApp HSM template.',
                  details: ['Voice Note: 0:18 (Transcribed with 99.4% confidence)', 'HSM Template: Pricing & Tier Agreement', 'Status: Read (Double Blue Tick)'],
                  badgeBg: 'rgba(34, 197, 94, 0.15)',
                  badgeColor: '#22c55e',
                  badgeBorder: 'rgba(34, 197, 94, 0.35)',
                  isVoiceNote: true,
                  auditAction: 'WHATSAPP_MESSAGE_SENT',
                  icon: MessageSquare
                },
                {
                  id: 'TL-103',
                  channel: 'EMAIL',
                  title: 'Dispatched Enterprise Email Reply',
                  actor: 'Support Desk (support@forgeindia.com)',
                  time: '09:45 AM • Today',
                  summary: 'Formal response with itemized billing breakdown receipt #553 dispatched directly to customer inbox.',
                  details: ['Recipient: david.chen@email.com', 'Subject: Re: Unable to login / Billing ledger', 'Attachments: Invoice_553_Breakdown.pdf (2.4 MB)'],
                  badgeBg: 'rgba(168, 85, 247, 0.15)',
                  badgeColor: '#a855f7',
                  badgeBorder: 'rgba(168, 85, 247, 0.35)',
                  auditAction: 'EMAIL_DISPATCHED',
                  icon: Mail
                },
                {
                  id: 'TL-104',
                  channel: 'CHAT',
                  title: 'Live Web Chat Visitor Session',
                  actor: 'Query AI Autonomous Specialist',
                  time: 'Yesterday • 04:30 PM',
                  summary: 'Visitor initiated live chat on /pricing page. Answered SSO login inquiry and provided quick canned policy clarification.',
                  details: ['Page: /pricing', 'Browser: Chrome 124 (Windows 11)', 'Resolution: Customer accepted guidance'],
                  badgeBg: 'rgba(2, 132, 199, 0.15)',
                  badgeColor: '#0284c7',
                  badgeBorder: 'rgba(2, 132, 199, 0.35)',
                  auditAction: 'LIVE_CHAT_MESSAGE_SENT',
                  icon: MessageSquare
                },
                {
                  id: 'TL-105',
                  channel: 'VOICE',
                  title: 'DTMF Keypad Tone Sequence & Interactive IVR',
                  actor: 'Enterprise Telephony Gateway',
                  time: 'Yesterday • 02:15 PM',
                  summary: 'Customer navigated automated IVR menu: Selected [1: English] -> [2: Billing Support] -> [4: Supervisor Escalation].',
                  details: ['Tones Transmitted: 1 -> 2 -> 4', 'Routing Destination: Tier-2 Escalation Desk', 'Audit Verification: Immutable Audit Log Entry Logged'],
                  badgeBg: 'rgba(245, 158, 11, 0.15)',
                  badgeColor: '#f59e0b',
                  badgeBorder: 'rgba(245, 158, 11, 0.35)',
                  auditAction: 'CALL_DTMF_SENT',
                  icon: PhoneForwarded
                }
              ]
                .filter(item => channelFilter === 'ALL' || item.channel === channelFilter)
                .map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      style={{
                        background: 'var(--bg-dark)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '12px',
                        padding: '1rem 1.25rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.65rem'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                          <div style={{
                            width: 32,
                            height: 32,
                            borderRadius: '8px',
                            background: item.badgeBg,
                            border: `1px solid ${item.badgeBorder}`,
                            color: item.badgeColor,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <Icon size={16} />
                          </div>
                          <div>
                            <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>{item.title}</strong>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                              Actor: <strong>{item.actor}</strong> • {item.time}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{
                            fontSize: '0.68rem',
                            fontWeight: 800,
                            padding: '0.15rem 0.5rem',
                            borderRadius: '6px',
                            background: item.badgeBg,
                            color: item.badgeColor,
                            border: `1px solid ${item.badgeBorder}`
                          }}>
                            {item.channel}
                          </span>
                          <span style={{
                            fontSize: '0.65rem',
                            fontWeight: 800,
                            padding: '0.15rem 0.5rem',
                            borderRadius: '6px',
                            background: 'rgba(16, 185, 129, 0.15)',
                            color: '#10b981',
                            border: '1px solid rgba(16, 185, 129, 0.3)'
                          }}>
                            Audit Verified: {item.auditAction}
                          </span>
                        </div>
                      </div>

                      <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-main)', lineHeight: 1.45 }}>
                        {item.summary}
                      </p>

                      <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        flexWrap: 'wrap',
                        background: 'var(--bg-surface)',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '8px',
                        border: '1px solid var(--border-color)',
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)'
                      }}>
                        {item.details.map((d, dIdx) => (
                          <span key={dIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            • {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
        {/* MODAL FOOTER */}
        <div
          style={{
            padding: '1rem 1.75rem',
            background: 'var(--bg-surface)',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Activity size={14} className="text-emerald" />
            <span>Autonomous SLA Clock: <strong style={{ color: 'var(--text-main)' }}>100% Compliant</strong> (0 Breaches)</span>
          </div>

          <div style={{ display: 'flex', gap: '0.65rem' }}>
            <button
              className="btn btn-secondary"
              onClick={onClose}
              style={{ fontSize: '0.8rem', padding: '0.45rem 1rem' }}
            >
              Close Tracker
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
