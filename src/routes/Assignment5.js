import express from "express";
import { asyncOperationController } from "../controllers/asyncOperationController.js";
import { paramValidationController } from "../controllers/validationController.js";
import { errorHandlerMiddlerware } from "../middlewares/Assignment-3/index.js";

const router = express.Router();

// Home Page
router.get("/", function (req, res) {
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
