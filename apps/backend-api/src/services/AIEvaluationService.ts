import { RouterAgent } from '../ai/agents/RouterAgent';
import { RAGKnowledgeService } from './RAGKnowledgeService';
import { FraudDetectionAgent } from '../ai/agents/FraudDetectionAgent';
import { AuditService } from './AuditService';
import { AIAgentType, Department } from '../types';

export interface TestCaseResult {
  testId: string;
  category: 'INTENT_ROUTING' | 'RAG_RETRIEVAL' | 'FRAUD_DETECTION' | 'HALLUCINATION_CHECK';
  inputQuery: string;
  expectedOutcome: string;
  actualOutcome: string;
  passed: boolean;
  score: number; // 0 to 100
  latencyMs: number;
}

export interface EvaluationReport {
  reportId: string;
  timestamp: string;
  totalTests: number;
  passCount: number;
  failCount: number;
  overallAccuracyPercent: number;
  intentRoutingAccuracy: number;
  ragRetrievalPrecision: number;
  fraudDetectionRecall: number;
  averageLatencyMs: number;
  testResults: TestCaseResult[];
}

export class AIEvaluationService {
  private static evaluationHistory: EvaluationReport[] = [];

  public static async runEvaluationSuite(): Promise<EvaluationReport> {
    const testResults: TestCaseResult[] = [];

    // --- TEST 1: INTENT ROUTING BENCHMARKS ---
    const routingTests = [
      {
        query: 'I need to upload my PAN card for KYC verification',
        expectedDept: Department.KYC,
        expectedAgent: AIAgentType.KYC
      },
      {
        query: 'My payment of Rs 2500 failed via UPI refund request',
        expectedDept: Department.PAYMENT,
        expectedAgent: AIAgentType.PAYMENT
      },
      {
        query: 'What are the operating hours of technician onboarding support?',
        expectedDept: Department.QUERY,
        expectedAgent: AIAgentType.QUERY
      }
    ];

    for (let i = 0; i < routingTests.length; i++) {
      const t = routingTests[i];
      const tStart = Date.now();
      const routeRes = await RouterAgent.analyzeAndRoute({
        query: t.query,
        channel: 'WEB_EVAL_SUITE',
        userId: `eval-user-${i}`
      });
      const tLatency = Date.now() - tStart;

      const passed = routeRes.department === t.expectedDept && routeRes.targetAgent === t.expectedAgent;
      testResults.push({
        testId: `EVAL-ROUTE-00${i + 1}`,
        category: 'INTENT_ROUTING',
        inputQuery: t.query,
        expectedOutcome: `${t.expectedDept} -> ${t.expectedAgent}`,
        actualOutcome: `${routeRes.department} -> ${routeRes.targetAgent}`,
        passed,
        score: passed ? 100 : 0,
        latencyMs: tLatency
      });
    }

    // --- TEST 2: RAG VECTOR RETRIEVAL BENCHMARKS ---
    const ragTests = [
      { query: '14-day refund policy guarantee', minScore: 25 },
      { query: 'technician onboarding appointment', minScore: 25 }
    ];

    for (let i = 0; i < ragTests.length; i++) {
      const t = ragTests[i];
      const tStart = Date.now();
      const ragResults = await RAGKnowledgeService.searchKnowledgeBase(t.query);
      const tLatency = Date.now() - tStart;

      const topMatch = ragResults[0];
      const passed = topMatch && topMatch.relevanceScore >= t.minScore;
      testResults.push({
        testId: `EVAL-RAG-00${i + 1}`,
        category: 'RAG_RETRIEVAL',
        inputQuery: t.query,
        expectedOutcome: `Relevance Score >= ${t.minScore}%`,
        actualOutcome: topMatch ? `Relevance Score: ${topMatch.relevanceScore}% (Vector Sim: ${topMatch.vectorSimilarity})` : 'No Match Found',
        passed: Boolean(passed),
        score: topMatch ? topMatch.relevanceScore : 0,
        latencyMs: tLatency
      });
    }

    // --- TEST 3: FRAUD DETECTION BENCHMARKS ---
    const tStartFraud = Date.now();
    const fraudEval = FraudDetectionAgent.evaluateRisk({
      userId: 'usr-eval-fraud-tester',
      email: 'customer1@example.com',
      panNumber: 'ABCDE1234F',
      aadhaarNumber: '1234-5678-9012'
    });
    const fraudLatency = Date.now() - tStartFraud;
    const fraudPassed = fraudEval.isHighRisk || fraudEval.detectedFlags.length > 0;

    testResults.push({
      testId: 'EVAL-FRAUD-001',
      category: 'FRAUD_DETECTION',
      inputQuery: 'Duplicate PAN credentials fraud detection test',
      expectedOutcome: 'High Risk Alert (Duplicate PAN)',
      actualOutcome: `Risk Score: ${(fraudEval.riskScore * 100).toFixed(0)}% (${fraudEval.isHighRisk ? 'HIGH_RISK_BLOCK' : 'PASS'})`,
      passed: fraudPassed,
      score: Math.round(fraudEval.riskScore * 100),
      latencyMs: fraudLatency
    });

    // COMPUTE SUMMARY STATISTICS
    const passCount = testResults.filter(r => r.passed).length;
    const failCount = testResults.length - passCount;
    const totalLatency = testResults.reduce((sum, r) => sum + r.latencyMs, 0);
    const avgLatency = Math.round(totalLatency / testResults.length);

    const routingPasses = testResults.filter(r => r.category === 'INTENT_ROUTING' && r.passed).length;
    const routingTotal = testResults.filter(r => r.category === 'INTENT_ROUTING').length;
    const intentRoutingAccuracy = Math.round((routingPasses / Math.max(1, routingTotal)) * 100);

    const ragPasses = testResults.filter(r => r.category === 'RAG_RETRIEVAL' && r.passed).length;
    const ragTotal = testResults.filter(r => r.category === 'RAG_RETRIEVAL').length;
    const ragRetrievalPrecision = Math.round((ragPasses / Math.max(1, ragTotal)) * 100);

    const overallAccuracyPercent = Math.round((passCount / testResults.length) * 100);

    const report: EvaluationReport = {
      reportId: `EVAL-${Date.now()}`,
      timestamp: new Date().toISOString(),
      totalTests: testResults.length,
      passCount,
      failCount,
      overallAccuracyPercent,
      intentRoutingAccuracy,
      ragRetrievalPrecision,
      fraudDetectionRecall: fraudPassed ? 100 : 0,
      averageLatencyMs: avgLatency,
      testResults
    };

    this.evaluationHistory.unshift(report);

    AuditService.logAction({
      actor: 'AI_EVALUATION_SERVICE',
      agentType: AIAgentType.MONITORING,
      action: 'RUN_AI_BENCHMARK_EVALUATION_SUITE',
      inputPayload: { suiteName: 'ENTERPRISE_AI_CORE_BENCHMARK_V1' },
      outputResult: {
        reportId: report.reportId,
        overallAccuracyPercent,
        passCount,
        totalTests: testResults.length,
        averageLatencyMs: avgLatency
      },
      decisionReasoning: `Automated AI Evaluation Suite completed with ${overallAccuracyPercent}% accuracy score across ${testResults.length} benchmark tests.`,
      validationPassed: true
    });

    return report;
  }

  public static getEvaluationHistory(): EvaluationReport[] {
    return this.evaluationHistory;
  }
}
