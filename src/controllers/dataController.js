import { data } from "./mockData.js";

const getDataController = async (req, res) => {
  res.json(data);
};

const addUserController = async (req, res) => {
  const newData = req.body;
  data.users.push(newData);
  res.json(data);
};

export { getDataController, addUserController };
