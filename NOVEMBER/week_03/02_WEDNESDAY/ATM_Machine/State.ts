export interface IATM {
  setState(state: ATMState): void;
  getBalance(): number;
  deductBalance(amount: number): void;
}

export interface ATMState {
  insertCard(): void;
  enterPin(pin: string): void;
  withdraw(amount: number): void;
  ejectCard(): void;
}

export abstract class AbstractATMState implements ATMState {
  protected atm: IATM;

  constructor(atm: IATM) {
    this.atm = atm;
  }

  abstract insertCard(): void;
  abstract enterPin(pin: string): void;
  abstract withdraw(amount: number): void;
  abstract ejectCard(): void;
}
