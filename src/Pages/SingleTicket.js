import React, { useEffect } from 'react'
import { useUser } from '../Context/UserContext'
import { Navigate, useParams } from 'react-router-dom'
import CommentForm from '../Components/CommentForm'
import { useTickets } from '../Context/TicketContext'
import Comment from '../Components/Comment'

const SingleTicket = () => {
  const { user } = useUser()
  const { fetchSingleTicket, singleTicket } = useTickets()
  const { id } = useParams()

  useEffect(() => {
    fetchSingleTicket(id)
    // eslint-disable-next-line
  }, [id])

  if (!user) return <Navigate to='/' />

  if (!singleTicket) return <pre>Loading</pre>

  const { ticket, comments } = singleTicket

  return (
    <div>
      <div className='ticket-info'>
        <h4>{ticket.title}</h4>
        <p>{ticket.description} </p>
      </div>
      <div className='comments'>
        {comments.length < 1 ? (
          <h5>No comments for this ticket</h5>
        ) : (
          comments.map((comm) => {
            const { _id: commentId, title, comment, user, updatedAt } = comm
            return (
              <Comment
                key={commentId}
                title={title}
                comment={comment}
                user={user}
                updatedAt={updatedAt}
              />
            )
          })
        )}
      </div>
      <CommentForm ticketId={id} />
    </div>
  )
}

export default SingleTicket
