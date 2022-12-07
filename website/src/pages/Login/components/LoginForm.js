import React from 'react'
import { login, useLogin } from '../loginHelper';
import Input from '../../../components/Input';
import './LoginForm.css'
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [user, { setNameOrEmail, setPassword }] = useLogin()
  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(user)
  }
  return (
    <div className='loginFormContainer'>
      <form onSubmit={handleSubmit} className='loginForm'>
        <h2>Login</h2>
        <Input setter={setNameOrEmail} type={'text'} value={user.nameOrEmail} placeholder={'Name or email address'} />
        <Input setter={setPassword} type={'password'} value={user.password} placeholder={'Password'} />
        <p>Don&apos;t have an account? <a href='/'>Sign up</a></p>
        <button type='submit'>Log in</button>
      </form>
    </div>
  );
}

export default LoginForm;
