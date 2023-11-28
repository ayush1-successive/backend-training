import express from "express";
import { addValidatedUserController } from "../controllers/dataController.js";

import {
  dynamicValidationMiddleware,
  inputValidateMiddleware,
  ipCheckMiddleware,
  validateNumericParamsMiddleware,
} from "../middlewares/Assignment-4/index.js";

const router = express.Router();

// Home Page
router.get("/", function (req, res) {
  res.status(200).send({
    status: true,
    message: "Assignment-4 HomePage",
  });
});

// Task-2
router.post("/add-user", addValidatedUserController);

// Task-4
// Register user [Req. fields - name, email, password]
router.post("/register", inputValidateMiddleware, function (req, res) {
  res.status(201).json({
    status: true,
    message: "Registration successful!",
  });
});

// Task-5
// Add item to product-list [Req. fields - name, quantity, price]
// quantity and price must be numeric values
router.post("/add-item", validateNumericParamsMiddleware, function (req, res) {
  res.status(201).json({
    status: true,
    message: "Item successfully added to product list",
  });
});

// Task-6
// Middleware to validate IP
router.get("/ip", ipCheckMiddleware, function (req, res) {
  res.status(200).send({
    status: true,
    message: "IP test completed!",
  });
});

// Task-7
// Middleware with dynamically fetch validation
// rules from a configuration file based on route.
router.get("/registration", dynamicValidationMiddleware, function (req, res) {
  res.json({
    status: true,
    message: "User registered successfully!",
  });
});

// Task-7
router.get("/product", dynamicValidationMiddleware, function (req, res) {
  res.json({
    status: true,
    message: "Product added to list successfully!",
  });
});

export { router };
