export declare enum VehicleType {
    Car = "Car",
    Truck = "Truck",
    Bike = "Bike"
}
export interface IVehicle {
    type: VehicleType;
    regNo: string;
    color: string;
}
export interface ISlot {
    id: number;
    type: VehicleType;
    isOccupied: boolean;
    floorId: number;
    occupy(): void;
    release(): void;
}
export interface IFloor {
    id: number;
    slots: Array<ISlot>;
    addSlot(vehicleType: VehicleType): void;
    getAvailableSlot(vehicleType?: VehicleType): Array<ISlot>;
    getOccupiedSlots(vehicleType?: VehicleType): Array<ISlot>;
}
export interface ITicket {
    id: string;
    vehicle: IVehicle;
}
export interface IparkingStrategy {
    park(floors: Array<IFloor>, vehicle: IVehicle): ISlot | null;
}
//# sourceMappingURL=types.d.ts.map