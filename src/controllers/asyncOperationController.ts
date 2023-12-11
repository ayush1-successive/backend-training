import { Request, Response } from "express";

const someAsyncOperation = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("An intentional error occured!");
    }, 1000);
  });
};

const asyncOperationController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result: void = await someAsyncOperation();

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

export { asyncOperationController };
