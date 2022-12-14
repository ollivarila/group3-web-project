// This file is for exporting all of the pages that we want to be routed
import React from 'react'
import Login from './Login/Login'
import Signup from './Signup/Signup'

const pages = [
  {
    element: <Login/>,
    route: '/login',
    title: 'Login',
  },
  {
    element: <Signup/>,
    route: '/signup',
    title: 'Signup',
  },
]

export default pages
