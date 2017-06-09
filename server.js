let app = require('express')()
let server = require('http').Server(app)
let io = require('socket.io')(server)
let randomData = require('./randomData.js')

server.listen(4605)

let connections = []

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  connections.push(socket)
  console.log('Connected: %s sockets connected', connections.length)
  io.emit('status', { status: 'Connected', connections: connections.length })

  if (connections.length == 1) {
    randomData.initClients()
    randomData.initBombs()
    randomData.initTargets()
  }

  socket.emit('clients', randomData.clients)
  socket.emit('bombs', randomData.bombs)
  socket.emit('targets', randomData.targets)

  setInterval(() => {
    randomData.changeClients()
    randomData.changeBombs()
    randomData.changeTargets()
    socket.emit('clients', randomData.clients)
    socket.emit('bombs', randomData.bombs)
    socket.emit('targets', randomData.targets)
  }, 1000)

  socket.on('disconnect', (data) => {
    connections.splice(connections.indexOf(socket), 1)

    if (connections.length == 0) {
      randomData.clients = []
      randomData.bombs = []
      randomData.targets = []
    }

    io.emit('status', { status: 'Disconnected', connections: connections.length })
    console.log('Disconnected: %s sockets connected', connections.length)
  })
})
