"use server";

import { z } from "zod";

import { getAppSessionStrictServer } from "@/entities/user/session.server";
import { userSchema } from "../_domain/schema";
import { classRepository } from "../class";
import { ROLE } from "@prisma/client";

// Создание класса

const propsSchemaCreate = z.object({
  name: z.string(),
});

const resultSchemaCreate = z.object({
  id: z.number(),
});

export const createClassAction = async (
  props: z.infer<typeof propsSchemaCreate>,
) => {
  const { name } = propsSchemaCreate.parse(props);

  const session = await getAppSessionStrictServer();

  const createdClass = await classRepository.create({ name });

  return resultSchemaCreate.parseAsync({
    id: createdClass.id,
  });
};

// Получение всех классов

const resultSchemaGet = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    teacher: z
      .object({
        id: z.number(),
        user: userSchema,
      })
      .nullable()
      .optional(),
    students: z.array(
      z.object({
        id: z.number(),
        user: userSchema,
      }),
    ),
  }),
);

export const getClassesAction = async () => {
  const classes = await classRepository.getClasses();

  return resultSchemaGet.parseAsync(
    classes.map((c) => ({
      id: c.id,
      name: c.name,
      teacher:
        c.teacher_id && c.Staff?.User
          ? {
              id: c.teacher_id,
              user: c.Staff.User,
            }
          : undefined,
      students: c.Student.map((student) => ({
        id: student.id,
        user: student.User,
      })),
    })),
  );
};

// Добавление участника в класс в зависимости от роли

const propsSchemaAddMembers = z.object({
  classId: z.number(),
  memberIds: z.array(z.number()),
  role: z.nativeEnum(ROLE),
});

const resultSchemaAddMembers = z.object({
  classId: z.number(),
  memberIds: z.array(z.number()),
  role: z.nativeEnum(ROLE),
});

export const addClassMembersAction = async (
  props: z.infer<typeof propsSchemaAddMembers>,
) => {
  const {
    classId,
    memberIds: memberIds,
    role,
  } = propsSchemaAddMembers.parse(props);
  const session = await getAppSessionStrictServer();

  if (role === ROLE.TEACHER) {
    await classRepository.addClassTeacher(classId, memberIds[0]);
  } else if (role === ROLE.STUDENT) {
    await classRepository.addStudentsToClass(classId, memberIds);
  }

  return resultSchemaAddMembers.parseAsync({
    classId,
    role,
    memberIds,
  });
};

// Удаление участника из класса

const propsSchemaRemoveMember = z.object({
  classId: z.number(),
  memberId: z.number(),
  role: z.nativeEnum(ROLE),
});

const resultSchemaRemoveMember = z.object({
  classId: z.number(),
  memberId: z.number(),
  role: z.nativeEnum(ROLE),
});

export const removeMemberAction = async (
  props: z.infer<typeof propsSchemaRemoveMember>,
) => {
  const { classId, memberId, role } = propsSchemaRemoveMember.parse(props);
  const session = await getAppSessionStrictServer();

  if (role === ROLE.TEACHER) {
    await classRepository.removeClassTeacher(classId, memberId);
  } else if (role === ROLE.STUDENT) {
    await classRepository.removeStudentFromClass(classId, memberId);
  }

  return resultSchemaRemoveMember.parseAsync({
    classId,
    memberId,
    role,
  });
};
