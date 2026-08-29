import React, { useState } from 'react';
import { UserRole } from '../types';
import { FORGE_LOGO } from '../logo';
import { Bot, Shield, Users, User, HelpCircle, Layers, CreditCard, CheckCircle2, Zap, Eye, EyeOff, Smartphone, Lock, Mail, ArrowRight, Sun, Moon } from 'lucide-react';

interface LoginPageProps {
  onLogin: (user: { name: string; email: string; role: UserRole | 'CONNECT_APP' }) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

interface DemoAccount {
  role: UserRole | 'CONNECT_APP';
  title: string;
  email: string;
  icon: any;
  color: string;
  desc: string;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, theme, onToggleTheme }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('ForgeConnect2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | 'CONNECT_APP'>(UserRole.SUPER_ADMIN);

  const demoAccounts: DemoAccount[] = [
    {
      role: UserRole.SUPER_ADMIN,
      title: 'Super Admin',
      email: 'superadmin@enterprise.ai',
      icon: Shield,
      color: 'var(--text-brand)',
      desc: 'Global AI Workforce Control & Executive Reports'
    },
    {
      role: UserRole.QUERIES_TL,
      title: 'Queries Team Lead',
      email: 'queries.tl@enterprise.ai',
      icon: HelpCircle,
      color: 'var(--text-brand)',
      desc: 'Response Overrides & Escalated Tickets'
    },
    {
      role: UserRole.KYC_TL,
      title: 'KYC Team Lead',
      email: 'kyc.tl@enterprise.ai',
      icon: Layers,
      color: 'var(--text-cyan)',
      desc: 'OCR Blur & Forgery Overrides'
    },
    {
      role: UserRole.PAYMENT_TL,
      title: 'Payment Team Lead',
      email: 'payment.tl@enterprise.ai',
      icon: CreditCard,
      color: 'var(--text-emerald)',
      desc: 'Payment Call Logs & Commission Payouts'
    },
    {
      role: UserRole.QUERY_AGENT,
      title: 'Query Human Agent',
      email: 'query.agent@enterprise.ai',
      icon: User,
      color: 'var(--text-brand)',
      desc: 'Live AI Shadowing, Interception, Re-opening Closed Cases & Direct Calling'
    },
    {
      role: UserRole.KYC_AGENT,
      title: 'KYC Human Officer',
      email: 'kyc.agent@enterprise.ai',
      icon: CheckCircle2,
      color: 'var(--text-cyan)',
      desc: 'Side-by-Side OCR Verification, Blur Overrides & Document Re-Uploads'
    },
    {
      role: UserRole.PAYMENT_AGENT,
      title: 'Payment Human Officer',
      email: 'payment.agent@enterprise.ai',
      icon: Zap,
      color: 'var(--text-emerald)',
      desc: 'UTR Reconciliation, Manual Voice Reminders & Referral Payout Auditing'
    },
    {
      role: 'CONNECT_APP',
      title: 'Connect App Portal',
      email: 'portal@enterprise.ai',
      icon: Smartphone,
      color: 'var(--text-cyan)',
      desc: 'Public Support Gateway & Voice/Chat'
    }
  ];

  const handleQuickLogin = (acc: DemoAccount) => {
    onLogin({
      name: `${acc.title} User`,
      email: acc.email,
      role: acc.role
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const account = demoAccounts.find(a => a.role === selectedRole) || demoAccounts[0];
    onLogin({
      name: account.title,
      email: email || account.email,
      role: selectedRole
    });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: 'var(--bg-dark)' }}>
      <div style={{ width: '100%', maxWidth: '1050px', display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '2rem', alignItems: 'center' }}>
        
        {/* Left Welcome Branding Panel */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
              <img
                src={FORGE_LOGO}
                alt="FORGE INDIA CONNECT PVT. LTD"
                style={{ width: '64px', height: '64px', borderRadius: '50%', border: '3px solid var(--accent-secondary)', objectFit: 'cover', background: '#fff', boxShadow: '0 4px 15px rgba(247, 181, 0, 0.3)' }}
              />
              <div>
                <h1 className="brand-text" style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-brand)', lineHeight: '1.1' }}>
                  FORGE INDIA
                </h1>
                <p style={{ color: 'var(--text-main)', fontSize: '0.88rem', fontWeight: 700, margin: '0.2rem 0 0 0' }}>
                  CONNECT PVT. LTD — <span style={{ color: 'var(--text-amber)' }}>Let's Connect!</span>
                </p>
              </div>
            </div>
            <button
              className="theme-toggle-icon-btn"
              onClick={onToggleTheme}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              style={{ marginLeft: 'auto' }}
            >
              {theme === 'dark' ? <Sun size={18} style={{ color: '#f7b500' }} /> : <Moon size={18} style={{ color: '#002b7f' }} />}
            </button>
          </div>

          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.75rem', lineHeight: '1.3' }}>
            Role-Based Enterprise Portal Login
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            Select your enterprise role account below for direct login. Each user role accesses a dedicated dashboard tailored exclusively to their operational mandate.
          </p>

          {/* Quick One-Click Demo Role Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {demoAccounts.map(acc => {
              const IconComp = acc.icon;
              return (
                <div
                  key={acc.role}
                  className="glass-panel"
                  style={{
                    padding: '0.85rem 1.15rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderColor: selectedRole === acc.role ? 'var(--accent-primary)' : undefined,
                    background: selectedRole === acc.role ? 'rgba(99, 102, 241, 0.08)' : undefined
                  }}
                  onClick={() => {
                    setSelectedRole(acc.role);
                    setEmail(acc.email);
                    if (!password) setPassword('ForgeConnect2026!');
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <IconComp size={18} style={{ color: acc.color }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{acc.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{acc.desc}</div>
                    </div>
                  </div>
                  <button className="btn btn-secondary" style={{ padding: '0.25rem 0.65rem', fontSize: '0.75rem' }} onClick={(e) => { e.stopPropagation(); handleQuickLogin(acc); }}>
                    Login &rarr;
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Form Card */}
        <div className="glass-panel" style={{ padding: '2.25rem' }}>
          <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>Authenticate Account</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            Selected Role: <strong className="text-brand">{demoAccounts.find(a => a.role === selectedRole)?.title}</strong>
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Mail size={14} /> Corporate Email Address
              </label>
              <input
                className="form-input"
                type="email"
                value={email || demoAccounts.find(a => a.role === selectedRole)?.email || ''}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Lock size={14} /> Access Password
              </label>
              <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}>
                <input
                  className="form-input"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter access password"
                  style={{ width: '100%', paddingRight: '2.5rem' }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.25rem',
                    borderRadius: '4px',
                    transition: 'all 0.2s ease',
                    zIndex: 2
                  }}
                  title={showPassword ? 'Hide Password' : 'Show Password'}
                >
                  {showPassword ? <EyeOff size={18} style={{ color: 'var(--text-brand)' }} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button className="btn btn-primary" type="submit" style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem' }}>
              Enter Workspace <ArrowRight size={16} />
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)', fontSize: '0.775rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            Protected by Enterprise AI Authentication & Role-Based Access Control (RBAC)
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
