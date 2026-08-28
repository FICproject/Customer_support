import { ActorType, Department } from '../../types';

export interface AggregatedContextPayload {
  actorId: string;
  actorType: ActorType;
  profileSummary: Record<string, any>;
  relevantHistory: Record<string, any>;
  activePolicies: string[];
}

export class ContextAggregationService {
  /**
   * Aggregates contextual data targeted specifically to intent (prevents token bloat)
   */
  static async aggregateContext(
    actorId: string, 
    actorType: ActorType, 
    intent: string, 
    tenantId: string
  ): Promise<AggregatedContextPayload> {
    const timestamp = new Date().toISOString();

    // Contextual filtering based on actor type and intent
    if (actorType === ActorType.CUSTOMER) {
      return {
        actorId,
        actorType: ActorType.CUSTOMER,
        profileSummary: {
          customerId: actorId,
          name: 'Rajesh Kumar',
          tier: 'GOLD_MEMBER',
          membershipExpires: '2026-12-31'
        },
        relevantHistory: {
          lastOrderId: 'ORD-9921',
          orderStatus: 'DELIVERED',
          lastPaymentStatus: 'SUCCESS',
          openTicketId: null
        },
        activePolicies: ['GOLD_MEMBER_SUPPORT_POLICY_V2', 'REFUND_POLICY_V4']
      };
    }

    if (actorType === ActorType.VENDOR) {
      return {
        actorId,
        actorType: ActorType.VENDOR,
        profileSummary: {
          vendorId: actorId,
          storeName: 'Metro Electronics',
          gstin: '29ABCDE1234F1Z5',
          kycStatus: 'APPROVED'
        },
        relevantHistory: {
          totalOrders: 1420,
          pendingPayoutUSD: 450.0,
          storeStatus: 'ACTIVE'
        },
        activePolicies: ['VENDOR_ONBOARDING_POLICY_V3', 'PAYOUT_TERMS_V1']
      };
    }

    // Referral / Tie-up Agent
    return {
      actorId,
      actorType: ActorType.AGENT,
      profileSummary: {
        agentId: actorId,
        referralCode: 'AGT-9910',
        referredVendorsCount: 14,
        kycStatus: 'APPROVED'
      },
      relevantHistory: {
        totalCommissionEarnedUSD: 700.0,
        pendingCommissionUSD: 100.0,
        lastWithdrawalStatus: 'PAID'
      },
      activePolicies: ['AGENT_COMMISSION_POLICY_V2']
    };
  }
}
