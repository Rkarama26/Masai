"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ElevatorManager_1 = require("./ElevatorManager");
const ElevatorRequest_1 = require("./ElevatorRequest");
const elevatorManager = new ElevatorManager_1.ElevatorManager(50, 4, 8); // 4 elevators, each with a capacity of 8
const request1 = new ElevatorRequest_1.ElevatorRequest(5, 1); // Request from floor 5 to 1 going DOWN
const elevator1 = elevatorManager.requestElevator(request1);
//# sourceMappingURL=main.js.map