import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { type IServerConfig } from './config';
import Database from './lib/database';
import router from './routes';
import CountryController from './module/country/controller';

class Server {
    private readonly app: express.Application;

    private readonly config: IServerConfig;

    private readonly database: Database;

    constructor(config: IServerConfig) {
        this.app = express();
        this.config = config;
        this.database = Database.getInstance(this.config.mongoUrl);
    }

    bootStrap(): void {
        this.configureMiddlewares();
        this.configureRoutes();
    }

    private configureMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(morgan('dev'));
    }

    private configureRoutes(): void {
        this.app.use(router);
    }

    run = async (): Promise<void> => {
        // connect to DB
        await this.database.connect();

        // seed the country database
        const countryController: CountryController = new CountryController();
        await countryController.initialSeed();

        this.app.listen(this.config.port, () => {
            // eslint-disable-next-line no-console
            console.log(
                `Node Server Running In ${this.config.devMode} On Port http://localhost:${this.config.port}`,
            );
        });
    };
}

export default Server;
