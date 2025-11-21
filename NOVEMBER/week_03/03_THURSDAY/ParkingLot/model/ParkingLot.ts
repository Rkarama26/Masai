import { TicketController } from "../controller/TicketController.js";
import { Floor } from "./Floor.js";
import type { IFloor, IParkingStrategy, ISlot, IVehicle } from "./types.js";
import { VehicleType } from "./types.js";

const HOURLY_RATES: Record<VehicleType, number> = {
  [VehicleType.CAR]: 20,
  [VehicleType.EV_CAR]: 25,
  [VehicleType.BIKE]: 10,
  [VehicleType.TRUCK]: 30,
};

export class ParkingLot {
  id: string;
  floors: Array<IFloor>;
  private parkingStrategy: IParkingStrategy;

  constructor(id: string, parkingStrategy: IParkingStrategy) {
    this.id = id;
    this.floors = [];
    this.parkingStrategy = parkingStrategy;
  }

  addFloors(floorsToAdd: number): void {
    for (let i = 0; i < floorsToAdd; i++) {
      this.floors.push(new Floor(i));
    }
  }

  setParkingStrategy(parkingStrategy: IParkingStrategy): void {
    this.parkingStrategy = parkingStrategy;
  }

  parkVehicle(vehicle: IVehicle) {
    const slotToBook = this.parkingStrategy.park(this.floors, vehicle);

    if (slotToBook) {
      slotToBook.occupy();
      const ticket = TicketController.generateTicketId(
        this.id,
        slotToBook.id,
        slotToBook.floorId,
        vehicle
      );
      return ticket;
    }
    throw new Error("No slots available");
  }

  unParkVehicle(ticketId: string) {
    const ticket = TicketController.getTicketWithId(ticketId);

    if (ticket) {
      const [ParkingLotId, floorId, slotId] = ticketId.split("_");
      const floor = this.floors[Number(floorId)];
      if (!floor) {
        throw new Error("Invalid floor ID");
      }
      const slot = floor.slots[Number(slotId) - 1];
      if (!slot) {
        throw new Error("Invalid slot ID");
      }
      slot.release();
      TicketController.deleteTicket(ticketId);

      // Calculate parking fee
      const exitTime = new Date();
      const durationMs = exitTime.getTime() - ticket.entryTime.getTime();
      const hours = Math.ceil(durationMs / (1000 * 60 * 60)); // Round up to next hour
      const rate = HOURLY_RATES[ticket.vehicle.type];
      const fee = rate * hours;

      return `Unparked vehicle with registration number: ${ticket.vehicle.regNo}. Parking fee: ${fee} rupees (Duration: ${hours} hours at ${rate} rupees/hour)`;
    } else {
      throw new Error("Invalid ticket ID");
    }
  }

  getFreeSlots(vehicleType: VehicleType, showSlots: boolean = false) {
    const floors = this.floors;
    const freeSlots: { [x: string]: ISlot[] | number } = {};

    floors.forEach((floor) => {
      const availableSlots = floor.getAvailableSlot(vehicleType);
      freeSlots[floor.id] = showSlots ? availableSlots : availableSlots.length;
    });
    return freeSlots;
  }

  getOccupiedSlots(vehicleType: VehicleType) {
    const floors = this.floors;
    const occupiedSlots: { [x: string]: ISlot[] | number } = {};

    floors.forEach((floor) => {
      occupiedSlots[floor.id] = floor.getOccupiedSlots(vehicleType);
    });
    return occupiedSlots;
  }
}
