import { z } from 'zod';

export const AuthSwitchUserSchema = z.object({
  userId: z.string().min(1, 'User ID is required')
});

export type AuthSwitchUserInput = z.infer<typeof AuthSwitchUserSchema>;
