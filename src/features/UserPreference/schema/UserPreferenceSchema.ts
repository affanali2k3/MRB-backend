import { z } from "zod";

export const getUserPreferenceSchema = z.object({
  userId: z
    .string()
    .refine((value) => value !== "", {
      message: "userId cannot be an empty string",
    })
    .refine((value) => !isNaN(Number(value)), {
      message: "userId must be a number",
    }),
});

export const updateUserPreferenceSchema = z.object({
  body: z.object({
    userId: z
      .number()
      .refine((value) => !isNaN(value), {
        message: "userId must be a number",
      })
      .refine((value) => value !== null, {
        message: "userId cannot be null",
      }),
    minCost: z
      .number()
      .optional()
      .refine((value) => value === undefined || value >= 0, {
        message: "minCost should be positive",
      }),
    maxCost: z
      .number()
      .optional()
      .refine((value) => value === undefined || value >= 0, {
        message: "maxCost should be postitive",
      }),
    minTimeAmount: z
      .number()
      .optional()
      .refine((value) => value === undefined || value >= 0, {
        message: "minTimeAmount should be postitive",
      }),

    maxTimeAmount: z
      .number()
      .optional()
      .refine((value) => value === undefined || value >= 0, {
        message: "maxTimeAmount should be postitive",
      }),
    clientType: z
      .string()
      .optional()
      .refine(
        (value) =>
          value === undefined || value === "seller" || value === "buyer",
        {
          message: "clientType can only be buyer or seller",
        }
      ),
  }),
});
