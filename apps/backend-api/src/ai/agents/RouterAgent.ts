import { AIAgentType, Department, TicketPriority } from '../../types';
import { AuditService } from '../../services/AuditService';
import { LLMProviderService } from '../../services/LLMProviderService';

export class RouterAgent {
  public static async analyzeAndRoute(input: {
    query: string;
    channel: string;
    userId?: string;
  }) {
    const systemPrompt = `You are FORGE INDIA CONNECT AI Router Agent. Analyze the incoming customer support message and classify its intent into a structured JSON response.
Return valid JSON object:
{
  "department": "QUERY" | "KYC" | "PAYMENT",
  "targetAgent": "QUERY_AGENT" | "KYC_AGENT" | "PAYMENT_AGENT",
  "priority": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
  "intent": "string",
  "language": "ENGLISH" | "HINDI" | "SPANISH" | "OTHER",
  "confidenceScore": 95
}`;

    const llmRes = await LLMProviderService.generateCompletion({
      systemPrompt,
      userPrompt: `Customer Query: "${input.query}" (Channel: ${input.channel})`,
      jsonMode: true
    });

    let department = Department.QUERY;
    let targetAgent = AIAgentType.QUERY;
    let priority = TicketPriority.MEDIUM;
    let intent = 'GENERAL_INQUIRY';
    let language = 'ENGLISH';
    let confidenceScore = 95;

    try {
      const parsed = JSON.parse(llmRes.content);
      if (parsed.department && Object.values(Department).includes(parsed.department as Department)) {
        department = parsed.department as Department;
      }
      if (parsed.targetAgent && Object.values(AIAgentType).includes(parsed.targetAgent as AIAgentType)) {
        targetAgent = parsed.targetAgent as AIAgentType;
      }
      if (parsed.priority && Object.values(TicketPriority).includes(parsed.priority as TicketPriority)) {
        priority = parsed.priority as TicketPriority;
      }
      if (parsed.intent) intent = parsed.intent;
      if (parsed.language) language = parsed.language;
      if (typeof parsed.confidenceScore === 'number') confidenceScore = parsed.confidenceScore;
    } catch (e) {
      const text = input.query.toLowerCase();
      if (text.includes('kyc') || text.includes('pan') || text.includes('aadhaar') || text.includes('document')) {
        department = Department.KYC;
        targetAgent = AIAgentType.KYC;
        intent = 'KYC_VERIFICATION_ASSISTANCE';
        priority = TicketPriority.HIGH;
      } else if (text.includes('pay') || text.includes('refund') || text.includes('invoice') || text.includes('billing')) {
        department = Department.PAYMENT;
        targetAgent = AIAgentType.PAYMENT;
        intent = 'PAYMENT_BILLING';
      }
    }

    AuditService.logAction({
      actor: 'AI_ROUTER_AGENT',
      agentType: AIAgentType.ROUTER,
      action: 'ROUTE_TICKET_INTENT',
      userId: input.userId,
      inputPayload: { ...input, llmProvider: llmRes.provider, modelUsed: llmRes.modelUsed, latencyMs: llmRes.latencyMs },
      outputResult: { department, targetAgent, priority, intent, language, confidenceScore },
      decisionReasoning: `[${llmRes.provider}:${llmRes.modelUsed}] Classified intent "${intent}" (conf: ${confidenceScore}%) and routed to ${department}.`,
      validationPassed: true
    });

    return {
      department,
      targetAgent,
      priority,
      intent,
      language,
      confidenceScore,
      llmMeta: {
        provider: llmRes.provider,
        model: llmRes.modelUsed,
        latencyMs: llmRes.latencyMs,
        tokens: llmRes.totalTokens
      }
    };
  }
}
