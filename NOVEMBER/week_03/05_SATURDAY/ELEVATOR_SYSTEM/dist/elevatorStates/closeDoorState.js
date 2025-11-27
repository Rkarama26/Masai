"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloseDoor = void 0;
const Direction_1 = require("../Direction");
const MovingState_1 = require("./MovingState");
const openDoorState_1 = require("./openDoorState");
class CloseDoor {
    moveToFloor(elevator, floor) {
        elevator.direction =
            elevator.currentFloor > floor ? Direction_1.Direction.DOWN : Direction_1.Direction.UP;
        elevator.state = new MovingState_1.MovingState();
        let distance = Math.abs(elevator.currentFloor - floor);
        let step = elevator.currentFloor < floor ? 1 : -1;
        for (let i = 1; i <= distance; i++) {
            elevator.currentFloor += step;
            console.log(`Elevator at floor: ${elevator.currentFloor}`);
            if (elevator.currentFloor === floor) {
                console.log(`Elevator has arrived at floor: ${floor}`);
                elevator.state = new openDoorState_1.OpenDoor();
                elevator.updateDisplay();
            }
        }
    }
    openDoor(elevator) {
        console.log("Elevator Door is opening...");
        elevator.doorOpen = true;
        elevator.state = new openDoorState_1.OpenDoor();
    }
    closeDoor(elevator) {
        console.log("Elevator Door is closed");
        elevator.doorOpen = false;
    }
}
exports.CloseDoor = CloseDoor;
//# sourceMappingURL=closeDoorState.js.map