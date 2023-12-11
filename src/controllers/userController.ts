import { type Request, type Response } from "express";
import { type ValidationResult } from "joi";
import { userSchema } from "../models/userModel";
import { type IUser, userData } from "../utils/mockData";

export class UserController {
  getData = (req: Request, res: Response): void => {
    res.status(200).json(userData);
  };

  addUser = (req: Request, res: Response): void => {
    const newUser: IUser = req.body;
    userData.push(newUser);
    res.status(201).json(userData);
  };

  addValidatedUser = async (req: Request, res: Response): Promise<void> => {
    const newUser: IUser = req.body;
    const validationResult: ValidationResult<any> = userSchema.validate(
      newUser,
      {
        abortEarly: false,
      },
    );

    if (validationResult.error) {
      res.status(400).json({
        status: "Validation failed",
        error: validationResult.error.message,
      });
      return;
    }

    userData.push(newUser);
    res.status(201).json(userData);
  };
}
