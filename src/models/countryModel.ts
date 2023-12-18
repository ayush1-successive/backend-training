import mongoose, { Schema, type Document } from "mongoose";

interface ICountry extends Document {
  name: string;
  code: string;
  capital: string;
  population: number;
  language: string;
}

const CountrySchema: Schema<ICountry> = new Schema<ICountry>(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    capital: { type: String, required: true },
    population: { type: Number, required: true },
    language: { type: String, required: true },
  },
  { timestamps: true },
);

const CountryModel: mongoose.Model<ICountry> = mongoose.model<ICountry>(
  "Country",
  CountrySchema,
);

export { type ICountry, CountryModel };
