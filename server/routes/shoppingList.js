const { Router } = require('express')
const { getUserLists } = require('../controllers/shoppingListController')

const router = Router()

router.get('/', getUserLists)

module.exports = router
