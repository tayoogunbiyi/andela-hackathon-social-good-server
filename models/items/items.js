const mongoose = require('mongoose');

const { Schema } = mongoose;

const itemSchema = new Schema({
    itemID: { type: mongoose.Types.ObjectId },
    userID: { type: mongoose.Types.ObjectId },
    name: { type: String },
    description: { type: String, default: '', },
    price: { type: Number, default: 0 },
    dateCreated: { type: Date, default: new Date() },
    dateExpiry: { type: Date },
    image: { type: String, default: '' },
    category: { type: String, default: '' },
    inventory: { tyoe: Number, default: 0 },
})

module.exports = mongoose.model('Item', itemSchema)