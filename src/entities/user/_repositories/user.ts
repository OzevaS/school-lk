import { dbClient } from "@/shared/lib/db";
import { UserEntity } from "../_domain/types";

export class UserRepository {
  async getUserById(id: number): Promise<UserEntity> {
    return dbClient.user.findUniqueOrThrow({
      where: { id },
    });
  }
  async createUser(user: Omit<UserEntity, "id">): Promise<UserEntity> {
    return await dbClient.user.create({
      data: user,
    });
  }
}

export const userRepository = new UserRepository();
