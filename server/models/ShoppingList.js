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
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
  },

}, { timestamps: true })

shoppingListSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('ShoppingList', shoppingListSchema)
