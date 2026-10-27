import React, { useState } from 'react';
import { UserRole } from '../types';
import { FORGE_LOGO } from '../logo';
import { TicketVisionButton } from './TicketVisionFlowModal';
import {
  MessageSquare,
  Phone,
  CheckCircle,
  AlertTriangle,
  User,
  Bot,
  RefreshCw,
  Send,
  PhoneCall,
  PhoneOff,
  RotateCcw,
  Eye,
  Shield,
  CreditCard,
  FileText,
  Clock,
  Zap,
  Activity,
  CheckCircle2,
  XCircle,
  BookOpen,
  Search,
  Sparkles,
  Copy,
  Ticket,
  ChevronRight,
  UserCheck,
  Bell,
  Layers,
  Smartphone,
  Lock,
  MessageCircle,
  Info,
  Calendar,
  Volume2,
  Star,
  ArrowUpRight,
  ArrowRight
} from 'lucide-react';
import { KycHumanOfficerWorkspace } from './KycHumanOfficerWorkspace';
import { PaymentHumanOfficerWorkspace } from './PaymentHumanOfficerWorkspace';
import { OmnichannelDeskSuite, getChannelForTicket } from './OmnichannelDeskSuite';

interface HumanAgentDashboardProps {
  role: UserRole.QUERY_AGENT | UserRole.KYC_AGENT | UserRole.PAYMENT_AGENT;
  activeSubTab?: string;
  onSelectSubTab?: (subTab: string) => void;
}

