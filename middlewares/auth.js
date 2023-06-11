const jwt = require("jsonwebtoken");
const UnathorizationError = require("../errors/unathorization-error");

module.exports = (req, _, next) => {
  const { authorization } = req.headers;
  const bearer = "Bearer ";

  if (!authorization || !authorization.startsWith(bearer)) {
    return next(new UnathorizationError("Пользователя не существует"));
  }

  const token = authorization.replace(bearer, "");
  let payload;

  try {
    payload = jwt.verify(token, "secret-key");
  } catch (err) {
    return next(new UnathorizationError("Пользователя не существует"));
  }

  req.user = payload;

  return next();
};
