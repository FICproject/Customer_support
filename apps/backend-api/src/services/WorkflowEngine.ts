import { store } from '../db/inMemoryStore';
import { KYCAgent } from '../ai/agents/KYCAgent';
import { PaymentAgent } from '../ai/agents/PaymentAgent';
import { CallingAgent } from '../ai/agents/CallingAgent';
import { EmailAgent } from '../ai/agents/EmailAgent';
import { WhatsAppAgent } from '../ai/agents/WhatsAppAgent';
import { FraudDetectionAgent } from '../ai/agents/FraudDetectionAgent';
import { AuditService } from './AuditService';
import { UserRole, UserType, UserProfile, KYCStatus } from '../types';
import { v4 as uuidv4 } from 'uuid';

export class WorkflowEngine {
  // 1. Agent Registration Workflow
  public static async executeAgentRegistrationWorkflow(params: {
    name: string;
    email: string;
    phone: string;
    panNumber: string;
    aadhaarNumber: string;
    roleAppliedFor?: string;
    highestQualification?: string;
    experienceLevel?: string;
    state?: string;
    streetAddress?: string;
    documentUrl?: string;
    fee?: number;
  }) {
    const userId = `usr-agent-${uuidv4().substring(0, 6)}`;
    const referralCode = `AGT-${params.name.substring(0, 4).toUpperCase()}-${Math.floor(10 + Math.random() * 90)}`;
    const roleApplied = params.roleAppliedFor || 'State Agent';
    const onboardingFee = params.fee || (roleApplied === 'State Agent' ? 1500 : roleApplied === 'District Agent' ? 800 : roleApplied === 'Divisional Agent' ? 500 : 250);

    const agentUser: UserProfile = {
      id: userId,
      name: params.name,
      email: params.email,
      phone: params.phone,
      role: UserRole.AGENT,
      userType: UserType.EXTERNAL,
      panNumber: params.panNumber,
      aadhaarNumber: params.aadhaarNumber,
      referralCode,
      walletBalance: 0,
      createdAt: new Date().toISOString()
    };
    store.users.set(userId, agentUser);

    // Step 1: AI KYC (OCR, Blur, Forgery, Criminal Verification)
    const kycRecord = KYCAgent.processVerification({
      userId,
      userRole: UserRole.AGENT,
      documentType: 'PAN',
      documentUrl: params.documentUrl || 'https://storage.enterpriseai.com/docs/clean-pan.png'
    });

    // Attach rich metadata to kycRecord
    kycRecord.applicantName = params.name;
    kycRecord.applicantType = `${roleApplied} (Connect Portal Application)`;
    kycRecord.status = 'IN_PROGRESS';
    kycRecord.aiDecision = KYCStatus.UNDER_AI_VERIFICATION;
    kycRecord.documentType = 'PAN & Aadhaar & Digital Signature';
    kycRecord.paymentStatus = `WAITING_PAYMENT ($${onboardingFee}.00)`;
    kycRecord.currentStep = 'Step 2: Payment Handoff & KYC Team Review';
    store.kycRecords.set(kycRecord.id, kycRecord);

    // Step 2: Payment Dept -> Create Pending Payment Link
    const payTxn = PaymentAgent.createPaymentLink({
      userId,
      amount: onboardingFee,
      purpose: 'REGISTRATION_FEE'
    });
    payTxn.applicantName = params.name;
    payTxn.applicantType = `${roleApplied} • Fee Dispatched`;
    payTxn.kycReference = kycRecord.id;
    store.payments.set(payTxn.id, payTxn);

    // Outbound Calling Simulation
    const callResult = CallingAgent.makeOutboundCall({
      userId,
      userName: params.name,
      userPhone: params.phone,
      callReason: 'PENDING_PAYMENT_REMINDER',
      paymentLinkId: payTxn.id
    });

    // Send WhatsApp Link
    WhatsAppAgent.sendWhatsAppMessage({
      toPhone: params.phone,
      messageType: 'PAYMENT_LINK',
      content: `Hello ${params.name}, your ${roleApplied} registration is in KYC verification. Complete your onboarding payment of $${onboardingFee}.00 here: ${payTxn.paymentLinkUrl}`,
      userId
    });

    // Send Email Link
    EmailAgent.sendEmail({
      toEmail: params.email,
      subject: `Forge India Connect - ${roleApplied} Onboarding Payment Link`,
      emailType: 'PAYMENT_LINK',
      bodyContent: `Dear ${params.name},\n\nYour application for ${roleApplied} has been received by AI Orchestrator & KYC Department.\n\nTo complete registration, please pay the onboarding fee of $${onboardingFee}.00 via this secure link:\n${payTxn.paymentLinkUrl}\n\nYour temporary registration ID is ${userId}.`,
      userId
    });

    AuditService.logAction({
      actor: 'AI_ORCHESTRATOR',
      action: 'EXECUTE_AGENT_REGISTRATION_WORKFLOW',
      userId,
      inputPayload: params,
      outputResult: { agentUser, kycRecord, payTxn, callResult },
      decisionReasoning: `Agent Registration for ${params.name} (${roleApplied}) ingested. Routed to KYC Team Lead & Payment Department ($${onboardingFee}.00).`,
      validationPassed: true
    });

    return {
      status: 'IN_PROGRESS',
      agentUser,
      kycRecord,
      payTxn,
      callResult
    };
  }

