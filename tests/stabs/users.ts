import { $Enums } from "@prisma/client";

export const ADMIN = {
  id: "staff",
  email: "staff@gmail.com",
  name: "STAFF",
  testPassword: "1234",
  role: $Enums.ROLE.ADMIN,
};

export const STUDENT = {
  id: "student",
  email: "student@gmail.com",
  testPassword: "1234",
  role: $Enums.ROLE.STUDENT,
};

export const GUEST = {
  id: "guest",
  email: "guest@gmail.com",
  testPassword: "1234",
  role: $Enums.ROLE.GUEST,
};
