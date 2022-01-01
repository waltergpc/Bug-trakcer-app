import React from 'react'
import { useUser } from '../Context/UserContext'
import { Navigate, useParams } from 'react-router-dom'
import TicketForm from '../Components/TicketForm'
import { useTickets } from '../Context/TicketContext'
import Loading from '../Components/Loading'

const UpdateTicket = () => {
  const { user } = useUser()
  const { id } = useParams()
  const { singleTicketLoading } = useTickets()

  if (!user) return <Navigate to='/' />

  if (singleTicketLoading) return <Loading />

  return <TicketForm id={id} user={user} />
}

export default UpdateTicket
