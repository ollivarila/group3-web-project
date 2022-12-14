import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { useState } from 'react'
import { BACKEND_URL } from '../../config'

const sendLoginRequest = async (user) => {
  const url = `${BACKEND_URL}/api/user/login`
  return axios
    .post(url, user)
    .then((res) => res.data)
    .catch((err) => {
      // Catch error to throw new one hmmm
      throw new Error(err.response.data.error)
    })
}

// Send login request and save token to localstorage on success
// Token is saved with key token and decoded token is saved with key user
// Throws error if request fails

export const login = async (user) => {
  const { token } = await sendLoginRequest(user)

  localStorage.setItem('token', token)

  const decoded = jwtDecode(token)

  localStorage.setItem('user', JSON.stringify(decoded))

  return decoded
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
