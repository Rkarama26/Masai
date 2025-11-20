abstract class Beverage {
  abstract getCost(): number;
  abstract getDescription(): string;
}

class Espresso extends Beverage {
  getCost(): number {
    return 80;
  }
  getDescription(): string {
    return "Espresso";
  }
}

class LemonTea extends Beverage {
  getCost(): number {
    return 40;
  }
  getDescription(): string {
    return "LemonTea ";
  }
}

abstract class Topppings extends Beverage {
  protected beverages: Beverage;

  constructor(beverages: Beverage) {
    super();
    this.beverages = beverages;
  }
  abstract getCost(): number;
  abstract getDescription(): string;
}

class Sugar3 extends Topppings {
  getDescription(): string {
    return this.beverages.getDescription() + " + Sugar";
  }
  getCost(): number {
    return this.beverages.getCost() + 10;
  }
}

class Honey3 extends Topppings {
  getDescription(): string {
    return this.beverages.getDescription() + " + Honey";
  }
  getCost(): number {
    return this.beverages.getCost() + 20;
  }
}

class WhippedCream3 extends Topppings {
  getDescription(): string {
    return this.beverages.getDescription() + " + WhippedCream";
  }
  getCost(): number {
    return this.beverages.getCost() + 15;
  }
}



const order1 = new Honey3(new WhippedCream3(new Espresso()));
const order2 = new Sugar3(new Sugar3(new LemonTea()));

console.log("Order 1:", order1.getDescription()); // Espresso + WhippedCream + Honey
console.log("Cost 1: ₹", order1.getCost());       // 80 + 15 + 20 = ₹115

console.log("Order 2:", order2.getDescription()); // LemonTea + Sugar + Sugar
console.log("Cost 2: ₹", order2.getCost());       // 40 + 10 + 10 = ₹60
