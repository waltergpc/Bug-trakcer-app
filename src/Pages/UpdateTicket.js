import React from 'react'
import { useUser } from '../Context/UserContext'
import { Navigate, useParams } from 'react-router-dom'
import TicketForm from '../Components/TicketForm'

const UpdateTicket = () => {
  const { user } = useUser()
  const { id } = useParams()

  if (!user) return <Navigate to='/' />

  return <TicketForm id={id} user={user} />
}

export default UpdateTicket
