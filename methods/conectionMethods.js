let sendInitialState = function sendState (socket, state) {
  socket.emit('saInceapaNebunia', state)
}

module.exports = {

  sendInitialState: sendInitialState
}
