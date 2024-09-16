import 'server-only'

import { appRouter, createCallerFactory } from '@todo/trpc'

export const serverClient = createCallerFactory(appRouter)(async () => {
  return {}
})
