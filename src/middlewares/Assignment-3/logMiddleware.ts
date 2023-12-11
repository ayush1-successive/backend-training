import { type NextFunction, type Request, type Response } from "express";
import { serverConfig } from "../../config";

export class LogMiddleware {
  private readonly port: number;

  constructor() {
    this.port = serverConfig.port;
  }

  log = (req: Request, res: Response, next: NextFunction): void => {
    console.log(`Method = ${req.method}`);
    console.log(`Current path = http://localhost:${this.port}${req.url}`);
    console.log(`Time = ${new Date().toUTCString()}`);
    next();
  };
}
