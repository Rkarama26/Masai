import { Ticket } from "../model/Ticket.js";
import type { ITicket, IVehicle } from "../model/types.js";
export declare class TicketController {
    private static instance;
    static tickets: Map<string, ITicket>;
    private constructor();
    static getInstance(): TicketController;
    static generateTicketId(lotId: string, slotId: string | number, floorId: string | number, vehicle: IVehicle): Ticket;
    static getTicketWithId(ticketId: string): ITicket | undefined;
    static deleteTicket(ticketId: string): boolean;
}
//# sourceMappingURL=TicketController.d.ts.map