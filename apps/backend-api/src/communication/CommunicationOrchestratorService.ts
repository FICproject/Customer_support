import { 
  CommunicationIntent, 
  CommunicationDispatchRequest, 
  CommunicationDispatchResult, 
  SupportChannel,
  MessageDeliveryStatus
} from '../types';

export class CommunicationOrchestratorService {
  /**
   * Decoupled Communication Dispatch Engine
   * Receives abstract intent requests (e.g. REQUEST_REUPLOAD) from KYC AI or Payment AI
   * and dispatches via customer-preferred multi-channel strategies (Email, WhatsApp, Calling).
   */
  static async dispatchCommunication(request: CommunicationDispatchRequest): Promise<CommunicationDispatchResult> {
    const timestamp = new Date().toISOString();
    const targetChannels = this.determineChannelsForIntent(request);

    const deliveryTimestamps: Record<string, string> = {};

    // Simulate multi-channel dispatch
    for (const channel of targetChannels) {
      switch (channel) {
        case SupportChannel.EMAIL:
          // Dispatches Email with re-upload link / formal receipt
          deliveryTimestamps[SupportChannel.EMAIL] = timestamp;
          break;

        case SupportChannel.WHATSAPP:
          // Dispatches WhatsApp interactive template message
          deliveryTimestamps[SupportChannel.WHATSAPP] = timestamp;
          break;

        case SupportChannel.VOICE:
          // Initiates automated outbound voice call reminder
          deliveryTimestamps[SupportChannel.VOICE] = timestamp;
          break;

        case SupportChannel.CHAT:
          deliveryTimestamps[SupportChannel.CHAT] = timestamp;
          break;
      }
    }

    return {
      requestId: request.requestId,
      channelsDispatched: targetChannels,
      status: 'DELIVERED',
      deliveryTimestamps
    };
  }

  /**
   * Evaluates channel dispatch strategy based on intent and user preference
   */
  private static determineChannelsForIntent(request: CommunicationDispatchRequest): SupportChannel[] {
    if (request.preferredChannel) {
      return [request.preferredChannel];
    }

    switch (request.intent) {
      case CommunicationIntent.REQUEST_REUPLOAD:
        // KYC AI "Document Blurred" -> Dispatches Email (Re-upload link) + WhatsApp (Instant Notification)
        return [SupportChannel.EMAIL, SupportChannel.WHATSAPP];

      case CommunicationIntent.PAYMENT_REMINDER:
        // Payment AI "Pending Fee" -> Dispatches WhatsApp (Payment link) + Outbound Voice Call
        return [SupportChannel.WHATSAPP, SupportChannel.VOICE];

      case CommunicationIntent.CREDENTIALS_DISPATCH:
        // KYC AI "Account Creation" -> Dispatches Email (Secure Activation link)
        return [SupportChannel.EMAIL];

      case CommunicationIntent.OUTBOUND_CALL_REQUEST:
        return [SupportChannel.VOICE];

      default:
        return [SupportChannel.WHATSAPP, SupportChannel.EMAIL];
    }
  }
}
