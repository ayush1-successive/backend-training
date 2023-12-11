import { Request, Response, NextFunction } from "express";
import { validationConfig } from "../../utils/config";
import { ValidationResult } from "joi";

const dynamicValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const param: string = req.url.slice(1);
    const validationResult: ValidationResult<any> = validationConfig[
      param
    ].validate(req.body, {
      abortEarly: false,
    });

    if (validationResult.error) {
      console.error(validationResult.error);

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

export { dynamicValidationMiddleware };
