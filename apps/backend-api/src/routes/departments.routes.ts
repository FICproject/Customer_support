import { Router } from 'express';
import { store } from '../db/inMemoryStore';
import { AuditService } from '../services/AuditService';
import { AIAgentType } from '../types';

const router = Router();

// GET all departments
router.get('/', (req, res) => {
  try {
    const list = Array.from(store.departments.values());
    res.json({ success: true, data: list });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT adjust queue config
router.put('/:id/queue-config', (req, res) => {
  try {
    const { id } = req.params;
    const { queueStrategy, maxQueueCapacity } = req.body;
    
    const dept = store.departments.get(id);
    if (!dept) {
      return res.status(404).json({ success: false, error: 'Department not found' });
    }

    if (queueStrategy) dept.queueStrategy = queueStrategy;
    if (maxQueueCapacity !== undefined) dept.maxQueueCapacity = Number(maxQueueCapacity);

    // Audit log
    AuditService.logAction({
      actor: 'SUPER_ADMIN',
      agentType: AIAgentType.MONITORING,
      action: 'DEPT_QUEUE_CONFIG_UPDATED',
      inputPayload: { id, queueStrategy, maxQueueCapacity },
      outputResult: dept,
      decisionReasoning: 'Super admin manually adjusted department queue configurations.',
      validationPassed: true
    });

    res.json({ success: true, data: dept });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT adjust SLA config
router.put('/:id/sla-config', (req, res) => {
  try {
    const { id } = req.params;
    const { firstResponseSLA, resolutionSLA, warningThresholdPercent, autoEscalateOnBreach } = req.body;
    
    const dept = store.departments.get(id);
    if (!dept) {
      return res.status(404).json({ success: false, error: 'Department not found' });
    }

    if (firstResponseSLA !== undefined) dept.firstResponseSLA = firstResponseSLA;
    if (resolutionSLA !== undefined) dept.resolutionSLA = resolutionSLA;
    if (warningThresholdPercent !== undefined) dept.warningThresholdPercent = Number(warningThresholdPercent);
    if (autoEscalateOnBreach !== undefined) dept.autoEscalateOnBreach = Boolean(autoEscalateOnBreach);

    // Audit log
    AuditService.logAction({
      actor: 'SUPER_ADMIN',
      agentType: AIAgentType.MONITORING,
      action: 'DEPT_SLA_CONFIG_UPDATED',
      inputPayload: { id, firstResponseSLA, resolutionSLA, warningThresholdPercent, autoEscalateOnBreach },
      outputResult: dept,
      decisionReasoning: 'Super admin manually adjusted department SLA configurations.',
      validationPassed: true
    });

    res.json({ success: true, data: dept });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST Broadcast shift note to department human agents
router.post('/:id/broadcast-shift-note', (req, res) => {
  try {
    const { id } = req.params;
    const { note, priority = 'IMPORTANT', supervisor = 'Sarah Connor (Query TL)' } = req.body;
    
    AuditService.logAction({
      actor: supervisor,
      agentType: AIAgentType.MONITORING,
      action: 'TL_SHIFT_NOTE_BROADCAST',
      inputPayload: { departmentId: id, note, priority },
      outputResult: { status: 'DISPATCHED', recipientCount: 6, timestamp: new Date().toISOString() },
      decisionReasoning: `Team Lead broadcasted shift advisory note to all active ${id} human specialists.`,
      validationPassed: true
    });

    res.json({
      success: true,
      message: `Shift note successfully broadcasted to all active ${id} agents.`,
      data: { note, priority, supervisor, dispatchedAt: new Date().toISOString(), acknowledgedAgents: 6 }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST Auto-rebalance workload across department human agents
router.post('/:id/rebalance-queue', (req, res) => {
  try {
    const { id } = req.params;
    const { rebalancedBy = 'Sarah Connor (Query TL)' } = req.body;

    AuditService.logAction({
      actor: rebalancedBy,
      agentType: AIAgentType.ROUTER,
      action: 'HUMAN_WORKFORCE_REBALANCED',
      inputPayload: { departmentId: id },
      outputResult: { reallocatedTickets: 4, averageUtilization: '65%', balancedAgents: 6 },
      decisionReasoning: 'Team Lead executed automated AI-to-Human workload balancing algorithm.',
      validationPassed: true
    });

    res.json({
      success: true,
      message: `Workforce capacity rebalanced. 4 queue items reallocated evenly across 6 on-duty agents.`,
      data: {
        rebalancedAt: new Date().toISOString(),
        reallocatedTickets: 4,
        averageUtilization: '65%',
        agentStatus: 'OPTIMAL_LOAD'
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST Ping specific human agent with instant direct supervisor alert
router.post('/agents/:agentId/ping', (req, res) => {
  try {
    const { agentId } = req.params;
    const { message = 'Supervisor check-in on active case', supervisor = 'Sarah Connor (Query TL)' } = req.body;

    AuditService.logAction({
      actor: supervisor,
      agentType: AIAgentType.MONITORING,
      action: 'SUPERVISOR_AGENT_PING',
      inputPayload: { agentId, message },
      outputResult: { status: 'DELIVERED', agentId, pingTime: new Date().toISOString() },
      decisionReasoning: `Supervisor sent priority direct ping to agent ${agentId}.`,
      validationPassed: true
    });

    res.json({
      success: true,
      message: `Instant ping delivered to agent ${agentId}.`,
      data: { agentId, message, supervisor, sentAt: new Date().toISOString() }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET Inspect specific human agent live telemetry & shift desk
router.get('/agents/:agentId/inspect', (req, res) => {
  try {
    const { agentId } = req.params;
    
    res.json({
      success: true,
      data: {
        agentId,
        sessionActive: true,
        loginTime: '08:30 AM (Shift duration: 4h 45m)',
        activeCasesCount: 3,
        resolvedTodayCount: 9,
        avgHandleTime: '3.8m',
        shiftCsat: 4.95,
        recentActions: [
          { time: '13:10', action: 'Answered PSTN Voice Call for TCK-8822' },
          { time: '13:02', action: 'Resolved Fee Policy Query for TCK-8821' },
          { time: '12:45', action: 'Reviewed Vector RAG Knowledge Article on KYC Guidelines' }
        ],
        activeTickets: [
          { id: 'TCK-8822', customer: 'David Miller', channel: 'PSTN Voice', state: 'CALL_IN_PROGRESS', duration: '2m 10s' },
          { id: 'TCK-8832', customer: 'Marcus Brody', channel: 'Enterprise SLA', state: 'DRAFTING_PROPOSAL', duration: '1m 45s' }
        ]
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export const departmentsRoutes = router;
