import { Request, Response, NextFunction } from "express";

const ipCheckMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const expectedIp: string = "::1";

  try {
    const clientIp: string | undefined = req.ip;

    if (clientIp !== expectedIp) {
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

export { ipCheckMiddleware };

