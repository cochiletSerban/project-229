const socket = io.connect('http://localhost:3000/')

var roomState = new RoomState()
roomState.modeName = 'maxLight'
roomState.whiteStrip = 255
roomState.roof.brightness = 240
roomState.roof.color = 'blue'
roomState.state229.state2.brightness = 127
roomState.state229.state22.brightness = 127
roomState.state229.state229.brightness = 127

function componentsLoaded() {
  socket.on('connect', () => {
    console.log('connected')
    let myId = socket.io.engine.id
    console.log(myId)
  })

  initUi()

}
