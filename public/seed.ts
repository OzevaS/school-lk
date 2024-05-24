// import { PrismaClient } from "@prisma/client";
// import { STAFF, STUDENT, GUEST } from "../tests/stabs/users";
// const prisma = new PrismaClient();

// async function main() {
//   const staff = await prisma.user.create({
//     data: {
//       id: STAFF.id,
//       email: STAFF.email,
//       role: STAFF.role,
//       name: STAFF.name,
//       emailVerified: new Date().toISOString(),
//     },
//   });

//   const student = await prisma.user.create({
//     data: {
//       id: STUDENT.id,
//       email: STUDENT.email,
//       role: STUDENT.role,
//       emailVerified: new Date().toISOString(),
//     },
//   });

//   const guest = await prisma.user.create({
//     data: {
//       id: GUEST.id,
//       email: GUEST.email,
//       role: GUEST.role,
//       emailVerified: new Date().toISOString(),
//     },
//   });

//   console.log({ staff, student, guest });
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
