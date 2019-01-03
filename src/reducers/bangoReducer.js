import socketIO from 'socket.io-client'
// const BASEURL = "http://localhost:9001"
const BASEURL = ":9001"
// const BASEURL = "http://53285bc3.ngrok.io"

export function bangoReducer(state = [], action){
  switch(action.type){
    case 'LOADING':
      return 'loading'
    case 'GET_VALUES':
      let io = socketIO(BASEURL)
      io.emit('add_values', {values: action.payload, room: action.room})
      return action.payload

      case 'GET_THEMES':
        return action.payload

    default:
      return state

  }
}
