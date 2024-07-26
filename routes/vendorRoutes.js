// to save vendor details in DB route is required

const vendorController = require("../controllers/vendorController");

const express = require("express");

const router = express.Router();

// these are api endpoints

router.post("/register", vendorController.vendorRegister);

router.post("/login", vendorController.vendorLogin);

router.get("/all-vendors", vendorController.getAllVendors);
router.get("/single-vendor/:id", vendorController.getVendorById);

module.exports = router;
