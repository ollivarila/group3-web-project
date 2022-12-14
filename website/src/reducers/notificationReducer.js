import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  timeout: null,
  type: 'success',
}

const notifSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
  },
})

const { setNotification } = notifSlice.actions

export const createNotification = (message, type = 'success') => {
  return (dispatch, getState) => {
    const { timeout } = getState()

    if (timeout) {
      clearTimeout(timeout)
    }

    const newTimeout = setTimeout(() => {
      dispatch(setNotification(initialState))
    }, 5000)

    dispatch(setNotification({ message, timeout: newTimeout, type }))
  }
}

export default notifSlice.reducer
