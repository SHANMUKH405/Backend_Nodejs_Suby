// server

const express = require("express");

const dotenv = require("dotenv");

const mongoose = require("mongoose");

const vendorRoutes = require("./routes/vendorRoutes");

const bodyParser = require("body-parser");
const firmRoutes = require("./routes/firmRoutes");
const productRoutes = require("./routes/productRoutes");
const cors = require("cors");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 4000;

dotenv.config();
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected Succesfully"))
  .catch((error) => console.log(error));

// path of this router is vendor and endpoint is register
// middleware to parse
app.use(bodyParser.json());
app.use("/vendor", vendorRoutes);
app.use("/firm", firmRoutes);
app.use("/product", productRoutes);

app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
  console.log(`server started and running at ${PORT}`);
});

// using this server creating, defining route

app.use("/", (req, res) => {
  res.send("HI this is shanus welcome to SUBY");
});
