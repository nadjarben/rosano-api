const Product = require("../models/product.schema");
const _ = require("lodash");

exports.createProduct = async (req, res) => {
  try {
    const {
      titleHe,
      titleFr,
      titleEn,
      category,
      descriptionHe,
      descriptionFr,
      descriptionEn,
      price,
      realPrice,
      image,
      liter,
      brand,
      available
    } = req.body;

    product = new Product({
      titleHe,
      titleFr,
      titleEn,
      category,
      descriptionHe,
      descriptionFr,
      descriptionEn,
      price,
      realPrice,
      image,
      liter,
      brand,
      available
    });
    await product.save((err, data) => {
      if (err) {
        console.log("Product error", err);
        return res.status(400).json({
          error: "Product error",
        });
      }

      return res.json({
        message:
          "Product saved !!!",
        data,
      });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    console.log(error)
  }
};

exports.listProducts = async (req, res) => {
  Product.find({}).exec((err, data) => {
    if (err) {
      return res.json({
        err,
      });
    }
    res.json(data);
  });
};

exports.listProduct = async (req, res) => {
  Product.findOne({
    id: req.params._id,
  }).exec((err, data) => {
    if (err) {
      return res.json({
        error: err,
      });
    }
    if (data) {
      return res.json(data);
    };
  });
};

exports.deleteProduct = async (req, res) => {
  const user = req.params.user;
  Card.find({ user })
    // .select("-photo")
    .exec((err, data) => {
      if (err) {
        return res.json({
          error: err,
        });
      }
      res.json(data);
    });
};

