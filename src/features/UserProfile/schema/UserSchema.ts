import { z } from "zod";

export const getUserSchema = z.object({
  userId: z
    .string()
    .refine((value) => value !== "", {
      message: "userId cannot be empty",
    })
    .refine((value) => !isNaN(Number(value)), {
      message: "userId must be a number",
    }),
});
