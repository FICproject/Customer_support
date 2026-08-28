export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  QUERIES_TL = 'QUERIES_TL',
  KYC_TL = 'KYC_TL',
  PAYMENT_TL = 'PAYMENT_TL',
  QUERY_AGENT = 'QUERY_AGENT',
  KYC_AGENT = 'KYC_AGENT',
  PAYMENT_AGENT = 'PAYMENT_AGENT',
  CUSTOMER = 'CUSTOMER',
  VENDOR = 'VENDOR',
  AGENT = 'AGENT',
  TECHNICIAN = 'TECHNICIAN',
  HOSPITAL = 'HOSPITAL',
  HOTEL = 'HOTEL',
  TRAVEL_PROVIDER = 'TRAVEL_PROVIDER'
}

export enum AIAgentType {
  ROUTER = 'ROUTER',
  CUSTOMER_PROFILE = 'CUSTOMER_PROFILE',
  QUERY = 'QUERY',
  KYC = 'KYC',
  PAYMENT = 'PAYMENT',
  CALLING = 'CALLING',
  EMAIL = 'EMAIL',
  WHATSAPP = 'WHATSAPP',
  FRAUD_DETECTION = 'FRAUD_DETECTION',
  KNOWLEDGE = 'KNOWLEDGE',
  MONITORING = 'MONITORING'
}

export interface KPIState {
  activeConversations: number;
  liveVoiceCalls: number;
  liveChats: number;
  openTickets: number;
  escalatedTickets: number;
  aiResolutionRate: number;
  aiConfidenceScore: number;
  slaCompliance: number;
  csatScore: number;
  systemHealth: string;
  revenueUSD: number;
  commissionPayoutsUSD: number;
  activeAIWorkers: number;
}
