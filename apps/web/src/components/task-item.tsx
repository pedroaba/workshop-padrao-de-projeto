'use client'

import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { useServerAction } from 'zsa-react'

import { markTodoAsCompletedAction } from '@/actions/mark-todo-as-completed-action'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

type TaskItemProps = {
  id: string
  title: string
  completed?: boolean
}

export function TaskItem({
  id: todoId,
  title,
  completed = false,
}: TaskItemProps) {
  const [isCompleted, setIsCompleted] = useState<boolean>(completed)
  const { execute, isPending } = useServerAction(markTodoAsCompletedAction, {
    initialData: {},
  })

  async function handleCheckedChange(checkedState: boolean, id: string) {
    setIsCompleted(checkedState)

    const [, error] = await execute({
      todoId: id,
      todoState: checkedState,
    })

    if (error) {
      setIsCompleted(false)
    }
  }

  return (
    <Label
      htmlFor={`mark-as-checked-${todoId}`}
      className="w-full h-16 bg-zinc-800 rounded-md flex items-center px-6 peer justify-between"
    >
      <div className="flex items-center">
        <Checkbox
          id={`mark-as-checked-${todoId}`}
          disabled={isPending}
          checked={isCompleted}
          onCheckedChange={(checkState) =>
            handleCheckedChange(checkState as boolean, todoId)
          }
        />

        <p className="ml-4 text-zinc-100 peer-data-[state=checked]:line-through peer-data-[state=checked]:text-zinc-400">
          {title}
        </p>
      </div>

      {isPending && (
        <LoaderCircle className="size-4 text-zinc-50 animate-spin" />
      )}
    </Label>
  )
}
