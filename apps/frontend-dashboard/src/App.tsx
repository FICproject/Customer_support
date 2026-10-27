import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { LoginPage } from './components/LoginPage';
import { SuperAdminDashboard } from './components/SuperAdminDashboard';
import { DepartmentTLDashboards } from './components/DepartmentTLDashboards';
import { AIAgentDashboard } from './components/AIAgentDashboard';
import { ConnectAppPortal } from './components/ConnectAppPortal';
import { HumanAgentDashboard } from './components/HumanAgentDashboard';
import { TrackingDetailsView } from './components/TrackingDetailsView';
import { TicketVisionFlowModal, TicketVisionFlowData } from './components/TicketVisionFlowModal';
import { UserRole } from './types';
import { ApiService } from './services/api';

export function App() {
  const [globalVisionTicket, setGlobalVisionTicket] = useState<TicketVisionFlowData | null>(null);

  useEffect(() => {
    const handleOpenVision = (e: any) => {
      if (e.detail) {
        setGlobalVisionTicket(e.detail);
      }
    };
    window.addEventListener('OPEN_TICKET_VISION_FLOW' as any, handleOpenVision);

    // Global background scroll lock observer whenever any modal/popup is visible in DOM
    const checkModals = () => {
      const modalActive = document.querySelector(
        '.modal-overlay, .action-popup-overlay, .modal-backdrop, .preview-modal-overlay, [class*="modal-overlay"], div[style*="position: fixed"][style*="inset: 0"]'
      );
      if (modalActive) {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      }
    };

    const observer = new MutationObserver(checkModals);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('OPEN_TICKET_VISION_FLOW' as any, handleOpenVision);
      observer.disconnect();
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);
  const [user, setUser] = useState<{ name: string; email: string; role: UserRole | 'CONNECT_APP' } | null>(() => {
    const saved = localStorage.getItem('auth_user_session');
    if (!saved) return null;
    try {
      const parsed = JSON.parse(saved);
      if (parsed.name && parsed.name.includes('Super Admin')) {
        parsed.name = parsed.name.replace(/Super Admin/g, 'Support Admin');
        if (parsed.email === 'superadmin@enterprise.ai') {
          parsed.email = 'supportadmin@enterprise.ai';
        }
        localStorage.setItem('auth_user_session', JSON.stringify(parsed));
      }
      return parsed;
    } catch {
      return null;
    }
  });

  const [activeSubTab, setActiveSubTab] = useState<string>(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const urlSubTab = searchParams.get('subTab');
      if (urlSubTab) return urlSubTab;

      const stakeholder = searchParams.get('stakeholder');
      const tab = searchParams.get('tab') || 'DIRECTORY';
      if (stakeholder) {
        const sKey = stakeholder.toUpperCase().startsWith('REQ_')
          ? stakeholder.toUpperCase()
          : `REQ_${stakeholder.toUpperCase()}`;
        return `${sKey}:${tab.toUpperCase()}`;
      }

      if (window.location.hash) {
        const hashVal = window.location.hash.replace('#', '');
        if (hashVal) return hashVal;
      }
    } catch {
      // Fallback to default role tab
    }

    if (!user) return 'OVERVIEW';
    if (user.role === UserRole.SUPPORT_ADMIN || user.role === UserRole.SUPER_ADMIN || (user.role as any) === 'SUPER_ADMIN' || user.role === UserRole.ADMIN) return 'OVERVIEW';
    if (user.role === 'CONNECT_APP') return 'CHAT';
    if (user.role === UserRole.QUERIES_TL) return 'OVERVIEW';
    if (user.role === UserRole.KYC_TL) return 'OVERVIEW';
    if (user.role === UserRole.PAYMENT_TL) return 'OVERVIEW';
    if (user.role === UserRole.QUERY_AGENT || user.role === UserRole.KYC_AGENT || user.role === UserRole.PAYMENT_AGENT) return 'AGENT_DESK';
    return 'OVERVIEW';
  });

  // Keep browser URL query params synchronized with activeSubTab without full page refresh
  useEffect(() => {
    if (!activeSubTab) return;

    try {
      const url = new URL(window.location.href);
      if (activeSubTab === 'OVERVIEW') {
        url.searchParams.delete('subTab');
        url.searchParams.delete('stakeholder');
        url.searchParams.delete('tab');
      } else if (activeSubTab.includes(':')) {
        const [desk, sub] = activeSubTab.split(':');
        const cleanDesk = desk.replace('REQ_', '');
        url.searchParams.set('stakeholder', cleanDesk);
        url.searchParams.set('tab', sub);
        url.searchParams.delete('subTab');
      } else {
        url.searchParams.set('subTab', activeSubTab);
        url.searchParams.delete('stakeholder');
        url.searchParams.delete('tab');
      }
      window.history.replaceState({ subTab: activeSubTab }, '', url.toString());
    } catch (err) {
      console.warn('URL sync error:', err);
    }
  }, [activeSubTab]);

  // Handle browser back and forward button navigation
  useEffect(() => {
    const handlePopState = () => {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const urlSubTab = searchParams.get('subTab');
        const stakeholder = searchParams.get('stakeholder');
        const tab = searchParams.get('tab') || 'DIRECTORY';

        if (urlSubTab) {
          setActiveSubTab(urlSubTab);
        } else if (stakeholder) {
          const sKey = stakeholder.toUpperCase().startsWith('REQ_')
            ? stakeholder.toUpperCase()
            : `REQ_${stakeholder.toUpperCase()}`;
          setActiveSubTab(`${sKey}:${tab.toUpperCase()}`);
        } else {
          setActiveSubTab('OVERVIEW');
        }
      } catch (err) {
        console.warn('PopState parse error:', err);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const [systemHealth, setSystemHealth] = useState<string>('OPERATIONAL');
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('app-theme') as 'dark' | 'light') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 5000);
    return () => clearInterval(interval);
  }, []);

  const checkHealth = async () => {
    try {
      const res = await ApiService.getHealth();
      setSystemHealth(res.status === 'UP' ? 'OPERATIONAL' : 'DEGRADED');
    } catch {
      setSystemHealth('OFFLINE');
    }
  };

  const handleLogin = (authUser: { name: string; email: string; role: UserRole | 'CONNECT_APP' }) => {
    setUser(authUser);
    localStorage.setItem('auth_user_session', JSON.stringify(authUser));

    // Set default sub-tab based on role
    if (authUser.role === UserRole.SUPPORT_ADMIN || authUser.role === UserRole.SUPER_ADMIN || (authUser.role as any) === 'SUPER_ADMIN' || authUser.role === UserRole.ADMIN) setActiveSubTab('OVERVIEW');
    else if (authUser.role === 'CONNECT_APP') setActiveSubTab('CHAT');
    else if (authUser.role === UserRole.QUERIES_TL) setActiveSubTab('OVERVIEW');
    else if (authUser.role === UserRole.KYC_TL) setActiveSubTab('OVERVIEW');
    else if (authUser.role === UserRole.PAYMENT_TL) setActiveSubTab('OVERVIEW');
    else if (authUser.role === UserRole.QUERY_AGENT || authUser.role === UserRole.KYC_AGENT || authUser.role === UserRole.PAYMENT_AGENT) setActiveSubTab('AGENT_DESK');
    else setActiveSubTab('OVERVIEW');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('auth_user_session');
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // AI Workforce Dedicated Sub-Tabs Whitelist
  const isDedicatedAIWorkforceTab = [
    'COMMAND_CENTER', 'WORKFORCE_OVERVIEW', 'LIVE_STATUS', 'AGENT_DETAIL',
    'DEPT_QUERY', 'DEPT_KYC', 'DEPT_PAYMENT', 'SPEC_COMMUNICATION', 'COMMUNICATION_AI',
    'SPEC_CALLING', 'SPEC_WHATSAPP', 'SPEC_EMAIL', 'SPEC_TRANSLATION', 'SPEC_ESCALATION',
    'AGENT_CONFIG', 'TOOL_MGMT', 'WORKFLOW_MGMT', 'AI_DECISIONS', 'AI_LOGS', 'AI_EVALUATIONS',
    'AI_PERFORMANCE', 'AI_VERSIONS', 'DECISION_REPLAY', 'PROMPT_MGMT', 'AUDIT_CENTER', 'SYSTEM_HEALTH', 'AI_SETTINGS'
  ].includes(activeSubTab);

  // If user is not authenticated, render Login Page
  if (!user) {
    return <LoginPage onLogin={handleLogin} theme={theme} onToggleTheme={toggleTheme} />;
  }

  return (
    <div className="app-layout">
      {/* Left Sidebar Navigation containing all Sub-Tabs */}
      <Sidebar
        user={user}
        activeSubTab={activeSubTab}
        onSelectSubTab={setActiveSubTab}
        systemHealth={systemHealth}
        theme={theme}
        onToggleTheme={toggleTheme}
        onLogout={handleLogout}
      />

      {/* Main Content Area showing exclusively the active sub-tab view */}
      <div className="main-content-wrapper">
        {(activeSubTab === 'CUSTOMER_LOOKUP' || activeSubTab === 'TRACKING_DETAILS') ? (
          <TrackingDetailsView onSelectSubTab={setActiveSubTab} />
        ) : (
          <>
            {(user.role === UserRole.SUPPORT_ADMIN || user.role === UserRole.SUPER_ADMIN || (user.role as any) === 'SUPER_ADMIN' || user.role === UserRole.ADMIN || (user.role as string) === 'SUPER_ADMIN' || (user.role as string) === 'ADMIN') && (
              isDedicatedAIWorkforceTab ? (
                <AIAgentDashboard activeSubTab={activeSubTab} onSelectSubTab={setActiveSubTab} />
              ) : (
                <SuperAdminDashboard activeSubTab={activeSubTab} onSelectSubTab={setActiveSubTab} />
              )
            )}
            {(user.role === UserRole.QUERIES_TL || (user.role as string) === 'QUERIES_TL') && <DepartmentTLDashboards role={UserRole.QUERIES_TL} activeSubTab={activeSubTab} onSelectSubTab={setActiveSubTab} />}
            {(user.role === UserRole.KYC_TL || (user.role as string) === 'KYC_TL') && <DepartmentTLDashboards role={UserRole.KYC_TL} activeSubTab={activeSubTab} onSelectSubTab={setActiveSubTab} />}
            {(user.role === UserRole.PAYMENT_TL || (user.role as string) === 'PAYMENT_TL') && <DepartmentTLDashboards role={UserRole.PAYMENT_TL} activeSubTab={activeSubTab} onSelectSubTab={setActiveSubTab} />}
            {(user.role === UserRole.QUERY_AGENT || (user.role as string) === 'QUERY_AGENT' ||
              user.role === UserRole.KYC_AGENT || (user.role as string) === 'KYC_AGENT' ||
              user.role === UserRole.PAYMENT_AGENT || (user.role as string) === 'PAYMENT_AGENT') && (
              <HumanAgentDashboard role={user.role as any} activeSubTab={activeSubTab} onSelectSubTab={setActiveSubTab} />
            )}
            {user.role === 'CONNECT_APP' && <ConnectAppPortal activeSubTab={activeSubTab} onSelectSubTab={setActiveSubTab} />}
          </>
        )}
      </div>

      {/* GLOBAL TICKET VISION LIFECYCLE TRACKER MODAL */}
      <TicketVisionFlowModal
        ticket={globalVisionTicket}
        onClose={() => setGlobalVisionTicket(null)}
      />
    </div>
  );
}

export default App;

