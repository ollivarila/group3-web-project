const mongoose = require('mongoose')

const { Schema } = mongoose
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
  },
  unit: {
    type: String,
  },
  comment: {
    type: String,
  },
})

const shoppingListSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  productList: [productSchema],
  comment: {
    type: String,
  },

}, { timestamps: true })

module.exports = mongoose.model('ShoppingList', shoppingListSchema)
