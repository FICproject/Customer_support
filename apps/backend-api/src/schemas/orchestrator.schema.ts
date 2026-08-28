import { z } from 'zod';

export const OrchestratorGatewaySchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  userName: z.string().min(1, 'User Name is required'),
  userRole: z.string().optional(),
  channel: z.string().default('CHAT_WEB'),
  query: z.string().min(1, 'Customer query is required')
});

export type OrchestratorGatewayInput = z.infer<typeof OrchestratorGatewaySchema>;
