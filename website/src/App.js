import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import { useDispatch, useSelector } from 'react-redux'
import { initializeShoppingLists } from './reducers/shoppingListReducer'

const App = () => {
  const dispatch = useDispatch()
  const shoppingLists = useSelector((state) => state.shoppingLists)

  useEffect(() => {
    dispatch(initializeShoppingLists())
  }, [dispatch])
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<div>404 not found</div>} />
      </Routes>
    </div>
  )
}

export default App
