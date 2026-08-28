import { store } from '../db/inMemoryStore';
import { AuditLogEntry, AIAgentType } from '../types';
import { SanitizerService } from './SanitizerService';
import { v4 as uuidv4 } from 'uuid';

export class AuditService {
  public static logAction(params: {
    actor: string;
    agentType?: AIAgentType;
    action: string;
    ticketId?: string;
    userId?: string;
    toolInvoked?: string;
    inputPayload: any;
    outputResult: any;
    decisionReasoning: string;
    validationPassed: boolean;
    isHuman?: boolean;
    reason?: string;
    relatedEntity?: string;
    beforeValue?: any;
    afterValue?: any;
  }): AuditLogEntry {
    const entry: AuditLogEntry = {
      id: `audit-${uuidv4()}`,
      timestamp: new Date().toISOString(),
      actor: SanitizerService.removeEmojis(params.actor),
      agentType: params.agentType,
      action: SanitizerService.removeEmojis(params.action),
      ticketId: params.ticketId,
      userId: params.userId,
      toolInvoked: params.toolInvoked,
      inputPayload: SanitizerService.sanitizePayload(params.inputPayload),
      outputResult: SanitizerService.sanitizePayload(params.outputResult),
      decisionReasoning: SanitizerService.removeEmojis(params.decisionReasoning),
      validationPassed: params.validationPassed,
      isHuman: params.isHuman,
      reason: params.reason ? SanitizerService.removeEmojis(params.reason) : undefined,
      relatedEntity: params.relatedEntity,
      beforeValue: SanitizerService.sanitizePayload(params.beforeValue),
      afterValue: SanitizerService.sanitizePayload(params.afterValue)
    };

    store.auditLogs.unshift(entry);
    if (store.auditLogs.length > 500) {
      store.auditLogs.pop();
    }

    return entry;
  }

  public static getLogs(limit: number = 50, filterAgent?: AIAgentType): AuditLogEntry[] {
    let logs = store.auditLogs;
    if (filterAgent) {
      logs = logs.filter(l => l.agentType === filterAgent);
    }
    return logs.slice(0, limit);
  }
}
