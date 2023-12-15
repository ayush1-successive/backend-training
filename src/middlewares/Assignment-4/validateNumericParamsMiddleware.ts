import { Request, Response, NextFunction } from "express";

interface IProductQueryParams {
  name?: string;
  quantity?: string;
  price?: string;
}

const isNumeric = (value: string | number): boolean => {
  if (typeof value === "number") return true;

  if (typeof value === "string") {
    const numericValue: number = parseFloat(value);
    return !isNaN(numericValue);
  }
  return false;
};

const validateNumericParamsMiddleware = async (
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

    if (!isNumeric(quantity) || !isNumeric(price)) {
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
    });
  }
};

export { validateNumericParamsMiddleware };
