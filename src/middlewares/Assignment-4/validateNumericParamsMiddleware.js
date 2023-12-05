const isNumeric = (value) => {
  if (typeof value === "number") return true;

  if (typeof value === "string") {
    return !isNaN(value) && !isNaN(parseFloat(value));
  }
  return false;
};

const validateNumericParamsMiddleware = async (req, res, next) => {
  const { name, quantity, price } = req.query;

  if (!name || !quantity || !price) {
    return res.status(400).send({
      success: false,
      message: "Validation failed! All fields are required.",
    });
  }

  if (!isNumeric(quantity) || !isNumeric(price)) {
    return res.status(400).send({
      status: false,
      message: "Invalid input. Quantity and price must be numeric values.",
    });
  }

  console.log("Numeric validation successful!");
  next();

  try {
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      status: false,
      message: "Numeric validation failed!",
    });
  }
};

export { validateNumericParamsMiddleware };
