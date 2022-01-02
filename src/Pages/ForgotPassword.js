import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

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
    <Wrapper className='section section-center'>
      <form className='forgot-form' onSubmit={submitPasswordReset}>
        <h4>
          Please enter your email linked to the account to reset your password
        </h4>
        {error && <h5>{error}</h5>}
        {msg && <h5>{msg}</h5>}
        <input
          type='email'
          className='forgot-email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type='submit' className='submit-btn' disabled={!email}>
          Send Reset Password email
        </button>
      </form>
    </Wrapper>
  )
}

export default ForgotPassword

const Wrapper = styled.section`
  .forgot-form {
    text-align: center;
    background-color: #d8c3a5;
    padding: 1rem;
    border-radius: 1rem;
    color: #717171;
    gap: 1rem;
    display: grid;

    .forgot-email {
      height: 1.5rem;
    }

    .submit-btn {
      background-color: #5c7179;
      color: white;
      font-weight: bold;
      border: none;
      border-radius: 0.5rem;
      padding: 0.5rem;
      cursor: pointer;
    }

    .submit-btn:disabled {
      background-color: #5c717945;
    }

    @media (min-width: 900px) {
      margin-top: 5rem;
      .forgot-email {
        width: 80%;
        justify-self: center;
      }
      .submit-btn {
        width: fit-content;
        justify-self: center;
      }
    }
  }
`
