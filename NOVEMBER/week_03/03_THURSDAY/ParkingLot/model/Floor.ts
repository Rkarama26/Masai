import { Slot } from "./Slots.js";
import type { IFloor, ISlot, VehicleType } from "./types.js";

export class Floor implements IFloor {
  id: number;
  slots: ISlot[];

  constructor(id: number) {
    this.id = id;
    this.slots = [];
  }

  addSlot(vehicleType: VehicleType) {
    this.slots.push(new Slot(this.slots.length + 1, vehicleType, this.id));
  }

  getAvailableSlot(vehicleType?: VehicleType) {
    let availableSlots = [];
    for (const slot of this.slots) {
      if (slot.isOccupied) {
        continue;
      }

      if (!vehicleType) {
        availableSlots.push(slot);
      } else if (slot.type === vehicleType) {
        availableSlots.push(slot);
      }
    }
    // console.log(availableSlots);
    return availableSlots;
  }

  getOccupiedSlots(vehicleType?: VehicleType) {
    let occupiedSlots = [];
    for (const slot of this.slots) {
      if (!slot.isOccupied) {
        continue;
      }

      if (!vehicleType) {
        occupiedSlots.push(slot);
      } else if (slot.type === vehicleType) {
        occupiedSlots.push(slot);
      }
    }
    return occupiedSlots;
  }
}
