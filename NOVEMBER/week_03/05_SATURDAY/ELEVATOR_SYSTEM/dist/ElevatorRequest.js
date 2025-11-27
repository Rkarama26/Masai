"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElevatorRequest = void 0;
const Direction_1 = require("./Direction");
class ElevatorRequest {
    currentFloor;
    destinationFloor;
    direction;
    constructor(currentFloor, destinationFloor) {
        this.currentFloor = currentFloor;
        this.destinationFloor = destinationFloor;
        this.direction =
            this.destinationFloor > this.currentFloor
                ? Direction_1.Direction.UP : Direction_1.Direction.DOWN;
    }
}
exports.ElevatorRequest = ElevatorRequest;
//# sourceMappingURL=ElevatorRequest.js.map