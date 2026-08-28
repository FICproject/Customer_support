import { 
  AIActionControlLevel, 
  AIToolErrorCode, 
  AIToolResult,
  HumanEscalationTarget,
  Department
} from '../../types';
import { AIToolRegistry, ToolExecutionPayload } from './AIToolRegistry';

export interface SecurityEvaluationResult {
  isAuthorized: boolean;
  controlLevel: AIActionControlLevel;
  requiresHumanApproval: boolean;
  escalationPackage?: {
    escalationTarget: HumanEscalationTarget;
    department: Department;
    reason: string;
    ticketId?: string;
  };
  reason?: string;
}

export class AIToolSecurityGateway {
  /**
   * Evaluates Phase 10 Tool Security Gates before execution
   */
  static evaluateSecurityGate(payload: ToolExecutionPayload): SecurityEvaluationResult {
    const tool = AIToolRegistry.getTool(payload.toolName);

    if (!tool) {
      return {
        isAuthorized: false,
        controlLevel: AIActionControlLevel.PROHIBITED,
        requiresHumanApproval: false,
        reason: `Tool '${payload.toolName}' does not exist in registry.`
      };
    }

    // Gate 1: Check for Direct DB Mutation Attempts (AI -> MongoDB is strictly PROHIBITED)
    if (payload.toolName.startsWith('mongodb.') || payload.toolName.startsWith('db.raw')) {
      return {
        isAuthorized: false,
        controlLevel: AIActionControlLevel.PROHIBITED,
        requiresHumanApproval: false,
        reason: 'Direct AI -> MongoDB database mutations are strictly PROHIBITED by Enterprise Security Policy.'
      };
    }

    // Gate 2: Check Action Control Level
    if (tool.controlLevel === AIActionControlLevel.PROHIBITED) {
      return {
        isAuthorized: false,
        controlLevel: AIActionControlLevel.PROHIBITED,
        requiresHumanApproval: false,
        reason: `Action '${payload.toolName}' is marked PROHIBITED for AI Agents.`
      };
    }

    // Gate 3: Check for Human Approval Requirement (e.g. refundOrder("ORD123"))
    if (tool.controlLevel === AIActionControlLevel.HUMAN_APPROVAL) {
      return {
        isAuthorized: false, // AI cannot directly execute!
        controlLevel: AIActionControlLevel.HUMAN_APPROVAL,
        requiresHumanApproval: true,
        escalationPackage: {
          escalationTarget: HumanEscalationTarget.PAYMENT_TL,
          department: Department.PAYMENT,
          reason: `Action '${payload.toolName}' for Order '${payload.arguments.orderId}' requires explicit Human Payment TL approval.`,
          ticketId: payload.arguments.ticketId
        },
        reason: `Action '${payload.toolName}' requires Human TL approval. Created escalation request.`
      };
    }

    // Gate 4: Authorized for direct or post-validated execution
    return {
      isAuthorized: true,
      controlLevel: tool.controlLevel,
      requiresHumanApproval: false
    };
  }

  /**
   * Executes a tool via the 5 Tool Security Gates
   */
  static async executeSecurely(payload: ToolExecutionPayload): Promise<AIToolResult> {
    const securityCheck = this.evaluateSecurityGate(payload);

    if (!securityCheck.isAuthorized) {
      return {
        success: false,
        data: null,
        error: {
          errorCode: securityCheck.requiresHumanApproval ? AIToolErrorCode.AUTHORIZATION_ERROR : AIToolErrorCode.AUTHORIZATION_ERROR,
          message: securityCheck.reason || 'Tool execution unauthorized.',
          retryable: false,
          details: securityCheck.escalationPackage
        },
        metadata: {
          toolId: payload.toolName,
          toolVersion: '1.0.0',
          executionId: `sec-${Date.now()}`,
          durationMs: 5,
          tenantId: payload.tenantId
        }
      };
    }

    // Delegate to Registry execution
    return AIToolRegistry.executeTool(payload);
  }
}
