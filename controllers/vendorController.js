// logic of schema

const Vendor = require("../models/Vendor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

// for using env files things same method first importing and consfiging and using with process.env.

const secretKey = process.env.WhatIsYourName;

const vendorRegister = async (req, res) => {
  const { username, email, password } = req.body;
  // to convert email to token jwtoken and password bcrypting

  try {
    const vendorEmail = await Vendor.findOne({ email });

    if (vendorEmail) {
      return res.status(400).json("Email already taken");
    }
    const hashedPasssword = await bcrypt.hash(password, 10);

    // to store this instances in DB
    const newVendor = new Vendor({
      username,
      email,
      password: hashedPasssword,
    });
    await newVendor.save();

    res.status(201).json({ message: "Vendor registered succesfully" });
    console.log("registerd");
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal server error" });
  }
};

// vendor login schema logic

const vendorLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const vendor = await Vendor.findOne({ email });

    if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
      return res.status(401).json({ error: "Invalid username or password " });
    }

    const token = jwt.sign({ vendorId: vendor._id }, secretKey, {
      expiresIn: "1h",
    });

    res.status(200).json({ success: "Login Succesful", token });
    console.log(email, "this is token", token);
    console.log(email);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal sever error" });
  }
};

// api to call all vendors

const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate("firm");
    res.json({ vendors });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// function to get individual id's by vendor Id

const getVendorById = async (req, res) => {
  const vendorId = req.params.id;

  try {
    const vendor = await Vendor.findById(vendorId).populate("firm");

    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found " });
    }
    res.status(200).json({ vendor });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal Server error" });
  }
};
module.exports = { vendorRegister, vendorLogin, getAllVendors, getVendorById };
