import { BaseRepository } from '../../../lib/base';
import type ICountry from '../entities/ICountry';
import countryModel from './model';

class CountryRepository extends BaseRepository<ICountry> {
    constructor() {
        super(countryModel);
    }

    seed = async (country: ICountry): Promise<void> => {
        const existingCountry: ICountry | null = await this.getByName(country.name);

        if (!existingCountry) {
            await this.createOne(country);
        }
    };

    // Get all countries
    getAll = async (): Promise<ICountry[] | null> => {
        const result: ICountry[] | null = await this.findAll();
        return result;
    };

    // Get a country by its name
    getByName = async (name: string): Promise<ICountry | null> => {
        const result = await this.model.findOne({ name });
        return result;
    };

    // Add a country to the collection
    create = async (country: ICountry): Promise<void> => {
        const existingCountry: ICountry | null = await this.model.findOne({
            name: country.name,
        });

        if (existingCountry) {
            throw new Error(`Country '${country.name}' already exists in DB!`);
        }

        await this.createOne(country);
    };

    // Delete a country by its name
    deleteByName = async (countryName: string): Promise<void> => {
        const result: any = await this.model.deleteOne({
            name: countryName,
        });

        if (result.deletedCount === 0) {
            throw new Error(`Country with name ${countryName} not found.`);
        }
    };
}

export default CountryRepository;