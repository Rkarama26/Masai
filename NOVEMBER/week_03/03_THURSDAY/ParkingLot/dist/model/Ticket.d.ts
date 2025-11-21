import type { ITicket, IVehicle } from "./types.js";
export declare class Ticket implements ITicket {
    id: string;
    vehicle: IVehicle;
    entryTime: Date;
    constructor(id: string, vehicle: IVehicle);
}
//# sourceMappingURL=Ticket.d.ts.map