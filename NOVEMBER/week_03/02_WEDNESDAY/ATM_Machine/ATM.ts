import { ATMState, IATM } from "./State";
import { IdleState } from "./States";

export class ATM implements IATM {
  private state: ATMState;
  private balance: number = 1000; // Assume initial balance

  constructor() {
    this.state = new IdleState(this);
  }

  setState(state: ATMState): void {
    this.state = state;
  }

  insertCard(): void {
    this.state.insertCard();
  }

  enterPin(pin: string): void {
    this.state.enterPin(pin);
  }

  withdraw(amount: number): void {
    this.state.withdraw(amount);
  }

  ejectCard(): void {
    this.state.ejectCard();
  }

  getBalance(): number {
    return this.balance;
  }

  deductBalance(amount: number): void {
    this.balance -= amount;
  }
}
