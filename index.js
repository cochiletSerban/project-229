
'use strict' // helps with debug

// includes //
const five = require('johnny-five')
const express = require('express')
const app = express()
const server = require('http').createServer(app).listen(3000)
const io = require('socket.io')(server)
const State = require('./models/RoomState')

app.use(express.static('public')) // static serve;
var board = new five.Board({ port: 'COM4', repl: false })

let state = new State()



board.on('ready', function () {
  io.on('connection', (socket) => {
    console.log('connection severed on socket:', socket.id + ' ' + io.engine.clientsCount)
    var led = new five.Led(2)
    led.on()

    socket.on('disconnect', (reason) => {
      console.log('one client dissconnected : ' + reason)
      if (io.engine.clientsCount === 0) led.off()
    })

  })
})
