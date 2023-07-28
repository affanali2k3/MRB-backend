import { z } from "zod"

export const createUserSchema = z.object({
    body: z.object({
        ssn: z.string().min(3, { message: "Must be greater than 3 characters" }),
        phone: z.string().min(2, { message: "Must be greater than 2 characters" }),
        occupation: z.string().min(2, { message: "Must be greater than 2 characters" }),
    })
})

export const updateUserSchema = z.object({
    body: z.object({
        ssn: z.string().min(3, { message: "Must be greater than 3 characters" }),
        phone: z.string().min(2, { message: "Must be greater than 2 characters" }),
        occupation: z.string().min(2, { message: "Must be greater than 2 characters" }),
    }).partial()
})