import { z } from "zod";

export const getUserAssociatesSchema = z.object({
  query: z.object({
    userId: z
      .string()
      .refine((value) => value !== "", {
        message: "userId cannot be an empty string",
      })
      .refine((value) => !isNaN(Number(value)), {
        message: "userId must be a number",
      }),
  }),
});

export const requestBodySchema = z.object({
  body: z.object({
    senderId: z.number().refine((value) => !isNaN(value), {
      message: "userId must be a number",
    }),
    receiverId: z.number().refine((value) => !isNaN(value), {
      message: "receiverId must be a number",
    }),
  }),
});
