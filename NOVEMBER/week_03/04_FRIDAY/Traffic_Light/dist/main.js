"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TrafficLight_1 = require("./TrafficLight");
const trafficLight = new TrafficLight_1.TrafficLight();
console.log("Starting Traffic Light Simulation:");
trafficLight.change(); // Red → Green
trafficLight.change(); // Green → Yellow
trafficLight.change(); // Yellow → Red
trafficLight.change(); // Red → Green (loop)
//# sourceMappingURL=main.js.map