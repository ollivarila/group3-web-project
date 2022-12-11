import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import { useDispatch, useSelector } from 'react-redux'
import { initializeShoppingLists } from './reducers/shoppingListReducer'
import NavbarWrapper from './components/NavbarWrapper'
import { initializeUser } from './reducers/userReducer'
import Product from './components/Product'

const App = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeShoppingLists())
    dispatch(initializeUser())
  }, [dispatch])

  return (
    <>
      <Routes>
        <Route path="/" element={<NavbarWrapper />}>
          <Route path="/" element={user ? <Home /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<div>404 not found</div>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
