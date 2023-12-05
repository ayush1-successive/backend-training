import { Request, Response, NextFunction } from "express";
import { validationConfig } from "../../utils/config";

export class ValidationMiddleware {
  constructor() {
    this.dynamicValidation = this.dynamicValidation.bind(this);
    this.inputValidation = this.inputValidation.bind(this);
    this.numericParamsValidation = this.numericParamsValidation.bind(this);
  }

  private isStrongPassword(value: string) {
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}",
    );
    return strongRegex.test(value);
  }

  private correctEmailFormat(value: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  private isNumeric(value: any) {
    if (typeof value === "number") return true;

    if (typeof value === "string") {
      const numericValue = parseFloat(value);
      return !isNaN(numericValue);
    }
    return false;
  }

  dynamicValidation = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const param = req.url.slice(1);
      const validationResult = validationConfig[param].validate(req.body, {
        abortEarly: false,
      });

      if (validationResult.error) {
        console.log(validationResult.error);
        return res.status(400).send({
          status: false,
          message: "Bad request!",
          error: validationResult.error,
        });
      }

      console.log("Validation successful!");
      next();
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: false,
        message: "Internal server error!",
        error,
      });
    }
  };

  inputValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).send({
          success: false,
          message: "Validation failed! All fields are required.",
        });
      }

      if (!this.isStrongPassword(password)) {
        return res.status(400).send({
          status: false,
          message:
            "Weak password! It should have at least 8 characters, including uppercase, lowercase, and numbers",
        });
      }

      if (!this.correctEmailFormat(email)) {
        return res.status(400).send({
          status: false,
          message: "Incorrect email format!",
        });
      }

      console.log("Validation successful!");
      next();
    } catch (error) {
      console.log(error);

      return res.status(400).send({
        status: false,
        error,
        message: "Validation error!",
      });
    }
  };

  numericParamsValidation = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { name, quantity, price } = req.query;

      if (!name || !quantity || !price) {
        return res.status(400).send({
          success: false,
          message: "Validation failed! All fields are required.",
        });
      }

      if (!this.isNumeric(quantity) || !this.isNumeric(price)) {
        return res.status(400).send({
          status: false,
          message: "Invalid input. Quantity and price must be numeric values.",
        });
      }

      console.log("Numeric validation successful!");
      next();
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        status: false,
        message: "Numeric validation failed!",
        error,
      });
    }
  };
}
