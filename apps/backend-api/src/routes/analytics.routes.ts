import { Router } from 'express';
import { MonitoringAgent } from '../ai/agents/MonitoringAgent';
import { AuditService } from '../services/AuditService';
import { store } from '../db/inMemoryStore';
import { MongoClient } from '../db/mongoClient';
import { RedisClient } from '../db/redisClient';
import { AIEvaluationService } from '../services/AIEvaluationService';

const router = Router();

router.get('/kpis', (req, res) => {
  const metrics = MonitoringAgent.getSystemMetrics();
  const totalRevenue = Array.from(store.payments.values())
    .filter(p => p.status === 'SUCCESS')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalCommissions = store.commissions.reduce((sum, c) => sum + c.amount, 0);

  res.json({
    success: true,
    data: {
      ...metrics,
      revenueUSD: totalRevenue,
      commissionPayoutsUSD: totalCommissions,
      activeAIWorkers: store.agentStates.size,
      dbStatus: {
        mongo: MongoClient.getStatus(),
        redis: RedisClient.getStatus()
      }
    }
  });
});

router.get('/audit-logs', (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;
  const logs = AuditService.getLogs(limit);
  res.json({ success: true, count: logs.length, data: logs });
});

// CSV Report Generator Endpoint
router.get('/reports/csv', (req, res) => {
  const type = (req.query.type as string || 'commissions').toUpperCase();
  let csvRows: string[] = [];
  let filename = `enterprise-report-${type.toLowerCase()}-${Date.now()}.csv`;

  if (type === 'COMMISSIONS') {
    csvRows.push('Commission_ID,Agent_ID,Vendor_ID,Transaction_ID,Commission_Amount_USD,Status,Created_At');
    store.commissions.forEach(c => {
      csvRows.push(`"${c.id}","${c.agentId}","${c.vendorId}","${c.transactionId}",${c.amount},"${c.status}","${c.createdAt}"`);
    });
  } else if (type === 'KYC') {
    csvRows.push('KYC_Record_ID,User_ID,User_Role,Doc_Type,Blur_Score,Forgery_Risk_Score,Government_Verification,AI_Decision,Reasoning');
    Array.from(store.kycRecords.values()).forEach(k => {
      csvRows.push(`"${k.id}","${k.userId}","${k.userRole}","${k.documentType}",${(k.blurScore * 100).toFixed(1)}%,${(k.forgeryRiskScore * 100).toFixed(1)}%,"${k.governmentVerificationStatus}","${k.aiDecision}","${k.aiReasoning.replace(/"/g, '""')}"`);
    });
  } else {
    csvRows.push('Ticket_ID,Ticket_Number,User_Name,Role,Department,Priority,Status,Confidence_Score,Escalation_Reason');
    Array.from(store.tickets.values()).forEach(t => {
      csvRows.push(`"${t.id}","${t.ticketNumber}","${t.userName}","${t.userRole}","${t.department}","${t.priority}","${t.status}",${t.confidenceScore}%,"${(t.escalationReason || '').replace(/"/g, '""')}"`);
    });
  }

  const csvContent = csvRows.join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.status(200).send(csvContent);
});

// PDF / Formatted Text Report Download Endpoint
router.get('/reports/pdf', (req, res) => {
  const type = (req.query.type as string || 'commissions').toUpperCase();
  let filename = `enterprise-report-${type.toLowerCase()}-${Date.now()}.pdf`;

  let reportText = `=================================================================\n`;
  reportText += `ENTERPRISE AI WORKFORCE SAAS PLATFORM - OFFICIAL EXECUTIVE REPORT\n`;
  reportText += `Report Category: ${type}\n`;
  reportText += `Generated At: ${new Date().toISOString()}\n`;
  reportText += `=================================================================\n\n`;

  if (type === 'COMMISSIONS') {
    reportText += `SUMMARY OF AGENT REFERRAL COMMISSIONS:\n`;
    reportText += `-----------------------------------------------------------------\n`;
    store.commissions.forEach(c => {
      reportText += `• Payout ID: ${c.id} | Agent: ${c.agentId} | Vendor: ${c.vendorId} | Amount: $${c.amount} | Status: ${c.status}\n`;
    });
  } else if (type === 'KYC') {
    reportText += `SUMMARY OF KYC AUDIT & VERIFICATIONS:\n`;
    reportText += `-----------------------------------------------------------------\n`;
    Array.from(store.kycRecords.values()).forEach(k => {
      reportText += `• KYC ID: ${k.id} | Role: ${k.userRole} | Doc: ${k.documentType} | Decision: ${k.aiDecision} | Reason: ${k.aiReasoning}\n`;
    });
  } else {
    reportText += `SUMMARY OF SUPPORT TICKETS & SLA PERFORMANCE:\n`;
    reportText += `-----------------------------------------------------------------\n`;
    Array.from(store.tickets.values()).forEach(t => {
      reportText += `• Ticket: ${t.ticketNumber} | User: ${t.userName} | Dept: ${t.department} | Status: ${t.status} | Confidence: ${t.confidenceScore}%\n`;
    });
  }

  reportText += `\n=================================================================\n`;
  reportText += `END OF EXECUTIVE AUDIT REPORT - ENTERPRISE AI PLATFORM\n`;
  reportText += `=================================================================\n`;

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.status(200).send(reportText);
});

router.post('/run-evaluation', async (req, res) => {
  try {
    const report = await AIEvaluationService.runEvaluationSuite();
    res.json({ success: true, data: report });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/evaluation-history', (req, res) => {
  const history = AIEvaluationService.getEvaluationHistory();
  res.json({ success: true, count: history.length, data: history });
});

export const analyticsRoutes = router;
