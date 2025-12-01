"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispensingCashState = exports.AuthenticatedState = exports.CardInsertedState = exports.IdleState = void 0;
const State_1 = require("./State");
class IdleState extends State_1.AbstractATMState {
    insertCard() {
        console.log("Card inserted. Please enter your PIN.");
        this.atm.setState(new CardInsertedState(this.atm));
    }
    enterPin(pin) {
        console.log("Please insert card first.");
    }
    withdraw(amount) {
        console.log("Please insert card first.");
    }
    ejectCard() {
        console.log("No card to eject.");
    }
}
exports.IdleState = IdleState;
class CardInsertedState extends State_1.AbstractATMState {
    enterPin(pin) {
        if (pin === "1234") {
            // Assume correct PIN
            console.log("PIN correct. You are authenticated.");
            this.atm.setState(new AuthenticatedState(this.atm));
        }
        else {
            console.log("Incorrect PIN. Card ejected.");
            this.atm.setState(new IdleState(this.atm));
        }
    }
    insertCard() {
        console.log("Card already inserted.");
    }
    withdraw(amount) {
        console.log("Please enter PIN first.");
    }
    ejectCard() {
        console.log("Card ejected.");
        this.atm.setState(new IdleState(this.atm));
    }
}
exports.CardInsertedState = CardInsertedState;
class AuthenticatedState extends State_1.AbstractATMState {
    withdraw(amount) {
        if (amount <= this.atm.getBalance()) {
            console.log(`Dispensing $${amount}.`);
            this.atm.deductBalance(amount);
            this.atm.setState(new DispensingCashState(this.atm));
        }
        else {
            console.log("Insufficient funds.");
        }
    }
    insertCard() {
        console.log("Card already inserted.");
    }
    enterPin(pin) {
        console.log("Already authenticated.");
    }
    ejectCard() {
        console.log("Card ejected.");
        this.atm.setState(new IdleState(this.atm));
    }
}
exports.AuthenticatedState = AuthenticatedState;
class DispensingCashState extends State_1.AbstractATMState {
    insertCard() {
        console.log("Please wait, dispensing cash.");
    }
    enterPin(pin) {
        console.log("Please wait, dispensing cash.");
    }
    withdraw(amount) {
        console.log("Please wait, dispensing cash.");
    }
    ejectCard() {
        console.log("Cash dispensed. Card ejected.");
        this.atm.setState(new IdleState(this.atm));
    }
}
exports.DispensingCashState = DispensingCashState;
