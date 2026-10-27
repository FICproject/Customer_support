import { Router } from 'express';
import { AuditService } from '../services/AuditService';
import {
  StakeholderRecord,
  StakeholderType,
  StakeholderLevel,
  StakeholderKycRequest,
  StakeholderQueryIssue,
  StakeholderPaymentDispute,
  StakeholderHistoryRecord,
  StakeholderPayrollRecord
} from '../types';

export const stakeholdersRoutes = Router();

// In-memory data store for all stakeholder categories
let stakeholderDirectory: StakeholderRecord[] = [
  // --- AGENTS ---
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
      address: '24, Cherry Road, Salem'
    },
    approval: {
      isApproved: true,
      requiresSubAdminApproval: true,
      subAdminName: 'K. Selvakumar',
      subAdminMobile: '+91 98402 20002',
      subAdminLevel: 'DISTRICT',
      approvedAt: '2026-10-18 10:15 AM',
      notes: 'Sub Admin approved after on-ground verification of residential and field documents.'
    },
    level: 'DISTRICT',
    roleTitle: 'District Field Agent',
    status: 'ACTIVE',
    kycStatus: 'VERIFIED',
    joinedDate: '2026-10-18',
    registrationDetails: {
      legalName: 'Kavitha Murugesan',
      panNumber: 'ABCDE9876K',
      aadhaarNumber: '8912 3456 7890',
      bankName: 'Indian Bank - Salem Main Branch',
      accountNumber: '2109845671',
      ifscCode: 'IDIB000S012',
      qualification: 'B.Com (Banking & Finance)',
      emergencyContact: '+91 94432 11029 (Spouse)',
      appliedDate: '2026-10-17'
    },
    documents: [
      { name: 'Aadhaar_Card_Verified.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '1.2 MB', uploadDate: '2026-10-17' },
      { name: 'PAN_Card_Kavitha.jpg', type: 'IMAGE', status: 'VERIFIED', fileSize: '650 KB', uploadDate: '2026-10-17' },
      { name: 'Salem_SubAdmin_Signoff.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '980 KB', uploadDate: '2026-10-18' },
      { name: 'Bank_Passbook_Copy.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '820 KB', uploadDate: '2026-10-17' }
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
      address: 'No. 8, Gandhi Road, Tambaram West, Chennai'
    },
    approval: {
      isApproved: true,
      requiresSubAdminApproval: false,
      notes: 'Direct onboarded agent. Sub-admin territorial approval waived per enterprise direct policy.'
    },
    level: 'DIVISION',
    roleTitle: 'Divisional Onboarding Agent',
    status: 'ACTIVE',
    kycStatus: 'VERIFIED',
    joinedDate: '2026-10-19',
    registrationDetails: {
      legalName: 'Vignesh Kumaraswamy',
      panNumber: 'FGHIJ4567M',
      aadhaarNumber: '7654 3210 9876',
      bankName: 'HDFC Bank - Tambaram Branch',
      accountNumber: '50100439281729',
      ifscCode: 'HDFC0000214',
      qualification: 'Diploma in Marketing & Logistics',
      emergencyContact: '+91 98401 99221 (Father)',
      appliedDate: '2026-10-19'
    },
    documents: [
      { name: 'Aadhaar_Direct_Verified.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '1.5 MB', uploadDate: '2026-10-19' },
      { name: 'PAN_Vignesh_Card.jpg', type: 'IMAGE', status: 'VERIFIED', fileSize: '710 KB', uploadDate: '2026-10-19' },
      { name: 'HDFC_Cheque_Cancelled.jpg', type: 'IMAGE', status: 'VERIFIED', fileSize: '530 KB', uploadDate: '2026-10-19' }
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
      address: '15, DB Road, RS Puram, Coimbatore'
    },
    approval: {
      isApproved: true,
      requiresSubAdminApproval: true,
      subAdminName: 'M. Rajesh Kumar',
      subAdminMobile: '+91 98403 30003',
      subAdminLevel: 'DISTRICT',
      approvedAt: '2026-10-21 04:45 PM',
      notes: 'Sub Admin approved pin-code territorial alignment and commission ledger tier.'
    },
    level: 'PINCODE',
    roleTitle: 'Pincode Tie-Up Specialist',
    status: 'ACTIVE',
    kycStatus: 'VERIFIED',
    joinedDate: '2026-10-21',
    registrationDetails: {
      legalName: 'Prakash Kumar Shanmugam',
      panNumber: 'KLMNO1234P',
      aadhaarNumber: '6543 2109 8765',
      bankName: 'State Bank of India - RS Puram',
      accountNumber: '30491827364',
      ifscCode: 'SBIN0001429',
      qualification: 'BBA - Operations Management',
      emergencyContact: '+91 98405 88992 (Brother)',
      appliedDate: '2026-10-20'
    },
    documents: [
      { name: 'Aadhaar_Prakash.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '1.1 MB', uploadDate: '2026-10-20' },
      { name: 'SBI_Passbook_Verified.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '910 KB', uploadDate: '2026-10-20' },
      { name: 'Coimbatore_SubAdmin_NOC.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '1.3 MB', uploadDate: '2026-10-21' }
    ]
  },
  {
    id: 'AGT-TN-104',
    type: 'AGENT',
    name: 'R. Deepa Lakshmi',
    phone: '+91 91960 01445',
    email: 'deepa.madurai@gmail.com',
    onboardingSource: 'DIRECT',
    onboardedBy: 'Direct Portal',
    territory: {
      state: 'Tamil Nadu',
      district: 'Madurai',
      division: 'Meenakshi Temple Zone',
      pincode: '625001',
      address: '77, West Tower Street, Madurai'
    },
    approval: {
      isApproved: true,
      requiresSubAdminApproval: false,
      notes: 'Direct portal onboarded State Ambassador Agent. Sub Admin territorial approval waived.'
    },
    level: 'STATE',
    roleTitle: 'State Ambassador Agent',
    status: 'ACTIVE',
    kycStatus: 'VERIFIED',
    joinedDate: '2026-10-23',
    registrationDetails: {
      legalName: 'Deepa Lakshmi Rengarajan',
      panNumber: 'QRSTU5678Q',
      aadhaarNumber: '5432 1098 7654',
      bankName: 'Canara Bank - Madurai Main',
      accountNumber: '11029384756',
      ifscCode: 'CNRB0001004',
      qualification: 'MBA - Business Development',
      emergencyContact: '+91 94440 22119 (Spouse)',
      appliedDate: '2026-10-22'
    },
    documents: [
      { name: 'Aadhaar_Deepa_State.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '1.4 MB', uploadDate: '2026-10-22' },
      { name: 'PAN_Deepa_Govt.jpg', type: 'IMAGE', status: 'VERIFIED', fileSize: '680 KB', uploadDate: '2026-10-22' },
      { name: 'State_Lead_Accreditation.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '2.0 MB', uploadDate: '2026-10-23' }
    ]
  },

  // --- MANAGERS ---
  {
    id: 'MGR-TN-201',
    type: 'MANAGER',
    name: 'R. Senthil Nathan',
    phone: '+91 98402 33441',
    email: 'senthil.nathan@enterprise.ai',
    onboardingSource: 'MAIN_ADMIN',
    onboardedBy: 'Main Admin - HQ Operations',
    territory: {
      state: 'Tamil Nadu',
      district: 'Chennai & Kanchipuram',
      division: 'North & Coastal Zone',
      pincode: '600001',
      address: 'HQ Floor 4, Anna Salai, Chennai'
    },
    approval: {
      isApproved: true,
      requiresSubAdminApproval: false,
      approvedAt: '2026-09-15 09:00 AM',
      notes: 'Executive Management appointment. Approved directly by Main Admin.'
    },
    level: 'STATE',
    roleTitle: 'Territory Operations Manager',
    status: 'ACTIVE',
    kycStatus: 'VERIFIED',
    joinedDate: '2026-09-15',
    registrationDetails: {
      legalName: 'Senthil Nathan Ramasamy',
      panNumber: 'ABCDE7788P',
      aadhaarNumber: '4321 0987 6543',
      bankName: 'Kotak Mahindra Bank - Anna Salai',
      accountNumber: '7819203948',
      ifscCode: 'KKBK0000461',
      qualification: 'MBA, B.Tech',
      emergencyContact: '+91 98401 44552 (Spouse)',
      appliedDate: '2026-09-10'
    },
    documents: [
      { name: 'Appointment_Letter_HQ.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '1.8 MB', uploadDate: '2026-09-14' },
      { name: 'Executive_KYC_Verification.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '1.2 MB', uploadDate: '2026-09-14' }
    ]
  },

  // --- SUB ADMINS ---
  {
    id: 'SUB-TN-301',
    type: 'SUBADMIN',
    name: 'P. Anbalagan',
    phone: '+91 98401 10001',
    email: 'anbalagan.subadmin@enterprise.ai',
    onboardingSource: 'MAIN_ADMIN',
    onboardedBy: 'Main Admin - Corporate Desk',
    territory: {
      state: 'Tamil Nadu',
      district: 'Chennai',
      division: 'State Zone 1',
      pincode: '600017',
      address: 'Zonal Office, Usman Road, T. Nagar'
    },
    approval: {
      isApproved: true,
      requiresSubAdminApproval: false,
      approvedAt: '2026-08-01 10:00 AM',
      notes: 'State Sub Admin territorial rights cleared and authorized by Main Admin.'
    },
    level: 'STATE',
    roleTitle: 'State Sub Admin (TN Zone 1)',
    status: 'ACTIVE',
    kycStatus: 'VERIFIED',
    joinedDate: '2026-08-01',
    registrationDetails: {
      legalName: 'Anbalagan Palanisamy',
      panNumber: 'ZXCVB1234N',
      aadhaarNumber: '3210 9876 5432',
      bankName: 'Axis Bank - T. Nagar Branch',
      accountNumber: '91201004928172',
      ifscCode: 'UTIB0000024',
      qualification: 'Post Graduate Diploma in Administration',
      emergencyContact: '+91 98400 99881 (Family)',
      appliedDate: '2026-07-25'
    },
    documents: [
      { name: 'Zonal_Jurisdiction_Charter.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '2.4 MB', uploadDate: '2026-07-30' },
      { name: 'Bank_Mandate_Axis.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '780 KB', uploadDate: '2026-07-30' }
    ]
  },

  // --- DELIVERY PARTNERS ---
  {
    id: 'DEL-TN-401',
    type: 'DELIVERY_PARTNER',
    name: 'K. Murugan',
    phone: '+91 98412 88771',
    email: 'murugan.express@gmail.com',
    onboardingSource: 'DIRECT',
    onboardedBy: 'Direct Fleet Portal',
    territory: {
      state: 'Tamil Nadu',
      district: 'Chennai',
      division: 'Velachery Division',
      pincode: '600042',
      address: '32, Gandhi Nagar, Velachery, Chennai'
    },
    approval: {
      isApproved: true,
      requiresSubAdminApproval: false,
      notes: 'Direct fleet onboarding. Driving license & commercial insurance cleared.'
    },
    level: 'PINCODE',
    roleTitle: 'Express Logistics Pilot',
    status: 'ACTIVE',
    kycStatus: 'VERIFIED',
    joinedDate: '2026-10-10',
    registrationDetails: {
      legalName: 'Murugan Kandasamy',
      panNumber: 'MNBVC9876Q',
      aadhaarNumber: '2109 8765 4321',
      bankName: 'HDFC Bank - Velachery Branch',
      accountNumber: '50100384729182',
      ifscCode: 'HDFC0000428',
      emergencyContact: '+91 94441 33221 (Spouse)',
      appliedDate: '2026-10-09'
    },
    documents: [
      { name: 'Driving_License_Commercial.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '1.6 MB', uploadDate: '2026-10-09' },
      { name: 'Vehicle_RC_TN07CQ8912.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '1.1 MB', uploadDate: '2026-10-09' }
    ]
  },

  // --- TECHNICIANS ---
  {
    id: 'TEC-TN-501',
    type: 'TECHNICIAN',
    name: 'V. Saravanan',
    phone: '+91 98409 66552',
    email: 'saravanan.tech@gmail.com',
    onboardingSource: 'DIRECT',
    onboardedBy: 'Direct Technical Portal',
    territory: {
      state: 'Tamil Nadu',
      district: 'Coimbatore',
      division: 'Gandhipuram Zone',
      pincode: '641012',
      address: '14, Cross Cut Road, Gandhipuram'
    },
    approval: {
      isApproved: true,
      requiresSubAdminApproval: false,
      notes: 'Certified electrician & IoT technician. Direct verification completed.'
    },
    level: 'DISTRICT',
    roleTitle: 'Senior Field IoT Technician',
    status: 'ACTIVE',
    kycStatus: 'VERIFIED',
    joinedDate: '2026-10-14',
    registrationDetails: {
      legalName: 'Saravanan Vadivelu',
      panNumber: 'POIUY5678L',
      aadhaarNumber: '1098 7654 3210',
      bankName: 'Canara Bank - Gandhipuram',
      accountNumber: '12093847561',
      ifscCode: 'CNRB0001209',
      qualification: 'ITI Electrical & Electronics Diploma',
      emergencyContact: '+91 98402 11993 (Brother)',
      appliedDate: '2026-10-13'
    },
    documents: [
      { name: 'ITI_Electrical_Diploma.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '1.9 MB', uploadDate: '2026-10-13' },
      { name: 'Govt_Aadhaar_Verified.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '950 KB', uploadDate: '2026-10-13' }
    ]
  },

  // --- SUPPORT STAFF ---
  {
    id: 'STF-TN-601',
    type: 'SUPPORT_STAFF',
    name: 'J. Anitha',
    phone: '+91 98404 11223',
    email: 'anitha.support@enterprise.ai',
    onboardingSource: 'SUPPORT_ADMIN',
    onboardedBy: 'Support Admin HR Desk',
    territory: {
      state: 'Tamil Nadu',
      district: 'Chennai',
      division: 'Operations Hub OMR',
      pincode: '600096',
      address: 'Tech Park Floor 2, Perungudi, Chennai'
    },
    approval: {
      isApproved: true,
      requiresSubAdminApproval: false,
      approvedAt: '2026-09-01 09:30 AM',
      notes: 'Customer Support Executive certification verified.'
    },
    level: 'STATE',
    roleTitle: 'Lead KYC & Escalation Specialist',
    status: 'ACTIVE',
    kycStatus: 'VERIFIED',
    joinedDate: '2026-09-01',
    registrationDetails: {
      legalName: 'Anitha Jayakumar',
      panNumber: 'LKJHG1234F',
      aadhaarNumber: '9876 5432 1098',
      bankName: 'ICICI Bank - Perungudi Branch',
      accountNumber: '002901592817',
      ifscCode: 'ICIC0000029',
      qualification: 'B.Sc Computer Science',
      emergencyContact: '+91 98401 88776 (Parent)',
      appliedDate: '2026-08-25'
    },
    documents: [
      { name: 'Degree_Certificate_BSc.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '1.3 MB', uploadDate: '2026-08-28' },
      { name: 'ID_Card_Enterprise_Issued.pdf', type: 'PDF', status: 'VERIFIED', fileSize: '820 KB', uploadDate: '2026-09-01' }
    ]
  }
];

// KYC requests across stakeholders
let stakeholderKycRequests: StakeholderKycRequest[] = [
  {
    reqId: 'KYC-AGT-891',
    stakeholderId: 'AGT-TN-101',
    stakeholderType: 'AGENT',
    name: 'M. Kavitha',
    phone: '+91 97890 23411',
    roleTitle: 'District Field Agent',
    onboardingSource: 'SUB_ADMIN',
    onboardedBy: 'Sub Admin - K. Selvakumar',
    approvalInfo: 'Sub Admin Approved (K. Selvakumar, Salem)',
    submittedAt: 'Today, 10:14 AM',
    status: 'UNDER_REVIEW',
    notes: 'PAN card surname matches marriage certificate. Verified against NSDL database.',
    documents: [
      { name: 'Aadhaar_Salem.pdf', status: 'VERIFIED' },
      { name: 'PAN_Card_Govt.jpg', status: 'UNDER_REVIEW' },
      { name: 'SubAdmin_NOC.pdf', status: 'VERIFIED' }
    ]
  },
  {
    reqId: 'KYC-AGT-892',
    stakeholderId: 'AGT-TN-103',
    stakeholderType: 'AGENT',
    name: 'S. Prakash Kumar',
    phone: '+91 98405 77661',
    roleTitle: 'Pincode Tie-Up Specialist',
    onboardingSource: 'SUB_ADMIN',
    onboardedBy: 'Sub Admin - M. Rajesh Kumar',
    approvalInfo: 'Sub Admin Approved (M. Rajesh Kumar, Coimbatore)',
    submittedAt: 'Yesterday, 04:30 PM',
    status: 'APPROVED',
    notes: 'Bank IFSC and cancelled cheque matched seamlessly. Payout account active.',
    documents: [
      { name: 'Aadhaar_RS_Puram.pdf', status: 'VERIFIED' },
      { name: 'SBI_Passbook.pdf', status: 'VERIFIED' },
      { name: 'Police_Clearance.pdf', status: 'VERIFIED' }
    ]
  }
];

// Query tickets across stakeholders
let stakeholderQueries: StakeholderQueryIssue[] = [
  {
    queryId: 'QRY-STK-901',
    stakeholderId: 'AGT-TN-101',
    stakeholderType: 'AGENT',
    name: 'M. Kavitha',
    phone: '+91 97890 23411',
    roleTitle: 'District Field Agent',
    issueType: 'Territory Pincode Sync',
    description: 'Agent requested addition of neighboring pincode 636004 into authorized onboarding quota.',
    severity: 'HIGH',
    assignedDesk: 'Territory Operations Desk',
    sla: '45 mins remaining',
    status: 'IN_PROGRESS',
    createdAt: 'Today, 09:30 AM'
  },
  {
    queryId: 'QRY-STK-902',
    stakeholderId: 'AGT-TN-102',
    stakeholderType: 'AGENT',
    name: 'K. Vignesh',
    phone: '+91 94441 55678',
    roleTitle: 'Divisional Onboarding Agent',
    issueType: 'Direct Portal QR Kit Request',
    description: 'Need additional 50 physical QR standees for Tambaram East merchant field run.',
    severity: 'MEDIUM',
    assignedDesk: 'Marketing & Field Kit Logistics',
    sla: '2 hours remaining',
    status: 'OPEN',
    createdAt: 'Today, 11:00 AM'
  }
];

// Payment disputes across stakeholders
let stakeholderPaymentDisputes: StakeholderPaymentDispute[] = [
  {
    disputeId: 'DISP-AGT-440',
    stakeholderId: 'AGT-TN-101',
    stakeholderType: 'AGENT',
    name: 'M. Kavitha',
    roleTitle: 'District Field Agent',
    disputedAmount: 4200,
    issueType: 'Vendor Onboarding Tier-2 Incentive',
    description: 'Merchant VEN-603 first order milestone completed, but automated milestone credit not reflected in weekly batch.',
    status: 'AUDIT_IN_PROGRESS',
    createdAt: 'Today, 08:45 AM'
  }
];

// History records across stakeholders
let stakeholderHistory: StakeholderHistoryRecord[] = [
  {
    ticketId: 'TCK-HST-501',
    stakeholderId: 'AGT-TN-101',
    stakeholderType: 'AGENT',
    stakeholderName: 'M. Kavitha (District Agent)',
    issueTitle: 'KYC Document Signature Re-verification',
    assignedTeam: 'KYC Verification Desk',
    attendedBy: 'Officer Priya (Senior KYC Auditor)',
    status: 'RESOLVED',
    priority: 'HIGH',
    createdAt: '2026-10-24 10:15 AM',
    attendedAt: '2026-10-24 10:22 AM',
    resolvedAt: '2026-10-24 10:48 AM',
    resolutionTimeMinutes: 33,
    resolutionNotes: 'Matched digital signature hash with Sub Admin signed territorial endorsement copy.',
    auditBadge: 'COMPLIANT_RESOLUTION'
  },
  {
    ticketId: 'TCK-HST-502',
    stakeholderId: 'AGT-TN-102',
    stakeholderType: 'AGENT',
    stakeholderName: 'K. Vignesh (Divisional Agent)',
    issueTitle: 'Direct Onboarding QR Code Allocation',
    assignedTeam: 'Field Operations & Dispatch Desk',
    attendedBy: 'Arun Kumar (Logistics Dispatcher)',
    status: 'RESOLVED',
    priority: 'NORMAL',
    createdAt: '2026-10-25 02:00 PM',
    attendedAt: '2026-10-25 02:10 PM',
    resolvedAt: '2026-10-25 02:45 PM',
    resolutionTimeMinutes: 45,
    resolutionNotes: 'Dispatched 50 merchant QR stands with courier AWB tracking #TN-EXP-88912.',
    auditBadge: 'DISPATCH_VERIFIED'
  },
  {
    ticketId: 'TCK-HST-503',
    stakeholderId: 'AGT-TN-103',
    stakeholderType: 'AGENT',
    stakeholderName: 'S. Prakash Kumar (Pincode Agent)',
    issueTitle: 'Commission Payout Bank Account Re-link',
    assignedTeam: 'Finance & Settlement Desk',
    attendedBy: 'R. Meenakshi (Payout Lead)',
    status: 'RESOLVED',
    priority: 'HIGH',
    createdAt: '2026-10-25 11:30 AM',
    attendedAt: '2026-10-25 11:35 AM',
    resolvedAt: '2026-10-25 11:58 AM',
    resolutionTimeMinutes: 28,
    resolutionNotes: 'Bank penny drop verification successful. Account SBIN0001429 verified with NPCI penny check.',
    auditBadge: 'NPCI_PENNY_DROP_OK'
  }
];

// Payroll and ledger records
let stakeholderPayroll: StakeholderPayrollRecord[] = [
  {
    payrollId: 'PAY-AGT-2026-W42',
    stakeholderId: 'AGT-TN-101',
    stakeholderType: 'AGENT',
    name: 'M. Kavitha',
    roleTitle: 'District Field Agent',
    payPeriod: 'Oct 14 - Oct 21, 2026',
    bankName: 'Indian Bank (***71)',
    accountNumber: '2109845671',
    ifscCode: 'IDIB000S012',
    baseCompensation: 18000,
    commissionsIncentives: 14500,
    tdsDeduction: 1625,
    netPayout: 30875,
    payoutStatus: 'PAID',
    utrNumber: 'CMS982173645019',
    disbursedDate: '2026-10-22'
  },
  {
    payrollId: 'PAY-AGT-2026-W43',
    stakeholderId: 'AGT-TN-102',
    stakeholderType: 'AGENT',
    name: 'K. Vignesh',
    roleTitle: 'Divisional Onboarding Agent',
    payPeriod: 'Oct 14 - Oct 21, 2026',
    bankName: 'HDFC Bank (***29)',
    accountNumber: '50100439281729',
    ifscCode: 'HDFC0000214',
    baseCompensation: 16000,
    commissionsIncentives: 11200,
    tdsDeduction: 1360,
    netPayout: 25840,
    payoutStatus: 'PAID',
    utrNumber: 'HDFC281940182741',
    disbursedDate: '2026-10-22'
  },
  {
    payrollId: 'PAY-AGT-2026-W44',
    stakeholderId: 'AGT-TN-103',
    stakeholderType: 'AGENT',
    name: 'S. Prakash Kumar',
    roleTitle: 'Pincode Tie-Up Specialist',
    payPeriod: 'Oct 14 - Oct 21, 2026',
    bankName: 'State Bank of India (***64)',
    accountNumber: '30491827364',
    ifscCode: 'SBIN0001429',
    baseCompensation: 14000,
    commissionsIncentives: 8500,
    tdsDeduction: 1125,
    netPayout: 21375,
    payoutStatus: 'PENDING_APPROVAL'
  },
  {
    payrollId: 'PAY-AGT-2026-W45',
    stakeholderId: 'AGT-TN-104',
    stakeholderType: 'AGENT',
    name: 'R. Deepa Lakshmi',
    roleTitle: 'State Ambassador Agent',
    payPeriod: 'Oct 14 - Oct 21, 2026',
    bankName: 'Canara Bank (***56)',
    accountNumber: '11029384756',
    ifscCode: 'CNRB0001004',
    baseCompensation: 25000,
    commissionsIncentives: 18400,
    tdsDeduction: 2170,
    netPayout: 41230,
    payoutStatus: 'PROCESSING'
  }
];

// Helper to sanitize stakeholderType parameter
function normalizeStakeholderType(typeStr: string): StakeholderType {
  const upper = (typeStr || '').toUpperCase().trim();
  if (upper === 'AGENTS' || upper === 'AGENT') return 'AGENT';
  if (upper === 'MANAGERS' || upper === 'MANAGER') return 'MANAGER';
  if (upper === 'SUBADMINS' || upper === 'SUBADMIN' || upper === 'SUB_ADMIN') return 'SUBADMIN';
  if (upper === 'DELIVERY' || upper === 'DELIVERY_PARTNERS' || upper === 'DELIVERY_PARTNER') return 'DELIVERY_PARTNER';
  if (upper === 'TECHNICIANS' || upper === 'TECHNICIAN') return 'TECHNICIAN';
  if (upper === 'SUPPORT_STAFF' || upper === 'SUPPORT' || upper === 'STAFF') return 'SUPPORT_STAFF';
  if (upper === 'VENDORS' || upper === 'VENDOR') return 'VENDOR';
  return 'AGENT';
}

/**
 * 1. GET /api/v1/stakeholders/:stakeholderType/directory
 * Query params: search, onboardedBy, level, status
 */
stakeholdersRoutes.get('/:stakeholderType/directory', (req, res) => {
  try {
    const sType = normalizeStakeholderType(req.params.stakeholderType);
    const { search, onboardedBy, level, status } = req.query;

    let list = stakeholderDirectory.filter(s => s.type === sType);

    if (onboardedBy && onboardedBy !== 'ALL') {
      const ob = String(onboardedBy).toUpperCase();
      if (ob === 'DIRECT') {
        list = list.filter(s => s.onboardingSource === 'DIRECT');
      } else if (ob === 'SUB_ADMIN' || ob === 'SUBADMIN') {
        list = list.filter(s => s.onboardingSource === 'SUB_ADMIN');
      }
    }

    if (level && level !== 'ALL') {
      const lvl = String(level).toUpperCase();
      list = list.filter(s => s.level === lvl);
    }

    if (status && status !== 'ALL') {
      const st = String(status).toUpperCase();
      list = list.filter(s => s.status === st);
    }

    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      list = list.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q) ||
        s.phone.includes(q) ||
        s.territory.district.toLowerCase().includes(q) ||
        s.territory.pincode.includes(q) ||
        s.onboardedBy.toLowerCase().includes(q)
      );
    }

    // High-value operational KPI calculation
    const allForType = stakeholderDirectory.filter(s => s.type === sType);
    const totalCount = allForType.length;
    const directCount = allForType.filter(s => s.onboardingSource === 'DIRECT').length;
    const subAdminCount = allForType.filter(s => s.onboardingSource === 'SUB_ADMIN').length;
    const activeCount = allForType.filter(s => s.status === 'ACTIVE').length;
    const verifiedKycCount = allForType.filter(s => s.kycStatus === 'VERIFIED').length;
    const kycIntegrityPercentage = totalCount > 0 ? Math.round((verifiedKycCount / totalCount) * 100) : 100;

    res.json({
      success: true,
      stakeholderType: sType,
      count: list.length,
      kpis: {
        total: totalCount,
        directCount,
        subAdminCount,
        activeCount,
        kycIntegrityPercentage,
        hierarchyLevels: 4,
        approvalAuthorityRule: 'Direct requires no sub-admin sign-off. Sub Admin onboarded requires territorial approval.'
      },
      data: list
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 2. GET /api/v1/stakeholders/:stakeholderType/kyc-queries
 */
stakeholdersRoutes.get('/:stakeholderType/kyc-queries', (req, res) => {
  try {
    const sType = normalizeStakeholderType(req.params.stakeholderType);
    const kycList = stakeholderKycRequests.filter(k => k.stakeholderType === sType);
    const queryList = stakeholderQueries.filter(q => q.stakeholderType === sType);
    const disputeList = stakeholderPaymentDisputes.filter(d => d.stakeholderType === sType);

    res.json({
      success: true,
      stakeholderType: sType,
      data: {
        kycRequests: kycList,
        activeQueries: queryList,
        paymentDisputes: disputeList,
        summary: {
          totalKycUnderReview: kycList.filter(k => k.status === 'UNDER_REVIEW').length,
          totalOpenQueries: queryList.filter(q => q.status !== 'RESOLVED').length,
          totalDisputesPending: disputeList.filter(d => d.status === 'AUDIT_IN_PROGRESS').length
        }
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 3. GET /api/v1/stakeholders/:stakeholderType/ticket-routing-history
 */
stakeholdersRoutes.get('/:stakeholderType/ticket-routing-history', (req, res) => {
  try {
    const sType = normalizeStakeholderType(req.params.stakeholderType);
    const historyList = stakeholderHistory.filter(h => h.stakeholderType === sType);

    res.json({
      success: true,
      stakeholderType: sType,
      count: historyList.length,
      data: historyList
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 4. GET /api/v1/stakeholders/:stakeholderType/payroll-ledger
 */
stakeholdersRoutes.get('/:stakeholderType/payroll-ledger', (req, res) => {
  try {
    const sType = normalizeStakeholderType(req.params.stakeholderType);
    const payrollList = stakeholderPayroll.filter(p => p.stakeholderType === sType);

    const totalDisbursed = payrollList
      .filter(p => p.payoutStatus === 'PAID')
      .reduce((sum, p) => sum + p.netPayout, 0);

    const pendingDisbursal = payrollList
      .filter(p => p.payoutStatus !== 'PAID')
      .reduce((sum, p) => sum + p.netPayout, 0);

    res.json({
      success: true,
      stakeholderType: sType,
      count: payrollList.length,
      metrics: {
        totalDisbursed,
        pendingDisbursal,
        activePayees: payrollList.length
      },
      data: payrollList
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 5. GET /api/v1/stakeholders/:stakeholderType/:id
 * Full single stakeholder profile & documents view
 */
stakeholdersRoutes.get('/:stakeholderType/:id', (req, res) => {
  try {
    const sType = normalizeStakeholderType(req.params.stakeholderType);
    const { id } = req.params;
    const item = stakeholderDirectory.find(s => s.id === id && s.type === sType);

    if (!item) {
      return res.status(404).json({ success: false, error: `${sType} with ID ${id} not found` });
    }

    res.json({ success: true, data: item });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 6. POST /api/v1/stakeholders/:stakeholderType/onboard
 * Onboard direct or sub-admin stakeholder
 */
stakeholdersRoutes.post('/:stakeholderType/onboard', (req, res) => {
  try {
    const sType = normalizeStakeholderType(req.params.stakeholderType);
    const body = req.body;

    const id = body.id || `AGT-TN-${100 + stakeholderDirectory.length + 1}`;
    const isDirect = body.onboardingSource === 'DIRECT';

    const newRecord: StakeholderRecord = {
      id,
      type: sType,
      name: body.name || 'New Registered Agent',
      phone: body.phone || '+91 90000 00000',
      email: body.email || 'agent@enterprise.ai',
      onboardingSource: body.onboardingSource || 'DIRECT',
      onboardedBy: isDirect ? 'Direct Portal' : (body.onboardedBy || 'Sub Admin'),
      territory: body.territory || {
        state: 'Tamil Nadu',
        district: 'Chennai',
        division: 'Central Zone',
        pincode: '600001'
      },
      approval: {
        isApproved: isDirect, // Direct does not require Sub-Admin approval!
        requiresSubAdminApproval: !isDirect,
        subAdminName: isDirect ? undefined : body.subAdminName,
        subAdminMobile: isDirect ? undefined : body.subAdminMobile,
        subAdminLevel: isDirect ? undefined : (body.subAdminLevel || 'DISTRICT'),
        approvedAt: isDirect ? new Date().toISOString() : undefined,
        notes: isDirect
          ? 'Direct onboarded agent. Sub Admin approval waived.'
          : `Awaiting territorial approval from ${body.subAdminName || 'Sub Admin'}.`
      },
      level: body.level || 'PINCODE',
      roleTitle: body.roleTitle || `${sType} Field Partner`,
      status: isDirect ? 'ACTIVE' : 'PENDING_APPROVAL',
      kycStatus: 'UNDER_REVIEW',
      joinedDate: new Date().toISOString().split('T')[0],
      registrationDetails: body.registrationDetails || {
        legalName: body.name || 'Field Partner',
        panNumber: body.panNumber || 'ABCDE1234F',
        aadhaarNumber: body.aadhaarNumber || '1234 5678 9012',
        bankName: body.bankName || 'State Bank of India',
        accountNumber: body.accountNumber || '1029384756',
        ifscCode: body.ifscCode || 'SBIN0000001',
        appliedDate: new Date().toISOString().split('T')[0]
      },
      documents: body.documents || [
        { name: 'Aadhaar_Document.pdf', type: 'PDF', status: 'UNDER_REVIEW', fileSize: '1.2 MB', uploadDate: new Date().toISOString().split('T')[0] },
        { name: 'PAN_Card.jpg', type: 'IMAGE', status: 'UNDER_REVIEW', fileSize: '700 KB', uploadDate: new Date().toISOString().split('T')[0] }
      ]
    };

    stakeholderDirectory.push(newRecord);

    AuditService.logAction({
      action: 'STAKEHOLDER_ONBOARDED',
      actor: isDirect ? 'DIRECT_PORTAL' : 'SUB_ADMIN',
      relatedEntity: id,
      decisionReasoning: `New ${sType} ${newRecord.name} onboarded via ${newRecord.onboardingSource}. Approval required: ${!isDirect}`,
      inputPayload: body,
      outputResult: { id, status: newRecord.status, requiresApproval: !isDirect },
      validationPassed: true,
      isHuman: true
    });

    res.status(201).json({ success: true, data: newRecord });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 7. POST /api/v1/stakeholders/:stakeholderType/:id/action
 * Approvals, document re-uploads, payment release
 */
stakeholdersRoutes.post('/:stakeholderType/:id/action', (req, res) => {
  try {
    const sType = normalizeStakeholderType(req.params.stakeholderType);
    const { id } = req.params;
    const { action, note, subAdminName, utrNumber } = req.body;

    const record = stakeholderDirectory.find(s => s.id === id && s.type === sType);
    if (!record) {
      return res.status(404).json({ success: false, error: `${sType} ${id} not found` });
    }

    const timeString = new Date().toLocaleTimeString();

    switch (action) {
      case 'APPROVE_SUB_ADMIN':
        record.approval.isApproved = true;
        record.approval.approvedAt = new Date().toISOString();
        record.approval.notes = `Territorially approved by Sub Admin ${subAdminName || record.approval.subAdminName || 'Authorized Officer'}. ${note || ''}`;
        record.status = 'ACTIVE';

        AuditService.logAction({
          action: 'SUB_ADMIN_TERRITORY_APPROVED',
          actor: subAdminName || 'SUB_ADMIN',
          relatedEntity: id,
          decisionReasoning: `Sub Admin approved territorial onboarding for ${record.name}.`,
          inputPayload: { action, subAdminName, note },
          outputResult: { id, isApproved: true, status: record.status },
          validationPassed: true,
          isHuman: true
        });
        break;

      case 'REQUEST_DOC_REUPLOAD':
        record.kycStatus = 'REUPLOAD_NEEDED';
        AuditService.logAction({
          action: 'STAKEHOLDER_DOC_REUPLOAD_REQUESTED',
          actor: 'SUPPORT_ADMIN',
          relatedEntity: id,
          decisionReasoning: `Document re-upload requested for ${record.name}. Note: ${note || 'Clear scan required'}`,
          inputPayload: { action, note },
          outputResult: { id, kycStatus: 'REUPLOAD_NEEDED' },
          validationPassed: true,
          isHuman: true
        });
        break;

      case 'RELEASE_PAYROLL':
        const payrollItem = stakeholderPayroll.find(p => p.stakeholderId === id && p.payoutStatus !== 'PAID');
        if (payrollItem) {
          payrollItem.payoutStatus = 'PAID';
          payrollItem.utrNumber = utrNumber || `CMS${Date.now()}`;
          payrollItem.disbursedDate = new Date().toISOString().split('T')[0];
        }

        AuditService.logAction({
          action: 'STAKEHOLDER_PAYROLL_RELEASED',
          actor: 'SUPPORT_ADMIN',
          relatedEntity: id,
          decisionReasoning: `Payroll disbursed to ${record.name}. UTR: ${utrNumber || 'MANUAL-GEN'}`,
          inputPayload: { action, utrNumber },
          outputResult: { id, payoutStatus: 'PAID' },
          validationPassed: true,
          isHuman: true
        });
        break;

      default:
        return res.status(400).json({ success: false, error: `Invalid action '${action}'` });
    }

    res.json({ success: true, message: `Action ${action} processed successfully`, data: record });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});
