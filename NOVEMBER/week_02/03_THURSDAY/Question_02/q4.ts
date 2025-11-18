class PolyDuck {
  fly(): void {
    console.log("PolyDuck is flying!");
  }
}

class DesiDuck extends PolyDuck {
  fly(): void {
    console.log("DesiDuck flies at 10kmph");
  }
}

class VidesiDuck extends PolyDuck {
  fly(): void {
    console.log("VidesiDuck flies at 20kmph");
  }
}
class SmartDuck extends PolyDuck {
  fly(): void {
    console.log("SmartDuck flies at 50kmph");
  }
}

const desiDuck = new DesiDuck();
desiDuck.fly(); // Output: DesiDuck flies at 10kmph

const videsiDuck = new VidesiDuck();
videsiDuck.fly(); // Output: VidesiDuck flies at 20kmph

const smartDuck = new SmartDuck();
smartDuck.fly(); // Output: SmartDuck flies at 50kmph