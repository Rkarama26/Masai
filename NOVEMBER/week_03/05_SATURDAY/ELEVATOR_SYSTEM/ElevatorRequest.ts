import { Direction } from "./Direction";

export class ElevatorRequest {
  currentFloor: number;
  destinationFloor: number;
  direction: Direction;

  constructor(currentFloor: number, destinationFloor: number) {
    this.currentFloor = currentFloor;
    this.destinationFloor = destinationFloor;
    this.direction =
      this.destinationFloor > this.currentFloor 
      ? Direction.UP : Direction.DOWN;
  }
}
