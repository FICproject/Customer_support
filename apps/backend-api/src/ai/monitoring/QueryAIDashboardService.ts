import { QueryAIDepartmentDashboardRecord } from '../../types';

export class QueryAIDashboardService {
  /**
   * Returns comprehensive Query AI Department dashboard telemetry covering all 15 sub-section dimensions
   */
  static getQueryAIDashboardMetrics(): QueryAIDepartmentDashboardRecord {
    const now = new Date().toLocaleTimeString();

    return {
      departmentCode: 'DEPT_QUERY',
      departmentName: 'Query AI Department',
      overview: {
        totalRequestsToday: 1820,
        liveActiveTasksCount: 32,
        resolvedCount: 1754,
        escalatedCount: 58,
        failedCount: 8,
        successRatePercentage: 96.4,
        escalationRatePercentage: 3.2,
        avgResponseSec: 1.4
      },
      topIssues: [
        { issueName: 'Order Tracking Delay', percentage: 45, count: 819 },
        { issueName: 'Refund & Exchange Policy', percentage: 25, count: 455 },
        { issueName: 'Booking Reschedule Request', percentage: 18, count: 327 },
        { issueName: 'Membership Renewal Tier', percentage: 12, count: 219 }
      ],
      categoryBreakdown: {
        orderQueriesCount: 840,
        bookingQueriesCount: 340,
        membershipQueriesCount: 280,
        serviceQueriesCount: 360
      },
      customerContextSummary: [
        { customerId: 'CUST-8492 (Rajesh Kumar)', tier: 'GOLD', activeInquiries: 1, csat: 4.9 },
        { customerId: 'CUST-3920 (Anil Mehta)', tier: 'STANDARD', activeInquiries: 2, csat: 4.5 },
        { customerId: 'CUST-1049 (Sneha Gupta)', tier: 'PLATINUM', activeInquiries: 1, csat: 5.0 }
      ],
      knowledgeUsage: {
        vectorChunksSearched: 1820,
        precisionPercentage: 95.1,
        topCitedArticles: [
          'Logistics Tracking & Courier SLA v4',
          'Standard Return & Refund Policy 2026',
          'Service Reschedule & Cancellation Rules'
        ]
      },
      toolUsage: [
        { toolName: 'query_order_status', callsToday: 840, latencyMs: 420, successPercentage: 99.2 },
        { toolName: 'search_knowledge_base', callsToday: 1820, latencyMs: 290, successPercentage: 98.8 },
        { toolName: 'check_booking_details', callsToday: 340, latencyMs: 380, successPercentage: 98.5 }
      ],
      performanceMetrics: {
        p95LatencySec: 1.4,
        fcrPercentage: 96.4,
        csatRating: 4.7
      },
      evaluationScores: {
        accuracyPercentage: 96.4,
        securityPassPercentage: 100.0,
        hallucinationRatePercentage: 0.3
      },
      liveRequestsList: [
        { requestId: '#QRY-901', customerName: 'Rajesh Kumar', queryType: 'Order Tracking', status: 'PROCESSING', durationSec: 14, currentStep: 'RAG Knowledge Search' },
        { requestId: '#QRY-902', customerName: 'Sneha Gupta', queryType: 'Booking Reschedule', status: 'PROCESSING', durationSec: 8, currentStep: 'Slot Availability Check' }
      ],
      resolvedList: [
        { requestId: '#QRY-880', issue: 'Where is my order #ORD-88402?', resolutionSummary: 'Delivered BlueDart tracking BD99201 (Dispatched today)', timestamp: '5 mins ago' },
        { requestId: '#QRY-881', issue: 'What is the return window limit?', resolutionSummary: 'Cited 7-day hassle-free return policy article', timestamp: '12 mins ago' }
      ],
      escalatedList: [
        { requestId: '#QRY-701', reason: 'Customer requested human supervisor callback', routedTo: 'Query Team Lead Queue', timestamp: '30 mins ago' }
      ],
      failedList: [
        { requestId: '#QRY-601', errorReason: 'Invalid order format #00000', timestamp: '1 hour ago' }
      ]
    };
  }
}
