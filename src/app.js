import dotenv from "dotenv";
import express from "express";
import { data } from "./controllers/mockData.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";

const app = express();

// dot config
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
  data.users.push(newData);
  res.json(data);
});

app.listen(3000);
