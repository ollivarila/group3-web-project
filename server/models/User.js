/* eslint-disable func-names */
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
})

userSchema.statics.signup = async function (username, email, password) {
  // validation
  if (!email || !password || !username) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  /* Maybe implement later
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }
  */

  const emailExists = await this.findOne({ email })
  const usernameExists = await this.findOne({ username })

  if (emailExists) {
    throw Error('Email already in use')
  }

  if (usernameExists) {
    throw Error('Username already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, username, password: hash })

  return user
}

const validateNameOrEmail = async function (model, nameOrEmail) {
  const name = await model.findOne({ name: nameOrEmail })

  if (name) {
    return name
  }

  const email = await model.findOne({ email: nameOrEmail })
  if (email) {
    return email
  }

  return null
}

// static login method
userSchema.statics.login = async function (nameOrEmail, password) {
  if (!nameOrEmail || !password) {
    throw Error('All fields must be filled')
  }

  const user = await validateNameOrEmail(this, nameOrEmail)

  if (!user) {
    throw new Error('Username or email incorrect')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

userSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('User', userSchema)
