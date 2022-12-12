import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './NavBar'

const NavbarWrapper = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default NavbarWrapper
