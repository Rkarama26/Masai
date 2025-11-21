export class Slot {
    id;
    type;
    isOccupied;
    floorId;
    constructor(id, type, floorId) {
        this.id = id;
        this.type = type;
        this.isOccupied = false;
        this.floorId = floorId;
    }
    occupy() {
        if (this.isOccupied) {
            throw new Error("Slot is already occupied");
        }
        this.isOccupied = true;
    }
    release() {
        if (!this.isOccupied) {
            throw new Error("Slot is already free");
        }
        this.isOccupied = false;
    }
}
//# sourceMappingURL=Slots.js.map