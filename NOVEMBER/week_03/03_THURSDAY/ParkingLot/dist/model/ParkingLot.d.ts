import type { IFloor, IParkingStrategy, ISlot, IVehicle } from "./types.js";
import { VehicleType } from "./types.js";
export declare class ParkingLot {
    id: string;
    floors: Array<IFloor>;
    private parkingStrategy;
    constructor(id: string, parkingStrategy: IParkingStrategy);
    addFloors(floorsToAdd: number): void;
    setParkingStrategy(parkingStrategy: IParkingStrategy): void;
    parkVehicle(vehicle: IVehicle): import("./Ticket.js").Ticket;
    unParkVehicle(ticketId: string): string;
    getFreeSlots(vehicleType: VehicleType, showSlots?: boolean): {
        [x: string]: number | ISlot[];
    };
    getOccupiedSlots(vehicleType: VehicleType): {
        [x: string]: number | ISlot[];
    };
}
//# sourceMappingURL=ParkingLot.d.ts.map