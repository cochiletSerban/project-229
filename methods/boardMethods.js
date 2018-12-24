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
      red: 4,
      green: 5,
      blue: 6
    },
    isAnode: false
  })
  boardComponents.strip229 = new five.Led.RGB({
    pins: {
      red: 7,
      green: 8,
      blue: 9
    },
    isAnode: false
  })
  boardComponents.stripWhite = new five.Led(10)
}

let sendStateToBoard = function sendStateToBoard (state) {
  console.log(state);
  
}

let stateIsMode = function stateIsMode (state) {}

let applyState = function applyState (state) {}

module.exports = {
  initBoard: initBoard,
  applyState: applyState,
  stateIsMode: stateIsMode,
  sendStateToBoard: sendStateToBoard
}
