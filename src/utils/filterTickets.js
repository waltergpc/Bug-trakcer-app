const filterTicketsStatus = (tickets, status) => {
  return tickets.filter((ticket) => {
    return ticket.status === status
  })
}

export { filterTicketsStatus }
