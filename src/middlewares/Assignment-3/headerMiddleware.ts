import { Request, Response, NextFunction } from "express";

const headerMiddleware = (headerName: any, headerValue: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    res.setHeader(headerName, headerValue);
    next();
  };
};

export { headerMiddleware };

