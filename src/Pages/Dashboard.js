import React, { useEffect } from 'react'
import { useUser } from '../Context/UserContext'
import { Navigate } from 'react-router-dom'
import { useTickets } from '../Context/TicketContext'
import { MdOutlineVerifiedUser } from 'react-icons/md'
import Tickets from './Tickets'

const Dashboard = () => {
  const { user } = useUser()
  const { fetchTickets, ownTickets } = useTickets()

  useEffect(() => {
    if (user) {
      fetchTickets(user.userId)
      // eslint-disable-next-line
    }
  }, [])

  if (!user) return <Navigate to='/' />

  const { name, userId, image, team, verified } = user

  return (
    <div>
      <h4>Welcome Back {name}!</h4>
      <h5>Your team: {team}</h5>
      {verified ? (
        <h5>
          User Verified <MdOutlineVerifiedUser />
        </h5>
      ) : (
        <h5>Email verification pending!</h5>
      )}
      <div className='my-tickets'>
        <h5>Your Tickets: {ownTickets.length}</h5>
        {ownTickets.map((ticket) => {
          const {
            _id: id,
            title,
            description,
            priority,
            status,
            updatedAt,
            category,
          } = ticket
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

export default Dashboard
