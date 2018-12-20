var five = require("johnny-five");
const io = require('socket.io')
const server = io.listen(3000)


var board = new five.Board({port:'COM4', repl: false});


board.on("ready", function() {

  server.on('connection', (socket) => {
    console.log('connection severed on socket:', socket.id + ' ' + server.engine.clientsCount)
    var led = new five.Led(2);
    led.on();
  });

});