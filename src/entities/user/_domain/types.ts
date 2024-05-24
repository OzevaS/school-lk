export type UserId = number;
export type Role = "ADMIN" | "TEACHER" | "STUDENT" | "GUEST";

export const ROLES: Record<Role, Role> = {
  ADMIN: "ADMIN",
  TEACHER: "TEACHER",
  STUDENT: "STUDENT",
  GUEST: "GUEST",
};

export type UserEntity = {
  id: UserId;
  email: string;
  role: Role;
  name: string;
  emailVerified?: Date | null;
  image?: string | null;
};

/** Информация о текущем пользователе, доступная с клиента */
export type SessionEntity = {
  user: {
    id: UserId;
    email: string;
    role: Role;
    name: string;
    image?: string | null;
  };
  expires: string;
};

// Проекции

export type Profile = {
  email: string;
  name: string;
  image?: string | null;
};
