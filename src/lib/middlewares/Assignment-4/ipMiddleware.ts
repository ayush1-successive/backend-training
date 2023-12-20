import { type Request, type Response, type NextFunction } from 'express';
import { SystemResponse } from '../../response-handler';

class IpMiddleware {
    private readonly expectedIp: string;

    constructor() {
        this.expectedIp = '::1';
    }

    check = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const clientIp: string | undefined = req.ip;

            if (clientIp !== this.expectedIp) {
                new SystemResponse(
                    res,
                    'access denied! invalid IP address.',
                    {},
                ).forbidden();
                return;
            }

            // console.log('Valid Ip address!');
            next();
        } catch (error: unknown) {
            // console.error(error);

            new SystemResponse(
                res,
                'error validating ip!',
                error,
            ).internalServerError();
        }
    };
}

export default IpMiddleware;
