const mongoose = require('mongoose')

const PurchaseSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
    dropDups: true,
    index: true,
  },
  products: {
    type: [ProductSchema],
    required: true
  },
  finalPrice: {
    type: Number,
    required: true
  },
  userId: {
    type: String, 
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: true
  }
})

const PurchaseModel = mongoose.model('purchase', PurchaseSchema)

module.exports = PurchaseModel
