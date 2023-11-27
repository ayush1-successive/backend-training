import express from "express";

import {
  getDataController,
  addUserController,
} from "../controllers/dataController.js";

import {
  authMiddleware,
  headerMiddleware,
  logMiddleware,
  rateLimitMiddleware,
} from "../middlewares/index.js";

const router = express.Router();

// Home Page
router.get("/", function (req, res) {
  res.status(200).send({
    status: true,
    message: "Assignment-3 HomePage",
  });
});

// Get data
router.get("/mock", authMiddleware, getDataController);

// Add new user to data
router.post("/add-user", addUserController);

// Log middleware
router.get("/mock-log", logMiddleware, getDataController);

// Multiple chained middleware
router.use("/mock-log-auth", logMiddleware, authMiddleware, getDataController);

// Header Middleware
router.use("/mock-header", headerMiddleware, getDataController);

// Rate-Limited Middleware
router.use("/mock-rate", rateLimitMiddleware(2, 5000), getDataController);

// Middleware to handle '404 not found' errors
router.use((req, res, next) => {
  res.status(404).send({
    status: false,
    message: "404 not found!",
  });
});

export { router };
