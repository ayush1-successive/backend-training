const headerMiddleware = (headerName, headerValue) => {
  return (req, res, next) => {
    res.setHeader(headerName, headerValue);
    next();
  };
};

export { headerMiddleware };
