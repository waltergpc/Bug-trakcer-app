import React, { useState } from 'react'
import { useUser } from '../Context/UserContext'
import axios from 'axios'
import { useTickets } from '../Context/TicketContext'
import styled from 'styled-components'

const AssignTicketInput = ({ id }) => {
  const { team } = useUser()
  const [userToAssign, setUserToAssign] = useState('')
  const { fetchSingleTicket } = useTickets()

  const handleChange = (e) => {
    setUserToAssign(e.target.value)
    console.log(e.target.value)
  }

  const addAssignedUser = async (e) => {
    e.preventDefault()
    try {
      await axios.patch('/tickets/assign-ticket', {
        id: id,
        assignedTo: userToAssign,
      })
      setUserToAssign('')
      fetchSingleTicket(id)
    } catch (error) {
      console.log(error.response)
    }
  }
  return (
    <FormWrapper onSubmit={addAssignedUser}>
      <h6>Assign a new user</h6>
      <select value={userToAssign} onChange={handleChange}>
        {team.map((member) => {
          const { _id, name } = member
          return (
            <option key={_id} value={_id}>
              {name}
            </option>
          )
        })}
      </select>
      <button type='submit' className='add-btn'>
        Add
      </button>
    </FormWrapper>
  )
}

export default AssignTicketInput

const FormWrapper = styled.form`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;

  h6 {
    flex-basis: 100%;
    margin-bottom: 0.3rem;
    font-size: 0.7rem;
  }

  .add-btn {
    background-color: #5c7179;
    color: white;
    border-radius: 0.5rem;
    font-weight: bold;
    border: none;
    cursor: pointer;
  }

  .add-btn:hover {
    color: orange;
  }

  @media (min-width: 900px) {
    grid-column: 1 / 2;
    align-self: center;
  }
`
