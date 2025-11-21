import type {
  IFloor,
  IParkingStrategy,
  ISlot,
  IVehicle,
} from "../model/types.js";

export class NearestParkingStrategy implements IParkingStrategy {
  park(floors: IFloor[], vehicle: IVehicle): ISlot | null {
    const availableSlots: ISlot[] = [];

    // Collect all available slots
    floors.forEach((floor) => {
      availableSlots.push(...floor.getAvailableSlot(vehicle.type));
    });

    if (availableSlots.length === 0) return null;

    // Sort by floor id, then by slot id (nearest first)
    availableSlots.sort((a, b) => {
      if (a.floorId !== b.floorId) {
        return a.floorId - b.floorId;
      }
      return a.id - b.id;
    });

    // Return the nearest slot
    return availableSlots[0]!;
  }
}
