import { createSlice } from '@reduxjs/toolkit'

const initialState = null
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser(state, action) {
      return null
    },
  },
})

export const { setUser, removeUser } = userSlice.actions

export const initializeUser = () => {
  return (dispatch) => {
    const userJSON = localStorage.getItem('user')

    if (!userJSON) {
      return
    }

    const user = JSON.parse(userJSON)
    dispatch(setUser(user))
  }
}

export default userSlice.reducer
