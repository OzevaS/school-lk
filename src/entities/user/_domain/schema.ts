import { z } from "zod";

export const profileSchema = z.object({
  email: z.string(),
  name: z.string(),
  image: z.string().nullable().optional(),
});
