import { Router } from 'express';
import { store } from '../db/inMemoryStore';
import { AuditService } from '../services/AuditService';

const router = Router();

// In-memory Omnichannel store
const callQueueData = [
  { id: 'Q-101', phone: '+1 98765 11111', customerName: 'Alexander Hayes', waitTime: '02:15', priority: 'HIGH', category: 'Billing Dispute', queueTime: '10:32 AM' },
  { id: 'Q-102', phone: '+1 98765 22222', customerName: 'Maria Garcia', waitTime: '01:40', priority: 'MEDIUM', category: 'KYC Document Verification', queueTime: '10:33 AM' },
  { id: 'Q-103', phone: '+1 98765 33333', customerName: 'Liam Chen', waitTime: '00:55', priority: 'LOW', category: 'General Inquiry', queueTime: '10:34 AM' },
  { id: 'Q-104', phone: '+1 98765 44444', customerName: 'Rachel Green', waitTime: '00:30', priority: 'CRITICAL', category: 'Account Takeover Alert', queueTime: '10:35 AM' },
  { id: 'Q-105', phone: '+1 98765 55555', customerName: 'Lucas Vance', waitTime: '00:15', priority: 'MEDIUM', category: 'Payment Gateway Timeout', queueTime: '10:35 AM' }
];

const callHistoryData = [
  { id: 'CH-8801', date: 'May 20, 2024', time: '02:30 PM', duration: '04:12', customerName: 'Emily Rodriguez', phone: '+1 98765 43210', outcome: 'Resolved by AI', agent: 'Voice Bot AI', sentiment: 'POSITIVE' },
  { id: 'CH-8802', date: 'May 18, 2024', time: '10:16 AM', duration: '05:43', customerName: 'David Miller', phone: '+1 800 555 0102', outcome: 'Transferred to Supervisor', agent: 'Alex Vance', sentiment: 'NEUTRAL' },
  { id: 'CH-8803', date: 'May 10, 2024', time: '10:05 AM', duration: '03:21', customerName: 'Frank Miller', phone: '+91 99881 22334', outcome: 'Payment Link Delivered', agent: 'Payment Bot', sentiment: 'POSITIVE' },
  { id: 'CH-8804', date: 'May 08, 2024', time: '04:45 PM', duration: '06:18', customerName: 'Sophia Chen', phone: '+91 98765 43210', outcome: 'KYC Verified', agent: 'Suresh Reddy', sentiment: 'POSITIVE' },
  { id: 'CH-8805', date: 'May 02, 2024', time: '11:20 AM', duration: '02:45', customerName: 'James Wilson', phone: '+1 77665 44332', outcome: 'Refund Policy Advised', agent: 'Sarah Jenkins', sentiment: 'RESOLVED' }
];

// Telephony: Call Queue
router.get('/telephony/queue', (req, res) => {
  res.json({ success: true, count: callQueueData.length, data: callQueueData });
});

// Telephony: Call History
router.get('/telephony/history', (req, res) => {
  res.json({ success: true, count: callHistoryData.length, data: callHistoryData });
});

