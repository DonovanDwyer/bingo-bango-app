export function bingoReducer(state = [], action){
  switch(action.type){
    case 'ACTIVATE_VALUE':
      return [...state, action.payload];

    default:
      return state;
  }
}
