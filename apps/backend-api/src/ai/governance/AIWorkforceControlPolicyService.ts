import { AIWorkforceControlPermission, HumanRoleControlScope, Department } from '../../types';

export class AIWorkforceControlPolicyService {
  /**
   * Evaluates if a human user role has permission to execute an action on a target department/agent
   */
  static evaluateControlPermission(
    userRole: 'SUPPORT_ADMIN' | 'SUPER_ADMIN' | 'ADMIN' | 'QUERY_TL' | 'KYC_TL' | 'PAYMENT_TL',
    permission: AIWorkforceControlPermission,
    targetDepartment?: Department
  ): { granted: boolean; rationale: string } {
    // 1. Support Admin has unrestricted full control
    if (userRole === 'SUPPORT_ADMIN' || userRole === 'SUPER_ADMIN') {
      return { granted: true, rationale: 'SUPPORT_ADMIN granted unrestricted full platform control.' };
    }

    // 2. Admin has operational control, but system-level changes (Models, Permissions, Tools, Agent Creation/Deletion) are restricted
    if (userRole === 'ADMIN') {
      const supportAdminOnly: AIWorkforceControlPermission[] = [
        AIWorkforceControlPermission.CREATE_DELETE_AGENT,
        AIWorkforceControlPermission.CHANGE_MODEL_CONFIG,
        AIWorkforceControlPermission.CHANGE_PERMISSIONS,
        AIWorkforceControlPermission.CHANGE_TOOLS,
        AIWorkforceControlPermission.ACTIVATE_DEACTIVATE_AI
      ];

      if (supportAdminOnly.includes(permission)) {
        return { 
          granted: false, 
          rationale: `Permission '${permission}' requires SUPPORT_ADMIN role per security policy.` 
        };
      }

      return { granted: true, rationale: 'ADMIN granted operational control.' };
    }

    // 3. Department Team Leads (Query TL, KYC TL, Payment TL) are strictly scoped to their assigned department
    const deptMap: Record<string, Department> = {
      'QUERY_TL': Department.QUERY,
      'KYC_TL': Department.KYC,
      'PAYMENT_TL': Department.PAYMENT
    };

    const expectedDept = deptMap[userRole];

    if (!expectedDept) {
      return { granted: false, rationale: `Unknown human role '${userRole}'.` };
    }

    if (targetDepartment && targetDepartment !== expectedDept) {
      return { 
        granted: false, 
        rationale: `Human role '${userRole}' is restricted exclusively to Department '${expectedDept}', cannot access '${targetDepartment}'.` 
      };
    }

    // Department TL permitted actions
    const allowedDeptPermissions: AIWorkforceControlPermission[] = [
      AIWorkforceControlPermission.CHANGE_RAG_KNOWLEDGE,
      AIWorkforceControlPermission.REVIEW_DECISIONS,
      AIWorkforceControlPermission.HANDLE_ESCALATIONS,
      AIWorkforceControlPermission.VIEW_REPORTS
    ];

    if (!allowedDeptPermissions.includes(permission)) {
      return { 
        granted: false, 
        rationale: `Human role '${userRole}' is not authorized for control permission '${permission}'.` 
      };
    }

    return { granted: true, rationale: `Human role '${userRole}' authorized within Department '${expectedDept}'.` };
  }

  /**
   * Returns human control scope definitions for UI role selector
   */
  static getRoleControlMatrix(): HumanRoleControlScope[] {
    return [
      {
        role: 'SUPPORT_ADMIN',
        allowedPermissions: Object.values(AIWorkforceControlPermission)
      },
      {
        role: 'ADMIN',
        allowedPermissions: [
          AIWorkforceControlPermission.CHANGE_PROMPTS,
          AIWorkforceControlPermission.CHANGE_WORKFLOWS,
          AIWorkforceControlPermission.CHANGE_RAG_KNOWLEDGE,
          AIWorkforceControlPermission.CHANGE_BUSINESS_RULES,
          AIWorkforceControlPermission.REVIEW_DECISIONS,
          AIWorkforceControlPermission.HANDLE_ESCALATIONS,
          AIWorkforceControlPermission.VIEW_REPORTS
        ]
      },
      {
        role: 'QUERY_TL',
        departmentScope: Department.QUERY,
        allowedPermissions: [
          AIWorkforceControlPermission.CHANGE_RAG_KNOWLEDGE,
          AIWorkforceControlPermission.REVIEW_DECISIONS,
          AIWorkforceControlPermission.HANDLE_ESCALATIONS,
          AIWorkforceControlPermission.VIEW_REPORTS
        ]
      },
      {
        role: 'KYC_TL',
        departmentScope: Department.KYC,
        allowedPermissions: [
          AIWorkforceControlPermission.CHANGE_RAG_KNOWLEDGE,
          AIWorkforceControlPermission.REVIEW_DECISIONS,
          AIWorkforceControlPermission.HANDLE_ESCALATIONS,
          AIWorkforceControlPermission.VIEW_REPORTS
        ]
      },
      {
        role: 'PAYMENT_TL',
        departmentScope: Department.PAYMENT,
        allowedPermissions: [
          AIWorkforceControlPermission.CHANGE_RAG_KNOWLEDGE,
          AIWorkforceControlPermission.REVIEW_DECISIONS,
          AIWorkforceControlPermission.HANDLE_ESCALATIONS,
          AIWorkforceControlPermission.VIEW_REPORTS
        ]
      }
    ];
  }
}
