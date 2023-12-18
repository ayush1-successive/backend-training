import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";
import { serverConfig } from "../../config";

export class AuthMiddleware {
  verifyToken: string;

  constructor() {
    this.verifyToken = serverConfig.jwtSecret;
  }

  authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const token: string | undefined =
        req.headers["authorization"]?.split(" ")[1];

      JWT.verify(
        token ?? "",
        this.verifyToken ?? "",
        (err: unknown, decode: any) => {
          if (err) {
            res.status(401).send({
              success: false,
              message: "Auth failed",
            });
          } else {
            console.log(decode.userId);
            req.body.userId = decode.userId;
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
}
