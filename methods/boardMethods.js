const State = require('../models/RoomState')
let initBoard = function initBoard (boardComponents, five, board) {
  board.i2cConfig()
  boardComponents.strip2 = new five.Led.RGB({
    pins: {
      red: 8,
      green: 9,
      blue: 10
    },
    isAnode: false
  })
  boardComponents.strip22 = new five.Led.RGB({
    pins: {
      red: 2,
      green: 3,
      blue: 4
    },
    isAnode: false
  })
  boardComponents.strip229 = new five.Led.RGB({
    pins: {
      red: 5,
      green: 6,
      blue: 7
    },
    isAnode: false
  })
  boardComponents.stripWhite = new five.Led(11)
  resetBoard(boardComponents)
}

let sendStateToBoard = function sendStateToBoard (state, boardComponents, board) {
  applyStateToRemote(state, board)
  applyStateToLocal(state, boardComponents)
}

let applyStateToLocal = function applyStateToLocale (state, boardComponents) {

  if (state.modeName === 'strobe') {
    if (state.whiteStrip > 0) {
      boardComponents.stripWhite.intensity(100).blink(20)
    } else {
      boardComponents.stripWhite.intensity(100).stop()
    }
    return
  }
  boardComponents.strip2.intensity(state.state229.state2.brightness).color(state.state229.state2.color)
  boardComponents.strip22.intensity(state.state229.state22.brightness).color(state.state229.state22.color)
  boardComponents.strip229.intensity(state.state229.state229.brightness).color(state.state229.state229.color)
  boardComponents.stripWhite.intensity(state.whiteStrip)


  console.log('///////////////////////// LOCAL ///////////////////// \n ', state.modeName, state.state229, state.whiteStrip)
}

let applyStateToRemote = function applyStateToRemote (state, board) {
  console.log('///////////////////////// REMOTE ///////////////////// \n ', state.modeName, state.roof, state.wallGreen, state.wallBlue)
  let roofColors = getRoofColors(state.roof)
  let mode
  switch (state.modeName) {
    case 'off':
      mode = 0 // mode
      break
    case 'club':
      mode = 2 // mode
      break
    case 'lobby':
      mode = 3 // mode
      break
    default:
      mode = 1 // mode
      break
  }

  board.io.i2cWrite(0x08, [mode, roofColors.red, roofColors.green, roofColors.blue,
    roofColors.brightness, roofColors.animation, state.wallGreen, state.wallBlue])
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
