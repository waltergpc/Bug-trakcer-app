import React, { useState, useEffect } from 'react'
import { useSearchParams, Navigate } from 'react-router-dom'
import axios from 'axios'

const VerifyAccount = () => {
  const [searchParams] = useSearchParams()
  const [error, setError] = useState(null)
  const [msg, setMsg] = useState(null)

  useEffect(() => {
    const sendVerifyEmail = async () => {
      try {
        const { data } = await axios.post('/api/v1/auth/verify-email', {
          email: searchParams.get('email'),
          verificationToken: searchParams.get('verificationToken'),
        })
        setMsg(data.msg)
      } catch (error) {
        console.log(error.response)
        setError(error.response.msg)
      }
    }

    sendVerifyEmail()
    // eslint-disable-next-line
  }, [])

  if (!searchParams.get('email')) return <Navigate to='/' />

  return (
    <div>
      <h3>Verification page</h3>
      {error && <h5>{error}</h5>}
      {msg && <h5>{msg}</h5>}
    </div>
  )
}

export default VerifyAccount
