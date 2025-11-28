import { DeviceFactory } from "./DeviceFactory";

import { Device } from "./Device";

import { AppleLaptop } from "./AppleLaptop";

import { ApplePhone } from "./ApplePhone";

export class AppleFactory implements DeviceFactory {
  createDevice(type: string): Device {
    if (type === "laptop") {
      return new AppleLaptop();
    } else if (type === "phone") {
      return new ApplePhone();
    } else {
      throw new Error("Unknown device type");
    }
  }
}
