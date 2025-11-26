import type { ILights, ITrafficLights } from "../types";
import { GreenLights } from "./GreenLights";

export class RedLight implements ILights {
  change(state: ITrafficLights): void {
    console.log("Red: Vehicles must stop.");
    state.setState(new GreenLights());
  }
}
