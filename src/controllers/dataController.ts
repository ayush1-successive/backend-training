import { Request, Response } from "express";
import { userSchema } from "../models/userModel";
import { data } from "./mockData";

const getDataController = (req: Request, res: Response)=> {
  res.json(data);
};

const addUserController = async (req: Request, res: Response) => {
  const newData = req.body;
  data.users.push(newData);
  res.json(data);
};

const addValidatedUserController = (req: Request, res: Response) => {
  const newData = req.body;
  const validationResult = userSchema.validate(newData, {
    abortEarly: false,
  });

  if (validationResult.error) {
    return res.status(400).json({
      status: "Validation failed",
      error: validationResult.error.message,
    });
  }

  data.users.push(newData);
  res.json(data);
};

export { addUserController, addValidatedUserController, getDataController };
