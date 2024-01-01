import mongoose from 'mongoose';
import logger from './logger';

class Database {
    // eslint-disable-next-line no-use-before-define
    private static instance: Database;

    mongoUrl: string;

    // Set to private to prevent direct construction calls with the `new` operator.
    private constructor(url: string) {
        this.mongoUrl = url;
    }

    public static getInstance(mongoUrl: string): Database {
        if (!Database.instance) {
            Database.instance = new Database(mongoUrl);
        }

        return Database.instance;
    }

    connect = async (): Promise<void> => {
        try {
            await mongoose.connect(this.mongoUrl);

            logger.info(`Connected to MongoDB Database ${mongoose.connection.host}`);
        } catch (error: unknown) {
            logger.error('MongoDB Database Error', error);
        }
    };
}

export default Database;
