"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/shared/ui/textarea";
import { Input } from "@/shared/ui/input";
import { useTransition } from "react";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/ui/utils";
import { createCourseAction } from "../actions";

const createCourseFormSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export function CreateCourseForm({
  revalidatePagePath,
  className,
}: {
  className: string;
  revalidatePagePath: string;
}) {
  const [isCreateTransition, startCreateTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(createCourseFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          startCreateTransition(async () => {
            return createCourseAction(data, revalidatePagePath);
          });
        })}
        className={cn(className, "space-y-4")}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input placeholder="Название..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea placeholder="Описание..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-8" type="submit" disabled={isCreateTransition}>
          Добавить
        </Button>
      </form>
    </Form>
  );
}
