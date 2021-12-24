const TicketReducer = (state, action) => {
  switch (action.type) {
    case 'GET_ALL_TICKETS_SUCCESS':
      return {
        ...state,
        isTicketLoading: false,
        tickets: [...action.payload.tickets],
        ownTickets: [
          ...action.payload.tickets.filter((ticket) => {
            return (
              ticket.createdBy._id === action.payload.id ||
              ticket.assignedTo.includes(action.payload.id)
            )
          }),
        ],
      }
    default:
      return state
  }
}

export default TicketReducer
