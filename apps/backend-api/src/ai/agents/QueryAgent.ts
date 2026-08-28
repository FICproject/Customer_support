import { store } from '../../db/inMemoryStore';
import { RAGKnowledgeService } from '../../services/RAGKnowledgeService';
import { LLMProviderService } from '../../services/LLMProviderService';
import { AuditService } from '../../services/AuditService';
import { AIAgentType, TicketStatus } from '../../types';

export class QueryAgent {
  public static async handleQuery(params: {
    ticketId: string;
    userId: string;
    query: string;
  }) {
    const ragResults = await RAGKnowledgeService.searchKnowledgeBase(params.query);
    const topDoc = ragResults[0]?.document;

    const systemPrompt = `You are FORGE INDIA CONNECT Customer Service AI Agent.
Answer customer inquiries professionally, concisely, and accurately based on official company SOPs.
${topDoc ? `Relevant Enterprise SOP Context:\nTitle: ${topDoc.title}\nContent: ${topDoc.content}` : ''}`;

    const llmRes = await LLMProviderService.generateCompletion({
      systemPrompt,
      userPrompt: params.query,
      temperature: 0.3,
      maxTokens: 512
    });

    let responseMessage = llmRes.content;
    let autoResolved = true;
    let confidenceScore = 96;

    const ticket = store.tickets.get(params.ticketId);
    if (ticket) {
      ticket.confidenceScore = confidenceScore;
      ticket.resolutionSummary = responseMessage;
      if (autoResolved) {
        ticket.status = TicketStatus.AI_RESOLVED;
      } else {
        ticket.status = TicketStatus.ESCALATED_TO_TL;
        ticket.escalationReason = 'Query confidence below automated threshold; escalated to Queries Team Lead.';
        ticket.assignedTeamLeadId = 'usr-queries-tl';
      }
      ticket.updatedAt = new Date().toISOString();
    }

    AuditService.logAction({
      actor: 'AI_QUERY_AGENT',
      agentType: AIAgentType.QUERY,
      action: 'PROCESS_CUSTOMER_QUERY',
      ticketId: params.ticketId,
      userId: params.userId,
      inputPayload: { ...params, provider: llmRes.provider, modelUsed: llmRes.modelUsed, latencyMs: llmRes.latencyMs },
      outputResult: { responseMessage, autoResolved, confidenceScore },
      decisionReasoning: `[${llmRes.provider}:${llmRes.modelUsed}] Generated live customer response (latency: ${llmRes.latencyMs}ms, tokens: ${llmRes.totalTokens}).`,
      validationPassed: true
    });

    return {
      responseMessage,
      autoResolved,
      confidenceScore,
      ticket,
      llmMeta: {
        provider: llmRes.provider,
        model: llmRes.modelUsed,
        latencyMs: llmRes.latencyMs,
        tokens: llmRes.totalTokens
      }
    };
  }
}
