import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  title: 'testi',
    products: [{
      name: 'maito',
      amount: 2,
      unit: 'dl',
      comment: 'valion',
      checked: false
  },
  {
  name: 'maito',
  amount: 2,
  unit: 'dl',
  comment: 'valion',
  checked: false
  }],
  comment: 'hyvä lista'
}

const currentShoppingListSlice = createSlice({
  name: 'current',
  initialState ,
  reducers: {
    setCurrent(state, action) {
      const newCurrent = action.payload
      return { ...newCurrent }
    },
  },
})

export const { setCurrent } = currentShoppingListSlice.actions

export default currentShoppingListSlice.reducer
