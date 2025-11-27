"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Elevator = void 0;
const Direction_1 = require("./Direction");
const closeDoorState_1 = require("./elevatorStates/closeDoorState");
class Elevator {
    currentFloor;
    direction;
    maxCapacity;
    currentOccupancy;
    state;
    doorOpen;
    requestQueue = [];
    isProcessing = false;
    constructor(maxCapacity) {
        this.currentFloor = 1;
        this.direction = Direction_1.Direction.IDLE;
        this.maxCapacity = maxCapacity;
        this.currentOccupancy = 0;
        this.doorOpen = false;
        this.state = new closeDoorState_1.CloseDoor();
    }
    enqueueFloor(floor) {
        if (!this.requestQueue.includes(floor)) {
            this.requestQueue.push(floor);
            this.processRequests();
        }
    }
    async processRequests() {
        if (this.isProcessing)
            return;
        this.isProcessing = true;
        let isPickup = true; // First floor is pickup
        while (this.requestQueue.length > 0) {
            const next = this.requestQueue.shift();
            if (next !== undefined) {
                const floor = next;
                this.state.moveToFloor(this, floor);
                this.openDoor();
                if (isPickup) {
                    this.addPassenger();
                    isPickup = false;
                }
                else {
                    this.removePassenger();
                }
                await new Promise((resolve) => setTimeout(resolve, 2000));
                this.closeDoor();
            }
        }
        this.isProcessing = false;
        this.direction = Direction_1.Direction.IDLE;
    }
    moveToFloor(floor) {
        this.state.moveToFloor(this, floor);
    }
    openDoor() {
        this.state.openDoor(this);
    }
    closeDoor() {
        this.state.closeDoor(this);
    }
    updateDisplay() {
        console.log(`Current Floor: ${this.currentFloor}, Direction: ${this.direction}, Door Open: ${this.doorOpen}, Occupancy: ${this.currentOccupancy}/${this.maxCapacity}`);
    }
    canAccommodate() {
        return this.currentOccupancy < this.maxCapacity;
    }
    addPassenger() {
        if (this.canAccommodate()) {
            this.currentOccupancy++;
        }
    }
    removePassenger() {
        if (this.currentOccupancy > 0) {
            this.currentOccupancy--;
        }
    }
}
exports.Elevator = Elevator;
//# sourceMappingURL=Elevator.js.map