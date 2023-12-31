import joi, { type ObjectSchema } from "joi";
import { userData, type IUser } from "../utils/mockData";

function isUserIdUnique(userId: number, users: IUser[]): boolean {
  return !users.some((user: IUser) => user.userId === userId);
}

const userSchema: ObjectSchema = joi.object({
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
