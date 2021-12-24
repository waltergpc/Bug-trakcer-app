import React, { useReducer, createContext, useContext } from 'react'
import Reducer from '../Reducers/UserReducer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserContext = createContext()

export const useUser = () => useContext(UserContext)
//axios.defaults.baseURL = 'http://localhost:5000/api/v1'

const initialState = {
  user: null,
  sideBarOpen: false,
  isUserLoading: false,
  showAlert: false,
  errorMsg: null,
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState)
  let navigate = useNavigate()

  const openSidebar = () => {
    dispatch({ type: 'OPEN_SIDEBAR' })
  }

  const closeSidebar = () => {
    dispatch({ type: 'CLOSE_SIDEBAR' })
  }

  const setUserLoading = () => {
    dispatch({ type: 'SET_LOADING' })
  }

  const register = async (user) => {
    try {
      setUserLoading()
      const { data } = await axios.post('/auth/login', { ...user })
      console.log(data)
      dispatch({ type: 'REGISTER_SUCCESS', payload: data.user })
    } catch (error) {
      console.log(error.response)
      dispatch({ type: 'REGISTER_ERROR', payload: error.response.data.msg })
    }
  }

  const login = async (user) => {
    try {
      setUserLoading()
      const { data } = await axios.post('/auth/login', { ...user })
      console.log(data)
      dispatch({ type: 'REGISTER_SUCCESS', payload: data.user })
      navigate('/dashboard')
    } catch (error) {
      console.log(error.response)
      dispatch({ type: 'REGISTER_ERROR', payload: error.response.data.msg })
    }
  }
  return (
    <UserContext.Provider
      value={{
        ...state,
        openSidebar,
        closeSidebar,
        setUserLoading,
        login,
        register,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
