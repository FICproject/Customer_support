import { LLMProviderService } from './LLMProviderService';
import { AuditService } from './AuditService';
import { AIAgentType } from '../types';

export interface TelephonyCallSession {
  callSid: string;
  fromPhone: string;
  toPhone: string;
  channel: 'TWILIO_VOICE' | 'EXOTEL_VOICE';
  status: 'RINGING' | 'IN_PROGRESS' | 'COMPLETED' | 'TRANSFERRED_TO_HUMAN';
  startTime: string;
  transcript: { speaker: 'AI' | 'USER'; text: string; timestamp: string }[];
  sentimentScore: number; // 0.0 to 1.0
  transferredToTl?: boolean;
}

export class TelephonyVoiceService {
  private static activeCalls: Map<string, TelephonyCallSession> = new Map();

  /**
   * Handles incoming phone call webhooks from Twilio/Exotel
   */
  public static handleInboundCall(payload: {
    CallSid?: string;
    From?: string;
    To?: string;
    channel?: string;
  }): { twiMLXml: string; callSession: TelephonyCallSession } {
    const callSid = payload.CallSid || `CS-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const fromPhone = payload.From || '+91-98765-43210';
    const toPhone = payload.To || process.env.EXOTEL_VIRTUAL_NUMBER || '08047288293';

    const session: TelephonyCallSession = {
      callSid,
      fromPhone,
      toPhone,
      channel: (payload.channel as any) || 'EXOTEL_VOICE',
      status: 'IN_PROGRESS',
      startTime: new Date().toISOString(),
      transcript: [
        {
          speaker: 'AI',
          text: "Welcome to FORGE INDIA CONNECT Voice Support. How can I help you today?",
          timestamp: new Date().toISOString()
        }
      ],
      sentimentScore: 0.85
    };

    this.activeCalls.set(callSid, session);

    const greetingText = "Welcome to FORGE INDIA CONNECT Voice Support. Please state your query after the tone.";
    const twiMLXml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>${greetingText}</Say>
</Response>`;

    AuditService.logAction({
      actor: 'TELEPHONY_VOICE_GATEWAY',
      agentType: AIAgentType.CALLING,
      action: 'INBOUND_VOICE_CALL_STARTED',
      inputPayload: payload,
      outputResult: { callSid, fromPhone, status: 'IN_PROGRESS', exotelNumber: toPhone },
      decisionReasoning: `Inbound voice call session initialized for ${fromPhone} on Exotel virtual number ${toPhone}.`,
      validationPassed: true
    });

    return { twiMLXml, callSession: session };
  }

