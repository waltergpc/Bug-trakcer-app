import React from 'react'
import { useUser } from '../Context/UserContext'
import { Navigate } from 'react-router-dom'
import TicketForm from '../Components/TicketForm'

const CreateTicket = () => {
  const { user } = useUser()

  if (!user) return <Navigate to='/' />

  return <TicketForm />
}

export default CreateTicket
