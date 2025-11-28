import { Device } from "./Device";

export class ApplePhone implements Device {
  specifications(): void {
    console.log("Apple Phone: iPhone 15 Pro with A17 chip, 128GB storage");
  }
}
