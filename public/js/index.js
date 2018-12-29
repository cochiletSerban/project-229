const socket = io.connect('192.168.1.101:3000/')

// var roomState = new RoomState()
// roomState.modeName = 'maxLight'
// roomState.whiteStrip = 255
// roomState.roof.brightness = 240
// roomState.roof.color = 'blue'
// roomState.state229.state2.brightness = 127
// roomState.state229.state22.brightness = 127
// roomState.state229.state229.brightness = 127

function componentsLoaded() {
  socket.on('saInceapaNebunia', (initState) => {
    window.roomState = initState
    initUi()
  })
}
