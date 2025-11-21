import type { IFloor, ISlot, VehicleType } from "./types.js";
export declare class Floor implements IFloor {
    id: number;
    slots: ISlot[];
    constructor(id: number);
    addSlot(vehicleType: VehicleType): void;
    getAvailableSlot(vehicleType?: VehicleType): ISlot[];
    getOccupiedSlots(vehicleType?: VehicleType): ISlot[];
}
//# sourceMappingURL=Floor.d.ts.map