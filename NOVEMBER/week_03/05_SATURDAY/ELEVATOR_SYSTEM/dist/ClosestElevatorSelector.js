"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClosestElevatorSelector = void 0;
const Direction_1 = require("./Direction");
class ClosestElevatorSelector {
    selectElevator(elevators, request) {
        let closestElevator = null;
        let minDistance = Infinity;
        for (const elevator of elevators) {
            const distance = Math.abs(elevator.currentFloor - request.currentFloor);
            if (elevator.direction === request.direction ||
                elevator.direction === Direction_1.Direction.IDLE) {
                if (distance < minDistance) {
                    minDistance = distance;
                    closestElevator = elevator;
                }
            }
        }
        return closestElevator;
    }
}
exports.ClosestElevatorSelector = ClosestElevatorSelector;
//# sourceMappingURL=ClosestElevatorSelector.js.map