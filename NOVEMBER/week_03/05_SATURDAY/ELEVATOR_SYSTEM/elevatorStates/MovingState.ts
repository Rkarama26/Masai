import type { Elevator } from "../Elevator";
import type { IElevatorState } from "../IElevatorState";

export class MovingState implements IElevatorState {
  moveToFloor(elevator: Elevator, floor: number): void {
    console.log(`Elevator is moving `);
  }
  openDoor(elevator: Elevator): void {
    console.log("Cannot open door while moving");
  }
  closeDoor(elevator: Elevator): void {
    console.log("Door is already closed while moving");
  }
}
