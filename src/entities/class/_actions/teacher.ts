"use server";

import { z } from "zod";
import { getAppSessionStrictServer } from "@/entities/user/session.server";
import { userSchema } from "../_domain/schema";
import { teacherRepository } from "../_repositories/teacher";

// Получить преподавателей

const propsSchemaGet = z.object({
  hasOwnClass: z.boolean().optional(),
});

const resultSchemaGet = z.array(
  z.object({
    id: z.number(),
    user: userSchema,
  }),
);

export const getTeachersAction = async ({
  hasOwnClass,
}: z.infer<typeof propsSchemaGet>) => {
  const session = await getAppSessionStrictServer();

  const teachers = await teacherRepository.getAllTeachers(hasOwnClass);

  return resultSchemaGet.parseAsync(
    teachers.map((teacher) => ({
      id: teacher.id,
      user: teacher.user,
    })),
  );
};

// Создать преподавателя

const propsSchema = z.object({
  data: userSchema,
});

const resultSchema = z.object({
  id: z.number(),
});

export const createTeacherAction = async (
  props: z.infer<typeof propsSchema>,
) => {
  const { data } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  console.log(session);

  const teacher = await teacherRepository.create(data);

  return resultSchema.parseAsync({
    id: teacher.id,
  });
};
