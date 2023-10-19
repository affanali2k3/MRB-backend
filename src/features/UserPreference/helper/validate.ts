import { AnyZodObject, ZodError, ZodNumber } from "zod";
import { NextFunction, Request, Response } from "express";
import {
  getUserPreferenceSchema,
  updateUserPreferenceSchema,
} from "../schema/UserPreferenceSchema";

class UserPreferencesValidator {
  async getUserPrefrenceValidate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      console.log(req.query);

      await getUserPreferenceSchema.parseAsync({
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

  async updateUserPrefrenceValidate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await updateUserPreferenceSchema.parseAsync({
        userId: req.body.userId,
        minCost: req.body.minCost,
        maxCost: req.body.maxCost,
        clientType: req.body.clientType,
        minTimeAmount: req.body.minTimeAmount,
        maxTimeAmount: req.body.maxTimeAmount,
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

export default new UserPreferencesValidator();
