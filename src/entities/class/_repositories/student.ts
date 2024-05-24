import { dbClient } from "@/shared/lib/db";
import { StudentEntity, WithUser } from "../_domain/types";
import { ROLES, UserEntity } from "@/entities/user/user";

export class StudentRepository {
  async getStudentById(id: number): Promise<WithUser<StudentEntity>> {
    const student = await dbClient.student.findUniqueOrThrow({
      where: { id },
      include: {
        User: true,
      },
    });
    return {
      ...student,
      user: student.User,
    };
  }
  async create(
    user: Omit<UserEntity, "id" | "role">,
  ): Promise<WithUser<StudentEntity>> {
    const createdUser = await dbClient.user.create({
      data: {
        ...user,
        role: ROLES.STUDENT,
      },
    });
    const createdStudent = await dbClient.student.create({
      data: {
        user_id: createdUser.id,
      },
    });
    return {
      ...createdStudent,
      user: createdUser,
    };
  }
  async remove(id: number) {
    return await dbClient.student.delete({
      where: {
        id,
      },
    });
  }
  async update(
    id: number,
    data: Partial<StudentEntity>,
  ): Promise<WithUser<StudentEntity>> {
    const updatedStudent = await dbClient.student.update({
      where: {
        id,
      },
      data,
      include: {
        User: true,
      },
    });
    return {
      ...updatedStudent,
      user: updatedStudent.User,
    };
  }
  async getAllStudents(hasOwnClass?: boolean) {
    const students = await dbClient.student.findMany({
      where: {
        ...(!hasOwnClass && { class_id: null }),
      },
      include: {
        User: true,
      },
    });

    return students.map((student) => ({
      ...student,
      user: student.User,
    }));
  }
  async getGrades(studentId: number) {
    const grades = await dbClient.grade.findMany({
      where: {
        student_id: studentId,
      },
    });
    return Promise.all(
      grades.map(async (grade) => ({
        ...grade,
        subject: await dbClient.classSubject.findUniqueOrThrow({
          where: {
            id: grade.subject_id,
          },
        }),
      })),
    );
  }
  getHomeworks = async (studentId: number) => {
    const studentClass = await dbClient.class.findUniqueOrThrow({
      where: {
        id: studentId,
      },
    });
    const homeworks = await dbClient.homework.findMany({
      where: {
        class_id: studentClass.id,
      },
    });
    return Promise.all(
      homeworks.map(async (homework) => ({
        ...homework,
        grade: await dbClient.grade.findUnique({
          where: {
            homework_id: homework.id,
            student_id: studentId,
          },
        }),
        subject: await dbClient.classSubject.findUniqueOrThrow({
          where: {
            id: homework.subject_id,
          },
        }),
      })),
    );
  };
  getGradeByHomeworkId = async (studentId: number, homeworkId: number) => {
    return await dbClient.grade.findUnique({
      where: {
        homework_id: homeworkId,
        student_id: studentId,
      },
    });
  };
  getAnnouncements = async (studentId: number) => {
    const studentClass = await dbClient.class.findUniqueOrThrow({
      where: {
        id: studentId,
      },
    });
    const classAnnouncements = await dbClient.announcementClass.findMany({
      where: {
        class_id: studentClass.id,
      },
    });
    return await dbClient.announcement.findMany({
      where: {
        id: {
          in: classAnnouncements.map(
            (announcement) => announcement.announcement_id,
          ),
        },
      },
    });
  };
}

export const studentRepository = new StudentRepository();
