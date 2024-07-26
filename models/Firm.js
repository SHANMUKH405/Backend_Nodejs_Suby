const mongoose = require("mongoose");
const Vendor = require("./Vendor"); // Ensure the correct import
const Product = require("./Product");

const firmSchema = new mongoose.Schema({
  firmName: {
    type: String,
    required: true,
    unique: true,
  },
  area: {
    type: String,
    required: true,
  },
  category: {
    type: [
      {
        type: String,
        enum: ["veg", "non-veg"],
      },
    ],
  },
  region: {
    type: [
      {
        type: String,
        enum: ["south-indian", "north-indian", "chineese", "bakery"],
      },
    ],
  },
  offer: {
    type: String,
  },
  image: {
    type: String,
  },

  //connecting or linking in this way
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor", // Ensure the ref matches the model name exactly
  },

  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const Firm = mongoose.models.Firm || mongoose.model("Firm", firmSchema);

module.exports = Firm;
