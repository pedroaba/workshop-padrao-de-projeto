import { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

import { todoRouter } from './routes/todo'
import { createCallerFactory, mergeRouters } from './trpc'

export const appRouter = mergeRouters(todoRouter)

export { createCallerFactory }

export type AppRouter = typeof appRouter
export type RouterInputs = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>
