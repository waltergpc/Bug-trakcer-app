import React, { useState } from 'react'
import moment from 'moment'
import { useUser } from '../Context/UserContext'
import { useTickets } from '../Context/TicketContext'
import CommentButtons from './CommentButtons'
import CommentForm from './CommentForm'
import styled from 'styled-components'

const Comment = ({ title, comment, id, createdBy, updatedAt }) => {
  const [editComment, setEditComment] = useState(false)
  const { user } = useUser()
  const { singleTicket } = useTickets()
  let date = moment(updatedAt)
  date = date.format('L')

  if (editComment) {
    return (
      <div>
        Update{' '}
        <CommentForm
          editTitle={title}
          editComment={comment}
          editId={id}
          ticketId={singleTicket.ticket._id}
          turnEdit={setEditComment}
        />
        <button type='button' onClick={() => setEditComment(false)}>
          Stop Edit
        </button>
      </div>
    )
  }

  return (
    <Wrapper>
      <h5 className='title'>{title}</h5>
      <h6 className='created-by'>{createdBy.name}</h6>
      <h6 className='date'>{date}</h6>
      <p className='comment'>{comment}</p>
      {(user.userId === createdBy._id || user.role === 'admin') && (
        <div className='comment-btns'>
          <CommentButtons id={id} setEdit={setEditComment} />
        </div>
      )}
    </Wrapper>
  )
}

export default Comment

const Wrapper = styled.article`
  border-bottom: 2px solid lightgray;
  padding: 1rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  h5 {
    margin: 0;
    font-size: 0.8rem;
  }
  h6,
  p {
    margin: 0;
    font-size: 0.7rem;
  }

  .created-by {
    justify-self: end;
  }

  .comment {
    grid-column: 1/ 3;
  }

  .comment-btns {
    grid-column: 1/ 3;
  }
`
