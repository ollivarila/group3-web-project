import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userReducer, {
  initializeUser,
  removeUser,
  setUser,
} from '../userReducer'

const StoreTester = ({ sendStateToCallback, actionToDispatch, data }) => {
  const store = useSelector((store) => store)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actionToDispatch)
  }, [dispatch, actionToDispatch])

  sendStateToCallback(store)
  return <div>I am a component for redux testing</div>
}

export default StoreTester
