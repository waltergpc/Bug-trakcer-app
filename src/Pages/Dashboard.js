import React, { useEffect } from 'react'
import { useUser } from '../Context/UserContext'
import { Navigate } from 'react-router-dom'
import { useTickets } from '../Context/TicketContext'

const Dashboard = () => {
  const { user } = useUser()
  const { fetchTickets } = useTickets()

  useEffect(() => {
    fetchTickets(user.userId)
    // eslint-disable-next-line
  }, [])

  if (!user) return <Navigate to='/' />

  return <div>This is the Dashboard Page</div>
}

export default Dashboard
