import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import TicketButtons from './TicketButtons'
import { Link } from 'react-router-dom'

const OwnTicket = ({
  id,
  userId,
  title,
  description,
  priority,
  status,
  updatedAt,
  category,
  createdBy,
}) => {
  let date = moment(updatedAt)
  date = date.format('L')
  return (
    <Wrapper>
      <Link to={`/tickets/${id}`} className='title'>
        {title}
      </Link>
      <p className='description'>{description}</p>
      <p className='spec-title'>Priorirty:</p>
      <p> {priority}</p>
      <p className='spec-title'>Status:</p>
      <p> {status}</p>
      <p className='spec-title'>Category:</p>
      <p>{category} </p>
      <p className='spec-title'>Last Update:</p>
      <p> {date}</p>
      <p className='created-by'>
        {Object.values(createdBy).includes(userId)
          ? 'Created By you'
          : 'Assigned to you'}
      </p>
      <div className='ticket-btns'>
        <TicketButtons id={id} />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  border: solid 1px rgba(99, 99, 99, 0.2);
  background-color: white;
  width: 100%;
  font-size: 0.7rem;
  justify-self: center;
  padding: 0.5rem;
  border-radius: 1rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: grid;
  grid-template-columns: 1fr 1fr;

  h5 {
    font-size: 0.9rem;
  }
  .title {
    grid-column: 1 / 3;
    font-size: 0.9rem;
    font-weight: bold;
    margin-bottom: 0.3rem;
  }

  .description {
    display: none;
  }

  .spec-title {
    font-weight: bold;
  }

  .created-by {
    grid-column: 1 / 3;
    font-weight: bold;
  }

  .ticket-btns {
    grid-column: 1 / 3;
  }

  @media (min-width: 900px) {
    .description {
      display: inline-block;
      grid-column: 1 / 3;
      font-size: 0.8rem;
    }
    .title {
      font-size: 1rem;
    }
  }
`

export default OwnTicket
