import { Request, Response, NextFunction } from "express";

export class IpMiddleware {
  private expectedIp: string;

  constructor() {
    this.expectedIp = "::1";
    this.check = this.check.bind(this);
  }

  async check(req: Request, res: Response, next: NextFunction) {
    try {
      const clientIp = req.ip;

      if (clientIp !== this.expectedIp) {
        return res.status(403).send({
          status: false,
          message: "Forbidden: Access denied. Invalid IP address.",
        });
      }

      console.log("Valid Ip address!");
      next();
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: false,
        message: "Internal Server Error",
      });
    }
  }
}
