import { DeviceFactory } from "./DeviceFactory";

import { Device } from "./Device";

import { SamsungLaptop } from "./SamsungLaptop";

import { SamsungPhone } from "./SamsungPhone";

export class SamsungFactory implements DeviceFactory {
  createDevice(type: string): Device {
    if (type === "laptop") {
      return new SamsungLaptop();
    } else if (type === "phone") {
      return new SamsungPhone();
    } else {
      throw new Error("Unknown device type");
    }
  }
}
