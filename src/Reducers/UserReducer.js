const UserReducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_SIDEBAR':
      return { ...state, sideBarOpen: true }
    case 'CLOSE_SIDEBAR':
      return { ...state, sideBarOpen: false }
    case 'SET_LOADING':
      return { ...state, isLoading: true }

    default:
      return state
  }
}
export default UserReducer
