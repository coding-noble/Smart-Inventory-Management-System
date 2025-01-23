const mongoose = require('../config/db');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: false },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
