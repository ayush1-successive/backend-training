import dotenv from "dotenv";
import express from "express";
import { Request, Response } from "express";

import { router as assignment3Router } from "./routes/Assignment3";
import { router as assignment4Router } from "./routes/Assignment4";
import { router as assignment5Router } from "./routes/Assignment5";

const app = express();

// dot config
dotenv.config();

// middlewares
app.use(express.json());

// PORT
const PORT = process.env.PORT || 3000;

// routes
app.get("/", function (req: Request, res: Response) {
  res.status(200).send("Home Page");
});

// Assignment-3
app.use("/assignment3", assignment3Router);

// Assignment-4
app.use("/assignment4", assignment4Router);

// Assignment-5
app.use("/assignment5", assignment5Router);

// listen
app.listen(PORT, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} On Port http://localhost:${PORT}`
  );
});
