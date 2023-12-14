import { type NextFunction, type Request, type Response } from "express";

export class ErrorHandlerMiddlerware {
  handle = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
  ): void => {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  };

  example = (req: Request, res: Response): void => {
    // Simulating an error (e.g., accessing a property of an undefined variable)
    let undefinedVariable: any;
    const result: any = undefinedVariable.property; // This will throw an error
    res.send(`This will not be reached due to the error. ${result}`);
  };

  notFound = (req: Request, res: Response): void => {
    res.status(404).send({
      status: false,
      message: "404 not found!",
    });
  };
}
