import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import TicketButtons from './TicketButtons'

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
  console.log(userId)
  console.log(createdBy)

  let date = moment(updatedAt)
  date = date.format('L')
  return (
    <Wrapper>
      <h5 className='title'>{title}</h5>
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
      <TicketButtons id={id} />
    </Wrapper>
  )
}

const Wrapper = styled.article`
  border: solid 1px rgba(99, 99, 99, 0.2);
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
`

export default OwnTicket
