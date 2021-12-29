import React from 'react'
import { MdDeleteForever, MdModeEdit } from 'react-icons/md'
import styled from 'styled-components'
import { useTickets } from '../Context/TicketContext'

const CommentButtons = ({ id, setEdit }) => {
  const { deleteComment, singleTicket } = useTickets()
  return (
    <Wrapper>
      <button
        type='button'
        className='delete-btn'
        onClick={() => {
          deleteComment(id, singleTicket.ticket._id)
        }}
      >
        <MdDeleteForever />
      </button>
      <button
        type='button'
        className='update-btn'
        onClick={() => {
          setEdit(true)
        }}
      >
        <MdModeEdit />
      </button>
    </Wrapper>
  )
}

export default CommentButtons

const Wrapper = styled.div`
  color: black;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  font-size: 1.7rem;

  .delete-btn {
    background-color: transparent;
    padding: none;
    border: none;
    margin: none;
    font-size: 1.5rem;
    cursor: pointer;
  }

  .update-btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.3rem;
  }
  a:link,
  a:visited {
    color: inherit;
  }
`
