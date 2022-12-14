/* eslint-disable no-unused-vars */
import { BACKEND_URL } from '../config'
import { authenticatedRequest } from '../utils/requestHelper'

const baseurl = `${BACKEND_URL}/api/shoppingLists`

const getShoppingLists = async (userId) => {
  return authenticatedRequest(baseurl, 'get').catch((err) => null)
}

const updateItem = async (listId, item) => {
  const url = `${baseurl}/${listId}/item/${item.id}`
  return authenticatedRequest(url, 'patch', item).catch((err) => null)
}

const deleteItem = async (listId, itemId) => {
  const url = `${baseurl}/${listId}/item/${itemId}`
  return authenticatedRequest(url, 'delete').catch((err) => null)
}

const deleteShoppingList = async (listId) => {
  const url = `${baseurl}/${listId}`
  return authenticatedRequest(url, 'delete').catch((err) => null)
}

const updateShoppingList = async (list) => {
  const url = `${baseurl}/${list.id}`
  return authenticatedRequest(url, 'patch', list).catch((err) => null)
}

const createShoppingList = async (shoppingList) => {
  return authenticatedRequest(baseurl, 'post', shoppingList).catch(
    (err) => null,
  )
}

const createItem = async (listId, item) => {
  const url = `${baseurl}/${listId}/item`
  return authenticatedRequest(url, 'patch', item).catch((err) => null)
}

const service = {
  getShoppingLists,
  updateItem,
  deleteItem,
  deleteShoppingList,
  createShoppingList,
  updateShoppingList,
  createItem,
}

export default service
