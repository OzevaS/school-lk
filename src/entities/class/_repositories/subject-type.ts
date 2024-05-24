import { dbClient } from "@/shared/lib/db";
import { SubjectTypeEntity } from "../_domain/types";

export class SubjectTypeRepository {
  create(data: Omit<SubjectTypeEntity, "id">) {
    return dbClient.subjectType.create({
      data: data,
    });
  }

  update(id: number, data: Omit<SubjectTypeEntity, "id">) {
    return dbClient.subjectType.update({
      where: {
        id,
      },
      data,
    });
  }

  remove(id: number) {
    return dbClient.subjectType.delete({
      where: {
        id,
      },
    });
  }
  getSubjectsTypes() {
    return dbClient.subjectType.findMany();
  }
}

export const subjectTypeRepository = new SubjectTypeRepository();
