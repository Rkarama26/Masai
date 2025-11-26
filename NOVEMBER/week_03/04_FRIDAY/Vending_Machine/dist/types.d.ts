export interface machineState {
    insertCoin(machine: Machine): void;
    selectProduct(machine: Machine): void;
    dispenseProduct(machine: Machine): void;
}
export interface Machine {
    state: machineState;
    insertCoin(): void;
    selectProduct(): void;
    dispenseProduct(): void;
    setState(state: machineState): void;
}
//# sourceMappingURL=types.d.ts.map