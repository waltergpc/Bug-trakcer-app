import React, { useEffect } from 'react'
import { useUser } from '../Context/UserContext'
import { Navigate } from 'react-router-dom'
import { useTickets } from '../Context/TicketContext'
import { MdOutlineVerifiedUser } from 'react-icons/md'
import styled from 'styled-components'
import OwnTicket from '../Components/OwnTicket'

const Dashboard = () => {
  const { user } = useUser()
  const { fetchTickets, ownTickets } = useTickets()
  console.log(ownTickets)

  useEffect(() => {
    if (user) {
      fetchTickets(user.userId)
    }
    // eslint-disable-next-line
  }, [])

  if (!user) return <Navigate to='/' />

  const { name, userId, image, team, verified } = user

  return (
    <Wrapper>
      <h4 className='greeting'>Welcome back {name}</h4>
      <img className='profile-pic' src={image} alt={name} />
      <h5 className='team'>Your team: {team}</h5>
      {verified ? (
        <h5 className='user-verified'>
          User Verified
          <span className='verified'>
            <MdOutlineVerifiedUser />
          </span>
        </h5>
      ) : (
        <h5 className='user-verified not-verified'>
          Email verification pending!
        </h5>
      )}
      <div className='my-tickets'>
        <h5 className='tickets-length'>Your Tickets: {ownTickets.length}</h5>
        {ownTickets.map((ticket) => {
          const {
            _id: id,
            title,
            description,
            priority,
            status,
            updatedAt,
            category,
            createdBy,
          } = ticket
          return (
            <OwnTicket
              key={id}
              id={id}
              userId={userId}
              title={title}
              description={description}
              priority={priority}
              status={status}
              updatedAt={updatedAt}
              category={category}
              createdBy={createdBy}
            />
          )
        })}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  padding-bottom: 1rem;

  h4 {
    margin-bottom: 1rem;
  }
  h5 {
    margin-top: 1rem;
  }

  .profile-pic {
    height: 13rem;
    width: 13rem;
    border-radius: 50%;
  }

  .my-tickets {
    text-align: center;
    width: 80%;
    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;
    gap: 1rem;
  }

  .verified {
    color: forestgreen;
    font-size: 1rem;
  }

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;

    .greeting,
    .profile-pic,
    .team,
    .user-verified {
      grid-column: 1/ 2;
    }

    .my-tickets {
      grid-column: 1/3;
      grid-template-columns: 1fr 1fr;
      gap: 2em;
    }

    .tickets-length {
      grid-column: 1 / 3;
    }
  }
`
export default Dashboard
