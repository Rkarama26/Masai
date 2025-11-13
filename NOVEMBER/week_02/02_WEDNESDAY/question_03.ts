class Vehicle {
  brand: string;
  speed: number;

  constructor(brand: string, speed: number) {
    this.brand = brand;
    this.speed = speed;
  }
  drive(): void {
    console.log(`${this.brand} is driving at ${this.speed} km/h`);
  }
}

class Car extends Vehicle {
  fueltype: string;

  constructor(brand: string, speed: number, fueltype: string) {
    super(brand, speed);
    this.fueltype = fueltype;
  }

  refuel():void{
    console.log(`Refueling the ${this.fueltype} car`);
  }
}

const myCar = new Car("Toyota", 120, "Gasoline");
myCar.drive();
