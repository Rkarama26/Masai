import { AbstractLightState, ISmartLight } from "./State";

export class OffState extends AbstractLightState {
  turnOn(): void {
    console.log("Light turned on manually.");
    this.light.setState(new OnState(this.light));
  }

  turnOff(): void {
    console.log("Light is already off.");
  }

  detectMotion(): void {
    console.log("Motion detected. Turning on light.");
    this.light.setState(new MotionDetectionState(this.light));
  }

  adjustBrightness(): void {
    console.log("Light is off. Cannot adjust brightness.");
  }
}

export class OnState extends AbstractLightState {
  turnOn(): void {
    console.log("Light is already on.");
  }

  turnOff(): void {
    console.log("Light turned off.");
    this.light.setState(new OffState(this.light));
  }

  detectMotion(): void {
    console.log("Motion detected while on. No change.");
  }

  adjustBrightness(): void {
    console.log("Adjusting brightness based on time.");
    this.light.setState(new BrightnessAdjustmentState(this.light));
  }
}

export class MotionDetectionState extends AbstractLightState {
  turnOn(): void {
    console.log("Light is already on due to motion.");
  }

  turnOff(): void {
    console.log("Motion-based light turned off.");
    this.light.setState(new OffState(this.light));
  }

  detectMotion(): void {
    console.log("Motion still detected. Light remains on.");
  }

  adjustBrightness(): void {
    console.log("Adjusting brightness for motion detection.");
    this.light.setState(new BrightnessAdjustmentState(this.light));
  }
}

export class BrightnessAdjustmentState extends AbstractLightState {
  turnOn(): void {
    console.log("Light is on with adjusted brightness.");
  }

  turnOff(): void {
    console.log("Light turned off from brightness adjustment.");
    this.light.setState(new OffState(this.light));
  }

  detectMotion(): void {
    console.log("Motion detected. Adjusting brightness.");
  }

  adjustBrightness(): void {
    const brightness = this.light.isDaytime() ? 50 : 100;
    this.light.setBrightness(brightness);
    console.log(`Brightness adjusted to ${brightness}% based on time of day.`);
  }
}
