import { PaymentAIDepartmentDashboardRecord } from '../../types';

export class PaymentAIDashboardService {
  /**
   * Returns comprehensive Payment AI Department dashboard telemetry covering all 15 sub-section dimensions
   */
  static getPaymentAIDashboardMetrics(): PaymentAIDepartmentDashboardRecord {
    const now = new Date().toLocaleTimeString();

    return {
      departmentCode: 'DEPT_PAYMENT',
      departmentName: 'Payment AI Department',
      overview: {
        totalVolumeINRToday: 485200,
        pendingPaymentsCount: 21,
        successfulPaymentsCount: 412,
        failedPaymentsCount: 5,
        escalatedCount: 14,
        successRatePercentage: 98.4,
        escalationRatePercentage: 2.8,
        avgProcessingTimeSec: 21
      },
      pendingPaymentsList: [
        { txId: 'TX-PAY-901', customerName: 'Rajesh Kumar', amountINR: 4200, method: 'UPI / Razorpay', status: 'VERIFYING_GATEWAY', startedAt: '12:48:20 PM' },
        { txId: 'TX-PAY-902', customerName: 'Forge Logistics', amountINR: 12500, method: 'NEFT / HDFC', status: 'MATCHING_RECEIPT', startedAt: '12:47:10 PM' }
      ],
      successfulPaymentsList: [
        { txId: 'TX-PAY-880', customerName: 'Anil Mehta', amountINR: 3500, method: 'CREDIT_CARD', receiptNo: 'RCP-88021', timestamp: '4 mins ago' },
        { txId: 'TX-PAY-881', customerName: 'Sneha Gupta', amountINR: 1200, method: 'UPI', receiptNo: 'RCP-88022', timestamp: '12 mins ago' }
      ],
      failedPaymentsList: [
        { txId: 'TX-PAY-601', customerName: 'Vikram Singh', amountINR: 9500, errorReason: 'INSUFFICIENT_FUNDS_BANK_DECLINE', timestamp: '45 mins ago' }
      ],
      paymentLinksMetrics: {
        linksGeneratedToday: 340,
        linksPaidCount: 312,
        conversionPercentage: 91.7
      },
      commissionMetrics: {
        totalCommissionCreditedTodayINR: 34500,
        activeAgentsPaidCount: 42
      },
      referralCommissionMetrics: {
        totalReferralClaims: 18,
        amountPerClaimUSD: 50,
        totalCreditedUSD: 900
      },
      vendorRegistrationMetrics: {
        directVendorsCount: 24,
        referralVendorsCount: 18
      },
      paymentRemindersMetrics: {
        remindersSentToday: 180,
        collectedPostReminderINR: 142000
      },
      communicationMetrics: {
        whatsappAlertsSent: 412,
        smsAlertsSent: 412
      },
      escalationsList: [
        { txId: 'TX-PAY-701', reason: 'High value refund request ($120) exceeds $0 threshold', amountUSD: 120, routedTo: 'Payment Team Lead Queue', timestamp: '20 mins ago' }
      ],
      auditList: [
        { id: 'AUD-PAY-101', action: 'CREDITED_REFERRAL_COMMISSION', amount: '$50 USD', performedBy: 'AI-PAYMENT-001', timestamp: '5 mins ago' },
        { id: 'AUD-PAY-102', action: 'GENERATED_PDF_RECEIPT', amount: '₹3,500 INR', performedBy: 'AI-PAYMENT-001', timestamp: '12 mins ago' }
      ]
    };
  }
}
