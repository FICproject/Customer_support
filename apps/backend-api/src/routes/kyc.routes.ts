import { Router } from 'express';
import { store } from '../db/inMemoryStore';
import { KYCAgent } from '../ai/agents/KYCAgent';
import { AuditService } from '../services/AuditService';
import { KYCStatus, UserRole } from '../types';
import { validateBody } from '../middleware/validate';
import { KYCSubmitSchema, KYCOverrideSchema } from '../schemas';

const router = Router();

router.get('/', (req, res) => {
  const records = Array.from(store.kycRecords.values());
  res.json({ success: true, count: records.length, data: records });
});

router.post('/submit', validateBody(KYCSubmitSchema), async (req, res) => {
  const { customerId, documentType, ocrRawText, imagePayloadBase64 } = req.body;
  const result = await KYCAgent.executeKYCPipeline({
    userId: customerId,
    userRole: UserRole.CUSTOMER,
    documentType,
    documentUrl: imagePayloadBase64 || 'https://storage.internal.saas/docs/kyc-sample.pdf',
    extractedDataInput: ocrRawText ? { rawText: ocrRawText } : undefined
  });
  res.json({ success: true, data: result });
});

router.post('/pipeline', validateBody(KYCSubmitSchema), async (req, res) => {
  const { customerId, documentType, ocrRawText, imagePayloadBase64 } = req.body;
  const result = await KYCAgent.executeKYCPipeline({
    userId: customerId,
    userRole: UserRole.CUSTOMER,
    documentType,
    documentUrl: imagePayloadBase64 || 'https://storage.internal.saas/docs/kyc-sample.pdf',
    extractedDataInput: ocrRawText ? { rawText: ocrRawText } : undefined
  });
  res.json({ success: true, data: result });
});

router.post('/:kycId/manual-override', validateBody(KYCOverrideSchema), (req, res) => {
  const { kycId } = req.params;
  const { reviewedByTL, decision, notes } = req.body;

  const record = store.kycRecords.get(kycId);
  if (!record) {
    return res.status(404).json({ success: false, error: 'KYC record not found' });
  }

  record.aiDecision = decision as KYCStatus;
  record.manualReviewNotes = notes;
  record.reviewedByTL = reviewedByTL || 'KYC_TEAM_LEAD';
  record.updatedAt = new Date().toISOString();

  AuditService.logAction({
    actor: reviewedByTL || 'KYC_TEAM_LEAD',
    action: 'HUMAN_TL_KYC_DECISION_OVERRIDE',
    userId: record.userId,
    inputPayload: req.body,
    outputResult: record,
    decisionReasoning: `KYC Team Lead manually overrode decision to ${decision}. Notes: ${notes}`,
    validationPassed: true
  });

  res.json({ success: true, data: record });
});

router.post('/:kycId/forward-to-officer', (req, res) => {
  const { kycId } = req.params;
  const { officerName, forwardingNotes, reviewedByTL } = req.body || {};

  const record = store.kycRecords.get(kycId);
  if (!record) {
    return res.status(404).json({ success: false, error: 'KYC record not found' });
  }

  record.forwardedToHumanOfficer = true;
  record.assignedHumanOfficer = officerName || 'Sarah Jenkins (KYC Senior Officer)';
  record.forwardingNotes = forwardingNotes || 'Forwarded from KYC Team Lead for direct applicant phone assistance and manual verification.';
  record.reviewedByTL = reviewedByTL || 'KYC_TEAM_LEAD';
  record.updatedAt = new Date().toISOString();

  AuditService.logAction({
    actor: reviewedByTL || 'KYC_TEAM_LEAD',
    action: 'FORWARD_KYC_ESCALATION_TO_OFFICER',
    userId: record.userId,
    inputPayload: req.body,
    outputResult: record,
    decisionReasoning: `KYC Team Lead forwarded escalated case ${kycId} to Human Officer ${record.assignedHumanOfficer}. Notes: ${record.forwardingNotes}`,
    validationPassed: true
  });

  res.json({
    success: true,
    message: `Case successfully assigned and forwarded to ${record.assignedHumanOfficer}.`,
    data: record
  });
});

