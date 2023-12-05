import { userSchema } from "../models/userModel";
import { type Request, type Response } from "express";

export class ValidationController {
  paramValidation = async (req: Request, res: Response): Promise<Response> => {
    try {
      const validationResult = userSchema.validate(req.body, {
        abortEarly: false,
      });

      if (validationResult.error) {
        console.log(validationResult.error);
        return res.status(400).send({
          status: false,
          message: "Validation error!",
          error: validationResult.error,
        });
      }

      console.log("Validation successful!");
      return res.status(200).send({
        status: true,
        message: "Validation successful!",
        body: req.body,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: false,
        message: "Internal server error!",
        error,
      });
    }
  };
}
