const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, uppercase: true, trim: true, require:true },
  qte: Number,
  price: Number,
  createdOn: { type: Date, default: Date.now },
  pic: String,
});
 
module.exports = Product = mongoose.model("product", productSchema);
