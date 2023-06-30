const errorHandler = (err, _, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({ message: statusCode === 500 ? "Internal Server Error" : message });
  next();
};
module.exports = errorHandler;
