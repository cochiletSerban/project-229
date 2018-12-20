const socket = io.connect('http://localhost:3000/')

$(document).ready(() => {
  socket.on('connect', () => {
    console.log('connected')
    let myId = socket.io.engine.id
    console.log(myId)
  })
})
