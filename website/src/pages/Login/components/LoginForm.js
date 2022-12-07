import React from 'react'
import { login, useLogin } from '../loginHelper';

const LoginForm = () => {
  const [user, { setNameOrEmail, setPassword }] = useLogin()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = await login(user)
  }
  return (
    <div className='loginContainer'>
      <form onSubmit={handleSubmit}>
        <input placeholder='Username/Email' type='text' value={user.nameOrEmail} onChange={(e) => setNameOrEmail(e.target.value)}/>
        <input placeholder='Password' type='password' value={user.password} onChange={(e) => setPassword(e.target.value)}/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default LoginForm;
