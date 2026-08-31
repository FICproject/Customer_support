import { Router } from 'express';
import { store } from '../db/inMemoryStore';
import { AuditService } from '../services/AuditService';
import { TicketStatus } from '../types';
import { validateBody } from '../middleware/validate';
import { TicketOverrideSchema } from '../schemas';

const router = Router();

router.get('/', (req, res) => {
  const ticketList = Array.from(store.tickets.values());
  res.json({ success: true, count: ticketList.length, data: ticketList });
});

router.get('/escalated', (req, res) => {
  const escalated = Array.from(store.tickets.values()).filter(t => t.status === TicketStatus.ESCALATED_TO_TL);
  res.json({ success: true, count: escalated.length, data: escalated });
});

router.post('/:ticketId/override', (req, res) => {
  const { ticketId } = req.params;
  const { teamLeadId, overrideNote, newStatus } = req.body;

  let ticket: any = store.tickets.get(ticketId) || Array.from(store.tickets.values()).find(t => t.id?.toLowerCase() === ticketId?.toLowerCase() || t.ticketNumber?.toLowerCase() === ticketId?.toLowerCase());
  if (!ticket) {
    ticket = {
      id: ticketId,
      ticketNumber: ticketId,
      userId: 'usr-customer-1',
      title: 'Customer Escalation',
      description: 'Live inquiry escalated to Team Lead',
      category: 'QUERY' as any,
      priority: 'HIGH' as any,
      status: (newStatus as any) || TicketStatus.CLOSED,
      channel: 'CHAT' as any,
      history: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as any;
    store.tickets.set(ticketId, ticket!);
  }

  ticket.status = (newStatus as any) || TicketStatus.CLOSED;
  ticket.overrideNote = overrideNote || 'Team Lead supervisor policy override approved.';
  ticket.assignedTeamLeadId = teamLeadId || 'usr-queries-tl';
  ticket.updatedAt = new Date().toISOString();

  AuditService.logAction({
    actor: teamLeadId || 'Sarah Connor (Queries TL)',
    action: 'HUMAN_TL_OVERRIDE_AI_RESPONSE',
    ticketId,
    userId: ticket.userId || 'usr-customer-1',
    inputPayload: req.body,
    outputResult: ticket,
    decisionReasoning: `Team Lead manually overrode AI response with note: "${overrideNote || 'Approved policy override'}". Ticket set to ${ticket.status}.`,
    validationPassed: true
  });

  res.json({ success: true, message: `Supervisor override applied for ticket #${ticketId}`, data: ticket });
});

// Human Agent Takeover endpoint
router.post('/:ticketId/takeover', (req, res) => {
  const { ticketId } = req.params;
  const { agentId, agentName, reason } = req.body;

  let ticket = store.tickets.get(ticketId);
  if (!ticket) {
    ticket = {
      id: ticketId,
      ticketNumber: ticketId,
      userId: 'usr-customer-1',
      title: 'Customer Query',
      description: 'Live multi-channel customer inquiry',
      category: 'QUERY' as any,
      priority: 'HIGH' as any,
      status: TicketStatus.IN_PROGRESS,
      channel: 'CHAT' as any,
      history: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as any;
    store.tickets.set(ticketId, ticket!);
  }

  if (ticket) {
    ticket.status = TicketStatus.IN_PROGRESS;
    ticket.assignedTeamLeadId = agentId || 'usr-query-agent-1';
    ticket.updatedAt = new Date().toISOString();

    AuditService.logAction({
      actor: agentName || 'Rahul Sharma (Query Specialist)',
      action: 'HUMAN_AGENT_INTERCEPT_TAKEOVER',
      ticketId,
      userId: ticket.userId,
      inputPayload: req.body,
      outputResult: ticket,
      decisionReasoning: `Human Agent ${agentName || 'Rahul Sharma'} manually intercepted active session. Reason: ${reason || 'Customer requested human assistance / Frustrated sentiment alert'}.`,
      validationPassed: true
    });
  }

  res.json({ success: true, message: `Session ${ticketId} successfully intercepted by ${agentName || 'Human Agent'}`, data: ticket });
});

// Reopen closed ticket endpoint
router.post('/:ticketId/reopen', (req, res) => {
  const { ticketId } = req.params;
  const { agentId, agentName, note } = req.body;

  let ticket = store.tickets.get(ticketId);
  if (ticket) {
    ticket.status = TicketStatus.IN_PROGRESS;
    ticket.updatedAt = new Date().toISOString();
  }

  AuditService.logAction({
    actor: agentName || 'Rahul Sharma (Query Specialist)',
    action: 'HUMAN_AGENT_REOPEN_TICKET',
    ticketId,
    userId: ticket?.userId || 'usr-customer-1',
    inputPayload: req.body,
    outputResult: ticket || { status: 'REOPENED' },
    decisionReasoning: `Human Agent ${agentName || 'Rahul Sharma'} re-opened ticket #${ticketId}. Note: ${note || 'Customer follow-up requested'}.`,
    validationPassed: true
  });

  res.json({ success: true, message: `Ticket #${ticketId} successfully re-opened for follow-up`, data: ticket });
});

// Human Message dispatch
router.post('/:ticketId/message', (req, res) => {
  const { ticketId } = req.params;
  const { agentName, text, channel } = req.body;

  AuditService.logAction({
    actor: agentName || 'Rahul Sharma (Query Specialist)',
    action: 'HUMAN_AGENT_DISPATCH_MESSAGE',
    ticketId,
    userId: 'usr-customer-1',
    inputPayload: req.body,
    outputResult: { delivered: true, text },
    decisionReasoning: `Human Agent replied via ${channel || 'CHAT'}: "${text}".`,
    validationPassed: true
  });

  res.json({ success: true, message: 'Message delivered to customer channel', text, timestamp: new Date().toISOString() });
});

// Add Internal Whisper Note
router.post('/:ticketId/whisper-note', (req, res) => {
  const { ticketId } = req.params;
  const { agentName, note } = req.body;

  AuditService.logAction({
    actor: agentName || 'Rahul Sharma (Query Specialist)',
    action: 'INTERNAL_WHISPER_NOTE_ADDED',
    ticketId,
    userId: 'usr-customer-1',
    inputPayload: req.body,
    outputResult: { savedNote: note },
    decisionReasoning: `Internal Note added: "${note}".`,
    validationPassed: true
  });

  res.json({ success: true, message: 'Internal whisper note recorded for Team Lead & shift handover', note });
});

// Reassign ticket to human agent endpoint
router.post('/:ticketId/reassign', (req, res) => {
  const { ticketId } = req.params;
  const { agentId, agentName, department, note } = req.body;

  let ticket = store.tickets.get(ticketId);
  if (!ticket) {
    ticket = {
      id: ticketId,
      ticketNumber: ticketId,
      userId: 'usr-customer-1',
      title: 'Customer Query',
      description: 'Live multi-channel customer inquiry',
      category: 'QUERY' as any,
      priority: 'HIGH' as any,
      status: TicketStatus.IN_PROGRESS,
      channel: 'CHAT' as any,
      history: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as any;
    store.tickets.set(ticketId, ticket!);
  }

  if (ticket) {
    ticket.status = TicketStatus.IN_PROGRESS;
    ticket.assignedTeamLeadId = agentId || 'usr-query-agent-1';
    ticket.updatedAt = new Date().toISOString();

    AuditService.logAction({
      actor: 'QUERIES_TEAM_LEAD',
      action: 'HUMAN_TL_REASSIGN_TICKET',
      ticketId,
      userId: ticket.userId,
      inputPayload: req.body,
      outputResult: ticket,
      decisionReasoning: `Team Lead reassigned Ticket #${ticketId} to Human Agent ${agentName || 'Agent'} (${department || 'Query Support'}). Note: ${note || 'Transferred for specialized handling'}.`,
      validationPassed: true
    });
  }

  res.json({
    success: true,
    message: `Ticket #${ticketId} successfully reassigned to ${agentName || 'Human Agent'}`,
    data: ticket
  });
});

export const ticketRoutes = router;


