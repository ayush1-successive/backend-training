/* eslint-disable no-console */
import { type Request, type Response, type NextFunction } from 'express';
import { serverConfig } from '../../../config';

class LogMiddleware {
    static log = (req: Request, res: Response, next: NextFunction): void => {
        console.log(`Method = ${req.method}`);
        console.log(
            `Current path = http://localhost:${serverConfig.port} ${req.url}`,
        );
        console.log(`Time = ${new Date().toUTCString()}`);
        next();
    };
}

export default LogMiddleware;
