import { 
  TenantRecord, 
  TenantStatus, 
  SaaSPlanTier, 
  FeatureEntitlement 
} from '../types';

export class TenantManagementService {
  private static tenantStore: Map<string, TenantRecord> = new Map();

  /**
   * Onboards a new Multi-Tenant SaaS organization
   */
  static createTenant(
    name: string, 
    legalName: string, 
    planTier: SaaSPlanTier
  ): TenantRecord {
    const tenantId = `tenant-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const entitlements = this.getEntitlementsForPlan(planTier);
    const monthlyQuota = this.getQuotaForPlan(planTier);

    const record: TenantRecord = {
      tenantId,
      name,
      legalName,
      status: TenantStatus.ACTIVE,
      planTier,
      entitlements,
      monthlyQuota,
      currentUsage: {
        usedConversations: 0,
        usedTokens: 0,
        usedVoiceMinutes: 0
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.tenantStore.set(tenantId, record);
    return record;
  }

  /**
   * Central Data-Access Layer Tenant Isolation Guard
   * Throws security error if tenant context does not match resource tenant
   */
  static validateTenantIsolation(requestTenantId: string, resourceTenantId: string): void {
    if (requestTenantId !== resourceTenantId) {
      throw new Error(`SECURITY ALERT: Cross-tenant data access violation attempt. Requesting tenant '${requestTenantId}' cannot access resource owned by tenant '${resourceTenantId}'.`);
    }
  }

  /**
   * Verifies if tenant is entitled to a specific SaaS feature (e.g. WHITE_LABEL, VOICE_SUPPORT)
   */
  static isFeatureEntitled(tenantId: string, feature: FeatureEntitlement): boolean {
    const tenant = this.tenantStore.get(tenantId);
    if (!tenant) return false;
    return tenant.entitlements.includes(feature);
  }

  private static getEntitlementsForPlan(plan: SaaSPlanTier): FeatureEntitlement[] {
    switch (plan) {
      case SaaSPlanTier.ENTERPRISE:
        return [
          FeatureEntitlement.VOICE_SUPPORT,
          FeatureEntitlement.WHATSAPP_MESSAGING,
          FeatureEntitlement.ADVANCED_RAG,
          FeatureEntitlement.CUSTOM_AI_AGENTS,
          FeatureEntitlement.WHITE_LABEL,
          FeatureEntitlement.API_ACCESS
        ];
      case SaaSPlanTier.BUSINESS:
        return [
          FeatureEntitlement.VOICE_SUPPORT,
          FeatureEntitlement.WHATSAPP_MESSAGING,
          FeatureEntitlement.ADVANCED_RAG,
          FeatureEntitlement.API_ACCESS
        ];
      case SaaSPlanTier.PROFESSIONAL:
        return [
          FeatureEntitlement.WHATSAPP_MESSAGING,
          FeatureEntitlement.ADVANCED_RAG
        ];
      case SaaSPlanTier.STARTER:
      default:
        return [FeatureEntitlement.WHATSAPP_MESSAGING];
    }
  }

  private static getQuotaForPlan(plan: SaaSPlanTier) {
    switch (plan) {
      case SaaSPlanTier.ENTERPRISE:
        return { maxConversations: 100000, maxTokens: 50000000, maxVoiceMinutes: 50000 };
      case SaaSPlanTier.BUSINESS:
        return { maxConversations: 25000, maxTokens: 10000000, maxVoiceMinutes: 10000 };
      case SaaSPlanTier.PROFESSIONAL:
        return { maxConversations: 5000, maxTokens: 2000000, maxVoiceMinutes: 0 };
      case SaaSPlanTier.STARTER:
      default:
        return { maxConversations: 1000, maxTokens: 500000, maxVoiceMinutes: 0 };
    }
  }
}
