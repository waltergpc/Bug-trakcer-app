import React, { useReducer, createContext, useContext } from 'react'
import axios from 'axios'
import Reducer from '../Reducers/TicketReducer'

const TicketContext = createContext()

export const useTickets = () => useContext(TicketContext)

const initialState = {
  tickets: [],
  ownTickets: [],
  isTicketsLoading: false,
  showAlert: false,
  ticketErrorMsg: null,
}

export const TicketProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState)

  const fetchTickets = async (id) => {
    try {
      const { data } = await axios.get('/tickets')
      console.log(data)
      dispatch({
        type: 'GET_ALL_TICKETS_SUCCESS',
        payload: { tickets: data.tickets, id },
      })
    } catch (error) {
      console.log(error.response)
    }
  }

  return (
    <TicketContext.Provider value={{ ...state, fetchTickets }}>
      {children}
    </TicketContext.Provider>
  )
}
