import { SessionEntity } from "@/entities/user/session";
import { UserId } from "./types";
import { ROLES } from "@/entities/user/user";

export const createUserAbility = (session: SessionEntity) => ({
  canGetUser: (userId: UserId) => {
    return userId === session.user.id || session.user.role === ROLES.ADMIN;
  },
});

export const createProfileAbility = (session: SessionEntity) => ({
  canUpdateProfile: (userId: UserId) => {
    return userId === session.user.id || session.user.role === ROLES.ADMIN;
  },
});
