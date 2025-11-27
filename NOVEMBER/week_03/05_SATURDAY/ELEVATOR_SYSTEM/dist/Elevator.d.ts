import { Direction } from "./Direction";
import { IElevatorState } from "./IElevatorState";
export declare class Elevator {
    currentFloor: number;
    direction: Direction;
    maxCapacity: number;
    currentOccupancy: number;
    state: IElevatorState;
    doorOpen: boolean;
    private requestQueue;
    private isProcessing;
    constructor(maxCapacity: number);
    enqueueFloor(floor: number): void;
    private processRequests;
    moveToFloor(floor: number): void;
    openDoor(): void;
    closeDoor(): void;
    updateDisplay(): void;
    canAccommodate(): boolean;
    addPassenger(): void;
    removePassenger(): void;
}
//# sourceMappingURL=Elevator.d.ts.map