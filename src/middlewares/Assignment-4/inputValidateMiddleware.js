const isStrongPassword = (value) => {
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}"
  );
  return strongRegex.test(value);
};

const correctEmailFormat = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

const inputValidateMiddleware = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Validation failed! All fields are required.",
      });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).send({
        status: false,
        message:
          "Weak password! It should have at least 8 characters, including uppercase, lowercase, and numbers",
      });
    }

    if (!correctEmailFormat(email)) {
      return res.status(400).send({
        status: false,
        message: "Incorrect email format!",
      });
    }

    console.log("Validation successful!");
    next();
  } catch (error) {
    console.log(error);

    return res.status(400).send({
      status: false,
      error,
      message: "Validation error!",
    });
  }
};

export { inputValidateMiddleware };
