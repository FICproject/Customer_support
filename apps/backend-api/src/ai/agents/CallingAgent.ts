import { store } from '../../db/inMemoryStore';
import { AuditService } from '../../services/AuditService';
import { AIAgentType } from '../../types';

export class CallingAgent {
  public static makeOutboundCall(params: {
    userId: string;
    userName: string;
    userPhone: string;
    callReason: 'PENDING_PAYMENT_REMINDER' | 'KYC_NEED_REUPLOAD' | 'SERVICE_FEEDBACK';
    paymentLinkId?: string;
    documentName?: string;
    attemptNumber?: number;
  }) {
    const user = store.users.get(params.userId);
    const name = params.userName || user?.name || 'Applicant';
    const docName = params.documentName || 'KYC Document';
    const attempt = params.attemptNumber || 1;

    let scriptText = '';
    let callSummary = '';

    if (params.callReason === 'PENDING_PAYMENT_REMINDER') {
      scriptText = `Hello ${name}. Your registration is pending because payment is not completed. Shall I send the payment link to your WhatsApp?`;
      callSummary = `AI Calling Agent conducted outbound voice call to ${params.userPhone}. User confirmed request for payment link. WhatsApp dispatch triggered automatically.`;
    } else if (params.callReason === 'KYC_NEED_REUPLOAD') {
      if (attempt >= 2) {
        scriptText = `Hello ${name}. Calling from KYC Verification Desk. Your second upload for ${docName} was still blurry or unreadable. The document slot has been cleared from your portal again. Please upload a glare-free photo in your portal to prevent manual escalation.`;
        callSummary = `AI Calling Agent executed 2nd warning outbound voice call to ${params.userPhone}. Informed applicant that ${docName} was cleared again and requested final clear upload.`;
      } else {
        scriptText = `Hello ${name}. Calling from KYC Verification Desk. Your uploaded ${docName} is blurry or unreadable. Our AI has cleared this document from your portal. Please visit your portal now and re-upload a clear, glare-free photo.`;
        callSummary = `AI Calling Agent executed initial outbound voice call to ${params.userPhone}. Notified applicant regarding ${docName} blur clearance and instructed portal re-upload.`;
      }
    } else {
      scriptText = `Hello ${name}. Calling from Enterprise AI Customer Support to verify your recent service experience.`;
      callSummary = `AI Calling Agent gathered positive CSAT feedback (Rating: 5/5).`;
    }

    if (params.paymentLinkId) {
      const payTxn = store.payments.get(params.paymentLinkId);
      if (payTxn) {
        payTxn.reminderCallCount += 1;
      }
    }

    AuditService.logAction({
      actor: 'AI_CALLING_AGENT',
      agentType: AIAgentType.CALLING,
      action: 'DISPATCH_OUTBOUND_VOICE_CALL',
      userId: params.userId,
      inputPayload: params,
      outputResult: { scriptText, callSummary, durationSeconds: 42, userResponseStatus: 'CONFIRMED' },
      decisionReasoning: 'Voice call completed over Twilio Telephony channel. Auto-recorded transcript and updated CRM.',
      validationPassed: true
    });

    return {
      callId: `call-${Date.now()}`,
      phone: params.userPhone,
      scriptText,
      transcript: `[00:01] AI: ${scriptText}\n[00:15] User: Yes, please send the link on my WhatsApp.\n[00:25] AI: Sent! Thank you for choosing Enterprise AI.`,
      callSummary,
      status: 'COMPLETED'
    };
  }
}
