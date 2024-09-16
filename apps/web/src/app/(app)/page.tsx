// import { TaskItem } from '@/components/task-item'
// eslint-disable-next-line camelcase
import { unstable_noStore } from 'next/cache'

import { TaskItem } from '@/components/task-item'
import { Separator } from '@/components/ui/separator'
import { serverClient } from '@/lib/trpc/server'

import { FilterForm } from './filter-form'

type HomeProps = {
  searchParams: {
    title: string
  }
}

export default async function Home({ searchParams }: HomeProps) {
  unstable_noStore()
  const { todos } = await serverClient.listTodos({
    title: searchParams.title,
  })

  return (
    <main className="h-full w-full p-10 space-y-4">
      <h1 className="text-2xl text-zinc-50">Minhas tarefas</h1>

      <Separator className="bg-zinc-700" />

      <FilterForm title={searchParams.title} />

      <div className="space-y-4">
        {todos.map((todo) => {
          console.log(todo.id)
          return (
            <TaskItem
              key={todo.id}
              id={todo.id}
              title={todo.title}
              completed={todo.completed ?? false}
            />
          )
        })}
      </div>
    </main>
  )
}
