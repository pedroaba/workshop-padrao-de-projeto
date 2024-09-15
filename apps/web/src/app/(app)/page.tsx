// import { TaskItem } from '@/components/task-item'
import { Separator } from '@/components/ui/separator'

import { FilterForm } from './filter-form'

type HomeProps = {
  searchParams: {
    title: string
  }
}

export default function Home({ searchParams }: HomeProps) {
  return (
    <main className="h-full w-full p-10 space-y-4">
      <h1 className="text-2xl text-zinc-50">Minhas tarefas</h1>

      <Separator className="bg-zinc-700" />

      <FilterForm title={searchParams.title} />

      {/* <TaskItem /> */}
    </main>
  )
}
