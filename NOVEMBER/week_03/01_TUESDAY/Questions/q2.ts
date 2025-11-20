abstract class Beverage2 {
  abstract getDescription(): string;
  abstract getCost(): number;
}

class GreenTea2 extends Beverage2 {
  getDescription(): string {
    return "Green Tea";
  }

  getCost(): number {
    return 40;
  }
} 

class Sugar extends Beverage2 {
  private beverage: Beverage2;

  constructor(beverage: Beverage2) {
    super();
    this.beverage = beverage;
  }

  getDescription(): string {
    return this.beverage.getDescription() + " + Sugar";
  }

  getCost(): number {
    return this.beverage.getCost() + 10;
  }
}

const tea2 = new Sugar(new GreenTea2());
console.log(tea2.getDescription()); // Green Tea + Sugar
console.log(tea2.getCost()); // 50

const tea3 = new Sugar(new Sugar(new GreenTea2()));
console.log(tea3.getDescription());
console.log(tea3.getCost());
