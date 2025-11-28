import { Car } from "./Car";

export class CarBuilder {
  private brand: string = "";
  private engine: string = "";
  private color: string = "";
  private sunroof: boolean = false;
  private automaticTransmission: boolean = false;

  setBrand(brand: string): CarBuilder {
    this.brand = brand;
    return this;
  }

  setEngine(engine: string): CarBuilder {
    this.engine = engine;
    return this;
  }

  setColor(color: string): CarBuilder {
    this.color = color;
    return this;
  }

  setSunroof(sunroof: boolean): CarBuilder {
    this.sunroof = sunroof;
    return this;
  }

  setAutomaticTransmission(automaticTransmission: boolean): CarBuilder {
    this.automaticTransmission = automaticTransmission;
    return this;
  }

  build(): Car {
    return new Car(
      this.brand,
      this.engine,
      this.color,
      this.sunroof,
      this.automaticTransmission
    );
  }
}
