function listenToInputs () {

  // for sliders
  for (const key of Object.keys(uiElements.sliders)) {
    console.log(key)
    uiElements.sliders[key].on('input', getSliders.bind(null, key))
  }

  // switches
  for (const key of Object.keys(uiElements.switches)) {
    uiElements.switches[key].on('click', () => {
      if (uiElements.switches[key].is(':checked')) {
        getMode(key, true)
      } else {
        getMode(key, false)
      }
    })
  }
}

function determineStateUpdateForSwitches(ev, modeName) {
  let state = new RoomState()
  if (ev) {
    state.modeName = modeName
  } else if (!ev) {
    state.modeName = 'off'
  }
  return state
}

function getMode(modeName, ev) { // parses data from inputs & updates state
  let state = new RoomState()
  switch (modeName) {
    case 'club229Switch':
      state = determineStateUpdateForSwitches(ev, 'club')
      break
    case 'maxLightSwitch':
      state = determineStateUpdateForSwitches(ev, 'maxLight')
      break
    case 'moodSwitch':
      state = determineStateUpdateForSwitches(ev, 'moodLight')
      break
    case 'lobbySwitch':
      state = determineStateUpdateForSwitches(ev, 'lobby')
      break
  }
  updateState(state)
}

function sliderUpdateState(modeName) {
  if (state.modeName === modeName) {
    return true
  } else {
    return false
  }

}

function getSliders(handle, ev) {
  switches = getUiElements().switches

  switch (handle) {
    case 'maxLightWhiteStripSlider' :
  }
}