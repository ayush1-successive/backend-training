import { Request, Response, NextFunction } from "express";

// PORT
const PORT = process.env.PORT || 3000;

const logMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  console.log(`Method = ${req.method}`);
  console.log(`Current path = http://localhost:${PORT}${req.url}`);
  console.log(`Time = ${new Date().toUTCString()}`);

  next();
};

export { logMiddleware };
