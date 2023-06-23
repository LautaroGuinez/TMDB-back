const Token = require("../config/token");

function validateUser(req, res, next) {
  const token = req.cookies.token;
  console.log(token);
  if (!token) return res.sendStatus(401);
  const user = Token.validateToken(token);

  req.user = user;

  if (user) return next();
  res.sendStatus(401);
}

module.exports = validateUser;
