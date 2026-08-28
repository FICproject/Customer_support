const API_BASE = 'http://localhost:4000/api/v1';

export class ApiService {
  public static async getHealth() {
    const res = await fetch(`${API_BASE.replace('/api/v1', '')}/health`);
    return res.json();
  }

  public static async getKPIs() {
    const res = await fetch(`${API_BASE}/analytics/kpis`);
    return res.json();
  }

  public static async getAuditLogs(limit = 50) {
    const res = await fetch(`${API_BASE}/analytics/audit-logs?limit=${limit}`);
    return res.json();
  }

  public static async getAIAgents() {
    const res = await fetch(`${API_BASE}/ai-agents`);
    return res.json();
  }

  public static async getAgentLogs(agentType: string) {
    const res = await fetch(`${API_BASE}/ai-agents/${agentType}/logs`);
    return res.json();
  }

  public static async getTickets() {
    const res = await fetch(`${API_BASE}/tickets`);
    return res.json();
  }

  public static async overrideTicket(ticketId: string, payload: any) {
    const res = await fetch(`${API_BASE}/tickets/${ticketId}/override`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  }

  public static async reassignTicket(ticketId: string, payload: any) {
    const res = await fetch(`${API_BASE}/tickets/${ticketId}/reassign`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  }

  public static async takeoverTicket(ticketId: string, payload: any) {
    const res = await fetch(`${API_BASE}/tickets/${ticketId}/takeover`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  }

  public static async getKYCRecords() {
    const res = await fetch(`${API_BASE}/kyc`);
    return res.json();
  }

  public static async submitKYCDocument(payload: { customerId: string; documentType: string; imagePayloadBase64?: string; ocrRawText?: string }) {
    const res = await fetch(`${API_BASE}/kyc/pipeline`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  }

  public static async overrideKYC(kycId: string, payload: any) {
    const res = await fetch(`${API_BASE}/kyc/${kycId}/manual-override`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  }

  public static async forwardKYCToOfficer(kycId: string, payload: { officerName: string; forwardingNotes?: string; reviewedByTL?: string }) {
    const res = await fetch(`${API_BASE}/kyc/${kycId}/forward-to-officer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  }

  public static async getPayments() {
    const res = await fetch(`${API_BASE}/payments`);
    return res.json();
  }

  public static async getPaymentSettings() {
    const res = await fetch(`${API_BASE}/payments/settings`);
    return res.json();
  }

  public static async getHumanAgents(department?: string) {
    const query = department ? `?department=${department}` : '';
    const res = await fetch(`${API_BASE}/auth/agents${query}`);
    return res.json();
  }

  public static async createHumanAgent(agentData: any) {
    const res = await fetch(`${API_BASE}/auth/create-agent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(agentData)
    });
    return res.json();
  }

  public static async deleteHumanAgent(agentId: string) {
    const res = await fetch(`${API_BASE}/auth/agents/${agentId}`, {
      method: 'DELETE'
    });
    return res.json();
  }

  public static async updatePaymentSettings(payload: any) {
    const res = await fetch(`${API_BASE}/payments/settings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  }

  public static async getCommissions() {
    const res = await fetch(`${API_BASE}/payments/commissions`);
    return res.json();
  }

  public static async getKnowledgeDocs() {
    const res = await fetch(`${API_BASE}/knowledge/documents`);
    return res.json();
  }

  public static async searchKnowledge(query: string, category?: string) {
    const res = await fetch(`${API_BASE}/knowledge/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, category })
    });
    return res.json();
  }

  public static async getWorkflows() {
    const res = await fetch(`${API_BASE}/workflows`);
    return res.json();
  }

  public static async sendGatewayRequest(payload: any) {
    const res = await fetch(`${API_BASE}/orchestrator/gateway`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  }

  public static async runAgentWorkflow(payload: any) {
    const res = await fetch(`${API_BASE}/orchestrator/workflows/agent-registration`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  }

  public static async runVendorWorkflow(payload: any) {
    const res = await fetch(`${API_BASE}/orchestrator/workflows/direct-vendor-registration`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  }

  public static async runReferralWorkflow(payload: any) {
    const res = await fetch(`${API_BASE}/orchestrator/workflows/agent-referral-vendor`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  }

  public static async getPrompts() {
    const res = await fetch(`${API_BASE}/knowledge/prompts`);
    return res.json();
  }

  public static async updatePrompt(payload: any) {
    const res = await fetch(`${API_BASE}/knowledge/prompts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  }

  public static async runAIEvaluation() {
    const res = await fetch(`${API_BASE}/analytics/run-evaluation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    return res.json();
  }

  public static async getDepartments() {
    const res = await fetch(`${API_BASE}/departments`);
    return res.json();
  }

  public static async updateQueueConfig(deptId: string, payload: any) {
    const res = await fetch(`${API_BASE}/departments/${deptId}/queue-config`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  }

  public static async updateSlaConfig(deptId: string, payload: any) {
    const res = await fetch(`${API_BASE}/departments/${deptId}/sla-config`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  }

  public static async registerAIAgent(payload: any) {
    const res = await fetch(`${API_BASE}/ai-agents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  }

  public static async updateAIAgent(id: string, payload: any) {
    const res = await fetch(`${API_BASE}/ai-agents/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  }

  public static async deleteAIAgent(id: string) {
    const res = await fetch(`${API_BASE}/ai-agents/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  }

  public static async flushAITokenBuffers() {
    const res = await fetch(`${API_BASE}/ai-agents/flush-buffers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    return res.json();
  }

  public static async restartAllAIAgents() {
    const res = await fetch(`${API_BASE}/ai-agents/restart-all`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    return res.json();
  }

  public static async broadcastShiftNote(deptId: string, payload: any) {
    const res = await fetch(`${API_BASE}/departments/${deptId}/broadcast-shift-note`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  }

  public static async rebalanceQueue(deptId: string, payload: any = {}) {
    const res = await fetch(`${API_BASE}/departments/${deptId}/rebalance-queue`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  }

  public static async pingAgent(agentId: string, payload: any) {
    const res = await fetch(`${API_BASE}/departments/agents/${agentId}/ping`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  }

  public static async inspectAgent(agentId: string) {
    const res = await fetch(`${API_BASE}/departments/agents/${agentId}/inspect`);
    return res.json();
  }
}
