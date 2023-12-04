import { Request, Response, NextFunction } from "express";

export class HeaderMiddleware {
  headerName: any;
  headerValue: any;

  constructor(headerName: any, headerValue: any) {
    this.headerName = headerName;
    this.headerValue = headerValue;

    this.setHeader = this.setHeader.bind(this);
  }

  setHeader(req: Request, res: Response, next: NextFunction) {
    res.setHeader(this.headerName, this.headerValue);
    next();
  }
}
