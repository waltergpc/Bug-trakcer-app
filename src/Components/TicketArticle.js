import React from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const TicketArticle = ({
  title,
  updatedAt,
  status,
  priority,
  category,
  createdBy,
  id,
}) => {
  let date = moment(updatedAt)
  date = date.format('L')

  return (
    <Wrapper status={status}>
      <Link to={`/tickets/${id}`}>{title}</Link>
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

  a {
    margin-top: 0.1rem;
    margin-bottom: 0.7rem;
    font-size: 0.6rem;
    font-weight: bold;
  }

  .ticket-specs {
    text-align: start;
    font-size: 0.6rem;
  }

  @media (min-width: 900px) {
    a {
      font-size: 0.7rem;
    }

    .ticket-specs {
      text-align: start;
      font-size: 0.7rem;
    }
  }
`
