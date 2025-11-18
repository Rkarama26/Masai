interface ShippingStrategy {
  calculate(): number;
}

class StandardShipping implements ShippingStrategy {
  calculate(): number {
    return 50;
  }
}

class ExpressShipping implements ShippingStrategy {
  calculate(): number {
    return 100;
  }
}

class Shipping {
  private strategies: Map<string, ShippingStrategy> = new Map();

  constructor() {
    this.strategies.set("standard", new StandardShipping());
    this.strategies.set("express", new ExpressShipping());
  }

  addShippingType(type: string, strategy: ShippingStrategy) {
    this.strategies.set(type, strategy);
  }

  calculate(type: string): number {
    const strategy = this.strategies.get(type);
    return strategy ? strategy.calculate() : 0;
  }
}
