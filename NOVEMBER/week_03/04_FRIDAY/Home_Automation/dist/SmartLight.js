"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartLight = void 0;
const States_1 = require("./States");
class SmartLight {
    constructor() {
        this.brightness = 0;
        this.daytime = true; // Assume daytime initially
        this.state = new States_1.OffState(this);
    }
    setState(state) {
        this.state = state;
    }
    turnOn() {
        this.state.turnOn();
    }
    turnOff() {
        this.state.turnOff();
    }
    detectMotion() {
        this.state.detectMotion();
    }
    adjustBrightness() {
        this.state.adjustBrightness();
    }
    getBrightness() {
        return this.brightness;
    }
    setBrightness(brightness) {
        this.brightness = brightness;
    }
    isDaytime() {
        return this.daytime;
    }
    setDaytime(daytime) {
        this.daytime = daytime;
    }
}
exports.SmartLight = SmartLight;
