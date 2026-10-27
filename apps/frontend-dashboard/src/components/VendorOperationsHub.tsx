import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
  Building2,
  UsersRound,
  Briefcase,
  UserCheck,
  FileCheck,
  CreditCard,
  HelpCircle,
  History,
  DollarSign,
  Search,
  CheckCircle2,
  Clock,
  Eye,
  Download,
  MapPin,
  Phone,
  ShieldCheck,
  X,
  FileText,
  Tag,
  Wrench,
  ShoppingBag,
  ShoppingCart,
  UtensilsCrossed,
  Hotel,
  Compass,
  Shield,
  User,
  Check,
  AlertTriangle,
  RefreshCw,
  Send,
  ExternalLink
} from 'lucide-react';

export type OnboardingSource = 'ALL' | 'DIRECT' | 'MANAGER' | 'AGENT';
export type VendorCategory = 'ALL' | 'SERVICE' | 'PRODUCTS' | 'DAILY_NEEDS' | 'FOOD' | 'STAY' | 'TRAVEL' | 'JOB';
export type SubAdminLevel = 'STATE' | 'DISTRICT' | 'DIVISION' | 'PINCODE';
export type VendorActiveTab = 'DIRECTORY' | 'OPERATIONS' | 'HISTORY' | 'PAYROLL';
export type OpsSubStream = 'KYC_QUEUE' | 'QUERIES' | 'PAYMENTS';

export interface VendorTerritory {
  state: string;
  district: string;
  division: string;
  pincode: string;
  address?: string;
}

export interface SubAdminApprovalInfo {
  isApproved: boolean;
  subAdminName: string;
  subAdminMobile: string;
  subAdminLevel: SubAdminLevel;
  subAdminTitle: string;
  approvedAt: string;
  notes?: string;
}

export interface VendorRegistrationDoc {
  name: string;
  type: string;
  status: 'VERIFIED' | 'UNDER_REVIEW' | 'REJECTED';
  fileSize: string;
  uploadDate: string;
}

export interface VendorRecord {
  id: string;
  storeName: string;
  category: VendorCategory;
  categoryLabel: string;
  ownerName: string;
  phone: string;
  email: string;
  onboardingSource: 'DIRECT' | 'MANAGER' | 'AGENT';
  officerName: string; // Direct | Manager - Name | Agent - Name
  onboardedBy: string;
  onboardingDate: string;
  territory: VendorTerritory;
  subAdminApproval: SubAdminApprovalInfo;
  kycStatus: 'VERIFIED' | 'REUPLOAD_NEEDED' | 'UNDER_REVIEW';
  status: 'ACTIVE' | 'PENDING_APPROVAL' | 'SUSPENDED';
  registrationDetails: {
    legalBusinessName: string;
    tradeName: string;
    panNumber: string;
    gstin: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    businessType: string;
    appliedDate: string;
  };
  documents: VendorRegistrationDoc[];
}

export interface VendorHistoryRecord {
  ticketId: string;
  vendorId: string;
  vendorName: string;
  issueTitle: string;
  assignedTeam: 'KYC Document Verification Desk' | 'Payment & Settlement Team' | 'Query Operations Team' | 'Procurement Team';
  attendedBy: string;
  status: 'RESOLVED' | 'PENDING' | 'ESCALATED_TO_SUPPORT_ADMIN';
  priority: 'CRITICAL' | 'HIGH' | 'NORMAL';
  createdAt: string;
  attendedAt: string;
  resolvedAt: string;
  resolutionTimeMinutes: number;
  resolutionNotes: string;
  auditBadge: string;
}

export interface VendorPayrollRecord {
  payrollId: string;
  vendorId: string;
  vendorName: string;
  ownerName: string;
  payPeriod: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  panNumber: string;
  gstin: string;
  grossCollections: number;
  platformCommissionPercent: number;
  platformCommissionAmount: number;
  tdsPercent: number;
  tdsAmount: number;
  adjustments: number;
  netPayable: number;
  payoutStatus: 'DISBURSED' | 'PENDING_RELEASE' | 'ON_HOLD' | 'IN_PROCESSING';
  utrNumber?: string;
  disbursedAt?: string;
  gateway: string;
}

export interface VendorKycRequest {
  reqId: string;
  vendorId: string;
  storeName: string;
  category: VendorCategory;
  ownerName: string;
  phone: string;
  onboardingSource: 'DIRECT' | 'MANAGER' | 'AGENT';
  officerName: string;
  subAdminName: string;
  subAdminMobile: string;
  subAdminLevel: SubAdminLevel;
  submittedAt: string;
  status: 'UNDER_REVIEW' | 'REUPLOAD_NEEDED' | 'APPROVED';
  notes: string;
  documents: { name: string; status: 'VERIFIED' | 'UNDER_REVIEW' | 'REJECTED' }[];
}

export interface VendorQueryIssue {
  queryId: string;
  vendorId: string;
  storeName: string;
  category: VendorCategory;
  issueType: string;
  description: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  assignedDesk: string;
  sla: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  createdAt: string;
}

export interface VendorPaymentDispute {
  disputeId: string;
  vendorId: string;
  storeName: string;
  category: VendorCategory;
  disputedAmount: number;
  issueType: string;
  description: string;
  subAdminName: string;
  status: 'UNDER_REVIEW' | 'ON_HOLD' | 'RESOLVED';
  bankRef: string;
  createdAt: string;
}

