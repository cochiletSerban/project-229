const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function () {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

function listenToInputs() {
  // for sliders
  for (const key of Object.keys(uiElements.sliders)) {
    uiElements.sliders[key].on("input", getSliders.bind(null, key));
  }

  // switches
  for (const key of Object.keys(uiElements.switches)) {
    uiElements.switches[key].on("click", (e) => {
      // e.stopPropagation()
      // e.stopImmediatePropagation()
      if (uiElements.switches[key].is(":checked")) {
        getMode(key, true);
      } else {
        getMode(key, false);
      }
    });
  }

  uiElements.pickers.moodRoofPicker.on("move.spectrum", function (e, color) {
    if (canSliderUpdateState("moodLight")) {
      let state = new RoomState();
      state = JSON.parse(JSON.stringify(roomState));
      state.roof.color = color.toRgbString();
      updateState(state);
    }
  });
}

// ////////////////////////////////////// //
function determineStateUpdateForSwitches(ev, modeName) {
  let state = new RoomState(); // creates new blank state on mod chage
  // state = JSON.parse(JSON.stringify(roomState))
  if (ev) {
    state.modeName = modeName;
    switch (modeName) {
      case "maxLight":
        let maxLightState229 = {
          state2: new RgbState(20),
          state22: new RgbState(20),
          state229: new RgbState(20),
        };
        state = new RoomState();
        state.modeName = modeName;
        state.whiteStrip = 50;
        state.state229 = maxLightState229;
        state.roof = new RgbState(80);
        break;
      case "moodLight":
        state = new RoomState();
        state.modeName = modeName;
        state.roof = new RgbState(100);
        state.roof.color = "rgb(255, 0, 0)";
        break;
      case "club":
      case "lobby":
        let clubState229 = {
          state2: new RgbState(20, "red"),
          state22: new RgbState(20, "yellow"),
          state229: new RgbState(20, "blue"),
        };
        state = new RoomState();
        state.state229 = clubState229;
        state.modeName = modeName;
        break;
      case "off":
        state = new RoomState();
        break;
    }
  } else if (!ev) {
    state.modeName = "off";
  }
  return state;
}
// /////////////////////////////////// //

function getMode(modeName, ev) {
  // parses data from inputs & updates state
  let state = new RoomState();
  switch (modeName) {
    case "club229Switch":
      state = determineStateUpdateForSwitches(ev, "club");
      break;
    case "maxLightSwitch":
      state = determineStateUpdateForSwitches(ev, "maxLight");
      break;
    case "moodSwitch":
      state = determineStateUpdateForSwitches(ev, "moodLight");
      break;
    case "lobbySwitch":
      state = determineStateUpdateForSwitches(ev, "lobby");
      break;
  }
  updateState(state);
}

// makes sure you can only update the current mode
function canSliderUpdateState(modeName) {
  if (roomState.modeName === modeName) {
    return true;
  } else {
    return false;
  }
}

function getSliders(handle, ev) {
  let state = new RoomState();
  state = JSON.parse(JSON.stringify(roomState));

  switch (handle) {
    case "maxLightWhiteStripSlider":
      if (canSliderUpdateState("maxLight")) {
        state.whiteStrip = parseInt(ev.target.value);
        updateState(state);
      }
      break;

    case "maxLight229slider":
      if (canSliderUpdateState("maxLight")) {
        state.state229.state2.brightness = parseInt(ev.target.value);
        state.state229.state22.brightness = state.state229.state2.brightness;
        state.state229.state229.brightness = state.state229.state2.brightness;
        updateState(state);
      }
      break;

    case "maxLightRoofslider":
      if (canSliderUpdateState("maxLight")) {
        state.roof.brightness = parseInt(ev.target.value);
        updateState(state);
      }
      break;

    case "moodRoofSlider":
      if (canSliderUpdateState("moodLight")) {
        state.roof.brightness = parseInt(ev.target.value);
        updateState(state);
      }
      break;
  }
}
