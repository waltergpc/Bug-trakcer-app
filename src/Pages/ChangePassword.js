import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { useUser } from '../Context/UserContext'

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
    <section>
      {msg && <h4>{msg}</h4>}
      {error && <h4>{error}</h4>}
      <form onSubmit={submitChangePassword}>
        <label>Introduce old Password</label>
        <input
          type='password'
          name='oldPassword'
          value={passwords.oldPassword}
          onChange={handleChange}
        ></input>
        <label>Introduce new Password</label>
        <input
          type='password'
          name='newPassword'
          value={passwords.newPassword}
          onChange={handleChange}
        ></input>
        <label>Type again new password</label>
        <input
          type='password'
          name='confirmedPassword'
          value={passwords.confirmedPassword}
          onChange={handleChange}
        ></input>
        <button
          type='submit'
          disabled={
            !passwords.newPassword ||
            !passwords.oldPassword ||
            !passwords.confirmedPassword
          }
        >
          Change Password
        </button>
      </form>
    </section>
  )
}

export default ChangePassword
