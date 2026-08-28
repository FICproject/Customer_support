import { 
  AIAgentLifecycleState, 
  AICanaryDeploymentState, 
  AIQualityScoreBreakdown,
  AIWorkerAvailability 
} from '../../types';

export interface AIAgentVersionRecord {
  agentCode: string;
  version: string;
  lifecycleState: AIAgentLifecycleState;
  canaryState: AICanaryDeploymentState;
  trafficPercentage: number;
  promptVersion: string;
  ragKnowledgeVersion: string;
  qualityScore: AIQualityScoreBreakdown;
  updatedAt: string;
}

export class AIAgentLifecycleService {
  private static versionRegistry: Map<string, AIAgentVersionRecord[]> = new Map();

  /**
   * Registers a new agent version in the Lifecycle Registry
   */
  static createVersion(
    agentCode: string, 
    version: string, 
    promptVersion: string, 
    ragVersion: string
  ): AIAgentVersionRecord {
    const existing = this.versionRegistry.get(agentCode) || [];

    const newVersionRecord: AIAgentVersionRecord = {
      agentCode,
      version,
      lifecycleState: AIAgentLifecycleState.DRAFT,
      canaryState: AICanaryDeploymentState.CANARY_5_PERCENT,
      trafficPercentage: 0,
      promptVersion,
      ragKnowledgeVersion: ragVersion,
      qualityScore: {
        accuracyScore: 94.2,
        policyComplianceScore: 98.6,
        toolAccuracyScore: 96.1,
        ragGroundingScore: 93.5,
        escalationAccuracyScore: 99.0,
        hallucinationRate: 0.8,
        overallQualityScore: 95.8
      },
      updatedAt: new Date().toISOString()
    };

    existing.push(newVersionRecord);
    this.versionRegistry.set(agentCode, existing);
    return newVersionRecord;
  }

  /**
   * Advances canary traffic deployment (5% -> 25% -> 50% -> 100%)
   */
  static promoteCanary(agentCode: string, version: string): AIAgentVersionRecord {
    const versions = this.versionRegistry.get(agentCode) || [];
    const target = versions.find(v => v.version === version);

    if (!target) {
      throw new Error(`Version '${version}' for agent '${agentCode}' not found.`);
    }

    switch (target.canaryState) {
      case AICanaryDeploymentState.CANARY_5_PERCENT:
        target.canaryState = AICanaryDeploymentState.CANARY_25_PERCENT;
        target.trafficPercentage = 25;
        target.lifecycleState = AIAgentLifecycleState.STAGING;
        break;

      case AICanaryDeploymentState.CANARY_25_PERCENT:
        target.canaryState = AICanaryDeploymentState.CANARY_50_PERCENT;
        target.trafficPercentage = 50;
        target.lifecycleState = AIAgentLifecycleState.STAGING;
        break;

      case AICanaryDeploymentState.CANARY_50_PERCENT:
        target.canaryState = AICanaryDeploymentState.PRODUCTION_100_PERCENT;
        target.trafficPercentage = 100;
        target.lifecycleState = AIAgentLifecycleState.PRODUCTION;
        break;
    }

    target.updatedAt = new Date().toISOString();
    return target;
  }

  /**
   * One-Click Instant Rollback to previous stable version
   */
  static rollbackToVersion(agentCode: string, targetVersion: string): AIAgentVersionRecord {
    const versions = this.versionRegistry.get(agentCode) || [];
    
    // Demote current production versions
    versions.forEach(v => {
      if (v.version !== targetVersion && v.lifecycleState === AIAgentLifecycleState.PRODUCTION) {
        v.canaryState = AICanaryDeploymentState.ROLLED_BACK;
        v.trafficPercentage = 0;
        v.lifecycleState = AIAgentLifecycleState.PAUSED;
        v.updatedAt = new Date().toISOString();
      }
    });

    const target = versions.find(v => v.version === targetVersion);
    if (!target) {
      throw new Error(`Rollback target version '${targetVersion}' not found.`);
    }

    target.canaryState = AICanaryDeploymentState.PRODUCTION_100_PERCENT;
    target.trafficPercentage = 100;
    target.lifecycleState = AIAgentLifecycleState.PRODUCTION;
    target.updatedAt = new Date().toISOString();

    return target;
  }
}
