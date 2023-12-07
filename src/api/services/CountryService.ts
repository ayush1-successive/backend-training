import type ICountry from "../interfaces/ICountry";
import CountryRepository from "../repositories/CountryRepository";

class CountryService {
  countryRepository: CountryRepository;

  constructor() {
    this.countryRepository = new CountryRepository();
  }

  // Seed all countries to database
  seedCountries = async (countryList: ICountry[]): Promise<void> => {
    for (const country of countryList) {
      await this.countryRepository.seedCountry(country);
    }
  };

  getCountry = async (name: string): Promise<any> => {
    const country = await this.countryRepository.getCountryByName(name);
    return country;
  };

  getAllCountries = async (): Promise<ICountry[]> => {
    return await this.countryRepository.getAllCountries();
  };

  createCountry = async (country: ICountry): Promise<any> => {
    return await this.countryRepository.createCountry(country);
  };

  deleteCountry = async (countryName: string): Promise<any> => {
    return await this.countryRepository.deleteCountryByName(countryName);
  };
}

export default CountryService;
