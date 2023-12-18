import { NextFunction, Request, Response } from "express";
import { ValidationResult } from "joi";
import { validationConfig } from "../../utils/config";

interface IUserRequestBody {
  name: string;
  email: string;
  password: string;
}

interface IProductQueryParams {
  name?: string;
  quantity?: string;
  price?: string;
}

export class ValidationMiddleware {
  private isStrongPassword = (value: string): boolean => {
    const strongRegex: RegExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}/;

    return strongRegex.test(value);
  };

  private correctEmailFormat = (value: string): boolean => {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  private isNumeric = (value: string | number): boolean => {
    if (typeof value === "number") return true;

    if (typeof value === "string") {
      const numericValue: number = parseFloat(value);
      return !isNaN(numericValue);
    }
    return false;
  };

  dynamicValidation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const param: string = req.url.slice(1);
      const validationResult: ValidationResult = validationConfig[
        param
      ].validate(req.body, {
        abortEarly: false,
      });

      if (validationResult.error) {
        console.log(validationResult.error);

        res.status(400).send({
          status: false,
          message: "Bad request!",
          error: validationResult.error,
        });
        return;
      }

      console.log("Validation successful!");
      next();
    } catch (error: unknown) {
      console.error(error);

      res.status(500).send({
        status: false,
        message: "Internal server error!",
        error,
      });
    }
  };

  inputValidation = async (
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

      if (!this.isStrongPassword(password)) {
        res.status(400).send({
          status: false,
          message:
            "Weak password! It should have at least 8 characters, including uppercase, lowercase, and numbers",
        });
        return;
      }

      if (!this.correctEmailFormat(email)) {
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

  numericParamsValidation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { name, quantity, price }: IProductQueryParams = req.query;

      if (!name || !quantity || !price) {
        res.status(400).send({
          success: false,
          message: "Validation failed! All fields are required.",
        });
        return;
      }

      if (!this.isNumeric(quantity) || !this.isNumeric(price)) {
        res.status(400).send({
          status: false,
          message: "Invalid input. Quantity and price must be numeric values.",
        });
        return;
      }

      console.log("Numeric validation successful!");
      next();
    } catch (error: unknown) {
      console.error(error);

      res.status(400).send({
        status: false,
        message: "Numeric validation failed!",
        error,
      });
    }
  };
}
