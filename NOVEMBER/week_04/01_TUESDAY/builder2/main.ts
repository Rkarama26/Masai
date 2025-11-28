import { CarBuilder } from "./CarBuilder";

const car = new CarBuilder()
  .setBrand("Tesla")
  .setEngine("electric")
  .setColor("black")
  .setSunroof(true)
  .setAutomaticTransmission(true)
  .build();

console.log(car.toString());
