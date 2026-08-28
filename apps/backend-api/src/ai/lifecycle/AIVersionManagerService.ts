import { AIAgentVersionBundle, AIVersionStage } from '../../types';

export class AIVersionManagerService {
  private static versionRegistry: Map<string, AIAgentVersionBundle[]> = new Map();

  /**
   * Creates a new DRAFT AI Version Bundle containing Model, Prompt, RAG, Tools, Permissions, and Business Rules
   */
  static createDraftVersion(
    agentCode: string, 
    versionTag: string, 
    bundle: Omit<AIAgentVersionBundle, 'versionId' | 'agentCode' | 'versionTag' | 'stage' | 'createdAt'>
  ): AIAgentVersionBundle {
    const versionId = `VER-${agentCode}-${versionTag}`;
    const timestamp = new Date().toISOString();

    const fullBundle: AIAgentVersionBundle = {
      ...bundle,
      versionId,
      agentCode,
      versionTag,
      stage: AIVersionStage.DRAFT,
      createdAt: timestamp
    };

    const existing = this.versionRegistry.get(agentCode) || [];
    existing.push(fullBundle);
    this.versionRegistry.set(agentCode, existing);

    return fullBundle;
  }

  /**
   * Advances a version through the promotion pipeline: DRAFT -> TEST -> EVALUATE -> APPROVE -> PUBLISH -> MONITOR
   */
  static transitionStage(versionId: string, targetStage: AIVersionStage): AIAgentVersionBundle {
    for (const [agentCode, versions] of this.versionRegistry.entries()) {
      const target = versions.find(v => v.versionId === versionId);
      if (target) {
        target.stage = targetStage;
        if (targetStage === AIVersionStage.PUBLISH) {
          target.publishedAt = new Date().toISOString();
        }
        return target;
      }
    }
    throw new Error(`Version '${versionId}' not found in registry.`);
  }

  /**
   * Instant One-Click Rollback to previous stable version if an anomaly is detected
   */
  static rollbackVersion(agentCode: string, failedVersionId: string): AIAgentVersionBundle {
    const versions = this.versionRegistry.get(agentCode) || [];
    const failedVersion = versions.find(v => v.versionId === failedVersionId);

    if (!failedVersion) {
      throw new Error(`Failed version '${failedVersionId}' not found.`);
    }

    failedVersion.stage = AIVersionStage.ROLLED_BACK;
    failedVersion.rolledBackAt = new Date().toISOString();

    // Re-activate previous stable version
    const previousStable = versions.reverse().find(v => v.versionId !== failedVersionId && v.stage !== AIVersionStage.ROLLED_BACK);

    if (previousStable) {
      previousStable.stage = AIVersionStage.MONITOR;
      return previousStable;
    }

    throw new Error(`No fallback stable version found for agent '${agentCode}'.`);
  }

  /**
   * Seed demonstration version bundle matching KYC AI v2.0
   */
  static getSampleVersionBundle(): AIAgentVersionBundle {
    const timestamp = new Date().toISOString();

    return {
      versionId: 'VER-KYC-AI-001-v2.0',
      agentCode: 'KYC-AI-001',
      versionTag: 'v2.0',
      stage: AIVersionStage.MONITOR,
      modelConfig: { provider: 'anthropic', model: 'claude-3-5-sonnet', temperature: 0.1 },
      promptVersion: 'v2.0-kyc-ocr-prompt',
      ragConfig: { vectorNamespace: 'tenant:demo:kyc', topK: 5, hybridWeight: 0.7 },
      toolsAllowed: ['inspect_document', 'verify_identity', 'detect_blur', 'request_document_reupload'],
      permissions: { maxActionControlLevel: 'REQUEST_ONLY' },
      businessRules: ['KYC_POLICY_V3.2', 'OCR_BLUR_THRESHOLD_0.20'],
      evaluationResults: { accuracy: 98.4, passCount: 10, failCount: 0 },
      publishedAt: timestamp,
      createdAt: timestamp
    };
  }
}
