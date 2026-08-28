import { AIWorkforceNavigationItem, AIWorkforceViewId } from '../../types';

export class AIWorkforceDashboardNavigationService {
  /**
   * Generates the complete 19-section AI Workforce Dashboard Sidebar Navigation Tree
   */
  static getSidebarNavigation(): AIWorkforceNavigationItem[] {
    return [
      { id: AIWorkforceViewId.OVERVIEW, label: 'Overview', icon: 'dashboard', route: '/ai-workforce/overview' },
      { id: AIWorkforceViewId.COMMAND_CENTER, label: 'AI Command Center', icon: 'radar', route: '/ai-workforce/command-center' },
      { id: AIWorkforceViewId.AGENT_REGISTRY, label: 'Agent Registry', icon: 'users', route: '/ai-workforce/registry' },
      {
        id: AIWorkforceViewId.DEPT_QUERY,
        label: 'Departments',
        icon: 'building',
        route: '/ai-workforce/departments',
        children: [
          { id: AIWorkforceViewId.DEPT_QUERY, label: 'Query AI', icon: 'help-circle', route: '/ai-workforce/departments/query' },
          { id: AIWorkforceViewId.DEPT_KYC, label: 'KYC AI', icon: 'shield-check', route: '/ai-workforce/departments/kyc' },
          { id: AIWorkforceViewId.DEPT_PAYMENT, label: 'Payment AI', icon: 'credit-card', route: '/ai-workforce/departments/payment' }
        ]
      },
      {
        id: AIWorkforceViewId.SPEC_CALLING,
        label: 'Specialized Agents',
        icon: 'cpu',
        route: '/ai-workforce/specialized',
        children: [
          { id: AIWorkforceViewId.SPEC_CALLING, label: 'Calling AI', icon: 'phone-call', route: '/ai-workforce/specialized/calling' },
          { id: AIWorkforceViewId.SPEC_WHATSAPP, label: 'WhatsApp AI', icon: 'message-square', route: '/ai-workforce/specialized/whatsapp' },
          { id: AIWorkforceViewId.SPEC_EMAIL, label: 'Email AI', icon: 'mail', route: '/ai-workforce/specialized/email' },
          { id: AIWorkforceViewId.SPEC_TRANSLATION, label: 'Translation AI', icon: 'languages', route: '/ai-workforce/specialized/translation' },
          { id: AIWorkforceViewId.SPEC_ESCALATION, label: 'Escalation AI', icon: 'alert-triangle', route: '/ai-workforce/specialized/escalation' }
        ]
      },
      { id: AIWorkforceViewId.AGENT_CONFIG, label: 'Agent Configuration', icon: 'sliders', route: '/ai-workforce/agent-config' },
      { id: AIWorkforceViewId.PROMPT_MGMT, label: 'Prompt Management', icon: 'terminal', route: '/ai-workforce/prompts' },
      { id: AIWorkforceViewId.KNOWLEDGE_BASE, label: 'Knowledge Base', icon: 'book-open', route: '/ai-workforce/knowledge' },
      { id: AIWorkforceViewId.TOOL_MGMT, label: 'Tool Management', icon: 'wrench', route: '/ai-workforce/tools' },
      { id: AIWorkforceViewId.WORKFLOW_MGMT, label: 'Workflow Management', icon: 'git-merge', route: '/ai-workforce/workflows' },
      { id: AIWorkforceViewId.LIVE_OPERATIONS, label: 'Live Operations', icon: 'activity', route: '/ai-workforce/live-operations' },
      { id: AIWorkforceViewId.CONVERSATIONS, label: 'Conversations', icon: 'messages-square', route: '/ai-workforce/conversations' },
      { id: AIWorkforceViewId.AI_DECISIONS, label: 'AI Decisions', icon: 'file-text', route: '/ai-workforce/decisions' },
      { id: AIWorkforceViewId.AI_LOGS, label: 'AI Logs', icon: 'list', route: '/ai-workforce/logs' },
      { id: AIWorkforceViewId.EVALUATIONS, label: 'Evaluations', icon: 'check-circle-2', route: '/ai-workforce/evaluations' },
      { id: AIWorkforceViewId.PERFORMANCE, label: 'Performance', icon: 'trending-up', route: '/ai-workforce/performance' },
      { id: AIWorkforceViewId.VERSIONS, label: 'Versions', icon: 'git-branch', route: '/ai-workforce/versions' },
      { id: AIWorkforceViewId.SETTINGS, label: 'Settings', icon: 'settings', route: '/ai-workforce/settings' }
    ];
  }
}
