import { Request, Response, NextFunction } from "express";
import { serverConfig } from "../../config";

export class LogMiddleware {
  private port: number;

  constructor() {
    this.port = serverConfig.PORT;
    this.log = this.log.bind(this);
  }

  log = (req: Request, res: Response, next: NextFunction): void => {
    console.log(`Method = ${req.method}`);
    console.log(`Current path = http://localhost:${this.port} ${req.url}`);
    console.log(`Time = ${new Date().toUTCString()}`);
    next();
  };
}
