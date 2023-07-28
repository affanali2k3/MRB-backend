"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        ssn: zod_1.z.string().min(3, { message: "Must be greater than 3 characters" }),
        phone: zod_1.z.string().min(2, { message: "Must be greater than 2 characters" }),
        occupation: zod_1.z.string().min(2, { message: "Must be greater than 2 characters" }),
    })
});
exports.updateUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        ssn: zod_1.z.string().min(3, { message: "Must be greater than 3 characters" }),
        phone: zod_1.z.string().min(2, { message: "Must be greater than 2 characters" }),
        occupation: zod_1.z.string().min(2, { message: "Must be greater than 2 characters" }),
    }).partial()
});
