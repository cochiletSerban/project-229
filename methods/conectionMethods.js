let sendInitialState = function sendState (socket, state) {
  socket.emit('saInceapaNebunia', state)
}

let updateClients = function updateClients (socket, newState) {
  socket.broadcast.emit('saInceapaNebunia', newState)
}

module.exports = {
  updateClients: updateClients,
  sendInitialState: sendInitialState
}
