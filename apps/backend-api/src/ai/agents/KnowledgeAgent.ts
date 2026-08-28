import { RAGKnowledgeService } from '../../services/RAGKnowledgeService';
import { AuditService } from '../../services/AuditService';
import { AIAgentType } from '../../types';

export class KnowledgeAgent {
  public static async queryRAG(query: string, category?: string) {
    const results = await RAGKnowledgeService.searchKnowledgeBase(query, category);

    AuditService.logAction({
      actor: 'AI_KNOWLEDGE_AGENT',
      agentType: AIAgentType.KNOWLEDGE,
      action: 'SEARCH_RAG_KNOWLEDGE_BASE',
      inputPayload: { query, category },
      outputResult: { matchedCount: results.length, topMatchScore: results[0]?.relevanceScore || 0 },
      decisionReasoning: `Retrieved ${results.length} relevant knowledge documents from 1536-dim vector RAG index.`,
      validationPassed: true
    });

    return results;
  }
}
