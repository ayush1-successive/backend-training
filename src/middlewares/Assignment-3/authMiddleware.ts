import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";
import { serverConfig } from "../../config";

export class AuthMiddleware {
  verifyToken: string;

  constructor() {
    this.verifyToken = serverConfig.JWT_SECRET;
  }

  authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];

      JWT.verify(
        token ?? "",
        this.verifyToken ?? "",
        (err: any, decode: any) => {
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
    } catch (error) {
      console.log(error);
      return res.status(501).send({
        status: false,
        error,
        message: "Auth failed",
      });
    }
  };
}
