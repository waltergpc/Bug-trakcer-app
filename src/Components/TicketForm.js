import React, { useState, useEffect } from 'react'
import { useTickets } from '../Context/TicketContext'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'

const TicketForm = ({ id, user }) => {
  const { createTicket, updateTicket, editTicketComplete, startTicketUpdate } =
    useTickets()
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    priority: 'normal',
    status: 'new',
    category: 'UX',
  })
  let navigate = useNavigate()
  useEffect(() => {
    if (id) {
      const getSingleTicket = async () => {
        const { data } = await axios.get(`/tickets/${id}`)
        if (
          !data.ticket.createdBy._id === user.userId ||
          !user.role === ('admin' || 'leader')
        ) {
          navigate('/dashboard')
        }
        setNewTicket({
          title: data.ticket.title,
          description: data.ticket.description,
          priority: data.ticket.priority,
          status: data.ticket.status,
          category: data.ticket.category,
        })
      }
      startTicketUpdate()
      getSingleTicket()
    }
    // eslint-disable-next-line
  }, [id])

  const handleChange = (e) => {
    setNewTicket({ ...newTicket, [e.target.name]: e.target.value })
  }

  const handleTicketSubmit = (e) => {
    e.preventDefault()
    if (id) {
      updateTicket(id, newTicket)
    }
    if (!id) {
      createTicket(newTicket)
    }
    setNewTicket({
      title: '',
      description: '',
      priority: 'normal',
      status: 'new',
      category: 'UX',
    })
  }
  return (
    <FormWrapper onSubmit={handleTicketSubmit}>
      <label>Ticket Title</label>
      <input
        type='text'
        name='title'
        value={newTicket.title}
        onChange={handleChange}
        className='title-input'
      />
      <label>Description</label>
      <textarea
        className='description-input'
        name='description'
        value={newTicket.description}
        onChange={handleChange}
      />
      <label>Priority</label>
      <select
        name='priority'
        className='priority-input'
        value={newTicket.priority}
        onChange={handleChange}
      >
        <option value='normal'>Normal</option>
        <option value='urgent'>Urgent</option>
        <option value='low'>Low</option>
      </select>
      <label>Status</label>
      <select
        name='status'
        value={newTicket.status}
        onChange={handleChange}
        className='status-input'
      >
        <option value='new'>new</option>
        <option value='in progress'>In progress</option>
        <option value='solved'>Solved</option>
        <option value='pending'>Pending</option>
        <option value='cancelled'>Cancelled</option>
      </select>
      <label>Category</label>
      <select
        name='category'
        className='category-input'
        value={newTicket.category}
        onChange={handleChange}
      >
        <option value='UX'>UX</option>
        <option value='API'>API</option>
        <option value='Miscelleanous'>Miscelleanous</option>
        <option value='Design'>Design</option>
      </select>
      <button type='submit' className='submit-btn' disabled={!newTicket.title}>
        Save Ticket
      </button>
      {id && (
        <div>
          {!editTicketComplete ? (
            <span className='no-update'>Update hasn't been submitted</span>
          ) : (
            <div className='updated-div'>
              <span className='updated'>Update Submitted</span>
              <Link className='update-link' to='/dashboard'>
                Dashboard
              </Link>
              <Link className='update-link' to='/tickets'>
                Ticket center
              </Link>
              <Link className='update-link' to={`/tickets/${id}`}>
                Ticket updated
              </Link>
            </div>
          )}
        </div>
      )}
    </FormWrapper>
  )
}

export default TicketForm

const FormWrapper = styled.form`
  display: grid;
  padding: 0.5rem;
  gap: 0.5rem;

  label {
    font-weight: 600;
  }

  .title-input {
    outline: none;
    border-width: 0 1px 1px 0;
    border-color: rgba(0, 0, 0, 0.7);
    transition: var(--transition);
    height: 2rem;
  }

  .title-input:focus {
    border-color: rgba(0, 0, 0, 1);
  }

  .description-input {
    height: 5rem;
    outline: none;
  }

  .submit-btn {
    margin-top: 1rem;
    background-color: rgb(168, 105, 0);
    font-weight: bold;
    color: #fbf4f1;
    border: none;
    border-radius: 0.3rem;
    cursor: pointer;
    transition: var(--transition);
  }

  .submit-btn:hover {
    transform: scale(1.03);
  }

  .submit-btn:disabled {
    opacity: 0.5;
  }

  .no-update {
    margin-top: 1.5rem;
    color: red;
    font-weight: bold;
    font-size: 0.8rem;
    text-align: center;
  }

  .updated-div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    font-size: 0.7rem;
    flex-wrap: wrap;
  }

  .updated {
    font-weight: bold;
    color: forestgreen;
  }

  .update-link {
    margin-top: 1.5rem;
    color: Navy;
    font-weight: bold;
  }

  @media (min-width: 900px) {
    select {
      height: 1.5rem;
    }
    .submit-btn {
      width: fit-content;
      height: 2rem;
      justify-self: center;
    }
    .updated-div {
      font-size: 1rem;
    }
  }
`
