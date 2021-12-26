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

  const setTicketLoading = () => {
    dispatch({ type: 'SET_TICKET_LOADING' })
  }

  const fetchTickets = async (id) => {
    try {
      const { data } = await axios.get('/tickets')
      console.log(data)
      dispatch({
        type: 'GET_ALL_TICKETS_SUCCESS',
        payload: { tickets: data.tickets, id },
      })
    } catch (error) {
      dispatch({ type: 'GET_ALL_TICKETS_ERROR', payload: error.response.msg })
      console.log(error.response)
    }
  }

  const createTicket = async (ticket) => {
    try {
      const data = await axios.post('/tickets', { ...ticket })
      console.log(data)
      fetchTickets()
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTicket = async (id) => {
    try {
      setTicketLoading()
      const { data } = await axios.delete(`/tickets/${id}`)
      console.log(data)
    } catch (error) {
      console.log(error.response)
    }
  }

  return (
    <TicketContext.Provider
      value={{ ...state, fetchTickets, createTicket, deleteTicket }}
    >
      {children}
    </TicketContext.Provider>
  )
}
