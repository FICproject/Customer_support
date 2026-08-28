import { AIDecisionLogRecord, Department } from '../../types';

export class AIDecisionLoggerService {
  private static decisionStore: AIDecisionLogRecord[] = [];

  /**
   * Logs an immutable AI decision record
   */
  static logDecision(record: Omit<AIDecisionLogRecord, 'decisionId' | 'timestamp'>): AIDecisionLogRecord {
    const decisionId = `DEC-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });

    const fullRecord: AIDecisionLogRecord = {
      ...record,
      decisionId,
      timestamp
    };

    this.decisionStore.push(fullRecord);
    return fullRecord;
  }

  /**
   * Queries decision records by Request ID or Tenant ID
   */
  static getDecisionsByRequestId(requestId: string, tenantId: string): AIDecisionLogRecord[] {
    return this.decisionStore.filter(d => d.requestId === requestId && d.tenantId === tenantId);
  }

  /**
   * Seed demonstration decision record matching user example
   */
  static getSampleDecision(): AIDecisionLogRecord {
    return {
      decisionId: 'DEC-10029',
      requestId: 'REQ-10029',
      tenantId: 'tenant-demo',
      agentCode: 'KYC-AI-001',
      department: Department.KYC,
      decision: 'REUPLOAD_REQUIRED',
      reason: 'Identity document unreadable (Blur Score 0.42 > Threshold 0.20)',
      evidence: 'Document Quality Service',
      knowledgeVersion: 'KYC Policy v3.2',
      toolsExecuted: ['Document Verification Tool'],
      timestamp: '10:42:13',
      result: 'Re-upload request generated'
    };
  }
}
