import express, { Request, Response } from "express";
import { asyncOperationController } from "../controllers/asyncOperationController";
import { paramValidationController } from "../controllers/validationController";
import { errorHandlerMiddlerware } from "../middlewares/Assignment-3";

const router: express.Router = express.Router();

// Home Page
router.get("/", function (req: Request, res: Response): void {
  res.status(200).send({
    status: true,
    message: "Assignment-5 HomePage",
  });
});

// Task-5
router.get("/async-route", asyncOperationController);

// Task-6
router.post("/param-validation", paramValidationController);

// Error catching middleware
router.use(errorHandlerMiddlerware);

export { router };
