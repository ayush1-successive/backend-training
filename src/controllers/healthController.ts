import { Request, Response } from "express";

class HealthController {
  private static instance: HealthController;

  public static getInstance(): HealthController {
    if (!HealthController.instance) {
      HealthController.instance = new HealthController();
    }
    return HealthController.instance;
  }

  check(req: Request, res: Response) {
    res.send({
      status: true,
      message: "Health OK!",
    });
  }
}

export default HealthController.getInstance();
