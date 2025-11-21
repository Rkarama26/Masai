import { Ticket } from "../model/Ticket.js";
import type { ITicket, IVehicle } from "../model/types.js";
import type { Vehicle } from "../model/Vehicle.js";

export class TicketController {
  //singleton pattern
  private static instance: TicketController;

  static tickets = new Map<string, ITicket>();

  private constructor() {}

  public static getInstance(): TicketController {
    if (!TicketController.instance) {
      TicketController.instance = new TicketController();
    }
    return TicketController.instance;
  }

  static generateTicketId(
    lotId: string,
    slotId: string | number,
    floorId: string | number,
    vehicle: IVehicle
  ) {
    const ticketId = `${lotId}_${floorId}_${slotId}`;
    const ticket = new Ticket(ticketId, vehicle);
    TicketController.tickets.set(ticketId, ticket);
    return ticket;
  }

  static getTicketWithId(ticketId: string): ITicket | undefined {
    return TicketController.tickets.get(ticketId);
  }

  // Method to delete a ticket by ID
  static deleteTicket(ticketId: string) {
    return TicketController.tickets.delete(ticketId);
  }
}
