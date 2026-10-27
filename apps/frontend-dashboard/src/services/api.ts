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

  public static async getStakeholderRequests(filters: { stakeholderType?: string; category?: string; status?: string; search?: string } = {}) {
    const params = new URLSearchParams();
    if (filters.stakeholderType && filters.stakeholderType !== 'ALL') params.append('stakeholderType', filters.stakeholderType);
    if (filters.category && filters.category !== 'ALL') params.append('category', filters.category);
    if (filters.status && filters.status !== 'ALL') params.append('status', filters.status);
    if (filters.search) params.append('search', filters.search);

    const qs = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`${API_BASE}/stakeholder-requests${qs}`);
    return res.json();
  }

  public static async getStakeholderRequestsSummary() {
    const res = await fetch(`${API_BASE}/stakeholder-requests/stats/summary`);
    return res.json();
  }

  public static async getStakeholderRequestById(id: string) {
    const res = await fetch(`${API_BASE}/stakeholder-requests/${id}`);
    return res.json();
  }

  public static async createStakeholderRequest(payload: any) {
    const res = await fetch(`${API_BASE}/stakeholder-requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  }

  public static async takeStakeholderRequestAction(id: string, payload: any) {
    const res = await fetch(`${API_BASE}/stakeholder-requests/${id}/action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  }

  // ==========================================
  // VENDOR MANAGEMENT & LIFECYCLE OPERATIONS
  // ==========================================
  public static async getVendors(filters: { source?: string; status?: string; search?: string } = {}) {
    const params = new URLSearchParams();
    if (filters.source && filters.source !== 'ALL') params.append('source', filters.source);
    if (filters.status && filters.status !== 'ALL') params.append('status', filters.status);
    if (filters.search) params.append('search', filters.search);

    const qs = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`${API_BASE}/vendors${qs}`);
    return res.json();
  }

  public static async getVendorHistory(filters: { vendorId?: string; team?: string; status?: string; search?: string } = {}) {
    const params = new URLSearchParams();
    if (filters.vendorId) params.append('vendorId', filters.vendorId);
    if (filters.team && filters.team !== 'ALL') params.append('team', filters.team);
    if (filters.status && filters.status !== 'ALL') params.append('status', filters.status);
    if (filters.search) params.append('search', filters.search);

    const qs = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`${API_BASE}/vendors/history${qs}`);
    return res.json();
  }

  public static async getVendorPayroll(filters: { status?: string; vendorId?: string; search?: string } = {}) {
    const params = new URLSearchParams();
    if (filters.status && filters.status !== 'ALL') params.append('status', filters.status);
    if (filters.vendorId) params.append('vendorId', filters.vendorId);
    if (filters.search) params.append('search', filters.search);

    const qs = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`${API_BASE}/vendors/payroll${qs}`);
    return res.json();
  }

  public static async releaseVendorPayout(id: string, payload: { utrNumber?: string; approvedBy?: string } = {}) {
    const res = await fetch(`${API_BASE}/vendors/payroll/${id}/release`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  }

  public static async createVendor(payload: any) {
    const res = await fetch(`${API_BASE}/vendors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  }

  // --- STAKEHOLDER PLATFORM OPERATIONS ---
  public static async getStakeholdersDirectory(stakeholderType: string, filters: { search?: string; onboardedBy?: string; level?: string; status?: string } = {}) {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.onboardedBy && filters.onboardedBy !== 'ALL') params.append('onboardedBy', filters.onboardedBy);
    if (filters.level && filters.level !== 'ALL') params.append('level', filters.level);
    if (filters.status && filters.status !== 'ALL') params.append('status', filters.status);

    const qs = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`${API_BASE}/stakeholders/${stakeholderType}/directory${qs}`);
    return res.json();
  }

  public static async getStakeholdersKycQueries(stakeholderType: string) {
    const res = await fetch(`${API_BASE}/stakeholders/${stakeholderType}/kyc-queries`);
    return res.json();
  }

  public static async getStakeholdersHistory(stakeholderType: string) {
    const res = await fetch(`${API_BASE}/stakeholders/${stakeholderType}/ticket-routing-history`);
    return res.json();
  }

  public static async getStakeholdersPayroll(stakeholderType: string) {
    const res = await fetch(`${API_BASE}/stakeholders/${stakeholderType}/payroll-ledger`);
    return res.json();
  }

  public static async onboardStakeholder(stakeholderType: string, payload: any) {
    const res = await fetch(`${API_BASE}/stakeholders/${stakeholderType}/onboard`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  }

  public static async performStakeholderAction(stakeholderType: string, id: string, payload: { action: string; note?: string; subAdminName?: string; utrNumber?: string }) {
    const res = await fetch(`${API_BASE}/stakeholders/${stakeholderType}/${id}/action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  }
}

