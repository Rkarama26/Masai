import { Ticket } from "../model/Ticket.js";
export class TicketController {
    //singleton pattern
    static instance;
    static tickets = new Map();
    constructor() { }
    static getInstance() {
        if (!TicketController.instance) {
            TicketController.instance = new TicketController();
        }
        return TicketController.instance;
    }
    static generateTicketId(lotId, slotId, floorId, vehicle) {
        const ticketId = `${lotId}_${floorId}_${slotId}`;
        const ticket = new Ticket(ticketId, vehicle);
        TicketController.tickets.set(ticketId, ticket);
        return ticket;
    }
    static getTicketWithId(ticketId) {
        return TicketController.tickets.get(ticketId);
    }
    // Method to delete a ticket by ID
    static deleteTicket(ticketId) {
        return TicketController.tickets.delete(ticketId);
    }
}
//# sourceMappingURL=TicketController.js.map