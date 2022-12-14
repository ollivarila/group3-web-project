import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSignup, signup } from '../signupHelper'
import Input from '../../../components/Input'
import './SignupForm.css'
import FailNotification from '../../../components/FailNotification'
import { setUser } from '../../../reducers/userReducer'
import { createNotification } from '../../../reducers/notificationReducer'

const SignupForm = () => {
  const [user, { setUsername, setEmail, setPassword }] = useSignup()
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const userFromResponse = await signup(user)
      dispatch(setUser(userFromResponse))
      dispatch(createNotification(`Welcome ${userFromResponse.username}`))
      navigate('/')
    } catch (err) {
      setError(err.message)
      setUsername('')
      setEmail('')
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
    <div className="signupFormContainer">
      <form onSubmit={handleSubmit} className="signupForm">
        <h2>Sign up</h2>
        <Input
          setter={(value) => handleChange(value, setUsername)}
          type={'text'}
          value={user.username}
          placeholder={'Username'}
        />
        <Input
          setter={(value) => handleChange(value, setEmail)}
          type={'text'}
          value={user.email}
          placeholder={'Email'}
        />
        <Input
          setter={(value) => handleChange(value, setPassword)}
          type={'password'}
          value={user.password}
          placeholder={'Password'}
        />
        <p>
          Already have an account? <a href="/">Log in</a>
        </p>
        <button type="submit">Sign up</button>
        <FailNotification message={error} />
      </form>
    </div>
  )
}

export default SignupForm
