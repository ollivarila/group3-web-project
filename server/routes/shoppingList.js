const { Router } = require('express')
const {
  getUserLists, addShoppingLists, deleteShoppingList,
  getListbyId, updateShoppingList, getAll, formatDb,
  deleteItemFromList, editItemFromList, addItemsToList,
} = require('../controllers/shoppingListController')
const authentication = require('../middleware/authentication')

const router = Router()

router.use(authentication) // authenticate user

router.get('/', getUserLists) // get all lists for current user

router.post('/', addShoppingLists) // create new list

router.get('/all', getAll) // get all lists from database, for dev use only !delete when not needed!

router.delete('/reset', formatDb) // deletes all lists from db, for dev use only

router.patch('/:shListId/item/', addItemsToList) // adds x amount of items to an existing list

router.patch('/:shListId/item/:id', editItemFromList) // edits one item from specified list

router.delete('/:shListId/item/:id', deleteItemFromList) // deletes one item from specified list

router.get('/:shListId', getListbyId) // get one list by id

router.delete('/:shListId', deleteShoppingList) // delete list by id

router.patch('/:shListId', updateShoppingList) // update one list

module.exports = router
