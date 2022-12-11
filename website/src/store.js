import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import shoppingListReducer from './reducers/shoppingListReducer'
import currentShoppingListReducer from './reducers/currentShoppingListReducer'

const store = configureStore({
  reducer: {
    user: userReducer,
    shoppingLists: shoppingListReducer,
    current: currentShoppingListReducer,
  },
})

export default store
