export function userReducer(state = "", action) {
  let user;
  switch(action.type){

    case 'ADD_USER':
      if (action.payload.user){
        localStorage.setItem('token', action.payload.jwt)
        user = action.payload.user
      } else {
        user = state
      }

      return user

    case 'GET_USER':
    if (action.payload.user){
      localStorage.setItem('token', action.payload.jwt)
      user = action.payload.user
    } else {
      user = state
    }
    return user

    case 'GET_USER_BY_TOKEN':
    if (action.payload.user){
      localStorage.setItem('token', localStorage.token)
      user = action.payload.user
    } else {
      user = state
    }
    return user

    case 'INCREASE_WINS':
      state.wins = state.wins + 1
      return state

    case 'INCREASE_LOSSES':
      state.losses = state.losses + 1
      return state

    case 'LOG_OUT':
      localStorage.clear()
      return ""

    default:
      return state
  }
}
