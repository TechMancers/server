const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateToken = (data) => {
    // console.log(data)
    // console.log(process.env.JWT_SECRET)
    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "10min" });
};

module.exports = generateToken;