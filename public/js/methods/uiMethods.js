function getUiElements () { // retrive ui elem
  let headers = {
    club229Header: $('#club229Header'),
    maxLightHeader: $('#maxLightHeader'),
    moodHeader: $('moodHeader'),
    lobbyHeader: $('lobbyHeader')
  }
  let switches = {
    club229Switch: $('#club229Switch'),
    maxLightSwitch: $('maxLightSwitch'),
    moodSwitch: $('moodSwitch'),
    lobbySwitch: $('lobbySwitch')
  }
  let sliders = {
    maxLightWhiteStripSlider: $('#maxLightWhiteStripSlider'),
    maxLight229slider: $('maxLight229slider'),
    maxLightRoofslider: $('maxLightRoofslider'),
    moodRoofSlider: $('moodRoofSlider')
  }
  let pickers = {
    moodRoofPicker: $('moodRoofPicker')
  }
  return { headers, switches, sliders, pickers }
}

function getCssVars (varName) {
  varName = '--' + varName
  let bodyStyles = window.getComputedStyle(document.body)
  return bodyStyles.getPropertyValue(varName)
}
// .find(div.col.s9.left-align > h5)
function initHeaders (uiHeaders, roomState) {
  switch (roomState) {
    case 'club':
      uiHeaders.club229Header.css('background-color', getCssVars('myOrange'))
      break
    case 'maxLight':
      uiHeaders.club229Header.css('background-color', 'var(myOrange)')
      uiHeaders.club229Header.find('div.col.s9.left-align > h5').text('yolo')
      break
    case 'moodLight':
      break
    case 'lobby':
      break 
  }
}

function initUi (uiElements, roomState) {

}
