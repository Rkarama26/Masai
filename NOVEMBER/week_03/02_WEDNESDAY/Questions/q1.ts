interface IVehicle {
  getDetails(): string;
}

class Car implements IVehicle {
  private make: string;
  constructor(make: string) {
    this.make = make;
  }
  getDetails(): string {
    return `Car: ${this.make}`;
  }
}

class Bike implements IVehicle {
  private make: string;
  constructor(make: string) {
    this.make = make;
  }
  getDetails(): string {
    return `Bike: ${this.make}`;
  }
}

class VehicleFactory {
  static createVehicle(type: string, make: string): IVehicle {
    switch (type) {
      case "Car":
        return new Car(make);
      case "Bike":
        return new Bike(make);
    }
    throw new Error("Unknown vehicle type");
  }
}

const myBike = VehicleFactory.createVehicle("Bike", "Yamaha");
console.log(myBike.getDetails()); // Bike: Yamaha

const myCar = VehicleFactory.createVehicle("Car", "Toyota");
console.log(myCar.getDetails()); // Car: Toyota
