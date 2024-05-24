import { dbClient } from "@/shared/lib/db";
import { GradeEntity, HomeworkEntity, StudentEntity } from "../_domain/types";

export class HomeworkRepository {
  create(data: HomeworkEntity) {
    return dbClient.homework.create({
      data,
    });
  }

  update(id: number, data: Partial<HomeworkEntity>) {
    return dbClient.homework.update({
      where: {
        id,
      },
      data,
    });
  }

  remove(id: number) {
    return dbClient.homework.delete({
      where: {
        id,
      },
    });
  }

  getHomeworkById(id: number) {
    return dbClient.homework.findUnique({
      where: {
        id,
      },
    });
  }

  getHomeworkByClassId(id: number) {
    return dbClient.homework.findMany({
      where: {
        class_id: id,
      },
    });
  }

  async getHomeworkByStudentId(id: number) {
    const foundClass = await dbClient.class.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return dbClient.homework.findMany({
      where: {
        class_id: foundClass.id,
      },
    });
  }

}

export const homeworkRepository = new HomeworkRepository();
