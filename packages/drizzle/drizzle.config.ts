import { env } from '@todo/env'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  migrations: {
    table: 'migrations',
    schema: 'public',
  },
  out: './drizzle-migrations',
  schema: './schemas/index.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
})
