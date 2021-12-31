import React, { useState, useEffect } from 'react'
import { useNavigate, Navigate, useParams } from 'react-router-dom'
import { useUser } from '../Context/UserContext'
import axios from 'axios'

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
    <section>
      <form onSubmit={submitUpdate}>
        <input
          type='text'
          name='name'
          value={editUser.name}
          onChange={handleChange}
        />
        <input
          type='text'
          name='email'
          value={editUser.email}
          onChange={handleChange}
        />
        <button type='submit'>Update User</button>
      </form>
      <form onSubmit={imageSubmit}>
        <input type='file' onChange={uploadImage} />
        <button type='submit' disabled={!image}>
          Save Image
        </button>
      </form>
    </section>
  )
}

export default UpdateUser
