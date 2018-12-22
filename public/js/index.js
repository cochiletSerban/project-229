const socket = io.connect('http://localhost:3000/')

function componentsLoaded() {
  socket.on('connect', () => {
    console.log('connected')
    let myId = socket.io.engine.id
    console.log(myId)
  })
  initHeaders(getUiElements().headers, "club")
  bodyStyles = window.getComputedStyle(document.body)
  console.log(bodyStyles.getPropertyValue('--myOrange'))
   
}
