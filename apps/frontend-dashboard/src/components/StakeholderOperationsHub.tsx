import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
  Users,
  Briefcase,
  UsersRound,
  Shield,
  Truck,
  Wrench,
  UserCheck,
  Building2,
  FileCheck,
  CreditCard,
  HelpCircle,
  History,
  DollarSign,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Eye,
  Send,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Layers,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  FileText,
  User,
  Plus,
  RefreshCw,
  X,
  Check,
  Tag,
  Award,
  Crown
} from 'lucide-react';

export type StakeholderType =
  | 'AGENT'
  | 'MANAGER'
  | 'SUBADMIN'
  | 'DELIVERY_PARTNER'
  | 'TECHNICIAN'
  | 'SUPPORT_STAFF';

export type StakeholderTab = 'DIRECTORY' | 'OPERATIONS' | 'HISTORY' | 'PAYROLL';
export type OpsSubStream = 'KYC_QUEUE' | 'QUERIES' | 'PAYMENTS';
export type StakeholderLevel = 'STATE' | 'DISTRICT' | 'DIVISION' | 'PINCODE';

export interface StakeholderTerritory {
  state: string;
  district: string;
  division: string;
  pincode: string;
  address?: string;
}

export interface StakeholderApprovalInfo {
  isApproved: boolean;
  approverName: string;
  approverMobile: string;
  approverRole: 'MAIN_ADMIN' | 'SUB_ADMIN' | 'SUPPORT_ADMIN' | 'SYSTEM_AUTO';
  approvedAt: string;
  notes?: string;
}

export interface StakeholderDoc {
  name: string;
  type: string;
  status: 'VERIFIED' | 'UNDER_REVIEW' | 'REJECTED';
  fileSize: string;
  uploadDate: string;
}

export interface StakeholderRecord {
  id: string; // Reg ID
  type: StakeholderType;
  name: string;
  phone: string;
  email: string;
  onboardingSource: 'DIRECT' | 'SUB_ADMIN' | 'MAIN_ADMIN' | 'SUPPORT_ADMIN';
  onboardedBy: string; // Direct / Sub Admin Name / Main Admin / Support Admin
  territory: StakeholderTerritory;
  approval: StakeholderApprovalInfo;
  level: StakeholderLevel; // State / District / Division / Pincode
  roleTitle: string; // Agent / Territory Manager / State Sub Admin / Delivery Partner / Electrical Tech / KYC Specialist
  status: 'ACTIVE' | 'PENDING_APPROVAL' | 'SUSPENDED';
  kycStatus: 'VERIFIED' | 'UNDER_REVIEW' | 'REUPLOAD_NEEDED';
  joinedDate: string;
  registrationDetails: {
    legalName: string;
    panNumber: string;
    aadhaarNumber: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    qualification?: string;
    emergencyContact?: string;
    appliedDate: string;
  };
  documents: StakeholderDoc[];
}

export interface StakeholderKycRequest {
  reqId: string;
  stakeholderId: string;
  stakeholderType: StakeholderType;
  name: string;
  phone: string;
  roleTitle: string;
  onboardingSource: 'DIRECT' | 'SUB_ADMIN' | 'MAIN_ADMIN' | 'SUPPORT_ADMIN';
  onboardedBy: string;
  approvalInfo: string;
  submittedAt: string;
  status: 'UNDER_REVIEW' | 'REUPLOAD_NEEDED' | 'APPROVED';
  notes: string;
  documents: { name: string; status: 'VERIFIED' | 'UNDER_REVIEW' | 'REJECTED' }[];
}

export interface StakeholderQueryIssue {
  queryId: string;
  stakeholderId: string;
  stakeholderType: StakeholderType;
  name: string;
  phone: string;
  roleTitle: string;
  issueType: string;
  description: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  assignedDesk: string;
  sla: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  createdAt: string;
}

export interface StakeholderPaymentDispute {
  disputeId: string;
  stakeholderId: string;
  stakeholderType: StakeholderType;
  name: string;
  roleTitle: string;
  disputedAmount: number;
  issueType: string;
  description: string;
  status: 'AUDIT_IN_PROGRESS' | 'CREDIT_AUTHORIZED' | 'REJECTED';
  createdAt: string;
}

export interface StakeholderHistoryRecord {
  ticketId: string;
  stakeholderId: string;
  stakeholderType: StakeholderType;
  stakeholderName: string;
  issueTitle: string;
  assignedTeam: string;
  attendedBy: string;
  status: 'RESOLVED' | 'PENDING' | 'ESCALATED';
  priority: 'CRITICAL' | 'HIGH' | 'NORMAL';
  createdAt: string;
  attendedAt: string;
  resolvedAt: string;
  resolutionTimeMinutes: number;
  resolutionNotes: string;
  auditBadge: string;
}

export interface StakeholderPayrollRecord {
  payrollId: string;
  stakeholderId: string;
  stakeholderType: StakeholderType;
  name: string;
  roleTitle: string;
  payPeriod: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  panNumber: string;
  grossAmount: number; // Gross Commission / Salary / Honorarium
  deductions: number; // Platform Fee / TDS / Adjustments
  tdsAmount: number;
  netPayable: number;
  payoutStatus: 'DISBURSED' | 'PENDING_RELEASE' | 'ON_HOLD' | 'IN_PROCESSING';
  utrNumber?: string;
  disbursedAt?: string;
  gateway: string;
}

// =========================================================================
// MOCK DATA GENERATOR FOR ALL 6 STAKEHOLDER CATEGORIES
// =========================================================================

