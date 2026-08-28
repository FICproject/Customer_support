import { z } from 'zod';

export const TicketPrioritySchema = z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']);
export const TicketStatusSchema = z.enum(['OPEN', 'IN_PROGRESS', 'RESOLVED', 'ESCALATED', 'CLOSED']);
export const ChannelSchema = z.enum(['CHAT', 'WHATSAPP', 'EMAIL', 'VOICE', 'SYSTEM']);

export const CreateTicketSchema = z.object({
  customerId: z.string().min(1, 'Customer ID is required'),
  customerName: z.string().min(1, 'Customer Name is required'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  description: z.string().min(5, 'Description must be at least 5 characters'),
  channel: ChannelSchema.default('CHAT'),
  priority: TicketPrioritySchema.default('MEDIUM'),
  department: z.string().default('General Support')
});

export type CreateTicketInput = z.infer<typeof CreateTicketSchema>;

export const TicketOverrideSchema = z.object({
  teamLeadId: z.string().optional(),
  overrideNote: z.string().min(3, 'Override note must be at least 3 characters'),
  newStatus: z.string().optional()
});

export type TicketOverrideInput = z.infer<typeof TicketOverrideSchema>;
