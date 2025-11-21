// index.ts
import fs from "fs";
import { join } from "path";
import readLine from "readline";
import ParkingLotController from "./controller/ParkingLotController.js";
import CommandController from "./controller/CommandController.js";
function readCommand() {
    const fileName = process.argv[2];
    if (!fileName) {
        throw new Error("Please provide a file name as an argument");
    }
    const file = join(process.cwd(), fileName);
    if (!fs.existsSync(file)) {
        throw new Error(`${file} File not found`);
    }
    const rl = readLine.createInterface({
        input: fs.createReadStream(file),
    });
    const parkingLotController = new ParkingLotController();
    const commandController = new CommandController(parkingLotController);
    rl.on("line", (data) => {
        const parts = data.split(" ");
        const command = parts[0] || "";
        const args = parts.slice(1);
        if (command === "exit") {
            console.log("Exiting!!");
            return rl.close();
        }
        let resp = "";
        try {
            resp = commandController.executeCommand(command, ...args);
        }
        catch (e) {
            resp = "Unknown Error";
            if (e instanceof Error) {
                resp = e.message;
            }
        }
        finally {
            console.log("RESPONSE>>", resp);
        }
    });
}
readCommand();
//# sourceMappingURL=index.js.map