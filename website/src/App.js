import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Home from './pages/Home/Home'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import NavbarWrapper from './components/NavbarWrapper'
import { updateUser } from './reducers/userReducer'
import ShoppingList from './components/ShoppingList'

const App = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(updateUser())
  }, [dispatch])

  return (
    <>
      <Routes>
        <Route path="/" element={<NavbarWrapper />}>
          <Route path="/" element={user ? <Home /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Shoppinglist" element={<ShoppingList />} />
          <Route path="*" element={<div>404 not found</div>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
