import React from 'react'
import { useUser } from '../Context/UserContext'
import { Navigate } from 'react-router-dom'
import FilteredTicketList from '../Components/FilteredTicketList'
import styled from 'styled-components'

const Tickets = () => {
  const { user } = useUser()

  if (!user) return <Navigate to='/' />

  const { team } = user

  return (
    <Wrapper className='section section-center'>
      <h3>{user.role === 'admin' ? 'All' : team} tickets</h3>
      <div className='tickets-grid'>
        <FilteredTicketList status='new' />

        <FilteredTicketList status='in progress' />

        <FilteredTicketList status='pending' />

        <FilteredTicketList status='solved' />

        <FilteredTicketList status='cancelled' />
      </div>
    </Wrapper>
  )
}

export default Tickets

const Wrapper = styled.section`
  .tickets-grid {
    display: grid;
    gap: 2rem;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    width: 85%;
    padding: 1rem;
    border-radius: 2rem;
    font-size: 0.7rem;
    overflow-x: scroll;
  }

  @media (min-width: 900px) {
    .tickets-grid {
      grid-template-columns: 15rem 15rem 15rem 15rem 15rem;
      width: 95%;
      font-size: 0.8rem;
    }
  }
`
