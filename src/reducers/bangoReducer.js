import socketIO from 'socket.io-client'

export function bangoReducer(state = [], action){
  switch(action.type){
    case 'GET_VALUES':
      let io = socketIO("http://localhost:9001")
      io.emit('add_values', {values: action.payload, room: action.room})
      return action.payload

    default:
      return state

  }
}
