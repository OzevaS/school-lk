"use server";

import { z } from "zod";
import { getAppSessionStrictServer } from "@/entities/user/session.server";
import { lessonRepository } from "../_repositories/lesson";

const propsSchemaRemove = z.object({
  id: z.number(),
});

// Удаление урока из расписания

export const removeLessonAction = async (
  props: z.infer<typeof propsSchemaRemove>,
) => {
  const { id } = propsSchemaRemove.parse(props);

  const session = await getAppSessionStrictServer();

  await lessonRepository.remove(id);
};

// Получение расписания уроков класса

const propsSchemaGet = z.object({
  classId: z.number(),
});

const resultSchemaGet = z.record(
  z.string(),
  z
    .array(
      z.object({
        id: z.number(),
        dayOfWeek: z.number(),
        lessonNumber: z.number(),
        subject: z.object({
          id: z.number(),
          typeId: z.number(),
          name: z.string(),
        }),
      }),
    )
    .optional(),
);

export const getLessonsByClassAction = async (
  props: z.infer<typeof propsSchemaGet>,
) => {
  const { classId } = propsSchemaGet.parse(props);
  const session = await getAppSessionStrictServer();

  const lessons = await lessonRepository.getLessonsByClassId(classId);

  const groupedAndSortedLessons = lessons.reduce(
    (acc, schedule) => {
      // Если группа для этого дня недели еще не создана, создаем ее
      if (!acc[schedule.dayOfWeek]) {
        acc[schedule.dayOfWeek] = [];
      }
      // Добавляем расписание в соответствующую группу
      acc[schedule.dayOfWeek].push(schedule);
      // Сортируем группу по номеру урока
      acc[schedule.dayOfWeek].sort((a, b) => a.lessonNumber - b.lessonNumber);
      return acc;
    },
    {} as Record<string, typeof lessons>,
  );

  return resultSchemaGet.parseAsync(groupedAndSortedLessons);
};

// Создание расписания

const propsSchemaCreate = z.array(
  z.object({
    day_of_week: z.number(),
    lesson_number: z.number(),
    teacher_id: z.number(),
    class_id: z.number(),
    subject_id: z.number(),
  }),
);

export const createLessonsAction = async (
  props: z.infer<typeof propsSchemaCreate>,
) => {
  const data = propsSchemaCreate.parse(props);

  const session = await getAppSessionStrictServer();

  await lessonRepository.create(data);
};

// Применение расписания с предварительной очисткой
const propsSchemaApply = z.object({
  class_id: z.number(),
  data: z.array(
    z.object({
      day_of_week: z.number(),
      lesson_number: z.number(),
      subject_id: z.number(),
    }),
  ),
});

export const applyLessonsAction = async (
  props: z.infer<typeof propsSchemaApply>,
) => {
  const { class_id, data } = propsSchemaApply.parse(props);

  const session = await getAppSessionStrictServer();

  await lessonRepository.apply(
    data.map((lesson) => ({ ...lesson, class_id })),
    class_id,
  );
};

// Обновление расписания

const propsSchemaUpdate = z.array(
  z.object({
    id: z.number(),
    title: z.string(),
    date: z.date(),
    time: z.string(),
    teacher_id: z.number(),
    student_ids: z.array(z.number()).optional(),
  }),
);

export const updateLessonsAction = async (
  props: z.infer<typeof propsSchemaUpdate>,
) => {
  const data = propsSchemaUpdate.parse(props);
  const session = await getAppSessionStrictServer();
  await lessonRepository.update(data);
};

// Получение расписания предмета

const propsSchemaGetBySubject = z.object({
  subjectId: z.number(),
});

const resultSchemaGetBySubject = z.array(
  z.object({
    id: z.number(),
    dayOfWeek: z.number(),
    lessonNumber: z.number(),
  }),
);

export const getLessonsBySubjectAction = async (
  props: z.infer<typeof propsSchemaGetBySubject>,
) => {
  const { subjectId } = propsSchemaGetBySubject.parse(props);
  const session = await getAppSessionStrictServer();
  const lessons = await lessonRepository.getLessonsBySubjectId(subjectId);
  return resultSchemaGet.parseAsync(
    lessons.map((l) => ({
      id: l.id,
      dayOfWeek: l.day_of_week,
      lessonNumber: l.lesson_number,
    })),
  );
};
