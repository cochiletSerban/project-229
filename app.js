'use strict' // helps with debug

// includes //
const five = require('johnny-five')
const express = require('express')
const app = express()
const server = require('http').createServer(app).listen(3000)
const io = require('socket.io')(server, {'pingInterval': 100000000, 'pingTimeout': 100000000})
const State = require('./models/RoomState')
const BoardComponents = require('./models/Board')
const boardMethods = require('./methods/boardMethods')
const connectionMethods = require('./methods/conectionMethods')

app.use(express.static('public')) // static serve;
let board = new five.Board({repl: false })
let state = new State()
let boardComponents = new BoardComponents() // this shit is global in all modules

board.on('ready', function () {
  boardMethods.initBoard(boardComponents, five, board)
  io.on('connection', (socket) => {
    console.log('connection severed on socket:', socket.id + ' ' + io.engine.clientsCount)
    connectionMethods.sendInitialState(socket, state)
    socket.on('updateState', (newState) => {
      state = newState
      connectionMethods.updateClients(socket, state)
      boardMethods.sendStateToBoard(state, boardComponents, board)
    })
  })
})
