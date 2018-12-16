export function userReducer(state = "", action) {
  switch(action.type){
    case 'LOADING':
      return ""

    case 'ADD_USER':
      return action.payload.user

    case 'GET_USER':
      return action.payload.user

    default:
      return state
  }
}
