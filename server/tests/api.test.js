const supertest = require('supertest')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const app = require('../../app')
const User = require('../models/User')
const config = require('../../config')

const api = supertest(app)

const routes = {
  login: '/api/user/login',
  signup: '/api/user/signup',

}

describe('Api tests', () => {
  beforeAll(async () => {
    return mongoose.connect(config.MONGODB_URI)
  })

  describe('User signup/login', () => {
    test('Sign up works with correct details', async () => {
      const mockUser = {
        username: 'user',
        email: 'user@email.com',
        password: 'password',
      }

      const res = await api.post(routes.signup).send(mockUser)
      const { token } = res.body

      const user = jwt.decode(token)

      const userFromDB = await User.findOne({ username: mockUser.username })

      expect(res.body.token).toBeDefined()
      expect(userFromDB).not.toBe(null)
      expect(user).not.toBe(null)
      expect(user.id).toBeDefined()
    })

    test('User login works with correct details', async () => {
      const mockUser = {
        nameOrEmail: 'user',
        password: 'password',
      }
      const res = await api.post(routes.login).send(mockUser)

      const { token } = res.body

      const user = jwt.decode(token)

      expect(token).toBeDefined()
      expect(user.id).toBeDefined()
      expect(user.username).toBe(mockUser.nameOrEmail)
    })

    test('Login with incorrect details gives right response', async () => {
      const incorrectUser = {
        nameOrEmail: 'asdf',
        password: 'asdf',
      }

      const res = await api.post(routes.login).send(incorrectUser)

      expect(res.status).toBe(400)
      expect(res.body.error).toBe('Username or email incorrect')
    })
  })
  afterAll(async () => {
    await User.deleteMany({})

    return mongoose.connection.close()
  })
})
