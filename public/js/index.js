const socket = io.connect('http://localhost:3000/')

function componentsLoaded() {
  socket.on('connect', () => {
    console.log('connected')
    let myId = socket.io.engine.id
    console.log(myId)
  })
  
  initUi()

}
