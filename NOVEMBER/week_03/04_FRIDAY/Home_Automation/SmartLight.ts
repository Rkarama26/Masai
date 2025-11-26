import { LightState, ISmartLight } from "./State";
import { OffState } from "./States";

export class SmartLight implements ISmartLight {
  private state: LightState;
  private brightness: number = 0;
  private daytime: boolean = true; // Assume daytime initially

  constructor() {
    this.state = new OffState(this);
  }

  setState(state: LightState): void {
    this.state = state;
  }

  turnOn(): void {
    this.state.turnOn();
  }

  turnOff(): void {
    this.state.turnOff();
  }

  detectMotion(): void {
    this.state.detectMotion();
  }

  adjustBrightness(): void {
    this.state.adjustBrightness();
  }

  getBrightness(): number {
    return this.brightness;
  }

  setBrightness(brightness: number): void {
    this.brightness = brightness;
  }

  isDaytime(): boolean {
    return this.daytime;
  }

  setDaytime(daytime: boolean): void {
    this.daytime = daytime;
  }
}
