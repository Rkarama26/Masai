
import { IdleState } from "./states/IdleState";
import { VendingMachine } from "./VendingMachine";

const machine = new VendingMachine(new IdleState());

machine.insertCoin(); // Idle → Processing
machine.selectProduct(); // Processing → Dispensing
machine.dispenseProduct(); // Dispensing → Idle
