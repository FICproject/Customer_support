import { HumanAIGovernanceMapping, Department } from '../../types';

export class HumanAIGovernanceService {
  /**
   * Returns complete mapping of Human Hierarchy roles to their governed AI Workforce teams
   */
  static getHumanAIGovernanceMappings(): HumanAIGovernanceMapping[] {
    return [
      {
        humanRole: 'SUPPORT_ADMIN',
        roleTitle: 'Support Administrator',
        governsAITeam: 'Entire Enterprise AI Workforce (Layer 1, Layer 2, Layer 3)',
        governanceResponsibility: 'Full system platform control, model selection, tool security policy creation, worker activation/deactivation',
        escalationTargetQueue: 'queue.escalation.support_admin',
        auditAuthorityLevel: 'UNLIMITED'
      },
      {
        humanRole: 'ADMIN',
        roleTitle: 'Operational Admin',
        governsAITeam: 'Cross-Department Operational AI Agents & Workflow Engines',
        governanceResponsibility: 'Operational configuration, prompt release management, cross-department RAG knowledge oversight, escalation review',
        escalationTargetQueue: 'queue.escalation.admin',
        auditAuthorityLevel: 'ORGANIZATION_OPERATIONAL'
      },
      {
        humanRole: 'QUERY_TL',
        roleTitle: 'Query Team Lead',
        governsAITeam: 'Query AI Department (Query AI, Calling AI, WhatsApp AI, Email AI)',
        governanceResponsibility: 'Query RAG knowledge base updates, Query prompt tuning, Query AI accuracy audits, Query escalation resolutions',
        escalationTargetQueue: 'queue.escalation.query_tl',
        auditAuthorityLevel: 'DEPARTMENT_STRICT'
      },
      {
        humanRole: 'KYC_TL',
        roleTitle: 'KYC Team Lead',
        governsAITeam: 'KYC AI Department (KYC AI, Document Verification AI, Identity AI)',
        governanceResponsibility: 'KYC document policy updates, unreadable document review, KYC rejection appeals, vendor onboarding sign-offs',
        escalationTargetQueue: 'queue.escalation.kyc_tl',
        auditAuthorityLevel: 'DEPARTMENT_STRICT'
      },
      {
        humanRole: 'PAYMENT_TL',
        roleTitle: 'Payment Team Lead',
        governsAITeam: 'Payment AI Department (Payment AI, Refund AI, Wallet Credit AI)',
        governanceResponsibility: 'High-risk refund tool approval (`HUMAN_APPROVAL` level), payment failure review, commission credit disputes',
        escalationTargetQueue: 'queue.escalation.payment_tl',
        auditAuthorityLevel: 'DEPARTMENT_STRICT'
      }
    ];
  }

  /**
   * Routes an AI worker escalation to the exact governing human Team Lead
   */
  static routeEscalationToHumanGoverningRole(department: Department): { assignedRole: string; targetQueue: string } {
    switch (department) {
      case Department.QUERY:
        return { assignedRole: 'QUERY_TL', targetQueue: 'queue.escalation.query_tl' };
      case Department.KYC:
        return { assignedRole: 'KYC_TL', targetQueue: 'queue.escalation.kyc_tl' };
      case Department.PAYMENT:
        return { assignedRole: 'PAYMENT_TL', targetQueue: 'queue.escalation.payment_tl' };
      default:
        return { assignedRole: 'ADMIN', targetQueue: 'queue.escalation.admin' };
    }
  }
}
