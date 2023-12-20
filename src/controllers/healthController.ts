import { type Request, type Response } from "express";

class HealthController {
  private static instance: HealthController;

  static getInstance = (): HealthController => {
    if (!HealthController.instance) {
      HealthController.instance = new HealthController();
    }
    return HealthController.instance;
  };

  check = (req: Request, res: Response): void => {
    res.send({
      status: true,
      message: "Health OK!",
    });
  };
}

export default HealthController.getInstance();
