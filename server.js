// const app = require('express')();
// const http = require('http').Server(app);
// const socketIO = require('socket.io')
// const path = require('path')
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 9001;

const app = express();
const server = require('http').createServer(app);

app.use(express.static(path.join(__dirname, '/build')));
app.get('/*', (req, res, next) => res.sendFile(path.join(__dirname + '/build/index.html')));

const io = socketIO(server);

// app.use(express.static(__dirname + '/'));
// app.use(express.static(path.join(__dirname, './'))
//
// app.get('/', (req, res, next) => {
//   return res.sendFile(__dirname + '../public/index.html');
// })


// const express = require('express');
// const socketIO = require('socket.io');
// const path = require('path');
// const PORT = 9001;
// const INDEX = path.join(__dirname, 'index.html');
// const server = express()
//   .use((req, res) => res.sendFile(INDEX) )
//   .listen(PORT, () => console.log(`Listening on port ${PORT}`, process.env.PORT));
//
// const io = socketIO(server);

let values = {}
let activeValues = {}
let cpu = {}
let theme = ""
let rooms = []


// app.get('/', function(req, res){
//   res.send('<h1>Running socket server...</h1>');
// })

io.on('connection', socket => {
  console.log(`${socket.id} connected`)

  let room;

  socket.on('victory', function(data){
    io.sockets.to(data.room).emit('winner', data.user)
    values[data.room] = []
    activeValues[data.room] = []
    theme = ""
    cpu[data.room] = false
    rooms = rooms.filter(rm => rm.name !== data.room)
  })

  socket.on('new_game_room', roomData => {
    room = roomData.name
    rooms.push(roomData)
    socket.join(room)
    activeValues[roomData.name] = []
  })

  socket.on('get_rooms', () => {
    socket.emit('receive_rooms', rooms)
  })

  socket.on('join_room', roomName => {
    if(roomName === {}){
    socket.join(rooms[0])
  } else {
    socket.join(roomName)
    console.log(roomName)
  }
  })

// BINGO Game Related Functionality

  socket.on('add', (data) => {
    if(activeValues[data.room] && !activeValues[data.room].find(val => val === data.value)){
      activeValues[data.room].push(data.value)
      io.sockets.to(data.room).emit('new', data.value, activeValues[data.room])
    }
  })

  socket.on('check_cpu_status', (data) => {
    socket.emit('give_cpu_status', cpu[data])
  })

  socket.on('cpu_running', (data) => {
    cpu[data] = true
  })

  socket.on('cpu_dying', (data) => {
    cpu[data] = false
  })

  // BANGO Game Functionality

  socket.on('set_theme', (data) => {
    theme = data
  })

  socket.on('get_theme', () => {
    socket.emit('receive_theme', theme)
  })

  socket.on('add_values', (data) => {
      values[data.room] = data.values
      activeValues[data.room] = []
      io.sockets.to(data.room).emit('receive_values', values[data.room])
  })

  socket.on('get_current_game_values', (data) => {
    socket.emit('receive_values', values[data.room])
  })

  socket.on('add_bango_value', (data) => {
    if(activeValues[data.room]){
      activeValues[data.room].push(data.value)
      io.sockets.to(data.room).emit('new_bango_value', activeValues[data.room])
    }
  })

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`)
    values = {}
    activeValues = {}
    cpu = {}
    theme = ""
    rooms = []
  })
})

server.listen(PORT);

// const port = 9001
//
// http.listen(port, function(){
//   console.log('its over 9000!!!')
// })
