import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export function TaskItem() {
  return (
    <Label
      htmlFor="mark-as-checked"
      className="w-full h-16 bg-zinc-800 rounded-md flex items-center px-6 peer"
    >
      <Checkbox id="mark-as-checked" />

      <p className="ml-4 text-zinc-100 peer-data-[state=checked]:line-through peer-data-[state=checked]:text-zinc-400">
        Fazer a tarefa do breno
      </p>
    </Label>
  )
}
