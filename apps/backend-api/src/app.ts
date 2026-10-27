import express from 'express';
import cors from 'cors';
import { authRoutes } from './routes/auth.routes';
import { orchestratorRoutes } from './routes/orchestrator.routes';
import { aiAgentRoutes } from './routes/aiAgents.routes';
import { ticketRoutes } from './routes/tickets.routes';
import { kycRoutes } from './routes/kyc.routes';
import { paymentRoutes } from './routes/payments.routes';
import { knowledgeRoutes } from './routes/knowledge.routes';
import { workflowRoutes } from './routes/workflows.routes';
import { analyticsRoutes } from './routes/analytics.routes';
import { telephonyRoutes } from './routes/telephony.routes';
import { departmentsRoutes } from './routes/departments.routes';
import { communicationRoutes } from './routes/communication.routes';
import { stakeholderRequestsRoutes } from './routes/stakeholderRequests.routes';
import { vendorsRoutes } from './routes/vendors.routes';
import { stakeholdersRoutes } from './routes/stakeholders.routes';
import { MonitoringAgent } from './ai/agents/MonitoringAgent';
import { AuditService } from './services/AuditService';
import { MongoClient } from './db/mongoClient';
import { RedisClient } from './db/redisClient';
import { SlaMonitoringService } from './services/SlaMonitoringService';
import { EnvSchema } from './schemas';

// ============================================================
// Startup: Validate Environment Configuration with Zod
// ============================================================
const envParseResult = EnvSchema.safeParse(process.env);
if (!envParseResult.success) {
  console.warn('[Config] Environment variables warning (using safe fallbacks):', envParseResult.error.format());
} else {
  console.log('[Config] Environment schema validated successfully.');
}

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Initialize Database Connections
MongoClient.connect().catch(console.error);
RedisClient.connect().catch(console.error);

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/orchestrator', orchestratorRoutes);
app.use('/api/v1/ai-agents', aiAgentRoutes);
app.use('/api/v1/tickets', ticketRoutes);
app.use('/api/v1/kyc', kycRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/knowledge', knowledgeRoutes);
app.use('/api/v1/workflows', workflowRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/telephony', telephonyRoutes);
app.use('/api/v1/departments', departmentsRoutes);
app.use('/api/v1/communication', communicationRoutes);
app.use('/api/v1/stakeholder-requests', stakeholderRequestsRoutes);
app.use('/api/v1/vendors', vendorsRoutes);
app.use('/api/v1/stakeholders', stakeholdersRoutes);

// Server-Sent Events (SSE) for Real-Time Dashboard Live Stream
app.get('/api/v1/live-stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const intervalId = setInterval(() => {
    const kpis = MonitoringAgent.getSystemMetrics();
    const recentLogs = AuditService.getLogs(5);
    res.write(`data: ${JSON.stringify({ kpis, recentLogs, timestamp: new Date().toISOString() })}\n\n`);
  }, 2000);

  req.on('close', () => {
    clearInterval(intervalId);
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'UP',
    service: 'AI Customer Support Backend API',
    mongo: MongoClient.getStatus(),
    redis: RedisClient.getStatus(),
    timestamp: new Date().toISOString()
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    SlaMonitoringService.startCron();
    console.log(`=======================================================`);
    console.log(`Enterprise AI Workforce Backend API running on port ${PORT}`);
    console.log(`Gateway Endpoint: http://localhost:${PORT}/api/v1/orchestrator/gateway`);
    console.log(`SSE Stream: http://localhost:${PORT}/api/v1/live-stream`);
    console.log(`=======================================================`);
  });
}

export default app;
