"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IdleState_1 = require("./states/IdleState");
const VendingMachine_1 = require("./VendingMachine");
const machine = new VendingMachine_1.VendingMachine(new IdleState_1.IdleState());
machine.insertCoin(); // Idle → Processing
machine.selectProduct(); // Processing → Dispensing
machine.dispenseProduct(); // Dispensing → Idle
//# sourceMappingURL=main.js.map