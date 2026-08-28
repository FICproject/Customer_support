import { CommunicationAIDashboardRecord } from '../../types';

export class CommunicationAIDashboardService {
  /**
   * Returns central Communication AI dashboard telemetry covering all 12 sub-section dimensions
   */
  static getCommunicationAIDashboardMetrics(): CommunicationAIDashboardRecord {
    const now = new Date().toLocaleTimeString();

    return {
      departmentCode: 'SPEC_COMMUNICATION',
      departmentName: 'Communication AI',
      overview: {
        totalMessagesToday: 4820,
        activeCallsCount: 42,
        whatsappMessagesToday: 1420,
        emailsSentToday: 840,
        smsSentToday: 2120,
        deliverySuccessRatePercentage: 99.4,
        avgAudioLatencyMs: 85
      },
      voiceMetrics: {
        activeSipChannels: 42,
        ttsProvider: 'ElevenLabs Neural v3 (English/Hindi)',
        sttAccuracyPercentage: 98.6,
        avgLatencyMs: 85
      },
      whatsappMetrics: {
        totalSent: 1420,
        deliveredPercentage: 99.1,
        readPercentage: 88.4,
        templateCompliancePercentage: 100.0
      },
      emailMetrics: {
        totalSent: 840,
        openRatePercentage: 74.2,
        dkimVerifiedRate: 100.0
      },
      smsMetrics: {
        totalSent: 2120,
        deliveryPercentage: 99.8,
        gatewayProvider: 'Twilio / Plivo High Throughput'
      },
      activeCallsList: [
        { callId: 'CALL-VOICE-901', customerName: 'Rajesh Kumar', agentName: 'Calling AI Lead', durationSec: 142, channel: 'SIP / WebRTC', status: 'IN_PROGRESS' },
        { callId: 'CALL-VOICE-902', customerName: 'Forge Logistics', agentName: 'KYC AI Verification', durationSec: 85, channel: 'SIP / WebRTC', status: 'IN_PROGRESS' }
      ],
      conversationsList: [
        { convId: 'CONV-WA-880', customerName: 'Anil Mehta', channel: 'WhatsApp', lastMessage: 'Sent payment link for order #ORD-88402', timestamp: '2 mins ago' },
        { convId: 'CONV-EML-881', customerName: 'Sneha Gupta', channel: 'Email', lastMessage: 'Attached PDF Invoice RCP-88022', timestamp: '8 mins ago' }
      ],
      templatesList: [
        { templateId: 'TPL-01', name: 'KYC Reupload WhatsApp Request', channel: 'WhatsApp', status: 'APPROVED', usageCount: 420 },
        { templateId: 'TPL-02', name: 'Payment Receipt Confirmation SMS', channel: 'SMS', status: 'APPROVED', usageCount: 840 }
      ],
      deliveryStatusMetrics: {
        deliveredCount: 4790,
        readCount: 3820,
        sentCount: 4820,
        queuedCount: 30
      },
      failedMessagesList: [
        { msgId: 'FAIL-SMS-01', channel: 'SMS', recipient: '+919876500000', errorReason: 'CARRIER_UNREACHABLE_TIMEOUT', timestamp: '12 mins ago' }
      ],
      callRecordingsList: [
        { callId: 'CALL-VOICE-840', customerName: 'Anil Mehta', durationSec: 210, fileSizeMb: 4.2, recordingUrl: 's3://recordings/call_840.mp3', timestamp: '15 mins ago' }
      ],
      transcriptsList: [
        { callId: 'CALL-VOICE-840', customerName: 'Anil Mehta', transcriptText: 'Customer: Where is my order? AI: Your order #ORD-88402 is out for delivery today via BlueDart.', sentimentScore: 'POSITIVE (98.4%)', timestamp: '15 mins ago' }
      ],
      analyticsMetrics: {
        csatScore: 4.8,
        slaDeliveryPercentage: 99.4,
        costINR: 420.50
      }
    };
  }
}
