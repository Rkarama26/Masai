// class PetrolEngine {
//   start(): void {
//     console.log("Petrol engine started");
//   }
// }

// Task: Explain why you cannot easily switch to a DieselEngine without modifying Car.
/*
The Car class is directly using the Petrol engine class (hard coupling) which is not recommended to use directly.
*/

// class Car {
//   engine: PetrolEngine = new PetrolEngine();
//   drive(): void {
//     this.engine.start();
//     console.log("Driving car");
//   }
// }

// Then refactor it using an interface to show loose coupling.
interface Engine {
  start(): void;
}

class PetrolEngine implements Engine {
  start(): void {
    console.log("Petrol engine started");
  }
}

class DieselEngine implements Engine {
  start(): void {
    console.log("Diesel engine started");
  }
}

class Car {
  engine: Engine;

  constructor(engine: Engine) {
    this.engine = engine;
  }
 
  drive():void{
    this.engine.start();
    console.log("Driving car")
  }


}


const car = new Car(new PetrolEngine())
car.drive()