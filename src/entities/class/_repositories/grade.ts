import { dbClient } from "@/shared/lib/db";
import { GradeEntity } from "../_domain/types";

export class GradeRepository {
  getGradesByStudentId(id: number) {
    return dbClient.grade.findMany({
      where: {
        student_id: id,
      },
    });
  }
  create(data: GradeEntity) {
    return dbClient.grade.create({
      data: {
        ...data,
      },
    });
  }
  update(id: number, data: Partial<GradeEntity>) {
    return dbClient.grade.update({
      where: {
        id,
      },
      data,
    });
  }
  remove(id: number) {
    return dbClient.grade.delete({
      where: {
        id,
      },
    });
  }
}

export const gradeRepository = new GradeRepository();
