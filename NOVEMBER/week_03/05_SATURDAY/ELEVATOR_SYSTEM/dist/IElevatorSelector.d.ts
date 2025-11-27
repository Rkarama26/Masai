import type { Elevator } from "./Elevator";
import type { ElevatorRequest } from "./ElevatorRequest";
export interface IElevatorSelector {
    selectElevator(elevators: Elevator[], request: ElevatorRequest): Elevator | null;
}
//# sourceMappingURL=IElevatorSelector.d.ts.map