import React from 'react'
import { useUser } from '../Context/UserContext'
import { Navigate } from 'react-router-dom'
import { useTickets } from '../Context/TicketContext'
import filterTickets from '../utils/filterTickets'

const Tickets = () => {
  const { user } = useUser()
  const { tickets } = useTickets()

  if (!user) return <Navigate to='/' />

  const { team } = user

  return (
    <div>
      <h3>{(user.role = 'admin' ? 'All' : team)} tickets</h3>
      <div className='new'>
        {filterTickets(tickets, 'new').map((ticket) => {
          const { title, description, _id: id } = ticket

          return (
            <article key={id}>
              <p>{title}</p>
              <p>{description}</p>
            </article>
          )
        })}
      </div>
    </div>
  )
}

export default Tickets
