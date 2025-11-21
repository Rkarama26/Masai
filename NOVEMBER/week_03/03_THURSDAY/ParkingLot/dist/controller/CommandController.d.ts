import type ParkingLotController from "./ParkingLotController.js";
declare class CommandController {
    parkingLotController: ParkingLotController;
    constructor(parkingLotController: ParkingLotController);
    executeCommand(command: string, ...args: Array<string | number>): string;
}
export default CommandController;
//# sourceMappingURL=CommandController.d.ts.map