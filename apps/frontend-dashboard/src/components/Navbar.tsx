import React from 'react';
import { UserRole } from '../types';
import { FORGE_LOGO } from '../logo';
import { Bot, Shield, Users, CreditCard, HelpCircle, Eye, Smartphone, Zap, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole | 'AI_INSPECTOR' | 'CONNECT_APP';
  onRoleChange: (role: any) => void;
  systemHealth: string;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  systemHealth,
  theme,
  onToggleTheme
}) => {
  return (
    <nav className="navbar">
      <div className="nav-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
        <img
          src={FORGE_LOGO}
          alt="FORGE INDIA CONNECT"
          style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid var(--accent-secondary)', objectFit: 'cover', background: '#fff' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="brand-text" style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-brand)', lineHeight: '1.1' }}>
            FORGE INDIA
          </span>
          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700 }}>
            CONNECT PVT. LTD
          </span>
        </div>
        <button
          className="theme-toggle-icon-btn"
          onClick={onToggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          style={{ marginLeft: '0.75rem' }}
        >
          {theme === 'dark' ? <Sun size={18} style={{ color: '#f7b500' }} /> : <Moon size={18} style={{ color: '#002b7f' }} />}
        </button>
      </div>

      <div className="role-switcher">
        <button
          className={`role-btn ${currentRole === UserRole.SUPER_ADMIN ? 'active' : ''}`}
          onClick={() => onRoleChange(UserRole.SUPER_ADMIN)}
        >
          <Shield size={14} /> Super Admin
        </button>

        <button
          className={`role-btn ${currentRole === UserRole.ADMIN ? 'active' : ''}`}
          onClick={() => onRoleChange(UserRole.ADMIN)}
        >
          <Users size={14} /> Admin
        </button>

        <button
          className={`role-btn ${currentRole === UserRole.QUERIES_TL ? 'active' : ''}`}
          onClick={() => onRoleChange(UserRole.QUERIES_TL)}
        >
          <HelpCircle size={14} /> Queries TL
        </button>

        <button
          className={`role-btn ${currentRole === UserRole.KYC_TL ? 'active' : ''}`}
          onClick={() => onRoleChange(UserRole.KYC_TL)}
        >
          <Shield size={14} /> KYC TL
        </button>

        <button
          className={`role-btn ${currentRole === UserRole.PAYMENT_TL ? 'active' : ''}`}
          onClick={() => onRoleChange(UserRole.PAYMENT_TL)}
        >
          <CreditCard size={14} /> Payment TL
        </button>

        <button
          className={`role-btn ${currentRole === 'AI_INSPECTOR' ? 'active' : ''}`}
          onClick={() => onRoleChange('AI_INSPECTOR')}
        >
          <Eye size={14} /> AI Workforce Inspector
        </button>

        <button
          className={`role-btn ${currentRole === 'CONNECT_APP' ? 'active' : ''}`}
          onClick={() => onRoleChange('CONNECT_APP')}
          style={{ background: currentRole === 'CONNECT_APP' ? 'var(--accent-secondary)' : undefined, color: currentRole === 'CONNECT_APP' ? '#fff' : undefined }}
        >
          <Smartphone size={14} /> Connect App (Portal)
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span className="badge badge-success">
          <Zap size={12} /> {systemHealth || 'OPERATIONAL'}
        </span>
      </div>
    </nav>
  );
};
