import { Request, Response, NextFunction } from "express";

interface IHeaderMiddleware {
  (
    headerName: string,
    headerValue: string
  ): (req: Request, res: Response, next: NextFunction) => void;
}

const headerMiddleware: IHeaderMiddleware = (
  headerName: string,
  headerValue: string
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    res.setHeader(headerName, headerValue);
    next();
  };
};

export { headerMiddleware };
