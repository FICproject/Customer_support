import { z } from 'zod';

export const EnvSchema = z.object({
  PORT: z.string().default('5000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  MONGO_URI: z.string().optional(),
  OPENAI_API_KEY: z.string().optional(),
  GEMINI_API_KEY: z.string().optional(),
  JWT_SECRET: z.string().default('default_jwt_secret_dev_key')
});

export type EnvConfig = z.infer<typeof EnvSchema>;
