export function gameReducer(state = "", action){
  switch(action.type){
    case 'DECLARE_WINNER':
      return action.payload

    default:
      return state

  }
}
