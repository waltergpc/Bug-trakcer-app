import React, { useReducer, createContext, useContext } from 'react'
import Reducer from '../Reducers/UserReducer'

const UserContext = createContext()

export const useUser = () => useContext(UserContext)

const initialState = {
  user: 'juanito',
  sideBarOpen: false,
  isUserLoading: false,
  showAlert: false,
  errorMsg: null,
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState)

  const openSidebar = () => {
    dispatch({ type: 'OPEN_SIDEBAR' })
  }

  const closeSidebar = () => {
    dispatch({ type: 'CLOSE_SIDEBAR' })
  }

  const setUserLoading = () => {
    dispatch({ type: 'SET_LOADING' })
  }
  return (
    <UserContext.Provider
      value={{ ...state, openSidebar, closeSidebar, setUserLoading }}
    >
      {children}
    </UserContext.Provider>
  )
}
