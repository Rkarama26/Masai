"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovingState = void 0;
class MovingState {
    moveToFloor(elevator, floor) {
        console.log(`Elevator is moving `);
    }
    openDoor(elevator) {
        console.log("Cannot open door while moving");
    }
    closeDoor(elevator) {
        console.log("Door is already closed while moving");
    }
}
exports.MovingState = MovingState;
//# sourceMappingURL=MovingState.js.map