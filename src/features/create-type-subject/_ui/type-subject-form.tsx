"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Spinner } from "@/shared/ui/spinner";
import { subjectTypeSchema } from "@/entities/class/subject-type";
import { useAppearanceDelay } from "@/shared/lib/react";

type SubjectTypeFormValues = z.infer<typeof subjectTypeSchema>;

export function SubjectTypeForm({
  onSuccess,
  submitText = "Сохранить",
  isPending,
}: {
  onSuccess: (data: SubjectTypeFormValues) => void;
  submitText?: string;
  isPending: boolean;
}) {
  const isDelayPending = useAppearanceDelay(isPending);

  const form = useForm<SubjectTypeFormValues>({
    resolver: zodResolver(subjectTypeSchema),
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    form.reset({ name: "" });
    onSuccess(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-2 flex gap-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название предмета</FormLabel>
              <FormMessage />
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="self-end" disabled={isPending} type="submit">
          {isDelayPending && (
            <Spinner
              className="mr-2 h-4 w-4"
              aria-label="Отправка формы типа предмета"
            />
          )}
          {submitText}
        </Button>
      </form>
    </Form>
  );
}
