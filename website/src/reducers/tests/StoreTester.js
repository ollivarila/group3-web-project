import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const StoreTester = ({ sendStateToCallback, actionToDispatch }) => {
  const state = useSelector((store) => store)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actionToDispatch)
  }, [dispatch, actionToDispatch])

  sendStateToCallback(state)
  return <div>I am a component for redux testing</div>
}

export default StoreTester
