module.exports = class RgbState {
  constructor(brightness = 0) {
    this.color = "rgb(255, 255, 255)";
    this.brightness = brightness;
    this.animation = 0;
  }
};
