import { ValidationResult } from "joi";
import { userSchema } from "../models/userModel";
import { Request, Response } from "express";

const paramValidationController = (req: Request, res: Response): void => {
  try {
    const validationResult: ValidationResult<any> = userSchema.validate(
      req.body,
      {
        abortEarly: false,
      }
    );

    if (validationResult.error) {
      console.log(validationResult.error);

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

export { paramValidationController };