export const HumanAgentDashboard: React.FC<HumanAgentDashboardProps> = ({ role, activeSubTab = 'AGENT_DESK', onSelectSubTab }) => {
  // Live Active Queries & Sessions
  const [sessions, setSessions] = useState<any[]>([
    {
      id: 'SESS-8801',
      ticketId: 'TCK-8821',
      customerName: 'Sophia Chen',
      customerPhone: '+91-98765-43210',
      accountType: 'Vendor Partner • Referral by AGT-INDIA-101',
      membershipLevel: 'GOLD TIER',
      channel: 'CHAT_WEB',
      category: 'Agent Onboarding Fee & Non-Refundable Policy Terms',
      aiAgent: 'Query AI (Gemini 1.5 Pro)',
      aiStatus: 'AI Monitoring Context...',
      aiConfidence: 99.4,
      sentiment: 'NEUTRAL',
      status: 'LIVE_AI', // 'LIVE_AI' | 'HUMAN_INTERCEPTED' | 'CLOSED_BY_AI' | 'REOPENED_BY_HUMAN'
      duration: '1m 24s',
      slaCountdown: '12m remaining',
      aiReasoning: 'Vector match #KB-881 (Non-Refundable Policy & Terms). Verifying KYC status before advising resolution.',
      suggestedReplies: [
        'Platform Policy: Registration fees are final and non-refundable once submitted.',
        'Would you like me to connect you with our accounts team to review your document status?'
      ],
      chatHistory: [
        { sender: 'CUSTOMER', text: 'Hello, I wanted to know the fee terms if my agent registration has a dispute.' },
        { sender: 'AI', text: 'Hello Sophia! Registration fees are non-refundable per platform terms. Our support team can assist with document re-upload or credential migration.' },
        { sender: 'CUSTOMER', text: 'Understood, thank you for clarifying the policy.' }
      ],
      internalWhisperNotes: [
        { author: 'Sarah Jenkins (TL)', note: 'Customer called earlier regarding registration receipt. Handled smoothly.', time: '10:05 AM' }
      ]
    },
    {
      id: 'SESS-8802',
      ticketId: 'TCK-8822',
      customerName: 'David Miller',
      customerPhone: '+1-800-555-0102',
      accountType: 'Customer Registration (Aadhaar KYC)',
      membershipLevel: 'STANDARD TIER',
      channel: 'VOICE_TWILIO',
      category: 'Document Re-upload Resolution',
      aiAgent: 'Voice Bot AI',
      aiStatus: 'Customer Requesting Human Officer',
      aiConfidence: 68.5,
      sentiment: 'FRUSTRATED',
      status: 'LIVE_AI',
      duration: '2m 10s',
      slaCountdown: '3m (NEAR BREACH)',
      aiReasoning: 'Customer expressed frustration regarding low-resolution Aadhaar card rejection. Human transfer recommended.',
      suggestedReplies: [
        'Hello David, I have manually reviewed your Aadhaar card scan. I am approving your document now.',
        'I see the slight blur on the corner, but the name and numbers are fully legible. Let me override this for you right away.'
      ],
      chatHistory: [
        { sender: 'CUSTOMER', text: 'Why is my Aadhaar card still showing blur error? I uploaded it twice.' },
        { sender: 'AI', text: 'I understand your concern David. The OCR scan detected resolution below 100 DPI on the address corner.' },
        { sender: 'CUSTOMER', text: 'Can a human officer check this? The text is completely readable to me.' }
      ],
      internalWhisperNotes: [
        { author: 'AI Quality Bot', note: 'Sentiment dropped below 40% at 10:12 AM due to duplicate blur alert.', time: '10:12 AM' }
      ]
    },
    {
      id: 'SESS-8803',
      ticketId: 'TCK-8824',
      customerName: 'Frank Miller',
      customerPhone: '+91-99881-22334',
      accountType: 'Vendor Partner (PEP Review Clear)',
      membershipLevel: 'PLATINUM TIER',
      channel: 'WHATSAPP',
      category: 'Vendor Referral Commission Inquiry',
      aiAgent: 'Payment AI',
      aiStatus: 'AI Completed Resolution',
      aiConfidence: 98.1,
      sentiment: 'POSITIVE',
      status: 'CLOSED_BY_AI',
      duration: '45s',
      slaCountdown: 'SLA MET',
      aiReasoning: 'Successfully confirmed 10% referral commission credit to agent wallet. Ticket auto-closed.',
      suggestedReplies: [
        'Hi Frank, checking in to ensure you received the confirmation SMS regarding your referral payout.',
        'Is there any other vendor registration you would like assistance with today?'
      ],
      chatHistory: [
        { sender: 'CUSTOMER', text: 'Did my agent get the $50 referral bonus for my sign-up?' },
        { sender: 'AI', text: 'Yes Frank! $50.00 has been credited to referring agent AGT-INDIA-101 wallet on transaction #PAY-8821.' },
        { sender: 'CUSTOMER', text: 'Awesome, thanks!' },
        { sender: 'AI', text: 'You are welcome! Have a great day with Forge India Connect. Ticket closed.' }
      ],
      internalWhisperNotes: []
    }
  ]);

  const [selectedSession, setSelectedSession] = useState<any>(sessions[0]);
  const [humanMessage, setHumanMessage] = useState('');
  const [isWhisperMode, setIsWhisperMode] = useState(false); // Customer Reply vs Internal Whisper Note
  const [activeCallStatus, setActiveCallStatus] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = React.useRef<any>(null);

  // Department-Specific Supervisor Data & Roles
  const getDepartmentSupervisor = () => {
    if (role === UserRole.KYC_AGENT) {
      return {
        name: 'Alex Vance',
        title: 'KYC Team Lead',
        fullLabel: 'Alex Vance (KYC Team Lead)',
        seniorSupervisor: 'Marcus Thorne (Senior KYC Supervisor)',
        superAdmin: 'Elena Rostova (Support Admin)',
        agentName: 'Rohan Verma',
        agentRoleLabel: 'Senior KYC Verification Officer • KYC-OFF-04'
      };
    }
    if (role === UserRole.PAYMENT_AGENT) {
      return {
        name: 'David Ross',
        title: 'Payment & Settlement Team Lead',
        fullLabel: 'David Ross (Payment Team Lead)',
        seniorSupervisor: 'Michael Chang (Gateway & Settlement Supervisor)',
        superAdmin: 'Elena Rostova (Support Admin)',
        agentName: 'Suresh Reddy',
        agentRoleLabel: 'Payment Settlement Officer • PAY-OFF-02'
      };
    }
    return {
      name: 'Sarah Connor',
      title: 'Query Operations Team Lead',
      fullLabel: 'Sarah Connor (Query Team Lead)',
      seniorSupervisor: 'Sarah Jenkins (Senior Query TL)',
      superAdmin: 'Elena Rostova (Support Admin)',
      agentName: 'Alex Vance',
      agentRoleLabel: 'Query Specialist • AGT-QRY-01'
    };
  };

  // Dynamic Active Sidebar Page Title based on role and active subtab
  const getActiveSidebarHeading = () => {
    if (role === UserRole.QUERY_AGENT) {
      switch (activeSubTab) {
        case 'AGENT_DESK':
        case 'OVERVIEW':
          return 'Live AI Monitor & Intercept';
        case 'URGENT_RADAR':
          return 'Urgent Frustration & SLA Radar';
        case 'MY_TICKETS':
          return 'My Active & Re-Opened Tickets';
        case 'CUSTOMER_LOOKUP':
        case 'TRACKING_DETAILS':
          return 'Tracking Details';
        case 'MULTI_CHANNEL_STREAM':
          return 'Multi-Channel Live Stream';
        case 'CLOSED_ARCHIVE':
          return 'Closed Tickets Archive & Reopen';
        case 'CALL_DIALER':
          return 'Outbound Voice Calling & Dialpad';
        case 'WHATSAPP_SMS_DISPATCH':
          return 'WhatsApp & SMS Quick Dispatch';
        case 'MY_METRICS':
          return 'My Personal Shift Metrics';
        case 'KNOWLEDGE_SEARCH':
          return 'Knowledge Search & RAG';
        case 'SHIFT_NOTES':
          return 'Shift Notes & Announcements';
        default:
          return 'Live AI Monitor & Intercept';
      }
    }
    if (role === UserRole.KYC_AGENT) {
      switch (activeSubTab) {
        case 'LIVE_VERIFICATION_QUEUE':
        case 'OVERVIEW':
          return 'Live Verification Queue';
        case 'AGENT_DESK':
        case 'KYC_SIDE_BY_SIDE':
          return 'Live AI Shadowing & Takeover';
        case 'KYC_ASSIGNED_QUEUE':
          return 'Escalated & Assigned Queue';
        case 'ALL_DOCUMENTS':
          return 'All Received Documents';
        case 'PENDING_DOCS':
        case 'KYC_BLUR_OVERRIDE':
          return 'Blur & Quality Override Desk';
        case 'CALL_DIALER':
        case 'APPLICANT_CALLS':
          return 'Direct Call to Registerer';
        case 'CUSTOMER_LOOKUP':
        case 'TRACKING_DETAILS':
        case 'KYC_ARCHIVE_SEARCH':
          return 'Tracking ID details';
        case 'MY_METRICS':
          return 'Officer Target & Metrics';
        default:
          return 'KYC Human Verification Officer Desk';
      }
    }
    if (role === UserRole.PAYMENT_AGENT) {
      switch (activeSubTab) {
        case 'AGENT_DESK':
        case 'LIVE_QUEUE':
        case 'OVERVIEW':
          return 'Live Transactions & Reconciliation';
        case 'AI_WORKFORCE_MONITOR':
        case 'PAYMENT_AI_PIPELINE':
          return 'Live Payment AI Workforce & Pipeline';
        case 'AGENT_COMMISSIONS_PAYOUTS':
        case 'COMMISSION_AUDIT':
          return 'Agent Wallets & Commission Audit';
        case 'CUSTOMER_LOOKUP':
        case 'TRACKING_DETAILS':
          return 'Tracking Details';
        case 'ESCALATION_QUEUE':
          return 'Payment Escalation Desk';
        case 'PAYMENT_REMINDERS':
        case 'CALL_DIALER':
          return 'Manual Voice Reminders & Calls';
        case 'DEPARTMENT_REPORTS':
          return 'Settlement & Tax Reports';
        case 'AUDIT_TRAIL':
          return 'Payment Audit Trail';
        default:
          return 'Payment Human Settlement Officer Desk';
      }
    }
    return 'Frontline Human Agent Workspace';
  };

  const getInitialPingsForRole = () => {
    if (role === UserRole.KYC_AGENT) {
      return [
        {
          id: 'PING-KYC-01',
          ticketId: 'REG-8822',
          customerName: 'David Miller',
          category: 'Aadhaar Corner Glare & Blur Override',
          sender: 'Alex Vance (KYC Team Lead)',
          message: 'Officer Rohan, please inspect REG-8822 (David Miller). Customer re-uploaded Aadhaar Card, check corner glare and override if name/UID is clear.',
          timestamp: 'Just Now',
          read: false
        },
        {
          id: 'PING-KYC-02',
          ticketId: 'REG-8824',
          customerName: 'Meera Nair (Apex Medical)',
          category: 'PEP / Sanction Watchlist Match (98.6%)',
          sender: 'Marcus Thorne (Senior KYC Supervisor)',
          message: 'Urgent Alert: REG-8824 triggered a 98.6% fuzzy match on Interpol PEP screening. Please perform manual passport dossier review.',
          timestamp: '12 mins ago',
          read: true
        },
        {
          id: 'PING-KYC-03',
          ticketId: 'REG-8812',
          customerName: 'Rajesh Kumar',
          category: 'Field Agent Network Onboarding Verification',
          sender: 'Elena Rostova (Support Admin)',
          message: 'Supervisor Advisory: UIDAI XML verification protocol updated for all Field Agent registrations today.',
          timestamp: '45 mins ago',
          read: true
        }
      ];
    }
    if (role === UserRole.PAYMENT_AGENT) {
      return [
        {
          id: 'PING-PAY-01',
          ticketId: 'PAY-8821',
          customerName: 'Sophia Chen',
          category: 'Vendor Onboarding Fee Gateway Timeout',
          sender: 'David Ross (Payment Team Lead)',
          message: 'Officer Suresh, please inspect transaction #PAY-8821 for Sophia Chen ($500.00 Vendor Fee). Webhook timed out on Razorpay gateway.',
          timestamp: 'Just Now',
          read: false
        },
        {
          id: 'PING-PAY-02',
          ticketId: 'PAY-8825',
          customerName: 'Vikram Mehta',
          category: 'Merchant POS Chargeback Dispute Triage',
          sender: 'Michael Chang (Gateway Supervisor)',
          message: 'Review chargeback dispute on POS terminal #POS-4412 for TechGlobal Merchants before 5:00 PM settlement cutoff.',
          timestamp: '15 mins ago',
          read: true
        },
        {
          id: 'PING-PAY-03',
          ticketId: 'PAY-SYS-01',
          customerName: 'Agent Commission Batch',
          category: 'Automated Commission Settlement Cycle',
          sender: 'Elena Rostova (Support Admin)',
          message: 'Notice: Automated batch payout cycle for Tier 1 Field Agents scheduled at 18:00 IST.',
          timestamp: '1 hour ago',
          read: true
        }
      ];
    }
    return [
      {
        id: 'PING-991',
        ticketId: 'TCK-8822',
        customerName: 'David Miller',
        category: 'Document Re-upload Delay (PSTN Call)',
        sender: 'Sarah Connor (Query Team Lead)',
        message: 'Hi Alex, please check the high priority queue for urgent VIP escalations on billing dispute inquiries.',
        timestamp: 'Just Now',
        read: false
      },
      {
        id: 'PING-990',
        ticketId: 'TCK-8821',
        customerName: 'Sophia Chen',
        category: 'Agent Onboarding Fee & Non-Refundable Terms',
        sender: 'Sarah Connor (Query Team Lead)',
        message: 'Alex, Sophia Chen is asking about KYC onboarding fee terms. Please take over if needed.',
        timestamp: '12 mins ago',
        read: true
      },
      {
        id: 'PING-989',
        ticketId: 'TCK-8834',
        customerName: 'Vikram Mehta',
        category: 'Tax Invoice & GST Input Credit Advisory',
        sender: 'Elena Rostova (Support Admin)',
        message: 'Shift Advisory: High volume in email queue, assist Elena if voice calls subside.',
        timestamp: '45 mins ago',
        read: true
      }
    ];
  };

  // Supervisor Ping Notifications & Floating Popups System
  const [activePingPopup, setActivePingPopup] = useState<any | null>(getInitialPingsForRole()[0]);
  const [showNotificationHistory, setShowNotificationHistory] = useState<boolean>(false);
  const [pingNotificationsList, setPingNotificationsList] = useState<any[]>(getInitialPingsForRole());
  const [targetPingCase, setTargetPingCase] = useState<any | null>(null);

  // Call Transfer Modal State (Transfer back to AI or Transfer to Query TL / Senior Desk)
  const [transferCallModal, setTransferCallModal] = useState<boolean>(false);
  const [transferDestination, setTransferDestination] = useState<'AI_BOT' | 'QUERY_TL' | 'KYC_SPECIALIST'>('AI_BOT');
  const [transferNote, setTransferNote] = useState<string>('');

  const pingTimerRef = React.useRef<any>(null);

  // Auto-dismiss floating popup after 4 seconds
  React.useEffect(() => {
    if (activePingPopup) {
      if (pingTimerRef.current) clearTimeout(pingTimerRef.current);
      pingTimerRef.current = setTimeout(() => {
        setActivePingPopup(null);
      }, 4000); // 4 seconds duration
    }
    return () => {
      if (pingTimerRef.current) clearTimeout(pingTimerRef.current);
    };
  }, [activePingPopup]);

  const showToast = (msg: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2800); // Automatically dismisses after 2.8 seconds
  };
  const [kbSearchQuery, setKbSearchQuery] = useState('');
  const [showCustomerCrm, setShowCustomerCrm] = useState(false);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);
  const [showTemplatesPopup, setShowTemplatesPopup] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [selectedHistoryPhone, setSelectedHistoryPhone] = useState<string | null>(null);
  const [smsMessage, setSmsMessage] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('+91-98765-43210');
  const [recipientName, setRecipientName] = useState('Sophia Chen');
  
  // Universal Lookup States
  const [lookupQuery, setLookupQuery] = useState('ORD-9920148');
  const [lookupType, setLookupType] = useState<'ORDER_ID' | 'MEMBERSHIP_CARD' | 'PHONE' | 'EMAIL'>('ORDER_ID');
  const [lookupResult, setLookupResult] = useState<any>(null);
  const [isSearchingLookup, setIsSearchingLookup] = useState(false);

  // Universal Customer & Order Lookup Mock Database (Deep Enterprise OMS & CRM Data)
  const lookupMockDatabase = [
    {
      id: 'REC-01',
      orderId: 'ORD-9920148',
      membershipCardNumber: 'CARD-IN-889021',
      customerName: 'Sophia Chen',
      phone: '+91-98765-43210',
      email: 'sophia.chen@partner-india.com',
      membershipTier: 'GOLD TIER VIP',
      memberSince: '14 Jan 2024',
      validUntil: '14 Jan 2027 (3 Years Active)',
      kycStatus: 'APPROVED (Level 2 Verified)',
      accountBalance: '$1,250.00 USD',
      rewardPoints: '4,850 Pts (Worth $48.50 Credit)',
      tierDiscount: '15% Lifetime Discount on Licenses',
      dedicatedAgent: 'Rahul Sharma (Senior Query Lead)',
      membershipPerks: [
        '15% Flat Discount across all Partner Store renewals',
        'Zero-Wait Priority Queue for Live Call & Chat Support',
        'Instant Commission Payouts via UPI/IMPS without 48h hold',
        'Free Hardware Replacements for POS card readers'
      ],
      order: {
        orderId: 'ORD-9920148',
        orderDate: '19 Aug 2026, 09:30 AM',
        paymentStatus: 'PAID (Razorpay / UPI Gateway)',
        paymentRef: 'UPI-TXN-8829104829',
        fulfillmentStatus: 'ACTIVE & PROVISIONED',
        disputeStatus: 'RESOLVED (Non-Refundable Policy Applied)',
        shippingAddress: '42, Brigade Road, Ashok Nagar, Bengaluru, Karnataka, 560025, India',
        billingAddress: 'Same as Shipping Address (GSTIN: 29AABCU9603R1ZM)',
        trackingNumber: 'BLUEDART-8829104',
        carrier: 'BlueDart Express Air Courier',
        estimatedDelivery: '21 Aug 2026 by 02:00 PM',
        currentMilestone: 'Out for Local Delivery (Bengaluru Hub)',
        invoiceNumber: 'INV-2026-IN-88291',
        subTotal: '$460.00',
        gstTax: '$40.00 (18% Integrated GST)',
        discountApplied: '-$0.00 (Standard Tier Price)',
        totalAmount: '$500.00 USD',
        items: [
          {
            sku: 'SKU-FORGE-ENT-01',
            name: 'Forge Enterprise Partner Agent Onboarding Package (Yearly License)',
            category: 'Software & Cloud License',
            qty: 1,
            unitPrice: '$400.00',
            total: '$400.00',
            status: 'Provisioned & Key Sent via Email'
          },
          {
            sku: 'SKU-POS-READER-V2',
            name: 'Agent NFC / Chip POS Mobile Card Reader Device v2.4',
            category: 'Hardware Peripherals',
            qty: 1,
            unitPrice: '$60.00',
            total: '$60.00',
            status: 'Shipped (BlueDart Tracking #BLUEDART-8829104)'
          }
        ],
        timeline: [
          { time: '19 Aug 2026, 09:30 AM', event: 'Order Placed & Payment Captured via Razorpay' },
          { time: '19 Aug 2026, 10:15 AM', event: 'Enterprise License Keys Provisioned & Emailed' },
          { time: '19 Aug 2026, 02:00 PM', event: 'POS Hardware Packaged at Electronic City Warehouse' },
          { time: '20 Aug 2026, 08:30 AM', event: 'Dispatched via BlueDart Express (Awb: 8829104)' },
          { time: '21 Aug 2026, 07:15 AM', event: 'Arrived at Ashok Nagar Delivery Hub' }
        ]
      },
      pastOrders: [
        { id: 'ORD-8810234', item: 'Agent POS Mobile Card Reader v2', date: '02 Feb 2025', amount: '$120.00', status: 'DELIVERED' },
        { id: 'ORD-7749102', item: 'Annual Partner Compliance Renewal', date: '10 Jan 2025', amount: '$250.00', status: 'COMPLETED' }
      ],
      associatedTickets: [
        { id: 'TCK-8821', subject: 'Agent Onboarding Fee & Non-Refundable Policy Inquiry', status: 'LIVE_AI', priority: 'HIGH', date: 'Today, 10:14 AM' },
        { id: 'TCK-7719', subject: 'Referral Commission Payout Verification', status: 'RESOLVED', priority: 'MEDIUM', date: '15 Aug 2026' }
      ]
    },
    {
      id: 'REC-02',
      orderId: 'ORD-7740291',
      membershipCardNumber: 'CARD-IN-442109',
      customerName: 'David Miller',
      phone: '+1-800-555-0102',
      email: 'david.miller@globalventures.io',
      membershipTier: 'PLATINUM ELITE',
      memberSince: '08 Mar 2023',
      validUntil: '08 Mar 2028 (5 Years Active)',
      kycStatus: 'RE-UPLOAD REQUIRED (Blur OCR)',
      accountBalance: '$3,800.00 USD',
      rewardPoints: '12,400 Pts (Worth $124.00 Credit)',
      tierDiscount: '25% Enterprise Volume Discount',
      dedicatedAgent: 'Aman Verma (Enterprise Key Account Specialist)',
      membershipPerks: [
        '24/7 Dedicated Technical Account Manager (TAM)',
        '99.99% Uptime Enterprise SLA with 10-Min Response Time Guarantee',
        'Private Dedicated AI Voice Telephony SIP Trunks',
        'Unlimited Zero-Fee International Wire Remittances'
      ],
      order: {
        orderId: 'ORD-7740291',
        orderDate: '18 Aug 2026, 04:15 PM',
        paymentStatus: 'PAID (Stripe / International Card)',
        paymentRef: 'ch_3N8x8291048bf',
        fulfillmentStatus: 'PENDING KYC APPROVAL',
        disputeStatus: 'INELIGIBLE (Active SLA Contract • Non-Refundable)',
        shippingAddress: '742 Evergreen Terrace, Springfield, OR 97477, United States',
        billingAddress: 'Global Ventures HQ, 100 Financial Way, New York, NY 10005',
        trackingNumber: 'FEDEX-9920148',
        carrier: 'FedEx Priority International Freight',
        estimatedDelivery: '22 Aug 2026 by 10:30 AM',
        currentMilestone: 'Customs Clearance Completed (Portland Hub)',
        invoiceNumber: 'INV-2026-US-44210',
        subTotal: '$1,100.00',
        gstTax: '$100.00 (State Sales Tax)',
        discountApplied: '-$0.00',
        totalAmount: '$1,200.00 USD',
        items: [
          {
            sku: 'SKU-AI-GATEWAY-10',
            name: 'Enterprise Multi-Tenant AI Gateway Subscription (Monthly Dedicated Cluster)',
            category: 'Infrastructure & APIs',
            qty: 1,
            unitPrice: '$1,000.00',
            total: '$1,000.00',
            status: 'Awaiting Identity Verification Clear'
          },
          {
            sku: 'SKU-SIP-TRUNK-10',
            name: 'Twilio PSTN Dedicated SIP Trunk Line (10 Concurrent Voice Channels)',
            category: 'Telephony Voice Trunks',
            qty: 1,
            unitPrice: '$100.00',
            total: '$100.00',
            status: 'Reserved on Cloud'
          }
        ],
        timeline: [
          { time: '18 Aug 2026, 04:15 PM', event: 'Enterprise Order Created & Billed via Stripe' },
          { time: '18 Aug 2026, 04:30 PM', event: 'Gateway Instances Staged on Oregon Cloud DC' },
          { time: '19 Aug 2026, 09:00 AM', event: 'KYC Document Flagged (Aadhaar/ID OCR Blur)' }
        ]
      },
      pastOrders: [
        { id: 'ORD-6629104', item: 'AI Voice Telephony Trunk Expansion (10 Channels)', date: '12 May 2025', amount: '$600.00', status: 'ACTIVE' }
      ],
      associatedTickets: [
        { id: 'TCK-8822', subject: 'Aadhaar 300 DPI OCR Blur Exception', status: 'FRUSTRATED', priority: 'CRITICAL', date: 'Today, 10:18 AM' }
      ]
    },
    {
      id: 'REC-03',
      orderId: 'ORD-5539102',
      membershipCardNumber: 'CARD-IN-119283',
      customerName: 'Frank Miller',
      phone: '+91-98765-11223',
      email: 'frank.miller@enterprisesolutions.in',
      membershipTier: 'STANDARD PARTNER',
      memberSince: '20 Jul 2024',
      validUntil: '20 Jul 2025 (1 Year License)',
      kycStatus: 'APPROVED',
      accountBalance: '$450.00 USD',
      rewardPoints: '950 Pts (Worth $9.50 Credit)',
      tierDiscount: '5% Standard Partner Rebate',
      dedicatedAgent: 'General Support Pool',
      membershipPerks: [
        'Standard AI Chat & Email Support (4-Hour SLA)',
        '5% Referral Commission on Onboarded Sub-Vendors',
        'Basic Web Portal Dashboard Access'
      ],
      order: {
        orderId: 'ORD-5539102',
        orderDate: '17 Aug 2026, 11:20 AM',
        paymentStatus: 'PAID (NetBanking HDFC)',
        paymentRef: 'HDFC-88291004',
        fulfillmentStatus: 'COMPLETED',
        settlementStatus: 'SETTLED',
        shippingAddress: 'Suite 102, Cyber City, Gurugram, Haryana, 122002, India',
        billingAddress: 'Same as Shipping Address',
        trackingNumber: 'DELHIVERY-55391',
        carrier: 'Delhivery Surface Logistics',
        estimatedDelivery: '19 Aug 2026 (Delivered)',
        currentMilestone: 'Package Delivered & Signed by Security',
        invoiceNumber: 'INV-2026-IN-55391',
        subTotal: '$135.00',
        gstTax: '$15.00 (12% GST)',
        discountApplied: '-$0.00',
        totalAmount: '$150.00 USD',
        items: [
          {
            sku: 'SKU-REF-BUNDLE',
            name: 'Vendor Referral Network Activation Bundle & Marketing Collateral Kit',
            category: 'Marketing Materials',
            qty: 1,
            unitPrice: '$135.00',
            total: '$135.00',
            status: 'Delivered'
          }
        ],
        timeline: [
          { time: '17 Aug 2026, 11:20 AM', event: 'Order Placed via HDFC NetBanking' },
          { time: '17 Aug 2026, 03:00 PM', event: 'Dispatched via Delhivery Express' },
          { time: '19 Aug 2026, 01:15 PM', event: 'Delivered at Gurugram Cyber City' }
        ]
      },
      pastOrders: [],
      associatedTickets: [
        { id: 'TCK-8823', subject: 'Vendor Referral Commission Inquiry', status: 'CLOSED_BY_AI', priority: 'LOW', date: 'Yesterday' }
      ]
    }
  ];

  // Lookup Search Handler
  const handleExecuteLookup = (queryOverride?: string) => {
    const q = (queryOverride || lookupQuery).trim().toLowerCase();
    if (!q) {
      alert('Please enter an Order ID or Membership Card Number.');
      return;
    }
    setIsSearchingLookup(true);
    setTimeout(() => {
      const match = lookupMockDatabase.find(
        item =>
          item.orderId.toLowerCase().includes(q) ||
          item.membershipCardNumber.toLowerCase().includes(q) ||
          item.customerName.toLowerCase().includes(q) ||
          item.phone.includes(q) ||
          item.email.toLowerCase().includes(q)
      );
      setLookupResult(match || null);
      setIsSearchingLookup(false);
      if (!match) {
        showToast(`No record found for "${q}". Please verify the Order ID or Membership Number.`);
      } else {
        showToast(`Fetched record for ${match.customerName} (${match.orderId})`);
      }
    }, 300);
  };
  const [dispatchHistory, setDispatchHistory] = useState<any[]>([
    {
      id: 'DISP-01',
      phone: '+91-98765-43210',
      name: 'Sophia Chen',
      channel: 'WHATSAPP',
      message: 'Hello Sophia! Registration fee terms confirmed: fees are non-refundable and your agent portal access is activated.',
      status: 'DELIVERED',
      timestamp: 'Today, 10:14 AM'
    },
    {
      id: 'DISP-02',
      phone: '+91-98765-43210',
      name: 'Sophia Chen',
      channel: 'WHATSAPP',
      message: 'Official Tax Invoice reference #INV-2026-9920148 has been generated with GST input tax credit.',
      status: 'DELIVERED',
      timestamp: 'Today, 10:25 AM'
    },
    {
      id: 'DISP-03',
      phone: '+91-98765-43210',
      name: 'Sophia Chen',
      channel: 'SMS',
      message: 'Your registration fee receipt of $500.00 is confirmed. Thank you for your partnership.',
      status: 'SENT_TWILIO',
      timestamp: 'Today, 10:45 AM'
    },
    {
      id: 'DISP-04',
      phone: '+1-800-555-0102',
      name: 'David Miller',
      channel: 'SMS',
      message: 'Aadhaar document re-upload link: https://portal.enterprise.ai/upload?ref=KYC-RETRY',
      status: 'SENT_TWILIO',
      timestamp: 'Today, 10:18 AM'
    },
    {
      id: 'DISP-05',
      phone: '+1-800-555-0102',
      name: 'David Miller',
      channel: 'WHATSAPP',
      message: 'Your 300 DPI Aadhaar re-scan has been received and approved by our L2 verification team.',
      status: 'DELIVERED',
      timestamp: 'Today, 11:30 AM'
    }
  ]);
  const [selectedChannelFilter, setSelectedChannelFilter] = useState<'CHAT_WEB' | 'VOICE_TWILIO' | 'WHATSAPP' | 'EMAIL'>('CHAT_WEB');

  // Expanded Multi-Channel Dataset
  const multiChannelData: Record<string, any[]> = {
    CHAT_WEB: [
      {
        id: 'CHAT-01',
        ticketId: 'TCK-8821',
        customerName: 'Sophia Chen',
        customerPhone: '+91-98765-43210',
        accountType: 'Vendor Partner • Referral by AGT-INDIA-101',
        membershipLevel: 'GOLD TIER',
        category: 'Agent Onboarding Fee & Non-Refundable Policy',
        status: 'LIVE_AI',
        aiAgent: 'Query AI (Gemini 1.5 Pro)',
        aiConfidence: 99.4,
        sentiment: 'NEUTRAL',
        duration: '1m 24s',
        slaCountdown: '12m remaining',
        preview: 'Understood, thank you for clarifying the policy.',
        chatHistory: [
          { sender: 'CUSTOMER', text: 'Hello, I wanted to know the fee terms if my agent registration has a dispute.' },
          { sender: 'AI', text: 'Hello Sophia! Registration fees are non-refundable per platform terms. Our support team can assist with document re-upload or credential migration.' },
          { sender: 'CUSTOMER', text: 'Understood, thank you for clarifying the policy.' }
        ]
      },
      {
        id: 'CHAT-02',
        ticketId: 'TCK-8830',
        customerName: 'Aarav Patel',
        customerPhone: '+91-98120-11223',
        accountType: 'New Applicant',
        membershipLevel: 'STANDARD TIER',
        category: 'Login Portal Password Reset',
        status: 'LIVE_AI',
        aiAgent: 'Query AI (Gemini 1.5 Pro)',
        aiConfidence: 97.8,
        sentiment: 'POSITIVE',
        duration: '45s',
        slaCountdown: '14m remaining',
        preview: 'Thanks, the OTP link worked!',
        chatHistory: [
          { sender: 'CUSTOMER', text: 'I forgot my portal password, can you help reset it?' },
          { sender: 'AI', text: 'Sure Aarav! A 6-digit secure password reset link has been dispatched to your registered phone number.' },
          { sender: 'CUSTOMER', text: 'Thanks, the OTP link worked!' }
        ]
      },
      {
        id: 'CHAT-03',
        ticketId: 'TCK-8831',
        customerName: 'Ananya Roy',
        customerPhone: '+91-97334-55667',
        accountType: 'Agent Partner',
        membershipLevel: 'SILVER TIER',
        category: 'Wallet Payout Schedule Inquiry',
        status: 'LIVE_AI',
        aiAgent: 'Query AI (Gemini 1.5 Pro)',
        aiConfidence: 99.1,
        sentiment: 'NEUTRAL',
        duration: '2m 05s',
        slaCountdown: '8m remaining',
        preview: 'When is the next automatic bank payout cycle?',
        chatHistory: [
          { sender: 'CUSTOMER', text: 'When is the next automatic bank payout cycle?' },
          { sender: 'AI', text: 'Wallet payouts are processed automatically every Tuesday and Friday at 11:00 AM IST.' }
        ]
      }
    ],
    VOICE_TWILIO: [
      {
        id: 'VOICE-01',
        ticketId: 'TCK-8822',
        customerName: 'David Miller',
        customerPhone: '+1-800-555-0102',
        accountType: 'Customer Registration (Aadhaar KYC)',
        membershipLevel: 'STANDARD TIER',
        category: 'Document Re-upload Delay (PSTN Call)',
        status: 'LIVE_AI',
        aiAgent: 'Voice Bot AI (Twilio)',
        aiConfidence: 68.5,
        sentiment: 'FRUSTRATED',
        duration: '2m 10s',
        slaCountdown: '3m (NEAR BREACH)',
        preview: 'Can a human officer check this? The text is readable.',
        chatHistory: [
          { sender: 'CUSTOMER', text: 'Why is my Aadhaar card still showing blur error? I uploaded it twice.' },
          { sender: 'AI', text: 'I understand your concern David. The OCR scan detected resolution below 100 DPI on the address corner.' },
          { sender: 'CUSTOMER', text: 'Can a human officer check this? The text is completely readable to me.' }
        ]
      },
      {
        id: 'VOICE-02',
        ticketId: 'TCK-8832',
        customerName: 'Marcus Brody',
        customerPhone: '+1-800-555-0104',
        accountType: 'Enterprise Vendor',
        membershipLevel: 'PLATINUM TIER',
        category: 'Custom SLA Contract Upgrade Call',
        status: 'LIVE_AI',
        aiAgent: 'Voice Bot AI (Twilio)',
        aiConfidence: 96.2,
        sentiment: 'POSITIVE',
        duration: '1m 45s',
        slaCountdown: '11m remaining',
        preview: 'Please email me the enterprise tier datasheet.',
        chatHistory: [
          { sender: 'CUSTOMER', text: 'Hello, I want to upgrade to 24/7 dedicated telephone support for our team.' },
          { sender: 'AI', text: 'Hello Marcus! Our Platinum Enterprise tier includes 24/7 phone routing with a 15-minute SLA resolution guarantee.' },
          { sender: 'CUSTOMER', text: 'Please email me the enterprise tier datasheet.' }
        ]
      }
    ],
    WHATSAPP: [
      {
        id: 'WA-01',
        ticketId: 'TCK-8824',
        customerName: 'Frank Miller',
        customerPhone: '+91-99881-22334',
        accountType: 'Vendor Partner (PEP Review Clear)',
        membershipLevel: 'PLATINUM TIER',
        category: 'Vendor Referral Commission Inquiry',
        status: 'CLOSED_BY_AI',
        aiAgent: 'Payment AI (WhatsApp)',
        aiConfidence: 98.1,
        sentiment: 'POSITIVE',
        duration: '45s',
        slaCountdown: 'SLA MET',
        preview: 'Did my agent get the $50 referral bonus for my sign-up?',
        chatHistory: [
          { sender: 'CUSTOMER', text: 'Did my agent get the $50 referral bonus for my sign-up?' },
          { sender: 'AI', text: 'Yes Frank! $50.00 has been credited to referring agent AGT-INDIA-101 wallet on transaction #PAY-8821.' },
          { sender: 'CUSTOMER', text: 'Awesome, thanks!' },
          { sender: 'AI', text: 'You are welcome! Have a great day with Forge India Connect. Ticket closed.' }
        ]
      },
      {
        id: 'WA-02',
        ticketId: 'TCK-8833',
        customerName: 'Karthik Raja',
        customerPhone: '+91-98440-99881',
        accountType: 'Tier 1 Partner',
        membershipLevel: 'GOLD TIER',
        category: 'Vendor Registration QR Code Request',
        status: 'LIVE_AI',
        aiAgent: 'Query AI (WhatsApp)',
        aiConfidence: 99.0,
        sentiment: 'NEUTRAL',
        duration: '1m 10s',
        slaCountdown: '9m remaining',
        preview: 'Sent new onboarding QR code to customer.',
        chatHistory: [
          { sender: 'CUSTOMER', text: 'Please send my agent referral QR code on WhatsApp.' },
          { sender: 'AI', text: 'Here is your official referral registration QR code: https://portal.enterprise.ai/qr/AGT-INDIA-103' }
        ]
      }
    ],
    EMAIL: [
      {
        id: 'EM-01',
        ticketId: 'TCK-8834',
        customerName: 'Vikram Mehta (Heritage Grand Hotel)',
        customerEmail: 'vikram.mehta@heritagegrand.com',
        customerPhone: '+91-99220-44556',
        accountType: 'Hospitality Partner • Tier 1 Vendor',
        membershipLevel: 'GOLD TIER',
        category: 'Tax Invoice & GST Input Credit Advisory',
        subject: 'Request for Digitally Signed GST Tax Invoice #INV-9902',
        status: 'LIVE_AI',
        aiAgent: 'Email Agent AI (Gemini 1.5 Pro)',
        aiConfidence: 95.5,
        sentiment: 'NEUTRAL',
        duration: '3m 20s',
        slaCountdown: '25m remaining',
        preview: 'Attached Invoice #INV-9902 with GST breakdown.',
        chatHistory: [
          {
            sender: 'CUSTOMER',
            from: 'Vikram Mehta <vikram.mehta@heritagegrand.com>',
            to: 'support@forgeconnect.in',
            subject: 'Request for Digitally Signed GST Tax Invoice #INV-9902',
            date: 'Today, 10:15 AM',
            text: `Dear Support Team,\n\nWe have completed our vendor registration fee payment of $500.00 yesterday. Could you please provide the official digitally signed GST Tax Invoice for Invoice #INV-9902? We require this document for our quarterly input tax credit filing.\n\nThanks & Regards,\nVikram Mehta\nFinance Director, Heritage Grand Hotel`
          },
          {
            sender: 'AI',
            from: 'Forge Support AI <support@forgeconnect.in>',
            to: 'vikram.mehta@heritagegrand.com',
            subject: 'Re: Request for Digitally Signed GST Tax Invoice #INV-9902',
            date: 'Today, 10:16 AM',
            text: `Dear Vikram,\n\nThank you for reaching out to Forge India Connect.\n\nWe have verified your payment of $500.00 for Invoice #INV-9902. Please find attached the digitally signed GST Tax Invoice containing our GSTIN and 18% Input Tax Credit breakdown.\n\n• Invoice No: INV-9902\n• Total Amount: $500.00 (Incl. 18% GST)\n• UTR / Payment Ref: RAZORPAY-4829104\n\nIf you require any further documentation, feel free to reply directly to this email.\n\nBest Regards,\nForge India Connect Support Desk`
          },
          {
            sender: 'CUSTOMER',
            from: 'Vikram Mehta <vikram.mehta@heritagegrand.com>',
            to: 'support@forgeconnect.in',
            subject: 'Re: Request for Digitally Signed GST Tax Invoice #INV-9902',
            date: 'Today, 10:22 AM',
            text: `Thank you for the quick invoice copy! Could you also confirm if our vendor account is now fully active for customer bookings?`
          }
        ]
      },
      {
        id: 'EM-02',
        ticketId: 'TCK-8835',
        customerName: 'Pooja Deshmukh (North Star Logistics)',
        customerEmail: 'pooja.deshmukh@northstarlogistics.in',
        customerPhone: '+91-98770-33221',
        accountType: 'Delhi Hub Vendor',
        membershipLevel: 'STANDARD TIER',
        category: 'Business License Validity Clarification',
        subject: 'Inquiry on Municipal Trade License Validity & 2030 Renewal Policy',
        status: 'LIVE_AI',
        aiAgent: 'Email Agent AI (Gemini 1.5 Pro)',
        aiConfidence: 97.0,
        sentiment: 'POSITIVE',
        duration: '1m 50s',
        slaCountdown: '40m remaining',
        preview: 'Your 2030 municipal permit has been validated.',
        chatHistory: [
          {
            sender: 'CUSTOMER',
            from: 'Pooja Deshmukh <pooja.deshmukh@northstarlogistics.in>',
            to: 'support@forgeconnect.in',
            subject: 'Inquiry on Municipal Trade License Validity & 2030 Renewal Policy',
            date: 'Today, 09:40 AM',
            text: `Hello Forge India Team,\n\nWe submitted our Trade License copy during the vendor onboarding process. Could you please confirm if our license valid until 2030 has been verified with the municipal registry?\n\nSincerely,\nPooja Deshmukh`
          },
          {
            sender: 'AI',
            from: 'Forge Support AI <support@forgeconnect.in>',
            to: 'pooja.deshmukh@northstarlogistics.in',
            subject: 'Re: Inquiry on Municipal Trade License Validity & 2030 Renewal Policy',
            date: 'Today, 09:42 AM',
            text: `Dear Pooja,\n\nYour municipal business license (Permit #HOTEL-PERMIT-4489) has been verified against the State Municipal Registry and is approved with validity up to May 15, 2030.\n\nYour KYC status has been marked as COMPLETED.\n\nWarm Regards,\nForge Compliance Team`
          }
        ]
      }
    ]
  };

  const [selectedChannelSession, setSelectedChannelSession] = useState<any>(multiChannelData.CHAT_WEB[0]);


  // Knowledge Base Articles List
  const [kbArticles] = useState([
    {
      id: 'KB-881',
      title: 'Agent Onboarding Fee & Non-Refundable Policy',
      category: 'PAYMENTS',
      content: 'Agent registration and partner onboarding fees are final and non-refundable per platform commercial terms. KYC compliance disputes require supervisor review.'
    },
    {
      id: 'KB-882',
      title: 'Aadhaar / PAN Blur & OCR Exceptions SOP',
      category: 'KYC',
      content: 'Human officers are authorized to manually approve documents with resolution between 80-100 DPI if all 12 digits and holder name are clear.'
    },
    {
      id: 'KB-883',
      title: 'Tie-up Agent 10% Referral Commission Rules',
      category: 'COMMISSIONS',
      content: 'Referral commission is credited instantly to the agent wallet once the referred vendor completes KYC and payment clearance.'
    }
  ]);

  // Shift Notes posted by TL
  const [shiftNotesList] = useState([
    {
      id: 'NOTE-101',
      author: 'Sarah Jenkins (Query TL)',
      level: 'CRITICAL',
      time: '08:00 AM Today',
      title: 'Banking Gateway Maintenance Window Alert',
      content: 'HDFC & Razorpay Netbanking will undergo scheduled maintenance between 02:00 PM - 03:00 PM. Instruct customers to use UPI or Stripe card payments.'
    },
    {
      id: 'NOTE-102',
      author: 'Sarah Jenkins (Query TL)',
      level: 'IMPORTANT',
      time: 'Yesterday',
      title: 'New Billing Dispute Settlement Protocol',
      content: 'Any commercial billing dispute exceeding $1,000 must have an internal whisper note and TL sign-off before closure.'
    }
  ]);

  const handleTakeover = (sessionId: string) => {
    setSessions(prev => prev.map(s => {
      if (s.id === sessionId) {
        return {
          ...s,
          status: 'HUMAN_INTERCEPTED',
          aiStatus: 'Human Agent In Control'
        };
      }
      return s;
    }));
    if (selectedSession.id === sessionId) {
      setSelectedSession((prev: any) => ({
        ...prev,
        status: 'HUMAN_INTERCEPTED',
        aiStatus: 'Human Agent In Control'
      }));
    }
    showToast(`Intercepted session ${sessionId}! AI paused; you are now chatting live with ${selectedSession.customerName}.`);
  };

  const handleReopen = (sessionId: string) => {
    setSessions(prev => prev.map(s => {
      if (s.id === sessionId) {
        return {
          ...s,
          status: 'REOPENED_BY_HUMAN',
          aiStatus: 'Re-opened by Human Agent'
        };
      }
      return s;
    }));
    if (selectedSession.id === sessionId) {
      setSelectedSession((prev: any) => ({
        ...prev,
        status: 'REOPENED_BY_HUMAN',
        aiStatus: 'Re-opened by Human Agent'
      }));
    }
    showToast(`Case ${sessionId} re-opened! You can now call or send a follow-up message.`);
  };

  const handleSendMessage = (msgToSend?: string) => {
    const text = msgToSend || humanMessage;
    if (!text.trim()) return;

    if (isWhisperMode) {
      // Add Internal Whisper Note
      const newNote = {
        author: 'Rahul Sharma (Query Specialist)',
        note: text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setSessions(prev => prev.map(s => {
        if (s.id === selectedSession.id) {
          return {
            ...s,
            internalWhisperNotes: [...(s.internalWhisperNotes || []), newNote]
          };
        }
        return s;
      }));
      setSelectedSession((prev: any) => ({
        ...prev,
        internalWhisperNotes: [...(prev.internalWhisperNotes || []), newNote]
      }));
      showToast('Private whisper note recorded internally for Team Lead.');
    } else {
      // Send message to customer
      const newMsg = { sender: 'HUMAN_AGENT', text };
      setSessions(prev => prev.map(s => {
        if (s.id === selectedSession.id) {
          return {
            ...s,
            chatHistory: [...s.chatHistory, newMsg]
          };
        }
        return s;
      }));
      setSelectedSession((prev: any) => ({
        ...prev,
        chatHistory: [...prev.chatHistory, newMsg]
      }));
    }
    setHumanMessage('');
  };

  const handleStartCall = (phone: string) => {
    setActiveCallStatus('DIALING');
    showToast(`Initiating outbound Twilio voice call to ${phone}...`);
    setTimeout(() => {
      setActiveCallStatus('IN_CALL');
    }, 1500);
  };

  const handleEndCall = () => {
    setActiveCallStatus(null);
    showToast('Outbound voice call ended. Call audio transcript saved to audit log.');
  };

  return (
    <div className="main-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Futuristic Holographic Glassmorphic Toast with Live Timer Bar */}
      {toastMessage && (
        <div className="dynamic-glass-toast">
          {/* Glowing AI Live Status Beacon */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexShrink: 0 }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--accent-success)',
                boxShadow: '0 0 10px var(--accent-success)',
                display: 'inline-block'
              }}
            />
            <span style={{ fontSize: '0.72rem', color: 'var(--accent-success)', fontWeight: 800, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              LIVE
            </span>
          </div>

          <div style={{ height: '16px', width: '1.5px', background: 'var(--border-color)', opacity: 0.6, flexShrink: 0 }} />

          {/* Toast Message Text */}
          <span style={{ flex: 1, lineHeight: '1.4', fontSize: '0.83rem', fontWeight: 600 }}>
            {toastMessage}
          </span>

          {/* Close Action */}
          <button
            onClick={() => setToastMessage(null)}
            style={{
              background: 'rgba(125, 125, 125, 0.12)',
              border: '1px solid var(--border-color)',
              borderRadius: '50%',
              width: '22px',
              height: '22px',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.7rem',
              fontWeight: 800,
              flexShrink: 0,
              transition: 'all 0.2s ease',
              marginLeft: '0.2rem'
            }}
            title="Dismiss notification"
          >
                      </button>

          {/* Animated Auto-Dismiss Countdown Progress Bar */}
          <div className="toast-progress-line" />
        </div>
      )}

      {/* Header Banner (Hidden on Tracking Details to provide clean full page layout) */}
      {activeSubTab !== 'CUSTOMER_LOOKUP' && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-surface)', padding: '1.25rem', borderRadius: '10px', borderLeft: '4px solid #ffd700', border: '1px solid var(--border-color)', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <img src={FORGE_LOGO} alt="FORGE INDIA CONNECT" style={{ width: '42px', height: '42px', borderRadius: '50%', border: '2px solid #ffd700', objectFit: 'cover' }} />
            <div>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                {getActiveSidebarHeading()}
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: '0.3rem 0 0 0' }}>
                Officer: <strong>{getDepartmentSupervisor().agentName} ({getDepartmentSupervisor().agentRoleLabel})</strong> • Supervisor: <strong style={{ color: '#0284c7' }}>{getDepartmentSupervisor().fullLabel}</strong> • Status: <span style={{ color: '#10b981', fontWeight: 700 }}>ONLINE & MONITORING</span>
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
            {/* SUPERVISOR PINGS NOTIFICATION BELL WITH HISTORY DROPDOWN */}
            <div style={{ position: 'relative' }}>
              <button
                className="btn btn-secondary"
                onClick={() => setShowNotificationHistory(!showNotificationHistory)}
                style={{
                  position: 'relative',
                  padding: '0.45rem 0.75rem',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  borderRadius: '8px',
                  background: showNotificationHistory ? '#0284c7' : 'var(--bg-dark)',
                  color: showNotificationHistory ? '#fff' : 'var(--text-main)',
                  border: '1px solid var(--border-color)'
                }}
                title="Supervisor Ping Notifications & History"
              >
                <Bell size={16} color={showNotificationHistory ? '#fff' : '#0284c7'} />
                <span style={{ fontSize: '0.72rem', fontWeight: 700 }}>Pings</span>
                {pingNotificationsList.filter(n => !n.read).length > 0 && (
                  <span
                    style={{
                      background: '#ef4444',
                      color: '#fff',
                      fontSize: '0.62rem',
                      fontWeight: 800,
                      padding: '0.1rem 0.4rem',
                      borderRadius: '10px',
                      marginLeft: '0.15rem',
                      animation: 'pulse 1.8s infinite'
                    }}
                  >
                    {pingNotificationsList.filter(n => !n.read).length}
                  </span>
                )}
              </button>

              {/* Ping Notifications History Dropdown */}
              {showNotificationHistory && (
                <div
                  className="glass-panel"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    width: '380px',
                    zIndex: 1100,
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    boxShadow: '0 12px 36px rgba(0,0,0,0.4)',
                    padding: '0.85rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.65rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Bell size={14} color="#0284c7" />
                      <strong style={{ fontSize: '0.82rem', color: 'var(--text-main)' }}>Supervisor Ping History</strong>
                    </div>
                    <button
                      className="btn"
                      onClick={() => {
                        setPingNotificationsList(pingNotificationsList.map(n => ({ ...n, read: true })));
                        showToast('All pings marked as read.');
                      }}
                      style={{ fontSize: '0.65rem', color: '#0284c7', background: 'transparent', padding: '0.1rem 0.3rem', border: 'none' }}
                    >
                      Mark all read
                    </button>
                  </div>

                  <div style={{ maxHeight: '280px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {pingNotificationsList.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-muted)', fontSize: '0.74rem' }}>
                        No supervisor pings yet.
                      </div>
                    ) : (
                      pingNotificationsList.map((item) => (
                        <div
                          key={item.id}
                          style={{
                            background: item.read ? 'var(--bg-dark)' : 'rgba(2, 132, 199, 0.09)',
                            border: `1px solid ${item.read ? 'var(--border-color)' : 'rgba(2, 132, 199, 0.35)'}`,
                            borderLeft: `3px solid ${item.read ? '#6b7280' : '#0284c7'}`,
                            padding: '0.65rem 0.75rem',
                            borderRadius: '6px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.35rem'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-main)' }}>
                                {item.sender}
                              </span>
                              <span style={{ fontSize: '0.62rem', color: '#0284c7', background: 'rgba(2, 132, 199, 0.15)', padding: '0.1rem 0.35rem', borderRadius: '4px', fontWeight: 700 }}>
                                {item.ticketId}
                              </span>
                            </div>
                            <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>{item.timestamp}</span>
                          </div>

                          <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
                            "{item.message}"
                          </p>

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.2rem' }}>
                            <span style={{ fontSize: '0.64rem', color: 'var(--text-muted)' }}>
                              Case: <strong>{item.customerName}</strong>
                            </span>
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                setShowNotificationHistory(false);
                                setActivePingPopup(null);
                                if (role === UserRole.PAYMENT_AGENT) {
                                  setTargetPingCase({ ...item, _ts: Date.now() });
                                  if (onSelectSubTab) onSelectSubTab('AGENT_DESK');
                                  showToast(`Opened Case ${item.ticketId} (${item.customerName}) in Takeover Console!`);
                                } else if (role === UserRole.KYC_AGENT) {
                                  setTargetPingCase({ ...item, _ts: Date.now() });
                                  if (onSelectSubTab) onSelectSubTab('KYC_DESK');
                                  showToast(`Opened KYC Case ${item.ticketId} (${item.customerName}) from Supervisor Ping.`);
                                } else {
                                  const match = sessions.find(s => s.ticketId === item.ticketId);
                                  if (match) {
                                    setSelectedSession(match);
                                  } else {
                                    setSelectedSession(sessions[1] || sessions[0]);
                                  }
                                  if (onSelectSubTab) onSelectSubTab('AGENT_DESK');
                                  showToast(`Opened Case ${item.ticketId} (${item.customerName}) from Supervisor Ping.`);
                                }
                              }}
                              style={{
                                background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                                color: '#fff',
                                fontSize: '0.64rem',
                                padding: '0.2rem 0.55rem',
                                borderRadius: '4px',
                                border: 'none',
                                fontWeight: 700
                              }}
                            >
                              Open Case {item.ticketId} →
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      // Trigger simulated incoming live ping from the agent's actual department Team Lead
                      const sup = getDepartmentSupervisor();
                      let newPing: any;

                      if (role === UserRole.KYC_AGENT) {
                        newPing = {
                          id: `PING-KYC-${Date.now().toString().slice(-3)}`,
                          ticketId: 'REG-8823',
                          customerName: 'Marcus Wright (Field Agent)',
                          category: 'Tamper & Bounding Box Anomaly',
                          sender: sup.fullLabel,
                          message: 'Urgent from KYC Lead: Application REG-8823 has an EXIF timestamp and MRZ font anomaly. Please inspect document forensics immediately.',
                          timestamp: 'Just Now',
                          read: false
                        };
                      } else if (role === UserRole.PAYMENT_AGENT) {
                        newPing = {
                          id: `PING-PAY-${Date.now().toString().slice(-3)}`,
                          ticketId: 'PAY-8829',
                          customerName: 'Elena Rostova',
                          category: 'Payout Dual-Signoff Escalation',
                          sender: sup.fullLabel,
                          message: 'Urgent from Payment Lead: Transaction #PAY-8829 is pending manual approval before daily bank batch cut-off.',
                          timestamp: 'Just Now',
                          read: false
                        };
                      } else {
                        newPing = {
                          id: `PING-QRY-${Date.now().toString().slice(-3)}`,
                          ticketId: 'TCK-8822',
                          customerName: 'David Miller',
                          category: 'High Priority Query Escalation',
                          sender: sup.fullLabel,
                          message: 'Urgent from Query Lead: Customer David Miller is waiting on voice line for VIP billing dispute status. Please open case immediately.',
                          timestamp: 'Just Now',
                          read: false
                        };
                      }

                      setPingNotificationsList([newPing, ...pingNotificationsList]);
                      setActivePingPopup(newPing);
                      setShowNotificationHistory(false);
                      showToast(`New Live Ping received from ${sup.title}!`);
                    }}
                    style={{ fontSize: '0.68rem', padding: '0.35rem', width: '100%', borderRadius: '6px', textAlign: 'center' }}
                  >
                    + Simulate Incoming Supervisor Ping
                  </button>
                </div>
              )}
            </div>

            <span className="badge badge-success" style={{ padding: '0.4rem 0.85rem', fontSize: '0.78rem' }}>AI Co-Pilot Active</span>
          </div>
        </div>
      )}

      {/* 4-SECOND ANIMATED FLOATING SUPERVISOR PING POPUP (FRONT MODAL) */}
      {activePingPopup && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            zIndex: 9999,
            width: '420px',
            maxWidth: '92vw',
            animation: 'slideInRight 0.35s ease-out',
            boxShadow: '0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(2, 132, 199, 0.4)'
          }}
          className="glass-panel"
        >
          <div style={{ padding: '1rem 1.15rem', background: 'var(--bg-surface)', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            
            {/* Header with 4s Timer Badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.8rem', fontWeight: 800 }}>
                                  </div>
                <div>
                  <strong style={{ fontSize: '0.84rem', color: 'var(--text-main)', display: 'block' }}>
                    {activePingPopup.sender}
                  </strong>
                  <span style={{ fontSize: '0.65rem', color: '#0284c7', fontWeight: 700 }}>
                    Target Case ID: {activePingPopup.ticketId}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontSize: '0.62rem', color: '#0284c7', background: 'rgba(2, 132, 199, 0.15)', padding: '0.15rem 0.45rem', borderRadius: '10px', fontWeight: 800 }}>
                  Auto-close (4s)
                </span>
                <button
                  onClick={() => setActivePingPopup(null)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '0.85rem', cursor: 'pointer', padding: '0.1rem' }}
                  title="Close popup"
                >
                                  </button>
              </div>
            </div>

            {/* Message Body */}
            <div style={{ background: 'var(--bg-dark)', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
              <p style={{ margin: 0, fontSize: '0.76rem', color: 'var(--text-main)', fontStyle: 'italic', lineHeight: '1.45' }}>
                "{activePingPopup.message}"
              </p>
            </div>

            {/* Actions: Acknowledge & Open Queue Case */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.45rem', alignItems: 'center' }}>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setActivePingPopup(null);
                  showToast('Supervisor ping acknowledged.');
                }}
                style={{ fontSize: '0.72rem', padding: '0.35rem 0.7rem', borderRadius: '6px' }}
              >
                Acknowledge
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setActivePingPopup(null);
                  const match = sessions.find(s => s.ticketId === activePingPopup.ticketId);
                  if (match) {
                    setSelectedSession(match);
                  } else {
                    setSelectedSession(sessions[1] || sessions[0]);
                  }
                  showToast(`Opened Case ${activePingPopup.ticketId} from Supervisor Ping.`);
                }}
                style={{
                  background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                  color: '#fff',
                  fontSize: '0.72rem',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '6px',
                  border: 'none',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                Open Queue Case ({activePingPopup.ticketId})
              </button>
            </div>

            {/* 4-Second Animated Countdown Progress Bar */}
            <div style={{ width: '100%', height: '3px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, #0284c7, #38bdf8)',
                  animation: 'shrinkWidth 4s linear forwards'
                }}
              />
            </div>

          </div>
        </div>
      )}

      {/* Global CSS for Ping animation */}
      <style>{`
        @keyframes shrinkWidth {
          from { width: 100%; }
          to { width: 0%; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>

      {/* KYC, PAYMENT & QUERY AGENT OMNICHANNEL DESK ROUTING */}
      {(activeSubTab === 'LIVE_CHAT' ||
        activeSubTab === 'INBOUND_CALLS' ||
        activeSubTab === 'CALL_DIALER' ||
        activeSubTab === 'APPLICANT_CALLS' ||
        activeSubTab === 'PAYMENT_REMINDERS' ||
        activeSubTab === 'EMAIL_INBOX' ||
        activeSubTab === 'WHATSAPP' ||
        activeSubTab === 'WHATSAPP_SMS_DISPATCH') ? (
        <div style={{ width: '100%' }}>
          <OmnichannelDeskSuite
            initialChannel={
              activeSubTab === 'INBOUND_CALLS' || activeSubTab === 'CALL_DIALER' || activeSubTab === 'APPLICANT_CALLS' || activeSubTab === 'PAYMENT_REMINDERS'
                ? 'INBOUND_CALLS'
                : activeSubTab === 'EMAIL_INBOX'
                ? 'EMAIL_INBOX'
                : activeSubTab === 'WHATSAPP' || activeSubTab === 'WHATSAPP_SMS_DISPATCH'
                ? 'WHATSAPP'
                : 'LIVE_CHAT'
            }
            userRole={role}
            agentName={role === UserRole.KYC_AGENT ? 'Rohan Mehta (KYC Officer)' : role === UserRole.PAYMENT_AGENT ? 'Suresh Reddy (Payment Officer)' : 'Alex Rivera (Query Specialist)'}
            agentStatus="Available"
            onTicketCreate={(t) => {
              setToastMessage(`Created ${role === UserRole.KYC_AGENT ? 'KYC' : role === UserRole.PAYMENT_AGENT ? 'Payment' : 'Query'} support ticket for ${t.customer} (${t.channel})`);
            }}
          />
        </div>
      ) : role === UserRole.KYC_AGENT ? (
        <KycHumanOfficerWorkspace
          activeSubTab={activeSubTab}
          onSelectSubTab={onSelectSubTab}
          showToast={showToast}
        />
      ) : role === UserRole.PAYMENT_AGENT ? (
        <PaymentHumanOfficerWorkspace
          activeSubTab={activeSubTab}
          onSelectSubTab={onSelectSubTab}
          showToast={showToast}
          targetPingCase={targetPingCase}
        />
      ) : (
        <>
          {/* KPI Cards (Visible exclusively on Live AI Monitor & Intercept Desk) */}
          {(activeSubTab === 'AGENT_DESK' || activeSubTab === 'OVERVIEW' || !activeSubTab) && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.85rem' }}>
              <div className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #6366f1, #818cf8)' } as React.CSSProperties}>
                <div className="kpi-card-header">
                  <span className="kpi-title-modern">Live Sessions Shadowing</span>
                  <Activity size={18} className="text-brand" />
                </div>
                <div className="kpi-value-modern">
                  <span>{sessions.length} Active</span>
                </div>
                <div className="kpi-subtext-modern">
                  <ArrowRight size={13} className="text-emerald" /> Real-time active stream
                </div>
              </div>

              <div className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #10b981, #34d399)' } as React.CSSProperties}>
                <div className="kpi-card-header">
                  <span className="kpi-title-modern">AI Resolution Rate</span>
                  <CheckCircle2 size={18} className="text-emerald" />
                </div>
                <div className="kpi-value-modern">
                  <span>94.2%</span>
                </div>
                <div className="kpi-subtext-modern">
                  Auto-closed without human intervention
                </div>
              </div>

              <div className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #f59e0b, #fde047)' } as React.CSSProperties}>
                <div className="kpi-card-header">
                  <span className="kpi-title-modern">Human Intercepted</span>
                  <AlertTriangle size={18} className="text-amber" />
                </div>
                <div className="kpi-value-modern">
                  <span>{sessions.filter(s => s.status === 'HUMAN_INTERCEPTED').length} Active</span>
                </div>
                <div className="kpi-subtext-modern">
                  Officer handling live cases
                </div>
              </div>

              <div className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #06b6d4, #38bdf8)' } as React.CSSProperties}>
                <div className="kpi-card-header">
                  <span className="kpi-title-modern">Re-Opened Cases</span>
                  <RotateCcw size={18} className="text-cyan" />
                </div>
                <div className="kpi-value-modern">
                  <span>{sessions.filter(s => s.status === 'REOPENED_BY_HUMAN').length} Reopened</span>
                </div>
                <div className="kpi-subtext-modern">
                  Follow-up queries resolved
                </div>
              </div>
            </div>
          )}

      {/* SUBTAB 1: LIVE AI MONITOR & INTERCEPT (FULL-WIDTH 2-COLUMN DESK) */}
      {(activeSubTab === 'AGENT_DESK' || activeSubTab === 'OVERVIEW' || !activeSubTab) && (
        <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '1.25rem', alignItems: 'start' }}>
          
          {/* Left Column: Live AI Shadowing Stream */}
          <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0, color: '#ffd700' }}>
                Live AI Shadowing Feed
              </h3>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Real-Time</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '600px', overflowY: 'auto' }}>
              {sessions.map(s => {
                const isSelected = selectedSession?.id === s.id;
                const isFrustrated = s.sentiment === 'FRUSTRATED';

                return (
                  <div
                    key={s.id}
                    onClick={() => setSelectedSession(s)}
                    style={{
                      padding: '0.85rem',
                      borderRadius: '8px',
                      background: isSelected ? 'rgba(255, 215, 0, 0.12)' : 'var(--bg-dark)',
                      border: isFrustrated ? '2px solid #ef4444' : isSelected ? '1px solid #ffd700' : '1px solid var(--border-color)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.35rem',
                      boxShadow: isFrustrated ? '0 0 10px rgba(239, 68, 68, 0.3)' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>{s.customerName}</strong>
                      <span className={`badge ${s.status === 'HUMAN_INTERCEPTED' ? 'badge-warning' : s.status === 'CLOSED_BY_AI' ? 'badge-secondary' : s.status === 'REOPENED_BY_HUMAN' ? 'badge-info' : 'badge-success'}`} style={{ fontSize: '0.65rem' }}>
                        {s.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {s.channel === 'CHAT_WEB' ? 'Web Chat' : s.channel === 'VOICE_TWILIO' ? 'Voice Call' : 'WhatsApp'} • {s.category}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem', marginTop: '0.25rem' }}>
                      <span style={{ color: isFrustrated ? '#ef4444' : '#10b981', fontWeight: 700 }}>
                        {isFrustrated ? 'FRUSTRATED (Needs Takeover)' : `AI Conf: ${s.aiConfidence}%`}
                      </span>
                      <span style={{ color: 'var(--text-muted)' }}>{s.duration}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Center/Right Full-Width Column: Live Conversation, Telephony, CRM Details & Takeover Console */}
          <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {/* Header of Selected Session */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
                    {selectedSession.customerName}
                  </h2>
                  <button
                    onClick={() => {
                      const targetChannel = getChannelForTicket(selectedSession);
                      setToastMessage(`Routing Ticket ${selectedSession.ticketId} to ${targetChannel.replace('_', ' ')} desk...`);
                      if (onSelectSubTab) onSelectSubTab(targetChannel);
                    }}
                    className="badge badge-info"
                    style={{ cursor: 'pointer', border: '1px solid #38bdf8' }}
                    title={`Click to open in ${getChannelForTicket(selectedSession).replace('_', ' ')} workspace`}
                  >
                    {selectedSession.ticketId}
                  </button>
                  <span className={`badge ${selectedSession.sentiment === 'FRUSTRATED' ? 'badge-danger' : 'badge-success'}`}>
                    {selectedSession.sentiment}
                  </span>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowCustomerCrm(!showCustomerCrm)}
                    style={{ fontSize: '0.65rem', padding: '0.2rem 0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    <User size={12} /> {showCustomerCrm ? 'Hide Profile' : 'View CRM Profile'}
                  </button>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Phone: <strong>{selectedSession.customerPhone}</strong> • {selectedSession.category} • <span style={{ color: '#ffd700' }}>SLA: {selectedSession.slaCountdown}</span>
                </div>
              </div>

              {/* Action Buttons: Intercept, Re-open, Call */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {selectedSession.status === 'LIVE_AI' && (
                  <button
                    className="btn btn-primary"
                    onClick={() => handleTakeover(selectedSession.id)}
                    style={{ background: '#ffd700', color: '#000', fontWeight: 800, fontSize: '0.75rem', padding: '0.4rem 0.75rem' }}
                  >
                    Take Over
                  </button>
                )}

                {selectedSession.status === 'CLOSED_BY_AI' && (
                  <button
                    className="btn btn-primary"
                    onClick={() => handleReopen(selectedSession.id)}
                    style={{ background: '#38bdf8', color: '#000', fontWeight: 800, fontSize: '0.75rem', padding: '0.4rem 0.75rem' }}
                  >
                    Re-Open
                  </button>
                )}

                {!activeCallStatus ? (
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleStartCall(selectedSession.customerPhone)}
                    style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <PhoneCall size={14} style={{ color: '#10b981' }} /> Call
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary"
                    onClick={handleEndCall}
                    style={{ fontSize: '0.75rem', background: '#ef4444', color: 'var(--text-main)', padding: '0.4rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <PhoneOff size={14} /> End Call
                  </button>
                )}
              </div>
            </div>

            {/* Collapsible Customer Mini CRM Panel */}
            {showCustomerCrm && (
              <div style={{ background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderLeft: '4px solid #f7b500', borderRadius: '8px', padding: '0.85rem', fontSize: '0.75rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                <div><strong style={{ color: 'var(--text-main)' }}>Account Type:</strong> <div style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{selectedSession.accountType}</div></div>
                <div><strong style={{ color: 'var(--text-main)' }}>Tier Level:</strong> <div style={{ color: '#d97706', fontWeight: 800 }}>{selectedSession.membershipLevel}</div></div>
                <div><strong style={{ color: 'var(--text-main)' }}>Total Past Tickets:</strong> <div style={{ color: 'var(--accent-success)', fontWeight: 700 }}>3 Handled (100% CSAT)</div></div>
              </div>
            )}

            {/* AI Reasoning Strip */}
            <div style={{ padding: '0.65rem 0.85rem', background: 'var(--bg-dark)', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.75rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Bot size={16} style={{ color: '#0284c7' }} />
              <div style={{ color: 'var(--text-main)' }}>
                <strong style={{ color: '#0284c7' }}>AI Co-Pilot Reasoning:</strong> {selectedSession.aiReasoning}
              </div>
            </div>

            {/* Check if Selected Session is VOICE_TWILIO vs CHAT/WHATSAPP */}
            {selectedSession.channel === 'VOICE_TWILIO' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {/* Clean, Simple Telephony Status Strip */}
                <div style={{ background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderLeft: '4px solid #10b981', borderRadius: '8px', padding: '0.85rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 8px #10b981' }} />
                    <div>
                      <strong style={{ color: 'var(--text-main)', fontSize: '0.86rem' }}>TWILIO PSTN TRUNK: LIVE CALL CONNECTED</strong>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Codec: Opus 24kHz HD Voice • Mumbai AP-South Gateway</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.76rem', color: '#d97706', fontWeight: 800, background: 'rgba(217, 119, 6, 0.12)', padding: '0.25rem 0.65rem', borderRadius: '12px', border: '1px solid rgba(217, 119, 6, 0.3)' }}>
                      {selectedSession.duration || '2m 10s'}
                    </span>
                    <span className="badge badge-success" style={{ fontSize: '0.68rem', padding: '0.25rem 0.5rem' }}>
                      {selectedSession.status === 'HUMAN_INTERCEPTED' ? 'Human Speaking' : 'AI Autonomous'}
                    </span>
                  </div>
                </div>

                {/* Clean Speech-to-Text Transcription Stream */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}>
                    <strong style={{ color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Volume2 size={15} style={{ color: '#0284c7' }} /> Real-Time Voice Transcription
                    </strong>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Whisper Neural STT</span>
                  </div>

                  <div style={{ height: '230px', overflowY: 'auto', background: 'var(--bg-dark)', borderRadius: '8px', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.55rem', border: '1px solid var(--border-color)' }}>
                    {selectedSession.chatHistory?.map((msg: any, idx: number) => {
                      const isCustomer = msg.sender === 'CUSTOMER';
                      const isHuman = msg.sender === 'HUMAN_AGENT';

                      return (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.25rem',
                            padding: '0.65rem 0.85rem',
                            background: 'var(--bg-surface)',
                            borderLeft: isCustomer ? '3px solid #6366f1' : isHuman ? '3px solid #ffd700' : '3px solid #10b981',
                            border: '1px solid var(--border-color)',
                            borderLeftWidth: '3px',
                            borderRadius: '6px'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
                            <strong style={{ color: isCustomer ? '#4f46e5' : isHuman ? '#d97706' : '#059669', fontWeight: 800 }}>
                              {isCustomer ? `${selectedSession.customerName}` : isHuman ? `‍Alex Vance (Human Agent)` : `Voice Bot AI`}
                            </strong>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.64rem' }}>Live Transcript</span>
                          </div>
                          <div style={{ fontSize: '0.82rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
                            "{msg.text}"
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Simplified, Elegant Telephony Call Control Bar with Transfer Options */}
                <div style={{ background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem' }}>
                  
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    {/* 1. Barge-In Button */}
                    {selectedSession.status === 'LIVE_AI' ? (
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          handleTakeover(selectedSession.id);
                          showToast('Barge-In Active: AI muted. Your microphone is now live with customer.');
                        }}
                        style={{ background: '#ffd700', color: '#000', fontWeight: 800, fontSize: '0.74rem', padding: '0.45rem 0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem', border: 'none', borderRadius: '6px' }}
                      >
                        Barge-In & Speak (Takeover Call)
                      </button>
                    ) : (
                      <span style={{ background: 'rgba(217, 119, 6, 0.15)', color: '#d97706', border: '1px solid rgba(217, 119, 6, 0.3)', padding: '0.4rem 0.75rem', borderRadius: '6px', fontSize: '0.74rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        Human Speaking (Live Call)
                      </span>
                    )}

                    {/* 2. Return Call to AI Bot Button */}
                    {selectedSession.status === 'HUMAN_INTERCEPTED' && (
                      <button
                        className="btn btn-secondary"
                        onClick={() => {
                          const updated = sessions.map(s => s.id === selectedSession.id ? { ...s, status: 'LIVE_AI' } : s);
                          setSessions(updated);
                          setSelectedSession({ ...selectedSession, status: 'LIVE_AI' });
                          showToast('Call transferred back to Gemini AI Voice Bot. Autonomous handling resumed.');
                        }}
                        style={{ fontSize: '0.74rem', padding: '0.45rem 0.8rem', background: 'rgba(5, 150, 105, 0.15)', color: '#059669', border: '1px solid rgba(5, 150, 105, 0.3)', borderRadius: '6px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                      >
                        Return Call to AI Bot
                      </button>
                    )}

                    {/* 3. Transfer Call to Query Team Lead */}
                    <button
                      className="btn btn-secondary"
                      onClick={() => setTransferCallModal(true)}
                      style={{ fontSize: '0.74rem', padding: '0.45rem 0.8rem', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                    >
                      Transfer Call
                    </button>
                  </div>

                  {/* 4. Hang Up Call */}
                  <button
                    className="btn btn-secondary"
                    onClick={handleEndCall}
                    style={{ background: '#ef4444', color: '#fff', fontSize: '0.74rem', padding: '0.45rem 0.9rem', display: 'flex', alignItems: 'center', gap: '0.35rem', border: 'none', borderRadius: '6px', fontWeight: 700 }}
                  >
                    <PhoneOff size={14} /> Hang Up Call
                  </button>

                </div>

              </div>
            ) : (
              /* Standard Web Chat / WhatsApp Console (Spans Full Width of Right Desk) */
              <>
                {/* Live Chat History with Crisp High Contrast Text */}
                <div style={{ height: '340px', overflowY: 'auto', background: 'var(--bg-dark)', borderRadius: '8px', padding: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', border: '1px solid var(--border-color)' }}>
                  {selectedSession.chatHistory?.map((msg: any, idx: number) => {
                    const isCustomer = msg.sender === 'CUSTOMER';
                    const isHumanAgent = msg.sender === 'HUMAN_AGENT';

                    return (
                      <div
                        key={idx}
                        style={{
                          alignSelf: isCustomer ? 'flex-start' : 'flex-end',
                          maxWidth: '82%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: isCustomer ? 'flex-start' : 'flex-end'
                        }}
                      >
                        <span style={{ fontSize: '0.68rem', color: isCustomer ? '#94a3b8' : isHumanAgent ? '#ffd700' : '#34d399', marginBottom: '0.2rem', fontWeight: 600 }}>
                          {isCustomer ? `${selectedSession.customerName}` : isHumanAgent ? '‍Rahul Sharma (Human Agent)' : selectedSession.aiAgent}
                        </span>
                        <div
                          style={{
                            padding: '0.65rem 0.95rem',
                            borderRadius: '8px',
                            background: isCustomer ? '#15244e' : isHumanAgent ? '#002b7f' : 'rgba(16, 185, 129, 0.18)',
                            border: isCustomer ? '1px solid rgba(247, 181, 0, 0.3)' : isHumanAgent ? '1px solid #ffd700' : '1px solid #10b981',
                            fontSize: '0.85rem',
                            color: '#f8fafc',
                            lineHeight: '1.45',
                            fontWeight: 500
                          }}
                        >
                          {msg.text}
                        </div>
                      </div>
                    );
                  })}

                  {/* Internal Whisper Notes Rendered in Chat History */}
                  {selectedSession.internalWhisperNotes?.map((w: any, idx: number) => (
                    <div key={idx} style={{ alignSelf: 'center', width: '95%', background: 'rgba(247, 181, 0, 0.1)', border: '1px dashed #ffd700', padding: '0.5rem 0.75rem', borderRadius: '6px', fontSize: '0.72rem', color: '#ffd700' }}>
                      <strong>Private Whisper Note ({w.author} • {w.time}):</strong> {w.note}
                    </div>
                  ))}
                </div>

                {/* Quick Canned Action Pills & AI Smart Suggestions Trigger Button */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', fontSize: '0.7rem' }}>
                    <button className="btn btn-secondary" onClick={() => handleSendMessage('Registration fees are final and non-refundable per platform terms.')} style={{ padding: '0.2rem 0.5rem', fontSize: '0.68rem' }}>Policy Terms</button>
                    <button className="btn btn-secondary" onClick={() => handleSendMessage('Please upload a clear 300 DPI scan of your original document.')} style={{ padding: '0.2rem 0.5rem', fontSize: '0.68rem' }}>KYC Re-upload</button>
                    <button className="btn btn-secondary" onClick={() => handleSendMessage('Your request has been prioritized with our Level 2 accounts officer.')} style={{ padding: '0.2rem 0.5rem', fontSize: '0.68rem' }}>Expedite Case</button>
                    <button className="btn btn-secondary" onClick={() => handleSendMessage('Is there anything else I can assist you with today?')} style={{ padding: '0.2rem 0.5rem', fontSize: '0.68rem' }}>Closing Courtesy</button>
                  </div>

                  {/* AI Smart Suggestions Button Shape with Badge */}
                  <button
                    className="btn btn-primary"
                    onClick={() => setShowAiSuggestions(!showAiSuggestions)}
                    style={{
                      background: showAiSuggestions ? '#38bdf8' : 'rgba(56, 189, 248, 0.15)',
                      color: showAiSuggestions ? '#000' : '#38bdf8',
                      border: '1px solid #38bdf8',
                      fontWeight: 700,
                      fontSize: '0.72rem',
                      padding: '0.25rem 0.65rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      borderRadius: '20px'
                    }}
                  >
                    <Sparkles size={13} /> {showAiSuggestions ? 'Hide AI Suggestions' : 'AI Smart Suggestions'}
                  </button>
                </div>

                {/* Collapsible / Pop-up AI Smart Suggestions inside Chat Box */}
                {showAiSuggestions && (
                  <div style={{ background: 'rgba(56, 189, 248, 0.08)', border: '1px solid #38bdf8', borderRadius: '8px', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Verified AI Copilot Suggestions (Click to Auto-Send):</span>
                      <button onClick={() => setShowAiSuggestions(false)} style={{ background: 'transparent', border: 'none', color: '#38bdf8', cursor: 'pointer', fontWeight: 800 }}></button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                      {selectedSession.suggestedReplies?.map((reply: string, idx: number) => (
                        <div
                          key={idx}
                          onClick={() => {
                            handleTakeover(selectedSession.id);
                            handleSendMessage(reply);
                            setShowAiSuggestions(false);
                          }}
                          style={{
                            background: 'var(--bg-dark)',
                            padding: '0.6rem 0.75rem',
                            borderRadius: '6px',
                            border: '1px solid rgba(56, 189, 248, 0.25)',
                            fontSize: '0.75rem',
                            color: 'var(--text-main)',
                            cursor: 'pointer',
                            lineHeight: '1.35',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          "{reply}"
                          <div style={{ fontSize: '0.65rem', color: '#38bdf8', marginTop: '0.25rem', fontWeight: 700 }}>
                            Click to Auto-Send
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Human Reply / Whisper Note Dispatch Bar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem' }}>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer', color: !isWhisperMode ? '#ffd700' : 'var(--text-muted)', fontWeight: 700 }}>
                        <input type="radio" checked={!isWhisperMode} onChange={() => setIsWhisperMode(false)} /> Reply to Customer
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer', color: isWhisperMode ? '#ffd700' : 'var(--text-muted)', fontWeight: 700 }}>
                        <input type="radio" checked={isWhisperMode} onChange={() => setIsWhisperMode(true)} /> Private Whisper Note (Internal)
                      </label>
                    </div>
                    <span style={{ color: 'var(--text-muted)' }}>Press Enter to dispatch</span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
                    <input
                      className="form-input"
                      placeholder={isWhisperMode ? 'Type internal shift note for Team Lead (invisible to customer)...' : selectedSession.status === 'LIVE_AI' ? 'Click "Take Over" to chat directly...' : 'Type human reply to customer...'}
                      value={humanMessage}
                      onChange={e => setHumanMessage(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') handleSendMessage(); }}
                      disabled={!isWhisperMode && selectedSession.status === 'LIVE_AI' && selectedSession.status !== 'HUMAN_INTERCEPTED' && selectedSession.status !== 'REOPENED_BY_HUMAN'}
                      style={{ flex: 1, fontSize: '0.82rem' }}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={() => handleSendMessage()}
                      disabled={!humanMessage.trim()}
                      style={{ background: '#ffd700', color: '#000', fontWeight: 800, padding: '0.55rem 1.1rem', fontSize: '0.8rem' }}
                    >
                      <Send size={15} /> {isWhisperMode ? 'Save Note' : 'Send'}
                    </button>
                  </div>
                </div>
              </>
            )}

          </div>

        </div>
      )}

      {/* SUBTAB 2: URGENT FRUSTRATION & SLA RADAR */}
      {activeSubTab === 'URGENT_RADAR' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>
          
          {/* Header Strip & Radar Stats */}
          <div className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #ef4444, #fb7185)' } as React.CSSProperties}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AlertTriangle size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ef4444' }}>
                    Live AI Sentiment & SLA Radar
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>
                    Live AI sentiment tracker detecting unhappy users and prioritizing imminent SLA breach timeouts.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ background: 'var(--bg-dark)', padding: '0.5rem 1rem', borderRadius: '10px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>ESCALATION QUEUE</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ef4444' }}>
                  {sessions.filter(s => s.sentiment === 'FRUSTRATED' || s.slaCountdown.includes('NEAR BREACH')).length} Critical
                </div>
              </div>
              <div style={{ background: 'var(--bg-dark)', padding: '0.5rem 1rem', borderRadius: '10px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>AVG TAKEOVER TIME</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--accent-success)' }}>18s</div>
              </div>
            </div>
          </div>

          {/* Unified Master Container Box for Urgent Escalations */}
          <div className="glass-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)' }}>
                <span>Active Escalation Triggers</span>
                <span className="badge badge-danger" style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>
                  {sessions.filter(s => s.sentiment === 'FRUSTRATED' || s.slaCountdown.includes('NEAR BREACH')).length} Issues
                </span>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Auto-refreshes every 5s</span>
            </div>

            {sessions.filter(s => s.sentiment === 'FRUSTRATED' || s.slaCountdown.includes('NEAR BREACH')).map(s => (
              <div
                key={s.id}
                style={{
                  background: 'var(--bg-dark)',
                  padding: '0.75rem 1rem',
                  display: 'grid',
                  gridTemplateColumns: '100px 180px 1.2fr 140px 140px 160px',
                  alignItems: 'center',
                  gap: '0.85rem',
                  border: '1px solid var(--border-color)',
                  borderLeft: '4px solid #ef4444',
                  borderRadius: '8px',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)'
                }}
              >
                {/* 1. Ticket ID */}
                <div>
                  <div className="kpi-card-header"><span className="kpi-title-modern">Ticket Ref</span></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <button
                      onClick={() => {
                        const targetChannel = getChannelForTicket(s);
                        setToastMessage(`Routing Ticket ${s.ticketId} (${s.customerName}) to ${targetChannel.replace('_', ' ')} desk...`);
                        if (onSelectSubTab) onSelectSubTab(targetChannel);
                      }}
                      style={{
                        background: 'rgba(2, 132, 199, 0.12)',
                        border: '1px solid rgba(2, 132, 199, 0.3)',
                        padding: '0.2rem 0.45rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontFamily: 'monospace',
                        fontWeight: 800,
                        fontSize: '0.86rem',
                        color: '#38bdf8',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        transition: 'all 0.15s ease'
                      }}
                      title={`Click to open ticket in ${getChannelForTicket(s).replace('_', ' ')} workspace`}
                    >
                      {s.ticketId}
                    </button>
                    <TicketVisionButton ticket={{ id: s.ticketId, ticketNumber: s.ticketId, customerName: s.customerName, customerPhone: s.customerPhone, departmentLabel: 'Human Agent Desk', status: s.status, isEscalated: s.isEscalated }} compact size="sm" />
                  </div>
                </div>

                {/* 2. Customer Profile */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem', flexShrink: 0, boxShadow: '0 2px 6px rgba(239, 68, 68, 0.25)' }}>
                    {s.customerName.charAt(0)}
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-main)', fontSize: '0.84rem', display: 'block', fontWeight: 800 }}>{s.customerName}</strong>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500 }}>{s.customerPhone}</span>
                  </div>
                </div>

                {/* 3. Category & Channel */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.15rem' }}>
                    <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#0284c7', fontSize: '0.65rem', fontWeight: 800, padding: '0.1rem 0.45rem', borderRadius: '10px' }}>
                      {s.channel}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{s.accountType}</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-main)', fontWeight: 600 }}>{s.category}</div>
                </div>

                {/* 4. Frustration Alert Badge */}
                <div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: '0.15rem' }}>SENTIMENT</span>
                  <span style={{ background: 'rgba(239, 68, 68, 0.12)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '16px', padding: '0.25rem 0.6rem', fontSize: '0.7rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    FRUSTRATED (88%)
                  </span>
                </div>

                {/* 5. SLA Countdown */}
                <div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: '0.15rem' }}>SLA BREACH TIMER</span>
                  <span style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid #ef4444', borderRadius: '6px', padding: '0.2rem 0.5rem', fontSize: '0.74rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    {s.slaCountdown}
                  </span>
                </div>

                {/* 6. Instant Takeover Action */}
                <div style={{ textAlign: 'right' }}>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setSelectedSession(s);
                      handleTakeover(s.id);
                      if (onSelectSubTab) onSelectSubTab('AGENT_DESK');
                    }}
                    style={{
                      background: 'linear-gradient(135deg, #f7b500 0%, #eab308 100%)',
                      color: '#000',
                      fontWeight: 800,
                      fontSize: '0.74rem',
                      padding: '0.45rem 0.85rem',
                      borderRadius: '8px',
                      boxShadow: '0 2px 10px rgba(247, 181, 0, 0.3)',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Take Over & Chat
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* SUBTAB 3: MY TICKETS */}
      {activeSubTab === 'MY_TICKETS' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
          
          {/* Header Strip */}
          <div className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #f59e0b, #fde047)' } as React.CSSProperties}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(247, 181, 0, 0.15)', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Ticket size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#d97706' }}>
                  Assigned Tickets Queue
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.15rem 0 0 0' }}>
                  Supervised human queue for incoming inquiries, VIP escalations, and resolved cases.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <span className="badge badge-warning" style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}>
                Total Active: {sessions.length} Cases
              </span>
            </div>
          </div>

          {/* Unified Master Container Box for Assigned Tickets */}
          <div className="glass-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)' }}>
                <span>All Supervised Tickets</span>
                <span className="badge badge-info" style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>
                  {sessions.length} Cases
                </span>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Showing all active channels</span>
            </div>

            {sessions.map(s => (
              <div
                key={s.id}
                style={{
                  background: 'var(--bg-dark)',
                  padding: '0.75rem 1rem',
                  display: 'grid',
                  gridTemplateColumns: '100px 180px 1.2fr 140px 140px 160px',
                  alignItems: 'center',
                  gap: '0.85rem',
                  border: '1px solid var(--border-color)',
                  borderLeft: s.status === 'CLOSED_BY_AI' ? '4px solid #10b981' : '4px solid #f7b500',
                  borderRadius: '8px',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)'
                }}
              >
                {/* 1. Ticket ID */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <button
                      onClick={() => {
                        const targetChannel = getChannelForTicket(s);
                        setToastMessage(`Routing Ticket ${s.ticketId} (${s.customerName}) to ${targetChannel.replace('_', ' ')} desk...`);
                        if (onSelectSubTab) onSelectSubTab(targetChannel);
                      }}
                      style={{
                        background: 'rgba(2, 132, 199, 0.12)',
                        border: '1px solid rgba(2, 132, 199, 0.3)',
                        padding: '0.2rem 0.45rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontFamily: 'monospace',
                        fontWeight: 800,
                        fontSize: '0.86rem',
                        color: '#38bdf8',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        transition: 'all 0.15s ease'
                      }}
                      title={`Click to open ticket in ${getChannelForTicket(s).replace('_', ' ')} workspace`}
                    >
                      {s.ticketId}
                    </button>
                    <TicketVisionButton ticket={{ id: s.ticketId, ticketNumber: s.ticketId, customerName: s.customerName, customerPhone: s.customerPhone, departmentLabel: 'Human Agent Desk', status: s.status, isEscalated: s.isEscalated }} compact size="sm" />
                  </div>
                </div>

                {/* 2. Customer Profile */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem', flexShrink: 0, boxShadow: '0 2px 6px rgba(59, 130, 246, 0.25)' }}>
                    {s.customerName.charAt(0)}
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-main)', fontSize: '0.84rem', display: 'block', fontWeight: 800 }}>{s.customerName}</strong>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500 }}>{s.customerPhone}</span>
                  </div>
                </div>

                {/* 3. Category & Tier */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.15rem' }}>
                    <span style={{ background: 'rgba(247, 181, 0, 0.15)', color: '#d97706', fontSize: '0.65rem', fontWeight: 800, padding: '0.1rem 0.45rem', borderRadius: '10px' }}>
                      {s.membershipLevel}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{s.channel}</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-main)', fontWeight: 600 }}>{s.category}</div>
                </div>

                {/* 4. Ticket Status */}
                <div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: '0.15rem' }}>CASE STATUS</span>
                  <span
                    style={{
                      background: s.status === 'CLOSED_BY_AI' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(247, 181, 0, 0.15)',
                      color: s.status === 'CLOSED_BY_AI' ? '#059669' : '#d97706',
                      border: s.status === 'CLOSED_BY_AI' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(247, 181, 0, 0.3)',
                      borderRadius: '16px',
                      padding: '0.25rem 0.6rem',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      display: 'inline-block'
                    }}
                  >
                    {s.status}
                  </span>
                </div>

                {/* 5. Assigned Agent */}
                <div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: '0.15rem' }}>ASSIGNED BOT</span>
                  <span style={{ color: 'var(--text-main)', fontSize: '0.78rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    {s.aiAgent}
                  </span>
                </div>

                {/* 6. Inspect Action */}
                <div style={{ textAlign: 'right' }}>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setSelectedSession(s);
                      if (onSelectSubTab) onSelectSubTab('AGENT_DESK');
                    }}
                    style={{
                      background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '0.74rem',
                      padding: '0.45rem 0.85rem',
                      borderRadius: '8px',
                      boxShadow: '0 2px 10px rgba(2, 132, 199, 0.25)',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Inspect Live Desk
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* SUBTAB 3.5: TRACKING THE DETAILS (CLEAN MODULAR COMPACT LAYOUT) */}
      {activeSubTab === 'CUSTOMER_LOOKUP' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
          
          {/* Top Search & Filter Bar Card */}
          <div className="glass-panel" style={{ padding: '1.15rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.65rem' }}>
              <div>
                <h2 style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.15rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Search size={20} color="#0284c7" /> Tracking the Details
                </h2>
                <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Universal lookup for shipment journey, delivery milestones, official invoice, and membership tier intelligence.
                </p>
              </div>
              <span className="badge badge-success" style={{ fontSize: '0.72rem', padding: '0.25rem 0.65rem' }}>
                Gateway Connected (BlueDart • FedEx • Razorpay)
              </span>
            </div>

            {/* Input & Action Buttons (Universal Search across Order ID, Membership Card, Phone & Email) */}
            <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <input
                  type="text"
                  placeholder="Enter Order ID (e.g. ORD-9920148), Membership Card #, Phone (+91-98765-43210), or Email..."
                  value={lookupQuery}
                  onChange={e => setLookupQuery(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') handleExecuteLookup();
                  }}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1.5px solid var(--border-color)',
                    background: 'var(--bg-dark)',
                    color: 'var(--text-main)',
                    fontSize: '0.88rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <button
                className="btn btn-primary"
                onClick={() => handleExecuteLookup()}
                disabled={isSearchingLookup}
                style={{ padding: '0.75rem 1.45rem', fontSize: '0.84rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap', borderRadius: '8px' }}
              >
                {isSearchingLookup ? 'Tracking...' : 'Track Details'}
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => {
                  setLookupQuery('');
                  setLookupResult(null);
                }}
                style={{ padding: '0.75rem 1.1rem', fontSize: '0.8rem', borderRadius: '8px' }}
              >
                Clear
              </button>
            </div>

            {/* Quick Demo Pre-fill Shortcuts */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              <span>Quick Samples:</span>
              <button
                onClick={() => {
                  setLookupQuery('ORD-9920148');
                  handleExecuteLookup('ORD-9920148');
                }}
                style={{ background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.2rem 0.55rem', color: '#0284c7', cursor: 'pointer', fontSize: '0.72rem' }}
              >
                ORD-9920148 (Order ID)
              </button>
              <button
                onClick={() => {
                  setLookupQuery('+91-98765-43210');
                  handleExecuteLookup('+91-98765-43210');
                }}
                style={{ background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.2rem 0.55rem', color: '#059669', cursor: 'pointer', fontSize: '0.72rem' }}
              >
                +91-98765-43210 (Phone)
              </button>
              <button
                onClick={() => {
                  setLookupQuery('CARD-IN-442109');
                  handleExecuteLookup('CARD-IN-442109');
                }}
                style={{ background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.2rem 0.55rem', color: '#d97706', cursor: 'pointer', fontSize: '0.72rem' }}
              >
                CARD-IN-442109 (Membership Card)
              </button>
              <button
                onClick={() => {
                  setLookupQuery('CARD-IN-119283');
                  handleExecuteLookup('CARD-IN-119283');
                }}
                style={{ background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.2rem 0.55rem', color: '#8b5cf6', cursor: 'pointer', fontSize: '0.72rem' }}
              >
                CARD-IN-119283 (Frank Miller)
              </button>
            </div>
          </div>

          {/* Search Result Display View */}
          {lookupResult ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              {/* Customer Banner Header Card */}
              <div className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #f59e0b, #fde047)' } as React.CSSProperties}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 800 }}>
                    {lookupResult.customerName.charAt(0)}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <h3 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-main)', fontWeight: 800 }}>
                        {lookupResult.customerName}
                      </h3>
                      <span className="badge badge-warning" style={{ fontSize: '0.7rem', padding: '0.2rem 0.55rem' }}>
                        {lookupResult.membershipTier}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem', flexWrap: 'wrap' }}>
                      <span><strong>{lookupResult.phone}</strong></span>
                      <span><strong>{lookupResult.email}</strong></span>
                      <span>Card: <strong style={{ color: '#d97706' }}>{lookupResult.membershipCardNumber}</strong></span>
                      <span>Member: <strong>{lookupResult.memberSince}</strong></span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setRecipientPhone(lookupResult.phone);
                      setRecipientName(lookupResult.customerName);
                      if (onSelectSubTab) onSelectSubTab('WHATSAPP_SMS_DISPATCH');
                    }}
                    style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem' }}
                  >
                    Quick Dispatch
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      const matchingSession = sessions.find(s => s.customerPhone === lookupResult.phone) || sessions[0];
                      setSelectedSession(matchingSession);
                      if (onSelectSubTab) onSelectSubTab('AGENT_DESK');
                    }}
                    style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem' }}
                  >
                    Open in Live Desk
                  </button>
                </div>
              </div>

              {/* View Switcher Tabs: Order Fulfillment vs VIP Membership 360 */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => setLookupType('ORDER_ID')}
                  style={{
                    padding: '0.45rem 1rem',
                    borderRadius: '6px',
                    border: lookupType === 'ORDER_ID' ? '1.5px solid #0284c7' : '1px solid var(--border-color)',
                    background: lookupType === 'ORDER_ID' ? 'rgba(2, 132, 199, 0.12)' : 'var(--bg-surface)',
                    color: lookupType === 'ORDER_ID' ? '#0284c7' : 'var(--text-muted)',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  Order Fulfillment & Tracking ({lookupResult.order.orderId})
                </button>
                <button
                  onClick={() => setLookupType('MEMBERSHIP_CARD')}
                  style={{
                    padding: '0.45rem 1rem',
                    borderRadius: '6px',
                    border: lookupType === 'MEMBERSHIP_CARD' ? '1.5px solid #d97706' : '1px solid var(--border-color)',
                    background: lookupType === 'MEMBERSHIP_CARD' ? 'rgba(217, 119, 6, 0.12)' : 'var(--bg-surface)',
                    color: lookupType === 'MEMBERSHIP_CARD' ? '#d97706' : 'var(--text-muted)',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  VIP Membership & Benefits 360 ({lookupResult.membershipCardNumber})
                </button>
              </div>

              {/* TAB 1: DEEP ORDER DETAILS & FULFILLMENT AUDIT VIEW */}
              {lookupType === 'ORDER_ID' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem', alignItems: 'start' }}>
                  
                  {/* Left Column Box: Vertical Shipment Journey Stepper */}
                  <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    
                    {/* Tracking Header */}
                    <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                      <span style={{ fontSize: '0.7rem', color: '#0284c7', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        Real-Time Courier Journey
                      </span>
                      <h3 style={{ margin: '0.2rem 0 0 0', fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: 800 }}>
                        Arriving {lookupResult.order.estimatedDelivery}
                      </h3>
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        Courier: <strong style={{ color: 'var(--text-main)' }}>{lookupResult.order.carrier}</strong> • Waybill AWB #<strong style={{ color: '#d97706', fontFamily: 'monospace' }}>{lookupResult.order.trackingNumber}</strong>
                      </div>
                    </div>

                    {/* VERTICAL STEPPER TIMELINE */}
                    <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '0.25rem' }}>
                      {[
                        {
                          stage: 'Order Confirmed',
                          date: '19 Aug, 09:30 AM',
                          desc: 'Order placed & payment verified via Razorpay gateway.',
                          icon: '',
                          completed: true,
                          active: false
                        },
                        {
                          stage: 'Packed & Invoiced',
                          date: '19 Aug, 02:00 PM',
                          desc: 'Official GST invoice generated. Hardware packed at Electronic City Warehouse.',
                          icon: '',
                          completed: true,
                          active: false
                        },
                        {
                          stage: 'Shipped (In Transit)',
                          date: '20 Aug, 08:30 AM',
                          desc: 'Package dispatched via BlueDart Express Air Courier with tracking #BLUEDART-8829104.',
                          icon: '',
                          completed: true,
                          active: false
                        },
                        {
                          stage: 'Out for Delivery',
                          date: '21 Aug, 07:15 AM',
                          desc: 'Courier associate Ramesh Kumar has picked up shipment from Ashok Nagar Hub.',
                          icon: '',
                          completed: true,
                          active: true
                        },
                        {
                          stage: 'Delivered',
                          date: 'Est. 21 Aug, 02:00 PM',
                          desc: 'Package will be handed over at customer shipping address.',
                          icon: '',
                          completed: false,
                          active: false
                        }
                      ].map((step, idx, arr) => (
                        <div key={idx} style={{ display: 'flex', gap: '1rem', position: 'relative' }}>
                          
                          {/* Vertical Line Connector */}
                          {idx < arr.length - 1 && (
                            <div
                              style={{
                                position: 'absolute',
                                left: '15px',
                                top: '32px',
                                bottom: '-4px',
                                width: '2px',
                                background: step.completed && arr[idx + 1].completed ? '#10b981' : step.completed ? 'linear-gradient(180deg, #10b981 0%, rgba(16, 185, 129, 0.2) 100%)' : 'var(--border-color)',
                                zIndex: 1
                              }}
                            />
                          )}

                          {/* Circular Icon Node */}
                          <div
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              background: step.completed ? (step.active ? '#f7b500' : '#10b981') : 'var(--bg-dark)',
                              border: step.completed ? (step.active ? '2px solid #fff' : '2px solid #10b981') : '2px dashed var(--border-color)',
                              color: step.completed ? (step.active ? '#000' : '#fff') : 'var(--text-muted)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.9rem',
                              fontWeight: 800,
                              zIndex: 2,
                              flexShrink: 0,
                              boxShadow: step.active ? '0 0 10px rgba(247, 181, 0, 0.5)' : 'none'
                            }}
                          >
                            {step.completed ? (step.active ? step.icon : '') : step.icon}
                          </div>

                          {/* Step Description Content */}
                          <div style={{ paddingBottom: idx < arr.length - 1 ? '1.25rem' : '0.25rem', flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem' }}>
                              <strong style={{ fontSize: '0.86rem', color: step.active ? '#d97706' : step.completed ? 'var(--text-main)' : 'var(--text-muted)' }}>
                                {step.stage}
                              </strong>
                              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                                {step.date}
                              </span>
                            </div>
                            <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.35' }}>
                              {step.desc}
                            </p>
                          </div>

                        </div>
                      ))}
                    </div>

                    {/* Delivery Associate Info Box */}
                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--bg-dark)', padding: '0.75rem', borderRadius: '8px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#0284c7', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 800 }}>
                                              </div>
                      <div>
                        <strong style={{ fontSize: '0.84rem', color: 'var(--text-main)', display: 'block' }}>Ramesh Kumar (Delivery Associate)</strong>
                        <span style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700 }}>Out for Delivery with shipment</span>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                          Hub Facility: <strong>+91-80-4920-1100</strong> (BlueDart Bengaluru South Facility)
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Right Column Box: Order Line Items, Financials & Addresses */}
                  <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    
                    {/* Line Items List */}
                    <div>
                      <strong style={{ fontSize: '0.88rem', color: 'var(--text-main)', display: 'block', marginBottom: '0.6rem' }}>
                        Ordered Line Items ({lookupResult.order.items.length} items)
                      </strong>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {lookupResult.order.items.map((item: any, idx: number) => (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px dashed var(--border-color)', paddingBottom: '0.45rem' }}>
                            <div>
                              <strong style={{ color: '#0284c7', fontSize: '0.8rem', display: 'block' }}>{item.name}</strong>
                              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                                SKU: {item.sku} • Qty: <strong>{item.qty}</strong> • <span className="badge badge-secondary" style={{ fontSize: '0.62rem', padding: '0.1rem 0.35rem' }}>{item.category}</span>
                              </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <strong style={{ color: '#059669', fontSize: '0.85rem' }}>{item.total}</strong>
                              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{item.unitPrice} each</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Invoice & Pricing Breakdown */}
                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.6rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.76rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                        <span>Subtotal:</span>
                        <strong style={{ color: 'var(--text-main)' }}>{lookupResult.order.subTotal}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                        <span>GST / Taxes:</span>
                        <strong style={{ color: 'var(--text-main)' }}>{lookupResult.order.gstTax}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                        <span>Discounts:</span>
                        <strong style={{ color: '#059669' }}>{lookupResult.order.discountApplied}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '0.45rem', fontSize: '0.95rem', fontWeight: 800 }}>
                        <span style={{ color: 'var(--text-main)' }}>Final Total Paid:</span>
                        <span style={{ color: '#059669' }}>{lookupResult.order.totalAmount}</span>
                      </div>
                    </div>

                    {/* Shipping & Billing Address Box */}
                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', fontSize: '0.75rem' }}>
                        <span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>Shipping Destination Address:</span>
                        <strong style={{ color: 'var(--text-main)', lineHeight: '1.35' }}>{lookupResult.order.shippingAddress}</strong>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', fontSize: '0.75rem' }}>
                        <span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>Billing Entity & Tax ID:</span>
                        <strong style={{ color: 'var(--text-main)', lineHeight: '1.35' }}>{lookupResult.order.billingAddress}</strong>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', fontSize: '0.75rem' }}>
                        <span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>Gateway Transaction Reference:</span>
                        <code style={{ color: '#0284c7', background: 'var(--bg-dark)', padding: '0.15rem 0.4rem', borderRadius: '4px', display: 'inline-block' }}>{lookupResult.order.paymentRef}</code>
                      </div>
                    </div>

                  </div>

                </div>
              )}

              {/* TAB 2: DEEP VIP MEMBERSHIP CARD & BENEFITS 360 VIEW */}
              {lookupType === 'MEMBERSHIP_CARD' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  
                  {/* Digital VIP Membership Smart Card Display (Theme-Adaptive & Ultra High Contrast) */}
                  <div
                    className="glass-panel"
                    style={{
                      borderRadius: '14px',
                      border: '2px solid #f7b500',
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      boxShadow: '0 8px 24px rgba(247, 181, 0, 0.15)',
                      flexWrap: 'wrap',
                      gap: '1rem',
                      background: 'var(--bg-surface)'
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <span style={{ fontSize: '1.5rem' }}></span>
                        <div>
                          <span style={{ fontSize: '0.7rem', color: '#d97706', letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: 800 }}>
                            Forge Enterprise Partner Club
                          </span>
                          <h3 style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.2rem', fontWeight: 800 }}>
                            {lookupResult.membershipTier}
                          </h3>
                        </div>
                      </div>

                      <div style={{ marginTop: '0.25rem' }}>
                        <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.5px', fontWeight: 700 }}>MEMBERSHIP CARD NUMBER</span>
                        <div style={{ fontSize: '1.15rem', color: '#d97706', fontFamily: 'monospace', fontWeight: 800, letterSpacing: '1.5px' }}>
                          {lookupResult.membershipCardNumber}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.15rem', flexWrap: 'wrap' }}>
                        <span>Cardholder: <strong style={{ color: 'var(--text-main)' }}>{lookupResult.customerName}</strong></span>
                        <span>Member Since: <strong style={{ color: 'var(--text-main)' }}>{lookupResult.memberSince}</strong></span>
                        <span>Valid Until: <strong style={{ color: '#059669' }}>{lookupResult.validUntil}</strong></span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                      <div style={{ background: 'rgba(247, 181, 0, 0.12)', border: '1px solid #f7b500', padding: '0.45rem 0.9rem', borderRadius: '8px', textAlign: 'right' }}>
                        <span style={{ fontSize: '0.66rem', color: '#d97706', display: 'block', fontWeight: 800 }}>REWARD LOYALTY BALANCE</span>
                        <strong style={{ fontSize: '1.15rem', color: 'var(--text-main)' }}>{lookupResult.rewardPoints}</strong>
                      </div>
                      <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid #10b981', padding: '0.45rem 0.9rem', borderRadius: '8px', textAlign: 'right' }}>
                        <span style={{ fontSize: '0.66rem', color: '#059669', display: 'block', fontWeight: 800 }}>WALLET ADVANCE CREDIT</span>
                        <strong style={{ fontSize: '1.15rem', color: 'var(--text-main)' }}>{lookupResult.accountBalance}</strong>
                      </div>
                    </div>
                  </div>

                  {/* 3-Column Membership Intelligence Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '1rem' }}>
                    
                    {/* Exclusive Membership Benefits & Privileges */}
                    <div className="glass-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      <strong style={{ fontSize: '0.86rem', color: '#d97706', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        Tier Privileges & Contract Benefits
                      </strong>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {lookupResult.membershipPerks.map((perk: string, idx: number) => (
                          <div key={idx} style={{ background: 'var(--bg-dark)', padding: '0.6rem 0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.75rem', color: 'var(--text-main)', lineHeight: '1.35', fontWeight: 500 }}>
                            {perk}
                          </div>
                        ))}
                      </div>

                      <div style={{ background: 'rgba(247, 181, 0, 0.08)', border: '1px solid rgba(247, 181, 0, 0.3)', borderRadius: '6px', padding: '0.6rem 0.75rem', fontSize: '0.74rem' }}>
                        <strong style={{ color: '#d97706', display: 'block', marginBottom: '0.15rem' }}>Partner Discount Rule:</strong>
                        <span style={{ color: 'var(--text-muted)' }}>{lookupResult.tierDiscount} applied automatically at checkout for all renewals.</span>
                      </div>
                    </div>

                    {/* Dedicated Agent & KYC Verification */}
                    <div className="glass-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      <strong style={{ fontSize: '0.86rem', color: '#0284c7', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        Governance, KYC & Account Lead
                      </strong>

                      <div style={{ background: 'var(--bg-dark)', padding: '0.65rem 0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.74rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Assigned Senior Key Account Lead:</span>
                        <strong style={{ color: '#0284c7', fontSize: '0.84rem' }}>{lookupResult.dedicatedAgent}</strong>
                      </div>

                      <div style={{ background: 'var(--bg-dark)', padding: '0.65rem 0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.74rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>KYC Officer Clearance Status:</span>
                        <span className={`badge ${lookupResult.kycStatus.includes('APPROVED') ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: '0.68rem', padding: '0.2rem 0.5rem', alignSelf: 'flex-start' }}>
                          {lookupResult.kycStatus}
                        </span>
                      </div>

                      <div style={{ background: 'var(--bg-dark)', padding: '0.65rem 0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.74rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Priority Routing Rule:</span>
                        <strong style={{ color: '#059669' }}>High-Priority Skill Group (Routing SLA &lt; 15s)</strong>
                      </div>
                    </div>

                    {/* Past Orders & Lifetime Activity */}
                    <div className="glass-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      <strong style={{ fontSize: '0.86rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        Lifetime Order History ({lookupResult.pastOrders.length + 1} orders)
                      </strong>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1, overflowY: 'auto' }}>
                        {/* Current Order */}
                        <div style={{ background: 'var(--bg-dark)', border: '1.5px solid #0284c7', borderRadius: '6px', padding: '0.55rem 0.7rem', fontSize: '0.72rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.15rem' }}>
                            <code style={{ color: '#0284c7', fontWeight: 700 }}>{lookupResult.order.orderId} (Current)</code>
                            <strong style={{ color: '#059669' }}>{lookupResult.order.totalAmount}</strong>
                          </div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-main)' }}>{lookupResult.order.items[0]?.name}</div>
                          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{lookupResult.order.orderDate}</div>
                        </div>

                        {/* Past Orders */}
                        {lookupResult.pastOrders.map((po: any, idx: number) => (
                          <div key={idx} style={{ background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.55rem 0.7rem', fontSize: '0.72rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.15rem' }}>
                              <code style={{ color: 'var(--text-muted)' }}>{po.id}</code>
                              <strong style={{ color: '#059669' }}>{po.amount}</strong>
                            </div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{po.item}</div>
                            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{po.date} • {po.status}</div>
                          </div>
                        ))}
                      </div>

                    </div>

                  </div>

                </div>
              )}

            </div>
          ) : (
            /* Empty State Guide */
            <div style={{ background: 'var(--bg-dark)', borderRadius: '12px', border: '1px dashed var(--border-color)', padding: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem' }}></div>
              <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-color)' }}>No Record Loaded Yet</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', maxWidth: '480px' }}>
                Enter an <strong>Order ID (e.g. ORD-9920148)</strong> or a <strong>Membership Card Number (e.g. CARD-IN-889021)</strong> above and click <strong>Fetch Details</strong> to pull real-time CRM & OMS intelligence.
              </p>
            </div>
          )}

        </div>
      )}

      {/* SUBTAB 4: MULTI-CHANNEL LIVE STREAM (LIVE CHAT, INBOUND CALLS, EMAIL INBOX, WHATSAPP) */}
      {(activeSubTab === 'MULTI_CHANNEL_STREAM' ||
        activeSubTab === 'LIVE_CHAT' ||
        activeSubTab === 'INBOUND_CALLS' ||
        activeSubTab === 'CALL_DIALER' ||
        activeSubTab === 'APPLICANT_CALLS' ||
        activeSubTab === 'EMAIL_INBOX' ||
        activeSubTab === 'WHATSAPP' ||
        activeSubTab === 'WHATSAPP_SMS_DISPATCH') && (
        <div style={{ width: '100%' }}>
          <OmnichannelDeskSuite
            initialChannel={
              activeSubTab === 'INBOUND_CALLS' || activeSubTab === 'CALL_DIALER' || activeSubTab === 'APPLICANT_CALLS'
                ? 'INBOUND_CALLS'
                : activeSubTab === 'EMAIL_INBOX'
                ? 'EMAIL_INBOX'
                : activeSubTab === 'WHATSAPP' || activeSubTab === 'WHATSAPP_SMS_DISPATCH'
                ? 'WHATSAPP'
                : 'LIVE_CHAT'
            }
            userRole={role}
            agentName="Alex Rivera"
            agentStatus="Available"
            onTicketCreate={(t) => {
              setToastMessage(`Created support ticket for ${t.customer} (${t.channel})`);
            }}
          />
        </div>
      )}

      {/* SUBTAB 5: CLOSED TICKETS ARCHIVE & REOPEN (PROFESSIONAL & SLEEK) */}
      {activeSubTab === 'CLOSED_ARCHIVE' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
          
          {/* Header Strip */}
          <div className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #10b981, #34d399)' } as React.CSSProperties}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#059669' }}>
                  Resolution History & Audit
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.15rem 0 0 0' }}>
                  Audited historical tickets resolved by AI Autonomous Agents and supervised human specialists.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <span className="badge badge-success" style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}>
                Total Resolved: {sessions.filter(s => s.status === 'CLOSED_BY_AI').length + 2} Cases
              </span>
            </div>
          </div>

          {/* Unified Master Container Box for Archived Tickets */}
          <div className="glass-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)' }}>
                <span>Resolution Audit Logs</span>
                <span className="badge badge-success" style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>
                  100% Quality Verified
                </span>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Historical logs retained for 90 days</span>
            </div>

            {/* Render Closed Cases as Sleek Elevated Rows */}
            {[
              ...sessions.filter(s => s.status === 'CLOSED_BY_AI'),
              {
                id: 'SESSION-HIST-01',
                ticketId: 'TCK-8819',
                customerName: 'Ananya Roy',
                customerPhone: '+91-98441-20931',
                membershipLevel: 'PLATINUM TIER',
                channel: 'CHAT_WEB',
                category: 'Wallet Payout Schedule Inquiry',
                status: 'CLOSED_BY_AI',
                aiAgent: 'Payment AI',
                resolutionNote: 'Bank cycle schedule shared & instant payout verified via Razorpay.'
              },
              {
                id: 'SESSION-HIST-02',
                ticketId: 'TCK-8815',
                customerName: 'Aarav Patel',
                customerPhone: '+91-98200-11234',
                membershipLevel: 'GOLD TIER',
                channel: 'VOICE_TWILIO',
                category: 'Login Portal Password Reset',
                status: 'CLOSED_BY_AI',
                aiAgent: 'Voice Bot AI',
                resolutionNote: 'Automated SMS OTP link dispatched & authenticated successfully.'
              }
            ].map(s => (
              <div
                key={s.id}
                style={{
                  background: 'var(--bg-dark)',
                  padding: '0.75rem 1rem',
                  display: 'grid',
                  gridTemplateColumns: '100px 180px 1.2fr 160px 160px 170px',
                  alignItems: 'center',
                  gap: '0.85rem',
                  border: '1px solid var(--border-color)',
                  borderLeft: '4px solid #10b981',
                  borderRadius: '8px',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)'
                }}
              >
                {/* 1. Ticket ID */}
                <div>
                  <div className="kpi-card-header"><span className="kpi-title-modern">Ticket Ref</span></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><code style={{ fontSize: '0.86rem', fontWeight: 800, color: '#38bdf8' }}>{s.ticketId}</code> <TicketVisionButton ticket={{ id: s.ticketId, ticketNumber: s.ticketId, customerName: s.customerName, customerPhone: s.customerPhone, departmentLabel: 'Human Agent Desk', status: s.status, isEscalated: s.isEscalated }} compact size="sm" /></div>
                </div>

                {/* 2. Customer Profile */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem', flexShrink: 0, boxShadow: '0 2px 6px rgba(16, 185, 129, 0.25)' }}>
                    {s.customerName.charAt(0)}
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-main)', fontSize: '0.84rem', display: 'block', fontWeight: 800 }}>{s.customerName}</strong>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500 }}>{s.customerPhone}</span>
                  </div>
                </div>

                {/* 3. Category & Resolution */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.15rem' }}>
                    <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#059669', fontSize: '0.65rem', fontWeight: 800, padding: '0.1rem 0.45rem', borderRadius: '10px' }}>
                      {s.channel || 'CHAT_WEB'}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{s.membershipLevel || 'STANDARD'}</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-main)', fontWeight: 600 }}>{s.category}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                    {s.resolutionNote || 'Commission credit verified & customer acknowledged resolution.'}
                  </div>
                </div>

                {/* 4. Ticket Status */}
                <div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: '0.15rem' }}>RESOLUTION STATUS</span>
                  <span
                    style={{
                      background: 'rgba(16, 185, 129, 0.15)',
                      color: '#059669',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      borderRadius: '16px',
                      padding: '0.25rem 0.6rem',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    RESOLVED & CLOSED
                  </span>
                </div>

                {/* 5. Closed By Bot */}
                <div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: '0.15rem' }}>RESOLVED BY</span>
                  <span style={{ color: 'var(--text-main)', fontSize: '0.78rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    {s.aiAgent}
                  </span>
                </div>

                {/* 6. Action Button */}
                <div style={{ textAlign: 'right' }}>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      handleReopen(s.id);
                      if (onSelectSubTab) onSelectSubTab('AGENT_DESK');
                    }}
                    style={{
                      background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '0.74rem',
                      padding: '0.45rem 0.85rem',
                      borderRadius: '8px',
                      boxShadow: '0 2px 10px rgba(2, 132, 199, 0.25)',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Re-Open & Inspect
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* SUBTAB 6: OUTBOUND CALL DIALER */}
      {activeSubTab === 'CALL_DIALER' && (
        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, color: '#10b981', fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Phone size={16} /> Direct PSTN / SIP Dialpad
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1.5rem' }}>
            <div style={{ background: 'var(--bg-dark)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Customer Phone Number</label>
              <input className="form-input" defaultValue="+91-98765-43210" style={{ fontSize: '0.9rem', fontWeight: 700 }} />
              <button
                className="btn btn-primary"
                onClick={() => handleStartCall('+91-98765-43210')}
                style={{ background: '#10b981', color: 'var(--text-main)', fontWeight: 800, padding: '0.65rem' }}
              >
                Start Call
              </button>
            </div>
            <div style={{ background: 'var(--bg-dark)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', color: 'var(--text-main)' }}>Recent Call Logs & Audio Recordings</h4>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                • <strong>Sophia Chen</strong> (1m 24s) — Policy terms advisory confirmed • Transcript archived.<br />
                • <strong>David Miller</strong> (2m 10s) — Aadhaar blur clarification completed.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 7: WHATSAPP & SMS QUICK DISPATCH (EXPANDED COMPOSER WITH MODAL HISTORY DIALOG) */}
      {activeSubTab === 'WHATSAPP_SMS_DISPATCH' && (
        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            <div>
              <h3 style={{ margin: 0, color: '#38bdf8', fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Smartphone size={16} /> Instant Outbound Message Composer
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>
                Compose and dispatch instant WhatsApp messages or SMS advisories to any customer, agent, or vendor mobile number.
              </p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span className="badge badge-success">WhatsApp Business API: Online</span>
              <span className="badge badge-info">Twilio SMS Gateway: Active</span>
              
              {/* History Dialog Trigger Button in Header */}
              <button
                className="btn btn-primary"
                onClick={() => setShowHistoryDialog(true)}
                style={{
                  background: 'rgba(255, 215, 0, 0.15)',
                  color: '#ffd700',
                  border: '1px solid #ffd700',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  padding: '0.35rem 0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  borderRadius: '6px'
                }}
              >
                Outbound History ({dispatchHistory.length})
              </button>
            </div>
          </div>

          {/* Full-Width Expanded Message Composer Card */}
          <div style={{ background: 'var(--bg-dark)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Recipient Phone & Name Inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                  Recipient Mobile Number <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  className="form-input"
                  placeholder="+91-98765-43210"
                  value={recipientPhone}
                  onChange={e => setRecipientPhone(e.target.value)}
                  style={{ fontSize: '0.9rem', fontWeight: 600 }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                  Recipient Name (Optional)
                </label>
                <input
                  className="form-input"
                  placeholder="e.g. Ramesh Kumar"
                  value={recipientName}
                  onChange={e => setRecipientName(e.target.value)}
                  style={{ fontSize: '0.9rem' }}
                />
              </div>
            </div>

            {/* Message Body & Pre-Approved Templates Trigger Bar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  Message Body (Large Canvas) <span style={{ color: '#ef4444' }}>*</span>
                </label>

                {/* Pre-Approved Message Templates Button Shape */}
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowTemplatesPopup(!showTemplatesPopup)}
                  style={{
                    background: showTemplatesPopup ? '#ffd700' : 'rgba(255, 215, 0, 0.12)',
                    color: showTemplatesPopup ? '#000' : '#ffd700',
                    border: '1px solid #ffd700',
                    fontWeight: 700,
                    fontSize: '0.72rem',
                    padding: '0.3rem 0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    borderRadius: '20px'
                  }}
                >
                  <Sparkles size={13} /> {showTemplatesPopup ? 'Hide Templates' : 'Pre-Approved Message Templates'}
                </button>
              </div>

              {/* Pop-up / Expandable Templates Grid Inside Composer */}
              {showTemplatesPopup && (
                <div style={{ background: 'rgba(255, 215, 0, 0.06)', border: '1px solid #ffd700', borderRadius: '8px', padding: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <div style={{ fontSize: '0.75rem', color: '#ffd700', fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Click to Auto-Load Pre-Approved Enterprise Template:</span>
                    <button onClick={() => setShowTemplatesPopup(false)} style={{ background: 'transparent', border: 'none', color: '#ffd700', cursor: 'pointer', fontWeight: 800 }}></button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.6rem' }}>
                    
                    <div
                      onClick={() => {
                        setSmsMessage('Hello! Please click here to upload a higher resolution 300 DPI copy of your Aadhaar card to complete your KYC: https://portal.enterprise.ai/upload?ref=KYC-RETRY');
                        setShowTemplatesPopup(false);
                      }}
                      style={{ background: 'var(--bg-dark)', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid var(--border-color)', cursor: 'pointer', transition: 'all 0.15s ease' }}
                    >
                      <strong style={{ fontSize: '0.8rem', color: 'var(--text-main)', display: 'block', marginBottom: '0.2rem' }}>KYC Document Re-Upload Link</strong>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Instructs customer to upload 300 DPI scan.</span>
                    </div>

                    <div
                      onClick={() => {
                        setSmsMessage('Dear Partner, your agent referral commission of $50.00 has been credited to your wallet balance on transaction #PAY-8821. Thank you for partnering with Forge India Connect.');
                        setShowTemplatesPopup(false);
                      }}
                      style={{ background: 'var(--bg-dark)', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid var(--border-color)', cursor: 'pointer', transition: 'all 0.15s ease' }}
                    >
                      <strong style={{ fontSize: '0.8rem', color: '#10b981', display: 'block', marginBottom: '0.2rem' }}>Referral Commission Confirmation</strong>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Notifies referring agent of payout credit.</span>
                    </div>

                    <div
                      onClick={() => {
                        setSmsMessage('Your Forge India partner registration fee receipt of $500.00 is generated. Invoice #INV-9920148. Download link sent to your email.');
                        setShowTemplatesPopup(false);
                      }}
                      style={{ background: 'var(--bg-dark)', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid var(--border-color)', cursor: 'pointer', transition: 'all 0.15s ease' }}
                    >
                      <strong style={{ fontSize: '0.8rem', color: '#38bdf8', display: 'block', marginBottom: '0.2rem' }}>Registration Fee Tax Invoice Receipt</strong>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Shares official tax invoice reference number.</span>
                    </div>

                    <div
                      onClick={() => {
                        setSmsMessage('Your password reset OTP for Forge Portal is: 482910. Valid for 10 minutes. Do not share this OTP with anyone.');
                        setShowTemplatesPopup(false);
                      }}
                      style={{ background: 'var(--bg-dark)', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid var(--border-color)', cursor: 'pointer', transition: 'all 0.15s ease' }}
                    >
                      <strong style={{ fontSize: '0.8rem', color: '#ffd700', display: 'block', marginBottom: '0.2rem' }}>Security OTP / Portal Link</strong>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>6-digit temporary login authentication link.</span>
                    </div>

                  </div>
                </div>
              )}

              {/* Expanded Large Textarea */}
              <textarea
                className="form-input"
                rows={9}
                placeholder="Type custom notification, multi-paragraph messages, payment links, KYC re-upload instructions, or select a pre-approved template above..."
                value={smsMessage}
                onChange={e => setSmsMessage(e.target.value)}
                style={{ fontSize: '0.88rem', lineHeight: '1.55', width: '100%' }}
              />
              <div style={{ textAlign: 'right', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {smsMessage.length} characters
              </div>
            </div>

            {/* Compact Dispatch Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '1rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Messages are archived automatically in your Outbound History.
              </span>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    if (!recipientPhone.trim()) {
                      alert('Please enter a valid mobile number.');
                      return;
                    }
                    if (!smsMessage.trim()) {
                      alert('Please enter a message to send.');
                      return;
                    }
                    const newEntry = {
                      id: `DISP-${Date.now().toString().slice(-4)}`,
                      phone: recipientPhone,
                      name: recipientName || 'Customer',
                      channel: 'WHATSAPP',
                      message: smsMessage,
                      status: 'DELIVERED',
                      timestamp: 'Just Now'
                    };
                    setDispatchHistory(prev => [newEntry, ...prev]);
                    setToastMessage(`WhatsApp message successfully delivered to ${recipientPhone} (${recipientName || 'Customer'})!`);
                    setSmsMessage('');
                  }}
                  disabled={!smsMessage.trim()}
                  style={{ background: '#25D366', color: 'var(--text-main)', fontWeight: 700, fontSize: '0.78rem', padding: '0.5rem 1.15rem', display: 'flex', alignItems: 'center', gap: '0.4rem', border: 'none', borderRadius: '6px' }}
                >
                  <Smartphone size={15} /> Send via WhatsApp
                </button>

                <button
                  className="btn btn-primary"
                  onClick={() => {
                    if (!recipientPhone.trim()) {
                      alert('Please enter a valid mobile number.');
                      return;
                    }
                    if (!smsMessage.trim()) {
                      alert('Please enter a message to send.');
                      return;
                    }
                    const newEntry = {
                      id: `DISP-${Date.now().toString().slice(-4)}`,
                      phone: recipientPhone,
                      name: recipientName || 'Customer',
                      channel: 'SMS',
                      message: smsMessage,
                      status: 'SENT_TWILIO',
                      timestamp: 'Just Now'
                    };
                    setDispatchHistory(prev => [newEntry, ...prev]);
                    setToastMessage(`SMS advisory dispatched to ${recipientPhone} via Twilio Gateway.`);
                    setSmsMessage('');
                  }}
                  disabled={!smsMessage.trim()}
                  style={{ background: '#38bdf8', color: '#000', fontWeight: 700, fontSize: '0.78rem', padding: '0.5rem 1.15rem', display: 'flex', alignItems: 'center', gap: '0.4rem', border: 'none', borderRadius: '6px' }}
                >
                  <Send size={14} /> Send via SMS
                </button>
              </div>
            </div>

          </div>

          {/* Outbound Dispatch History Dialog Modal Popup (Theme-Aware Multi-Message Thread Viewer) */}
          {showHistoryDialog && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.65)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                padding: '1.25rem'
              }}
              onClick={() => {
                setShowHistoryDialog(false);
                setSelectedHistoryPhone(null);
              }}
            >
              <div
                style={{
                  background: 'var(--bg-surface)',
                  border: '1.5px solid var(--primary-color)',
                  borderRadius: '16px',
                  width: '1100px',
                  maxWidth: '96vw',
                  height: '75vh',
                  maxHeight: '680px',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '1.5rem',
                  gap: '1rem',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                  color: 'var(--text-color)'
                }}
                onClick={e => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                  <div>
                    <h3 style={{ margin: 0, color: 'var(--primary-color)', fontSize: '1.15rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      Outbound Dispatch History & Multi-Message Thread Audit
                    </h3>
                    <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      Complete chronological record of all WhatsApp and SMS messages dispatched from this portal ({dispatchHistory.length} total messages recorded).
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowHistoryDialog(false);
                      setSelectedHistoryPhone(null);
                    }}
                    style={{ background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-color)', fontSize: '1rem', cursor: 'pointer', fontWeight: 800 }}
                  >
                                      </button>
                </div>

                {/* 2-Column Split Screen: Left Contact History / Right Conversation Thread */}
                <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '1.25rem', flex: 1, minHeight: 0 }}>
                  
                  {/* Left Column: Unique Contact Cards */}
                  <div style={{ background: 'var(--bg-dark)', borderRadius: '10px', padding: '0.85rem', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.65rem', overflowY: 'auto' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Recipient Contacts ({Array.from(new Set(dispatchHistory.map(d => d.phone))).length})
                    </div>

                    {/* All / Unique Contact Switcher */}
                    <div
                      onClick={() => setSelectedHistoryPhone(null)}
                      style={{
                        padding: '0.65rem 0.85rem',
                        borderRadius: '8px',
                        background: selectedHistoryPhone === null ? 'rgba(0, 43, 127, 0.35)' : 'var(--bg-surface)',
                        border: selectedHistoryPhone === null ? '1.5px solid var(--primary-color)' : '1px solid var(--border-color)',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <strong style={{ fontSize: '0.82rem', color: 'var(--text-color)', display: 'block' }}>All Dispatches</strong>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Show complete log table</span>
                      </div>
                      <span className="badge badge-info">{dispatchHistory.length}</span>
                    </div>

                    {/* Group by Phone */}
                    {Array.from(new Set(dispatchHistory.map(d => d.phone))).map(phone => {
                      const userMessages = dispatchHistory.filter(d => d.phone === phone);
                      const latest = userMessages[0];
                      const isSelected = selectedHistoryPhone === phone;

                      return (
                        <div
                          key={phone}
                          onClick={() => setSelectedHistoryPhone(phone)}
                          style={{
                            padding: '0.75rem 0.85rem',
                            borderRadius: '8px',
                            background: isSelected ? 'rgba(0, 43, 127, 0.35)' : 'var(--bg-surface)',
                            border: isSelected ? '1.5px solid var(--primary-color)' : '1px solid var(--border-color)',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.25rem'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <strong style={{ fontSize: '0.82rem', color: 'var(--text-color)' }}>{phone}</strong>
                            <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>{userMessages.length} msgs</span>
                          </div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                            {latest.name} • {latest.timestamp}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontStyle: 'italic' }}>
                            Last: "{latest.message}"
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Right Column: Detailed Messages Stream */}
                  <div style={{ background: 'var(--bg-dark)', borderRadius: '10px', padding: '1rem', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.75rem', overflowY: 'auto' }}>
                    {selectedHistoryPhone ? (
                      /* Conversation Thread for Specific Phone Number */
                      <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                          <div>
                            <strong style={{ fontSize: '0.9rem', color: 'var(--text-color)' }}>
                              Message Chain with {selectedHistoryPhone} ({dispatchHistory.find(d => d.phone === selectedHistoryPhone)?.name})
                            </strong>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                              Total {dispatchHistory.filter(d => d.phone === selectedHistoryPhone).length} outbound messages dispatched
                            </div>
                          </div>
                          <button
                            className="btn btn-secondary"
                            onClick={() => {
                              const found = dispatchHistory.find(d => d.phone === selectedHistoryPhone);
                              if (found) {
                                setRecipientPhone(found.phone);
                                setRecipientName(found.name);
                              }
                              setShowHistoryDialog(false);
                            }}
                            style={{ fontSize: '0.72rem', padding: '0.25rem 0.6rem' }}
                          >
                            Compose New Message
                          </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', overflowY: 'auto', flex: 1, paddingRight: '0.35rem' }}>
                          {dispatchHistory.filter(d => d.phone === selectedHistoryPhone).map((msg, idx) => (
                            <div
                              key={idx}
                              style={{
                                background: 'var(--bg-surface)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '8px',
                                padding: '0.85rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.4rem'
                              }}
                            >
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                  <span className={`badge ${msg.channel === 'WHATSAPP' ? 'badge-success' : 'badge-info'}`} style={{ fontSize: '0.65rem' }}>
                                    {msg.channel === 'WHATSAPP' ? 'WhatsApp' : 'SMS'}
                                  </span>
                                  <span style={{ color: 'var(--text-muted)' }}>Entry #{idx + 1}</span>
                                </div>
                                <span style={{ color: 'var(--text-muted)' }}>{msg.timestamp}</span>
                              </div>

                              <div style={{ fontSize: '0.82rem', color: 'var(--text-color)', lineHeight: '1.45', background: 'var(--bg-dark)', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                                "{msg.message}"
                              </div>

                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.2rem' }}>
                                <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>
                                  {msg.status}
                                </span>
                                <button
                                  className="btn btn-secondary"
                                  onClick={() => {
                                    setRecipientPhone(msg.phone);
                                    setRecipientName(msg.name);
                                    setSmsMessage(msg.message);
                                    setShowHistoryDialog(false);
                                    setToastMessage(`Loaded past message for ${msg.phone}`);
                                  }}
                                  style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}
                                >
                                  Resend / Load Text
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      /* Full Complete Table View */
                      <div style={{ overflowY: 'auto', flex: 1 }}>
                        <table className="custom-table" style={{ fontSize: '0.8rem', width: '100%' }}>
                          <thead>
                            <tr>
                              <th>Recipient</th>
                              <th>Channel</th>
                              <th>Dispatched Message Body</th>
                              <th>Status</th>
                              <th>Timestamp</th>
                              <th style={{ textAlign: 'center' }}>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dispatchHistory.map(entry => (
                              <tr key={entry.id}>
                                <td style={{ whiteSpace: 'nowrap' }}>
                                  <strong style={{ color: 'var(--text-color)' }}>{entry.phone}</strong>
                                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{entry.name}</div>
                                </td>
                                <td>
                                  <span className={`badge ${entry.channel === 'WHATSAPP' ? 'badge-success' : 'badge-info'}`} style={{ fontSize: '0.65rem' }}>
                                    {entry.channel === 'WHATSAPP' ? 'WhatsApp' : 'SMS'}
                                  </span>
                                </td>
                                <td style={{ maxWidth: '320px' }}>
                                  <div style={{ fontSize: '0.75rem', color: 'var(--text-color)', lineHeight: '1.35', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    "{entry.message}"
                                  </div>
                                </td>
                                <td>
                                  <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>
                                    {entry.status}
                                  </span>
                                </td>
                                <td style={{ color: 'var(--text-muted)', fontSize: '0.72rem', whiteSpace: 'nowrap' }}>
                                  {entry.timestamp}
                                </td>
                                <td style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                                  <button
                                    className="btn btn-secondary"
                                    onClick={() => {
                                      setRecipientPhone(entry.phone);
                                      setRecipientName(entry.name);
                                      setSmsMessage(entry.message);
                                      setShowHistoryDialog(false);
                                      setToastMessage(`Loaded past message for ${entry.phone}`);
                                    }}
                                    style={{ fontSize: '0.68rem', padding: '0.2rem 0.5rem' }}
                                  >
                                    Resend
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                </div>

                {/* Modal Footer */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Tip: Click on any contact on the left to see all 10+ threaded messages sent to them.
                  </span>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowHistoryDialog(false);
                      setSelectedHistoryPhone(null);
                    }}
                    style={{ fontSize: '0.78rem', padding: '0.4rem 1.1rem', fontWeight: 600 }}
                  >
                    Close Dialog
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>
      )}

      {/* SUBTAB 8: KNOWLEDGE SEARCH */}
      {activeSubTab === 'KNOWLEDGE_SEARCH' && (
        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, color: '#38bdf8', fontSize: '1.1rem', fontWeight: 800 }}>
            RAG Knowledge Base & Canned Response Directory
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {kbArticles.map(a => (
              <div key={a.id} className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #0284c7, #38bdf8)' } as React.CSSProperties}>
                <span className="badge badge-info" style={{ alignSelf: 'flex-start' }}>{a.category}</span>
                <strong style={{ color: '#ffd700', fontSize: '0.88rem' }}>{a.title}</strong>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>{a.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 9: SHIFT NOTES */}
      {activeSubTab === 'SHIFT_NOTES' && (
        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, color: '#ffd700', fontSize: '1.1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={18} /> Shift Notes & Team Lead Announcements
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {shiftNotesList.map(n => (
              <div key={n.id} style={{ background: 'var(--bg-dark)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.78rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <strong style={{ color: n.level === 'CRITICAL' ? '#ef4444' : '#ffd700' }}>{n.title}</strong>
                  <span className={`badge ${n.level === 'CRITICAL' ? 'badge-danger' : 'badge-warning'}`}>{n.level} • {n.time}</span>
                </div>
                <p style={{ margin: 0, color: '#f8fafc', lineHeight: '1.4' }}>{n.content}</p>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>Posted by: {n.author}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 10: MY METRICS (ENTERPRISE SHIFT PERFORMANCE & REPUTATION COCKPIT) */}
      {activeSubTab === 'MY_METRICS' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
          
          {/* Header & Agent Shift Status Ribbon */}
          <div className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #059669, #34d399)' } as React.CSSProperties}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Activity size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#059669' }}>
                  Shift Performance & CSAT Benchmark
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.15rem 0 0 0' }}>
                  Real-time operational benchmarks, resolution speed, CSAT scores, and shift adherence analytics for <strong>Rahul Sharma (Query Specialist)</strong>.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0.35rem 0.75rem', borderRadius: '8px', fontSize: '0.74rem', color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 8px #10b981' }} />
                Shift: <strong>Morning (09:00 AM - 05:30 PM)</strong> • Logged: <strong>4h 42m</strong>
              </div>
              <span className="badge badge-warning" style={{ fontSize: '0.74rem', padding: '0.35rem 0.75rem' }}>Top 5% Desk Rank</span>
            </div>
          </div>

          {/* Row 1: Key Performance Indicators (6 Metric Cards in a Master Container) */}
          <div className="glass-panel" style={{ padding: '1rem', display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.85rem' }}>
            
            <div className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #f59e0b, #fde047)' } as React.CSSProperties}>
              <div className="kpi-card-header">
                <span className="kpi-title-modern">CSAT Rating</span>
                <Star size={18} className="text-amber" />
              </div>
              <div className="kpi-value-modern">
                <span>4.92 <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/ 5.0</span></span>
              </div>
              <div className="kpi-subtext-modern">
                <ArrowUpRight size={13} className="text-emerald" /> +0.08 vs Shift Avg
              </div>
            </div>

            <div className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #06b6d4, #38bdf8)' } as React.CSSProperties}>
              <div className="kpi-card-header">
                <span className="kpi-title-modern">1st Response Time</span>
                <Zap size={18} className="text-cyan" />
              </div>
              <div className="kpi-value-modern">
                <span>11s</span>
              </div>
              <div className="kpi-subtext-modern">
                Target: &lt; 30s SLA
              </div>
            </div>

            <div className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #6366f1, #818cf8)' } as React.CSSProperties}>
              <div className="kpi-card-header">
                <span className="kpi-title-modern">Avg Handle Time</span>
                <Clock size={18} className="text-brand" />
              </div>
              <div className="kpi-value-modern">
                <span>2m 14s</span>
              </div>
              <div className="kpi-subtext-modern">
                <ArrowRight size={13} className="text-emerald" /> 32s faster than avg
              </div>
            </div>

            <div className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #10b981, #34d399)' } as React.CSSProperties}>
              <div className="kpi-card-header">
                <span className="kpi-title-modern">Resolved Cases</span>
                <CheckCircle2 size={18} className="text-emerald" />
              </div>
              <div className="kpi-value-modern">
                <span>24</span>
              </div>
              <div className="kpi-subtext-modern">
                96% 1-Touch Solved
              </div>
            </div>

            <div className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #10b981, #34d399)' } as React.CSSProperties}>
              <div className="kpi-card-header">
                <span className="kpi-title-modern">SLA Compliance</span>
                <Shield size={18} className="text-emerald" />
              </div>
              <div className="kpi-value-modern">
                <span>100%</span>
              </div>
              <div className="kpi-subtext-modern">
                0 Breaches Today
              </div>
            </div>

            <div className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #f59e0b, #fde047)' } as React.CSSProperties}>
              <div className="kpi-card-header">
                <span className="kpi-title-modern">AI Takeovers</span>
                <AlertTriangle size={18} className="text-amber" />
              </div>
              <div className="kpi-value-modern">
                <span>3 Cases</span>
              </div>
              <div className="kpi-subtext-modern">
                100% De-escalated
              </div>
            </div>

          </div>

          {/* Row 2: 2-Column Analytics (Hourly Velocity + Channel Breakdown) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1rem' }}>
            
            {/* Hourly Handling Velocity Visualizer */}
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '0.88rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  Today's Hourly Workload & Resolution Velocity
                </strong>
                <span className="badge badge-info" style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem' }}>Target: 4-5 cases/hr</span>
              </div>

              {/* Bar Chart Visualization with explicit height container and crisp pixel bars */}
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '140px', padding: '0.75rem 0.5rem 0.25rem 0.5rem', background: 'var(--bg-dark)', borderRadius: '8px', border: '1px solid var(--border-color)', position: 'relative' }}>
                
                {/* Horizontal Guide Line */}
                <div style={{ position: 'absolute', top: '35%', left: 0, right: 0, borderTop: '1px dashed rgba(2, 132, 199, 0.25)', pointerEvents: 'none' }} />

                {[
                  { time: '09:00 AM', count: 3, barHeight: 48, rate: '3 cases' },
                  { time: '10:00 AM', count: 6, barHeight: 96, peak: true, rate: '6 cases (Peak)' },
                  { time: '11:00 AM', count: 5, barHeight: 80, rate: '5 cases' },
                  { time: '12:00 PM', count: 4, barHeight: 64, rate: '4 cases' },
                  { time: '01:00 PM', count: 2, barHeight: 32, rate: '2 cases' },
                  { time: '02:00 PM', count: 4, barHeight: 64, rate: '4 cases' },
                  { time: 'Current', count: 3, barHeight: 48, active: true, rate: '3 in-progress' }
                ].map((bar, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%', flex: 1, zIndex: 1 }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: bar.peak ? '#10b981' : bar.active ? '#d97706' : '#0284c7', marginBottom: '0.35rem' }}>
                      {bar.count}
                    </span>
                    <div
                      title={bar.rate}
                      style={{
                        width: '32px',
                        height: `${bar.barHeight}px`,
                        background: bar.peak
                          ? 'linear-gradient(180deg, #10b981 0%, #059669 100%)'
                          : bar.active
                          ? 'linear-gradient(180deg, #f7b500 0%, #d97706 100%)'
                          : 'linear-gradient(180deg, #38bdf8 0%, #0284c7 100%)',
                        borderRadius: '6px 6px 2px 2px',
                        boxShadow: bar.peak
                          ? '0 0 12px rgba(16, 185, 129, 0.4)'
                          : bar.active
                          ? '0 0 12px rgba(247, 181, 0, 0.4)'
                          : '0 2px 6px rgba(2, 132, 199, 0.25)',
                        transition: 'all 0.25s ease',
                        cursor: 'pointer'
                      }}
                    />
                    <span style={{ fontSize: '0.64rem', color: 'var(--text-muted)', marginTop: '0.4rem', fontWeight: bar.active || bar.peak ? 700 : 500, whiteSpace: 'nowrap' }}>
                      {bar.time}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                <span>Peak Speed: <strong style={{ color: '#059669' }}>10:00 AM (6 cases resolved)</strong></span>
                <span>Shift Efficiency: <strong style={{ color: '#0284c7' }}>98.4% On Target</strong></span>
              </div>
            </div>

            {/* Multi-Channel Distribution Breakdown */}
            <div className="glass-panel" style={{ padding: '1.15rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <strong style={{ fontSize: '0.86rem', color: 'var(--text-main)' }}>
                Cases Handled by Channel
              </strong>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', marginBottom: '0.2rem' }}>
                    <span style={{ color: 'var(--text-main)' }}>Live Web Chat (12 Cases)</span>
                    <strong style={{ color: '#0284c7' }}>50%</strong>
                  </div>
                  <div style={{ height: '6px', background: 'var(--bg-dark)', borderRadius: '3px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                    <div style={{ width: '50%', height: '100%', background: '#0284c7' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', marginBottom: '0.2rem' }}>
                    <span style={{ color: 'var(--text-main)' }}>Twilio PSTN Voice (6 Calls)</span>
                    <strong style={{ color: '#059669' }}>25%</strong>
                  </div>
                  <div style={{ height: '6px', background: 'var(--bg-dark)', borderRadius: '3px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                    <div style={{ width: '25%', height: '100%', background: '#059669' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', marginBottom: '0.2rem' }}>
                    <span style={{ color: 'var(--text-main)' }}>WhatsApp Business (4 Chats)</span>
                    <strong style={{ color: '#0284c7' }}>16.7%</strong>
                  </div>
                  <div style={{ height: '6px', background: 'var(--bg-dark)', borderRadius: '3px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                    <div style={{ width: '16.7%', height: '100%', background: '#0284c7' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', marginBottom: '0.2rem' }}>
                    <span style={{ color: 'var(--text-main)' }}>Email Inquiries (2 Tickets)</span>
                    <strong style={{ color: '#9333ea' }}>8.3%</strong>
                  </div>
                  <div style={{ height: '6px', background: 'var(--bg-dark)', borderRadius: '3px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                    <div style={{ width: '8.3%', height: '100%', background: '#9333ea' }} />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Row 3: Customer Feedback & Shift Achievement Badges */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            
            {/* Customer CSAT Review Snippets */}
            <div className="glass-panel" style={{ padding: '1.15rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '0.86rem', color: 'var(--text-main)' }}>
                  Recent Customer Satisfaction Reviews
                </strong>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Verified Post-Chat Ratings</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ background: 'var(--bg-dark)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.15rem' }}>
                    <strong style={{ color: 'var(--text-main)' }}>Sophia Chen</strong>
                    <span style={{ color: '#d97706', fontWeight: 700 }}>5.0</span>
                  </div>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: '1.4' }}>
                    "Rahul immediately confirmed my billing dispute query and cleared my commission ledger balance in seconds!"
                  </p>
                </div>

                <div style={{ background: 'var(--bg-dark)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.15rem' }}>
                    <strong style={{ color: 'var(--text-main)' }}>David Miller</strong>
                    <span style={{ color: '#d97706', fontWeight: 700 }}>5.0</span>
                  </div>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: '1.4' }}>
                    "Barged into the call when AI struggled with OCR scan and explained the 300 DPI requirement clearly."
                  </p>
                </div>
              </div>
            </div>

            {/* Shift Achievement Badges & Milestones */}
            <div className="glass-panel" style={{ padding: '1.15rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <strong style={{ fontSize: '0.86rem', color: '#059669' }}>
                Shift Milestone Badges & SLA Streaks
              </strong>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.55rem' }}>
                <div style={{ background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.65rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.35rem' }}></span>
                  <div>
                    <strong style={{ fontSize: '0.76rem', color: 'var(--text-main)', display: 'block' }}>Zero Breach Streak</strong>
                    <span style={{ fontSize: '0.66rem', color: '#059669', fontWeight: 600 }}>14 Days Active</span>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.65rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.35rem' }}></span>
                  <div>
                    <strong style={{ fontSize: '0.76rem', color: 'var(--text-main)', display: 'block' }}>First Contact Resolution</strong>
                    <span style={{ fontSize: '0.66rem', color: '#0284c7', fontWeight: 600 }}>96.2% Rate</span>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.65rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.35rem' }}></span>
                  <div>
                    <strong style={{ fontSize: '0.76rem', color: 'var(--text-main)', display: 'block' }}>AI Co-Pilot Master</strong>
                    <span style={{ fontSize: '0.66rem', color: '#d97706', fontWeight: 600 }}>3 Intercepts Handled</span>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.65rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.35rem' }}></span>
                  <div>
                    <strong style={{ fontSize: '0.76rem', color: 'var(--text-main)', display: 'block' }}>Customer Champion</strong>
                    <span style={{ fontSize: '0.66rem', color: '#059669', fontWeight: 600 }}>4.92 CSAT Average</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Interactive Call Transfer Modal (To Gemini AI Bot or Query Team Lead) */}
      {transferCallModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="glass-panel" style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '10px', width: '480px', maxWidth: '95%', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                Transfer Live Call — {selectedSession.customerName} ({selectedSession.ticketId})
              </h4>
              <button className="btn btn-secondary" onClick={() => setTransferCallModal(false)} style={{ padding: '0.2rem 0.5rem' }}></button>
            </div>

            <p style={{ margin: 0, fontSize: '0.76rem', color: 'var(--text-muted)' }}>
              Choose whether to re-route this live call back to the autonomous AI Voice Bot or escalate to the supervisor/Team Lead desk.
            </p>

            {/* Target Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Select Transfer Destination:</label>

              {/* Option 1: AI Bot */}
              <div
                onClick={() => setTransferDestination('AI_BOT')}
                style={{
                  padding: '0.75rem',
                  borderRadius: '6px',
                  border: `2px solid ${transferDestination === 'AI_BOT' ? '#059669' : 'var(--border-color)'}`,
                  background: transferDestination === 'AI_BOT' ? 'rgba(5, 150, 105, 0.1)' : 'var(--bg-dark)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem'
                }}
              >
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.85rem' }}>
                                  </div>
                <div>
                  <strong style={{ fontSize: '0.82rem', color: 'var(--text-main)', display: 'block' }}>Return to Autonomous AI Voice Bot</strong>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Gemini 1.5 Pro Vector RAG Engine will resume conversation.</span>
                </div>
              </div>

              {/* Option 2: Query Team Lead */}
              <div
                onClick={() => setTransferDestination('QUERY_TL')}
                style={{
                  padding: '0.75rem',
                  borderRadius: '6px',
                  border: `2px solid ${transferDestination === 'QUERY_TL' ? '#0284c7' : 'var(--border-color)'}`,
                  background: transferDestination === 'QUERY_TL' ? 'rgba(2, 132, 199, 0.1)' : 'var(--bg-dark)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem'
                }}
              >
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.85rem' }}>
                                  </div>
                <div>
                  <strong style={{ fontSize: '0.82rem', color: 'var(--text-main)', display: 'block' }}>Transfer to Query Team Lead (Sarah Connor)</strong>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Supervisor Tier 2 live SIP desk with financial override authority.</span>
                </div>
              </div>

              {/* Option 3: Senior KYC Officer */}
              <div
                onClick={() => setTransferDestination('KYC_SPECIALIST')}
                style={{
                  padding: '0.75rem',
                  borderRadius: '6px',
                  border: `2px solid ${transferDestination === 'KYC_SPECIALIST' ? '#d97706' : 'var(--border-color)'}`,
                  background: transferDestination === 'KYC_SPECIALIST' ? 'rgba(217, 119, 6, 0.1)' : 'var(--bg-dark)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem'
                }}
              >
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.85rem' }}>
                                  </div>
                <div>
                  <strong style={{ fontSize: '0.82rem', color: 'var(--text-main)', display: 'block' }}>Transfer to Senior KYC Specialist Desk</strong>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Direct document override for Aadhaar OCR / blurry scan issues.</span>
                </div>
              </div>
            </div>

            {/* Transfer Handover Note */}
            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Handover Note (Optional):</label>
              <input
                type="text"
                value={transferNote}
                onChange={(e) => setTransferNote(e.target.value)}
                placeholder="e.g. Customer explained blurry scan, ready for manual approval."
                style={{ width: '100%', background: 'var(--bg-dark)', border: '1px solid var(--border-color)', color: 'var(--text-main)', padding: '0.45rem 0.6rem', borderRadius: '6px', fontSize: '0.76rem' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.3rem' }}>
              <button className="btn btn-secondary" onClick={() => setTransferCallModal(false)}>Cancel</button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setTransferCallModal(false);
                  if (transferDestination === 'AI_BOT') {
                    const updated = sessions.map(s => s.id === selectedSession.id ? { ...s, status: 'LIVE_AI' } : s);
                    setSessions(updated);
                    setSelectedSession({ ...selectedSession, status: 'LIVE_AI' });
                    showToast(`Call ${selectedSession.ticketId} returned to Gemini AI Voice Bot.`);
                  } else if (transferDestination === 'QUERY_TL') {
                    const updated = sessions.map(s => s.id === selectedSession.id ? { ...s, status: 'CLOSED_BY_AI', internalWhisperNotes: [...(s.internalWhisperNotes || []), { author: 'Alex Vance (Agent)', note: `Transferred to Query TL: ${transferNote || 'Supervisor assistance required.'}`, time: 'Just now' }] } : s);
                    setSessions(updated);
                    setSelectedSession({ ...selectedSession, status: 'CLOSED_BY_AI' });
                    showToast(`Call ${selectedSession.ticketId} successfully transferred to Query Team Lead (Sarah Connor).`);
                  } else {
                    showToast(`Call ${selectedSession.ticketId} transferred to Senior KYC Verification Desk.`);
                  }
                }}
                style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#fff', fontWeight: 700, fontSize: '0.76rem', padding: '0.45rem 0.9rem', border: 'none', borderRadius: '6px' }}
              >
                Confirm & Execute Transfer
              </button>
            </div>

          </div>
        </div>
      )}
      </>
      )}

    </div>
  );
};
export default HumanAgentDashboard;
