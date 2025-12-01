"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ATM = void 0;
const States_1 = require("./States");
class ATM {
    constructor() {
        this.balance = 1000; // Assume initial balance
        this.state = new States_1.IdleState(this);
    }
    setState(state) {
        this.state = state;
    }
    insertCard() {
        this.state.insertCard();
    }
    enterPin(pin) {
        this.state.enterPin(pin);
    }
    withdraw(amount) {
        this.state.withdraw(amount);
    }
    ejectCard() {
        this.state.ejectCard();
    }
    getBalance() {
        return this.balance;
    }
    deductBalance(amount) {
        this.balance -= amount;
    }
}
exports.ATM = ATM;
