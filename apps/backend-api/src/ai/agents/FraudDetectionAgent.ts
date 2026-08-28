import { store } from '../../db/inMemoryStore';
import { AuditService } from '../../services/AuditService';
import { AIAgentType } from '../../types';

export class FraudDetectionAgent {
  public static evaluateRisk(input: {
    userId: string;
    panNumber?: string;
    aadhaarNumber?: string;
    email?: string;
  }) {
    let riskScore = 0.05; // Base low risk
    const detectedFlags: string[] = [];

    // Check duplicate PAN
    if (input.panNumber) {
      const duplicatePan = Array.from(store.users.values()).filter(u => u.id !== input.userId && u.panNumber === input.panNumber);
      if (duplicatePan.length > 0) {
        riskScore += 0.50;
        detectedFlags.push(`Duplicate PAN detected across account ${duplicatePan[0].id}`);
      }
    }

    // Check duplicate Aadhaar
    if (input.aadhaarNumber) {
      const duplicateAadhaar = Array.from(store.users.values()).filter(u => u.id !== input.userId && u.aadhaarNumber === input.aadhaarNumber);
      if (duplicateAadhaar.length > 0) {
        riskScore += 0.45;
        detectedFlags.push(`Duplicate Aadhaar detected across account ${duplicateAadhaar[0].id}`);
      }
    }

    const isHighRisk = riskScore >= 0.40;

    AuditService.logAction({
      actor: 'AI_FRAUD_DETECTION_AGENT',
      agentType: AIAgentType.FRAUD_DETECTION,
      action: 'EVALUATE_FRAUD_RISK',
      userId: input.userId,
      inputPayload: input,
      outputResult: { riskScore, isHighRisk, detectedFlags },
      decisionReasoning: isHighRisk 
        ? `High risk score (${(riskScore * 100).toFixed(0)}%) flagged: ${detectedFlags.join('; ')}`
        : 'User risk score within safe parameters (<40%). Zero fraudulent activity found.',
      validationPassed: !isHighRisk
    });

    return {
      riskScore,
      isHighRisk,
      detectedFlags
    };
  }
}
