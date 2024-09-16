'use server'

import { randomUUID as uuid } from 'node:crypto'

import { db } from '@todo/drizzle'
import { todo } from '@todo/drizzle/schemas'
import { z } from 'zod'
import { createServerAction } from 'zsa'

export const createTodoAction = createServerAction()
  .input(
    z.object({
      title: z.string(),
    }),
    {
      type: 'json',
    },
  )
  .handler(async ({ input }) => {
    const { title } = input

    const [drizzleTodo] = await db
      .insert(todo)
      .values({
        id: uuid(),
        title,
      })
      .returning()

    return {
      todoId: drizzleTodo.id,
    }
  })
