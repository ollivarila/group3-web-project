const { Router } = require('express')
const {
  getUserLists, addShoppingLists, deleteShoppingList,
  getListbyId, updateShoppingList, getAll, formatDb, deleteItemFromList, editItemFromList, addItemsToList,
} = require('../controllers/shoppingListController')
const authentication = require('../middleware/authentication')

const router = Router()

router.use(authentication)

router.get('/', getUserLists) // get all lists for current user

router.post('/', addShoppingLists) // create new list

router.get('/all', getAll) // get all lists from database !delete when not needed!

router.delete('/reset', formatDb)

router.patch('/:shListId/item/', addItemsToList)

router.patch('/:shListId/item/:id', editItemFromList)

router.delete('/:shListId/item/:id', deleteItemFromList)

router.get('/:shListId', getListbyId) // get list by id

router.delete('/:shListId', deleteShoppingList) // delete list by id

router.patch('/:shListId', updateShoppingList) // update one list

module.exports = router
