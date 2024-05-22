const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  photo: {
    type: Buffer,
    required: false
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

const ProductModel = mongoose.model('product', ProductSchema)

module.exports = {
  ProductModel,
  ProductSchema,
}
