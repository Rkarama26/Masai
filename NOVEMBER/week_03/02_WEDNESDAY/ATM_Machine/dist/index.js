"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ATM_1 = require("./ATM");
const atm = new ATM_1.ATM();
console.log("=== ATM Simulation ===");
// Insert card
atm.insertCard();
// Enter PIN
atm.enterPin("1234");
// Withdraw money
atm.withdraw(200);
// Eject card (which should happen after dispensing)
atm.ejectCard();
console.log("Transaction complete.");
