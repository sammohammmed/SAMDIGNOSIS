import { config } from 'dotenv'
import { z } from 'zod'

config()

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(4000),
  ALLOW_ORIGIN: z.string().default('*')
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error('Failed to parse environment variables', parsed.error.flatten().fieldErrors)
  process.exit(1)
}

export const env = parsed.data
