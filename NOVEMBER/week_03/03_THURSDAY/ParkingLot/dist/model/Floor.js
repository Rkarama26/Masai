import { Slot } from "./Slots.js";
export class Floor {
    id;
    slots;
    constructor(id) {
        this.id = id;
        this.slots = [];
    }
    addSlot(vehicleType) {
        this.slots.push(new Slot(this.slots.length + 1, vehicleType, this.id));
    }
    getAvailableSlot(vehicleType) {
        let availableSlots = [];
        for (const slot of this.slots) {
            if (slot.isOccupied) {
                continue;
            }
            if (!vehicleType) {
                availableSlots.push(slot);
            }
            else if (slot.type === vehicleType) {
                availableSlots.push(slot);
            }
        }
        // console.log(availableSlots);
        return availableSlots;
    }
    getOccupiedSlots(vehicleType) {
        let occupiedSlots = [];
        for (const slot of this.slots) {
            if (!slot.isOccupied) {
                continue;
            }
            if (!vehicleType) {
                occupiedSlots.push(slot);
            }
            else if (slot.type === vehicleType) {
                occupiedSlots.push(slot);
            }
        }
        return occupiedSlots;
    }
}
//# sourceMappingURL=Floor.js.map