import { ATM } from "./ATM";

const atm = new ATM();

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
