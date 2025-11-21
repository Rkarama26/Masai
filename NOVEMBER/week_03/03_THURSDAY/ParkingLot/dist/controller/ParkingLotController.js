import { ParkingLot } from "../model/ParkingLot.js";
import { VehicleType } from "../model/types.js";
import { Vehicle } from "../model/Vehicle.js";
import { RandomParkingStrategy } from "../strategy/RandomParkingStrategy.js";
import { NearestParkingStrategy } from "../strategy/NearestParkingStrategy.js";
const HOURLY_RATES = {
    [VehicleType.CAR]: 20,
    [VehicleType.EV_CAR]: 25,
    [VehicleType.BIKE]: 10,
    [VehicleType.TRUCK]: 30,
};
function getVehicleType(str) {
    const lower = str.toLowerCase();
    switch (lower) {
        case "car":
            return VehicleType.CAR;
        case "ev-car":
        case "ev car":
            return VehicleType.EV_CAR;
        case "truck":
            return VehicleType.TRUCK;
        case "bike":
            return VehicleType.BIKE;
        default:
            return undefined;
    }
}
class ParkingLotController {
    parkingLot;
    createParkingLot(id, totalFloors, totalSlots, strategy) {
        if (this.parkingLot) {
            throw new Error("Parking Lot already exists");
        }
        let parkingStrategy;
        switch (strategy.toLowerCase()) {
            case "random":
                parkingStrategy = new RandomParkingStrategy();
                break;
            case "nearest":
                parkingStrategy = new NearestParkingStrategy();
                break;
            default:
                throw new Error('Invalid parking strategy. Use "random" or "nearest"');
        }
        this.parkingLot = new ParkingLot(id, parkingStrategy);
        this.parkingLot.addFloors(totalFloors);
        const floors = this.parkingLot.floors;
        floors.forEach((floor) => {
            for (let ind = 0; ind < totalSlots; ind++) {
                let vehicleType;
                if (ind === totalSlots - 1) {
                    vehicleType = VehicleType.EV_CAR;
                }
                else {
                    vehicleType =
                        ind === 0
                            ? VehicleType.TRUCK
                            : ind <= 2
                                ? VehicleType.BIKE
                                : VehicleType.CAR;
                }
                floor.addSlot(vehicleType);
            }
        });
        return `Created parking lot with ${totalFloors} floors and ${totalSlots} slots per floor`;
    }
    parkVehicle(vType, regNo, color) {
        const vehicleType = getVehicleType(vType);
        if (!vehicleType) {
            throw new Error(`Invalid vehicle type: ${vType}`);
        }
        const vehicle = new Vehicle(vehicleType, regNo, color);
        const ticket = this.parkingLot.parkVehicle(vehicle);
        if (ticket) {
            // this.tickets.push(ticket);
            return `Parked vehicle. Ticket ID: ${ticket.id}`;
        }
        return "Parking Lot Full";
    }
    unparkVehicle(ticketId) {
        return this.parkingLot.unParkVehicle(ticketId);
    }
    display(displayType, vType) {
        // console.log(displayType, vType);
        const vehicleType = getVehicleType(vType);
        if (!vehicleType) {
            throw new Error(`Invalid vehicle type: ${vType}`);
        }
        // console.log(vehicleType);
        let data;
        switch (displayType) {
            case "free_slots":
            case "free_count":
                data = this.parkingLot.getFreeSlots(vehicleType, displayType === "free_slots");
                break;
            case "occupied_slots":
                data = this.parkingLot.getOccupiedSlots(vehicleType);
                break;
        }
        let resp = "";
        if (data) {
            Object.entries(data).forEach((d) => {
                const [floor, slotsOrCount] = d;
                resp +=
                    printSlotsData(displayType, vehicleType, floor, slotsOrCount) + "\n";
            });
        }
        return resp;
    }
}
function printSlotsData(displayType, vehicleType, floor, slotsOrCount) {
    switch (displayType) {
        case "free_slots":
            return `No. of free slots for ${vehicleType} on Floor ${floor}: ${slotsOrCount.map((slot) => slot.id)}`;
        case "free_count":
            return `Free slots for ${vehicleType} on Floor ${floor}: ${slotsOrCount}`;
        case "occupied_slots":
            return `Occupied slots for ${vehicleType} on Floor ${floor}: ${slotsOrCount.map((slot) => slot.id)}`;
    }
}
export default ParkingLotController;
//# sourceMappingURL=ParkingLotController.js.map