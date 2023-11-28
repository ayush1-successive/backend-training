import joi from "joi";

const validationConfig = {
  registration: joi.object({
    name: joi.string().alphanum().min(3).max(30).required(),
    age: joi.number().integer().positive(),
    email: joi.string().email().required(),
    country: joi.string(),
  }),

  product: joi.object({
    name: joi.string().required(),
    quantity: joi.number().integer().positive().required(),
    price: joi.number().positive().required(),
  }),
};

export { validationConfig };
