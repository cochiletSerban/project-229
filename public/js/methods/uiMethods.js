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
    moodRoofPicker: $('moodRoofPicker')
  }
  return { headers, switches, sliders, pickers }
}

// retives a css variable by name
function getCssVars (varName) {
  varName = '--' + varName
  let bodyStyles = window.getComputedStyle(document.body)
  return bodyStyles.getPropertyValue(varName)
}

// sets the color of the headers if state is on
function initHeaders (uiElements, roomState) {
  switch (roomState) {
    case 'club':
      uiElements.headers.club229Header.css('background-color', getCssVars('myOrange'))
      uiElements.headers.club229Switch.prop('checked', true)
      break
    case 'maxLight':
      uiElements.headers.maxLightHeader.css('background-color', getCssVars('myOrange'))
      uiElements.headers.maxLightHeader.find('div.col.s9.left-align > h5').text('1000%')
      uiElements.switches.maxLightSwitch.prop('checked', true)
      break
    case 'moodLight':
      break
    case 'lobby':
      break 
  }
}

// sets the intial state of all the ui elements
function initUi (uiElements, roomState) {

}
