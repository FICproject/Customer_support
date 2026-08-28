import { AIDepartmentDashboardMetrics } from '../../types';

export class AIDepartmentDashboardService {
  /**
   * Returns live metric summaries for Query AI, KYC AI, and Payment AI departments
   */
  static getDepartmentDashboardMetrics(tenantId?: string): AIDepartmentDashboardMetrics {
    const timestamp = new Date().toISOString();

    return {
      queryAIDepartment: {
        agentsCount: 4,
        activeCount: 3,
        busyCount: 1,
        requestsToday: 1820,
        resolvedCount: 1620,
        escalatedCount: 200
      },
      kycAIDepartment: {
        agentsCount: 3,
        activeCount: 2,
        busyCount: 1,
        applicationsToday: 820,
        approvedCount: 610,
        rejectedCount: 120,
        reuploadRequestedCount: 90
      },
      paymentAIDepartment: {
        agentsCount: 3,
        paymentsCheckedToday: 1200,
        successfulCount: 980,
        pendingCount: 120,
        failedCount: 80,
        escalatedCount: 20
      },
      timestamp
    };
  }
}
