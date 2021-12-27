import React, { useState, useEffect } from 'react'
import { useTickets } from '../Context/TicketContext'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

const TicketForm = ({ id, user }) => {
  const { createTicket, updateTicket } = useTickets()
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    priority: 'normal',
    status: 'new',
    category: 'UX',
  })
  useEffect(() => {
    if (id) {
      const getSingleTicket = async () => {
        const { data } = await axios.get(`/tickets/${id}`)
        if (data.ticket.createdBy._id !== user.userId) {
          return <Navigate to='/dashboard' />
        }
        if (!user.role === ('admin' || 'leader')) {
          return <Navigate to='/dashboard' />
        }
        setNewTicket({
          title: data.ticket.title,
          description: data.ticket.description,
          priority: data.ticket.priority,
          status: data.ticket.status,
          category: data.ticket.category,
        })
      }
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
    <form onSubmit={handleTicketSubmit}>
      <label>Ticket Title</label>
      <input
        type='text'
        name='title'
        value={newTicket.title}
        onChange={handleChange}
      />
      <label>Description</label>
      <textarea
        name='description'
        value={newTicket.description}
        onChange={handleChange}
      />
      <label>Priority</label>
      <select
        name='priority'
        value={newTicket.priority}
        onChange={handleChange}
      >
        <option value='normal'>Normal</option>
        <option value='urgent'>Urgent</option>
        <option value='low'>Low</option>
      </select>
      <label>Status</label>
      <select name='status' value={newTicket.status} onChange={handleChange}>
        <option value='new'>new</option>
        <option value='in progress'>In progress</option>
        <option value='solved'>Solved</option>
        <option value='pending'>Pending</option>
        <option value='cancelled'>Cancelled</option>
      </select>
      <label>Category</label>
      <select
        name='category'
        value={newTicket.category}
        onChange={handleChange}
      >
        <option value='UX'>UX</option>
        <option value='API'>API</option>
        <option value='Miscelleanous'>Miscelleanous</option>
        <option value='Design'>Design</option>
      </select>
      <button type='submit'>Save Ticket</button>
    </form>
  )
}

export default TicketForm
