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

      const newItemList = shList.itemList.map((listItem) => {
        return listItem.id === item.id ? item : listItem
      })

      shList.itemList = newItemList

      return state.map((list) => {
        return list.id === shList.id ? shList : list
      })
    },
    removeItemFromList(state, action) {
      const { list, item } = action.payload

      const removeFromThis = state.filter((e) => e.id === list.id).pop()

      const newItemList = removeFromThis.itemList.filter(
        (e) => e.id !== item.id
      )

      removeFromThis.itemList = newItemList

      return state.map((list) => {
        return list.id === removeFromThis.id ? removeFromThis : list
      })
    },
  },
})

export const {
  setShoppingLists,
  appendShoppingList,
  updateItemInList,
  removeItemFromList,
} = shoppingListSlice.actions

// Gets all shopping lists if a user is logged in, they are set in the state
export const initializeShoppingLists = () => {
  return async (dispatch, getState) => {
    const { user } = getState()
    if (!user) return

    const shoppingLists = await service.getShoppingLists(user.id)

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

    const updated = await service.updateItem(item)

    dispatch(updateItemInList(listId, updated))
  }
}

export const removeItem = (list, item) => {
  return async (dispatch) => {
    await service.deleteItem(item.id)

    dispatch(removeItemFromList(list, item))
  }
}

export default shoppingListSlice.reducer
