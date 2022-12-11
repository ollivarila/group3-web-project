import React from 'react'
import { Outlet } from 'react-router-dom'

const NavbarWrapper = () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default NavbarWrapper
