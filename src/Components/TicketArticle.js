import React from 'react'
import moment from 'moment'
import styled from 'styled-components'

const TicketArticle = ({
  title,
  updatedAt,
  status,
  priority,
  category,
  createdBy,
}) => {
  let date = moment(updatedAt)
  date = date.format('L')

  return (
    <Wrapper status={status}>
      <h6>{title}</h6>
      <div className='ticket-specs'>
        <p>Last Update: {date}</p>
        <p>Created by: {createdBy.name}</p>
        <p>Priority: {priority}</p>
        <p>Category: {category}</p>
      </div>
    </Wrapper>
  )
}

export default TicketArticle

const Wrapper = styled.article`
  padding: 0.5rem;
  background-color: white;
  border-radius: 0.4rem;
  margin: 1rem 0;

  p {
    margin: 0;
  }

  h6 {
    margin-top: 0.1rem;
    margin-bottom: 0.7rem;
    font-size: 0.6rem;
  }

  .ticket-specs {
    text-align: start;
    font-size: 0.6rem;
  }

  @media (min-width: 900px) {
    h6 {
      font-size: 0.7rem;
    }

    .ticket-specs {
      text-align: start;
      font-size: 0.7rem;
    }
  }
`
