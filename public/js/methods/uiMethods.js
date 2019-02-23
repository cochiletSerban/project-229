

// retrives all the important ui elemets
function getUiElements () {
  let headers = {
    club229Header: $('#club229Header'),
    maxLightHeader: $('#maxLightHeader'),
    moodHeader: $('#moodHeader'),
    lobbyHeader: $('#lobbyHeader')
  }
  let switches = {
    club229Switch: $('#club229Switch'),
    maxLightSwitch: $('#maxLightSwitch'),
    moodSwitch: $('#moodSwitch'),
    lobbySwitch: $('#lobbySwitch')
  }
  let sliders = {
    maxLightWhiteStripSlider: $('#maxLightWhiteStripSlider'),
    maxLight229slider: $('#maxLight229slider'),
    maxLightRoofslider: $('#maxLightRoofslider'),
    moodRoofSlider: $('#moodRoofSlider')
  }
  let pickers = {
    moodRoofPicker: $('#moodRoofPicker')
  }
  pickers.moodRoofPicker.spectrum()
  return { headers, switches, sliders, pickers }
}

// init all the pickers
function initPickers () {
  for (const key of Object.keys(uiElements.pickers)) {
    uiElements.pickers[key].spectrum({
      showButtons: false
    })
  }
}

// retives a css variable by name
function getCssVars (varName) {
  varName = '--' + varName
  let bodyStyles = window.getComputedStyle(document.body)
  return bodyStyles.getPropertyValue(varName)
}

// maps from state to procent 255 = 100%
function roundTo2decimals (x) {
  //let newValue =  (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
  return parseFloat(Math.round(x * 100) / 100).toFixed(2) // limits to 2 decimal places
}

// retrun headers brightness/color values from RoomState
function getModeHeaderVals () {
  switch (roomState.modeName) {
    case 'maxLight':
      let brightness229 = (roomState.state229.state2.brightness +
        roomState.state229.state22.brightness + roomState.state229.state229.brightness) / 3
      let stateBrightness = (roomState.whiteStrip + brightness229 + roomState.roof.brightness) / 3
      return roundTo2decimals(stateBrightness)
    case 'moodLight':
    console.log(roomState.roof.color)
      return {
        brightness: roundTo2decimals(roomState.roof.brightness),
        color: roomState.roof.color
      }
  }
}

// sets all switches to off besides the one recived as param
function resetSwitches (dontReset) {
  let all = false
  if (dontReset === undefined) all = true
  let switches = uiElements.switches
  for (const key of Object.keys(switches)) {
    if (all || switches[key][0].id !== dontReset[0].id ) {
      switches[key].prop('checked', false)
    }
  }
}

// resets all headers default values besides the one recived as param
function resetHeaders (dontReset) {
  let all = false

  if (dontReset === undefined) all = true
  let headers = uiElements.headers
  for (const key of Object.keys(headers)) {
    if (all || headers[key][0].id !== dontReset[0].id) {
      headers[key].css('background-color', 'white')
      let currentVal = headers[key].find('div.col.s9.left-align > h5').text()
      headers[key].find('div.col.s9.left-align > h5').text(currentVal.split('@')[0])
    }
  }
}

function resetSliders () {
  uiElements.sliders.maxLightWhiteStripSlider.val(0)
  uiElements.sliders.maxLight229slider.val(0)
  uiElements.sliders.maxLightRoofslider.val(0)
  uiElements.sliders.moodRoofSlider.val(0)
  uiElements.pickers.moodRoofPicker.spectrum('set', 'white')
}

// sets the color, brightness, slider, picker values of the mod controls
function initModes () {
  switch (roomState.modeName) {
    case 'off' :
      resetSwitches()
      resetHeaders()
      resetSliders()
      break
    case 'club':
      // header
      uiElements.headers.club229Header.css('background-color', getCssVars('myOrange'))
      uiElements.switches.club229Switch.prop('checked', true)
      resetSwitches(uiElements.switches.club229Switch)
      resetHeaders(uiElements.headers.club229Header)
      resetSliders()
      break
    case 'maxLight':
      // header
      uiElements.headers.maxLightHeader.css('background-color', getCssVars('myOrange'))
      uiElements.headers.maxLightHeader.find('div.col.s9.left-align > h5').text('Max light @ ' + getModeHeaderVals())
      uiElements.switches.maxLightSwitch.prop('checked', true)
      resetSwitches(uiElements.switches.maxLightSwitch)
      resetHeaders(uiElements.headers.maxLightHeader)
      resetSliders()
      // sliders
      let brightness229 = (roomState.state229.state2.brightness +
        roomState.state229.state22.brightness + roomState.state229.state229.brightness) / 3
      uiElements.sliders.maxLightWhiteStripSlider.val(roomState.whiteStrip)
      uiElements.sliders.maxLight229slider.val(brightness229)
      uiElements.sliders.maxLightRoofslider.val(roomState.roof.brightness)
      break
    case 'moodLight':
      // header
      let headerState = getModeHeaderVals()
      uiElements.headers.moodHeader.css('background-color', headerState.color)
      uiElements.headers.moodHeader.find('div.col.s9.left-align > h5').text('Mood light @ ' + headerState.brightness)
      uiElements.switches.moodSwitch.prop('checked', true)
      resetSwitches(uiElements.switches.moodSwitch)
      resetHeaders(uiElements.headers.moodHeader)
      resetSliders()
      // slider
      uiElements.sliders.moodRoofSlider.val(roomState.roof.brightness)
      // picker
      uiElements.pickers.moodRoofPicker.spectrum('set', roomState.roof.color)
      break
    case 'lobby':
      // header
      uiElements.headers.lobbyHeader.css('background-color', getCssVars('myOrange'))
      uiElements.switches.lobbySwitch.prop('checked', true)
      resetSwitches(uiElements.switches.lobbySwitch)
      resetHeaders(uiElements.headers.lobbyHeader)
      resetSliders()
      break
  }
}

// sets the slider headers picker of all the ui based on a recieved state
function initUi () {
  // global var after component init
  window.uiElements = getUiElements()
  initPickers()
  initModes()
  listenToInputs()
}

function updateUi (roomState) {
  initModes(roomState)
}

function isSateRemote (state) { // rename
  switch (state.modeName) {
    case 'strobe':
    case 'whiteOn':
      return false
    default:
      return true
  }
}

function updateState (newState) {
  if (!isSateRemote(newState)) {
    socket.emit('updateState', newState)
  } else {
    roomState = newState
    updateUi()
    socket.emit('updateState', roomState)
  }
}
