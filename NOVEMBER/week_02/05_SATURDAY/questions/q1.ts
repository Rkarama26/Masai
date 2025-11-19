class Engine {
  start(): void {
    console.log("Engine Started");
  }
}

class Car {
  engine: Engine;

  constructor(engine: Engine) {
    this.engine = engine;
  }

  drive(): void {
    this.engine.start;
    console.log("Car is driving");
  }
}

const car = new Car(new Engine());
