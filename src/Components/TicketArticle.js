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
    <Wrapper status={status} category={category}>
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
  padding: 1rem;
  border-radius: 1rem;
  margin: 1rem 0;
  color: rgb(228, 230, 241);
  background-color: ${(props) =>
    props.category === 'API'
      ? 'rgba(28, 26, 200, 0.53)'
      : props.category === 'UX'
      ? 'rgba(26, 200, 154, 0.53)'
      : props.category === 'Design'
      ? 'rgba(200, 113, 26, 0.5)'
      : 'rgba(200, 26, 26, 0.5)'};
  text-shadow: 2px 7px 5px rgba(0, 0, 0, 0.3),
    0px -4px 10px rgba(255, 255, 255, 0.3);
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
