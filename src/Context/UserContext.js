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
  team: [],
  updateUserComplete: false,
  updateMsg: null,
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState)
  let navigate = useNavigate()

  const getUsers = async () => {
    const { data } = await axios.get('/users')
    console.log(data)
    dispatch({ type: 'GET_USERS', payload: data.users })
  }

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
      const { data } = await axios.post('/auth/register', { ...user })
      console.log(data)
      dispatch({ type: 'REGISTER_SUCCESS', payload: data.user })
      navigate('/dashboard')
    } catch (error) {
      console.log(error.response)
      dispatch({ type: 'REGISTER_ERROR', payload: error.response.data.msg })
    }
  }

  const login = async (user) => {
    setUserLoading()
    try {
      const { data } = await axios.post('/auth/login', { ...user })
      dispatch({ type: 'REGISTER_SUCCESS', payload: data.user })
      navigate('/dashboard')
    } catch (error) {
      console.log(error.response)
      dispatch({ type: 'REGISTER_ERROR', payload: error.response.data.msg })
    }
  }

  const demoLogin = async () => {
    setUserLoading()
    try {
      const { data } = await axios.post('/auth/login', {
        email: 'demouser@demouser.com',
        password: 'demouser123',
      })
      dispatch({ type: 'REGISTER_SUCCESS', payload: data.user })
      navigate('/dashboard')
    } catch (error) {
      console.log(error.response)
      dispatch({ type: 'REGISTER_ERROR', payload: error.response.data.msg })
    }
  }

  const updateUser = async (user) => {
    setUserLoading()
    try {
      const { data } = await axios.patch('/users/updateUser', { ...user })
      dispatch({ type: 'UPDATE_USER', payload: data.user })
    } catch (error) {
      console.log(error.response)
      dispatch({ type: 'UPDATE_USER_ERROR', payload: error.response.data.msg })
    }
  }

  const submitImage = async (user, image) => {
    setUserLoading()
    try {
      const { data } = await axios.patch('/users/updateUser', {
        name: user.name,
        email: user.email,
        image: image,
      })
      console.log(data)
      dispatch({ type: 'UPDATE_USER', payload: data.user })
    } catch (error) {
      console.log(error.response)
      dispatch({ type: 'UPDATE_USER_ERROR', payload: error.response.data.msg })
    }
  }

  const logout = async () => {
    try {
      const { data } = await axios.delete('/auth/logout')
      console.log(data)
      navigate('/')
      dispatch({ type: 'LOGOUT' })
    } catch (error) {
      console.log(error.response.message)
      navigate('/')
      dispatch({ type: 'LOGOUT' })
    }
  }

  const startUserUpdate = () => {
    dispatch({ type: 'START_USER_UPDATE' })
  }

  return (
    <UserContext.Provider
      value={{
        ...state,
        openSidebar,
        closeSidebar,
        setUserLoading,
        login,
        demoLogin,
        register,
        getUsers,
        updateUser,
        submitImage,
        startUserUpdate,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
