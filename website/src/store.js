import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import shoppingListReducer from './reducers/shoppingListReducer'
import currentShoppingListReducer from './reducers/currentShoppingListReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    user: userReducer,
    shoppingLists: shoppingListReducer,
    current: currentShoppingListReducer,
    notification: notificationReducer,
  },
})

export default store
