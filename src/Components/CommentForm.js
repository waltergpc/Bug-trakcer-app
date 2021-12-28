import React, { useState } from 'react'
import { useTickets } from '../Context/TicketContext'

const CommentForm = ({ ticketId }) => {
  const { createComment } = useTickets()
  const [newComment, setNewComment] = useState({ title: '', comment: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    createComment(ticketId, newComment)
    setNewComment({ title: '', comment: '' })
  }

  const handleChange = (e) => {
    setNewComment({ ...newComment, [e.target.name]: e.target.value })
  }
  return (
    <form className='comment-form' onSubmit={handleSubmit}>
      <input
        type='text'
        name='title'
        onChange={handleChange}
        value={newComment.title}
      />
      <input
        type='text'
        name='comment'
        onChange={handleChange}
        value={newComment.comment}
      />
      <button type='submit'>Submit Comment</button>
    </form>
  )
}

export default CommentForm
