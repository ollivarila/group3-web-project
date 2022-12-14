const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authentication = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' })
  }

  const token = authorization.split(' ')[1]

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(id)
    if (!user) {
      res.status(400).send({ error: 'user not found' })
    }
    req.user = user
    req.id = user._id
    next()
  } catch (error) {
    res.status(401).json({ error: 'Request is not authorized' })
  }
}

module.exports = authentication
