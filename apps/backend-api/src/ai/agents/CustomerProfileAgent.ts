import { store } from '../../db/inMemoryStore';
import { AuditService } from '../../services/AuditService';
import { AIAgentType, UserProfile, UserRole, UserType } from '../../types';

export class CustomerProfileAgent {
  public static get360Profile(userId: string) {
    const user: UserProfile = store.users.get(userId) || {
      id: userId,
      name: 'Anonymous Customer',
      email: 'customer@example.com',
      phone: '+1-800-555-0000',
      role: UserRole.CUSTOMER,
      userType: UserType.EXTERNAL,
      createdAt: new Date().toISOString()
    };
    const userOrders = store.orders.get(userId) || [];
    const userTickets = Array.from(store.tickets.values()).filter(t => t.userId === userId);
    const userKyc = Array.from(store.kycRecords.values()).find(k => k.userId === userId);
    const userPayments = Array.from(store.payments.values()).filter(p => p.userId === userId);
    const userCommissions = store.commissions.filter(c => c.agentId === userId);

    const profile360 = {
      user,
      memberships: user.membershipLevel || 'STANDARD',
      orderHistory: userOrders,
      previousTickets: userTickets,
      kycRecord: userKyc || null,
      paymentHistory: userPayments,
      commissions: userCommissions,
      totalSpent: userPayments.filter(p => p.status === 'SUCCESS').reduce((sum, p) => sum + p.amount, 0),
      summaryText: `360° Profile assembled for ${user.name || userId}. Total orders: ${userOrders.length}, Active tickets: ${userTickets.length}.`
    };

    AuditService.logAction({
      actor: 'AI_CUSTOMER_PROFILE_AGENT',
      agentType: AIAgentType.CUSTOMER_PROFILE,
      action: 'FETCH_360_CUSTOMER_PROFILE',
      userId,
      inputPayload: { userId },
      outputResult: { ordersCount: userOrders.length, ticketsCount: userTickets.length, totalSpent: profile360.totalSpent },
      decisionReasoning: 'Successfully aggregated customer, vendor, agent history, orders, tickets, and financial records.',
      validationPassed: true
    });

    return profile360;
  }
}
