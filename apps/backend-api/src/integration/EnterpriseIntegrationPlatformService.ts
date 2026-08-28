import { 
  IntegrationConnectorRecord, 
  IntegrationHealthState, 
  IntegrationProviderType, 
  ToolRiskLevel,
  AIActionControlLevel
} from '../types';

export class EnterpriseIntegrationPlatformService {
  private static processedWebhookEvents: Set<string> = new Set();
  private static circuitBreakerStates: Map<string, IntegrationHealthState> = new Map();

  /**
   * Evaluates Tool Risk Level and determines execution permission & policy
   */
  static evaluateToolRiskPolicy(toolName: string): { riskLevel: ToolRiskLevel; controlLevel: AIActionControlLevel } {
    if (toolName.startsWith('get_') || toolName.startsWith('inspect_')) {
      return { riskLevel: ToolRiskLevel.READ, controlLevel: AIActionControlLevel.AUTO };
    }

    if (toolName.startsWith('update_') || toolName.startsWith('send_')) {
      return { riskLevel: ToolRiskLevel.WRITE, controlLevel: AIActionControlLevel.AUTO_WITH_VALIDATION };
    }

    if (toolName.includes('kyc') || toolName.includes('payment_link')) {
      return { riskLevel: ToolRiskLevel.SENSITIVE, controlLevel: AIActionControlLevel.REQUEST_ONLY };
    }

    // Critical actions like execute_refund, approve_kyc
    return { riskLevel: ToolRiskLevel.CRITICAL, controlLevel: AIActionControlLevel.HUMAN_APPROVAL };
  }

  /**
   * Idempotency Check for Webhooks (prevents duplicate payment processing)
   */
  static isWebhookIdempotent(eventId: string): boolean {
    if (this.processedWebhookEvents.has(eventId)) {
      return false; // Duplicate event
    }
    this.processedWebhookEvents.add(eventId);
    return true; // New event
  }

  /**
   * Circuit Breaker & Health Inspector for External Providers (Exotel, Twilio, Stripe)
   */
  static inspectConnectorHealth(providerName: string): IntegrationHealthState {
    const state = this.circuitBreakerStates.get(providerName);
    return state || IntegrationHealthState.HEALTHY;
  }

  /**
   * Seed demonstration connected integration tools
   */
  static getConnectedIntegrations(tenantId: string): IntegrationConnectorRecord[] {
    const timestamp = new Date().toISOString();

    return [
      {
        connectionId: 'conn-pay-01',
        tenantId,
        providerType: IntegrationProviderType.PAYMENT,
        providerName: 'Stripe Gateway Adapter',
        healthState: IntegrationHealthState.HEALTHY,
        latencyMs: 180,
        rateLimitPerMin: 1200,
        isSandbox: false,
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        connectionId: 'conn-wa-01',
        tenantId,
        providerType: IntegrationProviderType.WHATSAPP,
        providerName: 'Meta WhatsApp Cloud API Adapter',
        healthState: IntegrationHealthState.HEALTHY,
        latencyMs: 140,
        rateLimitPerMin: 3000,
        isSandbox: false,
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        connectionId: 'conn-tel-01',
        tenantId,
        providerType: IntegrationProviderType.TELEPHONY,
        providerName: 'Exotel Telephony Adapter',
        healthState: IntegrationHealthState.HEALTHY,
        latencyMs: 240,
        rateLimitPerMin: 500,
        isSandbox: false,
        createdAt: timestamp,
        updatedAt: timestamp
      }
    ];
  }
}
