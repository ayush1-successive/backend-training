import countryData from '../../lib/countryData';
import type ICountry from './entities/ICountry';
import CountryRepository from './repositories/repository';

class CountryService {
    countryRepository: CountryRepository;

    constructor() {
        this.countryRepository = new CountryRepository();
    }

    initialSeed = async (): Promise<void> => {
        const tasks: Promise<void>[] = countryData.map(
            (country: ICountry) => this.countryRepository.seed(country),
        );
        await Promise.all(tasks);
    };

    // Seed all countries to database
    seedAll = async (countryList: ICountry[]): Promise<void> => {
        const tasks: Promise<void>[] = countryList.map(
            (country: ICountry) => this.countryRepository.seed(country),
        );
        await Promise.all(tasks);
    };

    getByName = async (countryName: string): Promise<ICountry | null> => {
        const result: ICountry | null = await this.countryRepository.getByName(countryName);
        return result;
    };

    getAll = async (): Promise<ICountry[] | null> => {
        const result: ICountry[] | null = await this.countryRepository.getAll();
        return result;
    };

    deleteAll = async (): Promise<void> => {
        await this.countryRepository.deleteAll();
    };

    create = async (country: ICountry): Promise<void> => {
        await this.countryRepository.create(country);
    };

    deleteByName = async (countryName: string): Promise<void> => {
        await this.countryRepository.deleteByName(countryName);
    };
}

export default CountryService;
