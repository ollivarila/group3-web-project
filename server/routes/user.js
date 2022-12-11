const { Router } = require('express')
const {
  login, signup, deleteAllUsers, deleteUser,
} = require('../controllers/userController')
const authentication = require('../middleware/authentication')

const router = Router()

router.post('/login', login)

router.post('/signup', signup)

router.use(authentication)

router.delete('/deleteAll', deleteAllUsers) // deletes all users and lists

router.delete('/delete/:id', deleteUser) // deletes one user

module.exports = router
