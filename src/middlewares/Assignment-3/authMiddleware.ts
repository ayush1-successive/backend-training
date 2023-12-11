import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token: string | undefined =
      req.headers["authorization"]?.split(" ")[1];

    JWT.verify(
      token ?? "",
      process.env.JWT_SECRET ?? "",
      (err: unknown, decode: any) => {
        if (err) {
          return res.status(401).send({
            success: false,
            message: "Auth failed",
          });
        } else {
          console.log(decode?.userId);
          req.body.userId = decode?.userId;
          next();
        }
      }
    );
  } catch (error: unknown) {
    console.error(error);

    res.status(501).send({
      status: false,
      error,
      message: "Auth failed",
    });
  }
};

export { authMiddleware };
