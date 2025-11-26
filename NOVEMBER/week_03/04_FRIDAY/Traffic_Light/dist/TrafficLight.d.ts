import type { ILights, ITrafficLights } from "./types";
export declare class TrafficLight implements ITrafficLights {
    state: ILights;
    constructor(state?: ILights);
    change(): void;
    setState(state: ILights): void;
}
//# sourceMappingURL=TrafficLight.d.ts.map