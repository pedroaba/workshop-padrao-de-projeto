'use server'

import { db } from '@todo/drizzle'
import { todo } from '@todo/drizzle/schemas'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { createServerAction } from 'zsa'

export const markTodoAsCompletedAction = createServerAction()
  .input(
    z.object({
      todoId: z.string().uuid(),
      todoState: z.boolean().optional().default(false),
    }),
  )
  .handler(async ({ input }) => {
    await db
      .update(todo)
      .set({
        completed: input.todoState,
      })
      .where(eq(todo.id, input.todoId))

    return {}
  })
