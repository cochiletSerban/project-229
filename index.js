
'use strict' // helps with debug

// includes //
const five = require('johnny-five')
const express = require('express')
const app = express()
const server = require('http').createServer(app).listen(3000)
const io = require('socket.io')(server)

app.use(express.static('public')) // static serve;

var board = new five.Board({ port: 'COM4', repl: false })

board.on('ready', function () {
  io.on('connection', (socket) => {
    console.log('connection severed on socket:', socket.id + ' ' + io.engine.clientsCount)
    var led = new five.Led(2)
    led.on()
  })
})
