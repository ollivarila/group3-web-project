import React from 'react'
import { useNavigate } from 'react-router-dom'

import './Navbar.css'

const Navbar = () => {
  const navigate = useNavigate()

  const handleClick = () => {
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
            <button onClick={handleClick}>Log out</button>
          </div>
        </nav>
      </div>
    </header>
  )
}
export default Navbar
