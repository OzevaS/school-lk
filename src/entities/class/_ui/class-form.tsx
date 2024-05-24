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
import { classSchema } from "../_domain/schema";
import { useQuery } from "@tanstack/react-query";
import { getTeachersQuery } from "../_queries/teacher";
import { getStudentsQuery } from "../_queries/student";
import { SmartMultiSelect } from "@/shared/ui/smart-multi-select";
import { Separator } from "@radix-ui/react-dropdown-menu";
import SmartSelect from "@/shared/ui/smart-select";

type ClassFormValues = z.infer<typeof classSchema>;

const getDefaultValues = (classValue?: ClassFormValues) => {
  return {
    name: classValue?.name ?? "",
    teacher_id: classValue?.teacher_id ?? undefined,
    student_ids: classValue?.student_ids ?? [],
  };
};

export function ClassForm({
  classValue,
  onSuccess,
  submitText = "Сохранить",
  isPending,
}: {
  classValue?: ClassFormValues;
  onSuccess: (data: ClassFormValues) => void;
  submitText?: string;
  isPending: boolean;
}) {
  const form = useForm<ClassFormValues>({
    resolver: zodResolver(classSchema),
    defaultValues: getDefaultValues(classValue),
  });
  const { isPending: isTeachersPending, data: teachers } = useQuery({
    ...getTeachersQuery(false),
    retry: 0,
  });
  const { isPending: isStudentsPending, data: students } = useQuery({
    ...getStudentsQuery(false),
    retry: 0,
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    form.reset(getDefaultValues(data));
    onSuccess(data);
  });

  const isDisabledSubmit = isTeachersPending || isStudentsPending;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название класса</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="teacher_id"
          disabled={isTeachersPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Учитель
                <Separator />
              </FormLabel>
              <FormControl>
                <SmartSelect
                  {...field}
                  options={
                    teachers?.map((teacher) => ({
                      value: teacher.id,
                      label: `${teacher.user.name} (${teacher.user.email})`,
                    })) ?? []
                  }
                  placeholder="Выберите учителя"
                  isPending={isTeachersPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="student_ids"
          disabled={isStudentsPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Студенты
                <Separator />
              </FormLabel>
              <FormControl>
                <SmartMultiSelect
                  {...field}
                  options={
                    students?.map((student) => ({
                      value: student.id,
                      label: `${student.user.name} (${student.user.email})`,
                    })) ?? []
                  }
                  placeholder="Выберите студентов"
                  isPending={isStudentsPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isDisabledSubmit} type="submit">
          {isPending && (
            <Spinner
              className="mr-2 h-4 w-4"
              aria-label="Отправка формы класса"
            />
          )}
          {submitText}
        </Button>
      </form>
    </Form>
  );
}
