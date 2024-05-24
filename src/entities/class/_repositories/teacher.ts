import { dbClient } from "@/shared/lib/db";
import { TeacherEntity, WithUser } from "../_domain/types";
import { ROLES, UserEntity } from "@/entities/user/user";
import { RemoveId } from "../_lib/removeId";

export class TeacherRepository {
  async create(
    user: Omit<RemoveId<UserEntity>, "role">,
  ): Promise<WithUser<TeacherEntity>> {
    const createdUser = await dbClient.user.create({
      data: {
        ...user,
        role: ROLES.TEACHER,
      },
    });
    const createdTeacher = await dbClient.staff.create({
      data: {
        user_id: createdUser.id,
      },
    });
    return {
      ...createdTeacher,
      user: createdUser,
    };
  }

  async update(
    id: number,
    data: Partial<TeacherEntity>,
  ): Promise<WithUser<TeacherEntity>> {
    const updatedTeacher = await dbClient.staff.update({
      where: {
        id,
      },
      data,
      include: {
        User: true,
      },
    });
    return {
      ...updatedTeacher,
      user: updatedTeacher.User,
    };
  }
  remove(teacherId: number) {
    return dbClient.staff.delete({
      where: {
        id: teacherId,
      },
    });
  }
  async getAllTeachers(hasOwnClass?: boolean) {
    const whereClause =
      hasOwnClass === false
        ? {
            Class: {
              none: {},
            },
          }
        : {};

    const teachers = await dbClient.staff.findMany({
      where: {
        ...whereClause,
        User: {
          role: ROLES.TEACHER,
        },
      },
      include: {
        User: true,
      },
    });

    return teachers.map((teacher) => ({
      ...teacher,
      user: teacher.User,
    }));
  }
}

export const teacherRepository = new TeacherRepository();
