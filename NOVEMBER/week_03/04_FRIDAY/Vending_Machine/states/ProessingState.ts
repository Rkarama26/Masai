import  { Machine, machineState } from "../types";
import { DispensingState } from "./DispensingState";

export class ProccessingState implements machineState {
  insertCoin(machine: Machine): void {
    console.log("Coin Already inserted");
  }
  selectProduct(machine: Machine): void {
    console.log("Items selected, Moving to next state");
    machine.setState(new DispensingState())
  }
  dispenseProduct(machine: Machine): void {
    console.log("Cannot dispens before selcting product");
  }
}
