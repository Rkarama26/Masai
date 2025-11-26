"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdleState = void 0;
const ProessingState_1 = require("./ProessingState");
class IdleState {
    insertCoin(machine) {
        console.log("Coin inserted, Moving to processing state");
        machine.setState(new ProessingState_1.ProccessingState());
    }
    selectProduct(machine) {
        console.log("first insert coin");
    }
    dispenseProduct(machine) {
        console.log("first insert coin");
    }
}
exports.IdleState = IdleState;
//# sourceMappingURL=IdleState.js.map