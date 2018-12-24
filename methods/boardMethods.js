const State = require('../models/RoomState')

let initBoard = function initBoard (boardComponents, five) {
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

let sendStateToBoard = function sendStateToBoard (state, boardComponents) {
  if (state.modeName === 'advanced' || state.modeName === 'off') {
    applyStateToLocal(state, boardComponents)
  } else {
    if (isLocalMode(state)) {
      applyStateToLocal(state, boardComponents)
    } else {
      //applyStateToLocal(getLocalState(state), boardComponents)
      //applyStateToRemote(state, boardComponents) // TO DO
    }
  }
}

let isLocalMode = function isLocalMode (state) {
  switch (state.modeName) {
    case 'maxLight':
      return "local"
    case 'moodLight':
      return "local"
    default:
      return "remote"
  }
}

let applyStateToLocal = function applyStateToLocale (state, boardComponents) {
  console.log(state)
  //resetBoard(boardComponents)
  boardComponents.strip2.intensity(state.state229.state2.brightness)
  boardComponents.strip22.intensity(state.state229.state22.brightness)
  boardComponents.strip229.intensity(state.state229.state229.brightness)
  boardComponents.stripWhite.intensity(state.whiteStrip)
}

// may not be needed
let resetBoard = function resetBoard (boardComponents) {
  boardComponents.strip2.stop().off()
  boardComponents.strip22.stop().off()
  boardComponents.strip229.stop().off()
  boardComponents.stripWhite.stop().off()
}

module.exports = {
  initBoard: initBoard,
  applyStateToLocal: applyStateToLocal,
  isLocalMode: isLocalMode,
  sendStateToBoard: sendStateToBoard,
  resetBoard: resetBoard
}
