"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenDoor = void 0;
const closeDoorState_1 = require("./closeDoorState");
class OpenDoor {
    moveToFloor(elevator, floor) {
        console.log("Cannot move to floor while door is open");
    }
    openDoor(elevator) {
        console.log("Door is already open");
    }
    closeDoor(elevator) {
        console.log("Closing the door...");
        elevator.doorOpen = false;
        elevator.state = new closeDoorState_1.CloseDoor();
    }
}
exports.OpenDoor = OpenDoor;
//# sourceMappingURL=openDoorState.js.map