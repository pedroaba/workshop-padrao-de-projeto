import { neon } from '@neondatabase/serverless'
import { env } from '@todo/env'
import { drizzle } from 'drizzle-orm/neon-http'

import * as schema from './schemas'

const client = neon(env.DATABASE_URL)
export const db = drizzle(client, { schema })
