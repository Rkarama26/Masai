import type types = require("./types");
export declare class Floor implements types.IFloor {
    id: number;
    slots: Array<types.ISlot>;
    constructor(id: number);
    addSlot(vehicleType: VehicleType): void;
    getAvailableSlot(vehicleType?: VehicleType): Array<ISlot>;
    getOccupiedSlots(vehicleType?: VehicleType): Array<ISlot>;
}
//# sourceMappingURL=Floor.d.ts.map