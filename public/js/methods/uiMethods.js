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
