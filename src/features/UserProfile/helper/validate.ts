import { AnyZodObject, ZodError, ZodNumber } from "zod";
import { NextFunction, Request, Response } from "express";
import { getUserSchema } from "../schema/UserSchema";

class UserValidator {
  async validate(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.query);

      await getUserSchema.parseAsync({
        userId: req.query.userId,
      });

      return next();
    } catch (err) {
      res.status(500).json({
        status: "Bad Request",
        error: err,
      });
    }
  }
}

export default new UserValidator();
