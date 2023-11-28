import { data } from "./mockData.js";

const getDataController = async (req, res) => {
  res.json(data);
};

const addUserController = async (req, res) => {
  const newData = req.body;
  data.users.push(newData);
  res.json(data);
};

const addValidatedUserController = async (req, res) => {
  const newData = req.body;
  const validationResult = userSchema.validate(newData);

  if (validationResult.error) {
    return res.status(400).json({
      status: "Validation failed",
      error: validationResult.error.message,
    });
  }

  data.users.push(newData);
  res.json(data);
};

export { getDataController, addUserController, addValidatedUserController };
