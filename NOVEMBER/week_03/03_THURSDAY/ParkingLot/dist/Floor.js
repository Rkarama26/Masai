export class Floor {
    id;
    slots;
    constructor(id) {
        this.id = id;
        this.slots = [];
    }
    addSlot(vehicleType) {
        const slot = new Slot(this.slots.length + 1, vehicleType, this.id);
        this.slots.push(slot);
    }
    getAvailableSlot(vehicleType) {
        if (vehicleType) {
            return this.slots.filter(slot => !slot.isOccupied && slot.type === vehicleType);
        }
        return this.slots.filter(slot => !slot.isOccupied);
    }
    getOccupiedSlots(vehicleType) {
        if (vehicleType) {
            return this.slots.filter(slot => slot.isOccupied && slot.type === vehicleType);
        }
        return this.slots.filter(slot => slot.isOccupied);
    }
}
//# sourceMappingURL=Floor.js.map