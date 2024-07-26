const express = require("express");

const productController = require("../controllers/productController");
const { route } = require("./vendorRoutes");

const router = express.Router();

router.post("/add-product/:firmId", productController.addProduct);

router.get("./:firmId/products", productController.getProductByFirm);

// image getting
router.get("uploads/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.headersSent("Content-type", "image/jpeg");
  res.sendFile(path.join(__dirname, "..", "uploads", imageName));
});

router.delete("/:productId", productController.deleteProductById);

module.exports = router;
