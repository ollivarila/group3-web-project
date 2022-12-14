const dotenv = require('dotenv')

dotenv.config()

const PORT = process.env.NODE_ENV === 'production' ? 8080 : 3001

// eslint-disable-next-line operator-linebreak
const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT,
}
