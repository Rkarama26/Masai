import type { Elevator } from "../Elevator";
import type { IElevatorState } from "../IElevatorState";
export declare class MovingState implements IElevatorState {
    moveToFloor(elevator: Elevator, floor: number): void;
    openDoor(elevator: Elevator): void;
    closeDoor(elevator: Elevator): void;
}
//# sourceMappingURL=MovingState.d.ts.map