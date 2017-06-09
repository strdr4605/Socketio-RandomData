let app = require('express')()
let server = require('http').Server(app)
let io = require('socket.io')(server)
let randomData = require('./randomData.js')

server.listen(4605)

let connections = []
let all = {
  clients: [],
  bombs: [],
  targets: []
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

randomData.initClients()
randomData.initBombs()
randomData.initTargets()

setInterval(() => {
  randomData.changeClients()
  randomData.changeBombs()
  randomData.changeTargets()
  all['clients'] = randomData.clients
  all['bombs'] = randomData.bombs
  all['targets'] = randomData.targets
}, 1000)

io.on('connection', (socket) => {
  connections.push(socket)
  console.log('Connected: %s sockets connected', connections.length)
  io.emit('status', { status: 'Connected', connections: connections.length })

  setInterval(() => {
    io.emit('all', all)
    io.emit('clients', randomData.clients)
    io.emit('bombs', randomData.bombs)
    io.emit('targets', randomData.targets)
  }, 1000)

  socket.on('disconnect', (data) => {
    connections.splice(connections.indexOf(socket), 1)
    io.emit('status', { status: 'Disconnected', connections: connections.length })
    console.log('Disconnected: %s sockets connected', connections.length)
  })
})
