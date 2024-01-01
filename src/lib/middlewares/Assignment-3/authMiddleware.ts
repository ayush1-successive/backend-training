import { type NextFunction, type Request, type Response } from 'express';
import JWT from 'jsonwebtoken';
import { serverConfig } from '../../../config';
import { SystemResponse } from '../../response-handler';
import logger from '../../logger';

class AuthMiddleware {
    verifyToken: string;

    constructor() {
        this.verifyToken = serverConfig.jwtSecret;
    }

    authenticate = (req: Request, res: Response, next: NextFunction): void => {
        try {
            const token: string | undefined = req.headers.authorization?.split(' ')[1];

            JWT.verify(
                token ?? '',
                this.verifyToken ?? '',
                (error: unknown, decode: any) => {
                    if (error) {
                        new SystemResponse(
                            res,
                            'user authentication failed!',
                            error,
                        ).unauthorized();
                    } else {
                        req.body.userId = decode.userId;
                        next();
                    }
                },
            );
        } catch (error: unknown) {
            logger.error('error in auth middleware', error);

            new SystemResponse(
                res,
                'user authentication failed!',
                error,
            ).internalServerError();
        }
    };
}

export default AuthMiddleware;
