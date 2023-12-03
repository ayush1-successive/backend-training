import { Request, Response, NextFunction } from "express";

const errorHandlerMiddlerware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.message);
  res.status(500).json({ error: "Internal Server Error" });
};

export { errorHandlerMiddlerware };
