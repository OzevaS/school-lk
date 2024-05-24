"use server";

import { z } from "zod";
import { getAppSessionStrictServer } from "@/entities/user/session.server";
import { subjectTypeRepository } from "../_repositories/subject-type";
import { subjectRepository } from "../_repositories/class-subject";

const propsSchemaRemove = z.object({
  id: z.number(),
});

// Удаление типа предмета

export const removeSubjectTypeAction = async (
  props: z.infer<typeof propsSchemaRemove>,
) => {
  const { id } = propsSchemaRemove.parse(props);

  const session = await getAppSessionStrictServer();

  await subjectTypeRepository.remove(id);
};

// Получение всех типов предметов

const resultSchemaGet = z.array(z.object({ id: z.number(), name: z.string() }));

export const getSubjectTypesAction = async () => {
  const session = await getAppSessionStrictServer();

  const subjectTypes = await subjectTypeRepository.getSubjectsTypes();

  return resultSchemaGet.parseAsync(subjectTypes);
};

export const getSubjectTypesForClassAction = async (classId: number) => {
  const session = await getAppSessionStrictServer();

  const subjectTypes = await subjectTypeRepository.getSubjectsTypes();
  const classSubjects = await subjectRepository.getSubjectsByClassId(classId);
  const result = subjectTypes.filter(
    (subjectType) =>
      !classSubjects.some(
        (classSubject) => classSubject.SubjectType.id === subjectType.id,
      ),
  );

  return resultSchemaGet.parseAsync(result);
};

// Создание типа предмета

const propsSchemaCreate = z.object({
  data: z.object({
    name: z.string(),
  }),
});

const resultSchemaCreate = z.object({
  id: z.number(),
});

export const createSubjectTypeAction = async (
  props: z.infer<typeof propsSchemaCreate>,
) => {
  const { data } = propsSchemaCreate.parse(props);

  const session = await getAppSessionStrictServer();

  console.log(session);

  const classValue = await subjectTypeRepository.create(data);

  return resultSchemaCreate.parseAsync({
    id: classValue.id,
  });
};

// Изменение типа предмета

const propsSchemaUpdate = z.object({
  id: z.number(),
  data: z.object({
    name: z.string(),
  }),
});

export const updateSubjectTypeAction = async (
  props: z.infer<typeof propsSchemaUpdate>,
) => {
  const { id, data } = propsSchemaUpdate.parse(props);
  const session = await getAppSessionStrictServer();
  await subjectTypeRepository.update(id, data);
};
