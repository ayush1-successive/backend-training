import dotenv from "dotenv";
import express from "express";
import { data } from "./controllers/mockData.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { userSchema } from "./models/userModel.js";

const app = express();

// to access process.env
dotenv.config();

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Home Page");
});

app.get("/mock", authMiddleware, function (req, res) {
  res.json(data);
});

app.post("/add-user", function (req, res) {
  const newData = req.body;
  const validationResult = userSchema.validate(newData);

  if (validationResult.error) {
    return res.status(400).json({
      status: "Validation failed",
      error: validationResult.error.message,
    });
  }

  data.users.push(newData);
  res.json(data);
});

app.listen(3000);
