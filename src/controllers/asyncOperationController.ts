import { Request, Response } from "express";

export class AsyncOperationController {
  async someAsyncOperation() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("An intentional error occured!");
      }, 1000);
    });
  }

  doAsyncOperation = async (req: Request, res: Response) => {
    try {
      const result = await this.someAsyncOperation();

      return res.status(200).send({
        status: true,
        message: "Data fetch successfully!",
        result,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: false,
        message: "Internal server error!",
        error,
      });
    }
  };
}
