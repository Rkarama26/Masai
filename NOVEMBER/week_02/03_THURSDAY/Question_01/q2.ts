class Bird {
  fly(): void {
    console.log("I can fly");
  }
}

class Penguin extends Bird {
  fly(): void {
    console.log("I cannot fly");
  }
}

const bird = new Bird();
bird.fly();
const penguin = new Penguin();
penguin.fly();