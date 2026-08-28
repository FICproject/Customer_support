import { 
  WorkflowType, 
  WorkflowState, 
  WorkflowPriority,
  WorkflowInstance, 
  Department, 
  RequesterType, 
  AIHandoffPackage
} from '../types';

export interface WorkflowTransitionResult {
  instance: WorkflowInstance;
  previousState: WorkflowState;
  currentState: WorkflowState;
  assignedAgentCode: string;
  nextStepDescription: string;
  handoffPackage?: AIHandoffPackage;
}

export class WorkflowEngineService {
  private static instancesMap: Map<string, WorkflowInstance> = new Map();

  /**
   * Initiates a new A-Z Enterprise Workflow Instance
   */
  static startWorkflow(
    workflowType: WorkflowType,
    entityId: string,
    requesterId: string,
    requesterType: RequesterType,
    tenantId: string,
    metadata: Record<string, any> = {}
  ): WorkflowInstance {
    const instanceId = `wf-inst-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const instance: WorkflowInstance = {
      instanceId,
      workflowId: `wf-def-${workflowType.toLowerCase()}`,
      workflowType,
      version: '1.0.0',
      tenantId,
      entityId,
      requesterId,
      requesterType,
      department: Department.KYC, // Starts with KYC AI for registration
      currentAgentCode: 'AI-KYC-001',
      currentState: WorkflowState.PENDING,
      priority: WorkflowPriority.MEDIUM,
      retryCount: 0,
      maxRetries: 3,
      timeoutMs: 300000,
      context: { ...metadata, createdAt: new Date().toISOString() },
      history: [
        {
          previousState: WorkflowState.PENDING,
          newState: WorkflowState.PENDING,
          agentCode: 'AI-ORCH-001',
          action: 'WORKFLOW_INITIATED',
          timestamp: new Date().toISOString()
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.instancesMap.set(instanceId, instance);
    return instance;
  }

  /**
   * Advances the A-Z Workflow State Machine step-by-step
   */
  static async advanceWorkflow(instanceId: string, payload: Record<string, any> = {}): Promise<WorkflowTransitionResult> {
    const instance = this.instancesMap.get(instanceId);
    if (!instance) {
      throw new Error(`Workflow instance '${instanceId}' not found.`);
    }

    const previousState = instance.currentState;

    switch (instance.workflowType) {
      case WorkflowType.AGENT_REGISTRATION:
        return this.processAgentRegistrationWorkflow(instance, payload);

      case WorkflowType.DIRECT_VENDOR_REGISTRATION:
        return this.processVendorRegistrationWorkflow(instance, payload);

      case WorkflowType.REFERRAL_VENDOR_REGISTRATION:
        return this.processReferralVendorWorkflow(instance, payload);

      default:
        return this.processAgentRegistrationWorkflow(instance, payload);
    }
  }

  // =========================================================================
  // 1. AGENT REGISTRATION WORKFLOW:
  // Registration KYC AI Doc Verification KYC Decision Payment AI Payment Receipt Account Creation Credential/Activation
  // =========================================================================
  private static async processAgentRegistrationWorkflow(
    instance: WorkflowInstance,
    payload: Record<string, any>
  ): Promise<WorkflowTransitionResult> {
    const previousState = instance.currentState;

    if (previousState === WorkflowState.PENDING) {
      // Step 1: Transfer to KYC AI for Document Verification
      instance.currentState = WorkflowState.IN_PROGRESS;
      instance.department = Department.KYC;
      instance.currentAgentCode = 'AI-KYC-DOCVERIFY-001';
      instance.context.kycStatus = 'IN_VERIFICATION';

      this.recordHistory(instance, previousState, instance.currentState, 'AI-KYC-DOCVERIFY-001', 'KYC_DOC_VERIFICATION_STARTED');

      return {
        instance,
        previousState,
        currentState: instance.currentState,
        assignedAgentCode: instance.currentAgentCode,
        nextStepDescription: 'KYC AI is verifying uploaded Agent Aadhaar/PAN documents.'
      };
    }

    if (previousState === WorkflowState.IN_PROGRESS && instance.context.kycStatus === 'IN_VERIFICATION') {
      // Step 2: KYC Decision Pass KYC Move to Payment AI
      instance.context.kycStatus = 'APPROVED';
      instance.currentState = WorkflowState.WAITING_FOR_PAYMENT;
      instance.department = Department.PAYMENT;
      instance.currentAgentCode = 'AI-PAY-COLLECT-001';

      this.recordHistory(instance, previousState, instance.currentState, 'AI-PAY-COLLECT-001', 'KYC_APPROVED_PAYMENT_REQUESTED');

      return {
        instance,
        previousState,
        currentState: instance.currentState,
        assignedAgentCode: instance.currentAgentCode,
        nextStepDescription: 'KYC Approved! Payment AI is generating registration fee payment link.'
      };
    }

    if (previousState === WorkflowState.WAITING_FOR_PAYMENT) {
      // Step 3: Payment AI Payment Verification Receipt KYC AI Account Creation & Credential Activation
      instance.currentState = WorkflowState.COMPLETED;
      instance.department = Department.KYC;
      instance.currentAgentCode = 'AI-KYC-PROVISION-001';
      instance.context.paymentStatus = 'PAID';
      instance.context.credentialsDispatched = true;

      this.recordHistory(instance, previousState, instance.currentState, 'AI-KYC-PROVISION-001', 'AGENT_ACCOUNT_ACTIVATED_CREDENTIALS_DISPATCHED');

      return {
        instance,
        previousState,
        currentState: instance.currentState,
        assignedAgentCode: instance.currentAgentCode,
        nextStepDescription: 'Payment confirmed! Receipt generated, Agent account created, and activation credentials dispatched.'
      };
    }

    return {
      instance,
      previousState,
      currentState: instance.currentState,
      assignedAgentCode: instance.currentAgentCode,
      nextStepDescription: 'Agent Registration Workflow is in final state.'
    };
  }

  // =========================================================================
  // 2. VENDOR REGISTRATION WORKFLOW:
  // Registration KYC AI Doc Verification Business Verification Payment AI Payment Receipt Account Creation
  // =========================================================================
  private static async processVendorRegistrationWorkflow(
    instance: WorkflowInstance,
    payload: Record<string, any>
  ): Promise<WorkflowTransitionResult> {
    const previousState = instance.currentState;

    if (previousState === WorkflowState.PENDING) {
      instance.currentState = WorkflowState.IN_PROGRESS;
      instance.department = Department.KYC;
      instance.currentAgentCode = 'AI-KYC-VENDOR-001';
      instance.context.businessVerification = 'IN_PROGRESS';

      this.recordHistory(instance, previousState, instance.currentState, 'AI-KYC-VENDOR-001', 'VENDOR_BUSINESS_VERIFICATION_STARTED');

      return {
        instance,
        previousState,
        currentState: instance.currentState,
        assignedAgentCode: instance.currentAgentCode,
        nextStepDescription: 'KYC AI is verifying Vendor GSTIN, Store License & Identity.'
      };
    }

    if (previousState === WorkflowState.IN_PROGRESS) {
      instance.currentState = WorkflowState.WAITING_FOR_PAYMENT;
      instance.department = Department.PAYMENT;
      instance.currentAgentCode = 'AI-PAY-COLLECT-001';
      instance.context.kycStatus = 'APPROVED';

      this.recordHistory(instance, previousState, instance.currentState, 'AI-PAY-COLLECT-001', 'VENDOR_KYC_APPROVED_PAYMENT_PENDING');

      return {
        instance,
        previousState,
        currentState: instance.currentState,
        assignedAgentCode: instance.currentAgentCode,
        nextStepDescription: 'Vendor KYC & Business Verification approved! Payment AI pending store activation fee.'
      };
    }

    if (previousState === WorkflowState.WAITING_FOR_PAYMENT) {
      instance.currentState = WorkflowState.COMPLETED;
      instance.department = Department.KYC;
      instance.currentAgentCode = 'AI-KYC-VENDOR-001';
      instance.context.storeActive = true;

      this.recordHistory(instance, previousState, instance.currentState, 'AI-KYC-VENDOR-001', 'VENDOR_STORE_ACTIVATED');

      return {
        instance,
        previousState,
        currentState: instance.currentState,
        assignedAgentCode: instance.currentAgentCode,
        nextStepDescription: 'Vendor payment confirmed! Store activated and credentials issued.'
      };
    }

    return {
      instance,
      previousState,
      currentState: instance.currentState,
      assignedAgentCode: instance.currentAgentCode,
      nextStepDescription: 'Vendor Registration Workflow is complete.'
    };
  }

  // =========================================================================
  // 3. REFERRAL VENDOR WORKFLOW:
  // Vendor Registration Referral Detection Agent Identification KYC Payment Vendor Activation Commission Record
  // =========================================================================
  private static async processReferralVendorWorkflow(
    instance: WorkflowInstance,
    payload: Record<string, any>
  ): Promise<WorkflowTransitionResult> {
    const previousState = instance.currentState;

    if (previousState === WorkflowState.PENDING) {
      instance.currentState = WorkflowState.IN_PROGRESS;
      instance.department = Department.KYC;
      instance.currentAgentCode = 'AI-KYC-VENDOR-001';
      instance.context.referralAgentCode = payload.referralAgentCode || 'AGT-9910';
      instance.context.referralDetected = true;

      this.recordHistory(instance, previousState, instance.currentState, 'AI-KYC-VENDOR-001', 'REFERRAL_DETECTED_AGENT_IDENTIFIED');

      return {
        instance,
        previousState,
        currentState: instance.currentState,
        assignedAgentCode: instance.currentAgentCode,
        nextStepDescription: `Referral code detected! Linked to Agent '${instance.context.referralAgentCode}'. KYC AI processing documents.`
      };
    }

    if (previousState === WorkflowState.IN_PROGRESS) {
      instance.currentState = WorkflowState.WAITING_FOR_PAYMENT;
      instance.department = Department.PAYMENT;
      instance.currentAgentCode = 'AI-PAY-COMMISSION-001';

      this.recordHistory(instance, previousState, instance.currentState, 'AI-PAY-COMMISSION-001', 'VENDOR_PAYMENT_COMMISSION_RECORDED');

      return {
        instance,
        previousState,
        currentState: instance.currentState,
        assignedAgentCode: instance.currentAgentCode,
        nextStepDescription: 'Vendor KYC verified! Payment AI processing store fee & calculating agent referral commission.'
      };
    }

    if (previousState === WorkflowState.WAITING_FOR_PAYMENT) {
      instance.currentState = WorkflowState.COMPLETED;
      instance.context.vendorActivated = true;
      instance.context.commissionCredited = true;
      instance.context.commissionAmountUSD = 50.0;

      this.recordHistory(instance, previousState, instance.currentState, 'AI-PAY-COMMISSION-001', 'VENDOR_ACTIVATED_COMMISSION_RECORDED');

      return {
        instance,
        previousState,
        currentState: instance.currentState,
        assignedAgentCode: instance.currentAgentCode,
        nextStepDescription: `Vendor activated! Commission of $50.00 successfully recorded to Agent '${instance.context.referralAgentCode}' wallet.`
      };
    }

    return {
      instance,
      previousState,
      currentState: instance.currentState,
      assignedAgentCode: instance.currentAgentCode,
      nextStepDescription: 'Referral Vendor Workflow is complete.'
    };
  }

  private static recordHistory(
    instance: WorkflowInstance,
    previousState: WorkflowState,
    newState: WorkflowState,
    agentCode: string,
    action: string
  ): void {
    instance.history.push({
      previousState,
      newState,
      agentCode,
      action,
      timestamp: new Date().toISOString()
    });
    instance.updatedAt = new Date().toISOString();
  }
}
