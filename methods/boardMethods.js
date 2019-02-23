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

let isSateRemote = function isSateRemote (state) {
  switch (state.modeName) {
    case 'strobe':
    case 'whiteOn':
      return false
    default:
      return true
  }
}

let sendStateToBoard = function sendStateToBoard (state, boardComponents, board) {
  if (isSateRemote(state)) {
    applyStateToRemote(state, board)
  }
  applyStateToLocal(state, boardComponents)
}

let applyStateToLocal = function applyStateToLocale (state, boardComponents) {

  // break this into a board.presets method module
  if (state.modeName === 'strobe') {
    if (state.whiteStrip === -1) {
      console.log('strobe')
      boardComponents.stripWhite.intensity(100).blink(25)
      boardComponents.strip2.intensity(100).color('white')
      boardComponents.strip22.intensity(100).color('white')
      boardComponents.strip229.intensity(100).color('white')
    } else { // write some functions
      boardComponents.stripWhite.stop()
      boardComponents.stripWhite.intensity(state.whiteStrip)
      boardComponents.strip2.intensity(state.state229.state2.brightness).color(state.state229.state2.color)
      boardComponents.strip22.intensity(state.state229.state22.brightness).color(state.state229.state22.color)
      boardComponents.strip229.intensity(state.state229.state229.brightness).color(state.state229.state229.color)
      console.log('stop strob')
    }
    return
  }

  if (state.modeName === 'whiteOn') {
    if (state.whiteStrip === -1) {
      console.log('on')
      boardComponents.stripWhite.intensity(10) // could do with some ajustments
      boardComponents.strip2.intensity(100)
      boardComponents.strip22.intensity(100)
      boardComponents.strip229.intensity(100)
      boardComponents.strip2.blink(200)
      boardComponents.strip22.blink(100)
      boardComponents.strip229.blink(200)
    } else {
      boardComponents.strip2.stop()
      boardComponents.strip22.stop()
      boardComponents.strip229.stop()
      boardComponents.stripWhite.intensity(state.whiteStrip)
      boardComponents.strip2.intensity(state.state229.state2.brightness)
      boardComponents.strip22.intensity(state.state229.state22.brightness)
      boardComponents.strip229.intensity(state.state229.state229.brightness)
      console.log('off')
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
  getRoofColors: getRoofColors,
  isSateRemote: isSateRemote
}
