import { z } from 'zod';

export const AIAgentStatusSchema = z.enum(['ONLINE', 'BUSY', 'IDLE', 'PAUSED', 'DEGRADED']);

export const RegisterAIAgentSchema = z.object({
  name: z.string().min(2, 'Agent name must be at least 2 characters'),
  code: z.string().min(2, 'Agent code must be at least 2 characters').toUpperCase(),
  category: z.string().min(2, 'Category is required'),
  status: AIAgentStatusSchema.default('ONLINE'),
  healthPercent: z.number().min(0).max(100).default(100),
  version: z.string().default('v1.0.0'),
  promptVersion: z.string().default('v1.0-prod'),
  assignedJobs: z.number().int().min(0).default(0),
  queueLength: z.number().int().min(0).default(0),
  memoryUsageMb: z.number().min(0).default(256),
  tokenUsageCount: z.number().min(0).default(0),
  costPerDay: z.number().min(0).default(0)
});

export type RegisterAIAgentInput = z.infer<typeof RegisterAIAgentSchema>;

export const UpdateAIAgentStatusSchema = z.object({
  status: AIAgentStatusSchema,
  healthPercent: z.number().min(0).max(100).optional()
});

export type UpdateAIAgentStatusInput = z.infer<typeof UpdateAIAgentStatusSchema>;

export const UpdateAIAgentSchema = z.object({
  name: z.string().min(2, 'Agent name must be at least 2 characters').optional(),
  category: z.string().min(2, 'Category is required').optional(),
  promptVersion: z.string().optional()
});

export type UpdateAIAgentInput = z.infer<typeof UpdateAIAgentSchema>;
