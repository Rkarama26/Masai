import type { ITicket, IVehicle } from "./types.js";

export class Ticket implements ITicket {
  id: string;
  vehicle: IVehicle;
  entryTime: Date;

  constructor(id: string, vehicle: IVehicle) {
    this.id = id;
    this.vehicle = vehicle;
    this.entryTime = new Date();
  }
}
