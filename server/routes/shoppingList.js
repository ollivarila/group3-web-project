const { Router } = require('express')
const {
  getUserLists, addShoppingLists, deleteShoppingList,
  getListbyId, updateShoppingList, getAll, formatDb, deleteItemFromList, editItemFromList,
} = require('../controllers/shoppingListController')
const authentication = require('../middleware/authentication')

const router = Router()

router.use(authentication)

router.get('/', getUserLists) // get all lists for current user

router.post('/', addShoppingLists) // create new list

router.get('/all', getAll) // get all lists from database !delete when not needed!

router.delete('/reset', formatDb)

router.patch('/item/:id', editItemFromList)

router.delete('/item/:id', deleteItemFromList)

router.get('/:id', getListbyId) // get list by id

router.delete('/:id', deleteShoppingList) // delete list by id

router.patch('/:id', updateShoppingList) // update one list

module.exports = router
