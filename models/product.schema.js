const mongoose = require("mongoose");
//const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
  titleHe: String,
  titleFr: String,
  titleEn: String,
  category: String,
  descriptionHe: String,
  descriptionFr: String,
  descriptionEn: String,
  price: Number,
  realPrice: Number,
  image: String,
  liter: String
});


module.exports = mongoose.model("Product", productSchema);
