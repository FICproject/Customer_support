import { z } from 'zod';

export const GeneratePaymentLinkSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  amount: z.number().positive('Amount must be a positive number'),
  purpose: z.string().min(2, 'Purpose must be at least 2 characters'),
  referredAgentId: z.string().optional()
});

export type GeneratePaymentLinkInput = z.infer<typeof GeneratePaymentLinkSchema>;

export const PaymentTransactionSchema = z.object({
  customerId: z.string().min(1, 'Customer ID is required'),
  amount: z.number().positive('Amount must be greater than 0'),
  currency: z.string().length(3, 'Currency must be a 3-letter code (e.g. USD, INR, EUR)').toUpperCase(),
  type: z.enum(['PAYMENT', 'REFUND', 'PAYOUT', 'BONUS']),
  description: z.string().optional()
});

export type PaymentTransactionInput = z.infer<typeof PaymentTransactionSchema>;
