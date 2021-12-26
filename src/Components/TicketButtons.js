import React from 'react'
import { MdDeleteForever, MdModeEdit } from 'react-icons/md'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useTickets } from '../Context/TicketContext'

const TicketButtons = ({ id }) => {
  const { deleteTicket } = useTickets()
  return (
    <Wrapper>
      <button
        type='button'
        className='delete-btn'
        onClick={() => deleteTicket(id)}
      >
        <MdDeleteForever />
      </button>
      <Link to={`/update-ticket/${id}`} className='update-btn'>
        <MdModeEdit />
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  color: black;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  font-size: 1.5rem;

  .delete-btn {
    background-color: transparent;
    padding: none;
    border: none;
    margin: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
  a:link,
  a:visited {
    color: inherit;
  }
`
export default TicketButtons
