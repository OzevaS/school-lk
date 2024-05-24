"use server";

import { z } from "zod";
import {
  eachDayOfInterval,
  startOfQuarter,
  endOfQuarter,
  format,
} from "date-fns";
import { ru } from "date-fns/locale";

import { classRepository } from "../class";
import { lessonRepository } from "../_repositories/lesson";
import { dbClient } from "@/shared/lib/db";
import { getAppSessionStrictServer } from "@/entities/user/session.server";
import { getQuarterDates } from "../utils";

// Получение оценок учеников класса, распределенных по ученикам
// В виде Record<studentId, Grade[]>

const propsSchemaGetClassGrades = z.object({
  classId: z.number(),
  subjectId: z.number(),
  quarter: z.number(),
});

const resultSchemaGetClassGrades = z.object({
  grades: z.record(
    z.string(), // id студента
    z.record(
      z.string(), // дата оценки
      z
        .object({
          // объект оценки
          id: z.number(),
          grade: z.number(),
          date: z.date(),
        })
        .nullable(),
    ),
  ),
  lessons: z.array(z.string()),
});

// Функция для получения всех дат конкретного дня недели
const getLessonDates = (dayOfWeek: number, allDates: Date[]) => {
  return allDates
    .filter((date) => date.getDay() === dayOfWeek)
    .map((date) => String(Number(date)));
};

export const getSubjectGradesAndLessonsAction = async (
  props: z.infer<typeof propsSchemaGetClassGrades>,
) => {
  const { classId, subjectId, quarter } =
    propsSchemaGetClassGrades.parse(props);

  const session = await getAppSessionStrictServer();

  const students = await classRepository.getStudentsByClassId(classId);

  const lessons = await lessonRepository.getLessonsBySubjectId(subjectId);

  // Начало и конец текущей четверти
  const { start: startDate, end: endDate } = getQuarterDates(
    new Date().getFullYear(),
    quarter,
  );

  // Генерация всех дат в пределах текущей четверти
  const allDates = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const lessonDates: string[] = [];
  lessons.forEach((lesson) => {
    const dates = getLessonDates(lesson.day_of_week, allDates);
    lessonDates.push(...dates);
  });

  lessonDates.sort((a, b) => Number(a) - Number(b)); // Сортировка дат

  const grades = await dbClient.grade.findMany({
    where: {
      Student: {
        class_id: classId,
      },
      subject_id: subjectId,
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: {
      Student: {
        include: {
          User: true,
        },
      },
    },
  });

  // Создание объекта для хранения оценок по студентам и датам
  const gradeTable: Record<string, Record<string, number | null>> = {};
  console.log("STUDENTS", students);
  students.forEach((student) => {
    gradeTable[student.id] = {};
    lessonDates.forEach((date) => {
      gradeTable[student.id][String(Number(date))] = null; // инициализация пустыми значениями
    });
  });

  // Заполнение оценок в таблице
  grades.forEach((grade) => {
    if (!grade.date || !grade.grade) return;
    const studentId = grade.Student.id;
    const date = String(Number(grade.date));
    gradeTable[studentId][date] = grade.grade;
  });

  // Parse the result with Zod to ensure type safety
  return resultSchemaGetClassGrades.parse({
    lessons: lessonDates,
    grades: gradeTable,
  });
};

// Сохранение или обновление оценки

// export const saveOrUpdateGradeAction = async (props: {
//   studentId: number;
//   subjectId: number;
//   date: Date;
//   grade: number;
// }) => {
//   const { studentId, subjectId, date, grade } = props;
//   const session = await getAppSessionStrictServer();
//   await dbClient.grade.upsert({
//     where: {
//       student_id_subject_id_date: {
//         student_id: studentId,
//         subject_id: subjectId,
//         date: date,
//       },
//     },
//     create: {
//       student_id: studentId,
//       subject_id: subjectId,
//       date: date,
//       grade: grade,
//     },
//     update: {
//       grade: grade,
//     },
//   });
// };