  // 2. Direct Vendor Registration Workflow
  public static async executeDirectVendorRegistration(params: {
    businessName: string;
    productOrService?: string;
    businessAddress?: string;
    businessPhone?: string;
    email: string;
    website?: string;
    operatingHours?: string;
    ownerName?: string;
    alternatePhone?: string;
    coPartnerName?: string;
    panNumber?: string;
    companyRegNo?: string;
    gstStatus?: string;
    msmeStatus?: string;
    aadhaarNumber?: string;
    licenseNumber?: string;
    accountHolderName?: string;
    bankName?: string;
    bankBranch?: string;
    bankStreet?: string;
    bankCity?: string;
    accountNo?: string;
    ifscCode?: string;
    documentUrl?: string;
  }) {
    const userId = `usr-vendor-${uuidv4().substring(0, 6)}`;
    const vendorUser: UserProfile = {
      id: userId,
      name: params.businessName,
      email: params.email,
      phone: params.businessPhone || '+91-99881-22334',
      role: UserRole.VENDOR,
      userType: UserType.EXTERNAL,
      panNumber: params.panNumber || 'ABCDE1234F',
      aadhaarNumber: params.aadhaarNumber || '1234-5678-9012',
      createdAt: new Date().toISOString()
    };
    store.users.set(userId, vendorUser);

    // Step 1: Ingest into AI KYC Agent
    const kycRecord = KYCAgent.processVerification({
      userId,
      userRole: UserRole.VENDOR,
      documentType: 'BUSINESS_LICENSE',
      documentUrl: params.documentUrl || 'https://storage.enterpriseai.com/docs/gst-global.png'
    });

    kycRecord.applicantName = `${params.businessName} (${params.ownerName || 'Direct Vendor'})`;
    kycRecord.applicantType = 'Vendor Partner (Direct Connect Registration)';
    kycRecord.status = 'IN_PROGRESS';
    kycRecord.aiDecision = KYCStatus.UNDER_AI_VERIFICATION;
    kycRecord.documentType = `PAN (${params.panNumber || 'PAN'}), Aadhaar & License (${params.licenseNumber || 'LIC-REG'})`;
    kycRecord.paymentStatus = 'PENDING_VERIFICATION ($500.00)';
    kycRecord.currentStep = 'Step 2: Owner & Bank Details Verified → KYC TL Approval Desk';
    store.kycRecords.set(kycRecord.id, kycRecord);

    // Step 2: Payment Dept -> Create Pending Transaction
    const payTxn = PaymentAgent.createPaymentLink({
      userId,
      amount: 500,
      purpose: 'VENDOR_ONBOARDING'
    });
    payTxn.applicantName = params.businessName;
    payTxn.applicantType = 'Direct Vendor Onboarding Fee';
    payTxn.kycReference = kycRecord.id;
    store.payments.set(payTxn.id, payTxn);

    // Send WhatsApp & Email Notifications
    WhatsAppAgent.sendWhatsAppMessage({
      toPhone: params.businessPhone || '+91-99881-22334',
      messageType: 'PAYMENT_LINK',
      content: `Welcome ${params.businessName}! Your Direct Vendor Application is undergoing KYC verification. Complete your onboarding fee here: ${payTxn.paymentLinkUrl}`,
      userId
    });

    EmailAgent.sendEmail({
      toEmail: params.email,
      subject: `Forge India Connect - Vendor Onboarding Application Ingested (${params.businessName})`,
      emailType: 'PAYMENT_LINK',
      bodyContent: `Dear ${params.ownerName || params.businessName},\n\nYour 5-Step Direct Vendor Registration has been received and forwarded to the KYC Team Lead desk.\n\nBank Account: ${params.bankName || 'Bank'} (${params.accountNo || 'Active'})\nBranch: ${params.bankBranch || 'Branch'}\nIFSC: ${params.ifscCode || 'IFSC'}\n\nYour Temporary Vendor ID is ${userId}.`,
      userId
    });

    AuditService.logAction({
      actor: 'AI_ORCHESTRATOR',
      action: 'EXECUTE_DIRECT_VENDOR_REGISTRATION_WORKFLOW',
      userId,
      inputPayload: params,
      outputResult: { vendorUser, kycRecord, payTxn },
      decisionReasoning: `Direct Vendor Application for ${params.businessName} ingested. Routed to KYC Team Lead & Payment Operations.`,
      validationPassed: true
    });

    return {
      status: 'IN_PROGRESS',
      vendorUser,
      kycRecord,
      payTxn
    };
  }

