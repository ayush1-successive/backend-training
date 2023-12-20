import { type NextFunction, type Request, type Response } from "express";

export class IpMiddleware {
  private readonly expectedIp: string;

  constructor() {
    this.expectedIp = "::1";
  }

  check = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const clientIp: string | undefined = req.ip;

      if (clientIp !== this.expectedIp) {
        res.status(403).send({
          status: false,
          message: "Forbidden: Access denied. Invalid IP address.",
        });
        return;
      }

      console.log("Valid Ip address!");
      next();
    } catch (error: unknown) {
      console.error(error);

      res.status(500).send({
        status: false,
        message: "Internal Server Error",
      });
    }
  };
}
