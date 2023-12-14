// server.ts

import express, { Request, Response } from "express";
import { IServerConfig } from "./config";
import healthController from "./controllers/healthController";
import { ErrorHandlerMiddlerware } from "./middlewares/Assignment-3";
import {
  assignment3Router,
  assignment4Router,
  assignment5Router,
} from "./routes/index";

class Server {
  private app: express.Application;
  private config: IServerConfig;

  constructor(config: IServerConfig) {
    this.config = config;
    this.app = express();

    this.configureMiddlewares();
    this.configureRoutes();
  }

  private configureMiddlewares() {
    this.app.use(express.json());
  }

  private configureRoutes() {
    const errorHandler: ErrorHandlerMiddlerware = new ErrorHandlerMiddlerware();

    // HomePage
    this.app.get("/", (req: Request, res: Response): void => {
      res.send("Home Page");
    });

    // health-check
    this.app.get("/health", healthController.check);

    // assignment-3
    this.app.use("/assignment3", assignment3Router);

    // Assignment-4
    this.app.use("/assignment4", assignment4Router);

    // Assignment-5
    this.app.use("/assignment5", assignment5Router);

    // Handles '404 not found'
    this.app.use(errorHandler.notFound);
  }

  run() {
    this.app.listen(this.config.port, () => {
      console.log(
        `Node Server Running In ${this.config.devMode} On Port http://localhost:${this.config.port}`
      );
    });
  }
}

export { Server };
