import { ClosestElevatorSelector } from "./ClosestElevatorSelector";
import { Elevator } from "./Elevator";
import type { ElevatorRequest } from "./ElevatorRequest";
import type { IElevatorSelector } from "./IElevatorSelector";

export class ElevatorManager {
  //best elevator selection
  numFloors: number;
  elevators: Elevator[];
  selector: IElevatorSelector;
  elevatorCapacity: number;

  constructor(
    numFloors: number,
    numElevators: number,
    elevatorCapacity: number
  ) {
    this.numFloors = numFloors;
    this.elevatorCapacity = elevatorCapacity;
    this.selector = new ClosestElevatorSelector();
    this.elevators = [];

    for (let i = 0; i < numElevators; i++) {
      this.elevators.push(new Elevator(this.elevatorCapacity));
    }
  }

  updateDisplay(): void {
    for (const elevator of this.elevators) {
      elevator.updateDisplay();
    }
  }

  requestElevator(request: ElevatorRequest): Elevator | null {
    const elevator = this.selector.selectElevator(this.elevators, request);

    if (elevator && elevator.canAccommodate()) {
      //pick up
      elevator.enqueueFloor(request.currentFloor);

      // drop off
      elevator.enqueueFloor(request.destinationFloor);
    } else {
      console.log("No elevator available or elevator at full capacity.");
    }
    return elevator;
  }
}
