import { Request, Response, NextFunction } from "express";

export class HeaderMiddleware {
  headerName: string;
  headerValue: string;

  constructor(headerName: string, headerValue: string) {
    this.headerName = headerName;
    this.headerValue = headerValue;
  }

  setHeader = (req: Request, res: Response, next: NextFunction): void => {
    res.setHeader(this.headerName, this.headerValue);
    next();
  };
}
