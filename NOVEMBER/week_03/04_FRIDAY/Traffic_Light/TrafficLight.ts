import { RedLight } from "./state/RedLight";
import type { ILights, ITrafficLights } from "./types";

export class TrafficLight implements ITrafficLights {
  state: ILights;

  constructor(state?: ILights) {
    this.state = state || new RedLight();
  }

  change(): void {
    this.state.change(this);
  }

  setState(state: ILights): void {
    this.state = state;
  }
}
