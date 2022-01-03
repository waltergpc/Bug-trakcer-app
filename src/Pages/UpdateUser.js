import React, { useState, useEffect } from 'react'
import { useNavigate, Navigate, useParams } from 'react-router-dom'
import { useUser } from '../Context/UserContext'
import axios from 'axios'
import styled from 'styled-components'

const UpdateUser = () => {
  let navigate = useNavigate()
  const { user, updateUser, submitImage } = useUser()
  const { id } = useParams()
  const [editUser, setEditUser] = useState({ name: '', email: '' })
  const [image, setImage] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`users/${id}`)
      setEditUser({
        name: data.user.name,
        email: data.user.email,
        image: data.user.image,
      })
    }
    if (user) {
      if (user.userId === id) {
        setEditUser({ name: user.name, email: user.email })
      }
      if (!user.userId === id && user.role === 'admin') {
        fetchUser()
      }
      if (!user.userId === id && !user.role === 'admin') {
        navigate('/dashboard')
      }
    }

    // eslint-disable-next-line
  }, [id])

  if (!user) return <Navigate to='/' />

  const handleChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value })
  }

  const uploadImage = async (e) => {
    console.log(e.target.files[0])
    const formData = new FormData()
    formData.append('image', e.target.files[0])
    formData.append('folder', 'user-image')
    try {
      const { data } = await axios.post('/tickets/uploadimage', formData)
      console.log(data)
      setImage(data)
    } catch (error) {
      console.log(error.response)
    }
  }

  const submitUpdate = async (e) => {
    e.preventDefault()
    updateUser(editUser)
  }

  const imageSubmit = (e) => {
    e.preventDefault()
    submitImage(editUser, image)
    setImage(null)
  }

  return (
    <Wrapper>
      <form onSubmit={submitUpdate} className='update-form'>
        <h4 className='form-title'>Update Name or email</h4>
        <input
          type='text'
          name='name'
          className='user-text'
          value={editUser.name}
          onChange={handleChange}
        />
        <input
          type='text'
          name='email'
          className='user-text'
          value={editUser.email}
          onChange={handleChange}
        />
        <button
          type='submit'
          className='submit-btn'
          disabled={!editUser.name || !editUser.email}
        >
          Update User
        </button>
      </form>
      <form onSubmit={imageSubmit} className='update-form'>
        <h4 className='form-title'>Upload profile picture</h4>
        <input type='file' onChange={uploadImage} />
        <button type='submit' disabled={!image} className='submit-btn'>
          Save Image
        </button>
      </form>
    </Wrapper>
  )
}

export default UpdateUser

const Wrapper = styled.section`
  display: grid;
  padding: 5rem 1rem 0 1rem;
  gap: 2rem;

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
  }

  .user-text {
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
  }

  .submit-btn:hover {
    color: orange;
  }

  .submit-btn:disabled {
    background-color: #5c717957;
  }

  @media (min-width: 900px) {
    padding: 7rem 4rem 0 4rem;
  }
`
