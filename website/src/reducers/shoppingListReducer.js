import { createSlice } from '@reduxjs/toolkit'
import service from '../services/shoppingListService'
import { createNotification } from './notificationReducer'
import { setCurrent } from './currentShoppingListReducer'
import { useEffect } from 'react'

const initialState = []

const shoppingListSlice = createSlice({
  name: 'shoppingLists',
  initialState,
  reducers: {
    setShoppingLists(state, action) {
      return action.payload
    },
    appendShoppingList(state, action) {
      state.push(action.payload)
    },
    updateItemInList(state, action) {
      const { listId, item } = action.payload

      const shList = state
        .filter((shoppingList) => shoppingList.id === listId)
        .pop()

      const productsToUpdate = shList.products.map((listItem) => {
        return listItem.id === item.id ? item : listItem
      })

      shList.products = productsToUpdate
      state = state.map((list) => {
        return list.id === shList.id ? shList : list
      })
    },
    removeItemFromList(state, action) {
      const { listId, itemId } = action.payload

      const removeFromThis = state.filter((e) => e.id === listId).pop()

      const newProductList = removeFromThis.products.filter(
        (e) => e.id !== itemId,
      )

      removeFromThis.products = newProductList

      state = state.map((list) => {
        return list.id === removeFromThis.id ? removeFromThis : list
      })
    },
    removeShoppingList(state, action) {
      const listId = action.payload
      return state.filter((e) => e.id !== listId)
    },
    addItemToList(state, action) {
      const { listId, item } = action.payload

      const listToAddTo = state.filter((list) => list.id === listId).pop()

      const { products } = listToAddTo

      listToAddTo.products = [...products, item]

      return state.map((list) => {
        return list.id === listToAddTo.id ? listToAddTo : list
      })
    },
    updateShoppingList(state, action) {
      const { id } = action.payload
      return state.map((list) => {
        return list.id === id ? action.payload : list
      })
    },
  },
})

export const {
  setShoppingLists,
  appendShoppingList,
  updateItemInList,
  removeItemFromList,
  removeShoppingList,
  addItemToList,
  updateShoppingList,
} = shoppingListSlice.actions

// Gets all shopping lists if a user is logged in, they are set in the state
export const initializeShoppingLists = () => {
  return async (dispatch, getState) => {
    const { user } = getState()
    if (!user) {
      return
    }

    const shoppingLists = await service.getShoppingLists(user.id)

    if (!shoppingLists) {
      return
    }

    dispatch(setShoppingLists(shoppingLists))


    dispatch(setCurrent(shoppingLists[0]))
    
    
  }
}

// Create new shopping list
// Throws error if creation fails
export const createShoppingList = (shoppingList) => {
  return async (dispatch) => {
    const createdList = await service.createShoppingList(shoppingList)

    if (!createdList) {
      dispatch(createNotification('Could not create shopping list', 'error'))
      return
    }
    dispatch(
      createNotification(
        `Created new shopping list: ${createdList.title}`,
        'success',
      ),
    )
    dispatch(appendShoppingList(createdList))
    dispatch(setCurrent(createdList))
  }
}

export const updateItem = (listId, item) => {
  return async (dispatch) => {
    const updated = await service.updateItem(listId, item)
    if (!updated) {
      dispatch(createNotification('Could not update shopping list', 'error'))
      return
    }

    dispatch(createNotification('Item updated', 'success'))
    dispatch(updateShoppingList(updated))
    dispatch(setCurrent(updated))
  }
}

export const removeItem = (listId, itemId) => {
  return async (dispatch, getState) => {
    const deleted = await service.deleteItem(listId, itemId)
    if (!deleted) {
      dispatch(createNotification('Could not remove item', 'error'))
      return
    }
    const { shoppingLists } = getState()
    const shList = shoppingLists.filter((list) => list.id === listId).pop()

    const copy = { ...shList }
    const { products } = copy

    copy.products = products.filter((p) => p.id !== itemId)

    dispatch(createNotification('Item removed', 'success'))
    dispatch(removeItemFromList({ listId, itemId }))
    dispatch(setCurrent(copy))
  }
}

export const updateList = (list, key, value) => {
  return async (dispatch) => {
    const copy = {
      ...list,
    }
    copy[key] = value
    const newList = await service.updateShoppingList(copy)
    dispatch(updateShoppingList(newList))
    dispatch(setCurrent(newList))
  }
}

export const createItem = (listId, item) => {
  return async (dispatch) => {
    const created = await service.createItem(listId, item)
    if (!created) {
      dispatch(createNotification('Could not create item', 'error'))
      return
    }

    dispatch(createNotification('Item created', 'success'))
    dispatch(updateShoppingList(created))
    dispatch(setCurrent(created))
  }
}

export const deleteList = (listId) => {
  return async (dispatch) => {
    const deleted = await service.deleteShoppingList(listId)

    if (!deleted) {
      dispatch(createNotification('Could not delete list', 'error'))
    }

    dispatch(createNotification('List deleted', 'success'))
    dispatch(removeShoppingList(listId))
    dispatch(setCurrent(null))
  }
}

export default shoppingListSlice.reducer
