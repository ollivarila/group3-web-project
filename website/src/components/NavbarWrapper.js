import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './NavBar'
import Notification from './Notification'

const NavbarWrapper = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Notification />
    </>
  )
}

export default NavbarWrapper
