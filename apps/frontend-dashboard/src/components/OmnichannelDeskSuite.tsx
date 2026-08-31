import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Phone,
  Mail,
  Smartphone,
  Search,
  Send,
  Paperclip,
  Smile,
  Mic,
  MicOff,
  PhoneOff,
  PhoneForwarded,
  Pause,
  Play,
  Download,
  CheckCheck,
  Check,
  Clock,
  User,
  Globe,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  MoreVertical,
  Plus,
  Lock,
  Video,
  Volume2,
  VolumeX,
  FileText,
  Image as ImageIcon,
  Bold,
  Italic,
  Underline,
  List,
  AlignLeft,
  Link2,
  Code,
  Printer,
  Reply,
  Share2,
  AlertCircle,
  Sparkles,
  Shield,
  Layers,
  Info,
  X,
  Trash2,
  Archive,
  Star,
  PhoneCall,
  PhoneOutgoing,
  CheckCircle,
  RefreshCw,
  SendHorizontal,
  AlertTriangle,
  UserCheck
} from 'lucide-react';
import { TicketVisionButton } from './TicketVisionFlowModal';

export type ChannelType = 'LIVE_CHAT' | 'INBOUND_CALLS' | 'EMAIL_INBOX' | 'WHATSAPP';

export const getChannelForTicket = (t: any): ChannelType => {
  if (!t) return 'LIVE_CHAT';
  const channelStr = String(t.channel || '').toUpperCase();
  const agentStr = String(t.aiAgent || t.assignedAgent || '').toUpperCase();
  const catStr = String(t.category || t.topic || t.subject || t.title || '').toUpperCase();
  const stepStr = String(t.workflowStep || '').toUpperCase();

  if (
    channelStr.includes('VOICE') ||
    channelStr.includes('CALL') ||
    channelStr.includes('PHONE') ||
    channelStr.includes('PSTN') ||
    agentStr.includes('VOICE') ||
    agentStr.includes('TWILIO') ||
    catStr.includes('CALL') ||
    catStr.includes('PSTN') ||
    stepStr.includes('VOICE') ||
    stepStr.includes('AUDIO')
  ) {
    return 'INBOUND_CALLS';
  }
  if (
    channelStr.includes('EMAIL') ||
    channelStr.includes('MAIL') ||
    agentStr.includes('EMAIL') ||
    catStr.includes('EMAIL') ||
    catStr.includes('INVOICE') ||
    catStr.includes('GST') ||
    stepStr.includes('EMAIL')
  ) {
    return 'EMAIL_INBOX';
  }
  if (
    channelStr.includes('WHATSAPP') ||
    channelStr.includes('WA') ||
    channelStr.includes('SMS') ||
    agentStr.includes('WHATSAPP') ||
    catStr.includes('WHATSAPP') ||
    stepStr.includes('WHATSAPP')
  ) {
    return 'WHATSAPP';
  }
  return 'LIVE_CHAT';
};

interface OmnichannelDeskProps {
  initialChannel?: ChannelType;
  userRole?: string;
  agentName?: string;
  agentStatus?: string;
  onTicketCreate?: (ticketData: any) => void;
  isSupervisorMode?: boolean;
}

// Hook to dynamically detect and adapt to Light/Dark Mode
function useCurrentTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof document !== 'undefined') {
      const current = document.documentElement.getAttribute('data-theme');
      if (current === 'light' || current === 'dark') return current;
      const stored = localStorage.getItem('app-theme');
      if (stored === 'light' || stored === 'dark') return stored;
    }
    return 'dark';
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const current = document.documentElement.getAttribute('data-theme');
      if (current === 'light' || current === 'dark') {
        setTheme(current);
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  return theme;
}

