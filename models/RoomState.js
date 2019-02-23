const RgbState = require('./RgbState')
module.exports = class RoomState {
  constructor (
    modeName = 'off',
    whiteStrip = 0,
    state229 = {
      state2: new RgbState(),
      state22: new RgbState(),
      state229: new RgbState()
    },
    roof = new RgbState(),
    wallGreen = 0,
    wallBlue = 0
  ) {
    this.modeName = modeName
    this.whiteStrip = whiteStrip
    this.state229 = state229
    this.roof = roof
    this.wallGreen = wallGreen
    this.wallBlue = wallBlue
  }
}

    // socket.on('disconnect', (reason) => {
    //   console.log('one client dissconnected : ' + reason)
    //   if (io.engine.clientsCount === 0) led.off()
    // })