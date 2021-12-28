import React, { useState, useEffect } from 'react'
import { useTickets } from '../Context/TicketContext'
import axios from 'axios'

const CommentForm = ({ ticketId, editId, turnEdit }) => {
  const { createComment, updateComment } = useTickets()
  const [newComment, setNewComment] = useState({ title: '', comment: '' })

  useEffect(() => {
    if (editId) {
      const fetchSingleComment = async (id) => {
        const { data } = await axios.get(`/comments/${id}`)
        console.log(data)
        setNewComment({
          title: data.comment.title,
          comment: data.comment.comment,
        })
      }
      fetchSingleComment(editId)
    }
    // eslint-disable-next-line
  }, [editId])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editId) {
      updateComment(editId, newComment, ticketId)
      turnEdit(false)
    }
    if (!editId) {
      createComment(ticketId, newComment)
      setNewComment({ title: '', comment: '' })
    }
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
