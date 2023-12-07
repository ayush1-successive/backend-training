import { type Document } from "mongoose";

interface ICountry extends Document {
  name: string;
  code: string;
  continent: string;
  capital: string;
  population: number;
  language: string;
}

export default ICountry;
