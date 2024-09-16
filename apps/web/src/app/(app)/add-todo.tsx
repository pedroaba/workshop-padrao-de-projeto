import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle, Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useServerAction } from 'zsa-react'

import { createTodoAction } from '@/actions/create-todo-action'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const createTodoSchema = z.object({
  title: z
    .string()
    .min(10, {
      message: 'O título precisa ter no mínimo 10 caracteres.',
    })
    .refine((title) => title.trim().length >= 10, {
      message: 'O título precisa ter no mínimo 10 caracteres.',
    }),
})

type CreateTodoSchema = z.infer<typeof createTodoSchema>

export function AddTodo() {
  const [isDialogOpened, setIsDialogOpened] = useState(false)
  const { execute, isPending } = useServerAction(createTodoAction)
  const form = useForm<CreateTodoSchema>({
    resolver: zodResolver(createTodoSchema),
    disabled: isPending,
  })

  async function handleCreateTodo({ title }: CreateTodoSchema) {
    const [, error] = await execute({
      title,
    })

    if (!error) {
      setIsDialogOpened(false)
      form.reset()
    }
  }

  function handleOpenChange(openState: boolean) {
    setIsDialogOpened(openState)
    form.reset()
  }

  return (
    <Dialog open={isDialogOpened} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button type="button" className="space-x-2">
          <Plus className="size-4" />
          <span>Adicionar</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="">
        <DialogHeader className="">
          <DialogTitle className="text-zinc-100">Adicionar tarefa</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-100">Título*</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-zinc-800 border-zinc-900 focus-within:ring-zinc-900 focus-within:border-zinc-900 text-zinc-100"
                      placeholder="Ex: Fazer tarefa do chris..."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter className="dark">
          <DialogClose asChild>
            <Button variant="destructive">Cancelar</Button>
          </DialogClose>
          <Button
            variant="secondary"
            className="gap-2"
            disabled={isPending}
            onClick={form.handleSubmit(handleCreateTodo)}
          >
            {isPending ? (
              <LoaderCircle className="size-4 text-zinc-50 animate-spin" />
            ) : (
              <Plus className="size-4 text-zinc-50" />
            )}
            <span>Criar</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
