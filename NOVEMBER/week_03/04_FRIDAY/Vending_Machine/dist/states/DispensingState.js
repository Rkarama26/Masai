"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispensingState = void 0;
const IdleState_1 = require("./IdleState");
class DispensingState {
    insertCoin(machine) {
        console.log("Already coin inserted");
    }
    selectProduct(machine) {
        console.log("Already product selected");
    }
    dispenseProduct(machine) {
        console.log("Items dispensed");
        machine.setState(new IdleState_1.IdleState());
    }
}
exports.DispensingState = DispensingState;
//# sourceMappingURL=DispensingState.js.map