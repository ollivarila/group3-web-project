import { createSlice } from '@reduxjs/toolkit'
import service from '../services/shoppingListService'

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

      const newItemList = shList.productList.map((listItem) => {
        return listItem.id === item.id ? item : listItem
      })

      shList.productList = newItemList
      state = state.map((list) => {
        return list.id === shList.id ? shList : list
      })
    },
    removeItemFromList(state, action) {
      const { listId, itemId } = action.payload

      const removeFromThis = state.filter((e) => e.id === listId).pop()

      const newProductList = removeFromThis.productList.filter(
        (e) => e.id !== itemId
      )

      removeFromThis.productList = newProductList

      state = state.map((list) => {
        return list.id === removeFromThis.id ? removeFromThis : list
      })
    },
    removeShoppingList(state, action) {
      const listId = action.payload
      return state.filter((e) => e.id !== listId)
    },
  },
})

export const {
  setShoppingLists,
  appendShoppingList,
  updateItemInList,
  removeItemFromList,
  removeShoppingList,
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

    dispatch(appendShoppingList(createdList))
  }
}

export const updateItem = (listId, item) => {
  return async (dispatch) => {
    if (!item.id) throw new Error('Item id is missing')

    const updated = await service.updateItem(listId, item)
    dispatch(updateItemInList({ listId, item: updated }))
  }
}

export const removeItem = (listId, itemId) => {
  return async (dispatch) => {
    await service.deleteItem(listId, itemId)

    dispatch(removeItemFromList({ listId, itemId }))
  }
}

const updateList = (list, item) => {
  const newProductList = list.productList.map((e) => {
    if(!item.id){
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

export const createItem = (list, item) => {
  return async (dispatch) => {
    const updatedList = updateList(list, item)
    const updated = await service.updateShoppingList(updatedList)
    dispatch(removeShoppingList(list))
    dispatch(appendShoppingList(updated))
  }
}

export default shoppingListSlice.reducer
