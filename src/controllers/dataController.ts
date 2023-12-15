import { Request, Response } from "express";
import { ValidationResult } from "joi";
import { userSchema } from "../models/userModel";
import { IUser, userData } from "./mockData";

const getDataController = (req: Request, res: Response): void => {
  res.status(200).json(userData);
};

const addUserController = (req: Request, res: Response): void => {
  const newUser: IUser = req.body;
  userData.push(newUser);
  res.status(201).json(userData);
};

const addValidatedUserController = (req: Request, res: Response): void => {
  const newUser: IUser = req.body;
  const validationResult: ValidationResult = userSchema.validate(newUser, {
    abortEarly: false,
  });

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

export { addUserController, addValidatedUserController, getDataController };
