import { Direction } from "../Direction";
import type { Elevator } from "../Elevator";
import type { IElevatorState } from "../IElevatorState";
import { MovingState } from "./MovingState";
import { OpenDoor } from "./openDoorState";

export class CloseDoor implements IElevatorState {
  moveToFloor(elevator: Elevator, floor: number): void {
    elevator.direction =
      elevator.currentFloor > floor ? Direction.DOWN : Direction.UP;

    elevator.state = new MovingState();
    let distance = Math.abs(elevator.currentFloor - floor);
    let step = elevator.currentFloor < floor ? 1 : -1;
    for (let i = 1; i <= distance; i++) {
      elevator.currentFloor += step;
      console.log(`Elevator at floor: ${elevator.currentFloor}`);

      if (elevator.currentFloor === floor) {
        console.log(`Elevator has arrived at floor: ${floor}`);
        elevator.state = new OpenDoor();
        elevator.updateDisplay();
      }
    }
  }

  openDoor(elevator: Elevator): void {
    console.log("Elevator Door is opening...");
    elevator.doorOpen = true;
    elevator.state = new OpenDoor();
  }
  closeDoor(elevator: Elevator): void {
    console.log("Elevator Door is closed");
    elevator.doorOpen = false;
  }
}
