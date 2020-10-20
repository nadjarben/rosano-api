const express = require("express");
const router = express.Router();

//controllers
const {
  createProduct,
  listProducts,
  listProduct,
  deleteProduct
} = require("../controllers/product.controller");

router.post("/create", createProduct);
router.get("/products", listProducts)
router.get("/product/:product", listProduct)
router.delete("/:product", deleteProduct)


module.exports = router;
