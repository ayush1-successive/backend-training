import { type Request, type Response } from "express";

export class AsyncOperationController {
  someAsyncOperation = async (): Promise<Error> => {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("An intentional error occured!"));
      }, 1000);
    });
  };

  doAsyncOperation = async (req: Request, res: Response): Promise<void> => {
    try {
      const result: Error = await this.someAsyncOperation();

      res.status(200).send({
        status: true,
        message: "Data fetch successfully!",
        result,
      });
    } catch (error: unknown) {
      console.error(error);

      res.status(500).send({
        status: false,
        message: "Internal server error!",
        error,
      });
    }
  };
}
