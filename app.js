'use strict' // helps with debug

// includes //
const five = require('johnny-five')
const express = require('express')
const app = express()
const server = require('http').createServer(app).listen(3000)
const io = require('socket.io')(server, {'pingInterval': 100000000, 'pingTimeout': 100000000})
const State = require('./models/RoomState')
const RgbState = require('./models/RgbState')
const BoardComponents = require('./models/Board')
const boardMethods = require('./methods/boardMethods')
const connectionMethods = require('./methods/conectionMethods')

app.use(express.static('public')) // static serve;
let board = new five.Board({port:'com17', repl: false })
let state229 = {
  state2: new RgbState(100),
  state22: new RgbState(100),
  state229: new RgbState(100)
}
let state = new State('maxLight', 100, state229, new RgbState(100), 0, 0)
let boardComponents = new BoardComponents() // this shit is global in all modules

function writeState (socket = false, state) {
  boardMethods.sendStateToBoard(state, boardComponents, board)
  if (socket) {
    connectionMethods.updateClients(socket, state)
    boardMethods.applyStateToRemote(state, board)
  }
}

board.on('ready', function () {
  boardMethods.initBoard(boardComponents, five, board)
  writeState(false, state)
  io.on('connection', (socket) => {
    console.log('connection severed on socket:', socket.id + ' ' + io.engine.clientsCount)
    connectionMethods.sendInitialState(socket, state)
    socket.on('updateState', (newState) => {
      state = newState
      writeState(socket, state)
    })
  })
})
