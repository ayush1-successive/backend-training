import { Request, Response, NextFunction } from "express";

const headerConfig = {
  assignmentNo: 3,
  taskNo: 12,
};

const headerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  (res as any).setHeader("Content-type", headerConfig);
  next();
};

export { headerMiddleware };
