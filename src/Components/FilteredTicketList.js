import React, { useState } from 'react'
import { useTickets } from '../Context/TicketContext'
import { filterTicketsStatus } from '../utils/filterTickets'
import {
  sortByEarliestCreated,
  sortByMostRecent,
  sortByAuthorAtoZ,
  sortByAuthorZtoA,
  sortTitleAtoZ,
  sortTitleZtoA,
} from '../utils/sortingFunctions'
import styled from 'styled-components'
import TicketArticle from './TicketArticle'

const FilteredTicketList = ({ status }) => {
  const { tickets } = useTickets()
  const [sort, setSort] = useState('Earliest')

  let filteredByStatus = filterTicketsStatus(tickets, status)

  const capitalStatus = status.charAt(0).toUpperCase() + status.slice(1)

  if (sort === 'Earliest') filteredByStatus.sort(sortByEarliestCreated)
  if (sort === 'Latest') filteredByStatus.sort(sortByMostRecent)
  if (sort === 'Created By a-z') filteredByStatus.sort(sortByAuthorAtoZ)
  if (sort === 'Created By z-a') filteredByStatus.sort(sortByAuthorZtoA)
  if (sort === 'Title A-Z') filteredByStatus.sort(sortTitleAtoZ)
  if (sort === 'Title Z-A') filteredByStatus.sort(sortTitleZtoA)

  if (filteredByStatus.length < 1)
    return (
      <Wrapper>
        <h5>No {capitalStatus} Tickets</h5>
      </Wrapper>
    )
  return (
    <Wrapper>
      <h5>{capitalStatus} Tickets</h5>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className='sort-select'
      >
        <option value='Earliest'>Oldest</option>
        <option value='Latest'>Most Recent</option>
        <option value='Created By a-z'>Created By A-Z</option>
        <option value='Created By z-a'>Created By Z-A</option>
        <option value='Title A-Z'>Title A-Z</option>
        <option value='Title Z-A'>Title Z-A</option>
      </select>

      {filteredByStatus.map((ticket) => {
        const {
          title,
          updatedAt,
          createdBy,
          status,
          priority,
          category,
          _id: id,
        } = ticket

        return (
          <TicketArticle
            key={id}
            id={id}
            title={title}
            updatedAt={updatedAt}
            status={status}
            priority={priority}
            category={category}
            createdBy={createdBy}
          />
        )
      })}
    </Wrapper>
  )
}

export default FilteredTicketList

const Wrapper = styled.div`
  text-align: center;
  border-radius: 1rem;
  background-color: lightgrey;
  width: 100%;
  padding: 0.7rem;
  .sort-select {
    margin: 0 auto;
  }

  @media (min-width: 900px) {
  }
`
