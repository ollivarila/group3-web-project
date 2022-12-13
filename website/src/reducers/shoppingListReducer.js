import { createSlice } from '@reduxjs/toolkit'
import service from '../services/shoppingListService'
import { createNotification } from './notificationReducer'

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

      const listToAddTo = state.filter((list) => (list.id = listId)).pop()
      const { products } = listToAddTo
      listToAddTo.products = [...products, item]
      state = state.map((list) => {
        return list.id === listToAddTo.id ? listToAddTo : list
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
    dispatch(updateItemInList({ listId, item: updated }))
  }
}

export const removeItem = (listId, itemId) => {
  return async (dispatch) => {
    const deleted = await service.deleteItem(listId, itemId)
    if (!deleted) {
      dispatch(createNotification('Could not remove item', 'error'))
      return
    }

    dispatch(createNotification('Item removed', 'success'))
    dispatch(removeItemFromList({ listId, itemId }))
  }
}

export const updateList = (list, item) => {
  const newProductList = list.productList.map((e) => {
    if (!item.id) {
      return e
    }
    return e.id === item.id ? item : e
  })
  const copy = {
    ...list,
  }
  copy.productList = newProductList
  return copy
}

export const createItem = (listId, item) => {
  return async (dispatch) => {
    const created = await service.createItem(listId, item)
    if (!created) {
      dispatch(createNotification('Could not create item', 'error'))
      return
    }

    dispatch(createNotification('Item created', 'success'))
    dispatch(addItemToList({ listId, item: created }))
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
  }
}

export default shoppingListSlice.reducer
