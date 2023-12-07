// server.ts

import express, { type Request, type Response } from "express";
import { type IServerConfig } from "./config";
import Database from "./lib/database";

import CountryController from "./api/controllers/CountryController";
import healthController from "./controllers/healthController";
import { ErrorHandlerMiddlerware } from "./middlewares/Assignment-3";

import {
  assignment3Router,
  assignment4Router,
  assignment5Router,
  countryRouter,
} from "./routes";

class Server {
  private readonly app: express.Application;
  private readonly config: IServerConfig;
  private readonly database: Database;

  constructor(config: IServerConfig) {
    this.config = config;
    this.app = express();
    this.app.use(express.json());
    this.database = new Database(this.config.MONGO_URL);

    this.configureRoutes();
  }

  private configureRoutes(): void {
    const errorHandler = new ErrorHandlerMiddlerware();

    // HomePage
    this.app.get("/", (req: Request, res: Response) => {
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

    this.app.use("/country", countryRouter);

    // Handles '404 not found'
    this.app.use(errorHandler.notFound);
  }

  run = async (): Promise<void> => {
    // Database connect
    await this.database.connect();

    const countryController = new CountryController();
    await countryController.seedCountries();

    this.app.listen(this.config.PORT, () => {
      console.log(
        `Node Server Running In ${this.config.DEV_MODE} On Port http://localhost:${this.config.PORT}`,
      );
    });
  };
}

export { Server };
