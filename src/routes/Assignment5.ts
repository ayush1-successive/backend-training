import express from "express";

import { HomePageController } from "../controllers/HomePageController";
import { AsyncOperationController } from "../controllers/asyncOperationController";
import { ValidationController } from "../controllers/validationController";
import { ErrorHandlerMiddlerware } from "../middlewares/Assignment-3";

const router: express.Router = express.Router();

const homepage: HomePageController = new HomePageController();
const asyncOperationController: AsyncOperationController = new AsyncOperationController();
const validationController: ValidationController = new ValidationController();
const errorHandler: ErrorHandlerMiddlerware = new ErrorHandlerMiddlerware();

// Home Page
router.get("/", homepage.assignment5);

// Task-5
router.get("/async-route", asyncOperationController.doAsyncOperation);

// Task-6
router.post("/param-validation", validationController.paramValidation);

// Error catching middleware
router.use(errorHandler.handle);

export { router };
