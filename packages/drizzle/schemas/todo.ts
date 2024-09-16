import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const todo = pgTable('todos', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  completed: boolean('completed').default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})
