const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const User = require('../models/User')
const ShoppingList = require('../models/ShoppingList')

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
    res.send({ token })
  } catch (error) {
    console.error('ERROR: could not signup: ', error.message)
    res.status(400).send({ error: error.message })
  }
}

const login = async (req, res) => {
  const {
    nameOrEmail = null, username = null, email = null, password = null,
  } = req.body
  const credentials = nameOrEmail || username || email

  try {
    const user = await User.login(credentials, password)
    const token = generateJwt(user.username, user.email, user._id)
    res.send({ token })
  } catch (error) {
    console.error('ERROR: could not login: ', error.message)
    res.status(400).send({ error: error.message })
  }
}

/**
 * deletes user from database and also deletes that users lists from database
 * @route DELETE api/user/{userId}
 * @body users username or email and password
 * example:
{
    "email": "mikko@merja.fi",
    "password": "salasana"
}
 * @param {*} req
 * @param {*} res
 */
const deleteUser = async (req, res) => {
  const {
    nameOrEmail = null, username = null, email = null, password = null,
  } = req.body
  const credentials = nameOrEmail || username || email

  try {
    const user = await User.delete(credentials, password, req.id)
    await ShoppingList.deleteMany({ owner: user.id })
    res.status(200).send(user)
  } catch (error) {
    console.error('ERROR: could not delete user: ', error.message)
    res.status(400).send({ error: error.message })
  }
}

/**
 * delete all users and lists from database
 * @route DELETE api/user/deleteAll
 * @param {*} req
 * @param {*} res
 */
const deleteAllUsersAndLists = async (req, res) => {
  try {
    await User.deleteMany({})
    await ShoppingList.deleteMany({})
    res.status(200).end()
  } catch (error) {
    res.status(400).send(error)
  }
}

module.exports = {
  signup,
  login,
  deleteUser,
  deleteAllUsersAndLists,
}
