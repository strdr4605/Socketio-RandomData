let clients = []
let bombs = []
let targets = []

let clientsNumber = Math.floor(Math.random() * 10)
let bombsNumber = Math.floor(Math.random() * clientsNumber)

let targetsNumber = 3

function getRandomColor() {
        var letters = '0123456789ABCDEF'
        var color = '#'
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)]
        }
        return color
    }


function initClients() {
  for (let i = 0; i < clientsNumber; i++) {
    let clientData = {
      x: Math.random(),
      y: Math.random(),
      color: getRandomColor()
    }
    clients.push(clientData)
  }
}

function initBombs() {
  for (let i = 0; i < bombsNumber; i++) {
    let bombData = {
      x: Math.random(),
      y: Math.random(),
      color: '#000000'
    }
    bombs.push(bombData)
  }
}

function initTargets() {
  for (let i = 0; i < targetsNumber; i++) {
    let targetData = {
      color: getRandomColor(),
      value: Math.random()
    }
    targets.push(targetData)
  }
}

function changeClients() {
  for (let i = 0; i < clientsNumber; i++) {
    clients[i].x = Math.random()
    clients[i].y = Math.random()
  }
}

function changeBombs() {
  for (let i = 0; i < bombsNumber; i++) {
    bombs[i].x = Math.random()
    bombs[i].y = Math.random()
  }
}

function changeTargets() {
  for (let i = 0; i < targetsNumber; i++) {
    targets[i].value = Math.random()
  }
}

module.exports = {
  clients,
  bombs,
  targets,
  getRandomColor,
  initClients,
  initBombs,
  initTargets,
  changeClients,
  changeBombs,
  changeTargets
}
