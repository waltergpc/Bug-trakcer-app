import React, { useState } from 'react'
import moment from 'moment'
import { useUser } from '../Context/UserContext'
import { useTickets } from '../Context/TicketContext'
import CommentButtons from './CommentButtons'
import CommentForm from './CommentForm'

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
    <article>
      <h5>{title}</h5>
      <h6>{createdBy.name}</h6>
      <h6>{date}</h6>
      <p>{comment}</p>
      {(user.userId === createdBy._id || user.role === 'admin') && (
        <CommentButtons id={id} setEdit={setEditComment} />
      )}
    </article>
  )
}

export default Comment
