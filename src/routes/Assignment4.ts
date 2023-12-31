import express, { type Request, type Response } from "express";

import { UserController } from "../controllers/userController";
import { HomePageController } from "../controllers/HomePageController";
import {
  IpMiddleware,
  ValidationMiddleware,
} from "../middlewares/Assignment-4/index";

const router: express.Router = express.Router();

const homepage: HomePageController = new HomePageController();
const userController: UserController = new UserController();
const ipMiddleware: IpMiddleware = new IpMiddleware();
const validationMiddleware: ValidationMiddleware = new ValidationMiddleware();

// Home Page
router.get("/", homepage.assignment4);

// Task-2
router.post("/add-user", userController.addValidatedUser);

// Task-4
// Register user [Req. fields - name, email, password]
router.post(
  "/register",
  validationMiddleware.inputValidation,
  (req: Request, res: Response): void => {
    res.status(201).json({
      status: true,
      message: "Registration successful!",
    });
  },
);

// Task-5
// Add item to product-list [Req. fields - name, quantity, price]
// quantity and price must be numeric values
router.post(
  "/add-item",
  validationMiddleware.numericParamsValidation,
  (req: Request, res: Response): void => {
    res.status(201).json({
      status: true,
      message: "Item successfully added to product list",
    });
  },
);

// Task-6
// Middleware to validate IP
router.get("/ip", ipMiddleware.check, (req: Request, res: Response): void => {
  res.status(200).send({
    status: true,
    message: "IP test completed!",
  });
});

// Task-7
// Middleware with dynamically fetch validation
// rules from a configuration file based on route.
router.post(
  "/registration",
  validationMiddleware.dynamicValidation,
  (req: Request, res: Response): void => {
    res.json({
      status: true,
      message: "User registered successfully!",
    });
  },
);

// Task-7
router.post(
  "/product",
  validationMiddleware.dynamicValidation,
  (req: Request, res: Response): void => {
    res.json({
      status: true,
      message: "Product added to list successfully!",
    });
  },
);

export { router };
