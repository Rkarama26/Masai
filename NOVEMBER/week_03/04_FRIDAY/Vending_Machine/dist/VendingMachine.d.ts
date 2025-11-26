import type { Machine, machineState } from "./types";
export declare class VendingMachine implements Machine {
    state: machineState;
    constructor(state: machineState);
    insertCoin(): void;
    selectProduct(): void;
    dispenseProduct(): void;
    setState(state: machineState): void;
}
//# sourceMappingURL=VendingMachine.d.ts.map