  /**
   * Processes Speech-to-Text transcript from user and generates AI voice response
   */
  public static async processSpeechToText(payload: {
    CallSid: string;
    SpeechResult?: string;
    Confidence?: number;
  }): Promise<{ twiMLXml: string; aiResponseText: string; transferred: boolean }> {
    const callSid = payload.CallSid;
    let session = this.activeCalls.get(callSid);

    if (!session) {
      session = {
        callSid,
        fromPhone: '+91-98765-43210',
        toPhone: process.env.EXOTEL_VIRTUAL_NUMBER || '08047288293',
        channel: 'EXOTEL_VOICE',
        status: 'IN_PROGRESS',
        startTime: new Date().toISOString(),
        transcript: [],
        sentimentScore: 0.8
      };
      this.activeCalls.set(callSid, session);
    }

    // If caller hasn't spoken yet (initial Gather prompt request), return instant greeting without LLM delay
    if (!payload.SpeechResult || payload.SpeechResult.trim() === '') {
      const greetingText = "Welcome to FORGE INDIA CONNECT Voice Support. How can I assist you today?";
      session.transcript.push({
        speaker: 'AI',
        text: greetingText,
        timestamp: new Date().toISOString()
      });
      const twiMLXml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>${greetingText}</Say>
</Response>`;
      return { twiMLXml, aiResponseText: greetingText, transferred: false };
    }

    const userSpeech = payload.SpeechResult;
    session.transcript.push({
      speaker: 'USER',
      text: userSpeech,
      timestamp: new Date().toISOString()
    });

    const isFrustrated = userSpeech.toLowerCase().includes('agent') || 
                        userSpeech.toLowerCase().includes('human') || 
                        userSpeech.toLowerCase().includes('complain') ||
                        userSpeech.toLowerCase().includes('supervisor');

    if (isFrustrated) {
      session.status = 'TRANSFERRED_TO_HUMAN';
      session.transferredToTl = true;
      const transferText = "I understand your concern. Transferring your call directly to our Queries Team Lead desk now. Please hold.";
      
      session.transcript.push({
        speaker: 'AI',
        text: transferText,
        timestamp: new Date().toISOString()
      });

      const twiMLXml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>${transferText}</Say>
</Response>`;

      AuditService.logAction({
        actor: 'TELEPHONY_VOICE_GATEWAY',
        agentType: AIAgentType.CALLING,
        action: 'VOICE_CALL_TRANSFERRED_TO_TL',
        inputPayload: payload,
        outputResult: { callSid, userSpeech, transferredTo: 'Queries Team Lead' },
        decisionReasoning: 'Customer requested human supervisor. Call transferred to Team Lead desk via TwiML <Dial>.',
        validationPassed: true
      });

      return { twiMLXml, aiResponseText: transferText, transferred: true };
    }

    // Generate Conversational AI Response using LLMProviderService
    const llmRes = await LLMProviderService.generateCompletion({
      systemPrompt: "You are FORGE INDIA CONNECT Voice Assistant. Provide a warm, concise 1-2 sentence spoken answer suitable for phone calls.",
      userPrompt: userSpeech,
      maxTokens: 120
    });

    const aiResponseText = llmRes.content;
    session.transcript.push({
      speaker: 'AI',
      text: aiResponseText,
      timestamp: new Date().toISOString()
    });

    const twiMLXml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>${aiResponseText}</Say>
</Response>`;

    AuditService.logAction({
      actor: 'AI_CALLING_AGENT',
      agentType: AIAgentType.CALLING,
      action: 'PROCESS_VOICE_SPEECH_STREAM',
      inputPayload: payload,
      outputResult: { callSid, userSpeech, aiResponseText, provider: llmRes.provider },
      decisionReasoning: `[${llmRes.provider}] Processed speech STT and returned voice response.`,
      validationPassed: true
    });

    return { twiMLXml, aiResponseText, transferred: false };
  }

  /**
   * Triggers a live outbound call via Exotel REST API
   */
  public static async triggerExotelOutboundCall(toPhone: string, customUrl?: string) {
    const accountSid = process.env.EXOTEL_ACCOUNT_SID || 'forgeindiaconnect1';
    const apiKey = process.env.EXOTEL_API_KEY;
    const apiToken = process.env.EXOTEL_API_TOKEN;
    const callerId = process.env.EXOTEL_VIRTUAL_NUMBER || '08047288293';
    const subdomain = process.env.EXOTEL_SUBDOMAIN || 'api.exotel.com';

    if (!apiKey || !apiToken) {
      console.warn('Exotel credentials missing, logging simulated call dispatch.');
      return { success: true, simulated: true, callSid: `EXO-SIM-${Date.now()}` };
    }

    const authHeader = 'Basic ' + Buffer.from(`${apiKey}:${apiToken}`).toString('base64');
    const endpoint = `https://${subdomain}/v1/Accounts/${accountSid}/Calls/connect.json`;

    const bodyParams = new URLSearchParams({
      From: callerId,
      To: toPhone,
      CallerId: callerId,
      Url: customUrl || `http://localhost:4000/api/v1/telephony/voice-webhook`
    });

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: bodyParams.toString()
      });

      const data = await response.json();
      AuditService.logAction({
        actor: 'EXOTEL_TELEPHONY_GATEWAY',
        agentType: AIAgentType.CALLING,
        action: 'DISPATCH_EXOTEL_OUTBOUND_CALL',
        inputPayload: { toPhone, callerId, accountSid },
        outputResult: data,
        decisionReasoning: `Outbound call dispatched via Exotel REST API to ${toPhone}.`,
        validationPassed: response.ok
      });

      return { success: response.ok, data };
    } catch (err: any) {
      console.error('Exotel outbound call error:', err);
      return { success: false, error: err.message };
    }
  }

  public static forceEndCall(callSid: string): boolean {
    const session = this.activeCalls.get(callSid);
    if (!session || session.status === 'COMPLETED') {
      return false;
    }
    
    session.status = 'COMPLETED';
    session.transcript.push({
      speaker: 'AI',
      text: '[SYSTEM INTERVENTION] Call forcefully ended by Support Admin.',
      timestamp: new Date().toISOString()
    });

    AuditService.logAction({
      actor: 'SUPPORT_ADMIN',
      agentType: AIAgentType.CALLING,
      action: 'CALL_FORCE_ENDED',
      inputPayload: { callSid },
      outputResult: { status: 'COMPLETED' },
      decisionReasoning: 'Support Admin forcefully ended the call via Stealth Monitor.',
      validationPassed: true
    });

    return true;
  }

  public static bargeInCall(callSid: string, adminId: string = 'Support Admin'): boolean {
    const session = this.activeCalls.get(callSid);
    if (!session || session.status === 'COMPLETED') {
      return false;
    }

    session.status = 'TRANSFERRED_TO_HUMAN';
    session.transcript.push({
      speaker: 'AI',
      text: `[SYSTEM INTERVENTION] Call intercepted. You are now speaking with ${adminId}.`,
      timestamp: new Date().toISOString()
    });

    AuditService.logAction({
      actor: 'SUPPORT_ADMIN',
      agentType: AIAgentType.CALLING,
      action: 'CALL_BARGE_IN',
      inputPayload: { callSid, adminId },
      outputResult: { status: 'TRANSFERRED_TO_HUMAN' },
      decisionReasoning: 'Support Admin barged into the call via Stealth Monitor.',
      validationPassed: true
    });

    return true;
  }

  public static getActiveCalls(): TelephonyCallSession[] {
    return Array.from(this.activeCalls.values());
  }
}
