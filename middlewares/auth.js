const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/unauthorizedError");

const { JWT_SECRET = "dev-secret" } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthorizedError("Authorization required");
  }

  const token = authorization.replace("Bearer ", "");

  let payload;

 catch (err) {
  throw new UnauthorizedError("Authorization required");
}

  req.user = payload;

  return next();
};
