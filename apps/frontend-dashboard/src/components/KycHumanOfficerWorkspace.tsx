import React, { useState, useEffect, useRef } from 'react';
import {
  CheckCircle,
  AlertTriangle,
  User,
  Eye,
  Shield,
  FileText,
  Clock,
  Zap,
  Activity,
  CheckCircle2,
  XCircle,
  Search,
  Sparkles,
  ChevronRight,
  ChevronDown,
  UserCheck,
  Phone,
  PhoneCall,
  PhoneOff,
  FolderCheck,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Sliders,
  Send,
  Lock,
  MapPin,
  RefreshCw,
  BarChart2,
  Layers,
  ArrowRight,
  CreditCard,
  Bot,
  Radio,
  PlayCircle,
  Terminal,
  Download,
  FileSpreadsheet,
  TrendingUp,
  Award,
  Cpu
} from 'lucide-react';
import { TicketVisionButton } from './TicketVisionFlowModal';

interface KycHumanOfficerWorkspaceProps {
  activeSubTab?: string;
  onSelectSubTab?: (subTab: string) => void;
  showToast: (msg: string) => void;
}

export const KycHumanOfficerWorkspace: React.FC<KycHumanOfficerWorkspaceProps> = ({
  activeSubTab = 'LIVE_VERIFICATION_QUEUE',
  onSelectSubTab,
  showToast
}) => {
  // Master Assigned & Live Ingested KYC Cases (10 Streaming Applications)
  const [kycCases, setKycCases] = useState<any[]>([
    {
      id: 'REG-8822',
      applicantName: 'David Miller',
      phone: '+1-800-555-0102',
      email: 'david.miller@example.com',
      category: 'AGENT',
      status: 'LIVE_AI_PROCESSING',
      currentStep: 2,
      totalSteps: 6,
      currentStepName: '2. Neural OCR Parsing',
      flagReason: 'Aadhaar Card Bottom Corner Glare (AI OCR 88.5%)',
      slaCountdown: '3m 15s (Near Breach)',
      assignedAt: '09:15 AM',
      overallAiMatch: 88.5,
      fraudScore: 0.12,
      sanctionsStatus: 'CLEAN',
      faceMatchScore: 97.4,
      aiAgentName: 'VisionOCR & BioGuard AI',
      aiCurrentActivity: 'AI scanning Aadhaar corner glare and polling UIDAI state gateway...',
      onboardingFee: '$500.00 USD (Field Agent License)',
      paymentStatus: 'AWAITING_KYC_CLEARANCE',
      receivedAt: 'Just Now',
      aiLiveLogs: [
        { time: '09:15:01', bot: 'VisionOCR-Alpha', text: 'Document ingested: Aadhaar Card (Front). Resolving 300 DPI crop.' },
        { time: '09:15:02', bot: 'VisionOCR-Alpha', text: 'OCR extracted Name: David Miller, DOB: 14/05/1990, UID: 9928 4410 8821.' },
        { time: '09:15:03', bot: 'TamperGuard-EXIF', text: 'Warning: Flash reflection detected on bottom address bounding box (Glare Index: 0.42).' },
        { time: '09:15:04', bot: 'BioLiveness-3D', text: 'Face match verified against Selfie specimen: 97.4% cosine similarity (PASS).' },
        { time: '09:15:05', bot: 'AutoDecide-Master', text: 'Confidence below 90% threshold due to glare. Escalated to KYC Human Officer Desk.' }
      ],
      documents: [
        {
          id: 'DOC-DM-01',
          name: 'Aadhaar Card (Front & Back)',
          type: 'AADHAAR',
          number: '9928 4410 8821',
          status: 'FLAGGED_GLARE',
          fileSize: '2.4 MB',
          checksum: 'e3b0c44298fc1c149afbf4c8996fb924',
          icon: '',
          ocrData: {
            fullName: 'David Miller',
            dob: '14/05/1990',
            gender: 'MALE',
            idNumber: '9928 4410 8821',
            fatherName: 'Arthur Miller',
            address: 'Flat 402, Royal Palms, MG Road, Pune, MH 411001',
            pincode: '411001'
          }
        },
        {
          id: 'DOC-DM-02',
          name: 'Income Tax PAN Card',
          type: 'PAN_CARD',
          number: 'ABCDE1234F',
          status: 'VERIFIED',
          fileSize: '1.8 MB',
          checksum: '88a91048291048bca910492810482910',
          icon: '',
          ocrData: {
            fullName: 'David Miller',
            dob: '14/05/1990',
            idNumber: 'ABCDE1234F',
            fatherName: 'Arthur Miller'
          }
        },
        {
          id: 'DOC-DM-03',
          name: 'Bank Passbook / Cancelled Cheque',
          type: 'BANK_CHEQUE',
          number: 'HDFC-009210482',
          status: 'VERIFIED',
          fileSize: '3.1 MB',
          checksum: '991048291024bca88102910482910482',
          icon: '',
          ocrData: {
            accountName: 'David Miller',
            accountNumber: '50100291048291',
            ifsc: 'HDFC0000128',
            bank: 'HDFC Bank Ltd, MG Road Branch'
          }
        },
        {
          id: 'DOC-DM-04',
          name: 'Agent Onboarding Agreement & Signature',
          type: 'AGREEMENT',
          number: 'AGT-AGR-8822',
          status: 'VERIFIED',
          fileSize: '1.2 MB',
          checksum: '551048291048bca44102910482910482',
          icon: '',
          ocrData: {
            signatory: 'David Miller',
            contractTier: 'Tier-1 Partner',
            date: '22 Aug 2026'
          }
        }
      ]
    },
    {
      id: 'REG-8829',
      applicantName: 'Priya Ananthan (Apex Health Franchise)',
      phone: '+91-98440-22331',
      email: 'priya.ananthan@apexfranchise.in',
      category: 'MERCHANT',
      status: 'LIVE_AI_PROCESSING',
      currentStep: 3,
      totalSteps: 6,
      currentStepName: '3. 3D Face & Biometrics',
      flagReason: 'AI BioLiveness & PAN Extraction in-progress',
      slaCountdown: '14m 10s',
      assignedAt: '09:50 AM',
      overallAiMatch: 95.8,
      fraudScore: 0.04,
      sanctionsStatus: 'CLEAN',
      faceMatchScore: 98.6,
      aiAgentName: 'BioGuard & MCA Bot',
      aiCurrentActivity: 'AI verifying Ministry of Corporate Affairs CIN registry & 3D facial depth...',
      onboardingFee: '$600.00 USD (Franchise Onboarding Fee)',
      paymentStatus: 'AWAITING_KYC_CLEARANCE',
      receivedAt: '2 Mins Ago',
      aiLiveLogs: [
        { time: '09:50:01', bot: 'MCA-SyncBot', text: 'Queried MCA Portal for CIN #U85110KA2022PTC159021 (ACTIVE).' },
        { time: '09:50:04', bot: 'BioGuard-3D', text: 'Selfie vs Director PAN card comparison: 98.6% match confirmed.' }
      ],
      documents: [
        { id: 'DOC-PA-01', name: 'MCA Certificate of Incorporation', type: 'MCA_CERT', number: 'U85110KA2022PTC159021', status: 'VERIFIED', fileSize: '2.8 MB', icon: '' },
        { id: 'DOC-PA-02', name: 'Director Income Tax PAN Card', type: 'PAN_CARD', number: 'BNIPA9921K', status: 'VERIFIED', fileSize: '1.6 MB', icon: '' },
        { id: 'DOC-PA-03', name: 'Franchise Deed of Agreement', type: 'AGREEMENT', number: 'FRAN-DEED-2026', status: 'VERIFIED', fileSize: '3.4 MB', icon: '' }
      ]
    },
    {
      id: 'REG-8824',
      applicantName: 'Meera Nair (Apex Medical Logistics)',
      phone: '+91-99880-11223',
      email: 'meera.nair@apexmed.in',
      category: 'VENDOR',
      status: 'LIVE_AI_PROCESSING',
      currentStep: 4,
      totalSteps: 6,
      currentStepName: '4. Gov Registry Portal',
      flagReason: 'MSME & CIN Verification Query Active',
      slaCountdown: '8m 40s',
      assignedAt: '09:30 AM',
      overallAiMatch: 99.1,
      fraudScore: 0.05,
      sanctionsStatus: 'CLEAN',
      faceMatchScore: 99.2,
      aiAgentName: 'GovVerify & SanctionsBot',
      aiCurrentActivity: 'Cross-referencing Udyam portal and verifying GSTIN state database...',
      onboardingFee: '$750.00 USD (Vendor Enterprise Access)',
      paymentStatus: 'AWAITING_KYC_CLEARANCE',
      receivedAt: '15 Mins Ago',
      aiLiveLogs: [
        { time: '09:30:10', bot: 'GovVerify-Portal', text: 'Querying MSME Udyam Portal for UDYAM-MH-12-009182.' },
        { time: '09:30:12', bot: 'GovVerify-Portal', text: 'Registration status: ACTIVE (Verified Enterprise Entity).' }
      ],
      documents: [
        { id: 'DOC-MN-01', name: 'MSME Udyam Registration Certificate', type: 'MSME_CERT', number: 'UDYAM-MH-12-009182', status: 'VERIFIED', fileSize: '1.9 MB', icon: '' },
        { id: 'DOC-MN-02', name: 'Company PAN Card Specimen', type: 'PAN_CARD', number: 'AAACN9928M', status: 'VERIFIED', fileSize: '1.5 MB', icon: '' },
        { id: 'DOC-MN-03', name: 'Managing Director Passport & Photo', type: 'PASSPORT', number: 'P9928104', status: 'VERIFIED', fileSize: '2.8 MB', icon: '' }
      ]
    },
    {
      id: 'REG-8823',
      applicantName: 'Marcus Wright (Field Logistics)',
      phone: '+91-98770-44556',
      email: 'marcus.wright@partner.in',
      category: 'AGENT',
      status: 'LIVE_AI_PROCESSING',
      currentStep: 2,
      totalSteps: 6,
      currentStepName: '2. Neural OCR Parsing',
      flagReason: 'MRZ Checksum Digit Parsing in progress',
      slaCountdown: '12m 20s',
      assignedAt: '09:45 AM',
      overallAiMatch: 92.4,
      fraudScore: 0.22,
      sanctionsStatus: 'CLEAN',
      faceMatchScore: 98.1,
      aiAgentName: 'VisionOCR Neural Parser',
      aiCurrentActivity: 'Extracting MRZ lines from Smart Card License...',
      onboardingFee: '$500.00 USD (Field Agent License)',
      paymentStatus: 'AWAITING_KYC_CLEARANCE',
      receivedAt: '5 Mins Ago',
      aiLiveLogs: [
        { time: '09:45:02', bot: 'VisionOCR-Alpha', text: 'Reading MRZ line: DL<<MH142018009214<<<<<<' },
        { time: '09:45:04', bot: 'VisionOCR-Alpha', text: 'Extracted Driving License Number MH-14-2018-009214.' }
      ],
      documents: [
        { id: 'DOC-MW-01', name: 'Driving License Smart Card', type: 'DRIVING_LICENSE', number: 'MH-14-2018-009214', status: 'VERIFIED', fileSize: '2.1 MB', icon: '' },
        { id: 'DOC-MW-02', name: 'Income Tax PAN Card', type: 'PAN_CARD', number: 'BCDFG4412K', status: 'VERIFIED', fileSize: '1.4 MB', icon: '' }
      ]
    },
    {
      id: 'REG-8830',
      applicantName: 'Arjun Rampal (Express Fleet Partner)',
      phone: '+91-98110-33445',
      email: 'arjun.rampal@expressfleet.in',
      category: 'AGENT',
      status: 'LIVE_AI_PROCESSING',
      currentStep: 1,
      totalSteps: 6,
      currentStepName: '1. Ingestion & Pre-check',
      flagReason: 'New Packet Ingested • Tamper EXIF Analysis Active',
      slaCountdown: '15m 00s',
      assignedAt: '10:02 AM',
      overallAiMatch: 97.2,
      fraudScore: 0.03,
      sanctionsStatus: 'CLEAN',
      faceMatchScore: 98.0,
      aiAgentName: 'TamperGuard-EXIF Bot',
      aiCurrentActivity: 'Verifying cryptographic EXIF metadata and image compression artifacts...',
      onboardingFee: '$500.00 USD (Fleet Partner License)',
      paymentStatus: 'AWAITING_KYC_CLEARANCE',
      receivedAt: '1 Min Ago',
      aiLiveLogs: [
        { time: '10:02:01', bot: 'Ingest-Router', text: 'Incoming 4 documents packet received via Mobile SDK.' },
        { time: '10:02:03', bot: 'TamperGuard-EXIF', text: 'Camera hardware signature verified (Samsung S24 Ultra). No clone artifacts.' }
      ],
      documents: [
        { id: 'DOC-AR-01', name: 'Commercial Driving License', type: 'DRIVING_LICENSE', number: 'DL-04-2019-994821', status: 'VERIFIED', fileSize: '2.3 MB', icon: '' },
        { id: 'DOC-AR-02', name: 'Aadhaar Identity Card', type: 'AADHAAR', number: '8829 1049 3921', status: 'VERIFIED', fileSize: '1.9 MB', icon: '' },
        { id: 'DOC-AR-03', name: 'Fleet Commercial Agreement', type: 'AGREEMENT', number: 'FLEET-AGR-2026', status: 'VERIFIED', fileSize: '1.5 MB', icon: '' }
      ]
    },
    {
      id: 'REG-8831',
      applicantName: 'Kavita Sharma (Zenith Diagnostics)',
      phone: '+91-98220-55667',
      email: 'kavita.sharma@zenithmed.in',
      category: 'VENDOR',
      status: 'LIVE_AI_PROCESSING',
      currentStep: 3,
      totalSteps: 6,
      currentStepName: '3. 3D Face & Biometrics',
      flagReason: '3D Face Depth & Liveness Angle Verification in Progress',
      slaCountdown: '11m 45s',
      assignedAt: '09:55 AM',
      overallAiMatch: 96.5,
      fraudScore: 0.02,
      sanctionsStatus: 'CLEAN',
      faceMatchScore: 98.9,
      aiAgentName: 'BioGuard-3D Neural Matcher',
      aiCurrentActivity: 'Comparing live video liveness frame against Aadhaar photo matrix...',
      onboardingFee: '$750.00 USD (Healthcare Vendor Tier)',
      paymentStatus: 'AWAITING_KYC_CLEARANCE',
      receivedAt: '3 Mins Ago',
      aiLiveLogs: [
        { time: '09:55:01', bot: 'BioGuard-3D', text: 'Detected 128 facial landmark points on selfie capture.' },
        { time: '09:55:04', bot: 'BioGuard-3D', text: 'Liveness confidence: 99.4% (No spoofing, dynamic eye blink verified).' }
      ],
      documents: [
        { id: 'DOC-KS-01', name: 'Clinical Establishment Certificate', type: 'CLINICAL_CERT', number: 'MED-EST-99201', status: 'VERIFIED', fileSize: '3.1 MB', icon: '' },
        { id: 'DOC-KS-02', name: 'Director PAN Card', type: 'PAN_CARD', number: 'CPKS88291M', status: 'VERIFIED', fileSize: '1.4 MB', icon: '' }
      ]
    },
    {
      id: 'REG-8832',
      applicantName: 'Vikram Singhania (Royal Foods Franchise)',
      phone: '+91-98330-77889',
      email: 'vikram.singhania@royalfoods.in',
      category: 'MERCHANT',
      status: 'LIVE_AI_PROCESSING',
      currentStep: 4,
      totalSteps: 6,
      currentStepName: '4. Gov Registry Portal',
      flagReason: 'FSSAI License & GSTIN Active Query',
      slaCountdown: '9m 10s',
      assignedAt: '09:40 AM',
      overallAiMatch: 98.2,
      fraudScore: 0.01,
      sanctionsStatus: 'CLEAN',
      faceMatchScore: 99.1,
      aiAgentName: 'GovVerify & FSSAI Gateway',
      aiCurrentActivity: 'Polling FSSAI Food Safety national registry & MCA Director registry...',
      onboardingFee: '$600.00 USD (Franchise Onboarding Fee)',
      paymentStatus: 'AWAITING_KYC_CLEARANCE',
      receivedAt: '8 Mins Ago',
      aiLiveLogs: [
        { time: '09:40:02', bot: 'FSSAI-Gateway', text: 'FSSAI License #10020021004829 confirmed ACTIVE until 2029.' },
        { time: '09:40:05', bot: 'GSTIN-Portal', text: 'GSTIN 27AAACR8829K1Z4 verified in Maharashtra jurisdiction.' }
      ],
      documents: [
        { id: 'DOC-VS-01', name: 'FSSAI Food Safety License', type: 'FSSAI_LICENSE', number: '10020021004829', status: 'VERIFIED', fileSize: '2.6 MB', icon: '' },
        { id: 'DOC-VS-02', name: 'Franchise Business PAN', type: 'PAN_CARD', number: 'AAACR8829K', status: 'VERIFIED', fileSize: '1.5 MB', icon: '' }
      ]
    },
    {
      id: 'REG-8833',
      applicantName: 'Ananya Deshmukh (GreenTech Solar)',
      phone: '+91-98450-99001',
      email: 'ananya.deshmukh@greentech.in',
      category: 'VENDOR',
      status: 'LIVE_AI_PROCESSING',
      currentStep: 5,
      totalSteps: 6,
      currentStepName: '5. Deep Tamper Scan',
      flagReason: 'Pixel Hologram & Copy-Move Forgery Verification',
      slaCountdown: '6m 30s',
      assignedAt: '09:35 AM',
      overallAiMatch: 99.5,
      fraudScore: 0.01,
      sanctionsStatus: 'CLEAN',
      faceMatchScore: 99.4,
      aiAgentName: 'TamperGuard Neural Shield',
      aiCurrentActivity: 'Running deep convolutional neural network for digital alteration & font kerning...',
      onboardingFee: '$750.00 USD (Vendor Enterprise Access)',
      paymentStatus: 'AWAITING_KYC_CLEARANCE',
      receivedAt: '12 Mins Ago',
      aiLiveLogs: [
        { time: '09:35:02', bot: 'TamperGuard-CNN', text: 'Analyzing high-frequency noise patterns across document boundary.' },
        { time: '09:35:06', bot: 'TamperGuard-CNN', text: 'Zero splicing or font manipulation detected. Document Integrity: 100% Genuine.' }
      ],
      documents: [
        { id: 'DOC-AD-01', name: 'Ministry of New & Renewable Energy Cert', type: 'MNRE_CERT', number: 'MNRE-2026-SOLAR-09', status: 'VERIFIED', fileSize: '3.4 MB', icon: '' },
        { id: 'DOC-AD-02', name: 'Corporate PAN Card', type: 'PAN_CARD', number: 'AAACD8829P', status: 'VERIFIED', fileSize: '1.6 MB', icon: '' }
      ]
    },
    {
      id: 'REG-8812',
      applicantName: 'Rajesh Kumar',
      phone: '+91-98765-43210',
      email: 'rajesh.kumar@fieldagent.in',
      category: 'AGENT',
      status: 'TRANSFERRED_TO_PAYMENT',
      currentStep: 6,
      totalSteps: 6,
      currentStepName: '6. Completed & Transferred',
      flagReason: 'KYC Verified • Transferred to Payment Team',
      slaCountdown: 'SLA MET',
      assignedAt: '08:45 AM',
      overallAiMatch: 99.4,
      fraudScore: 0.01,
      sanctionsStatus: 'CLEAN',
      faceMatchScore: 99.6,
      aiAgentName: 'Payment Auto-Settler Bot',
      aiCurrentActivity: 'Payment AI attempting auto-debit of $500.00 Onboarding Fee via UPI Gateway...',
      onboardingFee: '$500.00 USD (Field Agent License)',
      paymentStatus: 'PAYMENT_AI_PROCESSING',
      receivedAt: '1 Hour Ago',
      aiLiveLogs: [
        { time: '08:45:00', bot: 'AutoDecide-Master', text: 'All 4 KYC documents verified. Marked KYC_APPROVED.' },
        { time: '08:45:02', bot: 'Orchestrator-Router', text: 'Transferred registration payload to Payment Department Pipeline.' },
        { time: '08:45:05', bot: 'Payment-AI-Bot', text: 'Initiating autonomous Razorpay UPI mandate capture ($500.00).' }
      ],
      documents: [
        { id: 'DOC-RK-01', name: 'Aadhaar Card (Front & Back)', type: 'AADHAAR', number: '5489 1029 3847', status: 'VERIFIED', fileSize: '2.1 MB', icon: '' },
        { id: 'DOC-RK-02', name: 'Income Tax PAN Card', type: 'PAN', number: 'ABCDE1234F', status: 'VERIFIED', fileSize: '1.7 MB', icon: '' },
        { id: 'DOC-RK-03', name: 'Bank Passbook / Cheque', type: 'BANK', number: 'SBI-002910482', status: 'VERIFIED', fileSize: '2.9 MB', icon: '' },
        { id: 'DOC-RK-04', name: 'Agent Onboarding Agreement', type: 'AGREEMENT', number: 'AGT-AGR-8812', status: 'VERIFIED', fileSize: '1.1 MB', icon: '' }
      ]
    },
    {
      id: 'REG-8821',
      applicantName: 'Sophia Chen (Acme Global Supplies)',
      phone: '+91-99881-22334',
      email: 'sophia.chen@acmeglobal.com',
      category: 'VENDOR',
      status: 'TRANSFERRED_TO_PAYMENT',
      currentStep: 6,
      totalSteps: 6,
      currentStepName: '6. Completed & Transferred',
      flagReason: 'KYC Verified • Transferred to Payment Team',
      slaCountdown: 'SLA MET',
      assignedAt: '09:00 AM',
      overallAiMatch: 99.8,
      fraudScore: 0.02,
      sanctionsStatus: 'CLEAN',
      faceMatchScore: 99.8,
      aiAgentName: 'Payment Auto-Settler Bot',
      aiCurrentActivity: 'Payment AI verified transaction #PAY-8821 ($750.00). Settled to Escrow.',
      onboardingFee: '$750.00 USD (Vendor Enterprise Access)',
      paymentStatus: 'PAID_SETTLED',
      receivedAt: '45 Mins Ago',
      aiLiveLogs: [
        { time: '09:00:00', bot: 'AutoDecide-Master', text: 'Corporate GSTIN & PAN cleared. KYC Status: VERIFIED.' },
        { time: '09:00:05', bot: 'Payment-AI-Bot', text: 'Transaction #PAY-8821 captured via NetBanking. Receipt generated.' }
      ],
      documents: [
        { id: 'DOC-SC-01', name: 'GSTIN Registration Certificate', type: 'GSTIN', number: '27AAACG9928M1Z8', status: 'VERIFIED', fileSize: '2.5 MB', icon: '' },
        { id: 'DOC-SC-02', name: 'Corporate Entity PAN Card', type: 'PAN', number: 'AAACG9928M', status: 'VERIFIED', fileSize: '1.6 MB', icon: '' },
        { id: 'DOC-SC-03', name: 'Primary Bank Current Account', type: 'BANK', number: 'HDFC-8829104', status: 'VERIFIED', fileSize: '3.2 MB', icon: '' },
        { id: 'DOC-SC-04', name: 'Board Resolution Document', type: 'BOARD_RES', number: 'BR-2026-08', status: 'VERIFIED', fileSize: '1.4 MB', icon: '' }
      ]
    }
  ]);

  // Selected Active Case for Review & AI Monitoring
  const [selectedCase, setSelectedCase] = useState<any>(kycCases[0]);
  const [activeDocIndex, setActiveDocIndex] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [imageFilter, setImageFilter] = useState<'NORMAL' | 'CONTRAST' | 'SHARPEN' | 'INVERT'>('NORMAL');
  const [queueFilter, setQueueFilter] = useState<'ALL' | 'PENDING' | 'URGENT' | 'LIVE_AI' | 'AGENT' | 'VENDOR'>('ALL');
  const [queueSearch, setQueueSearch] = useState<string>('');
  const [shadowingSearchQuery, setShadowingSearchQuery] = useState<string>('');
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState<boolean>(false);
  const [isSimulatingLiveStream, setIsSimulatingLiveStream] = useState<boolean>(true);
  const [expandedLogsTicketId, setExpandedLogsTicketId] = useState<string | null>(null);
  const searchDropdownRef = useRef<HTMLDivElement>(null);

  // Auto-advancing AI Pipeline Live Stream Simulation (Step-by-step progress for 10 tickets)
  useEffect(() => {
    let interval: any = null;
    if (isSimulatingLiveStream) {
      interval = setInterval(() => {
        setKycCases(prevCases => {
          return prevCases.map(c => {
            if (c.status === 'LIVE_AI_PROCESSING' && c.currentStep < 6) {
              const nextStep = c.currentStep + 1;
              const stepNames = [
                '1. Ingestion & Pre-check',
                '2. Neural OCR Parsing',
                '3. 3D Face & Biometrics',
                '4. Gov Registry Portal',
                '5. Deep Tamper Scan',
                '6. Completed & Transferred'
              ];
              const isCompleted = nextStep >= 6;
              const newLogs = [
                ...c.aiLiveLogs,
                {
                  time: new Date().toLocaleTimeString(),
                  bot: nextStep === 2 ? 'VisionOCR-Alpha' : nextStep === 3 ? 'BioGuard-3D' : nextStep === 4 ? 'GovVerify-Portal' : nextStep === 5 ? 'TamperGuard-CNN' : 'AutoDecide-Master',
                  text: nextStep === 2 ? `OCR confidence verified at ${(95 + Math.random() * 4).toFixed(1)}%` : nextStep === 3 ? `3D Face Geometry: Matched selfie specimen (PASS)` : nextStep === 4 ? `Government Portal state registry responded (VALID)` : nextStep === 5 ? `Tamper scan complete. Integrity 100% Genuine.` : `AI Approval Complete. Auto-transferring payload to Payment Team.`
                }
              ];

              return {
                ...c,
                currentStep: nextStep,
                currentStepName: stepNames[nextStep - 1] || '6. Completed & Transferred',
                status: isCompleted ? 'TRANSFERRED_TO_PAYMENT' : 'LIVE_AI_PROCESSING',
                paymentStatus: isCompleted ? 'PAYMENT_AI_PROCESSING' : c.paymentStatus,
                aiLiveLogs: newLogs.slice(-6)
              };
            }
            return c;
          });
        });
      }, 4000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSimulatingLiveStream]);

  // Helper to extract or generate accurate OCR data for any case and doc
  const getOcrForCaseAndDoc = (c: any, docIdx: number = 0) => {
    if (!c) return { fullName: '', dob: '', gender: 'MALE', idNumber: '', fatherName: '', address: '', pincode: '411001' };
    const doc = c.documents?.[docIdx] || c.documents?.[0];
    if (doc?.ocrData && Object.keys(doc.ocrData).length > 0) {
      return {
        fullName: doc.ocrData.fullName || doc.ocrData.accountName || doc.ocrData.signatory || c.applicantName,
        dob: doc.ocrData.dob || '14/05/1990',
        gender: doc.ocrData.gender || (c.applicantName.toLowerCase().includes('priya') || c.applicantName.toLowerCase().includes('meera') || c.applicantName.toLowerCase().includes('kavita') || c.applicantName.toLowerCase().includes('ananya') || c.applicantName.toLowerCase().includes('sophia') ? 'FEMALE' : 'MALE'),
        idNumber: doc.ocrData.idNumber || doc.ocrData.accountNumber || doc?.number || c.id,
        fatherName: doc.ocrData.fatherName || 'Ramesh ' + (c.applicantName.split(' ')[1] || 'Kumar'),
        address: doc.ocrData.address || `Flat ${101 + docIdx * 20}, Tower B, Commercial Enclave, Pune, MH 411001`,
        pincode: doc.ocrData.pincode || '411001'
      };
    }

    // Dynamic accurate values for each case
    const isFemale = c.applicantName.toLowerCase().includes('priya') ||
      c.applicantName.toLowerCase().includes('meera') ||
      c.applicantName.toLowerCase().includes('kavita') ||
      c.applicantName.toLowerCase().includes('ananya') ||
      c.applicantName.toLowerCase().includes('sophia');

    const cleanName = c.applicantName.replace(/\s*\(.*?\)\s*/g, '').trim();

    return {
      fullName: cleanName,
      dob: c.id === 'REG-8812' ? '22/08/1988' : c.id === 'REG-8821' ? '10/11/1992' : c.id === 'REG-8823' ? '05/03/1986' : c.id === 'REG-8824' ? '18/09/1991' : c.id === 'REG-8829' ? '12/04/1989' : c.id === 'REG-8830' ? '30/01/1993' : c.id === 'REG-8831' ? '15/07/1987' : c.id === 'REG-8832' ? '28/06/1984' : c.id === 'REG-8833' ? '09/12/1995' : '14/05/1990',
      gender: isFemale ? 'FEMALE' : 'MALE',
      idNumber: doc?.number || (c.id === 'REG-8812' ? '5489 1029 3847' : c.id === 'REG-8821' ? '27AAACG9928M1Z8' : c.id === 'REG-8823' ? 'MH-14-2018-009214' : c.id === 'REG-8824' ? 'UDYAM-MH-12-009182' : c.id === 'REG-8829' ? 'U85110KA2022PTC159021' : c.id === 'REG-8830' ? 'DL-04-2019-994821' : c.id === 'REG-8831' ? 'MED-EST-99201' : c.id === 'REG-8832' ? '10020021004829' : c.id === 'REG-8833' ? 'MNRE-2026-SOLAR-09' : c.id),
      fatherName: 'Suresh ' + (cleanName.split(' ')[1] || 'Kumar'),
      address: `Plot 42, Sector 18, Commercial Hub, ${c.phone?.includes('984') ? 'Bengaluru, KA 560001' : c.phone?.includes('982') ? 'Mumbai, MH 400001' : c.phone?.includes('987') ? 'Pune, MH 411001' : 'Delhi NCR 110001'}`,
      pincode: '411001'
    };
  };

  // Editable OCR Field Values (Auto-synced with active case)
  const [editedOcrFields, setEditedOcrFields] = useState<any>(() => getOcrForCaseAndDoc(kycCases[0], 0));

  // Automatically synchronize OCR fields when selected case or active document changes
  useEffect(() => {
    if (selectedCase) {
      setEditedOcrFields(getOcrForCaseAndDoc(selectedCase, activeDocIndex));
    }
  }, [selectedCase, activeDocIndex]);

  // Modals & Action States
  const [blurReuploadModal, setBlurReuploadModal] = useState<boolean>(false);
  const [blurReuploadNote, setBlurReuploadNote] = useState<string>('Please upload a clear photo of your Aadhaar Card without flash glare on the corner.');
  const [escalateTlModal, setEscalateTlModal] = useState<boolean>(false);
  const [escalateTlNote, setEscalateTlNote] = useState<string>('');
  const [viewAllDocsModal, setViewAllDocsModal] = useState<boolean>(false);

  // Direct Outbound Calling with Registerer State (Replaced Video KYC)
  const [activeCallStatus, setActiveCallStatus] = useState<null | 'DIALING' | 'IN_CALL'>(null);
  const [callDuration, setCallDuration] = useState<number>(0);
  const [callNotes, setCallNotes] = useState<string>('');

  // Live Timer for Active Call
  useEffect(() => {
    let timer: any = null;
    if (activeCallStatus === 'IN_CALL') {
      timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [activeCallStatus]);

  const formatCallTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const activeDoc = selectedCase?.documents?.[activeDocIndex] || selectedCase?.documents?.[0];

  // 1. Action: Take Over Case from AI Agent
  const handleTakeoverFromAi = (caseId: string) => {
    setKycCases(prev => prev.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          status: 'HUMAN_INTERCEPTED',
          flagReason: 'Officer Rohan Verma Intercepted from AI Agent',
          aiLiveLogs: [
            ...c.aiLiveLogs,
            { time: new Date().toLocaleTimeString(), bot: 'Human-Governor', text: 'KYC Human Officer Rohan Verma took over ticket resolution from AI.' }
          ]
        };
      }
      return c;
    }));
    setSelectedCase((prev: any) => ({
      ...prev,
      status: 'HUMAN_INTERCEPTED',
      flagReason: 'Officer Rohan Verma Intercepted from AI Agent',
      aiLiveLogs: [
        ...prev.aiLiveLogs,
        { time: new Date().toLocaleTimeString(), bot: 'Human-Governor', text: 'KYC Human Officer Rohan Verma took over ticket resolution from AI.' }
      ]
    }));
    showToast(`Successfully taken over Case ${caseId} from AI Agent! Officer control active.`);
  };

  // 2. Action: Complete KYC & Transfer to Payment Team
  const handleCompleteAndTransferToPayment = (caseItem: any) => {
    const updatedStatus = 'TRANSFERRED_TO_PAYMENT';
    const updatedPaymentStatus = 'PAYMENT_AI_PROCESSING';

    setKycCases(prev => prev.map(c => {
      if (c.id === caseItem.id) {
        return {
          ...c,
          status: updatedStatus,
          paymentStatus: updatedPaymentStatus,
          flagReason: 'KYC Verified by Officer Rohan • Sent to Payment Team',
          slaCountdown: 'SLA MET',
          aiLiveLogs: [
            ...c.aiLiveLogs,
            { time: new Date().toLocaleTimeString(), bot: 'Officer-Rohan', text: 'KYC certified and approved by Human Officer. Transferred to Payment Pipeline.' },
            { time: new Date().toLocaleTimeString(), bot: 'Payment-AI-Bot', text: `Payment AI received ${caseItem.onboardingFee} fee payload. Attempting automated settlement.` }
          ]
        };
      }
      return c;
    }));

    setSelectedCase((prev: any) => ({
      ...prev,
      status: updatedStatus,
      paymentStatus: updatedPaymentStatus,
      flagReason: 'KYC Verified by Officer Rohan • Sent to Payment Team',
      slaCountdown: 'SLA MET',
      aiLiveLogs: [
        ...prev.aiLiveLogs,
        { time: new Date().toLocaleTimeString(), bot: 'Officer-Rohan', text: 'KYC certified and approved by Human Officer. Transferred to Payment Pipeline.' },
        { time: new Date().toLocaleTimeString(), bot: 'Payment-AI-Bot', text: `Payment AI received ${caseItem.onboardingFee} fee payload. Attempting automated settlement.` }
      ]
    }));

    showToast(`KYC Approved! Case ${caseItem.id} transferred to Payment Team (Payment AI processing ${caseItem.onboardingFee}).`);
  };

  // Direct Call Actions
  const handleStartDirectCall = (phone: string) => {
    setActiveCallStatus('DIALING');
    showToast(`Initiating PSTN voice call to registerer ${phone}...`);
    setTimeout(() => {
      setActiveCallStatus('IN_CALL');
    }, 1500);
  };

  const handleEndDirectCall = () => {
    setActiveCallStatus(null);
    showToast(`Call with ${selectedCase.applicantName} ended (${formatCallTime(callDuration)}). Audio transcript saved to audit log.`);
  };

  // 1. Download Officer Performance Report (.CSV)
  const handleDownloadOfficerReport = () => {
    const csvContent = [
      'KYC HUMAN OFFICER PERFORMANCE & AUDIT REPORT',
      `Officer Name,Rohan Verma`,
      `Officer ID,KYC-OFF-04`,
      `Supervisor,Alex Vance (KYC Team Lead)`,
      `Shift,Morning 08:00 - 17:00 IST`,
      `Date,${new Date().toLocaleDateString()}`,
      `Report Generated At,${new Date().toLocaleTimeString()}`,
      '',
      'KEY METRIC,VALUE,BENCHMARK TARGET,STATUS',
      'Daily KYC Quota,42 / 60,60 Applications,70% Target Met',
      'Transferred to Payment Team,38 Cleared,35 Applications,Exceeded Target',
      'Verification Accuracy Rate,99.6%,99.0%,Outstanding (0 False Certifications)',
      'Average Handling Time (AHT),1m 42s,3m 00s,Super-Fast',
      'SLA Compliance Rate,99.1%,95.0%,SLA Met',
      'AI Takeovers & Exceptions Resolved,9 Handled,N/A,All Interventions Certified',
      'Direct Voice PSTN Calls Conducted,5 Calls,N/A,100% Clarification Rate',
      '',
      'RESOLVED APPLICATIONS BREAKDOWN (TODAY)',
      'Application ID,Applicant Name,Category,Documents Verified,AHT,Status,Officer Action',
      'REG-8822,David Miller,AGENT,4 Docs,1m 30s,APPROVED_PAYMENT,Cleared Aadhaar corner flash glare override',
      'REG-8829,Priya Ananthan,MERCHANT,3 Docs,1m 15s,APPROVED_PAYMENT,Validated MCA CIN registry match',
      'REG-8824,Meera Nair,VENDOR,3 Docs,2m 10s,APPROVED_PAYMENT,Resolved Interpol Red Notice false positive non-match',
      'REG-8823,Marcus Wright,AGENT,2 Docs,1m 40s,APPROVED_PAYMENT,Verified MRZ checksum alignment on driving license',
      'REG-8812,Rajesh Kumar,AGENT,4 Docs,1m 10s,APPROVED_PAYMENT,Instant 1-Click payment transfer approval',
      'REG-8821,Sophia Chen,VENDOR,4 Docs,1m 25s,APPROVED_PAYMENT,Verified Corporate GSTIN and PAN'
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `KYC_Officer_Rohan_Verma_Performance_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Downloaded KYC Human Officer Performance Report (.CSV)!');
  };

  // 2. Download AI Agent Performance & Telemetry Report (.CSV)
  const handleDownloadAiReport = () => {
    const csvContent = [
      'AI AGENT WORKFORCE & MODEL TELEMETRY AUDIT REPORT',
      `Orchestrator,Master AI Router v3.4`,
      `Pipeline Department,KYC Autonomous Ingestion Gateway`,
      `Date,${new Date().toLocaleDateString()}`,
      `Generated At,${new Date().toLocaleTimeString()}`,
      '',
      'GLOBAL AI TELEMETRY METRIC,VALUE,BENCHMARK,STATUS',
      'Total Documents Ingested Today,1482 Documents,1200 Target,High Volume',
      'Straight-Through Processing (STP) Rate,82.4%,80.0%,Target Surpassed',
      'Human Exception / Routing Rate,17.6%,20.0%,Optimal Filtering',
      'Average Neural Inference Speed,2.4s per document,4.0s SLA,High Velocity',
      'Autonomous Payment Pipeline Handoffs,1221 Cases,N/A,Processed',
      '',
      'AI NEURAL MODEL PERFORMANCE BREAKDOWN',
      'Model Name,Version,Primary Task,Accuracy,Avg Latency,Exceptions Flagged',
      'VisionOCR-Alpha,v4.2.1,Neural Character Extraction,97.8%,1.2s,14 Glare / Low Res',
      'BioGuard-3D,v2.9.0,3D Facial Liveness & Match,99.4%,0.8s,2 Spoofing Attempts Blocked',
      'GovVerify Portal Gateway,v3.1.0,UIDAI/MCA/GSTIN/FSSAI,99.8%,1.6s,5 Invalid CIN/GSTIN',
      'TamperGuard-CNN,v5.0.2,Copy-Move & Splicing Scan,99.1%,1.1s,4 Alterations Caught',
      'AutoDecide-Master,v1.8.0,Confidence Thresholding & Route,99.9%,0.3s,120 Human Handoffs'
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `AI_Agent_Workforce_Performance_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Downloaded AI Agent Workforce & Telemetry Audit Report (.CSV)!');
  };

  // 3. Download Combined Dual Audit Package
  const handleDownloadCombinedReport = () => {
    handleDownloadOfficerReport();
    setTimeout(() => {
      handleDownloadAiReport();
    }, 400);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* ========================================================================= */}
      {/* 1. SUBTAB: LIVE VERIFICATION QUEUE & INCOMING STREAM (REAL-TIME MONITOR) */}
      {/* ========================================================================= */}
      {(activeSubTab === 'LIVE_VERIFICATION_QUEUE' || activeSubTab === 'OVERVIEW' || !activeSubTab) && (
        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Top Live Header & Real-time Throughput Gauge */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.85rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: isSimulatingLiveStream ? '#10b981' : '#f59e0b', display: 'inline-block', boxShadow: isSimulatingLiveStream ? '0 0 10px #10b981' : 'none' }} />
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  Live Incoming Verification Queue (Multi-Ticket AI Pipeline Monitor)
                </h3>
              </div>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Live monitor every incoming ticket and see how the AI agent processes each document step-by-step in real time. Officer can intercept or takeover at any step.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setIsSimulatingLiveStream(prev => !prev);
                  showToast(isSimulatingLiveStream ? 'Paused Live AI Processing Stream.' : 'Resumed Live AI Multi-Ticket Auto-Stream!');
                }}
                style={{
                  fontSize: '0.72rem',
                  padding: '0.35rem 0.75rem',
                  background: isSimulatingLiveStream ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                  color: isSimulatingLiveStream ? '#10b981' : '#f59e0b',
                  borderColor: isSimulatingLiveStream ? '#10b981' : '#f59e0b',
                  fontWeight: 800
                }}
              >
                {isSimulatingLiveStream ? 'Pause Live Stream' : 'Resume Auto-Stream (10 Tickets)'}
              </button>

              <span className="badge badge-info" style={{ fontSize: '0.72rem', padding: '0.35rem 0.75rem' }}>
                Ingestion Rate: 18 / hr • 10 Tickets Live
              </span>

              <button
                className="btn btn-secondary"
                onClick={() => showToast('Gateway Synced: Polled live WebSocket feed from AI Orchestrator.')}
                style={{ fontSize: '0.72rem', padding: '0.35rem 0.75rem' }}
              >
                <RefreshCw size={12} /> Sync Gateway
              </button>
            </div>
          </div>

          {/* 4 Live KPI Cards for Live Verification Stream */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.85rem' }}>
            <div className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #6366f1, #818cf8)' } as React.CSSProperties}>
              <div className="kpi-card-header">
                <span className="kpi-title-modern">Total Ingested Tickets</span>
                <FileText size={18} className="text-brand" />
              </div>
              <div className="kpi-value-modern">
                <span>10 Live Tickets</span>
              </div>
              <div className="kpi-subtext-modern">
                <ArrowRight size={13} className="text-emerald" /> Streaming in one by one
              </div>
            </div>

            <div className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #06b6d4, #38bdf8)' } as React.CSSProperties}>
              <div className="kpi-card-header">
                <span className="kpi-title-modern">AI Autonomous Processing</span>
                <Bot size={18} className="text-cyan" />
              </div>
              <div className="kpi-value-modern">
                <span>{kycCases.filter(c => c.status === 'LIVE_AI_PROCESSING').length} In-Flight</span>
              </div>
              <div className="kpi-subtext-modern">
                VisionOCR, BioGuard & GovVerify active
              </div>
            </div>

            <div className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #f59e0b, #fde047)' } as React.CSSProperties}>
              <div className="kpi-card-header">
                <span className="kpi-title-modern">Officer Escalated / Hold</span>
                <Clock size={18} className="text-amber" />
              </div>
              <div className="kpi-value-modern">
                <span>{kycCases.filter(c => c.status === 'HUMAN_INTERCEPTED').length} Intercepted</span>
              </div>
              <div className="kpi-subtext-modern">
                Officer manual supervision
              </div>
            </div>

            <div className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #10b981, #34d399)' } as React.CSSProperties}>
              <div className="kpi-card-header">
                <span className="kpi-title-modern">Auto-Transferred to Payment</span>
                <CheckCircle2 size={18} className="text-emerald" />
              </div>
              <div className="kpi-value-modern">
                <span>{kycCases.filter(c => c.status === 'TRANSFERRED_TO_PAYMENT').length} Cleared</span>
              </div>
              <div className="kpi-subtext-modern">
                Sent to Payment Team Pipeline
              </div>
            </div>
          </div>

          {/* Live Ingested Applications - Full Professional List View */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <strong style={{ fontSize: '0.92rem', color: 'var(--text-main)' }}>
                  Live 10-Ticket Stream Monitor (Step-by-Step AI Execution):
                </strong>
                <span className="badge badge-info" style={{ fontSize: '0.68rem' }}>10 Applications Streamed</span>
              </div>

              {/* Quick List Filters */}
              <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                {[
                  { id: 'ALL', label: 'All (10 Tickets)' },
                  { id: 'LIVE_AI', label: 'Active AI Steps' },
                  { id: 'PENDING', label: 'Needs Officer' },
                  { id: 'AGENT', label: 'Field Agents' },
                  { id: 'VENDOR', label: 'Vendors' }
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setQueueFilter(f.id as any)}
                    className="btn btn-secondary"
                    style={{
                      fontSize: '0.68rem',
                      padding: '0.25rem 0.55rem',
                      background: queueFilter === f.id ? '#0284c7' : 'transparent',
                      color: queueFilter === f.id ? '#fff' : 'var(--text-main)',
                      borderColor: queueFilter === f.id ? '#0284c7' : 'var(--border-color)',
                      fontWeight: 700
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* List View Table */}
            <div style={{ width: '100%', overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: '10px', background: 'transparent' }}>
              <table className="kyc-glossy-table">
                <thead>
                  <tr>
                    <th>Application & Applicant</th>
                    <th>Category & Docs</th>
                    <th style={{ minWidth: '380px' }}>AI Multi-Step Pipeline Monitor (Every Step Live)</th>
                    <th>Status & SLA</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {kycCases
                    .filter(c => {
                      if (queueFilter === 'LIVE_AI' && c.status !== 'LIVE_AI_PROCESSING') return false;
                      if (queueFilter === 'PENDING' && (c.status.includes('COMPLETED') || c.status.includes('TRANSFERRED'))) return false;
                      if (queueFilter === 'AGENT' && c.category !== 'AGENT') return false;
                      if (queueFilter === 'VENDOR' && c.category !== 'VENDOR') return false;
                      return true;
                    })
                    .map(c => {
                      const isExpandedLogs = expandedLogsTicketId === c.id;
                      const stepStages = [
                        { step: 1, label: '1. Ingest', icon: '' },
                        { step: 2, label: '2. OCR', icon: '' },
                        { step: 3, label: '3. 3D Face', icon: '' },
                        { step: 4, label: '4. Gov API', icon: '' },
                        { step: 5, label: '5. Tamper', icon: '' },
                        { step: 6, label: '6. Pay Transfer', icon: '' }
                      ];

                      return (
                        <React.Fragment key={c.id}>
                          <tr
                            style={{
                              borderBottom: isExpandedLogs ? 'none' : '1px solid var(--border-color)',
                              background: isExpandedLogs ? 'rgba(2, 132, 199, 0.05)' : 'transparent',
                              transition: 'background 0.2s ease'
                            }}
                          >
                            {/* 1. Application & Applicant Details */}
                            <td style={{ padding: '0.75rem 0.85rem' }}>
                              <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                  <strong style={{ color: 'var(--text-main)', fontSize: '0.82rem' }}>{c.applicantName}</strong>
                                  <span className="badge badge-info" style={{ fontSize: '0.62rem', padding: '0.15rem 0.4rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>{c.id} <TicketVisionButton ticket={{ id: c.id, ticketNumber: c.id, customerName: c.applicantName, departmentLabel: 'KYC', status: c.status, isEscalated: String(c.status).includes('BLUR') || String(c.status).includes('HOLD') || String(c.status).includes('ESCALATED') }} compact size="sm" /></span>
                                </div>
                                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                                  Phone: <code>{c.phone}</code> • Ingested: <span style={{ color: '#38bdf8' }}>{c.receivedAt}</span>
                                </div>
                              </div>
                            </td>

                            {/* 2. Category & Documents */}
                            <td style={{ padding: '0.75rem 0.85rem' }}>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                <span className={`badge ${c.category === 'AGENT' ? 'badge-info' : c.category === 'VENDOR' ? 'badge-success' : 'badge-primary'}`} style={{ fontSize: '0.64rem', alignSelf: 'flex-start' }}>
                                  {c.category}
                                </span>
                                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                                  {c.documents.length} Docs Shared
                                </span>
                              </div>
                            </td>

                            {/* 3. AI Multi-Step Pipeline Monitor (Visual 6-Step Stepper) */}
                            <td style={{ padding: '0.75rem 0.85rem' }}>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                
                                {/* Step-by-Step Progress Pipeline */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flexWrap: 'wrap' }}>
                                  {stepStages.map((st, sIdx) => {
                                    const isDone = (c.currentStep || 1) > st.step;
                                    const isCurrent = (c.currentStep || 1) === st.step;
                                    return (
                                      <React.Fragment key={st.step}>
                                        <div
                                          style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.2rem',
                                            padding: '0.18rem 0.45rem',
                                            borderRadius: '4px',
                                            fontSize: '0.62rem',
                                            fontWeight: 700,
                                            background: isDone
                                              ? 'rgba(16, 185, 129, 0.15)'
                                              : isCurrent
                                              ? 'rgba(2, 132, 199, 0.25)'
                                              : 'rgba(255, 255, 255, 0.05)',
                                            color: isDone
                                              ? '#10b981'
                                              : isCurrent
                                              ? '#38bdf8'
                                              : 'var(--text-muted)',
                                            border: isDone
                                              ? '1px solid rgba(16, 185, 129, 0.4)'
                                              : isCurrent
                                              ? '1.5px solid #0284c7'
                                              : '1px solid var(--border-color)',
                                            boxShadow: isCurrent ? '0 0 8px rgba(2, 132, 199, 0.3)' : 'none'
                                          }}
                                          title={`Stage ${st.step}: ${st.label}`}
                                        >
                                          <span>{isDone ? '' : st.icon}</span>
                                          <span>{st.label}</span>
                                        </div>
                                        {sIdx < stepStages.length - 1 && (
                                          <span style={{ fontSize: '0.6rem', color: isDone ? '#10b981' : 'var(--text-muted)' }}></span>
                                        )}
                                      </React.Fragment>
                                    );
                                  })}
                                </div>

                                {/* Active Bot & Live Action Snippet */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-surface)', padding: '0.3rem 0.55rem', borderRadius: '6px', borderLeft: '3px solid #0284c7' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.68rem' }}>
                                    <Bot size={12} color="#0284c7" />
                                    <strong style={{ color: '#38bdf8' }}>{c.aiAgentName}</strong>
                                    <span style={{ color: 'var(--text-muted)' }}>—</span>
                                    <span style={{ color: 'var(--text-main)', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                      {c.aiCurrentActivity}
                                    </span>
                                  </div>

                                  {/* Toggle Sub-second Terminal Logs */}
                                  <button
                                    onClick={() => setExpandedLogsTicketId(isExpandedLogs ? null : c.id)}
                                    style={{
                                      background: isExpandedLogs ? '#0284c7' : 'transparent',
                                      color: isExpandedLogs ? '#fff' : '#0284c7',
                                      border: '1px solid #0284c7',
                                      borderRadius: '4px',
                                      fontSize: '0.58rem',
                                      padding: '0.15rem 0.4rem',
                                      cursor: 'pointer',
                                      fontWeight: 800
                                    }}
                                  >
                                    {isExpandedLogs ? '▲ Hide Logs' : '▼ View AI Logs'}
                                  </button>
                                </div>

                              </div>
                            </td>

                            {/* 4. Status Badge & SLA */}
                            <td style={{ padding: '0.75rem 0.85rem' }}>
                              <div>
                                <span className={`badge ${c.status === 'LIVE_AI_PROCESSING' ? 'badge-primary' : c.status === 'HUMAN_INTERCEPTED' ? 'badge-warning' : c.status.includes('TRANSFERRED') ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: '0.65rem' }}>
                                  {c.status === 'LIVE_AI_PROCESSING' ? 'Live AI Step' : c.status === 'HUMAN_INTERCEPTED' ? 'Intercepted' : c.status === 'TRANSFERRED_TO_PAYMENT' ? 'Sent to Payment' : c.status}
                                </span>
                                <div style={{ fontSize: '0.62rem', color: '#d97706', fontWeight: 700, marginTop: '0.2rem' }}>
                                  SLA: {c.slaCountdown}
                                </div>
                              </div>
                            </td>

                            {/* 5. Direct Actions */}
                            <td style={{ padding: '0.7rem 0.85rem', textAlign: 'right' }}>
                              <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'flex-end', alignItems: 'center', flexWrap: 'wrap' }}>
                                {c.status === 'LIVE_AI_PROCESSING' && (
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => handleTakeoverFromAi(c.id)}
                                    style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: '#000', fontWeight: 800, fontSize: '0.66rem', padding: '0.28rem 0.55rem' }}
                                    title="Takeover Ticket from AI"
                                  >
                                    Take Over
                                  </button>
                                )}

                                <button
                                  className="btn btn-secondary"
                                  onClick={() => {
                                    setSelectedCase(c);
                                    setActiveDocIndex(0);
                                    if (onSelectSubTab) onSelectSubTab('AGENT_DESK');
                                    showToast(`Opened live side-by-side shadowing for ${c.applicantName}.`);
                                  }}
                                  style={{ fontSize: '0.66rem', padding: '0.28rem 0.55rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                                  title="Shadow Side-by-Side"
                                >
                                  <Eye size={11} /> Shadow
                                </button>

                                <button
                                  className="btn btn-secondary"
                                  onClick={() => {
                                    setSelectedCase(c);
                                    handleStartDirectCall(c.phone);
                                  }}
                                  style={{ fontSize: '0.66rem', padding: '0.28rem 0.5rem', color: '#10b981', borderColor: '#10b981' }}
                                  title="Direct Voice Call"
                                >
                                  <PhoneCall size={11} />
                                </button>

                                <button
                                  className="btn btn-primary"
                                  onClick={() => handleCompleteAndTransferToPayment(c)}
                                  style={{
                                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                    color: '#fff',
                                    fontWeight: 800,
                                    fontSize: '0.66rem',
                                    padding: '0.28rem 0.55rem'
                                  }}
                                  title="Approve & Handoff to Payment Team"
                                >
                                  Pay Handoff →
                                </button>
                              </div>
                            </td>
                          </tr>

                          {/* Embedded Sub-second AI Terminal Logs Drawer */}
                          {isExpandedLogs && (
                            <tr style={{ background: 'rgba(9, 13, 22, 0.95)', borderBottom: '1px solid var(--border-color)' }}>
                              <td colSpan={5} style={{ padding: '0.75rem 1.25rem' }}>
                                <div style={{ background: '#020617', border: '1px solid rgba(2, 132, 199, 0.4)', borderRadius: '8px', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.35rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.7rem', color: '#38bdf8', fontWeight: 800 }}>
                                      <Terminal size={13} />
                                      <span>SUB-SECOND AI EXECUTION TELEMETRY & THOUGHT PROCESS ({c.id} — {c.applicantName})</span>
                                    </div>
                                    <span style={{ fontSize: '0.62rem', color: '#10b981', fontFamily: 'monospace' }}>● LIVE WEBSOCKET 240ms</span>
                                  </div>

                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', maxHeight: '160px', overflowY: 'auto', fontFamily: 'monospace', fontSize: '0.68rem' }}>
                                    {c.aiLiveLogs?.map((log: any, lIdx: number) => (
                                      <div key={lIdx} style={{ display: 'grid', gridTemplateColumns: '80px 140px 1fr', gap: '0.5rem', color: '#cbd5e1' }}>
                                        <span style={{ color: '#64748b' }}>[{log.time}]</span>
                                        <span style={{ color: '#38bdf8', fontWeight: 700 }}>&lt;{log.bot}&gt;</span>
                                        <span style={{ color: log.text.includes('Alert') || log.text.includes('Warning') ? '#f59e0b' : log.text.includes('PASS') || log.text.includes('verified') || log.text.includes('confirmed') ? '#10b981' : '#e2e8f0' }}>
                                          {log.text}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. SUBTAB: LIVE AI SHADOWING & REAL-TIME TAKEOVER DESK (CORE KYC WORKSPACE) */}
      {/* ========================================================================= */}
      {(activeSubTab === 'AGENT_DESK' || activeSubTab === 'KYC_SIDE_BY_SIDE') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Active Case Strip with AI Monitoring Status & Live Takeover Button */}
          <div
            className="glass-panel"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderLeft: '4px solid #0284c7',
              borderRadius: '12px',
              padding: '1rem 1.25rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.85rem',
              overflow: 'visible',
              position: 'relative',
              zIndex: 500
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {selectedCase.applicantName}
                </h3>
                <span className="badge badge-info" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>{selectedCase.id} <TicketVisionButton ticket={{ id: selectedCase.id, ticketNumber: selectedCase.id, customerName: selectedCase.applicantName, departmentLabel: 'KYC', status: selectedCase.status, isEscalated: String(selectedCase.status).includes('BLUR') || String(selectedCase.status).includes('HOLD') || String(selectedCase.status).includes('ESCALATED') }} size="sm" /></span>
                <span className={`badge ${selectedCase.status.includes('COMPLETED') || selectedCase.status.includes('TRANSFERRED') ? 'badge-success' : selectedCase.status === 'HUMAN_INTERCEPTED' ? 'badge-warning' : 'badge-primary'}`}>
                  {selectedCase.status === 'LIVE_AI_PROCESSING' ? 'Live AI Processing' : selectedCase.status === 'HUMAN_INTERCEPTED' ? 'Officer Intercepted' : selectedCase.status === 'TRANSFERRED_TO_PAYMENT' ? 'Transferred to Payment' : selectedCase.status}
                </span>
                <span className="badge badge-secondary">{selectedCase.category}</span>
                <span className="badge badge-warning">{selectedCase.documents?.length} Documents Received</span>
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Phone: <strong>{selectedCase.phone}</strong> • Onboarding Fee: <strong style={{ color: '#10b981' }}>{selectedCase.onboardingFee}</strong> • <span style={{ color: '#d97706', fontWeight: 700 }}>SLA: {selectedCase.slaCountdown}</span>
              </div>
            </div>

            {/* Quick Actions: Take Over, Direct Call, Switch Case */}
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap', position: 'relative', zIndex: 600 }}>
              {selectedCase.status === 'LIVE_AI_PROCESSING' && (
                <button
                  className="btn btn-primary"
                  onClick={() => handleTakeoverFromAi(selectedCase.id)}
                  style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: '#000', fontWeight: 800, fontSize: '0.74rem', padding: '0.4rem 0.85rem', boxShadow: '0 2px 8px rgba(245, 158, 11, 0.4)' }}
                >
                  Take Over from AI Agent
                </button>
              )}

              <button
                className="btn btn-secondary"
                onClick={() => handleStartDirectCall(selectedCase.phone)}
                style={{ fontSize: '0.74rem', padding: '0.4rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <PhoneCall size={13} style={{ color: '#10b981' }} /> Call Registerer
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setViewAllDocsModal(true)}
                style={{ fontSize: '0.74rem', padding: '0.4rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <FolderCheck size={13} style={{ color: '#0284c7' }} /> View All {selectedCase.documents?.length} Docs
              </button>

              {/* High-Contrast Crisp Search & Manual Type Autocomplete Switcher */}
              <div ref={searchDropdownRef} style={{ position: 'relative', minWidth: '320px', zIndex: 1000 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'var(--bg-surface, #ffffff)',
                    border: '1.5px solid #0284c7',
                    borderRadius: '8px',
                    padding: '0.4rem 0.75rem',
                    boxShadow: '0 2px 10px rgba(2, 132, 199, 0.15)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Search size={15} style={{ color: '#0284c7', flexShrink: 0 }} />
                  <input
                    type="text"
                    value={shadowingSearchQuery}
                    onChange={e => {
                      setShadowingSearchQuery(e.target.value);
                      setIsSearchDropdownOpen(true);
                    }}
                    onFocus={() => setIsSearchDropdownOpen(true)}
                    placeholder={selectedCase ? `${selectedCase.id} - ${selectedCase.applicantName}` : 'Search applicant name, ID, phone...'}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      color: 'var(--text-main, #0f172a)',
                      fontSize: '0.78rem',
                      width: '100%',
                      fontWeight: 700
                    }}
                  />
                  {shadowingSearchQuery ? (
                    <button
                      onClick={() => setShadowingSearchQuery('')}
                      style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                      title="Clear Search"
                    >
                      <XCircle size={15} />
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsSearchDropdownOpen(prev => !prev)}
                      style={{ background: 'none', border: 'none', color: '#0284c7', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                      title="Toggle Application List"
                    >
                      <ChevronDown size={16} style={{ transform: isSearchDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }} />
                    </button>
                  )}
                </div>

                {/* Floating Search Results Dropdown with High Stacking Index */}
                {isSearchDropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 8px)',
                      right: 0,
                      width: '380px',
                      maxHeight: '340px',
                      overflowY: 'auto',
                      background: 'var(--bg-surface, #ffffff)',
                      border: '1.5px solid #0284c7',
                      borderRadius: '10px',
                      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.45), 0 4px 20px rgba(2, 132, 199, 0.3)',
                      zIndex: 999999,
                      padding: '0.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.4rem'
                    }}
                  >
                    <div style={{ fontSize: '0.66rem', color: '#0284c7', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', padding: '0.2rem 0.4rem', borderBottom: '1px solid var(--border-color)' }}>
                      Switch Application ({kycCases.length})
                    </div>
                    {kycCases
                      .filter(c => {
                        if (!shadowingSearchQuery) return true;
                        const q = shadowingSearchQuery.toLowerCase();
                        return (
                          c.applicantName.toLowerCase().includes(q) ||
                          c.id.toLowerCase().includes(q) ||
                          c.phone.toLowerCase().includes(q) ||
                          c.category.toLowerCase().includes(q) ||
                          c.status.toLowerCase().includes(q)
                        );
                      })
                      .map(c => (
                        <div
                          key={c.id}
                          onClick={() => {
                            setSelectedCase(c);
                            setActiveDocIndex(0);
                            setEditedOcrFields(getOcrForCaseAndDoc(c, 0));
                            setShadowingSearchQuery('');
                            setIsSearchDropdownOpen(false);
                            showToast(`Loaded ${c.applicantName} (${c.id}) into shadowing desk.`);
                          }}
                          style={{
                            padding: '0.55rem 0.75rem',
                            borderRadius: '7px',
                            cursor: 'pointer',
                            background: selectedCase?.id === c.id ? 'rgba(2, 132, 199, 0.1)' : 'var(--bg-dark, #f8fafc)',
                            border: selectedCase?.id === c.id ? '1.5px solid #0284c7' : '1px solid var(--border-color)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={e => {
                            if (selectedCase?.id !== c.id) (e.currentTarget as HTMLElement).style.background = 'rgba(2, 132, 199, 0.06)';
                          }}
                          onMouseLeave={e => {
                            if (selectedCase?.id !== c.id) (e.currentTarget as HTMLElement).style.background = 'var(--bg-dark, #f8fafc)';
                          }}
                        >
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                              <strong style={{ fontSize: '0.8rem', color: 'var(--text-main, #0f172a)' }}>{c.applicantName}</strong>
                              <span className="badge badge-info" style={{ fontSize: '0.62rem', padding: '0.12rem 0.4rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>{c.id} <TicketVisionButton ticket={{ id: c.id, ticketNumber: c.id, customerName: c.applicantName, departmentLabel: 'KYC', status: c.status }} compact size="sm" /></span>
                              <span className="badge badge-secondary" style={{ fontSize: '0.62rem', padding: '0.12rem 0.4rem' }}>{c.category}</span>
                            </div>
                            <div style={{ fontSize: '0.67rem', color: 'var(--text-muted, #64748b)', marginTop: '0.15rem' }}>
                              {c.phone} • Fee: <strong style={{ color: '#059669' }}>{c.onboardingFee.split(' ')[0]}</strong>
                            </div>
                          </div>
                          <span className={`badge ${c.status === 'LIVE_AI_PROCESSING' ? 'badge-primary' : c.status.includes('TRANSFERRED') ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.62rem' }}>
                            {c.status === 'LIVE_AI_PROCESSING' ? 'Live AI' : c.status === 'TRANSFERRED_TO_PAYMENT' ? 'Sent' : c.status}
                          </span>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Real-Time AI Monitor & Shadowing Feed Banner */}
          <div style={{ background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '0.85rem 1.15rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Bot size={16} color="#0284c7" />
                <strong style={{ fontSize: '0.82rem', color: 'var(--text-main)' }}>
                  Live AI Agent Shadowing Telemetry: <span style={{ color: '#0284c7' }}>{selectedCase.aiAgentName}</span>
                </strong>
              </div>
              <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>
                Real-Time AI Stream Active
              </span>
            </div>

            <div style={{ background: '#090d16', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '0.65rem 0.85rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', maxHeight: '100px', overflowY: 'auto' }}>
              {selectedCase.aiLiveLogs?.map((log: any, idx: number) => (
                <div key={idx} style={{ fontSize: '0.7rem', display: 'flex', gap: '0.6rem', color: '#94a3b8' }}>
                  <code style={{ color: '#0284c7' }}>[{log.time}]</code>
                  <strong style={{ color: '#38bdf8' }}>{log.bot}:</strong>
                  <span style={{ color: '#f8fafc' }}>{log.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 2-Column Split Screen: Left Specimen & Received Docs, Right Live OCR Data Verification & Payment Transfer */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: '1.25rem', alignItems: 'start' }}>
            
            {/* LEFT COLUMN: HIGH-RESOLUTION DOCUMENT SPECIMEN INSPECTOR */}
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              
              {/* Document Specimen Switcher Tabs */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.65rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', paddingBottom: '0.2rem' }}>
                  {selectedCase.documents?.map((doc: any, idx: number) => (
                    <button
                      key={doc.id || idx}
                      onClick={() => {
                        setActiveDocIndex(idx);
                        if (doc.ocrData) {
                          setEditedOcrFields(doc.ocrData);
                        }
                      }}
                      className="btn btn-secondary"
                      style={{
                        fontSize: '0.68rem',
                        padding: '0.3rem 0.6rem',
                        background: activeDocIndex === idx ? '#0284c7' : 'var(--bg-dark)',
                        color: activeDocIndex === idx ? '#fff' : 'var(--text-main)',
                        borderColor: activeDocIndex === idx ? '#0284c7' : 'var(--border-color)',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}
                    >
                      <span>{doc.icon || ''}</span>
                      <span>Doc {idx + 1}: {doc.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>

                {/* Zoom & Contrast Controls */}
                <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
                  <button
                    onClick={() => setZoomLevel(prev => Math.max(0.75, prev - 0.25))}
                    className="btn btn-secondary"
                    style={{ padding: '0.25rem 0.45rem', fontSize: '0.65rem' }}
                    title="Zoom Out"
                  >
                    <ZoomOut size={12} />
                  </button>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, minWidth: '35px', textAlign: 'center' }}>
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    onClick={() => setZoomLevel(prev => Math.min(2.5, prev + 0.25))}
                    className="btn btn-secondary"
                    style={{ padding: '0.25rem 0.45rem', fontSize: '0.65rem' }}
                    title="Zoom In"
                  >
                    <ZoomIn size={12} />
                  </button>
                  <button
                    onClick={() => {
                      const modes: ('NORMAL' | 'CONTRAST' | 'SHARPEN' | 'INVERT')[] = ['NORMAL', 'CONTRAST', 'SHARPEN', 'INVERT'];
                      const next = modes[(modes.indexOf(imageFilter) + 1) % modes.length];
                      setImageFilter(next);
                      showToast(`Applied Specimen Filter: ${next}`);
                    }}
                    className="btn btn-secondary"
                    style={{ padding: '0.25rem 0.55rem', fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                    title="Toggle Filter (Enhance Blur/Glare)"
                  >
                    <Sliders size={11} /> {imageFilter}
                  </button>
                </div>
              </div>

              {/* Specimen Visual Specimen Canvas */}
              <div
                style={{
                  background: '#090d16',
                  borderRadius: '8px',
                  border: '1.5px solid var(--border-color)',
                  padding: '1.25rem',
                  minHeight: '340px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  filter: imageFilter === 'CONTRAST' ? 'contrast(160%)' : imageFilter === 'SHARPEN' ? 'contrast(130%) brightness(110%)' : imageFilter === 'INVERT' ? 'invert(100%)' : 'none'
                }}
              >
                {/* SVG High-Tech Synthesized Specimen Card */}
                <div
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'center center',
                    transition: 'transform 0.2s ease',
                    width: '100%',
                    maxWidth: '460px',
                    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                    border: '2px solid rgba(2, 132, 199, 0.5)',
                    borderRadius: '10px',
                    padding: '1.15rem',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
                    color: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    position: 'relative'
                  }}
                >
                  {/* Card Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <span style={{ fontSize: '1.3rem' }}></span>
                      <div>
                        <div style={{ fontSize: '0.62rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8' }}>GOVERNMENT OF INDIA</div>
                        <strong style={{ fontSize: '0.82rem', color: '#38bdf8' }}>{activeDoc?.name || 'Identity Specimen'}</strong>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.6rem', color: '#10b981', background: 'rgba(16,185,129,0.2)', padding: '0.15rem 0.4rem', borderRadius: '4px', fontWeight: 800 }}>
                      UIDAI/NSDL DIGITALLY VERIFIED
                    </span>
                  </div>

                  {/* Card Body with Photo + Key Details */}
                  <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: '0.85rem', alignItems: 'center' }}>
                    
                    {/* Simulated Photo Frame with Facial Landmarking Box */}
                    <div style={{ width: '90px', height: '110px', background: '#0284c722', border: '2px dashed #0284c7', borderRadius: '6px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                      <span style={{ fontSize: '2.5rem' }}></span>
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(2,132,199,0.85)', color: '#fff', fontSize: '0.55rem', textAlign: 'center', padding: '2px 0', fontWeight: 700 }}>
                        99.2% FACE
                      </div>
                    </div>

                    {/* Specimen Field Prints */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.72rem' }}>
                      <div>
                        <span style={{ color: '#94a3b8', fontSize: '0.62rem' }}>NAME:</span>
                        <div style={{ fontWeight: 800, color: '#f8fafc', fontSize: '0.86rem' }}>{editedOcrFields.fullName || selectedCase.applicantName}</div>
                      </div>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <div>
                          <span style={{ color: '#94a3b8', fontSize: '0.62rem' }}>DOB:</span>
                          <div style={{ fontWeight: 700, color: '#e2e8f0' }}>{editedOcrFields.dob || '14/05/1990'}</div>
                        </div>
                        <div>
                          <span style={{ color: '#94a3b8', fontSize: '0.62rem' }}>GENDER:</span>
                          <div style={{ fontWeight: 700, color: '#e2e8f0' }}>{editedOcrFields.gender || 'MALE'}</div>
                        </div>
                      </div>
                      <div>
                        <span style={{ color: '#94a3b8', fontSize: '0.62rem' }}>DOCUMENT ID NO:</span>
                        <div style={{ fontWeight: 800, color: '#38bdf8', fontFamily: 'monospace', letterSpacing: '1px' }}>
                          {editedOcrFields.idNumber || activeDoc?.number || '9928 4410 8821'}
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Card Footer Bar */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.45rem', fontSize: '0.62rem', color: '#94a3b8' }}>
                    <span>SHA-256: <code>{activeDoc?.checksum || 'e3b0c44298fc1c149afbf4c8996fb924'}</code></span>
                    <span style={{ color: '#10b981', fontWeight: 800 }}>TAMPER SCAN: CLEAN</span>
                  </div>

                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: OCR EXTRACTED FIELDS & END-TO-END PAYMENT TRANSFER ACTION */}
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.65rem' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <FileText size={15} color="#0284c7" /> Extracted OCR Field Verification & Edits
                  </h4>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                    Verify AI-extracted values against the visual specimen. Edit directly if typos exist.
                  </span>
                </div>
                <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>
                  Live Editable
                </span>
              </div>

              {/* In-Line Editable OCR Fields List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '300px', overflowY: 'auto', paddingRight: '0.25rem' }}>
                
                {/* Field 1: Full Name */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem' }}>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>1. Full Name (As printed on ID):</span>
                    <span style={{ color: '#10b981', fontWeight: 700 }}>99.8% Match</span>
                  </div>
                  <input
                    type="text"
                    value={editedOcrFields.fullName || ''}
                    onChange={e => setEditedOcrFields({ ...editedOcrFields, fullName: e.target.value })}
                    className="form-input"
                    style={{ fontSize: '0.78rem', height: '32px', fontWeight: 700 }}
                  />
                </div>

                {/* Field 2: Date of Birth & Gender (Aligned and Sized Accurately) */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 700 }}>2. Date of Birth:</span>
                    <input
                      type="text"
                      value={editedOcrFields.dob || ''}
                      onChange={e => setEditedOcrFields({ ...editedOcrFields, dob: e.target.value })}
                      style={{
                        width: '100%',
                        height: '36px',
                        padding: '0.35rem 0.65rem',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        background: 'var(--bg-dark, #0f172a)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '6px',
                        color: 'var(--text-main)',
                        boxSizing: 'border-box',
                        outline: 'none'
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 700 }}>3. Gender:</span>
                    <select
                      value={editedOcrFields.gender || 'MALE'}
                      onChange={e => setEditedOcrFields({ ...editedOcrFields, gender: e.target.value })}
                      style={{
                        width: '100%',
                        height: '36px',
                        padding: '0.35rem 0.65rem',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        background: 'var(--bg-dark, #0f172a)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '6px',
                        color: 'var(--text-main)',
                        boxSizing: 'border-box',
                        outline: 'none',
                        cursor: 'pointer',
                        lineHeight: 'normal'
                      }}
                    >
                      <option value="MALE">MALE</option>
                      <option value="FEMALE">FEMALE</option>
                      <option value="OTHER">OTHER</option>
                    </select>
                  </div>
                </div>

                {/* Field 3: Document Identification Number */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem' }}>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>4. Document Number / UID / PAN:</span>
                    <span style={{ color: '#0284c7', fontWeight: 700 }}>State API Matched</span>
                  </div>
                  <input
                    type="text"
                    value={editedOcrFields.idNumber || ''}
                    onChange={e => setEditedOcrFields({ ...editedOcrFields, idNumber: e.target.value })}
                    className="form-input"
                    style={{ fontSize: '0.78rem', height: '32px', fontFamily: 'monospace', fontWeight: 700 }}
                  />
                </div>

                {/* Field 4: Full Address */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.68rem', fontWeight: 700 }}>5. Permanent Address Line:</span>
                  <textarea
                    rows={2}
                    value={editedOcrFields.address || ''}
                    onChange={e => setEditedOcrFields({ ...editedOcrFields, address: e.target.value })}
                    className="form-input"
                    style={{ fontSize: '0.76rem', lineHeight: '1.3' }}
                  />
                </div>

              </div>

              {/* NEXT STEP: COMPLETE KYC & TRANSFER TO PAYMENT TEAM PIPELINE */}
              <div style={{ borderTop: '1.5px solid var(--border-color)', paddingTop: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <div style={{ background: 'rgba(2, 132, 199, 0.08)', border: '1px solid rgba(2, 132, 199, 0.3)', borderRadius: '8px', padding: '0.65rem 0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>NEXT PIPELINE STEP:</span>
                    <strong style={{ fontSize: '0.82rem', color: '#0284c7', display: 'block' }}>Onboarding Fee Settlement ({selectedCase.onboardingFee})</strong>
                    <span style={{ fontSize: '0.64rem', color: 'var(--text-muted)' }}>Flow: Payment AI attempts settlement first → If failed, routes to Payment Officer.</span>
                  </div>
                  <span className={`badge ${selectedCase.paymentStatus === 'PAID_SETTLED' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.65rem' }}>
                    {selectedCase.paymentStatus}
                  </span>
                </div>

                {/* Main Transfer to Payment Team Action Button */}
                <button
                  className="btn btn-primary"
                  onClick={() => handleCompleteAndTransferToPayment(selectedCase)}
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '0.82rem',
                    padding: '0.6rem 1rem',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)'
                  }}
                >
                  <CreditCard size={16} /> Approve KYC & Transfer to Payment Team →
                </button>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      showToast('Saved manual OCR edits to permanent applicant record.');
                    }}
                    style={{ fontSize: '0.68rem', padding: '0.35rem 0.4rem', fontWeight: 700 }}
                  >
                    Save Edits
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setBlurReuploadModal(true)}
                    style={{ fontSize: '0.68rem', color: '#f59e0b', borderColor: 'rgba(245, 158, 11, 0.4)', padding: '0.35rem 0.4rem', fontWeight: 700 }}
                  >
                    Request Glare
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setEscalateTlModal(true)}
                    style={{ fontSize: '0.68rem', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.4)', padding: '0.35rem 0.4rem', fontWeight: 700 }}
                  >
                    Escalate TL
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. SUBTAB: ESCALATED & ASSIGNED QUEUE */}
      {/* ========================================================================= */}
      {activeSubTab === 'KYC_ASSIGNED_QUEUE' && (
        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            <div>
              <h3 style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.15rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Activity size={18} color="#0284c7" /> Officer Rohan Verma's Assigned & Escalated Worklist
              </h3>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Primary queue of applications requiring Officer resolution, AI takeover, or quality override.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span className="badge badge-info" style={{ fontSize: '0.72rem', padding: '0.3rem 0.65rem' }}>
                Auto-Polling Active (2s)
              </span>
              <button
                className="btn btn-secondary"
                onClick={() => showToast('Queue refreshed from AI Router Gateway.')}
                style={{ fontSize: '0.72rem', padding: '0.35rem 0.75rem' }}
              >
                <RefreshCw size={12} /> Refresh
              </button>
            </div>
          </div>

          {/* Filter Bar & Search */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.65rem' }}>
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
              {[
                { id: 'ALL', label: 'All Assigned' },
                { id: 'PENDING', label: 'Pending Review' },
                { id: 'LIVE_AI', label: 'Live AI Processing' },
                { id: 'URGENT', label: 'Urgent / Near Breach' },
                { id: 'AGENT', label: 'Field Agents' },
                { id: 'VENDOR', label: 'Vendors' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setQueueFilter(f.id as any)}
                  className="btn btn-secondary"
                  style={{
                    fontSize: '0.72rem',
                    padding: '0.3rem 0.65rem',
                    background: queueFilter === f.id ? '#0284c7' : 'transparent',
                    color: queueFilter === f.id ? '#fff' : 'var(--text-main)',
                    borderColor: queueFilter === f.id ? '#0284c7' : 'var(--border-color)',
                    fontWeight: 700
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div style={{ position: 'relative', width: '260px' }}>
              <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search by ID or Name..."
                value={queueSearch}
                onChange={e => setQueueSearch(e.target.value)}
                className="form-input"
                style={{ width: '100%', paddingLeft: '30px', fontSize: '0.74rem', height: '32px' }}
              />
            </div>
          </div>

          {/* Queue Table */}
          <div style={{ width: '100%', overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
            <table className="custom-table" style={{ width: '100%', fontSize: '0.74rem', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--bg-dark)', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                  <th style={{ padding: '0.65rem 0.8rem' }}>Application ID & Applicant</th>
                  <th style={{ padding: '0.65rem 0.8rem' }}>Category</th>
                  <th style={{ padding: '0.65rem 0.8rem' }}>Received Docs</th>
                  <th style={{ padding: '0.65rem 0.8rem' }}>AI Agent Status</th>
                  <th style={{ padding: '0.65rem 0.8rem' }}>SLA Window</th>
                  <th style={{ padding: '0.65rem 0.8rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {kycCases
                  .filter(c => {
                    if (queueFilter === 'PENDING' && (c.status.includes('COMPLETED') || c.status.includes('TRANSFERRED'))) return false;
                    if (queueFilter === 'LIVE_AI' && c.status !== 'LIVE_AI_PROCESSING') return false;
                    if (queueFilter === 'URGENT' && !c.slaCountdown.includes('Near Breach')) return false;
                    if (queueFilter === 'AGENT' && c.category !== 'AGENT') return false;
                    if (queueFilter === 'VENDOR' && c.category !== 'VENDOR') return false;
                    if (queueSearch) {
                      const q = queueSearch.toLowerCase();
                      return c.id.toLowerCase().includes(q) || c.applicantName.toLowerCase().includes(q);
                    }
                    return true;
                  })
                  .map(c => (
                    <tr key={c.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '0.6rem 0.8rem' }}>
                        <div>
                          <strong style={{ color: 'var(--text-main)', fontSize: '0.8rem' }}>{c.applicantName}</strong>
                          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}><code>{c.id}</code> <TicketVisionButton ticket={{ id: c.id, ticketNumber: c.id, customerName: c.applicantName, departmentLabel: 'KYC', status: c.status }} compact size="sm" /></span> • {c.phone}</div>
                        </div>
                      </td>
                      <td style={{ padding: '0.6rem 0.8rem' }}>
                        <span className={`badge ${c.category === 'AGENT' ? 'badge-info' : 'badge-success'}`} style={{ fontSize: '0.64rem' }}>
                          {c.category}
                        </span>
                      </td>
                      <td style={{ padding: '0.6rem 0.8rem' }}>
                        <span className="badge badge-secondary" style={{ fontSize: '0.65rem', fontWeight: 700 }}>
                          {c.documents.length} Docs
                        </span>
                      </td>
                      <td style={{ padding: '0.6rem 0.8rem' }}>
                        <div>
                          <span className={`badge ${c.status.includes('COMPLETED') || c.status.includes('TRANSFERRED') ? 'badge-success' : c.status === 'LIVE_AI_PROCESSING' ? 'badge-primary' : 'badge-warning'}`} style={{ fontSize: '0.62rem' }}>
                            {c.status}
                          </span>
                          <div style={{ fontSize: '0.64rem', color: 'var(--text-cyan)', marginTop: '0.15rem' }}>{c.aiCurrentActivity}</div>
                        </div>
                      </td>
                      <td style={{ padding: '0.6rem 0.8rem' }}>
                        <span style={{ color: c.slaCountdown.includes('Near Breach') ? '#ef4444' : '#10b981', fontWeight: 700 }}>
                          {c.slaCountdown}
                        </span>
                      </td>
                      <td style={{ padding: '0.6rem 0.8rem', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'flex-end' }}>
                          {c.status === 'LIVE_AI_PROCESSING' && (
                            <button
                              className="btn btn-secondary"
                              onClick={() => handleTakeoverFromAi(c.id)}
                              style={{ fontSize: '0.65rem', color: '#f59e0b', borderColor: '#f59e0b', padding: '0.25rem 0.5rem', fontWeight: 700 }}
                            >
                              Take Over
                            </button>
                          )}
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              setSelectedCase(c);
                              setActiveDocIndex(0);
                              if (onSelectSubTab) onSelectSubTab('AGENT_DESK');
                              showToast(`Loaded ${c.applicantName} into Side-by-Side Verifier Desk.`);
                            }}
                            style={{
                              background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                              fontSize: '0.68rem',
                              padding: '0.3rem 0.65rem',
                              fontWeight: 700
                            }}
                          >
                            Review →
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. SUBTAB: ALL RECEIVED DOCUMENTS VIEW (LIST VIEW) */}
      {/* ========================================================================= */}
      {activeSubTab === 'ALL_DOCUMENTS' && (
        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FolderCheck size={18} color="#0284c7" /> Master Received Documents Repository (All Applicants)
              </h3>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                View all registered applicants and their shared document counts. Click on any document badge to view high-resolution specimen images.
              </p>
            </div>
            <span className="badge badge-success">19 Total Documents Ingested</span>
          </div>

          {/* List View Table */}
          <div style={{ width: '100%', overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: '10px', background: 'transparent' }}>
            <table className="kyc-glossy-table">
              <thead>
                <tr>
                  <th>Application & Applicant</th>
                  <th>Category</th>
                  <th>Shared Documents (Click to View Images)</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {kycCases.map(c => (
                  <tr key={c.id} style={{ borderBottom: '1px solid var(--border-color)', background: 'transparent' }}>
                    {/* 1. Applicant & ID */}
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                          <strong style={{ color: 'var(--text-main)', fontSize: '0.84rem' }}>{c.applicantName}</strong>
                          <span className="badge badge-info" style={{ fontSize: '0.62rem', padding: '0.15rem 0.4rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>{c.id} <TicketVisionButton ticket={{ id: c.id, ticketNumber: c.id, customerName: c.applicantName, departmentLabel: 'KYC', status: c.status, isEscalated: String(c.status).includes('BLUR') || String(c.status).includes('HOLD') || String(c.status).includes('ESCALATED') }} compact size="sm" /></span>
                        </div>
                        <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                          Phone: <code>{c.phone}</code> • Ingested: <span style={{ color: '#0284c7' }}>{c.receivedAt}</span>
                        </div>
                      </div>
                    </td>

                    {/* 2. Category */}
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span className={`badge ${c.category === 'AGENT' ? 'badge-info' : c.category === 'VENDOR' ? 'badge-success' : 'badge-primary'}`} style={{ fontSize: '0.64rem' }}>
                        {c.category}
                      </span>
                    </td>

                    {/* 3. Shared Documents Count (Click to open visual images) */}
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <button
                        className="btn btn-secondary"
                        onClick={() => {
                          setSelectedCase(c);
                          setViewAllDocsModal(true);
                          showToast(`Opened ${c.applicantName}'s ${c.documents.length} shared document images.`);
                        }}
                        style={{
                          background: 'rgba(2, 132, 199, 0.08)',
                          border: '1.5px solid #0284c7',
                          color: '#0284c7',
                          fontWeight: 800,
                          fontSize: '0.72rem',
                          padding: '0.35rem 0.75rem',
                          borderRadius: '6px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                        title="Click to view all shared document specimen images"
                      >
                        <span style={{ fontSize: '0.82rem' }}></span>
                        <span>{c.documents.length} Documents Shared</span>
                        <span style={{ fontSize: '0.62rem', background: '#0284c7', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                          View Images                         </span>
                      </button>
                    </td>

                    {/* 4. Status */}
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span className={`badge ${c.status === 'LIVE_AI_PROCESSING' ? 'badge-primary' : c.status === 'HUMAN_INTERCEPTED' ? 'badge-warning' : c.status.includes('TRANSFERRED') ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: '0.65rem' }}>
                        {c.status === 'LIVE_AI_PROCESSING' ? 'Live AI' : c.status === 'HUMAN_INTERCEPTED' ? 'Officer Hold' : c.status === 'TRANSFERRED_TO_PAYMENT' ? 'Sent to Payment' : c.status}
                      </span>
                    </td>

                    {/* 5. Actions */}
                    <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <button
                          className="btn btn-secondary"
                          onClick={() => {
                            setSelectedCase(c);
                            setViewAllDocsModal(true);
                          }}
                          style={{ fontSize: '0.68rem', padding: '0.3rem 0.6rem', display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#0284c7', borderColor: '#0284c7' }}
                          title="View Shared Documents"
                        >
                          <Eye size={12} /> View Docs
                        </button>

                        <button
                          className="btn btn-secondary"
                          onClick={() => {
                            setSelectedCase(c);
                            setActiveDocIndex(0);
                            if (onSelectSubTab) onSelectSubTab('AGENT_DESK');
                            showToast(`Loaded ${c.applicantName} into Specimen Desk.`);
                          }}
                          style={{ fontSize: '0.68rem', padding: '0.3rem 0.6rem' }}
                          title="Inspect in Workspace Desk"
                        >
                          Inspect
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. SUBTAB: BLUR & QUALITY OVERRIDE DESK */}
      {/* ========================================================================= */}
      {(activeSubTab === 'PENDING_DOCS' || activeSubTab === 'KYC_BLUR_OVERRIDE') && (
        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-warning)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={18} color="#f59e0b" /> Blur, Glare & Quality Override Desk
              </h3>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Review low-resolution or glare-affected documents. If human eyes can read the text, override with 1-click or request an instant re-upload.
              </p>
            </div>
            <span className="badge badge-warning">Flagged Quality Exceptions</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            {kycCases.filter(c => c.status.includes('BLUR') || c.id === 'REG-8822').map(c => (
              <div key={c.id} style={{ background: 'var(--bg-dark)', border: '1.5px solid rgba(245, 158, 11, 0.4)', borderRadius: '10px', padding: '1.15rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>{c.applicantName}</strong>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}><code>{c.id}</code> • {c.phone}</div>
                  </div>
                  <span className="badge badge-warning">{c.flagReason}</span>
                </div>

                <div style={{ background: '#090d16', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>DOCUMENT SPECIMEN:</span>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#38bdf8' }}>Aadhaar Card (Front Scan)</div>
                    <span style={{ fontSize: '0.68rem', color: '#f59e0b' }}>Bottom-right address corner has flash glare</span>
                  </div>
                  <span style={{ fontSize: '2rem' }}></span>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      handleCompleteAndTransferToPayment(c);
                    }}
                    style={{ flex: 1, background: '#10b981', color: '#000', fontWeight: 800, fontSize: '0.72rem', padding: '0.45rem' }}
                  >
                    Human Override & Transfer to Payment
                  </button>

                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setSelectedCase(c);
                      setBlurReuploadModal(true);
                    }}
                    style={{ fontSize: '0.72rem', color: '#f59e0b', borderColor: '#f59e0b' }}
                  >
                    Request Re-upload
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}



      {/* ========================================================================= */}
      {/* 7. SUBTAB: DIRECT OUTBOUND CALL WITH REGISTERER */}
      {/* ========================================================================= */}
      {(activeSubTab === 'CALL_DIALER' || activeSubTab === 'APPLICANT_CALLS') && (
        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={18} color="#10b981" /> Direct Voice Calling Console with Applicant
              </h3>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Initiate encrypted outbound voice calls to registerers for instant document clarification, address confirmation, or re-upload advice.
              </p>
            </div>
            <span className="badge badge-success">Twilio HD Voice Trunk Active</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.25rem' }}>
            
            {/* Left: Interactive Calling Terminal & Dialpad */}
            <div style={{ background: 'var(--bg-dark)', borderRadius: '10px', border: '1px solid var(--border-color)', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>CONNECTED APPLICANT:</span>
                  <h4 style={{ margin: '0.1rem 0 0 0', fontSize: '1rem', color: 'var(--text-main)' }}>
                    {selectedCase.applicantName} ({selectedCase.id})
                  </h4>
                </div>
                <span className={`badge ${activeCallStatus === 'IN_CALL' ? 'badge-success' : activeCallStatus === 'DIALING' ? 'badge-warning' : 'badge-secondary'}`}>
                  {activeCallStatus === 'IN_CALL' ? `IN CALL (${formatCallTime(callDuration)})` : activeCallStatus === 'DIALING' ? 'DIALING...' : 'IDLE'}
                </span>
              </div>

              {/* Number Bar */}
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'monospace' }}>
                  {selectedCase.phone}
                </span>
                {!activeCallStatus ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => handleStartDirectCall(selectedCase.phone)}
                    style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#fff', fontWeight: 800, fontSize: '0.75rem', padding: '0.4rem 0.85rem' }}
                  >
                    <PhoneCall size={14} /> Call Now
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary"
                    onClick={handleEndDirectCall}
                    style={{ background: '#ef4444', color: '#fff', fontWeight: 800, fontSize: '0.75rem', padding: '0.4rem 0.85rem', borderColor: '#ef4444' }}
                  >
                    <PhoneOff size={14} /> End Call
                  </button>
                )}
              </div>

              {/* Quick Call Notes & Clarification Memo */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>In-Call Officer Memo & Audit Notes:</span>
                <textarea
                  rows={4}
                  placeholder={`Spoke with ${selectedCase.applicantName}. Verified address details and requested PAN card re-upload without glare...`}
                  value={callNotes}
                  onChange={e => setCallNotes(e.target.value)}
                  className="form-input"
                  style={{ fontSize: '0.78rem' }}
                />
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    if (!callNotes.trim()) return;
                    showToast('Call summary note saved to applicant audit trail.');
                    setCallNotes('');
                  }}
                  style={{ alignSelf: 'flex-end', fontSize: '0.7rem', padding: '0.3rem 0.7rem' }}
                >
                  Save Call Memo
                </button>
              </div>
            </div>

            {/* Right: Quick Verification Checklist */}
            <div style={{ background: 'var(--bg-dark)', borderRadius: '10px', border: '1px solid var(--border-color)', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>
                Verbal Verification Security Checklist:
              </strong>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.74rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-surface)', padding: '0.5rem 0.65rem', borderRadius: '6px' }}>
                  <input type="checkbox" defaultChecked />
                  <span>Confirm Full Legal Name & Date of Birth</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-surface)', padding: '0.5rem 0.65rem', borderRadius: '6px' }}>
                  <input type="checkbox" defaultChecked />
                  <span>Confirm Permanent Pin Code & City</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-surface)', padding: '0.5rem 0.65rem', borderRadius: '6px' }}>
                  <input type="checkbox" />
                  <span>Advise on glare-free re-upload link sent via SMS</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-surface)', padding: '0.5rem 0.65rem', borderRadius: '6px' }}>
                  <input type="checkbox" />
                  <span>Confirm Onboarding Fee ({selectedCase.onboardingFee}) payment terms</span>
                </label>
              </div>

              <button
                className="btn btn-primary"
                onClick={() => handleCompleteAndTransferToPayment(selectedCase)}
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '0.78rem',
                  padding: '0.55rem',
                  borderRadius: '6px',
                  marginTop: '0.5rem'
                }}
              >
                Call Verified • Transfer to Payment Team →
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. SUBTAB: DUAL PERFORMANCE CENTER & AUDIT REPORT GENERATOR (HUMAN & AI) */}
      {/* ========================================================================= */}
      {activeSubTab === 'MY_METRICS' && (
        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Top Header & Download Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', borderBottom: '1.5px solid var(--border-color)', paddingBottom: '0.85rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BarChart2 size={20} color="#0284c7" />
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  Dual Performance Center & Audit Analytics (Human Officer & AI Telemetry)
                </h3>
              </div>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Inspect your human verification scorecard, monitor AI autonomous straight-through processing rates, and download audit-ready compliance reports.
              </p>
            </div>

            {/* Quick Export Report Buttons */}
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                className="btn btn-secondary"
                onClick={handleDownloadOfficerReport}
                style={{
                  fontSize: '0.72rem',
                  padding: '0.35rem 0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  color: '#0284c7',
                  borderColor: '#0284c7',
                  fontWeight: 700
                }}
                title="Download Officer Shift Performance Report as CSV"
              >
                <Download size={13} />
                <span>Export Officer Report (.CSV)</span>
              </button>

              <button
                className="btn btn-secondary"
                onClick={handleDownloadAiReport}
                style={{
                  fontSize: '0.72rem',
                  padding: '0.35rem 0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  color: '#10b981',
                  borderColor: '#10b981',
                  fontWeight: 700
                }}
                title="Download AI Model Telemetry & Accuracy Report as CSV"
              >
                <Download size={13} />
                <span>Export AI Report (.CSV)</span>
              </button>

              <button
                className="btn btn-primary"
                onClick={handleDownloadCombinedReport}
                style={{
                  fontSize: '0.72rem',
                  padding: '0.35rem 0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  background: 'linear-gradient(135deg, #0284c7 0%, #1e40af 100%)',
                  fontWeight: 800
                }}
                title="Download Complete Dual Audit Package"
              >
                <FileSpreadsheet size={13} />
                <span>Download Dual Audit Package</span>
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 1: KYC HUMAN OFFICER (ROHAN VERMA) PERFORMANCE SCORECARD */}
          {/* ========================================================================= */}
          <div style={{ background: 'var(--bg-dark)', border: '1.5px solid var(--border-color)', borderRadius: '10px', padding: '1.15rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.65rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#0284c7', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem' }}>
                  RV
                </div>
                <div>
                  <strong style={{ fontSize: '0.92rem', color: 'var(--text-main)' }}>Officer Rohan Verma (Senior KYC Officer • KYC-OFF-04)</strong>
                  <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>
                    Supervisor: <strong>Alex Vance (KYC Team Lead)</strong> • Shift: <strong>Morning 08:00 - 17:00 IST</strong>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                <span className="badge badge-success" style={{ fontSize: '0.68rem', padding: '0.25rem 0.6rem' }}>
                  Star Verification Officer (99.6% Accuracy)
                </span>
                <span className="badge badge-info" style={{ fontSize: '0.68rem', padding: '0.25rem 0.6rem' }}>
                  Shift Status: Online & Monitoring
                </span>
              </div>
            </div>

            {/* Officer Top 4 Primary KPIs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.85rem' }}>
              <div className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #10b981, #34d399)' } as React.CSSProperties}>
                <div className="kpi-card-header">
                  <span className="kpi-title-modern">Daily KYC Quota Target</span>
                  <Award size={18} className="text-emerald" />
                </div>
                <div className="kpi-value-modern">
                  <span>42 / 60</span>
                </div>
                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginTop: '0.2rem', overflow: 'hidden' }}>
                  <div style={{ width: '70%', height: '100%', background: '#10b981' }} />
                </div>
                <div className="kpi-subtext-modern">
                  <ArrowRight size={13} className="text-emerald" /> 70% Shift Target Completed
                </div>
              </div>

              <div className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #0284c7, #38bdf8)' } as React.CSSProperties}>
                <div className="kpi-card-header">
                  <span className="kpi-title-modern">Transferred to Payment Team</span>
                  <CheckCircle2 size={18} className="text-cyan" />
                </div>
                <div className="kpi-value-modern">
                  <span>38 Cleared</span>
                </div>
                <div className="kpi-subtext-modern">
                  +3 Pending Final Seal
                </div>
              </div>

              <div className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #f59e0b, #fde047)' } as React.CSSProperties}>
                <div className="kpi-card-header">
                  <span className="kpi-title-modern">AI Takeovers Resolved</span>
                  <Zap size={18} className="text-amber" />
                </div>
                <div className="kpi-value-modern">
                  <span>9 Handled</span>
                </div>
                <div className="kpi-subtext-modern">
                  Avg Override Time: 1.4 Mins
                </div>
              </div>

              <div className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #6366f1, #818cf8)' } as React.CSSProperties}>
                <div className="kpi-card-header">
                  <span className="kpi-title-modern">Direct PSTN Voice Calls</span>
                  <Phone size={18} className="text-brand" />
                </div>
                <div className="kpi-value-modern">
                  <span>5 Calls</span>
                </div>
                <div className="kpi-subtext-modern">
                  100% Clarification Rate
                </div>
              </div>
            </div>

            {/* Officer Secondary Operational Efficiency Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.85rem' }}>
              <div className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #10b981, #34d399)' } as React.CSSProperties}>
                <div className="kpi-card-header">
                  <span className="kpi-title-modern">Human Verification Accuracy</span>
                  <Award size={18} className="text-emerald" />
                </div>
                <div className="kpi-value-modern">
                  <span>99.6%</span>
                </div>
                <div className="kpi-subtext-modern">
                  Zero False Approvals
                </div>
              </div>

              <div className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #06b6d4, #38bdf8)' } as React.CSSProperties}>
                <div className="kpi-card-header">
                  <span className="kpi-title-modern">Avg Handling Time (AHT)</span>
                  <Clock size={18} className="text-cyan" />
                </div>
                <div className="kpi-value-modern">
                  <span>1m 42s</span>
                </div>
                <div className="kpi-subtext-modern">
                  Per Application Speed
                </div>
              </div>

              <div className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #f59e0b, #fde047)' } as React.CSSProperties}>
                <div className="kpi-card-header">
                  <span className="kpi-title-modern">SLA Compliance Rate</span>
                  <TrendingUp size={18} className="text-amber" />
                </div>
                <div className="kpi-value-modern">
                  <span>99.1%</span>
                </div>
                <div className="kpi-subtext-modern">
                  Under 15-Min SLA Window
                </div>
              </div>
            </div>

            {/* Officer Resolved Applications Breakdown Table */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Officer Shift Resolution Audit Log (Recent 6 Applications)
                </span>
                <button onClick={handleDownloadOfficerReport} className="btn btn-secondary" style={{ fontSize: '0.65rem', padding: '0.2rem 0.5rem' }}>
                  Download Shift Log (.CSV)
                </button>
              </div>

              <div style={{ width: '100%', overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                <table className="kyc-glossy-table">
                  <thead>
                    <tr>
                      <th>Application ID & Name</th>
                      <th>Category</th>
                      <th>Documents</th>
                      <th>AHT Speed</th>
                      <th>Status</th>
                      <th>Officer Certification & Action Taken</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 'REG-8822', name: 'David Miller', cat: 'AGENT', docs: 4, aht: '1m 30s', status: 'APPROVED', action: 'Cleared Aadhaar corner flash glare override' },
                      { id: 'REG-8829', name: 'Priya Ananthan', cat: 'MERCHANT', docs: 3, aht: '1m 15s', status: 'APPROVED', action: 'Validated MCA CIN registry match & Director PAN' },
                      { id: 'REG-8824', name: 'Meera Nair', cat: 'VENDOR', docs: 3, aht: '2m 10s', status: 'APPROVED', action: 'Resolved Interpol Red Notice false positive non-match' },
                      { id: 'REG-8823', name: 'Marcus Wright', cat: 'AGENT', docs: 2, aht: '1m 40s', status: 'APPROVED', action: 'Verified MRZ checksum alignment on driving license' },
                      { id: 'REG-8812', name: 'Rajesh Kumar', cat: 'AGENT', docs: 4, aht: '1m 10s', status: 'APPROVED', action: 'Instant 1-Click payment transfer approval' },
                      { id: 'REG-8821', name: 'Sophia Chen', cat: 'VENDOR', docs: 4, aht: '1m 25s', status: 'APPROVED', action: 'Verified Corporate GSTIN and PAN certification' }
                    ].map(row => (
                      <tr key={row.id} style={{ borderBottom: '1px solid var(--border-color)', background: 'transparent' }}>
                        <td style={{ padding: '0.55rem 0.75rem' }}>
                          <strong style={{ fontSize: '0.78rem', color: 'var(--text-main)' }}>{row.name}</strong>
                          <div style={{ fontSize: '0.62rem', color: '#0284c7' }}><code>{row.id}</code></div>
                        </td>
                        <td style={{ padding: '0.55rem 0.75rem' }}>
                          <span className="badge badge-info" style={{ fontSize: '0.6rem' }}>{row.cat}</span>
                        </td>
                        <td style={{ padding: '0.55rem 0.75rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          {row.docs} Docs
                        </td>
                        <td style={{ padding: '0.55rem 0.75rem', fontSize: '0.72rem', color: '#10b981', fontWeight: 700 }}>
                          {row.aht}
                        </td>
                        <td style={{ padding: '0.55rem 0.75rem' }}>
                          <span className="badge badge-success" style={{ fontSize: '0.6rem' }}>SENT TO PAYMENT</span>
                        </td>
                        <td style={{ padding: '0.55rem 0.75rem', fontSize: '0.7rem', color: 'var(--text-main)' }}>
                          {row.action}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 2: AI AGENT WORKFORCE & NEURAL MODEL TELEMETRY AUDIT */}
          {/* ========================================================================= */}
          <div style={{ background: 'var(--bg-dark)', border: '1.5px solid rgba(2, 132, 199, 0.4)', borderRadius: '10px', padding: '1.15rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.65rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Cpu size={22} color="#38bdf8" />
                <div>
                  <strong style={{ fontSize: '0.92rem', color: 'var(--text-main)' }}>AI Autonomous Ingestion Workforce & Telemetry Engine (v3.4)</strong>
                  <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>
                    Architecture: <strong>5 Specialized Neural Micro-Models</strong> • Gateway: <strong>Master AI Orchestrator</strong>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                <span className="badge badge-info" style={{ fontSize: '0.68rem', padding: '0.25rem 0.6rem' }}>
                  AI Processing Engine: 100% Operational
                </span>
                <button onClick={handleDownloadAiReport} className="btn btn-secondary" style={{ fontSize: '0.68rem', padding: '0.25rem 0.6rem', color: '#10b981', borderColor: '#10b981' }}>
                  <Download size={12} /> Export AI Telemetry (.CSV)
                </button>
              </div>
            </div>

            {/* AI Top 4 Primary Telemetry KPIs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.85rem' }}>
              <div className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #0284c7, #38bdf8)' } as React.CSSProperties}>
                <div className="kpi-card-header">
                  <span className="kpi-title-modern">Documents Ingested</span>
                  <FileText size={18} className="text-cyan" />
                </div>
                <div className="kpi-value-modern">
                  <span>1,482 Files</span>
                </div>
                <div className="kpi-subtext-modern">
                  <ArrowRight size={13} className="text-emerald" /> +124 in last hour
                </div>
              </div>

              <div className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #10b981, #34d399)' } as React.CSSProperties}>
                <div className="kpi-card-header">
                  <span className="kpi-title-modern">Straight-Through Rate (STP)</span>
                  <CheckCircle2 size={18} className="text-emerald" />
                </div>
                <div className="kpi-value-modern">
                  <span>82.4%</span>
                </div>
                <div className="kpi-subtext-modern">
                  Auto-transferred to Payment
                </div>
              </div>

              <div className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #f59e0b, #fde047)' } as React.CSSProperties}>
                <div className="kpi-card-header">
                  <span className="kpi-title-modern">Human Exception Routing</span>
                  <AlertTriangle size={18} className="text-amber" />
                </div>
                <div className="kpi-value-modern">
                  <span>17.6% (261)</span>
                </div>
                <div className="kpi-subtext-modern">
                  Routed to Human Officer Desk
                </div>
              </div>

              <div className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #6366f1, #818cf8)' } as React.CSSProperties}>
                <div className="kpi-card-header">
                  <span className="kpi-title-modern">Avg Inference Speed</span>
                  <Zap size={18} className="text-brand" />
                </div>
                <div className="kpi-value-modern">
                  <span>2.4s / Doc</span>
                </div>
                <div className="kpi-subtext-modern">
                  Ultra-Fast Neural Processing
                </div>
              </div>
            </div>

            {/* Neural Micro-Models Performance Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.75rem' }}>
              
              {/* Model 1: VisionOCR */}
              <div className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #6366f1, #818cf8)' } as React.CSSProperties}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#38bdf8' }}>VisionOCR-Alpha</span>
                  <span className="badge badge-success" style={{ fontSize: '0.55rem' }}>v4.2</span>
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>97.8% Accuracy</div>
                <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>Latency: <strong>1.2s</strong> • 1,482 parsed</div>
                <div style={{ fontSize: '0.6rem', color: '#f59e0b' }}>14 Glare exceptions routed</div>
              </div>

              {/* Model 2: BioGuard-3D */}
              <div className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #6366f1, #818cf8)' } as React.CSSProperties}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#10b981' }}>BioGuard-3D</span>
                  <span className="badge badge-success" style={{ fontSize: '0.55rem' }}>v2.9</span>
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>99.4% Face Match</div>
                <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>Latency: <strong>0.8s</strong> • 128 Landmarks</div>
                <div style={{ fontSize: '0.6rem', color: '#10b981' }}>2 Spoofs blocked</div>
              </div>

              {/* Model 3: GovVerify */}
              <div className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #6366f1, #818cf8)' } as React.CSSProperties}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#0284c7' }}>GovVerify Portal</span>
                  <span className="badge badge-success" style={{ fontSize: '0.55rem' }}>v3.1</span>
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>99.8% Gateway Up</div>
                <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>Latency: <strong>1.6s</strong> • UIDAI/MCA</div>
                <div style={{ fontSize: '0.6rem', color: '#0284c7' }}>5 Invalid CIN/GSTIN detected</div>
              </div>

              {/* Model 4: TamperGuard */}
              <div className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #6366f1, #818cf8)' } as React.CSSProperties}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#f59e0b' }}>TamperGuard-CNN</span>
                  <span className="badge badge-success" style={{ fontSize: '0.55rem' }}>v5.0</span>
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>99.1% Integrity</div>
                <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>Latency: <strong>1.1s</strong> • Hologram Scan</div>
                <div style={{ fontSize: '0.6rem', color: '#10b981' }}>4 Alterations caught</div>
              </div>

              {/* Model 5: AutoDecide */}
              <div className="kpi-card-modern" style={{ '--kpi-accent-gradient': 'linear-gradient(90deg, #6366f1, #818cf8)' } as React.CSSProperties}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#8b5cf6' }}>AutoDecide-Master</span>
                  <span className="badge badge-success" style={{ fontSize: '0.55rem' }}>v1.8</span>
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>99.9% Routing</div>
                <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>Latency: <strong>0.3s</strong> • 90% Threshold</div>
                <div style={{ fontSize: '0.6rem', color: '#10b981' }}>1,221 Auto-Payment Transferred</div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: VIEW ALL SHARED DOCUMENTS AS VISUAL SPECIMEN IMAGES */}
      {/* ========================================================================= */}
      {viewAllDocsModal && (
        <div className="modal-backdrop" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999, padding: '1.5rem' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '840px', maxHeight: '90vh', overflowY: 'auto', background: 'var(--bg-surface)', border: '2px solid #0284c7', borderRadius: '14px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.15rem', boxShadow: '0 25px 60px rgba(0,0,0,0.4)' }}>
            
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1.5px solid var(--border-color)', paddingBottom: '0.85rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.3rem' }}></span>
                  <strong style={{ fontSize: '1.05rem', color: 'var(--text-main)' }}>
                    Shared Document Images & Specimen Vault ({selectedCase.documents?.length} Files)
                  </strong>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Applicant: <strong>{selectedCase.applicantName}</strong> (<code>{selectedCase.id}</code>) • Category: <span className="badge badge-info" style={{ fontSize: '0.62rem' }}>{selectedCase.category}</span>
                </div>
              </div>
              <button onClick={() => setViewAllDocsModal(false)} className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', fontWeight: 800 }}>Close</button>
            </div>

            {/* Grid of Shared Document Image Specimen Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {selectedCase.documents?.map((doc: any, idx: number) => (
                <div
                  key={doc.id || idx}
                  style={{
                    background: 'var(--bg-dark)',
                    border: '1.5px solid var(--border-color)',
                    borderRadius: '10px',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.65rem',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                  }}
                >
                  {/* Doc Top Bar */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ fontSize: '1.2rem' }}>{doc.icon || ''}</span>
                      <strong style={{ fontSize: '0.82rem', color: 'var(--text-main)', maxWidth: '220px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{doc.name}</strong>
                    </div>
                    <span className={`badge ${doc.status === 'VERIFIED' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.62rem' }}>
                      {doc.status}
                    </span>
                  </div>

                  {/* Visual Specimen Image Preview Box */}
                  <div
                    style={{
                      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                      border: '1px solid rgba(56, 189, 248, 0.4)',
                      borderRadius: '8px',
                      padding: '0.85rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.35rem' }}>
                      <span style={{ fontSize: '0.62rem', letterSpacing: '0.5px', textTransform: 'uppercase', color: '#94a3b8' }}>
                        OFFICIAL DIGITAL SPECIMEN
                      </span>
                      <span style={{ fontSize: '0.58rem', color: '#10b981', background: 'rgba(16,185,129,0.2)', padding: '1px 5px', borderRadius: '3px', fontWeight: 800 }}>
                        SHA-256 SEALED
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '0.65rem', alignItems: 'center' }}>
                      <div style={{ width: '60px', height: '70px', background: 'rgba(2, 132, 199, 0.15)', border: '1.5px dashed #0284c7', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>
                                              </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                        <div style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 800 }}>{selectedCase.applicantName}</div>
                        <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>Document No: <code style={{ color: '#f8fafc', fontWeight: 700 }}>{doc.number}</code></div>
                        <div style={{ fontSize: '0.62rem', color: '#10b981' }}>File Size: {doc.fileSize || '2.1 MB'} • Specimen Ingested</div>
                      </div>
                    </div>
                  </div>

                  {/* Card Action */}
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setActiveDocIndex(idx);
                      setViewAllDocsModal(false);
                      if (onSelectSubTab) onSelectSubTab('AGENT_DESK');
                      showToast(`Opened ${doc.name} in high-resolution Specimen Inspector.`);
                    }}
                    style={{ fontSize: '0.7rem', padding: '0.35rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', color: '#0284c7', borderColor: '#0284c7', fontWeight: 700 }}
                  >
                    <Eye size={12} /> Inspect Specimen in Workspace Desk
                  </button>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1.5px solid var(--border-color)', paddingTop: '0.85rem' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Total Verified: <strong>{selectedCase.documents?.length} of {selectedCase.documents?.length} documents verified</strong>
              </span>
              <button onClick={() => setViewAllDocsModal(false)} className="btn btn-primary" style={{ fontSize: '0.76rem', padding: '0.4rem 0.9rem' }}>
                Close Viewer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: BLUR RE-UPLOAD REQUEST ADVISORY */}
      {/* ========================================================================= */}
      {blurReuploadModal && (
        <div className="modal-backdrop" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '1.5rem' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '520px', background: 'var(--bg-surface)', border: '1.5px solid #f59e0b', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.65rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontSize: '1.2rem' }}></span>
                <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>Send Re-Upload Notice to {selectedCase.applicantName}</strong>
              </div>
              <button onClick={() => setBlurReuploadModal(false)} className="btn btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}></button>
            </div>

            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              An instant notification will be dispatched to <strong>{selectedCase.phone}</strong> and <strong>{selectedCase.email}</strong> with a secure re-upload link.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>Custom Advisory Guidance:</span>
              <textarea
                rows={3}
                value={blurReuploadNote}
                onChange={e => setBlurReuploadNote(e.target.value)}
                className="form-input"
                style={{ fontSize: '0.78rem' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button onClick={() => setBlurReuploadModal(false)} className="btn btn-secondary" style={{ fontSize: '0.74rem' }}>Cancel</button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setBlurReuploadModal(false);
                  showToast(`Re-upload request dispatched to ${selectedCase.applicantName} via SMS & WhatsApp!`);
                }}
                style={{ background: '#f59e0b', color: '#000', fontWeight: 800, fontSize: '0.74rem' }}
              >
                Dispatch Re-upload Advisory
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ESCALATE CASE TO ALEX VANCE (KYC TL) */}
      {/* ========================================================================= */}
      {escalateTlModal && (
        <div className="modal-backdrop" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '1.5rem' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '520px', background: 'var(--bg-surface)', border: '1.5px solid #ef4444', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.65rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontSize: '1.2rem' }}></span>
                <strong style={{ fontSize: '0.95rem', color: 'var(--text-rose)' }}>Escalate {selectedCase.id} to Alex Vance (KYC TL)</strong>
              </div>
              <button onClick={() => setEscalateTlModal(false)} className="btn btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}></button>
            </div>

            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              This application will be prioritized on Alex Vance's Team Lead Escalation Desk.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>Escalation Reason / Officer Note:</span>
              <textarea
                rows={3}
                placeholder="Describe the discrepancy or fraud suspicion..."
                value={escalateTlNote}
                onChange={e => setEscalateTlNote(e.target.value)}
                className="form-input"
                style={{ fontSize: '0.78rem' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button onClick={() => setEscalateTlModal(false)} className="btn btn-secondary" style={{ fontSize: '0.74rem' }}>Cancel</button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setEscalateTlModal(false);
                  setKycCases(prev => prev.map(c => c.id === selectedCase.id ? { ...c, status: 'ESCALATED_TO_TL' } : c));
                  showToast(`Case ${selectedCase.id} escalated to Alex Vance (KYC Team Lead)!`);
                }}
                style={{ background: '#ef4444', color: '#fff', fontWeight: 800, fontSize: '0.74rem' }}
              >
                Escalate to Team Lead
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
