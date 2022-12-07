const mongoose = require('mongoose')
const ShoppingItem = require('./ShoppingItem')

const { Schema } = mongoose

const shoppingListSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  productList: {
    type: [ShoppingItem.schema],
  },
  comment: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
  },

}, { timestamps: true })

module.exports = mongoose.model('ShoppingList', shoppingListSchema)
