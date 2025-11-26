import { IdleState } from "./states/IdleState";
import type { Machine, machineState } from "./types";

export class VendingMachine implements Machine {
  state: machineState;

  constructor(state: machineState) {
    this.state = new IdleState();
  }

  insertCoin(): void {
    this.state.insertCoin(this)
  }
  selectProduct(): void {
    this.state.selectProduct(this);
  }
  dispenseProduct(): void {
    this.state.dispenseProduct(this)
  }
  setState(state: machineState): void {
    this.state = state
  }
  
}
