import { ValidationResult } from "joi";
import { userSchema } from "../models/userModel";
import { Request, Response } from "express";

export class ValidationController {
  paramValidation = async (req: Request, res: Response): Promise<void> => {
    try {
      const validationResult: ValidationResult = userSchema.validate(
        req.body,
        {
          abortEarly: false,
        }
      );

      if (validationResult.error) {
        console.error(validationResult.error);

        res.status(400).send({
          status: false,
          message: "Validation error!",
          error: validationResult.error,
        });
        return;
      }

      console.log("Validation successful!");
      res.status(200).send({
        status: true,
        message: "Validation successful!",
        body: req.body,
      });
    } catch (error: unknown) {
      console.error(error);

      res.status(500).send({
        status: false,
        message: "Internal server error!",
        error,
      });
    }
  };
}