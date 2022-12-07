import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useState } from 'react';

const sendLoginRequest = async (user) => {
  const url = `${BACKEND_URL}/api/user/login`
  console.log(user)
  return axios.post(url, user).then(res => res.data).catch(err => {
    console.error('ERROR: error logging in: ', err.message)
    return null
  })
}

// Send login request and save token to localstorage on success
// Token is saved with key token and decoded token is saved with key user

export const login = async (user) => {
  const token = await sendLoginRequest(user)

  console.log(token)

  if (!token) {
    throw new Error('Could not login')
  }

  localStorage.setItem('token', token)

  const parsedToken = jwtDecode(token)
  console.log(parsedToken)

  localStorage.setItem('user', JSON.stringify(parsedToken))

  return token
}

// Custom hook for user login form

export const useLogin = () => {
  const [nameOrEmail, setNameOrEmail] = useState('')
  const [password, setPassword] = useState('')

  return [
    {
      nameOrEmail,
      password,
    },
    {
      setNameOrEmail,
      setPassword,
    },
  ]
}
