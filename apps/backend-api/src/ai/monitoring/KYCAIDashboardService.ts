import { KYCAIDepartmentDashboardRecord } from '../../types';

export class KYCAIDashboardService {
  /**
   * Returns comprehensive KYC AI Department dashboard telemetry covering all 17 sub-sections & 8 operational status states
   */
  static getKYCAIDashboardMetrics(): KYCAIDepartmentDashboardRecord {
    const now = new Date().toLocaleTimeString();

    return {
      departmentCode: 'DEPT_KYC',
      departmentName: 'KYC AI Department',
      overview: {
        totalApplicationsToday: 820,
        pendingCount: 18,
        approvedCount: 785,
        rejectedCount: 9,
        escalatedCount: 8,
        reuploadRequestsCount: 18,
        successRatePercentage: 97.8,
        escalationRatePercentage: 1.9,
        avgProcessingTimeSec: 34
      },
      statusCounts: {
        documentReceived: 42,
        documentAnalyzing: 18,
        documentInvalid: 12,
        reuploadRequired: 18,
        verificationInProgress: 18,
        verified: 785,
        rejected: 9,
        escalated: 8
      },
      applicationsList: [
        { applicationId: 'APP-KYC-901', applicantName: 'Forge Logistics Pvt Ltd', applicantType: 'Vendor', documentType: 'PAN', status: 'VERIFICATION_IN_PROGRESS', ocrDpiScore: 300, blurDetected: false, startedAt: '12:48:10 PM' },
        { applicationId: 'APP-KYC-902', applicantName: 'Rajesh Sharma', applicantType: 'Agent', documentType: 'Aadhaar', status: 'DOCUMENT_ANALYZING', ocrDpiScore: 280, blurDetected: false, startedAt: '12:49:05 PM' },
        { applicationId: 'APP-KYC-903', applicantName: 'Priya Verma', applicantType: 'Customer', documentType: 'GSTIN', status: 'REUPLOAD_REQUIRED', ocrDpiScore: 180, blurDetected: true, startedAt: '12:45:20 PM' },
        { applicationId: 'APP-KYC-904', applicantName: 'Apex Trade Global', applicantType: 'Vendor', documentType: 'PAN', status: 'VERIFIED', ocrDpiScore: 400, blurDetected: false, startedAt: '12:40:00 PM' },
        { applicationId: 'APP-KYC-905', applicantName: 'Suresh Kumar', applicantType: 'Vendor', documentType: 'Passport', status: 'ESCALATED', ocrDpiScore: 220, blurDetected: false, startedAt: '12:35:10 PM' }
      ],
      ocrMetrics: { totalExtracted: 820, avgDpiScore: 320, normalizationSuccessRate: 99.1 },
      blurDetectionMetrics: { inspectedCount: 820, blurredDetectedCount: 18, glareDetectedCount: 6 },
      missingDocumentsList: [
        { applicationId: 'APP-KYC-903', applicantName: 'Priya Verma', missingDoc: 'GST Registration Certificate', sentLink: true }
      ],
      reuploadRequestsList: [
        { id: 'REUP-01', applicantName: 'Priya Verma', reason: 'DPI under 200 DPI threshold (Blurred PAN)', sentChannel: 'WHATSAPP', timestamp: '10 mins ago' }
      ],
      criminalEligibilityMetrics: { amlCheckPassedCount: 811, sanctionsWatchlistPassedCount: 820, flaggedCount: 0 },
      aiAccuracyMetrics: { accuracyPercentage: 97.8, securityPolicyPassPercentage: 100.0, falsePositiveRatePercentage: 0.1 },
      processingTimeMetrics: { avgSec: 34, p95Sec: 42, maxSec: 58 },
      failedCasesList: [
        { id: 'ERR-KYC-01', code: 'OCR_BLUR_DETECTED', errorDescription: 'PAN Card DPI score 180 below 200 limit', timestamp: '15 mins ago' }
      ],
      auditTrailList: [
        { id: 'AUD-KYC-101', action: 'APPROVED_PAN_VERIFICATION', performedBy: 'AI-KYC-001', timestamp: '2 mins ago' },
        { id: 'AUD-KYC-102', action: 'SENT_REUPLOAD_LINK_WHATSAPP', performedBy: 'AI-KYC-001', timestamp: '10 mins ago' },
        { id: 'AUD-KYC-103', action: 'ESCALATED_UNREADABLE_SIGNATURE', performedBy: 'AI-KYC-001', timestamp: '30 mins ago' }
      ]
    };
  }
}
