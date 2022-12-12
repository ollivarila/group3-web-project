import React, { useState } from 'react'
import { login, useLogin } from '../loginHelper'
import Input from '../../../components/Input'
import './LoginForm.css'
import FailNotification from '../../../components/FailNotification'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../../../reducers/userReducer'

const LoginForm = () => {
  const [user, { setNameOrEmail, setPassword }] = useLogin()
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const userFromResponse = await login(user)
      dispatch(setUser(userFromResponse))
      navigate('/')
    } catch (err) {
      setError(err.message)
      setNameOrEmail('')
      setPassword('')
    }
  }

  const handleChange = (value, setter) => {
    if (error) {
      setError(null)
    }
    setter(value)
  }

  return (
    <div className="loginFormContainer">
      <form onSubmit={handleSubmit} className="loginForm">
        <h2>Log in</h2>
        <Input
          setter={(value) => handleChange(value, setNameOrEmail)}
          type={'text'}
          value={user.nameOrEmail}
          placeholder={'Name/Email address'}
        />
        <Input
          setter={(value) => handleChange(value, setPassword)}
          type={'password'}
          value={user.password}
          placeholder={'Password'}
        />
        <p>
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </p>
        <button type="submit">Log in</button>
        <FailNotification message={error} />
      </form>
    </div>
  )
}

export default LoginForm
