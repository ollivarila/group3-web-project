const supertest = require('supertest')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const app = require('../../app')
const User = require('../models/User')
const config = require('../../config')
const ShoppingList = require('../models/ShoppingList')

const api = supertest(app)

const routes = {
  login: '/api/user/login',
  signup: '/api/user/signup',
  shoppingList: '/api/shoppingLists',
}

describe('Api tests', () => {
  let savedToken = null
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
      savedToken = token
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

  describe('Shoppinglist', () => {
    let auth
    let listId
    beforeAll(() => {
      auth = { Authorization: `bearer ${savedToken}` }
    })
    test('Authentication is required', async () => {
      const res = await api.get(routes.shoppingList)
      expect(res.status).toBe(401)
      expect(res.body.error).toBe('Authorization token required')
    })

    test('Shopping list creation', async () => {
      const mockList = {
        title: 'mockTitle',
        products: [
          {
            name: 'mockItem',
            amount: 5,
            comment: 'mockComment',
          },
        ],
        comment: 'mockComment2',
      }

      const res = await api.post(routes.shoppingList).set(auth).send(mockList)

      listId = res.body.id

      const list = await ShoppingList.findOne({ title: 'mockTitle' })

      expect(res.body.title).toBeDefined()
      expect(res.body.title).toBe(mockList.title)
      expect(list).not.toBe(null)
    })
    test('Get user lists', async () => {
      const res = await api.get(routes.shoppingList).set(auth)
      const lists = res.body
      expect(lists.length).toBe(1)
      expect(lists[0].comment).toBe('mockComment2')
    })

    test('Get list by id', async () => {
      const res = await api.get(`${routes.shoppingList}/${listId}`).set(auth)
      const list = res.body

      console.log(list)
      expect(list.id).toBe(listId)
      expect(list.title).toBe('mockTitle')
    })

    test('Update list', async () => {
      const updateThis = {
        title: 'newTitle',
        products: [
          {
            name: 'item2',
            amount: '2',
          },
        ],
      }

      const res = await api.patch(`${routes.shoppingList}/${listId}`).set(auth)
        .send(updateThis)

      const list = res.body

      expect(list.products.length).toBe(1)
      expect(list.title).toBe(updateThis.title)
      expect(list.products[0].name).toBe('item2')
    })

    test('Delete list', async () => {
      const res = await api.delete(`${routes.shoppingList}/${listId}`).set(auth)

      const list = res.body

      const listFromDB = await ShoppingList.findById(listId)
      console.log(list)
      expect(list.id).toBe(listId)
      expect(listFromDB).toBe(null)
    })

    describe('Without auth', () => {
      let id
      beforeAll(async () => {
        const res = await api.post(routes.shoppingList).set(auth).send({
          title: 'mockTitle',
          products: [
            {
              name: 'mockItem',
              amount: 5,
              comment: 'mockComment',
            },
          ],
          comment: 'mockComment2',
        })
        id = res.body.id
      })

      const tests = [
        {
          method: 'get',
        },
        {
          method: 'post',
        },
        {
          method: 'get',
          id,
        },
        {
          method: 'delete',
          id,
        },
        {
          method: 'patch',
          id,
        },
      ]

      test('Correct response without auth on all routes that require auth', async () => {
        await Promise.all(tests.map(async test => {
          const hasId = test.id ? test.id : ''
          const url = `${routes.shoppingList}/${hasId}`
          const res = await api[test.method](url)

          expect(res.body.error).toBe('Authorization token required')
        }))
      })
    })
  })

  afterAll(async () => {
    await User.deleteMany({})

    return mongoose.connection.close()
  })
})
