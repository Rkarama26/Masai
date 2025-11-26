import { TrafficLight } from "./TrafficLight";

const trafficLight = new TrafficLight();

console.log("Starting Traffic Light Simulation:");
trafficLight.change(); // Red → Green
trafficLight.change(); // Green → Yellow
trafficLight.change(); // Yellow → Red
trafficLight.change(); // Red → Green (loop)
