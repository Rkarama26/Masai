"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrightnessAdjustmentState = exports.MotionDetectionState = exports.OnState = exports.OffState = void 0;
const State_1 = require("./State");
class OffState extends State_1.AbstractLightState {
    turnOn() {
        console.log("Light turned on manually.");
        this.light.setState(new OnState(this.light));
    }
    turnOff() {
        console.log("Light is already off.");
    }
    detectMotion() {
        console.log("Motion detected. Turning on light.");
        this.light.setState(new MotionDetectionState(this.light));
    }
    adjustBrightness() {
        console.log("Light is off. Cannot adjust brightness.");
    }
}
exports.OffState = OffState;
class OnState extends State_1.AbstractLightState {
    turnOn() {
        console.log("Light is already on.");
    }
    turnOff() {
        console.log("Light turned off.");
        this.light.setState(new OffState(this.light));
    }
    detectMotion() {
        console.log("Motion detected while on. No change.");
    }
    adjustBrightness() {
        console.log("Adjusting brightness based on time.");
        this.light.setState(new BrightnessAdjustmentState(this.light));
    }
}
exports.OnState = OnState;
class MotionDetectionState extends State_1.AbstractLightState {
    turnOn() {
        console.log("Light is already on due to motion.");
    }
    turnOff() {
        console.log("Motion-based light turned off.");
        this.light.setState(new OffState(this.light));
    }
    detectMotion() {
        console.log("Motion still detected. Light remains on.");
    }
    adjustBrightness() {
        console.log("Adjusting brightness for motion detection.");
        this.light.setState(new BrightnessAdjustmentState(this.light));
    }
}
exports.MotionDetectionState = MotionDetectionState;
class BrightnessAdjustmentState extends State_1.AbstractLightState {
    turnOn() {
        console.log("Light is on with adjusted brightness.");
    }
    turnOff() {
        console.log("Light turned off from brightness adjustment.");
        this.light.setState(new OffState(this.light));
    }
    detectMotion() {
        console.log("Motion detected. Adjusting brightness.");
    }
    adjustBrightness() {
        const brightness = this.light.isDaytime() ? 50 : 100;
        this.light.setBrightness(brightness);
        console.log(`Brightness adjusted to ${brightness}% based on time of day.`);
    }
}
exports.BrightnessAdjustmentState = BrightnessAdjustmentState;
