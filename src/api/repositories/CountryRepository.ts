import mongoose, { type mongo } from "mongoose";
import type ICountry from "../interfaces/ICountry";
import BaseRepository from "./BaseRepository";

// Define the schema for the 'Country' collection
const countrySchema: mongoose.Schema<ICountry> = new mongoose.Schema<ICountry>({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  continent: { type: String, required: true },
  capital: { type: String, required: true },
  population: { type: Number, required: true },
  language: { type: String, required: true },
});

class CountryRepository extends BaseRepository<ICountry> {
  constructor() {
    super(mongoose.model<ICountry>("Country", countrySchema));
  }

  // Get all countries
  getAllCountries = async (): Promise<ICountry[]> => {
    const countries: ICountry[] = await this.model.find({});
    return countries;
  };

  // Get a country by its name
  getCountryByName = async (countryName: string): Promise<ICountry | null> => {
    const country: ICountry | null = await this.model.findOne({
      name: countryName,
    });
    return country;
  };

  // Delete a country by its name
  deleteCountryByName = async (countryName: string): Promise<any> => {
    const result: mongo.DeleteResult = await this.model.deleteOne({
      name: countryName,
    });

    if (result.deletedCount === 0) {
      throw new Error(`Country with name ${countryName} not found.`);
    }
  };

  // Add a country to the collection
  createCountry = async (country: ICountry): Promise<Error | ICountry> => {
    const existingCountry: ICountry | null = await this.model.findOne({
      name: country.name,
    });

    if (existingCountry) {
      throw new Error(`Country '${country.name}' already exists in DB!`);
    }

    const result: ICountry = await this.model.create(country);
    return result;
  };

  seedCountry = async (country: ICountry): Promise<ICountry | undefined> => {
    const existingCountry: ICountry | null = await this.model.findOne({
      name: country.name,
    });

    if (existingCountry) {
      return;
    }

    const result: ICountry = await this.model.create(country);
    return result;
  };
}

export default CountryRepository;
