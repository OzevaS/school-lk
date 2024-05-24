import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3, {
    message: "Имя должно быть не менее 3 символов.",
  }),
  email: z.string().email(),
  image: z.string().nullable().optional(),
  phone: z.string().optional().nullable(),
});

export const classSchema = z.object({
  name: z
    .string()
    .max(3, {
      message: "Длина названия класса должна быть не более 3 символов.",
    })
    .min(2, {
      message: "Длина названия класса должна быть не менее 2 символов.",
    }),
  teacher_id: z.number(),
  student_ids: z.array(z.number()),
});

export const subjectTypeSchema = z.object({
  name: z
    .string()
    .max(15, {
      message: "Длина названия класса должна быть не более 15 символов.",
    })
    .min(2, {
      message: "Длина названия класса должна быть не менее 2 символов.",
    }),
});
