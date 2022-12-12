import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const currentShoppingListSlice = createSlice({
  name: 'current',
  initialState,
  reducers: {
    setCurrent(state, action) {
      const newCurrent = action.payload
      return { ...newCurrent }
    },
  },
})

export const { setCurrent } = currentShoppingListSlice.actions

export default currentShoppingListSlice.reducer
