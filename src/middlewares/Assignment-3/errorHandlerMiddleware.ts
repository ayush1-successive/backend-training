import { Request, Response, NextFunction } from "express";

const errorHandlerMiddlerware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.message);
  res
    .status(500)
    .json({ status: false, message: "Internal Server Error", err });
};

export { errorHandlerMiddlerware };
