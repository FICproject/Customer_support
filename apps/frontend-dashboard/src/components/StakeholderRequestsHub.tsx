import React, { useState, useMemo } from 'react';
import {
  Building2,
  Briefcase,
  UsersRound,
  Shield,
  Truck,
  Wrench,
  FileCheck,
  CreditCard,
  HelpCircle,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Eye,
  Send,
  Plus,
  RefreshCw,
  X,
  FileText,
  DollarSign,
  UserCheck,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { ApiService } from '../services/api';

export type StakeholderType =
  | 'ALL'
  | 'VENDOR'
  | 'AGENT'
  | 'MANAGER'
  | 'SUBADMIN'
  | 'DELIVERY_PARTNER'
  | 'TECHNICIAN'
  | 'KYC'
  | 'PAYMENT'
  | 'QUERIES';

export type RequestCategory =
  | 'ALL'
  | 'NEW_ONBOARDING'
  | 'DOCUMENT_ISSUE'
  | 'PAYMENT_ISSUE'
  | 'QUERY';

export type RequestStatus =
  | 'ALL'
  | 'PENDING_REVIEW'
  | 'REUPLOAD_REQUESTED'
  | 'PAYMENT_PENDING'
  | 'APPROVED'
  | 'REJECTED'
  | 'ESCALATED';

export interface StakeholderRequest {
  id: string;
  stakeholderType: Exclude<StakeholderType, 'ALL'>;
  category: Exclude<RequestCategory, 'ALL'>;
  title: string;
  description: string;
  entityName: string;
  contactPerson: string;
  phone: string;
  email: string;
  location: string;
  status: 'PENDING_REVIEW' | 'REUPLOAD_REQUESTED' | 'PAYMENT_PENDING' | 'APPROVED' | 'REJECTED' | 'ESCALATED';
  priority: 'CRITICAL' | 'HIGH' | 'NORMAL';
  submittedAt: string;
  slaMinutesRemaining: number;
  amount?: string;
  utrNumber?: string;
  documents: { name: string; type: string; status: 'VALID' | 'BLURRY' | 'EXPIRED' | 'MISSING' | 'PENDING' }[];
  auditNotes: string;
  assignedTL?: string;
}

const INITIAL_REQUESTS: StakeholderRequest[] = [
  // 1. VENDOR REQUESTS
  {
    id: 'REQ-VND-8801',
    stakeholderType: 'VENDOR',
    category: 'NEW_ONBOARDING',
    title: 'New Franchise Wholesale Vendor Onboarding',
    description: 'New pharmacy & general store franchise registration submitted for Coimbatore Central zone. Awaiting trade license & agreement sign-off.',
    entityName: 'Apex Health Wholesale & Pharma Hub',
    contactPerson: 'K. R. Natarajan',
    phone: '+91 98421 77312',
    email: 'natarajan@apexwholesaleco.com',
    location: 'Coimbatore, Tamil Nadu',
    status: 'PENDING_REVIEW',
    priority: 'HIGH',
    submittedAt: 'Today, 10:20 AM',
    slaMinutesRemaining: 45,
    amount: '₹25,000 (Franchise Security Deposit)',
    documents: [
      { name: 'Trade_License_2026.pdf', type: 'PDF', status: 'VALID' },
      { name: 'GSTIN_Registration.pdf', type: 'PDF', status: 'VALID' },
      { name: 'Store_Front_Photo.jpg', type: 'IMAGE', status: 'VALID' }
    ],
    auditNotes: 'AI OCR verified GSTIN with government portal (Active). Initial deposit verification pending.'
  },
  {
    id: 'REQ-VND-8802',
    stakeholderType: 'VENDOR',
    category: 'DOCUMENT_ISSUE',
    title: 'FSSAI License Renewal Blur Detected',
    description: 'Post-onboarding annual food safety compliance re-verification. Uploaded FSSAI certificate has glare on license registration number.',
    entityName: 'Sri Krishna Foods & Confectionery',
    contactPerson: 'S. Ramanathan',
    phone: '+91 94432 11982',
    email: 'ramanathan@krishnafoods.in',
    location: 'Madurai, Tamil Nadu',
    status: 'REUPLOAD_REQUESTED',
    priority: 'HIGH',
    submittedAt: 'Today, 09:15 AM',
    slaMinutesRemaining: 90,
    documents: [
      { name: 'FSSAI_Certificate_Scan.jpg', type: 'IMAGE', status: 'BLURRY' },
      { name: 'PAN_Card.pdf', type: 'PDF', status: 'VALID' }
    ],
    auditNotes: 'AI Vision model detected OCR confidence 41% on License No field. WhatsApp re-upload prompt sent.'
  },
  {
    id: 'REQ-VND-8803',
    stakeholderType: 'VENDOR',
    category: 'PAYMENT_ISSUE',
    title: 'Bi-Weekly Settlement Payout Webhook Failure',
    description: 'Vendor bi-weekly store collection disbursement of ₹48,500 timed out on Razorpay settlement route due to beneficiary IFSC update.',
    entityName: 'Metro Hardware & Electricals',
    contactPerson: 'Deepak Varma',
    phone: '+91 98840 55104',
    email: 'accounts@metrohardware.com',
    location: 'Chennai, Tamil Nadu',
    status: 'PAYMENT_PENDING',
    priority: 'CRITICAL',
    submittedAt: 'Today, 08:40 AM',
    slaMinutesRemaining: 25,
    amount: '₹48,500 (Vendor Payout)',
    utrNumber: 'RAZ-FAIL-99410',
    documents: [
      { name: 'Bank_Passbook_Updated.pdf', type: 'PDF', status: 'VALID' },
      { name: 'Settlement_Statement.pdf', type: 'PDF', status: 'VALID' }
    ],
    auditNotes: 'New IFSC HDFC0001234 verified. Awaiting Support Admin manual authorization to trigger secondary payout gateway.'
  },

  // 2. AGENT REQUESTS
  {
    id: 'REQ-AGT-4401',
    stakeholderType: 'AGENT',
    category: 'NEW_ONBOARDING',
    title: 'New District Field Tie-Up Agent Registration',
    description: 'Agent application received for Salem district coverage. Security deposit of ₹1,500 verified via Razorpay dynamic link.',
    entityName: 'Salem Pincode Connect Services',
    contactPerson: 'M. Kavitha',
    phone: '+91 97890 23411',
    email: 'kavitha.agent@gmail.com',
    location: 'Salem, Tamil Nadu',
    status: 'PENDING_REVIEW',
    priority: 'NORMAL',
    submittedAt: 'Today, 11:00 AM',
    slaMinutesRemaining: 75,
    amount: '₹1,500 (District Onboarding Fee)',
    utrNumber: 'UPI-20260730-8819',
    documents: [
      { name: 'Aadhaar_Front_Back.jpg', type: 'IMAGE', status: 'VALID' },
      { name: 'PAN_Card_Copy.pdf', type: 'PDF', status: 'VALID' },
      { name: 'Cancelled_Cheque.jpg', type: 'IMAGE', status: 'VALID' }
    ],
    auditNotes: 'Payment verified. Background address check matched Aadhaar records. Ready for final activation.'
  },
  {
    id: 'REQ-AGT-4402',
    stakeholderType: 'AGENT',
    category: 'DOCUMENT_ISSUE',
    title: 'Aadhaar XML Re-Verification Due to Name Mismatch',
    description: 'Post-onboarding KYC periodic audit. Agent PAN name (Kavitha Murugesan) does not match bank passbook name (M. Kavitha).',
    entityName: 'Erode Tier-2 Agent Network',
    contactPerson: 'Kavitha Murugesan',
    phone: '+91 97890 99881',
    email: 'kavitha.m@agentservice.ai',
    location: 'Erode, Tamil Nadu',
    status: 'REUPLOAD_REQUESTED',
    priority: 'HIGH',
    submittedAt: 'Today, 10:45 AM',
    slaMinutesRemaining: 55,
    documents: [
      { name: 'Bank_Statement_Fresh.pdf', type: 'PDF', status: 'MISSING' },
      { name: 'Name_Affidavit.pdf', type: 'PDF', status: 'PENDING' }
    ],
    auditNotes: 'Automated notification dispatched requesting notarized one-and-the-same person affidavit or bank endorsement.'
  },
  {
    id: 'REQ-AGT-4403',
    stakeholderType: 'AGENT',
    category: 'PAYMENT_ISSUE',
    title: 'Field Referral Commission Batch ₹8,400 Re-Credit Request',
    description: 'Automated commission batch transfer failed for 6 merchant onboardings. Agent wallet credit pending manual release.',
    entityName: 'Tirupur Textile Hub Agency',
    contactPerson: 'Suresh Kumar',
    phone: '+91 94420 33441',
    email: 'suresh.textiles@gmail.com',
    location: 'Tirupur, Tamil Nadu',
    status: 'PAYMENT_PENDING',
    priority: 'HIGH',
    submittedAt: 'Today, 09:30 AM',
    slaMinutesRemaining: 35,
    amount: '₹8,400 (6x ₹1,400 Referral Commission)',
    utrNumber: 'BATCH-COMM-4412',
    documents: [
      { name: 'Commission_Summary_July.pdf', type: 'PDF', status: 'VALID' }
    ],
    auditNotes: 'All 6 merchants active and verified. Awaiting payout release authorization by Support Admin.'
  },

  // 3. MANAGER REQUESTS
  {
    id: 'REQ-MGR-2101',
    stakeholderType: 'MANAGER',
    category: 'NEW_ONBOARDING',
    title: 'Regional Operations Manager Profile & Credential Onboarding',
    description: 'New Territory Manager joining South Zone. Requires access permissions to Query, KYC & Payment supervision dashboards.',
    entityName: 'South Zone Regional Operations Desk',
    contactPerson: 'Ramesh Sundaram (Regional Manager)',
    phone: '+91 98401 22990',
    email: 'ramesh.sundaram@enterprise.ai',
    location: 'Madurai Regional HQ',
    status: 'PENDING_REVIEW',
    priority: 'CRITICAL',
    submittedAt: 'Today, 08:30 AM',
    slaMinutesRemaining: 20,
    documents: [
      { name: 'Appointment_Letter.pdf', type: 'PDF', status: 'VALID' },
      { name: 'NDA_Signed_Copy.pdf', type: 'PDF', status: 'VALID' }
    ],
    auditNotes: 'HR onboarding completed. Support Admin role privilege approval needed to grant operational dashboard access.'
  },
  {
    id: 'REQ-MGR-2102',
    stakeholderType: 'MANAGER',
    category: 'PAYMENT_ISSUE',
    title: 'District Customer Support Office Petty Cash Advance ₹15,000',
    description: 'Emergency hardware & broadband connectivity contingency fund request for Trichy customer helpdesk centre.',
    entityName: 'Trichy District Operations Hub',
    contactPerson: 'Anita George (Area Manager)',
    phone: '+91 94440 88712',
    email: 'anita.george@enterprise.ai',
    location: 'Trichy, Tamil Nadu',
    status: 'PENDING_REVIEW',
    priority: 'HIGH',
    submittedAt: 'Today, 09:50 AM',
    slaMinutesRemaining: 40,
    amount: '₹15,000 (Operational Advance)',
    documents: [
      { name: 'Broadband_Invoice_Estimate.pdf', type: 'PDF', status: 'VALID' },
      { name: 'Manager_Requisition_Form.pdf', type: 'PDF', status: 'VALID' }
    ],
    auditNotes: 'Trichy desk handles 450+ inquiries daily. Broadband upgrade required to prevent latency spikes.'
  },

  // 4. SUBADMIN REQUESTS
  {
    id: 'REQ-SUB-1001',
    stakeholderType: 'SUBADMIN',
    category: 'NEW_ONBOARDING',
    title: 'Western Regional Subadmin Account Creation',
    description: 'Onboarding of Zonal Subadmin for Coimbatore & Nilgiris territory with restricted audit and dispute override rights.',
    entityName: 'Western Zone Administration Desk',
    contactPerson: 'Venkatesh Rao (Zonal Subadmin)',
    phone: '+91 99940 11223',
    email: 'venkatesh.subadmin@enterprise.ai',
    location: 'Coimbatore, Tamil Nadu',
    status: 'PENDING_REVIEW',
    priority: 'CRITICAL',
    submittedAt: 'Today, 09:00 AM',
    slaMinutesRemaining: 30,
    documents: [
      { name: 'Security_Clearance_Check.pdf', type: 'PDF', status: 'VALID' },
      { name: 'IP_Whitelist_Request.txt', type: 'TEXT', status: 'VALID' }
    ],
    auditNotes: 'Dedicated static IP 182.72.10.45 mapped. Requires Support Admin token issuance.'
  },
  {
    id: 'REQ-SUB-1002',
    stakeholderType: 'SUBADMIN',
    category: 'QUERY',
    title: 'API Rate Limit & AI Tool Quota Increase Request',
    description: 'Subadmin requesting temporary surge quota increase for AI voice transcription queries during festival promotional campaign.',
    entityName: 'Central Chennai Subadmin Office',
    contactPerson: 'S. K. Balaji (Subadmin)',
    phone: '+91 98410 77889',
    email: 'balaji.subadmin@enterprise.ai',
    location: 'Chennai Central',
    status: 'APPROVED',
    priority: 'NORMAL',
    submittedAt: 'Yesterday, 04:30 PM',
    slaMinutesRemaining: 0,
    documents: [
      { name: 'Campaign_Traffic_Estimate.pdf', type: 'PDF', status: 'VALID' }
    ],
    auditNotes: 'Quota raised from 500 to 1,200 req/min for 72 hours by Support Admin.'
  },

  // 5. DELIVERY PARTNER REQUESTS
  {
    id: 'REQ-DEL-9101',
    stakeholderType: 'DELIVERY_PARTNER',
    category: 'NEW_ONBOARDING',
    title: 'New Two-Wheeler Delivery Partner Registration',
    description: 'New rider registration for last-mile customer document pick-up and KYC biometrics verification kit delivery.',
    entityName: 'Express Last-Mile Fleet',
    contactPerson: 'P. Murugan (Rider)',
    phone: '+91 96290 44551',
    email: 'murugan.express99@gmail.com',
    location: 'Tambaram, Chennai',
    status: 'PENDING_REVIEW',
    priority: 'HIGH',
    submittedAt: 'Today, 11:15 AM',
    slaMinutesRemaining: 50,
    amount: '₹500 (Delivery Partner Kit Security Deposit)',
    utrNumber: 'UPI-20260730-9942',
    documents: [
      { name: 'Driving_License_Front_Back.jpg', type: 'IMAGE', status: 'VALID' },
      { name: 'Two_Wheeler_RC_Copy.pdf', type: 'PDF', status: 'VALID' },
      { name: 'Vehicle_Insurance_2026.pdf', type: 'PDF', status: 'VALID' }
    ],
    auditNotes: 'Vehicle insurance and driving license verified against Sarathi portal. Security deposit received.'
  },
  {
    id: 'REQ-DEL-9102',
    stakeholderType: 'DELIVERY_PARTNER',
    category: 'DOCUMENT_ISSUE',
    title: 'Expired Driving License Periodic Renewal Notice',
    description: 'Post-onboarding safety audit. Rider commercial badge driving license expired on July 15, 2026. Renewal slip submitted.',
    entityName: 'North Chennai Delivery Hub',
    contactPerson: 'Karthik Raja',
    phone: '+91 97910 88992',
    email: 'karthik.rider@gmail.com',
    location: 'Ambattur, Chennai',
    status: 'REUPLOAD_REQUESTED',
    priority: 'HIGH',
    submittedAt: 'Today, 10:10 AM',
    slaMinutesRemaining: 65,
    documents: [
      { name: 'RTO_Renewal_Receipt.jpg', type: 'IMAGE', status: 'BLURRY' }
    ],
    auditNotes: 'RTO fee receipt image cropped. Need full clear copy showing application acknowledgement number.'
  },
  {
    id: 'REQ-DEL-9103',
    stakeholderType: 'DELIVERY_PARTNER',
    category: 'PAYMENT_ISSUE',
    title: 'Weekly Delivery Fuel Allowance & Trip Payout ₹3,450 Pending',
    description: 'Delivery partner executed 46 document pick-ups last week. Bank account payout returned with message "Account Dormant".',
    entityName: 'South Chennai Fleet #04',
    contactPerson: 'S. Vijay Anand',
    phone: '+91 98409 66552',
    email: 'vijay.delivery@gmail.com',
    location: 'Velachery, Chennai',
    status: 'PAYMENT_PENDING',
    priority: 'CRITICAL',
    submittedAt: 'Today, 08:55 AM',
    slaMinutesRemaining: 20,
    amount: '₹3,450 (46 Completed Trips + Fuel)',
    utrNumber: 'PAY-FAIL-88219',
    documents: [
      { name: 'New_Bank_Passbook_SBI.pdf', type: 'PDF', status: 'VALID' },
      { name: 'Weekly_Trip_Log.csv', type: 'TEXT', status: 'VALID' }
    ],
    auditNotes: 'Partner submitted new active SBI account. Ready for re-initiation by Support Admin.'
  },

  // 6. TECHNICIAN REQUESTS
  {
    id: 'REQ-TECH-3201',
    stakeholderType: 'TECHNICIAN',
    category: 'NEW_ONBOARDING',
    title: 'Hardware & Biometrics Field Technician Onboarding',
    description: 'Certified technician registration for installing POS terminals, biometric fingerprint scanners & CCTV for vendors.',
    entityName: 'Precision Tech Services',
    contactPerson: 'R. Senthil Kumar',
    phone: '+91 98430 77112',
    email: 'senthil.tech@precisiontech.in',
    location: 'Tirunelveli, Tamil Nadu',
    status: 'PENDING_REVIEW',
    priority: 'HIGH',
    submittedAt: 'Today, 10:30 AM',
    slaMinutesRemaining: 60,
    amount: '₹1,000 (Technician Toolkit Escrow Deposit)',
    utrNumber: 'RAZ-TECH-7719',
    documents: [
      { name: 'ITI_Diploma_Certificate.pdf', type: 'PDF', status: 'VALID' },
      { name: 'Aadhaar_Card.jpg', type: 'IMAGE', status: 'VALID' },
      { name: 'Police_Clearance_Certificate.pdf', type: 'PDF', status: 'VALID' }
    ],
    auditNotes: 'Police clearance verified. Toolkit dispatch awaiting Support Admin final approval.'
  },
  {
    id: 'REQ-TECH-3202',
    stakeholderType: 'TECHNICIAN',
    category: 'PAYMENT_ISSUE',
    title: 'POS Terminal Replacement & Cable Spare Reimbursement ₹2,800',
    description: 'Technician replaced burnt power adapter and RS-232 cable for merchant #MKT-8841. Claim with tax invoice submitted.',
    entityName: 'Madurai Hardware Response Unit',
    contactPerson: 'K. Balakrishnan',
    phone: '+91 94431 88990',
    email: 'bala.hardware@gmail.com',
    location: 'Madurai, Tamil Nadu',
    status: 'PAYMENT_PENDING',
    priority: 'NORMAL',
    submittedAt: 'Today, 09:40 AM',
    slaMinutesRemaining: 80,
    amount: '₹2,800 (Spare Parts Invoice)',
    documents: [
      { name: 'Spare_Parts_Tax_Invoice.pdf', type: 'PDF', status: 'VALID' },
      { name: 'Merchant_Signoff_Challan.jpg', type: 'IMAGE', status: 'VALID' }
    ],
    auditNotes: 'Merchant signoff sheet confirmed job completion. Payment TL approved; awaiting Support Admin fund release.'
  },

  // 7. KYC DOCUMENT DESK (CROSS-CUTTING)
  {
    id: 'REQ-KYC-7701',
    stakeholderType: 'KYC',
    category: 'DOCUMENT_ISSUE',
    title: 'Severe OCR Glare on Passport Address Page (High Risk Vendor)',
    description: 'KYC AI Agent flagged 43% blur on address section of Passport during Vendor Gold Tier onboarding. Manual inspector review needed.',
    entityName: 'Global Exim Merchants',
    contactPerson: 'Farhan Akhtar',
    phone: '+91 98841 00293',
    email: 'farhan@globalexim.com',
    location: 'Chennai Port Area',
    status: 'PENDING_REVIEW',
    priority: 'CRITICAL',
    submittedAt: 'Today, 11:25 AM',
    slaMinutesRemaining: 15,
    documents: [
      { name: 'Passport_Address_Page.jpg', type: 'IMAGE', status: 'BLURRY' },
      { name: 'Utility_Bill_Electricity.pdf', type: 'PDF', status: 'VALID' }
    ],
    auditNotes: 'Secondary electricity bill address matches registered trade premise. Can approve with secondary proof.'
  },

  // 8. PAYMENT & PAYOUT DESK (CROSS-CUTTING)
  {
    id: 'REQ-PAY-5501',
    stakeholderType: 'PAYMENT',
    category: 'PAYMENT_ISSUE',
    title: 'Duplicate Onboarding Fee ₹1,500 Charged to Agent — Immediate Refund',
    description: 'Agent bank account debited twice during UPI payment network timeout on July 29. Bank UTR reference parity confirmed.',
    entityName: 'Vellore District Agent Desk',
    contactPerson: 'G. Saravanan',
    phone: '+91 94441 55667',
    email: 'saravanan.agent@gmail.com',
    location: 'Vellore, Tamil Nadu',
    status: 'PAYMENT_PENDING',
    priority: 'CRITICAL',
    submittedAt: 'Today, 08:20 AM',
    slaMinutesRemaining: 10,
    amount: '₹1,500 (Duplicate UPI Refund)',
    utrNumber: 'UPI-REF-20260729-11',
    documents: [
      { name: 'Bank_Debit_SMS_Proof.jpg', type: 'IMAGE', status: 'VALID' },
      { name: 'Razorpay_Double_Charge_Log.json', type: 'TEXT', status: 'VALID' }
    ],
    auditNotes: 'Razorpay confirms double authorization. Requires Support Admin one-click refund trigger to initiate instant reversal.'
  },

  // 9. QUERIES & SERVICE DESK (CROSS-CUTTING)
  {
    id: 'REQ-QRY-1101',
    stakeholderType: 'QUERIES',
    category: 'QUERY',
    title: 'Pincode Jurisdiction Dispute Between Agent & Vendor',
    description: 'Vendor located on boundary between Pincode 600042 and 600091 assigned to wrong agent. Requires territory override.',
    entityName: 'Metro South Retail Syndicate',
    contactPerson: 'Rajeshwari M.',
    phone: '+91 98402 33119',
    email: 'rajeshwari.retail@gmail.com',
    location: 'Velachery / Madipakkam Border, Chennai',
    status: 'PENDING_REVIEW',
    priority: 'HIGH',
    submittedAt: 'Today, 09:10 AM',
    slaMinutesRemaining: 40,
    documents: [
      { name: 'Territory_Map_GIS.pdf', type: 'PDF', status: 'VALID' }
    ],
    auditNotes: 'Query TL Alex Vance reviewed. Recommended Support Admin re-assign commission routing to Pincode 600042.'
  }
];

interface Props {
  initialStakeholder?: StakeholderType;
  onNavigateTab?: (subTab: string) => void;
}

export const StakeholderRequestsHub: React.FC<Props> = ({ initialStakeholder = 'ALL', onNavigateTab }) => {
  const [requests, setRequests] = useState<StakeholderRequest[]>(INITIAL_REQUESTS);
  const [selectedStakeholder, setSelectedStakeholder] = useState<StakeholderType>(initialStakeholder);
  const [selectedCategory, setSelectedCategory] = useState<RequestCategory>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<RequestStatus>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<StakeholderRequest | null>(null);
  
  // Modals
  const [actionModal, setActionModal] = useState<{
    type: 'APPROVE' | 'REUPLOAD' | 'PAYMENT' | 'REJECT' | 'ESCALATE' | null;
    request: StakeholderRequest | null;
  }>({ type: null, request: null });

  const [reuploadDocName, setReuploadDocName] = useState('Clear Identity / Registration Certificate');
  const [reuploadInstructions, setReuploadInstructions] = useState('Please take a clear photo without glare or shadows.');
  const [actionNote, setActionNote] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isNewRequestModalOpen, setIsNewRequestModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch live requests from backend API with fallback
  const fetchRequests = async () => {
    try {
      setIsLoading(true);
      const res = await ApiService.getStakeholderRequests();
      if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
        setRequests(res.data);
      }
    } catch (err) {
      console.warn('Backend fetch failed, using fallback data', err);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchRequests();
  }, []);

  // Sync if initialStakeholder prop changes from Sidebar
  React.useEffect(() => {
    if (initialStakeholder) {
      setSelectedStakeholder(initialStakeholder);
    }
  }, [initialStakeholder]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  // Filtered requests calculation
  const filteredRequests = useMemo(() => {
    return requests.filter(req => {
      // Stakeholder filter
      if (selectedStakeholder !== 'ALL' && req.stakeholderType !== selectedStakeholder) {
        return false;
      }
      // Category filter (New Onboarding vs Document Issue vs Payment Issue vs Query)
      if (selectedCategory !== 'ALL' && req.category !== selectedCategory) {
        return false;
      }
      // Status filter
      if (selectedStatus !== 'ALL' && req.status !== selectedStatus) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesId = req.id.toLowerCase().includes(q);
        const matchesTitle = req.title.toLowerCase().includes(q);
        const matchesEntity = req.entityName.toLowerCase().includes(q);
        const matchesContact = req.contactPerson.toLowerCase().includes(q);
        const matchesPhone = req.phone.includes(q);
        const matchesUtr = req.utrNumber?.toLowerCase().includes(q) || false;
        if (!matchesId && !matchesTitle && !matchesEntity && !matchesContact && !matchesPhone && !matchesUtr) {
          return false;
        }
      }
      return true;
    });
  }, [requests, selectedStakeholder, selectedCategory, selectedStatus, searchQuery]);

  // KPI Counters
  const kpis = useMemo(() => {
    const total = requests.length;
    const newOnboarding = requests.filter(r => r.category === 'NEW_ONBOARDING').length;
    const docIssues = requests.filter(r => r.category === 'DOCUMENT_ISSUE').length;
    const paymentIssues = requests.filter(r => r.category === 'PAYMENT_ISSUE').length;
    const queries = requests.filter(r => r.category === 'QUERY').length;
    const pendingCritical = requests.filter(r => r.priority === 'CRITICAL' && (r.status === 'PENDING_REVIEW' || r.status === 'PAYMENT_PENDING')).length;
    return { total, newOnboarding, docIssues, paymentIssues, queries, pendingCritical };
  }, [requests]);

  // Action Handlers with backend API synchronization
  const handleApprove = async (req: StakeholderRequest) => {
    setRequests(prev => prev.map(r => r.id === req.id ? { ...r, status: 'APPROVED', auditNotes: `${r.auditNotes} • [${new Date().toLocaleTimeString()}] Approved and authorized by Support Admin.` } : r));
    setActionModal({ type: null, request: null });
    showToast(`Request ${req.id} (${req.entityName}) Approved & Activated!`);
    try {
      await ApiService.takeStakeholderRequestAction(req.id, { action: 'APPROVE' });
    } catch (_) {}
  };

  const handleRequestReupload = async (req: StakeholderRequest) => {
    setRequests(prev => prev.map(r => r.id === req.id ? { 
      ...r, 
      status: 'REUPLOAD_REQUESTED', 
      auditNotes: `${r.auditNotes} • [${new Date().toLocaleTimeString()}] Support Admin requested re-upload: ${reuploadDocName} (${reuploadInstructions}). WhatsApp & SMS alert triggered.` 
    } : r));
    setActionModal({ type: null, request: null });
    showToast(`Re-Upload Request dispatched to ${req.contactPerson} (${req.phone}) via WhatsApp!`);
    try {
      await ApiService.takeStakeholderRequestAction(req.id, { action: 'REQUEST_REUPLOAD', reuploadDocName, instructions: reuploadInstructions });
    } catch (_) {}
  };

  const handleResolvePayment = async (req: StakeholderRequest) => {
    setRequests(prev => prev.map(r => r.id === req.id ? { 
      ...r, 
      status: 'APPROVED', 
      auditNotes: `${r.auditNotes} • [${new Date().toLocaleTimeString()}] Payment reconciled and released by Support Admin. UTR Ref: ${req.utrNumber || 'MANUAL-REL-2026'}.` 
    } : r));
    setActionModal({ type: null, request: null });
    showToast(`Payment of ${req.amount || 'disputed amount'} successfully released & reconciled!`);
    try {
      await ApiService.takeStakeholderRequestAction(req.id, { action: 'RESOLVE_PAYMENT', utrNumber: req.utrNumber });
    } catch (_) {}
  };

  const handleReject = async (req: StakeholderRequest) => {
    setRequests(prev => prev.map(r => r.id === req.id ? { 
      ...r, 
      status: 'REJECTED', 
      auditNotes: `${r.auditNotes} • [${new Date().toLocaleTimeString()}] Rejected by Support Admin. Reason: ${actionNote || 'Document criteria not met.'}` 
    } : r));
    setActionModal({ type: null, request: null });
    showToast(`Request ${req.id} marked as Rejected.`);
    try {
      await ApiService.takeStakeholderRequestAction(req.id, { action: 'REJECT', note: actionNote });
    } catch (_) {}
  };

  const handleEscalate = async (req: StakeholderRequest, tlName: string) => {
    setRequests(prev => prev.map(r => r.id === req.id ? { 
      ...r, 
      status: 'ESCALATED', 
      assignedTL: tlName,
      auditNotes: `${r.auditNotes} • [${new Date().toLocaleTimeString()}] Escalated by Support Admin to ${tlName}.` 
    } : r));
    setActionModal({ type: null, request: null });
    showToast(`Request ${req.id} escalated to ${tlName}!`);
    try {
      await ApiService.takeStakeholderRequestAction(req.id, { action: 'ESCALATE', tlName });
    } catch (_) {}
  };

  // Helper for stakeholder icon & badge
  const getStakeholderMeta = (type: StakeholderType) => {
    switch (type) {
      case 'VENDOR':
        return { label: 'Vendor', icon: Building2, color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.12)', border: 'rgba(56, 189, 248, 0.3)' };
      case 'AGENT':
        return { label: 'Agent', icon: Briefcase, color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.12)', border: 'rgba(251, 191, 36, 0.3)' };
      case 'MANAGER':
        return { label: 'Manager', icon: UsersRound, color: '#a855f7', bg: 'rgba(168, 85, 247, 0.12)', border: 'rgba(168, 85, 247, 0.3)' };
      case 'SUBADMIN':
        return { label: 'Subadmin', icon: Shield, color: '#f43f5e', bg: 'rgba(244, 63, 94, 0.12)', border: 'rgba(244, 63, 94, 0.3)' };
      case 'DELIVERY_PARTNER':
        return { label: 'Delivery Partner', icon: Truck, color: '#10b981', bg: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.3)' };
      case 'TECHNICIAN':
        return { label: 'Technician', icon: Wrench, color: '#f97316', bg: 'rgba(249, 115, 22, 0.12)', border: 'rgba(249, 115, 22, 0.3)' };
      case 'KYC':
        return { label: 'KYC Document Desk', icon: FileCheck, color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.12)', border: 'rgba(6, 182, 212, 0.3)' };
      case 'PAYMENT':
        return { label: 'Payment & Payouts', icon: CreditCard, color: '#34d399', bg: 'rgba(52, 211, 153, 0.12)', border: 'rgba(52, 211, 153, 0.3)' };
      case 'QUERIES':
        return { label: 'Queries & Support', icon: HelpCircle, color: '#818cf8', bg: 'rgba(129, 140, 248, 0.12)', border: 'rgba(129, 140, 248, 0.3)' };
      default:
        return { label: 'All Stakeholders', icon: Layers, color: '#94a3b8', bg: 'rgba(148, 163, 184, 0.12)', border: 'rgba(148, 163, 184, 0.3)' };
    }
  };

  const getCategoryMeta = (cat: RequestCategory) => {
    switch (cat) {
      case 'NEW_ONBOARDING':
        return { label: 'New Onboarding', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.4)', icon: UserCheck };
      case 'DOCUMENT_ISSUE':
        return { label: 'Document Issue (Post-Onboarding)', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.4)', icon: FileText };
      case 'PAYMENT_ISSUE':
        return { label: 'Payment Issue (Post-Onboarding)', color: '#f43f5e', bg: 'rgba(244, 63, 94, 0.15)', border: 'rgba(244, 63, 94, 0.4)', icon: DollarSign };
      case 'QUERY':
        return { label: 'Operational Query', color: '#6366f1', bg: 'rgba(99, 102, 241, 0.15)', border: 'rgba(99, 102, 241, 0.4)', icon: HelpCircle };
      default:
        return { label: 'All Categories', color: '#94a3b8', bg: 'rgba(148, 163, 184, 0.15)', border: 'rgba(148, 163, 184, 0.4)', icon: Layers };
    }
  };

  const getStatusBadge = (status: StakeholderRequest['status']) => {
    switch (status) {
      case 'PENDING_REVIEW':
        return <span className="badge" style={{ background: 'rgba(251, 191, 36, 0.18)', color: '#fbbf24', border: '1px solid rgba(251, 191, 36, 0.4)' }}>Pending Review</span>;
      case 'REUPLOAD_REQUESTED':
        return <span className="badge" style={{ background: 'rgba(249, 115, 22, 0.18)', color: '#fb923c', border: '1px solid rgba(249, 115, 22, 0.4)' }}>Re-Upload Requested</span>;
      case 'PAYMENT_PENDING':
        return <span className="badge" style={{ background: 'rgba(244, 63, 94, 0.18)', color: '#f87171', border: '1px solid rgba(244, 63, 94, 0.4)' }}>Payout / Fee Pending</span>;
      case 'APPROVED':
        return <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.18)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.4)' }}>Approved & Resolved</span>;
      case 'REJECTED':
        return <span className="badge" style={{ background: 'rgba(239, 68, 68, 0.18)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.4)' }}>Rejected</span>;
      case 'ESCALATED':
        return <span className="badge" style={{ background: 'rgba(168, 85, 247, 0.18)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.4)' }}>Escalated to TL</span>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Toast notification */}
      {toastMsg && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '25px',
          zIndex: 99999,
          background: 'linear-gradient(135deg, #0f172a, #1e293b)',
          color: '#fff',
          border: '1.5px solid #10b981',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          borderRadius: '10px',
          padding: '0.85rem 1.4rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontWeight: 600,
          fontSize: '0.9rem'
        }}>
          <CheckCircle2 size={18} color="#10b981" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Main Command Header Banner */}
      <div className="glass-panel" style={{
        padding: '1.5rem',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.75))',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)'
          }}>
            <Layers size={28} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.2rem' }}>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: 0, color: '#fff', letterSpacing: '-0.01em' }}>
                Stakeholder Requests & Lifecycle Command Desk
              </h2>
              <span className="badge badge-success" style={{ padding: '0.2rem 0.6rem', fontSize: '0.72rem' }}>
                <Clock size={11} /> Live SLA Sync
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Unified triage for Vendor, Agent, Manager, Subadmin, Delivery Partner & Technician requests across <strong>New Onboarding</strong>, <strong>Post-Onboarding Document Issues</strong>, and <strong>Payment Issues</strong>.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            className="btn btn-secondary"
            onClick={() => setRequests([...INITIAL_REQUESTS])}
            style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', padding: '0.55rem 1rem', fontSize: '0.85rem' }}
          >
            <RefreshCw size={14} /> Reset Data
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => setIsNewRequestModalOpen(true)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.45rem', 
              padding: '0.55rem 1.15rem', 
              fontSize: '0.85rem',
              background: 'linear-gradient(135deg, #0284c7, #2563eb)',
              boxShadow: '0 4px 15px rgba(37, 99, 235, 0.35)'
            }}
          >
            <Plus size={16} /> Log New Stakeholder Request
          </button>
        </div>
      </div>

      {/* 4 Summary Lifecycle KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        
        {/* Total Active Requests */}
        <div 
          onClick={() => { setSelectedCategory('ALL'); setSelectedStakeholder('ALL'); }}
          className="kpi-card-modern" 
          style={{ 
            cursor: 'pointer',
            padding: '1.25rem',
            border: selectedCategory === 'ALL' && selectedStakeholder === 'ALL' ? '2px solid var(--accent-primary)' : '1px solid rgba(255,255,255,0.08)',
            '--kpi-accent-gradient': 'linear-gradient(90deg, #6366f1, #818cf8)' 
          } as React.CSSProperties}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-kpi-title, #0f172a)' }}>Total Active Requests</span>
            <Layers size={18} className="text-brand" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            {kpis.total}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.45rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Across 9 Stakeholders</span>
            <span className="badge badge-warning" style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>
              {kpis.pendingCritical} Urgent SLAs
            </span>
          </div>
        </div>

        {/* 1. New Onboarding Requests */}
        <div 
          onClick={() => setSelectedCategory('NEW_ONBOARDING')}
          className="kpi-card-modern" 
          style={{ 
            cursor: 'pointer',
            padding: '1.25rem',
            border: selectedCategory === 'NEW_ONBOARDING' ? '2px solid #10b981' : '1px solid rgba(255,255,255,0.08)',
            '--kpi-accent-gradient': 'linear-gradient(90deg, #10b981, #34d399)' 
          } as React.CSSProperties}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-kpi-title, #0f172a)' }}>New Onboarding</span>
            <UserCheck size={18} color="#10b981" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#10b981', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            {kpis.newOnboarding}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.45rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Registrations & Tie-ups</span>
            <span className="badge badge-success" style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>
              Deposit Verified
            </span>
          </div>
        </div>

        {/* 2. Document Issues (Post-Onboarding) */}
        <div 
          onClick={() => setSelectedCategory('DOCUMENT_ISSUE')}
          className="kpi-card-modern" 
          style={{ 
            cursor: 'pointer',
            padding: '1.25rem',
            border: selectedCategory === 'DOCUMENT_ISSUE' ? '2px solid #f59e0b' : '1px solid rgba(255,255,255,0.08)',
            '--kpi-accent-gradient': 'linear-gradient(90deg, #f59e0b, #fde047)' 
          } as React.CSSProperties}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-kpi-title, #0f172a)' }}>Document Issues</span>
            <FileText size={18} color="#f59e0b" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f59e0b', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            {kpis.docIssues}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.45rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>OCR Blur & Mismatch</span>
            <span className="badge badge-warning" style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>
              Re-Upload Needed
            </span>
          </div>
        </div>

        {/* 3. Payment Issues (Post-Onboarding) */}
        <div 
          onClick={() => setSelectedCategory('PAYMENT_ISSUE')}
          className="kpi-card-modern" 
          style={{ 
            cursor: 'pointer',
            padding: '1.25rem',
            border: selectedCategory === 'PAYMENT_ISSUE' ? '2px solid #f43f5e' : '1px solid rgba(255,255,255,0.08)',
            '--kpi-accent-gradient': 'linear-gradient(90deg, #f43f5e, #fda4af)' 
          } as React.CSSProperties}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-kpi-title, #0f172a)' }}>Payment Issues</span>
            <DollarSign size={18} color="#f43f5e" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f43f5e', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            {kpis.paymentIssues}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.45rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Payouts, UTR & Refunds</span>
            <span className="badge badge-danger" style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>
              Manual Release
            </span>
          </div>
        </div>
      </div>

      {/* Stakeholder Category Switcher Pills */}
      <div className="glass-panel" style={{ padding: '0.85rem 1rem', borderRadius: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
            Select Stakeholder Category
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Showing: <strong style={{ color: 'var(--text-main)' }}>{filteredRequests.length} requests</strong>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
          {(['ALL', 'VENDOR', 'AGENT', 'MANAGER', 'SUBADMIN', 'DELIVERY_PARTNER', 'TECHNICIAN', 'KYC', 'PAYMENT', 'QUERIES'] as StakeholderType[]).map(type => {
            const meta = getStakeholderMeta(type);
            const Icon = meta.icon;
            const isSelected = selectedStakeholder === type;
            const count = type === 'ALL' ? requests.length : requests.filter(r => r.stakeholderType === type).length;

            return (
              <button
                key={type}
                onClick={() => setSelectedStakeholder(type)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 0.85rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: isSelected ? 700 : 500,
                  background: isSelected ? meta.bg : 'var(--bg-card)',
                  color: isSelected ? meta.color : 'var(--text-main)',
                  border: isSelected ? `1.5px solid ${meta.border}` : '1px solid rgba(255,255,255,0.06)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={14} color={isSelected ? meta.color : 'var(--text-muted)'} />
                <span>{meta.label}</span>
                <span style={{
                  background: isSelected ? meta.color : 'rgba(255,255,255,0.08)',
                  color: isSelected ? '#000' : 'var(--text-muted)',
                  borderRadius: '10px',
                  padding: '0.1rem 0.45rem',
                  fontSize: '0.7rem',
                  fontWeight: 800
                }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lifecycle Stage Sub-Tabs & Filter Controls Bar */}
      <div className="glass-panel" style={{ padding: '1rem', borderRadius: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.85rem' }}>
          
          {/* Lifecycle Filter Buttons */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {(['ALL', 'NEW_ONBOARDING', 'DOCUMENT_ISSUE', 'PAYMENT_ISSUE', 'QUERY'] as RequestCategory[]).map(cat => {
              const meta = getCategoryMeta(cat);
              const Icon = meta.icon;
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.45rem 0.85rem',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: isSelected ? 700 : 500,
                    background: isSelected ? meta.bg : 'transparent',
                    color: isSelected ? meta.color : 'var(--text-muted)',
                    border: isSelected ? `1.5px solid ${meta.border}` : '1px solid rgba(255,255,255,0.08)',
                    cursor: 'pointer'
                  }}
                >
                  <Icon size={14} />
                  <span>{meta.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search & Status Filters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ position: 'relative', width: '240px' }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                className="form-control"
                placeholder="Search ID, name, phone, UTR..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '2rem', height: '34px', fontSize: '0.8rem' }}
              />
              {searchQuery && (
                <X size={12} onClick={() => setSearchQuery('')} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'var(--text-muted)' }} />
              )}
            </div>

            <select
              className="form-control"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as RequestStatus)}
              style={{ width: '170px', height: '34px', fontSize: '0.8rem', padding: '0 0.5rem' }}
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING_REVIEW">Pending Review</option>
              <option value="REUPLOAD_REQUESTED">Re-Upload Requested</option>
              <option value="PAYMENT_PENDING">Payment Pending</option>
              <option value="APPROVED">Approved / Resolved</option>
              <option value="REJECTED">Rejected</option>
              <option value="ESCALATED">Escalated to TL</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Request Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {filteredRequests.length === 0 ? (
          <div className="glass-panel" style={{ padding: '3.5rem', textAlign: 'center', borderRadius: '12px' }}>
            <Layers size={40} style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }} />
            <h4 style={{ margin: '0 0 0.35rem 0', color: 'var(--text-main)' }}>No Stakeholder Requests Found</h4>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              No requests match the selected filters ({selectedStakeholder} • {selectedCategory} • {selectedStatus}).
            </p>
            <button 
              className="btn btn-secondary" 
              style={{ marginTop: '1rem', fontSize: '0.8rem' }}
              onClick={() => { setSelectedStakeholder('ALL'); setSelectedCategory('ALL'); setSelectedStatus('ALL'); setSearchQuery(''); }}
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          filteredRequests.map(req => {
            const shMeta = getStakeholderMeta(req.stakeholderType);
            const ShIcon = shMeta.icon;
            const catMeta = getCategoryMeta(req.category);
            const CatIcon = catMeta.icon;
            const isCritical = req.priority === 'CRITICAL';

            return (
              <div
                key={req.id}
                className="glass-panel"
                style={{
                  padding: '1.25rem',
                  borderRadius: '12px',
                  borderLeft: `4px solid ${isCritical ? '#f43f5e' : catMeta.color}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                }}
              >
                {/* Top Row: Meta Badges & SLA */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', flexWrap: 'wrap' }}>
                    {/* ID */}
                    <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '0.85rem', color: 'var(--text-main)' }}>
                      {req.id}
                    </span>

                    {/* Stakeholder Pill */}
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.15rem 0.55rem',
                      borderRadius: '12px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      background: shMeta.bg,
                      color: shMeta.color,
                      border: `1px solid ${shMeta.border}`
                    }}>
                      <ShIcon size={12} /> {shMeta.label}
                    </span>

                    {/* Category Pill */}
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.15rem 0.55rem',
                      borderRadius: '12px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      background: catMeta.bg,
                      color: catMeta.color,
                      border: `1px solid ${catMeta.border}`
                    }}>
                      <CatIcon size={12} /> {catMeta.label}
                    </span>

                    {/* Priority */}
                    {isCritical ? (
                      <span className="badge badge-danger" style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>
                        CRITICAL SLA
                      </span>
                    ) : req.priority === 'HIGH' ? (
                      <span className="badge badge-warning" style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>
                        HIGH
                      </span>
                    ) : null}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {/* SLA countdown */}
                    {req.status === 'PENDING_REVIEW' || req.status === 'PAYMENT_PENDING' ? (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '0.75rem',
                        color: isCritical ? '#f43f5e' : 'var(--text-amber)',
                        fontWeight: 700
                      }}>
                        <Clock size={12} /> {req.slaMinutesRemaining}m SLA remaining
                      </span>
                    ) : null}
                    
                    {getStatusBadge(req.status)}
                  </div>
                </div>

                {/* Main Body Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.25rem' }}>
                  
                  {/* Left: Title, Description, Entity */}
                  <div>
                    <h4 style={{ margin: '0 0 0.35rem 0', fontSize: '1.02rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      {req.title}
                    </h4>
                    <p style={{ margin: '0 0 0.65rem 0', fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: '1.45' }}>
                      {req.description}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '0.78rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                      <div>
                        <strong style={{ color: 'var(--text-main)' }}>Entity:</strong> {req.entityName}
                      </div>
                      <div>
                        <strong style={{ color: 'var(--text-main)' }}>Contact:</strong> {req.contactPerson} ({req.phone})
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <MapPin size={12} /> {req.location}
                      </div>
                    </div>
                  </div>

                  {/* Right: Payment amount, Document thumbnails & Audit note */}
                  <div style={{ background: 'rgba(0,0,0,0.18)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {req.amount && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.4rem' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Financial Amount:</span>
                        <strong style={{ fontSize: '0.9rem', color: '#34d399' }}>{req.amount}</strong>
                      </div>
                    )}

                    {/* Attached Documents */}
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontWeight: 600 }}>
                        Attached Files ({req.documents.length}):
                      </div>
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                        {req.documents.map((doc, idx) => {
                          const isBlur = doc.status === 'BLURRY';
                          const isMissing = doc.status === 'MISSING';
                          return (
                            <span 
                              key={idx}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.3rem',
                                padding: '0.2rem 0.5rem',
                                borderRadius: '6px',
                                fontSize: '0.7rem',
                                background: isBlur ? 'rgba(245, 158, 11, 0.2)' : isMissing ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.07)',
                                color: isBlur ? '#fbbf24' : isMissing ? '#f87171' : 'var(--text-main)',
                                border: isBlur ? '1px solid rgba(245, 158, 11, 0.4)' : isMissing ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(255,255,255,0.1)'
                              }}
                            >
                              <FileText size={10} />
                              <span style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.name}</span>
                              {isBlur && <span style={{ fontSize: '0.62rem', fontWeight: 800 }}>[BLUR]</span>}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Audit note */}
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 'auto', background: 'rgba(255,255,255,0.03)', padding: '0.4rem 0.6rem', borderRadius: '4px' }}>
                      <strong style={{ color: 'var(--text-amber)' }}>AI / System Audit:</strong> {req.auditNotes}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid rgba(255, 255, 255, 0.07)',
                  paddingTop: '0.75rem',
                  marginTop: '0.25rem',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Submitted: <strong>{req.submittedAt}</strong> {req.assignedTL && `• Assigned to ${req.assignedTL}`}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setSelectedRequest(req)}
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                    >
                      <Eye size={12} /> View Dossier
                    </button>

                    {/* Conditional Actions based on category & status */}
                    {req.category === 'DOCUMENT_ISSUE' && req.status !== 'APPROVED' && (
                      <button
                        className="btn btn-warning"
                        onClick={() => setActionModal({ type: 'REUPLOAD', request: req })}
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.4)' }}
                      >
                        <Send size={12} /> Request Re-Upload
                      </button>
                    )}

                    {req.category === 'PAYMENT_ISSUE' && req.status !== 'APPROVED' && (
                      <button
                        className="btn btn-success"
                        onClick={() => setActionModal({ type: 'PAYMENT', request: req })}
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.4)' }}
                      >
                        <DollarSign size={12} /> Reconcile & Release Payout
                      </button>
                    )}

                    {req.status !== 'APPROVED' && req.status !== 'REJECTED' && (
                      <>
                        <button
                          className="btn btn-success"
                          onClick={() => handleApprove(req)}
                          style={{ padding: '0.35rem 0.85rem', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                        >
                          <CheckCircle2 size={12} /> Approve & Activate
                        </button>

                        <button
                          className="btn btn-secondary"
                          onClick={() => setActionModal({ type: 'ESCALATE', request: req })}
                          style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem', color: '#c084fc' }}
                          title="Escalate to Department Team Lead"
                        >
                          Escalate to TL
                        </button>

                        <button
                          className="btn btn-danger"
                          onClick={() => setActionModal({ type: 'REJECT', request: req })}
                          style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem' }}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* MODAL 1: VIEW FULL DOSSIER MODAL */}
      {selectedRequest && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, padding: '1rem' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '780px', maxHeight: '90vh', overflowY: 'auto', borderRadius: '16px', padding: '1.75rem', background: 'var(--bg-dark)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontFamily: 'monospace', fontWeight: 800, color: 'var(--accent-primary)', fontSize: '1.1rem' }}>{selectedRequest.id}</span>
                  {getStatusBadge(selectedRequest.status)}
                </div>
                <h3 style={{ margin: '0.3rem 0 0 0', fontSize: '1.25rem', color: 'var(--text-main)' }}>{selectedRequest.title}</h3>
              </div>
              <button className="btn btn-secondary" onClick={() => setSelectedRequest(null)} style={{ padding: '0.4rem 0.6rem' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 700 }}>Stakeholder Profile</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>{selectedRequest.entityName}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Contact: {selectedRequest.contactPerson}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Phone: {selectedRequest.phone}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Email: {selectedRequest.email}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Location: {selectedRequest.location}</div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 700 }}>Request Parameters</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Type: <strong style={{ color: 'var(--text-main)' }}>{selectedRequest.stakeholderType}</strong></div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Category: <strong style={{ color: 'var(--text-main)' }}>{selectedRequest.category}</strong></div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Submitted: <strong style={{ color: 'var(--text-main)' }}>{selectedRequest.submittedAt}</strong></div>
                {selectedRequest.amount && (
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Financial Amount: <strong style={{ color: '#34d399' }}>{selectedRequest.amount}</strong></div>
                )}
                {selectedRequest.utrNumber && (
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>UTR Reference: <strong style={{ color: 'var(--accent-secondary)' }}>{selectedRequest.utrNumber}</strong></div>
                )}
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Attached Documents & Validation State</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {selectedRequest.documents.map((d, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.04)', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FileText size={16} color="var(--accent-primary)" />
                      <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{d.name}</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>({d.type})</span>
                    </div>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '0.15rem 0.5rem',
                      borderRadius: '6px',
                      background: d.status === 'VALID' ? 'rgba(16,185,129,0.18)' : d.status === 'BLURRY' ? 'rgba(245,158,11,0.18)' : 'rgba(239,68,68,0.18)',
                      color: d.status === 'VALID' ? '#34d399' : d.status === 'BLURRY' ? '#fbbf24' : '#f87171'
                    }}>
                      {d.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.85rem', borderRadius: '8px', marginBottom: '1.25rem', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-amber)', marginBottom: '0.25rem' }}>Full AI / Inspector Audit Trail:</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-main)', lineHeight: '1.5' }}>{selectedRequest.auditNotes}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.65rem' }}>
              <button className="btn btn-secondary" onClick={() => setSelectedRequest(null)}>Close</button>
              {selectedRequest.status !== 'APPROVED' && (
                <button className="btn btn-success" onClick={() => { handleApprove(selectedRequest); setSelectedRequest(null); }}>
                  Approve & Authorize
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: REQUEST DOCUMENT RE-UPLOAD */}
      {actionModal.type === 'REUPLOAD' && actionModal.request && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, padding: '1rem' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '520px', borderRadius: '16px', padding: '1.75rem', background: 'var(--bg-dark)' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Send size={18} color="#fbbf24" /> Request Document Re-Upload
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              This triggers an immediate automated WhatsApp & SMS notification to <strong>{actionModal.request.contactPerson}</strong> ({actionModal.request.phone}) with a secure 1-click camera upload link.
            </p>

            <div style={{ marginBottom: '1rem' }}>
              <label className="form-label">Document Name Needed</label>
              <select 
                className="form-control" 
                value={reuploadDocName} 
                onChange={(e) => setReuploadDocName(e.target.value)}
                style={{ height: '38px', fontSize: '0.85rem' }}
              >
                <option value="Clear FSSAI License Certificate">Clear FSSAI License Certificate</option>
                <option value="Clear Identity / Aadhaar Front & Back">Clear Identity / Aadhaar Front & Back</option>
                <option value="Updated Bank Passbook / Cheque">Updated Bank Passbook / Cheque</option>
                <option value="Clear Trade License PDF">Clear Trade License PDF</option>
                <option value="Driving License & RTO Renewal Receipt">Driving License & RTO Renewal Receipt</option>
                <option value="GSTIN Registration Certificate">GSTIN Registration Certificate</option>
                <option value="Technical Qualification / ITI Certificate">Technical Qualification / ITI Certificate</option>
              </select>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label className="form-label">Instructions for Stakeholder</label>
              <textarea
                className="form-control"
                rows={3}
                value={reuploadInstructions}
                onChange={(e) => setReuploadInstructions(e.target.value)}
                style={{ fontSize: '0.85rem' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.65rem' }}>
              <button className="btn btn-secondary" onClick={() => setActionModal({ type: null, request: null })}>Cancel</button>
              <button className="btn btn-warning" onClick={() => handleRequestReupload(actionModal.request!)}>
                Dispatch Re-Upload Alert
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: PAYMENT RESOLUTION MODAL */}
      {actionModal.type === 'PAYMENT' && actionModal.request && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, padding: '1rem' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '520px', borderRadius: '16px', padding: '1.75rem', background: 'var(--bg-dark)' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34d399' }}>
              <DollarSign size={20} /> Reconcile & Release Payout
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Authorize fund release or confirm UTR parity for <strong>{actionModal.request.entityName}</strong>.
            </p>

            <div style={{ background: 'rgba(52, 211, 153, 0.1)', border: '1px solid rgba(52, 211, 153, 0.3)', padding: '0.85rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Target Amount:</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#34d399' }}>{actionModal.request.amount || '₹0.00'}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Beneficiary: {actionModal.request.contactPerson} ({actionModal.request.phone})</div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label className="form-label">UTR / Gateway Reference Code</label>
              <input 
                type="text" 
                className="form-control" 
                defaultValue={actionModal.request.utrNumber || `UTR-REL-${Date.now().toString().slice(-6)}`}
                style={{ height: '38px', fontSize: '0.85rem', fontFamily: 'monospace' }} 
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.65rem' }}>
              <button className="btn btn-secondary" onClick={() => setActionModal({ type: null, request: null })}>Cancel</button>
              <button className="btn btn-success" onClick={() => handleResolvePayment(actionModal.request!)}>
                Confirm & Release Funds
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: ESCALATE TO TL */}
      {actionModal.type === 'ESCALATE' && actionModal.request && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, padding: '1rem' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '480px', borderRadius: '16px', padding: '1.75rem', background: 'var(--bg-dark)' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#c084fc' }}>Escalate to Department Team Lead</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Choose which domain Team Lead should take immediate supervisor ownership of this request:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
              {[
                { name: 'Sarah Connor', title: 'Queries Team Lead', desc: 'Customer escalations, boundary conflicts & dispute resolution' },
                { name: 'Marcus Thorne', title: 'KYC Team Lead', desc: 'High-risk verification, blur override & document appeals' },
                { name: 'David Ross', title: 'Payment Team Lead', desc: 'Gateway timeout, commission audits & treasury release' }
              ].map((tl, i) => (
                <div 
                  key={i} 
                  onClick={() => handleEscalate(actionModal.request!, `${tl.name} (${tl.title})`)}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#c084fc')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                >
                  <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.9rem' }}>{tl.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#c084fc', fontWeight: 600 }}>{tl.title}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{tl.desc}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setActionModal({ type: null, request: null })}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: REJECT REASON MODAL */}
      {actionModal.type === 'REJECT' && actionModal.request && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, padding: '1rem' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '480px', borderRadius: '16px', padding: '1.75rem', background: 'var(--bg-dark)' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#f87171' }}>Reject Stakeholder Request</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Please specify the rationale for rejecting request <strong>{actionModal.request.id}</strong>.
            </p>

            <div style={{ marginBottom: '1.25rem' }}>
              <label className="form-label">Rejection Reason</label>
              <textarea
                className="form-control"
                rows={3}
                placeholder="e.g. Fake trade license detected, invalid bank IFSC, territory already filled..."
                value={actionNote}
                onChange={(e) => setActionNote(e.target.value)}
                style={{ fontSize: '0.85rem' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.65rem' }}>
              <button className="btn btn-secondary" onClick={() => setActionModal({ type: null, request: null })}>Cancel</button>
              <button className="btn btn-danger" onClick={() => handleReject(actionModal.request!)}>
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 6: LOG NEW STAKEHOLDER REQUEST MODAL */}
      {isNewRequestModalOpen && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, padding: '1rem' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', borderRadius: '16px', padding: '1.75rem', background: 'var(--bg-dark)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.75rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Plus size={18} color="var(--accent-primary)" /> Log New Stakeholder Request
              </h3>
              <button className="btn btn-secondary" onClick={() => setIsNewRequestModalOpen(false)} style={{ padding: '0.3rem 0.5rem' }}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const newReq: StakeholderRequest = {
                id: `REQ-${Date.now().toString().slice(-4)}`,
                stakeholderType: (form.elements.namedItem('shType') as HTMLSelectElement).value as any,
                category: (form.elements.namedItem('catType') as HTMLSelectElement).value as any,
                title: (form.elements.namedItem('reqTitle') as HTMLInputElement).value,
                description: (form.elements.namedItem('reqDesc') as HTMLTextAreaElement).value,
                entityName: (form.elements.namedItem('entityName') as HTMLInputElement).value,
                contactPerson: (form.elements.namedItem('contactName') as HTMLInputElement).value,
                phone: (form.elements.namedItem('contactPhone') as HTMLInputElement).value,
                email: (form.elements.namedItem('contactEmail') as HTMLInputElement).value,
                location: (form.elements.namedItem('loc') as HTMLInputElement).value || 'Chennai, Tamil Nadu',
                status: 'PENDING_REVIEW',
                priority: (form.elements.namedItem('prio') as HTMLSelectElement).value as any,
                submittedAt: 'Just Now',
                slaMinutesRemaining: 60,
                amount: (form.elements.namedItem('amt') as HTMLInputElement).value || undefined,
                documents: [
                  { name: 'Initial_Application.pdf', type: 'PDF', status: 'PENDING' }
                ],
                auditNotes: 'Logged manually by Support Admin.'
              };
              setRequests(prev => [newReq, ...prev]);
              setIsNewRequestModalOpen(false);
              showToast(`New Request ${newReq.id} successfully queued!`);
              try {
                ApiService.createStakeholderRequest(newReq);
              } catch (_) {}
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label className="form-label">Stakeholder Type</label>
                  <select name="shType" className="form-control" defaultValue="VENDOR">
                    <option value="VENDOR">Vendor</option>
                    <option value="AGENT">Agent</option>
                    <option value="MANAGER">Manager</option>
                    <option value="SUBADMIN">Subadmin</option>
                    <option value="DELIVERY_PARTNER">Delivery Partner</option>
                    <option value="TECHNICIAN">Technician</option>
                    <option value="KYC">KYC</option>
                    <option value="PAYMENT">Payment</option>
                    <option value="QUERIES">Queries</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Request Category / Lifecycle</label>
                  <select name="catType" className="form-control" defaultValue="NEW_ONBOARDING">
                    <option value="NEW_ONBOARDING">New Onboarding</option>
                    <option value="DOCUMENT_ISSUE">Document Issue (Post-Onboarding)</option>
                    <option value="PAYMENT_ISSUE">Payment Issue (Post-Onboarding)</option>
                    <option value="QUERY">Operational Query</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label className="form-label">Request Title</label>
                <input name="reqTitle" type="text" className="form-control" required placeholder="e.g. New Vendor Store Tie-up / Blur PAN Re-upload" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label className="form-label">Entity Name</label>
                  <input name="entityName" type="text" className="form-control" required placeholder="e.g. Star Enterprises" />
                </div>
                <div>
                  <label className="form-label">Contact Person</label>
                  <input name="contactName" type="text" className="form-control" required placeholder="e.g. R. Karthik" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label className="form-label">Phone Number</label>
                  <input name="contactPhone" type="text" className="form-control" required placeholder="+91 98401 23456" />
                </div>
                <div>
                  <label className="form-label">Email</label>
                  <input name="contactEmail" type="email" className="form-control" required placeholder="contact@star.com" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label className="form-label">Location / City</label>
                  <input name="loc" type="text" className="form-control" placeholder="Chennai, TN" />
                </div>
                <div>
                  <label className="form-label">Priority</label>
                  <select name="prio" className="form-control" defaultValue="HIGH">
                    <option value="CRITICAL">Critical SLA</option>
                    <option value="HIGH">High</option>
                    <option value="NORMAL">Normal</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Amount (Optional)</label>
                  <input name="amt" type="text" className="form-control" placeholder="e.g. ₹5,000" />
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label className="form-label">Request Description & Context</label>
                <textarea name="reqDesc" className="form-control" rows={3} required placeholder="Detailed notes about the onboarding or issue..." />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.65rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsNewRequestModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Request</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
