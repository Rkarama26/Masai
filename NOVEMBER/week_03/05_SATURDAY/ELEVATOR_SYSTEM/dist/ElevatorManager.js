"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElevatorManager = void 0;
const ClosestElevatorSelector_1 = require("./ClosestElevatorSelector");
const Elevator_1 = require("./Elevator");
class ElevatorManager {
    //best elevator selection
    numFloors;
    elevators;
    selector;
    elevatorCapacity;
    constructor(numFloors, numElevators, elevatorCapacity) {
        this.numFloors = numFloors;
        this.elevatorCapacity = elevatorCapacity;
        this.selector = new ClosestElevatorSelector_1.ClosestElevatorSelector();
        this.elevators = [];
        for (let i = 0; i < numElevators; i++) {
            this.elevators.push(new Elevator_1.Elevator(this.elevatorCapacity));
        }
    }
    updateDisplay() {
        for (const elevator of this.elevators) {
            elevator.updateDisplay();
        }
    }
    requestElevator(request) {
        const elevator = this.selector.selectElevator(this.elevators, request);
        if (elevator && elevator.canAccommodate()) {
            //pick up
            elevator.enqueueFloor(request.currentFloor);
            // drop off
            elevator.enqueueFloor(request.destinationFloor);
        }
        else {
            console.log("No elevator available or elevator at full capacity.");
        }
        return elevator;
    }
}
exports.ElevatorManager = ElevatorManager;
//# sourceMappingURL=ElevatorManager.js.map