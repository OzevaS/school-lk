import { z } from "zod";

const privateConfigSchema = z.object({
    secret: z.string(),
});

export const privateConfig = privateConfigSchema.parse(process.env);