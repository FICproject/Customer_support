import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Search,
  ArrowRight,
  Shield,
  FileText,
  UserCheck,
  Send,
  Building,
  RefreshCw,
  PhoneCall,
  Phone,
  PhoneOff,
  DollarSign,
  TrendingUp,
  Percent,
  Check,
  Zap,
  Activity,
  User,
  Ticket,
  MessageSquare,
  Smartphone,
  RotateCcw,
  Terminal,
  Layers,
  ChevronRight,
  Download,
  Calendar,
  Lock,
  Eye,
  Info,
  Printer,
  Cpu,
  GitBranch,
  Play,
  Pause,
  Sliders
} from 'lucide-react';
import { TicketVisionButton } from './TicketVisionFlowModal';

interface PaymentHumanOfficerWorkspaceProps {
  activeSubTab?: string;
  onSelectSubTab?: (subTab: string) => void;
  showToast?: (msg: string) => void;
  targetPingCase?: any;
}

export const PaymentHumanOfficerWorkspace: React.FC<PaymentHumanOfficerWorkspaceProps> = ({
  activeSubTab = 'AGENT_DESK',
  onSelectSubTab,
  showToast,
  targetPingCase
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'VERIFIED' | 'DISBURSED'>('ALL');
  const [selectedPayout, setSelectedPayout] = useState<any | null>(null);
  const [auditNote, setAuditNote] = useState('');
  const [officerAgentTierFilter, setOfficerAgentTierFilter] = useState<'ALL' | 'PINCODE_AGENT' | 'DISTRICT_AGENT' | 'DIVISIONAL_AGENT' | 'STATE_AGENT'>('ALL');

  // --- 1. AGENT WALLETS & COMMISSION LEDGER DATA ---
  const [officerAgentList, setOfficerAgentList] = useState<any[]>([
    // --- PINCODE AGENTS (@ ₹150 / referral) ---
    {
      agentId: 'AGT-PIN-600001',
      agentName: 'Raju Vignesh',
      tier: 'PINCODE_AGENT',
      tierLabel: 'Pincode Tie-up Agent',
      jurisdiction: 'Pincode: 600001 (George Town, Chennai)',
      commissionPerReferral: 150.00,
      successfulReferralsCount: 43,
      calculationFormula: '43 Referrals × ₹150.00',
      lifetimeCommissionEarned: 6450.00,
      currentWalletBalance: 6450.00,
      payoutRequest: {
        payoutId: 'PAYOUT-REQ-101',
        requestedAmount: 4500.00,
        tdsDeduction: 225.00, // 5% TDS
        netPayable: 4275.00,
        balanceAfterPayout: 1950.00,
        bankName: 'HDFC Bank',
        accountNumber: '50100491829821',
        ifsc: 'HDFC0001244',
        ifscStatus: 'PENNY_DROP_MATCHED_100%',
        upiId: 'raju.vignesh@okhdfcbank',
        panNumber: 'ABCDE1234F',
        panStatus: 'VERIFIED_ACTIVE',
        kycStatus: 'APPROVED_BY_KYC_TL',
        status: 'PENDING_OFFICER_AUDIT',
        officerNote: '',
        verifiedByOfficer: null,
        requestedAt: '2026-08-24 10:45 AM'
      }
    },
    {
      agentId: 'AGT-PIN-560001',
      agentName: 'Santosh Kumar',
      tier: 'PINCODE_AGENT',
      tierLabel: 'Pincode Tie-up Agent',
      jurisdiction: 'Pincode: 560001 (MG Road, Bengaluru)',
      commissionPerReferral: 150.00,
      successfulReferralsCount: 35,
      calculationFormula: '35 Referrals × ₹150.00',
      lifetimeCommissionEarned: 5250.00,
      currentWalletBalance: 5250.00,
      payoutRequest: {
        payoutId: 'PAYOUT-REQ-105',
        requestedAmount: 3000.00,
        tdsDeduction: 150.00,
        netPayable: 2850.00,
        balanceAfterPayout: 2250.00,
        bankName: 'Canara Bank',
        accountNumber: '110029104882',
        ifsc: 'CNRB0001100',
        ifscStatus: 'PENNY_DROP_MATCHED_100%',
        upiId: 'santosh.k@okaxis',
        panNumber: 'STKMR9021B',
        panStatus: 'VERIFIED_ACTIVE',
        kycStatus: 'APPROVED_BY_KYC_TL',
        status: 'OFFICER_VERIFIED',
        officerNote: 'Penny drop verified. Forwarded to TL Elena Vance.',
        verifiedByOfficer: 'Suresh Reddy (PAY-OFF-02)',
        requestedAt: '2026-08-24 11:15 AM'
      }
    },
    {
      agentId: 'AGT-PIN-600028',
      agentName: 'Karthik Raja',
      tier: 'PINCODE_AGENT',
      tierLabel: 'Pincode Tie-up Agent',
      jurisdiction: 'Pincode: 600028 (R.A. Puram, Chennai)',
      commissionPerReferral: 150.00,
      successfulReferralsCount: 28,
      calculationFormula: '28 Referrals × ₹150.00',
      lifetimeCommissionEarned: 4200.00,
      currentWalletBalance: 4200.00,
      payoutRequest: {
        payoutId: 'PAYOUT-REQ-106',
        requestedAmount: 4200.00,
        tdsDeduction: 210.00,
        netPayable: 3990.00,
        balanceAfterPayout: 0.00,
        bankName: 'State Bank of India',
        accountNumber: '20491829018',
        ifsc: 'SBIN0001824',
        ifscStatus: 'PENNY_DROP_MATCHED_100%',
        upiId: 'karthik.raja@oksbi',
        panNumber: 'KTRJA1102K',
        panStatus: 'VERIFIED_ACTIVE',
        kycStatus: 'APPROVED_BY_KYC_TL',
        status: 'OFFICER_VERIFIED',
        officerNote: 'Full wallet clearance request verified.',
        verifiedByOfficer: 'Suresh Reddy (PAY-OFF-02)',
        requestedAt: '2026-08-24 09:30 AM'
      }
    },
    {
      agentId: 'AGT-PIN-641001',
      agentName: 'Saravanan Muthu',
      tier: 'PINCODE_AGENT',
      tierLabel: 'Pincode Tie-up Agent',
      jurisdiction: 'Pincode: 641001 (Town Hall, Coimbatore)',
      commissionPerReferral: 150.00,
      successfulReferralsCount: 19,
      calculationFormula: '19 Referrals × ₹150.00',
      lifetimeCommissionEarned: 2850.00,
      currentWalletBalance: 2850.00,
      payoutRequest: null
    },

    // --- DISTRICT AGENTS (@ ₹50 / referral) ---
    {
      agentId: 'AGT-DIST-402',
      agentName: 'Prakash Rao',
      tier: 'DISTRICT_AGENT',
      tierLabel: 'District Coordinator',
      jurisdiction: 'District: Chennai North (180 Vendors)',
      commissionPerReferral: 50.00,
      successfulReferralsCount: 180,
      calculationFormula: '180 Referrals × ₹50.00',
      lifetimeCommissionEarned: 9000.00,
      currentWalletBalance: 9000.00,
      payoutRequest: {
        payoutId: 'PAYOUT-REQ-102',
        requestedAmount: 8000.00,
        tdsDeduction: 400.00,
        netPayable: 7600.00,
        balanceAfterPayout: 1000.00,
        bankName: 'Axis Bank',
        accountNumber: '918020038192',
        ifsc: 'UTIB0000042',
        ifscStatus: 'PENNY_DROP_MATCHED_100%',
        upiId: 'prakash.rao@okaxis',
        panNumber: 'PRKSH8819Q',
        panStatus: 'VERIFIED_ACTIVE',
        kycStatus: 'APPROVED_BY_KYC_TL',
        status: 'OFFICER_VERIFIED',
        officerNote: 'District tier calculation accurate. Forwarded for TL release.',
        verifiedByOfficer: 'Suresh Reddy (PAY-OFF-02)',
        requestedAt: '2026-08-24 10:15 AM'
      }
    },
    {
      agentId: 'AGT-DIST-501',
      agentName: 'Sanjay Gowda',
      tier: 'DISTRICT_AGENT',
      tierLabel: 'District Coordinator',
      jurisdiction: 'District: Bengaluru Urban (140 Vendors)',
      commissionPerReferral: 50.00,
      successfulReferralsCount: 140,
      calculationFormula: '140 Referrals × ₹50.00',
      lifetimeCommissionEarned: 7000.00,
      currentWalletBalance: 7000.00,
      payoutRequest: {
        payoutId: 'PAYOUT-REQ-108',
        requestedAmount: 5000.00,
        tdsDeduction: 250.00,
        netPayable: 4750.00,
        balanceAfterPayout: 2000.00,
        bankName: 'Kotak Mahindra Bank',
        accountNumber: '6810294812',
        ifsc: 'KKBK0000421',
        ifscStatus: 'PENNY_DROP_MATCHED_100%',
        upiId: 'sanjay.gowda@okkotak',
        panNumber: 'SNJGD4422E',
        panStatus: 'VERIFIED_ACTIVE',
        kycStatus: 'APPROVED_BY_KYC_TL',
        status: 'PENDING_OFFICER_AUDIT',
        officerNote: '',
        verifiedByOfficer: null,
        requestedAt: '2026-08-24 10:00 AM'
      }
    },

    // --- DIVISIONAL AGENTS (@ ₹50 / referral) ---
    {
      agentId: 'AGT-DIV-108',
      agentName: 'Meenakshi Sundaram',
      tier: 'DIVISIONAL_AGENT',
      tierLabel: 'Divisional Lead',
      jurisdiction: 'Division: North Tamil Nadu (300 Vendors)',
      commissionPerReferral: 50.00,
      successfulReferralsCount: 300,
      calculationFormula: '300 Referrals × ₹50.00',
      lifetimeCommissionEarned: 15000.00,
      currentWalletBalance: 15000.00,
      payoutRequest: {
        payoutId: 'PAYOUT-REQ-103',
        requestedAmount: 15000.00,
        tdsDeduction: 750.00,
        netPayable: 14250.00,
        balanceAfterPayout: 0.00,
        bankName: 'ICICI Bank',
        accountNumber: '002901884192',
        ifsc: 'ICIC0000029',
        ifscStatus: 'PENNY_DROP_MATCHED_100%',
        upiId: 'meenakshi.s@okaxis',
        panNumber: 'MNPQR9911A',
        panStatus: 'VERIFIED_ACTIVE',
        kycStatus: 'APPROVED_BY_KYC_TL',
        status: 'DISBURSED',
        officerNote: 'Verified and disbursed via IMPS #IMPS998822.',
        verifiedByOfficer: 'Suresh Reddy (PAY-OFF-02)',
        disbursedUtr: 'IMPS998822',
        disbursedAt: '2026-08-24 09:00 AM',
        requestedAt: '2026-08-24 08:15 AM'
      }
    },

    // --- STATE AGENTS (@ ₹50 / referral) ---
    {
      agentId: 'AGT-STATE-01',
      agentName: 'Dr. R. Natarajan',
      tier: 'STATE_AGENT',
      tierLabel: 'State Head Agent',
      jurisdiction: 'State: Tamil Nadu State (500 Vendors)',
      commissionPerReferral: 50.00,
      successfulReferralsCount: 500,
      calculationFormula: '500 Referrals × ₹50.00',
      lifetimeCommissionEarned: 25000.00,
      currentWalletBalance: 25000.00,
      payoutRequest: {
        payoutId: 'PAYOUT-REQ-104',
        requestedAmount: 25000.00,
        tdsDeduction: 1250.00,
        netPayable: 23750.00,
        balanceAfterPayout: 0.00,
        bankName: 'Axis Bank',
        accountNumber: '918020041829',
        ifsc: 'UTIB0000182',
        ifscStatus: 'PENNY_DROP_MATCHED_100%',
        upiId: 'dr.natarajan@okaxis',
        panNumber: 'STATE9922Z',
        panStatus: 'VERIFIED_ACTIVE',
        kycStatus: 'APPROVED_BY_KYC_TL',
        status: 'OFFICER_VERIFIED',
        officerNote: 'High value state agency pool release claim. Verified by Officer Suresh Reddy.',
        verifiedByOfficer: 'Suresh Reddy (PAY-OFF-02)',
        requestedAt: '2026-08-24 11:00 AM'
      }
    }
  ]);

  // --- 2. LIVE RECONCILIATION TRANSACTIONS QUEUE ---
  // --- 2. FINANCIAL PAYMENT OPERATIONS QUEUE & RECONCILIATION STREAM (MATCHES TL FORMAT) ---
  const [paymentQueueFilter, setPaymentQueueFilter] = useState<'WAITING_PAYMENT' | 'PAYMENT_VERIFICATION' | 'FAILED_PAYMENT' | 'PAYMENT_COMPLETED' | 'RECEIPT_PENDING' | 'CREDENTIAL_PENDING'>('WAITING_PAYMENT');
  const [paymentQueueList, setPaymentQueueList] = useState<any[]>([
    {
      id: 'PAY-8822',
      registrationId: 'REG-8822',
      customerName: 'David Miller',
      roleDetail: '(Customer Account)',
      applicantType: 'Customer Registration',
      phone: '+91 98841 00291',
      paymentAmount: '$99.00',
      paymentStatus: 'WAITING_PAYMENT',
      paymentMethod: 'Dynamic 30-Min Link (Attempt 1 Active)',
      aiStatus: 'Link 1 Active (21 Mins Remaining) • Pre-Link Call Completed',
      reminderCount: 1,
      currentWorkflow: 'KYC Cleared — Pre-Link Call 1 Done → 30-Min Checkout Link Active',
      kycReference: 'KYC-992'
    },
    {
      id: 'PAY-8824',
      registrationId: 'REG-8824',
      customerName: 'Muthukumar S',
      roleDetail: '(Field Agent)',
      applicantType: 'Agent Registration',
      phone: '+91 94432 88102',
      paymentAmount: '$250.00',
      paymentStatus: 'PAYMENT_VERIFICATION',
      paymentMethod: 'NEFT / IMPS Bank Transfer (SBIN26082400918)',
      aiStatus: 'OCR Match Pending • Officer Audit Req',
      reminderCount: 1,
      currentWorkflow: 'NEFT Receipt Uploaded → Officer Credit Verification',
      kycReference: 'KYC-994'
    },
    {
      id: 'PAY-8830',
      registrationId: 'REG-8830',
      customerName: 'Karthik Raja',
      roleDetail: '(Merchant Partner)',
      applicantType: 'Merchant Onboarding ($600.00)',
      phone: '+91 98401 22441',
      paymentAmount: '$600.00',
      paymentStatus: 'FAILED_PAYMENT',
      paymentMethod: 'UPI / Dynamic QR (2x 30-Min Links Expired)',
      aiStatus: '2x 30-Min Links Expired • 4 Voice Calls Attempted • Escalated to Officer',
      reminderCount: 4,
      currentWorkflow: '2x 30-Min Links Expired → Pending Payment Officer Direct Callback',
      kycReference: 'KYC-996'
    },
    {
      id: 'PAY-8831',
      registrationId: 'REG-8831',
      customerName: 'Sri Krishna Stores',
      roleDetail: '(Vendor Account)',
      applicantType: 'Vendor Registration',
      phone: '+91 98840 99281',
      paymentAmount: '$150.00',
      paymentStatus: 'FAILED_PAYMENT',
      paymentMethod: 'Google Pay UPI (Timeout)',
      aiStatus: 'Bank Gateway Dropped Session',
      reminderCount: 2,
      currentWorkflow: 'Payment Recovery & Retrigger Link',
      kycReference: 'KYC-998'
    },
    {
      id: 'PAY-8821',
      registrationId: 'REG-8821',
      customerName: 'Sophia Chen',
      roleDetail: '(Vendor Partner)',
      applicantType: 'Vendor Partner • Referred by AGT-INDIA-101',
      phone: '+91 98765 43210',
      paymentAmount: '$250.00',
      paymentStatus: 'PAYMENT_COMPLETED',
      paymentMethod: 'Stripe Corporate Card (•••• 4242)',
      aiStatus: 'UTR Match 100% • Receipt Generated',
      reminderCount: 0,
      currentWorkflow: 'KYC Verified → Payment Settled → Credentials Issued',
      kycReference: 'KYC-991'
    },
    {
      id: 'PAY-8825',
      registrationId: 'REG-8825',
      customerName: 'Vikram Mehta',
      roleDetail: '(Hospitality Permit)',
      applicantType: 'Vendor Partner • Hotel Permit Tier 1',
      phone: '+91 98409 33110',
      paymentAmount: '$500.00',
      paymentStatus: 'PAYMENT_COMPLETED',
      paymentMethod: 'Razorpay UPI NetBanking (HDFC000128)',
      aiStatus: 'Instant Clearance • PDF Invoice Sent',
      reminderCount: 0,
      currentWorkflow: 'KYC Cleared → $500 Onboarding Fee Paid → Portal Access Activated',
      kycReference: 'KYC-995'
    },
    {
      id: 'PAY-8823',
      registrationId: 'REG-8823',
      customerName: 'Kaveri Tex & Silks',
      roleDetail: '(Vendor Partner)',
      applicantType: 'Annual Catalog Renewal Fee',
      phone: '+91 98401 22441',
      paymentAmount: '$150.00',
      paymentStatus: 'RECEIPT_PENDING',
      paymentMethod: 'PayTM Dynamic QR',
      aiStatus: 'Payment Captured • Pending 18% GST Invoice',
      reminderCount: 1,
      currentWorkflow: 'Pending Official Tax Receipt',
      kycReference: 'KYC-993'
    }
  ]);

  // --- 2.1 PAYMENT OFFICER TAKEOVER CONSOLE STATE ---
  const [takeoverConsoleModal, setTakeoverConsoleModal] = useState<any | null>(null);
  const [takeoverLinkAmount, setTakeoverLinkAmount] = useState<string>('99.00');
  const [generatedDynamicCheckoutLink, setGeneratedDynamicCheckoutLink] = useState<string | null>(null);
  const [takeoverCustomerReceiptProof, setTakeoverCustomerReceiptProof] = useState<string | null>(null);
  const [takeoverReceiptAuditState, setTakeoverReceiptAuditState] = useState<'PENDING' | 'VERIFIED' | 'AI_TRANSFERRED'>('PENDING');

  // --- 2.2 OFFICIAL TAX INVOICE & PAYMENT RECEIPT MODAL STATE ---
  const [selectedReceiptItem, setSelectedReceiptItem] = useState<any | null>(null);

  const downloadReceiptFile = (item: any) => {
    const invoiceNo = `INV-2026-${item.registrationId || item.id || 'REG'}`;
    const amountVal = item.paymentAmount || '$250.00';
    const isAi = item.aiStatus?.includes('AI') || item.currentWorkflow?.includes('AI');
    const content = `========================================================================
           FORGE INDIA CONNECT PVT. LTD. - OFFICIAL TAX INVOICE
========================================================================
Invoice Number    : ${invoiceNo}
Date & Timestamp  : ${new Date().toLocaleString()}
Payment Status    : COMPLETED & SETTLED (100% RECONCILED)
Processing Engine : ${isAi ? 'AI-PAY-001 (Autonomous Finalizer Agent)' : 'Payment Human Officer (Suresh Reddy - PAY-OFF-02)'}

------------------------------------------------------------------------
CUSTOMER / APPLICANT DETAILS:
------------------------------------------------------------------------
Registration ID   : ${item.registrationId || item.id}
Name / Business   : ${item.customerName}
Applicant Type    : ${item.applicantType || 'Enterprise Partner'}
Contact Phone     : ${item.phone || '+91 98765 43210'}

------------------------------------------------------------------------
SETTLEMENT & PAYMENT TRANSACTION AUDIT:
------------------------------------------------------------------------
Payment Amount    : ${amountVal}
Payment Gateway   : ${item.paymentMethod || 'Razorpay UPI / Stripe Direct'}
Bank Reference/UTR: UTR-${item.registrationId || '8821'}-992019
GSTIN Compliance  : 33AAACF8821Q1Z4 (18% Integrated GST Cleared)
Commission Ledger : 4-Tier Automated Ledger Distribution Credited

------------------------------------------------------------------------
AUTHENTICATION SEAL:
------------------------------------------------------------------------
Digital Cryptographic Hash: SHA256:e89a42f8c9b011d8821a009418294cb
Authorized By: Forge India Treasury & Payment Settlement System
========================================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Official-Tax-Receipt-${item.registrationId || item.id || 'case'}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    if (showToast) showToast(`Downloaded official payment receipt for ${item.customerName} (${invoiceNo})!`);
  };

  const handleOpenTakeoverConsole = (item: any) => {
    setTakeoverConsoleModal(item);
    const numericAmt = (item.paymentAmount || '99.00').replace(/[^0-9.]/g, '');
    setTakeoverLinkAmount(numericAmt || '99.00');
    setGeneratedDynamicCheckoutLink(`https://pay.forgeindia.internal/checkout/30m-dyn-${item.registrationId || item.id || 'reg'}`);
    setTakeoverCustomerReceiptProof(item.receiptProof || `REC-PROOF-${item.registrationId || item.id || '8822'}.JPG (UTR #PUNB0291048822)`);
    setTakeoverReceiptAuditState(item.paymentStatus === 'PAYMENT_COMPLETED' ? 'AI_TRANSFERRED' : 'PENDING');
  };

  // Auto-open target case from Supervisor Ping
  useEffect(() => {
    if (targetPingCase) {
      const caseId = targetPingCase.ticketId || targetPingCase.id;
      const match = paymentQueueList.find(p => 
        p.id === caseId || 
        p.registrationId === caseId || 
        p.registrationId?.includes(caseId) ||
        (targetPingCase.customerName && p.customerName.toLowerCase().includes(targetPingCase.customerName.toLowerCase()))
      );
      if (match) {
        setPaymentQueueFilter(match.paymentStatus);
        handleOpenTakeoverConsole(match);
      } else {
        const fallback = paymentQueueList[0];
        if (fallback) {
          setPaymentQueueFilter(fallback.paymentStatus);
          handleOpenTakeoverConsole(fallback);
        }
      }
    }
  }, [targetPingCase]);

  // --- 4. PAYMENT AI AGENTS WORKFORCE & REAL-TIME PIPELINE TELEMETRY ---
  const [inspectingAiAgent, setInspectingAiAgent] = useState<any | null>(null);
  const [selectedPipelineCaseId, setSelectedPipelineCaseId] = useState<string>('REG-8822');
  const [pipelineSearchQuery, setPipelineSearchQuery] = useState<string>('');

  const [paymentAiWorkforce, setPaymentAiWorkforce] = useState<any[]>([
    {
      id: 'AI-INTAKE-001',
      name: 'KYC Ingestion & Dynamic Pricing Agent',
      engine: 'Gemini 1.5 Pro (Payload Validator)',
      status: 'IDLE',
      latency: '0.38s',
      concurrency: '0 / 25 Tasks',
      confidence: '99.9%',
      activeCaseId: 'STANDBY (Awaiting Ingestion)',
      currentWork: 'Listening on Redis event bus for verified KYC applicant payloads from KYC Human Officer. Validates identity tokens & calculates calibrated fee tiers ($99 customer / $150 agent).',
      nextStep: 'Upon receiving next KYC payload, compute registration fee token and dispatch handoff event to Dynamic Link & Voice Dialer Worker (AI-VOICE-004).',
      completedToday: 48,
      slaRate: '100%',
      thoughtLog: [
        '11:19:58 AM - Event listener active on queue: kyc.applicant.approved',
        '11:20:00 AM - Ingested token #TOK-8822-DYN for David Miller ($99.00). Fee tier calibrated to standard customer rate.',
        '11:20:01 AM - Dispatched fee token payload to AI-VOICE-004 worker. Standing by for next applicant payload.'
      ]
    },
    {
      id: 'AI-VOICE-004',
      name: 'Dynamic 30-Min Link & Outbound Voice Dialer Agent',
      engine: 'Twilio Media Stream + Gemini Live Voice Protocol',
      status: 'ACTIVE',
      latency: '1.12s',
      concurrency: '3 Active Calls',
      confidence: '98.8%',
      activeCaseId: 'REG-8822 (David Miller - $99.00)',
      currentWork: 'Executing automated outbound PSTN voice call to David Miller (+1 555 234-8899). Voice Call 1 answered (42s duration). Generated dynamic 30-min checkout link & dispatched via WhatsApp/SMS.',
      nextStep: 'Track 30-minute link TTL countdown (18m remaining). If unpaid at 10m reminder threshold, trigger Automated Voice Call 2. Escalate to Officer Suresh Reddy if TTL expires.',
      completedToday: 62,
      slaRate: '98.5%',
      thoughtLog: [
        '11:21:00 AM - Generated 30-min dynamic checkout link: https://pay.internal/30m-dyn-REG-8822 (TTL: 1800s).',
        '11:21:02 AM - Dispatched multi-channel notification (WhatsApp + SMS) with secure dynamic checkout link.',
        '11:21:05 AM - Triggered Twilio PSTN voice call to +1 555 234-8899. Call connected; IVR playback active (42s duration). Customer acknowledged link.'
      ]
    },
    {
      id: 'AI-UTR-002',
      name: 'Gateway Webhook & Specimen OCR UTR Matcher',
      engine: 'Vision OCR v3.1 + Bank Statement API Listener',
      status: 'ACTIVE',
      latency: '0.84s',
      concurrency: '1 Processing',
      confidence: '99.4%',
      activeCaseId: 'REG-8823 (Robert Sterling - $150.00)',
      currentWork: 'OCR scanning customer-uploaded deposit slip from WhatsApp for Robert Sterling ($150.00). Extracted Bank UTR #PUNB0291048822 with 99.4% optical confidence.',
      nextStep: 'Execute real-time API query against HDFC/ICICI Bank Statement Ledger to verify ₹150.00 credit parity. Once matched, trigger 1-click handoff to AI-FINALIZER-005.',
      completedToday: 39,
      slaRate: '99.1%',
      thoughtLog: [
        '10:46:12 AM - Webhook received WhatsApp image payload: REC-PROOF-8823.JPG.',
        '10:46:13 AM - Vision OCR extracted text: "PUNB0291048822" | Amount: "150.00" | Method: "IMPS Direct Wire".',
        '10:46:14 AM - Querying Bank Statement Settlement Feed: /api/v1/bank/audit?utr=PUNB0291048822. Standing by for ledger match confirmation.'
      ]
    },
    {
      id: 'AI-FINALIZER-005',
      name: 'Autonomous DB Finalizer & GST Tax Invoicing Agent',
      engine: 'Mongo Client Engine + GST Tax PDF Generator',
      status: 'ACTIVE',
      latency: '0.45s',
      concurrency: '2 Rendering',
      confidence: '100%',
      activeCaseId: 'REG-8821 (Sophia Chen - $250.00)',
      currentWork: 'Rendering official GST Tax Invoice PDF INV-2026-REG-8821 with QR code & digital cryptographic signature. Updating MongoDB user status from PENDING to ACTIVE.',
      nextStep: 'Calculate 4-tier commission breakdown (₹150 Pincode, ₹50 District, ₹50 Divisional, ₹50 State) & credit agent wallets. Dispatch branded Welcome Email & WhatsApp kit.',
      completedToday: 74,
      slaRate: '100%',
      thoughtLog: [
        '11:35:40 AM - Received UTR verified settlement confirmation for REG-8821 (Sophia Chen).',
        '11:35:41 AM - Executed MongoDB query: db.users.updateOne({ registrationId: "REG-8821" }, { $set: { status: "ACTIVE", paymentCleared: true } }).',
        '11:35:42 AM - Generated PDF receipt INV-2026-REG-8821.pdf (SHA256: e89a...21c). Queued Welcome Email & WhatsApp notification.'
      ]
    }
  ]);

  const [pipelineStatusFilter, setPipelineStatusFilter] = useState<string>('ALL');

  const pipelineCasesData: Record<string, {
    id: string;
    name: string;
    applicantType: string;
    amount: string;
    phone: string;
    channel: string;
    assignedOfficer?: string;
    overallStatus: string;
    currentStepNumber: number;
    totalSteps: number;
    progressPercent: number;
    activeAiWorker: string;
    kycStatus: 'PASSED' | 'IN_REVIEW' | 'FAILED';
    kycVerifiedBy: string;
    kycTimestamp: string;
    kycDetails: string;
    activeAiSummary: string;
    nextStepSummary: string;
    steps: {
      stepNum: number;
      shortTitle: string;
      title: string;
      workerId: string;
      status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING' | 'ESCALATED';
      timestamp: string;
      description: string;
      nextAction: string;
      payloadBadge: string;
    }[];
  }> = {
    'REG-8822': {
      id: 'REG-8822',
      name: 'David Miller',
      applicantType: 'Customer Registration ($99.00)',
      amount: '$99.00',
      phone: '+1 (555) 234-8899',
      channel: 'WhatsApp & SMS Dynamic Link',
      overallStatus: 'IN_PROGRESS',
      currentStepNumber: 2,
      totalSteps: 5,
      progressPercent: 40,
      activeAiWorker: 'AI-VOICE-004',
      kycStatus: 'PASSED',
      kycVerifiedBy: 'Marcus Thorne (Senior KYC TL)',
      kycTimestamp: 'Today 11:15 AM',
      kycDetails: 'Aadhaar XML + Live Facial Match 99.4% Verified',
      activeAiSummary: 'AI Voice Call 1 placed (42s answered) • 30-min checkout link active on WhatsApp & SMS (18m left).',
      nextStepSummary: 'Standing by for customer payment webhook or receipt upload. Trigger Call 2 at 10m reminder mark if unpaid.',
      steps: [
        {
          stepNum: 1,
          shortTitle: 'KYC Intake',
          title: 'Stage 1: KYC Intake & Fee Calculation',
          workerId: 'AI-INTAKE-001',
          status: 'COMPLETED',
          timestamp: '11:20 AM',
          description: 'KYC approved payload ingested from KYC TL Marcus Thorne. Standard customer fee ($99.00) calculated and assigned.',
          nextAction: 'Passed fee token to AI-VOICE-004 for dynamic link generation.',
          payloadBadge: 'Payload Validated'
        },
        {
          stepNum: 2,
          shortTitle: '30m Link & Call',
          title: 'Stage 2: 30-Min Link & Voice Call 1',
          workerId: 'AI-VOICE-004',
          status: 'IN_PROGRESS',
          timestamp: '11:21 AM (18m Left)',
          description: 'Dispatched 30-min dynamic link to WhatsApp & SMS. Voice Call 1 placed and answered (42s duration).',
          nextAction: 'Monitor 30-min TTL expiration. If unpaid after 10m, schedule automated Voice Call 2.',
          payloadBadge: 'AI Dialer Active'
        },
        {
          stepNum: 3,
          shortTitle: 'UTR / Webhook Match',
          title: 'Stage 3: Gateway Webhook & Bank UTR Match',
          workerId: 'AI-UTR-002',
          status: 'PENDING',
          timestamp: 'Upcoming',
          description: 'Standing by for customer checkout / UPI / card settlement webhook or deposit receipt upload.',
          nextAction: 'Scan incoming bank transaction UTR against statement ledger.',
          payloadBadge: 'Awaiting Payment'
        },
        {
          stepNum: 4,
          shortTitle: 'Reminders & SLA',
          title: 'Stage 4: Automated Reminders & SLA Guard',
          workerId: 'AI-VOICE-004',
          status: 'PENDING',
          timestamp: 'Scheduled 11:31 AM',
          description: 'Schedules Call 2 if unpaid at 10m. Re-issues link if expired at 30m.',
          nextAction: 'Escalate to Officer Suresh Reddy if second link expires without payment.',
          payloadBadge: 'Scheduled'
        },
        {
          stepNum: 5,
          shortTitle: 'Tax PDF & Activation',
          title: 'Stage 5: Final Database Activation & Tax PDF',
          workerId: 'AI-FINALIZER-005',
          status: 'PENDING',
          timestamp: 'Upcoming',
          description: 'Renders official Tax PDF receipt and activates user account in Database.',
          nextAction: 'Dispatch Welcome Email, WhatsApp kit, and credit 4-tier commission ledger.',
          payloadBadge: 'Final Queue'
        }
      ]
    },
    'REG-8823': {
      id: 'REG-8823',
      name: 'Robert Sterling',
      applicantType: 'Agent Partner ($150.00)',
      amount: '$150.00',
      phone: '+1 (555) 345-9922',
      channel: 'WhatsApp Deposit Slip Upload',
      overallStatus: 'IN_PROGRESS',
      currentStepNumber: 3,
      totalSteps: 5,
      progressPercent: 60,
      activeAiWorker: 'AI-UTR-002',
      kycStatus: 'PASSED',
      kycVerifiedBy: 'Ananya Sharma (KYC Officer)',
      kycTimestamp: 'Today 10:40 AM',
      kycDetails: 'Passport OCR + PAN Card NSBL Penny-Drop 100% Passed',
      activeAiSummary: 'Customer uploaded bank slip via WhatsApp • Scanning UTR #PUNB0291048822 • IMPS match 100%.',
      nextStepSummary: 'Verify ₹150.00 credit parity in Bank Ledger and hand off case to AI-FINALIZER-005 for PDF generation.',
      steps: [
        {
          stepNum: 1,
          shortTitle: 'KYC Intake',
          title: 'Stage 1: KYC Intake & Fee Calculation',
          workerId: 'AI-INTAKE-001',
          status: 'COMPLETED',
          timestamp: '10:45 AM',
          description: 'Agent tier verified. Tier 1 Agent Fee ($150.00) assigned.',
          nextAction: 'Generated token #TOK-8823-DYN for link dispatcher.',
          payloadBadge: 'Validated'
        },
        {
          stepNum: 2,
          shortTitle: '30m Link & Call',
          title: 'Stage 2: 30-Min Link & Voice Call 1',
          workerId: 'AI-VOICE-004',
          status: 'COMPLETED',
          timestamp: '10:46 AM',
          description: 'Dynamic link sent via WhatsApp. Applicant chose manual bank transfer option.',
          nextAction: 'Standing by for deposit slip upload webhook.',
          payloadBadge: 'Completed'
        },
        {
          stepNum: 3,
          shortTitle: 'UTR / Webhook Match',
          title: 'Stage 3: Gateway Webhook & Bank UTR Match',
          workerId: 'AI-UTR-002',
          status: 'IN_PROGRESS',
          timestamp: '10:47 AM',
          description: 'OCR scanning deposit slip. Extracted UTR #PUNB0291048822 (99.4% confidence).',
          nextAction: 'Run real-time API query against HDFC Bank statement ledger.',
          payloadBadge: 'OCR Processing'
        },
        {
          stepNum: 4,
          shortTitle: 'Reminders & SLA',
          title: 'Stage 4: Automated Reminders & SLA Guard',
          workerId: 'AI-VOICE-004',
          status: 'PENDING',
          timestamp: 'Upcoming',
          description: 'SLA timer active; no reminder call needed since receipt is under audit.',
          nextAction: 'Complete audit before 15-minute SLA cutoff.',
          payloadBadge: 'Standing By'
        },
        {
          stepNum: 5,
          shortTitle: 'Tax PDF & Activation',
          title: 'Stage 5: Final Database Activation & Tax PDF',
          workerId: 'AI-FINALIZER-005',
          status: 'PENDING',
          timestamp: 'Upcoming',
          description: 'Generate GST Tax Invoice INV-2026-REG-8823 and activate Agent Partner wallet.',
          nextAction: 'Credit ₹150 commission to parent district coordinator ledger.',
          payloadBadge: 'Final Queue'
        }
      ]
    },
    'REG-8821': {
      id: 'REG-8821',
      name: 'Sophia Chen',
      applicantType: 'Vendor Partner ($250.00)',
      amount: '$250.00',
      phone: '+91 98765 43210',
      channel: 'Razorpay UPI Webhook',
      overallStatus: 'COMPLETED',
      currentStepNumber: 5,
      totalSteps: 5,
      progressPercent: 100,
      activeAiWorker: 'AI-FINALIZER-005',
      kycStatus: 'PASSED',
      kycVerifiedBy: 'Marcus Thorne (Senior KYC TL)',
      kycTimestamp: 'Today 11:28 AM',
      kycDetails: 'GSTIN 33AAACF8821Q1Z4 + FSSAI License 100% Cleared',
      activeAiSummary: 'Payment fully cleared ($250.00) • Tax PDF INV-2026-REG-8821 generated • Account Active.',
      nextStepSummary: 'All automated steps successfully completed. Case archived in Enterprise Vault.',
      steps: [
        {
          stepNum: 1,
          shortTitle: 'KYC Intake',
          title: 'Stage 1: KYC Intake & Fee Calculation',
          workerId: 'AI-INTAKE-001',
          status: 'COMPLETED',
          timestamp: '11:30 AM',
          description: 'Vendor Partner KYC verified. Fee calculated: $250.00.',
          nextAction: 'Dispatched to link generator.',
          payloadBadge: 'Validated'
        },
        {
          stepNum: 2,
          shortTitle: '30m Link & Call',
          title: 'Stage 2: 30-Min Link & Voice Call 1',
          workerId: 'AI-VOICE-004',
          status: 'COMPLETED',
          timestamp: '11:31 AM',
          description: 'Dynamic payment link sent via WhatsApp & SMS.',
          nextAction: 'Awaiting customer gateway checkout.',
          payloadBadge: 'Dispatched'
        },
        {
          stepNum: 3,
          shortTitle: 'UTR / Webhook Match',
          title: 'Stage 3: Gateway Webhook & Bank UTR Match',
          workerId: 'AI-UTR-002',
          status: 'COMPLETED',
          timestamp: '11:34 AM',
          description: 'Webhook confirmed Razorpay settlement (UTR #RZP-9920194821).',
          nextAction: 'Handoff to AI-FINALIZER-005.',
          payloadBadge: '100% Match'
        },
        {
          stepNum: 4,
          shortTitle: 'Reminders & SLA',
          title: 'Stage 4: Automated Reminders & SLA Guard',
          workerId: 'AI-VOICE-004',
          status: 'COMPLETED',
          timestamp: '11:34 AM',
          description: 'Payment cleared within 4 minutes. Reminder calls bypassed.',
          nextAction: 'SLA timer marked resolved.',
          payloadBadge: 'SLA Met'
        },
        {
          stepNum: 5,
          shortTitle: 'Tax PDF & Activation',
          title: 'Stage 5: Final Database Activation & Tax PDF',
          workerId: 'AI-FINALIZER-005',
          status: 'COMPLETED',
          timestamp: '11:35 AM',
          description: 'Generated Tax PDF receipt INV-2026-REG-8821. Account activated in MongoDB.',
          nextAction: 'Commission ledger distributed. Welcome kit dispatched.',
          payloadBadge: 'Fully Settled'
        }
      ]
    },
    'REG-8824': {
      id: 'REG-8824',
      name: 'Alexander Wright',
      applicantType: 'Divisional Agent ($350.00)',
      amount: '$350.00',
      phone: '+1 (555) 456-7890',
      channel: 'SMS Dynamic Link',
      overallStatus: 'IN_PROGRESS',
      currentStepNumber: 1,
      totalSteps: 5,
      progressPercent: 20,
      activeAiWorker: 'AI-INTAKE-001',
      kycStatus: 'PASSED',
      kycVerifiedBy: 'Marcus Thorne (Senior KYC TL)',
      kycTimestamp: 'Today 11:38 AM',
      kycDetails: 'Government ID + Background Police Verification 100% Passed',
      activeAiSummary: 'KYC clearance ingested • Calculating Tier 3 Divisional Fee token ($350.00).',
      nextStepSummary: 'Generate 30-min Dynamic Checkout Link and dispatch via Twilio Voice Call & SMS.',
      steps: [
        {
          stepNum: 1,
          shortTitle: 'KYC Intake',
          title: 'Stage 1: KYC Intake & Fee Calculation',
          workerId: 'AI-INTAKE-001',
          status: 'IN_PROGRESS',
          timestamp: '11:39 AM',
          description: 'Validating KYC certificate hash and calculating $350 fee token.',
          nextAction: 'Dispatch token to AI-VOICE-004 for link creation.',
          payloadBadge: 'Calculating'
        },
        {
          stepNum: 2,
          shortTitle: '30m Link & Call',
          title: 'Stage 2: 30-Min Link & Voice Call 1',
          workerId: 'AI-VOICE-004',
          status: 'PENDING',
          timestamp: 'Upcoming',
          description: 'Will trigger Voice Call 1 to Alexander (+1 555 456-7890).',
          nextAction: 'Monitor 30m link expiration countdown.',
          payloadBadge: 'Queued'
        },
        {
          stepNum: 3,
          shortTitle: 'UTR / Webhook Match',
          title: 'Stage 3: Gateway Webhook & Bank UTR Match',
          workerId: 'AI-UTR-002',
          status: 'PENDING',
          timestamp: 'Upcoming',
          description: 'Awaiting webhook response.',
          nextAction: 'Scan incoming bank transaction.',
          payloadBadge: 'Awaiting'
        },
        {
          stepNum: 4,
          shortTitle: 'Reminders & SLA',
          title: 'Stage 4: Automated Reminders & SLA Guard',
          workerId: 'AI-VOICE-004',
          status: 'PENDING',
          timestamp: 'Upcoming',
          description: 'SLA reminder schedule.',
          nextAction: 'Trigger Call 2 if unpaid at 10m.',
          payloadBadge: 'Scheduled'
        },
        {
          stepNum: 5,
          shortTitle: 'Tax PDF & Activation',
          title: 'Stage 5: Final Database Activation & Tax PDF',
          workerId: 'AI-FINALIZER-005',
          status: 'PENDING',
          timestamp: 'Upcoming',
          description: 'Activate Divisional Partner credentials.',
          nextAction: 'Issue Tax Invoice PDF.',
          payloadBadge: 'Final Queue'
        }
      ]
    },
    'REG-8825': {
      id: 'REG-8825',
      name: 'Priya Sundaram',
      applicantType: 'Pincode Agent ($99.00)',
      amount: '₹99.00',
      phone: '+91 94441 88321',
      channel: 'WhatsApp Dynamic Link',
      overallStatus: 'COMPLETED',
      currentStepNumber: 5,
      totalSteps: 5,
      progressPercent: 100,
      activeAiWorker: 'AI-FINALIZER-005',
      kycStatus: 'PASSED',
      kycVerifiedBy: 'Ananya Sharma (KYC Officer)',
      kycTimestamp: 'Today 09:50 AM',
      kycDetails: 'Aadhaar XML + Bank Passbook Penny-Drop Verified',
      activeAiSummary: 'Payment Settled via UPI • Tax Invoice INV-2026-REG-8825 generated • Wallet ₹150 Credited.',
      nextStepSummary: 'Account fully operational. Pincode 600001 mapping active.',
      steps: [
        {
          stepNum: 1,
          shortTitle: 'KYC Intake',
          title: 'Stage 1: KYC Intake & Fee Calculation',
          workerId: 'AI-INTAKE-001',
          status: 'COMPLETED',
          timestamp: '09:52 AM',
          description: 'Pincode Agent KYC Verified. Fee: ₹99.00.',
          nextAction: 'Link generated.',
          payloadBadge: 'Validated'
        },
        {
          stepNum: 2,
          shortTitle: '30m Link & Call',
          title: 'Stage 2: 30-Min Link & Voice Call 1',
          workerId: 'AI-VOICE-004',
          status: 'COMPLETED',
          timestamp: '09:53 AM',
          description: 'WhatsApp link sent. Customer opened within 30 seconds.',
          nextAction: 'Awaiting UPI checkout.',
          payloadBadge: 'Opened'
        },
        {
          stepNum: 3,
          shortTitle: 'UTR / Webhook Match',
          title: 'Stage 3: Gateway Webhook & Bank UTR Match',
          workerId: 'AI-UTR-002',
          status: 'COMPLETED',
          timestamp: '09:56 AM',
          description: 'UPI Webhook confirmed settlement (UTR #UPI-4401928831).',
          nextAction: 'Hand off to Finalizer.',
          payloadBadge: 'Matched'
        },
        {
          stepNum: 4,
          shortTitle: 'Reminders & SLA',
          title: 'Stage 4: Automated Reminders & SLA Guard',
          workerId: 'AI-VOICE-004',
          status: 'COMPLETED',
          timestamp: '09:56 AM',
          description: 'Settled within 3m. Reminders bypassed.',
          nextAction: 'SLA closed.',
          payloadBadge: 'Bypassed'
        },
        {
          stepNum: 5,
          shortTitle: 'Tax PDF & Activation',
          title: 'Stage 5: Final Database Activation & Tax PDF',
          workerId: 'AI-FINALIZER-005',
          status: 'COMPLETED',
          timestamp: '09:57 AM',
          description: 'Tax Invoice INV-2026-REG-8825 generated. User active in DB.',
          nextAction: 'Sent welcome WhatsApp message.',
          payloadBadge: 'Completed'
        }
      ]
    }
  };

  // --- 3. LIVE PAYMENT SUPPORT TICKETS STREAM ---
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
  const [ticketReplyText, setTicketReplyText] = useState('');
  const [paymentTicketsList, setPaymentTicketsList] = useState<any[]>([
    {
      ticketId: 'TCK-PAY-8821',
      relatedTxnId: 'TXN-RZP-99201',
      customerName: 'Sophia Chen',
      phone: '+91-98765-43210',
      accountType: 'Vendor Partner • Referral by AGT-PIN-600001',
      amount: '₹600.00',
      category: 'Agent Onboarding Fee Refund Policy Terms',
      channel: 'CHAT_WEB',
      aiAgent: 'Payment AI (Gemini 1.5 Pro)',
      aiConfidence: 99.4,
      sentiment: 'NEUTRAL',
      status: 'LIVE_AI', // 'LIVE_AI' | 'HUMAN_INTERCEPTED' | 'RESOLVED'
      duration: '1m 24s',
      slaCountdown: '12m remaining',
      preview: 'If your KYC is not approved, 100% of your onboarding fee will be refunded.',
      chatHistory: [
        { sender: 'CUSTOMER', text: 'Hello, I wanted to know the refund terms if my agent registration is rejected.' },
        { sender: 'AI', text: 'Hello Sophia! If your agent KYC verification is not approved, your onboarding fee is 100% refunded to the original payment source within 3-5 business days.' },
        { sender: 'CUSTOMER', text: 'What if I cancel it manually after 2 days?' }
      ]
    },
    {
      ticketId: 'TCK-PAY-8822',
      relatedTxnId: 'TXN-RZP-99202',
      customerName: 'David Miller',
      phone: '+91-98841-00291',
      accountType: 'Enterprise Vendor (Apex Precision)',
      amount: '₹1,500.00',
      category: 'Invoice & GST Input Credit Advisory',
      channel: 'WHATSAPP',
      aiAgent: 'Payment AI (WhatsApp)',
      aiConfidence: 96.8,
      sentiment: 'POSITIVE',
      status: 'LIVE_AI',
      duration: '2m 10s',
      slaCountdown: '25m remaining',
      preview: 'Tax Invoice with GSTIN 29AABCU9603R1ZM has been generated.',
      chatHistory: [
        { sender: 'CUSTOMER', text: 'Can I get the B2B tax invoice with our company GSTIN for the ₹1,500 onboarding package?' },
        { sender: 'AI', text: 'Certainly David! Your B2B tax invoice with 18% GST credit has been generated and emailed to your registered address.' }
      ]
    },
    {
      ticketId: 'TCK-PAY-8823',
      relatedTxnId: 'TXN-RZP-99204',
      customerName: 'Annapurna Sweets (K. Raman)',
      phone: '+91-97722-11440',
      accountType: 'Vendor Partner (Pincode: 641001)',
      amount: '₹600.00',
      category: 'UPI Intent Gateway Pending Confirmation',
      channel: 'CHAT_WEB',
      aiAgent: 'Payment AI (Gemini 1.5 Pro)',
      aiConfidence: 78.2,
      sentiment: 'FRUSTRATED',
      status: 'HUMAN_INTERCEPTED',
      duration: '3m 45s',
      slaCountdown: '5m (NEAR BREACH)',
      preview: 'Amount debited from GPay but status shows pending. Please confirm.',
      chatHistory: [
        { sender: 'CUSTOMER', text: 'Money got debited from my GPay but my vendor registration still says payment pending!' },
        { sender: 'AI', text: 'We detected your bank transaction attempt. Cashfree gateway is awaiting bank confirmation UTR.' },
        { sender: 'CUSTOMER', text: 'Please check quickly. UTR is 48291048291.' }
      ]
    },
    {
      ticketId: 'TCK-PAY-8824',
      relatedTxnId: 'PAYOUT-REQ-101',
      customerName: 'Raju Vignesh (Field Agent)',
      phone: '+91-94451-99201',
      accountType: 'Pincode Agent (AGT-PIN-600001)',
      amount: '₹4,500.00',
      category: 'Wallet Withdrawal Payout Timeline',
      channel: 'VOICE_TWILIO',
      aiAgent: 'Payment AI (Twilio Voice)',
      aiConfidence: 98.0,
      sentiment: 'POSITIVE',
      status: 'RESOLVED',
      duration: '50s',
      slaCountdown: 'SLA MET',
      preview: 'Your withdrawal request of ₹4,500 has been verified by Payment Officer.',
      chatHistory: [
        { sender: 'AGENT', text: 'When will my ₹4,500 referral commission withdrawal be sent to my HDFC account?' },
        { sender: 'AI', text: 'Hello Raju! Your bank account and 5% TDS have been verified by Officer Suresh Reddy. Disbursal will execute today at 12:00 PM.' }
      ]
    },
    {
      ticketId: 'TCK-PAY-8825',
      relatedTxnId: 'TXN-RZP-99203',
      customerName: 'Kaveri Tex & Silks',
      phone: '+91-98401-22441',
      accountType: 'Vendor Partner (R.A. Puram)',
      amount: '₹600.00',
      category: 'Annual Renewal & Commission Confirmation',
      channel: 'WHATSAPP',
      aiAgent: 'Payment AI (WhatsApp)',
      aiConfidence: 99.1,
      sentiment: 'POSITIVE',
      status: 'LIVE_AI',
      duration: '1m 10s',
      slaCountdown: '18m remaining',
      preview: 'Payment captured successfully. Welcome to Forge India Connect!',
      chatHistory: [
        { sender: 'CUSTOMER', text: 'Thanks, my payment of ₹600 is complete. How do I start uploading my catalog?' },
        { sender: 'AI', text: 'Welcome Kaveri Tex! Your catalog portal is now active. Agent Karthik Raja has been credited with your tie-up commission.' }
      ]
    }
  ]);

  // --- 4. PAYMENT ESCALATIONS ASSIGNED BY PAYMENT TEAM LEAD ---
  const [escalationsList, setEscalationsList] = useState<any[]>([
    {
      id: 'ESC-PAY-01',
      caseId: 'PAY-TL-ESC-101',
      agentName: 'Muthukumar S (AGT-PIN-625001)',
      type: 'Bank Penny-Drop Name Partial Mismatch Investigation',
      details: 'PAN Name: "Muthukumar Subramanian" vs Bank CBS: "MUTHU S". AI confidence score: 74%.',
      escalatedBy: 'Elena Vance (Payment Team Lead)',
      escalatedAt: 'Today, 10:30 AM',
      supervisorDirective: 'Suresh, please review the uploaded cancelled cheque image against the IFSC code and manually clear the bank name match for payout release.',
      severity: 'HIGH',
      slaRemaining: '35m remaining',
      status: 'ESCALATED_BY_TL'
    },
    {
      id: 'ESC-PAY-02',
      caseId: 'PAY-TL-ESC-102',
      agentName: 'Global Exotics Impex (VND-8821)',
      type: 'High-Value Enterprise Payment Hold Verification',
      details: 'Enterprise vendor registration fee of ₹15,000 paid via NetBanking. Gateway ACK pending UTR validation.',
      escalatedBy: 'Elena Vance (Payment Team Lead)',
      escalatedAt: 'Today, 09:15 AM',
      supervisorDirective: 'Suresh, verify bank statement credit in Treasury portal, validate GST invoice, and release commission split upon confirmation.',
      severity: 'CRITICAL',
      slaRemaining: '15m (Urgent)',
      status: 'ESCALATED_BY_TL'
    },
    {
      id: 'ESC-PAY-03',
      caseId: 'PAY-TL-ESC-103',
      agentName: 'Venkatesh Prasad (AGT-DIV-202)',
      type: 'Divisional Payout 5% TDS Withholding Audit',
      details: 'Divisional revenue share claim of ₹28,500. Agent requested manual review of TDS Form 16 credit calculation.',
      escalatedBy: 'Elena Vance (Payment Team Lead)',
      escalatedAt: 'Today, 08:30 AM',
      supervisorDirective: 'Suresh, verify PAN card active status on NSDL and confirm 5% TDS (₹1,425) computation before forwarding back for disbursal.',
      severity: 'MEDIUM',
      slaRemaining: '1h 10m remaining',
      status: 'ESCALATED_BY_TL'
    }
  ]);

  // --- 5. MANUAL VOICE REMINDERS & DIALER ---
  const [dialerNumber, setDialerNumber] = useState('+91 98765 43210');
  const [callActive, setCallActive] = useState(false);
  const [callTimer, setCallTimer] = useState(0);

  // --- 6. SHIFT NOTES ---
  const [shiftNotes, setShiftNotes] = useState<any[]>([
    { id: 'NOTE-01', text: 'All Tier 1 Pincode payouts <= ₹5,000 audited and penny-drop verified for today.', author: 'Suresh Reddy (PAY-OFF-02)', time: '11:45 AM' },
    { id: 'NOTE-02', text: 'Forwarded 3 High-Value Payout claims (₹55,500) to Team Lead Elena Vance.', author: 'Suresh Reddy (PAY-OFF-02)', time: '11:15 AM' }
  ]);
  const [newNoteText, setNewNoteText] = useState('');

  // Payout Handlers
  const handleVerifyAndForwardToTL = (payout: any) => {
    setOfficerAgentList((prev: any[]) => prev.map((a: any) => {
      if (a.payoutRequest?.payoutId === payout.payoutId) {
        return {
          ...a,
          payoutRequest: {
            ...a.payoutRequest,
            status: 'OFFICER_VERIFIED',
            officerNote: auditNote || 'Bank account and IFSC verified via penny-drop. PAN 5% TDS validated. Forwarded to TL Elena Vance.',
            verifiedByOfficer: 'Suresh Reddy (PAY-OFF-02)'
          }
        };
      }
      return a;
    }));
    if (showToast) showToast(`Verified Bank & TDS for ${payout.agentName} (${payout.payoutId}). Forwarded to TL Elena Vance.`);
    setSelectedPayout(null);
    setAuditNote('');
  };

  const handleDirectDisburse = (payout: any) => {
    setOfficerAgentList((prev: any[]) => prev.map((a: any) => {
      if (a.payoutRequest?.payoutId === payout.payoutId) {
        return {
          ...a,
          currentWalletBalance: a.payoutRequest.balanceAfterPayout,
          payoutRequest: {
            ...a.payoutRequest,
            status: 'DISBURSED',
            disbursedUtr: `IMPS${Math.floor(100000 + Math.random() * 900000)}`,
            disbursedAt: 'Just Now',
            officerNote: auditNote || 'Standard payout (<= ₹5,000) verified and instantly disbursed by Officer Suresh Reddy.',
            verifiedByOfficer: 'Suresh Reddy (PAY-OFF-02)'
          }
        };
      }
      return a;
    }));
    if (showToast) showToast(`Disbursed ₹${payout.netPayable} to ${payout.agentName} via IMPS!`);
    setSelectedPayout(null);
    setAuditNote('');
  };

  const handleFlagDiscrepancy = (payout: any) => {
    setOfficerAgentList((prev: any[]) => prev.map((a: any) => {
      if (a.payoutRequest?.payoutId === payout.payoutId) {
        return {
          ...a,
          payoutRequest: {
            ...a.payoutRequest,
            status: 'FLAGGED_DISCREPANCY',
            officerNote: auditNote || 'Flagged for bank account / PAN mismatch discrepancy.'
          }
        };
      }
      return a;
    }));
    if (showToast) showToast(`Flagged payout claim ${payout.payoutId} for discrepancy review.`);
    setSelectedPayout(null);
    setAuditNote('');
  };

  const pendingOfficerCount = officerAgentList.filter((a: any) => a.payoutRequest?.status === 'PENDING_OFFICER_AUDIT').length;
  const verifiedOfficerCount = officerAgentList.filter((a: any) => a.payoutRequest?.status === 'OFFICER_VERIFIED').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%', padding: '1rem' }}>
      
      {/* 1. OFFICER SHIFT HEADER & KPI BAR */}
      <div className="glass-panel" style={{ padding: '1.25rem', background: 'var(--bg-surface)', border: '1.5px solid #0284c7', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(2, 132, 199, 0.2)', border: '1.5px solid #0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                      </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
                Payment Human Settlement Officer Desk
              </h3>
              <span className="badge badge-success" style={{ fontSize: '0.68rem' }}>ACTIVE SHIFT</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>
              Assigned Officer: <strong style={{ color: 'var(--text-brand)' }}>Suresh Reddy (PAY-OFF-02)</strong> • Supervisor: <strong>Elena Vance (Payment TL)</strong> • Desk: <strong>Live Reconciliation, Agent Wallets & Settlement</strong>
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            className={`btn ${activeSubTab === 'AI_WORKFORCE_MONITOR' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => onSelectSubTab && onSelectSubTab('AI_WORKFORCE_MONITOR')}
            style={{
              fontSize: '0.72rem',
              padding: '0.45rem 0.85rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: activeSubTab === 'AI_WORKFORCE_MONITOR' ? 'linear-gradient(135deg, #0284c7, #10b981)' : 'rgba(2, 132, 199, 0.1)',
              borderColor: '#0284c7',
              color: activeSubTab === 'AI_WORKFORCE_MONITOR' ? '#fff' : '#38bdf8'
            }}
          >
            <Cpu size={15} />
            <span>Payment AI Workforce (4 Online)</span>
          </button>

          <span className="badge badge-primary" style={{ fontSize: '0.72rem', padding: '0.45rem 0.8rem' }}>
            {officerAgentList.length} Active Agent Wallets
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FINANCIAL PAYMENT OPERATIONS QUEUE DESK (IDENTICAL TO SCREENSHOT 1)       */}
      {/* ========================================================================= */}
      {(activeSubTab === 'AGENT_DESK' || activeSubTab === 'OVERVIEW' || activeSubTab === 'LIVE_QUEUE') && (
        <div className="glass-panel" style={{ padding: '1.25rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Header & Segmented Filter Pills */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, color: 'var(--text-emerald)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CreditCard size={20} /> Financial Payment Operations Queue Desk
              </h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>
                Track Waiting Payments, Verification Audits, Failed Transactions, Reconciled Payments, Receipts & Credential Provisioning
              </p>
            </div>

            {/* Horizontal Filter Buttons */}
            <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
              {(['WAITING_PAYMENT', 'PAYMENT_VERIFICATION', 'FAILED_PAYMENT', 'PAYMENT_COMPLETED', 'RECEIPT_PENDING', 'CREDENTIAL_PENDING'] as const).map(st => {
                const count = paymentQueueList.filter(p => p.paymentStatus === st).length;
                const isActive = paymentQueueFilter === st;
                return (
                  <button
                    key={st}
                    className={`btn ${isActive ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setPaymentQueueFilter(st)}
                    style={{
                      fontSize: '0.65rem',
                      padding: '0.3rem 0.6rem',
                      fontWeight: 700,
                      background: isActive ? 'var(--accent-primary)' : 'transparent',
                      color: isActive ? '#ffffff' : 'var(--text-main)',
                      borderColor: isActive ? 'var(--accent-primary)' : 'var(--border-color)'
                    }}
                  >
                    {st.replace(/_/g, ' ')} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Queue Table */}
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <table className="custom-table" style={{ fontSize: '0.75rem', width: '100%' }}>
              <thead>
                <tr>
                  <th>REGISTRATION ID</th>
                  <th>CUSTOMER / VENDOR / AGENT</th>
                  <th>PAYMENT AMOUNT</th>
                  <th>PAYMENT STATUS</th>
                  <th>PAYMENT METHOD</th>
                  <th>AI ENGINE STATUS</th>
                  <th>REMINDERS</th>
                  <th>CURRENT WORKFLOW</th>
                  <th style={{ textAlign: 'right' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {paymentQueueList
                  .filter(p => p.paymentStatus === paymentQueueFilter)
                  .map((item) => (
                    <tr key={item.id}>
                      <td><div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><code>{item.registrationId}</code> <TicketVisionButton ticket={{ id: item.id, ticketNumber: item.registrationId, customerName: item.customerName, departmentLabel: 'Payment', status: item.paymentStatus, isEscalated: item.paymentStatus === 'FAILED_PAYMENT' }} compact size="sm" /></div></td>
                      <td>
                        <strong>{item.customerName}</strong>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{item.roleDetail}</div>
                        <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{item.applicantType}</span>
                      </td>
                      <td><strong style={{ color: 'var(--text-emerald)', fontSize: '0.85rem' }}>{item.paymentAmount}</strong></td>
                      <td>
                        <span className="badge" style={{
                          fontSize: '0.65rem',
                          background: item.paymentStatus === 'PAYMENT_COMPLETED' ? '#dcfce7' : item.paymentStatus === 'FAILED_PAYMENT' ? '#fee2e2' : item.paymentStatus === 'PAYMENT_VERIFICATION' ? '#e0f2fe' : '#fef3c7',
                          color: item.paymentStatus === 'PAYMENT_COMPLETED' ? '#166534' : item.paymentStatus === 'FAILED_PAYMENT' ? '#991b1b' : item.paymentStatus === 'PAYMENT_VERIFICATION' ? '#075985' : '#92400e',
                          border: `1px solid ${item.paymentStatus === 'PAYMENT_COMPLETED' ? '#86efac' : item.paymentStatus === 'FAILED_PAYMENT' ? '#fca5a5' : item.paymentStatus === 'PAYMENT_VERIFICATION' ? '#7dd3fc' : '#fde68a'}`,
                          fontWeight: 700
                        }}>
                          {item.paymentStatus}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.72rem' }}>{item.paymentMethod}</td>
                      <td style={{ fontSize: '0.72rem', color: 'var(--text-brand)' }}>{item.aiStatus}</td>
                      <td><span className="badge badge-secondary" style={{ fontSize: '0.65rem' }}>{item.reminderCount} CALL(S) MADE</span></td>
                      <td style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{item.currentWorkflow}</td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '0.25rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                          {item.paymentStatus === 'PAYMENT_COMPLETED' ? (
                            <>
                              <button
                                className="btn btn-primary"
                                onClick={() => setSelectedReceiptItem(item)}
                                style={{ fontSize: '0.62rem', padding: '0.15rem 0.45rem', background: '#10b981', borderColor: '#10b981', fontWeight: 800 }}
                                title="View official tax compliant invoice & receipt"
                              >
                                View Receipt
                              </button>
                              <button
                                className="btn btn-secondary"
                                onClick={() => downloadReceiptFile(item)}
                                style={{ fontSize: '0.62rem', padding: '0.15rem 0.4rem', color: '#0284c7', borderColor: '#0284c7', fontWeight: 700 }}
                                title="Download invoice receipt document"
                              >
                                Download
                              </button>
                            </>
                          ) : (
                            <button
                              className="btn btn-primary"
                              onClick={() => handleOpenTakeoverConsole(item)}
                              style={{ fontSize: '0.62rem', padding: '0.15rem 0.45rem', background: '#0284c7', borderColor: '#0284c7', fontWeight: 800 }}
                            >
                              Takeover
                            </button>
                          )}
                          <button
                            className="btn btn-secondary"
                            onClick={() => {
                              setPaymentQueueList(prev => prev.map(p => p.id === item.id ? { ...p, reminderCount: p.reminderCount + 1 } : p));
                              setDialerNumber(item.phone || '+91 98765 43210');
                              if (onSelectSubTab) onSelectSubTab('PAYMENT_REMINDERS');
                              if (showToast) showToast(`Triggered Outbound Voice Reminder Call for ${item.customerName}.`);
                            }}
                            style={{ fontSize: '0.62rem', padding: '0.15rem 0.35rem', borderColor: 'var(--text-cyan)', color: 'var(--text-cyan)' }}
                          >
                            Voice Call
                          </button>
                          <button
                            className="btn btn-secondary"
                            onClick={() => {
                              if (showToast) showToast(`Viewing audit timeline for ${item.registrationId}.`);
                            }}
                            style={{ fontSize: '0.62rem', padding: '0.15rem 0.35rem' }}
                          >
                            Timeline
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}



      {/* ========================================================================= */}
      {/* SUBTAB: LIVE PAYMENT AI WORKFORCE & REAL-TIME PIPELINE MONITOR            */}
      {/* ========================================================================= */}
      {(activeSubTab === 'AI_WORKFORCE_MONITOR' || activeSubTab === 'PAYMENT_AI_PIPELINE') && (() => {
        const activeCase = pipelineCasesData[selectedPipelineCaseId] || pipelineCasesData['REG-8822'];
        const filteredCasesKeys = Object.keys(pipelineCasesData).filter(key => {
          const c = pipelineCasesData[key];
          const q = pipelineSearchQuery.toLowerCase();
          return c.id.toLowerCase().includes(q) || c.name.toLowerCase().includes(q) || c.applicantType.toLowerCase().includes(q);
        });

        return (
          <div className="glass-panel" style={{ padding: '1.25rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Top Telemetry Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.85rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Cpu size={22} color="#0284c7" /> Live Payment AI Workforce & End-to-End Pipeline Monitor
                </h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.25rem 0 0 0' }}>
                  Real-time visibility into all active Payment AI Agents: what each AI is currently executing, next pipeline action, latency, and step-by-step case tracking.
                </p>
              </div>

              {/* KPI Pills */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <div style={{ background: 'rgba(2, 132, 199, 0.1)', border: '1px solid #0284c7', borderRadius: '8px', padding: '0.35rem 0.65rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', display: 'block' }}>ONLINE AI WORKERS</span>
                  <strong style={{ fontSize: '0.85rem', color: '#0284c7' }}>4 Active Agents</strong>
                </div>
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', borderRadius: '8px', padding: '0.35rem 0.65rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', display: 'block' }}>CURRENT WORKLOAD</span>
                  <strong style={{ fontSize: '0.85rem', color: '#10b981' }}>3 Active • 1 Standby</strong>
                </div>
                <div style={{ background: 'rgba(139, 92, 246, 0.1)', border: '1px solid #8b5cf6', borderRadius: '8px', padding: '0.35rem 0.65rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', display: 'block' }}>AVG AI LATENCY</span>
                  <strong style={{ fontSize: '0.85rem', color: '#8b5cf6' }}>0.69s / Task</strong>
                </div>
                <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid #f59e0b', borderRadius: '8px', padding: '0.35rem 0.65rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', display: 'block' }}>AUTO SETTLEMENT</span>
                  <strong style={{ fontSize: '0.85rem', color: '#f59e0b' }}>96.4% Success</strong>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* SECTION 1: ACTIVE PAYMENT AI AGENTS FLEET GRID (4 AGENTS)              */}
            {/* ========================================================================= */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h5 style={{ fontSize: '0.85rem', fontWeight: 800, margin: 0, color: 'var(--text-cyan)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Activity size={16} /> 1. Live Payment AI Agents Fleet Status & Real-Time Tasks
                </h5>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                  Auto-refreshed via WebSockets every 1.5s
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
                {paymentAiWorkforce.map(agent => (
                  <div
                    key={agent.id}
                    className="glass-panel"
                    style={{
                      background: 'var(--bg-dark)',
                      border: `1.5px solid ${agent.status === 'ACTIVE' ? '#0284c7' : 'var(--border-color)'}`,
                      borderRadius: '10px',
                      padding: '1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                      boxShadow: agent.status === 'ACTIVE' ? '0 4px 20px rgba(2, 132, 199, 0.15)' : 'none'
                    }}
                  >
                    {/* Agent Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          background: agent.status === 'ACTIVE' ? 'rgba(2, 132, 199, 0.2)' : 'rgba(125, 125, 125, 0.15)',
                          border: `1px solid ${agent.status === 'ACTIVE' ? '#0284c7' : 'var(--border-color)'}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1rem'
                        }}>
                                                  </div>
                        <div>
                          <strong style={{ fontSize: '0.82rem', color: 'var(--text-main)', display: 'block' }}>
                            {agent.name}
                          </strong>
                          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                            ID: {agent.id} • {agent.engine}
                          </span>
                        </div>
                      </div>

                      <span className={`badge ${agent.status === 'ACTIVE' ? 'badge-success' : 'badge-secondary'}`} style={{ fontSize: '0.62rem', fontWeight: 800 }}>
                        {agent.status === 'ACTIVE' ? 'ACTIVE' : 'IDLE'}
                      </span>
                    </div>

                    {/* WHAT IS AI DOING RIGHT NOW (CURRENT WORK) */}
                    <div style={{ background: 'rgba(2, 132, 199, 0.08)', border: '1px solid rgba(2, 132, 199, 0.3)', borderRadius: '6px', padding: '0.65rem 0.75rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                        <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          Current Work (In Execution):
                        </span>
                        <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                          Target: <strong style={{ color: 'var(--text-main)' }}>{agent.activeCaseId}</strong>
                        </span>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--text-main)', lineHeight: '1.45' }}>
                        {agent.currentWork}
                      </p>
                    </div>

                    {/* WHAT IS THE NEXT STEP */}
                    <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '6px', padding: '0.65rem 0.75rem' }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.25rem' }}>
                        Next Step Planning:
                      </span>
                      <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--text-main)', lineHeight: '1.45' }}>
                        {agent.nextStep}
                      </p>
                    </div>

                    {/* Telemetry Metrics & Action Footer */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem', marginTop: 'auto' }}>
                      <div style={{ display: 'flex', gap: '0.6rem', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                        <span>{agent.latency}</span>
                        <span>{agent.confidence}</span>
                        <span>{agent.completedToday} Done</span>
                      </div>

                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <button
                          className="btn btn-secondary"
                          onClick={() => setInspectingAiAgent(agent)}
                          style={{ fontSize: '0.62rem', padding: '0.2rem 0.45rem', color: '#0284c7', borderColor: '#0284c7', fontWeight: 700 }}
                        >
                          Inspect Thought Log
                        </button>
                        {agent.status === 'ACTIVE' && (
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              const matchCase = paymentQueueList.find(p => p.id === agent.activeCaseId.split(' ')[0] || p.registrationId === agent.activeCaseId.split(' ')[0]) || paymentQueueList[0];
                              handleOpenTakeoverConsole(matchCase);
                              if (showToast) showToast(`Intervened in ${agent.id}'s workflow for case ${matchCase.registrationId}!`);
                            }}
                            style={{ fontSize: '0.62rem', padding: '0.2rem 0.5rem', background: '#0284c7', borderColor: '#0284c7', fontWeight: 800 }}
                          >
                            Takeover
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* ========================================================================= */}
            {/* SECTION 2: MULTI-TICKET CROSS-DEPARTMENT PIPELINE STREAM (KYC PAYMENT) */}
            {/* ========================================================================= */}
            <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              {/* Section Header & Search */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                  <h5 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0, color: 'var(--text-emerald)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <GitBranch size={18} /> 2. Multi-Ticket Cross-Department Pipeline Stream (KYC Clearance Payment AI Execution DB Activation)
                  </h5>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>
                    Monitor all active Ticket IDs in real-time across both KYC Team clearance and Payment AI workflow steps. Click "Track 5 Steps" on any ticket to view its live 5-stage progress ribbon.
                  </p>
                </div>

                <div style={{ position: 'relative', width: '240px' }}>
                  <Search size={13} style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    placeholder="Search Ticket / Reg ID / Name..."
                    value={pipelineSearchQuery}
                    onChange={(e) => setPipelineSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.35rem 0.6rem 0.35rem 1.75rem',
                      fontSize: '0.72rem',
                      background: 'var(--bg-dark)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      color: 'var(--text-main)'
                    }}
                  />
                </div>
              </div>

              {/* Filter Pills for Multi-Ticket Stream */}
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', marginRight: '0.2rem' }}>FILTER PIPELINE:</span>
                {[
                  { key: 'ALL', label: `All Ticket IDs (${Object.keys(pipelineCasesData).length})` },
                  { key: 'IN_PROGRESS', label: 'In Progress (Payment AI Active)' },
                  { key: 'UTR_AUDIT', label: 'UTR / Bank Reconciliation' },
                  { key: 'COMPLETED', label: 'Settled & Active in DB' }
                ].map(flt => {
                  const isActive = pipelineStatusFilter === flt.key;
                  return (
                    <button
                      key={flt.key}
                      className={`btn ${isActive ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => setPipelineStatusFilter(flt.key)}
                      style={{ fontSize: '0.65rem', padding: '0.25rem 0.55rem', fontWeight: isActive ? 800 : 500 }}
                    >
                      {flt.label}
                    </button>
                  );
                })}
              </div>

              {/* MASTER MULTI-TICKET PIPELINE TABLE (SCROLLABLE) */}
              <div style={{
                width: '100%',
                maxHeight: '380px',
                overflowY: 'auto',
                overflowX: 'auto',
                background: 'var(--bg-dark)',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)'
              }}>
                <table className="custom-table" style={{ fontSize: '0.73rem', width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
                  <thead style={{ position: 'sticky', top: 0, zIndex: 10, background: '#090d16', boxShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    <tr>
                      <th style={{ background: '#090d16' }}>Ticket / Reg ID</th>
                      <th style={{ background: '#090d16' }}>Applicant & Amount</th>
                      <th style={{ background: '#090d16' }}>KYC Team Clearance</th>
                      <th style={{ background: '#090d16' }}>Payment Stage & Progress</th>
                      <th style={{ background: '#090d16' }}>Active AI Worker</th>
                      <th style={{ background: '#090d16' }}>Current Action & Next Step</th>
                      <th style={{ textAlign: 'right', background: '#090d16' }}>Officer Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCasesKeys
                      .filter(k => {
                        const c = pipelineCasesData[k];
                        if (pipelineStatusFilter === 'IN_PROGRESS') return c.overallStatus === 'IN_PROGRESS';
                        if (pipelineStatusFilter === 'UTR_AUDIT') return c.currentStepNumber === 3;
                        if (pipelineStatusFilter === 'COMPLETED') return c.overallStatus === 'COMPLETED';
                        return true;
                      })
                      .map(k => {
                        const c = pipelineCasesData[k];
                        const isSel = selectedPipelineCaseId === k;
                        return (
                          <tr
                            key={k}
                            style={{
                              background: isSel ? 'rgba(2, 132, 199, 0.12)' : undefined,
                              borderLeft: isSel ? '3px solid #0284c7' : '3px solid transparent'
                            }}
                          >
                            <td>
                              <code style={{ fontSize: '0.78rem', color: 'var(--text-brand)', fontWeight: 800 }}>{c.id}</code>
                              <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', marginTop: '2px' }}>{c.channel}</div>
                            </td>
                            <td>
                              <strong style={{ fontSize: '0.8rem', color: 'var(--text-main)', display: 'block' }}>{c.name}</strong>
                              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{c.applicantType}</div>
                              <strong style={{ fontSize: '0.78rem', color: 'var(--text-emerald)' }}>{c.amount}</strong>
                            </td>
                            <td>
                              <span className="badge badge-success" style={{ fontSize: '0.6rem', padding: '0.15rem 0.4rem' }}>
                                KYC Cleared
                              </span>
                              <div style={{ fontSize: '0.62rem', color: 'var(--text-main)', marginTop: '2px', fontWeight: 600 }}>
                                {c.kycVerifiedBy}
                              </div>
                              <div style={{ fontSize: '0.58rem', color: 'var(--text-muted)' }}>
                                {c.kycTimestamp} • {c.kycDetails}
                              </div>
                            </td>
                            <td>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                                <span style={{ fontSize: '0.64rem', fontWeight: 800, color: c.overallStatus === 'COMPLETED' ? '#10b981' : '#38bdf8' }}>
                                  Stage {c.currentStepNumber}/5 ({c.progressPercent}%)
                                </span>
                                <span className={`badge ${c.overallStatus === 'COMPLETED' ? 'badge-success' : 'badge-primary'}`} style={{ fontSize: '0.55rem', padding: '0.1rem 0.3rem' }}>
                                  {c.overallStatus === 'COMPLETED' ? 'Settled' : 'Executing'}
                                </span>
                              </div>
                              {/* Progress Bar */}
                              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                                <div style={{
                                  width: `${c.progressPercent}%`,
                                  height: '100%',
                                  background: c.overallStatus === 'COMPLETED' ? 'linear-gradient(90deg, #10b981, #059669)' : 'linear-gradient(90deg, #0284c7, #38bdf8)',
                                  borderRadius: '3px',
                                  transition: 'width 0.4s ease'
                                }} />
                              </div>
                            </td>
                            <td>
                              <span style={{ fontSize: '0.65rem', color: 'var(--text-brand)', fontFamily: 'monospace', background: 'rgba(2, 132, 199, 0.15)', padding: '0.15rem 0.35rem', borderRadius: '4px', display: 'inline-block' }}>
                                {c.activeAiWorker}
                              </span>
                            </td>
                            <td>
                              <div style={{ fontSize: '0.68rem', color: 'var(--text-main)', lineHeight: '1.35' }}>
                                <strong>Current:</strong> {c.activeAiSummary}
                              </div>
                              <div style={{ fontSize: '0.64rem', color: '#10b981', marginTop: '2px', lineHeight: '1.3' }}>
                                <strong>Next:</strong> {c.nextStepSummary}
                              </div>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                              <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'flex-end' }}>
                                <button
                                  className={`btn ${isSel ? 'btn-primary' : 'btn-secondary'}`}
                                  onClick={() => setSelectedPipelineCaseId(k)}
                                  style={{
                                    fontSize: '0.64rem',
                                    padding: '0.25rem 0.55rem',
                                    fontWeight: 800,
                                    background: isSel ? '#0284c7' : undefined,
                                    borderColor: '#0284c7',
                                    color: isSel ? '#fff' : '#38bdf8'
                                  }}
                                >
                                  Track 5 Steps
                                </button>
                                {c.overallStatus !== 'COMPLETED' && (
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                      const match = paymentQueueList.find(p => p.id === c.id || p.registrationId === c.id) || paymentQueueList[0];
                                      handleOpenTakeoverConsole(match);
                                    }}
                                    style={{ fontSize: '0.62rem', padding: '0.25rem 0.5rem', background: '#0284c7', borderColor: '#0284c7', fontWeight: 800 }}
                                  >
                                    Takeover
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>

              {/* Case Selector Indicator Ribbon */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-cyan)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Detailed 5-Stage Progression Breakdown for Selected Case: <code style={{ color: 'var(--text-brand)' }}>{activeCase?.id}</code>
                </span>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                  Selected: <strong>{activeCase?.name}</strong> ({activeCase?.amount})
                </span>
              </div>

              {/* Selected Case Pipeline Details Box */}
              {activeCase && (
                <div style={{ background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  
                  {/* Case Top Overview */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <code style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-brand)' }}>{activeCase.id}</code>
                        <strong style={{ fontSize: '1rem', color: 'var(--text-main)' }}>{activeCase.name}</strong>
                        <span className="badge badge-info" style={{ fontSize: '0.65rem' }}>{activeCase.applicantType}</span>
                        <strong style={{ color: 'var(--text-emerald)', fontSize: '0.95rem' }}>{activeCase.amount}</strong>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        Channel: <strong>{activeCase.channel}</strong> • Phone: <strong>{activeCase.phone}</strong> • Current Stage: <strong style={{ color: '#0284c7' }}>Stage {activeCase.currentStepNumber} of {activeCase.totalSteps}</strong>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          const match = paymentQueueList.find(p => p.id === activeCase.id || p.registrationId === activeCase.id) || paymentQueueList[0];
                          handleOpenTakeoverConsole(match);
                        }}
                        style={{ fontSize: '0.72rem', padding: '0.35rem 0.75rem', background: '#0284c7', borderColor: '#0284c7', fontWeight: 800 }}
                      >
                        Takeover This Case
                      </button>
                    </div>
                  </div>

                  {/* 5-STAGE VISUAL PROGRESSION BAR */}
                  <div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem' }}>
                      {activeCase.steps.map((st, idx) => {
                        const isDone = st.status === 'COMPLETED';
                        const isCurrent = st.status === 'IN_PROGRESS';
                        return (
                          <div
                            key={st.stepNum}
                            style={{
                              background: isDone ? 'rgba(16, 185, 129, 0.12)' : isCurrent ? 'rgba(2, 132, 199, 0.18)' : 'rgba(255,255,255,0.03)',
                              border: `1.5px solid ${isDone ? '#10b981' : isCurrent ? '#0284c7' : 'var(--border-color)'}`,
                              borderRadius: '8px',
                              padding: '0.65rem 0.5rem',
                              textAlign: 'center',
                              position: 'relative'
                            }}
                          >
                            <div style={{
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              background: isDone ? '#10b981' : isCurrent ? '#0284c7' : 'var(--bg-surface)',
                              color: '#fff',
                              fontSize: '0.65rem',
                              fontWeight: 800,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              margin: '0 auto 0.35rem auto'
                            }}>
                              {isDone ? '' : st.stepNum}
                            </div>
                            <strong style={{ fontSize: '0.72rem', color: isDone ? '#10b981' : isCurrent ? '#38bdf8' : 'var(--text-muted)', display: 'block' }}>
                              {st.shortTitle}
                            </strong>
                            <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>
                              {st.timestamp}
                            </span>
                            <span className={`badge ${isDone ? 'badge-success' : isCurrent ? 'badge-primary' : 'badge-secondary'}`} style={{ fontSize: '0.55rem', marginTop: '0.35rem' }}>
                              {st.payloadBadge}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* STEP-BY-STEP DETAILED CARDS */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {activeCase.steps.map(st => (
                      <div
                        key={st.stepNum}
                        style={{
                          background: st.status === 'IN_PROGRESS' ? 'rgba(2, 132, 199, 0.08)' : 'rgba(255,255,255,0.02)',
                          border: `1px solid ${st.status === 'IN_PROGRESS' ? '#0284c7' : 'var(--border-color)'}`,
                          borderRadius: '8px',
                          padding: '0.75rem 1rem',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          gap: '1rem'
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                            <strong style={{ fontSize: '0.78rem', color: st.status === 'IN_PROGRESS' ? '#38bdf8' : 'var(--text-main)' }}>
                              {st.title}
                            </strong>
                            <span style={{ fontSize: '0.62rem', color: 'var(--text-brand)', fontFamily: 'monospace', background: 'rgba(2, 132, 199, 0.15)', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>
                              Worker: {st.workerId}
                            </span>
                          </div>
                          <p style={{ margin: '0.2rem 0', fontSize: '0.72rem', color: 'var(--text-main)' }}>
                            <strong>Current Action:</strong> {st.description}
                          </p>
                          <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.7rem', color: '#10b981' }}>
                            <strong>Next Pipeline Action:</strong> {st.nextAction}
                          </p>
                        </div>

                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <span className={`badge ${st.status === 'COMPLETED' ? 'badge-success' : st.status === 'IN_PROGRESS' ? 'badge-primary' : 'badge-secondary'}`} style={{ fontSize: '0.62rem', fontWeight: 800 }}>
                            {st.status === 'COMPLETED' ? 'Completed' : st.status === 'IN_PROGRESS' ? 'In Progress' : 'Pending'}
                          </span>
                          <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                            {st.timestamp}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

            </div>

          </div>
        );
      })()}
      {(activeSubTab === 'AGENT_COMMISSIONS_PAYOUTS' || activeSubTab === 'COMMISSION_AUDIT') && (() => {
        const filteredAgents = officerAgentList.filter(agent => {
          const matchesSearch = agent.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            agent.agentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            agent.jurisdiction.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesTier = officerAgentTierFilter === 'ALL' || agent.tier === officerAgentTierFilter;
          const req = agent.payoutRequest;
          if (statusFilter === 'PENDING') return matchesSearch && matchesTier && req?.status === 'PENDING_OFFICER_AUDIT';
          if (statusFilter === 'VERIFIED') return matchesSearch && matchesTier && req?.status === 'OFFICER_VERIFIED';
          if (statusFilter === 'DISBURSED') return matchesSearch && matchesTier && req?.status === 'DISBURSED';
          return matchesSearch && matchesTier;
        });

        return (
          <div className="glass-panel" style={{ padding: '1.25rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.65rem' }}>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CreditCard size={18} color="var(--text-brand)" /> Individual Agent Wallets, Commission Calculations & Bank Audit Desk
                </h4>
                <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', margin: '0.15rem 0 0 0' }}>
                  Verify agent bank accounts, IFSC penny-drop, and 5% TDS deduction. Pincode Agent (₹150 / referral), District Agent (₹50), Divisional Lead (₹50), State Head (₹50).
                </p>
              </div>
              
              <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', width: '220px' }}>
                  <Search size={14} style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    placeholder="Search Agent / Pincode..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: '100%', padding: '0.35rem 0.6rem 0.35rem 1.8rem', fontSize: '0.72rem', background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)' }}
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e: any) => setStatusFilter(e.target.value)}
                  style={{ fontSize: '0.72rem', padding: '0.35rem 0.55rem', background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)' }}
                >
                  <option value="ALL">All Statuses</option>
                  <option value="PENDING">Pending Audit</option>
                  <option value="VERIFIED">Forwarded to TL</option>
                  <option value="DISBURSED">Disbursed</option>
                </select>
              </div>
            </div>

            {/* Tier filter pills */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              <button
                className={`btn ${officerAgentTierFilter === 'ALL' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setOfficerAgentTierFilter('ALL')}
                style={{ fontSize: '0.72rem', padding: '0.3rem 0.65rem' }}
              >
                All Tiers ({officerAgentList.length})
              </button>
              <button
                className={`btn ${officerAgentTierFilter === 'PINCODE_AGENT' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setOfficerAgentTierFilter('PINCODE_AGENT')}
                style={{ fontSize: '0.72rem', padding: '0.3rem 0.65rem' }}
              >
                Pincode Agents (₹150/ref) (4)
              </button>
              <button
                className={`btn ${officerAgentTierFilter === 'DISTRICT_AGENT' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setOfficerAgentTierFilter('DISTRICT_AGENT')}
                style={{ fontSize: '0.72rem', padding: '0.3rem 0.65rem' }}
              >
                District Agents (₹50/ref) (3)
              </button>
              <button
                className={`btn ${officerAgentTierFilter === 'DIVISIONAL_AGENT' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setOfficerAgentTierFilter('DIVISIONAL_AGENT')}
                style={{ fontSize: '0.72rem', padding: '0.3rem 0.65rem' }}
              >
                Divisional Leads (₹50/ref) (2)
              </button>
              <button
                className={`btn ${officerAgentTierFilter === 'STATE_AGENT' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setOfficerAgentTierFilter('STATE_AGENT')}
                style={{ fontSize: '0.72rem', padding: '0.3rem 0.65rem' }}
              >
                State Heads (₹50/ref) (2)
              </button>
            </div>

            {/* Main Officer Table */}
            <div style={{ width: '100%', overflowX: 'auto' }}>
              <table className="custom-table" style={{ fontSize: '0.74rem', width: '100%' }}>
                <thead>
                  <tr>
                    <th>Agent Details & Location</th>
                    <th>Tier Role</th>
                    <th>Commission Rate</th>
                    <th>Total Referrals</th>
                    <th>Commission Calculation Formula</th>
                    <th>Current Wallet Balance</th>
                    <th>Withdrawal Request & 5% TDS</th>
                    <th>Balance After Payout</th>
                    <th>Bank Account & Status</th>
                    <th style={{ textAlign: 'right' }}>Officer Audit Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAgents.map((agent) => {
                    const req = agent.payoutRequest;
                    const isPincode = agent.tier === 'PINCODE_AGENT';
                    const isDistrict = agent.tier === 'DISTRICT_AGENT';
                    const isDivisional = agent.tier === 'DIVISIONAL_AGENT';
                    const isState = agent.tier === 'STATE_AGENT';

                    return (
                      <tr key={agent.agentId}>
                        <td>
                          <strong style={{ fontSize: '0.82rem', color: 'var(--text-main)', display: 'block' }}>{agent.agentName}</strong>
                          <code style={{ fontSize: '0.7rem', color: 'var(--text-brand)' }}>{agent.agentId}</code>
                          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>{agent.jurisdiction}</div>
                        </td>
                        <td>
                          <span className={`badge ${isPincode ? 'badge-primary' : isDistrict ? 'badge-info' : isDivisional ? 'badge-success' : 'badge-primary'}`} style={{ fontSize: '0.62rem', background: isState ? '#a855f7' : undefined }}>
                            {agent.tierLabel}
                          </span>
                        </td>
                        <td>
                          <span className="badge badge-secondary" style={{ fontSize: '0.68rem', fontWeight: 800, color: isPincode ? 'var(--text-cyan)' : '#38bdf8' }}>
                            ₹{agent.commissionPerReferral.toFixed(2)} / vendor
                          </span>
                        </td>
                        <td>
                          <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>{agent.successfulReferralsCount}</strong>
                          <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', display: 'block' }}>Vendors Onboarded</span>
                        </td>
                        <td>
                          <div style={{ background: 'var(--bg-dark)', padding: '0.35rem 0.55rem', borderRadius: '6px', border: '1px solid var(--border-color)', fontFamily: 'monospace' }}>
                            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{agent.calculationFormula}</span>
                            <strong style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-emerald)', marginTop: '0.1rem' }}>
                              = ₹{agent.lifetimeCommissionEarned.toFixed(2)}
                            </strong>
                          </div>
                        </td>
                        <td>
                          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.35rem 0.55rem', borderRadius: '6px', border: '1px solid #10b981' }}>
                            <span style={{ fontSize: '0.58rem', color: 'var(--text-emerald)', fontWeight: 800 }}>LIVE WALLET</span>
                            <strong style={{ display: 'block', fontSize: '0.92rem', color: 'var(--text-emerald)' }}>
                              ₹{agent.currentWalletBalance.toFixed(2)}
                            </strong>
                          </div>
                        </td>
                        <td>
                          {req ? (
                            <div>
                              <strong style={{ fontSize: '0.8rem', color: 'var(--text-brand)' }}>Req: ₹{req.requestedAmount.toFixed(2)}</strong>
                              <div style={{ fontSize: '0.62rem', color: 'var(--text-rose)' }}>TDS 5%: -₹{req.tdsDeduction.toFixed(2)}</div>
                              <strong style={{ fontSize: '0.8rem', color: 'var(--text-emerald)', display: 'block' }}>Net: ₹{req.netPayable.toFixed(2)}</strong>
                            </div>
                          ) : (
                            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>No Active Request</span>
                          )}
                        </td>
                        <td>
                          {req ? (
                            <div style={{ background: 'rgba(168, 85, 247, 0.1)', padding: '0.3rem 0.5rem', borderRadius: '6px', border: '1px solid #a855f7' }}>
                              <span style={{ fontSize: '0.58rem', color: '#c084fc', fontWeight: 800 }}>REMAINING</span>
                              <strong style={{ display: 'block', fontSize: '0.85rem', color: '#c084fc' }}>
                                ₹{req.balanceAfterPayout.toFixed(2)}
                              </strong>
                            </div>
                          ) : (
                            <span style={{ fontSize: '0.72rem', color: 'var(--text-emerald)' }}>₹{agent.currentWalletBalance.toFixed(2)}</span>
                          )}
                        </td>
                        <td>
                          {req ? (
                            <div>
                              <strong style={{ fontSize: '0.72rem' }}>{req.bankName}</strong>
                              <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>{req.accountNumber} • {req.ifsc}</div>
                              <span className={`badge ${req.status === 'DISBURSED' ? 'badge-success' : req.status === 'OFFICER_VERIFIED' ? 'badge-primary' : 'badge-warning'}`} style={{ fontSize: '0.58rem', marginTop: '0.15rem' }}>
                                {req.status === 'DISBURSED' ? 'DISBURSED' : req.status === 'OFFICER_VERIFIED' ? 'FORWARDED TO TL' : 'PENDING AUDIT'}
                              </span>
                              {req.disbursedUtr && (
                                <div style={{ fontSize: '0.58rem', color: 'var(--text-emerald)', fontWeight: 700 }}>UTR: {req.disbursedUtr}</div>
                              )}
                            </div>
                          ) : (
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>-</span>
                          )}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          {req?.status === 'PENDING_OFFICER_AUDIT' ? (
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                setSelectedPayout({
                                  ...req,
                                  agentName: agent.agentName,
                                  agentId: agent.agentId,
                                  tier: agent.tierLabel,
                                  walletBalance: agent.currentWalletBalance
                                });
                                setAuditNote(`Bank A/C (${req.accountNumber}) and IFSC (${req.ifsc}) verified via penny drop. PAN 5% TDS (₹${req.tdsDeduction}) verified.`);
                              }}
                              style={{ fontSize: '0.65rem', padding: '0.25rem 0.55rem' }}
                            >
                              Audit & Verify
                            </button>
                          ) : req ? (
                            <button
                              className="btn btn-secondary"
                              onClick={() => {
                                setSelectedPayout({
                                  ...req,
                                  agentName: agent.agentName,
                                  agentId: agent.agentId,
                                  tier: agent.tierLabel,
                                  walletBalance: agent.currentWalletBalance
                                });
                                setAuditNote(req.officerNote || '');
                              }}
                              style={{ fontSize: '0.62rem', padding: '0.2rem 0.45rem' }}
                            >
                              View Audit
                            </button>
                          ) : (
                            <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>-</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>
        );
      })()}

      {/* ========================================================================= */}
      {/* SUBTAB 3: PAYMENT ESCALATIONS ASSIGNED BY PAYMENT TEAM LEAD             */}
      {/* ========================================================================= */}
      {activeSubTab === 'ESCALATION_QUEUE' && (
        <div className="glass-panel" style={{ padding: '1.25rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.65rem' }}>
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <AlertTriangle size={18} color="var(--text-rose)" /> Payment Escalation Desk (Assigned by Payment Team Lead)
              </h4>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', margin: '0.15rem 0 0 0' }}>
                Dedicated queue of complex payment disputes, penny-drop name mismatches, and treasury holds escalated by Supervisor <strong>Elena Vance (Payment TL)</strong> to Officer Suresh Reddy for ground audit.
              </p>
            </div>
            <span className="badge badge-rose" style={{ fontSize: '0.65rem' }}>
              {escalationsList.length} Assigned from TL
            </span>
          </div>

          {/* List View Table */}
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <table className="custom-table" style={{ fontSize: '0.74rem', width: '100%' }}>
              <thead>
                <tr>
                  <th>Case ID & Priority</th>
                  <th>Target Agent / Vendor</th>
                  <th>Escalation Type & Details</th>
                  <th>Instruction from Supervisor (Payment TL)</th>
                  <th>SLA Deadline</th>
                  <th style={{ textAlign: 'right' }}>Officer Action</th>
                </tr>
              </thead>
              <tbody>
                {escalationsList.map((esc) => (
                  <tr key={esc.id}>
                    {/* 1. Case ID & Priority */}
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <code style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-brand)' }}>{esc.caseId}</code>
                        <span className="badge badge-info" style={{ fontSize: '0.55rem' }}>FROM TL</span>
                      </div>
                      <span className={`badge ${esc.severity === 'CRITICAL' ? 'badge-rose' : esc.severity === 'HIGH' ? 'badge-warning' : 'badge-primary'}`} style={{ fontSize: '0.58rem', marginTop: '0.2rem' }}>
                        {esc.severity} PRIORITY
                      </span>
                    </td>

                    {/* 2. Target Agent / Vendor */}
                    <td>
                      <strong style={{ fontSize: '0.8rem', color: 'var(--text-cyan)', display: 'block' }}>{esc.agentName}</strong>
                      <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>Assigned: Suresh Reddy</span>
                    </td>

                    {/* 3. Escalation Type & Details */}
                    <td style={{ maxWidth: '280px' }}>
                      <strong style={{ fontSize: '0.8rem', color: 'var(--text-main)', display: 'block' }}>{esc.type}</strong>
                      <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', margin: '0.15rem 0 0 0' }}>{esc.details}</p>
                    </td>

                    {/* 4. Supervisor Directive */}
                    <td style={{ maxWidth: '340px' }}>
                      <div style={{ background: 'rgba(2, 132, 199, 0.08)', padding: '0.45rem 0.65rem', borderRadius: '6px', border: '1px solid #0284c7' }}>
                        <span style={{ fontSize: '0.6rem', color: 'var(--text-brand)', fontWeight: 800, display: 'block' }}>
                          {esc.escalatedBy}:
                        </span>
                        <p style={{ fontSize: '0.7rem', color: 'var(--text-main)', margin: '0.1rem 0 0 0', fontStyle: 'italic' }}>
                          "{esc.supervisorDirective}"
                        </p>
                        <span style={{ fontSize: '0.58rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.2rem' }}>
                          Escalated: {esc.escalatedAt}
                        </span>
                      </div>
                    </td>

                    {/* 5. SLA Deadline */}
                    <td>
                      <span className="badge badge-rose" style={{ fontSize: '0.62rem', fontWeight: 800 }}>
                        {esc.slaRemaining}
                      </span>
                    </td>

                    {/* 6. Action Buttons */}
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.35rem', flexWrap: 'wrap' }}>
                        <button
                          className="btn btn-secondary"
                          onClick={() => {
                            setDialerNumber('+91 98765 43210');
                            if (onSelectSubTab) onSelectSubTab('PAYMENT_REMINDERS');
                            if (showToast) showToast(`Loaded phone dialer for ${esc.agentName}.`);
                          }}
                          style={{ fontSize: '0.65rem', padding: '0.25rem 0.5rem' }}
                        >
                          <Phone size={11} /> Call
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setEscalationsList(prev => prev.filter(e => e.id !== esc.id));
                            if (showToast) showToast(`Resolved ${esc.caseId} and notified Supervisor Elena Vance (Payment TL)!`);
                          }}
                          style={{ fontSize: '0.65rem', padding: '0.25rem 0.55rem', fontWeight: 800 }}
                        >
                          Resolve
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {escalationsList.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              All Payment TL escalations have been resolved!
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 5: MANUAL VOICE REMINDERS & DIALER                               */}
      {/* ========================================================================= */}
      {(activeSubTab === 'PAYMENT_REMINDERS' || activeSubTab === 'CALL_DIALER') && (
        <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '1.25rem' }}>
          
          {/* Outbound WebRTC Dialer */}
          <div className="glass-panel" style={{ padding: '1.25rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Phone size={16} color="var(--text-brand)" /> WebRTC Outbound Dialer
            </h4>
            
            <input
              type="text"
              value={dialerNumber}
              onChange={(e) => setDialerNumber(e.target.value)}
              placeholder="Enter Phone Number..."
              style={{ width: '100%', padding: '0.6rem', fontSize: '1rem', fontWeight: 700, textAlign: 'center', background: 'var(--bg-dark)', border: '1.5px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-main)' }}
            />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map(digit => (
                <button
                  key={digit}
                  onClick={() => setDialerNumber(prev => prev + digit)}
                  className="btn btn-secondary"
                  style={{ fontSize: '1.1rem', fontWeight: 800, padding: '0.75rem 0' }}
                >
                  {digit}
                </button>
              ))}
            </div>

            {callActive ? (
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setCallActive(false);
                  if (showToast) showToast('Call Disconnected.');
                }}
                style={{ background: '#ef4444', color: '#fff', fontSize: '0.9rem', fontWeight: 800, padding: '0.75rem' }}
              >
                <PhoneOff size={16} /> End Call ({callTimer}s)
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => {
                  setCallActive(true);
                  if (showToast) showToast(`Calling ${dialerNumber} via Exotel Cloud Telephony...`);
                }}
                style={{ fontSize: '0.9rem', fontWeight: 800, padding: '0.75rem' }}
              >
                <PhoneCall size={16} /> Start Voice Reminder Call
              </button>
            )}
          </div>

          {/* Pending Payment Reminder Queue */}
          <div className="glass-panel" style={{ padding: '1.25rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
              Pending Vendor Invoice & Registration Payment Reminders
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                { name: 'Annapurna Sweets', phone: '+91-98765-43210', amount: '₹600.00', status: 'Pending Payment Link Click', link: 'https://rzp.io/l/vnd-7794' },
                { name: 'Meenakshi Handlooms', phone: '+91-99881-22334', amount: '₹1,500.00', status: 'Payment Gateway Timed Out', link: 'https://rzp.io/l/vnd-7798' }
              ].map((rem, i) => (
                <div key={i} style={{ background: 'var(--bg-dark)', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)', display: 'block' }}>{rem.name}</strong>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{rem.phone} • Amount: <strong style={{ color: 'var(--text-emerald)' }}>{rem.amount}</strong></div>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-warning)' }}>{rem.status}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setDialerNumber(rem.phone)}
                      style={{ fontSize: '0.68rem', padding: '0.3rem 0.6rem' }}
                    >
                      <Phone size={12} /> Load Dialer
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => { if (showToast) showToast(`WhatsApp Payment Link dispatched to ${rem.phone}!`); }}
                      style={{ fontSize: '0.68rem', padding: '0.3rem 0.6rem' }}
                    >
                      <Send size={12} /> Send WhatsApp Link
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 6: SETTLEMENT & TAX COMPLIANCE REPORTS                            */}
      {/* ========================================================================= */}
      {activeSubTab === 'DEPARTMENT_REPORTS' && (
        <div className="glass-panel" style={{ padding: '1.25rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.65rem' }}>
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <FileText size={18} color="var(--text-brand)" /> Daily Settlement, TDS & Reconciliation Compliance Reports
              </h4>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', margin: '0.15rem 0 0 0' }}>
                Export audited financial statements, TDS withholding tax forms, and bank reconciliation files.
              </p>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => { if (showToast) showToast('Exported Daily Reconciliation CSV & PDF Report!'); }}
              style={{ fontSize: '0.72rem', padding: '0.35rem 0.75rem', fontWeight: 800 }}
            >
              <Download size={14} /> Export CSV / PDF
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            <div style={{ background: 'var(--bg-dark)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700 }}>TOTAL INCOMING VOLUME</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-emerald)', margin: '0.3rem 0' }}>₹1,48,500.00</div>
              <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>248 Captured Transactions</span>
            </div>
            <div style={{ background: 'var(--bg-dark)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700 }}>TOTAL AGENT COMMISSIONS</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-cyan)', margin: '0.3rem 0' }}>₹74,250.00</div>
              <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>Distributed across 4 Tiers</span>
            </div>
            <div style={{ background: 'var(--bg-dark)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700 }}>5% TDS DEDUCTION LEDGER</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-rose)', margin: '0.3rem 0' }}>₹3,712.50</div>
              <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>Income Tax Department Form 26Q</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 7: AUDIT TRAIL LOG                                               */}
      {/* ========================================================================= */}
      {activeSubTab === 'AUDIT_TRAIL' && (
        <div className="glass-panel" style={{ padding: '1.25rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <Terminal size={18} color="var(--text-brand)" /> Immutable Payment & Penny-Drop Audit Trail
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontFamily: 'monospace', fontSize: '0.72rem' }}>
            {[
              { time: '11:35:10 IST', event: 'PENNY_DROP_MATCHED', actor: 'SYSTEM_API', details: 'NPCI Penny Drop ₹1.00 settled to HDFC A/C 50100491829821. Beneficiary: RAJU VIGNESH.' },
              { time: '11:15:45 IST', event: 'OFFICER_AUDIT_PASS', actor: 'Suresh Reddy (PAY-OFF-02)', details: 'Validated 5% TDS (₹150) and forwarded PAYOUT-REQ-105 to TL Elena Vance.' },
              { time: '10:45:00 IST', event: 'WALLET_WITHDRAWAL_INIT', actor: 'AGT-PIN-600001', details: 'Withdrawal request ₹4,500.00 registered. Current Wallet Balance: ₹6,450.00.' },
              { time: '09:00:15 IST', event: 'IMPS_DISBURSED', actor: 'Elena Vance (Payment TL)', details: 'Disbursed ₹14,250.00 via IMPS UTR #IMPS998822 to Meenakshi Sundaram.' }
            ].map((log, i) => (
              <div key={i} style={{ background: 'var(--bg-dark)', padding: '0.6rem 0.85rem', borderRadius: '6px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', marginRight: '0.6rem' }}>[{log.time}]</span>
                  <span style={{ color: 'var(--text-brand)', fontWeight: 800, marginRight: '0.6rem' }}>{log.event}</span>
                  <span style={{ color: 'var(--text-main)' }}>{log.details}</span>
                </div>
                <span className="badge badge-info" style={{ fontSize: '0.6rem' }}>{log.actor}</span>
              </div>
            ))}
          </div>
        </div>
      )}



      {/* ========================================================================= */}
      {/* 3-STEP AUTOMATED VERIFICATION OFFICER AUDIT MODAL                         */}
      {/* ========================================================================= */}
      {selectedPayout && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999 }}>
          <div className="glass-panel" style={{ background: 'var(--bg-surface)', width: '620px', maxWidth: '95%', padding: '1.5rem', borderRadius: '12px', border: '1.5px solid #0284c7', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.65rem' }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
                  Payment Officer Audit Desk: {selectedPayout.payoutId}
                </h4>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: '0.15rem 0 0 0' }}>
                  Agent: <strong>{selectedPayout.agentName}</strong> (<code>{selectedPayout.agentId}</code>) • {selectedPayout.tier}
                </p>
              </div>
              <button onClick={() => setSelectedPayout(null)} className="btn btn-secondary" style={{ padding: '0.2rem 0.5rem' }}></button>
            </div>

            {/* Financial Summary Calculation Card */}
            <div style={{ background: 'var(--bg-dark)', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.65rem' }}>
              <div>
                <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', fontWeight: 700 }}>REQUESTED WITHDRAWAL</span>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-brand)' }}>₹{selectedPayout.requestedAmount.toFixed(2)}</div>
                <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>Wallet: ₹{selectedPayout.walletBalance.toFixed(2)}</span>
              </div>
              <div>
                <span style={{ fontSize: '0.62rem', color: 'var(--text-rose)', fontWeight: 700 }}>5% TDS TAX DEDUCTION</span>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-rose)' }}>- ₹{selectedPayout.tdsDeduction.toFixed(2)}</div>
                <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>PAN: {selectedPayout.panNumber}</span>
              </div>
              <div>
                <span style={{ fontSize: '0.62rem', color: 'var(--text-emerald)', fontWeight: 700 }}>NET PAYABLE (IMPS)</span>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-emerald)' }}>₹{selectedPayout.netPayable.toFixed(2)}</div>
                <span style={{ fontSize: '0.6rem', color: 'var(--text-emerald)' }}>To Bank Account</span>
              </div>
            </div>

            {/* 3-STEP AUTOMATED VERIFICATION CHECKLIST */}
            <div style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '0.85rem', borderRadius: '8px', border: '1.5px solid #10b981', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <strong style={{ fontSize: '0.75rem', color: 'var(--text-emerald)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                Automated Payout & Bank Verification Checklist (Passed 3/3)
              </strong>
              
              {/* Check 1: Wallet Balance Sufficiency */}
              <div style={{ background: 'var(--bg-dark)', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700 }}>1. WALLET BALANCE SUFFICIENCY</span>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-main)' }}>
                    Available Wallet: <strong>₹{selectedPayout.walletBalance?.toFixed(2) || '6,450.00'}</strong> | Requested: <strong>₹{selectedPayout.requestedAmount.toFixed(2)}</strong>
                  </div>
                </div>
                <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>
                  Sufficient (₹{selectedPayout.balanceAfterPayout?.toFixed(2) || '1,950.00'} Remaining)
                </span>
              </div>

              {/* Check 2: Bank Account & Penny Drop Match */}
              <div style={{ background: 'var(--bg-dark)', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700 }}>2. BANK ACCOUNT & PENNY-DROP VALIDATION</span>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-main)' }}>
                    <strong>{selectedPayout.bankName}</strong> • A/C: <code>{selectedPayout.accountNumber}</code> • IFSC: <code>{selectedPayout.ifsc}</code>
                  </div>
                  <div style={{ fontSize: '0.62rem', color: 'var(--text-emerald)', marginTop: '0.1rem' }}>
                    Penny-Drop Match: Beneficiary Name matches "{selectedPayout.agentName}" (100% Match)
                  </div>
                </div>
                <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>
                  Penny Drop Verified
                </span>
              </div>

              {/* Check 3: Officer Audit & PAN 5% TDS */}
              <div style={{ background: 'var(--bg-dark)', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700 }}>3. TAX COMPLIANCE & 5% TDS DEDUCTION</span>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-main)' }}>
                    PAN: <code>{selectedPayout.panNumber}</code> (Active NSDL) • KYC: <strong>{selectedPayout.kycStatus}</strong>
                  </div>
                </div>
                <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>
                  TDS Deducted (₹{selectedPayout.tdsDeduction.toFixed(2)})
                </span>
              </div>

            </div>

            {/* Officer Audit Notes */}
            <div>
              <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '0.25rem' }}>
                Officer Audit Verification Note:
              </label>
              <textarea
                value={auditNote}
                onChange={(e) => setAuditNote(e.target.value)}
                rows={2}
                placeholder="Enter officer audit comments..."
                style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)', fontSize: '0.75rem' }}
              />
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
              <button
                className="btn btn-secondary"
                onClick={() => handleFlagDiscrepancy(selectedPayout)}
                style={{ fontSize: '0.72rem', color: 'var(--text-rose)', borderColor: 'var(--text-rose)' }}
              >
                Flag Discrepancy
              </button>
              
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {selectedPayout.requestedAmount <= 5000 && (
                  <button
                    className="btn btn-primary"
                    onClick={() => handleDirectDisburse(selectedPayout)}
                    style={{ fontSize: '0.72rem', background: '#10b981', borderColor: '#10b981', fontWeight: 800 }}
                  >
                    Direct Release (&lt;= ₹5,000)
                  </button>
                )}
                <button
                  className="btn btn-primary"
                  onClick={() => handleVerifyAndForwardToTL(selectedPayout)}
                  style={{ fontSize: '0.72rem', fontWeight: 800 }}
                >
                  Verify & Forward to TL
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TICKET CONVERSATION INSPECTOR & HUMAN OFFICER TAKEOVER MODAL             */}
      {/* ========================================================================= */}
      {selectedTicket && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999 }}>
          <div className="glass-panel" style={{ background: 'var(--bg-surface)', width: '680px', maxWidth: '95%', padding: '1.5rem', borderRadius: '12px', border: '1.5px solid #0284c7', display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '90vh', overflowY: 'auto' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.65rem' }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Ticket size={18} color="var(--text-brand)" /> {selectedTicket.ticketId}: {selectedTicket.category}
                </h4>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: '0.15rem 0 0 0' }}>
                  Customer: <strong>{selectedTicket.customerName}</strong> ({selectedTicket.phone}) • Amount: <strong style={{ color: 'var(--text-emerald)' }}>{selectedTicket.amount}</strong> • Ref: <code>{selectedTicket.relatedTxnId}</code>
                </p>
              </div>
              <button onClick={() => setSelectedTicket(null)} className="btn btn-secondary" style={{ padding: '0.2rem 0.5rem' }}></button>
            </div>

            {/* AI Handling Status Banner */}
            <div style={{ background: 'var(--bg-dark)', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="badge badge-info">{selectedTicket.aiAgent}</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Confidence: <strong>{selectedTicket.aiConfidence}%</strong></span>
              </div>
              <span className={`badge ${selectedTicket.status === 'RESOLVED' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.65rem' }}>
                {selectedTicket.status === 'RESOLVED' ? 'Resolved' : 'Live Session'}
              </span>
            </div>

            {/* Chat History Messages */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', maxHeight: '250px', overflowY: 'auto', padding: '0.5rem', background: 'var(--bg-dark)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              {selectedTicket.chatHistory.map((msg: any, idx: number) => {
                const isCustomer = msg.sender === 'CUSTOMER' || msg.sender === 'AGENT';
                return (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: isCustomer ? 'flex-start' : 'flex-end' }}>
                    <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginBottom: '0.15rem' }}>
                      {msg.sender === 'CUSTOMER' ? `${selectedTicket.customerName}` : msg.sender === 'AGENT' ? `Agent` : msg.sender === 'OFFICER' ? `Officer Suresh Reddy` : `AI Bot`}
                    </span>
                    <div style={{
                      maxWidth: '80%',
                      padding: '0.55rem 0.85rem',
                      borderRadius: isCustomer ? '10px 10px 10px 2px' : '10px 10px 2px 10px',
                      background: msg.sender === 'OFFICER' ? 'rgba(16, 185, 129, 0.2)' : isCustomer ? 'rgba(255, 255, 255, 0.08)' : 'rgba(2, 132, 199, 0.2)',
                      border: msg.sender === 'OFFICER' ? '1px solid #10b981' : isCustomer ? '1px solid var(--border-color)' : '1px solid #0284c7',
                      fontSize: '0.75rem',
                      color: 'var(--text-main)'
                    }}>
                      {msg.text}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Human Officer Takeover Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Human Settlement Officer Live Reply / Action:
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  value={ticketReplyText}
                  onChange={(e) => setTicketReplyText(e.target.value)}
                  placeholder="Type official reply to customer / vendor..."
                  style={{ flex: 1, padding: '0.5rem 0.8rem', background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)', fontSize: '0.75rem' }}
                />
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    if (!ticketReplyText.trim()) return;
                    setPaymentTicketsList(prev => prev.map(t => {
                      if (t.ticketId === selectedTicket.ticketId) {
                        return {
                          ...t,
                          status: 'HUMAN_INTERCEPTED',
                          chatHistory: [...t.chatHistory, { sender: 'OFFICER', text: ticketReplyText }]
                        };
                      }
                      return t;
                    }));
                    setSelectedTicket((prev: any) => ({
                      ...prev,
                      status: 'HUMAN_INTERCEPTED',
                      chatHistory: [...prev.chatHistory, { sender: 'OFFICER', text: ticketReplyText }]
                    }));
                    setTicketReplyText('');
                    if (showToast) showToast(`Reply sent to ${selectedTicket.customerName}!`);
                  }}
                  style={{ fontSize: '0.75rem', fontWeight: 800, padding: '0.5rem 0.9rem' }}
                >
                  <Send size={12} /> Send Reply
                </button>
              </div>
            </div>

            {/* Bottom Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setDialerNumber(selectedTicket.phone);
                  if (onSelectSubTab) onSelectSubTab('PAYMENT_REMINDERS');
                  setSelectedTicket(null);
                  if (showToast) showToast(`Loaded phone dialer for ${selectedTicket.customerName}.`);
                }}
                style={{ fontSize: '0.7rem' }}
              >
                <Phone size={12} /> Call Customer Directly
              </button>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setPaymentTicketsList(prev => prev.map(t => t.ticketId === selectedTicket.ticketId ? { ...t, status: 'RESOLVED' } : t));
                    if (showToast) showToast(`Ticket ${selectedTicket.ticketId} marked as RESOLVED!`);
                    setSelectedTicket(null);
                  }}
                  style={{ fontSize: '0.75rem', fontWeight: 800, background: '#10b981', borderColor: '#10b981' }}
                >
                  Mark Ticket Resolved
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: PAYMENT OFFICER CASE TAKEOVER & DYNAMIC LINK DISPATCH CONSOLE      */}
      {/* ========================================================================= */}
      {takeoverConsoleModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999, padding: '1rem' }}>
          <div className="glass-panel" style={{ width: '720px', maxWidth: '95vw', maxHeight: '92vh', overflowY: 'auto', background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '12px', border: '1.5px solid #0284c7', boxShadow: '0 25px 50px rgba(0,0,0,0.7)' }}>
            
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Payment Case Takeover & Dynamic Link Dispatch Console
                </h3>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  Registration ID: <code>{takeoverConsoleModal.registrationId || takeoverConsoleModal.id}</code> • Applicant: <strong>{takeoverConsoleModal.customerName} {takeoverConsoleModal.roleDetail || ''}</strong> • Category: <strong>{takeoverConsoleModal.applicantType}</strong>
                </div>
              </div>
              <button onClick={() => setTakeoverConsoleModal(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.25rem' }}></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              
              {/* Officer Takeover Active Banner */}
              <div style={{ background: 'rgba(2, 132, 199, 0.15)', padding: '0.75rem 0.95rem', borderRadius: '8px', border: '1px solid #0284c7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ fontSize: '1.3rem' }}></span>
                  <div>
                    <strong style={{ fontSize: '0.8rem', color: 'var(--text-cyan)', display: 'block' }}>
                      CASE DIRECTLY TAKEN OVER BY PAYMENT OFFICER (Suresh Reddy)
                    </strong>
                    <span style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>
                      Generating custom link, receiving customer payment receipt, and performing final ledger audit.
                    </span>
                  </div>
                </div>
                <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>
                  OFFICER ACTIVE AT DESK
                </span>
              </div>

              {/* STEP 1: CUSTOM INVOICE AMOUNT & DYNAMIC 30-MIN PAYMENT LINK */}
              <div style={{ background: 'var(--bg-dark)', padding: '0.9rem', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-emerald)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  STEP 1: CUSTOM INVOICE AMOUNT & DYNAMIC 30-MIN PAYMENT LINK
                </span>

                <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.35rem 0.6rem', flex: 1, minWidth: '150px' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-emerald)', marginRight: '0.4rem' }}>$</span>
                    <input
                      type="text"
                      value={takeoverLinkAmount}
                      onChange={(e) => setTakeoverLinkAmount(e.target.value)}
                      placeholder="Enter custom settlement amount..."
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: 800, width: '100%', outline: 'none' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    {['99.00', '150.00', '350.00', '600.00'].map(preset => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setTakeoverLinkAmount(preset)}
                        className="btn btn-secondary"
                        style={{ fontSize: '0.64rem', padding: '0.3rem 0.5rem', color: takeoverLinkAmount === preset ? 'var(--text-cyan)' : 'var(--text-muted)' }}
                      >
                        ${preset}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      const linkUrl = `https://pay.forgeindia.internal/checkout/30m-dyn-${(takeoverConsoleModal.registrationId || 'reg').toLowerCase()}-${Date.now().toString().slice(-4)}`;
                      setGeneratedDynamicCheckoutLink(linkUrl);
                      if (showToast) showToast(`Generated fresh 30-Min Dynamic Checkout Link for $${takeoverLinkAmount}!`);
                    }}
                    style={{ fontSize: '0.72rem', padding: '0.45rem 0.8rem', fontWeight: 800, background: '#0284c7', borderColor: '#0284c7' }}
                  >
                    Generate 30m Link
                  </button>
                </div>

                {/* Generated Link Display & 1-Click WhatsApp / Email Dispatch */}
                {generatedDynamicCheckoutLink && (
                  <div style={{ background: 'var(--bg-surface)', padding: '0.75rem', borderRadius: '6px', border: '1px dashed #0284c7', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-cyan)' }}>
                        ACTIVE SECURE CHECKOUT URL (30-MIN VALIDITY):
                      </span>
                      <span className="badge badge-warning" style={{ fontSize: '0.58rem' }}>
                        EXPIRES IN 30 MINS
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                      <input
                        type="text"
                        readOnly
                        value={generatedDynamicCheckoutLink}
                        style={{ background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '0.35rem 0.5rem', color: '#38bdf8', fontSize: '0.72rem', flex: 1, fontFamily: 'monospace' }}
                      />
                      <button
                        className="btn btn-secondary"
                        onClick={() => {
                          navigator.clipboard.writeText(generatedDynamicCheckoutLink);
                          if (showToast) showToast('Link copied to clipboard!');
                        }}
                        style={{ fontSize: '0.64rem', padding: '0.35rem 0.55rem' }}
                      >
                        Copy
                      </button>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.2rem' }}>
                      <button
                        type="button"
                        onClick={() => {
                          if (showToast) showToast(`Sent WhatsApp template with payment link ($${takeoverLinkAmount}) directly to ${takeoverConsoleModal.customerName}!`);
                        }}
                        className="btn btn-secondary"
                        style={{ flex: 1, fontSize: '0.72rem', padding: '0.4rem', color: '#10b981', borderColor: '#10b981', fontWeight: 700 }}
                      >
                        1-Click WhatsApp Share
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (showToast) showToast(`Dispatched official invoice email with instant checkout button to ${takeoverConsoleModal.customerName}!`);
                        }}
                        className="btn btn-secondary"
                        style={{ flex: 1, fontSize: '0.72rem', padding: '0.4rem', color: '#0284c7', borderColor: '#0284c7', fontWeight: 700 }}
                      >
                        1-Click Email Dispatch
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* STEP 2: REGISTERER RECEIPT SUBMISSION & UTR AUDIT DESK */}
              <div style={{ background: 'var(--bg-dark)', padding: '0.9rem', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-cyan)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    STEP 2: REGISTERER RECEIPT SUBMISSION & UTR AUDIT DESK
                  </span>
                  <span className="badge badge-info" style={{ fontSize: '0.58rem' }}>
                    RECEIVED VIA DYNAMIC LINK / WHATSAPP WEBHOOK
                  </span>
                </div>

                {/* Info Note: How registerer shares receipt */}
                <div style={{ background: 'rgba(56, 189, 248, 0.08)', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid rgba(56, 189, 248, 0.2)', fontSize: '0.66rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                  <strong>How did we receive this receipt?</strong> When the customer pays on the 30-min link or sends payment slip via WhatsApp/Email, our system automatically captures the receipt image and extracts the UTR number:
                </div>

                {/* Receipt Card with Visual Image Preview Thumbnail */}
                <div style={{ display: 'flex', gap: '0.85rem', background: 'var(--bg-surface)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', alignItems: 'center' }}>
                  
                  {/* Visual Specimen Thumbnail */}
                  <div style={{ position: 'relative', width: '95px', height: '115px', borderRadius: '6px', overflow: 'hidden', border: '1.5px solid var(--border-color)', flexShrink: 0, background: 'var(--bg-dark)' }}>
                    <img
                      src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=300&q=80"
                      alt="Customer Payment Receipt Specimen"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', bottom: 0, insetInline: 0, background: 'rgba(0,0,0,0.75)', color: '#fff', fontSize: '0.55rem', textAlign: 'center', padding: '2px 0' }}>
                      Click to Zoom
                    </div>
                  </div>

                  {/* Metadata Details & Live Bank Ledger Match */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.7rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ color: 'var(--text-main)', fontSize: '0.8rem' }}>
                        {takeoverCustomerReceiptProof || `REC-PROOF-${takeoverConsoleModal.registrationId || '8822'}.JPG (UTR #PUNB0291048822)`}
                      </strong>
                      <span className={`badge ${takeoverReceiptAuditState === 'VERIFIED' || takeoverReceiptAuditState === 'AI_TRANSFERRED' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.6rem' }}>
                        {takeoverReceiptAuditState === 'AI_TRANSFERRED' ? 'COMPLETED & ACTIVATED' : takeoverReceiptAuditState === 'VERIFIED' ? 'STATEMENT VERIFIED' : 'PENDING OFFICER AUDIT'}
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', fontSize: '0.65rem', background: 'var(--bg-dark)', padding: '0.45rem 0.6rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.58rem' }}>EXTRACTED BANK UTR:</span>
                        <strong style={{ color: 'var(--text-cyan)', fontFamily: 'monospace' }}>#PUNB0291048822</strong>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.58rem' }}>SETTLED AMOUNT:</span>
                        <strong style={{ color: 'var(--text-emerald)' }}>${takeoverLinkAmount} (100% Match)</strong>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.58rem' }}>PAYMENT METHOD:</span>
                        <span>IMPS / NetBanking Direct Wire</span>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.58rem' }}>SUBMISSION CHANNEL:</span>
                        <span style={{ color: '#10b981' }}>WhatsApp Upload</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.2rem' }}>
                      <button
                        type="button"
                        onClick={() => {
                          window.open('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80', '_blank');
                          if (showToast) showToast('Opened full resolution payment receipt specimen.');
                        }}
                        className="btn btn-secondary"
                        style={{ fontSize: '0.64rem', padding: '0.25rem 0.5rem' }}
                      >
                        View Full High-Res Receipt
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setTakeoverReceiptAuditState('VERIFIED');
                          if (showToast) showToast(`Receipt & Statement UTR verified for ${takeoverConsoleModal.customerName}! Ready for AI Agent handoff.`);
                        }}
                        className="btn btn-secondary"
                        style={{ fontSize: '0.64rem', padding: '0.25rem 0.6rem', color: '#10b981', borderColor: '#10b981', fontWeight: 700 }}
                      >
                        {takeoverReceiptAuditState === 'VERIFIED' || takeoverReceiptAuditState === 'AI_TRANSFERRED' ? 'Statement Verified & Reconciled' : 'Audit & Match Bank Statement'}
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              {/* STEP 3: 1-CLICK TRANSFER TO AI AGENT (FINAL ONBOARDING STEP) */}
              <div style={{ background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.1), rgba(16, 185, 129, 0.1))', padding: '1rem', borderRadius: '8px', border: '1.5px solid #0284c7', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-emerald)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    STEP 3: HANDOFF TO AI AGENT (FINAL ONBOARDING & ACTIVATION)
                  </span>
                  <span className="badge badge-info" style={{ fontSize: '0.62rem' }}>
                    AUTONOMOUS FINALIZER
                  </span>
                </div>

                <p style={{ margin: 0, fontSize: '0.68rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                  Clicking below will hand off the verified case to <strong>AI Agent (AI-PAY-001)</strong> which will automatically:
                  <br/>• <strong>1.</strong> Activate applicant account in Database (customer logs in with registered Email/Password, no credentials shared).
                  <br/>• <strong>2.</strong> Auto-generate Tax Compliant Official PDF Invoice Receipt.
                  <br/>• <strong>3.</strong> Dispatch Branded Welcome Email & WhatsApp notification.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    const currentModal = takeoverConsoleModal;
                    setTakeoverReceiptAuditState('AI_TRANSFERRED');
                    setPaymentQueueList(prev => prev.map(p => (p.registrationId === currentModal.registrationId || p.id === currentModal.id) ? {
                      ...p,
                      paymentStatus: 'PAYMENT_COMPLETED',
                      currentWorkflow: `Payment Verified by Officer Suresh Reddy → AI Welcome Email Dispatched & DB Account Activated`,
                      aiStatus: 'UTR Match 100% • Receipt Generated & Account Active'
                    } : p));
                    setTakeoverConsoleModal(null);
                    if (showToast) showToast(`Case transferred to AI Agent! Account successfully activated in Database, PDF Tax Invoice generated, and Welcome Email sent to ${currentModal.customerName}!`);
                  }}
                  className="btn btn-primary"
                  style={{ fontSize: '0.82rem', padding: '0.6rem 1rem', fontWeight: 800, background: 'linear-gradient(135deg, #0284c7, #10b981)', border: 'none', boxShadow: '0 4px 15px rgba(2, 132, 199, 0.4)' }}
                >
                  1-Click Transfer to AI Agent for Final Activation
                </button>
              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.25rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem' }}>
              <button className="btn btn-secondary" onClick={() => setTakeoverConsoleModal(null)}>Close Console</button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: OFFICIAL TAX INVOICE & PAYMENT SETTLEMENT RECEIPT (AI / MANUAL)    */}
      {/* ========================================================================= */}
      {selectedReceiptItem && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999, padding: '1rem' }}>
          <div className="glass-panel" style={{ width: '740px', maxWidth: '95vw', maxHeight: '92vh', overflowY: 'auto', background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '12px', border: '1.5px solid #10b981', boxShadow: '0 25px 60px rgba(0,0,0,0.8)' }}>
            
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.85rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <img src="/forge-india-logo.jpg" alt="Logo" style={{ width: '38px', height: '38px', borderRadius: '50%', border: '2px solid #10b981' }} />
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    FORGE INDIA CONNECT PVT. LTD.
                  </h3>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Official Tax Invoice & Payment Receipt • GSTIN: <strong>33AAACF8821Q1Z4</strong> • Reg No: <strong>ROC-CHE-2026</strong>
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedReceiptItem(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.25rem' }}></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              {/* Processing Origin & Vault Status Banner */}
              <div style={{
                background: selectedReceiptItem.aiStatus?.includes('AI') || selectedReceiptItem.currentWorkflow?.includes('AI')
                  ? 'linear-gradient(90deg, rgba(16, 185, 129, 0.15), rgba(6, 182, 212, 0.15))'
                  : 'linear-gradient(90deg, rgba(2, 132, 199, 0.15), rgba(99, 102, 241, 0.15))',
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                border: `1px solid ${selectedReceiptItem.aiStatus?.includes('AI') ? '#10b981' : '#0284c7'}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>
                    {selectedReceiptItem.aiStatus?.includes('AI') ? '' : ''}
                  </span>
                  <div>
                    <strong style={{ fontSize: '0.78rem', color: 'var(--text-main)', display: 'block' }}>
                      {selectedReceiptItem.aiStatus?.includes('AI')
                        ? 'AI AGENT (AI-PAY-001) AUTONOMOUSLY PROCESSED & SAVED'
                        : 'MANUALLY VERIFIED & DISPATCHED BY OFFICER (Suresh Reddy)'}
                    </strong>
                    <span style={{ fontSize: '0.64rem', color: 'var(--text-muted)' }}>
                      Permanent record immutable in Enterprise Vault with digital timestamp & cryptographic signature.
                    </span>
                  </div>
                </div>
                <span className="badge badge-success" style={{ fontSize: '0.62rem', fontWeight: 800 }}>
                  SAVED IN VAULT
                </span>
              </div>

              {/* Invoice & Customer 2-Column Summary */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div style={{ background: 'var(--bg-dark)', padding: '0.75rem 0.9rem', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.72rem' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-cyan)', textTransform: 'uppercase' }}>
                    INVOICE METADATA
                  </span>
                  <div>Invoice Number: <strong style={{ color: 'var(--text-brand)', fontFamily: 'monospace' }}>INV-2026-{selectedReceiptItem.registrationId || selectedReceiptItem.id}</strong></div>
                  <div>Invoice Date: <strong style={{ color: 'var(--text-main)' }}>Today, 11:35 AM IST</strong></div>
                  <div>Payment Status: <span className="badge badge-success" style={{ fontSize: '0.6rem' }}>COMPLETED & SETTLED</span></div>
                  <div>Payment Gateway: <strong style={{ color: 'var(--text-main)' }}>{selectedReceiptItem.paymentMethod}</strong></div>
                  <div>Bank Ref / UTR: <code style={{ color: 'var(--text-cyan)' }}>UTR-{selectedReceiptItem.registrationId || '8821'}-99201948</code></div>
                </div>

                <div style={{ background: 'var(--bg-dark)', padding: '0.75rem 0.9rem', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.72rem' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-emerald)', textTransform: 'uppercase' }}>
                    BILLED APPLICANT / CUSTOMER
                  </span>
                  <div>Customer / Vendor: <strong style={{ color: 'var(--text-main)' }}>{selectedReceiptItem.customerName}</strong></div>
                  <div>Account Type: <span style={{ color: 'var(--text-muted)' }}>{selectedReceiptItem.roleDetail} • {selectedReceiptItem.applicantType}</span></div>
                  <div>Registration ID: <code>{selectedReceiptItem.registrationId}</code></div>
                  <div>Contact Phone: <strong style={{ color: 'var(--text-main)' }}>{selectedReceiptItem.phone || '+91 98765 43210'}</strong></div>
                  <div>Referral Link: <span style={{ color: '#10b981' }}>AGT-INDIA-101 (Active)</span></div>
                </div>
              </div>

              {/* Line Items Table */}
              <div style={{ width: '100%', overflowX: 'auto', background: 'var(--bg-dark)', borderRadius: '8px', border: '1px solid var(--border-color)', padding: '0.5rem' }}>
                <table className="custom-table" style={{ fontSize: '0.74rem', width: '100%', margin: 0 }}>
                  <thead>
                    <tr>
                      <th>Service Description</th>
                      <th>SAC Code</th>
                      <th>Taxable Base</th>
                      <th>CGST (9%)</th>
                      <th>SGST (9%)</th>
                      <th style={{ textAlign: 'right' }}>Total Amount Paid</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>{selectedReceiptItem.applicantType || 'Platform Registration & Onboarding Fee'}</strong>
                        <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>1-Year Business Partner Access & Database Verification</div>
                      </td>
                      <td><code>998313</code></td>
                      <td>${(parseFloat(selectedReceiptItem.paymentAmount?.replace(/[^0-9.]/g, '') || '250') * 0.8474).toFixed(2)}</td>
                      <td>${(parseFloat(selectedReceiptItem.paymentAmount?.replace(/[^0-9.]/g, '') || '250') * 0.0763).toFixed(2)}</td>
                      <td>${(parseFloat(selectedReceiptItem.paymentAmount?.replace(/[^0-9.]/g, '') || '250') * 0.0763).toFixed(2)}</td>
                      <td style={{ textAlign: 'right' }}>
                        <strong style={{ color: 'var(--text-emerald)', fontSize: '0.92rem' }}>{selectedReceiptItem.paymentAmount}</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 4-Tier Automated Ledger Distribution Breakdown */}
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  4-Tier Commission Auto-Ledger Distribution:
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', fontSize: '0.68rem' }}>
                  <div style={{ background: 'var(--bg-dark)', padding: '0.4rem', borderRadius: '4px', textAlign: 'center' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.6rem', display: 'block' }}>PINCODE AGENT</span>
                    <strong style={{ color: '#10b981' }}>₹150.00 (Credited)</strong>
                  </div>
                  <div style={{ background: 'var(--bg-dark)', padding: '0.4rem', borderRadius: '4px', textAlign: 'center' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.6rem', display: 'block' }}>DISTRICT COORD</span>
                    <strong style={{ color: '#0284c7' }}>₹50.00 (Credited)</strong>
                  </div>
                  <div style={{ background: 'var(--bg-dark)', padding: '0.4rem', borderRadius: '4px', textAlign: 'center' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.6rem', display: 'block' }}>DIVISIONAL LEAD</span>
                    <strong style={{ color: '#8b5cf6' }}>₹50.00 (Credited)</strong>
                  </div>
                  <div style={{ background: 'var(--bg-dark)', padding: '0.4rem', borderRadius: '4px', textAlign: 'center' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.6rem', display: 'block' }}>STATE HEAD</span>
                    <strong style={{ color: '#f59e0b' }}>₹50.00 (Credited)</strong>
                  </div>
                </div>
              </div>

              {/* Cryptographic Hash Verification */}
              <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem' }}>
                <span>Cryptographic Seal: <code>SHA256:e89a42f8c9b011d8821a009418294cb9921448</code></span>
                <span style={{ color: '#10b981' }}>Verified Tamper-Proof Document</span>
              </div>

            </div>

            {/* Modal Bottom Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <button
                  className="btn btn-primary"
                  onClick={() => downloadReceiptFile(selectedReceiptItem)}
                  style={{ fontSize: '0.72rem', padding: '0.35rem 0.75rem', background: '#0284c7', borderColor: '#0284c7', fontWeight: 800 }}
                >
                  <Download size={13} /> Download Official Receipt
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    window.print();
                  }}
                  style={{ fontSize: '0.72rem', padding: '0.35rem 0.65rem' }}
                >
                  <Printer size={13} /> Print
                </button>
              </div>

              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    if (showToast) showToast(`Official Tax Invoice dispatched via WhatsApp to ${selectedReceiptItem.customerName}!`);
                  }}
                  style={{ fontSize: '0.68rem', padding: '0.35rem 0.6rem', color: '#10b981', borderColor: '#10b981' }}
                >
                  Resend WhatsApp
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    if (showToast) showToast(`Official Tax Invoice emailed to ${selectedReceiptItem.customerName}!`);
                  }}
                  style={{ fontSize: '0.68rem', padding: '0.35rem 0.6rem', color: '#0284c7', borderColor: '#0284c7' }}
                >
                  Resend Email
                </button>
                <button className="btn btn-secondary" onClick={() => setSelectedReceiptItem(null)} style={{ fontSize: '0.72rem' }}>
                  Close Receipt
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: AI AGENT THOUGHT CHAIN & LIVE EXECUTION INSPECTOR                 */}
      {/* ========================================================================= */}
      {inspectingAiAgent && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999, padding: '1rem' }}>
          <div className="glass-panel" style={{ width: '700px', maxWidth: '95vw', maxHeight: '90vh', overflowY: 'auto', background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '12px', border: '1.5px solid #0284c7', boxShadow: '0 25px 50px rgba(0,0,0,0.7)' }}>
            
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.85rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(2, 132, 199, 0.2)', border: '1px solid #0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
                                  </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    {inspectingAiAgent.name}
                  </h3>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    ID: <code>{inspectingAiAgent.id}</code> • Neural Engine: <strong>{inspectingAiAgent.engine}</strong> • Latency: <strong style={{ color: '#8b5cf6' }}>{inspectingAiAgent.latency}</strong>
                  </div>
                </div>
              </div>
              <button onClick={() => setInspectingAiAgent(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.25rem' }}></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              {/* Status & Work Overview */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div style={{ background: 'rgba(2, 132, 199, 0.08)', border: '1px solid rgba(2, 132, 199, 0.3)', borderRadius: '8px', padding: '0.75rem' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                    Current Work In Execution:
                  </span>
                  <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
                    {inspectingAiAgent.currentWork}
                  </p>
                </div>

                <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '8px', padding: '0.75rem' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                    Next Step Planning:
                  </span>
                  <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
                    {inspectingAiAgent.nextStep}
                  </p>
                </div>
              </div>

              {/* Real-time Thought Chain Stream */}
              <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '8px', padding: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', borderBottom: '1px solid #1e293b', paddingBottom: '0.35rem' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Terminal size={12} /> LIVE EXECUTION & REASONING LOG
                  </span>
                  <span style={{ fontSize: '0.6rem', color: '#10b981', fontFamily: 'monospace' }}>
                    ● STREAMING
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', maxHeight: '200px', overflowY: 'auto' }}>
                  {inspectingAiAgent.thoughtLog.map((log: string, idx: number) => (
                    <div key={idx} style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#94a3b8', lineHeight: '1.4' }}>
                      <span style={{ color: '#38bdf8' }}>&gt;</span> {log}
                    </div>
                  ))}
                </div>
              </div>

              {/* Agent Telemetry Matrix */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', textAlign: 'center' }}>
                <div style={{ background: 'var(--bg-dark)', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', display: 'block' }}>CONFIDENCE</span>
                  <strong style={{ fontSize: '0.82rem', color: '#10b981' }}>{inspectingAiAgent.confidence}</strong>
                </div>
                <div style={{ background: 'var(--bg-dark)', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', display: 'block' }}>CONCURRENCY</span>
                  <strong style={{ fontSize: '0.82rem', color: '#0284c7' }}>{inspectingAiAgent.concurrency}</strong>
                </div>
                <div style={{ background: 'var(--bg-dark)', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', display: 'block' }}>COMPLETED TODAY</span>
                  <strong style={{ fontSize: '0.82rem', color: '#8b5cf6' }}>{inspectingAiAgent.completedToday} Tasks</strong>
                </div>
                <div style={{ background: 'var(--bg-dark)', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', display: 'block' }}>SLA COMPLIANCE</span>
                  <strong style={{ fontSize: '0.82rem', color: '#f59e0b' }}>{inspectingAiAgent.slaRate}</strong>
                </div>
              </div>

            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem' }}>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setPaymentAiWorkforce(prev => prev.map(a => a.id === inspectingAiAgent.id ? { ...a, status: a.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' } : a));
                  setInspectingAiAgent((prev: any) => ({ ...prev, status: prev.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' }));
                  if (showToast) showToast(`Toggled ${inspectingAiAgent.id} execution state.`);
                }}
                style={{ fontSize: '0.72rem', padding: '0.35rem 0.75rem' }}
              >
                {inspectingAiAgent.status === 'ACTIVE' ? 'Pause Agent Execution' : 'Resume Agent Execution'}
              </button>

              <button className="btn btn-primary" onClick={() => setInspectingAiAgent(null)} style={{ fontSize: '0.72rem', padding: '0.35rem 0.85rem' }}>
                Close Inspector
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
