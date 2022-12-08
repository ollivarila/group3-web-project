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

productSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})
module.exports = mongoose.model('ShoppingItem', productSchema)
