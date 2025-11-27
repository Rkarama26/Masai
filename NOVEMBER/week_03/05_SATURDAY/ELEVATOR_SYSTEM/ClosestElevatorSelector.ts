import { Direction } from "./Direction";
import type { Elevator } from "./Elevator";
import type { ElevatorRequest } from "./ElevatorRequest";
import type { IElevatorSelector } from "./IElevatorSelector";

export class ClosestElevatorSelector implements IElevatorSelector {
  selectElevator(
    elevators: Elevator[],
    request: ElevatorRequest
  ): Elevator | null {
    let closestElevator: Elevator | null = null;
    let minDistance = Infinity;

    for (const elevator of elevators) {
      const distance = Math.abs(elevator.currentFloor - request.currentFloor);
      if (
        elevator.direction === request.direction ||
        elevator.direction === Direction.IDLE
      ) {
        if (distance < minDistance) {
          minDistance = distance;
          closestElevator = elevator;
        }
      }
    }
    return closestElevator;
  }
}
