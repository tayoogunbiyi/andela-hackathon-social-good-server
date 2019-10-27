const mongoose = require('mongoose');

const { Schema } = mongoose;

const itemSchema = Schema({
  itemID: { type: mongoose.Types.ObjectId },
  userID: { type: mongoose.Types.ObjectId },
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  dateCreated: { type: Date, default: new Date() },
  dateExpiry: { type: Date },
  image: { type: String, default: '' },
  category: { type: String },
  inventory: { tyoe: Number },
});

module.exports = mongoose.model('Item', itemSchema);
