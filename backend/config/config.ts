import * as dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  SECRET: z.string(),
  CONNECTION_STRING: z.string(),
  PORT: z.string().transform(Number),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error('Invalid environment variables:', env.error.format());
  throw new Error('Invalid environment variables');
}

export const { SECRET, CONNECTION_STRING, PORT } = env.data;
