import React from 'react'
import { useUser } from '../Context/UserContext'
import { Navigate } from 'react-router-dom'

const Dashboard = () => {
  const { user } = useUser()

  if (!user) return <Navigate to='/' />

  return <div>This is the Dashboard Page</div>
}

export default Dashboard
