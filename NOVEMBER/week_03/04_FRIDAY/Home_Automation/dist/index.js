"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SmartLight_1 = require("./SmartLight");
const light = new SmartLight_1.SmartLight();
console.log("=== Smart Light Simulation ===");
// Start with off
light.turnOff();
// Turn on manually
light.turnOn();
// Detect motion
light.detectMotion();
// Adjust brightness
light.adjustBrightness();
// Set to night
light.setDaytime(false);
light.adjustBrightness();
// Turn off
light.turnOff();
console.log("Simulation complete.");
