import type {
  IFloor,
  IParkingStrategy,
  ISlot,
  IVehicle,
} from "../model/types.js";

export class DefaultParkingStrategy implements IParkingStrategy {
  park(floors: IFloor[], vehicle: IVehicle): ISlot | null {
    for (let floor of floors) {
      const [slotToBook] = floor.getAvailableSlot(vehicle.type);
      if (slotToBook) {
        return slotToBook;
      }
    }
    return null;
  }
  
}
