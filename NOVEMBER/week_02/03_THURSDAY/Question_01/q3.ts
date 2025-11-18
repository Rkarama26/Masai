interface Duck {
  swim(): void;
  fly(): void;
  sound(): void;
}

class ToyDuck implements Duck {
  swim(): void {
    console.log("can float on water");
  }
  fly(): void {
    console.log("cannot fly");
  }
  sound(): void {
    console.log("makes no sound");
  }
}

const toyDuck = new ToyDuck();
toyDuck.swim();
toyDuck.fly();
toyDuck.sound();