const INITIAL_VENDORS: VendorRecord[] = [
  {
    id: 'VEN-601',
    storeName: 'Royal Spice Supermarket',
    category: 'DAILY_NEEDS',
    categoryLabel: 'Daily Needs',
    ownerName: 'V. Jayakumar',
    phone: '+91 98401 22345',
    email: 'jayakumar.spice@gmail.com',
    onboardingSource: 'DIRECT',
    officerName: 'Direct',
    onboardedBy: 'Direct',
    onboardingDate: '2026-10-12',
    territory: {
      state: 'Tamil Nadu',
      district: 'Chennai',
      division: 'T. Nagar Division',
      pincode: '600017',
      address: 'No. 42, Usman Road, T. Nagar, Chennai'
    },
    subAdminApproval: {
      isApproved: true,
      subAdminName: '— (Direct Onboarding)',
      subAdminMobile: '—',
      subAdminLevel: 'STATE',
      subAdminTitle: 'Not Applicable (Direct)',
      approvedAt: '2026-10-12 11:30 AM',
      notes: 'Direct portal application — Sub Admin territorial approval not required.'
    },
    kycStatus: 'VERIFIED',
    status: 'ACTIVE',
    registrationDetails: {
      legalBusinessName: 'Royal Spice Retail Ventures Pvt Ltd',
      tradeName: 'Royal Spice Supermarket',
      panNumber: 'ABCDE1234F',
      gstin: '33ABCDE1234F1Z5',
      bankName: 'HDFC Bank - T. Nagar Branch',
      accountNumber: '50200049281734',
      ifscCode: 'HDFC0001244',
      businessType: 'Private Limited Enterprise',
      appliedDate: '2026-10-11'
    },
    documents: [
      { name: 'Business_Certificate_MCA.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '1.4 MB', uploadDate: '2026-10-11' },
      { name: 'GSTIN_Registration_33.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '850 KB', uploadDate: '2026-10-11' },
      { name: 'PAN_Card_Corporate.jpg', type: 'IMAGE', status: 'VERIFIED', fileSize: '620 KB', uploadDate: '2026-10-11' },
      { name: 'Cancelled_Cheque_HDFC.jpg', type: 'IMAGE', status: 'VERIFIED', fileSize: '510 KB', uploadDate: '2026-10-11' },
      { name: 'Store_Front_Signboard.jpg', type: 'IMAGE', status: 'VERIFIED', fileSize: '2.1 MB', uploadDate: '2026-10-11' },
      { name: 'FSSAI_Central_License.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '980 KB', uploadDate: '2026-10-11' }
    ]
  },
  {
    id: 'VEN-602',
    storeName: 'Nuts & Berries Organics',
    category: 'PRODUCTS',
    categoryLabel: 'Products',
    ownerName: 'Karthik Subbaraj',
    phone: '+91 97910 88721',
    email: 'karthik.organic@gmail.com',
    onboardingSource: 'MANAGER',
    officerName: 'Manager - Ramesh Sundaram',
    onboardedBy: 'Manager - Ramesh Sundaram',
    onboardingDate: '2026-10-14',
    territory: {
      state: 'Tamil Nadu',
      district: 'Chennai',
      division: 'Anna Nagar Division',
      pincode: '600040',
      address: '2nd Avenue, Block C, Anna Nagar, Chennai'
    },
    subAdminApproval: {
      isApproved: true,
      subAdminName: 'K. Selvakumar',
      subAdminMobile: '+91 98402 20002',
      subAdminLevel: 'DISTRICT',
      subAdminTitle: 'District Sub Admin (Chennai Metropolitan District)',
      approvedAt: '2026-10-14 02:45 PM',
      notes: 'Regional Manager Ramesh physical verification report reviewed and approved.'
    },
    kycStatus: 'VERIFIED',
    status: 'ACTIVE',
    registrationDetails: {
      legalBusinessName: 'Nuts & Berries Organics LLP',
      tradeName: 'Nuts & Berries Organics',
      panNumber: 'XYZPK8892L',
      gstin: '33XYZPK8892L1Z9',
      bankName: 'ICICI Bank - Anna Nagar Branch',
      accountNumber: '001805012398',
      ifscCode: 'ICIC0000452',
      businessType: 'Limited Liability Partnership',
      appliedDate: '2026-10-13'
    },
    documents: [
      { name: 'LLP_Partnership_Deed.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '2.8 MB', uploadDate: '2026-10-13' },
      { name: 'GSTIN_Registration.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '740 KB', uploadDate: '2026-10-13' },
      { name: 'Organic_Product_Certification.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '1.2 MB', uploadDate: '2026-10-13' },
      { name: 'Owner_Aadhaar_Karthik.jpg', type: 'IMAGE', status: 'VERIFIED', fileSize: '480 KB', uploadDate: '2026-10-13' },
      { name: 'Store_Interior_Warehouse.jpg', type: 'IMAGE', status: 'VERIFIED', fileSize: '1.8 MB', uploadDate: '2026-10-13' }
    ]
  },
  {
    id: 'VEN-603',
    storeName: 'Annapoorna Heritage Sweets & Tiffins',
    category: 'FOOD',
    categoryLabel: 'Food',
    ownerName: 'S. Narayanan',
    phone: '+91 98840 99123',
    email: 'annapoorna.bakers@gmail.com',
    onboardingSource: 'AGENT',
    officerName: 'Agent - M. Kavitha',
    onboardedBy: 'Agent - M. Kavitha',
    onboardingDate: '2026-10-18',
    territory: {
      state: 'Tamil Nadu',
      district: 'Chennai',
      division: 'Adyar Division',
      pincode: '600020',
      address: 'Lattice Bridge Road, Adyar, Chennai'
    },
    subAdminApproval: {
      isApproved: true,
      subAdminName: 'M. Rajesh Kumar',
      subAdminMobile: '+91 98403 30003',
      subAdminLevel: 'DIVISION',
      subAdminTitle: 'Division Sub Admin (Adyar & South Coastal Division)',
      approvedAt: '2026-10-18 04:15 PM',
      notes: 'Agent Kavitha verified kitchen hygiene and FSSAI permit compliance.'
    },
    kycStatus: 'VERIFIED',
    status: 'ACTIVE',
    registrationDetails: {
      legalBusinessName: 'Annapoorna Heritage Caterers & Bakers',
      tradeName: 'Annapoorna Heritage Sweets & Tiffins',
      panNumber: 'KLMNO4455R',
      gstin: '33KLMNO4455R1Z2',
      bankName: 'State Bank of India - Adyar Branch',
      accountNumber: '38192038102',
      ifscCode: 'SBIN0002194',
      businessType: 'Partnership Enterprise',
      appliedDate: '2026-10-17'
    },
    documents: [
      { name: 'FSSAI_License_Valid2029.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '1.1 MB', uploadDate: '2026-10-17' },
      { name: 'Commercial_Kitchen_Inspection.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '1.9 MB', uploadDate: '2026-10-17' },
      { name: 'GSTIN_Certificate.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '650 KB', uploadDate: '2026-10-17' },
      { name: 'Owner_ID_Proof.jpg', type: 'IMAGE', status: 'VERIFIED', fileSize: '530 KB', uploadDate: '2026-10-17' },
      { name: 'Store_Front_Adyar.jpg', type: 'IMAGE', status: 'VERIFIED', fileSize: '2.4 MB', uploadDate: '2026-10-17' }
    ]
  },
  {
    id: 'VEN-604',
    storeName: 'QuickFix Pro Appliance & Electricals',
    category: 'SERVICE',
    categoryLabel: 'Service',
    ownerName: 'R. Vigneshwar',
    phone: '+91 94441 55678',
    email: 'vignesh.quickfix@gmail.com',
    onboardingSource: 'AGENT',
    officerName: 'Agent - K. Vignesh',
    onboardedBy: 'Agent - K. Vignesh',
    onboardingDate: '2026-10-19',
    territory: {
      state: 'Tamil Nadu',
      district: 'Chennai',
      division: 'Tambaram Division',
      pincode: '600045',
      address: 'GST Road, Near Tambaram Sanatorium, Chennai'
    },
    subAdminApproval: {
      isApproved: true,
      subAdminName: 'S. Muruganantham',
      subAdminMobile: '+91 98404 40004',
      subAdminLevel: 'PINCODE',
      subAdminTitle: 'Pincode Sub Admin (Pincode 600045 - Tambaram Zone)',
      approvedAt: '2026-10-19 01:20 PM',
      notes: 'Electrical contractor class-A license verified on TNEB portal.'
    },
    kycStatus: 'VERIFIED',
    status: 'ACTIVE',
    registrationDetails: {
      legalBusinessName: 'QuickFix Electro Mechanical Works',
      tradeName: 'QuickFix Pro Appliance & Electrical Services',
      panNumber: 'POIUY7766T',
      gstin: '33POIUY7766T1Z4',
      bankName: 'Canara Bank - Tambaram Branch',
      accountNumber: '1099201004928',
      ifscCode: 'CNRB0001099',
      businessType: 'Proprietorship',
      appliedDate: '2026-10-18'
    },
    documents: [
      { name: 'Electrical_Class_A_License.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '1.6 MB', uploadDate: '2026-10-18' },
      { name: 'Proprietor_Aadhaar.jpg', type: 'IMAGE', status: 'VERIFIED', fileSize: '420 KB', uploadDate: '2026-10-18' },
      { name: 'GSTIN_Certificate.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '680 KB', uploadDate: '2026-10-18' },
      { name: 'Service_Center_Photo.jpg', type: 'IMAGE', status: 'VERIFIED', fileSize: '1.5 MB', uploadDate: '2026-10-18' }
    ]
  },
  {
    id: 'VEN-605',
    storeName: 'Palm Breeze Residency & Suites',
    category: 'STAY',
    categoryLabel: 'Stay',
    ownerName: 'M. Senthil Nathan',
    phone: '+91 98409 66112',
    email: 'senthil.palmbreeze@gmail.com',
    onboardingSource: 'MANAGER',
    officerName: 'Manager - Dinesh Kumar',
    onboardedBy: 'Manager - Dinesh Kumar',
    onboardingDate: '2026-10-21',
    territory: {
      state: 'Tamil Nadu',
      district: 'Coimbatore',
      division: 'RS Puram Division',
      pincode: '641002',
      address: 'East Sambandam Road, RS Puram, Coimbatore'
    },
    subAdminApproval: {
      isApproved: true,
      subAdminName: 'Dr. C. Mathivanan',
      subAdminMobile: '+91 94433 50005',
      subAdminLevel: 'DISTRICT',
      subAdminTitle: 'District Sub Admin (Coimbatore District)',
      approvedAt: '2026-10-21 03:30 PM',
      notes: 'Fire safety certificate and municipal hospitality license physically vetted.'
    },
    kycStatus: 'VERIFIED',
    status: 'ACTIVE',
    registrationDetails: {
      legalBusinessName: 'Palm Breeze Hospitality Group Pvt Ltd',
      tradeName: 'Palm Breeze Residency & Service Apartments',
      panNumber: 'PLMBR9912K',
      gstin: '33PLMBR9912K1Z8',
      bankName: 'Axis Bank - RS Puram Branch',
      accountNumber: '918020048192831',
      ifscCode: 'UTIB0000142',
      businessType: 'Private Limited Enterprise',
      appliedDate: '2026-10-20'
    },
    documents: [
      { name: 'Tourism_Hospitality_Permit.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '3.1 MB', uploadDate: '2026-10-20' },
      { name: 'Fire_Safety_NOC.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '1.8 MB', uploadDate: '2026-10-20' },
      { name: 'Residency_Property_Deed.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '4.2 MB', uploadDate: '2026-10-20' },
      { name: 'Rooms_and_Lobby_Photos.jpg', type: 'IMAGE', status: 'VERIFIED', fileSize: '3.8 MB', uploadDate: '2026-10-20' }
    ]
  },
  {
    id: 'VEN-606',
    storeName: 'Royal Cabs & Intercity Tours',
    category: 'TRAVEL',
    categoryLabel: 'Travel',
    ownerName: 'K. Balakrishnan',
    phone: '+91 96001 88392',
    email: 'bala.royalcabs@gmail.com',
    onboardingSource: 'DIRECT',
    officerName: 'Direct',
    onboardedBy: 'Direct',
    onboardingDate: '2026-10-22',
    territory: {
      state: 'Tamil Nadu',
      district: 'Madurai',
      division: 'Meenakshi Amman Division',
      pincode: '625001',
      address: 'West Perumal Maistry Street, Madurai'
    },
    subAdminApproval: {
      isApproved: true,
      subAdminName: '— (Direct Onboarding)',
      subAdminMobile: '—',
      subAdminLevel: 'STATE',
      subAdminTitle: 'Not Applicable (Direct)',
      approvedAt: '2026-10-22 05:00 PM',
      notes: 'Direct portal application — Sub Admin territorial approval not required.'
    },
    kycStatus: 'VERIFIED',
    status: 'ACTIVE',
    registrationDetails: {
      legalBusinessName: 'Royal Fleet Travel Solutions',
      tradeName: 'Royal Cabs & Intercity Tours',
      panNumber: 'RYLTR3321Q',
      gstin: '33RYLTR3321Q1Z6',
      bankName: 'Indian Overseas Bank - Madurai Main',
      accountNumber: '01420200001928',
      ifscCode: 'IOBA0000142',
      businessType: 'Partnership Enterprise',
      appliedDate: '2026-10-22'
    },
    documents: [
      { name: 'State_Transport_Operator_Permit.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '2.2 MB', uploadDate: '2026-10-22' },
      { name: 'Fleet_Commercial_Insurance.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '2.5 MB', uploadDate: '2026-10-22' },
      { name: 'GSTIN_Registration.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '710 KB', uploadDate: '2026-10-22' }
    ]
  },
  {
    id: 'VEN-607',
    storeName: 'TalentHub Staffing & Placement Agency',
    category: 'JOB',
    categoryLabel: 'Job',
    ownerName: 'Priya Dharshini',
    phone: '+91 94432 11223',
    email: 'priya.talenthub@gmail.com',
    onboardingSource: 'MANAGER',
    officerName: 'Manager - Ramesh Sundaram',
    onboardedBy: 'Manager - Ramesh Sundaram',
    onboardingDate: '2026-10-24',
    territory: {
      state: 'Tamil Nadu',
      district: 'Chennai',
      division: 'Guindy Division',
      pincode: '600032',
      address: 'Olympia Tech Park Road, Guindy, Chennai'
    },
    subAdminApproval: {
      isApproved: true,
      subAdminName: 'M. Rajesh Kumar',
      subAdminMobile: '+91 98403 30003',
      subAdminLevel: 'DIVISION',
      subAdminTitle: 'Division Sub Admin (Guindy Industrial Division)',
      approvedAt: '2026-10-24 06:15 PM',
      notes: 'Labour ministry staffing recruitment agency permit verified and approved.'
    },
    kycStatus: 'UNDER_REVIEW',
    status: 'PENDING_APPROVAL',
    registrationDetails: {
      legalBusinessName: 'TalentHub Human Resources Pvt Ltd',
      tradeName: 'TalentHub Staffing & Placement Agency',
      panNumber: 'TLNTH7722M',
      gstin: '33TLNTH7722M1Z3',
      bankName: 'Kotak Mahindra Bank - Guindy',
      accountNumber: '48192038192',
      ifscCode: 'KKBK0000492',
      businessType: 'Private Limited Enterprise',
      appliedDate: '2026-10-23'
    },
    documents: [
      { name: 'Labour_Dept_Recruitment_License.pdf', type: 'PDF', status: 'UNDER_REVIEW', fileSize: '1.7 MB', uploadDate: '2026-10-23' },
      { name: 'Incorporation_Certificate_MCA.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '1.9 MB', uploadDate: '2026-10-23' },
      { name: 'Office_Premises_Lease_Deed.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '2.8 MB', uploadDate: '2026-10-23' }
    ]
  }
];

const INITIAL_HISTORY: VendorHistoryRecord[] = [
  {
    ticketId: 'TCK-VND-9901',
    vendorId: 'VEN-603',
    vendorName: 'Annapoorna Heritage Sweets',
    issueTitle: 'FSSAI License Renewal Blur Detected by AI',
    assignedTeam: 'KYC Document Verification Desk',
    attendedBy: 'Alex Vance (KYC TL)',
    status: 'RESOLVED',
    priority: 'HIGH',
    createdAt: '2026-10-22 09:15 AM',
    attendedAt: '2026-10-22 09:25 AM',
    resolvedAt: '2026-10-22 10:05 AM',
    resolutionTimeMinutes: 50,
    resolutionNotes: 'High-res certificate re-uploaded via WhatsApp bot; verified against FoSCoS portal.',
    auditBadge: 'AI Assisted'
  },
  {
    ticketId: 'TCK-VND-9902',
    vendorId: 'VEN-602',
    vendorName: 'Nuts & Berries Organics',
    issueTitle: 'Commission Tier Dispute on Organic Packaged Items',
    assignedTeam: 'Query Operations Team',
    attendedBy: 'Sarah Connor (Query TL)',
    status: 'RESOLVED',
    priority: 'NORMAL',
    createdAt: '2026-10-23 02:40 PM',
    attendedAt: '2026-10-23 03:00 PM',
    resolvedAt: '2026-10-23 03:45 PM',
    resolutionTimeMinutes: 65,
    resolutionNotes: 'Clarified category tier rules. Granted ₹4,200 goodwill incentive credit to vendor ledger.',
    auditBadge: 'Escalated'
  },
  {
    ticketId: 'TCK-VND-9903',
    vendorId: 'VEN-605',
    vendorName: 'Palm Breeze Residency',
    issueTitle: 'Hospitality Check-in Webhook Synchronization Delay',
    assignedTeam: 'Procurement Team',
    attendedBy: 'Michael Chang (Integration Specialist)',
    status: 'ESCALATED_TO_SUPPORT_ADMIN',
    priority: 'CRITICAL',
    createdAt: '2026-10-25 11:10 AM',
    attendedAt: '2026-10-25 11:30 AM',
    resolvedAt: 'In Progress',
    resolutionTimeMinutes: 120,
    resolutionNotes: 'PMS API gateway timeout. Escalated to Support Admin for webhook retry token regeneration.',
    auditBadge: 'Tier-2 Priority'
  },
  {
    ticketId: 'TCK-VND-9904',
    vendorId: 'VEN-604',
    vendorName: 'QuickFix Pro Appliance Services',
    issueTitle: 'Weekly Payout Delay Inquiry',
    assignedTeam: 'Payment & Settlement Team',
    attendedBy: 'David Ross (Payment Lead)',
    status: 'PENDING',
    priority: 'HIGH',
    createdAt: '2026-10-26 09:00 AM',
    attendedAt: '2026-10-26 09:12 AM',
    resolvedAt: 'Pending',
    resolutionTimeMinutes: 42,
    resolutionNotes: 'Awaiting banking partner batch response for UTR generation.',
    auditBadge: 'Payment Desk'
  },
  {
    ticketId: 'TCK-VND-9905',
    vendorId: 'VEN-606',
    vendorName: 'Royal Cabs & Intercity Tours',
    issueTitle: 'Field Driver App GPS Geofence Misalignment',
    assignedTeam: 'Query Operations Team',
    attendedBy: 'AI Autonomous Tech Resolver',
    status: 'RESOLVED',
    priority: 'NORMAL',
    createdAt: '2026-10-26 10:15 AM',
    attendedAt: '2026-10-26 10:16 AM',
    resolvedAt: '2026-10-26 10:20 AM',
    resolutionTimeMinutes: 4,
    resolutionNotes: 'AI agent recalculated territory boundary coordinates and auto-pushed firmware update.',
    auditBadge: 'Autonomous 100%'
  }
];

const INITIAL_PAYROLL: VendorPayrollRecord[] = [
  {
    payrollId: 'PAY-VEN-2026-10-01',
    vendorId: 'VEN-601',
    vendorName: 'Royal Spice Supermarket',
    ownerName: 'V. Jayakumar',
    payPeriod: 'Oct 01 - Oct 15, 2026',
    bankName: 'HDFC Bank - T. Nagar',
    accountNumber: '•••• •••• 1734',
    ifscCode: 'HDFC0001244',
    panNumber: 'ABCDE1234F',
    gstin: '33ABCDE1234F1Z5',
    grossCollections: 242500,
    platformCommissionPercent: 10,
    platformCommissionAmount: 24250,
    tdsPercent: 1.0,
    tdsAmount: 2425,
    adjustments: 0,
    netPayable: 215825,
    payoutStatus: 'DISBURSED',
    utrNumber: 'CMS9823019842',
    disbursedAt: 'Oct 18, 2026',
    gateway: 'HDFC Direct Host-to-Host'
  },
  {
    payrollId: 'PAY-VEN-2026-10-02',
    vendorId: 'VEN-602',
    vendorName: 'Nuts & Berries Organics',
    ownerName: 'Karthik Subbaraj',
    payPeriod: 'Oct 01 - Oct 15, 2026',
    bankName: 'ICICI Bank - Anna Nagar',
    accountNumber: '•••• •••• 2398',
    ifscCode: 'ICIC0000452',
    panNumber: 'XYZPK8892L',
    gstin: '33XYZPK8892L1Z9',
    grossCollections: 147500,
    platformCommissionPercent: 10,
    platformCommissionAmount: 14750,
    tdsPercent: 1.0,
    tdsAmount: 1475,
    adjustments: 0,
    netPayable: 131275,
    payoutStatus: 'PENDING_RELEASE',
    gateway: 'ICICI Corporate Connected Banking'
  },
  {
    payrollId: 'PAY-VEN-2026-10-03',
    vendorId: 'VEN-603',
    vendorName: 'Annapoorna Heritage Sweets & Tiffins',
    ownerName: 'S. Narayanan',
    payPeriod: 'Oct 01 - Oct 15, 2026',
    bankName: 'State Bank of India - Adyar',
    accountNumber: '•••• •••• 8102',
    ifscCode: 'SBIN0002194',
    panNumber: 'KLMNO4455R',
    gstin: '33KLMNO4455R1Z2',
    grossCollections: 170000,
    platformCommissionPercent: 10,
    platformCommissionAmount: 17000,
    tdsPercent: 1.0,
    tdsAmount: 1700,
    adjustments: 500,
    netPayable: 150800,
    payoutStatus: 'PENDING_RELEASE',
    gateway: 'SBI Cash Management Portal'
  },
  {
    payrollId: 'PAY-VEN-2026-10-04',
    vendorId: 'VEN-604',
    vendorName: 'QuickFix Pro Appliance Services',
    ownerName: 'R. Vigneshwar',
    payPeriod: 'Oct 01 - Oct 15, 2026',
    bankName: 'Canara Bank - Tambaram',
    accountNumber: '•••• •••• 4928',
    ifscCode: 'CNRB0001099',
    panNumber: 'POIUY7766T',
    gstin: '33POIUY7766T1Z4',
    grossCollections: 72500,
    platformCommissionPercent: 10,
    platformCommissionAmount: 7250,
    tdsPercent: 1.0,
    tdsAmount: 725,
    adjustments: 0,
    netPayable: 64525,
    payoutStatus: 'DISBURSED',
    utrNumber: 'CMS9823019899',
    disbursedAt: 'Oct 18, 2026',
    gateway: 'Canara Corporate NEFT'
  }
];

const INITIAL_KYC_REQUESTS: VendorKycRequest[] = [
  {
    reqId: 'KYC-REQ-701',
    vendorId: 'VEN-607',
    storeName: 'TalentHub Staffing & Placement Agency',
    category: 'JOB',
    ownerName: 'Priya Dharshini',
    phone: '+91 94432 11223',
    onboardingSource: 'MANAGER',
    officerName: 'Manager - Ramesh Sundaram',
    subAdminName: 'M. Rajesh Kumar',
    subAdminMobile: '+91 98403 30003',
    subAdminLevel: 'DIVISION',
    submittedAt: 'Today, 11:20 AM',
    status: 'UNDER_REVIEW',
    notes: 'Labour Dept recruitment agency license cross-match with MCA registry under review. Sub Admin Guindy signed off.',
    documents: [
      { name: 'Labour_Dept_Recruitment_License.pdf', status: 'UNDER_REVIEW' },
      { name: 'Incorporation_Certificate_MCA.pdf', status: 'VERIFIED' },
      { name: 'Office_Premises_Lease_Deed.pdf', status: 'VERIFIED' }
    ]
  },
  {
    reqId: 'KYC-REQ-702',
    vendorId: 'VEN-604',
    storeName: 'Fresh Catch Sea Foods',
    category: 'FOOD',
    ownerName: 'S. Murugan',
    phone: '+91 98404 55667',
    onboardingSource: 'DIRECT',
    officerName: 'Direct Application',
    subAdminName: '— Not Applicable (Direct)',
    subAdminMobile: '—',
    subAdminLevel: 'STATE',
    submittedAt: 'Yesterday, 04:45 PM',
    status: 'REUPLOAD_NEEDED',
    notes: 'Direct onboarding: Sub Admin territorial approval not required. FSSAI state license certificate image page 2 contains scan blur. WhatsApp re-upload prompt sent to vendor.',
    documents: [
      { name: 'FSSAI_Certificate_Scan_Page2.pdf', status: 'REJECTED' },
      { name: 'GSTIN_Registration_33.pdf', status: 'VERIFIED' },
      { name: 'PAN_Card_Corporate.jpg', status: 'VERIFIED' }
    ]
  },
  {
    reqId: 'KYC-REQ-703',
    vendorId: 'VEN-608',
    storeName: 'Senthil Multi-Brand Home Appliance Care',
    category: 'SERVICE',
    ownerName: 'Senthil Kumar',
    phone: '+91 94440 88991',
    onboardingSource: 'AGENT',
    officerName: 'Agent - M. Kavitha',
    subAdminName: 'R. Senthil Nathan',
    subAdminMobile: '+91 98404 40004',
    subAdminLevel: 'PINCODE',
    submittedAt: 'Today, 09:15 AM',
    status: 'UNDER_REVIEW',
    notes: 'Electrical service contractor license and agent physical store inspection report submitted. Awaiting Support Admin final KYC activation.',
    documents: [
      { name: 'Electrical_Contractor_License_TN.pdf', status: 'VERIFIED' },
      { name: 'Aadhaar_Card_Owner.jpg', status: 'VERIFIED' },
      { name: 'Bank_Passbook_Cheque.jpg', status: 'VERIFIED' }
    ]
  }
];

const INITIAL_VENDOR_QUERIES: VendorQueryIssue[] = [
  {
    queryId: 'TCK-OPS-8841',
    vendorId: 'VEN-605',
    storeName: 'Palm Breeze Residency',
    category: 'STAY',
    issueType: 'Webhook / PMS Room Inventory Sync',
    description: 'Check-in guest sync webhook retry failed 3 times; PMS room availability not synchronizing with portal bookings.',
    severity: 'HIGH',
    assignedDesk: 'API & Integration Team',
    sla: '18 mins SLA (Critical)',
    status: 'OPEN',
    createdAt: 'Today, 10:15 AM'
  },
  {
    queryId: 'TCK-OPS-8842',
    vendorId: 'VEN-601',
    storeName: 'Royal Spice Supermarket',
    category: 'DAILY_NEEDS',
    issueType: 'Catalog & Barcode Upload',
    description: 'Bulk barcode upload CSV failed on 42 FMCG items; HSN tax rate 5% mismatched with GST tax slab.',
    severity: 'MEDIUM',
    assignedDesk: 'Catalog Operations Desk',
    sla: '45 mins SLA',
    status: 'IN_PROGRESS',
    createdAt: 'Today, 11:30 AM'
  },
  {
    queryId: 'TCK-OPS-8843',
    vendorId: 'VEN-606',
    storeName: 'FastTrack City Cabs',
    category: 'TRAVEL',
    issueType: 'Fleet Driver Routing & Geofence',
    description: 'Airport pickup terminal geofence beacon reporting inaccurate toll fare computation on Terminal 2 trips.',
    severity: 'HIGH',
    assignedDesk: 'Fleet & Territory Ops',
    sla: '12 mins SLA (High)',
    status: 'OPEN',
    createdAt: 'Today, 01:10 PM'
  }
];

const INITIAL_PAYMENT_DISPUTES: VendorPaymentDispute[] = [
  {
    disputeId: 'PAY-DSP-401',
    vendorId: 'VEN-603',
    storeName: 'Annapoorna Heritage Sweets',
    category: 'FOOD',
    disputedAmount: 500,
    issueType: 'Cancellation Fee Penalty Dispute',
    description: 'Customer cancelled order after traditional sweets preparation completed. Vendor requests waiver of 10% platform cancellation penalty.',
    subAdminName: 'M. Rajesh Kumar (Division Sub Admin)',
    status: 'UNDER_REVIEW',
    bankRef: 'CMS-SETTL-99120',
    createdAt: 'Today, 08:45 AM'
  },
  {
    disputeId: 'PAY-DSP-402',
    vendorId: 'VEN-604',
    storeName: 'QuickFix Mobile & Electronics',
    category: 'SERVICE',
    disputedAmount: 16000,
    issueType: 'Bank Account IFSC Change / Payout Hold',
    description: 'Bank merged from Corporation Bank to Union Bank of India. Weekly CMS NEFT payout on hold pending cancelled cheque verification.',
    subAdminName: 'K. Selvakumar (District Sub Admin)',
    status: 'ON_HOLD',
    bankRef: 'CMS-SETTL-99121',
    createdAt: 'Yesterday, 03:15 PM'
  },
  {
    disputeId: 'PAY-DSP-403',
    vendorId: 'VEN-602',
    storeName: 'Nuts & Berries Organics',
    category: 'PRODUCTS',
    disputedAmount: 2450,
    issueType: 'TDS 1% Section 194-O Reconciliation',
    description: 'TDS certificate mismatch for Q3 FY26 e-commerce operator filing; requested Form 16A correction ledger credit.',
    subAdminName: 'P. Anbalagan (State Sub Admin)',
    status: 'RESOLVED',
    bankRef: 'CMS-SETTL-99119',
    createdAt: 'Oct 24, 2026'
  }
];

interface VendorOperationsHubProps {
  initialTab?: VendorActiveTab;
  onTabChange?: (tab: VendorActiveTab) => void;
}

export const VendorOperationsHub: React.FC<VendorOperationsHubProps> = ({
  initialTab = 'DIRECTORY',
  onTabChange
}) => {
  const [activeTab, setActiveTab] = useState<VendorActiveTab>(initialTab);

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const handleTabSwitch = (tab: VendorActiveTab) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };
  const [vendors, setVendors] = useState<VendorRecord[]>(INITIAL_VENDORS);
  const [historyRecords] = useState<VendorHistoryRecord[]>(INITIAL_HISTORY);
  const [payrollRecords, setPayrollRecords] = useState<VendorPayrollRecord[]>(INITIAL_PAYROLL);

  // Section 2 Operations State
  const [kycRequests, setKycRequests] = useState<VendorKycRequest[]>(INITIAL_KYC_REQUESTS);
  const [vendorQueries, setVendorQueries] = useState<VendorQueryIssue[]>(INITIAL_VENDOR_QUERIES);
  const [paymentDisputes, setPaymentDisputes] = useState<VendorPaymentDispute[]>(INITIAL_PAYMENT_DISPUTES);
  const [opsSubStream, setOpsSubStream] = useState<OpsSubStream>('KYC_QUEUE');

  // Filters
  const [onboardingFilter, setOnboardingFilter] = useState<OnboardingSource>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<VendorCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [selectedVendorForProfile, setSelectedVendorForProfile] = useState<VendorRecord | null>(null);
  const [selectedVendorForRegistration, setSelectedVendorForRegistration] = useState<VendorRecord | null>(null);
  const [payoutModalData, setPayoutModalData] = useState<VendorPayrollRecord | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Helper for Category styling & icons
  const getCategoryMeta = (cat: VendorCategory) => {
    switch (cat) {
      case 'SERVICE':
        return { label: 'Service', icon: Wrench, color: '#0284c7', bg: '#f0f9ff', border: '#bae6fd' };
      case 'PRODUCTS':
        return { label: 'Products', icon: ShoppingBag, color: '#7c3aed', bg: '#faf5ff', border: '#e9d5ff' };
      case 'DAILY_NEEDS':
        return { label: 'Daily Needs', icon: ShoppingCart, color: '#059669', bg: '#ecfdf5', border: '#a7f3d0' };
      case 'FOOD':
        return { label: 'Food', icon: UtensilsCrossed, color: '#d97706', bg: '#fffbeb', border: '#fde68a' };
      case 'STAY':
        return { label: 'Stay', icon: Hotel, color: '#db2777', bg: '#fdf2f8', border: '#fbcfe8' };
      case 'TRAVEL':
        return { label: 'Travel', icon: Compass, color: '#0891b2', bg: '#ecfeff', border: '#a5f3fc' };
      case 'JOB':
        return { label: 'Job', icon: Briefcase, color: '#4f46e5', bg: '#eef2ff', border: '#c7d2fe' };
      default:
        return { label: 'All', icon: Tag, color: '#64748b', bg: '#f8fafc', border: '#e2e8f0' };
    }
  };

  // Helper for Sub Admin Level badges
  const getSubAdminLevelBadge = (level: SubAdminLevel) => {
    switch (level) {
      case 'STATE':
        return { label: 'State Sub Admin (1 of 4)', color: '#db2777', bg: '#fdf2f8', border: '#fbcfe8' };
      case 'DISTRICT':
        return { label: 'District Sub Admin', color: '#7c3aed', bg: '#faf5ff', border: '#e9d5ff' };
      case 'DIVISION':
        return { label: 'Division Sub Admin', color: '#0284c7', bg: '#f0f9ff', border: '#bae6fd' };
      case 'PINCODE':
        return { label: 'Pincode Sub Admin', color: '#059669', bg: '#ecfdf5', border: '#a7f3d0' };
    }
  };

  // Filtered vendors
  const filteredVendors = useMemo(() => {
    return vendors.filter(v => {
      const matchSource = onboardingFilter === 'ALL' || v.onboardingSource === onboardingFilter;
      const matchCategory = categoryFilter === 'ALL' || v.category === categoryFilter;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !searchQuery ||
        v.storeName.toLowerCase().includes(q) ||
        v.ownerName.toLowerCase().includes(q) ||
        v.id.toLowerCase().includes(q) ||
        v.officerName.toLowerCase().includes(q) ||
        v.territory.state.toLowerCase().includes(q) ||
        v.territory.district.toLowerCase().includes(q) ||
        v.territory.division.toLowerCase().includes(q) ||
        v.territory.pincode.includes(q) ||
        v.subAdminApproval.subAdminName.toLowerCase().includes(q) ||
        v.subAdminApproval.subAdminMobile.includes(q);

      return matchSource && matchCategory && matchSearch;
    });
  }, [vendors, onboardingFilter, categoryFilter, searchQuery]);

  // Aggregate counts
  const counts = useMemo(() => {
    const total = vendors.length;
    const direct = vendors.filter(v => v.onboardingSource === 'DIRECT').length;
    const manager = vendors.filter(v => v.onboardingSource === 'MANAGER').length;
    const agent = vendors.filter(v => v.onboardingSource === 'AGENT').length;
    const verified = vendors.filter(v => v.kycStatus === 'VERIFIED').length;
    const active = vendors.filter(v => v.status === 'ACTIVE').length;
    const pendingReview = vendors.filter(v => v.kycStatus !== 'VERIFIED' || v.status !== 'ACTIVE').length;
    const totalPayroll = payrollRecords.reduce((acc, p) => acc + p.netPayable, 0);
    const disbursedPayroll = payrollRecords.filter(p => p.payoutStatus === 'DISBURSED').reduce((acc, p) => acc + p.netPayable, 0);
    const pendingPayroll = payrollRecords.filter(p => p.payoutStatus !== 'DISBURSED').reduce((acc, p) => acc + p.netPayable, 0);
    return {
      total,
      direct,
      manager,
      agent,
      verified,
      active,
      pendingReview,
      totalPayroll,
      disbursedPayroll,
      pendingPayroll
    };
  }, [vendors, payrollRecords]);

  // Release payout handler
  const handleReleasePayout = async (payroll: VendorPayrollRecord) => {
    try {
      const genUtr = `CMS${Math.floor(1000000000 + Math.random() * 9000000000)}`;
      setPayrollRecords(prev =>
        prev.map(p =>
          p.payrollId === payroll.payrollId
            ? { ...p, payoutStatus: 'DISBURSED', utrNumber: genUtr, disbursedAt: new Date().toLocaleDateString() }
            : p
        )
      );
      setPayoutModalData(null);
      showToast(`Payout of ₹${payroll.netPayable.toLocaleString()} disbursed to ${payroll.vendorName} with UTR: ${genUtr}`);
    } catch {
      showToast(`Payout processed offline with UTR: CMS${Math.floor(1000000000 + Math.random() * 9000000000)}`);
    }
  };

  // Section 2 Operation Handlers
  const handleApproveKyc = (reqId: string, vendorId: string, storeName: string) => {
    setKycRequests(prev =>
      prev.map(k => (k.reqId === reqId ? { ...k, status: 'APPROVED' } : k))
    );
    setVendors(prev =>
      prev.map(v =>
        v.id === vendorId ? { ...v, kycStatus: 'VERIFIED', status: 'ACTIVE' } : v
      )
    );
    showToast(`KYC Approved & Store Activated for ${storeName} (${vendorId})!`);
  };

  const handleRequestReupload = (reqId: string, storeName: string) => {
    setKycRequests(prev =>
      prev.map(k => (k.reqId === reqId ? { ...k, status: 'REUPLOAD_NEEDED' } : k))
    );
    showToast(`WhatsApp & SMS re-upload notification dispatched to ${storeName}!`);
  };

  const handleResolveQuery = (queryId: string, storeName: string) => {
    setVendorQueries(prev =>
      prev.map(q => (q.queryId === queryId ? { ...q, status: 'RESOLVED' } : q))
    );
    showToast(`Query ${queryId} for ${storeName} resolved & webhook synchronised!`);
  };

  const handleApproveWaiver = (disputeId: string, storeName: string, amount: number) => {
    setPaymentDisputes(prev =>
      prev.map(d => (d.disputeId === disputeId ? { ...d, status: 'RESOLVED' } : d))
    );
    showToast(`Dispute ${disputeId} approved: ₹${amount.toLocaleString()} credited to ${storeName} ledger!`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', width: '100%', paddingBottom: '3rem' }}>
      
      {/* Toast Alert */}
      {toastMsg && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '25px',
          zIndex: 9999999,
          background: '#047857',
          color: '#ecfdf5',
          border: '1.5px solid #10b981',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          borderRadius: '10px',
          padding: '0.85rem 1.4rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontWeight: 600,
          fontSize: '0.9rem'
        }}>
          <CheckCircle2 size={18} color="#a7f3d0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Main Header Banner */}
      <div className="glass-panel" style={{
        padding: '1.5rem',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, rgba(7, 21, 48, 0.95), rgba(13, 34, 82, 0.85))',
        border: '1px solid rgba(56, 189, 248, 0.3)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #0284c7, #38bdf8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 4px 20px rgba(56, 189, 248, 0.4)'
          }}>
            <Building2 size={30} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: '#fff', letterSpacing: '-0.01em' }}>
                Vendor Command Hub & Lifecycle Operations
              </h2>
              <span className="badge badge-success" style={{ padding: '0.2rem 0.65rem', fontSize: '0.72rem' }}>
                <ShieldCheck size={11} /> Support Admin Authorized
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Tab-Specific Executive KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1rem'
      }}>
        {/* ==================== 1. VENDORS DIRECTORY KPIS ==================== */}
        {activeTab === 'DIRECTORY' && (
          <>
            <div className="glass-panel" style={{ padding: '1.1rem 1.25rem', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Total Registered Vendors
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', margin: '0.2rem 0' }}>
                  {counts.total}
                </div>
                <div style={{ fontSize: '0.73rem', color: '#0284c7', fontWeight: 600 }}>
                  {counts.direct} Direct • {counts.manager} Manager • {counts.agent} Agent
                </div>
              </div>
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: '#f0f9ff', border: '1px solid #bae6fd', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7' }}>
                <Building2 size={22} />
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.1rem 1.25rem', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  KYC & Active Status
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#059669', margin: '0.2rem 0' }}>
                  {counts.active} Active
                </div>
                <div style={{ fontSize: '0.73rem', color: '#64748b', fontWeight: 600 }}>
                  {counts.verified} Verified ({Math.round((counts.verified / counts.total) * 100)}%) • {counts.pendingReview} Pending
                </div>
              </div>
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: '#ecfdf5', border: '1px solid #a7f3d0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669' }}>
                <CheckCircle2 size={22} />
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.1rem 1.25rem', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Sub Admin Approvals
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#7c3aed', margin: '0.2rem 0' }}>
                  100% Ingested
                </div>
                <div style={{ fontSize: '0.73rem', color: '#7c3aed', fontWeight: 600 }}>
                  State, District, Division & Pin Verified
                </div>
              </div>
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: '#faf5ff', border: '1px solid #e9d5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c3aed' }}>
                <ShieldCheck size={22} />
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.1rem 1.25rem', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Operating Categories
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#d97706', margin: '0.2rem 0' }}>
                  7 Categories
                </div>
                <div style={{ fontSize: '0.73rem', color: '#d97706', fontWeight: 600 }}>
                  Chennai, CBE, Madurai, Trichy, Salem
                </div>
              </div>
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: '#fffbeb', border: '1px solid #fde68a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706' }}>
                <MapPin size={22} />
              </div>
            </div>
          </>
        )}

        {/* ==================== 2. KYC, QUERIES & PAYMENTS KPIS ==================== */}
        {activeTab === 'OPERATIONS' && (
          <>
            <div className="glass-panel" style={{ padding: '1.1rem 1.25rem', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  New Onboarding KYC Queue
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0284c7', margin: '0.2rem 0' }}>
                  {kycRequests.length} Requests
                </div>
                <div style={{ fontSize: '0.73rem', color: '#0284c7', fontWeight: 600 }}>
                  {kycRequests.filter(k => k.status === 'APPROVED').length} Approved • {kycRequests.filter(k => k.status === 'UNDER_REVIEW').length} Review • {kycRequests.filter(k => k.status === 'REUPLOAD_NEEDED').length} Re-upload
                </div>
              </div>
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: '#f0f9ff', border: '1px solid #bae6fd', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7' }}>
                <FileCheck size={22} />
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.1rem 1.25rem', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Vendor Query Tickets
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#7c3aed', margin: '0.2rem 0' }}>
                  {vendorQueries.filter(q => q.status !== 'RESOLVED').length} Open
                </div>
                <div style={{ fontSize: '0.73rem', color: '#7c3aed', fontWeight: 600 }}>
                  {vendorQueries.filter(q => q.severity === 'HIGH').length} High Priority • Auto-triage Active
                </div>
              </div>
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: '#faf5ff', border: '1px solid #e9d5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c3aed' }}>
                <HelpCircle size={22} />
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.1rem 1.25rem', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Settlement & Payment Disputes
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#d97706', margin: '0.2rem 0' }}>
                  ₹{(paymentDisputes.reduce((acc, d) => acc + d.disputedAmount, 0) / 1000).toFixed(1)}k
                </div>
                <div style={{ fontSize: '0.73rem', color: '#d97706', fontWeight: 600 }}>
                  {paymentDisputes.filter(d => d.status !== 'RESOLVED').length} Active Disputes • 1 IFSC Hold
                </div>
              </div>
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: '#fffbeb', border: '1px solid #fde68a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706' }}>
                <CreditCard size={22} />
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.1rem 1.25rem', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Ops SLA Resolution Rate
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#059669', margin: '0.2rem 0' }}>
                  98.4%
                </div>
                <div style={{ fontSize: '0.73rem', color: '#059669', fontWeight: 600 }}>
                  Avg Response: 4.2 mins • AI Assisted Triage
                </div>
              </div>
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: '#ecfdf5', border: '1px solid #a7f3d0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669' }}>
                <Clock size={22} />
              </div>
            </div>
          </>
        )}

        {/* ==================== 3. TICKET ROUTING HISTORY KPIS ==================== */}
        {activeTab === 'HISTORY' && (
          <>
            <div className="glass-panel" style={{ padding: '1.1rem 1.25rem', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Total Routed Tickets
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#7c3aed', margin: '0.2rem 0' }}>
                  {historyRecords.length} Audited
                </div>
                <div style={{ fontSize: '0.73rem', color: '#7c3aed', fontWeight: 600 }}>
                  KYC, Queries, Payments & Procurement
                </div>
              </div>
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: '#faf5ff', border: '1px solid #e9d5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c3aed' }}>
                <History size={22} />
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.1rem 1.25rem', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Ticket Resolution Rate
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#059669', margin: '0.2rem 0' }}>
                  {Math.round((historyRecords.filter(h => h.status === 'RESOLVED').length / historyRecords.length) * 100)}%
                </div>
                <div style={{ fontSize: '0.73rem', color: '#059669', fontWeight: 600 }}>
                  {historyRecords.filter(h => h.status === 'RESOLVED').length} of {historyRecords.length} Tickets Closed
                </div>
              </div>
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: '#ecfdf5', border: '1px solid #a7f3d0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669' }}>
                <CheckCircle2 size={22} />
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.1rem 1.25rem', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Average Resolution TAT
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0284c7', margin: '0.2rem 0' }}>
                  42 Mins
                </div>
                <div style={{ fontSize: '0.73rem', color: '#0284c7', fontWeight: 600 }}>
                  SLA Target &lt; 120 mins achieved
                </div>
              </div>
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: '#f0f9ff', border: '1px solid #bae6fd', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7' }}>
                <Clock size={22} />
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.1rem 1.25rem', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Resolver Distribution
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#d97706', margin: '0.2rem 0' }}>
                  3 AI • 2 Human
                </div>
                <div style={{ fontSize: '0.73rem', color: '#d97706', fontWeight: 600 }}>
                  Automated Triage & Audit Trail
                </div>
              </div>
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: '#fffbeb', border: '1px solid #fde68a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706' }}>
                <Shield size={22} />
              </div>
            </div>
          </>
        )}

        {/* ==================== 4. VENDOR PAYROLL KPIS ==================== */}
        {activeTab === 'PAYROLL' && (
          <>
            <div className="glass-panel" style={{ padding: '1.1rem 1.25rem', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Total Payroll Ledger
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#d97706', margin: '0.2rem 0' }}>
                  ₹{(counts.totalPayroll / 1000).toLocaleString('en-IN', { maximumFractionDigits: 1 })}k
                </div>
                <div style={{ fontSize: '0.73rem', color: '#64748b', fontWeight: 600 }}>
                  Gross Collections in Current Cycle
                </div>
              </div>
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: '#fffbeb', border: '1px solid #fde68a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706' }}>
                <DollarSign size={22} />
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.1rem 1.25rem', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Disbursed Settlements
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#059669', margin: '0.2rem 0' }}>
                  ₹{(counts.disbursedPayroll / 1000).toFixed(1)}k
                </div>
                <div style={{ fontSize: '0.73rem', color: '#059669', fontWeight: 600 }}>
                  {Math.round((counts.disbursedPayroll / counts.totalPayroll) * 100)}% Transferred via CMS Auto-Debit
                </div>
              </div>
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: '#ecfdf5', border: '1px solid #a7f3d0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669' }}>
                <CheckCircle2 size={22} />
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.1rem 1.25rem', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Pending Disbursal Hold
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0284c7', margin: '0.2rem 0' }}>
                  ₹{(counts.pendingPayroll / 1000).toFixed(1)}k
                </div>
                <div style={{ fontSize: '0.73rem', color: '#0284c7', fontWeight: 600 }}>
                  1 Vendor on Bank Verification Hold
                </div>
              </div>
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: '#f0f9ff', border: '1px solid #bae6fd', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7' }}>
                <Clock size={22} />
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.1rem 1.25rem', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Platform Margin Retained
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#7c3aed', margin: '0.2rem 0' }}>
                  ₹{(counts.totalPayroll * 0.1 / 1000).toFixed(1)}k
                </div>
                <div style={{ fontSize: '0.73rem', color: '#7c3aed', fontWeight: 600 }}>
                  Flat 10% Platform Commission
                </div>
              </div>
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: '#faf5ff', border: '1px solid #e9d5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c3aed' }}>
                <Tag size={22} />
              </div>
            </div>
          </>
        )}
      </div>

      {/* ========================================================================= */}
      {/* HEADING 1: VENDORS DIRECTORY & ONBOARDING CHANNELS                         */}
      {/* ========================================================================= */}
      {activeTab === 'DIRECTORY' && (
        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px', borderLeft: '4px solid #38bdf8' }}>
          
          {/* Header & Onboarding Channels Summary */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.85rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Building2 size={22} color="#38bdf8" />
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  1. Vendors Directory & Onboarding Channels
                </h3>
              </div>
            </div>

            {/* Channel Filter Pills */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {[
                { id: 'ALL', label: `All Channels (${counts.total})`, color: '#38bdf8' },
                { id: 'DIRECT', label: `Direct (${counts.direct})`, color: '#10b981' },
                { id: 'MANAGER', label: `Manager (${counts.manager})`, color: '#a855f7' },
                { id: 'AGENT', label: `Agent (${counts.agent})`, color: '#fbbf24' }
              ].map(f => {
                const isSelected = onboardingFilter === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setOnboardingFilter(f.id as OnboardingSource)}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: isSelected ? 700 : 500,
                      background: isSelected ? 'rgba(56, 189, 248, 0.18)' : 'rgba(255,255,255,0.04)',
                      color: isSelected ? f.color : 'var(--text-muted)',
                      border: isSelected ? `1.5px solid ${f.color}` : '1px solid rgba(255,255,255,0.08)',
                      cursor: 'pointer'
                    }}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search bar */}
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search vendor store, owner, territory (state/district/division/pincode), officer, or sub admin name & phone..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.6rem 0.75rem 0.6rem 2.25rem',
                  borderRadius: '10px',
                  background: 'var(--bg-input, #ffffff)',
                  border: '1px solid var(--border-color, #cbd5e1)',
                  color: 'var(--text-main)',
                  fontSize: '0.82rem'
                }}
              />
            </div>
            {searchQuery && (
              <button
                className="btn btn-secondary"
                onClick={() => setSearchQuery('')}
                style={{ padding: '0.55rem 0.85rem', fontSize: '0.75rem' }}
              >
                Clear
              </button>
            )}
          </div>

          {/* Vendors Table */}
          <div style={{ overflowX: 'auto' }}>
            <table className="table" style={{ width: '100%', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ borderBottom: '1.5px solid rgba(0,0,0,0.1)', textAlign: 'left', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem', width: '50px' }}>S.No</th>
                  <th style={{ padding: '0.75rem' }}>Vendor & Store Name</th>
                  <th style={{ padding: '0.75rem' }}>Category</th>
                  <th style={{ padding: '0.75rem' }}>Onboarding Channel & Officer</th>
                  <th style={{ padding: '0.75rem' }}>Territory (Hierarchy)</th>
                  <th style={{ padding: '0.75rem' }}>Approving Sub Admin</th>
                  <th style={{ padding: '0.75rem' }}>KYC & Status</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVendors.map((vendor, index) => {
                  const isDirect = vendor.onboardingSource === 'DIRECT';
                  const isManager = vendor.onboardingSource === 'MANAGER';
                  const isAgent = vendor.onboardingSource === 'AGENT';
                  const catMeta = getCategoryMeta(vendor.category);
                  const CatIcon = catMeta.icon;
                  const subAdminLevelMeta = getSubAdminLevelBadge(vendor.subAdminApproval.subAdminLevel);

                  return (
                    <tr key={vendor.id} style={{ borderBottom: '1px solid var(--border-color, rgba(0,0,0,0.06))' }}>
                      {/* S.No */}
                      <td style={{ padding: '0.75rem', fontWeight: 700, color: '#64748b', fontSize: '0.85rem' }}>
                        {index + 1}
                      </td>

                      {/* 1. Name & Contact */}
                      <td style={{ padding: '0.75rem', minWidth: '180px' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-main)' }}>{vendor.storeName}</div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{vendor.ownerName}</div>
                        <div style={{ fontSize: '0.72rem', color: '#0284c7', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.1rem', fontWeight: 600 }}>
                          <Phone size={11} /> {vendor.phone}
                        </div>
                        <div style={{ fontSize: '0.68rem', fontFamily: 'monospace', color: '#64748b', marginTop: '0.15rem' }}>ID: {vendor.id}</div>
                      </td>

                      {/* 2. Category (One of 7) */}
                      <td style={{ padding: '0.75rem', minWidth: '120px' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          padding: '0.2rem 0.55rem',
                          borderRadius: '12px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          background: catMeta.bg,
                          color: catMeta.color,
                          border: `1px solid ${catMeta.border}`
                        }}>
                          <CatIcon size={12} />
                          {catMeta.label}
                        </span>
                      </td>

                      {/* 3. Onboarding Channel & Officer */}
                      <td style={{ padding: '0.75rem', minWidth: '170px' }}>
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          padding: '0.15rem 0.55rem',
                          borderRadius: '12px',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          background: isDirect ? '#ecfdf5' : isManager ? '#faf5ff' : '#fffbeb',
                          color: isDirect ? '#059669' : isManager ? '#7c3aed' : '#d97706',
                          border: `1px solid ${isDirect ? '#a7f3d0' : isManager ? '#e9d5ff' : '#fde68a'}`
                        }}>
                          {isDirect ? <UserCheck size={11} /> : isManager ? <UsersRound size={11} /> : <Briefcase size={11} />}
                          {vendor.officerName}
                        </div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                          Joined: {vendor.onboardingDate}
                        </div>
                      </td>

                      {/* 4. Territory (State, District, Division, Pincode) */}
                      <td style={{ padding: '0.75rem', minWidth: '190px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600, color: 'var(--text-main)', fontSize: '0.78rem' }}>
                          <MapPin size={12} color="#0284c7" />
                          <span>{vendor.territory.state} &gt; {vendor.territory.district}</span>
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                          {vendor.territory.division}
                        </div>
                        <div style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: '#d97706', fontWeight: 600 }}>
                          PIN: {vendor.territory.pincode}
                        </div>
                      </td>

                      {/* 5. Approving Sub Admin (Name & Mobile Number & Level) */}
                      <td style={{ padding: '0.75rem', minWidth: '200px' }}>
                        {isDirect ? (
                          <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: '0.25rem 0.6rem',
                            borderRadius: '10px',
                            background: '#f1f5f9',
                            border: '1px solid #e2e8f0',
                            color: '#64748b',
                            fontSize: '0.72rem',
                            fontWeight: 600
                          }}>
                            — Not Applicable (Direct)
                          </div>
                        ) : (
                          <>
                            <div style={{ fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                              <Shield size={12} color={subAdminLevelMeta.color} />
                              <span>{vendor.subAdminApproval.subAdminName}</span>
                            </div>
                            <div style={{ fontSize: '0.74rem', color: '#0284c7', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.15rem', fontWeight: 600 }}>
                              <Phone size={11} />
                              <span>{vendor.subAdminApproval.subAdminMobile}</span>
                            </div>
                            <div style={{ marginTop: '0.25rem' }}>
                              <span style={{
                                padding: '0.1rem 0.45rem',
                                borderRadius: '8px',
                                fontSize: '0.65rem',
                                fontWeight: 700,
                                background: subAdminLevelMeta.bg,
                                color: subAdminLevelMeta.color,
                                border: `1px solid ${subAdminLevelMeta.border}`
                              }}>
                                {subAdminLevelMeta.label}
                              </span>
                            </div>
                          </>
                        )}
                      </td>

                      {/* 6. KYC & Status (Merged) */}
                      <td style={{ padding: '0.75rem', minWidth: '170px' }}>
                        {vendor.kycStatus === 'VERIFIED' && vendor.status === 'ACTIVE' ? (
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            padding: '0.25rem 0.65rem',
                            borderRadius: '12px',
                            fontSize: '0.74rem',
                            fontWeight: 700,
                            background: '#ecfdf5',
                            color: '#059669',
                            border: '1px solid #a7f3d0'
                          }}>
                            ✓ Verified • Active
                          </span>
                        ) : vendor.kycStatus === 'REUPLOAD_NEEDED' ? (
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            padding: '0.25rem 0.65rem',
                            borderRadius: '12px',
                            fontSize: '0.74rem',
                            fontWeight: 700,
                            background: '#fffbeb',
                            color: '#d97706',
                            border: '1px solid #fde68a'
                          }}>
                            ⚠ Re-upload • Pending
                          </span>
                        ) : (
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            padding: '0.25rem 0.65rem',
                            borderRadius: '12px',
                            fontSize: '0.74rem',
                            fontWeight: 700,
                            background: '#f0f9ff',
                            color: '#0284c7',
                            border: '1px solid #bae6fd'
                          }}>
                            ⏳ Under Review • Pending
                          </span>
                        )}
                      </td>

                      {/* 8. Actions (Profile & View Registration) */}
                      <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'flex-end' }}>
                          <button
                            className="btn btn-secondary"
                            onClick={() => setSelectedVendorForProfile(vendor)}
                            style={{ padding: '0.3rem 0.55rem', fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                            title="View Basic Profile Details"
                          >
                            <User size={12} /> Profile
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={() => setSelectedVendorForRegistration(vendor)}
                            style={{ padding: '0.3rem 0.6rem', fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                            title="View Complete Registration & Documents"
                          >
                            <Eye size={12} /> View
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* HEADING 2: VENDOR OPERATIONS (KYC, QUERIES & PAYMENTS)                     */}
      {/* ========================================================================= */}
      {activeTab === 'OPERATIONS' && (
        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px', borderLeft: '4px solid #10b981' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.85rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <FileCheck size={22} color="#10b981" />
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  2. Vendor Operations Hub (KYC, Queries & Payment Related Issues)
                </h3>
              </div>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Triage incoming vendor requests: <strong>New Onboarding KYC Approvals</strong> (post-registration document checks & Go-Live), <strong>Active Vendor Queries</strong>, and <strong>Financial Settlement Disputes</strong>.
              </p>
            </div>

            {/* Sub-stream filter pills */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {[
                { id: 'KYC_QUEUE', label: `1. New KYC Queue (${kycRequests.length})`, color: '#0284c7' },
                { id: 'QUERIES', label: `2. Vendor Queries (${vendorQueries.length})`, color: '#7c3aed' },
                { id: 'PAYMENTS', label: `3. Settlement Disputes (${paymentDisputes.length})`, color: '#d97706' }
              ].map(st => {
                const isSelected = opsSubStream === st.id;
                return (
                  <button
                    key={st.id}
                    onClick={() => setOpsSubStream(st.id as OpsSubStream)}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: isSelected ? 700 : 500,
                      background: isSelected ? `${st.color}20` : 'rgba(0,0,0,0.04)',
                      color: isSelected ? st.color : 'var(--text-muted)',
                      border: isSelected ? `1.5px solid ${st.color}` : '1px solid rgba(0,0,0,0.08)',
                      cursor: 'pointer'
                    }}
                  >
                    {st.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* SUB-SECTION 1: NEW ONBOARDING KYC VERIFICATION REQUESTS */}
            {opsSubStream === 'KYC_QUEUE' && (
              <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ background: '#e0f2fe', color: '#0284c7', padding: '0.35rem', borderRadius: '8px', display: 'flex' }}>
                      <FileCheck size={18} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>
                        1. New Onboarding KYC Verification Queue (Registration Completed)
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                        Vendors whose registration is submitted by Direct, Manager, or Agent — pending Support Admin KYC sign-off before store is marked Active.
                      </div>
                    </div>
                  </div>
                  <span className="badge badge-info" style={{ fontSize: '0.72rem' }}>
                    {kycRequests.filter(k => k.status !== 'APPROVED').length} Pending Go-Live
                  </span>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table className="table" style={{ width: '100%', fontSize: '0.8rem', background: '#ffffff', borderRadius: '10px' }}>
                    <thead>
                      <tr style={{ borderBottom: '1.5px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
                        <th style={{ padding: '0.7rem', width: '45px' }}>S.No</th>
                        <th style={{ padding: '0.7rem' }}>Vendor & Store</th>
                        <th style={{ padding: '0.7rem' }}>Onboarding Officer & Sub Admin</th>
                        <th style={{ padding: '0.7rem' }}>Uploaded Documents</th>
                        <th style={{ padding: '0.7rem' }}>KYC Notes</th>
                        <th style={{ padding: '0.7rem' }}>Status</th>
                        <th style={{ padding: '0.7rem', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {kycRequests.map((req, idx) => {
                        const isApproved = req.status === 'APPROVED';
                        const isReupload = req.status === 'REUPLOAD_NEEDED';
                        return (
                          <tr key={req.reqId} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '0.7rem', fontWeight: 700, color: '#64748b', fontSize: '0.82rem' }}>
                              {idx + 1}
                            </td>
                            <td style={{ padding: '0.7rem' }}>
                              <div style={{ fontWeight: 700, color: '#0f172a' }}>{req.storeName}</div>
                              <div style={{ fontSize: '0.74rem', color: '#475569', marginTop: '0.15rem' }}>{req.ownerName}</div>
                              <div style={{ fontSize: '0.72rem', color: '#0284c7', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.1rem', fontWeight: 600 }}>
                                <Phone size={11} /> {req.phone}
                              </div>
                              <div style={{ fontSize: '0.68rem', fontFamily: 'monospace', color: '#64748b', marginTop: '0.15rem' }}>{req.vendorId} • {req.category}</div>
                            </td>
                            <td style={{ padding: '0.7rem' }}>
                              <div style={{ fontWeight: 600, color: '#0f172a' }}>{req.officerName}</div>
                              {req.onboardingSource === 'DIRECT' ? (
                                <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.15rem', fontStyle: 'italic' }}>
                                  — Not Applicable (Direct)
                                </div>
                              ) : (
                                <div style={{ fontSize: '0.72rem', color: '#7c3aed', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.15rem' }}>
                                  <Shield size={11} /> {req.subAdminName} ({req.subAdminLevel})
                                </div>
                              )}
                              <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '0.1rem' }}>Submitted: {req.submittedAt}</div>
                            </td>
                            <td style={{ padding: '0.7rem' }}>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                {req.documents.map((doc, idx) => (
                                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem' }}>
                                    <FileText size={11} color={doc.status === 'VERIFIED' ? '#059669' : doc.status === 'REJECTED' ? '#dc2626' : '#d97706'} />
                                    <span style={{ color: '#334155' }}>{doc.name}</span>
                                    <span style={{
                                      fontSize: '0.62rem',
                                      padding: '0.05rem 0.35rem',
                                      borderRadius: '4px',
                                      background: doc.status === 'VERIFIED' ? '#ecfdf5' : doc.status === 'REJECTED' ? '#fef2f2' : '#fffbeb',
                                      color: doc.status === 'VERIFIED' ? '#059669' : doc.status === 'REJECTED' ? '#dc2626' : '#d97706'
                                    }}>
                                      {doc.status}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </td>
                            <td style={{ padding: '0.7rem', maxWidth: '220px' }}>
                              <div style={{ fontSize: '0.72rem', color: '#475569', lineHeight: 1.35 }}>
                                {req.notes}
                              </div>
                            </td>
                            <td style={{ padding: '0.7rem' }}>
                              <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                                padding: '0.2rem 0.55rem',
                                borderRadius: '12px',
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                background: isApproved ? '#ecfdf5' : isReupload ? '#fffbeb' : '#f0f9ff',
                                color: isApproved ? '#059669' : isReupload ? '#d97706' : '#0284c7',
                                border: `1px solid ${isApproved ? '#a7f3d0' : isReupload ? '#fde68a' : '#bae6fd'}`
                              }}>
                                {isApproved ? '✓ Approved & Live' : isReupload ? '⚠ Re-upload Needed' : '⏳ Under Review'}
                              </span>
                            </td>
                            <td style={{ padding: '0.7rem', textAlign: 'right' }}>
                              <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                                {!isApproved && (
                                  <button
                                    className="btn btn-success"
                                    onClick={() => handleApproveKyc(req.reqId, req.vendorId, req.storeName)}
                                    style={{ padding: '0.25rem 0.55rem', fontSize: '0.7rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                                    title="Approve KYC and Activate Vendor Store"
                                  >
                                    <CheckCircle2 size={11} /> Approve & Go-Live
                                  </button>
                                )}
                                {isReupload ? (
                                  <button
                                    className="btn btn-warning"
                                    onClick={() => handleRequestReupload(req.reqId, req.storeName)}
                                    style={{ padding: '0.25rem 0.55rem', fontSize: '0.7rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                                    title="Send WhatsApp Notification Reminder"
                                  >
                                    <Send size={11} /> Prompt Re-upload
                                  </button>
                                ) : !isApproved && (
                                  <button
                                    className="btn btn-secondary"
                                    onClick={() => handleRequestReupload(req.reqId, req.storeName)}
                                    style={{ padding: '0.25rem 0.55rem', fontSize: '0.7rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                                    title="Request Fresh Documents"
                                  >
                                    <AlertTriangle size={11} /> Flag Re-upload
                                  </button>
                                )}
                                <button
                                  className="btn btn-secondary"
                                  onClick={() => {
                                    const match = vendors.find(v => v.id === req.vendorId);
                                    if (match) setSelectedVendorForRegistration(match);
                                  }}
                                  style={{ padding: '0.25rem 0.55rem', fontSize: '0.7rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                                  title="View Registration Details"
                                >
                                  <Eye size={11} /> View
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SUB-SECTION 2: AFTER-ONBOARDING OPERATIONAL QUERIES & ISSUES */}
            {opsSubStream === 'QUERIES' && (
              <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ background: '#f3e8ff', color: '#7c3aed', padding: '0.35rem', borderRadius: '8px', display: 'flex' }}>
                      <HelpCircle size={18} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>
                        2. Active Vendor Operational Queries & Technical Escalations
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                        Incoming tickets from live active vendors for catalog sync, webhooks, driver routing, and app support.
                      </div>
                    </div>
                  </div>
                  <span className="badge badge-warning" style={{ fontSize: '0.72rem' }}>
                    {vendorQueries.filter(q => q.status !== 'RESOLVED').length} Active Tickets
                  </span>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table className="table" style={{ width: '100%', fontSize: '0.8rem', background: '#ffffff', borderRadius: '10px' }}>
                    <thead>
                      <tr style={{ borderBottom: '1.5px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
                        <th style={{ padding: '0.7rem' }}>Ticket ID & Vendor</th>
                        <th style={{ padding: '0.7rem' }}>Category & Issue</th>
                        <th style={{ padding: '0.7rem' }}>Problem Description</th>
                        <th style={{ padding: '0.7rem' }}>Assigned Desk & SLA</th>
                        <th style={{ padding: '0.7rem' }}>Status</th>
                        <th style={{ padding: '0.7rem', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vendorQueries.map(q => (
                        <tr key={q.queryId} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '0.7rem' }}>
                            <div style={{ fontFamily: 'monospace', fontWeight: 800, color: '#7c3aed' }}>{q.queryId}</div>
                            <div style={{ fontWeight: 700, color: '#0f172a' }}>{q.storeName}</div>
                            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>ID: {q.vendorId} • {q.createdAt}</div>
                          </td>
                          <td style={{ padding: '0.7rem' }}>
                            <div style={{ fontWeight: 700, color: '#0284c7' }}>{q.issueType}</div>
                            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Category: {q.category}</div>
                            <span style={{
                              display: 'inline-block',
                              marginTop: '0.2rem',
                              fontSize: '0.62rem',
                              padding: '0.05rem 0.35rem',
                              borderRadius: '4px',
                              background: q.severity === 'HIGH' ? '#fef2f2' : '#fffbeb',
                              color: q.severity === 'HIGH' ? '#dc2626' : '#d97706',
                              fontWeight: 700
                            }}>
                              {q.severity} PRIORITY
                            </span>
                          </td>
                          <td style={{ padding: '0.7rem', maxWidth: '240px' }}>
                            <div style={{ fontSize: '0.74rem', color: '#334155', lineHeight: 1.35 }}>
                              {q.description}
                            </div>
                          </td>
                          <td style={{ padding: '0.7rem' }}>
                            <div style={{ fontWeight: 600, color: '#0f172a' }}>{q.assignedDesk}</div>
                            <div style={{ fontSize: '0.7rem', color: '#dc2626', fontWeight: 700, marginTop: '0.15rem' }}>
                              ⏱ {q.sla}
                            </div>
                          </td>
                          <td style={{ padding: '0.7rem' }}>
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.25rem',
                              padding: '0.2rem 0.55rem',
                              borderRadius: '12px',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              background: q.status === 'RESOLVED' ? '#ecfdf5' : q.status === 'IN_PROGRESS' ? '#eff6ff' : '#fffbeb',
                              color: q.status === 'RESOLVED' ? '#059669' : q.status === 'IN_PROGRESS' ? '#2563eb' : '#d97706',
                              border: `1px solid ${q.status === 'RESOLVED' ? '#a7f3d0' : q.status === 'IN_PROGRESS' ? '#bfdbfe' : '#fde68a'}`
                            }}>
                              {q.status}
                            </span>
                          </td>
                          <td style={{ padding: '0.7rem', textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'flex-end' }}>
                              {q.status !== 'RESOLVED' && (
                                <button
                                  className="btn btn-primary"
                                  onClick={() => handleResolveQuery(q.queryId, q.storeName)}
                                  style={{ padding: '0.25rem 0.55rem', fontSize: '0.7rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                                >
                                  <RefreshCw size={11} /> Auto-Fix / Resolve
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SUB-SECTION 3: AFTER-ONBOARDING SETTLEMENT & PAYMENT DISPUTES */}
            {opsSubStream === 'PAYMENTS' && (
              <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ background: '#fef3c7', color: '#d97706', padding: '0.35rem', borderRadius: '8px', display: 'flex' }}>
                      <CreditCard size={18} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>
                        3. Vendor Settlement & Payment Disputes (Post-Onboarding Financials)
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                        Resolution desk for vendor penalty waivers, bank account IFSC migration holds, and commission reconciliation.
                      </div>
                    </div>
                  </div>
                  <span className="badge badge-warning" style={{ fontSize: '0.72rem' }}>
                    {paymentDisputes.filter(p => p.status !== 'RESOLVED').length} Active Disputes
                  </span>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table className="table" style={{ width: '100%', fontSize: '0.8rem', background: '#ffffff', borderRadius: '10px' }}>
                    <thead>
                      <tr style={{ borderBottom: '1.5px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
                        <th style={{ padding: '0.7rem' }}>Dispute ID & Vendor</th>
                        <th style={{ padding: '0.7rem' }}>Dispute Type & Amount</th>
                        <th style={{ padding: '0.7rem' }}>Dispute Explanation & Sub Admin</th>
                        <th style={{ padding: '0.7rem' }}>Bank Reference</th>
                        <th style={{ padding: '0.7rem' }}>Status</th>
                        <th style={{ padding: '0.7rem', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentDisputes.map(dsp => (
                        <tr key={dsp.disputeId} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '0.7rem' }}>
                            <div style={{ fontFamily: 'monospace', fontWeight: 800, color: '#d97706' }}>{dsp.disputeId}</div>
                            <div style={{ fontWeight: 700, color: '#0f172a' }}>{dsp.storeName}</div>
                            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>ID: {dsp.vendorId} • {dsp.createdAt}</div>
                          </td>
                          <td style={{ padding: '0.7rem' }}>
                            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#b45309' }}>
                              ₹{dsp.disputedAmount.toLocaleString()}
                            </div>
                            <div style={{ fontSize: '0.72rem', color: '#0284c7', fontWeight: 600 }}>{dsp.issueType}</div>
                          </td>
                          <td style={{ padding: '0.7rem', maxWidth: '240px' }}>
                            <div style={{ fontSize: '0.74rem', color: '#334155', lineHeight: 1.35 }}>
                              {dsp.description}
                            </div>
                            <div style={{ fontSize: '0.7rem', color: '#7c3aed', marginTop: '0.2rem', fontWeight: 600 }}>
                              Assigned: {dsp.subAdminName}
                            </div>
                          </td>
                          <td style={{ padding: '0.7rem' }}>
                            <div style={{ fontFamily: 'monospace', fontSize: '0.74rem', color: '#64748b' }}>{dsp.bankRef}</div>
                          </td>
                          <td style={{ padding: '0.7rem' }}>
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.25rem',
                              padding: '0.2rem 0.55rem',
                              borderRadius: '12px',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              background: dsp.status === 'RESOLVED' ? '#ecfdf5' : dsp.status === 'ON_HOLD' ? '#fef2f2' : '#fffbeb',
                              color: dsp.status === 'RESOLVED' ? '#059669' : dsp.status === 'ON_HOLD' ? '#dc2626' : '#d97706',
                              border: `1px solid ${dsp.status === 'RESOLVED' ? '#a7f3d0' : dsp.status === 'ON_HOLD' ? '#fecaca' : '#fde68a'}`
                            }}>
                              {dsp.status}
                            </span>
                          </td>
                          <td style={{ padding: '0.7rem', textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'flex-end' }}>
                              {dsp.status !== 'RESOLVED' && (
                                <button
                                  className="btn btn-warning"
                                  onClick={() => handleApproveWaiver(dsp.disputeId, dsp.storeName, dsp.disputedAmount)}
                                  style={{ padding: '0.25rem 0.55rem', fontSize: '0.7rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                                >
                                  <CheckCircle2 size={11} /> Approve & Credit
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* HEADING 3: TICKET ROUTING & RESOLUTION HISTORY                            */}
      {/* ========================================================================= */}
      {activeTab === 'HISTORY' && (
        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px', borderLeft: '4px solid #a855f7' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <History size={22} color="#a855f7" />
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  3. Ticket Routing & Resolution History
                </h3>
              </div>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Audit ledger showing which team received each ticket, who attended it (Human TL or AI Resolver), resolution status, turnaround time (TAT), and complete case notes.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>
                {historyRecords.filter(h => h.status === 'RESOLVED').length} Resolved
              </span>
              <span className="badge badge-warning" style={{ fontSize: '0.75rem' }}>
                {historyRecords.filter(h => h.status === 'PENDING').length} Pending
              </span>
              <span className="badge badge-danger" style={{ fontSize: '0.75rem' }}>
                {historyRecords.filter(h => h.status === 'ESCALATED_TO_SUPPORT_ADMIN').length} Escalated
              </span>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="table" style={{ width: '100%', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ borderBottom: '1.5px solid rgba(0,0,0,0.1)', textAlign: 'left', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem' }}>Ticket ID & Date</th>
                  <th style={{ padding: '0.75rem' }}>Vendor</th>
                  <th style={{ padding: '0.75rem' }}>Issue Subject</th>
                  <th style={{ padding: '0.75rem' }}>Assigned Team</th>
                  <th style={{ padding: '0.75rem' }}>Attended By</th>
                  <th style={{ padding: '0.75rem' }}>Status & Resolution</th>
                  <th style={{ padding: '0.75rem' }}>Turnaround (TAT)</th>
                </tr>
              </thead>
              <tbody>
                {historyRecords.map(rec => {
                  const isResolved = rec.status === 'RESOLVED';
                  const isEscalated = rec.status === 'ESCALATED_TO_SUPPORT_ADMIN';

                  return (
                    <tr key={rec.ticketId} style={{ borderBottom: '1px solid var(--border-color, rgba(0,0,0,0.06))' }}>
                      {/* Ticket ID */}
                      <td style={{ padding: '0.75rem' }}>
                        <div style={{ fontFamily: 'monospace', fontWeight: 800, color: '#0284c7' }}>{rec.ticketId}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{rec.createdAt}</div>
                      </td>

                      {/* Vendor */}
                      <td style={{ padding: '0.75rem' }}>
                        <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{rec.vendorName}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ID: {rec.vendorId}</div>
                      </td>

                      {/* Issue */}
                      <td style={{ padding: '0.75rem', maxWidth: '240px' }}>
                        <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{rec.issueTitle}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                          {rec.resolutionNotes}
                        </div>
                      </td>

                      {/* Assigned Team */}
                      <td style={{ padding: '0.75rem' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', color: '#7c3aed', fontWeight: 600 }}>
                          <Shield size={12} />
                          {rec.assignedTeam}
                        </div>
                      </td>

                      {/* Attended By */}
                      <td style={{ padding: '0.75rem' }}>
                        <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{rec.attendedBy}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Attended at: {rec.attendedAt}</div>
                      </td>

                      {/* Status */}
                      <td style={{ padding: '0.75rem' }}>
                        <span className={`badge ${isResolved ? 'badge-success' : isEscalated ? 'badge-danger' : 'badge-warning'}`} style={{ fontSize: '0.72rem' }}>
                          {isResolved ? '✓ Resolved' : isEscalated ? '⚠ Escalated to Support Admin' : '⏳ In Progress'}
                        </span>
                      </td>

                      {/* Turnaround Time */}
                      <td style={{ padding: '0.75rem' }}>
                        <div style={{ fontWeight: 700, color: isResolved ? '#059669' : '#d97706', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Clock size={12} /> {rec.resolutionTimeMinutes} mins
                        </div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{rec.auditBadge}</div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* HEADING 4: VENDOR PAYROLL & PAYOUT SETTLEMENT LEDGER                      */}
      {/* ========================================================================= */}
      {activeTab === 'PAYROLL' && (
        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px', borderLeft: '4px solid #fbbf24' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <DollarSign size={22} color="#fbbf24" />
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  4. Vendor Payroll & Payout Settlement Ledger
                </h3>
              </div>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Comprehensive financial ledger for vendor settlements: <strong>Gross Collections</strong>, <strong>Platform Commission</strong>, <strong>Statutory TDS (Sec 194-O)</strong>, <strong>Adjustments</strong>, and <strong>Net Bank Payout</strong>.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <div style={{ background: 'var(--bg-surface-hover, rgba(0,0,0,0.04))', padding: '0.45rem 0.85rem', borderRadius: '10px', textAlign: 'right', border: '1px solid var(--border-color, rgba(0,0,0,0.08))' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Pending Disbursements</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#d97706' }}>
                  {payrollRecords.filter(p => p.payoutStatus === 'PENDING_RELEASE').length} Batches
                </div>
              </div>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="table" style={{ width: '100%', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ borderBottom: '1.5px solid rgba(0,0,0,0.1)', textAlign: 'left', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem' }}>Payroll ID & Period</th>
                  <th style={{ padding: '0.75rem' }}>Vendor Details</th>
                  <th style={{ padding: '0.75rem' }}>Banking & Tax Info</th>
                  <th style={{ padding: '0.75rem' }}>Gross Sales</th>
                  <th style={{ padding: '0.75rem' }}>Deductions (Fee + TDS)</th>
                  <th style={{ padding: '0.75rem' }}>Net Payout (₹)</th>
                  <th style={{ padding: '0.75rem' }}>Status & UTR</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {payrollRecords.map(pay => {
                  const isDisbursed = pay.payoutStatus === 'DISBURSED';
                  const isPending = pay.payoutStatus === 'PENDING_RELEASE';

                  return (
                    <tr key={pay.payrollId} style={{ borderBottom: '1px solid var(--border-color, rgba(0,0,0,0.06))' }}>
                      {/* ID & Period */}
                      <td style={{ padding: '0.75rem' }}>
                        <div style={{ fontFamily: 'monospace', fontWeight: 800, color: '#d97706' }}>{pay.payrollId}</div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{pay.payPeriod}</div>
                      </td>

                      {/* Vendor */}
                      <td style={{ padding: '0.75rem' }}>
                        <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{pay.vendorName}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Beneficiary: {pay.ownerName}</div>
                        <div style={{ fontSize: '0.68rem', fontFamily: 'monospace', color: 'var(--text-muted)' }}>ID: {pay.vendorId}</div>
                      </td>

                      {/* Bank & Tax */}
                      <td style={{ padding: '0.75rem' }}>
                        <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{pay.bankName} ({pay.accountNumber})</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>IFSC: {pay.ifscCode}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>PAN: {pay.panNumber} • GST: {pay.gstin}</div>
                      </td>

                      {/* Gross */}
                      <td style={{ padding: '0.75rem', fontWeight: 700, color: 'var(--text-main)' }}>
                        ₹{pay.grossCollections.toLocaleString()}
                      </td>

                      {/* Deductions */}
                      <td style={{ padding: '0.75rem' }}>
                        <div style={{ fontSize: '0.74rem', color: '#dc2626' }}>
                          Comm ({pay.platformCommissionPercent}%): -₹{pay.platformCommissionAmount.toLocaleString()}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: '#d97706' }}>
                          TDS ({pay.tdsPercent}%): -₹{pay.tdsAmount.toLocaleString()}
                        </div>
                        {pay.adjustments > 0 && (
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                            Adj: -₹{pay.adjustments.toLocaleString()}
                          </div>
                        )}
                      </td>

                      {/* Net */}
                      <td style={{ padding: '0.75rem' }}>
                        <div style={{ fontSize: '1rem', fontWeight: 800, color: '#059669' }}>
                          ₹{pay.netPayable.toLocaleString()}
                        </div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Via {pay.gateway}</div>
                      </td>

                      {/* Status & UTR */}
                      <td style={{ padding: '0.75rem' }}>
                        <span className={`badge ${isDisbursed ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.7rem' }}>
                          {pay.payoutStatus}
                        </span>
                        {pay.utrNumber && (
                          <div style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: '#0284c7', marginTop: '0.2rem', fontWeight: 700 }}>
                            UTR: {pay.utrNumber}
                          </div>
                        )}
                        {pay.disbursedAt && (
                          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{pay.disbursedAt}</div>
                        )}
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                          {isPending && (
                            <button
                              className="btn btn-success"
                              onClick={() => setPayoutModalData(pay)}
                              style={{ padding: '0.25rem 0.6rem', fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                            >
                              <DollarSign size={11} /> Release
                            </button>
                          )}
                          <button
                            className="btn btn-secondary"
                            onClick={() => showToast(`Downloaded Payslip PDF for ${pay.vendorName}`)}
                            style={{ padding: '0.25rem 0.5rem', fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                            title="Download Settlement Invoice"
                          >
                            <Download size={11} /> Payslip
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* POPUP 1: BASIC PROFILE DETAILS MODAL (LIGHT THEME & FULL SCREEN CENTERED)  */}
      {/* ========================================================================= */}
      {selectedVendorForProfile && createPortal(
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(15, 23, 42, 0.55)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999999,
          padding: '1.25rem',
          boxSizing: 'border-box'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '640px',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '1.75rem',
            boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.25), 0 0 1px rgba(15, 23, 42, 0.15)',
            border: '1.5px solid #cbd5e1',
            boxSizing: 'border-box'
          }}>
            
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1.5px solid #e2e8f0', paddingBottom: '0.9rem', marginBottom: '1.25rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', color: '#0284c7', fontWeight: 800, background: '#f0f9ff', border: '1px solid #bae6fd', padding: '0.15rem 0.5rem', borderRadius: '6px' }}>
                    {selectedVendorForProfile.id}
                  </span>
                  <span className={`badge ${selectedVendorForProfile.status === 'ACTIVE' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.7rem' }}>
                    {selectedVendorForProfile.status}
                  </span>
                </div>
                <h3 style={{ margin: '0.35rem 0 0 0', color: '#0f172a', fontSize: '1.35rem', fontWeight: 800 }}>
                  {selectedVendorForProfile.storeName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedVendorForProfile(null)}
                style={{
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  color: '#475569',
                  cursor: 'pointer',
                  padding: '0.35rem 0.5rem',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Aligned 2-Column Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              
              {/* Card 1: Owner & Contact */}
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.75rem', color: '#0284c7', textTransform: 'uppercase', fontWeight: 800, marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <User size={13} /> Owner & Contact
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.82rem' }}>
                  <div><span style={{ color: '#64748b' }}>Owner:</span> <strong style={{ color: '#0f172a' }}>{selectedVendorForProfile.ownerName}</strong></div>
                  <div><span style={{ color: '#64748b' }}>Phone:</span> <strong style={{ color: '#0284c7' }}>{selectedVendorForProfile.phone}</strong></div>
                  <div><span style={{ color: '#64748b' }}>Email:</span> <span style={{ color: '#334155' }}>{selectedVendorForProfile.email}</span></div>
                  <div>
                    <span style={{ color: '#64748b' }}>Category:</span>{' '}
                    <strong style={{ color: getCategoryMeta(selectedVendorForProfile.category).color }}>
                      {getCategoryMeta(selectedVendorForProfile.category).label}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Card 2: Territory Breakdown */}
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.75rem', color: '#059669', textTransform: 'uppercase', fontWeight: 800, marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <MapPin size={13} /> Territory Hierarchy
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.82rem' }}>
                  <div><span style={{ color: '#64748b' }}>State:</span> <strong style={{ color: '#0f172a' }}>{selectedVendorForProfile.territory.state}</strong></div>
                  <div><span style={{ color: '#64748b' }}>District:</span> <strong style={{ color: '#0f172a' }}>{selectedVendorForProfile.territory.district}</strong></div>
                  <div><span style={{ color: '#64748b' }}>Division:</span> <span style={{ color: '#334155' }}>{selectedVendorForProfile.territory.division}</span></div>
                  <div><span style={{ color: '#64748b' }}>Pincode:</span> <strong style={{ color: '#d97706' }}>{selectedVendorForProfile.territory.pincode}</strong></div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.2rem' }}>
                    {selectedVendorForProfile.territory.address}
                  </div>
                </div>
              </div>

              {/* Card 3: Onboarding Channel */}
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.75rem', color: '#7c3aed', textTransform: 'uppercase', fontWeight: 800, marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Briefcase size={13} /> Onboarding Channel
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.82rem' }}>
                  <div><span style={{ color: '#64748b' }}>Source:</span> <strong style={{ color: '#0f172a' }}>{selectedVendorForProfile.onboardingSource}</strong></div>
                  <div><span style={{ color: '#64748b' }}>Officer:</span> <strong style={{ color: '#7c3aed' }}>{selectedVendorForProfile.officerName}</strong></div>
                  <div><span style={{ color: '#64748b' }}>Onboarding Date:</span> <span style={{ color: '#334155' }}>{selectedVendorForProfile.onboardingDate}</span></div>
                  <div><span style={{ color: '#64748b' }}>KYC Status:</span> <strong style={{ color: selectedVendorForProfile.kycStatus === 'VERIFIED' ? '#059669' : '#d97706' }}>{selectedVendorForProfile.kycStatus}</strong></div>
                </div>
              </div>

              {/* Card 4: Approving Sub Admin */}
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.75rem', color: '#d97706', textTransform: 'uppercase', fontWeight: 800, marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Shield size={13} /> Approving Sub Admin
                </div>
                {selectedVendorForProfile.onboardingSource === 'DIRECT' ? (
                  <div style={{
                    padding: '0.65rem 0.85rem',
                    background: '#f1f5f9',
                    borderRadius: '8px',
                    color: '#64748b',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    border: '1px dashed #cbd5e1'
                  }}>
                    — Not Applicable (Direct Onboarding does not require Sub Admin approval)
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.82rem' }}>
                    <div><span style={{ color: '#64748b' }}>Name:</span> <strong style={{ color: '#0f172a' }}>{selectedVendorForProfile.subAdminApproval.subAdminName}</strong></div>
                    <div><span style={{ color: '#64748b' }}>Mobile:</span> <strong style={{ color: '#0284c7' }}>{selectedVendorForProfile.subAdminApproval.subAdminMobile}</strong></div>
                    <div><span style={{ color: '#64748b' }}>Level:</span> <span style={{ color: '#d97706', fontWeight: 700 }}>{selectedVendorForProfile.subAdminApproval.subAdminTitle}</span></div>
                    <div><span style={{ color: '#64748b' }}>Approved At:</span> <span style={{ color: '#334155', fontSize: '0.74rem' }}>{selectedVendorForProfile.subAdminApproval.approvedAt}</span></div>
                  </div>
                )}
              </div>

            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                onClick={() => setSelectedVendorForProfile(null)}
                style={{
                  background: '#ffffff',
                  border: '1.5px solid #cbd5e1',
                  color: '#334155',
                  fontWeight: 600,
                  padding: '0.55rem 1.25rem',
                  borderRadius: '10px',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
              <button
                onClick={() => {
                  const v = selectedVendorForProfile;
                  setSelectedVendorForProfile(null);
                  setSelectedVendorForRegistration(v);
                }}
                style={{
                  background: 'linear-gradient(135deg, #002b7f, #1e40af)',
                  color: '#ffffff',
                  border: 'none',
                  fontWeight: 700,
                  padding: '0.55rem 1.35rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  boxShadow: '0 4px 14px rgba(0, 43, 127, 0.25)'
                }}
              >
                <Eye size={14} /> View Full Registration & Documents
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ========================================================================= */}
      {/* POPUP 2: FULL VENDOR REGISTRATION DOSSIER & DOCUMENTS (LIGHT THEME)        */}
      {/* ========================================================================= */}
      {selectedVendorForRegistration && createPortal(
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(15, 23, 42, 0.55)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999999,
          padding: '1.5rem',
          boxSizing: 'border-box'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '840px',
            maxHeight: '90vh',
            overflowY: 'auto',
            backgroundColor: '#ffffff',
            borderRadius: '18px',
            padding: '1.85rem',
            boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.25), 0 0 1px rgba(15, 23, 42, 0.15)',
            border: '1.5px solid #cbd5e1',
            boxSizing: 'border-box'
          }}>
            
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1.5px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#0284c7', fontWeight: 800, background: '#f0f9ff', border: '1px solid #bae6fd', padding: '0.2rem 0.55rem', borderRadius: '6px' }}>
                    {selectedVendorForRegistration.id}
                  </span>
                  <span style={{
                    padding: '0.2rem 0.6rem',
                    borderRadius: '12px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    background: getCategoryMeta(selectedVendorForRegistration.category).bg,
                    color: getCategoryMeta(selectedVendorForRegistration.category).color,
                    border: `1px solid ${getCategoryMeta(selectedVendorForRegistration.category).border}`
                  }}>
                    {getCategoryMeta(selectedVendorForRegistration.category).label} Category
                  </span>
                  <span className={`badge ${selectedVendorForRegistration.status === 'ACTIVE' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.72rem' }}>
                    {selectedVendorForRegistration.status}
                  </span>
                </div>
                <h2 style={{ margin: '0.45rem 0 0.15rem 0', color: '#0f172a', fontSize: '1.45rem', fontWeight: 800 }}>
                  {selectedVendorForRegistration.storeName} — Registration Dossier
                </h2>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Legal: <strong>{selectedVendorForRegistration.registrationDetails.legalBusinessName}</strong> • Applied: {selectedVendorForRegistration.registrationDetails.appliedDate}
                </div>
              </div>
              <button
                onClick={() => setSelectedVendorForRegistration(null)}
                style={{
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  color: '#475569',
                  cursor: 'pointer',
                  padding: '0.4rem 0.55rem',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Approving Sub Admin Alert Box */}
            <div style={{
              background: 'linear-gradient(135deg, #f5f3ff 0%, #eff6ff 100%)',
              border: '1.5px solid #c7d2fe',
              borderRadius: '12px',
              padding: '1rem 1.25rem',
              marginBottom: '1.35rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.75rem', fontWeight: 800, color: '#4338ca', textTransform: 'uppercase' }}>
                  <ShieldCheck size={16} color="#6366f1" /> Sub Admin Approval Verification Record
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e1b4b', marginTop: '0.25rem' }}>
                  Approved by: <strong>{selectedVendorForRegistration.subAdminApproval.subAdminName}</strong> ({selectedVendorForRegistration.subAdminApproval.subAdminTitle})
                </div>
                <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '0.2rem' }}>
                  {selectedVendorForRegistration.subAdminApproval.notes}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Contact Number:</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0284c7' }}>
                  {selectedVendorForRegistration.subAdminApproval.subAdminMobile}
                </div>
                <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '0.15rem' }}>
                  Approved: {selectedVendorForRegistration.subAdminApproval.approvedAt}
                </div>
              </div>
            </div>

            {/* Registration Data Sections */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
              
              {/* Box 1: Business Identification */}
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.75rem', color: '#0284c7', textTransform: 'uppercase', fontWeight: 800, marginBottom: '0.6rem' }}>
                  Business Identification
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem' }}>
                  <div><span style={{ color: '#64748b' }}>Type:</span> <strong style={{ color: '#0f172a' }}>{selectedVendorForRegistration.registrationDetails.businessType}</strong></div>
                  <div><span style={{ color: '#64748b' }}>GSTIN:</span> <strong style={{ color: '#059669', fontFamily: 'monospace' }}>{selectedVendorForRegistration.registrationDetails.gstin}</strong></div>
                  <div><span style={{ color: '#64748b' }}>PAN:</span> <strong style={{ color: '#d97706', fontFamily: 'monospace' }}>{selectedVendorForRegistration.registrationDetails.panNumber}</strong></div>
                  <div><span style={{ color: '#64748b' }}>Trade Name:</span> <span style={{ color: '#0f172a' }}>{selectedVendorForRegistration.registrationDetails.tradeName}</span></div>
                </div>
              </div>

              {/* Box 2: Territory Hierarchy */}
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.75rem', color: '#059669', textTransform: 'uppercase', fontWeight: 800, marginBottom: '0.6rem' }}>
                  Territory Hierarchy
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem' }}>
                  <div><span style={{ color: '#64748b' }}>State:</span> <strong style={{ color: '#0f172a' }}>{selectedVendorForRegistration.territory.state}</strong></div>
                  <div><span style={{ color: '#64748b' }}>District:</span> <strong style={{ color: '#0f172a' }}>{selectedVendorForRegistration.territory.district}</strong></div>
                  <div><span style={{ color: '#64748b' }}>Division:</span> <span style={{ color: '#0f172a' }}>{selectedVendorForRegistration.territory.division}</span></div>
                  <div><span style={{ color: '#64748b' }}>Pincode:</span> <strong style={{ color: '#d97706' }}>{selectedVendorForRegistration.territory.pincode}</strong></div>
                </div>
              </div>

              {/* Box 3: Settlement Bank Account */}
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.75rem', color: '#d97706', textTransform: 'uppercase', fontWeight: 800, marginBottom: '0.6rem' }}>
                  Settlement Banking
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem' }}>
                  <div><span style={{ color: '#64748b' }}>Bank:</span> <strong style={{ color: '#0f172a' }}>{selectedVendorForRegistration.registrationDetails.bankName}</strong></div>
                  <div><span style={{ color: '#64748b' }}>Account No:</span> <strong style={{ color: '#0f172a', fontFamily: 'monospace' }}>{selectedVendorForRegistration.registrationDetails.accountNumber}</strong></div>
                  <div><span style={{ color: '#64748b' }}>IFSC Code:</span> <strong style={{ color: '#0284c7', fontFamily: 'monospace' }}>{selectedVendorForRegistration.registrationDetails.ifscCode}</strong></div>
                  <div><span style={{ color: '#64748b' }}>Officer:</span> <strong style={{ color: '#7c3aed' }}>{selectedVendorForRegistration.officerName}</strong></div>
                </div>
              </div>

            </div>

            {/* Uploaded Documents List */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <FileText size={17} color="#0284c7" /> Uploaded Registration Documents ({selectedVendorForRegistration.documents.length})
                </div>
                <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                  All Key Documents Uploaded
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                {selectedVendorForRegistration.documents.map((doc, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: '#ffffff',
                      border: '1.5px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '0.75rem 1rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '0.75rem',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '8px',
                        background: doc.type === 'PDF' ? '#fee2e2' : '#e0f2fe',
                        color: doc.type === 'PDF' ? '#dc2626' : '#0284c7',
                        border: `1px solid ${doc.type === 'PDF' ? '#fecaca' : '#bae6fd'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '0.75rem'
                      }}>
                        {doc.type}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>{doc.name}</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                          Size: {doc.fileSize} • Uploaded on {doc.uploadDate}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <span style={{
                        padding: '0.2rem 0.55rem',
                        borderRadius: '8px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        background: doc.status === 'VERIFIED' ? '#dcfce7' : '#fef3c7',
                        color: doc.status === 'VERIFIED' ? '#15803d' : '#b45309',
                        border: `1px solid ${doc.status === 'VERIFIED' ? '#bbf7d0' : '#fde68a'}`
                      }}>
                        {doc.status === 'VERIFIED' ? '✓ Verified' : 'Under Review'}
                      </span>
                      <button
                        onClick={() => showToast(`Previewing verified document: ${doc.name}`)}
                        style={{
                          background: '#f8fafc',
                          border: '1.5px solid #cbd5e1',
                          color: '#334155',
                          fontWeight: 600,
                          padding: '0.35rem 0.75rem',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}
                      >
                        <Eye size={13} /> Preview
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', borderTop: '1.5px solid #e2e8f0', paddingTop: '1.25rem' }}>
              <button
                onClick={() => setSelectedVendorForRegistration(null)}
                style={{
                  background: '#ffffff',
                  border: '1.5px solid #cbd5e1',
                  color: '#334155',
                  fontWeight: 600,
                  padding: '0.55rem 1.25rem',
                  borderRadius: '10px',
                  cursor: 'pointer'
                }}
              >
                Close Dossier
              </button>
              <button
                onClick={() => {
                  showToast(`Vendor registration dossier for ${selectedVendorForRegistration.storeName} verified and locked.`);
                  setSelectedVendorForRegistration(null);
                }}
                style={{
                  background: 'linear-gradient(135deg, #059669, #047857)',
                  color: '#ffffff',
                  border: 'none',
                  fontWeight: 700,
                  padding: '0.55rem 1.35rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  boxShadow: '0 4px 14px rgba(5, 150, 105, 0.25)'
                }}
              >
                <Check size={14} /> Confirm Verification
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ========================================================================= */}
      {/* POPUP 3: RELEASE PAYOUT CONFIRMATION (LIGHT THEME)                        */}
      {/* ========================================================================= */}
      {payoutModalData && createPortal(
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(15, 23, 42, 0.55)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999999,
          padding: '1.25rem',
          boxSizing: 'border-box'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '500px',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '1.75rem',
            boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.25), 0 0 1px rgba(15, 23, 42, 0.15)',
            border: '1.5px solid #cbd5e1',
            boxSizing: 'border-box'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#059669', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', fontWeight: 800 }}>
              <DollarSign size={22} /> Authorize & Release Vendor Payout
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1.25rem' }}>
              Support Admin authorization to trigger bank disbursement for <strong>{payoutModalData.vendorName}</strong>.
            </p>

            <div style={{ background: '#ecfdf5', border: '1.5px solid #a7f3d0', padding: '1.15rem', borderRadius: '12px', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 600 }}>Net Settlement Amount:</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#059669', margin: '0.2rem 0' }}>₹{payoutModalData.netPayable.toLocaleString()}</div>
              <div style={{ fontSize: '0.82rem', color: '#0f172a', fontWeight: 600 }}>
                Bank: {payoutModalData.bankName} ({payoutModalData.accountNumber}) • IFSC: {payoutModalData.ifscCode}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>Beneficiary: {payoutModalData.ownerName} • Period: {payoutModalData.payPeriod}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                onClick={() => setPayoutModalData(null)}
                style={{
                  background: '#ffffff',
                  border: '1.5px solid #cbd5e1',
                  color: '#334155',
                  fontWeight: 600,
                  padding: '0.55rem 1.15rem',
                  borderRadius: '10px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleReleasePayout(payoutModalData)}
                style={{
                  background: 'linear-gradient(135deg, #059669, #047857)',
                  color: '#ffffff',
                  border: 'none',
                  fontWeight: 700,
                  padding: '0.55rem 1.25rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(5, 150, 105, 0.25)'
                }}
              >
                Authorize & Disburse Payout
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
};