// Fraud & Blacklist Intelligence Center Endpoints
const fraudCasesStore = new Map<string, any>([
  ['FRD-101', {
    id: 'FRD-101',
    type: 'DUPLICATES',
    title: 'Duplicate Document Hash Collision',
    applicant: 'David Miller (USR-8821)',
    applicantId: 'USR-8821',
    details: 'Aadhaar Card number matching active verified profile (KYC-802 David Miller). SHA-256 match.',
    riskScore: '0.96 CRITICAL',
    status: 'UNDER_INVESTIGATION',
    evidence: {
      sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      matchingProfileId: 'KYC-802',
      detectedAt: '2026-08-22T09:14:22Z',
      ipAddress: '103.21.244.18',
      deviceImei: '864291048201948'
    },
    investigationNotes: []
  }],
  ['FRD-102', {
    id: 'FRD-102',
    type: 'BLACKLIST',
    title: 'PEP / Sanction Watchlist Positive Hit',
    applicant: 'Frank Miller (USR-8824)',
    applicantId: 'USR-8824',
    details: 'Fuzzy match 98.6% on EU Sanction Watchlist & Interpol Red Notice database registry.',
    riskScore: '0.99 CRITICAL',
    status: 'BLOCKED',
    evidence: {
      watchlist: 'OFAC & Interpol Red Notice #INT-2024-991',
      fuzzyMatchScore: 98.6,
      detectedAt: '2026-08-22T08:12:00Z',
      sanctionReason: 'International AML Sanctions Compliance'
    },
    investigationNotes: ['Immediate compliance lock enforced. Gateway transactions frozen.']
  }],
  ['FRD-103', {
    id: 'FRD-103',
    type: 'PATTERNS',
    title: 'Tampered EXIF Metadata & Font Injection',
    applicant: 'Robert Sterling (USR-8823)',
    applicantId: 'USR-8823',
    details: 'Photoshop CC 2024 header detected in PNG EXIF. Font glyph substitution on DOB field.',
    riskScore: '0.88 HIGH',
    status: 'FLAGGED',
    evidence: {
      softwareTool: 'Adobe Photoshop CC 2024 (Windows)',
      elaScore: 0.88,
      tamperedField: 'Date of Birth (DOB) bounding box',
      detectedAt: '2026-08-22T07:35:10Z'
    },
    investigationNotes: []
  }],
  ['FRD-104', {
    id: 'FRD-104',
    type: 'MULTI_REG',
    title: 'Multiple Registrations on Same IMEI / IP',
    applicant: 'Vikram Mehta (USR-8825)',
    applicantId: 'USR-8825',
    details: '5 account registrations originated within 10 minutes from IP 185.220.101.4 (Tor Exit Node).',
    riskScore: '0.92 HIGH',
    status: 'HOLD',
    evidence: {
      ipAddress: '185.220.101.4 (Tor Exit Node Frankfurt)',
      registeredCount: 5,
      timeWindowMinutes: 10,
      detectedAt: '2026-08-22T06:50:30Z'
    },
    investigationNotes: []
  }],
  ['FRD-105', {
    id: 'FRD-105',
    type: 'HIGH_RISK',
    title: 'Failed Biometric Liveness & Synthetic Deepfake',
    applicant: 'Aarav Patel (USR-8826)',
    applicantId: 'USR-8826',
    details: 'Facial texture irregularity score 0.89. Liveness blink sequence failed 3D depth validation.',
    riskScore: '0.94 CRITICAL',
    status: 'ESCALATED',
    evidence: {
      deepfakeConfidence: 0.94,
      blinkPatternScore: 0.12,
      depthDisparity: 'Planar 2D Screen Playback Detected',
      detectedAt: '2026-08-22T06:15:00Z'
    },
    investigationNotes: []
  }]
]);

// 1. Get all fraud incidents
router.get('/fraud-cases', (req, res) => {
  const cases = Array.from(fraudCasesStore.values());
  res.json({
    success: true,
    count: cases.length,
    data: cases,
    metrics: {
      duplicateCollisions: 14,
      blacklistedUsers: cases.filter(c => c.status === 'BLOCKED').length,
      suspiciousPatterns: 8,
      multipleRegistrations: 12,
      highRiskApplications: 5
    }
  });
});

