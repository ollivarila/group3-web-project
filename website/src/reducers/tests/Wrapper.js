import React from 'react'
import { Provider } from 'react-redux'

const Wrapper = ({ store, children }) => {
  return (
    <>
      <Provider store={store}>{children}</Provider>
    </>
  )
}

export default Wrapper
