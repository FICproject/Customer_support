import { z } from 'zod';

export const TelephonyOutboundCallSchema = z.object({
  userId: z.string().optional(),
  userName: z.string().optional(),
  userPhone: z.string().min(6, 'Valid phone number is required'),
  callReason: z.string().min(2, 'Call reason is required'),
  paymentLinkId: z.string().optional()
});

export type TelephonyOutboundCallInput = z.infer<typeof TelephonyOutboundCallSchema>;
