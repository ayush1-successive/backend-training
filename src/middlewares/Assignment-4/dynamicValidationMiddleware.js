import { validationConfig } from "../../utils/config.js";

const dynamicValidationMiddleware = (req, res, next) => {
  try {
    const param = req.url.slice(1);
    const validationResult = validationConfig[param].validate(req.body);

    if (validationResult.error) {
      console.log(validationResult.error);
      return res.status(400).send({
        status: false,
        message: "Bad request!",
        error: validationResult.error,
      });
    }

    console.log("Validation successful!");
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: false,
      message: "Internal server error!",
      error,
    });
  }
};

export { dynamicValidationMiddleware };
