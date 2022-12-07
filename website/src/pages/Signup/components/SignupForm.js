import React from 'react';
import { useSignup, sendSignupRequest } from '../signupHelper';
import Input from '../../../components/Input';
import './SignupForm.css'

const SignupForm = () => {
  const [user, { setUsername, setEmail, setPassword }] = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await sendSignupRequest(user)
    } catch (error) {
      console.error('ERROR: could not sign up', error.message)
    }
  }

  return (
    <div className='signupFormContainer'>
      <form onSubmit={handleSubmit} className='signupForm'>
        <h2>Sign up</h2>
        <Input setter={setUsername} type={'text'} value={user.username} placeholder={'Username'} />
        <Input setter={setEmail} type={'text'} value={user.email} placeholder={'Email'} />
        <Input setter={setPassword} type={'password'} value={user.password} placeholder={'Password'} />
        <p>Already have an account? <a href='/'>Log in</a></p>
        <button type='submit'>Signup</button>
      </form>

    </div>
  );
}

export default SignupForm;
