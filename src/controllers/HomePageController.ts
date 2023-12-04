import { Request, Response } from "express";

export class HomePageController {
  assignment3(req: Request, res: Response) {
    res.status(200).send({
      status: true,
      message: "Assignment-3 HomePage",
    });
  }

  assignment4(req: Request, res: Response) {
    res.status(200).send({
      status: true,
      message: "Assignment-4 HomePage",
    });
  }

  assignment5(req: Request, res: Response) {
    res.status(200).send({
      status: true,
      message: "Assignment-5 HomePage",
    });
  }
}
