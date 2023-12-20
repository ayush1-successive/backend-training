import { type Request, type Response } from 'express';
import { type ValidationResult } from 'joi';

import countryData from '../../lib/countryData';
import type ICountry from './entities/ICountry';
import CountryService from './service';
import countryValidation from './validation';
import { SystemResponse } from '../../lib/response-handler';

class CountryController {
    private readonly countryService: CountryService;

    constructor() {
        this.countryService = new CountryService();
    }

    initialSeed = async (): Promise<void> => {
        // console.log('Initial seeding!');
        await this.countryService.seedAll(countryData);
    };

    static index = (req: Request, res: Response): void => {
        new SystemResponse(res, 'Country HomePage', {}).ok();
    };

    getByName = async (req: Request, res: Response): Promise<void> => {
        try {
            const country: ICountry | null = await this.countryService.getByName(
                req.params.name,
            );

            if (!country) {
                new SystemResponse(res, 'country not found!', {}).notFound();
                return;
            }
            new SystemResponse(res, 'country found!', country).ok();
        } catch (error) {
            // console.error(error);

            new SystemResponse(
                res,
                'error retrieving country by name!',
                error,
            ).internalServerError();
        }
    };

    getAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const countryList: ICountry[] | null = await this.countryService.getAll();
            new SystemResponse(res, 'country list found!', countryList).ok();
        } catch (error) {
            // console.error(error);

            new SystemResponse(
                res,
                'error retrieving all countries!',
                error,
            ).internalServerError();
        }
    };

    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const newCountry: ICountry = req.body;
            const validationResult: ValidationResult = countryValidation.validate(
                newCountry,
                {
                    abortEarly: false,
                },
            );

            if (validationResult.error) {
                new SystemResponse(
                    res,
                    'new country validation failed!',
                    validationResult.error,
                ).badRequest();
                return;
            }

            await this.countryService.create(req.body);
            new SystemResponse(
                res,
                'new country added to database!',
                req.body,
            ).created();
        } catch (error) {
            // console.error(error);

            new SystemResponse(
                res,
                'error creating new country!',
                error,
            ).internalServerError();
        }
    };
}

export default CountryController;
