import { Elevator } from "./Elevator";
import type { ElevatorRequest } from "./ElevatorRequest";
import type { IElevatorSelector } from "./IElevatorSelector";
export declare class ElevatorManager {
    numFloors: number;
    elevators: Elevator[];
    selector: IElevatorSelector;
    elevatorCapacity: number;
    constructor(numFloors: number, numElevators: number, elevatorCapacity: number);
    updateDisplay(): void;
    requestElevator(request: ElevatorRequest): Elevator | null;
}
//# sourceMappingURL=ElevatorManager.d.ts.map