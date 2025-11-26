"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendingMachine = void 0;
const IdleState_1 = require("./states/IdleState");
class VendingMachine {
    constructor(state) {
        this.state = new IdleState_1.IdleState();
    }
    insertCoin() {
        this.state.insertCoin(this);
    }
    selectProduct() {
        this.state.selectProduct(this);
    }
    dispenseProduct() {
        this.state.dispenseProduct(this);
    }
    setState(state) {
        this.state = state;
    }
}
exports.VendingMachine = VendingMachine;
//# sourceMappingURL=VendingMachine.js.map