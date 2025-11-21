import { ParkingLot } from "../model/ParkingLot.js";
declare class ParkingLotController {
    parkingLot: ParkingLot;
    createParkingLot(id: string, totalFloors: number, totalSlots: number, strategy: string): string;
    parkVehicle(vType: string, regNo: string, color: string): string;
    unparkVehicle(ticketId: string): string;
    display(displayType: string, vType: string): string;
}
export default ParkingLotController;
//# sourceMappingURL=ParkingLotController.d.ts.map