const filterTicketsStatus = (tickets, status) => {
  let toFilter = [...tickets]
  return toFilter.filter((ticket) => {
    return ticket.status === status
  })
}

export { filterTicketsStatus }
