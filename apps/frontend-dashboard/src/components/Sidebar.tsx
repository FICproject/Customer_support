import React from 'react';
import { UserRole } from '../types';
import {
  Bot,
  Shield,
  Users,
  CreditCard,
  HelpCircle,
  Eye,
  Smartphone,
  Zap,
  Sun,
  Moon,
  LogOut,
  User,
  Cpu,
  Settings,
  Activity,
  FileText,
  BarChart2,
  MessageSquare,
  Clock,
  AlertTriangle,
  Phone,
  UserPlus,
  Layers,
  Terminal,
  Search,
  CheckCircle,
  Database,
  GitBranch,
  Building,
  Building2,
  Key,
  FolderTree,
  FolderCheck,
  Sliders,
  Wrench,
  BookOpen,
  Ticket,
  Bell,
  Lock,
  Plug,
  Globe,
  Server,
  MapPin,
  Network,
  UsersRound,
  LayoutDashboard,
  Video,
  UserCheck
} from 'lucide-react';

interface SidebarProps {
  user: { name: string; email: string; role: UserRole | 'AI_INSPECTOR' | 'CONNECT_APP' };
  activeSubTab: string;
  onSelectSubTab: (subTab: string) => void;
  systemHealth: string;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  user,
  activeSubTab,
  onSelectSubTab,
  systemHealth,
  theme,
  onToggleTheme,
  onLogout
}) => {
  return (
    <aside className="app-sidebar">
      {/* Brand Header */}
      <div className="sidebar-brand">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <img
            src="/forge-india-logo.jpg"
            alt="FORGE INDIA CONNECT"
            style={{ width: '38px', height: '38px', borderRadius: '50%', border: '2px solid var(--accent-secondary)', objectFit: 'cover', background: '#fff' }}
          />
          <div>
            <div className="brand-text" style={{ fontWeight: 800, fontSize: '0.92rem', letterSpacing: '-0.02em', color: 'var(--text-brand)', lineHeight: '1.2' }}>
              FORGE INDIA
            </div>
            <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', fontWeight: 700 }}>
              CONNECT PVT. LTD
            </div>
          </div>
        </div>

        <button
          className="theme-toggle-icon-btn"
          onClick={onToggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={18} style={{ color: '#f7b500' }} /> : <Moon size={18} style={{ color: '#002b7f' }} />}
        </button>
      </div>

      {/* Navigation Groups Filtered Exclusively by Authenticated Role */}
      <div className="sidebar-nav">
        
        {/* SUPER ADMIN 20-SECTION COMMAND CENTRE NAVIGATION */}
        {user.role === UserRole.SUPER_ADMIN && (
          <>
            {/* 1. COMMAND CENTRE */}
            <div className="nav-group-title">COMMAND CENTRE</div>
            <button
              className={`sidebar-nav-item ${activeSubTab === 'OVERVIEW' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('OVERVIEW')}
            >
              <BarChart2 size={16} />
              <span>Global Overview</span>
            </button>
            <button
              className={`sidebar-nav-item ${activeSubTab === 'LIVE_OPS' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('LIVE_OPS')}
            >
              <Zap size={16} />
              <span>Live Operations</span>
            </button>

            {/* 2. AI WORKFORCE & COMMAND */}
            <div className="nav-group-title" style={{ marginTop: '0.85rem' }}>AI WORKFORCE & COMMAND</div>
            <button
              className={`sidebar-nav-item ${activeSubTab === 'AI_WORKFORCE' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('AI_WORKFORCE')}
            >
              <Bot size={16} />
              <span>AI Workforce Monitoring</span>
            </button>
            <button
              className={`sidebar-nav-item ${activeSubTab === 'AI_ORCHESTRATOR' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('AI_ORCHESTRATOR')}
            >
              <Cpu size={16} />
              <span>AI Orchestrator & 11 Agents</span>
            </button>
            <button
              className={`sidebar-nav-item ${activeSubTab === 'PROMPTS' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('PROMPTS')}
            >
              <Terminal size={16} />
              <span>Prompt Management</span>
            </button>
            <button
              className={`sidebar-nav-item ${activeSubTab === 'TOOL_REGISTRY' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('TOOL_REGISTRY')}
            >
              <Wrench size={16} />
              <span>AI Tool Registry</span>
            </button>
            <button
              className={`sidebar-nav-item ${activeSubTab === 'KNOWLEDGE' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('KNOWLEDGE')}
            >
              <BookOpen size={16} />
              <span>RAG Knowledge Base</span>
            </button>

            {/* 3. OPERATIONS & WORKFLOWS */}
            <div className="nav-group-title" style={{ marginTop: '0.85rem' }}>OPERATIONS & WORKFLOWS</div>
            <button
              className={`sidebar-nav-item ${activeSubTab === 'WORKFLOWS' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('WORKFLOWS')}
            >
              <GitBranch size={16} />
              <span>Workflow Builder</span>
            </button>
            <button
              className={`sidebar-nav-item ${activeSubTab === 'TICKET_CENTRE' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('TICKET_CENTRE')}
            >
              <Ticket size={16} />
              <span>Ticket Centre</span>
            </button>
            <button
              className={`sidebar-nav-item ${activeSubTab === 'KYC_CENTRE' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('KYC_CENTRE')}
            >
              <Key size={16} />
              <span>KYC Centre</span>
            </button>
            <button
              className={`sidebar-nav-item ${activeSubTab === 'PAYMENT_CENTRE' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('PAYMENT_CENTRE')}
            >
              <CreditCard size={16} />
              <span>Payment & Referral Centre</span>
            </button>
            <button
              className={`sidebar-nav-item ${activeSubTab === 'COMMUNICATION' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('COMMUNICATION')}
            >
              <MessageSquare size={16} />
              <span>Communication Centre</span>
            </button>

            {/* 4. USERS & ORGANISATION */}
            <div className="nav-group-title" style={{ marginTop: '0.85rem' }}>USERS & ORGANISATION</div>
            <button
              className={`sidebar-nav-item ${activeSubTab === 'USER_MGMT' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('USER_MGMT')}
            >
              <User size={16} />
              <span>User Management</span>
            </button>
            <button
              className={`sidebar-nav-item ${activeSubTab === 'ROLES_PERM' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('ROLES_PERM')}
            >
              <Sliders size={16} />
              <span>Roles & Permissions</span>
            </button>
            <button
              className={`sidebar-nav-item ${activeSubTab === 'TL_MONITOR' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('TL_MONITOR')}
            >
              <Users size={16} />
              <span>Team Lead Monitoring</span>
            </button>
            <button
              className={`sidebar-nav-item ${activeSubTab === 'TEAMS' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('TEAMS')}
            >
              <UserPlus size={16} />
              <span>Teams</span>
            </button>
            <button
              className={`sidebar-nav-item ${activeSubTab === 'DEPARTMENTS' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('DEPARTMENTS')}
            >
              <FolderTree size={16} />
              <span>Departments</span>
            </button>
            <button
              className={`sidebar-nav-item ${activeSubTab === 'DEPT_MGMT' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('DEPT_MGMT')}
            >
              <Sliders size={16} />
              <span>Department Rules & SLAs</span>
            </button>

            {/* 5. SECURITY, AUDIT & SYSTEM */}
            <div className="nav-group-title" style={{ marginTop: '0.85rem' }}>SECURITY, AUDIT & SYSTEM</div>
            <button
              className={`sidebar-nav-item ${activeSubTab === 'AUDIT' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('AUDIT')}
            >
              <Shield size={16} />
              <span>Audit & Compliance Logs</span>
            </button>
            <button
              className={`sidebar-nav-item ${activeSubTab === 'SECURITY' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('SECURITY')}
            >
              <AlertTriangle size={16} />
              <span>Security Centre</span>
            </button>
            <button
              className={`sidebar-nav-item ${activeSubTab === 'SYSTEM_MONITOR' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('SYSTEM_MONITOR')}
            >
              <Clock size={16} />
              <span>System & Queue Monitor</span>
            </button>
            <button
              className={`sidebar-nav-item ${activeSubTab === 'INTEGRATIONS' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('INTEGRATIONS')}
            >
              <Wrench size={16} />
              <span>Integrations Gateway</span>
            </button>

            {/* 6. ANALYTICS & SETTINGS */}
            <div className="nav-group-title" style={{ marginTop: '0.85rem' }}>ANALYTICS & SETTINGS</div>
            <button
              className={`sidebar-nav-item ${activeSubTab === 'REPORTS' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('REPORTS')}
            >
              <FileText size={16} />
              <span>Reports & Analytics</span>
            </button>
            <button
              className={`sidebar-nav-item ${activeSubTab === 'NOTIFICATIONS' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('NOTIFICATIONS')}
            >
              <Bell size={16} />
              <span>Notification Templates</span>
            </button>
            <button
              className={`sidebar-nav-item ${activeSubTab === 'SETTINGS' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('SETTINGS')}
            >
              <Settings size={16} />
              <span>Platform Settings</span>
            </button>
          </>
        )}

        {/* OPERATIONAL ADMIN SIDEBAR NAVIGATION */}
        {user.role === UserRole.ADMIN && (
          <>
            <div className="nav-group-title">Executive & Live Command</div>
            
            <button
              className={`sidebar-nav-item ${activeSubTab === 'DASHBOARD' || activeSubTab === 'TICKET_QUEUE' || activeSubTab === 'OVERVIEW' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('DASHBOARD')}
            >
              <LayoutDashboard size={16} />
              <span>Dashboard</span>
            </button>

            <button
              className={`sidebar-nav-item ${activeSubTab === 'EXECUTIVE_DASHBOARD' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('EXECUTIVE_DASHBOARD')}
            >
              <Activity size={16} />
              <span>Executive Dashboard</span>
            </button>

            <button
              className={`sidebar-nav-item ${activeSubTab === 'LIVE_OPS' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('LIVE_OPS')}
            >
              <Zap size={16} />
              <span>Live Operations</span>
            </button>

            <button
              className={`sidebar-nav-item ${activeSubTab === 'GLOBAL_SEARCH' || activeSubTab === 'CUSTOMER_SEARCH' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('GLOBAL_SEARCH')}
            >
              <Search size={16} />
              <span>Global Search</span>
            </button>

            <button
              className={`sidebar-nav-item ${activeSubTab === 'ALERTS' || activeSubTab === 'ESCALATIONS' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('ALERTS')}
            >
              <Bell size={16} />
              <span>Alerts</span>
            </button>

            <div className="nav-group-title" style={{ marginTop: '0.85rem' }}>Enterprise Operations</div>

            <button
              className={`sidebar-nav-item ${activeSubTab === 'TL_MONITOR' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('TL_MONITOR')}
            >
              <Users size={16} />
              <span>All Team Leads</span>
            </button>

            <button
              className={`sidebar-nav-item ${activeSubTab === 'AI_AGENTS' || activeSubTab === 'AI_WORKFORCE' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('AI_WORKFORCE')}
            >
              <Bot size={16} />
              <span>AI Workforce Monitoring</span>
            </button>

            <button
              className={`sidebar-nav-item ${activeSubTab === 'DEPARTMENTS' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('DEPARTMENTS')}
            >
              <FolderTree size={16} />
              <span>All Departments</span>
            </button>

            <button
              className={`sidebar-nav-item ${activeSubTab === 'KYC_OPS' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('KYC_OPS')}
            >
              <Shield size={16} />
              <span>KYC Operations</span>
            </button>

            <button
              className={`sidebar-nav-item ${activeSubTab === 'PAYMENT_OPS' || ['PAYMENT_AI', 'PENDING', 'REMINDER_CALLS', 'GENERATED_LINKS', 'RECEIPTS', 'FAILED'].includes(activeSubTab) ? 'active' : ''}`}
              onClick={() => onSelectSubTab('PAYMENT_OPS')}
            >
              <CreditCard size={16} />
              <span>Payment Operations</span>
            </button>

            <button
              className={`sidebar-nav-item ${activeSubTab === 'CALLS' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('CALLS')}
            >
              <Phone size={16} />
              <span>Calls Telephony</span>
            </button>

            <button
              className={`sidebar-nav-item ${activeSubTab === 'WORKFLOW_MONITORING' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('WORKFLOW_MONITORING')}
            >
              <GitBranch size={16} />
              <span>Workflow Monitoring</span>
            </button>

            <button
              className={`sidebar-nav-item ${activeSubTab === 'COMMUNICATION_CENTRE' || activeSubTab === 'CHATS' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('COMMUNICATION_CENTRE')}
            >
              <MessageSquare size={16} />
              <span>Communication Centre</span>
            </button>

            <button
              className={`sidebar-nav-item ${activeSubTab === 'REGISTRATIONS' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('REGISTRATIONS')}
            >
              <UserPlus size={16} />
              <span>Agent Registration</span>
            </button>

            <button
              className={`sidebar-nav-item ${activeSubTab === 'VENDOR_REGISTRATION' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('VENDOR_REGISTRATION')}
            >
              <Building size={16} />
              <span>Vendor Registration</span>
            </button>

            <button
              className={`sidebar-nav-item ${activeSubTab === 'DEPARTMENTS' || activeSubTab === 'DEPARTMENT_OVERVIEW' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('DEPARTMENT_OVERVIEW')}
            >
              <Layers size={16} />
              <span>Department Overview</span>
            </button>

            <button
              className={`sidebar-nav-item ${activeSubTab === 'NOTIFICATIONS' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('NOTIFICATIONS')}
            >
              <Zap size={16} />
              <span>Notifications Centre</span>
            </button>

            <button
              className={`sidebar-nav-item ${activeSubTab === 'AUDIT' || activeSubTab === 'AUDIT_CENTRE' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('AUDIT_CENTRE')}
            >
              <Shield size={16} />
              <span>Audit Centre</span>
            </button>

            <button
              className={`sidebar-nav-item ${activeSubTab === 'REPORTS' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('REPORTS')}
            >
              <FileText size={16} />
              <span>Operational Reports</span>
            </button>

            <button
              className={`sidebar-nav-item ${activeSubTab === 'CUSTOMER_LOOKUP' || activeSubTab === 'TRACKING_DETAILS' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('CUSTOMER_LOOKUP')}
            >
              <Search size={16} />
              <span>Tracking Details</span>
            </button>

            <button
              className={`sidebar-nav-item ${activeSubTab === 'SETTINGS' || activeSubTab === 'OPERATIONAL_SETTINGS' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('OPERATIONAL_SETTINGS')}
            >
              <Settings size={16} />
              <span>Operational Settings</span>
            </button>
          </>
        )}

        {/* QUERY TEAM LEAD NAVIGATION (MIRRORING SUPER ADMIN FLOW) */}
        {user.role === UserRole.QUERIES_TL && (
          <>
            <div className="nav-group-title">QUERIES COMMAND CENTRE</div>
            <button className={`sidebar-nav-item ${activeSubTab === 'OVERVIEW' || !activeSubTab ? 'active' : ''}`} onClick={() => onSelectSubTab('OVERVIEW')}>
              <BarChart2 size={16} />
              <span>Queries Dashboard</span>
            </button>
            <button className={`sidebar-nav-item ${activeSubTab === 'LIVE_QUEUE' ? 'active' : ''}`} onClick={() => onSelectSubTab('LIVE_QUEUE')}>
              <Activity size={16} />
              <span>Live Query Queue</span>
            </button>
            <button className={`sidebar-nav-item ${activeSubTab === 'CUSTOMER_LOOKUP' || activeSubTab === 'TRACKING_DETAILS' ? 'active' : ''}`} onClick={() => onSelectSubTab('CUSTOMER_LOOKUP')}>
              <Search size={16} />
              <span>Tracking Details</span>
            </button>
            <button className={`sidebar-nav-item ${activeSubTab === 'HUMAN_AGENTS' ? 'active' : ''}`} onClick={() => onSelectSubTab('HUMAN_AGENTS')}>
              <Users size={16} />
              <span>Human Support Agents</span>
            </button>

            <div className="nav-group-title" style={{ marginTop: '0.85rem' }}>AI WORKFORCE & QUALITY</div>
            <button className={`sidebar-nav-item ${activeSubTab === 'AI_WORKFORCE_MONITOR' || activeSubTab === 'AI_WORKFORCE' || activeSubTab === 'AI_QUALITY' ? 'active' : ''}`} onClick={() => onSelectSubTab('AI_WORKFORCE_MONITOR')}>
              <Bot size={16} />
              <span>AI Agent Performance</span>
            </button>

            <div className="nav-group-title" style={{ marginTop: '0.85rem' }}>MULTI-CHANNEL & WORKFLOWS</div>
            <button className={`sidebar-nav-item ${activeSubTab === 'CHANNELS' ? 'active' : ''}`} onClick={() => onSelectSubTab('CHANNELS')}>
              <MessageSquare size={16} />
              <span>Multi-Channel Stream</span>
            </button>
            <button className={`sidebar-nav-item ${activeSubTab === 'WORKFLOW_TIMELINE' ? 'active' : ''}`} onClick={() => onSelectSubTab('WORKFLOW_TIMELINE')}>
              <Clock size={16} />
              <span>Workflow Timeline</span>
            </button>
            <button className={`sidebar-nav-item ${activeSubTab === 'ESCALATION_QUEUE' ? 'active' : ''}`} onClick={() => onSelectSubTab('ESCALATION_QUEUE')}>
              <AlertTriangle size={16} />
              <span>Escalation Queue</span>
            </button>

            <div className="nav-group-title" style={{ marginTop: '0.85rem' }}>ANALYTICS & AUDIT</div>
            <button className={`sidebar-nav-item ${activeSubTab === 'DEPARTMENT_REPORTS' ? 'active' : ''}`} onClick={() => onSelectSubTab('DEPARTMENT_REPORTS')}>
              <FileText size={16} />
              <span>Query SLA & CSAT Reports</span>
            </button>
          </>
        )}

        {/* KYC TEAM LEAD NAVIGATION (MIRRORING SUPER ADMIN FLOW) */}
        {user.role === UserRole.KYC_TL && (
          <>
            <div className="nav-group-title">KYC COMMAND CENTRE</div>
            <button className={`sidebar-nav-item ${activeSubTab === 'OVERVIEW' || !activeSubTab ? 'active' : ''}`} onClick={() => onSelectSubTab('OVERVIEW')}>
              <BarChart2 size={16} />
              <span>KYC Global Overview</span>
            </button>
            <button className={`sidebar-nav-item ${activeSubTab === 'LIVE_QUEUE' ? 'active' : ''}`} onClick={() => onSelectSubTab('LIVE_QUEUE')}>
              <Activity size={16} />
              <span>Verification Queue</span>
            </button>
            <button className={`sidebar-nav-item ${activeSubTab === 'CUSTOMER_LOOKUP' || activeSubTab === 'TRACKING_DETAILS' ? 'active' : ''}`} onClick={() => onSelectSubTab('CUSTOMER_LOOKUP')}>
              <Search size={16} />
              <span>Tracking Details</span>
            </button>

            <div className="nav-group-title" style={{ marginTop: '0.85rem' }}>DOC REVIEW & AI INSPECTOR</div>
            <button className={`sidebar-nav-item ${activeSubTab === 'DOC_REVIEW_AI_MONITOR' ? 'active' : ''}`} onClick={() => onSelectSubTab('DOC_REVIEW_AI_MONITOR')}>
              <CheckCircle size={16} />
              <span>Doc Review & OCR Monitor</span>
            </button>
            <button className={`sidebar-nav-item ${activeSubTab === 'VERIFIED_DOCUMENTS_VAULT' ? 'active' : ''}`} onClick={() => onSelectSubTab('VERIFIED_DOCUMENTS_VAULT')}>
              <FolderCheck size={16} />
              <span>Verified Documents Vault</span>
            </button>
            <button className={`sidebar-nav-item ${activeSubTab === 'FRAUD_CENTER' ? 'active' : ''}`} onClick={() => onSelectSubTab('FRAUD_CENTER')}>
              <Shield size={16} />
              <span>Fraud & Blacklist Center</span>
            </button>
            <button className={`sidebar-nav-item ${activeSubTab === 'AI_WORKFORCE_MONITOR' ? 'active' : ''}`} onClick={() => onSelectSubTab('AI_WORKFORCE_MONITOR')}>
              <Bot size={16} />
              <span>AI KYC Agent Pipeline</span>
            </button>

            <div className="nav-group-title" style={{ marginTop: '0.85rem' }}>WORKFLOWS & ESCALATIONS</div>
            <button className={`sidebar-nav-item ${activeSubTab === 'WORKFLOW_TIMELINE' ? 'active' : ''}`} onClick={() => onSelectSubTab('WORKFLOW_TIMELINE')}>
              <Clock size={16} />
              <span>KYC Timeline & History</span>
            </button>
            <button className={`sidebar-nav-item ${activeSubTab === 'ESCALATION_QUEUE' ? 'active' : ''}`} onClick={() => onSelectSubTab('ESCALATION_QUEUE')}>
              <AlertTriangle size={16} />
              <span>KYC Escalation Desk</span>
            </button>

            <div className="nav-group-title" style={{ marginTop: '0.85rem' }}>REPORTS & COMPLIANCE</div>
            <button className={`sidebar-nav-item ${activeSubTab === 'DEPARTMENT_REPORTS' ? 'active' : ''}`} onClick={() => onSelectSubTab('DEPARTMENT_REPORTS')}>
              <FileText size={16} />
              <span>Compliance & KYC Reports</span>
            </button>
            <button className={`sidebar-nav-item ${activeSubTab === 'AUDIT_TRAIL' ? 'active' : ''}`} onClick={() => onSelectSubTab('AUDIT_TRAIL')}>
              <Terminal size={16} />
              <span>KYC Verification Audit Log</span>
            </button>
            <button className={`sidebar-nav-item ${activeSubTab === 'INTERNAL_NOTES' ? 'active' : ''}`} onClick={() => onSelectSubTab('INTERNAL_NOTES')}>
              <Layers size={16} />
              <span>Officer Notes</span>
            </button>
          </>
        )}

        {/* PAYMENT TEAM LEAD NAVIGATION (MIRRORING SUPER ADMIN FLOW) */}
        {user.role === UserRole.PAYMENT_TL && (
          <>
            <div className="nav-group-title">PAYMENT COMMAND CENTRE</div>
            <button className={`sidebar-nav-item ${activeSubTab === 'OVERVIEW' || !activeSubTab ? 'active' : ''}`} onClick={() => onSelectSubTab('OVERVIEW')}>
              <BarChart2 size={16} />
              <span>Payment Operations Overview</span>
            </button>
            <button className={`sidebar-nav-item ${activeSubTab === 'LIVE_QUEUE' ? 'active' : ''}`} onClick={() => onSelectSubTab('LIVE_QUEUE')}>
              <Activity size={16} />
              <span>Live Transactions Queue</span>
            </button>
            <button className={`sidebar-nav-item ${activeSubTab === 'CUSTOMER_LOOKUP' || activeSubTab === 'TRACKING_DETAILS' ? 'active' : ''}`} onClick={() => onSelectSubTab('CUSTOMER_LOOKUP')}>
              <Search size={16} />
              <span>Tracking Details</span>
            </button>

            <div className="nav-group-title" style={{ marginTop: '0.85rem' }}>TELEPHONY & AI WORKFORCE</div>
            <button className={`sidebar-nav-item ${activeSubTab === 'CALL_LOGS' ? 'active' : ''}`} onClick={() => onSelectSubTab('CALL_LOGS')}>
              <Phone size={16} />
              <span>AI Voice Dialer & Calls</span>
            </button>
            <button className={`sidebar-nav-item ${activeSubTab === 'AI_WORKFORCE_MONITOR' ? 'active' : ''}`} onClick={() => onSelectSubTab('AI_WORKFORCE_MONITOR')}>
              <Bot size={16} />
              <span>Payment AI Agent Pipeline</span>
            </button>
            <button className={`sidebar-nav-item ${activeSubTab === 'HUMAN_OFFICER_MONITOR' ? 'active' : ''}`} onClick={() => onSelectSubTab('HUMAN_OFFICER_MONITOR')}>
              <UserCheck size={16} />
              <span>Payment Human Officer Operations & Live Workforce Intelligence Center</span>
            </button>

            <div className="nav-group-title" style={{ marginTop: '0.85rem' }}>REVENUE & ESCALATIONS</div>
            <button className={`sidebar-nav-item ${activeSubTab === 'AGENT_COMMISSIONS_PAYOUTS' ? 'active' : ''}`} onClick={() => onSelectSubTab('AGENT_COMMISSIONS_PAYOUTS')}>
              <CreditCard size={16} />
              <span>Multi-Tier Commissions & Agent Wallet Payouts</span>
            </button>
            <button className={`sidebar-nav-item ${activeSubTab === 'ESCALATION_QUEUE' ? 'active' : ''}`} onClick={() => onSelectSubTab('ESCALATION_QUEUE')}>
              <AlertTriangle size={16} />
              <span>Payment Escalation Desk</span>
            </button>

            <div className="nav-group-title" style={{ marginTop: '0.85rem' }}>RECONCILIATION & SETTINGS</div>
            <button className={`sidebar-nav-item ${activeSubTab === 'DEPARTMENT_REPORTS' ? 'active' : ''}`} onClick={() => onSelectSubTab('DEPARTMENT_REPORTS')}>
              <FileText size={16} />
              <span>Revenue & Commission Reports</span>
            </button>
            <button className={`sidebar-nav-item ${activeSubTab === 'AUDIT_TRAIL' ? 'active' : ''}`} onClick={() => onSelectSubTab('AUDIT_TRAIL')}>
              <Terminal size={16} />
              <span>Payment Audit Trail</span>
            </button>
            <button className={`sidebar-nav-item ${activeSubTab === 'INTERNAL_NOTES' ? 'active' : ''}`} onClick={() => onSelectSubTab('INTERNAL_NOTES')}>
              <Layers size={16} />
              <span>Ledger Notes</span>
            </button>
            <button className={`sidebar-nav-item ${activeSubTab === 'DEPARTMENT_SETTINGS' ? 'active' : ''}`} onClick={() => onSelectSubTab('DEPARTMENT_SETTINGS')}>
              <Settings size={16} />
              <span>Payment Tier Pricing & Settings</span>
            </button>
          </>
        )}

        {/* QUERY HUMAN AGENT NAVIGATION - 4 ENTERPRISE CATEGORIES (10 SUBTABS) */}
        {user.role === UserRole.QUERY_AGENT && (
          <>
            <div className="nav-group-title">COMMAND & LIVE DESK</div>
            <button className={`sidebar-nav-item ${activeSubTab === 'AGENT_DESK' || activeSubTab === 'OVERVIEW' || !activeSubTab ? 'active' : ''}`} onClick={() => onSelectSubTab('AGENT_DESK')}>
              <MessageSquare size={16} />
              <span>Live AI Monitor & Intercept</span>
            </button>
            <button className={`sidebar-nav-item ${activeSubTab === 'URGENT_RADAR' ? 'active' : ''}`} onClick={() => onSelectSubTab('URGENT_RADAR')}>
              <Zap size={16} />
              <span>Urgent Frustration & SLA Radar</span>
            </button>

            <div className="nav-group-title">CASE MANAGEMENT & TICKETING</div>
            <button className={`sidebar-nav-item ${activeSubTab === 'MY_TICKETS' ? 'active' : ''}`} onClick={() => onSelectSubTab('MY_TICKETS')}>
              <Ticket size={16} />
              <span>My Active & Re-Opened Tickets</span>
            </button>
            <button className={`sidebar-nav-item ${activeSubTab === 'CUSTOMER_LOOKUP' || activeSubTab === 'TRACKING_DETAILS' ? 'active' : ''}`} onClick={() => onSelectSubTab('CUSTOMER_LOOKUP')}>
              <Search size={16} />
              <span>Tracking Details</span>
            </button>
            <button className={`sidebar-nav-item ${activeSubTab === 'MULTI_CHANNEL_STREAM' ? 'active' : ''}`} onClick={() => onSelectSubTab('MULTI_CHANNEL_STREAM')}>
              <Layers size={16} />
              <span>Multi-Channel Live Stream</span>
            </button>
            <button className={`sidebar-nav-item ${activeSubTab === 'CLOSED_ARCHIVE' ? 'active' : ''}`} onClick={() => onSelectSubTab('CLOSED_ARCHIVE')}>
              <CheckCircle size={16} />
              <span>Closed Tickets Archive & Reopen</span>
            </button>

            <div className="nav-group-title">TELEPHONY & COMMUNICATIONS</div>
            <button className={`sidebar-nav-item ${activeSubTab === 'CALL_DIALER' ? 'active' : ''}`} onClick={() => onSelectSubTab('CALL_DIALER')}>
              <Phone size={16} />
              <span>Outbound Voice Calling & Dialpad</span>
            </button>
            <button className={`sidebar-nav-item ${activeSubTab === 'WHATSAPP_SMS_DISPATCH' ? 'active' : ''}`} onClick={() => onSelectSubTab('WHATSAPP_SMS_DISPATCH')}>
              <Smartphone size={16} />
              <span>WhatsApp & SMS Quick Dispatch</span>
            </button>

            <div className="nav-group-title">METRICS & PERFORMANCE</div>
            <button className={`sidebar-nav-item ${activeSubTab === 'MY_METRICS' ? 'active' : ''}`} onClick={() => onSelectSubTab('MY_METRICS')}>
              <Activity size={16} />
              <span>My Personal Shift Metrics</span>
            </button>
          </>
        )}

        {/* KYC HUMAN OFFICER NAVIGATION */}
        {user.role === UserRole.KYC_AGENT && (
          <>
            <div className="nav-group-title">KYC OFFICER WORKSPACE</div>
            <button className={`sidebar-nav-item ${activeSubTab === 'LIVE_VERIFICATION_QUEUE' || activeSubTab === 'OVERVIEW' || !activeSubTab ? 'active' : ''}`} onClick={() => onSelectSubTab('LIVE_VERIFICATION_QUEUE')}>
              <Zap size={16} />
              <span>Live Verification Queue</span>
            </button>
            <button className={`sidebar-nav-item ${activeSubTab === 'AGENT_DESK' || activeSubTab === 'KYC_SIDE_BY_SIDE' ? 'active' : ''}`} onClick={() => onSelectSubTab('AGENT_DESK')}>
              <Eye size={16} />
              <span>Live AI Shadowing & Takeover</span>
            </button>
            <button className={`sidebar-nav-item ${activeSubTab === 'KYC_ASSIGNED_QUEUE' ? 'active' : ''}`} onClick={() => onSelectSubTab('KYC_ASSIGNED_QUEUE')}>
              <Activity size={16} />
              <span>Escalated & Assigned Queue</span>
            </button>
            <button className={`sidebar-nav-item ${activeSubTab === 'ALL_DOCUMENTS' ? 'active' : ''}`} onClick={() => onSelectSubTab('ALL_DOCUMENTS')}>
              <FolderCheck size={16} />
              <span>All Received Documents</span>
            </button>
            <button className={`sidebar-nav-item ${activeSubTab === 'PENDING_DOCS' || activeSubTab === 'KYC_BLUR_OVERRIDE' ? 'active' : ''}`} onClick={() => onSelectSubTab('PENDING_DOCS')}>
              <FileText size={16} />
              <span>Blur & Quality Override Desk</span>
            </button>
            <button className={`sidebar-nav-item ${activeSubTab === 'CALL_DIALER' || activeSubTab === 'APPLICANT_CALLS' ? 'active' : ''}`} onClick={() => onSelectSubTab('CALL_DIALER')}>
              <Phone size={16} />
              <span>Direct Call to Registerer</span>
            </button>
            <button className={`sidebar-nav-item ${activeSubTab === 'CUSTOMER_LOOKUP' || activeSubTab === 'TRACKING_DETAILS' || activeSubTab === 'KYC_ARCHIVE_SEARCH' ? 'active' : ''}`} onClick={() => onSelectSubTab('CUSTOMER_LOOKUP')}>
              <Search size={16} />
              <span>Tracking ID details</span>
            </button>
            <button className={`sidebar-nav-item ${activeSubTab === 'MY_METRICS' ? 'active' : ''}`} onClick={() => onSelectSubTab('MY_METRICS')}>
              <BarChart2 size={16} />
              <span>Officer Target & Metrics</span>
            </button>
          </>
        )}

        {/* PAYMENT HUMAN OFFICER NAVIGATION */}
        {user.role === UserRole.PAYMENT_AGENT && (
          <>
            <div className="nav-group-title">PAYMENT COMMAND CENTRE</div>
            <button className={`sidebar-nav-item ${activeSubTab === 'AGENT_DESK' || activeSubTab === 'OVERVIEW' || activeSubTab === 'LIVE_QUEUE' || !activeSubTab ? 'active' : ''}`} onClick={() => onSelectSubTab('AGENT_DESK')}>
              <Activity size={16} />
              <span>Live Transactions & Reconciliation</span>
            </button>
            <button className={`sidebar-nav-item ${activeSubTab === 'AI_WORKFORCE_MONITOR' || activeSubTab === 'PAYMENT_AI_PIPELINE' ? 'active' : ''}`} onClick={() => onSelectSubTab('AI_WORKFORCE_MONITOR')}>
              <Cpu size={16} />
              <span>Live Payment AI Workforce & Pipeline</span>
            </button>
            <button className={`sidebar-nav-item ${activeSubTab === 'AGENT_COMMISSIONS_PAYOUTS' || activeSubTab === 'COMMISSION_AUDIT' ? 'active' : ''}`} onClick={() => onSelectSubTab('AGENT_COMMISSIONS_PAYOUTS')}>
              <CreditCard size={16} />
              <span>Agent Wallets & Commission Audit</span>
            </button>
            <button className={`sidebar-nav-item ${activeSubTab === 'CUSTOMER_LOOKUP' || activeSubTab === 'TRACKING_DETAILS' ? 'active' : ''}`} onClick={() => onSelectSubTab('CUSTOMER_LOOKUP')}>
              <Search size={16} />
              <span>Tracking Details</span>
            </button>

            <div className="nav-group-title" style={{ marginTop: '0.85rem' }}>DISPUTES & ESCALATIONS</div>
            <button className={`sidebar-nav-item ${activeSubTab === 'ESCALATION_QUEUE' ? 'active' : ''}`} onClick={() => onSelectSubTab('ESCALATION_QUEUE')}>
              <AlertTriangle size={16} />
              <span>Payment Escalation Desk</span>
            </button>
            <button className={`sidebar-nav-item ${activeSubTab === 'PAYMENT_REMINDERS' || activeSubTab === 'CALL_DIALER' ? 'active' : ''}`} onClick={() => onSelectSubTab('PAYMENT_REMINDERS')}>
              <Phone size={16} />
              <span>Manual Voice Reminders & Calls</span>
            </button>

            <div className="nav-group-title" style={{ marginTop: '0.85rem' }}>RECONCILIATION & AUDIT</div>
            <button className={`sidebar-nav-item ${activeSubTab === 'DEPARTMENT_REPORTS' ? 'active' : ''}`} onClick={() => onSelectSubTab('DEPARTMENT_REPORTS')}>
              <FileText size={16} />
              <span>Settlement & Tax Reports</span>
            </button>
            <button className={`sidebar-nav-item ${activeSubTab === 'AUDIT_TRAIL' ? 'active' : ''}`} onClick={() => onSelectSubTab('AUDIT_TRAIL')}>
              <Terminal size={16} />
              <span>Payment Audit Trail</span>
            </button>
          </>
        )}

        {/* AI WORKFORCE INSPECTOR SIDEBAR NAVIGATION (PHASE 19 FULL SIDEBAR TREE) */}
        {user.role === 'AI_INSPECTOR' && (
          <>
            <div className="nav-group-title">AI WORKFORCE</div>
            
            <button className={`sidebar-nav-item ${activeSubTab === 'WORKFORCE_OVERVIEW' || activeSubTab === 'OVERVIEW' ? 'active' : ''}`} onClick={() => onSelectSubTab('WORKFORCE_OVERVIEW')}>
              <LayoutDashboard size={16} />
              <span>Overview</span>
            </button>

            <button className={`sidebar-nav-item ${activeSubTab === 'AI_COMMAND_CENTER' ? 'active' : ''}`} onClick={() => onSelectSubTab('AI_COMMAND_CENTER')}>
              <Zap size={16} />
              <span>AI Command Center</span>
            </button>

            <button className={`sidebar-nav-item ${activeSubTab === 'AGENT_REGISTRY' || activeSubTab === 'AI_AGENTS' ? 'active' : ''}`} onClick={() => onSelectSubTab('AGENT_REGISTRY')}>
              <Cpu size={16} />
              <span>Agent Registry</span>
            </button>

            <div className="nav-group-title" style={{ marginTop: '0.65rem' }}>Departments</div>

            <button className={`sidebar-nav-item ${activeSubTab === 'DEPT_QUERY' ? 'active' : ''}`} onClick={() => onSelectSubTab('DEPT_QUERY')}>
              <HelpCircle size={16} />
              <span>Query AI</span>
            </button>

            <button className={`sidebar-nav-item ${activeSubTab === 'DEPT_KYC' ? 'active' : ''}`} onClick={() => onSelectSubTab('DEPT_KYC')}>
              <Shield size={16} />
              <span>KYC AI</span>
            </button>

            <button className={`sidebar-nav-item ${activeSubTab === 'DEPT_PAYMENT' ? 'active' : ''}`} onClick={() => onSelectSubTab('DEPT_PAYMENT')}>
              <CreditCard size={16} />
              <span>Payment AI</span>
            </button>

            <div className="nav-group-title" style={{ marginTop: '0.65rem' }}>Specialized Agents</div>

            <button className={`sidebar-nav-item ${activeSubTab === 'AGENT_CALLING' ? 'active' : ''}`} onClick={() => onSelectSubTab('AGENT_CALLING')}>
              <Phone size={16} />
              <span>Calling</span>
            </button>

            <button className={`sidebar-nav-item ${activeSubTab === 'AGENT_WHATSAPP' ? 'active' : ''}`} onClick={() => onSelectSubTab('AGENT_WHATSAPP')}>
              <MessageSquare size={16} />
              <span>WhatsApp</span>
            </button>

            <button className={`sidebar-nav-item ${activeSubTab === 'AGENT_EMAIL' ? 'active' : ''}`} onClick={() => onSelectSubTab('AGENT_EMAIL')}>
              <FileText size={16} />
              <span>Email</span>
            </button>

            <button className={`sidebar-nav-item ${activeSubTab === 'AGENT_TRANSLATION' ? 'active' : ''}`} onClick={() => onSelectSubTab('AGENT_TRANSLATION')}>
              <Globe size={16} />
              <span>Translation</span>
            </button>

            <button className={`sidebar-nav-item ${activeSubTab === 'AGENT_ESCALATION' ? 'active' : ''}`} onClick={() => onSelectSubTab('AGENT_ESCALATION')}>
              <AlertTriangle size={16} />
              <span>Escalation</span>
            </button>

            <div className="nav-group-title" style={{ marginTop: '0.65rem' }}>Management</div>

            <button className={`sidebar-nav-item ${activeSubTab === 'AGENT_CONFIG' ? 'active' : ''}`} onClick={() => onSelectSubTab('AGENT_CONFIG')}>
              <Settings size={16} />
              <span>Agent Configuration</span>
            </button>

            <button className={`sidebar-nav-item ${activeSubTab === 'PROMPT_MGMT' ? 'active' : ''}`} onClick={() => onSelectSubTab('PROMPT_MGMT')}>
              <Sliders size={16} />
              <span>Prompt Management</span>
            </button>

            <button className={`sidebar-nav-item ${activeSubTab === 'KNOWLEDGE_BASE' ? 'active' : ''}`} onClick={() => onSelectSubTab('KNOWLEDGE_BASE')}>
              <BookOpen size={16} />
              <span>Knowledge Base</span>
            </button>

            <button className={`sidebar-nav-item ${activeSubTab === 'TOOL_MGMT' ? 'active' : ''}`} onClick={() => onSelectSubTab('TOOL_MGMT')}>
              <Wrench size={16} />
              <span>Tool Management</span>
            </button>

            <button className={`sidebar-nav-item ${activeSubTab === 'WORKFLOW_MGMT' ? 'active' : ''}`} onClick={() => onSelectSubTab('WORKFLOW_MGMT')}>
              <GitBranch size={16} />
              <span>Workflow Management</span>
            </button>

            <div className="nav-group-title" style={{ marginTop: '0.65rem' }}>Live Operations</div>

            <button className={`sidebar-nav-item ${activeSubTab === 'LIVE_OPS' ? 'active' : ''}`} onClick={() => onSelectSubTab('LIVE_OPS')}>
              <Activity size={16} />
              <span>Live Operations</span>
            </button>

            <button className={`sidebar-nav-item ${activeSubTab === 'CONVERSATIONS' ? 'active' : ''}`} onClick={() => onSelectSubTab('CONVERSATIONS')}>
              <MessageSquare size={16} />
              <span>Conversations</span>
            </button>

            <button className={`sidebar-nav-item ${activeSubTab === 'AI_DECISIONS' ? 'active' : ''}`} onClick={() => onSelectSubTab('AI_DECISIONS')}>
              <CheckCircle size={16} />
              <span>AI Decisions</span>
            </button>

            <button className={`sidebar-nav-item ${activeSubTab === 'AI_LOGS' ? 'active' : ''}`} onClick={() => onSelectSubTab('AI_LOGS')}>
              <Terminal size={16} />
              <span>AI Logs</span>
            </button>

            <div className="nav-group-title" style={{ marginTop: '0.65rem' }}>Governance</div>

            <button className={`sidebar-nav-item ${activeSubTab === 'EVALUATIONS' ? 'active' : ''}`} onClick={() => onSelectSubTab('EVALUATIONS')}>
              <Eye size={16} />
              <span>Evaluations</span>
            </button>

            <button className={`sidebar-nav-item ${activeSubTab === 'PERFORMANCE' ? 'active' : ''}`} onClick={() => onSelectSubTab('PERFORMANCE')}>
              <BarChart2 size={16} />
              <span>Performance</span>
            </button>

            <button className={`sidebar-nav-item ${activeSubTab === 'VERSIONS' ? 'active' : ''}`} onClick={() => onSelectSubTab('VERSIONS')}>
              <Layers size={16} />
              <span>Versions</span>
            </button>

            <button className={`sidebar-nav-item ${activeSubTab === 'SETTINGS' ? 'active' : ''}`} onClick={() => onSelectSubTab('SETTINGS')}>
              <Settings size={16} />
              <span>Settings</span>
            </button>
          </>
        )}

        {/* CONNECT APP PORTAL SIDEBAR NAVIGATION */}
        {user.role === 'CONNECT_APP' && (
          <>
            <div className="nav-group-title">Connect App Gateway</div>
            
            <button
              className={`sidebar-nav-item ${activeSubTab === 'CHAT' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('CHAT')}
            >
              <MessageSquare size={16} />
              <span>Support Chat Gateway</span>
            </button>

            <button
              className={`sidebar-nav-item ${activeSubTab === 'VOICE' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('VOICE')}
            >
              <Phone size={16} />
              <span>Twilio / Exotel Voice</span>
            </button>

            <div className="nav-group-title" style={{ marginTop: '0.85rem' }}>Registration Workflows</div>

            <button
              className={`sidebar-nav-item ${activeSubTab === 'AGENT_REG' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('AGENT_REG')}
            >
              <UserPlus size={16} />
              <span>Agent Registration</span>
            </button>

            <button
              className={`sidebar-nav-item ${activeSubTab === 'VENDOR_REG' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('VENDOR_REG')}
            >
              <UserPlus size={16} />
              <span>Direct Vendor Reg</span>
            </button>

            <button
              className={`sidebar-nav-item ${activeSubTab === 'REFERRAL_REG' ? 'active' : ''}`}
              onClick={() => onSelectSubTab('REFERRAL_REG')}
            >
              <CreditCard size={16} />
              <span>Agent Referral Vendor</span>
            </button>
          </>
        )}

      </div>

      {/* Sidebar User Profile Card & Logout */}
      <div className="sidebar-footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <User size={16} />
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ fontWeight: 700, fontSize: '0.825rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user.name}
            </div>
            <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user.email}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className="badge badge-success" style={{ padding: '0.15rem 0.45rem', fontSize: '0.65rem' }}>
            <Zap size={10} /> {systemHealth || 'ONLINE'}
          </span>
          <button className="btn btn-secondary" style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem' }} onClick={onLogout}>
            <LogOut size={12} /> Logout
          </button>
        </div>
      </div>
    </aside>
  );
};
