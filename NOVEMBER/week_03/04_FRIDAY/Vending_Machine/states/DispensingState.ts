import type { Machine, machineState } from "../types";
import { IdleState } from "./IdleState";

export class DispensingState implements machineState {
  insertCoin(machine: Machine): void {
    console.log("Already coin inserted");
  }
  selectProduct(machine: Machine): void {
    console.log("Already product selected");
  }
  dispenseProduct(machine: Machine): void {
    console.log("Items dispensed");
    machine.setState(new IdleState());
  }
}
