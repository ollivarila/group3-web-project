import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import shoppingListReducer from './reducers/shoppingListReducer'

const store = configureStore({
  reducer: {
    user: userReducer,
    shoppingLists: shoppingListReducer,
  },
})

export default store
