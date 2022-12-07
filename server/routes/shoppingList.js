const { Router } = require('express')
const { getUserLists, addShoppingLists } = require('../controllers/shoppingListController')
const authentication = require('../middleware/authentication')

const router = Router()

// router.use(authentication)

router.get('/', getUserLists)

router.post('/', addShoppingLists)

module.exports = router
