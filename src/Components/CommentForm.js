import React, { useState, useEffect } from 'react'
import { useTickets } from '../Context/TicketContext'
import axios from 'axios'
import styled from 'styled-components'

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
    <FormWrapper className='comment-form' onSubmit={handleSubmit}>
      <h4>Add a Comment</h4>
      <input
        type='text'
        name='title'
        className='comment-title'
        placeholder='Comment title'
        onChange={handleChange}
        value={newComment.title}
      />
      <textarea
        name='comment'
        className='comment-body'
        onChange={handleChange}
        placeholder='Comment body'
        value={newComment.comment}
      />
      <button type='submit' className='submit-comment'>
        Submit Comment
      </button>
    </FormWrapper>
  )
}

export default CommentForm

const FormWrapper = styled.form`
  display: grid;
  padding: 0.5rem;
  gap: 0.5rem;

  .comment-body,
  .comment-title {
    outline: none;
  }

  .submit-comment {
    background-color: navy;
    color: white;
    font-weight: bold;
    border-radius: 0.3rem;
    border: none;
    cursor: pointer;
  }

  @media (min-width: 900px) {
    .comment-body {
      height: 4rem;
    }
    .submit-comment {
      width: fit-content;
      height: 2rem;
    }
  }
`
