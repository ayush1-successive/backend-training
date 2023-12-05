import { type Request, type Response } from "express";
import { userSchema } from "../models/userModel";
import { data } from "./mockData";

export class UserController {
  getData = (req: Request, res: Response): void => {
    res.json(data);
  };

  addUser = (req: Request, res: Response): void => {
    const newData = req.body;
    data.users.push(newData);
    res.json(data);
  };

  addValidatedUser = (req: Request, res: Response): void => {
    const newData = req.body;
    const validationResult = userSchema.validate(newData, {
      abortEarly: false,
    });

    if (validationResult.error) {
      res.status(400).json({
        status: "Validation failed",
        error: validationResult.error.message,
      });
      return;
    }

    data.users.push(newData);
    res.json(data);
  };
}
