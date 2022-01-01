import React, { useState } from 'react'
import axios from 'axios'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState(null)
  const [error, setError] = useState(null)

  const submitPasswordReset = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/auth/forgot-password', {
        email: email,
      })
      console.log(data)
      setEmail('')
      setMsg(data.msg)
    } catch (error) {
      console.log(error.response)
      setError(error.response.msg)
    }
  }
  return (
    <form onSubmit={submitPasswordReset}>
      <h4>
        Please enter your email linked to the account to reset your password
      </h4>
      {error && <h5>{error}</h5>}
      {msg && <h5>{msg}</h5>}
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type='submit' disabled={!email}>
        Send Reset Password email
      </button>
    </form>
  )
}

export default ForgotPassword
