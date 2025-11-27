import type { Elevator } from "../Elevator";
import type { IElevatorState } from "../IElevatorState";
import { CloseDoor } from "./closeDoorState";

export class OpenDoor implements IElevatorState {
  moveToFloor(elevator: Elevator, floor: number): void {
    console.log("Cannot move to floor while door is open");
  }
  openDoor(elevator: Elevator): void {
    console.log("Door is already open");
  }
  closeDoor(elevator: Elevator): void {
    console.log("Closing the door...");
    elevator.doorOpen = false;
    elevator.state = new CloseDoor();
  }
}
