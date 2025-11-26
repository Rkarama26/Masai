import { AbstractATMState, IATM } from "./State";

export class IdleState extends AbstractATMState {
  insertCard(): void {
    console.log("Card inserted. Please enter your PIN.");
    this.atm.setState(new CardInsertedState(this.atm));
  }

  enterPin(pin: string): void {
    console.log("Please insert card first.");
  }

  withdraw(amount: number): void {
    console.log("Please insert card first.");
  }

  ejectCard(): void {
    console.log("No card to eject.");
  }
}

export class CardInsertedState extends AbstractATMState {
  enterPin(pin: string): void {
    if (pin === "1234") {
      // Assume correct PIN
      console.log("PIN correct. You are authenticated.");
      this.atm.setState(new AuthenticatedState(this.atm));
    } else {
      console.log("Incorrect PIN. Card ejected.");
      this.atm.setState(new IdleState(this.atm));
    }
  }

  insertCard(): void {
    console.log("Card already inserted.");
  }

  withdraw(amount: number): void {
    console.log("Please enter PIN first.");
  }

  ejectCard(): void {
    console.log("Card ejected.");
    this.atm.setState(new IdleState(this.atm));
  }
}

export class AuthenticatedState extends AbstractATMState {
  withdraw(amount: number): void {
    if (amount <= this.atm.getBalance()) {
      console.log(`Dispensing $${amount}.`);
      this.atm.deductBalance(amount);
      this.atm.setState(new DispensingCashState(this.atm));
    } else {
      console.log("Insufficient funds.");
    }
  }

  insertCard(): void {
    console.log("Card already inserted.");
  }

  enterPin(pin: string): void {
    console.log("Already authenticated.");
  }

  ejectCard(): void {
    console.log("Card ejected.");
    this.atm.setState(new IdleState(this.atm));
  }
}

export class DispensingCashState extends AbstractATMState {
  insertCard(): void {
    console.log("Please wait, dispensing cash.");
  }

  enterPin(pin: string): void {
    console.log("Please wait, dispensing cash.");
  }

  withdraw(amount: number): void {
    console.log("Please wait, dispensing cash.");
  }

  ejectCard(): void {
    console.log("Cash dispensed. Card ejected.");
    this.atm.setState(new IdleState(this.atm));
  }
}
