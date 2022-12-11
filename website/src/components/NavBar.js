import React from 'react'
import {Navigate } from 'react-router-dom'

import './Navbar.css'

const Navbar = () => {

  const toLogin = () => {
    return ( 
      <Navigate to='/signup' />
    )
  }
  const handleClick = () => {
  //    logout()
        toLogin()
  }

  return (
    <header>
      <div className="container">
        <h1>Shopping list</h1>
        <nav>
          <div>
            <button onClick={handleClick}>Log out</button>
          </div>
        </nav>
      </div>
    </header>
  )
}
export default Navbar;
