import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../reducers/userReducer';
import './Navbar.css'

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((state) => state.user)

  const handleClick = () => {
    dispatch(removeUser())
    navigate('/login')
  }

  const navigateHome = () => {
    navigate('/')
  }

  return (
    <header className="navHeader">
      <div className="container">
        <h1 onClick={navigateHome}>Shopping list</h1>
        <nav>
          <div>
            <button onClick={handleClick}>
              {user ? 'Log out' : 'Log in'}
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
export default Navbar
