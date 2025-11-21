export class RandomParkingStrategy {
    park(floors, vehicle) {
        const availableSlots = [];
        // Collect all available slots
        floors.forEach((floor) => {
            availableSlots.push(...floor.getAvailableSlot(vehicle.type));
        });
        if (availableSlots.length === 0)
            return null;
        // Select a random slot
        const randomIndex = Math.floor(Math.random() * availableSlots.length);
        return availableSlots[randomIndex];
    }
}
//# sourceMappingURL=RandomParkingStrategy.js.map