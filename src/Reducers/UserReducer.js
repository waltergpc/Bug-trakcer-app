const UserReducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_SIDEBAR':
      return { ...state, sideBarOpen: true }
    case 'CLOSE_SIDEBAR':
      return { ...state, sideBarOpen: false }
    case 'SET_LOADING':
      return { ...state, isUserLoading: true }
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        isUserLoading: false,
        user: { ...action.payload },
        showAlert: false,
        errorMsg: null,
      }
    case 'REGISTER_ERROR':
      return {
        ...state,
        isUserLoading: false,
        showAlert: true,
        errorMsg: action.payload,
      }
    case 'GET_USERS':
      return { ...state, team: [...action.payload] }

    case 'UPDATE_USER':
      return {
        ...state,
        isUserLoading: false,
        user: { ...action.payload },
        showAlert: false,
        updateMsg: 'Update succesful',
        updateUserComplete: true,
      }
    case 'UPDATE_USER_ERROR':
      return {
        ...state,
        updateMsg: action.payload,
        updateUserComplete: true,
        isUserLoading: false,
      }
    case 'START_USER_UPDATE':
      return { ...state, updateUserComplete: false }
    case 'LOGOUT':
      return { ...state, user: null, team: [] }
    default:
      return state
  }
}
export default UserReducer
