import { Direction } from "./Direction";
import { CloseDoor } from "./elevatorStates/closeDoorState";
import { IElevatorState } from "./IElevatorState";

export class Elevator {
  currentFloor: number;
  direction: Direction;
  maxCapacity: number;
  currentOccupancy: number;
  state: IElevatorState;
  doorOpen: boolean;

  private requestQueue: number[] = [];
  private isProcessing: boolean = false;

  constructor(maxCapacity: number) {
    this.currentFloor = 1;
    this.direction = Direction.IDLE;
    this.maxCapacity = maxCapacity;
    this.currentOccupancy = 0;
    this.doorOpen = false;
    this.state = new CloseDoor();
  }

  enqueueFloor(floor: number): void {
    if (!this.requestQueue.includes(floor)) {
      this.requestQueue.push(floor);
      this.processRequests();
    }
  }

  private async processRequests(): Promise<void> {
    if (this.isProcessing) return;
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
        } else {
          this.removePassenger();
        }
        await new Promise((resolve) => setTimeout(resolve, 2000));
        this.closeDoor();
      }
    }
    this.isProcessing = false;
    this.direction = Direction.IDLE;
  }

  moveToFloor(floor: number): void {
    this.state.moveToFloor(this, floor);
  }

  openDoor(): void {
    this.state.openDoor(this);
  }

  closeDoor(): void {
    this.state.closeDoor(this);
  }

  updateDisplay(): void {
    console.log(
      `Current Floor: ${this.currentFloor}, Direction: ${this.direction}, Door Open: ${this.doorOpen}, Occupancy: ${this.currentOccupancy}/${this.maxCapacity}`
    );
  }

  canAccommodate(): boolean {
    return this.currentOccupancy < this.maxCapacity;
  }

  addPassenger(): void {
    if (this.canAccommodate()) {
      this.currentOccupancy++;
    }
  }

  removePassenger(): void {
    if (this.currentOccupancy > 0) {
      this.currentOccupancy--;
    }
  }
}
