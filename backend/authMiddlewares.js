const jwt = require("jsonwebtoken");
const { jwt_secret } = require("./config");

function generateUserToken(payload) {
  return jwt.sign({ username: payload }, jwt_secret);
}

function verifyUserToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Invalid jwt token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwt_secret);

    req.user = decoded.username;

    next();
  } catch (err) {
    return res.status(403).json({ message: "Error verifying jwt" });
  }
}

module.exports = {
  generateUserToken,
  verifyUserToken,
};
