/*
Problem Statement:

Create an interface Vehicle with a method start().

Implement Bike and Car classes that log appropriate start() messages.
Create a Driver class that receives a Vehicle in its constructor and calls drive().

Then: Add a setVehicle() method in Driver to switch between vehicles at runtime.

*/
interface IVehicle {
  start(): void;
}

class Car implements IVehicle {
  start(): void {
    console.log("Car is starting");
  }
}

class Bike implements IVehicle {
  start(): void {
    console.log("Bike is starting");
  }
}

class Driver {
  private vehicle: IVehicle;

  constructor(vehicle: IVehicle) {
    this.vehicle = vehicle;
  }

  drive(): void {
    this.vehicle.start();
    console.log("Driving");
  }

  setVehicle(vehicle: IVehicle): void {
    this.vehicle = vehicle;
  }

}

const driver = new Driver(new Car());
driver.drive();

driver.setVehicle(new Bike())
driver.drive()


