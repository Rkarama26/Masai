export class DefaultParkingStrategy {
    park(floors, vehicle) {
        for (let floor of floors) {
            const [slotToBook] = floor.getAvailableSlot(vehicle.type);
            if (slotToBook) {
                return slotToBook;
            }
        }
        return null;
    }
}
//# sourceMappingURL=DefaultParkingStrategy.js.map