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
  let uiPickers = getUiElements().pickers
  for (const key of Object.keys(uiPickers)) {
    uiPickers[key].spectrum({
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
function convertSateToProc (x, inMin, inMax, outMin, outMax) {
  return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
}

// retrun headers brightness/color values from RoomState
function getModeHeaderVals (roomState) {
  switch (roomState.modeName) {
    case 'maxLight':
      let brightness229 = (roomState.state229.state2.brightness +
        roomState.state229.state22.brightness + roomState.state229.state229.brightness) / 3
      let stateBrightness = (roomState.whiteStrip + brightness229 + roomState.roof.brightness) / 3
      return convertSateToProc(stateBrightness, 0, 255, 0, 100)
    case 'moodLight':
      return {
        brightness: convertSateToProc(roomState.roof.brightness, 0, 255, 0, 100),
        color: roomState.roof.color
      }
  }
}

// sets the color, brightness, slider, picker values of the mod controls
function initModes (uiElements, roomState) {
  switch (roomState.modeName) {
    case 'club':
      // header
      uiElements.headers.club229Header.css('background-color', getCssVars('myOrange'))
      uiElements.switches.club229Switch.prop('checked', true)
      break
    case 'maxLight':
      // header
      uiElements.headers.maxLightHeader.css('background-color', getCssVars('myOrange'))
      uiElements.headers.maxLightHeader.find('div.col.s9.left-align > h5').text('Max light @ ' + getModeHeaderVals(roomState))
      uiElements.switches.maxLightSwitch.prop('checked', true)
      // sliders
      let brightness229 = (roomState.state229.state2.brightness +
        roomState.state229.state22.brightness + roomState.state229.state229.brightness) / 3
      uiElements.sliders.maxLightWhiteStripSlider.val(roomState.whiteStrip)
      uiElements.sliders.maxLight229slider.val(brightness229)
      uiElements.sliders.maxLightRoofslider.val(roomState.roof.brightness)
      break
    case 'moodLight':
      // header
      let headerState = getModeHeaderVals(roomState)
      uiElements.headers.moodHeader.css('background-color', headerState.color)
      uiElements.headers.moodHeader.find('div.col.s9.left-align > h5').text('Mood light @ ' + headerState.brightness)
      uiElements.switches.moodSwitch.prop('checked', true)
      // slider
      uiElements.sliders.moodRoofSlider.val(roomState.roof.brightness)
      // picker
      uiElements.pickers.moodRoofPicker.spectrum('set', roomState.roof.color)
      break
    case 'lobby':
      // header
      uiElements.headers.lobbyHeader.css('background-color', getCssVars('myOrange'))
      uiElements.switches.lobbySwitch.prop('checked', true)
      break
  }
}

// sets the slider headers picker of all the ui based on a recieved state
function initUi () {
  // fake test state
  let state = new RoomState()
  state.modeName = 'moodLight'
  state.whiteStrip = 255
  state.roof.brightness = 240
  state.roof.color = 'blue'
  state.state229.state2.brightness = 127
  state.state229.state22.brightness = 127
  state.state229.state229.brightness = 127
  
  initPickers()
  initModes(getUiElements(), state)
}
