'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Search } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const filterSchema = z.object({
  title: z
    .string()
    .min(10, {
      message: 'O título precisa ter no mínimo 10 caracteres.',
    })
    .refine((title) => title.trim().length >= 10, {
      message: 'O título precisa ter no mínimo 10 caracteres.',
    }),
})

type FilterSchema = z.infer<typeof filterSchema>
type FilterFormProps = {
  title?: string
}

export function FilterForm({ title }: FilterFormProps) {
  const form = useForm<FilterSchema>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      title,
    },
  })

  return (
    <Form {...form}>
      <form className="flex items-center w-full gap-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className="bg-zinc-800 border-zinc-900 focus-within:ring-zinc-900 focus-within:border-zinc-900 text-zinc-100"
                  placeholder="Ex: tarefa do chris..."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="space-x-2">
          <Search className="size-4" />
          <span>Filtrar</span>
        </Button>
      </form>
    </Form>
  )
}
