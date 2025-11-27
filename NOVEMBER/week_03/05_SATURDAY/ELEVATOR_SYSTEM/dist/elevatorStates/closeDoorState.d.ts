import type { Elevator } from "../Elevator";
import type { IElevatorState } from "../IElevatorState";
export declare class CloseDoor implements IElevatorState {
    moveToFloor(elevator: Elevator, floor: number): void;
    openDoor(elevator: Elevator): void;
    closeDoor(elevator: Elevator): void;
}
//# sourceMappingURL=closeDoorState.d.ts.map