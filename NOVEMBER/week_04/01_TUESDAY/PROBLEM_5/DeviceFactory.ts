import { Device } from "./Device";

export interface DeviceFactory {
  createDevice(type: string): Device;
}
