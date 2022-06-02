import React, { useState } from 'react'
import { useSearchParams, Navigate } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const [changedPassword, setNewPassword] = useState({
    newPassword: '',
    confirmedPassword: '',
  })
  const [error, setError] = useState(null)
  const [msg, setMsg] = useState(null)

  if (!searchParams.get('email')) return <Navigate to='/' />

  const sendResetToken = async (e) => {
    e.preventDefault()
    if (changedPassword.newPassword !== changedPassword.confirmedPassword) {
      setError('Passwords do not match')
      return
    }
    try {
      const { data } = await axios.post('/api/v1/auth/reset-password', {
        email: searchParams.get('email'),
        token: searchParams.get('verificationToken'),
        password: changedPassword.newPassword,
      })
      setError(null)
      setMsg(data.msg)
    } catch (error) {
      console.log(error.response)
      setError(error.response.msg)
    }
  }

  const handleChange = (e) => {
    setNewPassword({ ...changedPassword, [e.target.name]: e.target.value })
  }
  return (
    <FormWrapper onSubmit={sendResetToken}>
      <h3 className='form-title'>
        Please enter a new password for {searchParams.get('email')}
      </h3>
      {error && <div className='error-section'>{error}</div>}
      {msg && <div className='success-msg'>{msg}</div>}
      <label>New password</label>
      <input
        type='password'
        className='password-text'
        name='newPassword'
        value={changedPassword.newPassword}
        onChange={handleChange}
      />
      <label>Confirm new password</label>
      <input
        type='password'
        name='confirmedPassword'
        className='password-text'
        value={changedPassword.confirmedPassword}
        onChange={handleChange}
      />
      <button
        type='submit'
        className='submit-btn'
        disabled={!changedPassword.newPassword}
      >
        Reset Password
      </button>
    </FormWrapper>
  )
}

export default ResetPassword

const FormWrapper = styled.form`
  display: grid;
  justify-content: center;
  margin: 5rem;
  gap: 0.3rem;
  padding: 2rem;
  background-color: #c2b9b0;
  border-radius: 1rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  .success-msg {
    font-size: 0.8rem;
    background-color: #51ec319e;
    padding: 1rem;
    border-radius: 1rem;
    font-weight: bold;
    color: #364a21;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  }

  label {
    color: white;
    font-weight: bold;
    font-size: 0.8rem;
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
`
