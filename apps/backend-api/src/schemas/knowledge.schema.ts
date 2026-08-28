import { z } from 'zod';

export const KnowledgeSearchSchema = z.object({
  query: z.string().min(2, 'Search query must be at least 2 characters'),
  category: z.string().optional(),
  limit: z.number().int().positive().optional()
});

export type KnowledgeSearchInput = z.infer<typeof KnowledgeSearchSchema>;
