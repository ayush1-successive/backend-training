import joi from "joi";
import type ICountry from "../interfaces/ICountry";

const countryValidationSchema: joi.Schema<ICountry> = joi.object({
  name: joi.string().max(50).required(),
  code: joi.string().max(5).required(),
  continent: joi.string().max(20).required(),
  capital: joi.string().required(),
  population: joi.number().integer().positive().required(),
  language: joi.string().required(),
});

export { countryValidationSchema };
