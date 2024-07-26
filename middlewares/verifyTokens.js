// middle ware to check token
const Vendor = require("../models/Vendor");

const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

dotenv.config();

const secretKey = process.env.WhatIsYourName;

// response is okay then next will allow furthur operations otherwise not
const verifyToken = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ error: "token is required" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    const vendor = await Vendor.findById(decoded.vendorId);

    if (!vendor) {
      return res.status(404).json({ error: "vendor not found" });
    }

    req.vendorId = vendor._id;

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Invalid Token" });
  }
};
module.exports = verifyToken;
