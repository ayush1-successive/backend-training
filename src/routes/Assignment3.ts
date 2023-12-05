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

const router = express.Router();

const homepage = new HomePageController();
const userController = new UserController();
const authMiddleware = new AuthMiddleware();
const headerMiddleware = new HeaderMiddleware("Author", "Ayush Sinha");
const logMiddleware = new LogMiddleware();
const rateLimitMiddleware = new RateLimitMiddleware(2, 5000);
const errorHandler = new ErrorHandlerMiddlerware();

// Home Page
router.get("/", homepage.assignment3);

// Task-4,7
// Get data with authentication
router.get("/mock", authMiddleware.authenticate, userController.getData);
// router.get(
//   "/mock",
//   (req, res, next) => {
//     authMiddleware.authenticate(req, res, next);
//   },
//   (req, res) => {
//     userController.getData(req, res);
//   },
// );

// Task-5
// Add new user to data
router.post("/add-user", (req, res) => {
  userController.addUser(req, res);
});

// Task-9
// Log middleware
router.get(
  "/mock-log",
  (req, res, next) => {
    logMiddleware.log(req, res, next);
  },
  (req, res) => {
    userController.getData(req, res);
  },
);

// Task-10
// Route handler with intentional error
router.get("/example", (req, res) => {
  errorHandler.example(req, res);
});

// Task-11
// Multiple chained middleware
router.use(
  "/mock-log-auth",
  (req, res, next) => {
    logMiddleware.log(req, res, next);
  },
  (req, res, next) => {
    authMiddleware.authenticate(req, res, next);
  },
  (req, res) => {
    userController.getData(req, res);
  },
);

// Task-12
// Header Middleware
router.use(
  "/mock-header",
  (req, res, next) => {
    headerMiddleware.setHeader(req, res, next);
  },
  (req, res) => {
    userController.getData(req, res);
  },
);

// Task-13
// Rate-Limited Middleware
router.use("/mock-rate", rateLimitMiddleware.fetch, (req, res) => {
  userController.getData(req, res);
});

// Error catching middleware
router.use(errorHandler.handle);

export { router };
