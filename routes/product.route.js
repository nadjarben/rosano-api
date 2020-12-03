const express = require("express");
const router = express.Router();

//controllers
const {
  createProduct,
  listProducts,
  listProduct,
  deleteProduct,
  disableProduct,
  updateProduct
} = require("../controllers/product.controller");

router.post("/create", createProduct);
router.get("/products", listProducts)
router.get("/product/:product", listProduct)
router.delete("/:id", deleteProduct)
router.patch("/disable/:id", disableProduct)
router.put("/:id", updateProduct)


module.exports = router;