const INITIAL_STAKEHOLDERS: StakeholderRecord[] = [
  // ------------------- 1. AGENTS -------------------
  {
    id: 'AGT-TN-101',
    type: 'AGENT',
    name: 'M. Kavitha',
    phone: '+91 97890 23411',
    email: 'kavitha.agent@gmail.com',
    onboardingSource: 'SUB_ADMIN',
    onboardedBy: 'Sub Admin - K. Selvakumar',
    territory: {
      state: 'Tamil Nadu',
      district: 'Salem',
      division: 'Salem Central Division',
      pincode: '636001',
      address: 'No. 14, Cherry Road, Salem'
    },
    approval: {
      isApproved: true,
      approverName: 'K. Selvakumar',
      approverMobile: '+91 98402 20002',
      approverRole: 'SUB_ADMIN',
      approvedAt: '2026-10-18 11:30 AM',
      notes: 'Sub Admin verified agent territory coverage and signed security bond.'
    },
    level: 'DISTRICT',
    roleTitle: 'District Field Agent',
    status: 'ACTIVE',
    kycStatus: 'VERIFIED',
    joinedDate: '2026-10-18',
    registrationDetails: {
      legalName: 'Kavitha Murugesan',
      panNumber: 'ABCDE1122K',
      aadhaarNumber: '•••• •••• 4412',
      bankName: 'Canara Bank - Salem Branch',
      accountNumber: '1099201008812',
      ifscCode: 'CNRB0001099',
      qualification: 'B.Com Graduate with 4 Yrs Field Tie-Up Experience',
      emergencyContact: '+91 97890 99881 (Husband)',
      appliedDate: '2026-10-17'
    },
    documents: [
      { name: 'Aadhaar_Card_Verified.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '850 KB', uploadDate: '2026-10-17' },
      { name: 'PAN_Card_Copy.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '620 KB', uploadDate: '2026-10-17' },
      { name: 'Cancelled_Cheque_Canara.jpg', type: 'IMAGE', status: 'VERIFIED', fileSize: '510 KB', uploadDate: '2026-10-17' },
      { name: 'Sub_Admin_Approval_Endorsement.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '1.2 MB', uploadDate: '2026-10-18' }
    ]
  },
  {
    id: 'AGT-TN-102',
    type: 'AGENT',
    name: 'K. Vignesh',
    phone: '+91 94441 55678',
    email: 'vignesh.agent.chennai@gmail.com',
    onboardingSource: 'DIRECT',
    onboardedBy: 'Direct Portal',
    territory: {
      state: 'Tamil Nadu',
      district: 'Chennai',
      division: 'Tambaram Division',
      pincode: '600045',
      address: 'GST Road, Tambaram Sanatorium, Chennai'
    },
    approval: {
      isApproved: true,
      approverName: '— Not Applicable (Direct)',
      approverMobile: '—',
      approverRole: 'SYSTEM_AUTO',
      approvedAt: '2026-10-19 09:15 AM',
      notes: 'Direct application — Territorial Sub Admin approval not required.'
    },
    level: 'DIVISION',
    roleTitle: 'Divisional Onboarding Agent',
    status: 'ACTIVE',
    kycStatus: 'VERIFIED',
    joinedDate: '2026-10-19',
    registrationDetails: {
      legalName: 'Vignesh Kumarasamy',
      panNumber: 'POIUY7766T',
      aadhaarNumber: '•••• •••• 9923',
      bankName: 'HDFC Bank - Tambaram',
      accountNumber: '50200038192841',
      ifscCode: 'HDFC0001244',
      qualification: 'Diploma in Electrical & Retail Operations',
      emergencyContact: '+91 94440 12345 (Brother)',
      appliedDate: '2026-10-18'
    },
    documents: [
      { name: 'Aadhaar_Card_Direct.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '920 KB', uploadDate: '2026-10-18' },
      { name: 'PAN_Card.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '580 KB', uploadDate: '2026-10-18' },
      { name: 'Bank_Passbook.jpg', type: 'IMAGE', status: 'VERIFIED', fileSize: '740 KB', uploadDate: '2026-10-18' }
    ]
  },
  {
    id: 'AGT-TN-103',
    type: 'AGENT',
    name: 'S. Prakash Kumar',
    phone: '+91 98405 77661',
    email: 'prakash.coimbatore@gmail.com',
    onboardingSource: 'SUB_ADMIN',
    onboardedBy: 'Sub Admin - M. Rajesh Kumar',
    territory: {
      state: 'Tamil Nadu',
      district: 'Coimbatore',
      division: 'RS Puram Division',
      pincode: '641002',
      address: 'DB Road, RS Puram, Coimbatore'
    },
    approval: {
      isApproved: true,
      approverName: 'M. Rajesh Kumar',
      approverMobile: '+91 98403 30003',
      approverRole: 'SUB_ADMIN',
      approvedAt: '2026-10-21 04:20 PM',
      notes: 'Sub Admin endorsed division coverage & verified local references.'
    },
    level: 'PINCODE',
    roleTitle: 'Pincode Tie-Up Specialist',
    status: 'ACTIVE',
    kycStatus: 'VERIFIED',
    joinedDate: '2026-10-21',
    registrationDetails: {
      legalName: 'Prakash S. Kumar',
      panNumber: 'PLMKO9988R',
      aadhaarNumber: '•••• •••• 3381',
      bankName: 'Indian Overseas Bank - RS Puram',
      accountNumber: '01420200004928',
      ifscCode: 'IOBA0000142',
      qualification: 'BBA with Merchant Acquisition Background',
      emergencyContact: '+91 98405 11223 (Father)',
      appliedDate: '2026-10-20'
    },
    documents: [
      { name: 'Aadhaar_Card.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '810 KB', uploadDate: '2026-10-20' },
      { name: 'PAN_Card.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '540 KB', uploadDate: '2026-10-20' },
      { name: 'SubAdmin_Recommendation.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '1.1 MB', uploadDate: '2026-10-21' }
    ]
  },
  {
    id: 'AGT-TN-104',
    type: 'AGENT',
    name: 'R. Deepa Lakshmi',
    phone: '+91 96001 44552',
    email: 'deepa.madurai@gmail.com',
    onboardingSource: 'DIRECT',
    onboardedBy: 'Direct Portal',
    territory: {
      state: 'Tamil Nadu',
      district: 'Madurai',
      division: 'Meenakshi Temple Zone',
      pincode: '625001',
      address: 'West Masi Street, Madurai'
    },
    approval: {
      isApproved: true,
      approverName: '— Not Applicable (Direct)',
      approverMobile: '—',
      approverRole: 'SYSTEM_AUTO',
      approvedAt: '2026-10-23 10:00 AM',
      notes: 'Direct registration — Sub Admin approval bypassed.'
    },
    level: 'STATE',
    roleTitle: 'State Ambassador Agent',
    status: 'ACTIVE',
    kycStatus: 'VERIFIED',
    joinedDate: '2026-10-23',
    registrationDetails: {
      legalName: 'Deepa Lakshmi Rajan',
      panNumber: 'QWERT5544Y',
      aadhaarNumber: '•••• •••• 7719',
      bankName: 'State Bank of India - Madurai',
      accountNumber: '381920381992',
      ifscCode: 'SBIN0002194',
      qualification: 'MBA in Sales & Marketing',
      emergencyContact: '+91 96001 99001 (Spouse)',
      appliedDate: '2026-10-22'
    },
    documents: [
      { name: 'Aadhaar_Ekyc.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '1.1 MB', uploadDate: '2026-10-22' },
      { name: 'PAN_Card.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '610 KB', uploadDate: '2026-10-22' },
      { name: 'Bank_Proof.jpg', type: 'IMAGE', status: 'VERIFIED', fileSize: '480 KB', uploadDate: '2026-10-22' }
    ]
  },

  // ------------------- 2. MANAGERS -------------------
  {
    id: 'MGR-TN-201',
    type: 'MANAGER',
    name: 'Ramesh Sundaram',
    phone: '+91 98401 22990',
    email: 'ramesh.sundaram@enterprise.ai',
    onboardingSource: 'SUB_ADMIN',
    onboardedBy: 'Sub Admin - P. Anbalagan',
    territory: {
      state: 'Tamil Nadu',
      district: 'Chennai',
      division: 'North & Central Zone',
      pincode: '600001',
      address: 'Anna Salai, Mount Road, Chennai'
    },
    approval: {
      isApproved: true,
      approverName: 'P. Anbalagan',
      approverMobile: '+91 98401 10001',
      approverRole: 'SUB_ADMIN',
      approvedAt: '2026-10-14 02:00 PM',
      notes: 'Sub Admin verified managerial background check and executive KYC.'
    },
    level: 'STATE',
    roleTitle: 'Regional Operations Manager',
    status: 'ACTIVE',
    kycStatus: 'VERIFIED',
    joinedDate: '2026-10-14',
    registrationDetails: {
      legalName: 'Ramesh Sundaram',
      panNumber: 'MGRPK8892L',
      aadhaarNumber: '•••• •••• 1029',
      bankName: 'ICICI Bank - Anna Salai',
      accountNumber: '001105012398',
      ifscCode: 'ICIC0000011',
      qualification: 'M.Tech with 10 Yrs Multi-Unit Operations Leadership',
      emergencyContact: '+91 98401 00000 (Spouse)',
      appliedDate: '2026-10-13'
    },
    documents: [
      { name: 'Appointment_Letter_Signed.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '1.4 MB', uploadDate: '2026-10-13' },
      { name: 'PAN_Corporate.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '650 KB', uploadDate: '2026-10-13' },
      { name: 'Bank_Statement_3Months.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '2.1 MB', uploadDate: '2026-10-13' }
    ]
  },
  {
    id: 'MGR-TN-202',
    type: 'MANAGER',
    name: 'Dr. Anandhi Murugan',
    phone: '+91 94440 33221',
    email: 'anandhi.mgr@enterprise.ai',
    onboardingSource: 'DIRECT',
    onboardedBy: 'Direct Portal',
    territory: {
      state: 'Tamil Nadu',
      district: 'Coimbatore',
      division: 'Western Zone Cluster',
      pincode: '641018',
      address: 'Avanashi Road, Coimbatore'
    },
    approval: {
      isApproved: true,
      approverName: '— Not Applicable (Direct)',
      approverMobile: '—',
      approverRole: 'SYSTEM_AUTO',
      approvedAt: '2026-10-16 11:45 AM',
      notes: 'Direct executive onboarding — Sub Admin approval not required.'
    },
    level: 'DISTRICT',
    roleTitle: 'District Territory Manager',
    status: 'ACTIVE',
    kycStatus: 'VERIFIED',
    joinedDate: '2026-10-16',
    registrationDetails: {
      legalName: 'Anandhi Murugan',
      panNumber: 'ANDHM7733N',
      aadhaarNumber: '•••• •••• 6643',
      bankName: 'Axis Bank - Avanashi Road',
      accountNumber: '91201004928172',
      ifscCode: 'UTIB0000122',
      qualification: 'PhD in Organizational Supply Chain Management',
      emergencyContact: '+91 94440 99887 (Brother)',
      appliedDate: '2026-10-15'
    },
    documents: [
      { name: 'Executive_ID_Proof.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '980 KB', uploadDate: '2026-10-15' },
      { name: 'PAN_Card.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '610 KB', uploadDate: '2026-10-15' },
      { name: 'Degree_Certificate.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '1.8 MB', uploadDate: '2026-10-15' }
    ]
  },

  // ------------------- 3. SUB ADMINS -------------------
  {
    id: 'SUB-TN-301',
    type: 'SUBADMIN',
    name: 'P. Anbalagan',
    phone: '+91 98401 10001',
    email: 'anbalagan.subadmin@enterprise.ai',
    onboardingSource: 'MAIN_ADMIN',
    onboardedBy: 'Main Admin (Super Admin HQ)',
    territory: {
      state: 'Tamil Nadu',
      district: 'Chennai',
      division: 'TN Zone 1 - North & Central',
      pincode: '600017',
      address: 'Usman Road, T. Nagar, Chennai'
    },
    approval: {
      isApproved: true,
      approverName: 'Super Admin (Main Admin Corporate HQ)',
      approverMobile: '+91 98000 00001',
      approverRole: 'MAIN_ADMIN',
      approvedAt: '2026-10-10 10:00 AM',
      notes: 'Sub Admin onboarded and authorized exclusively by Main Admin.'
    },
    level: 'STATE',
    roleTitle: 'State Sub Admin (Zone 1)',
    status: 'ACTIVE',
    kycStatus: 'VERIFIED',
    joinedDate: '2026-10-10',
    registrationDetails: {
      legalName: 'Anbalagan P.',
      panNumber: 'ANBAL1122Z',
      aadhaarNumber: '•••• •••• 9901',
      bankName: 'HDFC Bank - T. Nagar',
      accountNumber: '50200049281734',
      ifscCode: 'HDFC0001244',
      qualification: 'Senior Executive Administrator',
      emergencyContact: '+91 98401 88888 (Family)',
      appliedDate: '2026-10-09'
    },
    documents: [
      { name: 'Board_Resolution_Appointment.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '2.4 MB', uploadDate: '2026-10-09' },
      { name: 'MainAdmin_Authorization_Letter.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '1.2 MB', uploadDate: '2026-10-10' }
    ]
  },
  {
    id: 'SUB-TN-302',
    type: 'SUBADMIN',
    name: 'K. Selvakumar',
    phone: '+91 98402 20002',
    email: 'selvakumar.subadmin@enterprise.ai',
    onboardingSource: 'MAIN_ADMIN',
    onboardedBy: 'Main Admin (Super Admin HQ)',
    territory: {
      state: 'Tamil Nadu',
      district: 'Salem',
      division: 'Salem District Jurisdiction',
      pincode: '636001',
      address: 'Salem City Centre, Salem'
    },
    approval: {
      isApproved: true,
      approverName: 'Super Admin (Main Admin Corporate HQ)',
      approverMobile: '+91 98000 00001',
      approverRole: 'MAIN_ADMIN',
      approvedAt: '2026-10-11 02:30 PM',
      notes: 'Main Admin charter approved for District Sub Admin.'
    },
    level: 'DISTRICT',
    roleTitle: 'District Sub Admin (Salem)',
    status: 'ACTIVE',
    kycStatus: 'VERIFIED',
    joinedDate: '2026-10-11',
    registrationDetails: {
      legalName: 'Selvakumar K.',
      panNumber: 'SELVK3344X',
      aadhaarNumber: '•••• •••• 2218',
      bankName: 'Canara Bank - Salem Main',
      accountNumber: '1099201004928',
      ifscCode: 'CNRB0001099',
      qualification: 'District Coordination Authority',
      emergencyContact: '+91 98402 11111 (Office)',
      appliedDate: '2026-10-10'
    },
    documents: [
      { name: 'HQ_SubAdmin_Credential_Order.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '1.9 MB', uploadDate: '2026-10-10' }
    ]
  },

  // ------------------- 4. DELIVERY PARTNERS -------------------
  {
    id: 'DLP-TN-401',
    type: 'DELIVERY_PARTNER',
    name: 'G. Saravanan',
    phone: '+91 97910 88231',
    email: 'saravanan.delivery@gmail.com',
    onboardingSource: 'DIRECT',
    onboardedBy: 'Direct Partner App',
    territory: {
      state: 'Tamil Nadu',
      district: 'Chennai',
      division: 'Guindy & Velachery Zone',
      pincode: '600032',
      address: 'GST Road, Guindy, Chennai'
    },
    approval: {
      isApproved: true,
      approverName: '— Not Applicable (Direct)',
      approverMobile: '—',
      approverRole: 'SYSTEM_AUTO',
      approvedAt: '2026-10-15 08:30 AM',
      notes: 'Direct driver app registration — Driving license & vehicle RC verified via Sarathi API.'
    },
    level: 'PINCODE',
    roleTitle: 'Two-Wheeler Delivery Pilot',
    status: 'ACTIVE',
    kycStatus: 'VERIFIED',
    joinedDate: '2026-10-15',
    registrationDetails: {
      legalName: 'Saravanan Govindaraj',
      panNumber: 'SRVNN8811P',
      aadhaarNumber: '•••• •••• 7741',
      bankName: 'Indian Bank - Guindy',
      accountNumber: '68192038192',
      ifscCode: 'IDIB000G012',
      qualification: 'Commercial Two-Wheeler Driver (DL: TN-02-2021-008192)',
      emergencyContact: '+91 97910 11223 (Wife)',
      appliedDate: '2026-10-14'
    },
    documents: [
      { name: 'Driving_License_TN02.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '1.1 MB', uploadDate: '2026-10-14' },
      { name: 'Vehicle_RC_Book.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '850 KB', uploadDate: '2026-10-14' },
      { name: 'Vehicle_Insurance_Valid2027.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '950 KB', uploadDate: '2026-10-14' }
    ]
  },
  {
    id: 'DLP-TN-402',
    type: 'DELIVERY_PARTNER',
    name: 'K. Manikandan',
    phone: '+91 98409 66772',
    email: 'mani.express@gmail.com',
    onboardingSource: 'DIRECT',
    onboardedBy: 'Direct Partner App',
    territory: {
      state: 'Tamil Nadu',
      district: 'Coimbatore',
      division: 'Gandhipuram Division',
      pincode: '641012',
      address: 'Cross Cut Road, Gandhipuram, Coimbatore'
    },
    approval: {
      isApproved: true,
      approverName: '— Not Applicable (Direct)',
      approverMobile: '—',
      approverRole: 'SYSTEM_AUTO',
      approvedAt: '2026-10-17 01:15 PM',
      notes: 'Direct registration — 4-wheeler van driver verified.'
    },
    level: 'DIVISION',
    roleTitle: 'Four-Wheeler Cargo Pilot',
    status: 'ACTIVE',
    kycStatus: 'VERIFIED',
    joinedDate: '2026-10-17',
    registrationDetails: {
      legalName: 'Manikandan Karuppusamy',
      panNumber: 'MNKDN4422T',
      aadhaarNumber: '•••• •••• 5590',
      bankName: 'State Bank of India - Gandhipuram',
      accountNumber: '319203810291',
      ifscCode: 'SBIN0001234',
      qualification: 'Light Commercial Vehicle Pilot (Tata Ace Fleet)',
      emergencyContact: '+91 98409 11000 (Father)',
      appliedDate: '2026-10-16'
    },
    documents: [
      { name: 'Heavy_LCV_License.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '1.3 MB', uploadDate: '2026-10-16' },
      { name: 'Commercial_Vehicle_RC.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '980 KB', uploadDate: '2026-10-16' }
    ]
  },

  // ------------------- 5. TECHNICIANS -------------------
  {
    id: 'TCH-TN-501',
    type: 'TECHNICIAN',
    name: 'R. Vigneshwar',
    phone: '+91 94441 55678',
    email: 'vignesh.tech@gmail.com',
    onboardingSource: 'DIRECT',
    onboardedBy: 'Direct Service Portal',
    territory: {
      state: 'Tamil Nadu',
      district: 'Chennai',
      division: 'Tambaram Division',
      pincode: '600045',
      address: 'GST Road, Near Tambaram Sanatorium, Chennai'
    },
    approval: {
      isApproved: true,
      approverName: '— Not Applicable (Direct)',
      approverMobile: '—',
      approverRole: 'SYSTEM_AUTO',
      approvedAt: '2026-10-19 01:20 PM',
      notes: 'Direct onboarding — Electrical contractor class-A license verified.'
    },
    level: 'DIVISION',
    roleTitle: 'Master Electrical & HVAC Technician',
    status: 'ACTIVE',
    kycStatus: 'VERIFIED',
    joinedDate: '2026-10-19',
    registrationDetails: {
      legalName: 'Vigneshwar R.',
      panNumber: 'POIUY7766T',
      aadhaarNumber: '•••• •••• 4420',
      bankName: 'Canara Bank - Tambaram',
      accountNumber: '1099201004928',
      ifscCode: 'CNRB0001099',
      qualification: 'Diploma in Electrical Engineering + TNEB Class-A License',
      emergencyContact: '+91 94441 00000 (Family)',
      appliedDate: '2026-10-18'
    },
    documents: [
      { name: 'TNEB_Electrical_License.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '1.6 MB', uploadDate: '2026-10-18' },
      { name: 'Tool_Kit_Inspection_Photo.jpg', type: 'IMAGE', status: 'VERIFIED', fileSize: '1.5 MB', uploadDate: '2026-10-18' }
    ]
  },
  {
    id: 'TCH-TN-502',
    type: 'TECHNICIAN',
    name: 'S. Murugan',
    phone: '+91 98404 55667',
    email: 'murugan.plumber@gmail.com',
    onboardingSource: 'DIRECT',
    onboardedBy: 'Direct Service Portal',
    territory: {
      state: 'Tamil Nadu',
      district: 'Madurai',
      division: 'Madurai East Division',
      pincode: '625009',
      address: 'Anna Nagar, Madurai'
    },
    approval: {
      isApproved: true,
      approverName: '— Not Applicable (Direct)',
      approverMobile: '—',
      approverRole: 'SYSTEM_AUTO',
      approvedAt: '2026-10-21 03:45 PM',
      notes: 'Direct onboarding — Certified Plumbing & Water Systems Technician.'
    },
    level: 'DISTRICT',
    roleTitle: 'Plumbing & Hydraulic Systems Tech',
    status: 'ACTIVE',
    kycStatus: 'VERIFIED',
    joinedDate: '2026-10-21',
    registrationDetails: {
      legalName: 'Murugan Shanmugam',
      panNumber: 'MRGNS3321Q',
      aadhaarNumber: '•••• •••• 8812',
      bankName: 'Indian Overseas Bank - Madurai',
      accountNumber: '01420200008891',
      ifscCode: 'IOBA0000142',
      qualification: 'ITI Certified Plumber (12 Yrs Experience)',
      emergencyContact: '+91 98404 11222 (Brother)',
      appliedDate: '2026-10-20'
    },
    documents: [
      { name: 'ITI_Trade_Certificate.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '1.2 MB', uploadDate: '2026-10-20' }
    ]
  },

  // ------------------- 6. SUPPORT STAFF (KYC, PAYMENT, QUERIES) -------------------
  {
    id: 'STF-SUP-601',
    type: 'SUPPORT_STAFF',
    name: 'Alex Vance',
    phone: '+91 98840 12001',
    email: 'alex.vance@enterprise.ai',
    onboardingSource: 'SUPPORT_ADMIN',
    onboardedBy: 'Support Admin',
    territory: {
      state: 'Tamil Nadu',
      district: 'Chennai',
      division: 'Central Support HQ',
      pincode: '600002',
      address: 'Corporate Support Operations Floor, Chennai'
    },
    approval: {
      isApproved: true,
      approverName: 'Support Admin Command',
      approverMobile: '+91 98840 00000',
      approverRole: 'SUPPORT_ADMIN',
      approvedAt: '2026-10-01 09:00 AM',
      notes: 'Onboarded and approved by Support Admin. Assigned to KYC Document Desk.'
    },
    level: 'STATE',
    roleTitle: 'KYC Document Verification Lead',
    status: 'ACTIVE',
    kycStatus: 'VERIFIED',
    joinedDate: '2026-10-01',
    registrationDetails: {
      legalName: 'Alexander Vance',
      panNumber: 'ALXVN1122D',
      aadhaarNumber: '•••• •••• 9012',
      bankName: 'HDFC Bank - Mount Road',
      accountNumber: '50200019284102',
      ifscCode: 'HDFC0000004',
      qualification: 'Certified Fraud Examiner & AML Compliance Officer',
      emergencyContact: '+91 98840 99999 (HR)',
      appliedDate: '2026-09-28'
    },
    documents: [
      { name: 'SupportAdmin_Appointment_Order.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '1.5 MB', uploadDate: '2026-09-28' },
      { name: 'AML_KYC_Specialist_Certificate.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '1.8 MB', uploadDate: '2026-09-28' }
    ]
  },
  {
    id: 'STF-SUP-602',
    type: 'SUPPORT_STAFF',
    name: 'Sarah Connor',
    phone: '+91 98840 12002',
    email: 'sarah.connor@enterprise.ai',
    onboardingSource: 'SUPPORT_ADMIN',
    onboardedBy: 'Support Admin',
    territory: {
      state: 'Tamil Nadu',
      district: 'Chennai',
      division: 'Central Support HQ',
      pincode: '600002',
      address: 'Corporate Support Operations Floor, Chennai'
    },
    approval: {
      isApproved: true,
      approverName: 'Support Admin Command',
      approverMobile: '+91 98840 00000',
      approverRole: 'SUPPORT_ADMIN',
      approvedAt: '2026-10-01 09:30 AM',
      notes: 'Onboarded and approved by Support Admin. Assigned to Query Operations Team.'
    },
    level: 'STATE',
    roleTitle: 'Query Operations Specialist',
    status: 'ACTIVE',
    kycStatus: 'VERIFIED',
    joinedDate: '2026-10-01',
    registrationDetails: {
      legalName: 'Sarah Connor',
      panNumber: 'SRHCN3344F',
      aadhaarNumber: '•••• •••• 4491',
      bankName: 'ICICI Bank - Central',
      accountNumber: '001101928402',
      ifscCode: 'ICIC0000011',
      qualification: 'Customer Operations & Dispute Mediation Lead',
      emergencyContact: '+91 98840 99999 (HR)',
      appliedDate: '2026-09-28'
    },
    documents: [
      { name: 'SupportAdmin_Appointment_Order.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '1.4 MB', uploadDate: '2026-09-28' }
    ]
  },
  {
    id: 'STF-SUP-603',
    type: 'SUPPORT_STAFF',
    name: 'Michael Chang',
    phone: '+91 98840 12003',
    email: 'michael.chang@enterprise.ai',
    onboardingSource: 'SUPPORT_ADMIN',
    onboardedBy: 'Support Admin',
    territory: {
      state: 'Tamil Nadu',
      district: 'Chennai',
      division: 'Central Support HQ',
      pincode: '600002',
      address: 'Corporate Support Operations Floor, Chennai'
    },
    approval: {
      isApproved: true,
      approverName: 'Support Admin Command',
      approverMobile: '+91 98840 00000',
      approverRole: 'SUPPORT_ADMIN',
      approvedAt: '2026-10-02 10:00 AM',
      notes: 'Onboarded and approved by Support Admin. Assigned to Payment & Settlement Team.'
    },
    level: 'STATE',
    roleTitle: 'Payment & Settlement Auditor',
    status: 'ACTIVE',
    kycStatus: 'VERIFIED',
    joinedDate: '2026-10-02',
    registrationDetails: {
      legalName: 'Michael Chang',
      panNumber: 'MCHNG5566G',
      aadhaarNumber: '•••• •••• 1182',
      bankName: 'State Bank of India - Commercial',
      accountNumber: '381920381001',
      ifscCode: 'SBIN0000122',
      qualification: 'Chartered Financial Reconciliation Specialist',
      emergencyContact: '+91 98840 99999 (HR)',
      appliedDate: '2026-09-29'
    },
    documents: [
      { name: 'SupportAdmin_Appointment_Order.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '1.6 MB', uploadDate: '2026-09-29' }
    ]
  }
];

// Mock KYC Requests across Stakeholders
const INITIAL_KYC_REQUESTS: StakeholderKycRequest[] = [
  {
    reqId: 'KYC-STK-801',
    stakeholderId: 'AGT-TN-103',
    stakeholderType: 'AGENT',
    name: 'S. Prakash Kumar',
    phone: '+91 98405 77661',
    roleTitle: 'Pincode Tie-Up Specialist',
    onboardingSource: 'SUB_ADMIN',
    onboardedBy: 'Sub Admin - M. Rajesh Kumar',
    approvalInfo: 'Sub Admin Approved (Division Level)',
    submittedAt: 'Today, 10:15 AM',
    status: 'UNDER_REVIEW',
    notes: 'Agent territory bond endorsed by Sub Admin. Awaiting Support Admin KYC sign-off before field merchant tie-up rights activated.',
    documents: [
      { name: 'Aadhaar_Card.pdf', status: 'VERIFIED' },
      { name: 'PAN_Card.pdf', status: 'VERIFIED' },
      { name: 'SubAdmin_Recommendation.pdf', status: 'UNDER_REVIEW' }
    ]
  },
  {
    reqId: 'KYC-STK-802',
    stakeholderId: 'AGT-TN-104',
    stakeholderType: 'AGENT',
    name: 'R. Deepa Lakshmi',
    phone: '+91 96001 44552',
    roleTitle: 'State Ambassador Agent',
    onboardingSource: 'DIRECT',
    onboardedBy: 'Direct Portal',
    approvalInfo: '— Not Applicable (Direct Application)',
    submittedAt: 'Yesterday, 04:30 PM',
    status: 'REUPLOAD_NEEDED',
    notes: 'Direct application: Sub Admin approval bypassed. Bank passbook photo has glare on IFSC code. WhatsApp prompt sent.',
    documents: [
      { name: 'Aadhaar_Ekyc.pdf', status: 'VERIFIED' },
      { name: 'PAN_Card.pdf', status: 'VERIFIED' },
      { name: 'Bank_Proof.jpg', status: 'REJECTED' }
    ]
  },
  {
    reqId: 'KYC-STK-803',
    stakeholderId: 'DLP-TN-401',
    stakeholderType: 'DELIVERY_PARTNER',
    name: 'G. Saravanan',
    phone: '+91 97910 88231',
    roleTitle: 'Two-Wheeler Delivery Pilot',
    onboardingSource: 'DIRECT',
    onboardedBy: 'Direct Partner App',
    approvalInfo: '— Not Applicable (Direct Application)',
    submittedAt: 'Today, 08:30 AM',
    status: 'APPROVED',
    notes: 'Direct onboarding: Driving license & vehicle RC verified online. Cleared for dispatch.',
    documents: [
      { name: 'Driving_License_TN02.pdf', status: 'VERIFIED' },
      { name: 'Vehicle_RC_Book.pdf', status: 'VERIFIED' }
    ]
  }
];

// Mock Operational Queries
const INITIAL_QUERIES: StakeholderQueryIssue[] = [
  {
    queryId: 'QRY-STK-901',
    stakeholderId: 'AGT-TN-101',
    stakeholderType: 'AGENT',
    name: 'M. Kavitha',
    phone: '+91 97890 23411',
    roleTitle: 'District Field Agent',
    issueType: 'QR Scanner App Geofence Error',
    description: 'When onboarding vendors in Salem Cherry Road cluster, the app throws "Territory Geofence Outside Range" despite being inside district boundary.',
    severity: 'HIGH',
    assignedDesk: 'Agent Operations Desk',
    sla: '35 mins remaining',
    status: 'IN_PROGRESS',
    createdAt: 'Today, 09:40 AM'
  },
  {
    queryId: 'QRY-STK-902',
    stakeholderId: 'MGR-TN-201',
    stakeholderType: 'MANAGER',
    name: 'Ramesh Sundaram',
    phone: '+91 98401 22990',
    roleTitle: 'Regional Operations Manager',
    issueType: 'Zone Hierarchy Aggregation Lag',
    description: 'Weekly merchant acquisition rollup for North Chennai is showing 0 count for new vendors onboarded yesterday.',
    severity: 'MEDIUM',
    assignedDesk: 'Analytics & Reporting Desk',
    sla: '90 mins remaining',
    status: 'OPEN',
    createdAt: 'Today, 11:15 AM'
  }
];

// Mock Payment Disputes
const INITIAL_DISPUTES: StakeholderPaymentDispute[] = [
  {
    disputeId: 'DSP-STK-301',
    stakeholderId: 'AGT-TN-101',
    stakeholderType: 'AGENT',
    name: 'M. Kavitha',
    roleTitle: 'District Field Agent',
    disputedAmount: 4200,
    issueType: 'Referral Commission Payout Hold',
    description: 'Commission for 3 supermarket onboardings in Salem not credited in current bi-weekly run.',
    status: 'CREDIT_AUTHORIZED',
    createdAt: 'Yesterday, 03:20 PM'
  }
];

// Mock Ticket History
const INITIAL_HISTORY: StakeholderHistoryRecord[] = [
  {
    ticketId: 'TCK-STK-5501',
    stakeholderId: 'AGT-TN-101',
    stakeholderType: 'AGENT',
    stakeholderName: 'M. Kavitha (District Agent)',
    issueTitle: 'Territory Boundary Pincode 636001 Re-alignment',
    assignedTeam: 'Sub Admin Territorial Desk',
    attendedBy: 'K. Selvakumar (Sub Admin)',
    status: 'RESOLVED',
    priority: 'HIGH',
    createdAt: '2026-10-22 10:10 AM',
    attendedAt: '2026-10-22 10:25 AM',
    resolvedAt: '2026-10-22 11:15 AM',
    resolutionTimeMinutes: 50,
    resolutionNotes: 'Updated GIS boundary polygon on corporate map server. Agent confirmed successful vendor tagging.',
    auditBadge: 'Sub Admin Actioned'
  },
  {
    ticketId: 'TCK-STK-5502',
    stakeholderId: 'MGR-TN-201',
    stakeholderType: 'MANAGER',
    stakeholderName: 'Ramesh Sundaram (Regional Manager)',
    issueTitle: 'Supervisory Dashboard Access Scope Upgrade',
    assignedTeam: 'Corporate HQ IT Desk',
    attendedBy: 'Alex Vance (Support Admin)',
    status: 'RESOLVED',
    priority: 'CRITICAL',
    createdAt: '2026-10-23 02:00 PM',
    attendedAt: '2026-10-23 02:15 PM',
    resolvedAt: '2026-10-23 02:45 PM',
    resolutionTimeMinutes: 30,
    resolutionNotes: 'Granted North & Central Zone inspection permissions after verifying appointment letter.',
    auditBadge: 'Support Admin Verified'
  },
  {
    ticketId: 'TCK-STK-5503',
    stakeholderId: 'DLP-TN-401',
    stakeholderType: 'DELIVERY_PARTNER',
    stakeholderName: 'G. Saravanan (Delivery Pilot)',
    issueTitle: 'Instant Fuel Incentive Wallet Credit Failure',
    assignedTeam: 'Payment & Settlement Team',
    attendedBy: 'Michael Chang (Payment Auditor)',
    status: 'RESOLVED',
    priority: 'HIGH',
    createdAt: '2026-10-25 09:10 AM',
    attendedAt: '2026-10-25 09:20 AM',
    resolvedAt: '2026-10-25 09:50 AM',
    resolutionTimeMinutes: 30,
    resolutionNotes: 'IMPS gateway retry executed successfully. UTR CMS9823019912 generated.',
    auditBadge: 'Instant Disbursal'
  }
];

// Mock Payroll Records
const INITIAL_PAYROLL: StakeholderPayrollRecord[] = [
  {
    payrollId: 'PAY-AGT-2026-10-01',
    stakeholderId: 'AGT-TN-101',
    stakeholderType: 'AGENT',
    name: 'M. Kavitha',
    roleTitle: 'District Field Agent',
    payPeriod: 'Oct 01 - Oct 15, 2026',
    bankName: 'Canara Bank - Salem',
    accountNumber: '•••• •••• 8812',
    ifscCode: 'CNRB0001099',
    panNumber: 'ABCDE1122K',
    grossAmount: 38500,
    deductions: 3850,
    tdsAmount: 385,
    netPayable: 34265,
    payoutStatus: 'DISBURSED',
    utrNumber: 'CMS8819203812',
    disbursedAt: 'Oct 18, 2026',
    gateway: 'Canara Corporate Host-to-Host'
  },
  {
    payrollId: 'PAY-AGT-2026-10-02',
    stakeholderId: 'AGT-TN-102',
    stakeholderType: 'AGENT',
    name: 'K. Vignesh',
    roleTitle: 'Divisional Onboarding Agent',
    payPeriod: 'Oct 01 - Oct 15, 2026',
    bankName: 'HDFC Bank - Tambaram',
    accountNumber: '•••• •••• 2841',
    ifscCode: 'HDFC0001244',
    panNumber: 'POIUY7766T',
    grossAmount: 42000,
    deductions: 4200,
    tdsAmount: 420,
    netPayable: 37380,
    payoutStatus: 'PENDING_RELEASE',
    gateway: 'HDFC Corporate NEFT'
  },
  {
    payrollId: 'PAY-MGR-2026-10-01',
    stakeholderId: 'MGR-TN-201',
    stakeholderType: 'MANAGER',
    name: 'Ramesh Sundaram',
    roleTitle: 'Regional Operations Manager',
    payPeriod: 'Oct 01 - Oct 15, 2026',
    bankName: 'ICICI Bank - Anna Salai',
    accountNumber: '•••• •••• 2398',
    ifscCode: 'ICIC0000011',
    panNumber: 'MGRPK8892L',
    grossAmount: 85000,
    deductions: 8500,
    tdsAmount: 850,
    netPayable: 75650,
    payoutStatus: 'DISBURSED',
    utrNumber: 'CMS9921029182',
    disbursedAt: 'Oct 18, 2026',
    gateway: 'ICICI Connected Banking'
  },
  {
    payrollId: 'PAY-SUB-2026-10-01',
    stakeholderId: 'SUB-TN-301',
    stakeholderType: 'SUBADMIN',
    name: 'P. Anbalagan',
    roleTitle: 'State Sub Admin (Zone 1)',
    payPeriod: 'Oct 01 - Oct 15, 2026',
    bankName: 'HDFC Bank - T. Nagar',
    accountNumber: '•••• •••• 1734',
    ifscCode: 'HDFC0001244',
    panNumber: 'ANBAL1122Z',
    grossAmount: 65000,
    deductions: 6500,
    tdsAmount: 650,
    netPayable: 57850,
    payoutStatus: 'DISBURSED',
    utrNumber: 'CMS9944112233',
    disbursedAt: 'Oct 18, 2026',
    gateway: 'HDFC Direct Corporate'
  },
  {
    payrollId: 'PAY-DLP-2026-10-01',
    stakeholderId: 'DLP-TN-401',
    stakeholderType: 'DELIVERY_PARTNER',
    name: 'G. Saravanan',
    roleTitle: 'Two-Wheeler Delivery Pilot',
    payPeriod: 'Oct 01 - Oct 15, 2026',
    bankName: 'Indian Bank - Guindy',
    accountNumber: '•••• •••• 8192',
    ifscCode: 'IDIB000G012',
    panNumber: 'SRVNN8811P',
    grossAmount: 26400,
    deductions: 1200,
    tdsAmount: 264,
    netPayable: 24936,
    payoutStatus: 'PENDING_RELEASE',
    gateway: 'Indian Bank IMPS Batch'
  },
  {
    payrollId: 'PAY-TCH-2026-10-01',
    stakeholderId: 'TCH-TN-501',
    stakeholderType: 'TECHNICIAN',
    name: 'R. Vigneshwar',
    roleTitle: 'Master Electrical & HVAC Tech',
    payPeriod: 'Oct 01 - Oct 15, 2026',
    bankName: 'Canara Bank - Tambaram',
    accountNumber: '•••• •••• 4928',
    ifscCode: 'CNRB0001099',
    panNumber: 'POIUY7766T',
    grossAmount: 34500,
    deductions: 2500,
    tdsAmount: 345,
    netPayable: 31655,
    payoutStatus: 'DISBURSED',
    utrNumber: 'CMS7712903819',
    disbursedAt: 'Oct 18, 2026',
    gateway: 'Canara Host-to-Host'
  },
  {
    payrollId: 'PAY-STF-2026-10-01',
    stakeholderId: 'STF-SUP-601',
    stakeholderType: 'SUPPORT_STAFF',
    name: 'Alex Vance',
    roleTitle: 'KYC Document Verification Lead',
    payPeriod: 'Oct 01 - Oct 15, 2026',
    bankName: 'HDFC Bank - Mount Road',
    accountNumber: '•••• •••• 4102',
    ifscCode: 'HDFC0000004',
    panNumber: 'ALXVN1122D',
    grossAmount: 48000,
    deductions: 4800,
    tdsAmount: 480,
    netPayable: 42720,
    payoutStatus: 'DISBURSED',
    utrNumber: 'CMS5519203810',
    disbursedAt: 'Oct 18, 2026',
    gateway: 'HDFC Corporate Payroll'
  }
];

interface Props {
  initialStakeholder?: StakeholderType;
  initialTab?: StakeholderTab;
  onTabChange?: (tab: StakeholderTab) => void;
}

export const StakeholderOperationsHub: React.FC<Props> = ({
  initialStakeholder = 'AGENT',
  initialTab = 'DIRECTORY',
  onTabChange
}) => {
  const [currentStakeholder, setCurrentStakeholder] = useState<StakeholderType>(initialStakeholder);
  const [activeTab, setActiveTab] = useState<StakeholderTab>(initialTab);
  const [opsSubStream, setOpsSubStream] = useState<OpsSubStream>('KYC_QUEUE');
  
  // Data state
  const [stakeholders, setStakeholders] = useState<StakeholderRecord[]>(INITIAL_STAKEHOLDERS);
  const [kycRequests, setKycRequests] = useState<StakeholderKycRequest[]>(INITIAL_KYC_REQUESTS);
  const [queries, setQueries] = useState<StakeholderQueryIssue[]>(INITIAL_QUERIES);
  const [disputes, setDisputes] = useState<StakeholderPaymentDispute[]>(INITIAL_DISPUTES);
  const [historyRecords] = useState<StakeholderHistoryRecord[]>(INITIAL_HISTORY);
  const [payrollRecords, setPayrollRecords] = useState<StakeholderPayrollRecord[]>(INITIAL_PAYROLL);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [channelFilter, setChannelFilter] = useState<'ALL' | 'DIRECT' | 'SUB_ADMIN' | 'MAIN_ADMIN' | 'SUPPORT_ADMIN'>('ALL');
  const [levelFilter, setLevelFilter] = useState<'ALL' | StakeholderLevel>('ALL');

  // Modals & Notifications
  const [selectedStakeholderDossier, setSelectedStakeholderDossier] = useState<StakeholderRecord | null>(null);
  const [payoutModalData, setPayoutModalData] = useState<StakeholderPayrollRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Sync initial prop if changes
  React.useEffect(() => {
    if (initialStakeholder) {
      setCurrentStakeholder(initialStakeholder);
    }
  }, [initialStakeholder]);

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const handleTabSwitch = (tab: StakeholderTab) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  // Dynamic Metadata based on Active Stakeholder
  const meta = useMemo(() => {
    switch (currentStakeholder) {
      case 'AGENT':
        return {
          title: 'Agents Operations & Lifecycle Hub',
          singular: 'Agent',
          plural: 'Agents',
          icon: Briefcase,
          accentColor: '#10b981',
          description: 'Manage Direct & Sub-Admin onboarded agents, field KYC checks, query escalations, and commission payouts.',
          channelRule: 'Direct onboarded agents do not require Sub Admin approval; Sub Admin onboarded agents require territorial sign-off.'
        };
      case 'MANAGER':
        return {
          title: 'Managers Operations & Lifecycle Hub',
          singular: 'Manager',
          plural: 'Managers',
          icon: UsersRound,
          accentColor: '#8b5cf6',
          description: 'Manage Direct & Sub-Admin onboarded Territory Managers across State, District, and Division zones.',
          channelRule: 'Direct onboarded managers do not require Sub Admin approval; Sub Admin onboarded managers require sign-off.'
        };
      case 'SUBADMIN':
        return {
          title: 'Sub Admins Governance Hub (Main Admin Approved)',
          singular: 'Sub Admin',
          plural: 'Sub Admins',
          icon: Shield,
          accentColor: '#d97706',
          description: 'Sub Admins are authorized and onboarded exclusively by Main Admin (Corporate HQ) across state, district, and division territories.',
          channelRule: '100% Onboarded & Approved by Main Admin only.'
        };
      case 'DELIVERY_PARTNER':
        return {
          title: 'Delivery Partners Hub (Direct Onboard)',
          singular: 'Delivery Partner',
          plural: 'Delivery Partners',
          icon: Truck,
          accentColor: '#0284c7',
          description: 'Two-wheeler and cargo pilots onboarded directly with automated driving license & vehicle RC verification.',
          channelRule: 'Direct application — Territorial Sub Admin approval not required.'
        };
      case 'TECHNICIAN':
        return {
          title: 'Technicians Hub (Direct Onboard)',
          singular: 'Technician',
          plural: 'Technicians',
          icon: Wrench,
          accentColor: '#ec4899',
          description: 'Field service technicians for Electrical, Plumbing, HVAC, and Appliance care onboarded directly with trade certifications.',
          channelRule: 'Direct application — Territorial Sub Admin approval not required.'
        };
      case 'SUPPORT_STAFF':
        return {
          title: 'Support Operations Team (KYC, Payment, Queries)',
          singular: 'Support Staff',
          plural: 'Support Staff',
          icon: UserCheck,
          accentColor: '#002b7f',
          description: 'Internal operational staff for KYC document auditing, payment reconciliations, and query resolutions onboarded & approved by Support Admin.',
          channelRule: 'Onboarded & Approved by Support Admin Command.'
        };
      default:
        return {
          title: 'Stakeholder Operations Hub',
          singular: 'Stakeholder',
          plural: 'Stakeholders',
          icon: Users,
          accentColor: '#002b7f',
          description: 'Unified management of platform stakeholders.',
          channelRule: ''
        };
    }
  }, [currentStakeholder]);

  // Filtered Stakeholders
  const filteredStakeholders = useMemo(() => {
    return stakeholders.filter(item => {
      // Must match current stakeholder type
      if (item.type !== currentStakeholder) return false;

      // Channel filter
      if (channelFilter !== 'ALL' && item.onboardingSource !== channelFilter) return false;

      // Level filter
      if (levelFilter !== 'ALL' && item.level !== levelFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesPhone = item.phone.includes(q);
        const matchesId = item.id.toLowerCase().includes(q);
        const matchesOfficer = item.onboardedBy.toLowerCase().includes(q);
        const matchesState = item.territory.state.toLowerCase().includes(q);
        const matchesDistrict = item.territory.district.toLowerCase().includes(q);
        const matchesDivision = item.territory.division.toLowerCase().includes(q);
        const matchesPincode = item.territory.pincode.includes(q);
        const matchesApprover = item.approval.approverName.toLowerCase().includes(q);
        if (!matchesName && !matchesPhone && !matchesId && !matchesOfficer && !matchesState && !matchesDistrict && !matchesDivision && !matchesPincode && !matchesApprover) {
          return false;
        }
      }

      return true;
    });
  }, [stakeholders, currentStakeholder, channelFilter, levelFilter, searchQuery]);

  // Tab Counts for Current Stakeholder
  const counts = useMemo(() => {
    const list = stakeholders.filter(s => s.type === currentStakeholder);
    const direct = list.filter(s => s.onboardingSource === 'DIRECT').length;
    const subAdminOnboard = list.filter(s => s.onboardingSource === 'SUB_ADMIN').length;
    const mainAdminOnboard = list.filter(s => s.onboardingSource === 'MAIN_ADMIN').length;
    const supportAdminOnboard = list.filter(s => s.onboardingSource === 'SUPPORT_ADMIN').length;
    const active = list.filter(s => s.status === 'ACTIVE').length;

    const currentKyc = kycRequests.filter(k => k.stakeholderType === currentStakeholder);
    const currentQueries = queries.filter(q => q.stakeholderType === currentStakeholder);
    const currentDisputes = disputes.filter(d => d.stakeholderType === currentStakeholder);
    const currentHistory = historyRecords.filter(h => h.stakeholderType === currentStakeholder);
    const currentPayroll = payrollRecords.filter(p => p.stakeholderType === currentStakeholder);

    const totalPayroll = currentPayroll.reduce((acc, p) => acc + p.grossAmount, 0);
    const disbursedPayroll = currentPayroll.filter(p => p.payoutStatus === 'DISBURSED').reduce((acc, p) => acc + p.netPayable, 0);
    const pendingPayroll = currentPayroll.filter(p => p.payoutStatus !== 'DISBURSED').reduce((acc, p) => acc + p.netPayable, 0);

    return {
      total: list.length,
      direct,
      subAdminOnboard,
      mainAdminOnboard,
      supportAdminOnboard,
      active,
      kycPending: currentKyc.filter(k => k.status !== 'APPROVED').length,
      activeQueries: currentQueries.filter(q => q.status !== 'RESOLVED').length,
      disputesPending: currentDisputes.filter(d => d.status !== 'CREDIT_AUTHORIZED').length,
      historyCount: currentHistory.length,
      payrollCount: currentPayroll.length,
      totalPayroll,
      disbursedPayroll,
      pendingPayroll
    };
  }, [stakeholders, currentStakeholder, kycRequests, queries, disputes, historyRecords, payrollRecords]);

  // Actions
  const handleApproveKyc = (reqId: string, name: string) => {
    setKycRequests(prev => prev.map(k => k.reqId === reqId ? { ...k, status: 'APPROVED', notes: 'Approved and certified by Support Admin.' } : k));
    showToast(`KYC for ${name} (${reqId}) verified & marked Active.`);
  };

  const handleRequestReupload = (reqId: string, name: string) => {
    setKycRequests(prev => prev.map(k => k.reqId === reqId ? { ...k, status: 'REUPLOAD_NEEDED', notes: 'Fresh high-resolution document requested from applicant.' } : k));
    showToast(`WhatsApp document re-upload notification dispatched to ${name}.`);
  };

  const handleExecutePayout = () => {
    if (!payoutModalData) return;
    const utr = `CMS${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    setPayrollRecords(prev => prev.map(p => {
      if (p.payrollId === payoutModalData.payrollId) {
        return {
          ...p,
          payoutStatus: 'DISBURSED',
          utrNumber: utr,
          disbursedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
        };
      }
      return p;
    }));
    showToast(`Disbursal of ₹${payoutModalData.netPayable.toLocaleString('en-IN')} released for ${payoutModalData.name} via ${payoutModalData.gateway}. UTR: ${utr}`);
    setPayoutModalData(null);
  };

  const MetaIcon = meta.icon;

  return (
    <div className="stakeholder-operations-hub" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '25px',
          zIndex: 100000,
          background: '#0f172a',
          color: '#ffffff',
          padding: '0.85rem 1.35rem',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          fontSize: '0.84rem',
          fontWeight: 600,
          borderLeft: '4px solid #10b981'
        }}>
          <CheckCircle2 size={18} color="#10b981" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP DESK HEADER */}
      <div className="glass-panel" style={{
        padding: '0.85rem 1.25rem',
        borderRadius: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        borderLeft: `4px solid ${meta.accentColor}`
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: `${meta.accentColor}18`,
            border: `1.5px solid ${meta.accentColor}40`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: meta.accentColor
          }}>
            <MetaIcon size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 700 }}>
              STAKEHOLDER REQUESTS DESK
            </div>
            <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {meta.title}
            </h2>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.3rem 0.65rem',
            borderRadius: '8px',
            fontSize: '0.74rem',
            fontWeight: 700,
            background: '#ecfdf5',
            color: '#059669',
            border: '1px solid #a7f3d0'
          }}>
            <CheckCircle2 size={13} /> {counts.active} Active {meta.plural}
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CONTEXT-SENSITIVE 4 KPI CARDS FOR CURRENT TAB                             */}
      {/* ========================================================================= */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1rem' }}>
        
        {/* DIRECTORY KPIS */}
        {activeTab === 'DIRECTORY' && (
          <>
            <div className="glass-panel" style={{ padding: '0.9rem 1.15rem', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Total Registered {meta.plural}
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: meta.accentColor, margin: '0.15rem 0' }}>
                  {counts.total}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>
                  {currentStakeholder === 'SUBADMIN'
                    ? '100% Main Admin Approved'
                    : currentStakeholder === 'SUPPORT_STAFF'
                    ? 'Support Admin Onboarded'
                    : `${counts.direct} Direct • ${counts.subAdminOnboard} Sub Admin`}
                </div>
              </div>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: `${meta.accentColor}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: meta.accentColor }}>
                <MetaIcon size={20} />
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '0.9rem 1.15rem', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  KYC & Active Status
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#059669', margin: '0.15rem 0' }}>
                  {counts.active} Active
                </div>
                <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 600 }}>
                  100% Verified Profile Integrity
                </div>
              </div>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669' }}>
                <CheckCircle2 size={20} />
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '0.9rem 1.15rem', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {currentStakeholder === 'SUBADMIN' ? 'Main Admin Charters' :
                   currentStakeholder === 'SUPPORT_STAFF' ? 'Support Admin Leads' :
                   'Sub Admin Approvals'}
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0284c7', margin: '0.15rem 0' }}>
                  {currentStakeholder === 'SUBADMIN' ? '100% Approved' :
                   currentStakeholder === 'SUPPORT_STAFF' ? '100% Certified' :
                   (currentStakeholder === 'DELIVERY_PARTNER' || currentStakeholder === 'TECHNICIAN') ? `${counts.direct} Direct Verified` :
                   `${counts.subAdminOnboard} Approved`}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>
                  {currentStakeholder === 'SUBADMIN' ? 'Corporate HQ Certified' :
                   currentStakeholder === 'SUPPORT_STAFF' ? 'Command Floor Authorized' :
                   (currentStakeholder === 'DELIVERY_PARTNER' || currentStakeholder === 'TECHNICIAN') ? 'Sub Admin Approval Bypassed' :
                   `${counts.subAdminOnboard} Sub Admin • ${counts.direct} Direct N/A`}
                </div>
              </div>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#f0f9ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7' }}>
                <ShieldCheck size={20} />
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '0.9rem 1.15rem', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {currentStakeholder === 'DELIVERY_PARTNER' ? 'Completed Deliveries' :
                   currentStakeholder === 'TECHNICIAN' ? 'Completed Work Orders' :
                   currentStakeholder === 'SUPPORT_STAFF' ? 'Daily Desk Capacity' :
                   'Territory Coverage'}
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#7c3aed', margin: '0.15rem 0' }}>
                  {currentStakeholder === 'DELIVERY_PARTNER' ? '148 Trips' :
                   currentStakeholder === 'TECHNICIAN' ? '84 Jobs' :
                   currentStakeholder === 'SUPPORT_STAFF' ? '150 Cases/Day' :
                   '4 Districts'}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#7c3aed', fontWeight: 600 }}>
                  {currentStakeholder === 'DELIVERY_PARTNER' ? '99.2% On-Time Delivery' :
                   currentStakeholder === 'TECHNICIAN' ? '4.9★ Customer Quality Rating' :
                   currentStakeholder === 'SUPPORT_STAFF' ? 'Avg. 50 Cases / Desk' :
                   'Salem, Chennai, CBE, Madurai'}
                </div>
              </div>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#faf5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c3aed' }}>
                <MapPin size={20} />
              </div>
            </div>
          </>
        )}

        {/* OPERATIONS KPIS */}
        {activeTab === 'OPERATIONS' && (
          <>
            <div className="glass-panel" style={{ padding: '1rem 1.25rem', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Pending KYC Sign-Off
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0284c7', margin: '0.15rem 0' }}>
                  {counts.kycPending} Pending
                </div>
                <div style={{ fontSize: '0.72rem', color: '#0284c7' }}>
                  Awaiting Support Admin Review
                </div>
              </div>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#f0f9ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7' }}>
                <FileCheck size={22} />
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1rem 1.25rem', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Active Operational Queries
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#d97706', margin: '0.15rem 0' }}>
                  {counts.activeQueries} Active
                </div>
                <div style={{ fontSize: '0.72rem', color: '#d97706', fontWeight: 600 }}>
                  App & Geofence Support Tickets
                </div>
              </div>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706' }}>
                <HelpCircle size={22} />
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1rem 1.25rem', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Settlement & Payout Disputes
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#dc2626', margin: '0.15rem 0' }}>
                  {counts.disputesPending} Disputes
                </div>
                <div style={{ fontSize: '0.72rem', color: '#dc2626' }}>
                  Commission & Trip Reconciliations
                </div>
              </div>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626' }}>
                <CreditCard size={22} />
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1rem 1.25rem', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Auto-OCR Verification Pass Rate
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#059669', margin: '0.15rem 0' }}>
                  98.2%
                </div>
                <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 600 }}>
                  AI Verified Documents Integrity
                </div>
              </div>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669' }}>
                <CheckCircle2 size={22} />
              </div>
            </div>
          </>
        )}

        {/* HISTORY KPIS */}
        {activeTab === 'HISTORY' && (
          <>
            <div className="glass-panel" style={{ padding: '1rem 1.25rem', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Total Attended Cases
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: meta.accentColor, margin: '0.15rem 0' }}>
                  {counts.historyCount} Cases
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                  100% Comprehensive Audit Trail
                </div>
              </div>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${meta.accentColor}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: meta.accentColor }}>
                <History size={22} />
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1rem 1.25rem', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Resolution Success Rate
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#059669', margin: '0.15rem 0' }}>
                  100%
                </div>
                <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 600 }}>
                  0 Pending Escalations Breached
                </div>
              </div>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669' }}>
                <CheckCircle2 size={22} />
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1rem 1.25rem', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Average Turnaround (TAT)
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0284c7', margin: '0.15rem 0' }}>
                  36 Mins
                </div>
                <div style={{ fontSize: '0.72rem', color: '#0284c7' }}>
                  Human TL & AI Resolver Co-Pilot
                </div>
              </div>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#f0f9ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7' }}>
                <Clock size={22} />
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1rem 1.25rem', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Routing Teams
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#7c3aed', margin: '0.15rem 0' }}>
                  3 Desks
                </div>
                <div style={{ fontSize: '0.72rem', color: '#7c3aed', fontWeight: 600 }}>
                  Sub Admin • Support Admin • Payment
                </div>
              </div>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#faf5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c3aed' }}>
                <Shield size={22} />
              </div>
            </div>
          </>
        )}

        {/* PAYROLL KPIS */}
        {activeTab === 'PAYROLL' && (
          <>
            <div className="glass-panel" style={{ padding: '1rem 1.25rem', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Gross Payroll & Compensation
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#d97706', margin: '0.15rem 0' }}>
                  ₹{(counts.totalPayroll / 1000).toLocaleString('en-IN', { maximumFractionDigits: 1 })}k
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                  Current Bi-Weekly Disbursement Cycle
                </div>
              </div>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706' }}>
                <DollarSign size={22} />
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1rem 1.25rem', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Disbursed Amount
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#059669', margin: '0.15rem 0' }}>
                  ₹{(counts.disbursedPayroll / 1000).toFixed(1)}k
                </div>
                <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 600 }}>
                  Processed via CMS Bank Gateways
                </div>
              </div>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669' }}>
                <CheckCircle2 size={22} />
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1rem 1.25rem', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Pending Disbursal Release
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0284c7', margin: '0.15rem 0' }}>
                  ₹{(counts.pendingPayroll / 1000).toFixed(1)}k
                </div>
                <div style={{ fontSize: '0.72rem', color: '#0284c7' }}>
                  Awaiting Support Admin Authorization
                </div>
              </div>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#f0f9ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7' }}>
                <Clock size={22} />
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1rem 1.25rem', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  TDS & Stat. Withholdings
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#7c3aed', margin: '0.15rem 0' }}>
                  ₹{(counts.totalPayroll * 0.01 / 1000).toFixed(1)}k
                </div>
                <div style={{ fontSize: '0.72rem', color: '#7c3aed', fontWeight: 600 }}>
                  1.0% TDS Deducted Under Section 194-H
                </div>
              </div>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#faf5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c3aed' }}>
                <Tag size={22} />
              </div>
            </div>
          </>
        )}
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: DIRECTORY TABLE                                               */}
      {/* ========================================================================= */}
      {activeTab === 'DIRECTORY' && (
        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px', borderLeft: `4px solid ${meta.accentColor}` }}>
          
          {/* Header & Filters */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.85rem' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MetaIcon size={20} color={meta.accentColor} />
                <span>1. {meta.plural} Directory & Onboarding Channels</span>
              </h3>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {meta.description}
              </p>
            </div>

            {/* Channel Filter Pills (Direct vs Sub Admin vs Main Admin vs Support Admin) */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {currentStakeholder === 'SUBADMIN' ? (
                <div style={{ padding: '0.35rem 0.75rem', borderRadius: '10px', fontSize: '0.74rem', fontWeight: 700, background: '#fffbeb', color: '#d97706', border: '1px solid #fde68a' }}>
                  👑 100% Onboarded & Approved by Main Admin (Corporate HQ)
                </div>
              ) : currentStakeholder === 'SUPPORT_STAFF' ? (
                <div style={{ padding: '0.35rem 0.75rem', borderRadius: '10px', fontSize: '0.74rem', fontWeight: 700, background: '#eff6ff', color: '#002b7f', border: '1px solid #bfdbfe' }}>
                  🛡️ 100% Onboarded & Approved by Support Admin Command
                </div>
              ) : (currentStakeholder === 'DELIVERY_PARTNER' || currentStakeholder === 'TECHNICIAN') ? (
                <div style={{ padding: '0.35rem 0.75rem', borderRadius: '10px', fontSize: '0.74rem', fontWeight: 700, background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0' }}>
                  ⚡ Direct Onboarding — Territorial Sub Admin Approval Bypassed
                </div>
              ) : (
                [
                  { id: 'ALL', label: `All Channels (${counts.total})`, color: meta.accentColor },
                  { id: 'DIRECT', label: `Direct (${counts.direct})`, color: '#10b981' },
                  { id: 'SUB_ADMIN', label: `Sub Admin (${counts.subAdminOnboard})`, color: '#8b5cf6' }
                ].map(f => {
                  const isSelected = channelFilter === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setChannelFilter(f.id as any)}
                      style={{
                        padding: '0.35rem 0.75rem',
                        borderRadius: '10px',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        border: isSelected ? `1.5px solid ${f.color}` : '1px solid var(--border-color, #cbd5e1)',
                        background: isSelected ? f.color : 'transparent',
                        color: isSelected ? '#ffffff' : 'var(--text-main)',
                        cursor: 'pointer'
                      }}
                    >
                      {f.label}
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Search bar & Hierarchy Filter */}
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
              <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder={`Search ${meta.singular} name, phone, Reg ID, territory (state/district/division/pincode), or approver...`}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.58rem 0.75rem 0.58rem 2.25rem',
                  borderRadius: '10px',
                  background: 'var(--bg-input, #ffffff)',
                  border: '1px solid var(--border-color, #cbd5e1)',
                  color: 'var(--text-main)',
                  fontSize: '0.82rem'
                }}
              />
            </div>

            {/* Level Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Level:</span>
              {(['ALL', 'STATE', 'DISTRICT', 'DIVISION', 'PINCODE'] as const).map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setLevelFilter(lvl)}
                  style={{
                    padding: '0.3rem 0.55rem',
                    borderRadius: '8px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    border: levelFilter === lvl ? '1.5px solid #002b7f' : '1px solid #cbd5e1',
                    background: levelFilter === lvl ? '#002b7f' : '#ffffff',
                    color: levelFilter === lvl ? '#ffffff' : '#475569',
                    cursor: 'pointer'
                  }}
                >
                  {lvl}
                </button>
              ))}
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

          {/* TABLE WITH S.NO PRECEDING NAME & STORE / PARTICULARS */}
          <div style={{ overflowX: 'auto' }}>
            <table className="table" style={{ width: '100%', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ borderBottom: '1.5px solid rgba(0,0,0,0.1)', textAlign: 'left', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem', width: '50px' }}>S.No</th>
                  <th style={{ padding: '0.75rem' }}>{meta.singular} Name & Phone</th>
                  <th style={{ padding: '0.75rem' }}>Reg ID & Role</th>
                  <th style={{ padding: '0.75rem' }}>Onboarded By</th>
                  <th style={{ padding: '0.75rem' }}>Territory (Hierarchy)</th>
                  <th style={{ padding: '0.75rem' }}>
                    {currentStakeholder === 'SUBADMIN' ? 'Main Admin Approval' :
                     currentStakeholder === 'SUPPORT_STAFF' ? 'Support Admin Approval' :
                     'Sub Admin Approval'}
                  </th>
                  <th style={{ padding: '0.75rem' }}>Level / Status</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStakeholders.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: 'center', padding: '2.5rem', color: '#64748b' }}>
                      No {meta.plural} match the selected channel or search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredStakeholders.map((item, index) => {
                    const isDirect = item.onboardingSource === 'DIRECT';
                    const isSubAdmin = item.onboardingSource === 'SUB_ADMIN';
                    const isMainAdmin = item.onboardingSource === 'MAIN_ADMIN';
                    const isSupportAdmin = item.onboardingSource === 'SUPPORT_ADMIN';

                    return (
                      <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color, rgba(0,0,0,0.06))' }}>
                        {/* 1. S.No */}
                        <td style={{ padding: '0.75rem', fontWeight: 700, color: '#64748b', fontSize: '0.85rem' }}>
                          {index + 1}
                        </td>

                        {/* 2. Name & Contact */}
                        <td style={{ padding: '0.75rem', minWidth: '170px' }}>
                          <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-main)' }}>{item.name}</div>
                          <div style={{ fontSize: '0.72rem', color: '#0284c7', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.15rem', fontWeight: 600 }}>
                            <Phone size={11} /> {item.phone}
                          </div>
                          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>{item.email}</div>
                        </td>

                        {/* 3. Reg ID & Role */}
                        <td style={{ padding: '0.75rem', minWidth: '150px' }}>
                          <span style={{
                            fontFamily: 'monospace',
                            fontWeight: 800,
                            color: '#002b7f',
                            background: '#e0f2fe',
                            padding: '0.15rem 0.45rem',
                            borderRadius: '6px',
                            fontSize: '0.72rem'
                          }}>
                            {item.id}
                          </span>
                          <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155', marginTop: '0.25rem' }}>
                            {item.roleTitle}
                          </div>
                        </td>

                        {/* 4. Onboarded By */}
                        <td style={{ padding: '0.75rem', minWidth: '160px' }}>
                          <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            padding: '0.15rem 0.55rem',
                            borderRadius: '12px',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            background: isDirect ? '#ecfdf5' : isSubAdmin ? '#faf5ff' : isMainAdmin ? '#fffbeb' : '#eff6ff',
                            color: isDirect ? '#059669' : isSubAdmin ? '#7c3aed' : isMainAdmin ? '#d97706' : '#002b7f',
                            border: `1px solid ${isDirect ? '#a7f3d0' : isSubAdmin ? '#e9d5ff' : isMainAdmin ? '#fde68a' : '#bfdbfe'}`
                          }}>
                            {isDirect ? <UserCheck size={11} /> : isSubAdmin ? <UsersRound size={11} /> : isMainAdmin ? <Crown size={11} /> : <ShieldCheck size={11} />}
                            {item.onboardedBy}
                          </div>
                          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                            Joined: {item.joinedDate}
                          </div>
                        </td>

                        {/* 5. Territory (Hierarchy) */}
                        <td style={{ padding: '0.75rem', minWidth: '190px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600, color: 'var(--text-main)', fontSize: '0.78rem' }}>
                            <MapPin size={12} color="#0284c7" />
                            <span>{item.territory.state} &gt; {item.territory.district}</span>
                          </div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                            {item.territory.division}
                          </div>
                          <div style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: '#d97706', fontWeight: 600 }}>
                            PIN: {item.territory.pincode}
                          </div>
                        </td>

                        {/* 6. Sub Admin / Main Admin Approval Column */}
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
                          ) : isMainAdmin ? (
                            <div>
                              <div style={{ fontWeight: 700, color: '#d97706', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem' }}>
                                <Crown size={12} color="#d97706" />
                                <span>Main Admin Approved</span>
                              </div>
                              <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '0.15rem' }}>
                                Authorized by Corporate HQ
                              </div>
                            </div>
                          ) : isSupportAdmin ? (
                            <div>
                              <div style={{ fontWeight: 700, color: '#002b7f', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem' }}>
                                <ShieldCheck size={12} color="#002b7f" />
                                <span>Support Admin Approved</span>
                              </div>
                              <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '0.15rem' }}>
                                Verified on Support Floor
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div style={{ fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                <Shield size={12} color="#7c3aed" />
                                <span>{item.approval.approverName}</span>
                              </div>
                              <div style={{ fontSize: '0.72rem', color: '#0284c7', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.1rem', fontWeight: 600 }}>
                                <Phone size={11} /> {item.approval.approverMobile}
                              </div>
                              <span style={{
                                display: 'inline-block',
                                marginTop: '0.2rem',
                                padding: '0.05rem 0.4rem',
                                borderRadius: '6px',
                                fontSize: '0.64rem',
                                fontWeight: 700,
                                background: '#faf5ff',
                                color: '#7c3aed',
                                border: '1px solid #e9d5ff'
                              }}>
                                ✓ Sub Admin Approved
                              </span>
                            </div>
                          )}
                        </td>

                        {/* 7. Level & Status */}
                        <td style={{ padding: '0.75rem', minWidth: '130px' }}>
                          <span style={{
                            display: 'inline-block',
                            padding: '0.15rem 0.5rem',
                            borderRadius: '8px',
                            fontSize: '0.68rem',
                            fontWeight: 800,
                            background: '#f1f5f9',
                            color: '#334155',
                            border: '1px solid #cbd5e1'
                          }}>
                            {item.level} LEVEL
                          </span>
                          <div style={{ marginTop: '0.25rem' }}>
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.25rem',
                              padding: '0.1rem 0.45rem',
                              borderRadius: '8px',
                              fontSize: '0.68rem',
                              fontWeight: 700,
                              background: '#ecfdf5',
                              color: '#059669',
                              border: '1px solid #a7f3d0'
                            }}>
                              ✓ Verified • Active
                            </span>
                          </div>
                        </td>

                        {/* 8. Actions: View Button */}
                        <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                          <button
                            onClick={() => setSelectedStakeholderDossier(item)}
                            style={{
                              background: 'linear-gradient(135deg, #002b7f, #1e40af)',
                              color: '#ffffff',
                              border: 'none',
                              padding: '0.35rem 0.75rem',
                              borderRadius: '8px',
                              fontSize: '0.74rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              boxShadow: '0 2px 6px rgba(0, 43, 127, 0.25)'
                            }}
                          >
                            <Eye size={12} /> View
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: KYC, QUERIES & PAYMENT HUB                                     */}
      {/* ========================================================================= */}
      {activeTab === 'OPERATIONS' && (
        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px', borderLeft: '4px solid #0284c7' }}>
          
          {/* Sub-Stream Filter Pills */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileCheck size={20} color="#0284c7" />
                <span>2. {meta.singular} KYC, Queries & Payment Hub</span>
              </h3>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Handle incoming registration KYC queues, live operational support tickets, and commission reconciliations.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {[
                { id: 'KYC_QUEUE', label: `1. New KYC Queue (${counts.kycPending})`, color: '#0284c7' },
                { id: 'QUERIES', label: `2. ${meta.singular} Queries (${counts.activeQueries})`, color: '#d97706' },
                { id: 'PAYMENTS', label: `3. Settlement Disputes (${counts.disputesPending})`, color: '#dc2626' }
              ].map(sub => {
                const isSelected = opsSubStream === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setOpsSubStream(sub.id as OpsSubStream)}
                    style={{
                      padding: '0.4rem 0.85rem',
                      borderRadius: '10px',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: isSelected ? `1.5px solid ${sub.color}` : '1px solid var(--border-color, #cbd5e1)',
                      background: isSelected ? sub.color : 'transparent',
                      color: isSelected ? '#ffffff' : 'var(--text-main)'
                    }}
                  >
                    {sub.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SUB-SECTION 1: KYC QUEUE */}
          {opsSubStream === 'KYC_QUEUE' && (
            <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '1.25rem' }}>
              <div style={{ overflowX: 'auto' }}>
                <table className="table" style={{ width: '100%', fontSize: '0.8rem', background: '#ffffff', borderRadius: '10px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1.5px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
                      <th style={{ padding: '0.7rem', width: '45px' }}>S.No</th>
                      <th style={{ padding: '0.7rem' }}>{meta.singular} & Contact</th>
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
                          <td style={{ padding: '0.7rem', fontWeight: 700, color: '#64748b' }}>{idx + 1}</td>
                          <td style={{ padding: '0.7rem' }}>
                            <div style={{ fontWeight: 700, color: '#0f172a' }}>{req.name}</div>
                            <div style={{ fontSize: '0.72rem', color: '#0284c7', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.1rem', fontWeight: 600 }}>
                              <Phone size={11} /> {req.phone}
                            </div>
                            <div style={{ fontSize: '0.68rem', fontFamily: 'monospace', color: '#64748b' }}>{req.stakeholderId} • {req.roleTitle}</div>
                          </td>
                          <td style={{ padding: '0.7rem' }}>
                            <div style={{ fontWeight: 600, color: '#0f172a' }}>{req.onboardedBy}</div>
                            <div style={{ fontSize: '0.72rem', color: '#7c3aed', marginTop: '0.15rem' }}>
                              {req.approvalInfo}
                            </div>
                            <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '0.1rem' }}>Submitted: {req.submittedAt}</div>
                          </td>
                          <td style={{ padding: '0.7rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                              {req.documents.map((doc, dIdx) => (
                                <div key={dIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem' }}>
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
                              color: isApproved ? '#059669' : isReupload ? '#d97706' : '#0284c7'
                            }}>
                              {isApproved ? '✓ Approved' : isReupload ? '⚠ Re-upload' : 'Under Review'}
                            </span>
                          </td>
                          <td style={{ padding: '0.7rem', textAlign: 'right' }}>
                            <div style={{ display: 'inline-flex', gap: '0.35rem' }}>
                              {!isApproved && (
                                <button
                                  className="btn btn-success"
                                  onClick={() => handleApproveKyc(req.reqId, req.name)}
                                  style={{ padding: '0.25rem 0.55rem', fontSize: '0.7rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                                >
                                  <Check size={11} /> Approve
                                </button>
                              )}
                              {isReupload ? (
                                <button
                                  className="btn btn-warning"
                                  onClick={() => handleRequestReupload(req.reqId, req.name)}
                                  style={{ padding: '0.25rem 0.55rem', fontSize: '0.7rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                                >
                                  <Send size={11} /> Remind WhatsApp
                                </button>
                              ) : !isApproved && (
                                <button
                                  className="btn btn-secondary"
                                  onClick={() => handleRequestReupload(req.reqId, req.name)}
                                  style={{ padding: '0.25rem 0.55rem', fontSize: '0.7rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                                >
                                  <AlertTriangle size={11} /> Re-upload
                                </button>
                              )}
                              <button
                                className="btn btn-secondary"
                                onClick={() => {
                                  const match = stakeholders.find(s => s.id === req.stakeholderId);
                                  if (match) setSelectedStakeholderDossier(match);
                                }}
                                style={{ padding: '0.25rem 0.55rem', fontSize: '0.7rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
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

          {/* SUB-SECTION 2: QUERIES */}
          {opsSubStream === 'QUERIES' && (
            <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '1.25rem' }}>
              <div style={{ overflowX: 'auto' }}>
                <table className="table" style={{ width: '100%', fontSize: '0.8rem', background: '#ffffff', borderRadius: '10px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1.5px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
                      <th style={{ padding: '0.7rem', width: '45px' }}>S.No</th>
                      <th style={{ padding: '0.7rem' }}>Ticket ID & {meta.singular}</th>
                      <th style={{ padding: '0.7rem' }}>Issue Category</th>
                      <th style={{ padding: '0.7rem' }}>Description</th>
                      <th style={{ padding: '0.7rem' }}>Assigned Desk & SLA</th>
                      <th style={{ padding: '0.7rem' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {queries.map((q, idx) => (
                      <tr key={q.queryId} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '0.7rem', fontWeight: 700, color: '#64748b' }}>{idx + 1}</td>
                        <td style={{ padding: '0.7rem' }}>
                          <div style={{ fontFamily: 'monospace', fontWeight: 800, color: '#7c3aed' }}>{q.queryId}</div>
                          <div style={{ fontWeight: 700, color: '#0f172a' }}>{q.name}</div>
                          <div style={{ fontSize: '0.68rem', color: '#64748b' }}>{q.phone}</div>
                        </td>
                        <td style={{ padding: '0.7rem' }}>
                          <div style={{ fontWeight: 700, color: '#0284c7' }}>{q.issueType}</div>
                          <span style={{ fontSize: '0.62rem', padding: '0.05rem 0.35rem', borderRadius: '4px', background: q.severity === 'HIGH' ? '#fef2f2' : '#fffbeb', color: q.severity === 'HIGH' ? '#dc2626' : '#d97706', fontWeight: 700 }}>
                            {q.severity}
                          </span>
                        </td>
                        <td style={{ padding: '0.7rem', maxWidth: '240px' }}>
                          <div style={{ fontSize: '0.74rem', color: '#334155', lineHeight: 1.35 }}>{q.description}</div>
                        </td>
                        <td style={{ padding: '0.7rem' }}>
                          <div style={{ fontWeight: 600, color: '#0f172a' }}>{q.assignedDesk}</div>
                          <div style={{ fontSize: '0.7rem', color: '#dc2626', fontWeight: 700, marginTop: '0.15rem' }}>⏱ {q.sla}</div>
                        </td>
                        <td style={{ padding: '0.7rem' }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: '0.2rem 0.55rem',
                            borderRadius: '12px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            background: q.status === 'RESOLVED' ? '#ecfdf5' : '#eff6ff',
                            color: q.status === 'RESOLVED' ? '#059669' : '#2563eb'
                          }}>
                            {q.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SUB-SECTION 3: PAYMENT DISPUTES */}
          {opsSubStream === 'PAYMENTS' && (
            <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '1.25rem' }}>
              <div style={{ overflowX: 'auto' }}>
                <table className="table" style={{ width: '100%', fontSize: '0.8rem', background: '#ffffff', borderRadius: '10px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1.5px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
                      <th style={{ padding: '0.7rem', width: '45px' }}>S.No</th>
                      <th style={{ padding: '0.7rem' }}>Dispute ID & {meta.singular}</th>
                      <th style={{ padding: '0.7rem' }}>Disputed Amount</th>
                      <th style={{ padding: '0.7rem' }}>Nature of Dispute</th>
                      <th style={{ padding: '0.7rem' }}>Status</th>
                      <th style={{ padding: '0.7rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {disputes.map((d, idx) => (
                      <tr key={d.disputeId} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '0.7rem', fontWeight: 700, color: '#64748b' }}>{idx + 1}</td>
                        <td style={{ padding: '0.7rem' }}>
                          <div style={{ fontFamily: 'monospace', fontWeight: 800, color: '#dc2626' }}>{d.disputeId}</div>
                          <div style={{ fontWeight: 700, color: '#0f172a' }}>{d.name}</div>
                          <div style={{ fontSize: '0.68rem', color: '#64748b' }}>{d.roleTitle}</div>
                        </td>
                        <td style={{ padding: '0.7rem', fontWeight: 800, fontSize: '0.9rem', color: '#dc2626' }}>
                          ₹{d.disputedAmount.toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '0.7rem' }}>
                          <div style={{ fontWeight: 700, color: '#0f172a' }}>{d.issueType}</div>
                          <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{d.description}</div>
                        </td>
                        <td style={{ padding: '0.7rem' }}>
                          <span style={{
                            padding: '0.2rem 0.55rem',
                            borderRadius: '12px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            background: d.status === 'CREDIT_AUTHORIZED' ? '#ecfdf5' : '#fffbeb',
                            color: d.status === 'CREDIT_AUTHORIZED' ? '#059669' : '#d97706'
                          }}>
                            {d.status}
                          </span>
                        </td>
                        <td style={{ padding: '0.7rem', textAlign: 'right' }}>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              setDisputes(prev => prev.map(item => item.disputeId === d.disputeId ? { ...item, status: 'CREDIT_AUTHORIZED' } : item));
                              showToast(`Dispute ${d.disputeId} settled. ₹${d.disputedAmount} credited to ${d.name}'s wallet.`);
                            }}
                            style={{ padding: '0.25rem 0.65rem', fontSize: '0.72rem' }}
                          >
                            Release Credit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: TICKET ROUTING HISTORY                                         */}
      {/* ========================================================================= */}
      {activeTab === 'HISTORY' && (
        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px', borderLeft: '4px solid #7c3aed' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <History size={20} color="#7c3aed" />
                <span>3. Ticket Routing & Complete Resolution History</span>
              </h3>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Audit ledger showing which team received each ticket, who attended it (Human Lead or Sub Admin), turnaround time (TAT), and complete case notes.
              </p>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="table" style={{ width: '100%', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ borderBottom: '1.5px solid rgba(0,0,0,0.1)', textAlign: 'left', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem', width: '50px' }}>S.No</th>
                  <th style={{ padding: '0.75rem' }}>Ticket ID & Date</th>
                  <th style={{ padding: '0.75rem' }}>{meta.singular} Particulars</th>
                  <th style={{ padding: '0.75rem' }}>Issue Subject & Case Notes</th>
                  <th style={{ padding: '0.75rem' }}>Assigned Team</th>
                  <th style={{ padding: '0.75rem' }}>Attended By</th>
                  <th style={{ padding: '0.75rem' }}>Status & TAT</th>
                </tr>
              </thead>
              <tbody>
                {historyRecords.map((rec, idx) => (
                  <tr key={rec.ticketId} style={{ borderBottom: '1px solid var(--border-color, rgba(0,0,0,0.06))' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 700, color: '#64748b' }}>{idx + 1}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <div style={{ fontFamily: 'monospace', fontWeight: 800, color: '#0284c7' }}>{rec.ticketId}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{rec.createdAt}</div>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{rec.stakeholderName}</div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>ID: {rec.stakeholderId}</div>
                    </td>
                    <td style={{ padding: '0.75rem', maxWidth: '240px' }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{rec.issueTitle}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem', lineHeight: 1.35 }}>
                        {rec.resolutionNotes}
                      </div>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', color: '#7c3aed', fontWeight: 600 }}>
                        <Shield size={12} />
                        <span>{rec.assignedTeam}</span>
                      </div>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{rec.attendedBy}</div>
                      <span style={{ fontSize: '0.65rem', padding: '0.05rem 0.4rem', borderRadius: '4px', background: '#ecfdf5', color: '#059669', fontWeight: 700 }}>
                        {rec.auditBadge}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{
                        padding: '0.15rem 0.5rem',
                        borderRadius: '8px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        background: '#ecfdf5',
                        color: '#059669'
                      }}>
                        ✓ {rec.status}
                      </span>
                      <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.2rem', fontWeight: 600 }}>
                        ⏱ TAT: {rec.resolutionTimeMinutes} mins
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
      {/* SECTION 4: PAYROLL & COMMISSION LEDGER                                    */}
      {/* ========================================================================= */}
      {activeTab === 'PAYROLL' && (
        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px', borderLeft: '4px solid #d97706' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <DollarSign size={20} color="#d97706" />
                <span>4. {meta.singular} Payroll, Compensation & Ledger</span>
              </h3>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Comprehensive compensation register: gross incentives, platform deductions, statutory 1% TDS, net payable, and bank CMS disbursal status.
              </p>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="table" style={{ width: '100%', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ borderBottom: '1.5px solid rgba(0,0,0,0.1)', textAlign: 'left', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem', width: '50px' }}>S.No</th>
                  <th style={{ padding: '0.75rem' }}>Payroll ID & Period</th>
                  <th style={{ padding: '0.75rem' }}>{meta.singular} Details</th>
                  <th style={{ padding: '0.75rem' }}>Settlement Bank & IFSC</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right' }}>Gross Amount</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right' }}>Deductions & TDS</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right' }}>Net Payable</th>
                  <th style={{ padding: '0.75rem' }}>Status & UTR</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {payrollRecords.map((pay, idx) => {
                  const isDisbursed = pay.payoutStatus === 'DISBURSED';
                  return (
                    <tr key={pay.payrollId} style={{ borderBottom: '1px solid var(--border-color, rgba(0,0,0,0.06))' }}>
                      <td style={{ padding: '0.75rem', fontWeight: 700, color: '#64748b' }}>{idx + 1}</td>
                      <td style={{ padding: '0.75rem' }}>
                        <div style={{ fontFamily: 'monospace', fontWeight: 800, color: '#d97706' }}>{pay.payrollId}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{pay.payPeriod}</div>
                      </td>
                      <td style={{ padding: '0.75rem' }}>
                        <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{pay.name}</div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{pay.roleTitle}</div>
                        <div style={{ fontSize: '0.68rem', fontFamily: 'monospace', color: '#64748b' }}>PAN: {pay.panNumber}</div>
                      </td>
                      <td style={{ padding: '0.75rem' }}>
                        <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{pay.bankName}</div>
                        <div style={{ fontSize: '0.72rem', fontFamily: 'monospace', color: 'var(--text-muted)' }}>{pay.accountNumber}</div>
                        <div style={{ fontSize: '0.68rem', color: '#0284c7', fontWeight: 600 }}>IFSC: {pay.ifscCode}</div>
                      </td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 700, color: 'var(--text-main)' }}>
                        ₹{pay.grossAmount.toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                        <div style={{ color: '#dc2626', fontWeight: 600, fontSize: '0.78rem' }}>
                          -₹{(pay.deductions + pay.tdsAmount).toLocaleString('en-IN')}
                        </div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                          TDS: ₹{pay.tdsAmount} (1%)
                        </div>
                      </td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 800, fontSize: '0.92rem', color: '#059669' }}>
                        ₹{pay.netPayable.toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '0.75rem' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '8px',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          background: isDisbursed ? '#ecfdf5' : '#fffbeb',
                          color: isDisbursed ? '#059669' : '#d97706'
                        }}>
                          {isDisbursed ? '✓ DISBURSED' : '⏱ PENDING RELEASE'}
                        </span>
                        {pay.utrNumber && (
                          <div style={{ fontSize: '0.68rem', fontFamily: 'monospace', color: '#0284c7', marginTop: '0.2rem', fontWeight: 600 }}>
                            UTR: {pay.utrNumber}
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                        {!isDisbursed ? (
                          <button
                            onClick={() => setPayoutModalData(pay)}
                            style={{
                              background: 'linear-gradient(135deg, #059669, #047857)',
                              color: '#ffffff',
                              border: 'none',
                              padding: '0.35rem 0.75rem',
                              borderRadius: '8px',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            Release Payout
                          </button>
                        ) : (
                          <span style={{ fontSize: '0.7rem', color: '#64748b' }}>
                            Settled on {pay.disbursedAt}
                          </span>
                        )}
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
      {/* POPUP 1: FULL REGISTRATION DOSSIER & DOCUMENTS MODAL (LIGHT THEME)         */}
      {/* ========================================================================= */}
      {selectedStakeholderDossier && createPortal(
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999999,
          padding: '1.5rem'
        }}
        onClick={() => setSelectedStakeholderDossier(null)}
        >
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            maxWidth: '820px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '1.75rem',
            boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
            border: '1.5px solid #e2e8f0',
            color: '#0f172a'
          }}
          onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1.5px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#002b7f', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em' }}>
                  FORGE INDIA CONNECT • OFFICIAL REGISTRATION DOSSIER
                </div>
                <h3 style={{ margin: '0.2rem 0 0 0', fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
                  {selectedStakeholderDossier.name}
                </h3>
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.15rem' }}>
                  Reg ID: <strong style={{ color: '#002b7f', fontFamily: 'monospace' }}>{selectedStakeholderDossier.id}</strong> • Role: <strong>{selectedStakeholderDossier.roleTitle}</strong>
                </div>
              </div>
              <button
                onClick={() => setSelectedStakeholderDossier(null)}
                style={{ background: '#f1f5f9', border: 'none', borderRadius: '8px', padding: '0.4rem', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* 4 Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '0.85rem', marginBottom: '1.25rem' }}>
              
              {/* Card 1: Personal & Contact */}
              <div style={{ background: '#f8fafc', padding: '0.9rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.72rem', color: '#0284c7', textTransform: 'uppercase', fontWeight: 800, marginBottom: '0.5rem' }}>
                  Identity & Contact
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.78rem' }}>
                  <div><span style={{ color: '#64748b' }}>Full Legal Name:</span> <strong style={{ color: '#0f172a' }}>{selectedStakeholderDossier.registrationDetails.legalName}</strong></div>
                  <div><span style={{ color: '#64748b' }}>Mobile:</span> <strong style={{ color: '#0284c7' }}>{selectedStakeholderDossier.phone}</strong></div>
                  <div><span style={{ color: '#64748b' }}>Email:</span> <span style={{ color: '#334155' }}>{selectedStakeholderDossier.email}</span></div>
                  <div><span style={{ color: '#64748b' }}>PAN Number:</span> <strong style={{ color: '#d97706', fontFamily: 'monospace' }}>{selectedStakeholderDossier.registrationDetails.panNumber}</strong></div>
                </div>
              </div>

              {/* Card 2: Onboarding Channel & Approval Authority */}
              <div style={{ background: '#f8fafc', padding: '0.9rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.72rem', color: '#7c3aed', textTransform: 'uppercase', fontWeight: 800, marginBottom: '0.5rem' }}>
                  Onboarding & Approval
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.78rem' }}>
                  <div><span style={{ color: '#64748b' }}>Source:</span> <strong style={{ color: '#7c3aed' }}>{selectedStakeholderDossier.onboardingSource}</strong></div>
                  <div><span style={{ color: '#64748b' }}>Onboarded By:</span> <span style={{ color: '#0f172a', fontWeight: 600 }}>{selectedStakeholderDossier.onboardedBy}</span></div>
                  <div>
                    <span style={{ color: '#64748b' }}>Sub Admin Approval:</span>{' '}
                    {selectedStakeholderDossier.onboardingSource === 'DIRECT' ? (
                      <strong style={{ color: '#64748b' }}>— Not Applicable (Direct)</strong>
                    ) : (
                      <strong style={{ color: '#059669' }}>✓ {selectedStakeholderDossier.approval.approverName}</strong>
                    )}
                  </div>
                  <div><span style={{ color: '#64748b' }}>Date Joined:</span> <span style={{ color: '#334155' }}>{selectedStakeholderDossier.joinedDate}</span></div>
                </div>
              </div>

              {/* Card 3: Territory Hierarchy */}
              <div style={{ background: '#f8fafc', padding: '0.9rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.72rem', color: '#059669', textTransform: 'uppercase', fontWeight: 800, marginBottom: '0.5rem' }}>
                  Territory Hierarchy
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.78rem' }}>
                  <div><span style={{ color: '#64748b' }}>State &gt; District:</span> <strong style={{ color: '#0f172a' }}>{selectedStakeholderDossier.territory.state} &gt; {selectedStakeholderDossier.territory.district}</strong></div>
                  <div><span style={{ color: '#64748b' }}>Division:</span> <span style={{ color: '#0f172a' }}>{selectedStakeholderDossier.territory.division}</span></div>
                  <div><span style={{ color: '#64748b' }}>Pincode:</span> <strong style={{ color: '#d97706' }}>{selectedStakeholderDossier.territory.pincode}</strong></div>
                  <div><span style={{ color: '#64748b' }}>Jurisdiction Level:</span> <strong style={{ color: '#002b7f' }}>{selectedStakeholderDossier.level} LEVEL</strong></div>
                </div>
              </div>

              {/* Card 4: Banking & Settlement */}
              <div style={{ background: '#f8fafc', padding: '0.9rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.72rem', color: '#d97706', textTransform: 'uppercase', fontWeight: 800, marginBottom: '0.5rem' }}>
                  Settlement Bank
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.78rem' }}>
                  <div><span style={{ color: '#64748b' }}>Bank Name:</span> <strong style={{ color: '#0f172a' }}>{selectedStakeholderDossier.registrationDetails.bankName}</strong></div>
                  <div><span style={{ color: '#64748b' }}>Account:</span> <strong style={{ color: '#0f172a', fontFamily: 'monospace' }}>{selectedStakeholderDossier.registrationDetails.accountNumber}</strong></div>
                  <div><span style={{ color: '#64748b' }}>IFSC:</span> <strong style={{ color: '#0284c7', fontFamily: 'monospace' }}>{selectedStakeholderDossier.registrationDetails.ifscCode}</strong></div>
                  <div><span style={{ color: '#64748b' }}>Emergency:</span> <span style={{ color: '#475569' }}>{selectedStakeholderDossier.registrationDetails.emergencyContact}</span></div>
                </div>
              </div>

            </div>

            {/* Uploaded Documents List */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <FileText size={16} color="#0284c7" /> Uploaded Registration Documents ({selectedStakeholderDossier.documents.length})
                </div>
                <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                  All Documents Uploaded & Verified
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {selectedStakeholderDossier.documents.map((doc, dIdx) => (
                  <div
                    key={dIdx}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '0.65rem 0.85rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        background: doc.type === 'PDF' ? '#fee2e2' : '#e0f2fe',
                        color: doc.type === 'PDF' ? '#dc2626' : '#0284c7',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '0.68rem'
                      }}>
                        {doc.type}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>{doc.name}</div>
                        <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Size: {doc.fileSize} • Uploaded on {doc.uploadDate}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{
                        padding: '0.15rem 0.45rem',
                        borderRadius: '6px',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        background: doc.status === 'VERIFIED' ? '#dcfce7' : '#fef3c7',
                        color: doc.status === 'VERIFIED' ? '#15803d' : '#b45309'
                      }}>
                        ✓ {doc.status}
                      </span>
                      <button
                        onClick={() => showToast(`Previewing verified document: ${doc.name}`)}
                        style={{
                          background: '#f8fafc',
                          border: '1px solid #cbd5e1',
                          borderRadius: '6px',
                          padding: '0.25rem 0.6rem',
                          fontSize: '0.7rem',
                          color: '#334155',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}
                      >
                        <Eye size={11} /> Preview
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.65rem', borderTop: '1.5px solid #e2e8f0', paddingTop: '1rem' }}>
              <button
                onClick={() => setSelectedStakeholderDossier(null)}
                style={{
                  background: '#ffffff',
                  border: '1.5px solid #cbd5e1',
                  color: '#334155',
                  fontWeight: 600,
                  padding: '0.5rem 1.15rem',
                  borderRadius: '10px',
                  cursor: 'pointer'
                }}
              >
                Close Dossier
              </button>
              <button
                onClick={() => {
                  showToast(`Registration dossier for ${selectedStakeholderDossier.name} locked & approved.`);
                  setSelectedStakeholderDossier(null);
                }}
                style={{
                  background: 'linear-gradient(135deg, #059669, #047857)',
                  color: '#ffffff',
                  border: 'none',
                  fontWeight: 700,
                  padding: '0.5rem 1.25rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem'
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
      {/* POPUP 2: RELEASE PAYOUT MODAL                                             */}
      {/* ========================================================================= */}
      {payoutModalData && createPortal(
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999999,
          padding: '1.5rem'
        }}
        onClick={() => setPayoutModalData(null)}
        >
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            maxWidth: '520px',
            width: '100%',
            padding: '1.75rem',
            boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
            border: '1.5px solid #e2e8f0',
            color: '#0f172a'
          }}
          onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1.5px solid #e2e8f0', paddingBottom: '0.85rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669' }}>
                  <DollarSign size={22} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                    Authorize Payout Disbursal
                  </h3>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                    {payoutModalData.payrollId} • {payoutModalData.payPeriod}
                  </div>
                </div>
              </div>
              <button onClick={() => setPayoutModalData(null)} style={{ background: '#f1f5f9', border: 'none', borderRadius: '8px', padding: '0.35rem', cursor: 'pointer', color: '#64748b' }}>
                <X size={16} />
              </button>
            </div>

            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.8rem' }}>
                <span style={{ color: '#64748b' }}>Beneficiary Name:</span>
                <strong style={{ color: '#0f172a' }}>{payoutModalData.name} ({payoutModalData.roleTitle})</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.8rem' }}>
                <span style={{ color: '#64748b' }}>Bank & Account:</span>
                <span style={{ color: '#0f172a', fontFamily: 'monospace' }}>{payoutModalData.bankName} • {payoutModalData.accountNumber}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.8rem' }}>
                <span style={{ color: '#64748b' }}>Gross Compensation:</span>
                <span style={{ color: '#0f172a', fontWeight: 600 }}>₹{payoutModalData.grossAmount.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.8rem' }}>
                <span style={{ color: '#64748b' }}>Deductions & 1% TDS:</span>
                <span style={{ color: '#dc2626', fontWeight: 600 }}>-₹{(payoutModalData.deductions + payoutModalData.tdsAmount).toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1.5px solid #e2e8f0', paddingTop: '0.65rem', marginTop: '0.65rem', fontSize: '1rem' }}>
                <span style={{ fontWeight: 800, color: '#0f172a' }}>Net Disbursal Amount:</span>
                <strong style={{ color: '#059669', fontSize: '1.2rem' }}>₹{payoutModalData.netPayable.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.65rem' }}>
              <button
                onClick={() => setPayoutModalData(null)}
                style={{ background: '#ffffff', border: '1.5px solid #cbd5e1', color: '#334155', fontWeight: 600, padding: '0.5rem 1.15rem', borderRadius: '10px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={handleExecutePayout}
                style={{
                  background: 'linear-gradient(135deg, #059669, #047857)',
                  color: '#ffffff',
                  border: 'none',
                  fontWeight: 700,
                  padding: '0.5rem 1.35rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <Check size={14} /> Confirm & Transmit via CMS
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
};
