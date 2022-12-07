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
  // Add ref to shoppingList
})

module.exports = mongoose.model('ShoppingItem', productSchema)
