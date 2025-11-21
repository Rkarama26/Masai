import type {
  IFloor,
  IParkingStrategy,
  ISlot,
  IVehicle,
} from "../model/types.js";

export class RandomParkingStrategy implements IParkingStrategy {
  park(floors: IFloor[], vehicle: IVehicle): ISlot | null {
    const availableSlots: ISlot[] = [];

    // Collect all available slots
    floors.forEach((floor) => {
      availableSlots.push(...floor.getAvailableSlot(vehicle.type));
    });

    if (availableSlots.length === 0) return null;

    // Select a random slot
    const randomIndex = Math.floor(Math.random() * availableSlots.length);
    return availableSlots[randomIndex]!;
  }
}
