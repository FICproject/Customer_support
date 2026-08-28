import { store } from '../db/inMemoryStore';
import { Department, TicketStatus, TicketPriority } from '../types';
import { AuditService } from './AuditService';
import { AIAgentType } from '../types';

export class SlaMonitoringService {
  private static intervalId: NodeJS.Timeout | null = null;

  public static startCron() {
    if (this.intervalId) return;

    // Check SLA targets every 15 seconds for responsive demo purposes (rather than 1 min)
    this.intervalId = setInterval(() => {
      this.checkSLAs();
    }, 15000);
    
    console.log('SLA Monitoring Service started: Checking tickets every 15 seconds.');
  }

  public static stopCron() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private static parseMinutes(slaStr: string): number {
    if (!slaStr) return 15;
    if (slaStr.toLowerCase().includes('instant')) return 0.5; // 30 seconds
    const match = slaStr.match(/\d+/);
    return match ? parseInt(match[0], 10) : 15;
  }

  private static getDeptIdFromEnum(dept: Department): string {
    switch (dept) {
      case Department.QUERY: return 'dept-1';
      case Department.KYC: return 'dept-2';
      case Department.PAYMENT: return 'dept-3';
      case Department.SYSTEM: return 'dept-4';
      default: return 'dept-1';
    }
  }

  public static checkSLAs() {
    const now = new Date();
    const tickets = Array.from(store.tickets.values());

    tickets.forEach(ticket => {
      // Only check unresolved tickets
      if (
        ticket.status === TicketStatus.AI_RESOLVED ||
        ticket.status === TicketStatus.CLOSED
      ) {
        return;
      }

      const deptId = this.getDeptIdFromEnum(ticket.department);
      const deptConfig = store.departments.get(deptId);
      if (!deptConfig) return;

      const createdTime = new Date(ticket.createdAt);
      const elapsedMs = now.getTime() - createdTime.getTime();
      const elapsedMinutes = elapsedMs / 60000;

      const resolutionLimitMinutes = this.parseMinutes(deptConfig.resolutionSLA);

      // Warning threshold check
      const warningMinutes = resolutionLimitMinutes * (deptConfig.warningThresholdPercent / 100);

      // 1. Check for Breach
      if (elapsedMinutes >= resolutionLimitMinutes && ticket.priority !== TicketPriority.CRITICAL) {
        if (deptConfig.autoEscalateOnBreach && ticket.status !== TicketStatus.ESCALATED_TO_TL) {
          // Escalate ticket
          ticket.status = TicketStatus.ESCALATED_TO_TL;
          ticket.priority = TicketPriority.CRITICAL;
          ticket.escalationReason = `SLA breached: Ticket unresolved after ${resolutionLimitMinutes} mins (Elapsed: ${Math.round(elapsedMinutes)} mins).`;
          ticket.assignedTeamLeadId = `usr-${deptConfig.code.toLowerCase().replace('dept-', '')}-tl`;
          ticket.updatedAt = now.toISOString();

          // Log Action
          AuditService.logAction({
            actor: 'SYSTEM_SLA_WORKER',
            agentType: AIAgentType.MONITORING,
            action: 'TICKET_SLA_BREACH_ESCALATED',
            inputPayload: { ticketId: ticket.id, elapsedMinutes, resolutionLimitMinutes },
            outputResult: { ticketId: ticket.id, status: ticket.status, priority: ticket.priority },
            decisionReasoning: `Auto-escalation enabled for ${deptConfig.name}. SLA target ${deptConfig.resolutionSLA} breached.`,
            validationPassed: true
          });
        }
      } 
      // 2. Check for Warning
      else if (elapsedMinutes >= warningMinutes && ticket.priority === TicketPriority.MEDIUM) {
        // Warn and increase priority
        ticket.priority = TicketPriority.HIGH;
        ticket.updatedAt = now.toISOString();

        AuditService.logAction({
          actor: 'SYSTEM_SLA_WORKER',
          agentType: AIAgentType.MONITORING,
          action: 'TICKET_SLA_WARNING',
          inputPayload: { ticketId: ticket.id, elapsedMinutes, warningMinutes },
          outputResult: { ticketId: ticket.id, priority: ticket.priority },
          decisionReasoning: `Warning threshold (${deptConfig.warningThresholdPercent}%) breached. Escalating priority to HIGH.`,
          validationPassed: true
        });
      }
    });
  }
}
