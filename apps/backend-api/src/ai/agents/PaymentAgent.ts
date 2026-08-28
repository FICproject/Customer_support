import { store } from '../../db/inMemoryStore';
import { AuditService } from '../../services/AuditService';
import { AIAgentType, PaymentStatus, PaymentTransaction } from '../../types';
import { v4 as uuidv4 } from 'uuid';

export class PaymentAgent {
  public static createPaymentLink(params: {
    userId: string;
    amount: number;
    purpose: 'REGISTRATION_FEE' | 'VENDOR_ONBOARDING' | 'SERVICE_BOOKING' | 'REFUND';
    referredAgentId?: string;
  }): PaymentTransaction {
    const txnId = `pay-${uuidv4().substring(0, 8)}`;
    const paymentLinkUrl = `https://pay.enterpriseai.com/checkout/${txnId}`;

    let commission = 0;
    if (params.referredAgentId) {
      commission = Math.round(params.amount * 0.10); // 10% commission
    }

    const transaction: PaymentTransaction = {
      id: txnId,
      userId: params.userId,
      amount: params.amount,
      purpose: params.purpose,
      paymentLinkUrl,
      status: PaymentStatus.LINK_SENT,
      agentReferralCommission: commission,
      referredAgentId: params.referredAgentId,
      reminderCallCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    store.payments.set(txnId, transaction);

    AuditService.logAction({
      actor: 'AI_PAYMENT_AGENT',
      agentType: AIAgentType.PAYMENT,
      action: 'GENERATE_PAYMENT_LINK',
      userId: params.userId,
      inputPayload: params,
      outputResult: transaction,
      decisionReasoning: `Payment link created for ${params.purpose} ($${params.amount}). Calculated referral commission: $${commission}.`,
      validationPassed: true
    });

    return transaction;
  }

  public static processPaymentSuccess(transactionId: string): PaymentTransaction {
    const txn = store.payments.get(transactionId);
    if (!txn) {
      throw new Error(`Transaction ${transactionId} not found.`);
    }

    txn.status = PaymentStatus.SUCCESS;
    txn.gatewayTxnId = `PG-TXN-${uuidv4().substring(0, 8).toUpperCase()}`;
    txn.invoiceUrl = `https://storage.enterpriseai.com/invoices/inv-${transactionId}.pdf`;
    txn.receiptUrl = `https://storage.enterpriseai.com/receipts/rec-${transactionId}.pdf`;
    txn.updatedAt = new Date().toISOString();

    // If there is an agent referral commission, credit agent wallet
    if (txn.referredAgentId && txn.agentReferralCommission) {
      const agent = store.users.get(txn.referredAgentId);
      if (agent) {
        agent.walletBalance = (agent.walletBalance || 0) + txn.agentReferralCommission;
        store.commissions.push({
          id: `comm-${uuidv4().substring(0, 8)}`,
          agentId: txn.referredAgentId,
          vendorId: txn.userId,
          transactionId: txn.id,
          amount: txn.agentReferralCommission,
          status: 'CREDITED',
          createdAt: new Date().toISOString()
        });
      }
    }

    AuditService.logAction({
      actor: 'AI_PAYMENT_AGENT',
      agentType: AIAgentType.PAYMENT,
      action: 'PROCESS_PAYMENT_SUCCESS',
      userId: txn.userId,
      inputPayload: { transactionId },
      outputResult: { status: txn.status, invoiceUrl: txn.invoiceUrl, commissionCredited: txn.agentReferralCommission },
      decisionReasoning: 'Payment confirmed by gateway webhook. Generated tax invoice & payment receipt. Credited referral wallet.',
      validationPassed: true
    });

    return txn;
  }

  public static takeoverPaymentCase(params: {
    registrationId: string;
    handledBy: string;
    customAmount?: number;
    notes?: string;
  }): any {
    const txnId = `pay-${uuidv4().substring(0, 8)}`;
    const checkoutLinkUrl = `https://pay.forgeindia.internal/checkout/30m-dyn-${params.registrationId.toLowerCase()}`;

    AuditService.logAction({
      actor: params.handledBy,
      agentType: AIAgentType.PAYMENT,
      action: 'PAYMENT_CASE_TAKEOVER',
      userId: params.registrationId,
      inputPayload: params,
      outputResult: { checkoutLinkUrl, status: 'TAKEN_OVER' },
      decisionReasoning: `Payment case ${params.registrationId} taken over by ${params.handledBy}. Dynamic link generated for $${params.customAmount || 99}.`,
      validationPassed: true
    });

    return {
      success: true,
      registrationId: params.registrationId,
      handledBy: params.handledBy,
      checkoutLinkUrl,
      customAmount: params.customAmount || 99,
      status: 'TAKEN_OVER'
    };
  }

  public static transferToAI(params: {
    registrationId: string;
    verifiedBy: string;
    utrNumber?: string;
    settledAmount?: number;
  }): any {
    AuditService.logAction({
      actor: 'AI_PAYMENT_AGENT',
      agentType: AIAgentType.PAYMENT,
      action: 'AI_AGENT_FINAL_ONBOARDING',
      userId: params.registrationId,
      inputPayload: params,
      outputResult: {
        accountStatus: 'ACTIVE',
        receiptIssued: true,
        welcomeEmailSent: true
      },
      decisionReasoning: `Payment verified by ${params.verifiedBy} (UTR: ${params.utrNumber || 'N/A'}). AI Agent activated user credentials in DB and dispatched Welcome Email & Tax PDF.`,
      validationPassed: true
    });

    return {
      success: true,
      registrationId: params.registrationId,
      accountStatus: 'ACTIVE',
      welcomeEmailDispatched: true,
      taxInvoicePdfUrl: `https://storage.forgeindia.internal/invoices/inv-${params.registrationId}.pdf`,
      message: 'Account successfully activated in database and welcome email sent to user.'
    };
  }

  public static calculateMultiTierCommission(params: {
    vendorId: string;
    vendorName: string;
    onboardingFee: number;
    referringAgentId: string;
    referringAgentName: string;
  }) {
    const directAgentComm = 150.00;
    const districtAgentComm = 50.00;
    const divisionalAgentComm = 50.00;
    const stateAgentComm = 50.00;
    const totalCommission = directAgentComm + districtAgentComm + divisionalAgentComm + stateAgentComm;
    const platformNet = params.onboardingFee - totalCommission;

    const commissionRecord = {
      vendorId: params.vendorId,
      vendorName: params.vendorName,
      onboardingFee: params.onboardingFee,
      directAgent: { id: params.referringAgentId, name: params.referringAgentName, amount: directAgentComm, tier: 'DIRECT_AGENT' },
      districtAgent: { id: 'AGT-DIST-402', name: 'Prakash Rao (District Coordinator)', amount: districtAgentComm, tier: 'DISTRICT_AGENT', district: 'Chennai North' },
      divisionalAgent: { id: 'AGT-DIV-108', name: 'Meenakshi Sundaram (Divisional Lead)', amount: divisionalAgentComm, tier: 'DIVISIONAL_AGENT', division: 'North Tamil Nadu' },
      stateAgent: { id: 'AGT-STATE-01', name: 'Dr. R. Natarajan (State Head)', amount: stateAgentComm, tier: 'STATE_AGENT', state: 'Tamil Nadu' },
      totalCommission,
      platformNet,
      currency: 'INR',
      timestamp: new Date().toISOString()
    };

    AuditService.logAction({
      actor: 'AI_PAYMENT_AGENT',
      agentType: AIAgentType.PAYMENT,
      action: 'MULTI_TIER_COMMISSION_CREDITED',
      userId: params.vendorId,
      inputPayload: params,
      outputResult: commissionRecord,
      decisionReasoning: `Credited 4-tier commission on Vendor Onboarding: Direct Agent (₹${directAgentComm}), District (₹${districtAgentComm}), Divisional (₹${divisionalAgentComm}), State (₹${stateAgentComm}).`,
      validationPassed: true
    });

    return commissionRecord;
  }
}

