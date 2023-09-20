import { NextFunction, Request, Response } from "express"
import { AnyZodObject } from "zod"

// Middleware function for request validation using a schema
const validate = (schema: AnyZodObject) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Validate the request data against the provided schema
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params
            });

            // If validation passes, proceed to the next middleware or route handler
            return next();
        } catch (err: any) {
            // If validation fails, handle the error by sending a Bad Request response
            const errorMessage = JSON.parse(err.message);
            return res.status(400).json({
                status: "Bad request",
                message: errorMessage
            });
        }
    }

// Export the validate middleware
export default validate;
