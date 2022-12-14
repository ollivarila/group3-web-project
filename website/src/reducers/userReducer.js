/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import { initializeShoppingLists } from './shoppingListReducer'

const initialState = null
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser(state, action) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      return null
    },
  },
})

export const { setUser, removeUser } = userSlice.actions

export const updateUser = () => {
  return async (dispatch) => {
    const userJSON = localStorage.getItem('user')

    if (!userJSON) {
      return
    }
    const user = JSON.parse(userJSON)
    dispatch(setUser(user))
    dispatch(initializeShoppingLists())
  }
}

export default userSlice.reducer