export const OmnichannelDeskSuite: React.FC<OmnichannelDeskProps> = ({
  initialChannel = 'LIVE_CHAT',
  userRole = 'QUERY_AGENT',
  agentName = 'Alex Rivera',
  agentStatus = 'Available',
  onTicketCreate,
  isSupervisorMode = false
}) => {
  const [activeChannel, setActiveChannel] = useState<ChannelType>(initialChannel);
  const theme = useCurrentTheme();
  const isLight = theme === 'light';

  useEffect(() => {
    if (initialChannel) {
      setActiveChannel(initialChannel);
    }
  }, [initialChannel]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
      {/* CHANNEL STATUS / SUPERVISOR HEADER STRIP */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: isLight ? '#ffffff' : '#0d131f',
        padding: '0.65rem 1rem',
        borderRadius: '12px',
        border: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: isLight ? '0 2px 10px rgba(0,0,0,0.04)' : 'none'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {activeChannel === 'LIVE_CHAT' && (
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: isLight ? '#0284c7' : '#38bdf8', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <MessageSquare size={18} /> Live Web Chat Desk
            </span>
          )}
          {activeChannel === 'INBOUND_CALLS' && (
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: isLight ? '#059669' : '#34d399', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Phone size={18} /> Inbound Voice Telephony Desk
            </span>
          )}
          {activeChannel === 'EMAIL_INBOX' && (
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: isLight ? '#7e22ce' : '#c084fc', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Mail size={18} /> Enterprise Email Inbox Desk
            </span>
          )}
          {activeChannel === 'WHATSAPP' && (
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: isLight ? '#15803d' : '#4ade80', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Smartphone size={18} /> WhatsApp Business Desk
            </span>
          )}
        </div>

        {/* AGENT STATUS CHIP */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {isSupervisorMode && (
            <span style={{
              background: isLight ? '#fef9c3' : 'rgba(234, 179, 8, 0.15)',
              border: isLight ? '1px solid #facc15' : '1px solid rgba(234, 179, 8, 0.4)',
              color: isLight ? '#854d0e' : '#facc15',
              fontSize: '0.72rem',
              padding: '0.25rem 0.65rem',
              borderRadius: '9999px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}>
              <Shield size={12} /> Team Lead Supervisor Mode
            </span>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#fff'
            }}>
              {agentName.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: isLight ? '#0f172a' : 'var(--text-main)' }}>{agentName}</div>
              <div style={{ fontSize: '0.68rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
                {agentStatus}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RENDER THE ACTIVE CHANNEL VIEW */}
      {activeChannel === 'LIVE_CHAT' && <LiveChatView onTicketCreate={onTicketCreate} isSupervisorMode={isSupervisorMode} isLight={isLight} />}
      {activeChannel === 'INBOUND_CALLS' && <InboundCallsView onTicketCreate={onTicketCreate} isSupervisorMode={isSupervisorMode} isLight={isLight} />}
      {activeChannel === 'EMAIL_INBOX' && <EmailInboxView onTicketCreate={onTicketCreate} isSupervisorMode={isSupervisorMode} isLight={isLight} />}
      {activeChannel === 'WHATSAPP' && <WhatsAppView onTicketCreate={onTicketCreate} isSupervisorMode={isSupervisorMode} isLight={isLight} />}
    </div>
  );
};

/* =========================================================================
   1. LIVE CHAT VIEW (IMAGE 1 REFERENCE WITH LIGHT/DARK THEME SUPPORT)
   ========================================================================= */
export const LiveChatView: React.FC<{ onTicketCreate?: (t: any) => void; isSupervisorMode?: boolean; isLight?: boolean }> = ({ onTicketCreate, isSupervisorMode, isLight = false }) => {
  const [activeChats, setActiveChats] = useState([
    {
      id: 'chat-1',
      name: 'Sarah Jenkins',
      email: 'sarah.jenkins@email.com',
      phone: '+1 98765 43210',
      location: 'New York, USA',
      localTime: '10:32 AM',
      page: '/pricing',
      fullUrl: 'https://yourwebsite.com/pricing',
      pageTime: '10:28 AM',
      browser: 'Chrome 124.0.0.0',
      os: 'Windows 11',
      timer: '00:28',
      unread: 2,
      online: true,
      avatarInitial: 'SJ',
      avatarColor: '#3b82f6',
      typing: true,
      previousChats: [
        { id: '#TC-1021', title: 'Pricing query', date: 'May 12, 2024' },
        { id: '#TC-0987', title: 'Login issue', date: 'Apr 28, 2024' }
      ],
      messages: [
        { id: 1, sender: 'CUSTOMER', text: 'Hello, I need help with the pricing plans.', time: '10:30 AM' },
        { id: 2, sender: 'AGENT', text: "Hello Sarah! 👋\nI'd be happy to help you with our pricing plans.", time: '10:30 AM', status: 'READ' },
        { id: 3, sender: 'CUSTOMER', text: 'Do you have any annual discount?', time: '10:30 AM' },
        { id: 4, sender: 'AGENT', text: 'Yes! We offer up to 20% discount on annual plans.', time: '10:31 AM', status: 'READ' }
      ]
    },
    {
      id: 'chat-2',
      name: 'Michael Brown',
      email: 'michael.brown@enterprise.org',
      phone: '+1 91234 56789',
      location: 'Chicago, USA',
      localTime: '09:32 AM',
      page: '/features',
      fullUrl: 'https://yourwebsite.com/features',
      pageTime: '10:15 AM',
      browser: 'Safari 17.2',
      os: 'macOS Sonoma',
      timer: '01:15',
      unread: 1,
      online: true,
      avatarInitial: 'MB',
      avatarColor: '#10b981',
      typing: false,
      previousChats: [{ id: '#TC-0941', title: 'API Integration', date: 'May 04, 2024' }],
      messages: [
        { id: 1, sender: 'CUSTOMER', text: 'Does your platform support automated webhook dispatch?', time: '10:28 AM' },
        { id: 2, sender: 'AGENT', text: 'Yes Michael, our webhook suite dispatches real-time HMAC encrypted payloads.', time: '10:29 AM', status: 'READ' }
      ]
    },
    {
      id: 'chat-3',
      name: 'David Chen',
      email: 'david.chen@email.com',
      phone: '+1 88776 55433',
      location: 'San Francisco, USA',
      localTime: '07:32 AM',
      page: '/login-issue',
      fullUrl: 'https://yourwebsite.com/login-issue',
      pageTime: '10:10 AM',
      browser: 'Firefox 125.0',
      os: 'Ubuntu Linux',
      timer: '02:10',
      unread: 3,
      online: true,
      avatarInitial: 'DC',
      avatarColor: '#8b5cf6',
      typing: false,
      previousChats: [{ id: '#TC-0881', title: 'Password Reset', date: 'Apr 15, 2024' }],
      messages: [
        { id: 1, sender: 'CUSTOMER', text: 'I am getting invalid token upon SSO redirect.', time: '10:25 AM' }
      ]
    },
    {
      id: 'chat-4',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@domain.com',
      phone: '+1 99887 66554',
      location: 'Austin, USA',
      localTime: '09:32 AM',
      page: '/mobile-app',
      fullUrl: 'https://yourwebsite.com/mobile-app',
      pageTime: '09:55 AM',
      browser: 'Chrome Mobile 124',
      os: 'Android 14',
      timer: '03:45',
      unread: 1,
      online: false,
      avatarInitial: 'ER',
      avatarColor: '#ec4899',
      typing: false,
      previousChats: [],
      messages: [
        { id: 1, sender: 'CUSTOMER', text: 'Where can I download the iOS beta client build?', time: '10:20 AM' }
      ]
    },
    {
      id: 'chat-5',
      name: 'James Wilson',
      email: 'james.wilson@corp.net',
      phone: '+1 77665 44332',
      location: 'London, UK',
      localTime: '15:32 PM',
      page: '/payment',
      fullUrl: 'https://yourwebsite.com/payment',
      pageTime: '09:40 AM',
      browser: 'Edge 124.0',
      os: 'Windows 11',
      timer: '05:02',
      unread: 1,
      online: true,
      avatarInitial: 'JW',
      avatarColor: '#f59e0b',
      typing: false,
      previousChats: [{ id: '#TC-0762', title: 'Tax Invoice Inquiry', date: 'Mar 19, 2024' }],
      messages: [
        { id: 1, sender: 'CUSTOMER', text: 'Can you generate an enterprise GST invoice for our remittance?', time: '10:15 AM' }
      ]
    }
  ]);

  const [selectedChat, setSelectedChat] = useState(activeChats[0]);
  const [inputText, setInputText] = useState('');
  const [activeTemplateTab, setActiveTemplateTab] = useState<'CANNED' | 'QUICK_REPLIES'>('CANNED');
  const [templateSearch, setTemplateSearch] = useState('');
  const [showAssignOfficerModal, setShowAssignOfficerModal] = useState(false);
  const [assignedOfficer, setAssignedOfficer] = useState('ROHAN_KYC');
  const [officerHandoverNote, setOfficerHandoverNote] = useState('');
  const [isAssigning, setIsAssigning] = useState(false);
  const [showQueueFilter, setShowQueueFilter] = useState(false);
  const [showCreateTicketModal, setShowCreateTicketModal] = useState(false);
  const [showPreviousChatsModal, setShowPreviousChatsModal] = useState(false);
  const [showVisitorDetailsModal, setShowVisitorDetailsModal] = useState(false);
  const [ticketSubject, setTicketSubject] = useState('Live Web Inquiry: Pricing & Plans');
  const [ticketPriority, setTicketPriority] = useState('MEDIUM');
  const [chatToast, setChatToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setChatToast(msg);
    setTimeout(() => setChatToast(null), 3000);
  };

  const cannedTemplates = [
    { title: 'Welcome Message', text: 'Hi 👋 How can I assist you today?' },
    { title: 'Pricing Information', text: 'We offer flexible pricing plans tailored for small teams to large enterprises.' },
    { title: 'Non-Refundable Policy Terms', text: 'Registration and platform onboarding fees are final and non-refundable per platform terms.' },
    { title: 'Closing Message', text: 'Is there anything else I can help you with?' }
  ];

  const quickReplies = [
    'Yes, annual billing includes a 20% discount!',
    'Let me verify your account permissions right now.',
    'Could you please share your registered email or phone number?',
    'I have generated a support ticket for our engineering team.'
  ];

  const filteredTemplates = cannedTemplates.filter(t =>
    t.title.toLowerCase().includes(templateSearch.toLowerCase()) ||
    t.text.toLowerCase().includes(templateSearch.toLowerCase())
  );

  const handleSend = async () => {
    if (!inputText.trim()) return;
    const sentText = inputText;
    const newMsg = {
      id: Date.now(),
      sender: 'AGENT',
      text: sentText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'SENT'
    };
    setSelectedChat(prev => ({
      ...prev,
      messages: [...prev.messages, newMsg]
    }));
    setInputText('');

    try {
      await fetch('/api/v1/communication/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatId: selectedChat.id, text: sentText, sender: 'AGENT' })
      });
    } catch (e) {}

    // Simulate customer acknowledgement
    setTimeout(() => {
      setSelectedChat(prev => ({
        ...prev,
        typing: false,
        messages: [
          ...prev.messages,
          {
            id: Date.now() + 1,
            sender: 'CUSTOMER',
            text: 'Thank you for the quick response! That is very helpful.',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'RECEIVED'
          }
        ]
      }));
    }, 1400);
  };

  const insertTemplate = (text: string) => {
    setInputText(text);
    showToast('Template inserted into message composer.');
  };

  const handleAssignOfficerSubmit = async () => {
    setIsAssigning(true);
    const officerMap: Record<string, string> = {
      ROHAN_KYC: 'Rohan Mehta (KYC Human Officer)',
      SURESH_PAY: 'Suresh Reddy (Payment Human Officer)',
      PRIYA_SUPPORT: 'Priya Patel (Query Specialist)',
      ALEX_VANCE: 'Alex Vance (Senior Support Desk)'
    };
    const targetName = officerMap[assignedOfficer] || 'Assigned Officer';

    try {
      await fetch('/api/v1/communication/chat/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chatId: selectedChat.id,
          targetOfficer: targetName,
          note: officerHandoverNote,
          supervisor: isSupervisorMode ? 'Team Lead' : 'Support Desk'
        })
      });
    } catch (e) {}

    // Add transfer notice in chat thread
    const transferNoticeMsg = {
      id: Date.now(),
      sender: 'SYSTEM',
      text: `⚡ Conversation delegated to ${targetName}. Reason: ${officerHandoverNote || 'Direct Officer Assignment'}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'SENT'
    };

    setTimeout(() => {
      setIsAssigning(false);
      setShowAssignOfficerModal(false);
      setSelectedChat(prev => ({
        ...prev,
        messages: [...prev.messages, transferNoticeMsg]
      }));
      // Dispatch real-time Supervisor Ping notification to Human Officer workspace
      window.dispatchEvent(new CustomEvent('SUPERVISOR_PING_DISPATCHED', {
        detail: {
          id: `PING-${Date.now().toString().slice(-4)}`,
          ticketId: selectedChat.id,
          customerName: selectedChat.name,
          category: `Live Web Chat (${selectedChat.page || '/support'})`,
          sender: isSupervisorMode ? 'Team Lead Supervisor' : 'Support Desk Supervisor',
          message: `Supervisor Handover: Delegated live chat for ${selectedChat.name}. Guidance: ${officerHandoverNote || 'High priority customer inquiry'}`,
          targetOfficer: assignedOfficer,
          channel: 'LIVE_CHAT',
          timestamp: 'Just Now',
          read: false
        }
      }));

      showToast(`✅ Chat #${selectedChat.id} successfully assigned to ${targetName}`);
      setOfficerHandoverNote('');
    }, 600);
  };

  const handleCreateTicket = () => {
    const newTicket = {
      id: `TCK-C-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: selectedChat.name,
      customerPhone: selectedChat.phone,
      subject: ticketSubject,
      category: 'Web Live Chat Inquiry',
      priority: ticketPriority,
      channel: 'LIVE_CHAT',
      status: 'OPEN',
      assignedAgent: 'Query AI Agent'
    };
    if (onTicketCreate) onTicketCreate(newTicket);
    showToast(`Ticket #${newTicket.id} created for ${selectedChat.name}`);
    setShowCreateTicketModal(false);
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '240px minmax(0, 1fr) 260px',
      gap: '0.75rem',
      background: isLight ? '#ffffff' : '#090d16',
      borderRadius: '12px',
      border: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.08)',
      minHeight: '700px',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
      overflow: 'hidden',
      boxShadow: isLight ? '0 4px 20px rgba(0,0,0,0.06)' : 'none'
    }}>
      {/* COLUMN 1: ACTIVE CHATS LIST */}
      <div style={{
        background: isLight ? '#f8fafc' : '#0d131f',
        borderRight: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          padding: '1rem',
          borderBottom: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: isLight ? '#0f172a' : 'var(--text-main)' }}>
            Active Chats ({activeChats.length})
          </h3>
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowQueueFilter(!showQueueFilter)}
              style={{
                background: 'transparent',
                border: 'none',
                color: isLight ? '#64748b' : 'var(--text-muted)',
                fontSize: '0.78rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.2rem'
              }}
            >
              All Queues <ChevronDown size={14} />
            </button>
            {showQueueFilter && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                background: isLight ? '#ffffff' : '#131b2c',
                border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.1)',
                borderRadius: '6px',
                padding: '0.35rem',
                zIndex: 20,
                width: '130px',
                boxShadow: isLight ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
              }}>
                <div style={{ fontSize: '0.75rem', padding: '0.3rem 0.5rem', cursor: 'pointer', color: isLight ? '#0f172a' : 'var(--text-main)' }}>General Queue</div>
                <div style={{ fontSize: '0.75rem', padding: '0.3rem 0.5rem', cursor: 'pointer', color: isLight ? '#0f172a' : 'var(--text-main)' }}>VIP / Enterprise</div>
                <div style={{ fontSize: '0.75rem', padding: '0.3rem 0.5rem', cursor: 'pointer', color: isLight ? '#0f172a' : 'var(--text-main)' }}>Billing Disputes</div>
              </div>
            )}
          </div>
        </div>

        {/* Chat List Items */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {activeChats.map(c => {
            const isSelected = selectedChat.id === c.id;
            return (
              <div
                key={c.id}
                onClick={() => setSelectedChat(c)}
                style={{
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  cursor: 'pointer',
                  borderBottom: isLight ? '1px solid #f1f5f9' : '1px solid rgba(255, 255, 255, 0.04)',
                  background: isSelected ? (isLight ? '#e0f2fe' : 'rgba(2, 132, 199, 0.12)') : 'transparent',
                  borderLeft: isSelected ? '3px solid #0284c7' : '3px solid transparent',
                  transition: 'background 0.15s ease'
                }}
              >
                {/* Avatar with Online Dot */}
                <div style={{ position: 'relative' }}>
                  <div style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    background: c.avatarColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.85rem'
                  }}>
                    {c.avatarInitial}
                  </div>
                  {c.online && (
                    <span style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      width: 9,
                      height: 9,
                      borderRadius: '50%',
                      background: '#10b981',
                      border: isLight ? '2px solid #ffffff' : '2px solid #0d131f'
                    }}></span>
                  )}
                </div>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: isLight ? '#0f172a' : 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {c.name}
                    </div>
                    <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : 'var(--text-muted)' }}>{c.timer}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.15rem' }}>
                    <span style={{ fontSize: '0.72rem', color: '#0284c7', fontWeight: 600 }}>{c.page}</span>
                    {c.unread > 0 && (
                      <span style={{
                        background: '#0284c7',
                        color: '#fff',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        padding: '0.1rem 0.4rem',
                        borderRadius: '9999px'
                      }}>
                        {c.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{
          padding: '0.85rem',
          borderTop: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.08)',
          textAlign: 'center'
        }}>
          <button style={{
            background: 'transparent',
            border: 'none',
            color: '#0284c7',
            fontSize: '0.78rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}>
            Show All Queues
          </button>
        </div>
      </div>

      {/* COLUMN 2: MAIN CHAT WINDOW */}
      <div style={{ display: 'flex', flexDirection: 'column', background: isLight ? '#f8fafc' : '#090d16' }}>
        {/* Professional Header */}
        <div style={{
          padding: '0.75rem 1rem',
          borderBottom: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: isLight ? '#ffffff' : '#0d131f',
          minHeight: '58px',
          boxSizing: 'border-box',
          gap: '0.75rem'
        }}>
          {/* Left: Visitor Avatar + Name + Online badge + Page */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0, flex: 1 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.85rem',
              fontWeight: 800,
              flexShrink: 0,
              position: 'relative'
            }}>
              {selectedChat.avatarInitial || selectedChat.name.slice(0, 2).toUpperCase()}
              {selectedChat.online && (
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: 9,
                  height: 9,
                  borderRadius: '50%',
                  background: '#10b981',
                  border: isLight ? '2px solid #ffffff' : '2px solid #0d131f'
                }}></span>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem', minWidth: 0, overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <strong style={{
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  color: isLight ? '#0f172a' : 'var(--text-main)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {selectedChat.name}
                </strong>
                <span style={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  color: selectedChat.online ? '#10b981' : '#94a3b8',
                  background: selectedChat.online
                    ? (isLight ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.15)')
                    : (isLight ? '#f1f5f9' : 'rgba(255, 255, 255, 0.05)'),
                  padding: '0.1rem 0.4rem',
                  borderRadius: '10px',
                  whiteSpace: 'nowrap'
                }}>
                  {selectedChat.online ? '● Online' : '○ Offline'}
                </span>
              </div>
              <div style={{
                fontSize: '0.72rem',
                color: isLight ? '#64748b' : 'var(--text-muted)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                Browsing <span style={{ color: '#0284c7', fontWeight: 600 }}>{selectedChat.page}</span>
              </div>
            </div>
          </div>

          {/* Right: Clean, Compact Action Toolbar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
            {/* Details Action */}
            <button
              onClick={() => setShowVisitorDetailsModal(true)}
              style={{
                height: '30px',
                padding: '0 0.55rem',
                borderRadius: '6px',
                border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255, 255, 255, 0.12)',
                background: isLight ? '#f8fafc' : 'rgba(255, 255, 255, 0.04)',
                color: isLight ? '#475569' : 'var(--text-muted)',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
              title="Visitor 360 Information Dossier"
            >
              <Info size={13} color="#0284c7" />
              <span>Details</span>
            </button>

            {/* Assign to Officer Action */}
            <button
              onClick={() => setShowAssignOfficerModal(true)}
              style={{
                height: '30px',
                padding: '0 0.65rem',
                borderRadius: '6px',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                background: isLight ? 'rgba(245, 158, 11, 0.12)' : 'rgba(245, 158, 11, 0.18)',
                color: isLight ? '#b45309' : '#fbbf24',
                fontSize: '0.72rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                whiteSpace: 'nowrap'
              }}
              title="Assign active chat to KYC / Payment / Query Officer"
            >
              <UserCheck size={13} />
              <span>Assign</span>
            </button>

            {/* Vision Flow Tracker Action */}
            <TicketVisionButton
              ticket={{
                id: selectedChat.id,
                ticketNumber: 'TCK-WEB-' + selectedChat.id.toUpperCase(),
                customerName: selectedChat.name,
                departmentLabel: 'Customer Queries Desk',
                status: 'LIVE_AI'
              }}
              size="sm"
            />

            {/* Create Ticket Action */}
            <button
              onClick={() => setShowCreateTicketModal(true)}
              style={{
                height: '30px',
                padding: '0 0.75rem',
                borderRadius: '6px',
                border: 'none',
                background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                color: '#ffffff',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 6px rgba(2, 132, 199, 0.3)'
              }}
            >
              <Plus size={13} />
              <span>Ticket</span>
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div style={{
          flex: 1,
          padding: '1.25rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          background: isLight ? '#f8fafc' : '#090d16'
        }}>
          {selectedChat.messages.map(m => {
            const isAgent = m.sender === 'AGENT';
            return (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isAgent ? 'flex-end' : 'flex-start',
                  maxWidth: '75%',
                  alignSelf: isAgent ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  background: isAgent ? (isLight ? '#0284c7' : '#0369a1') : (isLight ? '#ffffff' : '#172033'),
                  color: isAgent ? '#ffffff' : (isLight ? '#0f172a' : '#ffffff'),
                  padding: '0.75rem 1rem',
                  borderRadius: isAgent ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                  fontSize: '0.875rem',
                  lineHeight: 1.45,
                  boxShadow: isLight ? '0 2px 6px rgba(0,0,0,0.06)' : '0 2px 6px rgba(0,0,0,0.2)',
                  border: isAgent ? 'none' : (isLight ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.06)')
                }}>
                  {m.text}
                </div>
                <div style={{
                  fontSize: '0.68rem',
                  color: isLight ? '#64748b' : 'var(--text-muted)',
                  marginTop: '0.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  <span>{m.time}</span>
                  {isAgent && <CheckCheck size={12} color="#0284c7" />}
                </div>
              </div>
            );
          })}

          {selectedChat.typing && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: isLight ? '#64748b' : 'var(--text-muted)',
              fontSize: '0.75rem',
              fontStyle: 'italic',
              marginTop: '0.5rem'
            }}>
              <span style={{
                display: 'inline-flex',
                gap: '2px'
              }}>
                <span className="typing-dot">●</span>
                <span className="typing-dot">●</span>
                <span className="typing-dot">●</span>
              </span>
              {selectedChat.name.split(' ')[0]} is typing...
            </div>
          )}
        </div>

        {/* Canned Responses & Quick Replies Panel */}
        <div style={{
          background: isLight ? '#ffffff' : '#0d131f',
          borderTop: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.08)',
          padding: '0.75rem 1rem'
        }}>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <button
              onClick={() => setActiveTemplateTab('CANNED')}
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: activeTemplateTab === 'CANNED' ? '2px solid #0284c7' : '2px solid transparent',
                color: activeTemplateTab === 'CANNED' ? '#0284c7' : (isLight ? '#64748b' : 'var(--text-muted)'),
                padding: '0.25rem 0.5rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Canned Responses
            </button>
            <button
              onClick={() => setActiveTemplateTab('QUICK_REPLIES')}
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: activeTemplateTab === 'QUICK_REPLIES' ? '2px solid #0284c7' : '2px solid transparent',
                color: activeTemplateTab === 'QUICK_REPLIES' ? '#0284c7' : (isLight ? '#64748b' : 'var(--text-muted)'),
                padding: '0.25rem 0.5rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Quick Replies
            </button>
          </div>

          {activeTemplateTab === 'CANNED' ? (
            <div>
              <div style={{ position: 'relative', marginBottom: '0.5rem' }}>
                <Search size={14} style={{ position: 'absolute', left: 8, top: 8, color: isLight ? '#94a3b8' : 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={templateSearch}
                  onChange={e => setTemplateSearch(e.target.value)}
                  style={{
                    width: '100%',
                    background: isLight ? '#f8fafc' : '#131b2c',
                    border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '6px',
                    padding: '0.35rem 0.5rem 0.35rem 1.8rem',
                    color: isLight ? '#0f172a' : '#fff',
                    fontSize: '0.75rem'
                  }}
                />
              </div>
              <div style={{
                maxHeight: '90px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem'
              }}>
                {filteredTemplates.map((t, idx) => (
                  <div
                    key={idx}
                    onClick={() => insertTemplate(t.text)}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.35rem 0.6rem',
                      background: isLight ? '#f1f5f9' : 'rgba(255,255,255,0.03)',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.75rem'
                    }}
                  >
                    <strong style={{ color: isLight ? '#0f172a' : 'var(--text-main)', width: '130px' }}>{t.title}</strong>
                    <span style={{ color: isLight ? '#64748b' : 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{t.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', maxHeight: '90px', overflowY: 'auto' }}>
              {quickReplies.map((r, i) => (
                <button
                  key={i}
                  onClick={() => insertTemplate(r)}
                  style={{
                    background: isLight ? '#e0f2fe' : 'rgba(2, 132, 199, 0.1)',
                    border: isLight ? '1px solid #bae6fd' : '1px solid rgba(2, 132, 199, 0.3)',
                    color: '#0284c7',
                    padding: '0.3rem 0.6rem',
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Message Composer */}
        <div style={{
          padding: '0.75rem 1rem',
          borderTop: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.08)',
          background: isLight ? '#ffffff' : '#0d131f',
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem'
        }}>
          <button style={{ background: 'transparent', border: 'none', color: isLight ? '#64748b' : 'var(--text-muted)', cursor: 'pointer' }}>
            <Smile size={18} />
          </button>
          <button style={{ background: 'transparent', border: 'none', color: isLight ? '#64748b' : 'var(--text-muted)', cursor: 'pointer' }}>
            <Paperclip size={18} />
          </button>
          <button style={{ background: 'transparent', border: 'none', color: isLight ? '#64748b' : 'var(--text-muted)', cursor: 'pointer' }}>
            <ImageIcon size={18} />
          </button>
          <input
            type="text"
            placeholder="Type your message..."
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            style={{
              flex: 1,
              background: isLight ? '#f8fafc' : '#131b2c',
              border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '6px',
              padding: '0.55rem 0.85rem',
              color: isLight ? '#0f172a' : '#fff',
              fontSize: '0.85rem'
            }}
          />
          <button
            onClick={handleSend}
            style={{
              background: 'linear-gradient(135deg, #0284c7, #0369a1)',
              border: 'none',
              color: '#fff',
              fontWeight: 700,
              padding: '0.55rem 1.25rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
          >
            Send
          </button>
        </div>
      </div>

      {/* COLUMN 3: VISITOR DETAILS (RIGHT PANEL) */}
      <div style={{
        background: isLight ? '#f8fafc' : '#0d131f',
        borderLeft: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.08)',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        overflowY: 'auto',
        overflowX: 'hidden',
        minWidth: 0,
        maxWidth: '100%',
        boxSizing: 'border-box'
      }}>
        <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: isLight ? '#0f172a' : 'var(--text-main)' }}>
          Visitor Details
        </h3>

        {/* Profile Card */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%', boxSizing: 'border-box' }}>
          <div style={{
            width: 54,
            height: 54,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            fontWeight: 800,
            color: '#fff',
            margin: '0 auto 0.5rem auto'
          }}>
            {selectedChat.avatarInitial}
          </div>
          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: isLight ? '#0f172a' : 'var(--text-main)', width: '100%', wordBreak: 'break-word' }}>
            {selectedChat.name}
          </div>
          <div style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : 'var(--text-muted)', marginTop: '0.15rem', width: '100%', wordBreak: 'break-all' }}>
            {selectedChat.email}
          </div>
          <div style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : 'var(--text-muted)', marginTop: '0.15rem', width: '100%', wordBreak: 'break-word' }}>
            {selectedChat.phone}
          </div>
          <div style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : 'var(--text-muted)', marginTop: '0.2rem' }}>
            {selectedChat.location}
          </div>
          <div style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : 'var(--text-muted)', marginTop: '0.15rem' }}>
            Local Time: {selectedChat.localTime}
          </div>
        </div>

        {/* Browser & OS Card */}
        <div style={{
          background: isLight ? '#ffffff' : '#131b2c',
          borderRadius: '8px',
          padding: '0.75rem',
          border: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.06)',
          boxShadow: isLight ? '0 1px 4px rgba(0,0,0,0.04)' : 'none',
          boxSizing: 'border-box',
          width: '100%'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.35rem' }}>
            <Globe size={15} color="#0284c7" />
            <strong style={{ fontSize: '0.78rem', color: isLight ? '#0f172a' : 'var(--text-main)' }}>Browser & OS</strong>
          </div>
          <div style={{ fontSize: '0.72rem', color: isLight ? '#475569' : 'var(--text-muted)', wordBreak: 'break-word' }}>{selectedChat.browser}</div>
          <div style={{ fontSize: '0.72rem', color: isLight ? '#475569' : 'var(--text-muted)', wordBreak: 'break-word' }}>{selectedChat.os}</div>
        </div>

        {/* Current Page Card */}
        <div style={{
          background: isLight ? '#ffffff' : '#131b2c',
          borderRadius: '8px',
          padding: '0.75rem',
          border: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.06)',
          boxShadow: isLight ? '0 1px 4px rgba(0,0,0,0.04)' : 'none',
          boxSizing: 'border-box',
          width: '100%'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.35rem' }}>
            <ExternalLink size={15} color="#10b981" />
            <strong style={{ fontSize: '0.78rem', color: isLight ? '#0f172a' : 'var(--text-main)' }}>Current Page</strong>
          </div>
          <div style={{ fontSize: '0.72rem', color: '#0284c7', wordBreak: 'break-all', fontWeight: 600, lineHeight: 1.3 }}>
            {selectedChat.fullUrl}
          </div>
          <div style={{ fontSize: '0.68rem', color: isLight ? '#64748b' : 'var(--text-muted)', marginTop: '0.2rem' }}>
            {selectedChat.pageTime}
          </div>
        </div>

        {/* Previous Chats */}
        <div style={{ width: '100%', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <strong style={{ fontSize: '0.8rem', color: isLight ? '#0f172a' : 'var(--text-main)' }}>Previous Chats</strong>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', width: '100%' }}>
            {selectedChat.previousChats.map((p, i) => (
              <div
                key={i}
                style={{
                  background: isLight ? '#ffffff' : '#131b2c',
                  padding: '0.55rem 0.65rem',
                  borderRadius: '6px',
                  border: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.06)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxSizing: 'border-box',
                  width: '100%',
                  gap: '0.35rem'
                }}
              >
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: '0.74rem', fontWeight: 600, color: isLight ? '#0f172a' : 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {p.id} - {p.title}
                  </div>
                </div>
                <span style={{ fontSize: '0.65rem', color: isLight ? '#64748b' : 'var(--text-muted)', flexShrink: 0 }}>{p.date}</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
            <button
              onClick={() => setShowPreviousChatsModal(true)}
              style={{ background: 'transparent', border: 'none', color: '#0284c7', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer' }}
            >
              View All ({selectedChat.previousChats.length + 6})
            </button>
          </div>
        </div>
      </div>

      {/* FLOATING ACTION TOAST */}
      {chatToast && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 99999,
          background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
          color: '#fff',
          padding: '0.65rem 1.1rem',
          borderRadius: '8px',
          fontSize: '0.82rem',
          fontWeight: 700,
          boxShadow: '0 4px 20px rgba(2, 132, 199, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <CheckCircle size={16} />
          {chatToast}
        </div>
      )}

      {/* =========================================================================
         MODAL 0A: VISITOR 360 & ACCOUNT DETAILS MODAL
         ========================================================================= */}
      {showVisitorDetailsModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000
        }}>
          <div style={{
            background: isLight ? '#ffffff' : '#0f172a',
            border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '16px',
            width: '520px',
            maxWidth: '92vw',
            padding: '1.5rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.65rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.95rem'
                }}>
                  {selectedChat.avatarInitial || selectedChat.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <strong style={{ fontSize: '1.05rem', color: isLight ? '#0f172a' : '#fff' }}>
                    {selectedChat.name}
                  </strong>
                  <div style={{ fontSize: '0.74rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    ● {selectedChat.online ? 'Online Visitor Session' : 'Offline'} • IP Verified
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowVisitorDetailsModal(false)}
                style={{ background: 'transparent', border: 'none', color: isLight ? '#64748b' : 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Grid Information */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div style={{ background: isLight ? '#f8fafc' : '#1e293b', padding: '0.75rem', borderRadius: '8px', border: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize: '0.68rem', color: isLight ? '#64748b' : 'var(--text-muted)', display: 'block', fontWeight: 700 }}>EMAIL ADDRESS</span>
                <strong style={{ fontSize: '0.82rem', color: isLight ? '#0f172a' : '#fff' }}>{selectedChat.email || 'sarah.jenkins@email.com'}</strong>
              </div>

              <div style={{ background: isLight ? '#f8fafc' : '#1e293b', padding: '0.75rem', borderRadius: '8px', border: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize: '0.68rem', color: isLight ? '#64748b' : 'var(--text-muted)', display: 'block', fontWeight: 700 }}>PHONE NUMBER</span>
                <strong style={{ fontSize: '0.82rem', color: isLight ? '#0f172a' : '#fff' }}>{selectedChat.phone || '+1 98765 43210'}</strong>
              </div>

              <div style={{ background: isLight ? '#f8fafc' : '#1e293b', padding: '0.75rem', borderRadius: '8px', border: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize: '0.68rem', color: isLight ? '#64748b' : 'var(--text-muted)', display: 'block', fontWeight: 700 }}>GEOGRAPHIC LOCATION</span>
                <strong style={{ fontSize: '0.82rem', color: isLight ? '#0f172a' : '#fff' }}>{selectedChat.location || 'New York, USA'}</strong>
              </div>

              <div style={{ background: isLight ? '#f8fafc' : '#1e293b', padding: '0.75rem', borderRadius: '8px', border: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize: '0.68rem', color: isLight ? '#64748b' : 'var(--text-muted)', display: 'block', fontWeight: 700 }}>LOCAL VISITOR TIME</span>
                <strong style={{ fontSize: '0.82rem', color: isLight ? '#0f172a' : '#fff' }}>{selectedChat.localTime || '10:32 AM'}</strong>
              </div>
            </div>

            {/* Browser & Active URL session */}
            <div style={{ background: isLight ? '#f8fafc' : '#1e293b', padding: '0.75rem', borderRadius: '8px', border: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <span style={{ fontSize: '0.68rem', color: isLight ? '#64748b' : 'var(--text-muted)', fontWeight: 700 }}>SESSION ENVIRONMENT & CURRENT URL</span>
              <div style={{ fontSize: '0.78rem', color: '#0284c7', fontWeight: 700 }}>
                {selectedChat.fullUrl || 'https://yourwebsite.com/pricing'}
              </div>
              <div style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : 'var(--text-muted)' }}>
                Browser: <strong>{selectedChat.browser || 'Chrome 124.0.0.0'}</strong> • OS: <strong>{selectedChat.os || 'Windows 11'}</strong>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', borderTop: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem' }}>
              <button
                onClick={() => {
                  setShowVisitorDetailsModal(false);
                  setShowPreviousChatsModal(true);
                }}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: '6px',
                  border: isLight ? '1px solid #0284c7' : '1px solid rgba(2, 132, 199, 0.4)',
                  background: 'rgba(2, 132, 199, 0.12)',
                  color: '#0284c7',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <Clock size={13} /> View Historical Transcripts (5)
              </button>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(`${selectedChat.name} - ${selectedChat.phone} - ${selectedChat.email}`);
                    showToast('Visitor profile copied to clipboard.');
                  }}
                  style={{
                    padding: '0.45rem 0.85rem',
                    borderRadius: '6px',
                    border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.15)',
                    background: 'transparent',
                    color: isLight ? '#475569' : 'var(--text-muted)',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  Copy Profile
                </button>
                <button
                  onClick={() => setShowVisitorDetailsModal(false)}
                  style={{
                    padding: '0.45rem 1.1rem',
                    borderRadius: '6px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                    color: '#fff',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
         MODAL 0B: ASSIGN LIVE CHAT TO HUMAN OFFICER
         ========================================================================= */}
      {showAssignOfficerModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000
        }}>
          <div style={{
            background: isLight ? '#ffffff' : '#0f172a',
            border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '16px',
            width: '460px',
            maxWidth: '92vw',
            padding: '1.5rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: 34,
                  height: 34,
                  borderRadius: '8px',
                  background: 'rgba(245, 158, 11, 0.15)',
                  color: '#f59e0b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <UserCheck size={20} />
                </div>
                <div>
                  <strong style={{ fontSize: '1.05rem', color: isLight ? '#0f172a' : '#fff' }}>Assign Chat to Officer</strong>
                  <span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : 'var(--text-muted)', display: 'block' }}>
                    Visitor: <strong>{selectedChat.name}</strong> ({selectedChat.id})
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowAssignOfficerModal(false)}
                style={{ background: 'transparent', border: 'none', color: isLight ? '#64748b' : 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Target Officer Select */}
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: isLight ? '#475569' : 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Select Target Human Officer
              </label>
              <select
                value={assignedOfficer}
                onChange={e => setAssignedOfficer(e.target.value)}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '0.6rem 0.75rem',
                  borderRadius: '8px',
                  border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.15)',
                  background: isLight ? '#f8fafc' : '#1e293b',
                  color: isLight ? '#0f172a' : '#fff',
                  fontSize: '0.84rem',
                  fontWeight: 600
                }}
              >
                <option value="ROHAN_KYC">👤 Rohan Mehta — Senior KYC Verification Officer</option>
                <option value="SURESH_PAY">💳 Suresh Reddy — Senior Payment Settlement Officer</option>
                <option value="PRIYA_SUPPORT">💬 Priya Patel — Frontline Support & Triage Officer</option>
                <option value="ALEX_VANCE">⚡ Alex Vance — Level 2 Technical Support Lead</option>
              </select>
            </div>

            {/* Handover Note */}
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: isLight ? '#475569' : 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Supervisor Handover Guidance / Internal Note
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Customer has document upload question regarding Aadhaar OCR blur. Please assist directly."
                value={officerHandoverNote}
                onChange={e => setOfficerHandoverNote(e.target.value)}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '0.55rem 0.75rem',
                  borderRadius: '8px',
                  border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.15)',
                  background: isLight ? '#f8fafc' : '#1e293b',
                  color: isLight ? '#0f172a' : '#fff',
                  fontSize: '0.8rem',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            {/* Modal Buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.65rem', marginTop: '0.35rem' }}>
              <button
                onClick={() => setShowAssignOfficerModal(false)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.15)',
                  background: 'transparent',
                  color: isLight ? '#475569' : 'var(--text-muted)',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Cancel
              </button>
              <button
                disabled={isAssigning}
                onClick={handleAssignOfficerSubmit}
                style={{
                  padding: '0.5rem 1.4rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: '#000',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)'
                }}
              >
                <UserCheck size={16} />
                {isAssigning ? 'Assigning...' : 'Assign & Transfer Chat'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: CREATE TICKET FROM CHAT */}
      {showCreateTicketModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000
        }}>
          <div style={{
            background: isLight ? '#ffffff' : '#0f172a',
            border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '16px',
            width: '460px',
            padding: '1.5rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '1rem', color: isLight ? '#0f172a' : '#fff' }}>Create Ticket from Live Web Chat</strong>
                <span style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : 'var(--text-muted)', display: 'block' }}>
                  Visitor: <strong>{selectedChat.name}</strong> ({selectedChat.email})
                </span>
              </div>
              <button
                onClick={() => setShowCreateTicketModal(false)}
                style={{ background: 'transparent', border: 'none', color: isLight ? '#64748b' : 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: isLight ? '#475569' : 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                Subject / Issue Summary
              </label>
              <input
                type="text"
                value={ticketSubject}
                onChange={e => setTicketSubject(e.target.value)}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '6px',
                  border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.15)',
                  background: isLight ? '#f8fafc' : '#1e293b',
                  color: isLight ? '#0f172a' : '#fff',
                  fontSize: '0.82rem'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: isLight ? '#475569' : 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                  Category
                </label>
                <select
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '0.5rem',
                    borderRadius: '6px',
                    border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.15)',
                    background: isLight ? '#f8fafc' : '#1e293b',
                    color: isLight ? '#0f172a' : '#fff',
                    fontSize: '0.78rem'
                  }}
                >
                  <option>Pricing & Plan Query</option>
                  <option>Account Registration</option>
                  <option>Technical SSO Error</option>
                  <option>Payment Gateway Issue</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: isLight ? '#475569' : 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                  Priority Level
                </label>
                <select
                  value={ticketPriority}
                  onChange={e => setTicketPriority(e.target.value)}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '0.5rem',
                    borderRadius: '6px',
                    border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.15)',
                    background: isLight ? '#f8fafc' : '#1e293b',
                    color: isLight ? '#0f172a' : '#fff',
                    fontSize: '0.78rem'
                  }}
                >
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                  <option value="CRITICAL">CRITICAL</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.65rem' }}>
              <button
                onClick={() => setShowCreateTicketModal(false)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.15)',
                  background: 'transparent',
                  color: isLight ? '#475569' : 'var(--text-muted)',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTicket}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                  color: '#fff',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(2, 132, 199, 0.4)'
                }}
              >
                Create Ticket
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: PREVIOUS CHATS VIEW ALL MODAL */}
      {showPreviousChatsModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000
        }}>
          <div style={{
            background: isLight ? '#ffffff' : '#0f172a',
            border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '16px',
            width: '560px',
            padding: '1.5rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '1rem', color: isLight ? '#0f172a' : '#fff' }}>
                  Previous Chat Transcripts ({selectedChat.name})
                </strong>
                <span style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : 'var(--text-muted)', display: 'block' }}>
                  Historical web conversations & support sessions
                </span>
              </div>
              <button
                onClick={() => setShowPreviousChatsModal(false)}
                style={{ background: 'transparent', border: 'none', color: isLight ? '#64748b' : 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', maxHeight: '340px', overflowY: 'auto' }}>
              {[
                { id: '#TC-1021', title: 'Pricing & discount query', date: 'May 12, 2024', status: 'RESOLVED', agent: 'AI Agent' },
                { id: '#TC-0987', title: 'SSO login invalid token', date: 'Apr 28, 2024', status: 'RESOLVED', agent: 'Alex Vance' },
                { id: '#TC-0845', title: 'Enterprise invoice breakdown', date: 'Mar 15, 2024', status: 'RESOLVED', agent: 'Finance Desk' },
                { id: '#TC-0712', title: 'KYC Document verification inquiry', date: 'Feb 02, 2024', status: 'RESOLVED', agent: 'Suresh Reddy' },
                { id: '#TC-0604', title: 'Onboarding walkthrough assistance', date: 'Jan 10, 2024', status: 'RESOLVED', agent: 'Sarah Jenkins' }
              ].map((p, idx) => (
                <div
                  key={idx}
                  style={{
                    background: isLight ? '#f8fafc' : '#1e293b',
                    border: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '8px',
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <strong style={{ fontSize: '0.82rem', color: isLight ? '#0f172a' : '#fff' }}>{p.id} - {p.title}</strong>
                      <span style={{ fontSize: '0.65rem', fontWeight: 800, padding: '0.1rem 0.4rem', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                        {p.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : 'var(--text-muted)', marginTop: '2px' }}>
                      Handled by: {p.agent} • {p.date}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      showToast(`Viewing transcript for ${p.id}...`);
                      setShowPreviousChatsModal(false);
                    }}
                    style={{
                      background: isLight ? '#e0f2fe' : 'rgba(2, 132, 199, 0.15)',
                      border: '1px solid rgba(2, 132, 199, 0.3)',
                      color: '#0284c7',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '0.35rem 0.65rem',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   2. INBOUND CALLS VIEW (IMAGE 2 REFERENCE WITH FULL MODALS & BACKEND FUNCTIONALITY)
   ========================================================================= */
export const InboundCallsView: React.FC<{ onTicketCreate?: (t: any) => void; isSupervisorMode?: boolean; isLight?: boolean }> = ({ onTicketCreate, isSupervisorMode, isLight = false }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isOnHold, setIsOnHold] = useState(false);
  const [showKeypad, setShowKeypad] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showQueueModal, setShowQueueModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showCreateTicketModal, setShowCreateTicketModal] = useState(false);
  const [dialedDigits, setDialedDigits] = useState('');
  const [transferTarget, setTransferTarget] = useState<'AI_BOT' | 'ALEX_VANCE' | 'SARAH_TL' | 'SURESH_KYC' | 'PAYMENT_DESK' | 'CUSTOM'>('AI_BOT');
  const [transferType, setTransferType] = useState<'WARM' | 'COLD'>('WARM');
  const [transferNote, setTransferNote] = useState('');
  const [customPhone, setCustomPhone] = useState('');
  const [callTimer, setCallTimer] = useState(204); // 00:03:24 in seconds
  const [isCallActive, setIsCallActive] = useState(true);
  const [notes, setNotes] = useState('');
  const [isPlayingRecording, setIsPlayingRecording] = useState(false);
  const [recordingProgress, setRecordingProgress] = useState(0);
  const [actionToast, setActionToast] = useState<string | null>(null);
  const [showOutboundDialerModal, setShowOutboundDialerModal] = useState(false);
  const [outboundPhone, setOutboundPhone] = useState('');
  const [outboundName, setOutboundName] = useState('');
  const [outboundPurpose, setOutboundPurpose] = useState('Customer Support Follow-up');
  const [outboundCountryCode, setOutboundCountryCode] = useState('+1');
  const [isDialingOutbound, setIsDialingOutbound] = useState(false);

  // Active caller state (supports switching from Queue)
  const [activeCaller, setActiveCaller] = useState({
    name: 'Emily Rodriguez',
    phone: '+1 98765 43210',
    location: 'New York, USA',
    ticketId: 'TCK-VOICE-8822',
    accountType: 'Enterprise Vendor Partner',
    avatarInitial: 'ER'
  });

  const [ticketSubject, setTicketSubject] = useState('Payment Gateway Timeout on Checkout');
  const [ticketCategory, setTicketCategory] = useState('Payment Resolution & Gateway Retry');
  const [ticketPriority, setTicketPriority] = useState('HIGH');

  // Trigger Action Toast helper
  const showToast = (msg: string) => {
    setActionToast(msg);
    setTimeout(() => setActionToast(null), 3500);
  };

  // Play realistic DTMF dual-tone beep
  const playDtmfTone = (digit: string) => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        const ctx = new AudioContextClass();
        const dtmfFreqs: Record<string, [number, number]> = {
          '1': [697, 1209], '2': [697, 1336], '3': [697, 1477],
          '4': [770, 1209], '5': [770, 1336], '6': [770, 1477],
          '7': [852, 1209], '8': [852, 1336], '9': [852, 1477],
          '*': [941, 1209], '0': [941, 1336], '#': [941, 1477]
        };
        const freqs = dtmfFreqs[digit] || [700, 1200];
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        gain.gain.value = 0.08;
        osc1.frequency.value = freqs[0];
        osc2.frequency.value = freqs[1];
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);
        osc1.start();
        osc2.start();
        setTimeout(() => {
          try {
            osc1.stop();
            osc2.stop();
            ctx.close();
          } catch (e) {}
        }, 140);
      }
    } catch (e) {}
  };

  const handleDigitPress = (d: string) => {
    playDtmfTone(d);
    setDialedDigits(prev => prev + d);
  };

  const handleSendDtmf = async () => {
    if (!dialedDigits) return;
    try {
      await fetch('/api/v1/communication/telephony/dtmf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callId: activeCaller.ticketId, digit: dialedDigits })
      });
    } catch (e) {}
    showToast(`Transmitted DTMF Tones [ ${dialedDigits} ] to carrier trunk`);
    setDialedDigits('');
    setShowKeypad(false);
  };

  const handleCompleteTransfer = async () => {
    const targetMap: Record<string, string> = {
      AI_BOT: 'Autonomous Query AI Bot (Gemini 1.5 Pro)',
      ALEX_VANCE: 'Alex Vance (Senior Query Specialist)',
      SARAH_TL: 'Sarah Jenkins (Queries Team Lead)',
      SURESH_KYC: 'Suresh Reddy (Senior KYC Officer)',
      PAYMENT_DESK: 'Payment Disputes & Wire Escalation Desk',
      CUSTOM: customPhone || '+1 (555) 019-2834'
    };
    const targetName = targetMap[transferTarget];
    try {
      await fetch('/api/v1/communication/telephony/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          callId: activeCaller.ticketId,
          target: targetName,
          transferType,
          note: transferNote
        })
      });
    } catch (e) {}

    showToast(`Call for ${activeCaller.name} transferred to ${targetName} (${transferType})`);
    setShowTransferModal(false);
    setTransferNote('');
  };

  const handleSaveNotes = async () => {
    if (!notes.trim()) {
      showToast('Please type a note before saving.');
      return;
    }
    try {
      await fetch('/api/v1/communication/telephony/save-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          callId: activeCaller.ticketId,
          customerName: activeCaller.name,
          notes
        })
      });
    } catch (e) {}
    showToast(`Call notes saved to ${activeCaller.name} CRM profile & ticket ${activeCaller.ticketId}`);
  };

  const handleMakeOutboundCall = async (targetNumber?: string, targetCustName?: string) => {
    const finalPhone = targetNumber || (outboundCountryCode + ' ' + outboundPhone.trim());
    const finalName = targetCustName || outboundName.trim() || 'Outbound Contact';

    if (!finalPhone || finalPhone.length < 5) {
      showToast('Please enter a valid phone number to dial.');
      return;
    }

    setIsDialingOutbound(true);
    showToast(`📞 Dialing outbound to ${finalName} (${finalPhone})...`);

    try {
      await fetch('/api/v1/communication/telephony/outbound-dial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toPhone: finalPhone,
          customerName: finalName,
          purpose: outboundPurpose,
          callerId: '+1 800 555 0199',
          role: isSupervisorMode ? 'QUERIES_TL' : 'QUERY_HUMAN_AGENT'
        })
      });
    } catch (e) {}

    // Simulate connection
    setTimeout(() => {
      setIsDialingOutbound(false);
      setActiveCaller({
        name: finalName,
        phone: finalPhone,
        location: 'Outbound Direct Line',
        ticketId: `TCK-OUT-${Math.floor(1000 + Math.random() * 9000)}`,
        accountType: 'Outbound Customer Session',
        avatarInitial: finalName.slice(0, 2).toUpperCase()
      });
      setIsCallActive(true);
      setIsOnHold(false);
      setCallTimer(0);
      setShowOutboundDialerModal(false);
      showToast(`✅ Outbound call connected with ${finalName}`);
    }, 1200);
  };

  const handleCreateTicketSubmit = () => {
    const newTicket = {
      id: `TCK-V-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: activeCaller.name,
      customerPhone: activeCaller.phone,
      subject: ticketSubject,
      category: ticketCategory,
      priority: ticketPriority,
      channel: 'VOICE_TWILIO',
      status: 'OPEN',
      assignedAgent: 'Query AI (Voice Bot)'
    };
    if (onTicketCreate) {
      onTicketCreate(newTicket);
    }
    showToast(`Ticket #${newTicket.id} created successfully for ${activeCaller.name}`);
    setShowCreateTicketModal(false);
  };

  const handleAnswerQueueCall = (q: any) => {
    setActiveCaller({
      name: q.customerName || 'Alexander Hayes',
      phone: q.phone,
      location: 'Enterprise Gateway',
      ticketId: `TCK-${q.id || '8835'}`,
      accountType: q.category || 'General Inbound Call',
      avatarInitial: (q.customerName || 'A').charAt(0)
    });
    setCallTimer(0);
    setIsCallActive(true);
    setIsOnHold(false);
    setShowQueueModal(false);
    showToast(`Connected to queue caller ${q.phone} (${q.customerName || 'Customer'})`);
  };

  useEffect(() => {
    let interval: any = null;
    if (isCallActive && !isOnHold) {
      interval = setInterval(() => {
        setCallTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive, isOnHold]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const transcript = [
    { speaker: activeCaller.name, time: '10:30 AM', text: "Hi, I'm facing an issue while trying to make a payment for my agent onboarding fee." },
    { speaker: 'Agent', time: '10:30 AM', text: "I'm sorry to hear that. Could you please tell me the error you're seeing on the payment gateway?" },
    { speaker: activeCaller.name, time: '10:31 AM', text: 'It says "Payment failed - OTP timed out" even though my card is valid.' },
    { speaker: 'Agent', time: '10:31 AM', text: 'Let me check this for you. I am generating a fresh 30-minute secure checkout link now.' }
  ];

  const callQueue = [
    { id: 'Q-101', customerName: 'Alexander Hayes', phone: '+1 98765 11111', waitTime: '02:15', priority: 'HIGH', category: 'Billing Dispute' },
    { id: 'Q-102', customerName: 'Maria Garcia', phone: '+1 98765 22222', waitTime: '01:40', priority: 'MEDIUM', category: 'KYC Verification' },
    { id: 'Q-103', customerName: 'Liam Chen', phone: '+1 98765 33333', waitTime: '00:55', priority: 'LOW', category: 'Fee Inquiry' },
    { id: 'Q-104', customerName: 'Rachel Green', phone: '+1 98765 44444', waitTime: '00:30', priority: 'CRITICAL', category: 'Account Issue' },
    { id: 'Q-105', customerName: 'Lucas Vance', phone: '+1 98765 55555', waitTime: '00:15', priority: 'MEDIUM', category: 'Invoice Query' }
  ];

  const callHistory = [
    { id: 'CH-8801', date: 'May 20, 2024', time: '02:30 PM', duration: '04:12', customerName: 'Emily Rodriguez', phone: '+1 98765 43210', outcome: 'Resolved by AI', agent: 'Voice Bot AI', sentiment: 'POSITIVE' },
    { id: 'CH-8802', date: 'May 18, 2024', time: '10:16 AM', duration: '05:43', customerName: 'David Miller', phone: '+1 800 555 0102', outcome: 'Transferred to Supervisor', agent: 'Alex Vance', sentiment: 'NEUTRAL' },
    { id: 'CH-8803', date: 'May 10, 2024', time: '10:05 AM', duration: '03:21', customerName: 'Frank Miller', phone: '+91 99881 22334', outcome: 'Payment Link Delivered', agent: 'Payment Bot', sentiment: 'POSITIVE' },
    { id: 'CH-8804', date: 'May 08, 2024', time: '04:45 PM', duration: '06:18', customerName: 'Sophia Chen', phone: '+91 98765 43210', outcome: 'KYC Verified', agent: 'Suresh Reddy', sentiment: 'POSITIVE' },
    { id: 'CH-8805', date: 'May 02, 2024', time: '11:20 AM', duration: '02:45', customerName: 'James Wilson', phone: '+1 77665 44332', outcome: 'Refund Policy Advised', agent: 'Sarah Jenkins', sentiment: 'RESOLVED' }
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      background: isLight ? '#ffffff' : '#090d16',
      borderRadius: '12px',
      border: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.08)',
      padding: '1.25rem',
      boxShadow: isLight ? '0 4px 20px rgba(0,0,0,0.06)' : 'none',
      position: 'relative'
    }}>

      {/* FLOATING ACTION TOAST */}
      {actionToast && (
        <div style={{
          position: 'absolute',
          top: '16px',
          right: '24px',
          zIndex: 999,
          background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
          color: '#fff',
          padding: '0.65rem 1.1rem',
          borderRadius: '8px',
          fontSize: '0.82rem',
          fontWeight: 700,
          boxShadow: '0 4px 20px rgba(2, 132, 199, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <CheckCircle size={16} />
          {actionToast}
        </div>
      )}

      {/* HOLD BANNER NOTICE */}
      {isOnHold && isCallActive && (
        <div style={{
          background: 'rgba(234, 179, 8, 0.12)',
          border: '1px solid rgba(234, 179, 8, 0.4)',
          borderRadius: '8px',
          padding: '0.55rem 1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: isLight ? '#854d0e' : '#facc15',
          fontSize: '0.8rem',
          fontWeight: 700
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Pause size={16} />
            <span>Call is currently ON HOLD • Caller is hearing holding music</span>
          </div>
          <button
            onClick={() => {
              setIsOnHold(false);
              showToast('Call resumed from hold.');
            }}
            style={{
              background: '#facc15',
              border: 'none',
              color: '#000',
              fontWeight: 800,
              fontSize: '0.74rem',
              padding: '0.3rem 0.75rem',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Resume Call
          </button>
        </div>
      )}

      {/* TOP ACTIVE CALL BANNER */}
      <div style={{
        background: isLight ? '#f8fafc' : '#0d131f',
        borderRadius: '12px',
        border: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.08)',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        {/* Banner Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: isLight ? '#0f172a' : 'var(--text-main)' }}>
              Active Call
            </h2>
            <span style={{
              background: isCallActive ? (isLight ? '#dcfce7' : 'rgba(16, 185, 129, 0.2)') : (isLight ? '#fee2e2' : 'rgba(239, 68, 68, 0.2)'),
              border: isCallActive ? '1px solid #10b981' : '1px solid #ef4444',
              color: isCallActive ? (isLight ? '#047857' : '#34d399') : '#ef4444',
              fontSize: '0.72rem',
              fontWeight: 700,
              padding: '0.15rem 0.5rem',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}>
              ● {isCallActive ? (isOnHold ? 'On Hold' : 'Live') : 'Ended'}
            </span>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0284c7', fontFamily: 'monospace' }}>
              00:{formatTimer(callTimer)}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <button
              onClick={() => setShowOutboundDialerModal(true)}
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                border: 'none',
                color: '#fff',
                fontSize: '0.78rem',
                fontWeight: 700,
                padding: '0.45rem 0.95rem',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.35)'
              }}
            >
              <PhoneOutgoing size={14} /> Make Outbound Call
            </button>
            <TicketVisionButton
              ticket={{
                id: activeCaller.ticketId,
                ticketNumber: activeCaller.ticketId,
                customerName: activeCaller.name,
                customerPhone: activeCaller.phone,
                departmentLabel: 'Voice Operations',
                status: isCallActive ? 'LIVE_AI' : 'CLOSED'
              }}
              size="sm"
            />
            <button
              onClick={() => setShowCreateTicketModal(true)}
              style={{
                background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                border: 'none',
                color: '#fff',
                fontSize: '0.78rem',
                fontWeight: 600,
                padding: '0.45rem 0.85rem',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <Plus size={14} /> Create New Ticket
            </button>
          </div>
        </div>

        {/* Caller Info, Waveform & In-Call Actions */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '240px 1fr auto',
          alignItems: 'center',
          gap: '1.5rem',
          padding: '0.5rem 0'
        }}>
          {/* Caller Details */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: 46,
              height: 46,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ec4899, #f43f5e)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 800,
              fontSize: '1.1rem'
            }}>
              {activeCaller.avatarInitial}
            </div>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: isLight ? '#0f172a' : 'var(--text-main)' }}>{activeCaller.name}</div>
              <div style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : 'var(--text-muted)' }}>{activeCaller.phone}</div>
              <div style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : 'var(--text-muted)' }}>{activeCaller.location}</div>
            </div>
          </div>

          {/* Animated Audio Waveform Visualizer */}
          <div style={{
            height: '42px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            background: isLight ? '#e6f4ea' : 'rgba(16, 185, 129, 0.05)',
            borderRadius: '8px',
            padding: '0 1rem'
          }}>
            {[18, 28, 12, 34, 40, 22, 14, 30, 36, 16, 26, 38, 12, 28, 32, 20, 36, 18, 30, 24, 14, 34, 28, 16].map((h, i) => (
              <span
                key={i}
                style={{
                  width: '3px',
                  height: isCallActive && !isOnHold ? `${h}px` : '4px',
                  background: isCallActive && !isOnHold ? '#10b981' : '#94a3b8',
                  borderRadius: '2px',
                  transition: 'height 0.2s ease'
                }}
              />
            ))}
          </div>

          {/* Action Control Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={() => {
                setIsMuted(!isMuted);
                showToast(isMuted ? 'Microphone unmuted.' : 'Microphone muted.');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.5rem 0.85rem',
                borderRadius: '8px',
                border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.1)',
                background: isMuted ? (isLight ? '#fee2e2' : 'rgba(239, 68, 68, 0.2)') : (isLight ? '#ffffff' : '#131b2c'),
                color: isMuted ? '#ef4444' : (isLight ? '#0f172a' : 'var(--text-main)'),
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {isMuted ? <MicOff size={15} /> : <Mic size={15} />} Mute
            </button>

            <button
              onClick={() => {
                setIsOnHold(!isOnHold);
                showToast(isOnHold ? 'Call resumed from hold.' : 'Call placed on hold.');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.5rem 0.85rem',
                borderRadius: '8px',
                border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.1)',
                background: isOnHold ? (isLight ? '#fef9c3' : 'rgba(234, 179, 8, 0.2)') : (isLight ? '#ffffff' : '#131b2c'),
                color: isOnHold ? (isLight ? '#854d0e' : '#facc15') : (isLight ? '#0f172a' : 'var(--text-main)'),
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Pause size={15} /> Hold
            </button>

            <button
              onClick={() => setShowKeypad(!showKeypad)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.5rem 0.85rem',
                borderRadius: '8px',
                border: showKeypad ? '1.5px solid #0284c7' : (isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.1)'),
                background: showKeypad ? (isLight ? '#e0f2fe' : 'rgba(2, 132, 199, 0.2)') : (isLight ? '#ffffff' : '#131b2c'),
                color: showKeypad ? '#0284c7' : (isLight ? '#0f172a' : 'var(--text-main)'),
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Keypad
            </button>

            <button
              onClick={() => setShowTransferModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.5rem 0.85rem',
                borderRadius: '8px',
                border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.1)',
                background: isLight ? '#ffffff' : '#131b2c',
                color: isLight ? '#0f172a' : 'var(--text-main)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <PhoneForwarded size={15} /> Transfer
            </button>

            {isCallActive ? (
              <button
                onClick={() => {
                  setIsCallActive(false);
                  showToast(`Call ended with ${activeCaller.name}. Duration: ${formatTimer(callTimer)}`);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.5rem 1.1rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                  color: '#fff',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(239, 68, 68, 0.4)'
                }}
              >
                <PhoneOff size={15} /> End Call
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsCallActive(true);
                  setCallTimer(0);
                  showToast(`Outbound call initiated to ${activeCaller.phone}... Connected.`);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.5rem 1.1rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: '#fff',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(16, 185, 129, 0.4)'
                }}
              >
                <PhoneCall size={15} /> Re-Dial Call
              </button>
            )}
          </div>
        </div>
      </div>

      {/* LOWER SECTION: 3-PANE WORKSPACE */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr 320px',
        gap: '1rem',
        alignItems: 'start'
      }}>
        {/* PANE 1: LIVE TRANSCRIPT (AI) */}
        <div style={{
          background: isLight ? '#f8fafc' : '#0d131f',
          borderRadius: '12px',
          border: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.08)',
          padding: '1.25rem',
          minHeight: '440px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 700, color: isLight ? '#0f172a' : 'var(--text-main)' }}>
            Live Transcript (AI)
          </h3>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto' }}>
            {transcript.map((t, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <strong style={{ fontSize: '0.825rem', color: t.speaker === 'Agent' ? '#0284c7' : (isLight ? '#0f172a' : 'var(--text-main)') }}>
                    {t.speaker}
                  </strong>
                  <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : 'var(--text-muted)' }}>{t.time}</span>
                </div>
                <div style={{
                  fontSize: '0.85rem',
                  color: isLight ? '#334155' : 'var(--text-muted)',
                  lineHeight: 1.45,
                  paddingLeft: '0.25rem'
                }}>
                  {t.text}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: '1rem',
            paddingTop: '0.75rem',
            borderTop: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.75rem',
            color: '#10b981',
            fontWeight: 600
          }}>
            AI is listening ... <span style={{ letterSpacing: '2px' }}>●●●</span>
          </div>
        </div>

        {/* PANE 2: NOTES EDITOR */}
        <div style={{
          background: isLight ? '#f8fafc' : '#0d131f',
          borderRadius: '12px',
          border: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.08)',
          padding: '1.25rem',
          minHeight: '440px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '0.95rem', fontWeight: 700, color: isLight ? '#0f172a' : 'var(--text-main)' }}>
            Notes
          </h3>

          {/* Formatting Toolbar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 0.6rem',
            background: isLight ? '#ffffff' : '#131b2c',
            borderRadius: '6px',
            marginBottom: '0.75rem',
            border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.06)'
          }}>
            <button onClick={() => setNotes(prev => prev + '**bold text**')} title="Bold" style={{ background: 'transparent', border: 'none', color: isLight ? '#475569' : 'var(--text-muted)', cursor: 'pointer' }}><Bold size={14} /></button>
            <button onClick={() => setNotes(prev => prev + '*italic text*')} title="Italic" style={{ background: 'transparent', border: 'none', color: isLight ? '#475569' : 'var(--text-muted)', cursor: 'pointer' }}><Italic size={14} /></button>
            <button onClick={() => setNotes(prev => prev + '__underlined text__')} title="Underline" style={{ background: 'transparent', border: 'none', color: isLight ? '#475569' : 'var(--text-muted)', cursor: 'pointer' }}><Underline size={14} /></button>
            <span style={{ width: 1, height: 14, background: isLight ? '#cbd5e1' : 'rgba(255,255,255,0.1)' }}></span>
            <button onClick={() => setNotes(prev => prev + '\n- Bullet item')} title="List" style={{ background: 'transparent', border: 'none', color: isLight ? '#475569' : 'var(--text-muted)', cursor: 'pointer' }}><List size={14} /></button>
            <button onClick={() => setNotes(prev => prev + '\n> Resolution Step: ')} title="Align/Quote" style={{ background: 'transparent', border: 'none', color: isLight ? '#475569' : 'var(--text-muted)', cursor: 'pointer' }}><AlignLeft size={14} /></button>
            <button onClick={() => setNotes(prev => prev + ' `ticket-ref-code` ')} title="Code" style={{ background: 'transparent', border: 'none', color: isLight ? '#475569' : 'var(--text-muted)', cursor: 'pointer' }}><Code size={14} /></button>
          </div>

          <textarea
            placeholder="Add your notes here..."
            value={notes}
            onChange={e => setNotes(e.target.value)}
            style={{
              flex: 1,
              background: isLight ? '#ffffff' : '#131b2c',
              border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.08)',
              borderRadius: '8px',
              padding: '0.85rem',
              color: isLight ? '#0f172a' : '#fff',
              fontSize: '0.85rem',
              resize: 'none',
              fontFamily: 'inherit'
            }}
          />

          <div style={{ marginTop: '0.85rem', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
            <button
              onClick={() => setNotes('')}
              style={{
                background: 'transparent',
                border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.1)',
                color: isLight ? '#64748b' : 'var(--text-muted)',
                padding: '0.5rem 0.95rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.78rem'
              }}
            >
              Clear
            </button>
            <button
              onClick={handleSaveNotes}
              style={{
                background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                border: 'none',
                color: '#fff',
                fontWeight: 700,
                padding: '0.5rem 1.25rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.8rem'
              }}
            >
              Save Note
            </button>
          </div>
        </div>

        {/* PANE 3: QUEUE, HISTORY & CALL RECORDING */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Call Queue */}
          <div style={{
            background: isLight ? '#f8fafc' : '#0d131f',
            borderRadius: '12px',
            border: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.08)',
            padding: '1rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
              <strong style={{ fontSize: '0.85rem', color: isLight ? '#0f172a' : 'var(--text-main)' }}>Call Queue</strong>
              <span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : 'var(--text-muted)' }}>Waiting ({callQueue.length})</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {callQueue.slice(0, 3).map((q, i) => (
                <div
                  key={i}
                  onClick={() => handleAnswerQueueCall(q)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.45rem 0.65rem',
                    background: isLight ? '#ffffff' : '#131b2c',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    border: isLight ? '1px solid #e2e8f0' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  title="Click to answer & take this call"
                >
                  <span style={{ color: isLight ? '#0f172a' : 'var(--text-main)', fontWeight: 600 }}>{q.phone}</span>
                  <span style={{ color: '#f59e0b', fontFamily: 'monospace', fontWeight: 700 }}>{q.waitTime}</span>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
              <button
                onClick={() => setShowQueueModal(true)}
                style={{ background: 'transparent', border: 'none', color: '#0284c7', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer' }}
              >
                View All ({callQueue.length})
              </button>
            </div>
          </div>

          {/* Call History */}
          <div style={{
            background: isLight ? '#f8fafc' : '#0d131f',
            borderRadius: '12px',
            border: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.08)',
            padding: '1rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
              <strong style={{ fontSize: '0.85rem', color: isLight ? '#0f172a' : 'var(--text-main)' }}>Call History</strong>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {callHistory.slice(0, 3).map((h, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.45rem 0.65rem',
                    background: isLight ? '#ffffff' : '#131b2c',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    border: isLight ? '1px solid #e2e8f0' : 'none'
                  }}
                >
                  <div>
                    <div style={{ color: isLight ? '#0f172a' : 'var(--text-main)', fontSize: '0.75rem', fontWeight: 600 }}>{h.date}</div>
                    <div style={{ color: isLight ? '#64748b' : 'var(--text-muted)', fontSize: '0.68rem' }}>{h.time}</div>
                  </div>
                  <span style={{ color: '#10b981', fontFamily: 'monospace', fontWeight: 700 }}>{h.duration}</span>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
              <button
                onClick={() => setShowHistoryModal(true)}
                style={{ background: 'transparent', border: 'none', color: '#0284c7', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer' }}
              >
                View All ({callHistory.length})
              </button>
            </div>
          </div>

          {/* Call Recording Player */}
          <div style={{
            background: isLight ? '#f8fafc' : '#0d131f',
            borderRadius: '12px',
            border: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.08)',
            padding: '1rem'
          }}>
            <strong style={{ fontSize: '0.85rem', color: isLight ? '#0f172a' : 'var(--text-main)', display: 'block', marginBottom: '0.65rem' }}>
              Call Recording
            </strong>
            <div style={{
              background: isLight ? '#ffffff' : '#131b2c',
              borderRadius: '8px',
              padding: '0.65rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              border: isLight ? '1px solid #e2e8f0' : 'none'
            }}>
              <button
                onClick={() => {
                  setIsPlayingRecording(!isPlayingRecording);
                  showToast(isPlayingRecording ? 'Audio paused.' : 'Playing call recording...');
                }}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: '#0284c7',
                  border: 'none',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                {isPlayingRecording ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <div style={{ flex: 1 }}>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={recordingProgress}
                  onChange={e => setRecordingProgress(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#0284c7', height: '4px' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: isLight ? '#64748b' : 'var(--text-muted)' }}>
                  <span>0:{String(Math.floor((recordingProgress / 100) * 192)).padStart(2, '0')}</span>
                  <span>03:12</span>
                </div>
              </div>
              <button
                onClick={() => showToast('Call recording MP3 downloaded.')}
                title="Download Audio"
                style={{ background: 'transparent', border: 'none', color: isLight ? '#64748b' : 'var(--text-muted)', cursor: 'pointer' }}
              >
                <Download size={15} />
              </button>
              <button
                onClick={() => showToast('Audio volume adjusted to 100%')}
                title="Volume"
                style={{ background: 'transparent', border: 'none', color: isLight ? '#64748b' : 'var(--text-muted)', cursor: 'pointer' }}
              >
                <Volume2 size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
         MODAL 0: INTERACTIVE OUTBOUND DIALER MODAL
         ========================================================================= */}
      {showOutboundDialerModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000
        }}>
          <div style={{
            background: isLight ? '#ffffff' : '#0f172a',
            border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '16px',
            width: '440px',
            padding: '1.5rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: '8px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <PhoneOutgoing size={18} />
                </div>
                <div>
                  <strong style={{ fontSize: '1rem', color: isLight ? '#0f172a' : '#fff' }}>Make Outbound Call</strong>
                  <span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : 'var(--text-muted)', display: 'block' }}>
                    Queries Desk Telephony Gateway
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowOutboundDialerModal(false)}
                style={{ background: 'transparent', border: 'none', color: isLight ? '#64748b' : 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Contact Pickers */}
            <div>
              <label style={{ fontSize: '0.72rem', fontWeight: 700, color: isLight ? '#475569' : 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Quick Dial Recent Contact
              </label>
              <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', paddingBottom: '0.2rem' }}>
                {[
                  { name: 'Sarah Jenkins', phone: '+1 98765 43210' },
                  { name: 'Michael Brown', phone: '+1 91234 56789' },
                  { name: 'David Chen', phone: '+1 88776 55433' },
                  { name: 'James Wilson', phone: '+1 77665 44332' }
                ].map((c, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setOutboundName(c.name);
                      setOutboundPhone(c.phone.replace('+1 ', ''));
                    }}
                    style={{
                      background: isLight ? '#f1f5f9' : '#1e293b',
                      border: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '6px',
                      padding: '0.25rem 0.55rem',
                      fontSize: '0.7rem',
                      color: isLight ? '#0f172a' : '#fff',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      fontWeight: 600
                    }}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Phone Number Input with Country Code */}
            <div>
              <label style={{ fontSize: '0.72rem', fontWeight: 700, color: isLight ? '#475569' : 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                Recipient Phone Number
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <select
                  value={outboundCountryCode}
                  onChange={e => setOutboundCountryCode(e.target.value)}
                  style={{
                    padding: '0.55rem',
                    borderRadius: '6px',
                    border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.15)',
                    background: isLight ? '#f8fafc' : '#1e293b',
                    color: isLight ? '#0f172a' : '#fff',
                    fontSize: '0.82rem',
                    fontWeight: 700
                  }}
                >
                  <option value="+1">🇺🇸 +1 (US/CA)</option>
                  <option value="+91">🇮🇳 +91 (IN)</option>
                  <option value="+44">🇬🇧 +44 (UK)</option>
                  <option value="+65">🇸🇬 +65 (SG)</option>
                  <option value="+971">🇦🇪 +971 (AE)</option>
                </select>
                <input
                  type="tel"
                  placeholder="e.g. 98765 43210"
                  value={outboundPhone}
                  onChange={e => setOutboundPhone(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '0.55rem 0.75rem',
                    borderRadius: '6px',
                    border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.15)',
                    background: isLight ? '#f8fafc' : '#1e293b',
                    color: isLight ? '#0f172a' : '#fff',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    letterSpacing: '1px'
                  }}
                />
              </div>
            </div>

            {/* Contact Name & Purpose */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 700, color: isLight ? '#475569' : 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                  Contact / Customer Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={outboundName}
                  onChange={e => setOutboundName(e.target.value)}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '0.45rem 0.65rem',
                    borderRadius: '6px',
                    border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.15)',
                    background: isLight ? '#f8fafc' : '#1e293b',
                    color: isLight ? '#0f172a' : '#fff',
                    fontSize: '0.8rem'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 700, color: isLight ? '#475569' : 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                  Call Purpose
                </label>
                <select
                  value={outboundPurpose}
                  onChange={e => setOutboundPurpose(e.target.value)}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '0.45rem 0.65rem',
                    borderRadius: '6px',
                    border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.15)',
                    background: isLight ? '#f8fafc' : '#1e293b',
                    color: isLight ? '#0f172a' : '#fff',
                    fontSize: '0.78rem'
                  }}
                >
                  <option value="Customer Support Follow-up">Customer Support Follow-up</option>
                  <option value="KYC Document Retake Assistance">KYC Document Retake Assistance</option>
                  <option value="Billing & Payout Resolution">Billing & Payout Resolution</option>
                  <option value="VIP Priority Callback">VIP Priority Callback</option>
                </select>
              </div>
            </div>

            {/* Quick 12-Button Keypad for dialing */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.45rem', marginTop: '0.25rem' }}>
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map(digit => (
                <button
                  key={digit}
                  onClick={() => {
                    playDtmfTone(digit);
                    setOutboundPhone(prev => prev + digit);
                  }}
                  style={{
                    background: isLight ? '#f1f5f9' : '#1e293b',
                    border: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '8px',
                    padding: '0.45rem 0',
                    cursor: 'pointer',
                    fontSize: '1.05rem',
                    fontWeight: 800,
                    color: isLight ? '#0f172a' : '#fff'
                  }}
                >
                  {digit}
                </button>
              ))}
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.65rem', marginTop: '0.5rem' }}>
              <button
                onClick={() => setShowOutboundDialerModal(false)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.15)',
                  background: 'transparent',
                  color: isLight ? '#475569' : 'var(--text-muted)',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Cancel
              </button>
              <button
                disabled={isDialingOutbound}
                onClick={() => handleMakeOutboundCall()}
                style={{
                  padding: '0.5rem 1.4rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#fff',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)'
                }}
              >
                <PhoneOutgoing size={15} />
                {isDialingOutbound ? 'Connecting...' : 'Dial & Call Now'}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* =========================================================================
         MODAL 1: INTERACTIVE DTMF KEYPAD MODAL
         ========================================================================= */}
      {showKeypad && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000
        }}>
          <div style={{
            background: isLight ? '#ffffff' : '#0f172a',
            border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '16px',
            width: '320px',
            padding: '1.25rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Phone size={18} color="#0284c7" />
                <strong style={{ fontSize: '0.95rem', color: isLight ? '#0f172a' : '#fff' }}>DTMF Keypad</strong>
              </div>
              <button
                onClick={() => setShowKeypad(false)}
                style={{ background: 'transparent', border: 'none', color: isLight ? '#64748b' : 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Display digits screen */}
            <div style={{
              background: isLight ? '#f1f5f9' : '#1e293b',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontFamily: 'monospace',
              fontSize: '1.25rem',
              fontWeight: 800,
              color: '#0284c7',
              letterSpacing: '2px'
            }}>
              <span>{dialedDigits || 'Enter Tones...'}</span>
              {dialedDigits && (
                <button
                  onClick={() => setDialedDigits(prev => prev.slice(0, -1))}
                  style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700 }}
                >
                  DEL
                </button>
              )}
            </div>

            {/* Dialpad 12-Button Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.65rem' }}>
              {[
                { digit: '1', sub: '' },
                { digit: '2', sub: 'ABC' },
                { digit: '3', sub: 'DEF' },
                { digit: '4', sub: 'GHI' },
                { digit: '5', sub: 'JKL' },
                { digit: '6', sub: 'MNO' },
                { digit: '7', sub: 'PQRS' },
                { digit: '8', sub: 'TUV' },
                { digit: '9', sub: 'WXYZ' },
                { digit: '*', sub: '' },
                { digit: '0', sub: '+' },
                { digit: '#', sub: '' }
              ].map((btn, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDigitPress(btn.digit)}
                  style={{
                    background: isLight ? '#f8fafc' : '#1e293b',
                    border: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '10px',
                    padding: '0.65rem 0',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.1s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
                  }}
                >
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: isLight ? '#0f172a' : '#fff', lineHeight: 1 }}>{btn.digit}</span>
                  {btn.sub && <span style={{ fontSize: '0.6rem', color: isLight ? '#64748b' : 'var(--text-muted)', marginTop: '2px', fontWeight: 600 }}>{btn.sub}</span>}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.65rem' }}>
              <button
                onClick={() => setDialedDigits('')}
                style={{
                  flex: 1,
                  background: isLight ? '#e2e8f0' : '#334155',
                  border: 'none',
                  color: isLight ? '#334155' : '#fff',
                  fontWeight: 700,
                  padding: '0.6rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.8rem'
                }}
              >
                Clear
              </button>
              <button
                onClick={handleSendDtmf}
                style={{
                  flex: 2,
                  background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                  border: 'none',
                  color: '#fff',
                  fontWeight: 800,
                  padding: '0.6rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.82rem',
                  boxShadow: '0 4px 12px rgba(2, 132, 199, 0.35)'
                }}
              >
                Send DTMF Tone
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
         MODAL 2: CALL TRANSFER MODAL (WARM & COLD)
         ========================================================================= */}
      {showTransferModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000
        }}>
          <div style={{
            background: isLight ? '#ffffff' : '#0f172a',
            border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '16px',
            width: '460px',
            padding: '1.5rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '1rem', color: isLight ? '#0f172a' : '#fff' }}>Transfer Inbound Call</strong>
                <span style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : 'var(--text-muted)', display: 'block' }}>
                  Current Caller: <strong>{activeCaller.name}</strong> ({activeCaller.phone})
                </span>
              </div>
              <button
                onClick={() => setShowTransferModal(false)}
                style={{ background: 'transparent', border: 'none', color: isLight ? '#64748b' : 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Transfer Type Selection (Warm vs Cold) */}
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: isLight ? '#475569' : 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Transfer Protocol
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <button
                  onClick={() => setTransferType('WARM')}
                  style={{
                    padding: '0.55rem',
                    borderRadius: '8px',
                    border: transferType === 'WARM' ? '2px solid #0284c7' : (isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.1)'),
                    background: transferType === 'WARM' ? (isLight ? '#e0f2fe' : 'rgba(2, 132, 199, 0.15)') : 'transparent',
                    color: transferType === 'WARM' ? '#0284c7' : (isLight ? '#0f172a' : '#fff'),
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    cursor: 'pointer'
                  }}
                >
                  Warm Transfer (Consult)
                </button>
                <button
                  onClick={() => setTransferType('COLD')}
                  style={{
                    padding: '0.55rem',
                    borderRadius: '8px',
                    border: transferType === 'COLD' ? '2px solid #0284c7' : (isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.1)'),
                    background: transferType === 'COLD' ? (isLight ? '#e0f2fe' : 'rgba(2, 132, 199, 0.15)') : 'transparent',
                    color: transferType === 'COLD' ? '#0284c7' : (isLight ? '#0f172a' : '#fff'),
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    cursor: 'pointer'
                  }}
                >
                  Blind / Cold Transfer
                </button>
              </div>
            </div>

            {/* Target Agent / Bot Selector */}
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: isLight ? '#475569' : 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Transfer Destination
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {[
                  { id: 'AI_BOT', label: 'Query AI Bot (Autonomous Gemini 1.5)', badge: 'Instant AI Takeover' },
                  { id: 'ALEX_VANCE', label: 'Alex Vance (Senior Query Specialist)', badge: 'Available Now' },
                  { id: 'SARAH_TL', label: 'Sarah Jenkins (Queries Team Lead)', badge: 'Supervisor Active' },
                  { id: 'SURESH_KYC', label: 'Suresh Reddy (Senior KYC Officer)', badge: 'Document Review Desk' },
                  { id: 'PAYMENT_DESK', label: 'Payment Disputes & Wire Escalation Desk', badge: 'Tier 2 Support' },
                  { id: 'CUSTOM', label: 'External PSTN / Direct Phone Number', badge: 'Dial Out' }
                ].map(item => (
                  <div
                    key={item.id}
                    onClick={() => setTransferTarget(item.id as any)}
                    style={{
                      padding: '0.55rem 0.75rem',
                      borderRadius: '8px',
                      border: transferTarget === item.id ? '1.5px solid #0284c7' : (isLight ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.06)'),
                      background: transferTarget === item.id ? (isLight ? '#e0f2fe' : 'rgba(2, 132, 199, 0.12)') : (isLight ? '#f8fafc' : '#1e293b'),
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: isLight ? '#0f172a' : '#fff' }}>{item.label}</span>
                    <span style={{ fontSize: '0.65rem', color: '#0284c7', background: 'rgba(2, 132, 199, 0.12)', padding: '0.1rem 0.4rem', borderRadius: '10px', fontWeight: 700 }}>
                      {item.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {transferTarget === 'CUSTOM' && (
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: isLight ? '#475569' : 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                  Target Phone Number
                </label>
                <input
                  type="text"
                  placeholder="+91-98765-43210 or Extension"
                  value={customPhone}
                  onChange={e => setCustomPhone(e.target.value)}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '6px',
                    border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.15)',
                    background: isLight ? '#f8fafc' : '#1e293b',
                    color: isLight ? '#0f172a' : '#fff',
                    fontSize: '0.82rem'
                  }}
                />
              </div>
            )}

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: isLight ? '#475569' : 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                Hand-off Notes (Reason for Transfer)
              </label>
              <textarea
                placeholder="Reason: Customer requested supervisor review on payment retry terms..."
                value={transferNote}
                onChange={e => setTransferNote(e.target.value)}
                rows={2}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '6px',
                  border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.15)',
                  background: isLight ? '#f8fafc' : '#1e293b',
                  color: isLight ? '#0f172a' : '#fff',
                  fontSize: '0.8rem',
                  resize: 'none'
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.65rem' }}>
              <button
                onClick={() => setShowTransferModal(false)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.15)',
                  background: 'transparent',
                  color: isLight ? '#475569' : 'var(--text-muted)',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleCompleteTransfer}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#fff',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)'
                }}
              >
                Complete Transfer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
         MODAL 3: CALL QUEUE VIEW ALL MODAL
         ========================================================================= */}
      {showQueueModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000
        }}>
          <div style={{
            background: isLight ? '#ffffff' : '#0f172a',
            border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '16px',
            width: '560px',
            padding: '1.5rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '1rem', color: isLight ? '#0f172a' : '#fff' }}>Active Call Queue ({callQueue.length} Waiting)</strong>
                <span style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : 'var(--text-muted)', display: 'block' }}>
                  Live Inbound PSTN callers queued on Twilio gateway
                </span>
              </div>
              <button
                onClick={() => setShowQueueModal(false)}
                style={{ background: 'transparent', border: 'none', color: isLight ? '#64748b' : 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', maxHeight: '340px', overflowY: 'auto' }}>
              {callQueue.map((q, i) => (
                <div
                  key={i}
                  style={{
                    background: isLight ? '#f8fafc' : '#1e293b',
                    border: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '10px',
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <strong style={{ fontSize: '0.85rem', color: isLight ? '#0f172a' : '#fff' }}>{q.customerName}</strong>
                      <span style={{
                        fontSize: '0.65rem',
                        fontWeight: 800,
                        padding: '0.1rem 0.4rem',
                        borderRadius: '6px',
                        background: q.priority === 'CRITICAL' ? 'rgba(239, 68, 68, 0.15)' : q.priority === 'HIGH' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                        color: q.priority === 'CRITICAL' ? '#ef4444' : q.priority === 'HIGH' ? '#f59e0b' : '#3b82f6'
                      }}>
                        {q.priority}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : 'var(--text-muted)', marginTop: '2px' }}>
                      {q.phone} • {q.category}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '0.82rem', fontFamily: 'monospace', fontWeight: 800, color: '#f59e0b' }}>
                      {q.waitTime}
                    </span>
                    <button
                      onClick={() => handleAnswerQueueCall(q)}
                      style={{
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        border: 'none',
                        color: '#fff',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '0.4rem 0.85rem',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      Answer Call
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
         MODAL 4: CALL HISTORY VIEW ALL MODAL
         ========================================================================= */}
      {showHistoryModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000
        }}>
          <div style={{
            background: isLight ? '#ffffff' : '#0f172a',
            border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '16px',
            width: '640px',
            padding: '1.5rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '1rem', color: isLight ? '#0f172a' : '#fff' }}>Telephony Call History Logs ({callHistory.length} Calls)</strong>
                <span style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : 'var(--text-muted)', display: 'block' }}>
                  Audited call logs, durations, sentiment tags, and recordings
                </span>
              </div>
              <button
                onClick={() => setShowHistoryModal(false)}
                style={{ background: 'transparent', border: 'none', color: isLight ? '#64748b' : 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', maxHeight: '380px', overflowY: 'auto' }}>
              {callHistory.map((h, i) => (
                <div
                  key={i}
                  style={{
                    background: isLight ? '#f8fafc' : '#1e293b',
                    border: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '10px',
                    padding: '0.85rem 1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <strong style={{ fontSize: '0.85rem', color: isLight ? '#0f172a' : '#fff' }}>{h.customerName}</strong>
                      <span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : 'var(--text-muted)' }}>{h.phone}</span>
                      <span style={{
                        fontSize: '0.62rem',
                        fontWeight: 800,
                        padding: '0.1rem 0.4rem',
                        borderRadius: '6px',
                        background: 'rgba(16, 185, 129, 0.15)',
                        color: '#10b981'
                      }}>
                        {h.sentiment}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : 'var(--text-muted)', marginTop: '3px' }}>
                      {h.date} at {h.time} • Agent: {h.agent} • <span style={{ color: '#0284c7', fontWeight: 600 }}>{h.outcome}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span style={{ fontSize: '0.82rem', fontFamily: 'monospace', fontWeight: 800, color: '#10b981' }}>
                      {h.duration}
                    </span>
                    <button
                      onClick={() => {
                        setIsPlayingRecording(true);
                        setShowHistoryModal(false);
                        showToast(`Loading audio recording for ${h.customerName} (${h.date})...`);
                      }}
                      style={{
                        background: isLight ? '#e0f2fe' : 'rgba(2, 132, 199, 0.15)',
                        border: '1px solid rgba(2, 132, 199, 0.3)',
                        color: '#0284c7',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '0.35rem 0.65rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}
                    >
                      <Play size={12} /> Play
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
         MODAL 5: CREATE TICKET QUICK MODAL
         ========================================================================= */}
      {showCreateTicketModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000
        }}>
          <div style={{
            background: isLight ? '#ffffff' : '#0f172a',
            border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '16px',
            width: '460px',
            padding: '1.5rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '1rem', color: isLight ? '#0f172a' : '#fff' }}>Create Ticket from Inbound Call</strong>
                <span style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : 'var(--text-muted)', display: 'block' }}>
                  Customer: <strong>{activeCaller.name}</strong> ({activeCaller.phone})
                </span>
              </div>
              <button
                onClick={() => setShowCreateTicketModal(false)}
                style={{ background: 'transparent', border: 'none', color: isLight ? '#64748b' : 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: isLight ? '#475569' : 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                Subject / Issue Summary
              </label>
              <input
                type="text"
                value={ticketSubject}
                onChange={e => setTicketSubject(e.target.value)}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '6px',
                  border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.15)',
                  background: isLight ? '#f8fafc' : '#1e293b',
                  color: isLight ? '#0f172a' : '#fff',
                  fontSize: '0.82rem'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: isLight ? '#475569' : 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                  Category
                </label>
                <select
                  value={ticketCategory}
                  onChange={e => setTicketCategory(e.target.value)}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '0.5rem',
                    borderRadius: '6px',
                    border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.15)',
                    background: isLight ? '#f8fafc' : '#1e293b',
                    color: isLight ? '#0f172a' : '#fff',
                    fontSize: '0.78rem'
                  }}
                >
                  <option value="Payment Resolution & Gateway Retry">Payment Gateway Retry</option>
                  <option value="KYC Document Re-upload">KYC Document Issue</option>
                  <option value="Agent Onboarding Policy Terms">Agent Onboarding Terms</option>
                  <option value="Account Login Dispute">Login Issue</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: isLight ? '#475569' : 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                  Priority Level
                </label>
                <select
                  value={ticketPriority}
                  onChange={e => setTicketPriority(e.target.value)}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '0.5rem',
                    borderRadius: '6px',
                    border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.15)',
                    background: isLight ? '#f8fafc' : '#1e293b',
                    color: isLight ? '#0f172a' : '#fff',
                    fontSize: '0.78rem'
                  }}
                >
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                  <option value="CRITICAL">CRITICAL (VIP)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.65rem' }}>
              <button
                onClick={() => setShowCreateTicketModal(false)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.15)',
                  background: 'transparent',
                  color: isLight ? '#475569' : 'var(--text-muted)',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTicketSubmit}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                  color: '#fff',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(2, 132, 199, 0.4)'
                }}
              >
                Create Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   3. EMAIL INBOX VIEW (IMAGE 3 REFERENCE WITH LIGHT/DARK THEME SUPPORT)
   ========================================================================= */
export const EmailInboxView: React.FC<{ onTicketCreate?: (t: any) => void; isSupervisorMode?: boolean; isLight?: boolean }> = ({ onTicketCreate, isSupervisorMode, isLight = false }) => {
  const [emails, setEmails] = useState([
    {
      id: 'em-1',
      sender: 'David Chen',
      senderEmail: 'david.chen@email.com',
      recipientEmail: 'support@nexus.com',
      subject: 'Unable to login to my account',
      preview: 'I am unable to login to my account. It shows "Invalid credentials" even though I am using...',
      time: '10:32 AM',
      priority: 'High',
      priorityColor: '#ef4444',
      badgeBg: 'rgba(239, 68, 68, 0.15)',
      badgeBorder: 'rgba(239, 68, 68, 0.4)',
      avatarInitial: 'DC',
      avatarColor: '#8b5cf6',
      body: `Hi Support Team,\n\nI am unable to login to my account. It shows "Invalid credentials" even though I am using the correct password.\n\nPlease help me resolve this issue at the earliest.\n\nThanks & Regards,\nDavid Chen\n+1 98765 43210`,
      attachments: [{ name: 'Screenshot_2024-05-20.png', size: '2.4 MB' }],
      historyCount: 3
    },
    {
      id: 'em-2',
      sender: 'Michael Brown',
      senderEmail: 'michael.brown@corp.org',
      recipientEmail: 'support@nexus.com',
      subject: 'Billing inquiry: Invoice #553',
      preview: 'Could you please share the breakdown details for the commercial ledger adjustment...',
      time: '09:45 AM',
      priority: 'Medium',
      priorityColor: '#f59e0b',
      badgeBg: 'rgba(245, 158, 11, 0.15)',
      badgeBorder: 'rgba(245, 158, 11, 0.4)',
      avatarInitial: 'MB',
      avatarColor: '#10b981',
      body: `Hello Support,\n\nCould you please share the invoice breakdown for receipt #553? Our accounting team is conducting our monthly ledger reconciliation.\n\nBest,\nMichael Brown`,
      attachments: [],
      historyCount: 1
    },
    {
      id: 'em-3',
      sender: 'Sarah Jenkins',
      senderEmail: 'sarah.jenkins@email.com',
      recipientEmail: 'support@nexus.com',
      subject: 'Onboarding registration fee inquiry',
      preview: 'It has been more than 7 days since my vendor onboarding fee remittance...',
      time: 'Yesterday',
      priority: 'High',
      priorityColor: '#ef4444',
      badgeBg: 'rgba(239, 68, 68, 0.15)',
      badgeBorder: 'rgba(239, 68, 68, 0.4)',
      avatarInitial: 'SJ',
      avatarColor: '#3b82f6',
      body: `Hi Team,\n\nI submitted my tie-up onboarding documents and fee payment last week. Can you confirm if my credentials have been verified?\n\nRegards,\nSarah`,
      attachments: [],
      historyCount: 2
    },
    {
      id: 'em-4',
      sender: 'James Wilson',
      senderEmail: 'james.wilson@domain.net',
      recipientEmail: 'support@nexus.com',
      subject: 'Product feature request',
      preview: 'I would like to suggest a new dashboard filter for automated batch exports...',
      time: 'May 19',
      priority: 'Low',
      priorityColor: '#10b981',
      badgeBg: 'rgba(16, 185, 129, 0.15)',
      badgeBorder: 'rgba(16, 185, 129, 0.4)',
      avatarInitial: 'JW',
      avatarColor: '#6366f1',
      body: `Hi Product Team,\n\nWe love using the tool! One suggestion: can you add automated CSV exports every midnight?\n\nThanks,\nJames`,
      attachments: [],
      historyCount: 0
    },
    {
      id: 'em-5',
      sender: 'Emily Rodriguez',
      senderEmail: 'emily.r@domain.com',
      recipientEmail: 'support@nexus.com',
      subject: 'Mobile app crashing',
      preview: 'The app crashes when I try to upload document scans on iOS 17.4...',
      time: 'May 19',
      priority: 'Medium',
      priorityColor: '#f59e0b',
      badgeBg: 'rgba(245, 158, 11, 0.15)',
      badgeBorder: 'rgba(245, 158, 11, 0.4)',
      avatarInitial: 'ER',
      avatarColor: '#ec4899',
      body: `Hello,\n\nWhenever I click "Capture Aadhaar" in the mobile app, it closes abruptly.\n\nEmily`,
      attachments: [],
      historyCount: 1
    },
    {
      id: 'em-6',
      sender: 'Robert Johnson',
      senderEmail: 'robert.j@corp.com',
      recipientEmail: 'support@nexus.com',
      subject: 'Subscription cancel request',
      preview: 'Please cancel my monthly add-on package before the renewal cycle starts...',
      time: 'May 18',
      priority: 'Low',
      priorityColor: '#10b981',
      badgeBg: 'rgba(16, 185, 129, 0.15)',
      badgeBorder: 'rgba(16, 185, 129, 0.4)',
      avatarInitial: 'RJ',
      avatarColor: '#14b8a6',
      body: `Hi Support,\n\nPlease cancel our optional telephony add-on. Platform terms noted.\n\nRobert`,
      attachments: [],
      historyCount: 0
    }
  ]);

  const [selectedEmail, setSelectedEmail] = useState(emails[0]);
  const [activeTab, setActiveTab] = useState<'EMAIL' | 'HISTORY'>('EMAIL');
  const [replyMode, setReplyMode] = useState<'REPLY' | 'REPLY_ALL' | 'FORWARD' | 'INTERNAL_NOTE'>('REPLY');
  const [replyText, setReplyText] = useState('');
  const [emailSearch, setEmailSearch] = useState('');
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [showCreateTicketModal, setShowCreateTicketModal] = useState(false);
  const [composeTo, setComposeTo] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');
  const [composePriority, setComposePriority] = useState('MEDIUM');
  const [ticketSubject, setTicketSubject] = useState(selectedEmail.subject);
  const [ticketCategory, setTicketCategory] = useState('Enterprise Email Inquiry');
  const [ticketPriority, setTicketPriority] = useState('HIGH');
  const [emailToast, setEmailToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setEmailToast(msg);
    setTimeout(() => setEmailToast(null), 3000);
  };

  const filteredEmails = emails.filter(e =>
    e.sender.toLowerCase().includes(emailSearch.toLowerCase()) ||
    e.subject.toLowerCase().includes(emailSearch.toLowerCase())
  );

  const handleSendReply = async () => {
    if (!replyText.trim()) {
      showToast('Please type a reply before sending.');
      return;
    }
    const currentReply = replyText;
    try {
      await fetch('/api/v1/communication/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: selectedEmail.senderEmail,
          subject: `Re: ${selectedEmail.subject}`,
          body: currentReply
        })
      });
    } catch (e) {}

    showToast(`Reply sent successfully to ${selectedEmail.senderEmail}`);
    setSelectedEmail(prev => ({
      ...prev,
      body: prev.body + `\n\n--- Your Reply (${new Date().toLocaleTimeString()}) ---\n` + currentReply
    }));
    setReplyText('');
  };

  const handleSendCompose = async () => {
    if (!composeTo.trim() || !composeSubject.trim() || !composeBody.trim()) {
      showToast('Please complete all fields.');
      return;
    }
    try {
      await fetch('/api/v1/communication/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: composeTo,
          subject: composeSubject,
          body: composeBody
        })
      });
    } catch (e) {}

    const newEmail = {
      id: `em-${Date.now()}`,
      sender: 'Support Desk (You)',
      senderEmail: 'support@forgeindia.com',
      recipientEmail: composeTo,
      subject: composeSubject,
      preview: composeBody.slice(0, 75) + '...',
      time: 'Just Now',
      priority: composePriority,
      priorityColor: composePriority === 'HIGH' ? '#ef4444' : '#10b981',
      badgeBg: composePriority === 'HIGH' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
      badgeBorder: composePriority === 'HIGH' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(16, 185, 129, 0.4)',
      avatarInitial: 'SD',
      avatarColor: '#0284c7',
      body: composeBody,
      attachments: [],
      historyCount: 0
    };
    setEmails(prev => [newEmail, ...prev]);
    setSelectedEmail(newEmail);
    setShowComposeModal(false);
    setComposeTo('');
    setComposeSubject('');
    setComposeBody('');
    showToast(`Email dispatched to ${composeTo}`);
  };

  const handleCreateTicketFromEmail = () => {
    const newTicket = {
      id: `TCK-EM-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: selectedEmail.sender,
      customerEmail: selectedEmail.senderEmail,
      subject: ticketSubject,
      category: ticketCategory,
      priority: ticketPriority,
      channel: 'EMAIL_IMAP',
      status: 'OPEN',
      assignedAgent: 'Query Email Support Desk'
    };
    if (onTicketCreate) onTicketCreate(newTicket);
    showToast(`Ticket #${newTicket.id} created from email.`);
    setShowCreateTicketModal(false);
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '360px 1fr',
      gap: '1rem',
      background: isLight ? '#ffffff' : '#090d16',
      borderRadius: '12px',
      border: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.08)',
      minHeight: '720px',
      overflow: 'hidden',
      boxShadow: isLight ? '0 4px 20px rgba(0,0,0,0.06)' : 'none',
      position: 'relative'
    }}>
      {/* FLOATING ACTION TOAST */}
      {emailToast && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 99999,
          background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
          color: '#fff',
          padding: '0.65rem 1.1rem',
          borderRadius: '8px',
          fontSize: '0.82rem',
          fontWeight: 700,
          boxShadow: '0 4px 20px rgba(2, 132, 199, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <CheckCircle size={16} />
          {emailToast}
        </div>
      )}

      {/* COLUMN 1: INBOX LIST */}
      <div style={{
        background: isLight ? '#f8fafc' : '#0d131f',
        borderRight: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header with Compose Button */}
        <div style={{
          padding: '1rem',
          borderBottom: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: isLight ? '#0f172a' : 'var(--text-main)' }}>
              Inbox ({emails.length})
            </h3>
          </div>
          <button
            onClick={() => setShowComposeModal(true)}
            style={{
              background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)',
              border: 'none',
              color: '#fff',
              padding: '0.35rem 0.75rem',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              boxShadow: '0 2px 8px rgba(168, 85, 247, 0.35)'
            }}
          >
            <Plus size={13} /> Compose
          </button>
        </div>

        {/* Search */}
        <div style={{ padding: '0.75rem 1rem', borderBottom: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.04)' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: 8, top: 8, color: isLight ? '#94a3b8' : 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search emails..."
              value={emailSearch}
              onChange={e => setEmailSearch(e.target.value)}
              style={{
                width: '100%',
                background: isLight ? '#ffffff' : '#131b2c',
                border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: '6px',
                padding: '0.35rem 0.5rem 0.35rem 1.8rem',
                color: isLight ? '#0f172a' : '#fff',
                fontSize: '0.75rem'
              }}
            />
          </div>
        </div>

        {/* Email Items List */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filteredEmails.map(em => {
            const isSelected = selectedEmail.id === em.id;
            return (
              <div
                key={em.id}
                onClick={() => {
                  setSelectedEmail(em);
                  setTicketSubject(em.subject);
                }}
                style={{
                  padding: '0.85rem 1rem',
                  cursor: 'pointer',
                  borderBottom: isLight ? '1px solid #f1f5f9' : '1px solid rgba(255, 255, 255, 0.04)',
                  background: isSelected ? (isLight ? '#f3e8ff' : 'rgba(168, 85, 247, 0.12)') : 'transparent',
                  borderLeft: isSelected ? '3px solid #a855f7' : '3px solid transparent',
                  transition: 'background 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div style={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    background: em.avatarColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.78rem'
                  }}>
                    {em.avatarInitial}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '0.82rem', color: isLight ? '#0f172a' : 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {em.sender}
                      </strong>
                      <span style={{ fontSize: '0.68rem', color: isLight ? '#64748b' : 'var(--text-muted)' }}>{em.time}</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 600, color: isLight ? '#334155' : 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '1px' }}>
                      {em.subject}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '1px' }}>
                      {em.preview}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* COLUMN 2: EMAIL VIEWER & COMPOSER */}
      <div style={{ display: 'flex', flexDirection: 'column', background: isLight ? '#ffffff' : '#090d16', padding: '1.25rem' }}>
        {/* Email Subject Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '1rem',
          borderBottom: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: isLight ? '#0f172a' : 'var(--text-main)' }}>
              {selectedEmail.subject}
            </h2>
            <span style={{
              background: selectedEmail.badgeBg,
              border: `1px solid ${selectedEmail.badgeBorder}`,
              color: selectedEmail.priorityColor,
              fontSize: '0.72rem',
              fontWeight: 700,
              padding: '0.15rem 0.5rem',
              borderRadius: '9999px'
            }}>
              {selectedEmail.priority}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TicketVisionButton
              ticket={{
                id: selectedEmail.id,
                ticketNumber: 'TCK-EMAIL-' + selectedEmail.id.toUpperCase(),
                customerName: selectedEmail.sender,
                departmentLabel: 'Email Operations',
                status: 'LIVE_AI'
              }}
              size="sm"
            />
            <button
              onClick={() => setShowCreateTicketModal(true)}
              style={{
                background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                border: 'none',
                color: '#fff',
                padding: '0.35rem 0.75rem',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <Plus size={13} /> Create Ticket
            </button>
            <button onClick={() => showToast('Email starred.')} title="Star" style={{ background: 'transparent', border: 'none', color: isLight ? '#64748b' : 'var(--text-muted)', cursor: 'pointer' }}><Star size={16} /></button>
            <button onClick={() => showToast('Email archived.')} title="Archive" style={{ background: 'transparent', border: 'none', color: isLight ? '#64748b' : 'var(--text-muted)', cursor: 'pointer' }}><Archive size={16} /></button>
            <button onClick={() => showToast('Email moved to trash.')} title="Delete" style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
          </div>
        </div>

        {/* Sender Info */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: 42,
              height: 42,
              borderRadius: '50%',
              background: selectedEmail.avatarColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 800,
              fontSize: '1rem'
            }}>
              {selectedEmail.avatarInitial}
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: isLight ? '#0f172a' : 'var(--text-main)' }}>
                {selectedEmail.sender} <span style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : 'var(--text-muted)', fontWeight: 400 }}>&lt;{selectedEmail.senderEmail}&gt;</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : 'var(--text-muted)', marginTop: '0.15rem' }}>
                To {selectedEmail.recipientEmail}
              </div>
            </div>
          </div>

          <span style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : 'var(--text-muted)' }}>{selectedEmail.time}</span>
        </div>

        {/* Email vs History Tabs */}
        <div style={{ display: 'flex', gap: '1rem', borderBottom: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.08)', marginBottom: '1rem' }}>
          <button
            onClick={() => setActiveTab('EMAIL')}
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'EMAIL' ? '2px solid #a855f7' : '2px solid transparent',
              color: activeTab === 'EMAIL' ? '#a855f7' : (isLight ? '#64748b' : 'var(--text-muted)'),
              padding: '0.4rem 0.75rem',
              fontSize: '0.825rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Email
          </button>
          <button
            onClick={() => setActiveTab('HISTORY')}
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'HISTORY' ? '2px solid #a855f7' : '2px solid transparent',
              color: activeTab === 'HISTORY' ? '#a855f7' : (isLight ? '#64748b' : 'var(--text-muted)'),
              padding: '0.4rem 0.75rem',
              fontSize: '0.825rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            History ({selectedEmail.historyCount})
          </button>
        </div>

        {/* Email Body */}
        <div style={{
          flex: 1,
          fontSize: '0.875rem',
          color: isLight ? '#334155' : '#cbd5e1',
          lineHeight: 1.6,
          whiteSpace: 'pre-line',
          overflowY: 'auto',
          marginBottom: '1rem'
        }}>
          {selectedEmail.body}
        </div>

        {/* Attachments Card */}
        {selectedEmail.attachments.length > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <strong style={{ fontSize: '0.8rem', color: isLight ? '#0f172a' : 'var(--text-main)', display: 'block', marginBottom: '0.4rem' }}>
              Attachments ({selectedEmail.attachments.length})
            </strong>
            <div style={{ display: 'flex', gap: '0.65rem' }}>
              {selectedEmail.attachments.map((att, idx) => (
                <div
                  key={idx}
                  style={{
                    background: isLight ? '#f8fafc' : '#131b2c',
                    border: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '8px',
                    padding: '0.6rem 0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem'
                  }}
                >
                  <FileText size={16} color="#0284c7" />
                  <div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 600, color: isLight ? '#0f172a' : 'var(--text-main)' }}>{att.name}</div>
                    <div style={{ fontSize: '0.68rem', color: isLight ? '#64748b' : 'var(--text-muted)' }}>{att.size}</div>
                  </div>
                  <button onClick={() => showToast(`Downloaded ${att.name}`)} style={{ background: 'transparent', border: 'none', color: isLight ? '#64748b' : 'var(--text-muted)', cursor: 'pointer', marginLeft: '0.5rem' }}>
                    <Download size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Response Composer Card */}
        <div style={{
          background: isLight ? '#f8fafc' : '#0d131f',
          borderRadius: '10px',
          border: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.08)',
          padding: '0.85rem'
        }}>
          {/* Action Tabs: Reply / Reply All / Forward / Internal Note */}
          <div style={{ display: 'flex', gap: '1rem', borderBottom: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.5rem', marginBottom: '0.65rem' }}>
            {(['REPLY', 'REPLY_ALL', 'FORWARD', 'INTERNAL_NOTE'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setReplyMode(mode)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: replyMode === mode ? '#0284c7' : (isLight ? '#64748b' : 'var(--text-muted)'),
                  fontSize: '0.78rem',
                  fontWeight: replyMode === mode ? 700 : 500,
                  cursor: 'pointer',
                  padding: '0.2rem 0.4rem'
                }}
              >
                {mode === 'REPLY' ? 'Reply' : mode === 'REPLY_ALL' ? 'Reply All' : mode === 'FORWARD' ? 'Forward' : 'Internal Note'}
              </button>
            ))}
          </div>

          {/* Formatting Toolbar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.5rem',
            background: isLight ? '#ffffff' : '#131b2c',
            borderRadius: '6px',
            marginBottom: '0.65rem',
            border: isLight ? '1px solid #cbd5e1' : 'none'
          }}>
            <button onClick={() => setReplyText(prev => prev + '**bold text**')} title="Bold" style={{ background: 'transparent', border: 'none', color: isLight ? '#475569' : 'var(--text-muted)', cursor: 'pointer' }}><Bold size={13} /></button>
            <button onClick={() => setReplyText(prev => prev + '*italic text*')} title="Italic" style={{ background: 'transparent', border: 'none', color: isLight ? '#475569' : 'var(--text-muted)', cursor: 'pointer' }}><Italic size={13} /></button>
            <button onClick={() => setReplyText(prev => prev + '__underlined text__')} title="Underline" style={{ background: 'transparent', border: 'none', color: isLight ? '#475569' : 'var(--text-muted)', cursor: 'pointer' }}><Underline size={13} /></button>
            <span style={{ width: 1, height: 12, background: isLight ? '#cbd5e1' : 'rgba(255,255,255,0.1)' }}></span>
            <button onClick={() => setReplyText(prev => prev + '\n- Bullet point')} title="List" style={{ background: 'transparent', border: 'none', color: isLight ? '#475569' : 'var(--text-muted)', cursor: 'pointer' }}><List size={13} /></button>
            <button onClick={() => setReplyText(prev => prev + '\n> Escalation Note: ')} title="Quote" style={{ background: 'transparent', border: 'none', color: isLight ? '#475569' : 'var(--text-muted)', cursor: 'pointer' }}><AlignLeft size={13} /></button>
            <button onClick={() => setReplyText(prev => prev + ' `transaction-ref-id` ')} title="Code" style={{ background: 'transparent', border: 'none', color: isLight ? '#475569' : 'var(--text-muted)', cursor: 'pointer' }}><Code size={13} /></button>
          </div>

          {/* Composer Textarea */}
          <textarea
            placeholder="Type your reply message..."
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            style={{
              width: '100%',
              minHeight: '80px',
              background: isLight ? '#ffffff' : '#131b2c',
              border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '6px',
              padding: '0.65rem',
              color: isLight ? '#0f172a' : '#fff',
              fontSize: '0.825rem',
              resize: 'none',
              fontFamily: 'inherit'
            }}
          />

          {/* Bottom Bar: Templates & Send */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '0.65rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                onClick={() => setReplyText('Thank you for contacting customer support. We have verified your request and escalated it to our operations desk.')}
                style={{
                  background: isLight ? '#ffffff' : '#131b2c',
                  border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.1)',
                  color: isLight ? '#475569' : 'var(--text-muted)',
                  padding: '0.35rem 0.65rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                Insert Standard Response
              </button>
            </div>

            <button
              onClick={handleSendReply}
              style={{
                background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                border: 'none',
                color: '#fff',
                fontWeight: 700,
                padding: '0.45rem 1.25rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.825rem'
              }}
            >
              Send Reply
            </button>
          </div>
        </div>
      </div>

      {/* MODAL 1: COMPOSE EMAIL MODAL */}
      {showComposeModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000
        }}>
          <div style={{
            background: isLight ? '#ffffff' : '#0f172a',
            border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '16px',
            width: '520px',
            padding: '1.5rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '1rem', color: isLight ? '#0f172a' : '#fff' }}>Compose Enterprise Email</strong>
                <span style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : 'var(--text-muted)', display: 'block' }}>
                  From: support@forgeindia.com
                </span>
              </div>
              <button onClick={() => setShowComposeModal(false)} style={{ background: 'transparent', border: 'none', color: isLight ? '#64748b' : 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: isLight ? '#475569' : 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>To (Recipient Email)</label>
              <input
                type="email"
                placeholder="customer@enterprise.com"
                value={composeTo}
                onChange={e => setComposeTo(e.target.value)}
                style={{ width: '100%', boxSizing: 'border-box', padding: '0.5rem 0.75rem', borderRadius: '6px', border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.15)', background: isLight ? '#f8fafc' : '#1e293b', color: isLight ? '#0f172a' : '#fff', fontSize: '0.82rem' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: isLight ? '#475569' : 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Subject</label>
              <input
                type="text"
                placeholder="Enter email subject"
                value={composeSubject}
                onChange={e => setComposeSubject(e.target.value)}
                style={{ width: '100%', boxSizing: 'border-box', padding: '0.5rem 0.75rem', borderRadius: '6px', border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.15)', background: isLight ? '#f8fafc' : '#1e293b', color: isLight ? '#0f172a' : '#fff', fontSize: '0.82rem' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: isLight ? '#475569' : 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Email Message</label>
              <textarea
                placeholder="Write your email body here..."
                value={composeBody}
                onChange={e => setComposeBody(e.target.value)}
                rows={5}
                style={{ width: '100%', boxSizing: 'border-box', padding: '0.5rem 0.75rem', borderRadius: '6px', border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.15)', background: isLight ? '#f8fafc' : '#1e293b', color: isLight ? '#0f172a' : '#fff', fontSize: '0.82rem', resize: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.65rem' }}>
              <button onClick={() => setShowComposeModal(false)} style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: isLight ? '#475569' : 'var(--text-muted)', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
              <button onClick={handleSendCompose} style={{ padding: '0.5rem 1.25rem', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)', color: '#fff', fontSize: '0.82rem', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 12px rgba(168, 85, 247, 0.4)' }}>Send Email</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: CREATE TICKET FROM EMAIL */}
      {showCreateTicketModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000
        }}>
          <div style={{
            background: isLight ? '#ffffff' : '#0f172a',
            border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '16px',
            width: '460px',
            padding: '1.5rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '1rem', color: isLight ? '#0f172a' : '#fff' }}>Create Ticket from Email</strong>
                <span style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : 'var(--text-muted)', display: 'block' }}>
                  Sender: <strong>{selectedEmail.sender}</strong> ({selectedEmail.senderEmail})
                </span>
              </div>
              <button onClick={() => setShowCreateTicketModal(false)} style={{ background: 'transparent', border: 'none', color: isLight ? '#64748b' : 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: isLight ? '#475569' : 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Subject</label>
              <input
                type="text"
                value={ticketSubject}
                onChange={e => setTicketSubject(e.target.value)}
                style={{ width: '100%', boxSizing: 'border-box', padding: '0.5rem 0.75rem', borderRadius: '6px', border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.15)', background: isLight ? '#f8fafc' : '#1e293b', color: isLight ? '#0f172a' : '#fff', fontSize: '0.82rem' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: isLight ? '#475569' : 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Category</label>
                <select
                  value={ticketCategory}
                  onChange={e => setTicketCategory(e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box', padding: '0.5rem', borderRadius: '6px', border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.15)', background: isLight ? '#f8fafc' : '#1e293b', color: isLight ? '#0f172a' : '#fff', fontSize: '0.78rem' }}
                >
                  <option value="Enterprise Email Inquiry">Enterprise Email Inquiry</option>
                  <option value="Billing & Invoicing Issue">Billing & Invoicing Issue</option>
                  <option value="Account Login Credentials">Account Login Credentials</option>
                  <option value="Feature Request">Feature Request</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: isLight ? '#475569' : 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Priority</label>
                <select
                  value={ticketPriority}
                  onChange={e => setTicketPriority(e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box', padding: '0.5rem', borderRadius: '6px', border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.15)', background: isLight ? '#f8fafc' : '#1e293b', color: isLight ? '#0f172a' : '#fff', fontSize: '0.78rem' }}
                >
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                  <option value="CRITICAL">CRITICAL</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.65rem' }}>
              <button onClick={() => setShowCreateTicketModal(false)} style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: isLight ? '#475569' : 'var(--text-muted)', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
              <button onClick={handleCreateTicketFromEmail} style={{ padding: '0.5rem 1.25rem', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#fff', fontSize: '0.82rem', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 12px rgba(2, 132, 199, 0.4)' }}>Create Ticket</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   4. WHATSAPP VIEW (IMAGE 4 REFERENCE WITH AUTHENTIC LIGHT/DARK THEMES)
   ========================================================================= */
export const WhatsAppView: React.FC<{ onTicketCreate?: (t: any) => void; isSupervisorMode?: boolean; isLight?: boolean }> = ({ onTicketCreate, isSupervisorMode, isLight = false }) => {
  const [chats, setChats] = useState([
    {
      id: 'wa-1',
      name: 'Sarah Jenkins',
      phone: '+1 98765 43210',
      time: '10:32 AM',
      unread: 2,
      online: true,
      avatarInitial: 'SJ',
      avatarColor: '#3b82f6',
      about: 'Customer since May 2024',
      label: 'Premium Lead',
      messages: [
        { id: 1, sender: 'AGENT', text: 'Hi Sarah! How can I assist you today?', time: '10:30 AM', status: 'READ' },
        { id: 2, sender: 'CUSTOMER', text: 'Hello! I need help with the pricing plans.', time: '10:30 AM' },
        { id: 3, sender: 'AGENT', text: "Sure! I'd be happy to help you.", time: '10:31 AM', status: 'READ' },
        { id: 4, sender: 'CUSTOMER', text: 'Do you have any annual discount?', time: '10:31 AM' },
        { id: 5, sender: 'CUSTOMER', isVoiceNote: true, duration: '0:18', time: '10:31 AM' },
        { id: 6, sender: 'AGENT', text: 'Yes! We offer up to 20% discount on annual plans.', time: '10:32 AM', status: 'READ' },
        { id: 7, sender: 'CUSTOMER', text: 'Thanks! That helps.', time: '10:32 AM' }
      ]
    },
    {
      id: 'wa-2',
      name: 'Michael Brown',
      phone: '+1 91234 56789',
      time: '10:28 AM',
      unread: 1,
      online: true,
      avatarInitial: 'MB',
      avatarColor: '#10b981',
      about: 'Vendor Partner',
      label: 'Active Vendor',
      messages: [
        { id: 1, sender: 'CUSTOMER', text: 'Where can I see the latest wholesale catalog?', time: '10:28 AM' }
      ]
    },
    {
      id: 'wa-3',
      name: 'Emily Rodriguez',
      phone: '+1 99887 66554',
      time: 'Yesterday',
      unread: 0,
      online: false,
      avatarInitial: 'ER',
      avatarColor: '#ec4899',
      about: 'Agent Referral',
      label: 'Standard',
      messages: [
        { id: 1, sender: 'CUSTOMER', text: 'Thank you for approving the KYC re-upload.', time: 'Yesterday' }
      ]
    },
    {
      id: 'wa-4',
      name: 'David Chen',
      phone: '+1 88776 55433',
      time: 'Yesterday',
      unread: 0,
      online: false,
      avatarInitial: 'DC',
      avatarColor: '#8b5cf6',
      about: 'Customer',
      label: 'Standard',
      messages: [
        { id: 1, sender: 'CUSTOMER', text: 'Payment receipt received, thank you.', time: 'Yesterday' }
      ]
    },
    {
      id: 'wa-5',
      name: 'James Wilson',
      phone: '+1 77665 44332',
      time: 'May 19',
      unread: 0,
      online: false,
      avatarInitial: 'JW',
      avatarColor: '#f59e0b',
      about: 'Enterprise Lead',
      label: 'High Value',
      messages: [
        { id: 1, sender: 'CUSTOMER', text: 'Looking forward to the demo next week.', time: 'May 19' }
      ]
    }
  ]);

  const [selectedChat, setSelectedChat] = useState(chats[0]);
  const [waInput, setWaInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [playingVoiceId, setPlayingVoiceId] = useState<number | null>(null);
  const [showCreateTicketModal, setShowCreateTicketModal] = useState(false);
  const [ticketSubject, setTicketSubject] = useState('WhatsApp Customer Inquiry');
  const [ticketPriority, setTicketPriority] = useState('MEDIUM');
  const [waToast, setWaToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setWaToast(msg);
    setTimeout(() => setWaToast(null), 3000);
  };

  const quickTemplates = [
    { title: '1. Greeting', text: 'Hello, how can I assist you today?' },
    { title: '2. Pricing Info', text: 'We offer flexible pricing plans for your team.' },
    { title: '3. Closing', text: 'Let us know if you need any more help!' }
  ];

  const handleSendWA = async () => {
    if (!waInput.trim()) return;
    const sentText = waInput;
    const newMsg = {
      id: Date.now(),
      sender: 'AGENT',
      text: sentText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'SENT'
    };
    setSelectedChat(prev => ({
      ...prev,
      messages: [...prev.messages, newMsg]
    }));
    setWaInput('');

    try {
      await fetch('/api/v1/communication/whatsapp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: selectedChat.phone, message: sentText })
      });
    } catch (e) {}

    // Simulated customer reply after 1.5s
    setTimeout(() => {
      setSelectedChat(prev => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            id: Date.now() + 1,
            sender: 'CUSTOMER',
            text: 'Thank you! I received the message.',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'RECEIVED'
          }
        ]
      }));
    }, 1500);
  };

  const handleCreateTicketWA = () => {
    const newTicket = {
      id: `TCK-WA-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: selectedChat.name,
      customerPhone: selectedChat.phone,
      subject: ticketSubject,
      category: 'WhatsApp Support Message',
      priority: ticketPriority,
      channel: 'WHATSAPP_BUSINESS',
      status: 'OPEN',
      assignedAgent: 'Query WhatsApp Agent'
    };
    if (onTicketCreate) onTicketCreate(newTicket);
    showToast(`Ticket #${newTicket.id} created for ${selectedChat.name}`);
    setShowCreateTicketModal(false);
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '290px 1fr 300px',
      gap: '1rem',
      background: isLight ? '#ffffff' : '#090d16',
      borderRadius: '12px',
      border: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.08)',
      minHeight: '720px',
      overflow: 'hidden',
      boxShadow: isLight ? '0 4px 20px rgba(0,0,0,0.06)' : 'none',
      position: 'relative'
    }}>
      {/* FLOATING ACTION TOAST */}
      {waToast && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 99999,
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: '#fff',
          padding: '0.65rem 1.1rem',
          borderRadius: '8px',
          fontSize: '0.82rem',
          fontWeight: 700,
          boxShadow: '0 4px 20px rgba(16, 185, 129, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <CheckCircle size={16} />
          {waToast}
        </div>
      )}

      {/* COLUMN 1: WHATSAPP CHATS LIST */}
      <div style={{
        background: isLight ? '#f8fafc' : '#0d131f',
        borderRight: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          padding: '1rem',
          borderBottom: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: isLight ? '#0f172a' : 'var(--text-main)' }}>
            WhatsApp Chats ({chats.length})
          </h3>
          <button style={{ background: 'transparent', border: 'none', color: isLight ? '#64748b' : 'var(--text-muted)', cursor: 'pointer' }}>
            <MoreVertical size={16} />
          </button>
        </div>

        {/* Search */}
        <div style={{ padding: '0.65rem 1rem', borderBottom: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.04)' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: 8, top: 8, color: isLight ? '#94a3b8' : 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search or start new chat"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: isLight ? '#ffffff' : '#131b2c',
                border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: '6px',
                padding: '0.35rem 0.5rem 0.35rem 1.8rem',
                color: isLight ? '#0f172a' : '#fff',
                fontSize: '0.75rem'
              }}
            />
          </div>
        </div>

        {/* Chat List Items */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {chats.map(c => {
            const isSelected = selectedChat.id === c.id;
            return (
              <div
                key={c.id}
                onClick={() => setSelectedChat(c)}
                style={{
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  cursor: 'pointer',
                  borderBottom: isLight ? '1px solid #f1f5f9' : '1px solid rgba(255, 255, 255, 0.04)',
                  background: isSelected ? (isLight ? '#dcfce7' : 'rgba(34, 197, 94, 0.12)') : 'transparent',
                  borderLeft: isSelected ? '3px solid #22c55e' : '3px solid transparent',
                  transition: 'background 0.15s ease'
                }}
              >
                <div style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: c.avatarColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.85rem'
                }}>
                  {c.avatarInitial}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: '0.85rem', color: isLight ? '#0f172a' : 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {c.phone}
                    </strong>
                    <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : 'var(--text-muted)' }}>{c.time}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.15rem' }}>
                    <span style={{ fontSize: '0.75rem', color: isLight ? '#475569' : 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {c.name}
                    </span>
                    {c.unread > 0 && (
                      <span style={{
                        background: '#22c55e',
                        color: '#fff',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        padding: '0.1rem 0.4rem',
                        borderRadius: '9999px'
                      }}>
                        {c.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{ padding: '0.75rem 1rem', borderTop: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.08)', fontSize: '0.75rem', color: isLight ? '#64748b' : 'var(--text-muted)', textAlign: 'center' }}>
          Active WhatsApp Gateway Connected
        </div>
      </div>

      {/* COLUMN 2: AUTHENTIC WHATSAPP CHAT STREAM */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        background: isLight ? '#efeae2' : '#0b141a',
        backgroundImage: isLight
          ? 'radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px)'
          : 'radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '16px 16px'
      }}>
        {/* Contact Header */}
        <div style={{
          padding: '0.75rem 1.25rem',
          borderBottom: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: isLight ? '#f0f2f5' : '#202c33'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: selectedChat.avatarColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.85rem'
            }}>
              {selectedChat.avatarInitial}
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: isLight ? '#111b21' : '#e9edef' }}>
                {selectedChat.name} <span style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#8696a0', fontWeight: 400 }}>({selectedChat.phone})</span>
              </div>
              <div style={{ fontSize: '0.72rem', color: '#22c55e', marginTop: '1px' }}>
                Online • WhatsApp Business Official
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <TicketVisionButton
              ticket={{
                id: selectedChat.id,
                ticketNumber: 'TCK-WA-' + selectedChat.id.toUpperCase(),
                customerName: selectedChat.name,
                departmentLabel: 'WhatsApp Communications',
                status: 'LIVE_AI'
              }}
              size="sm"
            />
            <button
              onClick={() => setShowCreateTicketModal(true)}
              style={{
                background: '#00a884',
                border: 'none',
                color: '#fff',
                padding: '0.35rem 0.75rem',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <Plus size={13} /> Create Ticket
            </button>
            <button onClick={() => showToast('Calling ' + selectedChat.phone + '...')} style={{ background: 'transparent', border: 'none', color: isLight ? '#54656f' : '#8696a0', cursor: 'pointer' }}><Phone size={16} /></button>
            <button onClick={() => showToast('Starting video session...')} style={{ background: 'transparent', border: 'none', color: isLight ? '#54656f' : '#8696a0', cursor: 'pointer' }}><Video size={16} /></button>
          </div>
        </div>

        {/* Chat Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.65rem'
        }}>
          {selectedChat.messages.map((m: any) => {
            const isAgent = m.sender === 'AGENT';
            return (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  justifyContent: isAgent ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  background: isAgent ? (isLight ? '#d9fdd3' : '#005c4b') : (isLight ? '#ffffff' : '#202c33'),
                  color: isAgent ? (isLight ? '#111b21' : '#e9edef') : (isLight ? '#111b21' : '#e9edef'),
                  padding: m.isVoiceNote ? '0.5rem 0.85rem' : '0.65rem 0.95rem',
                  borderRadius: isAgent ? '8px 8px 0 8px' : '8px 8px 8px 0',
                  fontSize: '0.85rem',
                  lineHeight: 1.45,
                  boxShadow: isLight ? '0 1px 2px rgba(0,0,0,0.1)' : '0 1px 2px rgba(0,0,0,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                  border: isLight ? '1px solid rgba(0,0,0,0.04)' : 'none'
                }}>
                  {m.isVoiceNote ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: '180px' }}>
                      <button
                        onClick={() => {
                          setPlayingVoiceId(playingVoiceId === m.id ? null : m.id);
                          showToast(playingVoiceId === m.id ? 'Voice note paused.' : 'Playing voice note...');
                        }}
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: '50%',
                          background: '#10b981',
                          border: 'none',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        {playingVoiceId === m.id ? <Pause size={13} /> : <Play size={13} />}
                      </button>
                      <Mic size={16} color="#10b981" />
                      <div style={{ flex: 1, height: '4px', background: isLight ? '#cbd5e1' : 'rgba(255,255,255,0.2)', borderRadius: '2px' }}>
                        <div style={{ width: playingVoiceId === m.id ? '60%' : '20%', height: '100%', background: '#10b981', borderRadius: '2px' }}></div>
                      </div>
                      <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#8696a0' }}>{m.duration}</span>
                    </div>
                  ) : (
                    <span>{m.text}</span>
                  )}
                  <div style={{
                    fontSize: '0.65rem',
                    color: isLight ? '#64748b' : '#8696a0',
                    textAlign: 'right',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '0.2rem'
                  }}>
                    <span>{m.time}</span>
                    {isAgent && <CheckCheck size={12} color="#53bdeb" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* WhatsApp Composer */}
        <div style={{
          padding: '0.65rem 1rem',
          background: isLight ? '#f0f2f5' : '#202c33',
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          borderTop: isLight ? '1px solid #e2e8f0' : 'none'
        }}>
          <button style={{ background: 'transparent', border: 'none', color: isLight ? '#54656f' : '#8696a0', cursor: 'pointer' }}>
            <Smile size={20} />
          </button>
          <button style={{ background: 'transparent', border: 'none', color: isLight ? '#54656f' : '#8696a0', cursor: 'pointer' }}>
            <Paperclip size={20} />
          </button>
          <input
            type="text"
            placeholder="Type a WhatsApp message..."
            value={waInput}
            onChange={e => setWaInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSendWA()}
            style={{
              flex: 1,
              background: isLight ? '#ffffff' : '#2a3942',
              border: isLight ? '1px solid #e2e8f0' : 'none',
              borderRadius: '8px',
              padding: '0.55rem 0.85rem',
              color: isLight ? '#111b21' : '#fff',
              fontSize: '0.85rem'
            }}
          />
          {waInput.trim() ? (
            <button
              onClick={handleSendWA}
              style={{
                background: '#00a884',
                border: 'none',
                color: '#fff',
                width: 36,
                height: 36,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Send size={16} />
            </button>
          ) : (
            <button onClick={() => showToast('Voice recording active...')} style={{ background: 'transparent', border: 'none', color: isLight ? '#54656f' : '#8696a0', cursor: 'pointer' }}>
              <Mic size={20} />
            </button>
          )}
        </div>
      </div>

      {/* COLUMN 3: WHATSAPP CONTACT DETAILS & TEMPLATES */}
      <div style={{
        background: isLight ? '#f8fafc' : '#0d131f',
        borderLeft: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        padding: '1.25rem',
        gap: '1rem',
        overflowY: 'auto'
      }}>
        {/* Profile Card */}
        <div style={{
          textAlign: 'center',
          paddingBottom: '1rem',
          borderBottom: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: selectedChat.avatarColor,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.4rem',
            fontWeight: 800,
            margin: '0 auto 0.65rem auto'
          }}>
            {selectedChat.avatarInitial}
          </div>
          <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: isLight ? '#0f172a' : 'var(--text-main)' }}>
            {selectedChat.name}
          </h4>
          <span style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : 'var(--text-muted)' }}>
            {selectedChat.phone}
          </span>
          <div style={{ marginTop: '0.5rem' }}>
            <span style={{
              background: 'rgba(34, 197, 94, 0.15)',
              border: '1px solid rgba(34, 197, 94, 0.4)',
              color: '#22c55e',
              fontSize: '0.7rem',
              fontWeight: 700,
              padding: '0.15rem 0.5rem',
              borderRadius: '9999px'
            }}>
              {selectedChat.label}
            </span>
          </div>
        </div>

        {/* Quick WhatsApp HSM Templates */}
        <div>
          <strong style={{ fontSize: '0.82rem', color: isLight ? '#0f172a' : 'var(--text-main)', display: 'block', marginBottom: '0.65rem' }}>
            Quick WhatsApp Templates
          </strong>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {quickTemplates.map((t, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setWaInput(t.text);
                  showToast(`Template '${t.title}' inserted.`);
                }}
                style={{
                  background: isLight ? '#ffffff' : '#131b2c',
                  border: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '8px',
                  padding: '0.65rem',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  color: isLight ? '#334155' : 'var(--text-muted)',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ fontWeight: 700, color: '#00a884', marginBottom: '0.2rem' }}>{t.title}</div>
                <div>{t.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL 1: CREATE TICKET FROM WHATSAPP */}
      {showCreateTicketModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000
        }}>
          <div style={{
            background: isLight ? '#ffffff' : '#0f172a',
            border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '16px',
            width: '460px',
            padding: '1.5rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '1rem', color: isLight ? '#0f172a' : '#fff' }}>Create Ticket from WhatsApp</strong>
                <span style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : 'var(--text-muted)', display: 'block' }}>
                  Customer: <strong>{selectedChat.name}</strong> ({selectedChat.phone})
                </span>
              </div>
              <button onClick={() => setShowCreateTicketModal(false)} style={{ background: 'transparent', border: 'none', color: isLight ? '#64748b' : 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: isLight ? '#475569' : 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Subject</label>
              <input
                type="text"
                value={ticketSubject}
                onChange={e => setTicketSubject(e.target.value)}
                style={{ width: '100%', boxSizing: 'border-box', padding: '0.5rem 0.75rem', borderRadius: '6px', border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.15)', background: isLight ? '#f8fafc' : '#1e293b', color: isLight ? '#0f172a' : '#fff', fontSize: '0.82rem' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: isLight ? '#475569' : 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Category</label>
                <select
                  style={{ width: '100%', boxSizing: 'border-box', padding: '0.5rem', borderRadius: '6px', border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.15)', background: isLight ? '#f8fafc' : '#1e293b', color: isLight ? '#0f172a' : '#fff', fontSize: '0.78rem' }}
                >
                  <option>WhatsApp Customer Inquiry</option>
                  <option>Plan Upgrade Request</option>
                  <option>KYC Re-upload Notification</option>
                  <option>Vendor Catalog Assistance</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: isLight ? '#475569' : 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Priority</label>
                <select
                  value={ticketPriority}
                  onChange={e => setTicketPriority(e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box', padding: '0.5rem', borderRadius: '6px', border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.15)', background: isLight ? '#f8fafc' : '#1e293b', color: isLight ? '#0f172a' : '#fff', fontSize: '0.78rem' }}
                >
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                  <option value="CRITICAL">CRITICAL</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.65rem' }}>
              <button onClick={() => setShowCreateTicketModal(false)} style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: isLight ? '#475569' : 'var(--text-muted)', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
              <button onClick={handleCreateTicketWA} style={{ padding: '0.5rem 1.25rem', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#fff', fontSize: '0.82rem', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)' }}>Create Ticket</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
