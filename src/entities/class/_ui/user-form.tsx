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
import { userSchema } from "../_domain/schema";

type UserFormValues = z.infer<typeof userSchema>;

const getDefaultValues = (user?: UserFormValues) => {
  return {
    name: user?.name ?? "",
    email: user?.email ?? "",
    image: user?.image ?? undefined,
    phone: user?.phone ?? undefined,
  };
};

export function UserForm({
  user,
  onSuccess,
  submitText = "Создать",
  isPending,
}: {
  user?: UserFormValues;
  onSuccess: (data: UserFormValues) => void;
  submitText?: string;
  isPending: boolean;
}) {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: getDefaultValues(user),
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log("DATA USER", data);
    form.reset(getDefaultValues(data));
    onSuccess(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ФИО</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Почта</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {isPending && (
            <Spinner
              className="mr-2 h-4 w-4"
              aria-label="Создание пользователя"
            />
          )}
          {submitText}
        </Button>
      </form>
    </Form>
  );
}
