import { Router } from 'express';
import { store } from '../db/inMemoryStore';
import { AuditService } from '../services/AuditService';
import { StakeholderRequest } from '../types';

export const stakeholderRequestsRoutes = Router();

/**
 * GET /api/v1/stakeholder-requests
 * Query params: stakeholderType, category, status, search
 */
stakeholderRequestsRoutes.get('/', (req, res) => {
  try {
    const { stakeholderType, category, status, search } = req.query;

    let list = Array.from(store.stakeholderRequests.values());

    if (stakeholderType && stakeholderType !== 'ALL') {
      list = list.filter(r => r.stakeholderType === stakeholderType);
    }

    if (category && category !== 'ALL') {
      list = list.filter(r => r.category === category);
    }

    if (status && status !== 'ALL') {
      list = list.filter(r => r.status === status);
    }

    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      list = list.filter(r =>
        r.id.toLowerCase().includes(q) ||
        r.title.toLowerCase().includes(q) ||
        r.entityName.toLowerCase().includes(q) ||
        r.contactPerson.toLowerCase().includes(q) ||
        r.phone.includes(q) ||
        (r.utrNumber && r.utrNumber.toLowerCase().includes(q))
      );
    }

    res.json({
      success: true,
      count: list.length,
      data: list
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/v1/stakeholder-requests/stats/summary
 */
stakeholderRequestsRoutes.get('/stats/summary', (req, res) => {
  try {
    const list = Array.from(store.stakeholderRequests.values());
    const total = list.length;
    const newOnboarding = list.filter(r => r.category === 'NEW_ONBOARDING').length;
    const docIssues = list.filter(r => r.category === 'DOCUMENT_ISSUE').length;
    const paymentIssues = list.filter(r => r.category === 'PAYMENT_ISSUE').length;
    const queries = list.filter(r => r.category === 'QUERY').length;
    const pendingCritical = list.filter(r => r.priority === 'CRITICAL' && (r.status === 'PENDING_REVIEW' || r.status === 'PAYMENT_PENDING')).length;

    res.json({
      success: true,
      kpis: {
        total,
        newOnboarding,
        docIssues,
        paymentIssues,
        queries,
        pendingCritical
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/v1/stakeholder-requests/:id
 */
stakeholderRequestsRoutes.get('/:id', (req, res) => {
  const request = store.stakeholderRequests.get(req.params.id);
  if (!request) {
    return res.status(404).json({ success: false, error: 'Stakeholder request not found' });
  }
  res.json({ success: true, data: request });
});

/**
 * POST /api/v1/stakeholder-requests
 * Create new stakeholder request
 */
stakeholderRequestsRoutes.post('/', (req, res) => {
  try {
    const body = req.body;
    const id = body.id || `REQ-${body.stakeholderType?.slice(0, 3) || 'GEN'}-${Date.now().toString().slice(-4)}`;

    const newRequest: StakeholderRequest = {
      id,
      stakeholderType: body.stakeholderType || 'VENDOR',
      category: body.category || 'NEW_ONBOARDING',
      title: body.title || 'New Stakeholder Request',
      description: body.description || '',
      entityName: body.entityName || '',
      contactPerson: body.contactPerson || '',
      phone: body.phone || '',
      email: body.email || '',
      location: body.location || 'Chennai, Tamil Nadu',
      status: body.status || 'PENDING_REVIEW',
      priority: body.priority || 'HIGH',
      submittedAt: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      slaMinutesRemaining: body.slaMinutesRemaining || 60,
      amount: body.amount,
      utrNumber: body.utrNumber,
      documents: body.documents || [{ name: 'Initial_Application.pdf', type: 'PDF', status: 'PENDING' }],
      auditNotes: body.auditNotes || 'Logged manually by Support Admin.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    store.stakeholderRequests.set(id, newRequest);

    AuditService.logAction({
      action: 'STAKEHOLDER_REQUEST_CREATED',
      actor: 'SUPPORT_ADMIN',
      relatedEntity: id,
      decisionReasoning: `Support Admin created new ${newRequest.stakeholderType} request for ${newRequest.entityName}.`,
      inputPayload: body,
      outputResult: { id, status: newRequest.status },
      validationPassed: true,
      isHuman: true
    });

    res.status(201).json({ success: true, data: newRequest });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/v1/stakeholder-requests/:id/action
 * Body: { action: 'APPROVE' | 'REQUEST_REUPLOAD' | 'RESOLVE_PAYMENT' | 'REJECT' | 'ESCALATE', note, reuploadDocName, instructions, utrNumber, tlName }
 */
stakeholderRequestsRoutes.post('/:id/action', (req, res) => {
  try {
    const { id } = req.params;
    const { action, note, reuploadDocName, instructions, utrNumber, tlName } = req.body;

    const request = store.stakeholderRequests.get(id);
    if (!request) {
      return res.status(404).json({ success: false, error: 'Stakeholder request not found' });
    }

    const timeString = new Date().toLocaleTimeString();

    switch (action) {
      case 'APPROVE':
        request.status = 'APPROVED';
        request.auditNotes = `${request.auditNotes} • [${timeString}] Approved and authorized by Support Admin. ${note || ''}`.trim();
        AuditService.logAction({
          action: 'STAKEHOLDER_REQUEST_APPROVED',
          actor: 'SUPPORT_ADMIN',
          relatedEntity: id,
          decisionReasoning: `Support Admin approved ${request.stakeholderType} request (${request.title}).`,
          inputPayload: { action, note },
          outputResult: { id, status: 'APPROVED' },
          validationPassed: true,
          isHuman: true
        });
        break;

      case 'REQUEST_REUPLOAD':
        request.status = 'REUPLOAD_REQUESTED';
        request.auditNotes = `${request.auditNotes} • [${timeString}] Support Admin requested re-upload: ${reuploadDocName || 'Document'} (${instructions || 'Clear copy needed'}). WhatsApp & SMS alert triggered.`.trim();
        AuditService.logAction({
          action: 'STAKEHOLDER_DOCUMENT_REUPLOAD_REQUESTED',
          actor: 'SUPPORT_ADMIN',
          relatedEntity: id,
          decisionReasoning: `Support Admin requested document re-upload from ${request.contactPerson} (${request.phone}).`,
          inputPayload: { action, reuploadDocName, instructions },
          outputResult: { id, status: 'REUPLOAD_REQUESTED', phone: request.phone },
          validationPassed: true,
          isHuman: true
        });
        break;

      case 'RESOLVE_PAYMENT':
        request.status = 'APPROVED';
        if (utrNumber) request.utrNumber = utrNumber;
        request.auditNotes = `${request.auditNotes} • [${timeString}] Payment reconciled and released by Support Admin. UTR Ref: ${request.utrNumber || 'MANUAL-REL-2026'}.`.trim();
        AuditService.logAction({
          action: 'STAKEHOLDER_PAYMENT_RESOLVED',
          actor: 'SUPPORT_ADMIN',
          relatedEntity: id,
          decisionReasoning: `Support Admin reconciled and released payout of ${request.amount || 'disputed sum'}.`,
          inputPayload: { action, utrNumber },
          outputResult: { id, status: 'APPROVED', utrNumber: request.utrNumber },
          validationPassed: true,
          isHuman: true
        });
        break;

      case 'REJECT':
        request.status = 'REJECTED';
        request.auditNotes = `${request.auditNotes} • [${timeString}] Rejected by Support Admin. Reason: ${note || 'Criteria not met.'}`.trim();
        AuditService.logAction({
          action: 'STAKEHOLDER_REQUEST_REJECTED',
          actor: 'SUPPORT_ADMIN',
          relatedEntity: id,
          decisionReasoning: `Support Admin rejected ${request.stakeholderType} request. Reason: ${note || 'None given'}`,
          inputPayload: { action, note },
          outputResult: { id, status: 'REJECTED' },
          validationPassed: true,
          isHuman: true
        });
        break;

      case 'ESCALATE':
        request.status = 'ESCALATED';
        request.assignedTL = tlName || 'Query Team Lead';
        request.auditNotes = `${request.auditNotes} • [${timeString}] Escalated by Support Admin to ${request.assignedTL}. ${note || ''}`.trim();
        AuditService.logAction({
          action: 'STAKEHOLDER_REQUEST_ESCALATED',
          actor: 'SUPPORT_ADMIN',
          relatedEntity: id,
          decisionReasoning: `Support Admin escalated request to ${request.assignedTL}.`,
          inputPayload: { action, tlName, note },
          outputResult: { id, status: 'ESCALATED', assignedTL: request.assignedTL },
          validationPassed: true,
          isHuman: true
        });
        break;

      default:
        return res.status(400).json({ success: false, error: `Invalid action '${action}'` });
    }

    request.updatedAt = new Date().toISOString();
    store.stakeholderRequests.set(id, request);

    res.json({ success: true, data: request, message: `Action ${action} successfully processed` });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});
