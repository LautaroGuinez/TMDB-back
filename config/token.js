const jwt = require("jsonwebtoken");
const SECRET = "mondongo";
function generateToken(playload) {
  return jwt.sign({ user : playload }, SECRET , {expiresIn : "5d"});
}
function validateToken(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { generateToken, validateToken };