export interface ITrafficLights {
  state: ILights;
  change(): void;
  setState(state: ILights): void;
}

export interface ILights {
  change(state: ITrafficLights): void;
}
