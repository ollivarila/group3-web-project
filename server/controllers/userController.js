const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const User = require('../models/User')

dotenv.config()

const generateJwt = (username, email, id) => {
  const userForToken = {
    username,
    email,
    id,
  }

  const token = jwt.sign(
    userForToken,
    process.env.JWT_SECRET,
    { expiresIn: 60 * 60 * 4 },
  )

  return token
}

const signup = async (req, res) => {
  const { email, username, password } = req.body

  try {
    const user = await User.signup(username, email, password)
    const token = generateJwt(user.username, user.email, user._id)
    res.send(token)
  } catch (error) {
    console.error('ERROR: could not signup: ', error.message)
    res.status(400).send({ error: error.message })
  }
}

const login = async (req, res) => {
  const { username = null, email = null, password } = req.body
  let nameOrEmail = username
  if (!username) {
    nameOrEmail = email
  }
  try {
    const user = await User.login(nameOrEmail, password)
    const token = generateJwt(user.username, user.email, user._id)
    res.send(token)
  } catch (error) {
    console.error('ERROR: could not login: ', error.message)
    res.status(400).send({ error: error.message })
  }
}

module.exports = {
  signup,
  login,
}
