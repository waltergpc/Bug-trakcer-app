import React, { useState } from 'react'
import { useSearchParams, Navigate } from 'react-router-dom'
import axios from 'axios'

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
      const { data } = await axios.post('/auth/reset-password', {
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
    <form onSubmit={sendResetToken}>
      <h3>Please enter a new password for {searchParams.get('email')}</h3>
      {error && <h5>{error}</h5>}
      {msg && <h5>{msg}</h5>}
      <label>New password</label>
      <input
        type='password'
        name='newPassword'
        value={changedPassword.newPassword}
        onChange={handleChange}
      />
      <label>Confirm new password</label>
      <input
        type='password'
        name='confirmedPassword'
        value={changedPassword.confirmedPassword}
        onChange={handleChange}
      />
      <button type='submit'>Reset Password</button>
    </form>
  )
}

export default ResetPassword
