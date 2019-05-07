import socketIO from 'socket.io-client'

export function bangoReducer(state = [], action){
  switch(action.type){
    case 'LOADING':
      return 'loading'
    case 'GET_VALUES':
      // let io = socketIO() // heroku deployment only
      let io = socketIO("http://localhost:9001") // dev environment only
      io.emit('add_values', {values: action.payload, room: action.room})
      return action.payload

      case 'GET_THEMES':
        return action.payload

    default:
      return state

  }
}
