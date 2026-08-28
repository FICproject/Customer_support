import { z } from 'zod';

export const PromptCategorySchema = z.enum([
  'SYSTEM',
  'QUERY',
  'KYC',
  'PAYMENT',
  'CALLING',
  'EMAIL',
  'WHATSAPP',
  'ESCALATION',
  'TRANSLATION',
  'ORCHESTRATOR',
  'EVALUATION',
  'DEPARTMENT',
  'CUSTOM'
]);

export const PromptStatusSchema = z.enum(['DRAFT', 'TESTING', 'APPROVED', 'ACTIVE', 'ARCHIVED']);

export const CreatePromptTemplateSchema = z.object({
  category: PromptCategorySchema.default('SYSTEM'),
  categoryLabel: z.string().optional(),
  name: z.string().min(3, 'Prompt name must be at least 3 characters'),
  code: z.string().min(2, 'Code identifier is required').regex(/^[A-Z0-9_]+$/, 'Code identifier must contain only uppercase letters, numbers, and underscores'),
  promptContent: z.string().min(5, 'System instructions must be at least 5 characters'),
  model: z.string().default('GPT-4o'),
  status: PromptStatusSchema.default('DRAFT'),
  testVariables: z.record(z.string(), z.string()).default({})
});

export type CreatePromptTemplateInput = z.infer<typeof CreatePromptTemplateSchema>;

export const UpdatePromptTemplateSchema = z.object({
  id: z.string().optional(),
  agentType: z.string().optional(),
  title: z.string().optional(),
  systemPrompt: z.string().min(5, 'System prompt must be at least 5 characters'),
  userPromptTemplate: z.string().optional(),
  model: z.string().optional(),
  status: PromptStatusSchema.optional()
});

export type UpdatePromptTemplateInput = z.infer<typeof UpdatePromptTemplateSchema>;
