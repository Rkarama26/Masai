import type { ILights, ITrafficLights } from "../types";
import { RedLight } from "./RedLight";

export class YellowLights implements ILights {
  change(state: ITrafficLights): void {
    console.log("Yellow: Vehicles should slow down.");
    state.setState(new RedLight());
  }
}
