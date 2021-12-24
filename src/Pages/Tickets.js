import React from 'react'
import { useUser } from '../Context/UserContext'
import { Navigate } from 'react-router-dom'

const Tickets = () => {
  const { user } = useUser()

  if (!user) return <Navigate to='/' />

  return <div>This is the Tickets Page</div>
}

export default Tickets
