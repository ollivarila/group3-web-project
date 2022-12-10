import { BACKEND_URL } from '../config'
import { authenticatedRequest } from '../utils/requestHelper'

const baseurl = BACKEND_URL + '/api/shoppingLists'

const getShoppingLists = async (userId) => {
  return authenticatedRequest(baseurl, 'get')
}

const updateItem = async (listId, item) => {
  const url = baseurl + `/item/${listId}`
  const data = {
    productId: item.id,
    ...item,
  }
  return authenticatedRequest(url, 'patch', data)
}

const deleteItem = async (listId, itemId) => {
  const url = baseurl + `/item/${listId}`
  const data = {
    productId: itemId,
  }
  console.log(url, data)
  return authenticatedRequest(url, 'delete', data)
}

const deleteShoppingList = async (listId) => {
  const url = baseurl + `/api/${listId}`
  return authenticatedRequest(url, 'delete')
}

const updateShoppingList = async (list) => {
  const url = baseurl + `/${list.id}`
  return authenticatedRequest(url, 'patch', list)
}

const createShoppingList = async (shoppingList) => {
  return authenticatedRequest(baseurl, 'post', shoppingList)
}

const service = {
  getShoppingLists,
  updateItem,
  deleteItem,
  deleteShoppingList,
  createShoppingList,
  updateShoppingList,
}

export default service
