import React, { useState } from 'react'
import axios from 'axios'
import { useUser } from '../Context/UserContext'
import styled from 'styled-components'

const UserArticle = ({ name, id, email, currentTeam, setAssignMsg, image }) => {
  const { user, getUsers } = useUser()
  const [targetTeam, setTargetTeam] = useState(currentTeam)

  const assignTeam = async (e) => {
    e.preventDefault()
    try {
      const data = await axios.patch('/api/v1/users/assignteam', {
        toAssign: id,
        team: targetTeam,
      })
      console.log(data)
      setAssignMsg(`${name} Assigned to team ${targetTeam}`)
      getUsers()
    } catch (error) {
      console.log(error.response)
      getUsers()
      setAssignMsg('Assignation went wrong')
    } finally {
      setTimeout(() => {
        setAssignMsg(null)
      }, 3000)
    }
  }

  return (
    <Wrapper className='user-article'>
      <div>
        <img className='avatar' src={image} alt='name' />
        <p>{name}</p>
      </div>
      <p>{email}</p>
      {user.role === 'admin' && (
        <form onSubmit={assignTeam} className='team-form'>
          <select
            value={targetTeam}
            onChange={(e) => setTargetTeam(e.target.value)}
          >
            <option value='Betos'>Betos</option>
            <option value='Aslan'>Aslan</option>
          </select>
          <button type='submit' className='assign-btn'>
            Assign
          </button>
        </form>
      )}
    </Wrapper>
  )
}

export default UserArticle

const Wrapper = styled.article`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  align-items: center;
  text-align: center;
  font-size: 0.7rem;
  border-radius: 1rem;
  font-weight: bold;
  padding: 1rem;
  gap: 0.5rem;

  .team-form {
    grid-column: 1 / 3;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

  .assign-btn {
    background-color: #5c7179;
    border: none;
    color: white;
    font-weight: bold;
    border-radius: 0.3rem;
    cursor: pointer;
  }

  .assign-btn:hover {
    color: orange;
  }

  .avatar {
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
  }

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr 1fr;
    font-size: 0.8rem;
    .team-form {
      grid-column: 3 / 4;
      justify-content: start;
      padding-left: 2rem;
    }

    .assign-btn {
      margin-left: 1rem;
    }
  }
`