  // 3. Agent Referral Vendor Workflow
  public static async executeAgentReferralVendorWorkflow(params: {
    businessName: string;
    productOrService?: string;
    businessAddress?: string;
    businessPhone?: string;
    email: string;
    website?: string;
    operatingHours?: string;
    ownerName?: string;
    alternatePhone?: string;
    agentNameOrId?: string;
    referralCode?: string;
    coPartnerName?: string;
    panNumber?: string;
    companyRegNo?: string;
    gstStatus?: string;
    msmeStatus?: string;
    aadhaarNumber?: string;
    licenseNumber?: string;
    accountHolderName?: string;
    bankName?: string;
    bankBranch?: string;
    bankStreet?: string;
    bankCity?: string;
    accountNo?: string;
    ifscCode?: string;
    documentUrl?: string;
  }) {
    const refCode = params.agentNameOrId || params.referralCode || 'AGT-INDIA-101';
    const agent = Array.from(store.users.values()).find(u => u.referralCode === refCode || u.id === refCode || u.name.toLowerCase().includes(refCode.toLowerCase()));
    const agentId = agent ? agent.id : 'usr-agent-1';

    const userId = `usr-vendor-${uuidv4().substring(0, 6)}`;
    const vendorUser: UserProfile = {
      id: userId,
      name: params.businessName,
      email: params.email,
      phone: params.businessPhone || '+91-97771-44332',
      role: UserRole.VENDOR,
      userType: UserType.EXTERNAL,
      referredByAgentCode: refCode,
      panNumber: params.panNumber || 'ABCDE1234F',
      aadhaarNumber: params.aadhaarNumber || '1234-5678-9012',
      createdAt: new Date().toISOString()
    };
    store.users.set(userId, vendorUser);

    // Step 1: AI Verification Record
    const kycRecord = KYCAgent.processVerification({
      userId,
      userRole: UserRole.VENDOR,
      documentType: 'BUSINESS_LICENSE',
      documentUrl: params.documentUrl || 'https://storage.enterpriseai.com/docs/gst-zenith.png'
    });

    kycRecord.applicantName = `${params.businessName} (${params.ownerName || 'Referred Vendor'})`;
    kycRecord.applicantType = `Vendor Partner (Referred by Agent: ${refCode})`;
    kycRecord.status = 'IN_PROGRESS';
    kycRecord.aiDecision = KYCStatus.UNDER_AI_VERIFICATION;
    kycRecord.documentType = `PAN (${params.panNumber || 'PAN'}), Aadhaar & License (${params.licenseNumber || 'LIC-REG'})`;
    kycRecord.paymentStatus = 'PENDING_VERIFICATION ($500.00)';
    kycRecord.currentStep = `Step 2: Referred by ${refCode} → KYC Team Lead & Commission Verification`;
    store.kycRecords.set(kycRecord.id, kycRecord);

    // Step 2: Payment Dept -> Create Pending Transaction
    const payTxn = PaymentAgent.createPaymentLink({
      userId,
      amount: 500,
      purpose: 'VENDOR_ONBOARDING',
      referredAgentId: agentId
    });
    payTxn.applicantName = params.businessName;
    payTxn.applicantType = `Vendor Partner (Referred by ${refCode})`;
    payTxn.kycReference = kycRecord.id;
    store.payments.set(payTxn.id, payTxn);

    // Step 3: Commission Credit Report
    const commissionReport = {
      agentId,
      agentName: agent ? agent.name : refCode,
      vendorId: userId,
      vendorName: params.businessName,
      onboardingPaymentAmount: 500,
      referralCommissionRate: '10%',
      commissionCredited: 50,
      updatedAgentWalletBalance: (agent ? (agent.walletBalance || 0) : 12500) + 50
    };

    // Credit to commissions store
    store.commissions.push({
      id: `comm-${uuidv4().substring(0, 6)}`,
      agentId,
      vendorId: userId,
      transactionId: payTxn.id,
      amount: 50,
      status: 'CREDITED',
      createdAt: new Date().toISOString()
    });

    AuditService.logAction({
      actor: 'AI_ORCHESTRATOR',
      action: 'EXECUTE_AGENT_REFERRAL_VENDOR_WORKFLOW',
      userId,
      inputPayload: params,
      outputResult: { vendorUser, kycRecord, payTxn, commissionReport },
      decisionReasoning: `Agent Referral Vendor Registration for ${params.businessName} ingested under Agent ${refCode}. Routed to KYC Team Lead Desk.`,
      validationPassed: true
    });

    return {
      status: 'IN_PROGRESS',
      vendorUser,
      kycRecord,
      payTxn,
      commissionReport
    };
  }
}
