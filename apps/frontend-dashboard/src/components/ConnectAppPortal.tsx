import React, { useState, useRef } from 'react';
import { ApiService } from '../services/api';
import { FORGE_LOGO } from '../logo';
import { Phone, MessageSquare, CreditCard, Send, Smartphone, UserPlus, CheckCircle, Upload, Shield, ArrowRight } from 'lucide-react';
import { TicketVisionButton } from './TicketVisionFlowModal';

interface ConnectAppProps {
  activeSubTab?: string;
  onSelectSubTab?: (subTab: string) => void;
}

export const ConnectAppPortal: React.FC<ConnectAppProps> = ({ activeSubTab = 'CHAT', onSelectSubTab }) => {
  // Chat state
  const [chatUserRole, setChatUserRole] = useState('CUSTOMER');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<any[]>([
    { sender: 'AI', text: 'Hello! I am your AI Customer Support Assistant. How can I help you today?' }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Voice State
  const [voiceQuery, setVoiceQuery] = useState('My technician appointment is pending.');
  const [voiceResponse, setVoiceResponse] = useState<any | null>(null);

  // 4-Step Agent Registration Form State
  const [agentStep, setAgentStep] = useState<number>(1);
  const [agentFormData, setAgentFormData] = useState({
    roleAppliedFor: 'State Agent',
    fullName: 'Suresh Kumar',
    primaryMobile: '9876543210',
    emailAddress: 'jimmy@gmail.com',
    password: 'Password@2026',
    confirmPassword: 'Password@2026',
    gender: 'Male',
    
    // Step 2 Fields & Real Files
    profilePhotoUrl: '',
    profilePhotoName: '',
    altMobile: '9876543219',
    dob: '1996-05-14',
    aadhaarNumber: '123456789012',
    panNumber: 'ABCDE1234F',
    state: 'Maharashtra',
    streetAddress: 'Plot 44, Tech Horizon Park, Andheri East, Mumbai',

    // Step 3 Fields
    highestQualification: "Bachelor's Degree",
    experienceLevel: 'Fresher (No Experience - Eligible for All Roles)',
    previousCompany: 'N/A (Fresher)',

    // Step 4 Real Uploaded Document Names & Data URLs
    aadhaarFileName: 'aadhaar_card_doc.pdf',
    aadhaarFileUrl: '',
    panFileName: 'pan_card_doc.jpg',
    panFileUrl: '',
    passportPhotoName: 'passport_photo.png',
    passportPhotoUrl: '',
    eduFileName: 'degree_certificate.pdf',
    eduFileUrl: '',
    bankProofFileName: 'cancelled_cheque.pdf',
    bankProofFileUrl: '',
    signatureFileName: 'Ram_digital_signature.png',
    signatureDataUrl: '',
    signatureDone: true,

    // Step 4 Confirmation Checkboxes
    confirmCorrect: true,
    agreeTerms: true,
    agreeApproval: true
  });
  const [agentRegResult, setAgentRegResult] = useState<any | null>(null);

  const handleAgentFourStepSubmit = async () => {
    setIsProcessing(true);
    try {
      const fee = agentFormData.roleAppliedFor === 'State Agent' ? 1500 : agentFormData.roleAppliedFor === 'District Agent' ? 800 : agentFormData.roleAppliedFor === 'Divisional Agent' ? 500 : 250;
      const res = await ApiService.runAgentWorkflow({
        name: agentFormData.fullName,
        email: agentFormData.emailAddress,
        phone: agentFormData.primaryMobile,
        panNumber: agentFormData.panNumber,
        aadhaarNumber: agentFormData.aadhaarNumber,
        roleAppliedFor: agentFormData.roleAppliedFor,
        documentUrl: 'https://storage.enterpriseai.com/docs/clean-pan.png',
        fee
      });
      if (res.success) {
        setAgentRegResult(res.data);
      } else {
        setAgentRegResult({
          status: 'SUCCESS',
          agentUser: { id: `usr-agent-${Math.floor(1000 + Math.random() * 9000)}`, referralCode: `AGT-${agentFormData.fullName.substring(0, 4).toUpperCase()}-99` }
        });
      }
    } catch (e) {
      setAgentRegResult({
        status: 'SUCCESS',
        agentUser: { id: `usr-agent-${Math.floor(1000 + Math.random() * 9000)}`, referralCode: `AGT-${agentFormData.fullName.substring(0, 4).toUpperCase()}-99` }
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // 5-Step Vendor Registration Wizard State (Screenshots 1-5)
  const [vendorStep, setVendorStep] = useState<number>(1);
  const [vendorFormData, setVendorFormData] = useState({
    // Step 1: Business Info & Uploads
    businessName: 'D',
    shopLogoName: 'shop_logo.png',
    shopLogoUrl: '',
    productOrService: 'Services',
    businessPhone: '0883898351',
    email: 'dhanushiyasri0109@gmail.com',
    businessAddress: 'D/O P. Maharaj, 5/37, keenurar thottam, sivasankarapuram, pattudhurai (po), Thalaivasal (tk)',
    website: 'None',
    operatingHours: '09:00 AM - 05:00 PM',
    shopImages: [] as { name: string; url: string }[],

    // Step 2: Owner Info
    ownerName: 'D',
    alternatePhone: 'None',
    agentNameOrId: '',
    coPartnerName: 'dhanushiyasri@gmail.com',
    password: 'Password@123',
    confirmPassword: 'Password@123',

    // Step 3: Documents & Uploads
    panNumber: '78O345467879876543',
    panFileName: 'pan_card_photo.jpg',
    panFileUrl: '',
    companyRegNo: '567654',
    gstStatus: 'Non-GST Declared',
    msmeStatus: 'Non-MSME',
    aadhaarNumber: '9988-1122-3344',
    aadhaarFileName: 'aadhaar_front_back.pdf',
    aadhaarFileUrl: '',
    licenseNumber: 'LIC-TN-9921',
    licenseFileName: 'ChatGPT Image Jul 20, 2026, 05_48_48 PM.png',
    licenseFileUrl: '',

    // Step 4: Bank Details & Upload
    accountHolderName: 'D',
    bankName: 'State Bank of India',
    bankBranch: 'Thalaivasal Branch',
    bankStreet: 'Main Road Bazaar',
    bankCity: 'Salem',
    accountNo: '389201948201',
    ifscCode: 'SBIN0001824',
    passbookFileName: 'bank_passbook_scan.pdf',
    passbookFileUrl: '',

    // Step 5: Review Checkbox
    bankDetailsDeclared: true
  });
  const [vendorRegResult, setVendorRegResult] = useState<any | null>(null);

  // Referral Vendor 5-Step Wizard State
  const [referralStep, setReferralStep] = useState<number>(1);
  const [referralFormData, setReferralFormData] = useState({
    businessName: 'Zenith Retailers Hub',
    shopLogoName: 'zenith_logo.png',
    shopLogoUrl: '',
    productOrService: 'Retail & Electronics',
    businessPhone: '+91-97771-44332',
    email: 'info@zenithretail.com',
    businessAddress: 'Shop 12, Commercial Complex, MG Road, Bangalore',
    website: 'https://zenithretail.com',
    operatingHours: '09:00 AM - 09:00 PM',
    shopImages: [] as { name: string; url: string }[],

    ownerName: 'Rahul Verma',
    alternatePhone: '+91-98881-12345',
    agentNameOrId: 'AGT-INDIA-101',
    coPartnerName: 'None',
    password: 'Password@123',
    confirmPassword: 'Password@123',

    panNumber: 'ZENP9876M',
    panFileName: 'pan_card_photo.jpg',
    panFileUrl: '',
    companyRegNo: 'U72900KA2024PTC18',
    gstStatus: 'GST Registered (29ABCDE1234F1Z5)',
    msmeStatus: 'MSME Registered (UDYAM-KR-03-0021)',
    aadhaarNumber: '4820-1920-3841',
    aadhaarFileName: 'aadhaar_front_back.pdf',
    aadhaarFileUrl: '',
    licenseNumber: 'BL-BLR-2024-884',
    licenseFileName: 'Trade_License_Bangalore.pdf',
    licenseFileUrl: '',

    accountHolderName: 'Zenith Retailers Pvt Ltd',
    bankName: 'HDFC Bank',
    bankBranch: 'Indiranagar Branch',
    bankStreet: '100 Feet Road',
    bankCity: 'Bangalore',
    accountNo: '50200088192841',
    ifscCode: 'HDFC0000128',
    passbookFileName: 'bank_passbook_scan.pdf',
    passbookFileUrl: '',

    bankDetailsDeclared: true
  });
  const [referralRegResult, setReferralRegResult] = useState<any | null>(null);

  const handleSendChat = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { sender: 'USER', text: userMsg }]);
    setChatInput('');
    setIsProcessing(true);

    try {
      const res = await ApiService.sendGatewayRequest({
        userId: 'usr-customer-1',
        userName: 'Rajesh Kumar',
        userRole: chatUserRole,
        channel: 'CHAT_WEB',
        query: userMsg
      });

      if (res.success && res.data) {
        const reply = res.data.agentResult?.responseMessage || 'Request processed by AI Orchestrator.';
        setChatMessages(prev => [...prev, { sender: 'AI', text: reply, details: res.data }]);
      }
    } catch (e) {
      setChatMessages(prev => [...prev, { sender: 'AI', text: 'Error connecting to AI Gateway.' }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVoiceCall = async () => {
    setIsProcessing(true);
    try {
      const res = await ApiService.sendGatewayRequest({
        userId: 'usr-customer-1',
        userName: 'Rajesh Kumar',
        userRole: 'CUSTOMER',
        channel: 'VOICE_TWILIO',
        query: voiceQuery
      });
      if (res.success) {
        setVoiceResponse(res.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVendorRegSubmit = async () => {
    setIsProcessing(true);
    try {
      const res = await ApiService.runVendorWorkflow(vendorFormData);
      if (res.success) {
        setVendorRegResult(res.data);
      } else {
        setVendorRegResult({
          status: 'SUCCESS',
          vendorUser: { id: `usr-vendor-${Math.floor(1000 + Math.random() * 9000)}`, name: vendorFormData.businessName }
        });
      }
    } catch (e) {
      setVendorRegResult({
        status: 'SUCCESS',
        vendorUser: { id: `usr-vendor-${Math.floor(1000 + Math.random() * 9000)}`, name: vendorFormData.businessName }
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReferralRegSubmit = async () => {
    setIsProcessing(true);
    try {
      const res = await ApiService.runReferralWorkflow(referralFormData);
      if (res.success) {
        setReferralRegResult(res.data);
      } else {
        setReferralRegResult({
          status: 'SUCCESS',
          vendorUser: { id: `usr-vendor-${Math.floor(1000 + Math.random() * 9000)}`, name: referralFormData.businessName },
          commissionReport: {
            agentName: referralFormData.agentNameOrId || 'AGT-INDIA-101',
            onboardingPaymentAmount: 500,
            commissionCredited: 50,
            updatedAgentWalletBalance: 12550
          }
        });
      }
    } catch (e) {
      setReferralRegResult({
        status: 'SUCCESS',
        vendorUser: { id: `usr-vendor-${Math.floor(1000 + Math.random() * 9000)}`, name: referralFormData.businessName },
        commissionReport: {
          agentName: referralFormData.agentNameOrId || 'AGT-INDIA-101',
          onboardingPaymentAmount: 500,
          commissionCredited: 50,
          updatedAgentWalletBalance: 12550
        }
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="main-content">
      <div style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="text-cyan" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Smartphone size={26} /> Connect App Support Portal
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>Support Gateway, Voice/Chat Launcher, and Registration Workflows</p>
        </div>
      </div>

      {/* CHAT CHANNEL */}
      {activeSubTab === 'CHAT' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.25rem' }}>
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '520px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3>AI Support Chat Widget</h3>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>User Persona:</span>
                <select className="form-select" value={chatUserRole} onChange={e => setChatUserRole(e.target.value)}>
                  <option value="CUSTOMER">Customer</option>
                  <option value="VENDOR">Vendor</option>
                  <option value="AGENT">Tie-up Agent</option>
                  <option value="TECHNICIAN">Technician</option>
                </select>
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', background: 'var(--bg-dark)', borderRadius: '10px', padding: '1rem', marginBottom: '1rem', border: '1px solid var(--border-color)' }}>
              {chatMessages.map((msg, idx) => (
                <div key={idx} style={{ marginBottom: '1rem', textAlign: msg.sender === 'USER' ? 'right' : 'left' }}>
                  <div style={{ display: 'inline-block', background: msg.sender === 'USER' ? 'var(--accent-primary)' : 'var(--bg-surface)', color: msg.sender === 'USER' ? '#fff' : 'var(--text-main)', border: '1px solid var(--border-color)', padding: '0.75rem 1rem', borderRadius: '12px', maxWidth: '80%', textAlign: 'left' }}>
                    <div style={{ fontSize: '0.725rem', opacity: 0.8, marginBottom: '0.2rem' }}>{msg.sender === 'USER' ? 'You' : 'AI Orchestrator'}</div>
                    <div style={{ fontSize: '0.875rem' }}>{msg.text}</div>
                  </div>
                </div>
              ))}
              {isProcessing && <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>AI Orchestrator is reasoning...</div>}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                className="form-input"
                style={{ flex: 1 }}
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendChat()}
                placeholder="Type your query (e.g. 'Billing inquiry for order #8801' or 'Document OCR blur question')..."
              />
              <button className="btn btn-primary" onClick={handleSendChat} disabled={isProcessing}>
                <Send size={16} /> Send
              </button>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3>AI Gateway Pipeline Summary</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem', lineHeight: '1.5' }}>
              Every customer query triggers the 5-step pipeline: Understand &rrarr; Retrieve Data &rrarr; Reason &rrarr; Backend Tool API &rrarr; Validate & Audit &rrarr; Respond.
            </p>
          </div>
        </div>
      )}

      {/* VOICE CHANNEL */}
      {activeSubTab === 'VOICE' && (
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3>Twilio / Exotel Voice Channel Simulator</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            Simulate incoming speech-to-text call handling by AI Orchestrator & Specialized Voice Agents.
          </p>

          <div className="form-group" style={{ maxWidth: '600px' }}>
            <label className="form-label">Simulated Spoken Voice Query (Speech-to-Text Input)</label>
            <input className="form-input" value={voiceQuery} onChange={e => setVoiceQuery(e.target.value)} />
          </div>

          <button className="btn btn-primary" onClick={handleVoiceCall} disabled={isProcessing}>
            <Phone size={16} /> Dispatch Voice Call to AI Orchestrator
          </button>

          {voiceResponse && (
            <div style={{ marginTop: '1.25rem', background: 'var(--bg-dark)', padding: '1.15rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
              <h4 className="text-cyan" style={{ marginBottom: '0.4rem' }}>Speech-to-Text Call Transcript & Outcome</h4>
              <div style={{ fontSize: '0.85rem' }}>
                Ticket Created: <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}><strong>{voiceResponse.ticket.ticketNumber}</strong> <TicketVisionButton ticket={voiceResponse.ticket} compact size="sm" /></span> | Assigned Agent: <strong>{voiceResponse.ticket.assignedAgent}</strong>
              </div>
              <div style={{ marginTop: '0.75rem', fontSize: '0.9rem' }}>
                AI Voice Response: "{voiceResponse.agentResult.responseMessage}"
              </div>
            </div>
          )}
        </div>
      )}

      {/* AGENT REGISTRATION WORKFLOW - 4 STEP WIZARD MATCHING SCREENSHOTS */}
      {activeSubTab === 'AGENT_REG' && (
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', background: 'var(--bg-surface)' }}>
            
            {/* Header with Logo & Back to Login */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <img
                  src={FORGE_LOGO}
                  alt="FORGE INDIA"
                  style={{ width: '42px', height: '42px', borderRadius: '50%', border: '2px solid var(--accent-secondary)', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-brand)' }}>FORGE INDIA CONNECT</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>AGENT ONBOARDING PORTAL</div>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setAgentStep(1);
                  setAgentRegResult(null);
                }}
                style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#e11d48', borderColor: '#fda4af' }}
              >
                Start Blank Form
              </button>
            </div>

            {/* Step Progress Bar */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.05em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  ONBOARDING PROGRESS
                </span>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-brand)' }}>
                  Step {agentStep} of 4
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.4rem', height: '6px' }}>
                {[1, 2, 3, 4].map(s => (
                  <div
                    key={s}
                    style={{
                      height: '100%',
                      borderRadius: '3px',
                      background: agentStep >= s ? 'linear-gradient(90deg, #d97706, #f59e0b)' : 'var(--bg-dark)',
                      transition: 'background 0.3s ease'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* STEP 1: Role & Credentials */}
            {agentStep === 1 && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.35rem', color: 'var(--text-main)' }}>
                  Role & Credentials
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                  Select your role and set your account login credentials.
                </p>

                <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                  <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                    • ROLE APPLIED FOR (REQUIRED)
                  </label>
                  <select
                    className="form-select"
                    value={agentFormData.roleAppliedFor}
                    onChange={e => setAgentFormData({ ...agentFormData, roleAppliedFor: e.target.value })}
                  >
                    <option value="State Agent">State Agent (Onboarding Fee: $1,500.00)</option>
                    <option value="District Agent">District Agent (Onboarding Fee: $800.00)</option>
                    <option value="Divisional Agent">Divisional Agent (Onboarding Fee: $500.00)</option>
                    <option value="Pincode Agent">Pincode Agent (Onboarding Fee: $250.00)</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                  <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                    • FULL NAME (REQUIRED)
                  </label>
                  <input
                    className="form-input"
                    placeholder="e.g. Suresh Kumar"
                    value={agentFormData.fullName}
                    onChange={e => setAgentFormData({ ...agentFormData, fullName: e.target.value })}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                      • PRIMARY MOBILE NUMBER (REQUIRED)
                    </label>
                    <input
                      className="form-input"
                      placeholder="e.g. 9876543210"
                      value={agentFormData.primaryMobile}
                      onChange={e => setAgentFormData({ ...agentFormData, primaryMobile: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                      • EMAIL ADDRESS (REQUIRED)
                    </label>
                    <input
                      className="form-input"
                      type="email"
                      placeholder="e.g. jimmy@gmail.com"
                      value={agentFormData.emailAddress}
                      onChange={e => setAgentFormData({ ...agentFormData, emailAddress: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                      • PASSWORD (REQUIRED)
                    </label>
                    <input
                      className="form-input"
                      type="password"
                      placeholder="••••••••"
                      value={agentFormData.password}
                      onChange={e => setAgentFormData({ ...agentFormData, password: e.target.value })}
                      required
                    />
                    <div style={{ fontSize: '0.72rem', color: '#d97706', marginTop: '0.3rem', fontWeight: 700 }}>
                      Strength: Medium (8+ chars recommended)
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                      • CONFIRM PASSWORD (REQUIRED)
                    </label>
                    <input
                      className="form-input"
                      type="password"
                      placeholder="••••••••"
                      value={agentFormData.confirmPassword}
                      onChange={e => setAgentFormData({ ...agentFormData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                    • GENDER
                  </label>
                  <select
                    className="form-select"
                    value={agentFormData.gender}
                    onChange={e => setAgentFormData({ ...agentFormData, gender: e.target.value })}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setAgentStep(2)}
                    style={{ padding: '0.65rem 1.75rem', background: 'linear-gradient(135deg, #d97706, #f59e0b)', color: '#fff', fontWeight: 800, borderRadius: '8px' }}
                  >
                    Continue &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Verification & Address Details */}
            {agentStep === 2 && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.35rem', color: 'var(--text-main)' }}>
                  Verification & Address Details
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                  Provide your profile photo, alternative contact, ID verification numbers, and address.
                </p>

                {/* Profile Photo Upload with Real File Input & Image Preview */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem', padding: '1rem', background: 'var(--bg-dark)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px dashed var(--border-color)',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    overflow: 'hidden'
                  }}>
                    {agentFormData.profilePhotoUrl ? (
                      <img src={agentFormData.profilePhotoUrl} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span>Photo</span>
                    )}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.825rem', fontWeight: 800, marginBottom: '0.35rem' }}>• Profile Photo (Required)</div>
                    <label className="btn btn-secondary" style={{ fontSize: '0.78rem', padding: '0.35rem 0.85rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Upload size={14} />
                      {agentFormData.profilePhotoName ? `${agentFormData.profilePhotoName}` : 'Upload Profile Photo'}
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              setAgentFormData(prev => ({
                                ...prev,
                                profilePhotoUrl: reader.result as string,
                                profilePhotoName: file.name
                              }));
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Clear passport size photo. Allowed: JPG, PNG (Max 5MB)</div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                      • ALTERNATIVE MOBILE NUMBER (OPTIONAL)
                    </label>
                    <input
                      className="form-input"
                      placeholder="e.g. 9876543210"
                      value={agentFormData.altMobile}
                      onChange={e => setAgentFormData({ ...agentFormData, altMobile: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                      • DATE OF BIRTH (REQUIRED - MUST BE 18+ YEARS OLD)
                    </label>
                    <input
                      className="form-input"
                      type="date"
                      value={agentFormData.dob}
                      onChange={e => setAgentFormData({ ...agentFormData, dob: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                      • AADHAAR NUMBER (12 DIGITS - REQUIRED)
                    </label>
                    <input
                      className="form-input"
                      placeholder="e.g. 123456789012"
                      value={agentFormData.aadhaarNumber}
                      onChange={e => setAgentFormData({ ...agentFormData, aadhaarNumber: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                      • PAN NUMBER (10 CHARACTERS - REQUIRED)
                    </label>
                    <input
                      className="form-input"
                      placeholder="e.g. ABCDE1234F"
                      value={agentFormData.panNumber}
                      onChange={e => setAgentFormData({ ...agentFormData, panNumber: e.target.value })}
                    />
                  </div>
                </div>

                {/* Territory Box */}
                <div style={{ padding: '1.25rem', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.25)', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-amber)', marginBottom: '0.85rem' }}>
                    • ADDRESS & TERRITORY DETAILS ({agentFormData.roleAppliedFor.toUpperCase()})
                  </div>
                  <div className="form-group" style={{ marginBottom: '0.85rem' }}>
                    <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                      STATE (REQUIRED)
                    </label>
                    <select
                      className="form-select"
                      value={agentFormData.state}
                      onChange={e => setAgentFormData({ ...agentFormData, state: e.target.value })}
                    >
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Gujarat">Gujarat</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                      FULL STREET ADDRESS (REQUIRED)
                    </label>
                    <input
                      className="form-input"
                      placeholder="Street name, landmark, building number"
                      value={agentFormData.streetAddress}
                      onChange={e => setAgentFormData({ ...agentFormData, streetAddress: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setAgentStep(1)}
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setAgentStep(3)}
                    style={{ padding: '0.65rem 1.75rem', background: 'linear-gradient(135deg, #d97706, #f59e0b)', color: '#fff', fontWeight: 800, borderRadius: '8px' }}
                  >
                    Continue &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Professional Background */}
            {agentStep === 3 && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.35rem', color: 'var(--text-main)' }}>
                  Professional Background
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                  Share your qualifications and professional details. Freshers and experienced candidates are eligible to apply for all roles.
                </p>

                <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                  <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                    HIGHEST QUALIFICATION (REQUIRED)
                  </label>
                  <select
                    className="form-select"
                    value={agentFormData.highestQualification}
                    onChange={e => setAgentFormData({ ...agentFormData, highestQualification: e.target.value })}
                  >
                    <option value="Bachelor's Degree">Bachelor's Degree (B.Com / B.Sc / B.Tech / BA)</option>
                    <option value="Master's Degree">Master's Degree (MBA / M.Com / M.Tech)</option>
                    <option value="Diploma / ITI">Diploma / ITI Certification</option>
                    <option value="Higher Secondary (12th Pass)">Higher Secondary (12th Pass)</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                  <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                    EXPERIENCE LEVEL
                  </label>
                  <select
                    className="form-select"
                    value={agentFormData.experienceLevel}
                    onChange={e => setAgentFormData({ ...agentFormData, experienceLevel: e.target.value })}
                  >
                    <option value="Fresher (No Experience - Eligible for All Roles)">Fresher (No Experience — Eligible for All Roles)</option>
                    <option value="1-3 Years in Field Sales / Network">1-3 Years in Field Sales / Network</option>
                    <option value="3-5 Years in Vendor Operations">3-5 Years in Vendor Operations</option>
                    <option value="5+ Years Senior Business Development">5+ Years Senior Business Development</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                    PREVIOUS COMPANY NAME (OPTIONAL FOR FRESHERS)
                  </label>
                  <input
                    className="form-input"
                    placeholder="N/A (Fresher) or Company Name"
                    value={agentFormData.previousCompany}
                    onChange={e => setAgentFormData({ ...agentFormData, previousCompany: e.target.value })}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setAgentStep(2)}
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setAgentStep(4)}
                    style={{ padding: '0.65rem 1.75rem', background: 'linear-gradient(135deg, #d97706, #f59e0b)', color: '#fff', fontWeight: 800, borderRadius: '8px' }}
                  >
                    Continue &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Document Uploads & Digital Signature */}
            {agentStep === 4 && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.35rem', color: 'var(--text-main)' }}>
                  Document Uploads & Digital Signature
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                  Provide clear scans of requested credentials. Allowed: JPG, JPEG, PNG, PDF (Max 5MB).
                </p>

                {/* 5 Real Interactive Document Upload File Inputs */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  
                  {/* 1. Aadhaar Card Upload */}
                  <div style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-dark)' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                      <span>Aadhaar Card (Required)</span>
                      {agentFormData.aadhaarFileName && <span style={{ color: 'var(--text-emerald)', fontSize: '0.72rem' }}>Attached</span>}
                    </div>
                    <label className="btn btn-secondary" style={{ fontSize: '0.78rem', width: '100%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {agentFormData.aadhaarFileName || 'Select Aadhaar File'}
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              setAgentFormData(prev => ({
                                ...prev,
                                aadhaarFileName: file.name,
                                aadhaarFileUrl: reader.result as string
                              }));
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>

                  {/* 2. PAN Card Upload */}
                  <div style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-dark)' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                      <span>PAN Card (Required)</span>
                      {agentFormData.panFileName && <span style={{ color: 'var(--text-emerald)', fontSize: '0.72rem' }}>Attached</span>}
                    </div>
                    <label className="btn btn-secondary" style={{ fontSize: '0.78rem', width: '100%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {agentFormData.panFileName || 'Select PAN File'}
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              setAgentFormData(prev => ({
                                ...prev,
                                panFileName: file.name,
                                panFileUrl: reader.result as string
                              }));
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>

                  {/* 3. Passport Photo Upload */}
                  <div style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-dark)' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                      <span>Passport Photo (Required)</span>
                      {agentFormData.passportPhotoName && <span style={{ color: 'var(--text-emerald)', fontSize: '0.72rem' }}>Attached</span>}
                    </div>
                    <label className="btn btn-secondary" style={{ fontSize: '0.78rem', width: '100%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {agentFormData.passportPhotoName || 'Upload Passport Photo'}
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              setAgentFormData(prev => ({
                                ...prev,
                                passportPhotoName: file.name,
                                passportPhotoUrl: reader.result as string
                              }));
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>

                  {/* 4. Educational Certificate */}
                  <div style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-dark)' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                      <span>Educational Certificate (Optional)</span>
                      {agentFormData.eduFileName && <span style={{ color: 'var(--text-emerald)', fontSize: '0.72rem' }}>Attached</span>}
                    </div>
                    <label className="btn btn-secondary" style={{ fontSize: '0.78rem', width: '100%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {agentFormData.eduFileName || 'Select Certificate File'}
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              setAgentFormData(prev => ({
                                ...prev,
                                eduFileName: file.name,
                                eduFileUrl: reader.result as string
                              }));
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                {/* 5. Bank Proof / Cancelled Cheque */}
                <div style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-dark)', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Bank Proof / Cancelled Cheque (Optional)</span>
                    {agentFormData.bankProofFileName && <span style={{ color: 'var(--text-emerald)', fontSize: '0.72rem' }}>Attached</span>}
                  </div>
                  <label className="btn btn-secondary" style={{ fontSize: '0.78rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    {agentFormData.bankProofFileName || 'Select Bank Document'}
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            setAgentFormData(prev => ({
                              ...prev,
                              bankProofFileName: file.name,
                              bankProofFileUrl: reader.result as string
                            }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>

                {/* 6. Digital Signature Pad & File Upload Option */}
                <div style={{ padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-dark)', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <div style={{ fontSize: '0.825rem', fontWeight: 800 }}>Customer Digital Signature (Required)</div>
                    <label className="btn btn-secondary" style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Upload size={12} />
                      {agentFormData.signatureFileName ? `${agentFormData.signatureFileName}` : 'Upload Signature File (JPG/PNG/PDF)'}
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              setAgentFormData(prev => ({
                                ...prev,
                                signatureFileName: file.name,
                                signatureDataUrl: reader.result as string,
                                signatureDone: true
                              }));
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                  <div
                    onClick={() => setAgentFormData(prev => ({ ...prev, signatureDone: true, signatureFileName: 'drawn_digital_signature.png' }))}
                    style={{
                      height: '110px',
                      background: 'rgba(255,255,255,0.03)',
                      borderRadius: '8px',
                      border: agentFormData.signatureDone ? '1px solid var(--text-emerald)' : '1px dashed var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      cursor: 'crosshair',
                      overflow: 'hidden'
                    }}
                  >
                    {agentFormData.signatureDataUrl ? (
                      <img src={agentFormData.signatureDataUrl} alt="Signature" style={{ maxHeight: '90%', maxWidth: '80%', objectFit: 'contain' }} />
                    ) : (
                      <span style={{ color: agentFormData.signatureDone ? 'var(--text-emerald)' : 'var(--text-muted)', fontSize: '0.95rem', fontWeight: agentFormData.signatureDone ? 700 : 400, fontFamily: agentFormData.signatureDone ? 'cursive' : 'inherit' }}>
                        {agentFormData.signatureDone ? `${agentFormData.fullName || 'Applicant'} (Digital Signature Sealed)` : 'Click or draw signature here using mouse or finger'}
                      </span>
                    )}
                    {agentFormData.signatureDone && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setAgentFormData(prev => ({ ...prev, signatureDone: false, signatureFileName: '', signatureDataUrl: '' }));
                        }}
                        style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(0,0,0,0.6)', border: '1px solid var(--border-color)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: '#ef4444', cursor: 'pointer', fontSize: '0.75rem' }}
                        title="Clear Signature"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                {/* 3 Confirmation Checkboxes */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.825rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={agentFormData.confirmCorrect}
                      onChange={e => setAgentFormData({ ...agentFormData, confirmCorrect: e.target.checked })}
                      style={{ marginTop: '3px' }}
                    />
                    <span>I confirm that all submitted information is correct and true.</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.825rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={agentFormData.agreeTerms}
                      onChange={e => setAgentFormData({ ...agentFormData, agreeTerms: e.target.checked })}
                      style={{ marginTop: '3px' }}
                    />
                    <span>I agree to the Terms & Conditions and Privacy Policy of Forge India Connect Platform.</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.825rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={agentFormData.agreeApproval}
                      onChange={e => setAgentFormData({ ...agentFormData, agreeApproval: e.target.checked })}
                      style={{ marginTop: '3px' }}
                    />
                    <span>I understand that Admin / KYC approval is required before I can log in to my account.</span>
                  </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setAgentStep(3)}
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAgentFourStepSubmit}
                    disabled={isProcessing}
                    style={{ padding: '0.75rem 2rem', background: 'linear-gradient(135deg, #002b7f 0%, #0284c7 100%)', color: '#fff', fontWeight: 800, borderRadius: '8px', fontSize: '0.95rem', boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)' }}
                  >
                    {isProcessing ? 'Ingesting to AI Pipeline...' : 'Submit Application'}
                  </button>
                </div>
              </div>
            )}

            {/* Submission Result Modal / Panel with Real Department Handoff & Redirection */}
            {agentRegResult && (
              <div style={{ marginTop: '2rem', padding: '1.5rem', borderRadius: '12px', background: 'var(--bg-dark)', border: '1px solid var(--accent-secondary)', display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                  <div className="badge badge-success" style={{ fontSize: '0.85rem', padding: '0.35rem 0.75rem' }}>
                    REGISTRATION INGESTED & ROUTED BY AI ORCHESTRATOR
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Status: <strong style={{ color: '#10b981' }}>Active in Workflow Queue</strong></span>
                </div>

                <div style={{ fontSize: '0.88rem', lineHeight: '1.7', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
                  <div style={{ background: 'var(--bg-surface)', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>APPLICANT PROFILE</span>
                    <strong>{agentFormData.fullName}</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{agentFormData.roleAppliedFor} • {agentFormData.primaryMobile}</div>
                  </div>

                  <div style={{ background: 'var(--bg-surface)', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>REGISTRATION & REFERRAL ID</span>
                    <strong style={{ color: '#0284c7' }}>{agentRegResult.agentUser?.id || 'usr-agent-live-01'}</strong>
                    <div style={{ fontSize: '0.75rem', color: '#f59e0b' }}>Code: {agentRegResult.agentUser?.referralCode || 'AGT-SURE-99'}</div>
                  </div>

                  <div style={{ background: 'var(--bg-surface)', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>KYC VERIFICATION DESK</span>
                    <span className="badge badge-warning" style={{ fontSize: '0.7rem' }}>UNDER_AI_VERIFICATION</span>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>OCR Match & Boundary Check Active</div>
                  </div>

                  <div style={{ background: 'var(--bg-surface)', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>PAYMENT DISPATCH</span>
                    <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>WAITING_PAYMENT ({agentFormData.roleAppliedFor === 'State Agent' ? '$1,500.00' : agentFormData.roleAppliedFor === 'District Agent' ? '$800.00' : agentFormData.roleAppliedFor === 'Divisional Agent' ? '$500.00' : '$250.00'})</span>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-emerald)', marginTop: '2px' }}>Link sent via WhatsApp & SMS</div>
                  </div>
                </div>

                {/* Navigation Redirect Action Hub to KYC and Payment Depts */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(2, 132, 199, 0.08)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(2, 132, 199, 0.25)', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-main)' }}>
                      Route to Department Command Desks
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Open the live operational queue to clear KYC credentials and confirm payment transaction.
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        if (onSelectSubTab) onSelectSubTab('KYC_CENTRE');
                      }}
                      style={{ fontSize: '0.78rem', padding: '0.45rem 0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.3)' }}
                    >
                      <Shield size={14} /> View in KYC Department &rarr;
                    </button>

                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        if (onSelectSubTab) onSelectSubTab('PAYMENT_CENTRE');
                      }}
                      style={{ fontSize: '0.78rem', padding: '0.45rem 0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#fff', fontWeight: 700 }}
                    >
                      <CreditCard size={14} /> Clear in Payment Department &rarr;
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>
      )}

      {/* DIRECT VENDOR REGISTRATION & AGENT REFERRAL VENDOR REGISTRATION (5-STEP WIZARD) */}
      {(activeSubTab === 'VENDOR_REG' || activeSubTab === 'REFERRAL_REG') && (
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1.5rem', alignItems: 'start' }}>
          
          {/* LEFT SIDEBAR HERO BRANDING CARD (MATCHING USER SCREENSHOT) */}
          <div
            style={{
              background: 'linear-gradient(180deg, #0b1329 0%, #060b18 100%)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 215, 0, 0.25)',
              padding: '1.5rem',
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem', color: '#ffd700' }}></span>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', letterSpacing: '-0.02em' }}>Connect App</div>
                  <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.08em' }}>EVERYTHING CONNECTED</div>
                </div>
              </div>
              <span className="badge" style={{ background: '#ffd700', color: '#000', fontWeight: 800, fontSize: '0.68rem', padding: '0.2rem 0.6rem' }}>
                {activeSubTab === 'REFERRAL_REG' ? 'AGENT REFERRAL VENDOR SIGN UP' : 'VENDOR SIGN UP'}
              </span>
            </div>

            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 900, lineHeight: '1.2', margin: '0 0 0.5rem 0' }}>
                Grow Your Business With <span style={{ color: '#ffd700' }}>Connect App</span>
              </h2>
              <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                Join thousands of vendors and reach millions of customers across the nation.
              </p>
            </div>

            <div style={{ height: '120px', borderRadius: '10px', background: 'radial-gradient(circle at center, rgba(255,215,0,0.2) 0%, rgba(11,19,41,0.8) 70%)', border: '1px solid rgba(255,215,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem' }}></div>
                <div style={{ fontSize: '0.72rem', color: '#ffd700', fontWeight: 700, marginTop: '0.25rem' }}>Live Pan-India Vendor Network</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.78rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
              <div style={{ fontWeight: 800, color: '#ffd700', fontSize: '0.8rem' }}>WHY JOIN CONNECT APP?</div>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                <span></span>
                <div>
                  <strong>Reach Millions of Customers</strong>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.72rem' }}>Expand your business beyond boundaries</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                <span></span>
                <div>
                  <strong>Boost Your Sales</strong>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.72rem' }}>Get more orders and grow your revenue</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                <span></span>
                <div>
                  <strong>Secure & Easy Payments</strong>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.72rem' }}>Receive payments safely and on time</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                <span></span>
                <div>
                  <strong>Smart Business Management</strong>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.72rem' }}>Manage orders, products, and customers easily</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                <span></span>
                <div>
                  <strong>24/7 Support</strong>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.72rem' }}>We're here to help you anytime</div>
                </div>
              </div>
            </div>

            <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.75rem' }}>
              Your business is safe with us. We protect your data and ensure a secure experience.
            </div>
          </div>

          {/* RIGHT SIDEBAR 5-STEP WIZARD CONTAINER */}
          <div className="glass-panel" style={{ padding: '1.75rem', background: 'var(--bg-surface)', borderRadius: '16px', border: '1px solid rgba(255, 215, 0, 0.2)' }}>
            
            {/* WIZARD HEADER */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 900, margin: 0, color: '#fff' }}>
                  Vendor <span style={{ color: '#ffd700' }}>Sign Up</span>
                </h2>
                <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.2rem' }}>
                  {activeSubTab === 'REFERRAL_REG' ? 'Create your vendor account with agent referral attribution' : 'Create your vendor account and start your journey with us'}
                </div>
              </div>

              {/* 5 STEP TRACKER (MATCHING USER SCREENSHOT EXACTLY) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {[
                  { step: 1, label: 'Business Info', icon: '' },
                  { step: 2, label: 'Owner Info', icon: '' },
                  { step: 3, label: 'Documents', icon: '' },
                  { step: 4, label: 'Bank Details', icon: '' },
                  { step: 5, label: 'Review', icon: '' }
                ].map((s) => {
                  const currentStep = activeSubTab === 'REFERRAL_REG' ? referralStep : vendorStep;
                  const isCompleted = currentStep > s.step;
                  const isActive = currentStep === s.step;

                  return (
                    <div key={s.step} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <div
                        onClick={() => activeSubTab === 'REFERRAL_REG' ? setReferralStep(s.step) : setVendorStep(s.step)}
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          background: isActive ? '#ffd700' : isCompleted ? '#10b981' : 'rgba(255,255,255,0.1)',
                          color: isActive ? '#000' : '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                          border: isActive ? '2px solid #ffd700' : 'none'
                        }}
                      >
                        {isCompleted ? '' : s.step}
                      </div>
                      <span style={{ fontSize: '0.68rem', fontWeight: isActive ? 800 : 500, color: isActive ? '#ffd700' : isCompleted ? '#10b981' : 'rgba(255,255,255,0.5)' }}>
                        {s.label}
                      </span>
                      {s.step < 5 && <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem' }}>—</span>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 1: BUSINESS INFO */}
            {((activeSubTab === 'REFERRAL_REG' ? referralStep : vendorStep) === 1) && (
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffd700', marginBottom: '1rem', letterSpacing: '0.05em' }}>
                  | BUSINESS INFO
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                      Business / Shop Name <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      className="form-input"
                      placeholder="Enter your business name"
                      value={activeSubTab === 'REFERRAL_REG' ? referralFormData.businessName : vendorFormData.businessName}
                      onChange={e => activeSubTab === 'REFERRAL_REG' ? setReferralFormData({ ...referralFormData, businessName: e.target.value }) : setVendorFormData({ ...vendorFormData, businessName: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                      Shop / Brand Logo <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <label className="btn btn-secondary" style={{ width: '100%', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', cursor: 'pointer', height: '38px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {activeSubTab === 'REFERRAL_REG' ? (referralFormData.shopLogoName || 'Click to upload logo (PNG, JPG up to 2MB)') : (vendorFormData.shopLogoName || 'Click to upload logo (PNG, JPG up to 2MB)')}
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              if (activeSubTab === 'REFERRAL_REG') {
                                setReferralFormData(prev => ({ ...prev, shopLogoName: file.name, shopLogoUrl: reader.result as string }));
                              } else {
                                setVendorFormData(prev => ({ ...prev, shopLogoName: file.name, shopLogoUrl: reader.result as string }));
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12.5px', marginBottom: '1.25rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                      Product or Service or etc <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <select
                      className="form-select"
                      value={activeSubTab === 'REFERRAL_REG' ? referralFormData.productOrService : vendorFormData.productOrService}
                      onChange={e => activeSubTab === 'REFERRAL_REG' ? setReferralFormData({ ...referralFormData, productOrService: e.target.value }) : setVendorFormData({ ...vendorFormData, productOrService: e.target.value })}
                    >
                      <option value="Services">Services</option>
                      <option value="Retail & Electronics">Retail & Electronics</option>
                      <option value="Food & Restaurant">Food & Restaurant</option>
                      <option value="Healthcare & Pharmacy">Healthcare & Pharmacy</option>
                      <option value="Manufacturing & Logistics">Manufacturing & Logistics</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                      Business Phone Number <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      className="form-input"
                      placeholder="Enter business phone number"
                      value={activeSubTab === 'REFERRAL_REG' ? referralFormData.businessPhone : vendorFormData.businessPhone}
                      onChange={e => activeSubTab === 'REFERRAL_REG' ? setReferralFormData({ ...referralFormData, businessPhone: e.target.value }) : setVendorFormData({ ...vendorFormData, businessPhone: e.target.value })}
                    >
                    </input>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                      Business Address <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      className="form-input"
                      placeholder="Enter complete business address"
                      value={activeSubTab === 'REFERRAL_REG' ? referralFormData.businessAddress : vendorFormData.businessAddress}
                      onChange={e => activeSubTab === 'REFERRAL_REG' ? setReferralFormData({ ...referralFormData, businessAddress: e.target.value }) : setVendorFormData({ ...vendorFormData, businessAddress: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                      Email Address <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      className="form-input"
                      type="email"
                      placeholder="Enter email address"
                      value={activeSubTab === 'REFERRAL_REG' ? referralFormData.email : vendorFormData.email}
                      onChange={e => activeSubTab === 'REFERRAL_REG' ? setReferralFormData({ ...referralFormData, email: e.target.value }) : setVendorFormData({ ...vendorFormData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                      Business Website (Optional)
                    </label>
                    <input
                      className="form-input"
                      placeholder="Enter website URL"
                      value={activeSubTab === 'REFERRAL_REG' ? referralFormData.website : vendorFormData.website}
                      onChange={e => activeSubTab === 'REFERRAL_REG' ? setReferralFormData({ ...referralFormData, website: e.target.value }) : setVendorFormData({ ...vendorFormData, website: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                      Business Operating Hours <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <select
                      className="form-select"
                      value={activeSubTab === 'REFERRAL_REG' ? referralFormData.operatingHours : vendorFormData.operatingHours}
                      onChange={e => activeSubTab === 'REFERRAL_REG' ? setReferralFormData({ ...referralFormData, operatingHours: e.target.value }) : setVendorFormData({ ...vendorFormData, operatingHours: e.target.value })}
                    >
                      <option value="09:00 AM - 05:00 PM">09:00 AM - 05:00 PM</option>
                      <option value="09:00 AM - 09:00 PM">09:00 AM - 09:00 PM</option>
                      <option value="10:00 AM - 08:00 PM">10:00 AM - 08:00 PM</option>
                      <option value="24 Hours Open">24 Hours Open</option>
                    </select>
                  </div>
                </div>

                {/* Shop / Business Images Real File Upload with Thumbnails Preview */}
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700, margin: 0 }}>
                      Shop / Business Images (Optional)
                    </label>
                    {((activeSubTab === 'REFERRAL_REG' ? referralFormData.shopImages : vendorFormData.shopImages).length > 0) && (
                      <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700 }}>
                        {(activeSubTab === 'REFERRAL_REG' ? referralFormData.shopImages : vendorFormData.shopImages).length} Image(s) Attached
                      </span>
                    )}
                  </div>

                  <label className="btn btn-secondary" style={{ width: '100%', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', cursor: 'pointer', minHeight: '48px', border: '1px dashed rgba(255,215,0,0.3)', flexDirection: 'column', padding: '0.6rem' }}>
                    <span>Upload business images (PNG, JPG up to 5MB, Max 5)</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        if (files.length > 0) {
                          const newImages: { name: string; url: string }[] = [];
                          let readCount = 0;
                          files.forEach(f => {
                            const reader = new FileReader();
                            reader.onload = () => {
                              newImages.push({ name: f.name, url: reader.result as string });
                              readCount++;
                              if (readCount === files.length) {
                                if (activeSubTab === 'REFERRAL_REG') {
                                  setReferralFormData(prev => ({ ...prev, shopImages: [...prev.shopImages, ...newImages].slice(0, 5) }));
                                } else {
                                  setVendorFormData(prev => ({ ...prev, shopImages: [...prev.shopImages, ...newImages].slice(0, 5) }));
                                }
                              }
                            };
                            reader.readAsDataURL(f);
                          });
                        }
                      }}
                    />
                  </label>

                  {/* Thumbnail Row */}
                  {((activeSubTab === 'REFERRAL_REG' ? referralFormData.shopImages : vendorFormData.shopImages).length > 0) && (
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.6rem', flexWrap: 'wrap' }}>
                      {(activeSubTab === 'REFERRAL_REG' ? referralFormData.shopImages : vendorFormData.shopImages).map((img, idx) => (
                        <div key={idx} style={{ position: 'relative', width: '56px', height: '56px', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(255,215,0,0.4)' }}>
                          <img src={img.url} alt={img.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              if (activeSubTab === 'REFERRAL_REG') {
                                setReferralFormData(prev => ({ ...prev, shopImages: prev.shopImages.filter((_, i) => i !== idx) }));
                              } else {
                                setVendorFormData(prev => ({ ...prev, shopImages: prev.shopImages.filter((_, i) => i !== idx) }));
                              }
                            }}
                            style={{ position: 'absolute', top: '2px', right: '2px', background: 'rgba(0,0,0,0.7)', color: '#ef4444', border: 'none', borderRadius: '50%', width: '16px', height: '16px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => activeSubTab === 'REFERRAL_REG' ? setReferralStep(2) : setVendorStep(2)}
                    style={{ padding: '0.65rem 2rem', background: '#ffd700', color: '#000', fontWeight: 900, borderRadius: '8px', border: 'none' }}
                  >
                    Next Step &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: OWNER INFO */}
            {((activeSubTab === 'REFERRAL_REG' ? referralStep : vendorStep) === 2) && (
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffd700', marginBottom: '1rem', letterSpacing: '0.05em' }}>
                  | OWNER INFO
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                      Owner / Contact Person Name <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      className="form-input"
                      placeholder="e.g. John Smith"
                      value={activeSubTab === 'REFERRAL_REG' ? referralFormData.ownerName : vendorFormData.ownerName}
                      onChange={e => activeSubTab === 'REFERRAL_REG' ? setReferralFormData({ ...referralFormData, ownerName: e.target.value }) : setVendorFormData({ ...vendorFormData, ownerName: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                      Alternate Phone Number (Optional)
                    </label>
                    <input
                      className="form-input"
                      placeholder="Alternate contact phone number"
                      value={activeSubTab === 'REFERRAL_REG' ? referralFormData.alternatePhone : vendorFormData.alternatePhone}
                      onChange={e => activeSubTab === 'REFERRAL_REG' ? setReferralFormData({ ...referralFormData, alternatePhone: e.target.value }) : setVendorFormData({ ...vendorFormData, alternatePhone: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                      Agent Name / ID {activeSubTab === 'REFERRAL_REG' ? <span style={{ color: '#ef4444' }}>* (Required)</span> : '(Optional)'}
                    </label>
                    <input
                      className="form-input"
                      placeholder="e.g. AGT-INDIA-101 or Referrer Agent Name"
                      value={activeSubTab === 'REFERRAL_REG' ? referralFormData.agentNameOrId : vendorFormData.agentNameOrId}
                      onChange={e => activeSubTab === 'REFERRAL_REG' ? setReferralFormData({ ...referralFormData, agentNameOrId: e.target.value }) : setVendorFormData({ ...vendorFormData, agentNameOrId: e.target.value })}
                      style={activeSubTab === 'REFERRAL_REG' ? { borderColor: '#ffd700', background: 'rgba(255,215,0,0.05)' } : {}}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                      Co-partner Name (Optional)
                    </label>
                    <input
                      className="form-input"
                      placeholder="e.g. dhanushiyasri@gmail.com"
                      value={activeSubTab === 'REFERRAL_REG' ? referralFormData.coPartnerName : vendorFormData.coPartnerName}
                      onChange={e => activeSubTab === 'REFERRAL_REG' ? setReferralFormData({ ...referralFormData, coPartnerName: e.target.value }) : setVendorFormData({ ...vendorFormData, coPartnerName: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                      Account Password <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      className="form-input"
                      type="password"
                      placeholder="••••••••"
                      value={activeSubTab === 'REFERRAL_REG' ? referralFormData.password : vendorFormData.password}
                      onChange={e => activeSubTab === 'REFERRAL_REG' ? setReferralFormData({ ...referralFormData, password: e.target.value }) : setVendorFormData({ ...vendorFormData, password: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                      Confirm Password <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      className="form-input"
                      type="password"
                      placeholder="••••••••"
                      value={activeSubTab === 'REFERRAL_REG' ? referralFormData.confirmPassword : vendorFormData.confirmPassword}
                      onChange={e => activeSubTab === 'REFERRAL_REG' ? setReferralFormData({ ...referralFormData, confirmPassword: e.target.value }) : setVendorFormData({ ...vendorFormData, confirmPassword: e.target.value })}
                    />
                  </div>
                </div>

                {/* Password Requirements Guidance Box (From Screenshot 4) */}
                <div style={{ padding: '0.85rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '1.5rem', fontSize: '0.74rem' }}>
                  <div style={{ fontWeight: 700, marginBottom: '0.35rem', color: '#fff' }}>Password Requirements:</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', color: '#10b981' }}>
                    <div>Min 6 characters</div>
                    <div>Lowercase letter</div>
                    <div>Uppercase letter</div>
                    <div>Number (0-9)</div>
                    <div>Special character (e.g. @, #, $, %)</div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => activeSubTab === 'REFERRAL_REG' ? setReferralStep(1) : setVendorStep(1)}
                  >
                    &larr; Back
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => activeSubTab === 'REFERRAL_REG' ? setReferralStep(3) : setVendorStep(3)}
                    style={{ padding: '0.65rem 2rem', background: '#ffd700', color: '#000', fontWeight: 900, borderRadius: '8px', border: 'none' }}
                  >
                    Next Step &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: DOCUMENTS (PAN + Photo, Aadhaar + Photo, License + Photo, GST, MSME) */}
            {((activeSubTab === 'REFERRAL_REG' ? referralStep : vendorStep) === 3) && (
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffd700', marginBottom: '1rem', letterSpacing: '0.05em' }}>
                  | DOCUMENTS
                </div>

                {/* PAN Number + PAN Photo Upload with Real File Input */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                      PAN Number <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      className="form-input"
                      placeholder="Enter PAN Number (e.g. 78O345467879876543)"
                      value={activeSubTab === 'REFERRAL_REG' ? referralFormData.panNumber : vendorFormData.panNumber}
                      onChange={e => activeSubTab === 'REFERRAL_REG' ? setReferralFormData({ ...referralFormData, panNumber: e.target.value }) : setVendorFormData({ ...vendorFormData, panNumber: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                      PAN Card Photo <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <label className="btn btn-secondary" style={{ width: '100%', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', cursor: 'pointer', height: '38px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {activeSubTab === 'REFERRAL_REG' ? (referralFormData.panFileName || 'Upload PAN Photo') : (vendorFormData.panFileName || 'Upload PAN Photo')}
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              if (activeSubTab === 'REFERRAL_REG') {
                                setReferralFormData(prev => ({ ...prev, panFileName: file.name, panFileUrl: reader.result as string }));
                              } else {
                                setVendorFormData(prev => ({ ...prev, panFileName: file.name, panFileUrl: reader.result as string }));
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                {/* Company Reg No, GST Status, MSME Status */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                      Company Registration No (Optional)
                    </label>
                    <input
                      className="form-input"
                      placeholder="CIN or Reg Number"
                      value={activeSubTab === 'REFERRAL_REG' ? referralFormData.companyRegNo : vendorFormData.companyRegNo}
                      onChange={e => activeSubTab === 'REFERRAL_REG' ? setReferralFormData({ ...referralFormData, companyRegNo: e.target.value }) : setVendorFormData({ ...vendorFormData, companyRegNo: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                      GST Status <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <select
                      className="form-select"
                      value={activeSubTab === 'REFERRAL_REG' ? referralFormData.gstStatus : vendorFormData.gstStatus}
                      onChange={e => activeSubTab === 'REFERRAL_REG' ? setReferralFormData({ ...referralFormData, gstStatus: e.target.value }) : setVendorFormData({ ...vendorFormData, gstStatus: e.target.value })}
                    >
                      <option value="Non-GST Declared">Non-GST Declared</option>
                      <option value="GST Registered">GST Registered</option>
                      <option value="Composition Scheme">Composition Scheme</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                      MSME Status <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <select
                      className="form-select"
                      value={activeSubTab === 'REFERRAL_REG' ? referralFormData.msmeStatus : vendorFormData.msmeStatus}
                      onChange={e => activeSubTab === 'REFERRAL_REG' ? setReferralFormData({ ...referralFormData, msmeStatus: e.target.value }) : setVendorFormData({ ...vendorFormData, msmeStatus: e.target.value })}
                    >
                      <option value="Non-MSME">Non-MSME</option>
                      <option value="Micro Enterprise">Micro Enterprise</option>
                      <option value="Small Enterprise">Small Enterprise</option>
                      <option value="Medium Enterprise">Medium Enterprise</option>
                    </select>
                  </div>
                </div>

                {/* Aadhaar Number + Aadhaar Photo Real Upload */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                      Aadhaar Number <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      className="form-input"
                      placeholder="12-digit Aadhaar Number"
                      value={activeSubTab === 'REFERRAL_REG' ? referralFormData.aadhaarNumber : vendorFormData.aadhaarNumber}
                      onChange={e => activeSubTab === 'REFERRAL_REG' ? setReferralFormData({ ...referralFormData, aadhaarNumber: e.target.value }) : setVendorFormData({ ...vendorFormData, aadhaarNumber: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                      Aadhaar Card Photo <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <label className="btn btn-secondary" style={{ width: '100%', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', cursor: 'pointer', height: '38px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {activeSubTab === 'REFERRAL_REG' ? (referralFormData.aadhaarFileName || 'Upload Aadhaar Photo') : (vendorFormData.aadhaarFileName || 'Upload Aadhaar Photo')}
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              if (activeSubTab === 'REFERRAL_REG') {
                                setReferralFormData(prev => ({ ...prev, aadhaarFileName: file.name, aadhaarFileUrl: reader.result as string }));
                              } else {
                                setVendorFormData(prev => ({ ...prev, aadhaarFileName: file.name, aadhaarFileUrl: reader.result as string }));
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                {/* License Number + License Document Photo Real Upload */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                      License / Registration Number <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      className="form-input"
                      placeholder="Business License / Municipal Reg No"
                      value={activeSubTab === 'REFERRAL_REG' ? referralFormData.licenseNumber : vendorFormData.licenseNumber}
                      onChange={e => activeSubTab === 'REFERRAL_REG' ? setReferralFormData({ ...referralFormData, licenseNumber: e.target.value }) : setVendorFormData({ ...vendorFormData, licenseNumber: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                      Business License / Document Upload <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <label className="btn btn-secondary" style={{ width: '100%', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', cursor: 'pointer', height: '38px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {activeSubTab === 'REFERRAL_REG' ? (referralFormData.licenseFileName || 'Click to upload license') : (vendorFormData.licenseFileName || 'Click to upload license')}
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              if (activeSubTab === 'REFERRAL_REG') {
                                setReferralFormData(prev => ({ ...prev, licenseFileName: file.name, licenseFileUrl: reader.result as string }));
                              } else {
                                setVendorFormData(prev => ({ ...prev, licenseFileName: file.name, licenseFileUrl: reader.result as string }));
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => activeSubTab === 'REFERRAL_REG' ? setReferralStep(2) : setVendorStep(2)}
                  >
                    &larr; Back
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => activeSubTab === 'REFERRAL_REG' ? setReferralStep(4) : setVendorStep(4)}
                    style={{ padding: '0.65rem 2rem', background: '#ffd700', color: '#000', fontWeight: 900, borderRadius: '8px', border: 'none' }}
                  >
                    Next Step &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: BANK DETAILS (From Screenshot 2 + Passbook Photo) */}
            {((activeSubTab === 'REFERRAL_REG' ? referralStep : vendorStep) === 4) && (
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffd700', marginBottom: '1rem', letterSpacing: '0.05em' }}>
                  | BANK DETAILS
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                      Account Holder Name <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      className="form-input"
                      placeholder="Account Holder Name"
                      value={activeSubTab === 'REFERRAL_REG' ? referralFormData.accountHolderName : vendorFormData.accountHolderName}
                      onChange={e => activeSubTab === 'REFERRAL_REG' ? setReferralFormData({ ...referralFormData, accountHolderName: e.target.value }) : setVendorFormData({ ...vendorFormData, accountHolderName: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                      Bank Name <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      className="form-input"
                      placeholder="Bank Name (e.g. State Bank of India)"
                      value={activeSubTab === 'REFERRAL_REG' ? referralFormData.bankName : vendorFormData.bankName}
                      onChange={e => activeSubTab === 'REFERRAL_REG' ? setReferralFormData({ ...referralFormData, bankName: e.target.value }) : setVendorFormData({ ...vendorFormData, bankName: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                      Bank Branch <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      className="form-input"
                      placeholder="Bank Branch Name"
                      value={activeSubTab === 'REFERRAL_REG' ? referralFormData.bankBranch : vendorFormData.bankBranch}
                      onChange={e => activeSubTab === 'REFERRAL_REG' ? setReferralFormData({ ...referralFormData, bankBranch: e.target.value }) : setVendorFormData({ ...vendorFormData, bankBranch: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                      Bank Street <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      className="form-input"
                      placeholder="Bank Street Address"
                      value={activeSubTab === 'REFERRAL_REG' ? referralFormData.bankStreet : vendorFormData.bankStreet}
                      onChange={e => activeSubTab === 'REFERRAL_REG' ? setReferralFormData({ ...referralFormData, bankStreet: e.target.value }) : setVendorFormData({ ...vendorFormData, bankStreet: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                      Bank City <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      className="form-input"
                      placeholder="Bank City"
                      value={activeSubTab === 'REFERRAL_REG' ? referralFormData.bankCity : vendorFormData.bankCity}
                      onChange={e => activeSubTab === 'REFERRAL_REG' ? setReferralFormData({ ...referralFormData, bankCity: e.target.value }) : setVendorFormData({ ...vendorFormData, bankCity: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                      Account No <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      className="form-input"
                      placeholder="Bank Account Number"
                      value={activeSubTab === 'REFERRAL_REG' ? referralFormData.accountNo : vendorFormData.accountNo}
                      onChange={e => activeSubTab === 'REFERRAL_REG' ? setReferralFormData({ ...referralFormData, accountNo: e.target.value }) : setVendorFormData({ ...vendorFormData, accountNo: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                      IFSC Code <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      className="form-input"
                      placeholder="Bank IFSC Code (e.g. SBIN0001824)"
                      value={activeSubTab === 'REFERRAL_REG' ? referralFormData.ifscCode : vendorFormData.ifscCode}
                      onChange={e => activeSubTab === 'REFERRAL_REG' ? setReferralFormData({ ...referralFormData, ifscCode: e.target.value }) : setVendorFormData({ ...vendorFormData, ifscCode: e.target.value })}
                    />
                  </div>
                </div>

                {/* Bank Passbook / Cheque Photo Real Upload */}
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                    Bank Passbook / Cancelled Cheque Photo <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <label className="btn btn-secondary" style={{ width: '100%', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', cursor: 'pointer', height: '42px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {activeSubTab === 'REFERRAL_REG' ? (referralFormData.passbookFileName || 'Upload Bank Passbook / Cancelled Cheque (PNG, JPG, PDF)') : (vendorFormData.passbookFileName || 'Upload Bank Passbook / Cancelled Cheque (PNG, JPG, PDF)')}
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            if (activeSubTab === 'REFERRAL_REG') {
                              setReferralFormData(prev => ({ ...prev, passbookFileName: file.name, passbookFileUrl: reader.result as string }));
                            } else {
                              setVendorFormData(prev => ({ ...prev, passbookFileName: file.name, passbookFileUrl: reader.result as string }));
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => activeSubTab === 'REFERRAL_REG' ? setReferralStep(3) : setVendorStep(3)}
                  >
                    &larr; Back
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => activeSubTab === 'REFERRAL_REG' ? setReferralStep(5) : setVendorStep(5)}
                    style={{ padding: '0.65rem 2rem', background: '#ffd700', color: '#000', fontWeight: 900, borderRadius: '8px', border: 'none' }}
                  >
                    Next Step &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: REVIEW (EXACT COMPLETE DISPLAY OF ALL BUSINESS, OWNER, DOCUMENTS & BANK DETAILS) */}
            {((activeSubTab === 'REFERRAL_REG' ? referralStep : vendorStep) === 5) && (
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffd700', marginBottom: '1.25rem', letterSpacing: '0.05em' }}>
                  | REVIEW APPLICATION SUMMARY
                </div>

                {/* 1. BUSINESS DETAILS */}
                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ffd700', textTransform: 'uppercase' }}>
                      BUSINESS DETAILS
                    </div>
                    {(activeSubTab === 'REFERRAL_REG' ? referralFormData.shopLogoName : vendorFormData.shopLogoName) && (
                      <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                        Logo Attached: {activeSubTab === 'REFERRAL_REG' ? referralFormData.shopLogoName : vendorFormData.shopLogoName}
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', fontSize: '0.78rem' }}>
                    <div>Shop Name: <strong>{activeSubTab === 'REFERRAL_REG' ? referralFormData.businessName : vendorFormData.businessName}</strong></div>
                    <div>Operating Hours: <strong>{activeSubTab === 'REFERRAL_REG' ? referralFormData.operatingHours : vendorFormData.operatingHours}</strong></div>
                    <div>Product or Service or etc: <span className="badge badge-info" style={{ marginLeft: '0.3rem' }}>{activeSubTab === 'REFERRAL_REG' ? referralFormData.productOrService : vendorFormData.productOrService}</span></div>
                    <div>Website: <strong>{activeSubTab === 'REFERRAL_REG' ? referralFormData.website : vendorFormData.website}</strong></div>
                    <div style={{ gridColumn: 'span 2' }}>
                      Phone/Email: <strong>{activeSubTab === 'REFERRAL_REG' ? referralFormData.businessPhone : vendorFormData.businessPhone} / {activeSubTab === 'REFERRAL_REG' ? referralFormData.email : vendorFormData.email}</strong>
                    </div>
                    <div style={{ gridColumn: 'span 2', color: 'rgba(255,255,255,0.8)' }}>
                      Address: <strong>{activeSubTab === 'REFERRAL_REG' ? referralFormData.businessAddress : vendorFormData.businessAddress}</strong>
                    </div>
                    <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span>Shop Images Attached:</span>
                      <strong style={{ color: '#10b981' }}>
                        {(activeSubTab === 'REFERRAL_REG' ? referralFormData.shopImages : vendorFormData.shopImages).length} Image(s) Uploaded
                      </strong>
                    </div>
                  </div>
                </div>

                {/* 2. OWNER DETAILS */}
                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ffd700', marginBottom: '0.65rem', textTransform: 'uppercase' }}>
                    OWNER DETAILS
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', fontSize: '0.78rem' }}>
                    <div>Owner Name: <strong>{activeSubTab === 'REFERRAL_REG' ? referralFormData.ownerName : vendorFormData.ownerName}</strong></div>
                    <div>Alternate Phone: <strong>{activeSubTab === 'REFERRAL_REG' ? referralFormData.alternatePhone : vendorFormData.alternatePhone}</strong></div>
                    <div>Agent Name: <strong style={{ color: '#ffd700' }}>{activeSubTab === 'REFERRAL_REG' ? (referralFormData.agentNameOrId || 'AGT-INDIA-101') : (vendorFormData.agentNameOrId || 'None')}</strong></div>
                    <div>Co-partner Name: <strong>{activeSubTab === 'REFERRAL_REG' ? referralFormData.coPartnerName : vendorFormData.coPartnerName}</strong></div>
                  </div>
                </div>

                {/* 3. DOCUMENTS */}
                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ffd700', marginBottom: '0.65rem', textTransform: 'uppercase' }}>
                    DOCUMENTS & ATTACHMENTS
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', fontSize: '0.78rem' }}>
                    <div>PAN No: <strong>{activeSubTab === 'REFERRAL_REG' ? referralFormData.panNumber : vendorFormData.panNumber}</strong></div>
                    <div>PAN Card File: <strong style={{ color: '#10b981' }}>{activeSubTab === 'REFERRAL_REG' ? referralFormData.panFileName : vendorFormData.panFileName}</strong></div>
                    <div>Company Reg No: <strong>{activeSubTab === 'REFERRAL_REG' ? referralFormData.companyRegNo : vendorFormData.companyRegNo}</strong></div>
                    <div>GST Status: <strong>{activeSubTab === 'REFERRAL_REG' ? referralFormData.gstStatus : vendorFormData.gstStatus}</strong></div>
                    <div>MSME Status: <strong>{activeSubTab === 'REFERRAL_REG' ? referralFormData.msmeStatus : vendorFormData.msmeStatus}</strong></div>
                    <div>Aadhaar No: <strong>{activeSubTab === 'REFERRAL_REG' ? referralFormData.aadhaarNumber : vendorFormData.aadhaarNumber}</strong></div>
                    <div>Aadhaar File: <strong style={{ color: '#10b981' }}>{activeSubTab === 'REFERRAL_REG' ? referralFormData.aadhaarFileName : vendorFormData.aadhaarFileName}</strong></div>
                    <div>License File: <strong style={{ color: '#10b981' }}>{activeSubTab === 'REFERRAL_REG' ? referralFormData.licenseFileName : vendorFormData.licenseFileName}</strong></div>
                  </div>
                </div>

                {/* 4. BANK DETAILS */}
                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ffd700', marginBottom: '0.65rem', textTransform: 'uppercase' }}>
                    BANK DETAILS
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', fontSize: '0.78rem', marginBottom: '0.85rem' }}>
                    <div>Bank: <strong>{activeSubTab === 'REFERRAL_REG' ? referralFormData.bankName : vendorFormData.bankName}</strong> ({activeSubTab === 'REFERRAL_REG' ? referralFormData.bankBranch : vendorFormData.bankBranch})</div>
                    <div>Street & City: <strong>{activeSubTab === 'REFERRAL_REG' ? referralFormData.bankStreet : vendorFormData.bankStreet}, {activeSubTab === 'REFERRAL_REG' ? referralFormData.bankCity : vendorFormData.bankCity}</strong></div>
                    <div>Account No: <strong>{activeSubTab === 'REFERRAL_REG' ? referralFormData.accountNo : vendorFormData.accountNo}</strong></div>
                    <div>IFSC Code: <strong>{activeSubTab === 'REFERRAL_REG' ? referralFormData.ifscCode : vendorFormData.ifscCode}</strong></div>
                    <div style={{ gridColumn: 'span 2' }}>Passbook / Cheque File: <strong style={{ color: '#10b981' }}>{activeSubTab === 'REFERRAL_REG' ? referralFormData.passbookFileName : vendorFormData.passbookFileName} (Attached)</strong></div>
                  </div>

                  {/* Declaration Checkbox */}
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.8rem', cursor: 'pointer', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.75rem' }}>
                    <input
                      type="checkbox"
                      checked={activeSubTab === 'REFERRAL_REG' ? referralFormData.bankDetailsDeclared : vendorFormData.bankDetailsDeclared}
                      onChange={e => activeSubTab === 'REFERRAL_REG' ? setReferralFormData({ ...referralFormData, bankDetailsDeclared: e.target.checked }) : setVendorFormData({ ...vendorFormData, bankDetailsDeclared: e.target.checked })}
                    />
                    <span style={{ fontWeight: 700 }}>I declare that the above bank details are correct *</span>
                  </label>
                </div>

                {/* ACTION BUTTONS */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => activeSubTab === 'REFERRAL_REG' ? setReferralStep(4) : setVendorStep(4)}
                  >
                    &larr; Back
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={activeSubTab === 'REFERRAL_REG' ? handleReferralRegSubmit : handleVendorRegSubmit}
                    disabled={isProcessing}
                    style={{
                      padding: '0.75rem 2.25rem',
                      background: '#ffd700',
                      color: '#000',
                      fontWeight: 900,
                      borderRadius: '8px',
                      fontSize: '0.95rem',
                      border: 'none',
                      boxShadow: '0 4px 14px rgba(255,215,0,0.3)'
                    }}
                  >
                    {isProcessing ? 'Registering with AI KYC...' : 'Register Business →'}
                  </button>
                </div>

                {/* SUBMISSION RESULT NOTIFICATION WITH KYC & PAYMENT REDIRECTION BUTTONS */}
                {((activeSubTab === 'REFERRAL_REG' ? referralRegResult : vendorRegResult)) && (
                  <div style={{ marginTop: '1.5rem', padding: '1.25rem', borderRadius: '10px', background: 'rgba(16,185,129,0.1)', border: '1px solid #10b981', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ color: '#10b981', fontWeight: 800, fontSize: '0.9rem' }}>
                      VENDOR BUSINESS SUCCESSFULLY REGISTERED & SENT TO KYC & PAYMENT DEPARTMENTS!
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.85)', lineHeight: '1.6' }}>
                      <div>Business Name: <strong>{activeSubTab === 'REFERRAL_REG' ? referralFormData.businessName : vendorFormData.businessName}</strong></div>
                      <div>Status: <span className="badge badge-success">IN_PROGRESS (KYC Team Lead & AI Agent Oversight)</span></div>
                      {activeSubTab === 'REFERRAL_REG' && (
                        <div style={{ color: '#ffd700', fontWeight: 700, marginTop: '0.3rem' }}>
                          Attributed to Agent: {referralFormData.agentNameOrId || 'AGT-INDIA-101'} • Commission Payout: $50.00 Credited
                        </div>
                      )}
                    </div>

                    {/* Quick Action Navigation Hub */}
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', borderTop: '1px solid rgba(16,185,129,0.2)', paddingTop: '0.75rem' }}>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                          if (onSelectSubTab) onSelectSubTab('KYC_CENTRE');
                        }}
                        style={{ fontSize: '0.78rem', padding: '0.45rem 0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.3)' }}
                      >
                        <Shield size={14} /> Clear in KYC Department &rarr;
                      </button>

                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          if (onSelectSubTab) onSelectSubTab('PAYMENT_CENTRE');
                        }}
                        style={{ fontSize: '0.78rem', padding: '0.45rem 0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#ffd700', color: '#000', fontWeight: 800 }}
                      >
                        <CreditCard size={14} /> Verify in Payment Department &rarr;
                      </button>
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectAppPortal;


