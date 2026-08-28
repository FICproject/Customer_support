import { 
  AILiveOperationCard, 
  AIWorkerAvailability, 
  ActorType, 
  Department 
} from '../../types';

export class AILiveOperationsService {
  /**
   * Generates live operational task cards for all 25 registered AI workers
   */
  static getLiveWorkerCards(departmentFilter?: Department): AILiveOperationCard[] {
    const timestamp = new Date().toISOString();

    const masterCards: AILiveOperationCard[] = [
      {
        agentCode: 'KYC-AI-001',
        department: Department.KYC,
        status: AIWorkerAvailability.BUSY,
        activeTaskId: 'KYC-102938',
        userType: ActorType.VENDOR,
        currentStep: 'Document Verification',
        progressPercentage: 80,
        executedTools: ['Document OCR', 'Identity Verification', 'KYC Database'],
        nextStep: 'Business Verification',
        lastUpdatedTimestamp: timestamp
      },
      {
        agentCode: 'AI-PAY-COLLECT-001',
        department: Department.PAYMENT,
        status: AIWorkerAvailability.BUSY,
        activeTaskId: 'PAY-882190',
        userType: ActorType.AGENT,
        currentStep: 'Generating Fee Payment Link',
        progressPercentage: 45,
        executedTools: ['Payment Status Check', 'Payment Gateway Integration'],
        nextStep: 'Dispatch Payment Link via WhatsApp',
        lastUpdatedTimestamp: timestamp
      },
      {
        agentCode: 'AI-QUERY-001',
        department: Department.QUERY,
        status: AIWorkerAvailability.AVAILABLE,
        activeTaskId: 'CS-8812',
        userType: ActorType.CUSTOMER,
        currentStep: 'Idle - Ready for Request',
        progressPercentage: 100,
        executedTools: ['Order Lookup', 'RAG Retrieval'],
        nextStep: 'Awaiting User Query',
        lastUpdatedTimestamp: timestamp
      }
    ];

    if (departmentFilter) {
      return masterCards.filter(c => c.department === departmentFilter);
    }

    return masterCards;
  }
}
