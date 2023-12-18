import { Request, Response, NextFunction } from "express";

interface IUserRequestBody {
  name: string;
  email: string;
  password: string;
}

const isStrongPassword = (value: string): boolean => {
  const strongRegex: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}/;
  return strongRegex.test(value);
};

const correctEmailFormat = (value: string): boolean => {
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

const inputValidateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password }: IUserRequestBody = req.body;

    if (!name || !email || !password) {
      res.status(400).send({
        success: false,
        message: "Validation failed! All fields are required.",
      });
      return;
    }

    if (!isStrongPassword(password)) {
      res.status(400).send({
        status: false,
        message:
          "Weak password! It should have at least 8 characters, including uppercase, lowercase, and numbers",
      });
      return;
    }

    if (!correctEmailFormat(email)) {
      res.status(400).send({
        status: false,
        message: "Incorrect email format!",
      });
      return;
    }

    console.log("Validation successful!");
    next();
  } catch (error: unknown) {
    console.error(error);

    res.status(400).send({
      status: false,
      error,
      message: "Validation error!",
    });
  }
};

export { inputValidateMiddleware };

