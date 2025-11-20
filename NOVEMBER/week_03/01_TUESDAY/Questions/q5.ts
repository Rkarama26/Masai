abstract class Drink {
  abstract getDescription(): string;
  abstract getCost(): number;
}

class Coffee extends Drink {
  getDescription(): string {
    return "Coffee";
  }
  getCost(): number {
    return 50;
  }
}

abstract class ToppingsDecorator extends Drink {
  protected drink: Drink;
  constructor(drink: Drink) {
    super();
    this.drink = drink;
  }
  abstract getDescription(): string;
  abstract getCost(): number;
}

class Sugar2 extends ToppingsDecorator {
  getDescription(): string {
    return this.drink.getDescription() + " + Sugar";
  }
  getCost(): number {
    return this.drink.getCost() + 15;
  }
}

class Honey2 extends ToppingsDecorator {
  getDescription(): string {
    return this.drink.getDescription() + " + Honey";
  }
  getCost(): number {
    return this.drink.getCost() + 15;
  }
}

class WhippedCream extends ToppingsDecorator {
  getDescription(): string {
    return this.drink.getDescription() + " + WhippedCream";
  }
  getCost(): number {
    return this.drink.getCost() + 15;
  }
}

const myDrink = new WhippedCream(new Honey2(new Sugar2(new Coffee())));
console.log(myDrink.getDescription());
console.log(myDrink.getCost());
