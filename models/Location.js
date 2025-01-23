const mongoose = require('../config/db');

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  details: { type: String },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

const Location = mongoose.model('Location', locationSchema);
module.exports = Location;
