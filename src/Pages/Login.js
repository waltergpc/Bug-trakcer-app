import React, { useState } from 'react'
import { useUser } from '../Context/UserContext'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Loading from '../Components/Loading'
import { AiOutlineUserAdd } from 'react-icons/ai'

const Login = () => {
  const { login, demoLogin, register, errorMsg, isUserLoading } = useUser()
  const [showLogin, setShowLogin] = useState(true)
  const [user, setUser] = useState({ name: '', email: '', password: '' })

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const submitLogin = (e) => {
    e.preventDefault()
    if (showLogin) {
      login({ ...user })
    }
    if (!showLogin) {
      register({ ...user })
    }
    setUser({ name: '', email: '', password: '' })
  }

  const submitDemoLogin = (e) => {
    e.preventDefault()
    demoLogin()
  }
  return (
    <Wrapper className='section section-center'>
      <h3>{showLogin ? 'Login' : 'Register'} </h3>
      {errorMsg && <div className='error-section'>{errorMsg}</div>}
      {isUserLoading && <Loading />}
      {showLogin ? (
        <p>
          If you don't have a user please register
          <button
            type='button'
            className='toggle-login'
            onClick={() => setShowLogin(false)}
          >
            HERE
          </button>
        </p>
      ) : (
        <p>
          If your already have a user please login
          <button
            type='button'
            className='toggle-login'
            onClick={() => setShowLogin(true)}
          >
            HERE
          </button>
        </p>
      )}
      <form className='sign-form' onSubmit={submitLogin}>
        {!showLogin && (
          <input
            className='login-input'
            name='name'
            type='text'
            placeholder='Enter your name'
            value={user.name}
            onChange={handleChange}
          />
        )}
        <input
          className='login-input'
          name='email'
          type='email'
          placeholder='Enter your email'
          value={user.email}
          onChange={handleChange}
        />
        <input
          className='login-input'
          name='password'
          type='password'
          placeholder='Enter your password'
          value={user.password}
          onChange={handleChange}
        />
        <button className='submit-btn' type='submit' disabled={!user.email}>
          Sign in
        </button>
      </form>
      <div className='forgot-password'>
        If you forgot your password please click
        <br />
        <Link className='forgot-link' to='/forgot-password'>
          HERE
        </Link>
      </div>
      <button type='submit' className='demo-btn' onClick={submitDemoLogin}>
        <AiOutlineUserAdd /> User Demo Login
      </button>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  text-align: center;

  h3 {
    margin-top: 0;
  }
  .sign-form {
    padding: 1.5rem;
    display: grid;
    grid-template-columns: 1fr;
    background-color: #d8c3a5;
    border-radius: 1rem;
    gap: 1rem;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  }

  .login-input {
    height: 2rem;
    border-radius: 0.5rem;
    border-color: #a7aa83;
    outline: none;
  }

  .submit-btn {
    width: fit-content;
    justify-self: center;
    background-color: transparent;
    border-color: teal;
    padding: 0.4rem;
    border-radius: 0.5rem;
    font-weight: bold;
    cursor: pointer;
    transition: var(--transition);
    box-shadow: none;
  }

  .submit-btn:hover {
    background-color: teal;
    color: white;
    transform: scale(1.1);
  }

  .toggle-login {
    background-color: transparent;
    box-shadow: none;
    border: none;
    margin-left: 0.5rem;
    font-weight: bold;
    cursor: pointer;
    text-decoration: underline;
    color: green;
  }

  .forgot-password {
    margin-top: 2rem;
    background-color: #e98074;
    padding: 1rem;
    font-size: 0.8rem;
    border-radius: 1rem;
    font-weight: 500;
    color: white;
    box-shadow: rgba(66, 66, 66, 0.2) 0px 8px 24px;
  }

  .forgot-link {
    text-decoration: underline;
    color: green;
    font-weight: bold;
  }

  .demo-btn {
    margin-top: 1rem;
    padding: 1rem;
    background-color: #5c7179;
    border: none;
    color: white;
    font-weight: bold;
    border-radius: 1rem;
    cursor: pointer;
    transition: var(--transition);
  }

  .demo-btn:hover {
    color: orange;
  }
  @media (min-width: 900px) {
    width: 60%;

    .toggle-login {
      font-size: 1rem;
    }

    .demo-btn {
      margin-top: 1.5rem;
    }
  }
`

export default Login
