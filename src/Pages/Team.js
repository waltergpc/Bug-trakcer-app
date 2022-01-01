import React, { useState, useEffect } from 'react'
import { useUser } from '../Context/UserContext'
import { Navigate } from 'react-router-dom'
import styled from 'styled-components'
import UserArticle from '../Components/UserArticle'

const Team = () => {
  const { user, team, getUsers } = useUser()
  const [teamDisplayed, setTeamDisplayed] = useState('All')
  const [assignMsg, setAssignMsg] = useState(null)

  useEffect(() => {
    getUsers()
    // eslint-disable-next-line
  }, [])

  if (!user) return <Navigate to='/' />

  const filterByTeam = (users, team, user) => {
    let filteredUsers
    if (!user.role === 'admin') return users
    if (team === 'All') return users
    filteredUsers = users.filter((mem) => {
      return mem.team === team
    })
    return filteredUsers
  }

  return (
    <Wrapper>
      <h3>
        {user.role === 'admin'
          ? `${teamDisplayed} Users`
          : `${user.team} Users`}
      </h3>
      {assignMsg && <h5>{assignMsg}</h5>}

      {user.role === 'admin' && (
        <select
          value={teamDisplayed}
          onChange={(e) => setTeamDisplayed(e.target.value)}
        >
          <option value='All'>All</option>
          <option value='Betos'>Betos</option>
          <option value='Aslan'>Aslan</option>
          <option value='none'>Not Assigned</option>
        </select>
      )}
      <div className='users-list'>
        {filterByTeam(team, teamDisplayed, user).map((member) => {
          const { _id: id, name, email, team: currentTeam } = member
          return (
            <UserArticle
              key={id}
              name={name}
              currentTeam={currentTeam}
              email={email}
              id={id}
              setAssignMsg={setAssignMsg}
            />
          )
        })}
      </div>
    </Wrapper>
  )
}

export default Team

const Wrapper = styled.section`
  text-align: center;
  .users-list {
    margin: 1rem;
    display: grid;
    gap: 1rem;
  }
`
