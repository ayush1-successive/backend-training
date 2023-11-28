const headerConfig = {
  assignmentNo: 3,
  taskNo: 12,
};

const headerMiddleware = async (req, res, next) => {
  res.setHeader("Content-type", headerConfig);
  next();
};

export { headerMiddleware };
