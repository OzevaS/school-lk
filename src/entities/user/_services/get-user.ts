import { SessionEntity, UserEntity, UserId } from "../_domain/types";
import { userRepository } from "../_repositories/user";
import { createUserAbility } from "../_domain/ability";
import { NeedAuthError } from "@/shared/lib/errors";

type GetUser = {
  userId: UserId;
  session: SessionEntity;
};

export class GetUserService {
  async exec({ userId, session }: GetUser): Promise<UserEntity> {
    const userAbility = createUserAbility(session);

    if (!userAbility.canGetUser(userId)) {
      throw new NeedAuthError();
    }

    return await userRepository.getUserById(userId);
  }
}

export const getUserService = new GetUserService();
