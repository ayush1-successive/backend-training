import fs from "fs/promises";
import type ICountry from "../interfaces/ICountry";
import CountryService from "../services/CountryService";

import { type Request, type Response } from "express";
import { countryValidationSchema } from "../validators/CountryValidator";

class CountryController {
  countryService: CountryService;

  constructor() {
    this.countryService = new CountryService();
  }

  seedCountries = async (): Promise<void> => {
    const countryData = await fs.readFile("src/utils/country.json", "utf-8");
    const countries = JSON.parse(countryData);

    await this.countryService.seedCountries(countries);
  };

  homePage = (req: Request, res: Response): void => {
    res.status(200).send({
      status: true,
      message: "Country HomePage",
    });
  };

  getCountry = async (req: Request, res: Response): Promise<void> => {
    try {
      const country = await this.countryService.getCountry(req.params.name);

      if (!country) {
        res.status(404).send({
          status: false,
          message: "Country not found!",
        });
        return;
      }

      res.status(200).send({
        status: true,
        message: "Country found!",
        country,
      });
    } catch (error) {
      console.log(error);

      res.status(500).send({
        status: false,
        message: "Internal server error!",
        error,
      });
    }
  };

  getAllCountries = async (req: Request, res: Response): Promise<void> => {
    try {
      const countries = await this.countryService.getAllCountries();

      res.status(200).send({
        status: true,
        message: "Country list",
        countries,
      });
    } catch (error) {
      console.log("Error access country list!");

      res.status(500).send({
        status: false,
        message: "Internal server error!",
        error,
      });
    }
  };

  createCountry = async (req: Request, res: Response): Promise<void> => {
    try {
      const country: ICountry = req.body;

      const validationResult = countryValidationSchema.validate(country, {
        abortEarly: false,
      });

      if (validationResult.error) {
        res.status(400).json({
          status: "Country validation failed!",
          error: validationResult.error,
        });
        return;
      }

      await this.countryService.createCountry(country);

      res.status(201).send({
        status: true,
        message: "Country added successfully",
        country,
      });
    } catch (error: any) {
      res.status(500).send({
        status: false,
        message: "Failed to add country",
        error: error.message,
      });
    }
  };

  deleteCountry = async (req: Request, res: Response): Promise<void> => {
    try {
      const countryName = req.params.name;
      await this.countryService.deleteCountry(countryName);

      res.status(200).send({
        status: true,
        message: `${countryName} successfully deleted`,
      });
    } catch (error: any) {
      console.log(error);

      res.status(500).send({
        status: false,
        message: `Error deleting country!`,
        error,
      });
    }
  };
}

export default CountryController;
