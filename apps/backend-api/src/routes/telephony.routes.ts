import { Router } from 'express';
import { TelephonyVoiceService } from '../services/TelephonyVoiceService';
import { CallingAgent } from '../ai/agents/CallingAgent';
import { validateBody } from '../middleware/validate';
import { TelephonyOutboundCallSchema } from '../schemas';

const router = Router();

const handleVoiceWebhook = (req: any, res: any) => {
  try {
    const payload = { ...req.query, ...req.body };
    TelephonyVoiceService.handleInboundCall(payload);
    
    // Clean 200 OK response for Exotel Passthru applet to trigger success branch
    return res.status(200).send("OK");
  } catch (err: any) {
    return res.status(200).send("OK");
  }
};

const handleSpeechToText = async (req: any, res: any) => {
  try {
    const payload = { ...req.query, ...req.body };
    const { twiMLXml, aiResponseText } = await TelephonyVoiceService.processSpeechToText(payload);
    
    // Exotel Dynamic Gather expects complete JSON response with text and action URL
    return res.status(200).json({
      select: "1",
      status: "success",
      text: aiResponseText,
      action: "https://buffer-backless-underpaid.ngrok-free.dev/api/v1/telephony/speech-to-text",
      url: "https://buffer-backless-underpaid.ngrok-free.dev/api/v1/telephony/speech-to-text",
      method: "POST",
      timeout: 5
    });
  } catch (err: any) {
    return res.status(200).json({
      select: "0",
      status: "error",
      text: "Sorry, an error occurred in AI voice processing."
    });
  }
};

// Support GET & POST for Inbound Telephony Webhooks
router.all('/voice-webhook', handleVoiceWebhook);
router.all('/speech-to-text', handleSpeechToText);

// Fetch Active Voice Calls Queue
router.get('/active-calls', (req, res) => {
  const activeCalls = TelephonyVoiceService.getActiveCalls();
  res.json({ success: true, count: activeCalls.length, data: activeCalls });
});

// Trigger Outbound AI Telephony Call (Validated with Zod)
router.post('/outbound-call', validateBody(TelephonyOutboundCallSchema), (req, res) => {
  try {
    const { userId, userName, userPhone, callReason, paymentLinkId } = req.body;
    const result = CallingAgent.makeOutboundCall({
      userId: userId || 'usr-customer-1',
      userName: userName || 'Customer',
      userPhone: userPhone || '+91-98765-43210',
      callReason: callReason || 'PENDING_PAYMENT_REMINDER',
      paymentLinkId
    });
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Force End Active Call (Stealth Monitor)
router.post('/active-calls/:id/force-end', (req, res) => {
  try {
    const callSid = req.params.id;
    const success = TelephonyVoiceService.forceEndCall(callSid);
    if (success) {
      res.json({ success: true, message: 'Call forcefully ended.' });
    } else {
      res.status(404).json({ success: false, error: 'Call not found or already ended.' });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Barge In / Take Over Call (Stealth Monitor)
router.post('/active-calls/:id/barge-in', (req, res) => {
  try {
    const callSid = req.params.id;
    const { adminId } = req.body;
    const success = TelephonyVoiceService.bargeInCall(callSid, adminId);
    if (success) {
      res.json({ success: true, message: 'Successfully barged into call.' });
    } else {
      res.status(404).json({ success: false, error: 'Call not found or already ended.' });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export const telephonyRoutes = router;
