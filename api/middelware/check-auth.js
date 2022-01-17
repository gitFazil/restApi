const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, process.env.secretKey);
    req.userData = decode;
    next();
  } catch (err) {
    res.status(400).json({ msg: "Auth failed", error: err });
  }
};
