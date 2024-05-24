"use server";

import { z } from "zod";
import { getAppSessionStrictServer } from "@/entities/user/session.server";
import { userSchema } from "../_domain/schema";
import { studentRepository } from "../_repositories/student";

// Получить студентов

const propsSchemaGet = z.object({
  hasOwnClass: z.boolean().optional(),
});

const resultSchemaGet = z.array(
  z.object({
    id: z.number(),
    user: userSchema,
  }),
);

export const getStudentsAction = async ({
  hasOwnClass,
}: z.infer<typeof propsSchemaGet>) => {
  const session = await getAppSessionStrictServer();

  const students = await studentRepository.getAllStudents(hasOwnClass);

  return resultSchemaGet.parseAsync(
    students.map((student) => ({
      id: student.id,
      user: student.user,
    })),
  );
};

// Создать студента

const propsSchemaCreate = z.object({
  data: userSchema,
});

const resultSchemaCreate = z.object({
  id: z.number(),
});

export const createStudentAction = async (
  props: z.infer<typeof propsSchemaCreate>,
) => {
  const { data } = propsSchemaCreate.parse(props);

  const session = await getAppSessionStrictServer();

  console.log(session);

  const student = await studentRepository.create(data);

  return resultSchemaCreate.parseAsync({
    id: student.id,
  });
};
