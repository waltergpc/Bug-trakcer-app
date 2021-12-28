import React, { useReducer, createContext, useContext } from 'react'
import axios from 'axios'
import Reducer from '../Reducers/TicketReducer'
import { useUser } from './UserContext'
import { useNavigate } from 'react-router-dom'

const TicketContext = createContext()

export const useTickets = () => useContext(TicketContext)

const initialState = {
  tickets: [],
  ownTickets: [],
  isTicketsLoading: false,
  singleTicketLoading: false,
  singleTicket: null,
  showAlert: false,
  ticketErrorMsg: null,
}

export const TicketProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState)
  const { user } = useUser()
  let navigate = useNavigate()

  const setTicketLoading = () => {
    dispatch({ type: 'SET_TICKET_LOADING' })
  }

  const setSingleTicketLoading = () => {
    dispatch({ type: 'SET_SINGLE_TICKET_LOADING' })
  }

  const fetchTickets = async (id) => {
    setTicketLoading()
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

  const fetchSingleTicket = async (id) => {
    setSingleTicketLoading()
    try {
      const { data } = await axios.get(`/tickets/${id}`)
      console.log(data)
      dispatch({ type: 'GET_SINGLE_TICKET_SUCCESS', payload: data })
    } catch (error) {
      console.log(error)
    }
  }

  const createTicket = async (ticket) => {
    try {
      const data = await axios.post('/tickets', { ...ticket })
      console.log(data)
      fetchTickets()
      navigate('/tickets')
    } catch (error) {
      dispatch({ type: 'TICKET_ERROR' })
      console.log(error)
    }
  }

  const deleteTicket = async (id) => {
    setTicketLoading()
    try {
      await axios.delete(`/tickets/${id}`)
      fetchTickets(user.userId)
    } catch (error) {
      console.log(error.response)
      dispatch({ type: 'TICKET_ERROR' })
    }
  }

  const updateTicket = async (id, ticket) => {
    setTicketLoading()
    try {
      const { data } = await axios.patch(`/tickets/${id}`, { ...ticket })
      console.log(data)
      fetchTickets(user.userId)
    } catch (error) {
      dispatch({ type: 'TICKET_ERROR' })
      console.log(error.response)
    }
  }

  const createComment = async (ticketId, comment) => {
    try {
      await axios.post('/comments', {
        ...comment,
        ticket: ticketId,
      })
      fetchSingleTicket(ticketId)
    } catch (error) {
      console.log(error.response)
    }
  }

  return (
    <TicketContext.Provider
      value={{
        ...state,
        fetchTickets,
        fetchSingleTicket,
        createTicket,
        deleteTicket,
        updateTicket,
        createComment,
      }}
    >
      {children}
    </TicketContext.Provider>
  )
}
