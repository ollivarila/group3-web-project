import React from 'react'
import './Navbar.css'

const Navbar = () => {
  const handleClick = () => {
  //    logout()
  
  }

  return (
    <header>
      <div className="container">
        <h1>Shopping list</h1>
        <nav>
          <div>
            <button onClick={handleClick}><a href='./login'>Log out</a></button>
          </div>
        </nav>
      </div>
    </header>
  )
}
export default Navbar;
