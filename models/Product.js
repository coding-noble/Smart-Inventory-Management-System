const mongoose = require('../config/db');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  quantityAlert: { type: Number, required: true, default: 0 },
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: false },
}, {
  optimisticConcurrency: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