// 2. Block Identity
router.post('/fraud-cases/:incidentId/block-identity', (req, res) => {
  const { incidentId } = req.params;
  const { officerName, blockReason, revocationOptions } = req.body || {};

  const fraudCase = fraudCasesStore.get(incidentId);
  if (!fraudCase) {
    return res.status(404).json({ success: false, error: 'Fraud incident not found' });
  }

  fraudCase.status = 'BLOCKED';
  fraudCase.blockedAt = new Date().toISOString();
  fraudCase.blockedBy = officerName || 'Alex Vance (KYC Ops Manager)';
  fraudCase.blockReason = blockReason || 'AML / Fraud Security Violation';
  fraudCase.revocationOptions = revocationOptions || ['REVOKE_TOKENS', 'FREEZE_WALLETS', 'BLACKLIST_PAN_HASH'];
  fraudCase.investigationNotes.push(
    `[${new Date().toISOString()}] ENFORCED PERMANENT AML IDENTITY BLOCK by ${fraudCase.blockedBy}. Reason: ${fraudCase.blockReason}`
  );

  AuditService.logAction({
    actor: fraudCase.blockedBy,
    action: 'FRAUD_IDENTITY_PERMANENT_BLOCK',
    userId: fraudCase.applicantId || fraudCase.applicant,
    inputPayload: { incidentId, blockReason, revocationOptions },
    outputResult: fraudCase,
    decisionReasoning: `Enforced permanent blacklist on ${fraudCase.applicant} for incident #${incidentId}. Reason: ${fraudCase.blockReason}`,
    validationPassed: true
  });

  res.json({
    success: true,
    message: `Enforced permanent identity blacklist on ${fraudCase.applicant}.`,
    data: fraudCase
  });
});

// 3. Audit Case & Add Legal Notes
router.post('/fraud-cases/:incidentId/audit-case', (req, res) => {
  const { incidentId } = req.params;
  const { officerName, statusUpdate, auditNotes, legalEscalation } = req.body || {};

  const fraudCase = fraudCasesStore.get(incidentId);
  if (!fraudCase) {
    return res.status(404).json({ success: false, error: 'Fraud incident not found' });
  }

  if (statusUpdate) {
    fraudCase.status = statusUpdate;
  }
  fraudCase.lastAuditedAt = new Date().toISOString();
  fraudCase.lastAuditedBy = officerName || 'Alex Vance (KYC Ops Manager)';
  if (legalEscalation) {
    fraudCase.legalEscalation = true;
  }
  if (auditNotes) {
    fraudCase.investigationNotes.push(`[${new Date().toISOString()}] AUDIT NOTE (${fraudCase.lastAuditedBy}): ${auditNotes}`);
  }

  AuditService.logAction({
    actor: fraudCase.lastAuditedBy,
    action: 'FRAUD_CASE_FORENSIC_AUDIT',
    userId: fraudCase.applicantId || fraudCase.applicant,
    inputPayload: { incidentId, statusUpdate, auditNotes, legalEscalation },
    outputResult: fraudCase,
    decisionReasoning: `Logged forensic case audit for #${incidentId}. Status: ${fraudCase.status}. Notes: ${auditNotes}`,
    validationPassed: true
  });

  res.json({
    success: true,
    message: `Forensic case audit updated for #${incidentId}.`,
    data: fraudCase
  });
});

// 4. Resolve / Clear False Positive
router.post('/fraud-cases/:incidentId/resolve', (req, res) => {
  const { incidentId } = req.params;
  const { officerName, resolutionRationale } = req.body || {};

  const fraudCase = fraudCasesStore.get(incidentId);
  if (!fraudCase) {
    return res.status(404).json({ success: false, error: 'Fraud incident not found' });
  }

  fraudCase.status = 'RESOLVED';
  fraudCase.resolvedAt = new Date().toISOString();
  fraudCase.resolvedBy = officerName || 'Alex Vance (KYC Ops Manager)';
  fraudCase.resolutionRationale = resolutionRationale || 'Document verified genuine upon forensic manual re-inspection.';
  fraudCase.investigationNotes.push(`[${new Date().toISOString()}] CASE RESOLVED / CLEARED: ${fraudCase.resolutionRationale}`);

  AuditService.logAction({
    actor: fraudCase.resolvedBy,
    action: 'FRAUD_CASE_RESOLVED_CLEARED',
    userId: fraudCase.applicantId || fraudCase.applicant,
    inputPayload: { incidentId, resolutionRationale },
    outputResult: fraudCase,
    decisionReasoning: `Cleared fraud alert #${incidentId} as resolved. Rationale: ${fraudCase.resolutionRationale}`,
    validationPassed: true
  });

  res.json({
    success: true,
    message: `Fraud incident #${incidentId} has been resolved and cleared.`,
    data: fraudCase
  });
});

export const kycRoutes = router;
