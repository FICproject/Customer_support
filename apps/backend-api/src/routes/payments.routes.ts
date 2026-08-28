import { Router } from 'express';
import { store } from '../db/inMemoryStore';
import { PaymentAgent } from '../ai/agents/PaymentAgent';
import { validateBody } from '../middleware/validate';
import { GeneratePaymentLinkSchema } from '../schemas';

const router = Router();

router.get('/', (req, res) => {
  const transactions = Array.from(store.payments.values());
  res.json({ success: true, count: transactions.length, data: transactions });
});

router.get('/commissions', (req, res) => {
  res.json({ success: true, count: store.commissions.length, data: store.commissions });
});

router.post('/generate-link', validateBody(GeneratePaymentLinkSchema), (req, res) => {
  const { userId, amount, purpose, referredAgentId } = req.body;
  const txn = PaymentAgent.createPaymentLink({
    userId,
    amount,
    purpose,
    referredAgentId
  });
  res.json({ success: true, data: txn });
});

router.post('/:txnId/checkout-success', (req, res) => {
  const { txnId } = req.params;
  try {
    const txn = PaymentAgent.processPaymentSuccess(txnId);
    res.json({ success: true, data: txn });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.post('/takeover', (req, res) => {
  const { registrationId, handledBy, customAmount, notes } = req.body;
  const result = PaymentAgent.takeoverPaymentCase({
    registrationId: registrationId || 'REG-8822',
    handledBy: handledBy || 'Elena Vance (Payment TL)',
    customAmount: customAmount ? Number(customAmount) : 99,
    notes
  });
  res.json({ success: true, message: 'Case taken over successfully', data: result });
});

router.post('/transfer-to-ai', (req, res) => {
  const { registrationId, verifiedBy, utrNumber, settledAmount } = req.body;
  const result = PaymentAgent.transferToAI({
    registrationId: registrationId || 'REG-8822',
    verifiedBy: verifiedBy || 'Elena Vance (Payment TL)',
    utrNumber: utrNumber || 'PUNB0291048822',
    settledAmount: settledAmount ? Number(settledAmount) : 99
  });
  res.json({ success: true, message: 'Case handed off to AI Agent successfully', data: result });
});

router.get('/commissions/hierarchy', (req, res) => {
  const mockHierarchy = [
    {
      id: 'COMM-TXN-901',
      vendorId: 'VND-7781',
      vendorName: 'Sri Balaji Organics & Spices',
      onboardingFee: 600.00,
      currency: 'INR',
      timestamp: '2026-08-24 11:35 AM',
      status: 'CREDITED_TO_WALLETS',
      splits: {
        directAgent: { id: 'AGT-TN-101', name: 'Raju Vignesh (Field Agent)', amount: 150.00, walletAcc: 'W-9910', status: 'CREDITED' },
        districtAgent: { id: 'AGT-DIST-402', name: 'Prakash Rao (District Coordinator)', amount: 50.00, district: 'Chennai North', walletAcc: 'W-4020', status: 'CREDITED' },
        divisionalAgent: { id: 'AGT-DIV-108', name: 'Meenakshi Sundaram (Divisional Lead)', amount: 50.00, division: 'North Tamil Nadu', walletAcc: 'W-1080', status: 'CREDITED' },
        stateAgent: { id: 'AGT-STATE-01', name: 'Dr. R. Natarajan (State Head)', amount: 50.00, state: 'Tamil Nadu', walletAcc: 'W-0010', status: 'CREDITED' }
      },
      totalCommission: 300.00,
      platformNet: 300.00
    },
    {
      id: 'COMM-TXN-902',
      vendorId: 'VND-7785',
      vendorName: 'Apex Precision Engineering',
      onboardingFee: 1500.00,
      currency: 'INR',
      timestamp: '2026-08-24 10:15 AM',
      status: 'CREDITED_TO_WALLETS',
      splits: {
        directAgent: { id: 'AGT-KA-204', name: 'Santosh Kumar (Direct Agent)', amount: 150.00, walletAcc: 'W-8822', status: 'CREDITED' },
        districtAgent: { id: 'AGT-DIST-501', name: 'Sanjay Gowda (District Coordinator)', amount: 50.00, district: 'Bengaluru Urban', walletAcc: 'W-5010', status: 'CREDITED' },
        divisionalAgent: { id: 'AGT-DIV-202', name: 'Venkatesh Prasad (Divisional Lead)', amount: 50.00, division: 'Bengaluru Division', walletAcc: 'W-2020', status: 'CREDITED' },
        stateAgent: { id: 'AGT-STATE-02', name: 'Ananth Hegde (State Head)', amount: 50.00, state: 'Karnataka', walletAcc: 'W-0020', status: 'CREDITED' }
      },
      totalCommission: 300.00,
      platformNet: 1200.00
    }
  ];
  res.json({ success: true, data: mockHierarchy });
});

router.get('/payouts', (req, res) => {
  const mockPayouts = [
    {
      payoutId: 'PAYOUT-REQ-101',
      agentId: 'AGT-TN-101',
      agentName: 'Raju Vignesh',
      tier: 'FIELD_AGENT (Direct)',
      walletBalance: 6450.00,
      requestedAmount: 4500.00,
      tdsDeduction: 225.00, // 5% TDS
      netPayable: 4275.00,
      bankName: 'HDFC Bank',
      accountNumber: 'XXXXXX9821',
      ifsc: 'HDFC0001244',
      upiId: 'raju.vignesh@okhdfcbank',
      panNumber: 'ABCDE1234F (Verified)',
      kycStatus: 'VERIFIED',
      requestedAt: '2026-08-24 10:45 AM',
      status: 'OFFICER_VERIFIED',
      officerNote: 'Bank account and IFSC match penny-drop check. PAN verified for 5% TDS.',
      verifiedByOfficer: 'Suresh Reddy (PAY-OFF-02)'
    },
    {
      payoutId: 'PAYOUT-REQ-102',
      agentId: 'AGT-DIST-402',
      agentName: 'Prakash Rao',
      tier: 'DISTRICT_AGENT (District)',
      walletBalance: 14200.00,
      requestedAmount: 8000.00,
      tdsDeduction: 400.00,
      netPayable: 7600.00,
      bankName: 'State Bank of India',
      accountNumber: 'XXXXXX4419',
      ifsc: 'SBIN0004921',
      upiId: 'prakash.rao@oksbi',
      panNumber: 'PQRS7788K (Verified)',
      kycStatus: 'VERIFIED',
      requestedAt: '2026-08-24 09:30 AM',
      status: 'PENDING_OFFICER_AUDIT',
      officerNote: '',
      verifiedByOfficer: null
    }
  ];
  res.json({ success: true, data: mockPayouts });
});

router.post('/payouts/:id/verify', (req, res) => {
  const { id } = req.params;
  const { officerId, officerName, notes } = req.body;
  res.json({
    success: true,
    message: `Payout ${id} verified by ${officerName || 'Officer'} and forwarded to Team Lead Elena Vance for release.`,
    data: { payoutId: id, status: 'OFFICER_VERIFIED', verifiedBy: officerName || officerId, notes }
  });
});

router.post('/payouts/:id/disburse', (req, res) => {
  const { id } = req.params;
  const { approvedBy, utrRef } = req.body;
  res.json({
    success: true,
    message: `Payout ${id} successfully disbursed via IMPS reference ${utrRef || 'IMPS' + Date.now()}. Wallet debited.`,
    data: { payoutId: id, status: 'DISBURSED', approvedBy: approvedBy || 'Elena Vance (Payment TL)', utr: utrRef || 'IMPS998822' }
  });
});

router.get('/settings', (req, res) => {
  res.json({ success: true, data: store.paymentSettings });
});

router.post('/settings', (req, res) => {
  const {
    slaWindowMinutes,
    voiceDialerMaxRetries,
    stateAgentFee,
    districtAgentFee,
    divisionalAgentFee,
    pincodeAgentFee
  } = req.body;

  if (slaWindowMinutes !== undefined) store.paymentSettings.slaWindowMinutes = Number(slaWindowMinutes);
  if (voiceDialerMaxRetries !== undefined) store.paymentSettings.voiceDialerMaxRetries = Number(voiceDialerMaxRetries);
  if (stateAgentFee !== undefined) store.paymentSettings.stateAgentFee = Number(stateAgentFee);
  if (districtAgentFee !== undefined) store.paymentSettings.districtAgentFee = Number(districtAgentFee);
  if (divisionalAgentFee !== undefined) store.paymentSettings.divisionalAgentFee = Number(divisionalAgentFee);
  if (pincodeAgentFee !== undefined) store.paymentSettings.pincodeAgentFee = Number(pincodeAgentFee);

  res.json({ success: true, message: 'Payment Department Settings saved successfully', data: store.paymentSettings });
});

export const paymentRoutes = router;

