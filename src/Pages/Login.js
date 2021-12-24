import React, { useState } from 'react'
import { useUser } from '../Context/UserContext'

const Login = () => {
  const { login, register } = useUser()
  const [showLogin, setShowLogin] = useState(false)
  const [user, setUser] = useState({ name: '', email: '', password: '' })

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
    console.log(user)
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
  return (
    <section className='section section-center'>
      <h3>Sign in</h3>
      {showLogin ? (
        <h4>
          If you don't have a user please register
          <button type='button' onClick={() => setShowLogin(false)}>
            HERE
          </button>
        </h4>
      ) : (
        <h4>
          If your already have a user please login
          <button type='button' onClick={() => setShowLogin(true)}>
            HERE
          </button>
        </h4>
      )}
      <form onSubmit={submitLogin}>
        {!showLogin && (
          <input
            name='name'
            type='text'
            placeholder='Enter your email'
            value={user.name}
            onChange={handleChange}
          />
        )}
        <input
          name='email'
          type='email'
          placeholder='Enter your email'
          value={user.email}
          onChange={handleChange}
        />
        <input
          name='password'
          type='password'
          placeholder='Enter your password'
          value={user.password}
          onChange={handleChange}
        />
        <button type='submit' disabled={!user.email}>
          Sign in
        </button>
      </form>
    </section>
  )
}

export default Login
