const mongoose = require('mongoose')
const config = require('../config')

const startUp = async () => {
  mongoose.connect(config.MONGODB_URI)
    .then(() => console.log('Connected to mongodb'))
    .catch(err => console.error('Error connecting to mongodb: ', err.message))
}

module.exports = startUp
