import joi from "joi";
import { data } from "../controllers/mockData";

function isUserIdUnique(userId: number, users: any[]): boolean {
  return !users.some((user) => user.userId === userId);
}

const userSchema = joi.object({
  userId: joi
    .number()
    .integer()
    .positive()
    .required()
    .custom((value, helpers) => {
      if (isUserIdUnique(value, data.users)) {
        return value;
      } else {
        return helpers.error("any.custom", {
          message: "userId must be unique",
        });
      }
    }),
  name: joi.string().alphanum().min(3).max(30).required(),
  age: joi.number().integer().positive(),
  email: joi.string().email().required(),
  country: joi.string(),
});

export { userSchema };
