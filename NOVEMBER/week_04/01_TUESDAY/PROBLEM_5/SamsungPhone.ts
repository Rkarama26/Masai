import { Device } from "./Device";

export class SamsungPhone implements Device {
  specifications(): void {
    console.log(
      "Samsung Phone: Galaxy S24 Ultra with Snapdragon 8 Gen 3, 512GB storage"
    );
  }
}
