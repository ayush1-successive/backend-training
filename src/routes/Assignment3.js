import express from "express";

import {
  addUserController,
  getDataController,
} from "../controllers/dataController.js";

import {
  authMiddleware,
  errorHandlerMiddlerware,
  headerMiddleware,
  logMiddleware,
  rateLimitMiddleware,
} from "../middlewares/Assignment-3/index.js";

const router = express.Router();

// Home Page
router.get("/", function (req, res) {
  res.status(200).send({
    status: true,
    message: "Assignment-3 HomePage",
  });
});

// Task-4,7
// Get data with authentication
router.get("/mock", authMiddleware, getDataController);

// Task-5
// Add new user to data
router.post("/add-user", addUserController);

// Task-9
// Log middleware
router.get("/mock-log", logMiddleware, getDataController);

// Task-10
// Route handler with intentional error
router.get("/example", (req, res) => {
  // Simulating an error (e.g., accessing a property of an undefined variable)
  let undefinedVariable;
  const result = undefinedVariable.property; // This will throw an error
  res.send("This will not be reached due to the error");
});

// Task-11
// Multiple chained middleware
router.use("/mock-log-auth", logMiddleware, authMiddleware, getDataController);

// Task-12
// Header Middleware
router.use(
  "/mock-header",
  headerMiddleware("Author", "Ayush Sinha"),
  getDataController,
);

// Task-13
// Rate-Limited Middleware
router.use("/mock-rate", rateLimitMiddleware(2, 5000), getDataController);

// Error catching middleware
router.use(errorHandlerMiddlerware);

export { router };
