export interface ISmartLight {
  setState(state: LightState): void;
  getBrightness(): number;
  setBrightness(brightness: number): void;
  isDaytime(): boolean;
}

export interface LightState {
  turnOn(): void;
  turnOff(): void;
  detectMotion(): void;
  adjustBrightness(): void;
}

export abstract class AbstractLightState implements LightState {
  protected light: ISmartLight;

  constructor(light: ISmartLight) {
    this.light = light;
  }

  abstract turnOn(): void;
  abstract turnOff(): void;
  abstract detectMotion(): void;
  abstract adjustBrightness(): void;
}
