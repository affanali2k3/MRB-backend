<<<<<<< HEAD
import { z } from "zod"

// Validation schema for creating a user
export const createUserSchema = z.object({
    body: z.object({
        ssn: z.string().min(3, { message: "Must be greater than 3 characters" }),
        phone: z.string().min(2, { message: "Must be greater than 2 characters" }),
        occupation: z.string().min(2, { message: "Must be greater than 2 characters" }),
    })
});

// Validation schema for updating a user (partial schema)
export const updateUserSchema = z.object({
    body: z.object({
        ssn: z.string().min(3, { message: "Must be greater than 3 characters" }),
        phone: z.string().min(2, { message: "Must be greater than 2 characters" }),
        occupation: z.string().min(2, { message: "Must be greater than 2 characters" }),
    }).partial() // Allows partial updates without requiring all fields
});
=======
import { z } from "zod"

// Validation schema for creating a user
export const createUserSchema = z.object({
    body: z.object({
        ssn: z.string().min(3, { message: "Must be greater than 3 characters" }),
        phone: z.string().min(2, { message: "Must be greater than 2 characters" }),
        occupation: z.string().min(2, { message: "Must be greater than 2 characters" }),
    })
});

// Validation schema for updating a user (partial schema)
export const updateUserSchema = z.object({
    body: z.object({
        ssn: z.string().min(3, { message: "Must be greater than 3 characters" }),
        phone: z.string().min(2, { message: "Must be greater than 2 characters" }),
        occupation: z.string().min(2, { message: "Must be greater than 2 characters" }),
    }).partial() // Allows partial updates without requiring all fields
});
>>>>>>> 083bb9737406d5cc219ca9fd883c90697dabefac
