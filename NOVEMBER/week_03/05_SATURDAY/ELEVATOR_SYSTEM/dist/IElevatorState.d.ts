import type { Elevator } from "./Elevator";
export interface IElevatorState {
    moveToFloor(elevator: Elevator, floor: number): void;
    openDoor(elevator: Elevator): void;
    closeDoor(elevator: Elevator): void;
}
//# sourceMappingURL=IElevatorState.d.ts.map