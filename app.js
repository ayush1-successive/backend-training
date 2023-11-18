import express from "express";
import { data } from "./mockData.js";
const app = express();

app.get("/", function (req, res) {
  res.send("Home Page");
});

app.get("/mock", function (req, res) {
  res.json(data);
});

app.listen(3000);
