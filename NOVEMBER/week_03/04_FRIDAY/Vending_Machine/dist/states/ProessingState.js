"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProccessingState = void 0;
class ProccessingState {
    insertCoin(machine) {
        console.log("Coin Already inserted");
    }
    selectProduct(machine) {
        console.log("Items selected, Moving to next state");
    }
    dispenseProduct(machine) {
        console.log("Cannot dispens before selcting product");
    }
}
exports.ProccessingState = ProccessingState;
//# sourceMappingURL=ProessingState.js.map