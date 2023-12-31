import express from "express";

import { HomePageController } from "../controllers/HomePageController";
import { UserController } from "../controllers/userController";

import {
  AuthMiddleware,
  ErrorHandlerMiddlerware,
  HeaderMiddleware,
  LogMiddleware,
  RateLimitMiddleware,
} from "../middlewares/Assignment-3/index";

const router: express.Router = express.Router();

const homepage: HomePageController = new HomePageController();
const userController: UserController = new UserController();
const authMiddleware: AuthMiddleware = new AuthMiddleware();
const headerMiddleware: HeaderMiddleware = new HeaderMiddleware(
  "Author",
  "Ayush Sinha",
);
const logMiddleware: LogMiddleware = new LogMiddleware();
const rateLimitMiddleware: RateLimitMiddleware = new RateLimitMiddleware(
  2,
  5000,
);
const errorHandler: ErrorHandlerMiddlerware = new ErrorHandlerMiddlerware();

// Home Page
router.get("/", homepage.assignment3);

// Task-4,7
// Get data with authentication
router.get("/mock", authMiddleware.authenticate, userController.getData);

// Task-5
// Add new user to data
router.post("/add-user", userController.addUser);

// Task-9
// Log middleware
router.get("/mock-log", logMiddleware.log, userController.getData);

// Task-10
// Route handler with intentional error
router.get("/example", errorHandler.example);

// Task-11
// Multiple chained middleware
router.use(
  "/mock-log-auth",
  logMiddleware.log,
  authMiddleware.authenticate,
  userController.getData,
);

// Task-12
// Header Middleware
router.use("/mock-header", headerMiddleware.setHeader, userController.getData);

// Task-13
// Rate-Limited Middleware
router.use("/mock-rate", rateLimitMiddleware.fetch, userController.getData);

// Error catching middleware
router.use(errorHandler.handle);

export { router };
