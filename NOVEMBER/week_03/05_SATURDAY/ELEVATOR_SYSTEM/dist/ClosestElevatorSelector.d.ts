import type { Elevator } from "./Elevator";
import type { ElevatorRequest } from "./ElevatorRequest";
import type { IElevatorSelector } from "./IElevatorSelector";
export declare class ClosestElevatorSelector implements IElevatorSelector {
    selectElevator(elevators: Elevator[], request: ElevatorRequest): Elevator | null;
}
//# sourceMappingURL=ClosestElevatorSelector.d.ts.map