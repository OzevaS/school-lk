import { dbClient } from "@/shared/lib/db";
import { ClassSubjectEntity } from "../_domain/types";

export class ClassSubjectRepository {
  async getSubjectsByClassId(classId: number) {
    const subjects = await dbClient.classSubject.findMany({
      where: {
        class_id: classId,
      },
      include: {
        Staff: {
          include: {
            User: true,
          },
        },
        SubjectType: true,
      },
    });
    return subjects.map((subject) => ({
      ...subject,
      teacher: {
        ...subject.Staff,
        ...subject.Staff?.User,
      },
    }));
  }
  async create(subjects: Omit<ClassSubjectEntity, "id">[]) {
    return await dbClient.classSubject.createMany({
      data: subjects,
    });
  }
  async update(id: number, data: Partial<ClassSubjectEntity>) {
    return await dbClient.classSubject.update({
      where: {
        id,
      },
      data,
    });
  }
  async remove(id: number) {
    return await dbClient.classSubject.delete({
      where: {
        id,
      },
    });
  }
  async getSubjectById(id: number): Promise<ClassSubjectEntity> {
    return await dbClient.classSubject.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async getSubjectsByTeacherId(
    teacherId: number,
  ): Promise<ClassSubjectEntity[]> {
    return await dbClient.classSubject.findMany({
      where: {
        teacher_id: teacherId,
      },
    });
  }

  async getSubjectsByStudentId(
    studentId: number,
  ): Promise<ClassSubjectEntity[]> {
    return await dbClient.classSubject.findMany({
      where: {
        id: studentId,
      },
    });
  }
  async getTeacherBySubjectId(subjectId: number, classId: number) {
    const foundSubject = await dbClient.classSubject.findUniqueOrThrow({
      where: {
        id: subjectId,
        class_id: classId,
      },
      include: {
        Staff: {
          include: {
            User: true,
          },
        },
      },
    });
    return {
      ...foundSubject.Staff,
      ...foundSubject.Staff?.User,
    };
  }
}

export const subjectRepository = new ClassSubjectRepository();
