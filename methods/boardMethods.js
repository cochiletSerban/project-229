const State = require('../models/RoomState')

let initBoard = function initBoard (boardComponents, five, board) {
  board.i2cConfig()
  boardComponents.strip2 = new five.Led.RGB({
    pins: {
      red: 2,
      green: 3,
      blue: 4
    },
    isAnode: false
  })
  boardComponents.strip22 = new five.Led.RGB({
    pins: {
      red: 5,
      green: 6,
      blue: 7
    },
    isAnode: false
  })
  boardComponents.strip229 = new five.Led.RGB({
    pins: {
      red: 8,
      green: 9,
      blue: 10
    },
    isAnode: false
  })
  boardComponents.stripWhite = new five.Led(10)
  resetBoard(boardComponents)
}

let sendStateToBoard = function sendStateToBoard (state, boardComponents, board) {
  applyStateToLocal(state, boardComponents)
  applyStateToRemote(state, board)
}

let applyStateToLocal = function applyStateToLocale (state, boardComponents) {
  //console.log('///////////////////////// LOCAL ///////////////////// \n ', state.modeName, state.state229, state.whiteStrip)
  boardComponents.strip2.intensity(state.state229.state2.brightness)
  boardComponents.strip22.intensity(state.state229.state22.brightness)
  boardComponents.strip229.intensity(state.state229.state229.brightness)
  boardComponents.stripWhite.intensity(state.whiteStrip)
}

let applyStateToRemote = function applyStateToRemote (state, board) {
  console.log('///////////////////////// REMOTE ///////////////////// \n ', state.modeName, state.roof, state.wallGreen, state.wallBlue)
  let roofColors = getRoofColors(state.roof)
  switch (state.modeName) {
    case 'off':
      board.io.i2cWrite(8, 0) // mode
      break
    case 'club':
      board.io.i2cWrite(8, 2) // mode
      break
    case 'lobby':
      board.io.i2cWrite(8, 3) // mode
      break
    default:
      board.io.i2cWrite(8, 1) // mode
      break
  }
  board.io.i2cWrite(8, roofColors.red) // roof red
  board.io.i2cWrite(8, roofColors.green) // roof green
  board.io.i2cWrite(8, roofColors.blue) // roof blue
  board.io.i2cWrite(8, roofColors.brightness) // roof brightness
  board.io.i2cWrite(8, roofColors.animation) // roof animation
  board.io.i2cWrite(8, state.wallGreen) // wall green
  board.io.i2cWrite(8, state.wallBlue) // wall blue
}

let getRoofColors = function getRoofColors (roof) {
  let roofColor = roof.color.split(', ')
  return {
    red: roofColor[0].substring(4, roofColor[0].lenght),
    green: roofColor[1],
    blue: roofColor[2].substring(0, 3),
    brightness: roof.brightness,
    animation: roof.animation
  }
}

let resetBoard = function resetBoard (boardComponents) {
  boardComponents.strip2.stop().off()
  boardComponents.strip22.stop().off()
  boardComponents.strip229.stop().off()
  boardComponents.stripWhite.stop().off()
}

module.exports = {
  initBoard: initBoard,
  applyStateToLocal: applyStateToLocal,
  applyStateToRemote: applyStateToRemote,
  sendStateToBoard: sendStateToBoard,
  resetBoard: resetBoard,
  getRoofColors: getRoofColors
}
