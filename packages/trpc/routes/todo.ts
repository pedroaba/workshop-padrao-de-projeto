import { db } from '@todo/drizzle'
import { todo } from '@todo/drizzle/schemas'
import { desc, ilike } from 'drizzle-orm'
import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '../trpc'

export const todoRouter = createTRPCRouter({
  listTodos: publicProcedure
    .input(
      z.object({
        title: z.string().optional().default(''),
      }),
    )
    .query(async ({ input }) => {
      const todos = await db
        .select()
        .from(todo)
        .where(ilike(todo.title, `%${input.title}%`))
        .orderBy(desc(todo.createdAt))

      return { todos }
    }),
})
