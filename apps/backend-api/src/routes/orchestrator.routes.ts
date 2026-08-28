import { Router } from 'express';
import { AIOrchestrator } from '../ai/orchestrator/AIOrchestrator';
import { WorkflowEngine } from '../services/WorkflowEngine';
import { validateBody } from '../middleware/validate';
import { OrchestratorGatewaySchema } from '../schemas';

const router = Router();

// Gateway endpoint for incoming Voice & Chat requests (Validated with Zod)
router.post('/gateway', validateBody(OrchestratorGatewaySchema), async (req, res) => {
  try {
    const { userId, userName, userRole, channel, query } = req.body;
    const result = await AIOrchestrator.processIncomingRequest({
      userId,
      userName,
      userRole,
      channel: channel || 'CHAT_WEB',
      query: query || 'Inquiry regarding onboarding'
    });
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Trigger Business Workflows
router.post('/workflows/agent-registration', async (req, res) => {
  try {
    const result = await WorkflowEngine.executeAgentRegistrationWorkflow(req.body);
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/workflows/direct-vendor-registration', async (req, res) => {
  try {
    const result = await WorkflowEngine.executeDirectVendorRegistration(req.body);
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/workflows/agent-referral-vendor', async (req, res) => {
  try {
    const result = await WorkflowEngine.executeAgentReferralVendorWorkflow(req.body);
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export const orchestratorRoutes = router;
