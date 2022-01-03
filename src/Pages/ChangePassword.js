import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { useUser } from '../Context/UserContext'
import styled from 'styled-components'

const ChangePassword = () => {
  const { user } = useUser()
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmedPassword: '',
  })
  const [error, setError] = useState(null)
  const [msg, setMSg] = useState('')

  if (!user) return <Navigate to='/' />

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value })
  }

  const submitChangePassword = async (e) => {
    e.preventDefault()
    if (passwords.newPassword !== passwords.confirmedPassword) {
      setError('New passwords do not match')
      return
    }
    try {
      const { data } = await axios.patch('/users//updateUserPassword', {
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword,
      })
      setError(null)
      setMSg(data.msg)
    } catch (error) {
      console.log(error.response)
      setError(error.response.data.msg)
    }
  }

  return (
    <Wrapper>
      {msg && <div className='success-msg'>{msg}</div>}
      {error && <div className='error-section'>{error}</div>}
      <form onSubmit={submitChangePassword} className='update-form'>
        <h4 className='form-title'>Update password</h4>
        <label>Introduce old Password</label>
        <input
          type='password'
          name='oldPassword'
          className='password-text'
          value={passwords.oldPassword}
          onChange={handleChange}
        ></input>
        <label>Introduce new Password</label>
        <input
          type='password'
          name='newPassword'
          className='password-text'
          value={passwords.newPassword}
          onChange={handleChange}
        ></input>
        <label>Type again new password</label>
        <input
          type='password'
          name='confirmedPassword'
          className='password-text'
          value={passwords.confirmedPassword}
          onChange={handleChange}
        ></input>
        <button
          type='submit'
          className='submit-btn'
          disabled={
            !passwords.newPassword ||
            !passwords.oldPassword ||
            !passwords.confirmedPassword
          }
        >
          Change Password
        </button>
      </form>
    </Wrapper>
  )
}

export default ChangePassword

const Wrapper = styled.section`
  display: grid;
  padding: 5rem 1rem 0 1rem;
  gap: 2rem;

  .success-msg {
    font-size: 0.8rem;
    background-color: #51ec319e;
    padding: 1rem;
    border-radius: 1rem;
    font-weight: bold;
    color: #364a21;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  }

  .update-form {
    display: grid;
    justify-content: center;
    gap: 0.3rem;
    padding: 1rem;
    background-color: #c2b9b0;
    border-radius: 1rem;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
      rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;

    label {
      color: white;
      font-weight: bold;
      font-size: 0.8rem;
    }
  }

  .password-text {
    width: 100%;
    height: 1.5rem;
    outline: none;
  }

  .form-title {
    margin: 0;
    color: white;
    justify-self: center;
  }
  .submit-btn {
    justify-self: center;
    background-color: #5c7179;
    border: none;
    color: white;
    font-weight: bold;
    border-radius: 0.3rem;
    cursor: pointer;
    margin-top: 1rem;
  }

  .submit-btn:hover {
    color: orange;
  }

  .submit-btn:disabled {
    background-color: #5c717957;
  }

  @media (min-width: 900px) {
    padding: 7rem 7rem 0 7rem;
  }
`
