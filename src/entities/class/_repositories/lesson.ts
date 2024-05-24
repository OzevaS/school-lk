import { dbClient } from "@/shared/lib/db";
import { LessonEntity } from "../_domain/types";

export class LessonRepository {
  async apply(data: Omit<LessonEntity, "id">[], classId: number) {
    await dbClient.lesson.deleteMany({
      where: {
        class_id: classId,
      },
    });
    return dbClient.lesson.createMany({
      data: data,
    });
  }
  create(data: Omit<LessonEntity, "id">[]) {
    return dbClient.lesson.createMany({
      data: data,
    });
  }

  update(data: Partial<LessonEntity>[]) {
    return dbClient.lesson.updateMany({
      data,
    });
  }

  remove(id: number) {
    return dbClient.lesson.delete({
      where: {
        id,
      },
    });
  }

  getLessonById(id: number) {
    return dbClient.lesson.findUnique({
      where: {
        id,
      },
    });
  }

  async getLessonByStudentId(id: number) {
    const foundClass = await dbClient.class.findUniqueOrThrow({
      where: {
        id,
      },
    });
    return dbClient.lesson.findMany({
      where: {
        class_id: foundClass.id,
      },
    });
  }

  async getLessonsByClassId(id: number) {
    const lessons = await dbClient.lesson.findMany({
      where: {
        class_id: id,
      },
      include: {
        Subject: {
          include: {
            SubjectType: true,
          },
        },
      },
    });

    return lessons.map((lesson) => ({
      id: lesson.id,
      dayOfWeek: lesson.day_of_week,
      lessonNumber: lesson.lesson_number,
      subject: {
        id: lesson.Subject.id,
        typeId: lesson.Subject.type_id,
        name: lesson.Subject.SubjectType.name,
      },
    }));
  }

  async getLessonsBySubjectId(id: number) {
    return dbClient.lesson.findMany({
      where: {
        subject_id: id,
      },
    });
  }
}

export const lessonRepository = new LessonRepository();
