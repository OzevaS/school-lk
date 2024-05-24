"use server";

import { z } from "zod";
import { getAppSessionStrictServer } from "@/entities/user/session.server";
import { subjectRepository } from "../_repositories/class-subject";
import { userSchema } from "../user";

// Удаление типа предмета

const propsSchemaRemove = z.object({
  id: z.number(),
});

export const removeClassSubjectAction = async (
  props: z.infer<typeof propsSchemaRemove>,
) => {
  const { id } = propsSchemaRemove.parse(props);

  const session = await getAppSessionStrictServer();

  await subjectRepository.remove(id);
};

// Получение всех типов предметов

const resultSchemaGet = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    teacher: userSchema.optional(),
  }),
);

export const getClassSubjectsAction = async (classId: number) => {
  const session = await getAppSessionStrictServer();

  const subjects = await subjectRepository.getSubjectsByClassId(classId);

  return resultSchemaGet.parseAsync(
    subjects.map((subject) => ({
      id: subject.id,
      name: subject.SubjectType.name,
      teacher: subject.Staff?.User,
    })),
  );
};

// Создание классных предметов

const propsSchemaCreate = z.object({
  data: z.array(
    z.object({
      class_id: z.number(),
      type_id: z.number(),
      teacher_id: z.number().optional(),
    }),
  ),
});

export const createClassSubjectsAction = async (
  props: z.infer<typeof propsSchemaCreate>,
) => {
  const { data } = propsSchemaCreate.parse(props);

  const session = await getAppSessionStrictServer();

  console.log(session);

  await subjectRepository.create(data);
};

// Изменение типа предмета

const propsSchemaUpdate = z.object({
  id: z.number(),
  data: z.object({
    teacher_id: z.number(),
  }),
});

export const updateClassSubjectTeacherAction = async (
  props: z.infer<typeof propsSchemaUpdate>,
) => {
  const { id, data } = propsSchemaUpdate.parse(props);
  const session = await getAppSessionStrictServer();
  await subjectRepository.update(id, data);
};
