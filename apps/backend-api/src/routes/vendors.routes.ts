import { Router } from 'express';
import { store } from '../db/inMemoryStore';
import { AuditService } from '../services/AuditService';
import { VendorRecord, VendorHistoryRecord, VendorPayrollRecord, VendorCategory } from '../types';

export const vendorsRoutes = Router();

// In-memory collections for vendor operations if not already in store
let vendorList: VendorRecord[] = [
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
      subAdminName: 'P. Anbalagan',
      subAdminMobile: '+91 98401 10001',
      subAdminLevel: 'STATE',
      subAdminTitle: 'State Sub Admin (TN Zone 1 - North & Central)',
      approvedAt: '2026-10-12 11:30 AM',
      notes: 'Direct portal application verified against MCA registry and GST portal.'
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
    storeName: 'QuickFix Pro Appliance & Electrical Services',
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
    storeName: 'Palm Breeze Residency & Service Apartments',
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
      subAdminName: 'V. Sundaresan',
      subAdminMobile: '+91 98405 60006',
      subAdminLevel: 'STATE',
      subAdminTitle: 'State Sub Admin (TN Zone 3 - South & West)',
      approvedAt: '2026-10-22 05:00 PM',
      notes: 'State Tourist Taxi Operator permit and fleet insurance verified online.'
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

let vendorHistoryList: VendorHistoryRecord[] = [
  {
    ticketId: 'TCK-VEN-8801',
    vendorId: 'VEN-601',
    vendorName: 'Royal Spice Supermarket',
    issueTitle: 'FSSAI License Renewal Certificate Update',
    assignedTeam: 'KYC Document Verification Desk',
    attendedBy: 'Alex Vance (KYC Team Lead)',
    status: 'RESOLVED',
    priority: 'HIGH',
    createdAt: '2026-10-22 09:30 AM',
    attendedAt: '2026-10-22 10:15 AM',
    resolutionNotes: 'Updated FSSAI certificate valid till Dec 2028 verified successfully via Food Safety portal. Store compliance updated to Active.',
    tatMinutes: 45
  },
  {
    ticketId: 'TCK-VEN-8802',
    vendorId: 'VEN-603',
    vendorName: 'Annapoorna Heritage Sweets',
    issueTitle: 'Bank IFSC Mismatch in Settlement Details',
    assignedTeam: 'Payment & Settlement Team',
    attendedBy: 'David Ross (Payment Lead)',
    status: 'PENDING',
    priority: 'CRITICAL',
    createdAt: '2026-10-25 11:20 AM',
    attendedAt: '2026-10-25 11:45 AM',
    resolutionNotes: 'Awaiting cancelled cheque copy from Agent Kavitha or Vendor. On hold to prevent payout bounce.',
    tatMinutes: 25
  },
  {
    ticketId: 'TCK-VEN-8803',
    vendorId: 'VEN-602',
    vendorName: 'Nuts & Berries Organics',
    issueTitle: 'Diwali Festive Order Commission Rate Dispute',
    assignedTeam: 'Query Operations Team',
    attendedBy: 'Sarah Connor (Query TL)',
    status: 'RESOLVED',
    priority: 'NORMAL',
    createdAt: '2026-10-24 02:15 PM',
    attendedAt: '2026-10-24 03:00 PM',
    resolutionNotes: 'Clarified festive tiered commission rebate structure. Applied ₹4,200 festive rebate credit to October payroll cycle.',
    tatMinutes: 45
  },
  {
    ticketId: 'TCK-VEN-8804',
    vendorId: 'VEN-605',
    vendorName: 'Palm Breeze Residency',
    issueTitle: 'Hospitality Check-in Webhook Synchronization',
    assignedTeam: 'Procurement Team',
    attendedBy: 'Michael Chang (Integration Specialist)',
    status: 'ESCALATED_TO_SUPPORT_ADMIN',
    priority: 'HIGH',
    createdAt: '2026-10-26 08:30 AM',
    attendedAt: '2026-10-26 09:05 AM',
    resolutionNotes: 'PMS API gateway timeout. Escalated to Support Admin for webhook retry token regeneration.',
    tatMinutes: 35
  },
  {
    ticketId: 'TCK-VEN-8805',
    vendorId: 'VEN-604',
    vendorName: 'QuickFix Pro Appliance Services',
    issueTitle: 'Field Technician Dispatch Sync Notification',
    assignedTeam: 'Query Operations Team',
    attendedBy: 'AI Autonomous Tech Resolver',
    status: 'RESOLVED',
    priority: 'NORMAL',
    createdAt: '2026-10-26 10:00 AM',
    attendedAt: '2026-10-26 10:04 AM',
    resolutionNotes: 'AI synchronized technician geolocation with customer booking slot automatically.',
    tatMinutes: 4
  }
];

let vendorPayrollList: VendorPayrollRecord[] = [
  {
    payrollId: 'PAY-VEN-2026-10-01',
    vendorId: 'VEN-601',
    vendorName: 'Royal Spice Supermarket',
    billingPeriod: '01 Oct 2026 - 15 Oct 2026',
    grossSales: '₹2,42,500',
    platformCommission: '₹24,250',
    tdsDeduction: '₹2,425',
    adjustments: '+₹1,500 (Festive Bonus)',
    netPayout: '₹2,17,325',
    bankName: 'HDFC Bank - T. Nagar Branch',
    accountNumber: '•••• •••• 9841',
    ifsc: 'HDFC0001244',
    pan: 'ABCDE1234F',
    gstin: '33ABCDE1234F1Z5',
    payoutStatus: 'PAID',
    utrNumber: 'CMS9823019842',
    payoutDate: '2026-10-18',
    breakdown: {
      orderCount: 710,
      averageOrderValue: '₹341',
      deliveryCommission: '10.0%',
      penaltyAdjustments: '₹0',
      bonusIncentive: '₹1,500',
      tdsRate: '1.0% (Sec 194O)',
      gstRate: '18% on Commission'
    }
  },
  {
    payrollId: 'PAY-VEN-2026-10-02',
    vendorId: 'VEN-602',
    vendorName: 'Nuts & Berries Organics',
    billingPeriod: '01 Oct 2026 - 15 Oct 2026',
    grossSales: '₹1,47,500',
    platformCommission: '₹14,750',
    tdsDeduction: '₹1,475',
    adjustments: '+₹4,200 (Commission Rebate)',
    netPayout: '₹1,35,475',
    bankName: 'ICICI Bank - Anna Nagar Branch',
    accountNumber: '•••• •••• 6612',
    ifsc: 'ICIC0000452',
    pan: 'XYZPK8892L',
    gstin: '33XYZPK8892L1Z9',
    payoutStatus: 'PENDING_PAYOUT',
    breakdown: {
      orderCount: 445,
      averageOrderValue: '₹331',
      deliveryCommission: '10.0%',
      penaltyAdjustments: '₹0',
      bonusIncentive: '₹4,200',
      tdsRate: '1.0% (Sec 194O)',
      gstRate: '18% on Commission'
    }
  },
  {
    payrollId: 'PAY-VEN-2026-10-03',
    vendorId: 'VEN-603',
    vendorName: 'Annapoorna Heritage Sweets',
    billingPeriod: '01 Oct 2026 - 15 Oct 2026',
    grossSales: '₹1,70,000',
    platformCommission: '₹17,000',
    tdsDeduction: '₹1,700',
    adjustments: '-₹500 (Late Order Cancellation SLA)',
    netPayout: '₹1,50,800',
    bankName: 'State Bank of India - Adyar Branch',
    accountNumber: '•••• •••• 4421',
    ifsc: 'SBIN0002194',
    pan: 'KLMNO4455R',
    gstin: '33KLMNO4455R1Z2',
    payoutStatus: 'PENDING_PAYOUT',
    breakdown: {
      orderCount: 560,
      averageOrderValue: '₹303',
      deliveryCommission: '10.0%',
      penaltyAdjustments: '-₹500',
      bonusIncentive: '₹0',
      tdsRate: '1.0% (Sec 194O)',
      gstRate: '18% on Commission'
    }
  },
  {
    payrollId: 'PAY-VEN-2026-10-04',
    vendorId: 'VEN-604',
    vendorName: 'QuickFix Pro Appliance Services',
    billingPeriod: '01 Oct 2026 - 15 Oct 2026',
    grossSales: '₹72,500',
    platformCommission: '₹7,250',
    tdsDeduction: '₹725',
    adjustments: '₹0',
    netPayout: '₹64,525',
    bankName: 'Canara Bank - Tambaram Branch',
    accountNumber: '•••• •••• 3390',
    ifsc: 'CNRB0001099',
    pan: 'POIUY7766T',
    gstin: '33POIUY7766T1Z4',
    payoutStatus: 'PAID',
    utrNumber: 'CMS9823019899',
    payoutDate: '2026-10-18',
    breakdown: {
      orderCount: 320,
      averageOrderValue: '₹226',
      deliveryCommission: '10.0%',
      penaltyAdjustments: '₹0',
      bonusIncentive: '₹0',
      tdsRate: '1.0% (Sec 194O)',
      gstRate: '18% on Commission'
    }
  }
];

/**
 * GET /api/v1/vendors
 * Query: source (DIRECT | MANAGER | AGENT | ALL), category, status, search
 */
vendorsRoutes.get('/', (req, res) => {
  try {
    const { source, category, status, search } = req.query;

    let list = [...vendorList];

    if (source && source !== 'ALL') {
      list = list.filter(v => v.onboardingSource === source);
    }

    if (category && category !== 'ALL') {
      list = list.filter(v => v.category === category);
    }

    if (status && status !== 'ALL') {
      list = list.filter(v => v.status === status);
    }

    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      list = list.filter(v =>
        v.id.toLowerCase().includes(q) ||
        v.storeName.toLowerCase().includes(q) ||
        v.ownerName.toLowerCase().includes(q) ||
        v.phone.includes(q) ||
        v.officerName?.toLowerCase().includes(q) ||
        v.territory.state.toLowerCase().includes(q) ||
        v.territory.district.toLowerCase().includes(q) ||
        v.territory.division.toLowerCase().includes(q) ||
        v.territory.pincode.includes(q) ||
        v.subAdminApproval?.subAdminName.toLowerCase().includes(q) ||
        v.subAdminApproval?.subAdminMobile.includes(q)
      );
    }

    const counts = {
      total: vendorList.length,
      direct: vendorList.filter(v => v.onboardingSource === 'DIRECT').length,
      manager: vendorList.filter(v => v.onboardingSource === 'MANAGER').length,
      agent: vendorList.filter(v => v.onboardingSource === 'AGENT').length,
      active: vendorList.filter(v => v.status === 'ACTIVE').length,
      pending: vendorList.filter(v => v.status === 'PENDING_APPROVAL').length
    };

    res.json({
      success: true,
      counts,
      data: list
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/v1/vendors/history
 * Ticket routing history showing team, attendedBy, status, tat
 */
vendorsRoutes.get('/history', (req, res) => {
  try {
    const { vendorId, team, status, search } = req.query;

    let list = [...vendorHistoryList];

    if (vendorId) {
      list = list.filter(h => h.vendorId === vendorId);
    }

    if (team && team !== 'ALL') {
      list = list.filter(h => h.assignedTeam === team);
    }

    if (status && status !== 'ALL') {
      list = list.filter(h => h.status === status);
    }

    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      list = list.filter(h =>
        h.ticketId.toLowerCase().includes(q) ||
        h.vendorName.toLowerCase().includes(q) ||
        h.issueTitle.toLowerCase().includes(q) ||
        h.attendedBy.toLowerCase().includes(q)
      );
    }

    const stats = {
      totalTickets: vendorHistoryList.length,
      resolved: vendorHistoryList.filter(h => h.status === 'RESOLVED').length,
      pending: vendorHistoryList.filter(h => h.status === 'PENDING').length,
      escalated: vendorHistoryList.filter(h => h.status === 'ESCALATED_TO_SUPPORT_ADMIN').length
    };

    res.json({
      success: true,
      stats,
      data: list
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/v1/vendors/payroll
 * Complete vendor payroll records
 */
vendorsRoutes.get('/payroll', (req, res) => {
  try {
    const { status, vendorId, search } = req.query;

    let list = [...vendorPayrollList];

    if (status && status !== 'ALL') {
      list = list.filter(p => p.payoutStatus === status);
    }

    if (vendorId) {
      list = list.filter(p => p.vendorId === vendorId);
    }

    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.payrollId.toLowerCase().includes(q) ||
        p.vendorName.toLowerCase().includes(q) ||
        p.bankName.toLowerCase().includes(q) ||
        (p.utrNumber && p.utrNumber.toLowerCase().includes(q))
      );
    }

    const totalGross = '₹6,32,500';
    const totalPlatformCommission = '₹63,250';
    const totalNetDisbursed = '₹5,68,125';
    const pendingDisbursements = vendorPayrollList.filter(p => p.payoutStatus === 'PENDING_PAYOUT').length;

    res.json({
      success: true,
      summary: {
        totalGross,
        totalPlatformCommission,
        totalNetDisbursed,
        pendingDisbursements,
        totalPayrolls: vendorPayrollList.length
      },
      data: list
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/v1/vendors/payroll/:id/release
 * Support Admin action: release payout for vendor
 */
vendorsRoutes.post('/payroll/:id/release', (req, res) => {
  try {
    const { id } = req.params;
    const { utrNumber, approvedBy = 'Support Admin' } = req.body;

    const payrollIndex = vendorPayrollList.findIndex(p => p.payrollId === id);
    if (payrollIndex === -1) {
      return res.status(404).json({ success: false, message: 'Vendor payroll record not found' });
    }

    const generatedUtr = utrNumber || `CMS${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    const payoutDate = new Date().toISOString().split('T')[0];

    vendorPayrollList[payrollIndex] = {
      ...vendorPayrollList[payrollIndex],
      payoutStatus: 'PAID',
      utrNumber: generatedUtr,
      payoutDate
    };

    AuditService.logAction({
      action: 'VENDOR_PAYOUT_RELEASED',
      actor: approvedBy,
      relatedEntity: `PAYROLL:${id}`,
      validationPassed: true,
      isHuman: true,
      decisionReasoning: `Support Admin released vendor payout with UTR ${generatedUtr}`,
      inputPayload: { payrollId: id, utrNumber: generatedUtr },
      outputResult: { status: 'PAID', payoutDate, netPayout: vendorPayrollList[payrollIndex].netPayout }
    });

    res.json({
      success: true,
      message: `Vendor payout released successfully with UTR ${generatedUtr}`,
      data: vendorPayrollList[payrollIndex]
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/v1/vendors
 * Register new vendor with channel, 7 categories, territory, and sub admin approval
 */
vendorsRoutes.post('/', (req, res) => {
  try {
    const {
      storeName,
      category = 'DAILY_NEEDS',
      ownerName,
      phone,
      email,
      territory,
      onboardingSource,
      officerName,
      subAdminApproval
    } = req.body;

    if (!storeName || !ownerName || !phone || !onboardingSource) {
      return res.status(400).json({ success: false, message: 'Required fields missing' });
    }

    const formattedTerritory = territory || {
      state: 'Tamil Nadu',
      district: 'Chennai',
      division: 'Central Division',
      pincode: '600001',
      address: 'Chennai, Tamil Nadu'
    };

    const newVendor: VendorRecord = {
      id: `VEN-${Math.floor(600 + Math.random() * 300)}`,
      storeName,
      category: category as VendorCategory,
      categoryLabel: category,
      ownerName,
      phone,
      email: email || '',
      onboardingSource,
      officerName: officerName || (onboardingSource === 'DIRECT' ? 'Direct' : onboardingSource === 'MANAGER' ? 'Manager - Regional Lead' : 'Agent - Field Rep'),
      onboardedBy: officerName || (onboardingSource === 'DIRECT' ? 'Direct' : onboardingSource === 'MANAGER' ? 'Manager - Regional Lead' : 'Agent - Field Rep'),
      onboardingDate: new Date().toISOString().split('T')[0],
      territory: formattedTerritory,
      subAdminApproval: subAdminApproval || {
        isApproved: true,
        subAdminName: 'K. Selvakumar',
        subAdminMobile: '+91 98402 20002',
        subAdminLevel: 'DISTRICT',
        subAdminTitle: 'District Sub Admin',
        approvedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        notes: 'Approved for customer support operations ingestion.'
      },
      kycStatus: 'UNDER_REVIEW',
      status: 'PENDING_APPROVAL',
      registrationDetails: {
        legalBusinessName: `${storeName} Commercial Enterprise`,
        tradeName: storeName,
        panNumber: 'ABCDE9999Z',
        gstin: '33ABCDE9999Z1Z0',
        bankName: 'HDFC Bank',
        accountNumber: '50200012938192',
        ifscCode: 'HDFC0001244',
        businessType: 'Proprietorship',
        appliedDate: new Date().toISOString().split('T')[0]
      },
      documents: [
        { name: 'Business_Proof.pdf', type: 'PDF', status: 'UNDER_REVIEW', fileSize: '1.2 MB', uploadDate: new Date().toISOString().split('T')[0] }
      ]
    };

    vendorList.unshift(newVendor);

    AuditService.logAction({
      action: 'VENDOR_ONBOARDING_REGISTERED',
      actor: officerName || 'Support Admin',
      relatedEntity: `VENDOR:${newVendor.id}`,
      validationPassed: true,
      isHuman: true,
      decisionReasoning: `Vendor ${storeName} registered via ${onboardingSource} onboarding channel under category ${category}`,
      inputPayload: req.body,
      outputResult: newVendor
    });

    res.status(201).json({
      success: true,
      message: `Vendor ${storeName} registered successfully via ${onboardingSource} onboarding channel.`,
      data: newVendor
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});
