import type { Machine, machineState } from "../types";
import { ProccessingState } from "./ProessingState";

export class IdleState implements machineState {
  insertCoin(machine: Machine): void {
    console.log("Coin inserted, Moving to processing state");
    machine.setState(new ProccessingState());
  }
  selectProduct(machine: Machine): void {
    console.log("first insert coin");
  }

  dispenseProduct(machine: Machine): void {
    console.log("first insert coin");
  }
}
