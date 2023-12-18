import mongoose from "mongoose";
import fs from "fs/promises";
import { type ICountry, CountryModel } from "../models/countryModel";

class Database {
  mongoUrl: string;

  constructor(url: string) {
    this.mongoUrl = url;
  }

  connect = async (): Promise<void> => {
    try {
      await mongoose.connect(this.mongoUrl);
      console.log(`Connected to MongoDB Database ${mongoose.connection.host}`);
    } catch (error: any) {
      console.log(`MongoDB Database Error ${error}`);
    }
  };

  seedCountries = async (): Promise<void> => {
    try {
      // Read the country data from the JSON file
      const countryData: string = await fs.readFile(
        "src/utils/country.json",
        "utf-8",
      );
      const countries: ICountry[] | null = JSON.parse(countryData);

      countries?.forEach(async (country: ICountry) => {
        // Seed each country
        const existingCountry: ICountry | null = await CountryModel.findOne({
          name: country.name,
        });

        if (!existingCountry) await CountryModel.create(country);
      });

      console.log("Database seeded successfully");
    } catch (error: any) {
      console.error("Error seeding database:", error);
    }
  };
}

export default Database;
