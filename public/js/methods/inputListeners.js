function listenToInputs (uiElements) {
  // for (const key of Object.keys(uiElements.sliders)) {
  //   console.log(key)
  //   uiElements.sliders[key].on('input', getElemStatus.bind(null, key))
  // }
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

function determineStateUpdate(ev, modeName) {
  let state = new RoomState()
  state.roof.color = 'red'
  if (ev) {
    state.modeName = modeName
    updateState(state)
  } else if (!ev) {
    state.modeName = 'off'
    updateState(state)
  }
  return state
}

function getMode(modeName, ev) { // parses data from inputs & updates state
  switch (modeName) {
    case 'club229Switch':
      determineStateUpdate(ev, 'club')
      break
    case 'maxLightSwitch':
      determineStateUpdate(ev, 'maxLight')
      break
    case 'moodSwitch':
      determineStateUpdate(ev, 'moodLight')
      break
    case 'lobbySwitch':
      determineStateUpdate(ev, 'lobby')
      break
  }
}