// Telephony: Make Outbound Call
router.post('/telephony/outbound-dial', (req, res) => {
  const { toPhone, customerName, purpose, priority, callerId, role } = req.body;
  const callSid = `CA-${Date.now()}`;
  
  AuditService.logAction({
    actor: role || 'QUERIES_TL',
    action: 'OUTBOUND_CALL_INITIATED',
    ticketId: callSid,
    inputPayload: { toPhone, customerName, purpose, priority, callerId },
    outputResult: { success: true, callSid, status: 'CONNECTED' },
    decisionReasoning: `Outbound call initiated to ${customerName || 'Customer'} (${toPhone}) for purpose: ${purpose || 'Direct Support / Issue Follow-up'}.`,
    validationPassed: true,
    isHuman: true
  });

  res.json({
    success: true,
    callSid,
    status: 'CONNECTED',
    message: `Outbound call successfully connected to ${toPhone}`,
    data: {
      callSid,
      customerName: customerName || 'Outbound Contact',
      phone: toPhone,
      purpose: purpose || 'Customer Query Follow-up',
      startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  });
});

// Telephony: Send DTMF Tone
router.post('/telephony/dtmf', (req, res) => {
  const { callId, digit } = req.body;
  AuditService.logAction({
    actor: req.body.role || 'AGENT',
    action: 'CALL_DTMF_SENT',
    ticketId: callId,
    inputPayload: { digit, callId },
    outputResult: { success: true, digit },
    decisionReasoning: `DTMF tone '${digit}' transmitted on call.`,
    validationPassed: true,
    isHuman: true
  });
  res.json({ success: true, message: `DTMF tone '${digit}' sent successfully.`, digit });
});

// Telephony: Transfer Call
router.post('/telephony/transfer', (req, res) => {
  const { callId, target, transferType, note } = req.body;
  AuditService.logAction({
    actor: req.body.role || 'SUPERVISOR',
    action: 'CALL_TRANSFERRED',
    ticketId: callId,
    inputPayload: { callId, target, transferType, note },
    outputResult: { success: true, target, transferType },
    decisionReasoning: `Call ${callId || 'active-call'} transferred to ${target} (${transferType || 'WARM'}). Note: ${note || 'N/A'}`,
    validationPassed: true,
    isHuman: true
  });
  res.json({
    success: true,
    message: `Call successfully transferred to ${target} via ${transferType || 'WARM'} transfer.`,
    transferId: `TR-${Date.now()}`
  });
});

// Telephony: Save Notes
router.post('/telephony/save-notes', (req, res) => {
  const { callId, customerName, notes } = req.body;
  AuditService.logAction({
    actor: req.body.role || 'AGENT',
    action: 'CALL_NOTE_SAVED',
    ticketId: callId,
    inputPayload: { callId, customerName, notesLength: notes?.length },
    outputResult: { success: true },
    decisionReasoning: `Call note recorded for ${customerName || 'Customer'}.`,
    validationPassed: true,
    isHuman: true
  });
  res.json({ success: true, message: 'Call notes saved successfully to customer profile.' });
});

// Live Chat: Send Message
router.post('/chat/send', (req, res) => {
  const { chatId, text, sender } = req.body;
  AuditService.logAction({
    actor: sender || 'AGENT',
    action: 'LIVE_CHAT_MESSAGE_SENT',
    ticketId: chatId,
    inputPayload: { chatId, sender, textLength: text?.length },
    outputResult: { success: true },
    decisionReasoning: `Live chat message dispatched to visitor in session ${chatId || 'chat-1'}.`,
    validationPassed: true,
    isHuman: true
  });
  res.json({
    success: true,
    message: 'Chat message dispatched successfully.',
    data: {
      id: Date.now(),
      chatId: chatId || 'chat-1',
      sender: sender || 'AGENT',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'SENT'
    }
  });
});

// Live Chat: Assign / Transfer to Human Officer
router.post('/chat/transfer', (req, res) => {
  const { chatId, targetOfficer, note, supervisor } = req.body;
  AuditService.logAction({
    actor: supervisor || 'TEAM_LEAD',
    action: 'CHAT_DELEGATED_TO_OFFICER',
    ticketId: chatId,
    inputPayload: { chatId, targetOfficer, note, supervisor },
    outputResult: { success: true, targetOfficer, assignedTime: new Date().toISOString() },
    decisionReasoning: `Supervisor transferred live chat ${chatId || 'active-chat'} to ${targetOfficer}. Note: ${note || 'Direct delegation'}.`,
    validationPassed: true,
    isHuman: true
  });
  res.json({
    success: true,
    message: `Chat session ${chatId} successfully delegated to ${targetOfficer}.`,
    delegationId: `DEL-${Date.now()}`
  });
});

// Email: Send Reply / Compose
router.post('/email/send', (req, res) => {
  const { to, subject, body, templateId } = req.body;
  AuditService.logAction({
    actor: req.body.role || 'AGENT',
    action: 'EMAIL_DISPATCHED',
    inputPayload: { to, subject, templateId },
    outputResult: { success: true },
    decisionReasoning: `Email sent to ${to} regarding '${subject}'.`,
    validationPassed: true,
    isHuman: true
  });
  res.json({
    success: true,
    message: `Email successfully delivered to ${to}.`,
    messageId: `MSG-EMAIL-${Date.now()}`
  });
});

// WhatsApp: Send Message / Template
router.post('/whatsapp/send', (req, res) => {
  const { to, message, templateName } = req.body;
  AuditService.logAction({
    actor: req.body.role || 'AGENT',
    action: 'WHATSAPP_MESSAGE_SENT',
    inputPayload: { to, templateName, messageLength: message?.length },
    outputResult: { success: true },
    decisionReasoning: `WhatsApp message dispatched to ${to}.`,
    validationPassed: true,
    isHuman: true
  });
  res.json({
    success: true,
    message: `WhatsApp message delivered to ${to}.`,
    wamId: `wamid.HBgM${Date.now()}`
  });
});

export const communicationRoutes = router;
