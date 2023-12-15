import { Request, Response, NextFunction } from "express";

const logMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const port: number = parseInt(process.env.PORT ?? "3000");

  console.log(`Method = ${req.method}`);
  console.log(`Current path = http://localhost:${port}${req.url}`);
  console.log(`Time = ${new Date().toUTCString()}`);

  next();
};

export { logMiddleware };
