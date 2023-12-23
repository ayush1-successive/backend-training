import express from "express";
import CountryController from "../api/controllers/CountryController";

const router: express.Router = express.Router();
const countryController: CountryController = new CountryController();

router.get("/", countryController.homePage);

router.get("/get/:name", countryController.getCountry);

router.get("/getAll", countryController.getAllCountries);

router.get("/create", countryController.createCountry);

router.get("/remove/:name", countryController.deleteCountry);

export { router };
