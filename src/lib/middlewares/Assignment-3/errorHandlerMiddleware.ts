import { type NextFunction, type Request, type Response } from 'express';
import { SystemResponse } from '../../response-handler';

class ErrorHandlerMiddlerware {
    static handle = (
        err: any,
        req: Request,
        res: Response,
        next: NextFunction,
    ): void => {
        // console.error(err.message);
        new SystemResponse(res, 'some error occured!', err).internalServerError();
        next();
    };

    static example = (req: Request, res: Response): void => {
    // Simulating an error (e.g., accessing a property of an undefined variable)
        let undefinedVariable: any;
        const result: undefined = undefinedVariable.property; // This will throw an error
        res.send(`${result} will not be reached due to the error`);
    };

    static notFound = (req: Request, res: Response): void => {
        new SystemResponse(res, '404 not found!', {}).notFound();
    };
}

export default ErrorHandlerMiddlerware;
