const TicketReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TICKET_LOADING':
      return { ...state, isTicketsLoading: true }
    case 'SET_SINGLE_TICKET_LOADING':
      return { ...state, singleTicketLoading: true }

    case 'GET_ALL_TICKETS_SUCCESS':
      return {
        ...state,
        isTicketsLoading: false,
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
        singleTicketErrorMsg: null,
        singleTicket: {
          ticket: { ...action.payload.ticket },
          comments: [...action.payload.comments],
        },
        commentError: null,
      }
    case 'GET_ALL_TICKETS_ERROR':
      return {
        ...state,
        user: null,
        isTicketsLoading: false,
        showAlert: true,
        ticketErrorMsg: action.payload,
      }

    case 'SINGLE_TICKET_ERROR':
      return {
        ...state,
        isTicketsLoading: false,
        singleTicketLoading: false,
        showAlert: true,
        singleTicketErrorMsg:
          'There was an error with the operation, please try again',
      }

    case 'START_UPDATE':
      return { ...state, editTicketComplete: false }

    case 'END_UPDATE':
      return { ...state, editTicketComplete: true }

    case 'COMMENT_ERROR':
      return {
        ...state,
        isTicketsLoading: false,
        singleTicketLoading: false,
        showAlert: true,
        commentError: action.payload,
      }
    default:
      return state
  }
}

export default TicketReducer
