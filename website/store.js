import { configureStore } from '@reduxjs/toolkit'
import userReducer from './src/reducers/userReducer'
import shoppingListReducer from './src/reducers/shoppingListReducer'

const store = configureStore({
  reducer: {
    user: userReducer,
    shoppingLists: shoppingListReducer,
  },
})

export default store
