import type { ISlot, VehicleType } from "./types.js";

export class Slot implements ISlot {
  id: number;
  type: VehicleType;
  isOccupied: boolean;
  floorId: number;
  constructor(id: number, type: VehicleType, floorId: number) {
    this.id = id;
    this.type = type;
    this.isOccupied = false;
    this.floorId = floorId;
  }

  occupy(): void {
    if (this.isOccupied) {
      throw new Error("Slot is already occupied");
    }
    this.isOccupied = true;
  }
  release(): void {
    if (!this.isOccupied) {
      throw new Error("Slot is already free");
    }
    this.isOccupied = false;
  }
}
