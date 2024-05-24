import { dbClient } from "@/shared/lib/db";
import { ClassEntity, StudentEntity } from "../_domain/types";

export class ClassRepository {
  async getClassById(id: number): Promise<ClassEntity> {
    return await dbClient.class.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }
  async getClasses() {
    return await dbClient.class.findMany({
      include: {
        Staff: {
          include: {
            User: true,
          },
        },
        Student: {
          include: {
            User: true,
          },
        },
      },
    });
  }
  create(classEntity: Omit<ClassEntity, "id" | "teacher_id">) {
    return dbClient.class.create({
      data: classEntity,
    });
  }
  update(classEntity: ClassEntity) {
    return dbClient.class.update({
      where: {
        id: classEntity.id,
      },
      data: classEntity,
    });
  }
  remove(id: number) {
    return dbClient.class.delete({
      where: {
        id,
      },
    });
  }
  async getStudentsByClassId(classId: number) {
    const students = await dbClient.student.findMany({
      where: {
        class_id: classId,
      },
      include: {
        User: true,
      },
    });
    return students.map((student) => {
      return {
        ...student,
        user: student.User,
      };
    });
  }
  addStudentToClass(classId: number, studentId: number) {
    return dbClient.class.update({
      where: {
        id: classId,
      },
      data: {
        Student: {
          connect: {
            id: studentId,
          },
        },
      },
    });
  }
  addStudentsToClass(classId: number, studentIds: number[]) {
    return dbClient.class.update({
      where: {
        id: classId,
      },
      data: {
        Student: {
          connect: studentIds.map((studentId) => ({
            id: studentId,
          })),
        },
      },
    });
  }
  removeStudentFromClass(classId: number, studentId: number) {
    return dbClient.class.update({
      where: {
        id: classId,
      },
      data: {
        Student: {
          disconnect: {
            id: studentId,
          },
        },
      },
    });
  }
  addClassTeacher(classId: number, teacherId: number) {
    return dbClient.class.update({
      where: {
        id: classId,
      },
      data: {
        Staff: {
          connect: {
            id: teacherId,
          },
        },
      },
    });
  }
  updateClassTeacher(classId: number, teacherId: number) {
    return dbClient.class.update({
      where: {
        id: classId,
      },
      data: {
        Staff: {
          connect: {
            id: teacherId,
          },
        },
      },
    });
  }
  removeClassTeacher(classId: number, teacherId: number) {
    return dbClient.class.update({
      where: {
        id: classId,
      },
      data: {
        Staff: {
          disconnect: {
            id: teacherId,
          },
        },
      },
    });
  }
  getClassMembers = async (studentId: number) => {
    const studentClass = await dbClient.class.findUniqueOrThrow({
      where: {
        id: studentId,
      },
    });
    const students = await dbClient.student.findMany({
      where: {
        class_id: studentClass.id,
      },
      include: {
        User: true,
      },
    });
    const teachers = studentClass.teacher_id
      ? await dbClient.staff.findUnique({
          where: {
            id: studentClass.teacher_id,
          },
          include: {
            User: true,
          },
        })
      : null;

    return {
      students: students.map((student) => ({
        ...student,
        user: student.User,
      })),
      teachers: teachers
        ? {
            ...teachers,
            user: teachers.User,
          }
        : null,
    };
  };
  async getClassSubjectGrades(classId: number, subjectId: number) {
    const classGrades = await dbClient.grade.findMany({
      where: {
        Student: {
          class_id: classId,
        },
        subject_id: subjectId,
      },
    });

    return classGrades;
  }
}

export const classRepository = new ClassRepository();
