import type { Elevator } from "../Elevator";
import type { IElevatorState } from "../IElevatorState";
export declare class OpenDoor implements IElevatorState {
    moveToFloor(elevator: Elevator, floor: number): void;
    openDoor(elevator: Elevator): void;
    closeDoor(elevator: Elevator): void;
}
//# sourceMappingURL=openDoorState.d.ts.map