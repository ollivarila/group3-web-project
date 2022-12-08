import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useState } from 'react';

export const sendSignupRequest = (user) => {
  const url = `${BACKEND_URL}/api/user/signup`
  return axios.post(url, user).then(res => res.data).catch(err => {
    // Catch error to throw new one hmmm
    throw new Error(err.response.data.error)
  })
}

// Send signup request and save token to localstorage on success
// Token is saved with key token and decoded token is saved with key user
// Throws error if request fails

export const signup = async (user) => {
  const token = await sendSignupRequest(user)

  localStorage.setItem('token', token)

  const decoded = jwtDecode(token)

  localStorage.setItem('user', decoded)

  return token
}

export const useSignup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return [
    {
      username,
      email,
      password,
    },
    {
      setUsername,
      setEmail,
      setPassword,
    },
  ]
}
