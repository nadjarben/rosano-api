const Product = require('../models/product.schema')
const _ = require('lodash')

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
      available,
      percentage,
    } = req.body

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
      available,
      percentage,
    })
    await product.save((err, data) => {
      if (err) {
        console.log('Product error', err)
        return res.status(400).json({
          error: 'Product error',
        })
      }

      return res.json({
        message: 'Product saved !!!',
        data,
      })
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
    console.log(error)
  }
}

exports.listProducts = async (req, res) => {
  Product.find({}).exec((err, data) => {
    if (err) {
      return res.json({
        err,
      })
    }
    res.json(data)
  })
}

exports.listProduct = async (req, res) => {
  Product.findOne({
    id: req.params._id,
  }).exec((err, data) => {
    if (err) {
      return res.json({
        error: err,
      })
    }
    if (data) {
      return res.json(data)
    }
  })
}

exports.deleteProduct = async (req, res) => {
  const id = req.params.id
  Product.findById(id)
    .then((Product) => Product.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false + err }))
}

exports.disableProduct = async (req, res) => {
  const id = req.params.id
  Product.findById(id)
    .then((Product) =>
      Product.updateOne({ available: !Product.available }).then(() =>
        res.json({ success: true, Product })
      )
    )
    .catch((err) => res.status(404).json({ success: false + err }))
}

exports.updateProduct = async (req, res) => {
  const productId = req.params.id
  const {
    titleHe,
    titleEn,
    titleFr,
    category,
    descriptionEn,
    descriptionHe,
    descriptionFr,
    price,
    realPrice,
    image,
    liter,
    brand,
    available,
    percentage,
  } = req.body
  try {
    var newProduct = await Product.findById(productId).exec()
    newProduct.set({
      titleHe,
      titleEn,
      titleFr,
      category,
      descriptionHe,
      descriptionEn,
      descriptionFr,
      price,
      realPrice,
      image,
      liter,
      brand,
      available,
      percentage,
    })
    var result = await newProduct.save()
    return res.json(result)
  } catch (error) {
    console.log(error)
  }
}
