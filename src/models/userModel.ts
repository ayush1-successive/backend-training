import joi from "joi";
import { IUser, userData } from "../controllers/mockData";

function isUserIdUnique(userId: number, users: Array<IUser>) {
  return !users.some((user: IUser) => user.userId === userId);
}

const userSchema = joi.object({
  userId: joi
    .number()
    .integer()
    .positive()
    .required()
    .custom((value, helpers) => {
      if (isUserIdUnique(value, userData)) {
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
