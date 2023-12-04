import { NextFunction, Request, Response } from "express";

export class ErrorHandlerMiddlerware {
  constructor() {
    this.handle = this.handle.bind(this);
    this.example = this.example.bind(this);
  }

  handle(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }

  example(req: Request, res: Response) {
    // Simulating an error (e.g., accessing a property of an undefined variable)
    let undefinedVariable: any;
    const result = undefinedVariable.property; // This will throw an error
    res.send("This will not be reached due to the error");
  }

  notFound(req: Request, res: Response) {
    res.status(404).send({
      status: false,
      message: "404 not found!",
    });
  }
}