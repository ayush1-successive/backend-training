// PORT
const PORT = process.env.PORT || 3000;

const logMiddleware = async (req, res, next) => {
  console.log(`Method = ${req.method}`);
  console.log(`Current path = http://localhost:${PORT}${req.url}`);
  console.log(`Time = ${new Date().toUTCString()}`);

  next();
};

export { logMiddleware };
