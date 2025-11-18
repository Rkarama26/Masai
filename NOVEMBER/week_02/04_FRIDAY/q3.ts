class Bird {
  // Common bird behaviors
}

class FlyingBird extends Bird {
  fly(): void {
    console.log("Flying...");
  }
}

class Ostrich extends Bird {
  // Ostriches can't fly, so no fly method
}
