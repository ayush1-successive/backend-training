import { type Request, type Response } from 'express';
import { SystemResponse } from '../lib/response-handler';

class HealthController {
    static check = (req: Request, res: Response): void => {
        new SystemResponse(res, 'Health OK!', {}).ok();
    };
}

export default HealthController;
