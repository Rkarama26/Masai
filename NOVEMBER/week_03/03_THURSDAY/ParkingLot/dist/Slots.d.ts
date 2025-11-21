import type { ISlot, VehicleType } from "./types";
export declare class Slot implements ISlot {
    id: number;
    type: VehicleType;
    isOccupied: boolean;
    floorId: number;
    constructor(id: number, type: VehicleType, floorId: number);
    occupy(): void;
    release(): void;
}
//# sourceMappingURL=Slots.d.ts.map