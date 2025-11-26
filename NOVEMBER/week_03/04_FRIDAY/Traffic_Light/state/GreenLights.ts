import type { ILights, ITrafficLights } from "../types";
import { YellowLights } from "./YellowLights";

export class GreenLights implements ILights {
  change(state: ITrafficLights): void {
    console.log("Green: Vehicles can move.");
    state.setState(new YellowLights());
  }
}
