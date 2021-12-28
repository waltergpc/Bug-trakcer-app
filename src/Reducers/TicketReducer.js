const TicketReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TICKET_LOADING':
      return { ...state, isTicketsLoading: true }
    case 'SET_SINGLE_TICKET_LOADING':
      return { ...state, singleTicketLoading: true }

    case 'GET_ALL_TICKETS_SUCCESS':
      return {
        ...state,
        isTicketLoading: false,
        tickets: [...action.payload.tickets],
        ownTickets: action.payload.tickets.filter((ticket) => {
          return (
            ticket.createdBy._id === action.payload.id ||
            ticket.assignedTo.includes(action.payload.id)
          )
        }),
      }
    case 'GET_SINGLE_TICKET_SUCCESS':
      return {
        ...state,
        singleTicketLoading: false,
        singleTicket: {
          ticket: { ...action.payload.ticket },
          comments: [...action.payload.comments],
        },
      }
    case 'GET_ALL_TICKETS_ERROR':
      return {
        ...state,
        user: null,
        isTicketsLoading: false,
        showAlert: true,
        ticketErrorMsg: action.payload,
      }

    case 'TICKET_ERROR':
      return {
        ...state,
        isTicketsLoading: false,
        showAlert: true,
        ticketErrorMsg:
          'There was an error with the operation, please refrsh and try again',
      }

    case 'START_UPDATE':
      return { ...state, editTicketComplete: false }

    case 'END_UPDATE':
      return { ...state, editTicketComplete: true }
    default:
      return state
  }
}

export default TicketReducer
