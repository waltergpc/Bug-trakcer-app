import React, { useState } from 'react'
import { useUser } from '../Context/UserContext'
import { Navigate } from 'react-router-dom'

const Team = () => {
  const { user, team } = useUser()
  const [teamDisplayed, setTeamDisplayed] = useState('all')
  console.log(team)

  if (!user) return <Navigate to='/' />

  if (team.length < 1) {
    return <h3>No users to show</h3>
  }

  const filterByTeam = (users, team, user) => {
    let filteredUsers
    if (!user.role === 'admin') return users
    if (team === 'all') return users
    filteredUsers = users.filter((mem) => {
      return mem.team === team
    })
    return filteredUsers
  }

  console.log(user.role)
  console.log(teamDisplayed)
  return (
    <div>
      {user.role === 'admin' && (
        <select
          value={teamDisplayed}
          onChange={(e) => setTeamDisplayed(e.target.value)}
        >
          <option value='all'>All</option>
          <option value='Betos'>Betos</option>
          <option value='Aslan'>Aslan</option>
          <option value='none'>Not Assigned</option>
        </select>
      )}
      {filterByTeam(team, teamDisplayed, user).map((member) => {
        const { _id: id, name, email, team: memberTeam } = member
        return (
          <article key={id}>
            <span>Name:{name}</span>
            <span>Email:{email}</span>
            {user.role === 'admin' && <span>Team:{memberTeam} </span>}
          </article>
        )
      })}
    </div>
  )
}

export default Team
